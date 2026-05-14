import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import './globals.css'
import ChatWidget from '@/components/ChatWidget'

export const metadata: Metadata = {
  title: "MGI Ventures — Multi-Sector Venture Ecosystem",
  description: "MGI Ventures is a multi-sector venture ecosystem operating across education, hospitality, construction, culture, and humanitarian impact.",
  metadataBase: new URL("https://mgi-ventures.com"),
  openGraph: {
    title: "MGI Ventures — Multi-Sector Venture Ecosystem",
    description: "MGI Ventures is a multi-sector venture ecosystem operating across education, hospitality, construction, culture, and humanitarian impact.",
    url: "https://mgi-ventures.com",
    siteName: "MGI Ventures",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "MGI Ventures — Multi-Sector Venture Ecosystem",
    description: "MGI Ventures is a multi-sector venture ecosystem operating across education, hospitality, construction, culture, and humanitarian impact.",
  },
  alternates: {
    canonical: "https://mgi-ventures.com",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* ── SHARED NAV ─────────────────────────────────── */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
          style={{
            background: "rgba(255,255,255,0.95)",
            borderBottom: "1px solid rgba(13,110,54,0.1)",
            boxShadow: "0 1px 20px rgba(0,0,0,0.06)",
          }}
        >
          <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#f0f7f2", border: "1px solid rgba(13,110,54,0.2)" }}
              >
                <Image src="/logos/mgi-main.png" alt="MGI" width={28} height={28} className="object-contain" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-tight leading-none" style={{ color: "#0c1a10" }}>
                  Mina-Galeed Invest
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase leading-none mt-0.5" style={{ color: "#5a7a65" }}>
                  MGI Ltd · Est. 2019
                </p>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/about"     className="text-sm transition-colors hover:text-[#0d6e36]" style={{ color: "#5a7a65" }}>About</Link>
              <Link href="/expertise" className="text-sm transition-colors hover:text-[#0d6e36]" style={{ color: "#5a7a65" }}>Expertise</Link>
              <Link href="/#ventures" className="text-sm transition-colors hover:text-[#0d6e36]" style={{ color: "#5a7a65" }}>Our Ventures</Link>
              <Link href="/contact"   className="text-sm transition-colors hover:text-[#0d6e36]" style={{ color: "#5a7a65" }}>Contact</Link>
              <Link
                href="https://os.mgi-ventures.com"
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110"
                style={{ background: "#0d6e36" }}
              >
                Executive OS
              </Link>
            </div>
          </div>
        </nav>

        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
