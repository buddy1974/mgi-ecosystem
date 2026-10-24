// Synthetic accounts for the LOCAL briefing demo only (called by start-local.mjs --users).
// Refuses to run unless the database is the loopback Docker instance.
import { hashPassword } from '../../../../packages/auth/src/password'
import { prisma } from '@mgi/database'

if (!/^http:\/\/127\.0\.0\.1:\d+\/sql$/.test(process.env.MGI_LOCAL_SQL_ENDPOINT ?? '')) {
  console.error('REFUSED — local loopback database only')
  process.exit(1)
}

async function upsertUser(email: string, name: string, globalRole: 'SUPER_ADMIN' | 'USER', password: string) {
  const existing = await prisma.user.findUnique({ where: { email } })
  const data = { name, globalRole, status: 'active', password: hashPassword(password) }
  return existing ? prisma.user.update({ where: { email }, data }) : prisma.user.create({ data: { email, ...data } })
}

async function main() {
  const president = await upsertUser('demo.president@example.test', 'President (DEMO account)', 'SUPER_ADMIN', process.env.LOCAL_PRESIDENT_PASSWORD!)
  const staff = await upsertUser('demo.dros.staff@example.test', 'DROS staff (DEMO account)', 'USER', process.env.LOCAL_STAFF_PASSWORD!)
  let dros = await prisma.company.findUnique({ where: { slug: 'dros' } })
  if (!dros) dros = await prisma.company.create({ data: { name: 'DROS Construction', slug: 'dros' } })
  const m = await prisma.companyMembership.findUnique({ where: { userId_companyId: { userId: staff.id, companyId: dros.id } } })
  if (!m) await prisma.companyMembership.create({ data: { userId: staff.id, companyId: dros.id, role: 'STAFF' } })
  console.log(`accounts ready: ${president.email} (SUPER_ADMIN), ${staff.email} (USER, DROS staff)`)
}

main().catch((e) => { console.error(e); process.exit(1) })
