import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { VENTURES } from '@/lib/ventures'
import { sendOperationsAlert, buildSubmissionAlert } from '@/lib/telegram'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { venture, type, urgency, title, body, submittedBy } = await req.json()

    if (!venture || !type || !title || !body || !submittedBy) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const ventureConfig = VENTURES[venture]
    if (!ventureConfig) {
      return NextResponse.json({ error: 'Invalid venture' }, { status: 400 })
    }

    const report = await prisma.ventureReport.create({
      data: {
        venture,
        ventureName: ventureConfig.name,
        type,
        urgency: urgency ?? 'normal',
        title,
        body,
        submittedBy,
        submittedVia: 'form',
        status: 'new',
      },
    })

    sendOperationsAlert(
      buildSubmissionAlert({
        venture: ventureConfig.name,
        type,
        urgency: urgency ?? 'normal',
        title,
        body,
        submittedBy,
      })
    )

    return NextResponse.json({ success: true, id: report.id })
  } catch (err) {
    console.error('venture-report POST error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
