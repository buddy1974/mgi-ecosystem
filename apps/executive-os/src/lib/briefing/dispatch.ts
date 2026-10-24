import { createHash } from 'node:crypto'
import { prisma } from '@/lib/prisma'
import type { ExecEvent } from '@mgi/database'
import { emitEvent, isNoMatch, isUniqueViolation, subjectExists } from './events'
import { buildAlertMessage, buildDigestMessage, type DigestItem } from './format'
import { absoluteLink, subjectPath } from './links'
import { RECIPIENTS, getRecipient, mayReceive, mayReceiveAlert } from './recipients'
import { alertsPerHour, nextRetry, routeEvent } from './rules'
import { resolveTarget, sendTelegram } from './telegram-transport'
import { PRIORITY_RANK, type Priority, type SubjectType } from './types'

// Event → notification → Telegram. All state changes are single conditional statements
// (claim with WHERE status/processedAt), so overlapping runs never double-send — the Neon
// HTTP adapter has no transactions.

const HOUR = 3_600_000
const STALE_SENDING_MS = 5 * 60_000

function linkFor(ev: Pick<ExecEvent, 'subjectType' | 'subjectId'>, env: NodeJS.ProcessEnv): string | null {
  try { return absoluteLink(subjectPath(ev.subjectType as SubjectType, ev.subjectId), env) } catch { return null }
}

function linkLabel(ev: Pick<ExecEvent, 'subjectType'>): string {
  return ({ RECORD: 'record', COMMITMENT: 'commitment', MEETING: 'meeting', DECISION: 'decision', FINANCE: 'sales dashboard', OUTBOX: 'notification outbox' } as Record<string, string>)[ev.subjectType] ?? 'record'
}

async function enqueue(n: { dedupeKey: string; kind: string; recipient: string; eventIds: string[]; text: string; linkUrl: string | null; isDemo: boolean; status?: string; lastError?: string }): Promise<boolean> {
  try {
    await prisma.execNotification.create({
      data: {
        dedupeKey: `${n.isDemo ? 'demo' : 'live'}:${n.dedupeKey}`,
        kind: n.kind, recipient: n.recipient, eventIds: n.eventIds, text: n.text, linkUrl: n.linkUrl,
        isDemo: n.isDemo, status: n.status ?? 'PENDING', lastError: n.lastError ?? null,
      },
    })
    return true
  } catch (err) {
    if (isUniqueViolation(err)) return false
    throw err
  }
}

export interface ProcessResult { processed: number; alerts: number; digest: number; linkFailures: number }

/** Routes new events: immediate alert (enqueued) or digest. */
export async function processEvents(isDemo: boolean, now = new Date(), env: NodeJS.ProcessEnv = process.env): Promise<ProcessResult> {
  const out: ProcessResult = { processed: 0, alerts: 0, digest: 0, linkFailures: 0 }
  const events = (await prisma.execEvent.findMany({ where: { isDemo, processedAt: null }, orderBy: { occurredAt: 'asc' }, take: 100 }))
    // Most important first: when the hourly alert limit is reached, routine items overflow, not critical ones.
    .sort((a, b) => PRIORITY_RANK[a.priority as Priority] - PRIORITY_RANK[b.priority as Priority])
  for (const ev of events) {
    try {
      await prisma.execEvent.update({ where: { id: ev.id, processedAt: null }, data: { processedAt: now } })
    } catch (err) {
      if (isNoMatch(err)) continue // another run claimed it
      throw err
    }
    out.processed++
    const priority = ev.priority as Priority
    const link = linkFor(ev, env)
    const linkOk = link !== null && (await subjectExists(ev.subjectType as SubjectType, ev.subjectId, isDemo))
    let alertedAllDigestRecipients = true
    for (const r of RECIPIENTS) {
      if (!mayReceive(r, ev)) continue
      const alertsLastHour = await prisma.execNotification.count({
        where: { recipient: r.key, kind: 'ALERT', isDemo, createdAt: { gte: new Date(now.getTime() - HOUR) } },
      })
      const { routing } = routeEvent(priority, { now, alertsLastHour, recipientAllowsAlert: mayReceiveAlert(r, { ...ev, priority }), limit: alertsPerHour(env) })
      if (routing === 'ALERT') {
        if (!linkOk) {
          // Never send an alert whose link would not open the exact record.
          out.linkFailures++
          await enqueue({
            dedupeKey: `alert:${ev.id}:${r.key}`, kind: 'ALERT', recipient: r.key, eventIds: [ev.id], text: ev.subject,
            linkUrl: link, isDemo, status: 'FAILED',
            lastError: link ? 'Linked record not found — alert not sent' : 'EXEC_OS_BASE_URL missing or invalid — alert not sent',
          })
          if (r.digest) alertedAllDigestRecipients = false
          continue
        }
        const text = buildAlertMessage({
          priority, companySlug: ev.companySlug, domain: ev.domain, subject: ev.subject, summary: ev.summary,
          facts: ev.facts as Record<string, unknown>, actionRequired: ev.actionRequired, link: link!, linkLabel: linkLabel(ev), isDemo,
        })
        if (await enqueue({ dedupeKey: `alert:${ev.id}:${r.key}`, kind: 'ALERT', recipient: r.key, eventIds: [ev.id], text, linkUrl: link, isDemo })) out.alerts++
      } else if (r.digest) {
        alertedAllDigestRecipients = false
      }
    }
    const routing = alertedAllDigestRecipients ? 'ALERT' : 'DIGEST'
    if (routing === 'DIGEST') out.digest++
    await prisma.execEvent.update({ where: { id: ev.id }, data: { routing } })
  }
  return out
}

export interface DeliverResult { attempted: number; sent: number; dryRun: number; retried: number; failed: number; recoveredStale: number }

/** Sends due notifications. fetchImpl is injectable for tests (loopback mock server). */
export async function deliverPending(isDemo: boolean, now = new Date(), env: NodeJS.ProcessEnv = process.env, fetchImpl: typeof fetch = fetch): Promise<DeliverResult> {
  const out: DeliverResult = { attempted: 0, sent: 0, dryRun: 0, retried: 0, failed: 0, recoveredStale: 0 }

  // A run that died mid-send leaves SENDING rows. Whether Telegram got the message is
  // unknown, so they are surfaced as FAILED for a human to retry — never resent blindly.
  const stale = await prisma.execNotification.findMany({
    where: { isDemo, status: 'SENDING', nextAttemptAt: { lt: new Date(now.getTime() - STALE_SENDING_MS) } }, select: { id: true },
  })
  for (const s of stale) {
    try {
      await prisma.execNotification.update({
        where: { id: s.id, status: 'SENDING' },
        data: { status: 'FAILED', lastError: 'Delivery interrupted — check the chat, then retry from the outbox if it did not arrive' },
      })
      out.recoveredStale++
    } catch (err) { if (!isNoMatch(err)) throw err }
  }

  const due = await prisma.execNotification.findMany({
    where: { isDemo, status: 'PENDING', nextAttemptAt: { lte: now } }, orderBy: { createdAt: 'asc' }, take: 25,
  })
  for (const n of due) {
    try {
      await prisma.execNotification.update({ where: { id: n.id, status: 'PENDING' }, data: { status: 'SENDING', attempts: { increment: 1 }, nextAttemptAt: now } })
    } catch (err) {
      if (isNoMatch(err)) continue
      throw err
    }
    out.attempted++
    const attempts = n.attempts + 1
    const recipient = getRecipient(n.recipient)
    if (!recipient) {
      await prisma.execNotification.update({ where: { id: n.id }, data: { status: 'FAILED', lastError: 'Unknown recipient' } })
      out.failed++
      continue
    }
    const target = resolveTarget(recipient, n.isDemo, env)
    if (target.kind === 'dry_run') {
      await prisma.execNotification.update({ where: { id: n.id }, data: { status: 'DRY_RUN', lastError: target.reason, sentAt: now } })
      out.dryRun++
      continue
    }
    const res = await sendTelegram(target, n.text, n.linkUrl, fetchImpl)
    if (res.ok) {
      await prisma.execNotification.update({ where: { id: n.id }, data: { status: 'SENT', telegramMessageId: res.messageId, sentAt: now, lastError: null } })
      out.sent++
      continue
    }
    const retryAt = res.retryable ? nextRetry(attempts, now, res.retryAfterSec) : null
    if (retryAt) {
      await prisma.execNotification.update({ where: { id: n.id }, data: { status: 'PENDING', nextAttemptAt: retryAt, lastError: res.error } })
      out.retried++
    } else {
      await prisma.execNotification.update({ where: { id: n.id }, data: { status: 'FAILED', lastError: res.error } })
      out.failed++
      // Visible failure, at most one per recipient per hour (no failure storms).
      await emitEvent({
        dedupeKey: `delivery-failed:${n.recipient}:${now.toISOString().slice(0, 13)}`,
        companySlug: 'mgi', domain: 'OPERATIONS', kind: 'OPERATIONAL_FAILURE', isDemo,
        subject: `Telegram delivery failed for ${recipient.label}`,
        summary: `A ${n.kind.toLowerCase().replace('_', ' ')} could not be delivered after ${attempts} attempt(s): ${res.error}`,
        facts: { display: { Recipient: recipient.label, Attempts: attempts } },
        actionRequired: 'Check the bot token / chat membership, then retry from the outbox',
        subjectType: 'OUTBOX', subjectId: 'outbox', occurredAt: now, priority: 'NORMAL',
      })
    }
  }
  return out
}

/** Manual retry of a FAILED row from the outbox (executives only — checked by the caller). */
export async function retryNotification(id: string, isDemo: boolean, now = new Date()): Promise<boolean> {
  try {
    await prisma.execNotification.update({ where: { id, isDemo, status: 'FAILED' }, data: { status: 'PENDING', attempts: 0, nextAttemptAt: now, lastError: null } })
    return true
  } catch (err) {
    if (isNoMatch(err)) return false
    throw err
  }
}

function digestItems(events: ExecEvent[], env: NodeJS.ProcessEnv): DigestItem[] {
  return events.map((e) => ({ priority: e.priority as Priority, companySlug: e.companySlug, subject: e.subject, link: linkFor(e, env) }))
}

/** Pending digest events for a recipient (routine items not yet summarised). */
export async function pendingDigestEvents(isDemo: boolean): Promise<ExecEvent[]> {
  return prisma.execEvent.findMany({ where: { isDemo, routing: 'DIGEST', digestedAt: null }, orderBy: { occurredAt: 'asc' }, take: 200 })
}

export async function markDigested(ids: string[], now: Date) {
  for (const id of ids) {
    try { await prisma.execEvent.update({ where: { id, digestedAt: null }, data: { digestedAt: now } }) } catch (err) { if (!isNoMatch(err)) throw err }
  }
}

export async function runDigest(isDemo: boolean, now = new Date(), env: NodeJS.ProcessEnv = process.env): Promise<{ notifications: number; items: number }> {
  const events = await pendingDigestEvents(isDemo)
  let notifications = 0
  const included = new Set<string>()
  for (const r of RECIPIENTS.filter((x) => x.digest)) {
    const mine = events.filter((e) => mayReceive(r, e))
    if (!mine.length) continue
    const ids = mine.map((e) => e.id)
    const hash = createHash('sha256').update(ids.join(',')).digest('hex').slice(0, 16)
    const text = buildDigestMessage({ items: digestItems(mine, env), isDemo, overviewLink: absoluteLink('/briefing', env), label: 'Executive digest' })
    if (await enqueue({ dedupeKey: `digest:${r.key}:${hash}`, kind: 'DIGEST', recipient: r.key, eventIds: ids, text, linkUrl: absoluteLink('/briefing', env), isDemo })) notifications++
    ids.forEach((id) => included.add(id))
  }
  await markDigested([...included], now)
  return { notifications, items: included.size }
}
