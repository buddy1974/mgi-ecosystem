import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { auth } from '@/auth'
import type { SocialPlatform, SocialPostStatus } from '@mgi/database'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json() as {
    companyId: string
    platform: string
    content: string
    status: string
    scheduledAt?: string
  }

  if (!body.companyId || !body.platform || !body.content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const post = await prisma.socialPost.create({
    data: {
      companyId: body.companyId,
      platform: body.platform as SocialPlatform,
      content: body.content,
      status: body.status as SocialPostStatus,
      scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,
      mediaUrls: [],
    },
  })

  return NextResponse.json(post, { status: 201 })
}
