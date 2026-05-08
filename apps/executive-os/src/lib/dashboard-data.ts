import { prisma } from '@/lib/prisma'
import { getNmiKpis, getNmiHealthScore } from './nmi-bridge'
import { getPendingApprovals } from './approvals-data'

export interface ApprovalItem {
  id: string
  title: string
  requestedBy: string
  amount?: string
  company?: string
  createdAt: Date
}

export function getTimeOfDayGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export async function getDashboardData() {
  const [
    nmiKpis,
    nmiHealth,
    approvalsRaw,
  ] = await Promise.allSettled([
    getNmiKpis(),
    getNmiHealthScore(),
    getPendingApprovals().catch(() => []),
  ])

  const approvalsData = approvalsRaw.status === 'fulfilled' ? approvalsRaw.value : []
  const openApprovals: ApprovalItem[] = approvalsData.map((a) => ({
    id: a.id,
    title: a.title,
    requestedBy: a.requestedBy,
    amount: a.amount ? `XAF ${Number(a.amount).toLocaleString('fr-CM')}` : undefined,
    company: a.companyId,
    createdAt: a.requestedAt,
  }))

  return {
    nmiKpis:       nmiKpis.status === 'fulfilled' ? nmiKpis.value : null,
    nmiHealth:     nmiHealth.status === 'fulfilled' ? nmiHealth.value : { score: 0, status: 'build' as const, summary: 'Not connected' },
    openApprovals,
  }
}
