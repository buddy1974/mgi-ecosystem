import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { VENTURES } from '@/lib/ventures-config'
import { emitEvent, isUniqueViolation, logActivity } from './events'
import { refMatchesMode } from './mode'
import { DOMAINS, EVENT_KINDS, RECORD_TYPES, SOURCE_SYSTEMS } from './types'

// Ingest contract mgi.exec.ingest.v1 — the single way source systems (NMI, Odoo, web
// forms, n8n) and the demo scenarios put business facts into the briefing centre.
// The sender describes the fact; MGI decides the priority (rules.ts). A sender cannot
// force an alert, and a demo payload cannot enter a live deployment or vice versa.

const iso = z.string().datetime({ offset: true })
const code = (max: number) => z.string().regex(/^[A-Z][A-Z0-9_]*$/).max(max)

export const IngestSchema = z.object({
  schema: z.literal('mgi.exec.ingest.v1'),
  isDemo: z.boolean(),
  source: z.enum(SOURCE_SYSTEMS),
  companySlug: z.string().regex(/^[a-z]{2,12}$/),
  record: z.object({
    ref: z.string().regex(/^[A-Z0-9][A-Z0-9-]{2,63}$/),
    recordType: z.enum(RECORD_TYPES),
    domain: z.enum(DOMAINS),
    title: z.string().trim().min(1).max(200),
    summary: z.string().max(4000).optional(),
    status: code(32),
    amount: z.number().finite().min(0).max(1e13).optional(),
    currency: z.string().regex(/^[A-Z]{3}$/).optional(),
    occurredAt: iso,
    dueAt: iso.optional(),
    sourceRef: z.string().max(120).optional(),
    parentRef: z.string().regex(/^[A-Z0-9][A-Z0-9-]{2,63}$/).optional(),
    data: z.record(z.unknown()).optional(),
  }),
  signal: z.object({
    kind: z.enum(EVENT_KINDS),
    subject: z.string().trim().min(1).max(200),
    summary: z.string().trim().min(1).max(1500),
    actionRequired: z.string().max(200).optional(),
    facts: z.record(z.union([z.string().max(200), z.number().finite(), z.boolean()])).optional(),
    display: z.record(z.union([z.string().max(120), z.number().finite()])).optional(),
    dedupeKey: z.string().regex(/^[A-Za-z0-9:_.-]{1,160}$/).optional(),
  }).optional(),
})

export type IngestPayload = z.infer<typeof IngestSchema>

export const MAX_INGEST_BYTES = 32_000

export type IngestResult =
  | { ok: true; recordId: string; created: boolean; event: 'created' | 'duplicate' | 'none' }
  | { ok: false; status: 400 | 409; error: string }

export async function ingest(raw: unknown, deploymentIsDemo: boolean): Promise<IngestResult> {
  const parsed = IngestSchema.safeParse(raw)
  if (!parsed.success) return { ok: false, status: 400, error: 'Invalid payload' }
  const p = parsed.data
  if (p.isDemo !== deploymentIsDemo) {
    return { ok: false, status: 409, error: p.isDemo ? 'Demo payload refused by a live deployment' : 'Live payload refused by a demo deployment' }
  }
  if (!refMatchesMode(p.record.ref, p.isDemo)) return { ok: false, status: 400, error: 'Reference prefix does not match demo/live mode' }
  if ((p.source === 'DEMO') !== p.isDemo) return { ok: false, status: 400, error: 'Source DEMO is reserved for demo payloads' }
  if (!VENTURES[p.companySlug]) return { ok: false, status: 400, error: 'Unknown company' }

  const r = p.record
  const fields = {
    companySlug: p.companySlug, domain: r.domain, recordType: r.recordType, title: r.title, summary: r.summary ?? null,
    status: r.status, amount: r.amount ?? null, currency: r.currency ?? (r.amount !== undefined ? 'XAF' : null),
    occurredAt: new Date(r.occurredAt), dueAt: r.dueAt ? new Date(r.dueAt) : null, sourceSystem: p.source,
    sourceRef: r.sourceRef ?? null, parentRef: r.parentRef ?? null, data: (r.data ?? {}) as object,
  }

  let recordId: string
  let created = false
  let previousStatus: string | null = null
  const existing = await prisma.execRecord.findUnique({ where: { ref: r.ref }, select: { id: true, isDemo: true, status: true, companySlug: true } })
  if (existing) {
    if (existing.isDemo !== p.isDemo || existing.companySlug !== p.companySlug) return { ok: false, status: 409, error: 'Reference belongs to another company or mode' }
    previousStatus = existing.status
    await prisma.execRecord.update({ where: { id: existing.id }, data: fields })
    recordId = existing.id
  } else {
    try {
      const row = await prisma.execRecord.create({ data: { ...fields, ref: r.ref, isDemo: p.isDemo }, select: { id: true } })
      recordId = row.id
      created = true
    } catch (err) {
      if (isUniqueViolation(err)) return { ok: false, status: 409, error: 'Concurrent ingest of the same reference — retry' }
      throw err
    }
  }

  if (created) {
    await logActivity({ subjectType: 'RECORD', subjectId: recordId, action: 'RECEIVED', actor: `source:${p.source}`, isDemo: p.isDemo, toStatus: r.status })
  } else if (previousStatus !== r.status) {
    await logActivity({ subjectType: 'RECORD', subjectId: recordId, action: 'SOURCE_UPDATE', actor: `source:${p.source}`, isDemo: p.isDemo, fromStatus: previousStatus, toStatus: r.status })
  }

  if (!p.signal) return { ok: true, recordId, created, event: 'none' }
  const s = p.signal
  const ev = await emitEvent({
    dedupeKey: s.dedupeKey ?? `ingest:${r.ref}:${s.kind}:${r.status}`,
    companySlug: p.companySlug, domain: r.domain, kind: s.kind, subject: s.subject, summary: s.summary,
    facts: { ...(s.facts ?? {}), display: s.display ?? {} }, actionRequired: s.actionRequired ?? null,
    subjectType: 'RECORD', subjectId: recordId, isDemo: p.isDemo, occurredAt: new Date(r.occurredAt),
  })
  return { ok: true, recordId, created, event: ev.created ? 'created' : 'duplicate' }
}
