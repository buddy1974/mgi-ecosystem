import { neon } from '@neondatabase/serverless'

function getNmiSql() {
  if (!process.env.NMI_DATABASE_URL) return null
  return neon(process.env.NMI_DATABASE_URL)
}

export interface NmiKpis {
  ordersToday: number
  openInvoices: number
  openInvoiceValue: number
  overdueInvoices: number
  stockAlerts: number
  manuscriptsInReview: number
  openTasks: number
  unreadNotifications: number
  unhandledWhatsApp: number
  agentRunsFailed: number
}

export async function getNmiKpis(): Promise<NmiKpis | null> {
  const sql = getNmiSql()
  if (!sql) return null

  try {
    const today = new Date().toISOString().split('T')[0]

    const [
      ordersToday,
      openInvoices,
      openInvoiceValue,
      overdueInvoices,
      stockAlerts,
      manuscriptsInReview,
      openTasks,
      unreadNotifications,
      unhandledWhatsApp,
      agentRunsFailed,
    ] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM "Order" WHERE date::text = ${today}`,
      sql`SELECT COUNT(*) as count FROM "Invoice" WHERE status != 'paid'`,
      sql`SELECT COALESCE(SUM(amount), 0) as total FROM "Invoice" WHERE status != 'paid'`,
      sql`SELECT COUNT(*) as count FROM "Invoice" WHERE "dueDate" < CURRENT_DATE AND status != 'paid'`,
      sql`SELECT COUNT(*) as count FROM "Stock" WHERE qty < 10`,
      sql`SELECT COUNT(*) as count FROM "Manuscript" WHERE status IN ('in_review', 'submitted')`,
      sql`SELECT COUNT(*) as count FROM "Task" WHERE status NOT IN ('done', 'cancelled')`,
      sql`SELECT COUNT(*) as count FROM "Notification" WHERE read = false`,
      sql`SELECT COUNT(*) as count FROM "WhatsAppMessage" WHERE handled = false`,
      sql`SELECT COUNT(*) as count FROM "AgentRun" WHERE status = 'failed' AND "startedAt" > NOW() - INTERVAL '24 hours'`,
    ])

    return {
      ordersToday:         Number((ordersToday[0] as { count: string }).count),
      openInvoices:        Number((openInvoices[0] as { count: string }).count),
      openInvoiceValue:    Number((openInvoiceValue[0] as { total: string }).total),
      overdueInvoices:     Number((overdueInvoices[0] as { count: string }).count),
      stockAlerts:         Number((stockAlerts[0] as { count: string }).count),
      manuscriptsInReview: Number((manuscriptsInReview[0] as { count: string }).count),
      openTasks:           Number((openTasks[0] as { count: string }).count),
      unreadNotifications: Number((unreadNotifications[0] as { count: string }).count),
      unhandledWhatsApp:   Number((unhandledWhatsApp[0] as { count: string }).count),
      agentRunsFailed:     Number((agentRunsFailed[0] as { count: string }).count),
    }
  } catch (err) {
    console.error('[NMI Bridge] Failed to fetch KPIs:', err)
    return null
  }
}

export interface NmiHealthScore {
  score: number
  status: 'active' | 'attention' | 'risk' | 'build'
  summary: string
}

export async function getNmiHealthScore(): Promise<NmiHealthScore> {
  const kpis = await getNmiKpis()
  if (!kpis) return { score: 0, status: 'build', summary: 'NMI bridge not connected' }

  let score = 100
  if (kpis.overdueInvoices > 0)     score -= Math.min(kpis.overdueInvoices * 5, 30)
  if (kpis.stockAlerts > 0)         score -= Math.min(kpis.stockAlerts * 3, 15)
  if (kpis.agentRunsFailed > 0)     score -= Math.min(kpis.agentRunsFailed * 5, 20)
  if (kpis.unhandledWhatsApp > 5)   score -= 10
  score = Math.max(0, Math.min(100, score))

  const status = score >= 80 ? 'active' : score >= 60 ? 'attention' : 'risk'
  const summary = kpis.overdueInvoices > 0
    ? `${kpis.overdueInvoices} overdue invoice${kpis.overdueInvoices > 1 ? 's' : ''}`
    : kpis.stockAlerts > 0
    ? `${kpis.stockAlerts} stock alert${kpis.stockAlerts > 1 ? 's' : ''}`
    : 'Operations nominal'

  return { score, status, summary }
}
