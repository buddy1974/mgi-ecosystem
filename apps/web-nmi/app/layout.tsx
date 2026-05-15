import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import MobileNav from "./MobileNav";

export const metadata: Metadata = {
  title: { default: 'NMI Education — Learning Across 7 Countries', template: '%s | NMI Education' },
  description: 'NMI Education is a faith-driven educational institution operating across 7 countries in Africa, committed to academic excellence, character formation, and transformational learning.',
  metadataBase: new URL('https://www.nmieducation.com'),
  openGraph: { title: 'NMI Education — Learning Across 7 Countries', description: 'Faith-driven education across 7 countries in Africa.', siteName: 'NMI Education', locale: 'en_US', type: 'website' },
  twitter: { card: 'summary', title: 'NMI Education', description: 'Faith-driven education across 7 countries.' },
  robots: { index: true, follow: true },
};

const serif = "'Libre Baskerville', Georgia, 'Times New Roman', serif";
const sans = "'Inter', 'Segoe UI', Arial, sans-serif";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: sans, background: "#ffffff", color: "#0f1c2e" }}>

        {/* NAV */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(12px)",
          borderBottom: "2px solid #003580",
          boxShadow: "0 1px 8px rgba(0,53,128,0.08)",
        }}>
          <div style={{
            maxWidth: 1280, margin: "0 auto",
            padding: "0 2rem", height: 72,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 14 }}>
              {/* Institutional logo mark */}
              <div style={{
                width: 48, height: 48, borderRadius: 8,
                background: "#003580",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 2,
              }}>
                <span style={{ color: "white", fontWeight: 700, fontSize: 14, fontFamily: sans, letterSpacing: "0.05em", lineHeight: 1 }}>NMI</span>
                <div style={{ width: 28, height: 2, background: "#d4a017", borderRadius: 1 }} />
              </div>
              <div>
                <p style={{ color: "#003580", fontWeight: 700, fontSize: 16, margin: 0, lineHeight: 1.1, fontFamily: sans }}>
                  NMI Education
                </p>
                <p style={{ color: "#d4a017", fontWeight: 400, fontSize: 10, margin: 0, letterSpacing: "0.05em", fontFamily: sans }}>
                  Bilingual Publishing Leader
                </p>
              </div>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "#about" },
                { label: "Publishing", href: "#publishing" },
                { label: "Distribution", href: "#distribution" },
                { label: "Leadership", href: "#leadership" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <Link key={item.label} href={item.href} style={{
                  color: "#374151", fontSize: 13, textDecoration: "none", fontWeight: 500,
                }}>
                  {item.label}
                </Link>
              ))}
              <a href="#contact" style={{
                background: "#003580", color: "white",
                padding: "9px 22px", borderRadius: 6,
                fontSize: 13, fontWeight: 600, textDecoration: "none",
              }}>
                Partner With Us
              </a>
              <MobileNav />
            </div>
          </div>
        </nav>

        {children}

        {/* FOOTER */}
        <footer style={{ background: "#0f1c2e", padding: "4rem 2rem 2rem" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
              <div>
                {/* Gold accent line */}
                <div style={{ width: 40, height: 3, background: "#d4a017", borderRadius: 2, marginBottom: 20 }} />
                <p style={{ color: "#ffffff", fontWeight: 700, fontSize: 18, margin: "0 0 8px", fontFamily: serif }}>
                  NMI Education
                </p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.7, maxWidth: 340, margin: "0 0 16px" }}>
                  Bilingual publishing leader in Africa. 1.5 million books
                  annually. Serving education across Cameroon and the continent.
                </p>
                <p style={{ color: "#d4a017", fontStyle: "italic", fontSize: 13, margin: "0 0 16px", fontFamily: serif }}>
                  &ldquo;Building Africa&apos;s educational future through quality publishing.&rdquo;
                </p>
                <a href="mailto:info@nmieducation.com" style={{ color: "#60a5fa", fontSize: 13, textDecoration: "none" }}>
                  info@nmieducation.com
                </a>
              </div>

              <div>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>
                  Services
                </p>
                {["Educational Publishing", "Bilingual Curriculum", "Book Distribution", "Warehousing", "Anti-Piracy Print", "School Supply Chain"].map((s) => (
                  <p key={s} style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, margin: "0 0 8px" }}>{s}</p>
                ))}
              </div>

              <div>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>
                  Contact
                </p>
                <a href="mailto:info@nmieducation.com" style={{ color: "#60a5fa", fontSize: 13, textDecoration: "none", display: "block", marginBottom: 16 }}>
                  info@nmieducation.com
                </a>
                <a href="https://mgi-ventures.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(96,165,250,0.45)", fontSize: 12, textDecoration: "none" }}>
                  MGI Ecosystem →
                </a>
              </div>
            </div>

            {/* Thin gold line separator */}
            <div style={{ height: 1, background: "rgba(212,160,23,0.2)", marginBottom: "1.5rem" }} />
            <p style={{ color: "rgba(255,255,255,0.12)", fontSize: 11, margin: "0 0 12px", textAlign: "center" }}>
              © {new Date().getFullYear()} NMI Education · All rights reserved · A Mina-Galeed Invest (MGI) Ltd enterprise
            </p>
            <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center" }}>
              <a href="https://www.facebook.com/nmieducationsarl" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: "rgba(255,255,255,0.3)", display: "flex" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/nmieducation_cm/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "rgba(255,255,255,0.3)", display: "flex" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/78297252/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: "rgba(255,255,255,0.3)", display: "flex" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://x.com/nmieducation_cm" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" style={{ color: "rgba(255,255,255,0.3)", display: "flex" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.youtube.com/@nmieducation5180" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ color: "rgba(255,255,255,0.3)", display: "flex" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
