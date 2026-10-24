// Sales / receivables metrics computed from source-linked records. Pure — unit tested.
// Figures are always per company; nothing here adds amounts across companies.
import { DOUALA_OFFSET_MS, doualaDayStart } from './rules'

export interface OrderLine { productRef: string; title: string; qty: number; unitPrice: number }
export interface OrderRow { ref: string; amount: number; occurredAt: Date; data: { channel?: 'SHOP' | 'DISTRIBUTOR'; customerRef: string; customerName: string; branch: string; region: string; lines: OrderLine[]; invoiceRef?: string } }
export interface InvoiceRow { id: string; ref: string; parentRef: string | null; amount: number; occurredAt: Date; dueAt: Date | null; data: { customerRef: string; customerName: string; branch?: string } }
export interface PaymentRow { ref: string; parentRef: string | null; amount: number; occurredAt: Date }

const DAY = 86_400_000

export function sum(xs: number[]): number {
  return xs.reduce((a, b) => a + b, 0)
}

export function pctChange(current: number, previous: number): number | null {
  if (previous === 0) return null
  return Math.round(((current - previous) / previous) * 1000) / 10
}

function inRange(d: Date, from: Date, to: Date) {
  return d.getTime() >= from.getTime() && d.getTime() < to.getTime()
}

export function lineTotal(lines: OrderLine[]): number {
  return sum(lines.map((l) => l.qty * l.unitPrice))
}

export interface InvoiceBalance {
  id: string; ref: string; customerName: string; customerRef: string; amount: number; paid: number
  outstanding: number; dueAt: Date | null; daysOverdue: number
}

export function invoiceBalances(invoices: InvoiceRow[], payments: PaymentRow[], now: Date): InvoiceBalance[] {
  const paidBy = new Map<string, number>()
  for (const p of payments) if (p.parentRef) paidBy.set(p.parentRef, (paidBy.get(p.parentRef) ?? 0) + p.amount)
  return invoices.map((i) => {
    const paid = paidBy.get(i.ref) ?? 0
    const outstanding = Math.max(0, i.amount - paid)
    const daysOverdue = i.dueAt && outstanding > 0 ? Math.max(0, Math.floor((now.getTime() - i.dueAt.getTime()) / DAY)) : 0
    return { id: i.id, ref: i.ref, customerName: i.data.customerName, customerRef: i.data.customerRef, amount: i.amount, paid, outstanding, dueAt: i.dueAt, daysOverdue }
  })
}

export interface SalesMetrics {
  today: number
  yesterday: number
  last7: number
  prev7: number
  weekChangePct: number | null
  mtd: number
  prevMtd: number
  monthChangePct: number | null
  daily: { date: string; amount: number }[]
  bestTitles: { title: string; qty: number; amount: number }[]
  byBranch: { branch: string; last7: number; prev7: number; changePct: number | null }[]
  byRegion: { region: string; last30: number }[]
  receivables: { outstanding: number; overdue: number; overdueCount: number; aging: { bucket: string; amount: number }[] }
  collections: { last7: number; last30: number }
  orderCount30: number
}

export function computeSalesMetrics(orders: OrderRow[], invoices: InvoiceRow[], payments: PaymentRow[], now: Date): SalesMetrics {
  const dayStart = doualaDayStart(now)
  const tomorrow = new Date(dayStart.getTime() + DAY)
  const yStart = new Date(dayStart.getTime() - DAY)
  const w0 = new Date(tomorrow.getTime() - 7 * DAY)
  const w1 = new Date(tomorrow.getTime() - 14 * DAY)
  const d30 = new Date(tomorrow.getTime() - 30 * DAY)

  // Month-to-date vs the same number of days in the previous month (Douala calendar).
  const local = new Date(now.getTime() + DOUALA_OFFSET_MS)
  const y = local.getUTCFullYear(), m = local.getUTCMonth(), dom = local.getUTCDate()
  const monthStart = new Date(Date.UTC(y, m, 1) - DOUALA_OFFSET_MS)
  const prevMonthStart = new Date(Date.UTC(y, m - 1, 1) - DOUALA_OFFSET_MS)
  const prevMonthDays = new Date(Date.UTC(y, m, 0)).getUTCDate()
  const prevMonthCut = new Date(Date.UTC(y, m - 1, Math.min(dom, prevMonthDays) + 1) - DOUALA_OFFSET_MS)

  const total = (from: Date, to: Date, rows: OrderRow[] = orders) => sum(rows.filter((o) => inRange(o.occurredAt, from, to)).map((o) => o.amount))

  const daily: { date: string; amount: number }[] = []
  for (let i = 13; i >= 0; i--) {
    const from = new Date(dayStart.getTime() - i * DAY)
    daily.push({ date: new Date(from.getTime() + DOUALA_OFFSET_MS).toISOString().slice(0, 10), amount: total(from, new Date(from.getTime() + DAY)) })
  }

  const titles = new Map<string, { qty: number; amount: number }>()
  for (const o of orders.filter((o) => inRange(o.occurredAt, d30, tomorrow))) {
    for (const l of o.data.lines) {
      const t = titles.get(l.title) ?? { qty: 0, amount: 0 }
      t.qty += l.qty
      t.amount += l.qty * l.unitPrice
      titles.set(l.title, t)
    }
  }

  const branches = [...new Set(orders.map((o) => o.data.branch))].sort()
  const byBranch = branches.map((branch) => {
    const rows = orders.filter((o) => o.data.branch === branch)
    const last7 = total(w0, tomorrow, rows)
    const prev7 = total(w1, w0, rows)
    return { branch, last7, prev7, changePct: pctChange(last7, prev7) }
  })

  const regions = [...new Set(orders.map((o) => o.data.region))].sort()
  const byRegion = regions.map((region) => ({
    region,
    last30: total(d30, tomorrow, orders.filter((o) => o.data.region === region)),
  })).sort((a, b) => b.last30 - a.last30)

  const balances = invoiceBalances(invoices, payments, now)
  const overdue = balances.filter((b) => b.daysOverdue > 0)
  const buckets: [string, (d: number) => boolean][] = [
    ['1–30 days', (d) => d >= 1 && d <= 30],
    ['31–60 days', (d) => d > 30 && d <= 60],
    ['61–90 days', (d) => d > 60 && d <= 90],
    ['90+ days', (d) => d > 90],
  ]

  const last7 = total(w0, tomorrow)
  const prev7 = total(w1, w0)
  const mtd = total(monthStart, tomorrow)
  const prevMtd = total(prevMonthStart, prevMonthCut)
  const paidIn = (from: Date) => sum(payments.filter((p) => inRange(p.occurredAt, from, tomorrow)).map((p) => p.amount))

  return {
    today: total(dayStart, tomorrow),
    yesterday: total(yStart, dayStart),
    last7, prev7, weekChangePct: pctChange(last7, prev7),
    mtd, prevMtd, monthChangePct: pctChange(mtd, prevMtd),
    daily,
    bestTitles: [...titles.entries()].map(([title, v]) => ({ title, ...v })).sort((a, b) => b.amount - a.amount).slice(0, 5),
    byBranch,
    byRegion,
    receivables: {
      outstanding: sum(balances.map((b) => b.outstanding)),
      overdue: sum(overdue.map((b) => b.outstanding)),
      overdueCount: overdue.length,
      aging: buckets.map(([bucket, f]) => ({ bucket, amount: sum(overdue.filter((b) => f(b.daysOverdue)).map((b) => b.outstanding)) })),
    },
    collections: { last7: paidIn(w0), last30: paidIn(d30) },
    orderCount30: orders.filter((o) => inRange(o.occurredAt, d30, tomorrow)).length,
  }
}

/** Consistency checks used by tests and the demo seed self-check. Returns problems found. */
export function consistencyProblems(orders: OrderRow[], invoices: InvoiceRow[], payments: PaymentRow[]): string[] {
  const problems: string[] = []
  const invByRef = new Map(invoices.map((i) => [i.ref, i]))
  for (const o of orders) {
    if (Math.abs(lineTotal(o.data.lines) - o.amount) > 0.5) problems.push(`${o.ref}: amount ≠ sum of lines`)
    if (o.data.invoiceRef) {
      const inv = invByRef.get(o.data.invoiceRef)
      if (!inv) problems.push(`${o.ref}: invoice ${o.data.invoiceRef} missing`)
      else if (Math.abs(inv.amount - o.amount) > 0.5) problems.push(`${o.ref}: invoice amount ≠ order amount`)
    }
  }
  const paidBy = new Map<string, number>()
  for (const p of payments) {
    if (!p.parentRef || !invByRef.has(p.parentRef)) problems.push(`${p.ref}: payment without invoice`)
    else paidBy.set(p.parentRef, (paidBy.get(p.parentRef) ?? 0) + p.amount)
  }
  for (const [ref, paid] of paidBy) if (paid - invByRef.get(ref)!.amount > 0.5) problems.push(`${ref}: overpaid`)
  return problems
}
