import { prisma } from '@/lib/prisma'
import { classifyPriority } from './rules'
import type { Domain, EventKind, Priority, SubjectType } from './types'

// Persisted business events. Every notification is generated from a row here — never
// directly from a request. dedupeKey is UNIQUE: the same business fact can be reported
// any number of times (n8n retries, double clicks, repeated scans) and is stored once.

export interface EmitInput {
  dedupeKey: string
  companySlug: string
  domain: Domain
  kind: EventKind
  subject: string
  summary: string
  facts?: Record<string, unknown>
  actionRequired?: string | null
  subjectType: SubjectType
  subjectId: string
  isDemo: boolean
  occurredAt?: Date
  /** Only internal callers may pin a priority; ingest always uses the rules. */
  priority?: Priority
}

export type EmitResult = { created: true; id: string; priority: Priority } | { created: false; reason: 'duplicate' }

/**
 * Unique-constraint violation. Through the Neon HTTP adapter Prisma 7 reports the raw
 * Postgres SQLSTATE 23505 instead of P2002 (verified 2026-10-24 against the HTTP proxy);
 * both are accepted so dedupe works on either path.
 */
export function isUniqueViolation(err: unknown): boolean {
  const code = (err as { code?: string })?.code
  return code === 'P2002' || code === '23505'
}

export function isNoMatch(err: unknown): boolean {
  return (err as { code?: string })?.code === 'P2025'
}

export async function emitEvent(input: EmitInput): Promise<EmitResult> {
  const priority = input.priority ?? classifyPriority(input.kind, input.facts)
  // Demo and live keys live in separate namespaces so a demo replay can never suppress
  // (or be suppressed by) a live event with the same business key.
  const dedupeKey = `${input.isDemo ? 'demo' : 'live'}:${input.dedupeKey}`
  // Cheap pre-check keeps routine repeats out of the error log; the unique index still
  // decides under concurrency.
  if (await prisma.execEvent.findUnique({ where: { dedupeKey }, select: { id: true } })) return { created: false, reason: 'duplicate' }
  try {
    const row = await prisma.execEvent.create({
      data: {
        dedupeKey,
        companySlug: input.companySlug,
        domain: input.domain,
        kind: input.kind,
        priority,
        subject: input.subject,
        summary: input.summary,
        facts: (input.facts ?? {}) as object,
        actionRequired: input.actionRequired ?? null,
        subjectType: input.subjectType,
        subjectId: input.subjectId,
        isDemo: input.isDemo,
        occurredAt: input.occurredAt ?? new Date(),
      },
      select: { id: true },
    })
    return { created: true, id: row.id, priority }
  } catch (err) {
    if (isUniqueViolation(err)) return { created: false, reason: 'duplicate' }
    throw err
  }
}

export async function logActivity(a: {
  subjectType: SubjectType
  subjectId: string
  action: string
  actor: string
  isDemo: boolean
  fromStatus?: string | null
  toStatus?: string | null
  note?: string | null
}) {
  await prisma.execActivity.create({
    data: {
      subjectType: a.subjectType,
      subjectId: a.subjectId,
      action: a.action,
      actor: a.actor,
      isDemo: a.isDemo,
      fromStatus: a.fromStatus ?? null,
      toStatus: a.toStatus ?? null,
      note: a.note ?? null,
    },
  })
}

/** True when the linked subject exists in this mode — links are validated before sending. */
export async function subjectExists(subjectType: SubjectType, id: string, isDemo: boolean): Promise<boolean> {
  const where = { id, isDemo }
  switch (subjectType) {
    case 'RECORD': return (await prisma.execRecord.count({ where })) === 1
    case 'COMMITMENT': return (await prisma.execCommitment.count({ where })) === 1
    case 'MEETING': return (await prisma.execMeeting.count({ where })) === 1
    case 'DECISION': return (await prisma.execDecision.count({ where })) === 1
    case 'FINANCE': return (await prisma.execRecord.count({ where: { isDemo, companySlug: id, recordType: 'ORDER' } })) > 0
    case 'OUTBOX': return true
  }
}
