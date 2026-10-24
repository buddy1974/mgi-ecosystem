import { randomBytes } from 'node:crypto'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { canDecide, canView, type BriefingAccess } from './access'
import { emitEvent, isNoMatch, logActivity } from './events'
import { DELAY_CAUSES } from './types'

// Executive actions on records and commitments. Each action:
// - re-checks company access (404-equivalent when not visible),
// - changes state with ONE conditional update (WHERE id AND current status) — safe under
//   concurrent clicks without transactions,
// - writes an ExecActivity row (history), and emits a follow-up event only where the
//   President needs to hear about it.
// No action sends anything to customers, posts accounting entries or changes a source
// system: MGI records the executive decision; the source system owns the operation.

export type ActionResult = { ok: true; message: string } | { ok: false; status: 400 | 403 | 404 | 409; error: string }

const txt = (max: number) => z.string().trim().min(1).max(max)
const dateStr = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)

export const RecordActionSchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('acknowledge'), note: z.string().max(500).optional() }),
  z.object({ action: z.literal('close'), note: txt(500) }),
  z.object({ action: z.literal('approve'), note: z.string().max(500).optional() }),
  z.object({ action: z.literal('decline'), note: txt(500) }),
  z.object({
    action: z.literal('request_action'),
    title: txt(160), deliverable: txt(1000), ownerName: txt(80), ownerRole: txt(80), dueDate: dateStr,
  }),
])

export const CommitmentActionSchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('progress'), progress: z.coerce.number().int().min(0).max(99), note: z.string().max(500).optional() }),
  z.object({ action: z.literal('block'), delayCause: z.enum(DELAY_CAUSES), blocker: txt(500) }),
  z.object({ action: z.literal('unblock'), note: z.string().max(500).optional() }),
  z.object({ action: z.literal('deliver'), evidence: txt(1000) }),
  z.object({ action: z.literal('accept'), note: z.string().max(500).optional() }),
  z.object({ action: z.literal('reject_delivery'), note: txt(500) }),
  z.object({ action: z.literal('reschedule'), dueDate: dateStr, delayCause: z.enum(DELAY_CAUSES), note: txt(500) }),
])

const notFound: ActionResult = { ok: false, status: 404, error: 'Not found' }
const forbidden: ActionResult = { ok: false, status: 403, error: 'Only an executive or a company admin may do this' }
const conflict: ActionResult = { ok: false, status: 409, error: 'This item changed in the meantime. Reload the page.' }

async function conditional(fn: () => Promise<unknown>): Promise<boolean> {
  try { await fn(); return true } catch (err) { if (isNoMatch(err)) return false; throw err }
}

function newRef(prefix: string, isDemo: boolean) {
  return `${isDemo ? 'DEMO-' : ''}${prefix}-${randomBytes(3).toString('hex').toUpperCase()}`
}

function endOfDayDouala(date: string): Date {
  return new Date(new Date(`${date}T23:59:00.000Z`).getTime() - 3_600_000)
}

export async function recordAction(access: BriefingAccess, id: string, raw: unknown, isDemo: boolean, now = new Date()): Promise<ActionResult> {
  const parsed = RecordActionSchema.safeParse(raw)
  if (!parsed.success) return { ok: false, status: 400, error: 'Invalid action' }
  const a = parsed.data
  const rec = await prisma.execRecord.findFirst({ where: { id, isDemo } })
  if (!rec || !canView(access, rec.companySlug)) return notFound
  const actor = access.actor

  if (a.action === 'acknowledge') {
    if (!(await conditional(() => prisma.execRecord.update({ where: { id, execStatus: 'NEW' }, data: { execStatus: 'ACKNOWLEDGED' } })))) return conflict
    await logActivity({ subjectType: 'RECORD', subjectId: id, action: 'ACKNOWLEDGED', actor, isDemo, fromStatus: 'NEW', toStatus: 'ACKNOWLEDGED', note: a.note })
    return { ok: true, message: 'Acknowledged' }
  }

  if (!canDecide(access, rec.companySlug)) return forbidden

  if (a.action === 'close') {
    if (!(await conditional(() => prisma.execRecord.update({ where: { id, execStatus: rec.execStatus, NOT: { execStatus: 'CLOSED' } }, data: { execStatus: 'CLOSED' } })))) return conflict
    await logActivity({ subjectType: 'RECORD', subjectId: id, action: 'CLOSED', actor, isDemo, fromStatus: rec.execStatus, toStatus: 'CLOSED', note: a.note })
    return { ok: true, message: 'Closed' }
  }

  if (a.action === 'approve' || a.action === 'decline') {
    if (rec.recordType !== 'APPROVAL_REQUEST') return { ok: false, status: 400, error: 'Only approval requests can be approved or declined' }
    const to = a.action === 'approve' ? 'APPROVED' : 'DECLINED'
    if (!(await conditional(() => prisma.execRecord.update({ where: { id, status: 'PENDING' }, data: { status: to, execStatus: 'CLOSED' } })))) return conflict
    await logActivity({ subjectType: 'RECORD', subjectId: id, action: to, actor, isDemo, fromStatus: 'PENDING', toStatus: to, note: a.note })
    await emitEvent({
      dedupeKey: `approval-decided:${id}`, companySlug: rec.companySlug, domain: 'GOVERNANCE', kind: 'APPROVAL_DECIDED', isDemo,
      subject: `${to === 'APPROVED' ? 'Approved' : 'Declined'}: ${rec.title}`, summary: `Decision by ${actor}.${a.note ? ` Note: ${a.note}` : ''}`,
      subjectType: 'RECORD', subjectId: id, occurredAt: now,
    })
    // A commitment waiting on this decision can move again.
    const unblocks = (rec.data as { unblocksCommitmentRef?: string } | null)?.unblocksCommitmentRef
    if (unblocks && to === 'APPROVED') {
      const c = await prisma.execCommitment.findFirst({ where: { ref: unblocks, isDemo, status: 'BLOCKED' } })
      if (c && (await conditional(() => prisma.execCommitment.update({ where: { id: c.id, status: 'BLOCKED' }, data: { status: 'IN_PROGRESS', blocker: null } })))) {
        await logActivity({ subjectType: 'COMMITMENT', subjectId: c.id, action: 'UNBLOCKED', actor, isDemo, fromStatus: 'BLOCKED', toStatus: 'IN_PROGRESS', note: `Approval ${rec.ref} approved` })
        await emitEvent({
          dedupeKey: `commitment-unblocked:${c.id}:${id}`, companySlug: c.companySlug, domain: 'GOVERNANCE', kind: 'COMMITMENT_UNBLOCKED', isDemo,
          subject: `Unblocked: ${c.title}`, summary: `${c.ownerRole} can proceed — ${rec.title} approved.`,
          subjectType: 'COMMITMENT', subjectId: c.id, occurredAt: now,
        })
      }
    }
    return { ok: true, message: to === 'APPROVED' ? 'Approved' : 'Declined' }
  }

  // request_action → a tracked commitment linked to this record.
  const dueAt = endOfDayDouala(a.dueDate)
  if (dueAt.getTime() < now.getTime()) return { ok: false, status: 400, error: 'Due date is in the past' }
  if (!(await conditional(() => prisma.execRecord.update({ where: { id, execStatus: rec.execStatus, NOT: { execStatus: 'CLOSED' } }, data: { execStatus: 'ACTION_REQUESTED' } })))) return conflict
  const c = await prisma.execCommitment.create({
    data: {
      ref: newRef(`${rec.companySlug.toUpperCase()}-CMT`, isDemo), companySlug: rec.companySlug, recordId: id, title: a.title,
      deliverable: a.deliverable, ownerName: a.ownerName, ownerRole: a.ownerRole, committedAt: now, dueAt, isDemo,
    },
  })
  await logActivity({ subjectType: 'RECORD', subjectId: id, action: 'ACTION_REQUESTED', actor, isDemo, fromStatus: rec.execStatus, toStatus: 'ACTION_REQUESTED', note: `${a.title} → ${a.ownerRole} by ${a.dueDate} (${c.ref})` })
  await logActivity({ subjectType: 'COMMITMENT', subjectId: c.id, action: 'ASSIGNED', actor, isDemo, toStatus: 'OPEN', note: `From ${rec.ref}: ${a.deliverable}` })
  return { ok: true, message: `Action assigned (${c.ref})` }
}

export async function commitmentAction(access: BriefingAccess, id: string, raw: unknown, isDemo: boolean, now = new Date()): Promise<ActionResult> {
  const parsed = CommitmentActionSchema.safeParse(raw)
  if (!parsed.success) return { ok: false, status: 400, error: 'Invalid action' }
  const a = parsed.data
  const c = await prisma.execCommitment.findFirst({ where: { id, isDemo } })
  if (!c || !canView(access, c.companySlug)) return notFound
  const actor = access.actor
  const log = (action: string, toStatus: string, note?: string | null) =>
    logActivity({ subjectType: 'COMMITMENT', subjectId: id, action, actor, isDemo, fromStatus: c.status, toStatus, note })
  const decide = canDecide(access, c.companySlug)

  switch (a.action) {
    case 'progress': {
      if (!['OPEN', 'IN_PROGRESS'].includes(c.status)) return conflict
      if (!(await conditional(() => prisma.execCommitment.update({ where: { id, status: c.status }, data: { progress: a.progress, status: 'IN_PROGRESS' } })))) return conflict
      await log('PROGRESS', 'IN_PROGRESS', `${c.progress}% → ${a.progress}%${a.note ? ` · ${a.note}` : ''}`)
      return { ok: true, message: 'Progress updated' }
    }
    case 'block': {
      if (!['OPEN', 'IN_PROGRESS'].includes(c.status)) return conflict
      if (!(await conditional(() => prisma.execCommitment.update({ where: { id, status: c.status }, data: { status: 'BLOCKED', blocker: a.blocker, delayCause: a.delayCause } })))) return conflict
      await log('BLOCKED', 'BLOCKED', `${a.delayCause}: ${a.blocker}`)
      await emitEvent({
        dedupeKey: `commitment-blocked:${id}:${now.toISOString()}`, companySlug: c.companySlug, domain: 'GOVERNANCE', kind: 'COMMITMENT_BLOCKED', isDemo,
        subject: `Blocked: ${c.title}`, summary: `${c.ownerRole}: ${a.blocker}`, facts: { delayCause: a.delayCause, display: { Owner: c.ownerRole, Cause: a.delayCause } },
        actionRequired: a.delayCause === 'MANAGEMENT_DEPENDENCY' ? 'A management decision is needed' : null,
        subjectType: 'COMMITMENT', subjectId: id, occurredAt: now,
      })
      return { ok: true, message: 'Marked as blocked' }
    }
    case 'unblock': {
      if (c.status !== 'BLOCKED') return conflict
      if (!(await conditional(() => prisma.execCommitment.update({ where: { id, status: 'BLOCKED' }, data: { status: 'IN_PROGRESS', blocker: null } })))) return conflict
      await log('UNBLOCKED', 'IN_PROGRESS', a.note)
      return { ok: true, message: 'Unblocked' }
    }
    case 'deliver': {
      if (!['OPEN', 'IN_PROGRESS'].includes(c.status)) return conflict
      if (!(await conditional(() => prisma.execCommitment.update({ where: { id, status: c.status }, data: { status: 'DELIVERED', progress: 100, deliveredAt: now, evidence: a.evidence } })))) return conflict
      await log('DELIVERED', 'DELIVERED', a.evidence)
      const late = now > c.dueAt
      await emitEvent({
        dedupeKey: `commitment-delivered:${id}:${now.toISOString()}`, companySlug: c.companySlug, domain: 'GOVERNANCE', kind: 'COMMITMENT_DELIVERED', isDemo,
        subject: `Delivered${late ? ' (late)' : ''}: ${c.title}`, summary: `${c.ownerRole} reports delivery. Evidence: ${a.evidence}`,
        actionRequired: 'Accept or return the delivery', subjectType: 'COMMITMENT', subjectId: id, occurredAt: now,
      })
      return { ok: true, message: 'Marked as delivered — awaiting acceptance' }
    }
    case 'accept': {
      if (!decide) return forbidden
      if (c.status !== 'DELIVERED') return conflict
      if (!(await conditional(() => prisma.execCommitment.update({ where: { id, status: 'DELIVERED' }, data: { status: 'ACCEPTED', acceptedBy: actor, acceptedAt: now } })))) return conflict
      await log('ACCEPTED', 'ACCEPTED', a.note)
      if (c.decisionId) {
        const siblings = await prisma.execCommitment.findMany({ where: { decisionId: c.decisionId, isDemo }, select: { status: true } })
        if (siblings.every((s) => s.status === 'ACCEPTED' || s.status === 'CANCELLED')) {
          if (await conditional(() => prisma.execDecision.update({ where: { id: c.decisionId!, status: 'OPEN' }, data: { status: 'IMPLEMENTED' } }))) {
            await logActivity({ subjectType: 'DECISION', subjectId: c.decisionId, action: 'IMPLEMENTED', actor, isDemo, fromStatus: 'OPEN', toStatus: 'IMPLEMENTED', note: 'All linked commitments accepted' })
          }
        }
      }
      return { ok: true, message: 'Delivery accepted' }
    }
    case 'reject_delivery': {
      if (!decide) return forbidden
      if (c.status !== 'DELIVERED') return conflict
      if (!(await conditional(() => prisma.execCommitment.update({ where: { id, status: 'DELIVERED' }, data: { status: 'IN_PROGRESS', deliveredAt: null, progress: 90 } })))) return conflict
      await log('RETURNED', 'IN_PROGRESS', a.note)
      return { ok: true, message: 'Delivery returned to the owner' }
    }
    case 'reschedule': {
      if (!decide) return forbidden
      if (!['OPEN', 'IN_PROGRESS', 'BLOCKED'].includes(c.status)) return conflict
      const dueAt = endOfDayDouala(a.dueDate)
      if (dueAt <= now) return { ok: false, status: 400, error: 'New due date must be in the future' }
      if (!(await conditional(() => prisma.execCommitment.update({ where: { id, status: c.status, dueAt: c.dueAt }, data: { dueAt, delayCause: a.delayCause } })))) return conflict
      await log('RESCHEDULED', c.status, `Due ${c.dueAt.toISOString().slice(0, 10)} → ${a.dueDate} · ${a.delayCause}: ${a.note}`)
      return { ok: true, message: 'Due date changed (history kept)' }
    }
  }
}
