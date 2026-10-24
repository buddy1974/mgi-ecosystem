import Link from 'next/link'
import { requireBriefingPage, canView } from '@/lib/briefing/access'
import { getBriefingMode, modeFlag } from '@/lib/briefing/mode'
import { financeCompanies } from '@/lib/briefing/data'
import { companyLabel } from '@/lib/briefing/types'
import { BriefingNav, Card, Empty, ModeBanner, PageHeader } from '@/components/briefing/ui'

export const dynamic = 'force-dynamic'

const NOT_CONNECTED = [
  ['NMI Education', 'Live sales come from NMI Automation OS / Odoo — no connector is built yet (NMI exposes only staff-session reports today).'],
  ['DROS Construction', 'No accounting system connected; projects and quotations only.'],
  ['Rogers Nforgwei Programmes', 'Registration payments are in the Rogers website database; not yet fed to the briefing centre.'],
] as const

export default async function FinanceIndex() {
  const access = await requireBriefingPage()
  const mode = getBriefingMode()
  const companies = (await financeCompanies(modeFlag())).filter((c) => canView(access, c))
  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <PageHeader title="Finance & sales" subtitle="One company at a time — figures from different entities are never added together" />
      <ModeBanner mode={mode} />
      <BriefingNav current="/briefing/finance" showDemo={mode === 'demo' && access.user.globalRole === 'SUPER_ADMIN'} />
      <Card title="Companies with sales data">
        {companies.length === 0 ? <Empty>No company has sales records in this mode.</Empty> : (
          <ul className="space-y-1">{companies.map((c) => <li key={c}><Link href={`/briefing/finance/${c}`} className="block rounded-md px-2 py-2 text-sm text-mgi-text hover:bg-white/5">{companyLabel(c)} →</Link></li>)}</ul>
        )}
      </Card>
      {mode === 'live' && (
        <Card title="Live sources not yet connected">
          <ul className="space-y-2 text-sm">{NOT_CONNECTED.map(([c, why]) => <li key={c}><b className="text-mgi-text">{c}</b> <span className="text-mgi-muted">— {why}</span></li>)}</ul>
        </Card>
      )}
    </div>
  )
}
