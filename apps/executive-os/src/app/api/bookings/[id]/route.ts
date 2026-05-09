import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { auth } from '@/auth'

export const dynamic = 'force-dynamic'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json() as { action: 'confirm' | 'decline'; declinedReason?: string }

  if (body.action === 'confirm') {
    const updated = await prisma.bookingRequest.update({
      where: { id },
      data: { status: 'CONFIRMED', respondedAt: new Date() },
    })
    return NextResponse.json(updated)
  }

  if (body.action === 'decline') {
    const updated = await prisma.bookingRequest.update({
      where: { id },
      data: { status: 'DECLINED', respondedAt: new Date(), declinedReason: body.declinedReason ?? null },
    })
    return NextResponse.json(updated)
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
