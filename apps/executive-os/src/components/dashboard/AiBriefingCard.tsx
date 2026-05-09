import type { NmiKpis } from '@/lib/nmi-bridge'

interface AiBriefingCardProps {
  nmiKpis: NmiKpis | null
  openApprovals: number
  aiBriefing?: string | null
}

function generateFallbackBriefing(nmiKpis: NmiKpis | null, openApprovals: number): string {
  const items: string[] = []
  if (openApprovals > 0)
    items.push(`${openApprovals} approval${openApprovals > 1 ? 's' : ''} waiting for your decision`)
  if (nmiKpis) {
    if (nmiKpis.overdueInvoices > 0)
      items.push(`${nmiKpis.overdueInvoices} overdue invoice${nmiKpis.overdueInvoices > 1 ? 's' : ''} at NMI Education need follow-up`)
    if (nmiKpis.stockAlerts > 0)
      items.push(`${nmiKpis.stockAlerts} NMI stock items below minimum threshold`)
    if (nmiKpis.unhandledWhatsApp > 0)
      items.push(`${nmiKpis.unhandledWhatsApp} unhandled WhatsApp messages at NMI`)
    if (nmiKpis.ordersToday > 0)
      items.push(`${nmiKpis.ordersToday} new order${nmiKpis.ordersToday > 1 ? 's' : ''} at NMI Education today`)
  }
  if (items.length === 0) return 'All systems nominal. No urgent items require your attention today.'
  if (items.length === 1) return `${items[0]}. All other systems nominal.`
  return `${items.length} items need your attention: ${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}.`
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-widest text-mgi-label">{label}</span>
      <span className="text-lg font-bold text-white tabular-nums">{value}</span>
    </div>
  )
}

export function AiBriefingCard({ nmiKpis, openApprovals, aiBriefing }: AiBriefingCardProps) {
  const count = [
    openApprovals > 0,
    (nmiKpis?.overdueInvoices ?? 0) > 0,
    (nmiKpis?.stockAlerts ?? 0) > 0,
  ].filter(Boolean).length

  return (
    <div
      className="rounded-card border border-mgi-border p-6 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 70% 50%, #1a1040 0%, #0C0F1A 60%)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-status-active animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest font-semibold text-status-active">
            AI Executive Briefing
          </span>
        </span>
        <span className="text-[10px] text-mgi-dim">claude-haiku · updated hourly</span>
        <span className="text-[10px] text-mgi-dim ml-auto">
          {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* Live Claude briefing — shown when API key is set */}
      {aiBriefing !== undefined ? (
        aiBriefing ? (
          <p className="text-sm text-mgi-muted leading-relaxed max-w-3xl mb-4">{aiBriefing}</p>
        ) : (
          <p className="text-sm text-mgi-label italic mb-4">
            Briefing unavailable — set ANTHROPIC_API_KEY in .env.local to enable.
          </p>
        )
      ) : (
        <>
          {/* Fallback: local generation */}
          <p className="text-[22px] font-bold text-white leading-snug max-w-3xl">
            {count > 0
              ? `${count} item${count > 1 ? 's' : ''} need${count === 1 ? 's' : ''} you before noon.`
              : "You're clear. No urgent items today."
            }
          </p>
          <p className="text-sm text-mgi-muted mt-2 max-w-2xl mb-4">
            {generateFallbackBriefing(nmiKpis, openApprovals)}
          </p>
        </>
      )}

      {/* Stats bar */}
      <div className="flex items-center gap-6 pt-4 border-t border-mgi-border">
        <Stat label="Ventures Monitored" value="6" />
        <Stat label="NMI Orders Today" value={nmiKpis?.ordersToday ?? '–'} />
        <Stat label="Open Approvals" value={openApprovals} />
        <Stat label="NMI Open Invoices" value={nmiKpis?.openInvoices ?? '–'} />
        <Stat label="Stock Alerts" value={nmiKpis?.stockAlerts ?? '–'} />
      </div>
    </div>
  )
}
