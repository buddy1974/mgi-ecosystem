import { requireBriefingPage } from '@/lib/briefing/access'
import { getBriefingMode } from '@/lib/briefing/mode'
import { COVERAGE, FOUND_LABEL, type Found } from '@/lib/briefing/coverage'
import { BriefingNav, Card, ModeBanner, PageHeader, StatusBadge } from '@/components/briefing/ui'

export const dynamic = 'force-dynamic'

const TONE: Record<Found, string> = { functional: 'active', incomplete: 'attention', broken: 'risk', designed: 'build', missing: 'muted', 'needs-business-info': 'attention' }

export default async function CoveragePage() {
  const access = await requireBriefingPage()
  const mode = getBriefingMode()
  const areas = [...new Set(COVERAGE.map((r) => r.area))]
  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <PageHeader title="Coverage" subtitle="What exists, what this centre adds, and what live data still needs" />
      <ModeBanner mode={mode} />
      <BriefingNav current="/briefing/coverage" showDemo={mode === 'demo' && access.user.globalRole === 'SUPER_ADMIN'} />
      {areas.map((a) => (
        <Card key={a} title={a}>
          <ul className="divide-y divide-mgi-border">
            {COVERAGE.filter((r) => r.area === a).map((r) => (
              <li key={r.capability} className="grid gap-1 py-2 text-sm md:grid-cols-[1.2fr_auto_1.5fr_1.5fr] md:gap-3">
                <span className="text-mgi-text">{r.capability}<span className="block text-[11px] text-mgi-label">{r.where}</span></span>
                <span><StatusBadge status={FOUND_LABEL[r.found]} tone={TONE[r.found]} /></span>
                <span className="text-mgi-muted"><b className="text-[10px] uppercase tracking-widest text-mgi-label">Now </b>{r.now}</span>
                <span className="text-mgi-muted"><b className="text-[10px] uppercase tracking-widest text-mgi-label">Live needs </b>{r.live}</span>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  )
}
