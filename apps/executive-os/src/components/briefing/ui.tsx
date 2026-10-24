import Link from 'next/link'
import type { ReactNode } from 'react'
import type { ExecActivity } from '@mgi/database'
import type { BriefingMode, Priority } from '@/lib/briefing/types'
import { companyLabel } from '@/lib/briefing/types'

// Briefing-centre building blocks. Server components only; no client JS needed.

export function ModeBanner({ mode }: { mode: BriefingMode }) {
  if (mode === 'demo') {
    return (
      <div role="note" className="rounded-card border border-amber-500/50 bg-amber-500/10 px-4 py-2 text-xs text-amber-200">
        <b className="font-semibold">🧪 DEMO MODE</b> — every record, figure and person on these pages is fictional. Nothing here is
        business performance, and no customer, accounting or Telegram action reaches a real party.
      </div>
    )
  }
  return (
    <div role="note" className="rounded-card border border-mgi-border bg-mgi-card/40 px-4 py-2 text-xs text-mgi-muted">
      <b className="font-semibold text-mgi-text">LIVE</b> — only records received from connected source systems. Sources not yet
      connected show no figures (see Coverage).
    </div>
  )
}

export function DemoTag({ show }: { show: boolean }) {
  if (!show) return null
  return <span className="rounded-badge bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300">Demo</span>
}

const PRIORITY_STYLE: Record<Priority, string> = {
  CRITICAL: 'bg-status-risk-bg text-status-risk',
  HIGH: 'bg-status-attention-bg text-status-attention',
  NORMAL: 'bg-status-build-bg text-status-build',
  LOW: 'bg-white/10 text-mgi-muted',
}

export function PriorityBadge({ priority }: { priority: string }) {
  const p = (priority in PRIORITY_STYLE ? priority : 'LOW') as Priority
  return <span className={`rounded-badge px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${PRIORITY_STYLE[p]}`}>{p}</span>
}

const STATUS_TONE: Record<string, string> = {
  // risk
  BLOCKED: 'risk', FAILED: 'risk', OVERDUE: 'risk', DECLINED: 'risk', OPEN_RISK: 'risk',
  // attention
  NEW: 'attention', PENDING: 'attention', DELIVERED: 'attention', ACTION_REQUESTED: 'attention', PARTIAL: 'attention', ISSUED: 'attention', DELAYED: 'attention', INITIATED: 'attention', DRY_RUN: 'attention', BELOW_DEMAND: 'attention', INTAKE: 'attention', CREDIT_REVIEW: 'attention',
  // active
  ACCEPTED: 'active', APPROVED: 'active', PAID: 'active', SENT: 'active', CONFIRMED: 'active', CLOSED: 'muted', IMPLEMENTED: 'active', OK: 'active',
}
const TONE_CLASS: Record<string, string> = {
  risk: 'bg-status-risk-bg text-status-risk',
  attention: 'bg-status-attention-bg text-status-attention',
  active: 'bg-status-active-bg text-status-active',
  muted: 'bg-white/10 text-mgi-muted',
  build: 'bg-status-build-bg text-status-build',
}

export function StatusBadge({ status, tone }: { status: string; tone?: string }) {
  const t = tone ?? STATUS_TONE[status] ?? 'build'
  return <span className={`whitespace-nowrap rounded-badge px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${TONE_CLASS[t]}`}>{status.replace(/_/g, ' ')}</span>
}

export function CompanyChip({ slug }: { slug: string }) {
  return <span className="whitespace-nowrap rounded-badge border border-mgi-border px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-mgi-muted">{companyLabel(slug)}</span>
}

export function Card({ title, action, children, id }: { title?: string; action?: ReactNode; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="rounded-card border border-mgi-border bg-mgi-card/40 p-4">
      {(title || action) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          {title && <h2 className="text-[11px] font-semibold uppercase tracking-widest text-mgi-muted">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="text-sm text-mgi-label">{children}</p>
}

export function PageHeader({ title, subtitle, back }: { title: string; subtitle?: ReactNode; back?: { href: string; label: string } }) {
  return (
    <div className="space-y-1">
      {back && <Link href={back.href} className="text-xs text-mgi-muted hover:text-white">← {back.label}</Link>}
      <h1 className="text-xl font-light text-white md:text-2xl">{title}</h1>
      {subtitle && <div className="text-[11px] uppercase tracking-widest text-mgi-label">{subtitle}</div>}
    </div>
  )
}

export function BriefingNav({ current, showDemo }: { current: string; showDemo: boolean }) {
  const items = [
    ['/briefing', 'Overview'], ['/briefing/finance', 'Finance'], ['/briefing/records', 'Records'],
    ['/briefing/commitments', 'Commitments'], ['/briefing/meetings', 'Meetings'], ['/briefing/notifications', 'Telegram outbox'],
    ['/briefing/coverage', 'Coverage'],
    ...(showDemo ? [['/briefing/demo', 'Demo control']] : []),
  ]
  return (
    <nav aria-label="Briefing centre" className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
      {items.map(([href, label]) => (
        <Link key={href} href={href} aria-current={current === href ? 'page' : undefined}
          className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs ${current === href ? 'bg-white/10 text-white' : 'text-mgi-muted hover:bg-white/5 hover:text-white'}`}>
          {label}
        </Link>
      ))}
    </nav>
  )
}

export function Flash({ ok, err }: { ok?: string; err?: string }) {
  if (!ok && !err) return null
  return (
    <p role={err ? 'alert' : 'status'} className={`rounded-md border px-3 py-2 text-sm ${err ? 'border-red-500/40 bg-red-500/10 text-red-300' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'}`}>
      {err ?? ok}
    </p>
  )
}

export function KV({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
      {rows.filter(([, v]) => v !== null && v !== undefined && v !== '').map(([k, v]) => (
        <div key={k} className="min-w-0">
          <dt className="text-[10px] uppercase tracking-widest text-mgi-label">{k}</dt>
          <dd className="break-words text-mgi-text">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

export function Timeline({ items }: { items: ExecActivity[] }) {
  if (!items.length) return <Empty>No history yet.</Empty>
  return (
    <ol className="space-y-3 border-l border-mgi-border pl-4">
      {items.map((a) => (
        <li key={a.id} className="text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-mgi-text">{a.action.replace(/_/g, ' ').toLowerCase()}</span>
            {a.toStatus && <StatusBadge status={a.toStatus} />}
            <span className="text-xs text-mgi-label">{fmtDateTime(a.createdAt)} · {a.actor}</span>
          </div>
          {a.note && <p className="mt-0.5 whitespace-pre-line text-mgi-muted">{a.note}</p>}
        </li>
      ))}
    </ol>
  )
}

export function fmtDate(d: Date | null | undefined): string {
  if (!d) return '—'
  return new Date(d.getTime() + 3_600_000).toISOString().slice(0, 10)
}

export function fmtDateTime(d: Date | null | undefined): string {
  if (!d) return '—'
  return `${new Date(d.getTime() + 3_600_000).toISOString().slice(0, 16).replace('T', ' ')} WAT`
}

export function xaf(n: number | null | undefined): string {
  if (n === null || n === undefined) return '—'
  return `${Math.round(n).toLocaleString('fr-FR').replace(/ | /g, ' ')} XAF`
}

/**
 * Renders the Telegram HTML subset we generate (<b>, <i>, <a href>) as React elements —
 * never as raw HTML. Unknown tags are shown as text; links must be http(s).
 */
export function TelegramPreview({ text }: { text: string }) {
  const unescape = (s: string) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&')
  const nodes: ReactNode[] = []
  const re = /<b>([\s\S]*?)<\/b>|<i>([\s\S]*?)<\/i>|<a href="([^"]*)">([\s\S]*?)<\/a>/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(unescape(text.slice(last, m.index)))
    if (m[1] !== undefined) nodes.push(<b key={k++}>{unescape(m[1])}</b>)
    else if (m[2] !== undefined) nodes.push(<i key={k++}>{unescape(m[2])}</i>)
    else {
      const href = unescape(m[3])
      nodes.push(/^https?:\/\//.test(href) ? <a key={k++} href={href} className="text-sky-400 underline">{unescape(m[4])}</a> : <span key={k++}>{unescape(m[4])}</span>)
    }
    last = re.lastIndex
  }
  if (last < text.length) nodes.push(unescape(text.slice(last)))
  return <div className="whitespace-pre-wrap break-words rounded-md bg-[#17212b] p-3 font-sans text-[13px] leading-relaxed text-[#e9eef3]">{nodes}</div>
}
