import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireBriefingPage } from '@/lib/briefing/access'
import { getBriefingMode, modeFlag } from '@/lib/briefing/mode'
import { getRecipient, RECIPIENTS } from '@/lib/briefing/recipients'
import { resolveTarget } from '@/lib/briefing/telegram-transport'
import { retryNotificationForm, runJobForm } from '../actions'
import { BriefingNav, Card, DemoTag, Empty, Flash, ModeBanner, PageHeader, StatusBadge, TelegramPreview, fmtDateTime } from '@/components/briefing/ui'

export const dynamic = 'force-dynamic'

interface Props { searchParams: Promise<{ ok?: string; err?: string; status?: string }> }

const STATUSES = ['PENDING', 'SENDING', 'SENT', 'FAILED', 'DRY_RUN'] as const

export default async function NotificationsPage({ searchParams }: Props) {
  const access = await requireBriefingPage()
  // The outbox shows message text for every company and recipient: executives only.
  if (access.user.globalRole !== 'SUPER_ADMIN') notFound()
  const isDemo = modeFlag()
  const mode = getBriefingMode()
  const { ok, err, status } = await searchParams
  const filter = (STATUSES as readonly string[]).includes(status ?? '') ? status : undefined
  const rows = await prisma.execNotification.findMany({ where: { isDemo, ...(filter ? { status: filter } : {}) }, orderBy: { createdAt: 'desc' }, take: 60 })

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <PageHeader title="Telegram outbox" subtitle="Every message the briefing centre generated, with its delivery state" />
      <ModeBanner mode={mode} />
      <BriefingNav current="/briefing/notifications" showDemo={mode === 'demo'} />
      <Flash ok={ok} err={err} />

      <Card title="Delivery routes (resolved now — no chat ids shown)">
        <ul className="space-y-1 text-sm">
          {RECIPIENTS.map((r) => {
            const t = resolveTarget(r, isDemo)
            return (
              <li key={r.key} className="flex flex-wrap items-center gap-2">
                <span className="text-mgi-text">{r.label}</span>
                {t.kind === 'send' ? <StatusBadge status={isDemo ? 'SENDS TO DEMO CHAT' : 'SENDS LIVE'} tone={isDemo ? 'attention' : 'active'} /> : <StatusBadge status="DRY RUN" tone="muted" />}
                {t.kind === 'dry_run' && <span className="text-xs text-mgi-label">{t.reason}</span>}
              </li>
            )
          })}
        </ul>
        <form action={runJobForm} className="mt-3 flex flex-wrap gap-2">
          <input type="hidden" name="back" value="/briefing/notifications" />
          {(['process', 'deliver', 'digest'] as const).map((j) => (
            <button key={j} name="job" value={j} className="rounded-md border border-mgi-border px-3 py-1.5 text-xs text-mgi-text hover:bg-white/5">Run {j}</button>
          ))}
        </form>
      </Card>

      <nav className="flex flex-wrap gap-1 text-xs" aria-label="Filter by status">
        <a href="/briefing/notifications" className={`rounded-md px-2 py-1 ${!filter ? 'bg-white/10 text-white' : 'text-mgi-muted'}`}>All</a>
        {STATUSES.map((s) => <a key={s} href={`/briefing/notifications?status=${s}`} className={`rounded-md px-2 py-1 ${filter === s ? 'bg-white/10 text-white' : 'text-mgi-muted'}`}>{s.replace('_', ' ').toLowerCase()}</a>)}
      </nav>

      {rows.length === 0 ? <Card><Empty>No notifications.</Empty></Card> : rows.map((n) => (
        <Card key={n.id}>
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
            <StatusBadge status={n.status} /><span className="font-semibold uppercase tracking-wider text-mgi-text">{n.kind.replace('_', ' ')}</span>
            <span className="text-mgi-muted">→ {getRecipient(n.recipient)?.label ?? n.recipient}</span>
            <span className="text-mgi-label">created {fmtDateTime(n.createdAt)}{n.sentAt ? ` · processed ${fmtDateTime(n.sentAt)}` : ''} · attempts {n.attempts}</span>
            <DemoTag show={n.isDemo} />
          </div>
          {n.lastError && <p className={`mb-2 text-xs ${n.status === 'FAILED' ? 'text-red-300' : 'text-mgi-label'}`}>{n.lastError}</p>}
          <details>
            <summary className="cursor-pointer text-sm text-mgi-text">Preview message</summary>
            <div className="mt-2 max-w-md"><TelegramPreview text={n.text} /></div>
          </details>
          {n.status === 'FAILED' && (
            <form action={retryNotificationForm} className="mt-2">
              <input type="hidden" name="id" value={n.id} />
              <button className="rounded-md border border-mgi-border px-3 py-1.5 text-xs text-mgi-text hover:bg-white/5">Retry delivery</button>
            </form>
          )}
        </Card>
      ))}
    </div>
  )
}
