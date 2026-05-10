import { notFound } from 'next/navigation'
import { VENTURES } from '@/lib/ventures-config'
import { getVentureStats, getVentureMessages, getVentureApprovals } from '@/lib/ventures-data'
import {
  VentureHeader,
  VentureSocialRow,
  VentureProgramsCard,
  VentureMessagesPreview,
  VentureApprovalsPreview,
} from '@/components/ventures'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Props {
  params: Promise<{ slug: string }>
}

export default async function VentureDeepDivePage({ params }: Props) {
  const { slug } = await params
  const venture = VENTURES[slug]
  if (!venture) notFound()

  const [stats, messages, approvals] = await Promise.all([
    getVentureStats(venture.companyId),
    getVentureMessages(venture.companyId),
    getVentureApprovals(venture.companyId),
  ])

  return (
    <div>
      <VentureHeader venture={venture} stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <VentureMessagesPreview messages={messages} companyId={venture.companyId} />
          <VentureApprovalsPreview approvals={approvals} companyId={venture.companyId} />
        </div>
        <div className="flex flex-col gap-4">
          <VentureSocialRow venture={venture} />
          <VentureProgramsCard venture={venture} />
        </div>
      </div>
    </div>
  )
}
