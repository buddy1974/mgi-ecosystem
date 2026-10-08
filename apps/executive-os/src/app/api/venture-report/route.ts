import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { VENTURES } from '@/lib/ventures'
import { sendOperationsAlert, buildSubmissionAlert } from '@/lib/telegram'
import { VentureReportSchema } from '@/lib/schemas'

export const dynamic = 'force-dynamic'

// Public endpoint — no authentication required (managers submit without login)
export async function POST(req: NextRequest) {
  try {
    const result = VentureReportSchema.safeParse(await req.json())
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }
    const { venture, type, urgency, title, body, submittedBy } = result.data

    const ventureConfig = VENTURES[venture]
    if (!ventureConfig) {
      return NextResponse.json({ error: 'Invalid venture' }, { status: 400 })
    }

    const report = await prisma.ventureReport.create({
      data: {
        venture,
        ventureName: ventureConfig.name,
        type,
        urgency,
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
