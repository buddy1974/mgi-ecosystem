import Link from 'next/link'
import { notFound } from 'next/navigation'
import { minDueDate } from '@/lib/briefing/links'
import { prisma } from '@/lib/prisma'
import type { ExecRecord } from '@mgi/database'
import { requireBriefingPage, canDecide, canView } from '@/lib/briefing/access'
import { getBriefingMode, modeFlag } from '@/lib/briefing/mode'
import { invoiceBalances } from '@/lib/briefing/metrics'
import { splitFinanceRows } from '@/lib/briefing/data'
import { companyLabel } from '@/lib/briefing/types'
import { domainLabel } from '@/lib/briefing/format'
import { recordActionForm } from '../../actions'
import { Card, CompanyChip, DemoTag, Empty, Flash, KV, ModeBanner, PageHeader, PriorityBadge, StatusBadge, Timeline, fmtDate, fmtDateTime, xaf } from '@/components/briefing/ui'

export const dynamic = 'force-dynamic'

interface Props { params: Promise<{ id: string }>; searchParams: Promise<{ ok?: string; err?: string }> }

const input = 'w-full rounded-md border border-mgi-border bg-mgi-input px-3 py-2 text-sm text-mgi-text placeholder:text-mgi-label'
const btn = 'rounded-md px-3 py-2 text-sm font-semibold'

type Line = { productRef: string; title: string; qty: number; unitPrice?: number }

function LinesTable({ lines }: { lines: Line[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="text-left text-[10px] uppercase tracking-widest text-mgi-label"><th className="py-1">Title</th><th className="py-1 text-right">Qty</th>{lines[0]?.unitPrice !== undefined && <><th className="py-1 text-right">Unit</th><th className="py-1 text-right">Total</th></>}</tr></thead>
        <tbody>
          {lines.map((l) => (
            <tr key={l.productRef} className="border-t border-mgi-border">
              <td className="py-1 text-mgi-text">{l.title}</td><td className="py-1 text-right">{l.qty}</td>
              {l.unitPrice !== undefined && <><td className="py-1 text-right text-mgi-muted">{xaf(l.unitPrice)}</td><td className="py-1 text-right">{xaf(l.qty * l.unitPrice)}</td></>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RecordLink({ r }: { r: Pick<ExecRecord, 'id' | 'ref' | 'title' | 'status' | 'amount' | 'recordType'> }) {
  return (
    <Link href={`/briefing/records/${r.id}`} className="flex flex-wrap items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5">
      <span className="font-mono text-[11px] text-mgi-label">{r.ref}</span>
      <span className="flex-1 text-mgi-text">{r.title}</span>
      <StatusBadge status={r.status} />
      {r.amount !== null && <span className="text-xs text-mgi-muted">{xaf(r.amount)}</span>}
    </Link>
  )
}

/** Customer statement: every invoice and payment for this customer, with balances. */
async function CustomerStatement({ rec, isDemo }: { rec: ExecRecord; isDemo: boolean }) {
  const rows = await prisma.execRecord.findMany({
    where: { isDemo, companySlug: rec.companySlug, recordType: { in: ['INVOICE', 'PAYMENT'] }, data: { path: ['customerRef'], equals: rec.ref } },
    orderBy: { occurredAt: 'asc' },
  })
  const { invoices, payments } = splitFinanceRows(rows)
  const balances = invoiceBalances(invoices, payments, new Date())
  const total = balances.reduce((s, b) => s + b.outstanding, 0)
  const overdue = balances.filter((b) => b.daysOverdue > 0).reduce((s, b) => s + b.outstanding, 0)
  const credit = (rec.data as { creditLimit?: number } | null)?.creditLimit
  return (
    <Card title="Customer statement">
      <KV rows={[['Balance outstanding', xaf(total)], ['Of which overdue', <span key="o" className={overdue ? 'text-status-risk' : ''}>{xaf(overdue)}</span>], ['Credit limit', credit ? xaf(credit) : '—'], ['Invoices', String(balances.length)]]} />
      {balances.length === 0 ? <div className="mt-3"><Empty>No invoices for this customer.</Empty></div> : (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-[10px] uppercase tracking-widest text-mgi-label"><th className="py-1">Invoice</th><th className="py-1">Due</th><th className="py-1 text-right">Amount</th><th className="py-1 text-right">Paid</th><th className="py-1 text-right">Outstanding</th></tr></thead>
            <tbody>
              {balances.slice(-25).map((b) => (
                <tr key={b.id} className="border-t border-mgi-border">
                  <td className="py-1"><Link className="text-sky-400 hover:underline" href={`/briefing/records/${b.id}`}>{b.ref}</Link></td>
                  <td className="py-1 text-mgi-muted">{fmtDate(b.dueAt)}{b.daysOverdue > 0 && <span className="ml-1 text-status-risk">+{b.daysOverdue} d</span>}</td>
                  <td className="py-1 text-right">{xaf(b.amount)}</td><td className="py-1 text-right text-mgi-muted">{xaf(b.paid)}</td><td className="py-1 text-right">{xaf(b.outstanding)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {balances.length > 25 && <p className="mt-1 text-[11px] text-mgi-label">Showing the latest 25 of {balances.length} invoices.</p>}
        </div>
      )}
      <p className="mt-2 text-[11px] text-mgi-label">Read-only view for executives. Statements to customers are sent from the source accounting system, never from here.</p>
    </Card>
  )
}

function DataPanel({ rec }: { rec: ExecRecord }) {
  const d = (rec.data ?? {}) as Record<string, unknown>
  const skip = new Set(['lines', 'milestones', 'evidence', 'customerRef', 'invoiceRef', 'productRef', 'unblocksCommitmentRef'])
  const rows = Object.entries(d).filter(([k, v]) => !skip.has(k) && (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean'))
    .map(([k, v]) => [k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase()), typeof v === 'number' && /limit|amount|credit/i.test(k) ? xaf(v) : String(v)] as [string, string])
  return (
    <>
      {rows.length > 0 && <Card title="Details"><KV rows={rows} /></Card>}
      {Array.isArray(d.lines) && <Card title="Lines"><LinesTable lines={d.lines as Line[]} /></Card>}
      {Array.isArray(d.milestones) && (
        <Card title="Milestones">
          <ol className="space-y-1 text-sm">{(d.milestones as { name: string; status: string }[]).map((m) => <li key={m.name} className="flex justify-between gap-2"><span className="text-mgi-text">{m.name}</span><span className="text-mgi-muted">{m.status}</span></li>)}</ol>
        </Card>
      )}
      {Array.isArray(d.evidence) && (
        <Card title="Evidence"><ul className="list-disc space-y-1 pl-5 text-sm text-mgi-text">{(d.evidence as string[]).map((e) => <li key={e}>{e}</li>)}</ul></Card>
      )}
    </>
  )
}

export default async function RecordPage({ params, searchParams }: Props) {
  const access = await requireBriefingPage()
  const isDemo = modeFlag()
  const { id } = await params
  const { ok, err } = await searchParams
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) notFound()
  const rec = await prisma.execRecord.findFirst({ where: { id, isDemo } })
  // Not found and not permitted look the same.
  if (!rec || !canView(access, rec.companySlug)) notFound()

  const [parent, children, commitments, events, history] = await Promise.all([
    rec.parentRef ? prisma.execRecord.findFirst({ where: { ref: rec.parentRef, isDemo } }) : null,
    prisma.execRecord.findMany({ where: { parentRef: rec.ref, isDemo }, orderBy: { occurredAt: 'asc' }, take: 50 }),
    prisma.execCommitment.findMany({ where: { recordId: rec.id, isDemo }, orderBy: { createdAt: 'desc' } }),
    prisma.execEvent.findMany({ where: { subjectType: 'RECORD', subjectId: rec.id, isDemo }, orderBy: { createdAt: 'desc' } }),
    prisma.execActivity.findMany({ where: { subjectType: 'RECORD', subjectId: rec.id, isDemo }, orderBy: { createdAt: 'desc' }, take: 50 }),
  ])
  const d = (rec.data ?? {}) as Record<string, unknown>
  const customer = typeof d.customerRef === 'string' ? await prisma.execRecord.findFirst({ where: { ref: d.customerRef, isDemo }, select: { id: true, title: true } }) : null
  const unblocks = typeof d.unblocksCommitmentRef === 'string' ? await prisma.execCommitment.findFirst({ where: { ref: d.unblocksCommitmentRef, isDemo }, select: { id: true, title: true, status: true } }) : null
  const decide = canDecide(access, rec.companySlug)
  const closed = rec.execStatus === 'CLOSED'
  let balance: ReturnType<typeof invoiceBalances>[number] | null = null
  if (rec.recordType === 'INVOICE') {
    const { invoices, payments } = splitFinanceRows([rec, ...children])
    balance = invoiceBalances(invoices, payments, new Date())[0] ?? null
  }
  const tomorrow = minDueDate()

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <PageHeader title={rec.title} back={{ href: '/briefing/records', label: 'Records' }}
        subtitle={<span className="flex flex-wrap items-center gap-2 normal-case tracking-normal"><span className="font-mono">{rec.ref}</span><CompanyChip slug={rec.companySlug} /><StatusBadge status={rec.status} /><StatusBadge status={rec.execStatus} tone="muted" /><DemoTag show={rec.isDemo} /></span>} />
      <ModeBanner mode={getBriefingMode()} />
      <Flash ok={ok} err={err} />

      <Card>
        {rec.summary && <p className="mb-3 whitespace-pre-line text-sm text-mgi-text">{rec.summary}</p>}
        <KV rows={[
          ['Company', companyLabel(rec.companySlug)], ['Domain', domainLabel(rec.domain)], ['Type', rec.recordType.replace(/_/g, ' ').toLowerCase()],
          ['Amount', rec.amount !== null ? xaf(rec.amount) : null], ['Date', fmtDateTime(rec.occurredAt)], ['Due', rec.dueAt ? fmtDate(rec.dueAt) : null],
          ['Source system', rec.sourceSystem === 'DEMO' ? 'DEMO (fictional — no source system)' : rec.sourceSystem], ['Source reference', rec.sourceRef],
          ['Customer', customer ? <Link key="c" href={`/briefing/records/${customer.id}`} className="text-sky-400 hover:underline">{customer.title}</Link> : null],
          ['Executive status', rec.execStatus.replace(/_/g, ' ').toLowerCase()],
        ]} />
      </Card>

      {balance && (
        <Card title="Invoice balance">
          <KV rows={[['Invoiced', xaf(balance.amount)], ['Received', xaf(balance.paid)], ['Outstanding', xaf(balance.outstanding)], ['Days overdue', balance.daysOverdue ? <span key="d" className="text-status-risk">{balance.daysOverdue}</span> : '0']]} />
        </Card>
      )}

      <DataPanel rec={rec} />
      {rec.recordType === 'CUSTOMER' && <CustomerStatement rec={rec} isDemo={isDemo} />}

      {(parent || children.length > 0 || unblocks) && (
        <Card title="Related records">
          {parent && <><p className="text-[10px] uppercase tracking-widest text-mgi-label">Belongs to</p><RecordLink r={parent} /></>}
          {children.length > 0 && <><p className="mt-2 text-[10px] uppercase tracking-widest text-mgi-label">Linked</p>{children.map((c) => <RecordLink key={c.id} r={c} />)}</>}
          {unblocks && <><p className="mt-2 text-[10px] uppercase tracking-widest text-mgi-label">Unblocks commitment</p>
            <Link href={`/briefing/commitments/${unblocks.id}`} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5"><span className="flex-1 text-mgi-text">{unblocks.title}</span><StatusBadge status={unblocks.status} /></Link></>}
        </Card>
      )}

      <Card title="Actions">
        <div className="space-y-4">
          {rec.recordType === 'APPROVAL_REQUEST' && rec.status === 'PENDING' && (
            decide ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <form action={recordActionForm} className="space-y-2">
                  <input type="hidden" name="id" value={rec.id} /><input type="hidden" name="action" value="approve" />
                  <input name="note" maxLength={500} placeholder="Note (optional)" className={input} aria-label="Approval note" />
                  <button className={`${btn} w-full bg-emerald-500 text-black`}>Approve</button>
                </form>
                <form action={recordActionForm} className="space-y-2">
                  <input type="hidden" name="id" value={rec.id} /><input type="hidden" name="action" value="decline" />
                  <input name="note" required maxLength={500} placeholder="Reason (required)" className={input} aria-label="Decline reason" />
                  <button className={`${btn} w-full border border-red-500/50 text-red-300`}>Decline</button>
                </form>
              </div>
            ) : <Empty>Only an executive or a company admin can decide this request.</Empty>
          )}
          {rec.execStatus === 'NEW' && (
            <form action={recordActionForm} className="flex flex-col gap-2 sm:flex-row">
              <input type="hidden" name="id" value={rec.id} /><input type="hidden" name="action" value="acknowledge" />
              <input name="note" maxLength={500} placeholder="Note (optional)" className={input} aria-label="Acknowledgement note" />
              <button className={`${btn} bg-white text-black`}>Acknowledge</button>
            </form>
          )}
          {!closed && decide && rec.recordType !== 'APPROVAL_REQUEST' && (
            <details className="rounded-md border border-mgi-border p-3">
              <summary className="cursor-pointer text-sm font-medium text-mgi-text">Request an action (creates a tracked commitment)</summary>
              <form action={recordActionForm} className="mt-3 grid gap-2 sm:grid-cols-2">
                <input type="hidden" name="id" value={rec.id} /><input type="hidden" name="action" value="request_action" />
                <input name="title" required maxLength={160} placeholder="What must be done" className={`${input} sm:col-span-2`} aria-label="Action title" />
                <textarea name="deliverable" required maxLength={1000} placeholder="Agreed deliverable / evidence expected" className={`${input} sm:col-span-2`} aria-label="Deliverable" />
                <input name="ownerRole" required maxLength={80} placeholder="Responsible role" className={input} aria-label="Responsible role" />
                <input name="ownerName" required maxLength={80} placeholder="Responsible person" className={input} aria-label="Responsible person" />
                <label className="text-xs text-mgi-muted sm:col-span-2">Due date <input type="date" name="dueDate" required min={tomorrow} className={`${input} mt-1`} /></label>
                <button className={`${btn} bg-white text-black sm:col-span-2`}>Assign</button>
              </form>
            </details>
          )}
          {!closed && decide && (
            <form action={recordActionForm} className="flex flex-col gap-2 sm:flex-row">
              <input type="hidden" name="id" value={rec.id} /><input type="hidden" name="action" value="close" />
              <input name="note" required maxLength={500} placeholder="Closing note (required)" className={input} aria-label="Closing note" />
              <button className={`${btn} border border-mgi-border text-mgi-muted`}>Close</button>
            </form>
          )}
          {closed && <Empty>Closed for executive follow-up. The source system keeps its own status ({rec.status.toLowerCase()}).</Empty>}
          {!decide && !closed && rec.execStatus !== 'NEW' && rec.recordType !== 'APPROVAL_REQUEST' && <Empty>No action available for your role.</Empty>}
          <p className="text-[11px] text-mgi-label">Actions record the executive decision in the OS only. Nothing is sent to customers or posted to accounting from here.</p>
        </div>
      </Card>

      {commitments.length > 0 && (
        <Card title="Assigned actions">
          {commitments.map((c) => (
            <Link key={c.id} href={`/briefing/commitments/${c.id}`} className="flex flex-wrap items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5">
              <span className="flex-1 text-mgi-text">{c.title}</span><span className="text-xs text-mgi-muted">{c.ownerRole} · due {fmtDate(c.dueAt)}</span><StatusBadge status={c.status} />
            </Link>
          ))}
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Notifications raised">
          {events.length === 0 ? <Empty>None.</Empty> : (
            <ul className="space-y-2 text-sm">{events.map((e) => <li key={e.id} className="flex flex-wrap items-center gap-2"><PriorityBadge priority={e.priority} /><span className="flex-1 text-mgi-text">{e.subject}</span><span className="text-[11px] text-mgi-label">{e.routing ?? 'queued'} · {fmtDateTime(e.createdAt)}</span></li>)}</ul>
          )}
        </Card>
        <Card title="History"><Timeline items={history} /></Card>
      </div>
    </div>
  )
}
