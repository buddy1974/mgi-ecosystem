import { prisma } from '@mgi/database'
import type { MessageSource } from '@mgi/database'

export async function getInboxMessages(source?: string, companyId?: string) {
  return prisma.message.findMany({
    where: {
      isArchived: false,
      ...(source && source !== 'ALL' ? { source: source as MessageSource } : {}),
      ...(companyId ? { companyId } : {}),
    },
    orderBy: [
      { aiActToday: 'desc' },
      { receivedAt: 'desc' },
    ],
    take: 50,
  })
}

export async function getUnreadCount() {
  return prisma.message.count({ where: { isRead: false, isArchived: false } })
}

export interface InboxStats {
  total: number
  unread: number
  actToday: number
  bySource: Record<string, number>
}

export async function getInboxStats(): Promise<InboxStats> {
  const [total, unread, actToday, bySource] = await Promise.all([
    prisma.message.count({ where: { isArchived: false } }),
    prisma.message.count({ where: { isRead: false, isArchived: false } }),
    prisma.message.count({ where: { aiActToday: true, isArchived: false } }),
    prisma.message.groupBy({ by: ['source'], _count: { id: true }, where: { isArchived: false } }),
  ])

  return {
    total,
    unread,
    actToday,
    bySource: Object.fromEntries(bySource.map(r => [r.source, r._count.id])),
  }
}
