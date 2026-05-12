import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MGI Ventures — Multi-Sector Ventures Ecosystem',
  description:
    'MGI Ventures is a multi-sector ventures ecosystem spanning education, construction, community, faith, and executive development — led by Rogers Nforgwei.',
  openGraph: {
    title: 'MGI Ventures',
    description: 'Multi-Sector Ventures Ecosystem',
    url: 'https://mgi-ventures.com',
    siteName: 'MGI Ventures',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
