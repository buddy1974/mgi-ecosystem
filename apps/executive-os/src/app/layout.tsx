import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/jetbrains-mono/400.css'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "MGI Executive OS",
  description: "AI-powered Executive Operating System for the MGI Ventures ecosystem.",
  metadataBase: new URL("https://os.mgi-ventures.com"),
  openGraph: {
    title: "MGI Executive OS",
    description: "AI-powered Executive Operating System for the MGI Ventures ecosystem.",
    url: "https://os.mgi-ventures.com",
    siteName: "MGI Executive OS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "MGI Executive OS",
    description: "AI-powered Executive Operating System for the MGI Ventures ecosystem.",
  },
  alternates: {
    canonical: "https://os.mgi-ventures.com",
  },
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
