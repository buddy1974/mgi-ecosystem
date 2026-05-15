import type { Metadata, Viewport } from "next"
import "./globals.css"
import Link from "next/link"
import NavBar from "./NavBar"
import RogersAssistant from "@/components/RogersAssistant"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#3a0ca3",
}

export const metadata: Metadata = {
  title: {
    default: "Rogers Nforgwei — Faith-Based Leadership Coach & Apostle",
    template: "%s | Rogers Nforgwei",
  },
  description: "Apostle Dr. Rogers Ngalla Nforgwei — international speaker, executive coach, and faith-based leadership mentor transforming men and leaders across 30+ nations.",
  metadataBase: new URL("https://www.rogersnforgwei.com"),
  alternates: { canonical: "https://www.rogersnforgwei.com" },
  openGraph: {
    title: "Rogers Nforgwei — Faith-Based Leadership Coach & Apostle",
    description: "Apostle Dr. Rogers Ngalla Nforgwei — international speaker, executive coach, and faith-based leadership mentor transforming men and leaders across 30+ nations.",
    url: "https://www.rogersnforgwei.com",
    siteName: "Rogers Nforgwei",
    images: [{ url: "https://www.rogersnforgwei.com/og/rogers-og-default.png", width: 1200, height: 630, alt: "Apostle Dr. Rogers Ngalla Nforgwei — Faith-Based Leadership Coach" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rogers Nforgwei — Faith-Based Leadership Coach & Apostle",
    description: "Apostle Dr. Rogers Ngalla Nforgwei — international speaker, executive coach, and faith-based leadership mentor transforming men and leaders across 30+ nations.",
    images: ["https://www.rogersnforgwei.com/og/rogers-og-default.png"],
    creator: "@rogers_nforgwei",
    site: "@rogers_nforgwei",
  },
  icons: {
    icon: "/logos/favicon.png",
    shortcut: "/logos/favicon.png",
    apple: "/logos/favicon.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
}

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rogers Ngalla Nforgwei",
  "alternateName": "Apostle Dr. Rogers Nforgwei",
  "url": "https://www.rogersnforgwei.com",
  "image": "https://www.rogersnforgwei.com/images/rogers-hero.png",
  "jobTitle": "Apostle, Executive Coach, International Speaker",
  "description": "Faith-based leadership coach, apostle, author and international speaker transforming men and leaders across 30+ nations.",
  "worksFor": [
    { "@type": "Organization", "name": "NMI Education" },
    { "@type": "Organization", "name": "DRIMP Foundation" },
  ],
  "sameAs": [
    "https://www.instagram.com/rogers_nforgwei",
    "https://www.facebook.com/nforgwei.rogers",
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Yaoundé",
    "addressCountry": "CM",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "var(--font-body, 'Nunito', 'Plus Jakarta Sans', sans-serif)", background: "#0d0120" }}>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

        <NavBar />

        {children}

        <RogersAssistant />

        {/* FOOTER */}
        <footer style={{ background: "#0d0120", padding: "4rem 2rem 2rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="rn-footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
              <div>
                <div style={{ display: "flex", gap: 0, marginBottom: 20, borderRadius: 4, overflow: "hidden", width: 64 }}>
                  <div style={{ flex: 1, height: 6, background: "#3a0ca3" }} />
                  <div style={{ flex: 1, height: 6, background: "#f72585" }} />
                </div>
                <p style={{ color: "#ffffff", fontWeight: 800, fontSize: 18, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Rogers Ngalla Nforgwei</p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, lineHeight: 1.7, maxWidth: 320, margin: "0 0 16px", fontWeight: 300 }}>
                  Faith-Based Coaching &amp; Mentorship in Leadership, Business and Personal Development
                </p>
                <p style={{ color: "#7b90f3", fontWeight: 300, fontStyle: "italic", fontSize: 13, margin: "0 0 16px" }}>Yaound&eacute;, Cameroon</p>
                <a href="mailto:rogers@rogersnforgwei.com" style={{ color: "#f72585", fontSize: 13, textDecoration: "none", display: "block", marginBottom: 8 }}>
                  rogers@rogersnforgwei.com
                </a>
                <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
                  <a href="https://www.instagram.com/rogers_nforgwei/" target="_blank" rel="noopener noreferrer" style={{ color: "#7b90f3", fontSize: 12, textDecoration: "none", fontWeight: 500 }}>Instagram</a>
                  <a href="https://www.facebook.com/nforgwei.rogers/" target="_blank" rel="noopener noreferrer" style={{ color: "#7b90f3", fontSize: 12, textDecoration: "none", fontWeight: 500 }}>Facebook</a>
                </div>
              </div>

              <div>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>Programs</p>
                {[
                  { label: "Dominion Life Men's Conference", href: "/programs/dominion-life"  },
                  { label: "Men On Duty",                    href: "/programs/men-on-duty"    },
                  { label: "CEO On Mission",                 href: "/programs/ceo-on-mission" },
                ].map((p) => (
                  <Link key={p.href} href={p.href} style={{ color: "#7b90f3", fontSize: 13, display: "block", margin: "0 0 10px", fontWeight: 300, textDecoration: "none" }}>{p.label}</Link>
                ))}
              </div>

              <div>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>Pages</p>
                {[
                  { label: "About Rogers",           href: "/about"        },
                  { label: "Transformation Stories", href: "/testimonials" },
                  { label: "Coaching",               href: "/coaching"     },
                  { label: "Contact",                href: "/contact"      },
                ].map((p) => (
                  <Link key={p.href} href={p.href} style={{ color: "#7b90f3", fontSize: 13, display: "block", margin: "0 0 10px", fontWeight: 300, textDecoration: "none" }}>{p.label}</Link>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", marginBottom: 20 }}>
              <div style={{ flex: 1, height: 3, background: "#3a0ca3" }} />
              <div style={{ flex: 1, height: 3, background: "#f72585" }} />
            </div>

            <p style={{ color: "rgba(255,255,255,0.12)", fontSize: 11, margin: 0, textAlign: "center", fontFamily: "var(--font-body, 'Nunito', sans-serif)" }}>
              &copy; Rogers Ngalla Nforgwei &middot; Yaound&eacute;, Cameroon &middot; Faith &middot; Leadership &middot; Legacy
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
