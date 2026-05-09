import { VENTURES, VENTURE_SLUGS } from '@/lib/ventures-config'
import { getAllVentureStats } from '@/lib/ventures-data'
import { VentureCard } from '@/components/ventures'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function VenturesPage() {
  const allStats = await getAllVentureStats()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-xl font-semibold tracking-tight">Ventures</h1>
          <p className="text-[#64748B] text-xs mt-0.5">6 entities · MGI Ecosystem</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {VENTURE_SLUGS.map((slug) => (
          <VentureCard
            key={slug}
            venture={VENTURES[slug]}
            stats={allStats[slug] ?? { messages: 0, approvals: 0 }}
          />
        ))}
      </div>
    </div>
  )
}
