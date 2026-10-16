import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { safeEqual } from '@mgi/auth'

export const dynamic = 'force-dynamic'

// Called by n8n every 15 min — marks overdue SCHEDULED posts as PUBLISHED
// Requires x-cron-secret header matching the CRON_SECRET env var.
// When real platform API credentials are added, posting logic goes here
export async function POST(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret) {
    console.error('[publish-due] CRON_SECRET env var is not configured')
    return NextResponse.json({ error: 'Service misconfigured' }, { status: 503 })
  }
  if (!safeEqual(req.headers.get('x-cron-secret'), cronSecret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()

  const due = await prisma.socialPost.findMany({
    where: { status: 'SCHEDULED', scheduledAt: { lte: now } },
    select: { id: true },
  })

  if (due.length === 0) {
    return NextResponse.json({ published: 0, message: 'Nothing due' })
  }

  // One update() per post: updateMany() needs a transaction, which the Neon HTTP
  // adapter (@mgi/database) does not support.
  for (const p of due) {
    await prisma.socialPost.update({
      where: { id: p.id },
      data: { status: 'PUBLISHED', publishedAt: now },
    })
  }

  console.log(`[Social Publisher] Marked ${due.length} post(s) as published`)
  return NextResponse.json({ published: due.length, postIds: due.map((p) => p.id) })
}
