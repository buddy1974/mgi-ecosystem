/**
 * Archive the May 2026 development seed fixtures from an Executive OS database.
 *
 * The production database contains only seed records in these tables (verified read-only
 * 2026-10-14): the 6 approvals from prisma/seed-approvals.ts (with invented "AI analysis"),
 * the 5 messages from prisma/seed-messages.ts (externalId "seed-…", invented AI summaries),
 * and the events / social posts / booking requests created by the seed run on 2026-05-09
 * (no user accounts existed then, so nothing else could have created them).
 * Rogers registrations and every other table are NOT touched.
 *
 * Run from packages/database with DATABASE_URL set for the target database in this shell only:
 *   npx tsx scripts/archive-seed-data.ts             # dry run: shows what would be archived
 *   npx tsx scripts/archive-seed-data.ts --execute   # backup to JSON, confirm host, then delete
 * The backup file (seed-archive-<timestamp>.json) is written next to this script's working
 * directory and must be kept outside git.
 */
import readline from 'node:readline'
import { writeFileSync } from 'node:fs'

const SEED_APPROVAL_TITLES = [
  'Q3 Marketing Budget — NMI Education',
  'Fleet Vehicle Lease — 2× Toyota Hilux',
  'New Sales Associate — Librairie du Quartier',
  'Speaking Engagement — Douala Business Forum',
  'Geotech Survey — DROS Bafoussam Site',
  'Partnership Agreement — TechBridge Cameroon',
]
const SEED_DAY_START = new Date('2026-05-09T00:00:00Z')
const SEED_DAY_END = new Date('2026-05-10T00:00:00Z')

function ask(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => rl.question(question, (a) => { rl.close(); resolve(a.trim()) }))
}

async function main() {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) throw new Error('DATABASE_URL is not set for this shell.')
  const host = new URL(dbUrl).hostname
  const execute = process.argv.includes('--execute')
  const { prisma } = await import('../src/client')

  const where = {
    approvals: { title: { in: SEED_APPROVAL_TITLES } },
    messages: { externalId: { startsWith: 'seed-' } },
    events: { createdAt: { gte: SEED_DAY_START, lt: SEED_DAY_END } },
    socialPosts: { createdAt: { gte: SEED_DAY_START, lt: SEED_DAY_END } },
    bookingRequests: { createdAt: { gte: SEED_DAY_START, lt: SEED_DAY_END } },
  }
  const rows = {
    approvals: await prisma.approval.findMany({ where: where.approvals }),
    messages: await prisma.message.findMany({ where: where.messages }),
    events: await prisma.event.findMany({ where: where.events }),
    socialPosts: await prisma.socialPost.findMany({ where: where.socialPosts }),
    bookingRequests: await prisma.bookingRequest.findMany({ where: where.bookingRequests }),
  }
  console.log(`Target database host: ${host}`)
  for (const [k, v] of Object.entries(rows)) console.log(`  ${k}: ${v.length} seed record(s)`)
  console.log(`  rogers_registrations: not touched (${await prisma.rogersRegistration.count()} kept)`)

  if (!execute) { console.log('Dry run only. Re-run with --execute to archive.'); return }

  const typed = await ask(`Type the database host to confirm archiving on it: `)
  if (typed !== host) { console.log('Host not confirmed — nothing changed.'); return }

  const file = `seed-archive-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
  writeFileSync(file, JSON.stringify({ host, archivedAt: new Date().toISOString(), rows }, null, 2))
  console.log(`Backup written: ${file}`)

  // Sequential deletes: the Neon HTTP adapter does not support transactions. The JSON backup
  // above allows restoring any table if a later step fails.
  const res = [
    await prisma.approval.deleteMany({ where: where.approvals }),
    await prisma.message.deleteMany({ where: where.messages }),
    await prisma.event.deleteMany({ where: where.events }),
    await prisma.socialPost.deleteMany({ where: where.socialPosts }),
    await prisma.bookingRequest.deleteMany({ where: where.bookingRequests }),
  ]
  console.log('Archived:', res.map((r) => r.count).join(' / '), '(approvals / messages / events / social posts / booking requests)')
}

main().catch((e) => { console.error(e instanceof Error ? e.message : e); process.exit(1) })
