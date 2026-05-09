import { PrismaNeonHttp } from '@prisma/adapter-neon'
import { PrismaClient, EventType, EventStatus, BookingStatus } from '@prisma/client'
import 'dotenv/config'

const adapter = new PrismaNeonHttp(process.env.DATABASE_URL!, {})
const prisma = new PrismaClient({ adapter } as Parameters<typeof PrismaClient>[0])

function daysFromNow(days: number, hour: number, minute = 0): Date {
  const d = new Date()
  d.setDate(d.getDate() + days)
  d.setHours(hour, minute, 0, 0)
  return d
}

const events = [
  { companyId: 'nmi', title: 'NMI Q3 Strategy Review', description: 'Quarterly strategy alignment — academic programs and enrollment targets', type: EventType.MEETING, status: EventStatus.CONFIRMED, startAt: daysFromNow(1, 9, 0), endAt: daysFromNow(1, 11, 0), location: 'NMI Campus — Boardroom A', attendees: ['Rogers Nforgwei', 'NMI Director', 'Head of Academics'] },
  { companyId: 'horeb', title: 'Horeb Fleet Lease Final Call', description: 'Confirm Toyota Hilux x2 lease terms before Friday deadline', type: EventType.CALL, status: EventStatus.CONFIRMED, startAt: daysFromNow(1, 14, 0), endAt: daysFromNow(1, 14, 45), location: 'Phone / WhatsApp', attendees: ['Rogers Nforgwei', 'Horeb Operations Manager'] },
  { companyId: 'rogers', title: 'CEO On Mission — Episode Recording', description: 'Record episode 12 — Leadership through uncertainty', type: EventType.INTERNAL, status: EventStatus.CONFIRMED, startAt: daysFromNow(2, 10, 0), endAt: daysFromNow(2, 12, 0), location: 'Studio — Rogers Office', attendees: ['Rogers Nforgwei', 'Producer'] },
  { companyId: 'lq', title: 'LQ New Hire Interview — Store Manager', description: 'Final round interview for Librairie du Quartier store manager position', type: EventType.MEETING, status: EventStatus.CONFIRMED, startAt: daysFromNow(3, 11, 0), endAt: daysFromNow(3, 11, 45), location: 'LQ Headquarters', attendees: ['Rogers Nforgwei', 'HR Lead', 'Candidate'] },
  { companyId: 'mgi', title: 'MGI Legal Partnership Review', description: 'Review draft partnership agreement with legal counsel', type: EventType.MEETING, status: EventStatus.CONFIRMED, startAt: daysFromNow(4, 15, 0), endAt: daysFromNow(4, 16, 30), location: 'MGI Office — Conference Room', attendees: ['Rogers Nforgwei', 'Legal Counsel', 'MGI COO'] },
  { companyId: 'rogers', title: 'Dominion Life — Planning Committee', description: "Men's Conference 2026 logistics and speaker lineup confirmation", type: EventType.MEETING, status: EventStatus.CONFIRMED, startAt: daysFromNow(5, 17, 0), endAt: daysFromNow(5, 19, 0), location: 'Church Office', attendees: ['Rogers Nforgwei', 'Planning Committee (x4)'] },
  { companyId: 'dros', title: 'DROS Geotech Survey Site Visit', description: 'On-site review of geotech survey results with engineering team', type: EventType.TRAVEL, status: EventStatus.CONFIRMED, startAt: daysFromNow(6, 8, 0), endAt: daysFromNow(6, 12, 0), location: 'Project Site — Douala', attendees: ['Rogers Nforgwei', 'DROS Site Engineer'] },
  { companyId: 'nmi', title: 'NMI Parent-Teacher Stakeholder Forum', description: 'Annual forum — Q&A and academic progress overview', type: EventType.CONFERENCE, status: EventStatus.CONFIRMED, startAt: daysFromNow(8, 14, 0), endAt: daysFromNow(8, 17, 0), location: 'NMI Auditorium', attendees: ['Rogers Nforgwei', 'NMI Director', 'Teaching Staff', 'Parents'] },
  { companyId: 'horeb', title: 'Horeb Monthly Operations Review', description: 'KPIs, fleet utilization, client feedback, upcoming contracts', type: EventType.MEETING, status: EventStatus.TENTATIVE, startAt: daysFromNow(10, 10, 0), endAt: daysFromNow(10, 11, 30), location: 'Horeb Office', attendees: ['Rogers Nforgwei', 'Horeb Operations Manager', 'Finance Lead'] },
  { companyId: null, title: 'Board of Directors — Quarterly Meeting', description: 'Cross-entity performance review and strategic priorities for Q4', type: EventType.MEETING, status: EventStatus.CONFIRMED, startAt: daysFromNow(14, 9, 0), endAt: daysFromNow(14, 13, 0), location: 'MGI Headquarters', attendees: ['Rogers Nforgwei', 'Board Members (x5)', 'CFO', 'Legal Counsel'] },
]

const bookingRequests = [
  { companyId: 'nmi', requesterName: 'Bertrand Kamga', requesterEmail: 'b.kamga@nmieducation.com', requesterPhone: '+237 677 123 456', purpose: 'Urgent: Academic calendar restructuring — needs CEO sign-off before board', requestedDate: daysFromNow(2, 15, 0), duration: 30, status: BookingStatus.PENDING },
  { companyId: 'horeb', requesterName: 'Jean-Paul Ondoa', requesterEmail: 'jpondoa@outlook.com', requesterPhone: '+237 699 456 789', purpose: 'Partnership proposal — logistics corridor Douala-Yaoundé', requestedDate: daysFromNow(3, 10, 0), duration: 45, status: BookingStatus.PENDING },
  { companyId: 'rogers', requesterName: 'Pastor Emmanuel Tchinda', requesterEmail: 'e.tchinda@church.org', requesterPhone: null, purpose: 'Speaking invitation — Youth Leadership Conference, June 2026', requestedDate: daysFromNow(7, 14, 0), duration: 30, status: BookingStatus.PENDING },
  { companyId: 'mgi', requesterName: 'Amira Hassan', requesterEmail: 'amira.hassan@investco.com', requesterPhone: '+237 655 789 012', purpose: 'Investment inquiry — MGI ecosystem expansion into West Africa', requestedDate: daysFromNow(9, 11, 0), duration: 60, status: BookingStatus.PENDING },
]

async function main() {
  console.log('Seeding calendar events and booking requests...')
  for (const event of events) {
    const existing = await prisma.event.findFirst({ where: { title: event.title } })
    if (!existing) {
      await prisma.event.create({ data: event })
      console.log(`  Created event: ${event.title}`)
    } else {
      console.log(`  Skipped: ${event.title}`)
    }
  }
  for (const booking of bookingRequests) {
    const existing = await prisma.bookingRequest.findFirst({ where: { requesterEmail: booking.requesterEmail } })
    if (!existing) {
      await prisma.bookingRequest.create({ data: booking })
      console.log(`  Created booking: ${booking.requesterName}`)
    } else {
      console.log(`  Skipped: ${booking.requesterName}`)
    }
  }
  console.log('Done.')
  await prisma.$disconnect()
}

main().catch((e) => { console.error(e); process.exit(1) })
