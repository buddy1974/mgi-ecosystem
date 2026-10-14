import { Sidebar } from '@mgi/ui'
import { TopBar } from '@mgi/ui'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getUnreadCount } from '@/lib/inbox-data'
import { getApprovalStats } from '@/lib/approvals-data'
import { getPendingBookingCount } from '@/lib/calendar-data'
import { getScheduledPostCount } from '@/lib/social-data'
import { getNewOperationsCount } from '@/lib/operations-data'

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
  if (!session) redirect('/login')

  return (
    <div className="flex h-screen overflow-hidden bg-mgi-bg">
      <Sidebar
        unreadMessages={unreadMessages}
        pendingApprovals={approvalStats.total}
        pendingBookings={pendingBookings}
        scheduledPosts={scheduledPosts}
        newOperationsReports={newOperationsReports}
        plannedHrefs={process.env.MGI_LOCAL_DEMO === '1' ? ['/ai', '/crm', '/events', '/newsletter', '/knowledge'] : []}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        {process.env.MGI_LOCAL_DEMO === '1' && (
          // LOCAL PRESENTATION DEMO ONLY (branch demo/exos-local)
          <div style={{ background: '#FBE7CF', color: '#7A3E00', fontSize: 13, fontWeight: 600, padding: '6px 24px', borderBottom: '1px solid #F2C88F' }}>
            LOCAL DEMO · synthetic sample data on this laptop · not connected to NMI, live company systems or AI services · production system remains offline
          </div>
        )}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
