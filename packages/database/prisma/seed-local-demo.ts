// LOCAL PRESENTATION DEMO ONLY (branch demo/exos-local). Synthetic data for the
// 14 Oct 2026 management meeting. Refuses to run unless the app is pointed at the
// local demo SQL endpoint. People are role labels marked "(demo)", e-mail
// addresses use the reserved example.test domain, no phone numbers, no real
// business figures. Usage: tsx prisma/seed-local-demo.ts  (env set by the launcher)
import { hashPassword } from '../../auth/src/password'

const endpoint = process.env.MGI_LOCAL_DEMO_SQL_ENDPOINT ?? ''
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+\/sql$/.test(endpoint)) {
  console.error('REFUSED — MGI_LOCAL_DEMO_SQL_ENDPOINT must point to the local demo proxy.')
  process.exit(1)
}
const demoEmail = process.env.DEMO_CEO_EMAIL ?? ''
const demoPassword = process.env.DEMO_CEO_PASSWORD ?? ''
if (!/@example\.test$/.test(demoEmail) || demoPassword.length < 12) {
  console.error('REFUSED — DEMO_CEO_EMAIL must be @example.test and DEMO_CEO_PASSWORD ≥ 12 chars.')
  process.exit(1)
}

const H = 60 * 60 * 1000
const ago = (h: number) => new Date(Date.now() - h * H)
const inH = (h: number) => new Date(Date.now() + h * H)
const day = (d: number, hour: number) => { const x = new Date(); x.setDate(x.getDate() + d); x.setHours(hour, 0, 0, 0); return x }

async function main() {
  const { prisma } = await import('../src/client')

  // Clean slate (local demo database only)
  await prisma.notification.deleteMany({})
  await prisma.approval.deleteMany({})
  await prisma.ventureReport.deleteMany({})
  await prisma.message.deleteMany({})
  await prisma.event.deleteMany({})
  await prisma.bookingRequest.deleteMany({})
  await prisma.socialPost.deleteMany({})
  await prisma.company.deleteMany({})

  const companies = [
    ['mgi', 'Mina-Galeed Invest (MGI)'], ['nmi', 'NMI Education'], ['horeb', 'Horeb Solutions'],
    ['lq', 'Librairie du Quartier'], ['dros', 'DROS Construction'], ['rogers', 'Rogers Nforgwei'], ['abba', 'Abba Land Place'],
  ] as const
  for (const [id, name] of companies) await prisma.company.create({ data: { id, slug: id, name } })

  // Keep the same user rows across resets so a signed-in session stays valid
  const ceoData = { name: 'Demo CEO', globalRole: 'SUPER_ADMIN' as const, status: 'active', password: hashPassword(demoPassword) }
  const ceo = await prisma.user.upsert({ where: { email: demoEmail.toLowerCase() }, update: ceoData, create: { email: demoEmail.toLowerCase(), ...ceoData } })
  const disabled = { name: 'Disabled manager (demo)', globalRole: 'USER' as const, status: 'disabled', password: null }
  await prisma.user.upsert({ where: { email: 'disabled.manager@example.test' }, update: disabled, create: { email: 'disabled.manager@example.test', ...disabled } })
  await prisma.user.deleteMany({ where: { email: { notIn: [demoEmail.toLowerCase(), 'disabled.manager@example.test'] } } })

  const A = (companyId: string, category: string, title: string, description: string, requestedBy: string, priority: string, h: number, amount?: number) =>
    prisma.approval.create({ data: { companyId, category: category as never, title, description, requestedBy, priority: priority as never, requestedAt: ago(h), amount } })
  await A('horeb', 'PROCUREMENT', 'Restock school supplies for the new term', 'SAMPLE REQUEST (demo data). Purchase order for exercise books and stationery for the Douala agencies.', 'Horeb operations manager (demo)', 'HIGH', 3, 2500000)
  await A('lq', 'MARKETING', 'Back-to-school promotion in the bookshop', 'SAMPLE REQUEST (demo data). Two-week promotion with posters and social media posts.', 'Librairie store manager (demo)', 'NORMAL', 20, 350000)
  await A('rogers', 'OPERATIONS', 'Confirm venue for the next leadership event', 'SAMPLE REQUEST (demo data). Venue deposit needed to hold the date.', 'Programmes coordinator (demo)', 'CRITICAL', 1, 800000)
  await A('dros', 'HIRING', 'Hire a site supervisor', 'SAMPLE REQUEST (demo data). Fixed-term contract for one construction site.', 'DROS project lead (demo)', 'NORMAL', 30)
  await A('mgi', 'LEGAL', 'Sign domain transfer authorisation', 'SAMPLE REQUEST (demo data). Authorise transfer of company domains into MGI accounts.', 'Maxpromo Digital (demo)', 'HIGH', 6)
  await prisma.approval.create({ data: { companyId: 'nmi', category: 'FINANCE', title: 'Printing advance for a reprint', description: 'SAMPLE REQUEST (demo data).', requestedBy: 'NMI finance (demo)', status: 'APPROVED', decidedAt: ago(26), decidedBy: 'Demo CEO', requestedAt: ago(50), amount: 1200000 } })

  const R = (venture: string, ventureName: string, type: string, urgency: string, title: string, body: string, submittedBy: string, h: number, status = 'new', ceoReply?: string) =>
    prisma.ventureReport.create({ data: { venture, ventureName, type, urgency, title, body, submittedBy, createdAt: ago(h), status, ceoReply, repliedAt: ceoReply ? ago(h - 1) : undefined } })
  await R('horeb', 'Horeb Solutions', 'report', 'normal', 'Weekly activity report', 'SAMPLE REPORT (demo data). Agencies open, deliveries on schedule, two supplier follow-ups pending.', 'Horeb operations manager (demo)', 4)
  await R('lq', 'Librairie du Quartier', 'update', 'normal', 'Stock arrival for the new term', 'SAMPLE UPDATE (demo data). New stock received; shelves updated.', 'Librairie store manager (demo)', 9, 'acknowledged', 'Thank you — keep me informed of best sellers.')
  await R('rogers', 'Rogers Nforgwei', 'approval_request', 'urgent', 'Venue deposit decision needed', 'SAMPLE REQUEST (demo data). Deposit needed this week to hold the date.', 'Programmes coordinator (demo)', 2)
  await R('dros', 'DROS Construction', 'incident', 'critical', 'Material delivery delayed', 'SAMPLE INCIDENT (demo data). Cement delivery delayed by two days; site schedule at risk.', 'DROS project lead (demo)', 1)
  await R('mgi', 'Mina-Galeed Invest (MGI)', 'report', 'normal', 'Consultancy enquiries this week', 'SAMPLE REPORT (demo data). Three enquiries received through the website contact page.', 'MGI office (demo)', 28, 'resolved', 'Good. Please schedule calls with all three.')

  const M = (companyId: string, source: string, fromName: string, subject: string | null, body: string, h: number, aiActToday = false) =>
    prisma.message.create({ data: { companyId, source: source as never, fromName, fromHandle: `${companyId}.contact@example.test`, subject, body, receivedAt: ago(h), aiActToday } })
  await M('horeb', 'EMAIL', 'Horeb operations manager (demo)', 'Supplier follow-up', 'SAMPLE MESSAGE (demo data). Two suppliers have not confirmed delivery dates yet.', 2, true)
  await M('lq', 'INSTAGRAM', 'Bookshop customer (demo)', null, 'SAMPLE MESSAGE (demo data). Do you deliver books to Yaoundé centre?', 5)
  await M('rogers', 'WHATSAPP', 'Programmes coordinator (demo)', null, 'SAMPLE MESSAGE (demo data). The venue needs an answer by Friday.', 1, true)
  await M('mgi', 'EMAIL', 'Prospective client (demo)', 'Consultancy enquiry', 'SAMPLE MESSAGE (demo data). We would like advice on structuring a family business.', 24)
  await M('dros', 'INTERNAL', 'DROS project lead (demo)', 'Site update', 'SAMPLE MESSAGE (demo data). Delivery delay reported in the operations bridge.', 1, true)

  const E = (title: string, start: Date, hours: number, type: string, companyId?: string, location?: string) =>
    prisma.event.create({ data: { title, startAt: start, endAt: new Date(start.getTime() + hours * H), type: type as never, companyId, location, description: 'Demo calendar entry' } })
  await E('MGI management meeting', inH(1), 1.5, 'MEETING', 'mgi', 'Zoom')
  await E('Horeb weekly review', day(1, 9), 1, 'INTERNAL', 'horeb')
  await E('Leadership event planning call', day(2, 15), 1, 'CALL', 'rogers')
  await E('DROS site visit', day(3, 10), 3, 'TRAVEL', 'dros', 'Construction site (demo)')

  await prisma.bookingRequest.create({ data: { companyId: 'mgi', requesterName: 'Prospective client (demo)', requesterEmail: 'client@example.test', purpose: 'Consultancy introduction (demo)', requestedDate: day(4, 11), duration: 30 } })
  await prisma.bookingRequest.create({ data: { companyId: 'rogers', requesterName: 'Event partner (demo)', requesterEmail: 'partner@example.test', purpose: 'Partnership discussion (demo)', requestedDate: day(5, 14), duration: 45 } })

  const S = (companyId: string, platform: string, content: string, status: string, scheduledAt?: Date) =>
    prisma.socialPost.create({ data: { companyId, platform: platform as never, content, status: status as never, scheduledAt, mediaUrls: [] } })
  await S('lq', 'INSTAGRAM', 'Demo post — back-to-school selection now on our shelves.', 'AWAITING_APPROVAL')
  await S('rogers', 'FACEBOOK', 'Demo post — save the date for the next leadership event.', 'SCHEDULED', day(2, 18))
  await S('horeb', 'LINKEDIN', 'Demo post — our agency network across Cameroon.', 'DRAFT')

  const N = (title: string, body: string, priority: string, companyId?: string) =>
    prisma.notification.create({ data: { userId: ceo.id, companyId, type: 'demo', title, body, priority: priority as never } })
  await N('Critical incident reported', 'DROS: material delivery delayed (demo).', 'URGENT', 'dros')
  await N('Approval waiting', 'Venue deposit needs your decision (demo).', 'HIGH', 'rogers')

  const counts = { companies: await prisma.company.count(), users: await prisma.user.count(), approvals: await prisma.approval.count(), reports: await prisma.ventureReport.count(), messages: await prisma.message.count(), events: await prisma.event.count() }
  console.log('Demo data loaded:', JSON.stringify(counts))
}

main().catch((e) => { console.error('Seed failed:', e.message); process.exit(1) })
