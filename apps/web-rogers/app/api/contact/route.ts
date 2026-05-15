import { NextRequest, NextResponse } from 'next/server'
import { sendContactInquiryToAdmin } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, type, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    sendContactInquiryToAdmin({ name, email, phone: phone || '', type: type || 'general', message })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[api/contact]', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
