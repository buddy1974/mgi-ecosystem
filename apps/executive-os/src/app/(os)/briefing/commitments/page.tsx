import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { requireBriefingPage, companyFilter } from '@/lib/briefing/access'
import { getBriefingMode, modeFlag } from '@/lib/briefing/mode'
import { deliveryStats, isOverdue } from '@/lib/briefing/accountability'
import { companyLabel, DELAY_CAUSE_LABEL, type DelayCause } from '@/lib/briefing/types'
import { BriefingNav, Card, CompanyChip, DemoTag, Empty, ModeBanner, PageHeader, StatusBadge, fmtDate } from '@/components/briefing/ui'

export const dynamic = 'force-dynamic'

const DAY = 86_400_000

export default async function CommitmentsPage() {
  const access = await requireBriefingPage()
  const isDemo = modeFlag()
  const now = new Date()
  const list = await prisma.execCommitment.findMany({ where: { isDemo, ...companyFilter(access) }, orderBy: { dueAt: 'asc' } })
  const stats = deliveryStats(list, now)
  const active = list.filter((c) => !['ACCEPTED', 'CANCELLED'].includes(c.status))
  const done = list.filter((c) => c.status === 'ACCEPTED').reverse()
  const mode = getBriefingMode()

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <PageHeader title="Committed vs Delivered" subtitle="Agreed deliverables, due dates and evidence — not activity tracking" />
      <ModeBanner mode={mode} />
      <BriefingNav current="/briefing/commitments" showDemo={mode === 'demo' && access.user.globalRole === 'SUPER_ADMIN'} />

      <Card title="Open commitments">
        {active.length === 0 ? <Empty>No open commitments.</Empty> : (
          <ul className="divide-y divide-mgi-border">
            {active.map((c) => {
              const late = isOverdue(c, now)
              return (
                <li key={c.id}>
                  <Link href={`/briefing/commitments/${c.id}`} className="flex flex-col gap-1 py-2 hover:bg-white/5 md:flex-row md:items-center md:gap-3">
                    <span className="flex-1 text-sm text-mgi-text">{c.title}</span>
                    <span className="flex flex-wrap items-center gap-2 text-xs">
                      <CompanyChip slug={c.companySlug} />
                      <span className="text-mgi-muted">{c.ownerRole}</span>
                      <span className={late ? 'text-status-risk' : 'text-mgi-muted'}>due {fmtDate(c.dueAt)}{late && ` · ${Math.max(1, Math.floor((now.getTime() - c.dueAt.getTime()) / DAY))} d late`}</span>
                      <span className="w-10 text-right text-mgi-muted">{c.progress}%</span>
                      <StatusBadge status={c.status} />
                      <DemoTag show={c.isDemo} />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </Card>

      <Card title="Delivery record by owner">
        {stats.length === 0 ? <Empty>No commitments recorded yet.</Empty> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm text-mgi-text">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-widest text-mgi-label">
                  <th className="py-1">Owner</th><th className="py-1">Company</th><th className="py-1 text-right">Total</th><th className="py-1 text-right">On time</th>
                  <th className="py-1 text-right">Late</th><th className="py-1 text-right">Overdue</th><th className="py-1 text-right">Owner-caused delays</th><th className="py-1 text-right">Systemic delays</th><th className="py-1 text-right">On-time rate</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((s) => (
                  <tr key={`${s.companySlug}${s.ownerRole}${s.ownerName}`} className="border-t border-mgi-border">
                    <td className="py-1.5 text-mgi-text">{s.ownerRole}</td><td className="py-1.5 text-mgi-muted">{companyLabel(s.companySlug)}</td>
                    <td className="py-1.5 text-right">{s.total}</td><td className="py-1.5 text-right text-status-active">{s.deliveredOnTime}</td>
                    <td className="py-1.5 text-right text-status-attention">{s.deliveredLate}</td><td className="py-1.5 text-right text-status-risk">{s.overdueOpen}</td>
                    <td className="py-1.5 text-right">{s.ownerAttributableDelays}</td><td className="py-1.5 text-right text-mgi-muted">{s.systemicDelays}</td>
                    <td className="py-1.5 text-right">{s.onTimeRate === null ? '—' : `${s.onTimeRate}%`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="mt-2 text-[11px] text-mgi-label">
          Systemic delays are those recorded as: {(['RESOURCES', 'PRIORITY_CHANGE', 'MANAGEMENT_DEPENDENCY', 'EXTERNAL'] as DelayCause[]).map((c) => DELAY_CAUSE_LABEL[c].toLowerCase()).join(', ')}.
          They point to the organisation, not the person. No attendance, presence or device data is collected.
        </p>
      </Card>

      <Card title={`Accepted (${done.length})`}>
        {done.length === 0 ? <Empty>None yet.</Empty> : (
          <ul className="divide-y divide-mgi-border">
            {done.map((c) => (
              <li key={c.id}><Link href={`/briefing/commitments/${c.id}`} className="flex flex-wrap items-center gap-2 py-2 text-sm hover:bg-white/5">
                <span className="flex-1 text-mgi-text">{c.title}</span><span className="text-xs text-mgi-muted">{c.ownerRole} · due {fmtDate(c.dueAt)} · delivered {fmtDate(c.deliveredAt)}</span>
                <StatusBadge status={c.deliveredAt && c.deliveredAt > c.dueAt ? 'LATE' : 'ON TIME'} tone={c.deliveredAt && c.deliveredAt > c.dueAt ? 'attention' : 'active'} />
              </Link></li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
