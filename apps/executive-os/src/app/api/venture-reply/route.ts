import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { requireSession, requireSuperAdmin } from '@/lib/require-auth'
import { sendOperationsAlert, buildCeoReply } from '@/lib/telegram'
import { VentureReplySchema } from '@/lib/schemas'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  // Only the CEO (SUPER_ADMIN) may send replies via the Operations Bridge
  const userOrError = await requireSession()
  if (userOrError instanceof NextResponse) return userOrError

  const adminOrError = requireSuperAdmin(userOrError)
  if (adminOrError instanceof NextResponse) return adminOrError

  try {
    const result = VentureReplySchema.safeParse(await req.json())
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }
    const { id, reply } = result.data

    const report = await prisma.ventureReport.update({
      where: { id },
      data: {
        ceoReply: reply,
        repliedAt: new Date(),
        status: 'acknowledged',
      },
    })

    sendOperationsAlert(
      buildCeoReply({
        venture: report.ventureName,
        title: report.title,
        reply,
      })
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('venture-reply POST error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
