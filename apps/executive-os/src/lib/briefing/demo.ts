import { Prisma } from '@mgi/database'
import { prisma } from '@/lib/prisma'
import { buildDemoDataset, demoId } from './demo-dataset'
import { emitEvent } from './events'
import { ingest, type IngestPayload } from './ingest'
import { isDemoMode } from './mode'
import { doualaDayStart } from './rules'

// Demo reset and scenario triggers. Refuses to run unless this deployment is in demo mode,
// and only ever touches rows with isDemo = true. Scenarios go through the same ingest
// contract a real source system uses, so the demo exercises the production code path.

const DAY = 86_400_000

export class DemoDisabledError extends Error {
  constructor() { super('Demo mode is not enabled on this deployment (EXEC_DEMO_MODE=1)') }
}

function assertDemo() {
  if (!isDemoMode()) throw new DemoDisabledError()
}

async function inChunks<T>(items: T[], size: number, fn: (t: T) => Promise<unknown>) {
  for (let i = 0; i < items.length; i += size) await Promise.all(items.slice(i, i + size).map(fn))
}

/** Deletes every demo row (single DELETE statements — no transaction needed) and reseeds. */
export async function resetDemo(anchor = new Date()) {
  assertDemo()
  await prisma.$executeRaw`DELETE FROM exec_notifications WHERE "isDemo" = true`
  await prisma.$executeRaw`DELETE FROM exec_events WHERE "isDemo" = true`
  await prisma.$executeRaw`DELETE FROM exec_activities WHERE "isDemo" = true`
  await prisma.$executeRaw`DELETE FROM exec_commitments WHERE "isDemo" = true`
  await prisma.$executeRaw`DELETE FROM exec_decisions WHERE "isDemo" = true`
  await prisma.$executeRaw`DELETE FROM exec_meetings WHERE "isDemo" = true`
  await prisma.$executeRaw`DELETE FROM exec_records WHERE "isDemo" = true`

  const ds = buildDemoDataset(anchor)
  // Records and activities are the bulk (~800 rows): chunked multi-row INSERTs — each one a
  // single parameterised statement, so no transaction is needed on the Neon HTTP adapter.
  const now = new Date()
  for (let i = 0; i < ds.records.length; i += 100) {
    const rows = ds.records.slice(i, i + 100).map((r) => Prisma.sql`(${r.id}, ${r.ref}, ${r.companySlug}, ${r.domain}, ${r.recordType}, ${r.title}, ${r.summary ?? null}, ${r.status}, ${r.execStatus ?? 'NEW'}, ${r.amount ?? null}, ${r.currency ?? null}, ${r.occurredAt}, ${r.dueAt ?? null}, ${r.sourceSystem}, ${r.sourceRef ?? null}, ${r.parentRef ?? null}, ${JSON.stringify(r.data ?? {})}::jsonb, true, ${now}, ${now})`)
    await prisma.$executeRaw`INSERT INTO exec_records (id, ref, "companySlug", domain, "recordType", title, summary, status, "execStatus", amount, currency, "occurredAt", "dueAt", "sourceSystem", "sourceRef", "parentRef", data, "isDemo", "createdAt", "updatedAt") VALUES ${Prisma.join(rows)}`
  }
  await inChunks(ds.meetings, 5, (m) => prisma.execMeeting.create({ data: { ...m, isDemo: true } }))
  await inChunks(ds.decisions, 10, (d) => prisma.execDecision.create({ data: { ...d, isDemo: true } }))
  await inChunks(ds.commitments, 10, (c) => prisma.execCommitment.create({ data: { ...c, isDemo: true } }))
  for (let i = 0; i < ds.activities.length; i += 100) {
    const rows = ds.activities.slice(i, i + 100).map((a, j) => Prisma.sql`(${`demo-act-${i + j}`}, ${a.subjectType}, ${a.subjectId}, ${a.action}, ${a.fromStatus ?? null}, ${a.toStatus ?? null}, ${a.note ?? null}, ${a.actor}, true, ${a.createdAt})`)
    await prisma.$executeRaw`INSERT INTO exec_activities (id, "subjectType", "subjectId", action, "fromStatus", "toStatus", note, actor, "isDemo", "createdAt") VALUES ${Prisma.join(rows)}`
  }
  return { records: ds.records.length, meetings: ds.meetings.length, decisions: ds.decisions.length, commitments: ds.commitments.length }
}

const iso = (d: Date) => d.toISOString()

/** Scenario payloads — the shape a real NMI / Odoo / web-form integration would send. */
export function scenarioPayloads(now = new Date()): Record<string, IngestPayload[]> {
  const today = doualaDayStart(now)
  const at = (hoursAgo: number) => iso(new Date(now.getTime() - hoursAgo * 3_600_000))
  const base = { schema: 'mgi.exec.ingest.v1' as const, isDemo: true, source: 'DEMO' as const }
  return {
    piracy: [{
      ...base, companySlug: 'nmi',
      record: {
        ref: 'DEMO-NMI-PIR-0007', recordType: 'PIRACY_CASE', domain: 'PIRACY', status: 'INTAKE', occurredAt: at(2),
        title: 'Suspected counterfeit English Grammar Form 1 (DEMO) — Mokolo market, Yaoundé',
        summary: 'Three copies bought by the Yaoundé sales team failed BookShield verification (serials outside the printed range). Seller offers about 800 copies.',
        data: { verificationFailures: 3, outcome: 'over_print', suspectedCopies: 800, location: 'Mokolo market, Yaoundé', reportedBy: 'Yaoundé sales representative (DEMO)', nmiCaseStatus: 'Intake (owned by NMI BookShield — two-approver legal workflow)', evidence: ['3 photographed copies (DEMO placeholders)', 'Verification log: 3 × over_print'] },
      },
      signal: {
        kind: 'PIRACY_SUSPECTED', subject: 'Suspected piracy: English Grammar Form 1 (DEMO), ~800 copies in Yaoundé',
        summary: 'Three copies failed BookShield verification at Mokolo market. NMI has opened a BookShield case; legal steps need two approvers in NMI.',
        actionRequired: 'Decide whether to request legal review', facts: { suspectedCopies: 800 },
        display: { Title: 'English Grammar Form 1 (DEMO)', 'Failed checks': 3, 'Suspected copies': 800, Location: 'Mokolo, Yaoundé' },
      },
    }],
    'dros-inquiry': [{
      ...base, companySlug: 'dros',
      record: {
        ref: 'DEMO-DROS-INQ-0021', recordType: 'CONSTRUCTION_INQUIRY', domain: 'INQUIRY', status: 'NEW', occurredAt: at(1), amount: 180_000_000, currency: 'XAF',
        title: 'R+3 residential building, Bonamoussadi, Douala (DEMO) — site visit requested',
        summary: 'Prospective client (DEMO) owns the plot and has a building permit; asks for a site visit this week and an indicative quotation.',
        dueAt: iso(new Date(today.getTime() + 2 * DAY)),
        data: { requestedBy: 'Prospective client (DEMO) — no contact details stored', channel: 'info@ mailbox (simulated)', projectType: 'Residential, 4 levels', plot: 'Bonamoussadi, Douala', requests: ['Site visit', 'Indicative quotation'], responseDeadline: '48 h (resolution DEMO-MGI-RES-2026-10-04)' },
      },
      signal: {
        kind: 'CONSTRUCTION_INQUIRY', subject: 'New DROS inquiry: R+3 building in Bonamoussadi, est. 180 M XAF',
        summary: 'Client has a permit and requests a site visit this week. The 48-hour response rule applies.',
        actionRequired: 'Confirm who leads the site visit', facts: { estimatedValue: 180_000_000 },
        display: { 'Estimated value': '180 000 000 XAF', Request: 'Site visit + quotation', 'Respond by': '48 hours' },
      },
    }],
    approval: [{
      ...base, companySlug: 'mgi',
      record: {
        ref: 'DEMO-MGI-APR-0031', recordType: 'APPROVAL_REQUEST', domain: 'GOVERNANCE', status: 'PENDING', occurredAt: at(3), amount: 2_400_000, currency: 'XAF',
        title: 'Odoo partner support contract — barcode POS posting fix (DEMO)',
        summary: '6-month support contract with an Odoo partner (DEMO) to fix barcode POS → accounting posting at the Douala shop. Blocks commitment DEMO-MGI-CMT-RES02.',
        data: { requestedBy: 'Group IT Lead (DEMO)', supplier: 'Odoo partner (DEMO)', duration: '6 months', unblocksCommitmentRef: 'DEMO-MGI-CMT-RES02', budgetLine: 'Group IT (DEMO)' },
      },
      signal: {
        kind: 'APPROVAL_REQUEST', subject: 'Approval needed: Odoo POS support contract, 2.4 M XAF',
        summary: 'Requested by the Group IT Lead. Resolution RES-2026-10-02 (barcode POS posting) is blocked until this is decided.',
        actionRequired: 'Approve or decline', display: { Amount: '2 400 000 XAF', Requested: 'Group IT Lead (DEMO)', Unblocks: 'DEMO-MGI-CMT-RES02' },
      },
    }],
    'pos-sync-failure': [{
      ...base, companySlug: 'nmi',
      record: {
        ref: 'DEMO-NMI-SYNC-0102', recordType: 'SYNC_FAILURE', domain: 'OPERATIONS', status: 'OPEN', occurredAt: at(0.5),
        title: 'Douala shop: 14 barcode POS tickets not posted to accounting (DEMO)',
        summary: 'Simulated Odoo POS → accounting sync failure since 07:40. Shop figures for today are incomplete until it is fixed.',
        data: { system: 'Odoo POS (simulated — no Odoo connection exists in this demo)', unpostedTickets: 14, since: '07:40', branch: 'Douala branch (DEMO)' },
      },
      signal: {
        kind: 'OPERATIONAL_FAILURE', subject: 'POS sync failure: 14 Douala tickets not in accounting',
        summary: 'Today’s Douala shop figures are incomplete. IT lead notified.',
        actionRequired: 'None unless it lasts past 12:00', facts: { unpostedTickets: 14 },
        display: { Branch: 'Douala (DEMO)', 'Unposted tickets': 14, Since: '07:40' },
      },
    }],
    competitor: [{
      ...base, companySlug: 'nmi',
      record: {
        ref: 'DEMO-NMI-MKT-0003', recordType: 'COMPETITOR_SIGNAL', domain: 'MARKET', status: 'REPORTED', occurredAt: at(20),
        title: 'Competitor publisher (DEMO) launches a Form 1 English series 15% cheaper',
        summary: 'Reported by two distributors. Launch planned for January; overlaps English Grammar Form 1 (DEMO).',
        data: { source: 'Distributor feedback (DEMO)', affectedTitle: 'English Grammar Form 1 (DEMO)', pricePositioning: '−15%' },
      },
      signal: { kind: 'COMPETITOR_SIGNAL', subject: 'Competitor Form 1 English series, 15% cheaper, January launch', summary: 'Two distributors report it. Overlaps our best seller in Yaoundé.', display: { Affects: 'English Grammar Form 1 (DEMO)', Price: '−15%' } },
    }],
    'digital-licensing': [{
      ...base, companySlug: 'nmi',
      record: {
        ref: 'DEMO-NMI-INQ-0009', recordType: 'BUSINESS_INQUIRY', domain: 'PUBLISHING', status: 'NEW', occurredAt: at(6),
        title: 'E-learning platform (DEMO) asks to license 6 titles digitally',
        summary: 'Proposal: per-student annual licence for 6 secondary titles. Royalty and DRM terms to be discussed.',
        data: { counterpart: 'E-learning platform (DEMO)', titles: 6, model: 'Per-student annual licence' },
      },
      signal: { kind: 'BUSINESS_INQUIRY', subject: 'Digital licensing inquiry for 6 NMI titles', summary: 'Per-student annual licence proposed. Royalty/DRM terms open.', display: { Titles: 6, Model: 'Annual licence per student' } },
    }],
    distributor: [{
      ...base, companySlug: 'nmi',
      record: {
        ref: 'DEMO-NMI-CUS-SAVANNAH', recordType: 'CUSTOMER', domain: 'DISTRIBUTION', status: 'CREDIT_REVIEW', occurredAt: '2025-09-14T09:00:00.000Z',
        title: 'Savannah Books Distribution (DEMO)', summary: 'Requested a credit limit increase to 8 M XAF and 60-day terms while invoice 0412 is overdue.',
        data: { type: 'Distributor', city: 'Garoua', region: 'North', creditLimit: 6_000_000, requestedCreditLimit: 8_000_000, requestedTerms: '60 days' },
      },
      signal: { kind: 'DISTRIBUTOR_UPDATE', subject: 'Savannah Books asks for 8 M XAF credit and 60-day terms', summary: 'Request arrives while invoice 0412 is 38 days overdue.', display: { 'Current limit': '6 000 000 XAF', Requested: '8 000 000 XAF' } },
    }],
    'dros-quotation': [{
      ...base, companySlug: 'dros',
      record: {
        ref: 'DEMO-DROS-QUO-0015', recordType: 'QUOTATION', domain: 'INQUIRY', status: 'SENT', occurredAt: at(24 * 6), amount: 42_500_000, currency: 'XAF',
        dueAt: iso(new Date(today.getTime() + DAY)), title: 'Quotation 0015 — school classroom block, Yaoundé (DEMO)',
        summary: 'Sent 6 days ago; client promised an answer by tomorrow.', data: { client: 'Private school (DEMO)', validity: '30 days' },
      },
      signal: { kind: 'QUOTATION_FOLLOW_UP', subject: 'Quotation 0015 (42.5 M XAF) — client answer due tomorrow', summary: 'Follow-up call planned by DROS commercial lead.', display: { Value: '42 500 000 XAF' } },
    }],
    registrations: ['0105', '0106', '0107'].map((no, i) => ({
      ...base, companySlug: 'rogers',
      record: {
        ref: `DEMO-RGR-REG-${no}`, recordType: 'REGISTRATION' as const, domain: 'PROGRAMME' as const, status: 'CONFIRMED', occurredAt: at(3 + i), amount: 50_000, currency: 'XAF',
        title: `${['Men On Duty', "Dominion Life Men's Conference", 'CEO On Mission'][i]} — registrant #${no} (DEMO)`,
        data: { programme: ['Men On Duty', "Dominion Life Men's Conference", 'CEO On Mission'][i], payment: 'Paid (simulated)', channel: 'Website form (simulated)' },
      },
      signal: { kind: 'PROGRAMME_REGISTRATION' as const, subject: `New registration: ${['Men On Duty', "Dominion Life Men's Conference", 'CEO On Mission'][i]} (#${no})`, summary: 'Payment confirmed (simulated).' },
    })),
  }
}

export const SCENARIOS = [
  { key: 'piracy', label: 'Suspected book piracy (BookShield)', expect: 'HIGH alert' },
  { key: 'dros-inquiry', label: 'New DROS construction inquiry', expect: 'HIGH alert' },
  { key: 'approval', label: 'Approval request blocking a commitment', expect: 'HIGH alert' },
  { key: 'pos-sync-failure', label: 'Barcode POS → Odoo sync failure', expect: 'CRITICAL alert (also Operations group)' },
  { key: 'competitor', label: 'Competitor development', expect: 'Digest' },
  { key: 'digital-licensing', label: 'Digital licensing inquiry', expect: 'Digest' },
  { key: 'distributor', label: 'Distributor credit request', expect: 'Digest' },
  { key: 'dros-quotation', label: 'DROS quotation follow-up', expect: 'Digest' },
  { key: 'registrations', label: 'Programme registrations (3)', expect: 'Digest' },
  { key: 'minutes', label: 'October meeting minutes published', expect: 'Digest' },
] as const

export async function triggerScenario(key: string, now = new Date()) {
  assertDemo()
  if (key === 'minutes') {
    const id = demoId('DEMO-MGI-MTG-2026-10')
    const r = await emitEvent({
      dedupeKey: `minutes-published:${id}`, companySlug: 'mgi', domain: 'GOVERNANCE', kind: 'MEETING_RESOLUTION', isDemo: true,
      subject: 'Minutes published: October coordination meeting (4 resolutions)', summary: '4 resolutions, 4 owners. One commitment is already overdue.',
      subjectType: 'MEETING', subjectId: id, occurredAt: now,
    })
    return [{ ok: true, event: r.created ? 'created' : 'duplicate' }]
  }
  const payloads = scenarioPayloads(now)[key]
  if (!payloads) throw new Error('Unknown scenario')
  const out = []
  for (const p of payloads) out.push(await ingest(p, true))
  return out
}
