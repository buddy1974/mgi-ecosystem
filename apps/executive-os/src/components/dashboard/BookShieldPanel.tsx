import { getBookShieldFeed } from '@/lib/bookshield-signals'

const LEVEL_COLOR: Record<string, string> = {
  elevated: 'text-status-risk',
  moderate: 'text-status-attention',
  low: 'text-status-active',
}

// Publishing-protection risk from NMI BookShield (sanitised: no evidence, locations or names).
export async function BookShieldPanel() {
  const feed = await getBookShieldFeed()

  return (
    <div className="bg-mgi-card rounded-card border border-mgi-border overflow-hidden">
      <div className="px-4 py-3 border-b border-mgi-border flex items-center justify-between">
        <h2 className="text-[11px] uppercase tracking-widest font-semibold text-mgi-label">
          NMI · Publishing protection (BookShield)
        </h2>
        {feed && <span className="text-[11px] text-mgi-dim">{feed.signals.length} signal{feed.signals.length === 1 ? '' : 's'}</span>}
      </div>
      {!feed ? (
        <p className="px-4 py-6 text-sm text-mgi-muted">Not connected — BookShield signals appear here once NMI is connected.</p>
      ) : (
        <div className="px-4 py-3 flex flex-col gap-3">
          <div className="flex items-baseline gap-3">
            <span className={`text-xl font-bold capitalize ${LEVEL_COLOR[feed.risk.level?.toLowerCase()] ?? 'text-white'}`}>{feed.risk.level}</span>
            <span className="text-xs text-mgi-muted">
              {feed.risk.openIncidents} open incident{feed.risk.openIncidents === 1 ? '' : 's'} · {feed.risk.openHighSeverity} high severity
            </span>
          </div>
          {feed.signals.length === 0 ? (
            <p className="text-sm text-mgi-muted">No executive signals raised.</p>
          ) : (
            feed.signals.slice(0, 5).map((s) => (
              <div key={s.id} className="border-t border-mgi-border pt-2">
                <p className="text-sm text-white">{s.riskType} — {s.productTitle}</p>
                <p className="text-xs text-mgi-muted">{s.severity} · {s.status}</p>
                <p className="text-xs text-status-attention">Decision: {s.decisionNeeded}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
