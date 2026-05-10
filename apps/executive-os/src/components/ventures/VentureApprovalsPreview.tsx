import type { Approval } from '@mgi/database'
import { CategoryTag } from '@/components/approvals/CategoryTag'
import { PriorityIndicator } from '@/components/approvals/PriorityIndicator'
import Link from 'next/link'

interface Props {
  approvals: Approval[]
  companyId: string
}

export function VentureApprovalsPreview({ approvals, companyId }: Props) {
  return (
    <div className="rounded-xl bg-[#111827] border border-[#1F2D40] p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[#64748B] text-xs uppercase tracking-wider font-semibold">Pending Approvals</p>
        <Link href={`/approvals?company=${companyId}`} className="text-[10px] text-[#475569] hover:text-[#94A3B8]">
          View all →
        </Link>
      </div>
      {approvals.length === 0 ? (
        <p className="text-[#475569] text-sm">No pending approvals.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {approvals.map((approval) => (
            <div key={approval.id} className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate mb-1">{approval.title}</p>
                <div className="flex items-center gap-1.5">
                  <CategoryTag category={approval.category} />
                  <PriorityIndicator priority={approval.priority} />
                </div>
              </div>
              {approval.amount && (
                <span className="text-[#94A3B8] text-[11px] flex-shrink-0 font-mono">
                  XAF {Number(approval.amount).toLocaleString('fr-CM')}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
