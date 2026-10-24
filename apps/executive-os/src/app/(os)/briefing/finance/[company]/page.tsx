import Link from 'next/link'
import { notFound } from 'next/navigation'
import { requireBriefingPage, canView } from '@/lib/briefing/access'
import { getBriefingMode, modeFlag } from '@/lib/briefing/mode'
import { loadFinanceRows } from '@/lib/briefing/data'
import { computeSalesMetrics, invoiceBalances } from '@/lib/briefing/metrics'
import { companyLabel } from '@/lib/briefing/types'
import { Card, DemoTag, Empty, ModeBanner, PageHeader, xaf } from '@/components/briefing/ui'

export const dynamic = 'force-dynamic'

const pct = (v: number | null) => (v === null ? 'n/a' : `${v > 0 ? '+' : ''}${v}%`)
const tone = (v: number | null) => (v === null ? 'text-delta-flat' : v < 0 ? 'text-delta-down' : 'text-delta-up')

function Tile({ label, value, delta }: { label: string; value: string; delta?: number | null }) {
  return (
    <div className="rounded-md border border-mgi-border p-3">
      <p className="text-[10px] uppercase tracking-widest text-mgi-label">{label}</p>
      <p className="mt-1 text-lg text-white">{value}</p>
      {delta !== undefined && <p className={`text-xs ${tone(delta)}`}>{pct(delta)}</p>}
    </div>
  )
}

export default async function CompanyFinance({ params }: { params: Promise<{ company: string }> }) {
  const access = await requireBriefingPage()
  const { company } = await params
  if (!/^[a-z]{2,12}$/.test(company) || !canView(access, company)) notFound()
  const isDemo = modeFlag()
  const now = new Date()
  const { orders, invoices, payments } = await loadFinanceRows(company, isDemo, new Date(now.getTime() - 70 * 86_400_000))
  if (!orders.length && !invoices.length) notFound()
  const m = computeSalesMetrics(orders, invoices, payments, now)
  const overdue = invoiceBalances(invoices, payments, now).filter((b) => b.daysOverdue > 0).sort((a, b) => b.outstanding - a.outstanding)
  const max = Math.max(1, ...m.daily.map((d) => d.amount))

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <PageHeader title={`${companyLabel(company)} — sales & receivables`} back={{ href: '/briefing/finance', label: 'Finance' }}
        subtitle={<span className="flex items-center gap-2">Source: {isDemo ? 'DEMO dataset (fictional)' : 'connected source systems'} <DemoTag show={isDemo} /></span>} />
      <ModeBanner mode={getBriefingMode()} />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Tile label="Yesterday" value={xaf(m.yesterday)} />
        <Tile label="Last 7 days vs previous 7" value={xaf(m.last7)} delta={m.weekChangePct} />
        <Tile label="Month to date vs same days last month" value={xaf(m.mtd)} delta={m.monthChangePct} />
        <Tile label="Overdue receivables" value={xaf(m.receivables.overdue)} />
      </div>

      <Card title="Daily sales — last 14 days">
        <div className="flex h-36 items-end gap-1" role="img" aria-label="Daily sales bar chart">
          {m.daily.map((d) => (
            <div key={d.date} className="flex h-full flex-1 flex-col items-center justify-end gap-1" title={`${d.date}: ${xaf(d.amount)}`}>
              <div className="w-full flex-1 flex flex-col justify-end"><div className="w-full rounded-t bg-status-build" style={{ height: `${Math.round((d.amount / max) * 100)}%`, minHeight: d.amount ? 2 : 0 }} /></div>
              <span className="text-[9px] text-mgi-label">{d.date.slice(8)}</span>
            </div>
          ))}
        </div>
        <details className="mt-2 text-xs text-mgi-muted"><summary className="cursor-pointer">Show figures</summary>
          <ul className="mt-1 grid grid-cols-2 gap-x-4 sm:grid-cols-4">{m.daily.map((d) => <li key={d.date}>{d.date}: {xaf(d.amount)}</li>)}</ul>
        </details>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Best-selling titles (30 days)">
          {m.bestTitles.length === 0 ? <Empty>No sales.</Empty> : (
            <table className="w-full text-sm text-mgi-text"><tbody>{m.bestTitles.map((t, i) => (
              <tr key={t.title} className="border-t border-mgi-border first:border-0"><td className="py-1 text-mgi-label">{i + 1}</td><td className="py-1 text-mgi-text">{t.title}</td><td className="py-1 text-right text-mgi-muted">{t.qty} copies</td><td className="py-1 text-right">{xaf(t.amount)}</td></tr>
            ))}</tbody></table>
          )}
        </Card>
        <Card title="Sales by branch (7 days vs previous 7)">
          <table className="w-full text-sm text-mgi-text"><tbody>{m.byBranch.map((b) => (
            <tr key={b.branch} className="border-t border-mgi-border first:border-0"><td className="py-1 text-mgi-text">{b.branch}</td><td className="py-1 text-right">{xaf(b.last7)}</td><td className={`py-1 text-right ${tone(b.changePct)}`}>{pct(b.changePct)}</td></tr>
          ))}</tbody></table>
          <p className="mt-2 text-[11px] text-mgi-label">Includes distributor orders booked at the branch; the alert rule looks at shop (POS) sales only.</p>
        </Card>
        <Card title="Sales by region (30 days)">
          <table className="w-full text-sm text-mgi-text"><tbody>{m.byRegion.map((r) => (
            <tr key={r.region} className="border-t border-mgi-border first:border-0"><td className="py-1 text-mgi-text">{r.region}</td><td className="py-1 text-right">{xaf(r.last30)}</td></tr>
          ))}</tbody></table>
        </Card>
        <Card title="Receivables & collections">
          <table className="w-full text-sm text-mgi-text"><tbody>
            <tr><td className="py-1 text-mgi-muted">Outstanding (all)</td><td className="py-1 text-right">{xaf(m.receivables.outstanding)}</td></tr>
            {m.receivables.aging.map((a) => <tr key={a.bucket} className="border-t border-mgi-border"><td className="py-1 text-mgi-muted">Overdue {a.bucket}</td><td className={`py-1 text-right ${a.amount ? 'text-status-attention' : ''}`}>{xaf(a.amount)}</td></tr>)}
            <tr className="border-t border-mgi-border"><td className="py-1 text-mgi-muted">Collected, 7 days</td><td className="py-1 text-right">{xaf(m.collections.last7)}</td></tr>
            <tr className="border-t border-mgi-border"><td className="py-1 text-mgi-muted">Collected, 30 days</td><td className="py-1 text-right">{xaf(m.collections.last30)}</td></tr>
          </tbody></table>
        </Card>
      </div>

      <Card title={`Overdue invoices (${overdue.length})`}>
        {overdue.length === 0 ? <Empty>No overdue invoice.</Empty> : (
          <ul className="divide-y divide-mgi-border">{overdue.map((b) => (
            <li key={b.id}><Link href={`/briefing/records/${b.id}`} className="flex flex-wrap items-center gap-2 py-2 text-sm hover:bg-white/5">
              <span className="font-mono text-[11px] text-mgi-label">{b.ref}</span><span className="flex-1 text-mgi-text">{b.customerName}</span>
              <span className="text-xs text-status-risk">{b.daysOverdue} d</span><span className="text-sm">{xaf(b.outstanding)}</span>
            </Link></li>
          ))}</ul>
        )}
      </Card>
    </div>
  )
}
