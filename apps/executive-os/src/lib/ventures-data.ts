import { prisma } from '@mgi/database'

export async function getVentureStats(companyId: string) {
  const [messages, approvals] = await Promise.all([
    prisma.message.count({ where: { companyId, isArchived: false } }).catch(() => 0),
    prisma.approval.count({ where: { companyId, status: 'PENDING' } }).catch(() => 0),
  ])
  return { messages, approvals }
}

export async function getVentureMessages(companyId: string) {
  return prisma.message.findMany({
    where: { companyId, isArchived: false },
    orderBy: { receivedAt: 'desc' },
    take: 3,
  }).catch(() => [])
}

export async function getVentureApprovals(companyId: string) {
  return prisma.approval.findMany({
    where: { companyId, status: 'PENDING' },
    orderBy: { requestedAt: 'asc' },
    take: 3,
  }).catch(() => [])
}

export async function getAllVentureStats(): Promise<Record<string, { messages: number; approvals: number }>> {
  const slugs = ['nmi', 'horeb', 'lq', 'dros', 'rogers', 'mgi']
  const results = await Promise.all(
    slugs.map(async (slug) => {
      const stats = await getVentureStats(slug)
      return [slug, stats] as const
    })
  )
  return Object.fromEntries(results)
}
