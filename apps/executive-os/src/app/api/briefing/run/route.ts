import { NextRequest, NextResponse } from 'next/server'
import { checkMachineToken, hasMachineToken } from '@/lib/briefing/machine-auth'
import { runJob, JOBS, type Job } from '@/lib/briefing/jobs'
import { requireSession, requireSuperAdmin } from '@/lib/require-auth'
import { isOneOf } from '@/lib/briefing/types'

export const dynamic = 'force-dynamic'

// POST {"job": "scan" | "process" | "deliver" | "digest" | "morning" | "cycle"}
// Called by the n8n schedules with the machine token, or by a signed-in SUPER_ADMIN.
export async function POST(req: NextRequest) {
  if (hasMachineToken(req)) {
    const denied = checkMachineToken(req)
    if (denied) return denied
  } else {
    const user = await requireSession()
    if (user instanceof NextResponse) return user
    const admin = requireSuperAdmin(user)
    if (admin instanceof NextResponse) return admin
  }
  const body = (await req.json().catch(() => null)) as { job?: unknown } | null
  if (!isOneOf(JOBS, body?.job)) return NextResponse.json({ error: `job must be one of ${JOBS.join(', ')}` }, { status: 400 })
  return NextResponse.json(await runJob(body.job as Job), { headers: { 'Cache-Control': 'no-store' } })
}
