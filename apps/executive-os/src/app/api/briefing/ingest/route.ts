import { NextRequest, NextResponse } from 'next/server'
import { checkMachineToken } from '@/lib/briefing/machine-auth'
import { ingest, MAX_INGEST_BYTES } from '@/lib/briefing/ingest'
import { modeFlag } from '@/lib/briefing/mode'

export const dynamic = 'force-dynamic'

// POST mgi.exec.ingest.v1 — source systems report a business fact (record + optional signal).
// Public in route-policy because it authenticates itself (machine token, fails closed).
export async function POST(req: NextRequest) {
  const denied = checkMachineToken(req)
  if (denied) return denied
  const body = await req.text()
  if (body.length > MAX_INGEST_BYTES) return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
  let json: unknown
  try { json = JSON.parse(body) } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }
  const result = await ingest(json, modeFlag())
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status })
  return NextResponse.json(result, { status: result.created ? 201 : 200 })
}
