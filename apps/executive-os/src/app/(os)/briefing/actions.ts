'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { requireBriefingAction } from '@/lib/briefing/access'
import { commitmentAction, recordAction } from '@/lib/briefing/actions'
import { retryNotification } from '@/lib/briefing/dispatch'
import { modeFlag, isDemoMode } from '@/lib/briefing/mode'
import { runJob, JOBS, type Job } from '@/lib/briefing/jobs'
import { resetDemo, triggerScenario } from '@/lib/briefing/demo'
import { isOneOf } from '@/lib/briefing/types'

// Form handlers for the briefing pages. Every handler re-authenticates (server actions are
// public endpoints), works without client JavaScript, and redirects back with ?ok= / ?err=.

const ID = /^[A-Za-z0-9_-]{1,64}$/

function fields(formData: FormData): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of formData.entries()) if (typeof v === 'string' && !k.startsWith('$')) out[k] = v
  return out
}

function back(path: string, r: { ok: true; message: string } | { ok: false; error: string }): never {
  const q = r.ok ? `ok=${encodeURIComponent(r.message)}` : `err=${encodeURIComponent(r.error)}`
  redirect(`${path}?${q}`)
}

export async function recordActionForm(formData: FormData) {
  const access = await requireBriefingAction()
  const { id, ...payload } = fields(formData)
  if (!ID.test(id ?? '')) back('/briefing/records', { ok: false, error: 'Invalid record' })
  const r = await recordAction(access, id, payload, modeFlag())
  revalidatePath('/briefing', 'layout')
  back(`/briefing/records/${id}`, r)
}

export async function commitmentActionForm(formData: FormData) {
  const access = await requireBriefingAction()
  const { id, ...payload } = fields(formData)
  if (!ID.test(id ?? '')) back('/briefing/commitments', { ok: false, error: 'Invalid commitment' })
  const r = await commitmentAction(access, id, payload, modeFlag())
  revalidatePath('/briefing', 'layout')
  back(`/briefing/commitments/${id}`, r)
}

async function requireExecutive() {
  const access = await requireBriefingAction()
  if (access.user.globalRole !== 'SUPER_ADMIN') throw new Error('Forbidden')
  return access
}

export async function retryNotificationForm(formData: FormData) {
  await requireExecutive()
  const id = String(formData.get('id') ?? '')
  if (!ID.test(id)) back('/briefing/notifications', { ok: false, error: 'Invalid notification' })
  const ok = await retryNotification(id, modeFlag())
  revalidatePath('/briefing/notifications')
  back('/briefing/notifications', ok ? { ok: true, message: 'Queued for retry — run "deliver" or wait for the next cycle' } : { ok: false, error: 'Only failed notifications can be retried' })
}

export async function runJobForm(formData: FormData) {
  await requireExecutive()
  const job = formData.get('job')
  const to = String(formData.get('back') ?? '/briefing/demo') === '/briefing/notifications' ? '/briefing/notifications' : '/briefing/demo'
  if (!isOneOf(JOBS, job)) back(to, { ok: false, error: 'Unknown job' })
  const r = await runJob(job as Job)
  revalidatePath('/briefing', 'layout')
  back(to, { ok: true, message: `${job}: ${JSON.stringify(r).slice(0, 300)}` })
}

export async function demoForm(formData: FormData) {
  await requireExecutive()
  if (!isDemoMode()) back('/briefing', { ok: false, error: 'Demo mode is not enabled on this deployment' })
  const action = String(formData.get('action') ?? '')
  let message: string
  if (action === 'reset') {
    const r = await resetDemo()
    message = `Demo reset: ${r.records} records, ${r.meetings} meetings, ${r.commitments} commitments`
  } else if (action === 'scenario') {
    const key = String(formData.get('scenario') ?? '')
    const res = await triggerScenario(key)
    message = `Scenario ${key}: ${res.map((x) => ('event' in x ? x.event : 'error' in x ? x.error : '?')).join(', ')} — now run "process + deliver"`
  } else if (action === 'morning-replay') {
    const { enqueueMorningBrief } = await import('@/lib/briefing/brief')
    const { deliverPending, processEvents } = await import('@/lib/briefing/dispatch')
    await processEvents(true)
    const r = await enqueueMorningBrief(true, new Date(), process.env, true)
    const d = await deliverPending(true)
    message = `Morning brief generated (${r.created}); delivery: ${JSON.stringify(d)}`
  } else {
    back('/briefing/demo', { ok: false, error: 'Unknown demo action' })
  }
  revalidatePath('/briefing', 'layout')
  back('/briefing/demo', { ok: true, message })
}

export async function telegramTestForm() {
  await requireExecutive()
  const { sendDemoTestMessage } = await import('@/lib/briefing/dispatch')
  const r = await sendDemoTestMessage()
  revalidatePath('/briefing/notifications')
  back('/briefing/notifications', r.ok ? { ok: true, message: `Test message delivered by @${r.bot} (message ${r.messageId})` } : { ok: false, error: `Telegram test failed: ${r.error}` })
}

export async function findDemoChatForm() {
  await requireExecutive()
  if (!isDemoMode()) back('/briefing/notifications', { ok: false, error: 'Only available on a demo deployment' })
  const { findDemoChats } = await import('@/lib/briefing/telegram-transport')
  const r = await findDemoChats()
  back('/briefing/notifications', !r.ok ? { ok: false, error: r.error }
    : r.chats.length === 0 ? { ok: false, error: 'No group with "DEMO" in its title found. Add the bot to the group, send a message there, then try again.' }
    : { ok: true, message: `Demo group(s) found — set TELEGRAM_DEMO_CHAT_ID on this project to: ${r.chats.map((c) => `${c.title} = ${c.id}`).join('; ')}` })
}
