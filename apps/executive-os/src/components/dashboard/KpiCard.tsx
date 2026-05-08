interface KpiCardProps {
  label: string
  value: string | number
  delta?: string
  deltaPositive?: boolean
  sub?: string
}

export function KpiCard({ label, value, delta, deltaPositive, sub }: KpiCardProps) {
  return (
    <div className="bg-mgi-card rounded-card p-5 flex flex-col gap-2 border border-mgi-border">
      <span className="text-[10px] uppercase tracking-widest font-semibold text-mgi-label">
        {label}
      </span>
      <span className="text-4xl font-bold text-white leading-none">
        {value}
      </span>
      {delta && (
        <span className={`text-xs font-medium ${deltaPositive ? 'text-delta-up' : 'text-delta-down'}`}>
          {delta}
        </span>
      )}
      {sub && (
        <span className="text-xs text-mgi-muted">{sub}</span>
      )}
    </div>
  )
}
