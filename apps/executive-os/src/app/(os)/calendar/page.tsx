import { getUpcomingEvents, getPendingBookings, getCalendarStats } from '@/lib/calendar-data'
import { CalendarStrip, EventGroup, BookingRequestCard } from '@/components/calendar'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CalendarPage() {
  const [events, bookings, stats] = await Promise.all([
    getUpcomingEvents(14),
    getPendingBookings(),
    getCalendarStats(),
  ])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-xl font-semibold tracking-tight">Calendar</h1>
          <p className="text-[#64748B] text-xs mt-0.5">
            {stats.todayCount} today · {stats.weekCount} this week
            {stats.pendingBookings > 0 && (
              <span className="ml-2 text-amber-400 font-semibold">
                · {stats.pendingBookings} booking{stats.pendingBookings !== 1 ? 's' : ''} pending
              </span>
            )}
          </p>
        </div>
      </div>

      <CalendarStrip events={events} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <p className="text-[#64748B] text-xs uppercase tracking-widest font-semibold mb-3">
            Upcoming — 14 days
          </p>
          <EventGroup events={events} />
        </div>
        <div>
          <p className="text-[#64748B] text-xs uppercase tracking-widest font-semibold mb-3">
            Booking Requests
            {bookings.length > 0 && (
              <span className="ml-2 text-amber-400">{bookings.length} pending</span>
            )}
          </p>
          {bookings.length === 0 ? (
            <div className="rounded-xl bg-[#111827] border border-[#1F2D40] p-4">
              <p className="text-[#475569] text-sm">No pending booking requests.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {bookings.map((booking) => (
                <BookingRequestCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
