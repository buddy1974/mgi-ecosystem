// Reads the sanitised BookShield executive signals published by NMI Automation OS
// (GET /api/bookshield/signals, contract nmi.bookshield.signals.v1). Server-side only:
// the token never reaches the browser. Returns null when not configured or unreachable,
// so the dashboard shows an honest "not connected" state instead of failing.

import { z } from 'zod'

const signalSchema = z.object({
  id: z.string(),
  company: z.literal('NMI Education'),
  riskType: z.string(),
  severity: z.string(),
  productTitle: z.string(),
  status: z.string(),
  decisionNeeded: z.string(),
  ownerRole: z.string(),
  raisedAt: z.string(),
  updatedAt: z.string(),
}).strict()

const feedSchema = z.object({
  schema: z.literal('nmi.bookshield.signals.v1'),
  generatedAt: z.string().datetime(),
  company: z.literal('NMI Education'),
  risk: z.object({
    level: z.enum(['Elevated', 'Moderate', 'Low']),
    openIncidents: z.number().int().nonnegative().safe(),
    openHighSeverity: z.number().int().nonnegative().safe(),
  }).strict().refine(risk => risk.openHighSeverity <= risk.openIncidents),
  signals: z.array(signalSchema),
}).strict()

export type BookShieldSignal = z.infer<typeof signalSchema>

export interface BookShieldFeed {
  generatedAt: string
  company: string
  risk: { level: string; openIncidents: number; openHighSeverity: number }
  signals: BookShieldSignal[]
}

export async function getBookShieldFeed(): Promise<BookShieldFeed | null> {
  const url = process.env.BOOKSHIELD_SIGNALS_URL
  const token = process.env.BOOKSHIELD_SIGNALS_TOKEN
  if (!url || !token) return null
  try {
    const endpoint = new URL(url)
    if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password) return null
    const res = await fetch(endpoint.href, {
      headers: { 'x-bookshield-signals-token': token },
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) return null
    const parsed = feedSchema.safeParse(await res.json())
    if (!parsed.success) return null
    const data = parsed.data
    return { generatedAt: data.generatedAt, company: data.company, risk: data.risk, signals: data.signals }
  } catch {
    return null
  }
}
