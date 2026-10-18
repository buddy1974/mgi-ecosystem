import { getDashboardData } from '@/lib/dashboard-data'
import {
  GreetingHeader,
  AiBriefingCard,
  KpiRow,
  VenturesTable,
  AiInsightsPanel,
  ApprovalsPreview,
  CalendarPreview,
} from '@/components/dashboard'
import { BookShieldPanel } from '@/components/dashboard/BookShieldPanel'
import { requirePageUser } from '@/lib/require-auth'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DashboardPage() {
  await requirePageUser()
  const { nmiKpis, nmiHealth, openApprovals, aiBriefing } = await getDashboardData()

  return (
    <div className="flex flex-col gap-6 p-6">
      <GreetingHeader />
      {/* PriorityWidget removed from the dashboard: it rendered hard-coded sample
          priorities (priority/data.ts) as if they were live. /priority keeps the
          sample, clearly labelled, until priorities are stored in the database. */}
      <AiBriefingCard nmiKpis={nmiKpis} openApprovals={openApprovals.length} aiBriefing={aiBriefing} />
      <KpiRow openApprovals={openApprovals.length} nmiKpis={nmiKpis} />
      <div className="grid grid-cols-[1fr_350px] gap-4">
        <VenturesTable nmiHealth={nmiHealth} />
        <AiInsightsPanel nmiKpis={nmiKpis} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <CalendarPreview />
        <ApprovalsPreview approvals={openApprovals} />
      </div>
      <BookShieldPanel />
    </div>
  )
}
