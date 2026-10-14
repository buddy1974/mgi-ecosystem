import { getUpcomingEvents } from '@/lib/calendar-data'

// Today's events from the Event table (previously a hardcoded list of four sample events).
export async function CalendarPreview() {
  const today = new Date()
  const dayName = today.toLocaleDateString('en-GB', { weekday: 'long' })
  const dateStr = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })

  const upcoming = await getUpcomingEvents(1)
  const endOfDay = new Date(today)
  endOfDay.setHours(23, 59, 59, 999)
  const events = upcoming.filter((e) => e.startAt <= endOfDay)

  const typeStyles: Record<string, string> = {
    MEETING:    'border-l-2 border-status-attention',
    CALL:       'border-l-2 border-status-attention',
    CONFERENCE: 'border-l-2 border-status-attention',
    INTERNAL:   'border-l-2 border-mgi-dim',
    PERSONAL:   'border-l-2 border-rogers-violet',
    TRAVEL:     'border-l-2 border-status-build',
  }

  return (
    <div className="bg-mgi-card rounded-card border border-mgi-border overflow-hidden">
      <div className="px-4 py-3 border-b border-mgi-border">
        <h2 className="text-[11px] uppercase tracking-widest font-semibold text-mgi-label">
          Today · {dayName}, {dateStr}
        </h2>
      </div>
      {events.length === 0 ? (
        <p className="px-4 py-6 text-sm text-mgi-muted">No events scheduled for the rest of today.</p>
      ) : (
        <div className="flex flex-col divide-y divide-mgi-border">
          {events.map((e) => {
            const minutes = Math.max(0, Math.round((e.endAt.getTime() - e.startAt.getTime()) / 60000))
            return (
              <div key={e.id} className={`px-4 py-3 flex items-center gap-3 ml-4 ${typeStyles[e.type] ?? ''}`}>
                <span className="text-xs text-mgi-muted tabular-nums w-10 shrink-0">
                  {e.startAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-white truncate">{e.title}</p>
                  <p className="text-xs text-mgi-muted">{minutes >= 60 ? `${Math.round(minutes / 6) / 10}h` : `${minutes}m`}{e.location ? ` · ${e.location}` : ''}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
