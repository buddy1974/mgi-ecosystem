import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { auth } from '@/auth'
import type { SocialPostStatus } from '@mgi/database'

export const dynamic = 'force-dynamic'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json() as { status?: string; scheduledAt?: string; content?: string }

  const updated = await prisma.socialPost.update({
    where: { id },
    data: {
      ...(body.status ? { status: body.status as SocialPostStatus } : {}),
      ...(body.scheduledAt !== undefined ? { scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null } : {}),
      ...(body.content ? { content: body.content } : {}),
      ...(body.status === 'PUBLISHED' ? { publishedAt: new Date() } : {}),
    },
  })
  return NextResponse.json(updated)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await prisma.socialPost.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
