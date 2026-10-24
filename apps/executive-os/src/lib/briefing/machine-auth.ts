import { NextResponse } from 'next/server'
import { safeEqual } from '@mgi/auth'

// Machine authentication for /api/briefing/ingest and /api/briefing/run (n8n, NMI, web forms).
// Header x-exec-briefing-token must equal EXEC_BRIEFING_TOKEN (≥ 32 chars, generated with
// `openssl rand -base64 32`). Fails closed: without a configured token every call gets 503.
export const BRIEFING_TOKEN_HEADER = 'x-exec-briefing-token'

export function checkMachineToken(req: Request, env: NodeJS.ProcessEnv = process.env): NextResponse | null {
  const expected = env.EXEC_BRIEFING_TOKEN
  if (!expected || expected.length < 32) {
    return NextResponse.json({ error: 'Unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
  if (!safeEqual(req.headers.get(BRIEFING_TOKEN_HEADER), expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { 'Cache-Control': 'no-store' } })
  }
  return null
}

export function hasMachineToken(req: Request): boolean {
  return req.headers.get(BRIEFING_TOKEN_HEADER) !== null
}
