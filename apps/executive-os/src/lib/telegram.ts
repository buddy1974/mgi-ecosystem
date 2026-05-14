export async function sendOperationsAlert(message: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.OPERATIONS_CHAT_ID
  if (!token || !chatId) return
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
    })
  } catch {
    // Fire-and-forget
  }
}

export function buildSubmissionAlert(params: {
  venture: string
  type: string
  urgency: string
  title: string
  body: string
  submittedBy: string
}): string {
  const urgencyEmoji =
    params.urgency === 'critical' ? '🔴' : params.urgency === 'urgent' ? '🟡' : '🟢'
  const typeLabel =
    params.type === 'incident'         ? 'INCIDENT'
    : params.type === 'approval_request' ? 'APPROVAL NEEDED'
    : params.type === 'update'           ? 'Project Update'
    : 'Activity Report'

  const date = new Date().toLocaleString('fr-FR', {
    timeZone: 'Africa/Douala',
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  return [
    `${urgencyEmoji} <b>${typeLabel}</b>`,
    '',
    `🏢 <b>Venture:</b> ${params.venture}`,
    `📋 <b>Title:</b> ${params.title}`,
    `👤 <b>From:</b> ${params.submittedBy}`,
    `📅 <b>Date:</b> ${date}`,
    '',
    `📝 <b>Details:</b>`,
    params.body,
    '',
    `<i>View &amp; reply at: executive-os.rogersnforgwei.com/operations</i>`,
  ].join('\n')
}

export function buildCeoReply(params: {
  venture: string
  title: string
  reply: string
}): string {
  const date = new Date().toLocaleString('fr-FR', {
    timeZone: 'Africa/Douala',
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  return [
    `✉️ <b>CEO Response</b>`,
    '',
    `🏢 <b>Re:</b> ${params.venture} — ${params.title}`,
    `📅 <b>Date:</b> ${date}`,
    '',
    params.reply,
  ].join('\n')
}
