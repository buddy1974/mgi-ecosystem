import { enqueueMorningBrief } from './brief'
import { deliverPending, processEvents, runDigest } from './dispatch'
import { modeFlag } from './mode'
import { runScan } from './scan'

// Scheduled jobs (n8n) — each is idempotent and safe to run concurrently.
export const JOBS = ['scan', 'process', 'deliver', 'digest', 'morning', 'cycle'] as const
export type Job = (typeof JOBS)[number]

export async function runJob(job: Job, now = new Date()) {
  const isDemo = modeFlag()
  switch (job) {
    case 'scan': return { job, mode: isDemo ? 'demo' : 'live', scan: await runScan(isDemo, now) }
    case 'process': return { job, process: await processEvents(isDemo, now) }
    case 'deliver': return { job, deliver: await deliverPending(isDemo, now) }
    case 'digest': {
      const digest = await runDigest(isDemo, now)
      return { job, digest, deliver: await deliverPending(isDemo, now) }
    }
    case 'morning': {
      // Route anything new first so the brief and the alerts agree.
      const process = await processEvents(isDemo, now)
      const { created } = await enqueueMorningBrief(isDemo, now)
      return { job, process, morning: { created }, deliver: await deliverPending(isDemo, now) }
    }
    case 'cycle': {
      const scan = await runScan(isDemo, now)
      const process = await processEvents(isDemo, now)
      return { job, scan, process, deliver: await deliverPending(isDemo, now) }
    }
  }
}
