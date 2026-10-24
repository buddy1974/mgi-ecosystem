import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { requireBriefingPage, companyFilter, canView } from '@/lib/briefing/access'
import { getBriefingMode, modeFlag } from '@/lib/briefing/mode'
import { companyMetrics, financeCompanies } from '@/lib/briefing/data'
import { subjectPath } from '@/lib/briefing/links'
import type { SubjectType } from '@/lib/briefing/types'
import { companyLabel } from '@/lib/briefing/types'
import { BriefingNav, Card, CompanyChip, DemoTag, Empty, ModeBanner, PageHeader, PriorityBadge, StatusBadge, fmtDate, fmtDateTime, xaf } from '@/components/briefing/ui'

export const dynamic = 'force-dynamic'

const DAY = 86_400_000
const pct = (v: number | null) => (v === null ? 'n/a' : `${v > 0 ? '+' : ''}${v}%`)

function Row({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="flex flex-wrap items-center gap-2 rounded-md px-2 py-2 text-sm text-mgi-text hover:bg-white/5">
        {children}
      </Link>
    </li>
  )
}

export default async function BriefingOverview() {
  const access = await requireBriefingPage()
  const isDemo = modeFlag()
  const mode = getBriefingMode()
  const now = new Date()
  const scope = companyFilter(access)

  const [records, commitments, events, outbox] = await Promise.all([
    prisma.execRecord.findMany({ where: { isDemo, ...scope, execStatus: { not: 'CLOSED' }, recordType: { notIn: ['ORDER', 'INVOICE', 'PAYMENT', 'CUSTOMER', 'PRODUCT', 'STOCK_MOVEMENT', 'STOCK_LEVEL'] } }, orderBy: { occurredAt: 'desc' } }),
    prisma.execCommitment.findMany({ where: { isDemo, ...scope, status: { in: ['OPEN', 'IN_PROGRESS', 'BLOCKED', 'DELIVERED'] } }, orderBy: { dueAt: 'asc' } }),
    prisma.execEvent.findMany({ where: { isDemo, ...scope }, orderBy: { createdAt: 'desc' }, take: 12 }),
    access.user.globalRole === 'SUPER_ADMIN'
      ? prisma.execNotification.groupBy({ by: ['status'], where: { isDemo, createdAt: { gte: new Date(now.getTime() - DAY) } }, _count: { _all: true } })
      : Promise.resolve([]),
  ])
  const finance = (await financeCompanies(isDemo)).filter((c) => canView(access, c))
  const metrics = await Promise.all(finance.map(async (c) => [c, await companyMetrics(c, isDemo, now)] as const))

  const approvals = records.filter((r) => r.recordType === 'APPROVAL_REQUEST' && r.status === 'PENDING')
  const blocked = commitments.filter((c) => c.status === 'BLOCKED' && c.delayCause === 'MANAGEMENT_DEPENDENCY')
  const toAccept = commitments.filter((c) => c.status === 'DELIVERED')
  const overdue = commitments.filter((c) => c.dueAt < now && c.status !== 'DELIVERED')
  const opportunities = records.filter((r) => ['CONSTRUCTION_INQUIRY', 'BUSINESS_INQUIRY', 'QUOTATION'].includes(r.recordType))
  const risks = records.filter((r) => ['PIRACY_CASE', 'COMPETITOR_SIGNAL'].includes(r.recordType))
  const exceptions = records.filter((r) => ['SYNC_FAILURE', 'PRINT_JOB', 'PROJECT', 'STOCK_EXCEPTION'].includes(r.recordType))
  const companies = [...new Set([...records.map((r) => r.companySlug), ...commitments.map((c) => c.companySlug), ...finance])].sort()

  const evLink = (e: { subjectType: string; subjectId: string }) => {
    try { return subjectPath(e.subjectType as SubjectType, e.subjectId) } catch { return '/briefing' }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <PageHeader title="Executive Briefing Centre" subtitle={`${fmtDate(now)} · ${mode === 'demo' ? 'Demo data' : 'Live data'}`} />
      <ModeBanner mode={mode} />
      <BriefingNav current="/briefing" showDemo={mode === 'demo' && access.user.globalRole === 'SUPER_ADMIN'} />

      {access.companies !== '*' && access.companies.length === 0 && (
        <Card><Empty>Your account has no company membership, so no briefing content is visible. Ask the administrator.</Empty></Card>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title={`Waiting for your decision (${approvals.length + blocked.length + toAccept.length})`}>
          {approvals.length + blocked.length + toAccept.length === 0 ? <Empty>Nothing is waiting for you.</Empty> : (
            <ul className="-mx-2">
              {approvals.map((r) => <Row key={r.id} href={`/briefing/records/${r.id}`}><StatusBadge status="APPROVE?" tone="attention" /><span className="flex-1">{r.title}</span><span className="text-xs text-mgi-muted">{xaf(r.amount)}</span><DemoTag show={r.isDemo} /></Row>)}
              {blocked.map((c) => <Row key={c.id} href={`/briefing/commitments/${c.id}`}><StatusBadge status="BLOCKED" /><span className="flex-1">{c.title}</span><span className="text-xs text-mgi-muted">{c.ownerRole}</span></Row>)}
              {toAccept.map((c) => <Row key={c.id} href={`/briefing/commitments/${c.id}`}><StatusBadge status="DELIVERED" /><span className="flex-1">Accept? {c.title}</span><span className="text-xs text-mgi-muted">{c.ownerRole}</span></Row>)}
            </ul>
          )}
        </Card>

        <Card title={`Overdue commitments (${overdue.length})`} action={<Link href="/briefing/commitments" className="text-xs text-mgi-muted hover:text-white">Committed vs delivered →</Link>}>
          {overdue.length === 0 ? <Empty>No commitment is past its due date.</Empty> : (
            <ul className="-mx-2">
              {overdue.map((c) => (
                <Row key={c.id} href={`/briefing/commitments/${c.id}`}>
                  <span className="flex-1">{c.title}</span>
                  <span className="text-xs text-status-risk">{Math.max(1, Math.floor((now.getTime() - c.dueAt.getTime()) / DAY))} d late</span>
                  <span className="text-xs text-mgi-muted">{c.ownerRole} · {c.progress}%</span>
                </Row>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card title="Company performance" action={<Link href="/briefing/finance" className="text-xs text-mgi-muted hover:text-white">Finance →</Link>}>
        {metrics.length === 0 ? <Empty>{access.companies !== '*' ? 'No finance figures for the companies your account can see.' : mode === 'live' ? 'No sales source is connected yet (NMI / Odoo connectors pending) — no figures are shown rather than estimates.' : 'No demo finance records — reset the demo.'}</Empty> : (
          <div className="grid gap-3 md:grid-cols-2">
            {metrics.map(([c, m]) => m && (
              <Link key={c} href={`/briefing/finance/${c}`} className="block rounded-md border border-mgi-border p-3 hover:bg-white/5">
                <div className="mb-2 flex items-center gap-2"><span className="text-sm font-medium text-white">{companyLabel(c)}</span>{isDemo && <DemoTag show />}</div>
                <dl className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                  <div><dt className="text-mgi-label">Yesterday</dt><dd className="text-mgi-text">{xaf(m.yesterday)}</dd></div>
                  <div><dt className="text-mgi-label">7 days</dt><dd className="text-mgi-text">{xaf(m.last7)} <span className={m.weekChangePct !== null && m.weekChangePct < 0 ? 'text-delta-down' : 'text-delta-up'}>{pct(m.weekChangePct)}</span></dd></div>
                  <div><dt className="text-mgi-label">Overdue receivables</dt><dd className="text-status-attention">{xaf(m.receivables.overdue)}</dd></div>
                  <div><dt className="text-mgi-label">Collected 7 days</dt><dd className="text-mgi-text">{xaf(m.collections.last7)}</dd></div>
                </dl>
              </Link>
            ))}
          </div>
        )}
        <p className="mt-2 text-[11px] text-mgi-label">Figures are per company and never added across companies.</p>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title={`Opportunities (${opportunities.length})`}>
          {opportunities.length === 0 ? <Empty>No open inquiries.</Empty> : <ul className="-mx-2">{opportunities.map((r) => <Row key={r.id} href={`/briefing/records/${r.id}`}><CompanyChip slug={r.companySlug} /><span className="flex-1">{r.title}</span></Row>)}</ul>}
        </Card>
        <Card title={`Risks & market (${risks.length})`}>
          {risks.length === 0 ? <Empty>No open risk.</Empty> : <ul className="-mx-2">{risks.map((r) => <Row key={r.id} href={`/briefing/records/${r.id}`}><StatusBadge status={r.recordType === 'PIRACY_CASE' ? 'PIRACY' : 'MARKET'} tone={r.recordType === 'PIRACY_CASE' ? 'risk' : 'build'} /><span className="flex-1">{r.title}</span></Row>)}</ul>}
        </Card>
        <Card title={`Operational exceptions (${exceptions.length})`}>
          {exceptions.length === 0 ? <Empty>No open exception.</Empty> : <ul className="-mx-2">{exceptions.map((r) => <Row key={r.id} href={`/briefing/records/${r.id}`}><CompanyChip slug={r.companySlug} /><span className="flex-1">{r.title}</span></Row>)}</ul>}
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Latest events">
          {events.length === 0 ? <Empty>No events yet.</Empty> : (
            <ul className="-mx-2">
              {events.map((e) => (
                <Row key={e.id} href={evLink(e)}>
                  <PriorityBadge priority={e.priority} />
                  <span className="min-w-0 flex-1">{e.subject}</span>
                  <span className="w-full pl-1 text-[11px] text-mgi-label">{e.routing === 'ALERT' ? 'sent as alert' : e.routing === 'DIGEST' ? 'in digest' : 'queued'} · {fmtDateTime(e.createdAt)}</span>
                </Row>
              ))}
            </ul>
          )}
        </Card>
        <Card title="Companies">
          <ul className="space-y-1 text-sm">
            {companies.map((c) => {
              const n = records.filter((r) => r.companySlug === c && r.execStatus === 'NEW').length
              const late = overdue.filter((k) => k.companySlug === c).length
              return (
                <li key={c} className="flex items-center justify-between gap-2">
                  <Link href={`/briefing/records?company=${c}`} className="text-mgi-text hover:underline">{companyLabel(c)}</Link>
                  <span className="text-xs text-mgi-muted">{n} new · {late} overdue</span>
                </li>
              )
            })}
            {companies.length === 0 && <Empty>No companies with briefing content.</Empty>}
          </ul>
        </Card>
        {access.user.globalRole === 'SUPER_ADMIN' && (
          <Card title="Telegram delivery (24 h)" action={<Link href="/briefing/notifications" className="text-xs text-mgi-muted hover:text-white">Outbox →</Link>}>
            {outbox.length === 0 ? <Empty>No notifications in the last 24 hours.</Empty> : (
              <ul className="space-y-1 text-sm">
                {outbox.map((o) => <li key={o.status} className="flex justify-between"><StatusBadge status={o.status} /><span className="text-mgi-text">{o._count._all}</span></li>)}
              </ul>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
