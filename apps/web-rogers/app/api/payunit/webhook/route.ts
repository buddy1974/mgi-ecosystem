import { NextRequest, NextResponse } from 'next/server'
import { prisma, PROGRAMS, resolveProgram } from '@/lib/programs'
import { sendTelegramNotification, rogersPaymentMessage } from '@/lib/telegram'

export async function POST(req: NextRequest) {
  // Always return 200 immediately
  const responsePromise = NextResponse.json({ received: true })

  try {
    const body = await req.json()
    console.log('[rogers/payunit/webhook]', JSON.stringify(body))

    const status = (body.status ?? body.transaction_status ?? '').toLowerCase()
    const amount = Number(body.amount ?? body.total_amount ?? 0)
    const transactionId = body.transaction_id ?? body.id ?? null

    const productName = body.product_name ?? body.name ?? body.product ?? body.item_name ?? ''

    if (!['success', 'completed', 'paid'].includes(status)) {
      return responsePromise
    }

    const programKey = resolveProgram(productName)
    if (!programKey) return responsePromise

    const registration = await prisma.rogersRegistration.findFirst({
      where: { program: programKey, status: 'initiated' },
      orderBy: { createdAt: 'desc' },
    })

    if (!registration) return responsePromise

    await prisma.rogersRegistration.update({
      where: { id: registration.id },
      data: {
        status: 'confirmed',
        payunitTransactionId: transactionId,
        confirmedAt: new Date(),
      },
    })

    // Telegram — internal admin notification only
    const program = PROGRAMS[programKey]
    sendTelegramNotification(rogersPaymentMessage({
      program: program.name,
      amount,
      reference: registration.reference,
      transactionId,
    }))

  } catch (err) {
    console.error('[rogers/payunit/webhook]', err)
  }

  return responsePromise
}
