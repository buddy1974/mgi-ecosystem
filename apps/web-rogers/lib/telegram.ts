export async function sendTelegramNotification(message: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });
  } catch {
    // Fire-and-forget — never block payment flow
  }
}

export function rogersPaymentMessage(params: {
  program: string;
  amount: number;
  reference: string;
  transactionId?: string;
}): string {
  const date = new Date().toLocaleString('fr-FR', {
    timeZone: 'Africa/Douala',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return [
    '✅ <b>Payment Confirmed</b>',
    '',
    '📍 <b>Platform:</b> Rogers Nforgwei Programs',
    `📚 <b>Program:</b> ${params.program}`,
    `💰 <b>Amount:</b> ${params.amount.toLocaleString()} XAF`,
    `🔖 <b>Reference:</b> ${params.reference}`,
    params.transactionId ? `🧾 <b>PayUnit ID:</b> ${params.transactionId}` : '',
    `📅 <b>Date:</b> ${date}`,
  ].filter(Boolean).join('\n');
}
