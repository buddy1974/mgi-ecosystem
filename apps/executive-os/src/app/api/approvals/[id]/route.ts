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
  const body = await req.json()
  const { action, delegatedTo, rejectionNote } = body

  const now = new Date()
  const decidedBy = (session.user as { name?: string })?.name ?? 'Rogers Nforgwei'

  let updateData: Record<string, unknown> = {}

  if (action === 'approve') {
    updateData = { status: 'APPROVED', decidedAt: now, decidedBy }
  } else if (action === 'reject') {
    updateData = { status: 'REJECTED', decidedAt: now, decidedBy, rejectionNote }
  } else if (action === 'delegate') {
    updateData = { status: 'DELEGATED', decidedAt: now, decidedBy, delegatedTo }
  }

  const updated = await prisma.approval.update({
    where: { id },
    data: updateData,
  })

  return NextResponse.json(updated)
}
