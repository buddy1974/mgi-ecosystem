// Read-only verification of the briefing demo data in the database at DATABASE_URL.
//   npx tsx scripts/briefing/verify-data.ts
// Checks counts, every order/invoice/payment/stock relationship, flagship totals and
// governance links. Exits 1 on any problem.
import { prisma } from '../../src/lib/prisma'
import { splitFinanceRows } from '../../src/lib/briefing/data'
import { consistencyProblems, invoiceBalances, computeSalesMetrics } from '../../src/lib/briefing/metrics'

async function main() {
  const problems: string[] = []
  const records = await prisma.execRecord.findMany({ where: { isDemo: true } })
  const byType: Record<string, number> = {}
  for (const r of records) byType[r.recordType] = (byType[r.recordType] ?? 0) + 1
  if (records.length < 774) problems.push(`expected ≥774 demo records, found ${records.length}`)
  if (records.some((r) => !r.ref.startsWith('DEMO-'))) problems.push('demo record without DEMO- ref')
  if ((await prisma.execRecord.count({ where: { isDemo: false } })) !== 0) problems.push('unexpected live briefing records')

  const nmi = records.filter((r) => r.companySlug === 'nmi')
  const { orders, invoices, payments } = splitFinanceRows(nmi)
  problems.push(...consistencyProblems(orders, invoices, payments))
  const refs = new Set(records.map((r) => r.ref))
  for (const r of records) if (r.parentRef && !refs.has(r.parentRef)) problems.push(`${r.ref}: parent ${r.parentRef} missing`)
  for (const o of orders) {
    const custRef = o.data.customerRef
    if (!refs.has(custRef)) problems.push(`${o.ref}: customer ${custRef} missing`)
  }
  const now = new Date()
  const flagship = invoiceBalances(invoices, payments, now).find((b) => b.ref === 'DEMO-NMI-INV-0412')
  if (!flagship || flagship.amount !== 4_247_200 || flagship.outstanding !== 2_747_200) problems.push('flagship invoice 0412 totals wrong')
  const m = computeSalesMetrics(orders, invoices, payments, now)
  if (m.receivables.overdue !== 4_655_200) problems.push(`overdue receivables ${m.receivables.overdue} ≠ 4 655 200`)

  const [meetings, decisions, commitments, activities] = await Promise.all([
    prisma.execMeeting.count({ where: { isDemo: true } }), prisma.execDecision.findMany({ where: { isDemo: true } }),
    prisma.execCommitment.findMany({ where: { isDemo: true } }), prisma.execActivity.count({ where: { isDemo: true } }),
  ])
  const decisionIds = new Set(decisions.map((d) => d.id))
  for (const c of commitments) if (c.decisionId && !decisionIds.has(c.decisionId)) problems.push(`${c.ref}: decision missing`)

  console.log(JSON.stringify({
    demoRecords: records.length, byType, meetings, decisions: decisions.length, commitments: commitments.length, activities,
    flagship0412: flagship && { amount: flagship.amount, paid: flagship.paid, outstanding: flagship.outstanding, daysOverdue: flagship.daysOverdue },
    nmi: { orders: orders.length, invoices: invoices.length, payments: payments.length, overdueReceivables: m.receivables.overdue, last7: m.last7 },
    problems,
  }, null, 2))
  process.exit(problems.length ? 1 : 0)
}
main().catch((e) => { console.error(e instanceof Error ? e.message : e); process.exit(1) })
