'use client'

import type { Message } from '@mgi/database'
import { MessageCard } from './MessageCard'
import { useState } from 'react'

const SOURCES = ['ALL', 'EMAIL', 'WHATSAPP', 'LINKEDIN', 'INSTAGRAM', 'FACEBOOK', 'TIKTOK'] as const

interface Props {
  messages: Message[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function InboxSidebar({ messages, selectedId, onSelect }: Props) {
  const [activeSource, setActiveSource] = useState<string>('ALL')

  const filtered = activeSource === 'ALL'
    ? messages
    : messages.filter(m => m.source === activeSource)

  return (
    <div className="w-[320px] flex-shrink-0 border-r border-mgi-border flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b border-mgi-border overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {SOURCES.map(src => (
            <button
              key={src}
              onClick={() => setActiveSource(src)}
              className={`px-3 py-1 rounded text-[11px] font-medium transition-colors ${
                activeSource === src ? 'bg-white text-black' : 'text-mgi-muted hover:text-white'
              }`}
            >
              {src}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-mgi-muted text-sm">No messages</div>
        ) : (
          filtered.map(msg => (
            <MessageCard
              key={msg.id}
              message={msg}
              isSelected={msg.id === selectedId}
              onClick={() => onSelect(msg.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}
