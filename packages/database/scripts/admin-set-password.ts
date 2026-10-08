/**
 * admin-set-password.ts — out-of-band administrative password set / reset
 * for MGI Executive OS. Does NOT use the web UI.
 *
 * Run from packages/database (needs DATABASE_URL for the target database):
 *   ADMIN_EMAIL=person@example.com pnpm admin:set-password            # reset existing user
 *   ADMIN_EMAIL=person@example.com pnpm admin:set-password -- --create --role SUPER_ADMIN --name "Full Name"
 *   ADMIN_EMAIL=person@example.com pnpm admin:set-password -- --dry-run
 *
 * - Password is read from the terminal with echo disabled, entered twice.
 * - Password is never printed, logged, or passed on the command line.
 * - Sets status=active and clears any pending invite token.
 * - --create creates the user if missing (role defaults to USER).
 */
import readline from 'node:readline'
import { hashPassword, MIN_PASSWORD_LENGTH } from '../../auth/src/password'
import { normalizeEmail } from '../../auth/src/sign-in-policy'

const ROLES = ['SUPER_ADMIN', 'ADMIN', 'USER'] as const
type Role = (typeof ROLES)[number]

function argValue(flag: string): string | undefined {
  const i = process.argv.indexOf(flag)
  return i >= 0 ? process.argv[i + 1] : undefined
}

function promptHidden(question: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true })
    const out = rl as unknown as { _writeToOutput: (s: string) => void; output: NodeJS.WriteStream }
    let muted = false
    out._writeToOutput = (s: string) => { if (!muted) out.output.write(s) }
    rl.question(question, (answer) => { rl.close(); process.stdout.write('\n'); resolve(answer) })
    muted = true
  })
}

async function main() {
  const email = normalizeEmail(process.env.ADMIN_EMAIL)
  const create = process.argv.includes('--create')
  const dryRun = process.argv.includes('--dry-run')
  const roleArg = argValue('--role')
  const name = argValue('--name')

  if (!email) throw new Error('Set ADMIN_EMAIL to the account email.')
  if (roleArg && !ROLES.includes(roleArg as Role)) throw new Error(`--role must be one of ${ROLES.join(', ')}`)
  if (!process.stdin.isTTY) throw new Error('Run interactively in a terminal (password is read with echo off).')

  const pw1 = await promptHidden(`New password for ${email}: `)
  const pw2 = await promptHidden('Repeat password: ')
  if (pw1 !== pw2) throw new Error('Passwords do not match.')
  if (pw1.length < MIN_PASSWORD_LENGTH) throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`)

  if (dryRun) {
    console.log(`[dry-run] input valid for ${email}; no database connection made.`)
    return
  }

  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) throw new Error('DATABASE_URL is not set for this shell.')
  const host = new URL(dbUrl).host
  const confirm = await new Promise<string>((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    rl.question(`Target database host: ${host}\nType the host name exactly to confirm: `, (a) => { rl.close(); resolve(a.trim()) })
  })
  if (confirm !== host) throw new Error('Host confirmation did not match — aborted, nothing changed.')

  // Quiet Prisma logging (development mode would log queries)
  ;(process.env as Record<string, string>).NODE_ENV = 'production'
  const { prisma } = await import('../src/index')
  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } })
  if (!existing && !create) throw new Error(`No user ${email}. Re-run with --create to create it.`)

  const data = {
    password: hashPassword(pw1),
    status: 'active',
    inviteToken: null,
    inviteExpires: null,
    ...(roleArg ? { globalRole: roleArg as Role } : {}),
    ...(name ? { name } : {}),
  }

  if (existing) {
    await prisma.user.update({ where: { id: existing.id }, data })
    console.log(`Updated password for ${email}${roleArg ? ` (role ${roleArg})` : ''}.`)
  } else {
    await prisma.user.create({ data: { email, ...data, globalRole: (roleArg as Role) ?? 'USER' } })
    console.log(`Created ${email} with role ${roleArg ?? 'USER'}.`)
  }
  await prisma.$disconnect()
}

main().catch((err) => {
  console.error(`admin-set-password failed: ${err instanceof Error ? err.message : String(err)}`)
  process.exit(1)
})
