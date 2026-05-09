import { prisma } from '@mgi/database'
import type { SocialPlatform, SocialPostStatus } from '@mgi/database'

export async function getSocialPosts(filters?: {
  companyId?: string
  platform?: string
  status?: string
}) {
  return prisma.socialPost.findMany({
    where: {
      ...(filters?.companyId && filters.companyId !== 'ALL' ? { companyId: filters.companyId } : {}),
      ...(filters?.platform && filters.platform !== 'ALL' ? { platform: filters.platform as SocialPlatform } : {}),
      ...(filters?.status && filters.status !== 'ALL' ? { status: filters.status as SocialPostStatus } : {}),
    },
    orderBy: [
      { status: 'asc' },
      { scheduledAt: 'asc' },
      { createdAt: 'desc' },
    ],
  }).catch(() => [])
}

export async function getSocialStats() {
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - 7)

  const [drafts, scheduled, publishedThisWeek] = await Promise.all([
    prisma.socialPost.count({ where: { status: 'DRAFT' } }).catch(() => 0),
    prisma.socialPost.count({ where: { status: 'SCHEDULED' } }).catch(() => 0),
    prisma.socialPost.count({ where: { status: 'PUBLISHED', publishedAt: { gte: weekStart } } }).catch(() => 0),
  ])

  return { drafts, scheduled, publishedThisWeek }
}

export async function getScheduledPostCount() {
  return prisma.socialPost.count({ where: { status: 'SCHEDULED' } }).catch(() => 0)
}
