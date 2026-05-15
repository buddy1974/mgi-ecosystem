import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import MobileNav from "./MobileNav";

export const metadata: Metadata = {
  title: "Horeb Solutions Sarl | Distribution de manuels scolaires au Cameroun",
  description:
    "Horeb Solutions Sarl — votre partenaire de confiance pour la distribution de manuels scolaires, fournitures scolaires et matériels didactiques au Cameroun. 6 agences, réseau national.",
  keywords: [
    "manuels scolaires Cameroun",
    "distribution scolaire Cameroun",
    "fournitures scolaires",
    "Horeb Solutions",
    "livres scolaires Yaoundé",
    "manuels Douala",
    "matériels didactiques Cameroun",
  ],
  authors: [{ name: "Horeb Solutions Sarl" }],
  openGraph: {
    title: "Horeb Solutions Sarl | Distribution de manuels scolaires au Cameroun",
    description:
      "Votre partenaire de confiance pour la distribution de ressources éducatives au Cameroun.",
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
      "Votre partenaire de confiance pour la distribution de ressources éducatives au Cameroun.",
    images: ["/og/horeb-og.jpg"],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://horebsolutions.org"),
};

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "#services" },
  { label: "À propos", href: "#a-propos" },
  { label: "Agences", href: "#agences" },
  { label: "Partenaires", href: "#partenaires" },
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
              telephone: "+237222233665",
              email: "info@horebsolutions.com",
              sameAs: [
                "https://www.facebook.com/horebsolutions",
                "https://www.instagram.com/horebsolutions_cm/",
              ],
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
            boxShadow: "0 2px 20px rgba(0,0,0,0.25)",
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
            {/* Logo mark */}
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "rgba(255,201,40,0.15)",
                  border: "2px solid rgba(255,201,40,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontWeight: 900,
                    color: "var(--horeb-yellow)",
                    fontSize: 17,
                    letterSpacing: "-0.05em",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  HS
                </span>
              </div>
              <div>
                <p
                  style={{
                    color: "var(--horeb-white)",
                    fontWeight: 700,
                    fontSize: 15,
                    margin: 0,
                    lineHeight: 1.1,
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Horeb Solutions Sarl
                </p>
                <p
                  style={{
                    color: "rgba(255,201,40,0.65)",
                    fontWeight: 400,
                    fontSize: 10,
                    margin: 0,
                    fontStyle: "italic",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  Votre partenaire de la distribution
                </p>
              </div>
            </Link>

            {/* Desktop nav links — hidden on mobile */}
            <div className="hidden md:flex" style={{ alignItems: "center", gap: 28 }}>
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: 13,
                    textDecoration: "none",
                    fontWeight: 500,
                    fontFamily: "'Roboto', sans-serif",
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
                  color: "var(--horeb-dark-green)",
                  padding: "9px 22px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 800,
                  textDecoration: "none",
                  fontFamily: "'Montserrat', sans-serif",
                  minHeight: 44,
                }}
              >
                Commander →
              </a>
            </div>

            {/* Mobile hamburger */}
            <MobileNav />
          </div>
        </nav>

        {children}

        {/* ── FOOTER ─────────────────────────────────────── */}
        <footer
          style={{
            background: "var(--horeb-dark-green)",
            padding: "clamp(3rem,6vw,4rem) clamp(1rem,5vw,2rem) 2rem",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            {/* Logo + tagline */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: "rgba(255,201,40,0.15)",
                    border: "2px solid rgba(255,201,40,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    color: "var(--horeb-yellow)",
                    fontSize: 15,
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  HS
                </div>
                <p style={{ color: "var(--horeb-white)", fontWeight: 700, fontSize: 16, margin: 0, fontFamily: "'Montserrat', sans-serif" }}>
                  Horeb Solutions Sarl
                </p>
              </div>
              <p style={{ color: "var(--horeb-yellow)", fontStyle: "italic", fontSize: 13, margin: 0, fontFamily: "'Roboto', sans-serif" }}>
                Votre partenaire de la distribution
              </p>
            </div>

            {/* 3 columns: Navigation | Services | Contact */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "clamp(2rem,5vw,3rem)",
                marginBottom: "3rem",
              }}
            >
              {/* Navigation */}
              <div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px", fontFamily: "'Montserrat', sans-serif" }}>
                  Navigation
                </p>
                {navLinks.map((item) => (
                  <div key={item.label} style={{ marginBottom: 10 }}>
                    <Link
                      href={item.href}
                      style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, textDecoration: "none", fontFamily: "'Roboto', sans-serif" }}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Services */}
              <div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px", fontFamily: "'Montserrat', sans-serif" }}>
                  Services
                </p>
                {["Manuels Scolaires", "Fournitures Scolaires", "Matériels Didactiques", "Diffusion & Logistique"].map((s) => (
                  <div key={s} style={{ marginBottom: 10 }}>
                    <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontFamily: "'Roboto', sans-serif" }}>{s}</span>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px", fontFamily: "'Montserrat', sans-serif" }}>
                  Contact
                </p>
                <a href="mailto:info@horebsolutions.com" style={{ color: "#4ade80", fontSize: 13, textDecoration: "none", display: "block", marginBottom: 10, fontFamily: "'Roboto', sans-serif" }}>
                  info@horebsolutions.com
                </a>
                <a href="tel:+237222233665" style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, textDecoration: "none", display: "block", marginBottom: 10, fontFamily: "'Roboto', sans-serif" }}>
                  +237 222 23 36 65
                </a>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, lineHeight: 1.6, margin: "0 0 12px", fontFamily: "'Roboto', sans-serif" }}>
                  Immeuble CCA<br />Marché Central Yaoundé<br />BP 31750, Yaoundé — Cameroun
                </p>
                <a href="https://mgi.cm" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(74,222,128,0.5)", fontSize: 12, textDecoration: "none", fontFamily: "'Roboto', sans-serif" }}>
                  MGI Group →
                </a>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: "1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, margin: 0, fontFamily: "'Roboto', sans-serif" }}>
                © {new Date().getFullYear()} Horeb Solutions Sarl. Tous droits réservés. | Groupe MGI
              </p>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <a href="https://www.facebook.com/horebsolutions" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: "rgba(255,255,255,0.3)", display: "flex" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="https://www.instagram.com/horebsolutions_cm/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "rgba(255,255,255,0.3)", display: "flex" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href="https://x.com/horeb_solutions" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" style={{ color: "rgba(255,255,255,0.3)", display: "flex" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href="https://www.youtube.com/@horebsolutions7461" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ color: "rgba(255,255,255,0.3)", display: "flex" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
