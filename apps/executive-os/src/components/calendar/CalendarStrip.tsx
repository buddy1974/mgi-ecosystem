import type { Event } from '@mgi/database'

interface Props {
  events: Event[]
}

function getNextSevenDays(): Date[] {
  const days: Date[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    d.setHours(0, 0, 0, 0)
    days.push(d)
  }
  return days
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const COMPANY_COLORS: Record<string, string> = {
  nmi: '#1D4ED8', horeb: '#0a8348', lq: '#393186',
  dros: '#023F78', rogers: '#3a0ca3', mgi: '#92400E',
}

export function CalendarStrip({ events }: Props) {
  const days = getNextSevenDays()

  return (
    <div className="grid grid-cols-7 gap-2 mb-6">
      {days.map((day, i) => {
        const dayStart = new Date(day)
        const dayEnd = new Date(day)
        dayEnd.setHours(23, 59, 59, 999)
        const dayEvents = events.filter((e) => {
          const start = new Date(e.startAt)
          return start >= dayStart && start <= dayEnd
        })
        const isToday = i === 0

        return (
          <div
            key={day.toISOString()}
            className={`rounded-xl p-3 text-center ${
              isToday ? 'bg-[#1E293B] border border-[#334155]' : 'bg-[#111827] border border-[#1F2D40]'
            }`}
          >
            <p className={`text-[10px] font-semibold uppercase tracking-wider mb-1 ${isToday ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
              {DAY_LABELS[day.getDay()]}
            </p>
            <p className={`text-lg font-bold leading-none mb-2 ${isToday ? 'text-white' : 'text-[#64748B]'}`}>
              {day.getDate()}
            </p>
            {isToday && <p className="text-[9px] text-[#64748B] mb-1">{MONTH_LABELS[day.getMonth()]}</p>}
            <div className="flex flex-wrap justify-center gap-0.5 min-h-[8px]">
              {dayEvents.slice(0, 4).map((e) => (
                <span
                  key={e.id}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: e.companyId ? (COMPANY_COLORS[e.companyId] ?? '#475569') : '#475569' }}
                  title={e.title}
                />
              ))}
              {dayEvents.length > 4 && <span className="text-[8px] text-[#475569]">+{dayEvents.length - 4}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
