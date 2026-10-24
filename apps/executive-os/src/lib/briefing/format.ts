// Telegram message builders (parse_mode=HTML). Pure — unit tested.
// Every dynamic value is escaped; tags are only ever added by this module, and
// truncation happens on whole lines so a message can never end inside a tag.
import { escapeTelegramHtml as esc } from '@/lib/telegram'
import { companyLabel, type Priority } from './types'

export const TELEGRAM_SAFE_LENGTH = 3800 // Telegram hard limit is 4096 characters

const PRIORITY_ICON: Record<Priority, string> = { CRITICAL: '🔴', HIGH: '🟠', NORMAL: '🔵', LOW: '⚪' }

const DOMAIN_LABEL: Record<string, string> = {
  SALES: 'Sales', RECEIVABLES: 'Receivables', DISTRIBUTION: 'Distribution', INVENTORY: 'Inventory',
  PIRACY: 'Piracy / BookShield', MARKET: 'Market intelligence', INQUIRY: 'Inquiry', PROGRAMME: 'Programmes',
  PROJECT: 'Projects', GOVERNANCE: 'Decisions & commitments', OPERATIONS: 'Operations', PUBLISHING: 'Publishing',
}

export const domainLabel = (d: string) => DOMAIN_LABEL[d] ?? d

const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + '…' : s)

export const DEMO_FOOTER = '🧪 <b>DEMO</b> — fictional demonstration data, not business performance.'

export function formatXaf(n: number): string {
  return `${Math.round(n).toLocaleString('fr-FR').replace(/ | /g, ' ')} XAF`
}

export interface AlertInput {
  priority: Priority
  companySlug: string
  domain: string
  subject: string
  summary: string
  facts?: Record<string, unknown> | null
  actionRequired?: string | null
  link: string
  linkLabel: string
  isDemo: boolean
}

function factLines(facts: Record<string, unknown> | null | undefined): string[] {
  if (!facts) return []
  const shown = (facts.display ?? null) as Record<string, string | number> | null
  if (!shown || typeof shown !== 'object') return []
  return Object.entries(shown).slice(0, 8).map(([k, v]) => `• ${esc(k)}: <b>${esc(String(v))}</b>`)
}

/** Joins lines and drops trailing optional lines until the text fits. Required lines stay. */
export function fitLines(required: { head: string[]; tail: string[] }, optional: string[], limit = TELEGRAM_SAFE_LENGTH): string {
  const opt = [...optional]
  const build = (o: string[], dropped: number) => [
    ...required.head,
    ...o,
    ...(dropped > 0 ? [`<i>…and ${dropped} more — open the OS for the full list.</i>`] : []),
    ...required.tail,
  ].join('\n')
  let dropped = 0
  let text = build(opt, 0)
  while (text.length > limit && opt.length > 0) {
    opt.pop()
    dropped++
    text = build(opt, dropped)
  }
  if (text.length > limit) {
    // Required lines alone are too long: drop all markup, cut, and never leave a broken entity.
    text = text.replace(/<[^>]*>/g, '').slice(0, limit - 1).replace(/&[a-zA-Z0-9#]*$/, '') + '…'
  }
  return text
}

export function buildAlertMessage(a: AlertInput): string {
  const head = [
    `${PRIORITY_ICON[a.priority]} <b>${a.priority}</b> · ${esc(companyLabel(a.companySlug))} · ${esc(domainLabel(a.domain))}`,
    ...(a.isDemo ? ['🧪 <b>DEMO</b>'] : []),
    '',
    `<b>${esc(clip(a.subject, 200))}</b>`,
    esc(clip(a.summary, 1500)),
  ]
  const facts = factLines(a.facts)
  const tail = [
    ...(a.actionRequired ? ['', `➡️ <b>Action:</b> ${esc(a.actionRequired)}`] : []),
    '',
    `🔗 <a href="${esc(a.link)}">Open ${esc(a.linkLabel)} in the OS</a>`,
    ...(a.isDemo ? ['', DEMO_FOOTER] : []),
  ]
  return fitLines({ head, tail }, facts.length ? ['', ...facts] : [])
}

export interface DigestItem {
  priority: Priority
  companySlug: string
  subject: string
  link: string | null
}

function itemLine(i: DigestItem): string {
  const s = esc(i.subject)
  return `${PRIORITY_ICON[i.priority]} ${i.link ? `<a href="${esc(i.link)}">${s}</a>` : s}`
}

/** Groups items by company, highest priority first. */
export function groupedItemLines(items: DigestItem[]): string[] {
  const order: Priority[] = ['CRITICAL', 'HIGH', 'NORMAL', 'LOW']
  const byCompany = new Map<string, DigestItem[]>()
  for (const i of items) byCompany.set(i.companySlug, [...(byCompany.get(i.companySlug) ?? []), i])
  const lines: string[] = []
  for (const [slug, list] of [...byCompany.entries()].sort((a, b) => companyLabel(a[0]).localeCompare(companyLabel(b[0])))) {
    lines.push('', `<b>${esc(companyLabel(slug))}</b>`)
    list.sort((a, b) => order.indexOf(a.priority) - order.indexOf(b.priority))
    lines.push(...list.map(itemLine))
  }
  return lines
}

export function buildDigestMessage(p: { items: DigestItem[]; isDemo: boolean; overviewLink: string | null; label: string }): string {
  const head = [`🗂 <b>${esc(p.label)}</b> — ${p.items.length} update${p.items.length === 1 ? '' : 's'}`, ...(p.isDemo ? ['🧪 <b>DEMO</b>'] : [])]
  const tail = [
    ...(p.overviewLink ? ['', `🔗 <a href="${esc(p.overviewLink)}">Open the briefing centre</a>`] : []),
    ...(p.isDemo ? ['', DEMO_FOOTER] : []),
  ]
  return fitLines({ head, tail }, groupedItemLines(p.items))
}

export interface BriefSection {
  title: string
  lines: string[] // already escaped HTML lines produced by this module's helpers
}

export function buildMorningBrief(p: {
  dateLabel: string
  sections: BriefSection[]
  isDemo: boolean
  overviewLink: string | null
}): string {
  const head = [`☀️ <b>Morning executive brief</b> · ${esc(p.dateLabel)}`, ...(p.isDemo ? ['🧪 <b>DEMO</b> — fictional data'] : [])]
  const body: string[] = []
  for (const s of p.sections) {
    if (!s.lines.length) continue
    body.push('', `<b>${esc(s.title)}</b>`, ...s.lines)
  }
  const tail = [
    ...(p.overviewLink ? ['', `🔗 <a href="${esc(p.overviewLink)}">Open the briefing centre</a>`] : []),
    ...(p.isDemo ? ['', DEMO_FOOTER] : []),
  ]
  return fitLines({ head, tail }, body)
}

/** A plain escaped bullet line (helper for brief sections). */
export const bullet = (text: string, link?: string | null) =>
  link ? `• <a href="${esc(link)}">${esc(text)}</a>` : `• ${esc(text)}`
