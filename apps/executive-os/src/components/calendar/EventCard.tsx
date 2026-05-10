import type { Event } from '@mgi/database'
import { format } from 'date-fns'

const TYPE_COLORS: Record<string, string> = {
  MEETING:    'bg-blue-900/40 text-blue-300',
  CALL:       'bg-green-900/40 text-green-300',
  CONFERENCE: 'bg-violet-900/40 text-violet-300',
  INTERNAL:   'bg-slate-800/60 text-slate-300',
  PERSONAL:   'bg-pink-900/40 text-pink-300',
  TRAVEL:     'bg-amber-900/40 text-amber-300',
}

const COMPANY_NAMES: Record<string, string> = {
  nmi: 'NMI', horeb: 'Horeb', lq: 'LQ', dros: 'DROS', rogers: 'Rogers', mgi: 'MGI',
}

const COMPANY_COLORS: Record<string, string> = {
  nmi: '#1D4ED8', horeb: '#0a8348', lq: '#393186',
  dros: '#023F78', rogers: '#3a0ca3', mgi: '#92400E',
}

interface Props { event: Event }

export function EventCard({ event }: Props) {
  const start = new Date(event.startAt)
  const end = new Date(event.endAt)
  const durationMin = Math.round((end.getTime() - start.getTime()) / 60000)
  const durationLabel = durationMin >= 60
    ? `${Math.floor(durationMin / 60)}h${durationMin % 60 > 0 ? ` ${durationMin % 60}m` : ''}`
    : `${durationMin}m`

  return (
    <div
      className="rounded-xl bg-[#111827] border border-[#1F2D40] p-4 hover:border-[#2D4A6A] transition-colors"
      style={event.companyId ? { borderLeftColor: COMPANY_COLORS[event.companyId], borderLeftWidth: 3 } : {}}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${TYPE_COLORS[event.type] ?? TYPE_COLORS.MEETING}`}>
              {event.type}
            </span>
            {event.companyId && (
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded"
                style={{ backgroundColor: `${COMPANY_COLORS[event.companyId]}22`, color: COMPANY_COLORS[event.companyId] }}
              >
                {COMPANY_NAMES[event.companyId] ?? event.companyId}
              </span>
            )}
            {event.status === 'TENTATIVE' && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-900/40 text-yellow-400">Tentative</span>
            )}
          </div>
          <p className="text-white font-medium text-sm mb-1">{event.title}</p>
          {event.description && <p className="text-[#64748B] text-xs line-clamp-1 mb-2">{event.description}</p>}
          <div className="flex items-center gap-3 text-[11px] text-[#64748B] flex-wrap">
            {event.location && <span>📍 {event.location}</span>}
            {event.attendees.length > 0 && (
              <span>👥 {event.attendees.slice(0, 2).join(', ')}{event.attendees.length > 2 ? ` +${event.attendees.length - 2}` : ''}</span>
            )}
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-white text-sm font-mono font-semibold">{format(start, 'HH:mm')}</p>
          <p className="text-[#64748B] text-[10px]">{durationLabel}</p>
        </div>
      </div>
    </div>
  )
}
