import { prisma } from '@mgi/database'
import type { ApprovalCategory } from '@mgi/database'

export async function getPendingApprovals(category?: string) {
  return prisma.approval.findMany({
    where: {
      status: 'PENDING',
      ...(category && category !== 'ALL' ? { category: category as ApprovalCategory } : {}),
    },
    orderBy: [
      { priority: 'asc' },
      { requestedAt: 'asc' },
    ],
  })
}

export async function getApprovalStats() {
  const [total, critical, oldest] = await Promise.all([
    prisma.approval.count({ where: { status: 'PENDING' } }),
    prisma.approval.count({ where: { status: 'PENDING', priority: 'CRITICAL' } }),
    prisma.approval.findFirst({
      where: { status: 'PENDING' },
      orderBy: { requestedAt: 'asc' },
      select: { requestedAt: true },
    }),
  ])

  return { total, critical, oldest: oldest?.requestedAt ?? null }
}
