import { prisma } from '@/lib/prisma'
import { companyMetrics, financeCompanies } from './data'
import { pendingDigestEvents, markDigested } from './dispatch'
import { isUniqueViolation } from './events'
import { buildMorningBrief, bullet, formatXaf, type BriefSection } from './format'
import { absoluteLink, subjectPath } from './links'
import { RECIPIENTS } from './recipients'
import { doualaDate } from './rules'
import { companyLabel, type SubjectType } from './types'

// Morning executive brief — one message, built from persisted records only. Live-module
// counts (approvals, venture reports) are added in live mode; demo mode never reads them.

const DAY = 86_400_000

const pct = (v: number | null) => (v === null ? 'n/a' : `${v > 0 ? '+' : ''}${v}%`)

export async function composeMorningBrief(isDemo: boolean, now = new Date(), env: NodeJS.ProcessEnv = process.env) {
  const link = (t: SubjectType, id: string) => absoluteLink(subjectPath(t, id), env)
  const sections: BriefSection[] = []
  const open = { isDemo, execStatus: { not: 'CLOSED' } }

  // Group overview — open items per company (counts only; amounts are never summed across companies).
  const [records, commitments] = await Promise.all([
    prisma.execRecord.findMany({ where: { ...open, recordType: { notIn: ['ORDER', 'INVOICE', 'PAYMENT', 'CUSTOMER', 'PRODUCT', 'STOCK_MOVEMENT', 'STOCK_LEVEL'] } } }),
    prisma.execCommitment.findMany({ where: { isDemo, status: { in: ['OPEN', 'IN_PROGRESS', 'BLOCKED', 'DELIVERED'] } }, orderBy: { dueAt: 'asc' } }),
  ])
  const companies = [...new Set([...records.map((r) => r.companySlug), ...commitments.map((c) => c.companySlug)])].sort()
  sections.push({
    title: 'Group overview',
    lines: companies.map((c) => {
      const items = records.filter((r) => r.companySlug === c && r.execStatus === 'NEW').length
      const late = commitments.filter((k) => k.companySlug === c && k.dueAt < now && k.status !== 'DELIVERED').length
      return bullet(`${companyLabel(c)}: ${items} new item${items === 1 ? '' : 's'}${late ? ` · ${late} overdue commitment${late === 1 ? '' : 's'}` : ''}`)
    }),
  })

  // Company performance (per company).
  const perf: string[] = []
  for (const c of await financeCompanies(isDemo)) {
    const m = await companyMetrics(c, isDemo, now)
    if (!m) continue
    perf.push(bullet(`${companyLabel(c)} — yesterday ${formatXaf(m.yesterday)} · 7 days ${formatXaf(m.last7)} (${pct(m.weekChangePct)} w/w) · month to date ${formatXaf(m.mtd)} (${pct(m.monthChangePct)})`, link('FINANCE', c)))
    perf.push(bullet(`${companyLabel(c)} — receivables overdue ${formatXaf(m.receivables.overdue)} on ${m.receivables.overdueCount} invoice(s) · collected 7 days ${formatXaf(m.collections.last7)}`, link('FINANCE', c)))
  }
  sections.push({ title: 'Company performance', lines: perf })

  // Pending executive actions.
  const approvals = records.filter((r) => r.recordType === 'APPROVAL_REQUEST' && r.status === 'PENDING')
  const toAccept = commitments.filter((k) => k.status === 'DELIVERED')
  const blockedOnMgmt = commitments.filter((k) => k.status === 'BLOCKED' && k.delayCause === 'MANAGEMENT_DEPENDENCY')
  sections.push({
    title: 'Waiting for your decision',
    lines: [
      ...approvals.map((r) => bullet(`Approve/decline: ${r.title}${r.amount ? ` (${formatXaf(r.amount)})` : ''}`, link('RECORD', r.id))),
      ...blockedOnMgmt.map((k) => bullet(`Blocked on management: ${k.title} — ${k.ownerRole}`, link('COMMITMENT', k.id))),
      ...toAccept.map((k) => bullet(`Delivered, awaiting acceptance: ${k.title} — ${k.ownerRole}`, link('COMMITMENT', k.id))),
    ],
  })

  sections.push({
    title: 'Overdue commitments',
    lines: commitments.filter((k) => k.dueAt < now && k.status !== 'DELIVERED').map((k) =>
      bullet(`${k.title} — ${k.ownerRole}, ${Math.floor((now.getTime() - k.dueAt.getTime()) / DAY)} days late, ${k.progress}%`, link('COMMITMENT', k.id))),
  })

  const recent = new Date(now.getTime() - 14 * DAY)
  sections.push({
    title: 'New business opportunities',
    lines: records.filter((r) => ['CONSTRUCTION_INQUIRY', 'BUSINESS_INQUIRY'].includes(r.recordType) && r.occurredAt >= recent)
      .map((r) => bullet(`${companyLabel(r.companySlug)}: ${r.title}${r.amount ? ` (est. ${formatXaf(r.amount)})` : ''}`, link('RECORD', r.id))),
  })

  sections.push({
    title: 'Operational exceptions',
    lines: records.filter((r) => ['SYNC_FAILURE', 'STOCK_EXCEPTION', 'PRINT_JOB', 'PROJECT'].includes(r.recordType))
      .map((r) => bullet(`${companyLabel(r.companySlug)}: ${r.title}`, link('RECORD', r.id))),
  })

  sections.push({
    title: 'Risks & market intelligence',
    lines: records.filter((r) => r.recordType === 'PIRACY_CASE' || (r.recordType === 'COMPETITOR_SIGNAL' && r.occurredAt >= recent))
      .map((r) => bullet(`${r.recordType === 'PIRACY_CASE' ? 'Suspected piracy' : 'Market'}: ${r.title}`, link('RECORD', r.id))),
  })

  const regs = await prisma.execRecord.findMany({ where: { isDemo, recordType: 'REGISTRATION', occurredAt: { gte: new Date(now.getTime() - DAY) } } })
  if (regs.length) {
    const confirmed = regs.filter((r) => r.status === 'CONFIRMED').length
    sections.push({ title: 'Programmes (last 24 h)', lines: [bullet(`${regs.length} registration(s), ${confirmed} confirmed`, absoluteLink('/briefing/records?type=REGISTRATION', env))] })
  }

  if (!isDemo) {
    // Live modules that already exist in the OS.
    const [pendingApprovals, newReports] = await Promise.all([
      prisma.approval.count({ where: { status: 'PENDING' } }),
      prisma.ventureReport.count({ where: { status: 'new' } }),
    ])
    sections.push({ title: 'Other OS modules', lines: [
      bullet(`${pendingApprovals} approval(s) pending in the Approval Center`, absoluteLink('/approvals', env)),
      bullet(`${newReports} new venture report(s) in the Ops Bridge`, absoluteLink('/operations', env)),
    ] })
  }

  const digest = await pendingDigestEvents(isDemo)
  if (digest.length) {
    sections.push({ title: `Routine updates since the last brief (${digest.length})`, lines: digest.slice(0, 8).map((e) => bullet(e.subject, (() => { try { return absoluteLink(subjectPath(e.subjectType as SubjectType, e.subjectId), env) } catch { return null } })())) })
  }

  const dateLabel = new Date(now.getTime() + 3_600_000).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
  const text = buildMorningBrief({ dateLabel, sections, isDemo, overviewLink: absoluteLink('/briefing', env) })
  return { text, digestEventIds: digest.map((e) => e.id), sections }
}

/** Enqueues today's brief for each brief recipient. `replay` allows a second brief on demo resets. */
export async function enqueueMorningBrief(isDemo: boolean, now = new Date(), env: NodeJS.ProcessEnv = process.env, replay = false) {
  const { text, digestEventIds } = await composeMorningBrief(isDemo, now, env)
  let created = 0
  for (const r of RECIPIENTS.filter((x) => x.morningBrief)) {
    const key = `${isDemo ? 'demo' : 'live'}:morning:${r.key}:${doualaDate(now)}${replay ? `:replay-${now.getTime()}` : ''}`
    if (await prisma.execNotification.findUnique({ where: { dedupeKey: key }, select: { id: true } })) continue
    try {
      await prisma.execNotification.create({
        data: { dedupeKey: key, kind: 'MORNING_BRIEF', recipient: r.key, eventIds: digestEventIds, text, linkUrl: absoluteLink('/briefing', env), isDemo },
      })
      created++
    } catch (err) {
      if (!isUniqueViolation(err)) throw err
    }
  }
  if (created) await markDigested(digestEventIds, now)
  return { created, text }
}
