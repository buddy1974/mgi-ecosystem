import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import MobileNav from "./MobileNav";

export const metadata: Metadata = {
  title: "Librairie du Quartier — Culture & Knowledge",
  description: "Librairie du Quartier is a community bookstore celebrating culture, literature, and the power of knowledge.",
  metadataBase: new URL("https://librairieduquartier.org"),
  openGraph: {
    title: "Librairie du Quartier — Culture & Knowledge",
    description: "Librairie du Quartier is a community bookstore celebrating culture, literature, and the power of knowledge.",
    url: "https://librairieduquartier.org",
    siteName: "Librairie du Quartier",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Librairie du Quartier — Culture & Knowledge",
    description: "Librairie du Quartier is a community bookstore celebrating culture, literature, and the power of knowledge.",
  },
  alternates: {
    canonical: "https://librairieduquartier.org",
  },
};

const navFont = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const bodyFont = "Georgia, 'Garamond', 'Times New Roman', serif";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: bodyFont, background: "#ffffff" }}>

        {/* NAV */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(57,49,134,0.1)",
          boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
        }}>
          <div style={{
            maxWidth: 1280, margin: "0 auto",
            padding: "0 2rem", height: 68,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
              {/* Logo: orange circle with L — from PDF */}
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "#EF7F1B",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, color: "white", fontSize: 20,
                fontFamily: navFont,
                boxShadow: "0 2px 8px rgba(239,127,27,0.3)",
              }}>
                L
              </div>
              <div>
                <p style={{ color: "#393186", fontWeight: 800, fontSize: 15, margin: 0, lineHeight: 1.1, fontFamily: navFont }}>
                  Librairie du Quartier
                </p>
                <p style={{ color: "#EF7F1B", fontWeight: 400, fontSize: 10, margin: 0, fontStyle: "italic", fontFamily: navFont }}>
                  Votre librairie de référence
                </p>
              </div>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              {[
                { label: "Accueil", href: "/" },
                { label: "À propos", href: "#about" },
                { label: "Catalogue", href: "#catalogue" },
                { label: "Nos librairies", href: "#librairies" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <Link key={item.label} href={item.href} style={{
                  color: "#374151", fontSize: 13, textDecoration: "none", fontWeight: 600, fontFamily: navFont,
                }}>
                  {item.label}
                </Link>
              ))}
              <a href="#contact" style={{
                background: "#393186", color: "white",
                padding: "9px 22px", borderRadius: 10,
                fontSize: 13, fontWeight: 700, textDecoration: "none", fontFamily: navFont,
              }}>
                Nous trouver
              </a>
              <MobileNav />
            </div>
          </div>
        </nav>

        {children}

        {/* FOOTER */}
        <footer style={{ background: "#1a1630", padding: "4rem 2rem 2rem" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "#EF7F1B", display: "flex", alignItems: "center",
                    justifyContent: "center", fontWeight: 900, color: "white", fontSize: 18, fontFamily: navFont,
                  }}>L</div>
                  <p style={{ color: "#ffffff", fontWeight: 800, fontSize: 16, margin: 0, fontFamily: navFont }}>
                    Librairie du Quartier
                  </p>
                </div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.7, maxWidth: 320, margin: "0 0 12px", fontFamily: bodyFont }}>
                  Votre librairie de référence — livres, manuels scolaires
                  et fournitures au Cameroun.
                </p>
                <p style={{ color: "#EF7F1B", fontStyle: "italic", fontSize: 13, margin: 0, fontFamily: bodyFont }}>
                  La culture à portée de main.
                </p>
              </div>

              <div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px", fontFamily: navFont }}>
                  Nos librairies
                </p>
                <div style={{ marginBottom: 14 }}>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, margin: "0 0 4px", fontWeight: 700, fontFamily: navFont }}>Yaoundé</p>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, margin: "0 0 2px" }}>Rond-Point Express</p>
                  <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, margin: 0 }}>À-côté de CAMTEL Biyem-Assi</p>
                </div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, margin: "0 0 4px", fontWeight: 700, fontFamily: navFont }}>Douala</p>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, margin: "0 0 2px" }}>PK 10</p>
                  <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, margin: 0 }}>Face Boulangerie Saker</p>
                </div>
              </div>

              <div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px", fontFamily: navFont }}>
                  Contact
                </p>
                <a href="tel:+237654080187" style={{ color: "#a78bfa", fontSize: 13, textDecoration: "none", display: "block", marginBottom: 6 }}>
                  654-080-187
                </a>
                <a href="tel:+237698736153" style={{ color: "#a78bfa", fontSize: 13, textDecoration: "none", display: "block", marginBottom: 16 }}>
                  698-736-153
                </a>
                <a href="mailto:contact@librairieduquartier.org" style={{ color: "#EF7F1B", fontSize: 13, textDecoration: "none", display: "block", marginBottom: 16 }}>
                  contact@librairieduquartier.org
                </a>
                <a href="https://mgi-ventures.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(167,139,250,0.4)", fontSize: 12, textDecoration: "none" }}>
                  MGI Ecosystem →
                </a>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem", textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, margin: 0, fontFamily: navFont }}>
                © {new Date().getFullYear()} Librairie du Quartier · Tous droits réservés · Une entreprise du groupe Mina-Galeed Invest (MGI) Ltd
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
