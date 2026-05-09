import type { Event } from '@mgi/database'
import { EventCard } from './EventCard'
import { format, isToday, isTomorrow } from 'date-fns'

interface Props { events: Event[] }

function groupByDay(events: Event[]): Record<string, Event[]> {
  const groups: Record<string, Event[]> = {}
  for (const event of events) {
    const key = format(new Date(event.startAt), 'yyyy-MM-dd')
    if (!groups[key]) groups[key] = []
    groups[key].push(event)
  }
  return groups
}

function dayLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  if (isToday(d)) return 'TODAY'
  if (isTomorrow(d)) return 'TOMORROW'
  return format(d, 'EEEE, MMMM d').toUpperCase()
}

export function EventGroup({ events }: Props) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#475569] text-sm">No upcoming events in the next 14 days.</p>
      </div>
    )
  }

  const groups = groupByDay(events)

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(groups).map(([dateStr, dayEvents]) => (
        <div key={dateStr}>
          <p className="text-[#475569] text-[10px] font-semibold uppercase tracking-widest mb-2 px-1">
            {dayLabel(dateStr)} · {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}
          </p>
          <div className="flex flex-col gap-2">
            {dayEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
