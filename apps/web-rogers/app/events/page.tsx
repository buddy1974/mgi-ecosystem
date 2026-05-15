import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import EventsPage from './EventsContent'

export const metadata: Metadata = buildMetadata({
  title: 'Events & Conferences',
  description: "Upcoming events, conferences, and seminars by Apostle Rogers Nforgwei. Dominion Life Men's Conference and more — in-person and online across 30+ nations.",
  path: '/events',
})

export default function Page() {
  return <EventsPage />
}
