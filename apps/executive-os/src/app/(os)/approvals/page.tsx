import { getPendingApprovals, getApprovalStats } from '@/lib/approvals-data'
import { ApprovalCard } from '@/components/approvals/ApprovalCard'
import { ApprovalsFilter } from '@/components/approvals/ApprovalsFilter'
import { formatDistanceToNow } from 'date-fns'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function ApprovalsPage({ searchParams }: Props) {
  const { category = 'ALL' } = await searchParams

  const [approvals, stats] = await Promise.all([
    getPendingApprovals(category),
    getApprovalStats(),
  ])

  const oldestAge = stats.oldest
    ? formatDistanceToNow(stats.oldest, { addSuffix: false }).toUpperCase()
    : '—'

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-mgi-border flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-light text-white">Approval Center</h1>
            <p className="text-mgi-label text-[11px] uppercase tracking-widest mt-1 font-mono">
              {stats.total} OPEN
              {stats.critical > 0 && ` · ${stats.critical} CRITICAL`}
              {` · OLDEST ${oldestAge}`}
              {' · AUDIT LOG ENABLED'}
            </p>
          </div>
          <button className="px-3 py-1.5 text-xs border border-mgi-border text-mgi-muted rounded hover:text-white hover:border-white/30 transition-colors">
            Bulk delegate
          </button>
        </div>
        <Suspense>
          <ApprovalsFilter />
        </Suspense>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {approvals.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-mgi-muted text-sm">
            <span className="text-2xl mb-2">✓</span>
            No pending approvals{category !== 'ALL' && ` in ${category}`}
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl">
            {approvals.map(approval => (
              <ApprovalCard key={approval.id} approval={approval} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
