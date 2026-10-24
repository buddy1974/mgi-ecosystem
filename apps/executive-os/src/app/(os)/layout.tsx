import { Sidebar } from '@mgi/ui'
import { TopBar } from '@mgi/ui'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getUnreadCount } from '@/lib/inbox-data'
import { getApprovalStats } from '@/lib/approvals-data'
import { getPendingBookingCount } from '@/lib/calendar-data'
import { getScheduledPostCount } from '@/lib/social-data'
import { getNewOperationsCount } from '@/lib/operations-data'
import { getActiveUser } from '@/lib/require-auth'

export default async function OSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [session, unreadMessages, approvalStats, pendingBookings, scheduledPosts, newOperationsReports] = await Promise.all([
    auth(),
    getUnreadCount().catch(() => 0),
    getApprovalStats().catch(() => ({ total: 0, critical: 0, oldest: null })),
    getPendingBookingCount().catch(() => 0),
    getScheduledPostCount().catch(() => 0),
    getNewOperationsCount().catch(() => 0),
  ])
  if (!session?.user) redirect('/login') // not a bare existence check (GHSA-8fpg-xm3f-6cx3)
  // The session token is valid, but the account must still be active in the database.
  // (A redirect to /login would loop: the middleware sends signed-in users back to /dashboard.)
  const activeUser = await getActiveUser()
  if (!activeUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-mgi-bg p-6 text-center">
        <div>
          <p className="text-lg font-semibold text-white">Your access has been deactivated.</p>
          <p className="mt-2 text-sm text-mgi-muted">Please contact the administrator.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-mgi-bg">
      <Sidebar
        unreadMessages={unreadMessages}
        pendingApprovals={approvalStats.total}
        pendingBookings={pendingBookings}
        scheduledPosts={scheduledPosts}
        newOperationsReports={newOperationsReports}
      />
      <div className="flex min-w-0 flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
