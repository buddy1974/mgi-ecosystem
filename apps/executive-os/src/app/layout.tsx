import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/jetbrains-mono/400.css'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MGI Executive OS',
  description: 'MGI Ventures — Executive Operating System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-mgi-bg font-sans antialiased">{children}</body>
    </html>
  )
}
