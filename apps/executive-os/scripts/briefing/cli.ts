// Executive Briefing Centre — operator CLI.
//   npx tsx scripts/briefing/cli.ts [--local] <command> [arg]
// Commands: reset · scenario <key> · scenarios · scan · process · deliver · digest · morning [--replay] · all · accounts · outbox
// Remote databases additionally need --confirm-db=<endpoint id> (see assertTargetConfirmed).
// --local uses the isolated Docker database from <repo>/.briefing-local/config.json (loopback only)
// and forces demo mode, dry-run Telegram (no token) and http://localhost:3000 links.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const args = process.argv.slice(2)
const local = args.includes('--local')
const replay = args.includes('--replay')
const [cmd, arg] = args.filter((a) => !a.startsWith('--'))

if (local) {
  const cfg = JSON.parse(readFileSync(join(__dirname, '..', '..', '..', '..', '.briefing-local', 'config.json'), 'utf8'))
  if (!/^http:\/\/127\.0\.0\.1:\d+\/sql$/.test(cfg.sqlEndpoint)) throw new Error('sqlEndpoint must be loopback')
  Object.assign(process.env, {
    DATABASE_URL: `postgres://postgres:${cfg.pgPassword}@db.localtest.me:5432/main`,
    MGI_LOCAL_SQL_ENDPOINT: cfg.sqlEndpoint,
    EXEC_DEMO_MODE: '1',
    EXEC_OS_BASE_URL: process.env.EXEC_OS_BASE_URL || `http://localhost:${cfg.appPort ?? 3000}`,
    TZ: 'UTC',
  })
  for (const k of ['TELEGRAM_BOT_TOKEN', 'OPERATIONS_CHAT_ID', 'TELEGRAM_PRESIDENT_CHAT_ID', 'TELEGRAM_CHAT_ID', 'EXEC_TELEGRAM_LIVE']) delete process.env[k]
}

// Writing to a non-local database requires --confirm-db=<endpoint id> equal to the first
// label of the DATABASE_URL host (e.g. ep-proud-mud-…): a typo-proof guard against seeding
// demo rows into the wrong (e.g. production) database.
function assertTargetConfirmed() {
  if (local) return
  const host = (() => { try { return new URL(process.env.DATABASE_URL ?? '').hostname } catch { return '' } })()
  const endpoint = host.split('.')[0]
  const confirm = args.find((a) => a.startsWith('--confirm-db='))?.slice('--confirm-db='.length)
  if (!endpoint || confirm !== endpoint) {
    console.error(`REFUSED — writing to ${endpoint || 'an unknown database'} needs --confirm-db=<its endpoint id>`)
    process.exit(1)
  }
}

async function main() {
  if (['reset', 'scenario', 'scan', 'process', 'deliver', 'digest', 'morning', 'all', 'accounts'].includes(cmd)) assertTargetConfirmed()
  const { modeFlag } = await import('../../src/lib/briefing/mode')
  const isDemo = modeFlag()
  const demo = await import('../../src/lib/briefing/demo')
  const { runScan } = await import('../../src/lib/briefing/scan')
  const d = await import('../../src/lib/briefing/dispatch')
  const { enqueueMorningBrief } = await import('../../src/lib/briefing/brief')
  const { prisma } = await import('../../src/lib/prisma')
  const print = (label: string, v: unknown) => console.log(`${label}:`, JSON.stringify(v))

  switch (cmd) {
    case 'reset': print('reset', await demo.resetDemo()); break
    case 'scenarios': for (const s of demo.SCENARIOS) console.log(`${s.key.padEnd(18)} ${s.label} → ${s.expect}`); break
    case 'scenario': print(`scenario ${arg}`, await demo.triggerScenario(arg)); break
    case 'scan': print('scan', await runScan(isDemo)); break
    case 'process': print('process', await d.processEvents(isDemo)); break
    case 'deliver': print('deliver', await d.deliverPending(isDemo)); break
    case 'digest': print('digest', await d.runDigest(isDemo)); break
    case 'morning': { const r = await enqueueMorningBrief(isDemo, new Date(), process.env, replay); print('morning', { created: r.created }); console.log(r.text); break }
    case 'all': {
      print('reset', await demo.resetDemo())
      print('morning', { created: (await enqueueMorningBrief(isDemo, new Date(), process.env, true)).created })
      for (const s of demo.SCENARIOS) print(`scenario ${s.key}`, await demo.triggerScenario(s.key))
      print('scan', await runScan(isDemo))
      print('process', await d.processEvents(isDemo))
      print('digest', await d.runDigest(isDemo))
      print('deliver', await d.deliverPending(isDemo))
      break
    }
    case 'accounts': {
      // Synthetic accounts (example.test) for a demo deployment; passwords come from env.
      if (!isDemo) throw new Error('accounts: demo mode only')
      const { hashPassword } = await import('../../../../packages/auth/src/password')
      const upsert = async (email: string, name: string, globalRole: 'SUPER_ADMIN' | 'USER', pw?: string) => {
        if (!pw || pw.length < 12) throw new Error(`password for ${email} missing or shorter than 12`)
        const data = { name, globalRole, status: 'active', password: hashPassword(pw) }
        const u = await prisma.user.findUnique({ where: { email } })
        return u ? prisma.user.update({ where: { email }, data }) : prisma.user.create({ data: { email, ...data } })
      }
      await upsert('demo.president@example.test', 'President (DEMO account)', 'SUPER_ADMIN', process.env.DEMO_PRESIDENT_PASSWORD)
      const staff = await upsert('demo.dros.staff@example.test', 'DROS staff (DEMO account)', 'USER', process.env.DEMO_STAFF_PASSWORD)
      const dros = (await prisma.company.findUnique({ where: { slug: 'dros' } })) ?? (await prisma.company.create({ data: { name: 'DROS Construction', slug: 'dros' } }))
      if (!(await prisma.companyMembership.findUnique({ where: { userId_companyId: { userId: staff.id, companyId: dros.id } } }))) {
        await prisma.companyMembership.create({ data: { userId: staff.id, companyId: dros.id, role: 'STAFF' } })
      }
      console.log('accounts ready: demo.president@example.test (SUPER_ADMIN), demo.dros.staff@example.test (USER, DROS)')
      break
    }
    case 'outbox': {
      const rows = await prisma.execNotification.findMany({ where: { isDemo }, orderBy: { createdAt: 'asc' } })
      for (const r of rows) console.log(`${r.kind.padEnd(13)} ${r.recipient.padEnd(10)} ${r.status.padEnd(8)} ${r.lastError ?? ''}\n${r.text}\n${'─'.repeat(60)}`)
      break
    }
    default:
      console.log('commands: reset · scenarios · scenario <key> · scan · process · deliver · digest · morning [--replay] · all · outbox')
      process.exitCode = 1
  }
}

main().catch((e) => { console.error(e instanceof Error ? e.message : e); process.exit(1) })
