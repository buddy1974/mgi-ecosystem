import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import ContactPage from './ContactContent'

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description: 'Get in touch with the Rogers Nforgwei team. Book a speaking engagement, register program interest, or inquire about executive mentorship.',
  path: '/contact',
})

export default function Page() {
  return <ContactPage />
}
