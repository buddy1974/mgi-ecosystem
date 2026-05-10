import type { ApprovalItem } from '@/lib/dashboard-data'

export function ApprovalsPreview({ approvals }: { approvals: ApprovalItem[] }) {
  return (
    <div className="bg-mgi-card rounded-card border border-mgi-border overflow-hidden">
      <div className="px-4 py-3 border-b border-mgi-border flex items-center justify-between">
        <h2 className="text-[11px] uppercase tracking-widest font-semibold text-mgi-label">
          Pending Your Approval
        </h2>
        {approvals.length > 0 && (
          <span className="bg-status-risk-bg text-status-risk text-[10px] font-bold px-1.5 py-0.5 rounded">
            {approvals.length}
          </span>
        )}
      </div>
      {approvals.length === 0 ? (
        <div className="px-4 py-6 text-center text-sm text-mgi-muted">No pending approvals</div>
      ) : (
        <div className="divide-y divide-mgi-border">
          {approvals.map((a) => (
            <div key={a.id} className="px-4 py-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{a.title}</p>
                <p className="text-xs text-mgi-muted">
                  {a.requestedBy}{a.company ? ` · ${a.company}` : ''}
                </p>
              </div>
              {a.amount && (
                <span className="text-sm font-semibold text-white tabular-nums shrink-0">{a.amount}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
