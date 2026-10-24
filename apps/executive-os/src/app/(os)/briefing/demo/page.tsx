import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireBriefingPage } from '@/lib/briefing/access'
import { isDemoMode } from '@/lib/briefing/mode'
import { SCENARIOS } from '@/lib/briefing/demo'
import { demoForm, runJobForm } from '../actions'
import { BriefingNav, Card, Flash, ModeBanner, PageHeader } from '@/components/briefing/ui'

export const dynamic = 'force-dynamic'

interface Props { searchParams: Promise<{ ok?: string; err?: string }> }

const btn = 'rounded-md border border-mgi-border px-3 py-2 text-left text-sm text-mgi-text hover:bg-white/5'

export default async function DemoControl({ searchParams }: Props) {
  const access = await requireBriefingPage()
  // Only exists on a demo deployment, and only for executives.
  if (!isDemoMode() || access.user.globalRole !== 'SUPER_ADMIN') notFound()
  const { ok, err } = await searchParams
  const [records, events, notifications] = await Promise.all([
    prisma.execRecord.count({ where: { isDemo: true } }),
    prisma.execEvent.count({ where: { isDemo: true } }),
    prisma.execNotification.count({ where: { isDemo: true } }),
  ])

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <PageHeader title="Demo control" subtitle={`${records} demo records · ${events} events · ${notifications} notifications`} />
      <ModeBanner mode="demo" />
      <BriefingNav current="/briefing/demo" showDemo />
      <Flash ok={ok} err={err} />

      <Card title="1 · Start clean">
        <form action={demoForm}>
          <input type="hidden" name="action" value="reset" />
          <button className={`${btn} border-amber-500/50`}>Reset demo data (deletes only DEMO rows, reseeds the fixed dataset)</button>
        </form>
      </Card>

      <Card title="2 · Morning brief">
        <form action={demoForm}>
          <input type="hidden" name="action" value="morning-replay" />
          <button className={btn}>Generate and deliver the morning brief now</button>
        </form>
      </Card>

      <Card title="3 · Business events (each goes through the real ingest contract)">
        <div className="grid gap-2 sm:grid-cols-2">
          {SCENARIOS.map((s) => (
            <form key={s.key} action={demoForm}>
              <input type="hidden" name="action" value="scenario" /><input type="hidden" name="scenario" value={s.key} />
              <button className={`${btn} w-full`}>{s.label}<span className="block text-xs text-mgi-label">expected: {s.expect}</span></button>
            </form>
          ))}
        </div>
      </Card>

      <Card title="4 · Run the schedules (what n8n does automatically)">
        <form action={runJobForm} className="grid gap-2 sm:grid-cols-3">
          <button name="job" value="scan" className={btn}>Scan for overdue / changes</button>
          <button name="job" value="cycle" className={btn}>Process + deliver alerts</button>
          <button name="job" value="digest" className={btn}>Send digest</button>
        </form>
        <p className="mt-2 text-xs text-mgi-label">Then open the <Link className="underline" href="/briefing/notifications">Telegram outbox</Link> or the demo Telegram chat and follow a link.</p>
      </Card>
    </div>
  )
}
