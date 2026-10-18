import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { VENTURES } from '@/lib/ventures'
import { sendOperationsAlert, buildSubmissionAlert } from '@/lib/telegram'
import { VentureReportSchema } from '@/lib/schemas'
import { isValidVentureKey, ventureLinkSecret, VENTURE_REPORTS_PER_HOUR } from '@/lib/venture-link'

export const dynamic = 'force-dynamic'

// Public endpoint — managers submit without an account, but only through their
// signed venture link (key = HMAC of the slug, see lib/venture-link.ts). Fails
// closed without a usable secret; capped per venture per hour.
export async function POST(req: NextRequest) {
  try {
    const secret = ventureLinkSecret()
    if (!secret) {
      return NextResponse.json({ error: 'Submissions are temporarily unavailable' }, { status: 503 })
    }

    const result = VentureReportSchema.safeParse(await req.json())
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }
    const { venture, key, type, urgency, title, body, submittedBy } = result.data

    const ventureConfig = VENTURES[venture]
    if (!ventureConfig || !isValidVentureKey(venture, key, secret)) {
      // Same answer for an unknown slug and a wrong key.
      return NextResponse.json({ error: 'Invalid submission link' }, { status: 403 })
    }

    const recent = await prisma.ventureReport.count({
      where: { venture, createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) } },
    })
    if (recent >= VENTURE_REPORTS_PER_HOUR) {
      return NextResponse.json({ error: 'Too many submissions — please try again later' }, { status: 429 })
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
