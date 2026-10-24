import Link from 'next/link'
import { notFound } from 'next/navigation'
import { minDueDate } from '@/lib/briefing/links'
import { prisma } from '@/lib/prisma'
import { requireBriefingPage, canDecide, canView } from '@/lib/briefing/access'
import { getBriefingMode, modeFlag } from '@/lib/briefing/mode'
import { isOverdue } from '@/lib/briefing/accountability'
import { DELAY_CAUSES, DELAY_CAUSE_LABEL, type DelayCause } from '@/lib/briefing/types'
import { commitmentActionForm } from '../../actions'
import { Card, CompanyChip, DemoTag, Empty, Flash, KV, ModeBanner, PageHeader, PriorityBadge, StatusBadge, Timeline, fmtDate, fmtDateTime } from '@/components/briefing/ui'

export const dynamic = 'force-dynamic'

interface Props { params: Promise<{ id: string }>; searchParams: Promise<{ ok?: string; err?: string }> }

const input = 'w-full rounded-md border border-mgi-border bg-mgi-input px-3 py-2 text-sm text-mgi-text placeholder:text-mgi-label'
const btn = 'rounded-md px-3 py-2 text-sm font-semibold'

function Hidden({ id, action }: { id: string; action: string }) {
  return <><input type="hidden" name="id" value={id} /><input type="hidden" name="action" value={action} /></>
}

function CauseSelect() {
  return (
    <select name="delayCause" required className={input} aria-label="Cause" defaultValue="">
      <option value="" disabled>Cause…</option>
      {DELAY_CAUSES.map((c) => <option key={c} value={c}>{DELAY_CAUSE_LABEL[c]}</option>)}
    </select>
  )
}

export default async function CommitmentPage({ params, searchParams }: Props) {
  const access = await requireBriefingPage()
  const isDemo = modeFlag()
  const { id } = await params
  const { ok, err } = await searchParams
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) notFound()
  const c = await prisma.execCommitment.findFirst({ where: { id, isDemo }, include: { decision: { include: { meeting: { select: { id: true, title: true, heldAt: true } } } } } })
  if (!c || !canView(access, c.companySlug)) notFound()
  const [history, events, record] = await Promise.all([
    prisma.execActivity.findMany({ where: { subjectType: 'COMMITMENT', subjectId: c.id, isDemo }, orderBy: { createdAt: 'desc' } }),
    prisma.execEvent.findMany({ where: { subjectType: 'COMMITMENT', subjectId: c.id, isDemo }, orderBy: { createdAt: 'desc' } }),
    c.recordId ? prisma.execRecord.findFirst({ where: { id: c.recordId, isDemo }, select: { id: true, ref: true, title: true } }) : null,
  ])
  const now = new Date()
  const late = isOverdue(c, now)
  const decide = canDecide(access, c.companySlug)
  const working = ['OPEN', 'IN_PROGRESS'].includes(c.status)
  const tomorrow = minDueDate()

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <PageHeader title={c.title} back={{ href: '/briefing/commitments', label: 'Commitments' }}
        subtitle={<span className="flex flex-wrap items-center gap-2 normal-case tracking-normal"><span className="font-mono">{c.ref}</span><CompanyChip slug={c.companySlug} /><StatusBadge status={c.status} />{late && <StatusBadge status="OVERDUE" />}<DemoTag show={c.isDemo} /></span>} />
      <ModeBanner mode={getBriefingMode()} />
      <Flash ok={ok} err={err} />

      <Card>
        <p className="mb-3 whitespace-pre-line text-sm text-mgi-text">{c.deliverable}</p>
        <div className="mb-3">
          <div className="h-2 w-full overflow-hidden rounded bg-white/10"><div className={`h-full ${late ? 'bg-status-risk' : 'bg-status-active'}`} style={{ width: `${c.progress}%` }} /></div>
          <p className="mt-1 text-xs text-mgi-muted">{c.progress}% complete</p>
        </div>
        <KV rows={[
          ['Responsible role', c.ownerRole], ['Responsible person', c.ownerName], ['Committed on', fmtDate(c.committedAt)],
          ['Due', <span key="d" className={late ? 'text-status-risk' : ''}>{fmtDate(c.dueAt)}{late ? ` (${Math.max(1, Math.floor((now.getTime() - c.dueAt.getTime()) / 86_400_000))} days late)` : ''}</span>],
          ['Delivered', c.deliveredAt ? fmtDateTime(c.deliveredAt) : null], ['Accepted', c.acceptedAt ? `${fmtDateTime(c.acceptedAt)} by ${c.acceptedBy}` : null],
          ['Delay cause', c.delayCause ? DELAY_CAUSE_LABEL[c.delayCause as DelayCause] ?? c.delayCause : null], ['Blocker', c.blocker],
          ['Evidence of delivery', c.evidence],
          ['From decision', c.decision ? <Link key="m" href={`/briefing/meetings/${c.decision.meeting.id}#${c.decision.id}`} className="text-sky-400 hover:underline">{c.decision.ref} — {c.decision.meeting.title}</Link> : null],
          ['From record', record ? <Link key="r" href={`/briefing/records/${record.id}`} className="text-sky-400 hover:underline">{record.ref} — {record.title}</Link> : null],
        ]} />
      </Card>

      <Card title="Update">
        <div className="space-y-4">
          {working && (
            <form action={commitmentActionForm} className="grid gap-2 sm:grid-cols-[120px_1fr_auto]">
              <Hidden id={c.id} action="progress" />
              <input type="number" name="progress" min={0} max={99} required defaultValue={c.progress} className={input} aria-label="Progress percent" />
              <input name="note" maxLength={500} placeholder="What changed (optional)" className={input} aria-label="Progress note" />
              <button className={`${btn} bg-white text-black`}>Update progress</button>
            </form>
          )}
          {working && (
            <form action={commitmentActionForm} className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <Hidden id={c.id} action="deliver" />
              <textarea name="evidence" required maxLength={1000} placeholder="Evidence of delivery (document, reference, result)" className={input} aria-label="Evidence" />
              <button className={`${btn} bg-emerald-500 text-black`}>Mark delivered</button>
            </form>
          )}
          {working && (
            <form action={commitmentActionForm} className="grid gap-2 sm:grid-cols-[200px_1fr_auto]">
              <Hidden id={c.id} action="block" />
              <CauseSelect />
              <input name="blocker" required maxLength={500} placeholder="What is blocking" className={input} aria-label="Blocker" />
              <button className={`${btn} border border-red-500/50 text-red-300`}>Report blocker</button>
            </form>
          )}
          {c.status === 'BLOCKED' && (
            <form action={commitmentActionForm} className="flex flex-col gap-2 sm:flex-row">
              <Hidden id={c.id} action="unblock" />
              <input name="note" maxLength={500} placeholder="How it was resolved (optional)" className={input} aria-label="Resolution note" />
              <button className={`${btn} bg-white text-black`}>Unblock</button>
            </form>
          )}
          {c.status === 'DELIVERED' && (decide ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <form action={commitmentActionForm} className="space-y-2">
                <Hidden id={c.id} action="accept" />
                <input name="note" maxLength={500} placeholder="Note (optional)" className={input} aria-label="Acceptance note" />
                <button className={`${btn} w-full bg-emerald-500 text-black`}>Accept delivery</button>
              </form>
              <form action={commitmentActionForm} className="space-y-2">
                <Hidden id={c.id} action="reject_delivery" />
                <input name="note" required maxLength={500} placeholder="What is missing (required)" className={input} aria-label="Return reason" />
                <button className={`${btn} w-full border border-mgi-border text-mgi-muted`}>Return to owner</button>
              </form>
            </div>
          ) : <Empty>Delivered — waiting for an executive to accept it.</Empty>)}
          {decide && ['OPEN', 'IN_PROGRESS', 'BLOCKED'].includes(c.status) && (
            <details className="rounded-md border border-mgi-border p-3">
              <summary className="cursor-pointer text-sm font-medium text-mgi-text">Change the due date (history is kept)</summary>
              <form action={commitmentActionForm} className="mt-3 grid gap-2 sm:grid-cols-2">
                <Hidden id={c.id} action="reschedule" />
                <input type="date" name="dueDate" required min={tomorrow} className={input} aria-label="New due date" />
                <CauseSelect />
                <input name="note" required maxLength={500} placeholder="Reason" className={`${input} sm:col-span-2`} aria-label="Reason" />
                <button className={`${btn} bg-white text-black sm:col-span-2`}>Reschedule</button>
              </form>
            </details>
          )}
          {['ACCEPTED', 'CANCELLED'].includes(c.status) && <Empty>This commitment is closed.</Empty>}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Notifications raised">
          {events.length === 0 ? <Empty>None.</Empty> : <ul className="space-y-2 text-sm">{events.map((e) => <li key={e.id} className="flex flex-wrap items-center gap-2"><PriorityBadge priority={e.priority} /><span className="flex-1 text-mgi-text">{e.subject}</span><span className="text-[11px] text-mgi-label">{e.routing ?? 'queued'}</span></li>)}</ul>}
        </Card>
        <Card title="History"><Timeline items={history} /></Card>
      </div>
    </div>
  )
}
