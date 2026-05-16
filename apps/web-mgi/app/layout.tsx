import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import './globals.css'
import ChatWidget from '@/components/ChatWidget'

export const metadata: Metadata = {
  title: 'Mina-Galeed Invest (MGI) Ltd — Au Cœur de la performance des PME',
  description:
    "Mina-Galeed Invest (MGI) Ltd est une holding qui accompagne les entreprises dans leurs cycles de développement — assistance juridique, comptable, gouvernance, transformation digitale, marketing, RH et ingénierie des projets.",
  metadataBase: new URL('https://mgi-ventures.com'),
  keywords: [
    'MGI', 'Mina-Galeed Invest', 'holding Cameroun', 'assistance juridique Cameroun',
    'comptabilité fiscalité Cameroun', 'transformation digitale', 'gouvernance entreprise',
    'marketing digital Cameroun', 'ressources humaines Cameroun', 'ingénierie projets',
  ],
  authors: [{ name: 'Mina-Galeed Invest (MGI) Ltd' }],
  openGraph: {
    title: 'Mina-Galeed Invest (MGI) Ltd — Au Cœur de la performance des PME',
    description: "Holding d'accompagnement des PME au Cameroun — 7 domaines d'expertise, réseau national.",
    url: 'https://mgi-ventures.com',
    siteName: 'MGI — Mina-Galeed Invest',
    type: 'website',
    locale: 'fr_CM',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mina-Galeed Invest (MGI) Ltd — Start well, Grow well',
    description: "Holding d'accompagnement des PME au Cameroun.",
  },
  robots: { index: true, follow: true },
}

const navLinks = [
  { label: 'Accueil',    href: '/'            },
  { label: 'À propos',  href: '/#about'      },
  { label: 'Expertise', href: '/#expertise'  },
  { label: 'Partenaires', href: '/#partenaires' },
  { label: 'Nos ventures', href: '/#ventures' },
  { label: 'Contact',   href: '/#contact'    },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {/* ── NAV ──────────────────────────────────────────── */}
        <nav
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0,
            zIndex: 50,
            background: 'var(--mgi-dark)',
            boxShadow: '0 2px 20px rgba(0,0,0,0.35)',
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              padding: '0 clamp(1rem,4vw,2rem)',
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 42, height: 42,
                  background: 'rgba(255,255,255,0.12)',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <Image src="/logos/mgi-main.png" alt="MGI" width={30} height={30} style={{ objectFit: 'contain' }} />
              </div>
              <div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, margin: 0, lineHeight: 1.1 }}>
                  Mina-Galeed Invest
                </p>
                <p style={{ color: 'var(--mgi-light)', fontSize: 10, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  MGI Ltd · Start well, Grow well
                </p>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex" style={{ alignItems: 'center', gap: 24 }}>
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="/#contact"
                style={{
                  background: 'var(--mgi-green)',
                  color: '#fff',
                  padding: '9px 20px',
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: 'none',
                  minHeight: 40,
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                Nous contacter
              </a>
            </div>
          </div>
        </nav>

        {/* Spacer for fixed nav */}
        <div style={{ height: 64 }} />

        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
