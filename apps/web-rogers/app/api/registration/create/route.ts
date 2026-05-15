import { NextRequest, NextResponse } from 'next/server'
import { prisma, PROGRAMS, buildReference } from '@/lib/programs'
import { sendRegistrationConfirmation } from '@/lib/email'
import { sendWhatsAppAlert, newRegistrationMessage } from '@/lib/whatsapp'

export async function POST(req: NextRequest) {
  try {
    const { program, registrantName, registrantEmail, registrantPhone, source } = await req.json()

    const config = PROGRAMS[program as string]
    if (!config) return NextResponse.json({ error: 'Invalid program' }, { status: 400 })

    const reference = buildReference(program as string)

    await prisma.rogersRegistration.create({
      data: {
        reference,
        program: program as string,
        programName: config.name,
        amount: config.amount,
        status: 'initiated',
        registrantName: registrantName || null,
        registrantEmail: registrantEmail || null,
        registrantPhone: registrantPhone || null,
        source: source || null,
      },
    })

    // Notifications — fire and forget, never block response
    if (registrantEmail) {
      sendRegistrationConfirmation({
        to: registrantEmail,
        name: registrantName || 'Friend',
        program: config.name,
        reference,
      })
    }

    void sendWhatsAppAlert(newRegistrationMessage({
      program: config.name,
      reference,
      name: registrantName || null,
      source: source || null,
    }))

    return NextResponse.json({ reference })
  } catch (err) {
    console.error('[registration/create]', err)
    return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 })
  }
}
