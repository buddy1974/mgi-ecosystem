import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { requireSession, requireSuperAdmin } from '@/lib/require-auth'

export const dynamic = 'force-dynamic'

const VALID_STATUSES = ['new', 'acknowledged', 'in_review', 'resolved'] as const

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Status updates are a CEO-level action (reviewing and triaging operations reports)
  const userOrError = await requireSession()
  if (userOrError instanceof NextResponse) return userOrError

  const adminOrError = requireSuperAdmin(userOrError)
  if (adminOrError instanceof NextResponse) return adminOrError

  try {
    const { id } = await params
    const { status } = await req.json()

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    await prisma.ventureReport.update({
      where: { id },
      data: {
        status,
        resolvedAt: status === 'resolved' ? new Date() : undefined,
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('venture-report status PATCH error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
