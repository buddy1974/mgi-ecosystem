import { getInboxMessages, getInboxStats } from '@/lib/inbox-data'
import { InboxClient } from '@/components/inbox/InboxClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function InboxPage() {
  const [messages, stats] = await Promise.all([
    getInboxMessages(),
    getInboxStats(),
  ])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-6 py-4 border-b border-mgi-border flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl font-light text-white">Communications</h1>
          <p className="text-mgi-muted text-sm mt-0.5">
            <span className="text-white font-medium">{stats.unread}</span> unread ·{' '}
            <span className="text-amber-400 font-medium">{stats.actToday}</span> need action today ·{' '}
            {stats.total} total
          </p>
        </div>
        <button className="px-4 py-2 bg-white text-black text-sm font-semibold rounded hover:bg-white/90 transition-colors">
          + Compose
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <InboxClient initialMessages={messages} />
      </div>
    </div>
  )
}
