import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { requireSession, requireCompanyAdmin } from '@/lib/require-auth'
import { PatchApprovalSchema } from '@/lib/schemas'

export const dynamic = 'force-dynamic'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userOrError = await requireSession()
  if (userOrError instanceof NextResponse) return userOrError

  const { id } = await params

  const result = PatchApprovalSchema.safeParse(await req.json())
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
      { status: 400 }
    )
  }
  const { action, delegatedTo, rejectionNote } = result.data

  // Fetch the approval to get its companyId for RBAC check
  const existing = await prisma.approval.findUnique({
    where: { id },
    select: { companyId: true },
  })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Only SUPER_ADMIN or company ADMIN may approve/reject/delegate
  const adminOrError = requireCompanyAdmin(userOrError, existing.companyId)
  if (adminOrError instanceof NextResponse) return adminOrError

  const now = new Date()
  const decidedBy = userOrError.name ?? 'Rogers Nforgwei'

  let updateData: Record<string, unknown> = {}
  if (action === 'approve') {
    updateData = { status: 'APPROVED', decidedAt: now, decidedBy }
  } else if (action === 'reject') {
    updateData = { status: 'REJECTED', decidedAt: now, decidedBy, rejectionNote: rejectionNote ?? null }
  } else if (action === 'delegate') {
    updateData = { status: 'DELEGATED', decidedAt: now, decidedBy, delegatedTo: delegatedTo ?? null }
  }

  const updated = await prisma.approval.update({
    where: { id },
    data: updateData,
  })

  return NextResponse.json(updated)
}
