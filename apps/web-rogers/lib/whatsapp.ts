export async function sendWhatsAppAlert(message: string): Promise<void> {
  const phone  = process.env.CALLMEBOT_PHONE
  const apiKey = process.env.CALLMEBOT_API_KEY
  if (!phone || !apiKey) return

  try {
    await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(message)}&apikey=${apiKey}`,
    )
  } catch {
    // Fire-and-forget — never block the caller
  }
}

export function newRegistrationMessage(params: {
  program: string
  reference: string
  name: string | null
  source: string | null
}): string {
  const lines = [
    '🆕 New Registration',
    `📚 ${params.program}`,
    `🔖 ${params.reference}`,
  ]
  if (params.name)   lines.push(`👤 ${params.name}`)
  if (params.source) lines.push(`📍 ${params.source}`)
  return lines.join('\n')
}

export function paymentConfirmedMessage(params: {
  program: string
  amount: number
  reference: string
  name: string | null
}): string {
  const lines = [
    '✅ Payment Confirmed!',
    `📚 ${params.program}`,
    `💰 ${params.amount.toLocaleString()} XAF`,
    `🔖 ${params.reference}`,
  ]
  if (params.name) lines.push(`👤 ${params.name}`)
  return lines.join('\n')
}
