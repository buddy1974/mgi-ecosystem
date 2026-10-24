import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireBriefingPage, canView } from '@/lib/briefing/access'
import { getBriefingMode, modeFlag } from '@/lib/briefing/mode'
import { isOverdue } from '@/lib/briefing/accountability'
import { Card, CompanyChip, DemoTag, Empty, KV, ModeBanner, PageHeader, StatusBadge, fmtDate } from '@/components/briefing/ui'

export const dynamic = 'force-dynamic'

interface Props { params: Promise<{ id: string }> }

export default async function MeetingPage({ params }: Props) {
  const access = await requireBriefingPage()
  const isDemo = modeFlag()
  const { id } = await params
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) notFound()
  const m = await prisma.execMeeting.findFirst({ where: { id, isDemo }, include: { decisions: { orderBy: { ref: 'asc' }, include: { commitments: { orderBy: { dueAt: 'asc' } } } } } })
  if (!m || !canView(access, m.companySlug)) notFound()
  const now = new Date()
  const docs = (Array.isArray(m.documents) ? m.documents : []) as { name: string; note?: string }[]
  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <PageHeader title={m.title} back={{ href: '/briefing/meetings', label: 'Meetings' }}
        subtitle={<span className="flex flex-wrap items-center gap-2 normal-case tracking-normal"><span className="font-mono">{m.ref}</span><CompanyChip slug={m.companySlug} /><DemoTag show={m.isDemo} /></span>} />
      <ModeBanner mode={getBriefingMode()} />
      <Card>
        <KV rows={[['Held', fmtDate(m.heldAt)], ['Chair', m.chair], ['Attendees', m.attendees.join(', ')], ['Summary', m.summary]]} />
      </Card>
      <Card title="Agenda"><ol className="list-decimal space-y-1 pl-5 text-sm text-mgi-text">{m.agenda.map((a) => <li key={a}>{a}</li>)}</ol></Card>
      <Card title="Minutes"><p className="whitespace-pre-line text-sm text-mgi-text">{m.minutes}</p></Card>
      <Card title={`Resolutions (${m.decisions.length})`}>
        {m.decisions.length === 0 ? <Empty>No resolutions recorded.</Empty> : (
          <ol className="space-y-4">
            {m.decisions.map((d) => (
              <li key={d.id} id={d.id} className="rounded-md border border-mgi-border p-3">
                <div className="flex flex-wrap items-center gap-2"><span className="font-mono text-[11px] text-mgi-label">{d.ref}</span><StatusBadge status={d.status} /></div>
                <p className="mt-1 text-sm text-white">{d.text}</p>
                {d.rationale && <p className="mt-1 text-xs text-mgi-muted">Why: {d.rationale}</p>}
                <ul className="mt-2 space-y-1">
                  {d.commitments.map((c) => (
                    <li key={c.id}>
                      <Link href={`/briefing/commitments/${c.id}`} className="flex flex-wrap items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-white/5">
                        <span className="flex-1 text-mgi-text">{c.title}</span>
                        <span className="text-xs text-mgi-muted">{c.ownerRole} · due {fmtDate(c.dueAt)} · {c.progress}%</span>
                        <StatusBadge status={c.status} />{isOverdue(c, now) && <StatusBadge status="OVERDUE" />}
                      </Link>
                    </li>
                  ))}
                  {d.commitments.length === 0 && <li className="text-xs text-mgi-label">No owner assigned.</li>}
                </ul>
              </li>
            ))}
          </ol>
        )}
      </Card>
      <Card title="Supporting documents">
        {docs.length === 0 ? <Empty>None attached.</Empty> : <ul className="space-y-1 text-sm">{docs.map((d) => <li key={d.name} className="text-mgi-text">📎 {d.name}{d.note && <span className="ml-2 text-xs text-mgi-label">{d.note}</span>}</li>)}</ul>}
      </Card>
    </div>
  )
}
