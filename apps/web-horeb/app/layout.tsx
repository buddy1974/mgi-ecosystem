import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import MobileNav from "./MobileNav";

export const metadata: Metadata = {
  title: "Horeb Solutions Sarl | Distribution de manuels scolaires au Cameroun",
  description:
    "Horeb Solutions Sarl est votre partenaire de la distribution au Cameroun, spécialisé dans la diffusion de manuels scolaires, fournitures scolaires et matériels didactiques à travers un réseau d'agences et de partenaires.",
  keywords: [
    "Horeb Solutions",
    "distribution manuels scolaires Cameroun",
    "fournitures scolaires Cameroun",
    "matériel didactique Cameroun",
    "agence distribution scolaire Yaoundé",
    "distribution livres scolaires Douala",
    "partenaire distribution Cameroun",
  ],
  authors: [{ name: "Horeb Solutions Sarl" }],
  openGraph: {
    title: "Horeb Solutions Sarl | Distribution de manuels scolaires au Cameroun",
    description:
      "Votre partenaire de la distribution — manuels scolaires, fournitures et matériels didactiques partout au Cameroun.",
    url: "https://horebsolutions.org",
    siteName: "Horeb Solutions Sarl",
    locale: "fr_CM",
    type: "website",
    images: [
      { url: "/og/horeb-og.jpg", width: 1200, height: 630, alt: "Horeb Solutions Sarl" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horeb Solutions Sarl | Distribution de manuels scolaires au Cameroun",
    description:
      "Votre partenaire de la distribution — manuels scolaires, fournitures et matériels didactiques partout au Cameroun.",
    images: ["/og/horeb-og.jpg"],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://horebsolutions.org"),
};

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "#a-propos" },
  { label: "Services", href: "#services" },
  { label: "Réseau", href: "#reseau" },
  { label: "Agences", href: "#agences" },
  { label: "Contact", href: "#contact" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {/* JSON-LD Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Horeb Solutions Sarl",
              url: "https://horebsolutions.org",
              logo: "https://horebsolutions.org/logos/horeb-logo.png",
              description:
                "Distribution de manuels scolaires, fournitures scolaires et matériels didactiques au Cameroun.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Immeuble CCA, Marché Central",
                addressLocality: "Yaoundé",
                postalCode: "BP 31750",
                addressCountry: "CM",
              },
              telephone: "+237237222233665",
              email: "info@horebsolutions.com",
            }),
          }}
        />

        {/* ── NAVBAR ─────────────────────────────────────── */}
        <nav
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "var(--horeb-dark-green)",
            boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 clamp(1rem,5vw,2rem)",
              height: 68,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontWeight: 900,
                    color: "var(--horeb-white)",
                    fontSize: 16,
                    letterSpacing: "-0.04em",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  HS
                </span>
                <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.25)" }} />
                <div>
                  <p
                    style={{
                      color: "var(--horeb-white)",
                      fontWeight: 700,
                      fontSize: 13,
                      margin: 0,
                      lineHeight: 1.1,
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    Horeb Solutions Sarl
                  </p>
                  <p
                    style={{
                      color: "rgba(255,201,40,0.7)",
                      fontWeight: 400,
                      fontSize: 9,
                      margin: 0,
                      fontStyle: "italic",
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    Votre partenaire de la distribution
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex" style={{ alignItems: "center", gap: 24 }}>
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 13,
                    textDecoration: "none",
                    fontWeight: 500,
                    fontFamily: "'Montserrat', sans-serif",
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "var(--horeb-yellow)",
                  color: "var(--horeb-deep-green)",
                  padding: "10px 22px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none",
                  fontFamily: "'Montserrat', sans-serif",
                  minHeight: 44,
                }}
              >
                Nous contacter
              </a>
            </div>

            <MobileNav />
          </div>
        </nav>

        {children}

        {/* ── FOOTER ─────────────────────────────────────── */}
        <footer
          style={{
            background: "var(--horeb-deep-green)",
            padding: "clamp(3rem,6vw,5rem) clamp(1rem,5vw,2rem) 2rem",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            {/* 5-column grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "clamp(1.5rem,4vw,2.5rem)",
                marginBottom: "3rem",
              }}
            >
              {/* Col 1 — Brand */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div
                    style={{
                      padding: "5px 12px",
                      borderRadius: 6,
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      fontWeight: 900,
                      color: "var(--horeb-white)",
                      fontSize: 14,
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    HS
                  </div>
                  <p style={{ color: "var(--horeb-white)", fontWeight: 700, fontSize: 14, margin: 0, fontFamily: "'Montserrat', sans-serif" }}>
                    Horeb Solutions Sarl
                  </p>
                </div>
                <p style={{ color: "var(--horeb-yellow)", fontStyle: "italic", fontSize: 12, margin: "0 0 16px", fontFamily: "'Roboto', sans-serif" }}>
                  Votre partenaire de la distribution
                </p>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <a href="https://www.facebook.com/horebsolutions" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: "rgba(255,255,255,0.4)", display: "flex" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a href="https://www.instagram.com/horebsolutions_cm/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "rgba(255,255,255,0.4)", display: "flex" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                  </a>
                  <a href="https://x.com/horeb_solutions" target="_blank" rel="noopener noreferrer" aria-label="X" style={{ color: "rgba(255,255,255,0.4)", display: "flex" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                </div>
              </div>

              {/* Col 2 — Services */}
              <div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 14px", fontFamily: "'Montserrat', sans-serif" }}>
                  Services
                </p>
                {["Manuels scolaires", "Fournitures scolaires", "Matériel didactique", "Diffusion & distribution"].map((s) => (
                  <p key={s} style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: "0 0 8px", fontFamily: "'Roboto', sans-serif" }}>{s}</p>
                ))}
              </div>

              {/* Col 3 — Réseau */}
              <div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 14px", fontFamily: "'Montserrat', sans-serif" }}>
                  Réseau
                </p>
                {["Agences Horeb", "Partenaires relais", "Partenaires détaillants", "Couverture Cameroun"].map((s) => (
                  <p key={s} style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: "0 0 8px", fontFamily: "'Roboto', sans-serif" }}>{s}</p>
                ))}
              </div>

              {/* Col 4 — Contact */}
              <div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 14px", fontFamily: "'Montserrat', sans-serif" }}>
                  Contact
                </p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: "0 0 8px", fontFamily: "'Roboto', sans-serif" }}>
                  📍 Immeuble CCA, Marché Central Yaoundé
                </p>
                <a href="tel:+237237222233665" style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, textDecoration: "none", display: "block", margin: "0 0 8px", fontFamily: "'Roboto', sans-serif" }}>
                  📞 +237 237 222 23 36 65
                </a>
                <a href="mailto:info@horebsolutions.com" style={{ color: "#4ade80", fontSize: 12, textDecoration: "none", display: "block", margin: "0 0 8px", fontFamily: "'Roboto', sans-serif" }}>
                  📧 info@horebsolutions.com
                </a>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, margin: 0, fontFamily: "'Roboto', sans-serif" }}>
                  📮 BP : 31750 Yaoundé, Cameroun
                </p>
              </div>

              {/* Col 5 — MGI Group */}
              <div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 14px", fontFamily: "'Montserrat', sans-serif" }}>
                  MGI Group
                </p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, lineHeight: 1.65, margin: "0 0 14px", fontFamily: "'Roboto', sans-serif" }}>
                  Horeb Solutions Sarl fait partie du groupe Mina-Galeed Invest (MGI) Ltd, un écosystème d&apos;entreprises engagé dans la croissance, la structuration et le développement de solutions à impact.
                </p>
                <a
                  href="https://mgi-ventures.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--horeb-yellow)", fontSize: 13, textDecoration: "none", fontFamily: "'Roboto', sans-serif", fontWeight: 600 }}
                >
                  Découvrir MGI →
                </a>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: "1.5rem",
                textAlign: "center",
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, margin: 0, fontFamily: "'Roboto', sans-serif" }}>
                © {new Date().getFullYear()} Horeb Solutions Sarl · Tous droits réservés · Une entreprise du groupe Mina-Galeed Invest — MGI Ltd
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
