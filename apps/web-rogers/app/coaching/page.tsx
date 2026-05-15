import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import CoachingPage from './CoachingContent'

export const metadata: Metadata = buildMetadata({
  title: 'Coaching & Mentorship',
  description: 'One-to-one faith-based coaching with Apostle Rogers Nforgwei in leadership, business, and personal development. Digital-first — book a session online.',
  path: '/coaching',
})

export default function Page() {
  return <CoachingPage />
}
