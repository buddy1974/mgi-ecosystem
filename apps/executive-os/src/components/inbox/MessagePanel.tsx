'use client'

import type { Message } from '@mgi/database'
import { SourceBadge } from './SourceBadge'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'

interface Props {
  message: Message | null
}

export function MessagePanel({ message }: Props) {
  const [replyText, setReplyText] = useState('')
  const [showDraft, setShowDraft] = useState(true)

  if (!message) {
    return (
      <div className="flex-1 flex items-center justify-center text-mgi-muted text-sm">
        Select a message to view
      </div>
    )
  }

  const time = formatDistanceToNow(new Date(message.receivedAt), { addSuffix: true })

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-mgi-border flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <SourceBadge source={message.source} />
            <span className="text-mgi-label text-xs">{time}</span>
          </div>
          <h2 className="text-white font-semibold text-base">
            {message.subject ?? `Message from ${message.fromName}`}
          </h2>
          <p className="text-mgi-muted text-sm mt-0.5">
            {message.fromName}
            {message.fromHandle && <span className="ml-1 text-mgi-label">· {message.fromHandle}</span>}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="px-3 py-1.5 text-xs border border-mgi-border text-mgi-muted rounded hover:text-white hover:border-white/30 transition-colors">
            Delegate
          </button>
          <button className="px-3 py-1.5 text-xs border border-mgi-border text-mgi-muted rounded hover:text-white hover:border-white/30 transition-colors">
            Reply
          </button>
        </div>
      </div>

      {/* AI Summary */}
      {message.aiSummary && (
        <div className="mx-6 mt-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/30">
          <p className="text-[10px] font-bold uppercase text-emerald-400 mb-1.5 tracking-wider">
            AI SUMMARY · 1 PARAGRAPH
          </p>
          <p className="text-sm text-emerald-100/80 leading-relaxed">{message.aiSummary}</p>
        </div>
      )}

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="text-sm text-mgi-muted leading-relaxed whitespace-pre-wrap">
          {message.body}
        </div>
      </div>

      {/* AI Draft */}
      {message.aiDraft && (
        <div className="border-t border-mgi-border px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold uppercase text-mgi-label tracking-wider">
              AI-DRAFTED REPLY · REVIEW BEFORE SENDING
            </p>
            <button
              onClick={() => setShowDraft(!showDraft)}
              className="text-[10px] text-mgi-muted hover:text-white"
            >
              {showDraft ? 'Hide' : 'Show'}
            </button>
          </div>
          {showDraft && (
            <>
              <textarea
                value={replyText || message.aiDraft}
                onChange={e => setReplyText(e.target.value)}
                rows={5}
                className="w-full bg-mgi-card border border-mgi-border rounded-lg p-3 text-sm text-white resize-none focus:outline-none focus:border-white/30"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  {['Refine', 'Make warmer', '+ Cc'].map(label => (
                    <button key={label} className="px-3 py-1.5 text-xs border border-mgi-border text-mgi-muted rounded hover:text-white hover:border-white/30 transition-colors">
                      {label}
                    </button>
                  ))}
                </div>
                <button className="px-4 py-1.5 text-xs bg-white text-black rounded font-semibold hover:bg-white/90 transition-colors">
                  Send reply →
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
