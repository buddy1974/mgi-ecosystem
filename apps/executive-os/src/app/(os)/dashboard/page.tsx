export default function DashboardPage() {
  const now = new Date()
  const hour = now.getHours()
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-mgi-text">
            {greeting}, Rogers.
          </h1>
          <p className="mt-1 text-sm text-mgi-muted">
            {now.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-md border border-mgi-border bg-mgi-card px-4 py-2 text-sm text-mgi-muted hover:text-white hover:border-white/20 transition-colors">
          ▶ Run morning routine
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {['Ecosystem ARR', 'Cash Runway', 'Open Approvals', 'Audience Reach'].map(
          (label) => (
            <div
              key={label}
              className="rounded-xl border border-mgi-border bg-mgi-card p-5 space-y-3"
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-mgi-label">
                {label}
              </p>
              <div className="h-8 w-24 rounded bg-mgi-border animate-pulse" />
            </div>
          )
        )}
      </div>

      <div className="rounded-xl border border-mgi-border bg-gradient-to-br from-mgi-card to-mgi-bg p-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-mgi-label mb-2">
          AI Executive Briefing · Phase 2
        </p>
        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded bg-mgi-border animate-pulse" />
          <div className="h-4 w-1/2 rounded bg-mgi-border animate-pulse" />
        </div>
      </div>
    </div>
  )
}
