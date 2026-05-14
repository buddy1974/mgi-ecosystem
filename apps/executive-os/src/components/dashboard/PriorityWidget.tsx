import Link from 'next/link'
import { mockPriorities } from '@/app/(os)/priority/data'

const ENTITY_COLORS: Record<string, string> = {
  MGI:       '#D4AF37',
  Rogers:    '#f72585',
  Horeb:     '#0a8348',
  NMI:       '#3B82F6',
  LQ:        '#9c99e0',
  DROS:      '#3a8fd4',
  Drimp:     '#FC9D02',
  'Abba Land': '#c8a96e',
}

export function PriorityWidget() {
  const urgent = mockPriorities.filter((p) => p.urgent)
  const top3 = mockPriorities.slice(0, 3)

  return (
    <div className="bg-mgi-card rounded-card border border-mgi-border overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-mgi-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">🎯</span>
          <h2 className="text-[11px] uppercase tracking-widest font-semibold text-mgi-label">
            Priority Tracker
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {urgent.length > 0 && (
            <span className="bg-status-risk-bg text-status-risk text-[10px] font-bold px-1.5 py-0.5 rounded-badge">
              {urgent.length} urgent
            </span>
          )}
          <Link
            href="/priority"
            className="text-[11px] text-mgi-muted hover:text-white transition-colors"
          >
            View all →
          </Link>
        </div>
      </div>

      {/* Top 3 priorities */}
      <div className="divide-y divide-mgi-border">
        {top3.map((p) => {
          const color = ENTITY_COLORS[p.entity] ?? '#94A3B8'
          return (
            <div key={p.id} className="px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                {p.urgent && (
                  <span className="w-1.5 h-1.5 rounded-full bg-status-risk shrink-0" />
                )}
                <p className="text-sm font-medium text-white truncate">{p.title}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className="text-[10px] font-semibold px-1.5 py-0.5 rounded-badge border"
                  style={{ color, borderColor: `${color}40`, background: `${color}12` }}
                >
                  {p.entity}
                </span>
                {p.deadline && (
                  <span className="text-[10px] text-mgi-muted hidden sm:inline">{p.deadline}</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Urgent flag callout */}
      {urgent.length > 0 && (
        <div className="px-4 py-2.5 bg-status-risk-bg/50 border-t border-status-risk/20 flex items-center justify-between">
          <p className="text-xs text-status-risk font-medium">
            🔴 {urgent[0].title}
          </p>
          <Link href="/priority" className="text-[11px] text-status-risk/70 hover:text-status-risk transition-colors">
            Review →
          </Link>
        </div>
      )}
    </div>
  )
}
