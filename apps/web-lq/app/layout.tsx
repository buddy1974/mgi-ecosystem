import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import MobileNav from "./MobileNav";

export const metadata: Metadata = {
  title: { default: 'Librairie du Quartier — Livres & Ressources | Cameroun', template: '%s | Librairie du Quartier' },
  description: 'Librairie du Quartier — votre librairie de confiance au Cameroun. Livres chrétiens, ressources de développement personnel, et matériel éducatif.',
  metadataBase: new URL('https://www.librairieduquartier.org'),
  openGraph: { title: 'Librairie du Quartier — Livres & Ressources', description: 'Librairie du Quartier — votre librairie de confiance au Cameroun.', siteName: 'Librairie du Quartier', locale: 'fr_FR', type: 'website' },
  twitter: { card: 'summary', title: 'Librairie du Quartier', description: 'Livres et ressources au Cameroun.' },
  robots: { index: true, follow: true },
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
              <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, margin: "0 0 12px", fontFamily: navFont }}>
                © {new Date().getFullYear()} Librairie du Quartier · Tous droits réservés · Une entreprise du groupe Mina-Galeed Invest (MGI) Ltd
              </p>
              <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center" }}>
                <a href="https://www.facebook.com/librairieduquartier" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: "rgba(255,255,255,0.3)", display: "flex" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.instagram.com/librairieduquartier_cm/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "rgba(255,255,255,0.3)", display: "flex" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.tiktok.com/@librairieduquartier24" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ color: "rgba(255,255,255,0.3)", display: "flex" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
