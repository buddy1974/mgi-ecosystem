'use client'

import type { Message } from '@mgi/database'
import { SourceBadge } from './SourceBadge'
import { ActTodayBadge } from './ActTodayBadge'
import { formatDistanceToNow } from 'date-fns'

interface Props {
  message: Message
  isSelected: boolean
  onClick: () => void
}

export function MessageCard({ message, isSelected, onClick }: Props) {
  const time = formatDistanceToNow(new Date(message.receivedAt), { addSuffix: true })
  const initials = message.fromName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 border-b border-mgi-border transition-colors ${
        isSelected ? 'bg-mgi-card' : 'hover:bg-mgi-card/50'
      } ${!message.isRead ? 'border-l-2 border-l-blue-400' : ''}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-mgi-card-hover flex items-center justify-center text-xs font-bold text-mgi-muted flex-shrink-0 mt-0.5">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className={`text-sm truncate ${!message.isRead ? 'text-white font-semibold' : 'text-mgi-muted'}`}>
              {message.fromName}
            </span>
            <span className="text-[10px] text-mgi-label flex-shrink-0">{time}</span>
          </div>
          {message.subject && (
            <p className="text-xs text-white/80 truncate mb-1">{message.subject}</p>
          )}
          <p className="text-xs text-mgi-muted truncate mb-2">{message.body.slice(0, 80)}…</p>
          <div className="flex items-center gap-1.5 flex-wrap">
            <SourceBadge source={message.source} />
            {message.aiActToday && <ActTodayBadge />}
          </div>
        </div>
      </div>
    </button>
  )
}
