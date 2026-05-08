'use client'

import type { Message } from '@mgi/database'
import { InboxSidebar } from './InboxSidebar'
import { MessagePanel } from './MessagePanel'
import { useState } from 'react'

interface Props {
  initialMessages: Message[]
}

export function InboxClient({ initialMessages }: Props) {
  const [messages] = useState(initialMessages)
  const [selectedId, setSelectedId] = useState<string | null>(
    initialMessages[0]?.id ?? null
  )

  const selectedMessage = messages.find(m => m.id === selectedId) ?? null

  return (
    <div className="flex h-full overflow-hidden">
      <InboxSidebar messages={messages} selectedId={selectedId} onSelect={setSelectedId} />
      <MessagePanel message={selectedMessage} />
    </div>
  )
}
