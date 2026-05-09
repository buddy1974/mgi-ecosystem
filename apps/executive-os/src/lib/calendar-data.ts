import { prisma } from '@mgi/database'

export async function getUpcomingEvents(days = 14) {
  const now = new Date()
  const until = new Date()
  until.setDate(until.getDate() + days)

  return prisma.event.findMany({
    where: { startAt: { gte: now, lte: until }, status: { not: 'CANCELLED' } },
    orderBy: { startAt: 'asc' },
  }).catch(() => [])
}

export async function getPendingBookings() {
  return prisma.bookingRequest.findMany({
    where: { status: 'PENDING' },
    orderBy: { requestedDate: 'asc' },
  }).catch(() => [])
}

export async function getPendingBookingCount() {
  return prisma.bookingRequest.count({
    where: { status: 'PENDING' },
  }).catch(() => 0)
}

export async function getCalendarStats() {
  const now = new Date()
  const todayEnd = new Date()
  todayEnd.setHours(23, 59, 59, 999)
  const weekEnd = new Date()
  weekEnd.setDate(weekEnd.getDate() + 7)

  const [todayCount, weekCount, pendingBookings] = await Promise.all([
    prisma.event.count({ where: { startAt: { gte: now, lte: todayEnd }, status: { not: 'CANCELLED' } } }).catch(() => 0),
    prisma.event.count({ where: { startAt: { gte: now, lte: weekEnd }, status: { not: 'CANCELLED' } } }).catch(() => 0),
    getPendingBookingCount(),
  ])

  return { todayCount, weekCount, pendingBookings }
}
