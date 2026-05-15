import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import MobileNav from "./MobileNav";

export const metadata: Metadata = {
  title: { default: 'Horeb Solutions — Faith-Based Business Solutions', template: '%s | Horeb Solutions' },
  description: 'Horeb Solutions provides faith-centered business consulting and organizational services rooted in biblical principles, serving organizations across Cameroon and beyond.',
  metadataBase: new URL('https://www.horebsolutions.org'),
  openGraph: { title: 'Horeb Solutions — Faith-Based Business Solutions', description: 'Horeb Solutions provides faith-centered business consulting and organizational services.', siteName: 'Horeb Solutions', locale: 'en_US', type: 'website' },
  twitter: { card: 'summary', title: 'Horeb Solutions', description: 'Faith-centered business consulting and organizational services.' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "'Roboto', 'Montserrat', sans-serif", background: "#ffffff" }}>

        {/* NAV */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(10,131,72,0.1)",
          boxShadow: "0 1px 12px rgba(0,0,0,0.05)",
        }}>
          <div style={{
            maxWidth: 1280, margin: "0 auto",
            padding: "0 2rem", height: 68,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
              {/* Logo mark — HS on gradient green, tan banner strip */}
              <div style={{
                width: 48, height: 48, borderRadius: 10,
                background: "linear-gradient(135deg, #0a8348, #0d9e58)",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 16, background: "#ce9c66", opacity: 0.6 }} />
                <span style={{ fontWeight: 900, color: "white", fontSize: 18, letterSpacing: "-0.05em", position: "relative", zIndex: 1 }}>HS</span>
              </div>
              <div>
                <p style={{ color: "#0a8348", fontWeight: 700, fontSize: 15, margin: 0, lineHeight: 1.1, fontFamily: "'Roboto', sans-serif" }}>
                  Horeb Solutions Sarl
                </p>
                <p style={{ color: "#ce9c66", fontWeight: 400, fontSize: 10, margin: 0, fontStyle: "italic" }}>
                  Votre partenaire de la distribution
                </p>
              </div>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              {[
                { label: "Accueil",      href: "/"             },
                { label: "À propos",     href: "#about"        },
                { label: "Produits",     href: "#products"     },
                { label: "Distribution", href: "#distribution" },
                { label: "Contact",      href: "#contact"      },
              ].map((item) => (
                <Link key={item.label} href={item.href} style={{
                  color: "#374151", fontSize: 13, textDecoration: "none", fontWeight: 500,
                  fontFamily: "'Roboto', sans-serif",
                }}>
                  {item.label}
                </Link>
              ))}
              <a href="#contact" style={{
                background: "#0a8348", color: "white",
                padding: "9px 22px", borderRadius: 10,
                fontSize: 13, fontWeight: 700, textDecoration: "none",
                fontFamily: "'Roboto', sans-serif",
              }}>
                Nous contacter
              </a>
              <MobileNav />
            </div>
          </div>
        </nav>

        {children}

        {/* FOOTER */}
        <footer style={{ background: "#052e16", padding: "4rem 2rem 2rem" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: "linear-gradient(135deg, #0a8348, #0d9e58)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 900, color: "white", fontSize: 16,
                  }}>HS</div>
                  <p style={{ color: "#ffffff", fontWeight: 700, fontSize: 16, margin: 0, fontFamily: "'Roboto', sans-serif" }}>
                    Horeb Solutions Sarl
                  </p>
                </div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.7, maxWidth: 320, margin: "0 0 12px", fontFamily: "'Roboto', sans-serif" }}>
                  Notre mission est d&apos;offrir une logistique fiable et dynamique,
                  en plaçant votre succès au cœur de nos priorités.
                </p>
                <p style={{ color: "#fdda2b", fontStyle: "italic", fontSize: 13, margin: 0, fontFamily: "'Roboto', sans-serif" }}>
                  Fiabilité en mouvement. Votre logistique, notre priorité.
                </p>
              </div>

              <div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px", fontFamily: "'Montserrat', sans-serif" }}>
                  Agences
                </p>
                {[
                  { city: "Yaoundé — Gare",    tel: "+237 676 165 716" },
                  { city: "Yaoundé — Acacias",  tel: "+237 699 276 185" },
                  { city: "Douala — Ville",     tel: "+237 674 879 647" },
                  { city: "Douala — Bonaberi",  tel: "+237 683 318 223" },
                  { city: "Bafoussam",          tel: "+237 650 121 811" },
                ].map((a) => (
                  <div key={a.city} style={{ marginBottom: 10 }}>
                    <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, margin: "0 0 2px", fontWeight: 600 }}>{a.city}</p>
                    <a href={`tel:${a.tel.replace(/\s/g, "")}`} style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, textDecoration: "none" }}>{a.tel}</a>
                  </div>
                ))}
              </div>

              <div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px", fontFamily: "'Montserrat', sans-serif" }}>
                  Contact
                </p>
                <a href="mailto:info@horebsolutions.org" style={{ color: "#4ade80", fontSize: 13, textDecoration: "none", display: "block", marginBottom: 12 }}>
                  info@horebsolutions.org
                </a>
                <a href="tel:+237222233560" style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, textDecoration: "none", display: "block", marginBottom: 16 }}>
                  +237 222 23 35 60
                </a>
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, lineHeight: 1.6, margin: "0 0 16px" }}>
                  Immeuble CCA<br />Marché Central Yaoundé<br />BP 31750, Yaoundé – Cameroun
                </p>
                <a href="https://mgi-ventures.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(74,222,128,0.4)", fontSize: 12, textDecoration: "none" }}>
                  MGI Ecosystem →
                </a>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem", textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 11, margin: "0 0 12px", fontFamily: "'Roboto', sans-serif" }}>
                © {new Date().getFullYear()} Horeb Solutions Sarl · Tous droits réservés · Une entreprise du groupe Mina-Galeed Invest (MGI) Ltd
              </p>
              <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center" }}>
                <a href="https://www.facebook.com/horebsolutions" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: "rgba(255,255,255,0.3)", display: "flex" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.instagram.com/horebsolutions_cm/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "rgba(255,255,255,0.3)", display: "flex" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://x.com/horeb_solutions" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" style={{ color: "rgba(255,255,255,0.3)", display: "flex" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://www.youtube.com/@horebsolutions7461" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ color: "rgba(255,255,255,0.3)", display: "flex" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
