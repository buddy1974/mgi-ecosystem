import { Sidebar } from '@mgi/ui'
import { TopBar } from '@mgi/ui'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getUnreadCount } from '@/lib/inbox-data'
import { getApprovalStats } from '@/lib/approvals-data'
import { getPendingBookingCount } from '@/lib/calendar-data'

export default async function OSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [session, unreadMessages, approvalStats, pendingBookings] = await Promise.all([
    auth(),
    getUnreadCount().catch(() => 0),
    getApprovalStats().catch(() => ({ total: 0, critical: 0, oldest: null })),
    getPendingBookingCount().catch(() => 0),
  ])
  if (!session) redirect('/login')

  return (
    <div className="flex h-screen overflow-hidden bg-mgi-bg">
      <Sidebar
        unreadMessages={unreadMessages}
        pendingApprovals={approvalStats.total}
        pendingBookings={pendingBookings}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
