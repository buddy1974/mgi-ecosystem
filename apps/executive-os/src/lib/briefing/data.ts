import { prisma } from '@/lib/prisma'
import type { ExecRecord } from '@mgi/database'
import { computeSalesMetrics, type InvoiceRow, type OrderRow, type PaymentRow, type SalesMetrics } from './metrics'

// Read helpers. Every function takes the mode flag explicitly: callers pass modeFlag(),
// so a query can never omit the demo/live filter.

const FINANCE_TYPES = ['ORDER', 'INVOICE', 'PAYMENT'] as const

export async function loadFinanceRows(companySlug: string, isDemo: boolean, since: Date) {
  const rows = await prisma.execRecord.findMany({
    where: { isDemo, companySlug, recordType: { in: [...FINANCE_TYPES] }, // Orders are windowed; every invoice and payment is loaded so balances stay exact.
      OR: [{ occurredAt: { gte: since } }, { recordType: { in: ['INVOICE', 'PAYMENT'] } }] },
    orderBy: { occurredAt: 'asc' },
  })
  return splitFinanceRows(rows)
}

export function splitFinanceRows(rows: ExecRecord[]) {
  const orders: OrderRow[] = []
  const invoices: InvoiceRow[] = []
  const payments: PaymentRow[] = []
  for (const r of rows) {
    const base = { ref: r.ref, amount: r.amount ?? 0, occurredAt: r.occurredAt }
    if (r.recordType === 'ORDER') orders.push({ ...base, data: r.data as unknown as OrderRow['data'] })
    else if (r.recordType === 'INVOICE') invoices.push({ ...base, id: r.id, parentRef: r.parentRef, dueAt: r.dueAt, data: r.data as unknown as InvoiceRow['data'] })
    else if (r.recordType === 'PAYMENT') payments.push({ ...base, parentRef: r.parentRef })
  }
  return { orders, invoices, payments }
}

/** Companies that have finance records in this mode (figures are shown per company only). */
export async function financeCompanies(isDemo: boolean): Promise<string[]> {
  const rows = await prisma.execRecord.findMany({
    where: { isDemo, recordType: 'ORDER' },
    distinct: ['companySlug'],
    select: { companySlug: true },
  })
  return rows.map((r) => r.companySlug).sort()
}

export async function companyMetrics(companySlug: string, isDemo: boolean, now: Date): Promise<SalesMetrics | null> {
  const since = new Date(now.getTime() - 70 * 86_400_000)
  const { orders, invoices, payments } = await loadFinanceRows(companySlug, isDemo, since)
  if (!orders.length && !invoices.length) return null
  return computeSalesMetrics(orders, invoices, payments, now)
}
