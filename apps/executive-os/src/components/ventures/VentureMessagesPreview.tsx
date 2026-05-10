import type { Message } from '@mgi/database'
import { SourceBadge } from '@/components/inbox/SourceBadge'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

interface Props {
  messages: Message[]
  companyId: string
}

export function VentureMessagesPreview({ messages, companyId }: Props) {
  return (
    <div className="rounded-xl bg-[#111827] border border-[#1F2D40] p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[#64748B] text-xs uppercase tracking-wider font-semibold">Recent Messages</p>
        <Link href={`/inbox?company=${companyId}`} className="text-[10px] text-[#475569] hover:text-[#94A3B8]">
          View all →
        </Link>
      </div>
      {messages.length === 0 ? (
        <p className="text-[#475569] text-sm">No messages yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#1E293B] flex items-center justify-center text-[10px] font-bold text-[#94A3B8] flex-shrink-0">
                {msg.fromName.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-white text-xs font-medium truncate">{msg.fromName}</span>
                  <SourceBadge source={msg.source} />
                </div>
                <p className="text-[#64748B] text-[11px] truncate">
                  {msg.subject ?? msg.body.slice(0, 60)}
                </p>
              </div>
              <span className="text-[#475569] text-[10px] flex-shrink-0">
                {formatDistanceToNow(new Date(msg.receivedAt), { addSuffix: true })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
