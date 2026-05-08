type Status = 'active' | 'attention' | 'risk' | 'build'

const STATUS_MAP: Record<Status, { label: string; bg: string; text: string }> = {
  active:    { label: 'Active',    bg: 'bg-status-active-bg',    text: 'text-status-active' },
  attention: { label: 'Attention', bg: 'bg-status-attention-bg', text: 'text-status-attention' },
  risk:      { label: 'Risk',      bg: 'bg-status-risk-bg',      text: 'text-status-risk' },
  build:     { label: 'Build',     bg: 'bg-status-build-bg',     text: 'text-status-build' },
}

export function StatusBadge({ status }: { status: Status }) {
  const { label, bg, text } = STATUS_MAP[status]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-badge text-[11px] font-bold uppercase tracking-wide ${bg} ${text}`}>
      {label}
    </span>
  )
}
