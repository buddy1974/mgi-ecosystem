import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { requireBriefingPage, companyFilter } from '@/lib/briefing/access'
import { getBriefingMode, modeFlag } from '@/lib/briefing/mode'
import { RECORD_TYPES, isOneOf, companyLabel } from '@/lib/briefing/types'
import { BriefingNav, Card, CompanyChip, DemoTag, Empty, ModeBanner, PageHeader, StatusBadge, fmtDate, xaf } from '@/components/briefing/ui'

export const dynamic = 'force-dynamic'

interface Props { searchParams: Promise<Record<string, string | string[] | undefined>> }

const one = (v: string | string[] | undefined) => (typeof v === 'string' ? v : undefined)

export default async function RecordsPage({ searchParams }: Props) {
  const access = await requireBriefingPage()
  const isDemo = modeFlag()
  const sp = await searchParams
  const q = (one(sp.q) ?? '').trim().slice(0, 80)
  const type = isOneOf(RECORD_TYPES, one(sp.type)) ? one(sp.type)! : ''
  const company = /^[a-z]{2,12}$/.test(one(sp.company) ?? '') ? one(sp.company)! : ''
  const open = one(sp.open) === '1'
  const scope = companyFilter(access)
  const companyWhere = company ? (scope.companySlug ? { companySlug: { in: scope.companySlug.in.filter((c) => c === company) } } : { companySlug: company }) : scope

  const rows = await prisma.execRecord.findMany({
    where: {
      isDemo, ...companyWhere,
      ...(type ? { recordType: type } : { recordType: { notIn: ['STOCK_MOVEMENT', 'PAYMENT'] } }),
      ...(open ? { execStatus: { not: 'CLOSED' } } : {}),
      ...(q ? { OR: [{ title: { contains: q, mode: 'insensitive' as const } }, { ref: { contains: q.toUpperCase() } }, { summary: { contains: q, mode: 'insensitive' as const } }] } : {}),
    },
    orderBy: { occurredAt: 'desc' },
    take: 100,
  })

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <PageHeader title="Records" subtitle="Source-linked business records" />
      <ModeBanner mode={getBriefingMode()} />
      <BriefingNav current="/briefing/records" showDemo={getBriefingMode() === 'demo' && access.user.globalRole === 'SUPER_ADMIN'} />
      <Card>
        <form className="grid gap-2 sm:grid-cols-[1fr_auto_auto_auto_auto]" role="search">
          <input name="q" defaultValue={q} placeholder="Search title, reference, summary…" aria-label="Search"
            className="rounded-md border border-mgi-border bg-mgi-input px-3 py-2 text-sm text-mgi-text placeholder:text-mgi-label" />
          <select name="type" defaultValue={type} aria-label="Record type" className="rounded-md border border-mgi-border bg-mgi-input px-2 py-2 text-sm text-mgi-text">
            <option value="">All types</option>
            {RECORD_TYPES.map((t) => <option key={t} value={t}>{t.replace(/_/g, ' ').toLowerCase()}</option>)}
          </select>
          <select name="company" defaultValue={company} aria-label="Company" className="rounded-md border border-mgi-border bg-mgi-input px-2 py-2 text-sm text-mgi-text">
            <option value="">All companies</option>
            {['mgi', 'nmi', 'dros', 'rogers'].map((c) => <option key={c} value={c}>{companyLabel(c)}</option>)}
          </select>
          <label className="flex items-center gap-2 text-xs text-mgi-muted"><input type="checkbox" name="open" value="1" defaultChecked={open} /> open only</label>
          <button className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black">Search</button>
        </form>
      </Card>
      <Card title={`${rows.length}${rows.length === 100 ? '+' : ''} records`}>
        {rows.length === 0 ? <Empty>No record matches.</Empty> : (
          <ul className="divide-y divide-mgi-border">
            {rows.map((r) => (
              <li key={r.id}>
                <Link href={`/briefing/records/${r.id}`} className="flex flex-col gap-1 py-2 hover:bg-white/5 sm:flex-row sm:items-center sm:gap-3">
                  <span className="font-mono text-[11px] text-mgi-label sm:w-56">{r.ref}</span>
                  <span className="flex-1 text-sm text-mgi-text">{r.title}</span>
                  <span className="flex flex-wrap items-center gap-2">
                    <CompanyChip slug={r.companySlug} />
                    <StatusBadge status={r.status} />
                    {r.amount !== null && <span className="text-xs text-mgi-muted">{xaf(r.amount)}</span>}
                    <span className="text-xs text-mgi-label">{fmtDate(r.occurredAt)}</span>
                    <DemoTag show={r.isDemo} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
