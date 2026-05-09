interface Props {
  drafts: number
  scheduled: number
  publishedThisWeek: number
}

export function SocialStatsBar({ drafts, scheduled, publishedThisWeek }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {[
        { label: 'Drafts',               value: drafts,              color: 'text-[#94A3B8]' },
        { label: 'Scheduled',            value: scheduled,           color: 'text-blue-400' },
        { label: 'Published this week',  value: publishedThisWeek,   color: 'text-emerald-400' },
      ].map(({ label, value, color }) => (
        <div key={label} className="rounded-xl bg-[#111827] border border-[#1F2D40] p-4 text-center">
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          <p className="text-[#64748B] text-[10px] uppercase tracking-wider mt-1">{label}</p>
        </div>
      ))}
    </div>
  )
}
