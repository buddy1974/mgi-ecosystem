import { getTimeOfDayGreeting } from '@/lib/dashboard-data'

export function GreetingHeader() {
  const greeting = getTimeOfDayGreeting()
  const date = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="flex items-end justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">{greeting}, Rogers.</h1>
        <p className="text-sm text-mgi-muted mt-1">{date}</p>
      </div>
      <div className="flex items-center gap-2">
        {(['Today', 'This week', 'Quarter'] as const).map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              tab === 'Today' ? 'bg-white text-black' : 'text-mgi-muted hover:text-white hover:bg-mgi-card'
            }`}
          >
            {tab}
          </button>
        ))}
        <button className="ml-2 px-3 py-1.5 rounded text-xs font-medium bg-mgi-card border border-mgi-border text-mgi-muted hover:text-white transition-colors">
          Run morning routine
        </button>
      </div>
    </div>
  )
}
