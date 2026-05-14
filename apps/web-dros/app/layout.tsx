import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DROS Construction — Premier Real Estate Development",
  description: "DROS Construction delivers high-quality construction and real estate development projects across Cameroon and beyond.",
  metadataBase: new URL("https://drosconstruction.com"),
  openGraph: {
    title: "DROS Construction — Premier Real Estate Development",
    description: "DROS Construction delivers high-quality construction and real estate development projects across Cameroon and beyond.",
    url: "https://drosconstruction.com",
    siteName: "DROS Construction",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "DROS Construction — Premier Real Estate Development",
    description: "DROS Construction delivers high-quality construction and real estate development projects across Cameroon and beyond.",
  },
  alternates: {
    canonical: "https://drosconstruction.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif", background: "#ffffff" }}>

        {/* NAV */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(15,31,51,0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(245,158,11,0.12)",
          boxShadow: "0 1px 12px rgba(0,0,0,0.2)",
        }}>
          <div style={{
            maxWidth: 1280, margin: "0 auto",
            padding: "0 2rem", height: 68,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: "linear-gradient(135deg, #1e3a5f, #2d5a8e)",
                border: "2px solid rgba(245,158,11,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, color: "white", fontSize: 14, letterSpacing: "0.05em",
              }}>
                DC
              </div>
              <div>
                <p style={{ color: "#ffffff", fontWeight: 800, fontSize: 15, margin: 0, lineHeight: 1.1 }}>
                  DROS Construction
                </p>
                <p style={{ color: "#f59e0b", fontWeight: 500, fontSize: 10, margin: 0, fontStyle: "italic" }}>
                  Construire avec excellence
                </p>
              </div>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              {[
                { label: "Accueil", href: "/" },
                { label: "À propos", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Réalisations", href: "#projects" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <Link key={item.label} href={item.href} style={{
                  color: "rgba(255,255,255,0.7)", fontSize: 13, textDecoration: "none",
                  fontWeight: 500,
                }}>
                  {item.label}
                </Link>
              ))}
              <a href="#contact" style={{
                background: "#f59e0b", color: "#0f1f33",
                padding: "9px 22px", borderRadius: 10,
                fontSize: 13, fontWeight: 800, textDecoration: "none",
              }}>
                Devis gratuit
              </a>
            </div>
          </div>
        </nav>

        {children}

        {/* FOOTER */}
        <footer style={{ background: "#0f1f33", padding: "4rem 2rem 2rem" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: "#1e3a5f", border: "2px solid rgba(245,158,11,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 900, color: "white", fontSize: 12,
                  }}>DC</div>
                  <p style={{ color: "#ffffff", fontWeight: 800, fontSize: 16, margin: 0 }}>DROS Construction</p>
                </div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.7, maxWidth: 320, margin: "0 0 12px" }}>
                  Entreprise de construction et d&apos;infrastructures au Cameroun.
                  Qualité, fiabilité, expertise.
                </p>
                <p style={{ color: "#f59e0b", fontStyle: "italic", fontSize: 13, margin: 0 }}>
                  Construire avec excellence.
                </p>
              </div>

              <div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>
                  Navigation
                </p>
                {["À propos", "Services", "Réalisations", "Contact"].map((l) => (
                  <a key={l} href={`#${l.toLowerCase().replace("à ", "").replace("é", "e").replace(" ", "-")}`} style={{
                    display: "block", color: "rgba(255,255,255,0.4)", fontSize: 13,
                    textDecoration: "none", marginBottom: 8,
                  }}>{l}</a>
                ))}
              </div>

              <div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>
                  Contact
                </p>
                <a href="mailto:info@drosconstruction.com" style={{
                  color: "#fbbf24", fontSize: 13, textDecoration: "none", display: "block", marginBottom: 16,
                }}>
                  info@drosconstruction.com
                </a>
                <a href="https://mgi-ventures.com" target="_blank" rel="noopener noreferrer" style={{
                  color: "rgba(251,191,36,0.4)", fontSize: 12, textDecoration: "none",
                }}>
                  MGI Ecosystem →
                </a>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.5rem", textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, margin: 0 }}>
                © {new Date().getFullYear()} DROS Construction · Tous droits réservés · Une entreprise du groupe Mina-Galeed Invest (MGI) Ltd
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
