export function CalendarPreview() {
  const today = new Date()
  const dayName = today.toLocaleDateString('en-GB', { weekday: 'long' })
  const dateStr = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })

  const events = [
    { time: '09:00', title: 'AI Daily Briefing', type: 'ai', duration: '30m' },
    { time: '11:00', title: 'NMI Editorial Review', type: 'internal', duration: '1h' },
    { time: '14:00', title: 'DROS Site Report Review', type: 'internal', duration: '30m' },
    { time: '16:00', title: 'Weekly Close', type: 'protected', duration: '1h' },
  ]

  const typeStyles: Record<string, string> = {
    ai:        'border-l-2 border-status-build',
    internal:  'border-l-2 border-mgi-dim',
    external:  'border-l-2 border-status-attention',
    protected: 'border-l-2 border-rogers-violet',
  }

  return (
    <div className="bg-mgi-card rounded-card border border-mgi-border overflow-hidden">
      <div className="px-4 py-3 border-b border-mgi-border">
        <h2 className="text-[11px] uppercase tracking-widest font-semibold text-mgi-label">
          Today · {dayName}, {dateStr}
        </h2>
      </div>
      <div className="flex flex-col divide-y divide-mgi-border">
        {events.map((e) => (
          <div key={e.time} className={`px-4 py-3 flex items-center gap-3 ml-4 ${typeStyles[e.type] ?? ''}`}>
            <span className="text-xs text-mgi-muted tabular-nums w-10 shrink-0">{e.time}</span>
            <div className="min-w-0">
              <p className="text-sm text-white truncate">{e.title}</p>
              <p className="text-xs text-mgi-muted">{e.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
