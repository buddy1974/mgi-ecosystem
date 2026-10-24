import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { requireBriefingPage, companyFilter } from '@/lib/briefing/access'
import { getBriefingMode, modeFlag } from '@/lib/briefing/mode'
import { BriefingNav, Card, CompanyChip, DemoTag, Empty, ModeBanner, PageHeader, fmtDate } from '@/components/briefing/ui'

export const dynamic = 'force-dynamic'

interface Props { searchParams: Promise<{ q?: string | string[] }> }

export default async function MeetingsPage({ searchParams }: Props) {
  const access = await requireBriefingPage()
  const isDemo = modeFlag()
  const raw = (await searchParams).q
  const q = (typeof raw === 'string' ? raw : '').trim().slice(0, 80)
  const meetings = await prisma.execMeeting.findMany({
    where: {
      isDemo, ...companyFilter(access),
      ...(q ? { OR: [
        { title: { contains: q, mode: 'insensitive' as const } }, { minutes: { contains: q, mode: 'insensitive' as const } },
        { decisions: { some: { text: { contains: q, mode: 'insensitive' as const } } } },
      ] } : {}),
    },
    include: { decisions: { include: { commitments: { select: { status: true, dueAt: true } } } } },
    orderBy: { heldAt: 'desc' },
  })
  const now = new Date()
  const mode = getBriefingMode()
  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <PageHeader title="Meetings & resolutions" subtitle="Minutes, decisions and follow-up — permanently searchable" />
      <ModeBanner mode={mode} />
      <BriefingNav current="/briefing/meetings" showDemo={mode === 'demo' && access.user.globalRole === 'SUPER_ADMIN'} />
      <Card>
        <form role="search" className="flex gap-2">
          <input name="q" defaultValue={q} aria-label="Search meetings" placeholder="Search minutes and resolutions…" className="min-w-0 flex-1 rounded-md border border-mgi-border bg-mgi-input px-3 py-2 text-sm text-mgi-text placeholder:text-mgi-label" />
          <button className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black">Search</button>
        </form>
      </Card>
      {meetings.length === 0 ? <Card><Empty>No meeting found.</Empty></Card> : meetings.map((m) => {
        const cmts = m.decisions.flatMap((d) => d.commitments)
        const late = cmts.filter((c) => !['DELIVERED', 'ACCEPTED', 'CANCELLED'].includes(c.status) && c.dueAt < now).length
        return (
          <Link key={m.id} href={`/briefing/meetings/${m.id}`} className="block rounded-card border border-mgi-border bg-mgi-card/40 p-4 hover:bg-white/5">
            <div className="flex flex-wrap items-center gap-2"><span className="text-sm font-medium text-white">{m.title}</span><CompanyChip slug={m.companySlug} /><DemoTag show={m.isDemo} /></div>
            <p className="mt-1 text-xs text-mgi-muted">{fmtDate(m.heldAt)} · chaired by {m.chair} · {m.decisions.length} resolution(s) · {cmts.length} commitment(s){late ? ` · ${late} overdue` : ''}</p>
            {m.summary && <p className="mt-2 text-sm text-mgi-text">{m.summary}</p>}
          </Link>
        )
      })}
    </div>
  )
}
