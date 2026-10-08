import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { requireSession, requireCompanyAccess } from '@/lib/require-auth'
import { PatchSocialPostSchema } from '@/lib/schemas'

export const dynamic = 'force-dynamic'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userOrError = await requireSession()
  if (userOrError instanceof NextResponse) return userOrError

  const { id } = await params

  // Fetch record to get companyId for ownership validation
  const existing = await prisma.socialPost.findUnique({ where: { id }, select: { companyId: true } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const accessOrError = await requireCompanyAccess(userOrError, existing.companyId, 'social.*')
  if (accessOrError instanceof NextResponse) return accessOrError

  const result = PatchSocialPostSchema.safeParse(await req.json())
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
      { status: 400 }
    )
  }
  const { status, scheduledAt, content } = result.data

  const updated = await prisma.socialPost.update({
    where: { id },
    data: {
      ...(status ? { status } : {}),
      ...(scheduledAt !== undefined ? { scheduledAt: scheduledAt ? new Date(scheduledAt) : null } : {}),
      ...(content ? { content } : {}),
      ...(status === 'PUBLISHED' ? { publishedAt: new Date() } : {}),
    },
  })
  return NextResponse.json(updated)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userOrError = await requireSession()
  if (userOrError instanceof NextResponse) return userOrError

  const { id } = await params

  // Fetch record to get companyId for ownership validation
  const existing = await prisma.socialPost.findUnique({ where: { id }, select: { companyId: true } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const accessOrError = await requireCompanyAccess(userOrError, existing.companyId, 'social.*')
  if (accessOrError instanceof NextResponse) return accessOrError

  await prisma.socialPost.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
