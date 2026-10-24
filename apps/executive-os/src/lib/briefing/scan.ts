import { prisma } from '@/lib/prisma'
import { emitEvent } from './events'
import { invoiceBalances, pctChange, sum } from './metrics'
import { loadFinanceRows, financeCompanies } from './data'
import { formatXaf } from './format'
import { doualaDate, doualaDayStart } from './rules'

// Time-based detectors. Run by the n8n "scan" schedule (and the demo panel). Each finding is
// an event with a stable dedupe key, so running the scan every 15 minutes produces each
// alert once; a follow-up is raised only when the situation gets materially worse
// (receivable ageing bucket, a new due date, a new week).

const DAY = 86_400_000

export interface ScanResult { created: number; duplicates: number; findings: string[] }

export async function runScan(isDemo: boolean, now = new Date()): Promise<ScanResult> {
  const out: ScanResult = { created: 0, duplicates: 0, findings: [] }
  const tally = (r: { created: boolean }, label: string) => {
    if (r.created) { out.created++; out.findings.push(label) } else out.duplicates++
  }

  // 1. Commitments past due and not delivered.
  const overdue = await prisma.execCommitment.findMany({
    where: { isDemo, status: { in: ['OPEN', 'IN_PROGRESS', 'BLOCKED'] }, dueAt: { lt: now } },
  })
  for (const c of overdue) {
    const days = Math.floor((now.getTime() - c.dueAt.getTime()) / DAY)
    tally(await emitEvent({
      dedupeKey: `commitment-overdue:${c.id}:${c.dueAt.toISOString().slice(0, 10)}`,
      companySlug: c.companySlug, domain: 'GOVERNANCE', kind: 'COMMITMENT_OVERDUE', isDemo,
      subject: `Overdue: ${c.title}`,
      summary: `${c.ownerRole} (${c.ownerName}) committed to deliver by ${c.dueAt.toISOString().slice(0, 10)}. ${days} day${days === 1 ? '' : 's'} late, progress ${c.progress}%.${c.blocker ? ` Blocker: ${c.blocker}` : ''}`,
      facts: { daysLate: days, progress: c.progress, delayCause: c.delayCause, display: { Owner: c.ownerRole, 'Days late': days, Progress: `${c.progress}%`, ...(c.delayCause ? { Cause: c.delayCause } : {}) } },
      actionRequired: c.delayCause === 'MANAGEMENT_DEPENDENCY' ? 'Decide on the blocking request' : 'Ask for a revised date or escalate',
      subjectType: 'COMMITMENT', subjectId: c.id, occurredAt: now,
    }), `commitment overdue ${c.ref}`)
  }

  // 2. Overdue receivables, raised again at 30 / 60 / 90 days.
  for (const companySlug of await financeCompanies(isDemo)) {
    const { orders, invoices, payments } = await loadFinanceRows(companySlug, isDemo, new Date(now.getTime() - 21 * DAY))
    for (const b of invoiceBalances(invoices, payments, now)) {
      if (b.daysOverdue < 30) continue
      const bucket = b.daysOverdue >= 90 ? 90 : b.daysOverdue >= 60 ? 60 : 30
      tally(await emitEvent({
        dedupeKey: `receivable-overdue:${b.id}:${bucket}`,
        companySlug, domain: 'RECEIVABLES', kind: 'RECEIVABLE_OVERDUE', isDemo,
        subject: `${b.customerName}: ${formatXaf(b.outstanding)} overdue ${b.daysOverdue} days`,
        summary: `Invoice ${b.ref} (${formatXaf(b.amount)}) — ${formatXaf(b.paid)} received, ${formatXaf(b.outstanding)} outstanding, due ${b.dueAt?.toISOString().slice(0, 10)}.`,
        facts: { outstanding: b.outstanding, daysOverdue: b.daysOverdue, display: { Invoice: b.ref, Outstanding: formatXaf(b.outstanding), 'Days overdue': b.daysOverdue, Paid: formatXaf(b.paid) } },
        actionRequired: 'Confirm the collection plan with the finance manager',
        subjectType: 'RECORD', subjectId: b.id, occurredAt: now,
      }), `receivable ${b.ref} ${bucket}d`)
    }

    // 3. Week-on-week shop (POS) sales change per branch (rolling 7 days vs the 7 before), once a
    //    week. Distributor orders are lumpy and excluded; they are covered by receivables.
    const tomorrow = new Date(doualaDayStart(now).getTime() + DAY)
    const w0 = new Date(tomorrow.getTime() - 7 * DAY), w1 = new Date(tomorrow.getTime() - 14 * DAY)
    const week = doualaDate(new Date(now.getTime() - ((now.getUTCDay() + 6) % 7) * DAY)) // Monday of this week
    for (const branch of [...new Set(orders.filter((o) => o.data.channel === 'SHOP').map((o) => o.data.branch))]) {
      const rows = orders.filter((o) => o.data.branch === branch && o.data.channel === 'SHOP')
      const cur = sum(rows.filter((o) => o.occurredAt >= w0 && o.occurredAt < tomorrow).map((o) => o.amount))
      const prev = sum(rows.filter((o) => o.occurredAt >= w1 && o.occurredAt < w0).map((o) => o.amount))
      const change = pctChange(cur, prev)
      if (change === null || Math.abs(change) < 15 || prev < 500_000) continue
      tally(await emitEvent({
        dedupeKey: `sales-change:${companySlug}:${branch}:${week}`,
        companySlug, domain: 'SALES', kind: 'SALES_CHANGE', isDemo,
        subject: `${branch}: shop sales ${change > 0 ? 'up' : 'down'} ${Math.abs(change)}% week on week`,
        summary: `Last 7 days ${formatXaf(cur)} vs ${formatXaf(prev)} the 7 days before.`,
        facts: { changePct: change, display: { Branch: branch, 'Last 7 days': formatXaf(cur), 'Previous 7 days': formatXaf(prev), Change: `${change}%` } },
        actionRequired: change < 0 ? 'Ask the branch manager for the cause' : null,
        subjectType: 'FINANCE', subjectId: companySlug, occurredAt: now,
      }), `sales change ${branch}`)
    }
  }

  // 4. Stock below one week of demand.
  const levels = await prisma.execRecord.findMany({ where: { isDemo, recordType: 'STOCK_LEVEL' } })
  for (const s of levels) {
    const d = s.data as { qty: number; weeklyDemand: number; branch: string; title: string; topTitle?: boolean }
    if (!(d.qty < d.weeklyDemand)) continue
    tally(await emitEvent({
      dedupeKey: `stock-low:${s.id}:${doualaDate(now)}`,
      companySlug: s.companySlug, domain: 'INVENTORY', kind: 'STOCK_EXCEPTION', isDemo,
      subject: `${d.title} — ${d.branch}: ${d.qty} left, ${d.weeklyDemand}/week demand`,
      summary: `Stock covers ${Math.max(0, Math.round((d.qty / d.weeklyDemand) * 7))} days of sales at ${d.branch}.`,
      facts: { stockout: d.qty === 0 || d.qty < d.weeklyDemand / 4, topTitle: d.topTitle === true, display: { Branch: d.branch, 'In stock': d.qty, 'Weekly demand': d.weeklyDemand } },
      actionRequired: 'Approve a transfer from central stock or a reprint',
      subjectType: 'RECORD', subjectId: s.id, occurredAt: now,
    }), `stock ${s.ref}`)
  }

  // 5. Programme registrations started but not completed after 48 hours.
  const stale = await prisma.execRecord.findMany({
    where: { isDemo, recordType: 'REGISTRATION', status: 'INITIATED', occurredAt: { lt: new Date(now.getTime() - 2 * DAY) } },
  })
  for (const r of stale) {
    tally(await emitEvent({
      dedupeKey: `registration-incomplete:${r.id}`,
      companySlug: r.companySlug, domain: 'PROGRAMME', kind: 'REGISTRATION_INCOMPLETE', isDemo,
      subject: `Incomplete registration: ${r.title}`,
      summary: `Started ${r.occurredAt.toISOString().slice(0, 10)}, payment not completed.`,
      facts: { display: { Programme: String((r.data as { programme?: string })?.programme ?? '') } },
      actionRequired: 'Programme office to follow up',
      subjectType: 'RECORD', subjectId: r.id, occurredAt: now,
    }), `registration ${r.ref}`)
  }

  return out
}
