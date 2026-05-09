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

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DashboardPage() {
  const { nmiKpis, nmiHealth, openApprovals, aiBriefing } = await getDashboardData()

  return (
    <div className="flex flex-col gap-6 p-6">
      <GreetingHeader />
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
    </div>
  )
}
