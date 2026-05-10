import { KpiCard } from './KpiCard'
import type { NmiKpis } from '@/lib/nmi-bridge'

interface KpiRowProps {
  openApprovals: number
  nmiKpis: NmiKpis | null
}

export function KpiRow({ openApprovals, nmiKpis }: KpiRowProps) {
  const nmiConnected = nmiKpis !== null

  return (
    <div className="grid grid-cols-4 gap-4">
      <KpiCard
        label="Ecosystem ARR"
        value="–"
        sub="Connect billing to show"
      />
      <KpiCard
        label="Cash Runway"
        value="–"
        sub="Connect finance to show"
      />
      <KpiCard
        label="Open Approvals"
        value={openApprovals}
        delta={openApprovals > 0 ? `${openApprovals} awaiting your decision` : undefined}
        deltaPositive={false}
      />
      <KpiCard
        label="NMI Orders Today"
        value={nmiConnected ? (nmiKpis?.ordersToday ?? 0) : '–'}
        sub={nmiConnected ? undefined : 'NMI not connected'}
        delta={nmiConnected && nmiKpis?.openInvoices ? `${nmiKpis.openInvoices} open invoices` : undefined}
        deltaPositive={false}
      />
    </div>
  )
}
