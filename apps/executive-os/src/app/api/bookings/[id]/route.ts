import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { requireSession, requireSuperAdmin } from '@/lib/require-auth'
import { BookingActionSchema } from '@/lib/schemas'

export const dynamic = 'force-dynamic'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Booking confirmations are CEO-only actions
  const userOrError = await requireSession()
  if (userOrError instanceof NextResponse) return userOrError

  const adminOrError = requireSuperAdmin(userOrError)
  if (adminOrError instanceof NextResponse) return adminOrError

  const { id } = await params

  const result = BookingActionSchema.safeParse(await req.json())
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
      { status: 400 }
    )
  }
  const { action, declinedReason } = result.data

  if (action === 'confirm') {
    const updated = await prisma.bookingRequest.update({
      where: { id },
      data: { status: 'CONFIRMED', respondedAt: new Date() },
    })
    return NextResponse.json(updated)
  }

  if (action === 'decline') {
    const updated = await prisma.bookingRequest.update({
      where: { id },
      data: { status: 'DECLINED', respondedAt: new Date(), declinedReason: declinedReason ?? null },
    })
    return NextResponse.json(updated)
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
