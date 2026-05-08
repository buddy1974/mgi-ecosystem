import { prisma } from '@/lib/prisma'
import { getNmiKpis, getNmiHealthScore } from './nmi-bridge'

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
    prisma.approval.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }).catch(() => []),
  ])

  const approvalsData = approvalsRaw.status === 'fulfilled' ? approvalsRaw.value : []
  const openApprovals: ApprovalItem[] = approvalsData.map((a) => ({
    id: a.id,
    title: a.title,
    requestedBy: a.requesterId,
    amount: a.amount ? `$${Number(a.amount).toLocaleString()}` : undefined,
    createdAt: a.createdAt,
  }))

  return {
    nmiKpis:       nmiKpis.status === 'fulfilled' ? nmiKpis.value : null,
    nmiHealth:     nmiHealth.status === 'fulfilled' ? nmiHealth.value : { score: 0, status: 'build' as const, summary: 'Not connected' },
    openApprovals,
  }
}
