import type { BriefingMode } from './types'

// One deployment runs in exactly one briefing mode. Demo and live rows are never read
// together: every briefing query filters on isDemo === (mode === 'demo').
// Demo mode is meant for a separate, isolated deployment + database (see RUNBOOK.md).
export function getBriefingMode(env: NodeJS.ProcessEnv = process.env): BriefingMode {
  return env.EXEC_DEMO_MODE === '1' ? 'demo' : 'live'
}

export function isDemoMode(env: NodeJS.ProcessEnv = process.env): boolean {
  return getBriefingMode(env) === 'demo'
}

/** The isDemo value every briefing read and write in this deployment must use. */
export function modeFlag(env: NodeJS.ProcessEnv = process.env): boolean {
  return isDemoMode(env)
}

export const DEMO_REF_PREFIX = 'DEMO-'

/** Demo rows must carry a DEMO- reference and live rows must not — checked on every ingest. */
export function refMatchesMode(ref: string, isDemo: boolean): boolean {
  return ref.startsWith(DEMO_REF_PREFIX) === isDemo
}
