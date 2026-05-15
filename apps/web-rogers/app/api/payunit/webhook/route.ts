import { NextRequest, NextResponse } from 'next/server';
import { prisma, PROGRAMS, resolveProgram } from '@/lib/programs';
import { sendTelegramNotification, rogersPaymentMessage } from '@/lib/telegram';
import { sendPaymentNotificationToAdmin } from '@/lib/email';

export async function POST(req: NextRequest) {
  // Always return 200 immediately
  const responsePromise = NextResponse.json({ received: true });

  try {
    const body = await req.json();
    console.log('[rogers/payunit/webhook]', JSON.stringify(body));

    const status = (body.status ?? body.transaction_status ?? '').toLowerCase();
    const amount = Number(body.amount ?? body.total_amount ?? 0);
    const transactionId = body.transaction_id ?? body.id ?? null;

    // PayUnit sends product name in various fields — check all
    const productName = body.product_name ?? body.name ?? body.product ?? body.item_name ?? '';

    if (!['success', 'completed', 'paid'].includes(status)) {
      return responsePromise;
    }

    // Match program by product name keywords (NOT by amount — all programs share 50,000 XAF)
    const programKey = resolveProgram(productName);
    if (!programKey) return responsePromise;

    // Find most recent initiated registration for this program
    const registration = await prisma.rogersRegistration.findFirst({
      where: { program: programKey, status: 'initiated' },
      orderBy: { createdAt: 'desc' },
    });

    if (!registration) return responsePromise;

    // Confirm payment
    await prisma.rogersRegistration.update({
      where: { id: registration.id },
      data: {
        status: 'confirmed',
        payunitTransactionId: transactionId,
        confirmedAt: new Date(),
      },
    });

    // Notifications — fire and forget
    const program = PROGRAMS[programKey];
    sendTelegramNotification(rogersPaymentMessage({
      program: program.name,
      amount,
      reference: registration.reference,
      transactionId,
    }));
    sendPaymentNotificationToAdmin({
      program: program.name,
      amount,
      reference: registration.reference,
      registrantName: registration.registrantName,
      registrantEmail: registration.registrantEmail,
      registrantPhone: registration.registrantPhone,
      transactionId,
    });

  } catch (err) {
    console.error('[rogers/payunit/webhook]', err);
    // Never surface errors — always return 200
  }

  return responsePromise;
}
