'use client'

import type { Approval } from '@mgi/database'
import { CompanyTag } from './CompanyTag'
import { CategoryTag } from './CategoryTag'
import { PriorityIndicator } from './PriorityIndicator'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  approval: Approval
}

export function ApprovalCard({ approval }: Props) {
  const router = useRouter()
  const [acting, setActing] = useState<string | null>(null)

  const age = formatDistanceToNow(new Date(approval.requestedAt), { addSuffix: true })

  const formatAmount = (amount: number | null, currency: string) => {
    if (!amount) return null
    return new Intl.NumberFormat('fr-CM', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const act = async (action: 'approve' | 'reject' | 'delegate') => {
    setActing(action)
    try {
      await fetch(`/api/approvals/${approval.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      router.refresh()
    } finally {
      setActing(null)
    }
  }

  const riskColor =
    approval.aiRisk === 'HIGH' ? 'text-red-400' :
    approval.aiRisk === 'MEDIUM' ? 'text-amber-400' :
    'text-emerald-400'

  return (
    <div className="bg-mgi-card border border-mgi-border rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <CompanyTag companyId={approval.companyId} />
          <CategoryTag category={approval.category} />
          <PriorityIndicator priority={approval.priority} />
        </div>
        {approval.amount && (
          <span className="text-2xl font-bold text-white flex-shrink-0">
            {formatAmount(approval.amount, approval.currency)}
          </span>
        )}
      </div>

      {/* Title + metadata */}
      <div>
        <h3 className="text-base font-semibold text-white mb-1">{approval.title}</h3>
        <p className="text-xs text-mgi-muted">
          Requested by <span className="text-white">{approval.requestedBy}</span>
          {' · '}{age}
          {approval.n8nWorkflow && (
            <span className="ml-1">
              · routed via{' '}
              <span className="font-mono text-mgi-label">n8n workflow #{approval.n8nWorkflow}</span>
            </span>
          )}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-mgi-muted leading-relaxed">{approval.description}</p>

      {/* AI Analysis */}
      {approval.aiAnalysis && (
        <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/30">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
              AI ANALYSIS
            </span>
            {approval.aiRisk && (
              <span className={`text-[10px] font-bold uppercase ${riskColor}`}>
                · Risk: {approval.aiRisk}
              </span>
            )}
          </div>
          <p className="text-sm text-emerald-100/80 leading-relaxed">{approval.aiAnalysis}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <button className="px-3 py-1.5 text-xs border border-mgi-border text-mgi-muted rounded hover:text-white hover:border-white/30 transition-colors">
          Discuss
        </button>
        <button
          onClick={() => act('delegate')}
          disabled={!!acting}
          className="px-3 py-1.5 text-xs border border-mgi-border text-mgi-muted rounded hover:text-white hover:border-white/30 transition-colors disabled:opacity-40"
        >
          {acting === 'delegate' ? '...' : 'Delegate'}
        </button>
        <button
          onClick={() => act('reject')}
          disabled={!!acting}
          className="px-3 py-1.5 text-xs border border-red-900 text-red-400 rounded hover:bg-red-900/20 transition-colors disabled:opacity-40"
        >
          {acting === 'reject' ? '...' : 'Reject'}
        </button>
        <button
          onClick={() => act('approve')}
          disabled={!!acting}
          className="ml-auto px-4 py-1.5 text-xs bg-white text-black rounded font-bold hover:bg-white/90 transition-colors disabled:opacity-40 flex items-center gap-1"
        >
          {acting === 'approve' ? '...' : '✓ Approve'}
        </button>
      </div>
    </div>
  )
}
