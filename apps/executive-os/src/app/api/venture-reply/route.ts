import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { auth } from '@/auth'
import { sendOperationsAlert, buildCeoReply } from '@/lib/telegram'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id, reply } = await req.json()

    if (!id || !reply) {
      return NextResponse.json({ error: 'Missing id or reply' }, { status: 400 })
    }

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
