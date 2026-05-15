import { NextRequest, NextResponse } from 'next/server'
import { sendAssistantLead } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { name?: string; email?: string; interest?: string }
    const { name, email, interest } = body

    if (!name || !email) {
      return NextResponse.json({ ok: true }) // always succeed — never block chat flow
    }

    sendAssistantLead({
      name,
      email,
      interest: interest ?? '',
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true })
  }
}
