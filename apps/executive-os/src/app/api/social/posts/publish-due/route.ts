import { NextResponse } from 'next/server'
import { prisma } from '@mgi/database'

export const dynamic = 'force-dynamic'

// Called by n8n every 15 min — marks overdue SCHEDULED posts as PUBLISHED
// When real platform API credentials are added, posting logic goes here
export async function POST() {
  const now = new Date()

  const due = await prisma.socialPost.findMany({
    where: { status: 'SCHEDULED', scheduledAt: { lte: now } },
    select: { id: true },
  })

  if (due.length === 0) {
    return NextResponse.json({ published: 0, message: 'Nothing due' })
  }

  await prisma.socialPost.updateMany({
    where: { id: { in: due.map((p) => p.id) } },
    data: { status: 'PUBLISHED', publishedAt: now },
  })

  console.log(`[Social Publisher] Marked ${due.length} post(s) as published`)
  return NextResponse.json({ published: due.length, postIds: due.map((p) => p.id) })
}
