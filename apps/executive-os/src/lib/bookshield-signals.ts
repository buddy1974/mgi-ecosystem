// Reads the sanitised BookShield executive signals published by NMI Automation OS
// (GET /api/bookshield/signals, contract nmi.bookshield.signals.v1). Server-side only:
// the token never reaches the browser. Returns null when not configured or unreachable,
// so the dashboard shows an honest "not connected" state instead of failing.

export interface BookShieldSignal {
  id: string
  company: string
  riskType: string
  severity: string
  productTitle: string
  status: string
  decisionNeeded: string
  ownerRole: string
  raisedAt: string
  updatedAt: string
}

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
    const res = await fetch(url, {
      headers: { 'x-bookshield-signals-token': token },
      cache: 'no-store',
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) return null
    const data = await res.json()
    if (data?.schema !== 'nmi.bookshield.signals.v1' || !Array.isArray(data.signals) || !data.risk) return null
    return { generatedAt: data.generatedAt, company: data.company, risk: data.risk, signals: data.signals }
  } catch {
    return null
  }
}
