import type { Recipient } from './recipients'

// Telegram delivery for the briefing centre.
// Safety rules (see ARCHITECTURE.md §Telegram):
// - Demo notifications go ONLY to TELEGRAM_DEMO_CHAT_ID (a test chat Marcel controls). Without
//   it they are stored as DRY_RUN and shown in the OS outbox — nothing leaves the server.
// - Live notifications need EXEC_TELEGRAM_LIVE=1 (explicit switch, off by default) and the
//   recipient's own chat id. A demo row can never be delivered to a live chat and vice versa.
// - Chat ids and the token are read from env at send time and never stored or logged.

export type Target =
  | { kind: 'send'; chatId: string; token: string; apiBase: string }
  | { kind: 'dry_run'; reason: string }

const OFFICIAL_API = 'https://api.telegram.org'

/** Only the official API, or a loopback mock for tests. */
export function telegramApiBase(env: NodeJS.ProcessEnv = process.env): string | null {
  const raw = env.TELEGRAM_API_BASE?.trim()
  if (!raw) return OFFICIAL_API
  if (raw === OFFICIAL_API) return raw
  return /^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(raw) && !env.VERCEL ? raw : null
}

export function resolveTarget(recipient: Recipient, isDemo: boolean, env: NodeJS.ProcessEnv = process.env): Target {
  const token = env.TELEGRAM_BOT_TOKEN?.trim()
  const apiBase = telegramApiBase(env)
  if (!apiBase) return { kind: 'dry_run', reason: 'TELEGRAM_API_BASE rejected (only the official API or loopback)' }
  if (!token) return { kind: 'dry_run', reason: 'Telegram not configured (no bot token)' }
  if (isDemo) {
    const chatId = env.TELEGRAM_DEMO_CHAT_ID?.trim()
    if (!chatId) return { kind: 'dry_run', reason: 'Demo mode without TELEGRAM_DEMO_CHAT_ID — not sent' }
    // Never let a demo chat id equal a live recipient chat (e.g. the Operations group).
    const liveIds = [env.OPERATIONS_CHAT_ID, env.TELEGRAM_PRESIDENT_CHAT_ID, env.TELEGRAM_CHAT_ID].map((v) => v?.trim()).filter(Boolean)
    if (liveIds.includes(chatId)) return { kind: 'dry_run', reason: 'TELEGRAM_DEMO_CHAT_ID equals a live chat — refused' }
    return { kind: 'send', chatId, token, apiBase }
  }
  if (env.EXEC_TELEGRAM_LIVE !== '1') return { kind: 'dry_run', reason: 'Live delivery switched off (EXEC_TELEGRAM_LIVE≠1)' }
  const chatId = env[recipient.chatIdEnv]?.trim()
  if (!chatId) return { kind: 'dry_run', reason: `${recipient.chatIdEnv} not set` }
  return { kind: 'send', chatId, token, apiBase }
}

export type SendResult =
  | { ok: true; messageId: string }
  | { ok: false; retryable: boolean; error: string; retryAfterSec?: number }

/** Strips anything that could contain the token from an error message. */
export function redact(s: string, token?: string): string {
  let out = s.replace(/bot\d+:[A-Za-z0-9_-]+/g, 'bot<redacted>')
  if (token) out = out.split(token).join('<redacted>')
  return out.slice(0, 300)
}

export async function sendTelegram(
  target: Extract<Target, { kind: 'send' }>,
  text: string,
  link: string | null,
  fetchImpl: typeof fetch = fetch,
): Promise<SendResult> {
  const body: Record<string, unknown> = {
    chat_id: target.chatId,
    text,
    parse_mode: 'HTML',
    link_preview_options: { is_disabled: true },
  }
  // Telegram only accepts https URLs in inline buttons; local http links stay in the text.
  if (link && link.startsWith('https://')) {
    body.reply_markup = { inline_keyboard: [[{ text: 'Open in MGI Executive OS', url: link }]] }
  }
  let res: Response
  try {
    res = await fetchImpl(`${target.apiBase}/bot${target.token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    })
  } catch (err) {
    return { ok: false, retryable: true, error: redact(`network: ${String(err)}`, target.token) }
  }
  let json: { ok?: boolean; result?: { message_id?: number }; description?: string; parameters?: { retry_after?: number } } = {}
  try { json = await res.json() } catch { /* non-JSON error page */ }
  if (res.ok && json.ok && json.result?.message_id !== undefined) {
    return { ok: true, messageId: String(json.result.message_id) }
  }
  const description = redact(`HTTP ${res.status}: ${json.description ?? 'no description'}`, target.token)
  if (res.status === 429) return { ok: false, retryable: true, error: description, retryAfterSec: json.parameters?.retry_after }
  // 5xx and gateway errors are transient; 400/401/403 (bad markup, revoked token, bot removed
  // from chat) will not fix themselves and are surfaced immediately.
  return { ok: false, retryable: res.status >= 500, error: description }
}

/** Bot identity check (getMe). Returns the bot username or a redacted error. */
export async function telegramBotIdentity(
  target: Extract<Target, { kind: 'send' }>,
  fetchImpl: typeof fetch = fetch,
): Promise<{ ok: true; username: string } | { ok: false; error: string }> {
  try {
    const res = await fetchImpl(`${target.apiBase}/bot${target.token}/getMe`, { signal: AbortSignal.timeout(10_000) })
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean; result?: { username?: string }; description?: string }
    if (json.ok && json.result?.username) return { ok: true, username: json.result.username }
    return { ok: false, error: redact(`HTTP ${res.status}: ${json.description ?? 'no description'}`, target.token) }
  } catch (err) {
    return { ok: false, error: redact(`network: ${String(err)}`, target.token) }
  }
}
