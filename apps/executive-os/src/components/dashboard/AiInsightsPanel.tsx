import type { NmiKpis } from '@/lib/nmi-bridge'

interface Insight {
  company: string
  companyColor: string
  title: string
  body: string
  severity: 'info' | 'warning' | 'critical'
}

function buildInsights(nmiKpis: NmiKpis | null): Insight[] {
  const insights: Insight[] = []
  if (nmiKpis) {
    if (nmiKpis.overdueInvoices > 0)
      insights.push({ company: 'NMI Education', companyColor: '#3B82F6', title: `${nmiKpis.overdueInvoices} overdue invoice${nmiKpis.overdueInvoices > 1 ? 's' : ''}`, body: 'Receivables past due date. Collections follow-up recommended.', severity: 'warning' })
    if (nmiKpis.stockAlerts > 0)
      insights.push({ company: 'NMI Education', companyColor: '#3B82F6', title: `${nmiKpis.stockAlerts} stock item${nmiKpis.stockAlerts > 1 ? 's' : ''} below threshold`, body: 'Inventory reorder required to prevent stockouts.', severity: nmiKpis.stockAlerts > 5 ? 'critical' : 'warning' })
    if (nmiKpis.manuscriptsInReview > 0)
      insights.push({ company: 'NMI Education', companyColor: '#3B82F6', title: `${nmiKpis.manuscriptsInReview} manuscript${nmiKpis.manuscriptsInReview > 1 ? 's' : ''} in editorial review`, body: 'Pipeline progressing. No action required.', severity: 'info' })
    if (nmiKpis.agentRunsFailed > 0)
      insights.push({ company: 'NMI Automation', companyColor: '#F59E0B', title: `${nmiKpis.agentRunsFailed} automation failure${nmiKpis.agentRunsFailed > 1 ? 's' : ''} in last 24h`, body: 'AI agent runs failed. Review automation logs.', severity: 'critical' })
  }
  if (insights.length === 0)
    insights.push({ company: 'Ecosystem', companyColor: '#10B981', title: 'All systems nominal', body: 'No alerts across the ecosystem. All automations running.', severity: 'info' })
  return insights
}

export function AiInsightsPanel({ nmiKpis }: { nmiKpis: NmiKpis | null }) {
  const insights = buildInsights(nmiKpis)
  const severityColor = { info: 'text-mgi-muted', warning: 'text-status-attention', critical: 'text-status-risk' }

  return (
    <div className="bg-mgi-card rounded-card border border-mgi-border overflow-hidden flex flex-col">
      <div className="px-4 py-3 border-b border-mgi-border flex items-center justify-between">
        <h2 className="text-[11px] uppercase tracking-widest font-semibold text-mgi-label">AI Insights & Alerts</h2>
        <span className="text-[11px] text-mgi-dim">{insights.length} active</span>
      </div>
      <div className="flex flex-col divide-y divide-mgi-border flex-1">
        {insights.map((insight, i) => (
          <div key={i} className="px-4 py-3 flex flex-col gap-1.5">
            <span
              className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded self-start"
              style={{ background: insight.companyColor + '22', color: insight.companyColor }}
            >
              {insight.company}
            </span>
            <p className={`text-sm font-semibold ${severityColor[insight.severity]}`}>{insight.title}</p>
            <p className="text-xs text-mgi-muted leading-relaxed">{insight.body}</p>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 border-t border-mgi-border">
        <span className="text-[11px] text-mgi-dim">{insights.length} of {insights.length} insights shown</span>
      </div>
    </div>
  )
}
