import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { requireSession, requireCompanyAccess } from '@/lib/require-auth'
import { PatchMessageSchema } from '@/lib/schemas'

export const dynamic = 'force-dynamic'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userOrError = await requireSession()
  if (userOrError instanceof NextResponse) return userOrError

  const { id } = await params

  // Zod validates the allowlist and rejects any extra fields
  const result = PatchMessageSchema.safeParse(await req.json())
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
      { status: 400 }
    )
  }
  // Strip undefined values — only include fields that were actually provided
  const update = Object.fromEntries(
    Object.entries(result.data).filter(([, v]) => v !== undefined)
  ) as Record<string, boolean>

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  // Company scope: SUPER_ADMIN or a company ADMIN of the message's company
  const existing = await prisma.message.findUnique({ where: { id }, select: { companyId: true } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const access = await requireCompanyAccess(userOrError, existing.companyId, 'messages.update')
  if (access instanceof NextResponse) return access

  const message = await prisma.message.update({
    where: { id },
    data: update,
  })

  return NextResponse.json(message)
}
