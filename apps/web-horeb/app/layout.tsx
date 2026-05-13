import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Horeb Solutions Sarl — Votre partenaire de la distribution",
  description:
    "Horeb Solutions Sarl distribue vos manuels scolaires partout au Cameroun. Fiabilité en mouvement. Votre logistique, notre priorité.",
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
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: "#0a8348",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, color: "white", fontSize: 18, letterSpacing: "-0.05em",
              }}>
                HS
              </div>
              <div>
                <p style={{ color: "#0a8348", fontWeight: 800, fontSize: 15, margin: 0, lineHeight: 1.1, fontFamily: "'Roboto', sans-serif" }}>
                  Horeb Solutions
                </p>
                <p style={{ color: "#ce9c66", fontWeight: 500, fontSize: 10, margin: 0, fontStyle: "italic" }}>
                  Votre partenaire de la distribution
                </p>
              </div>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              {[
                { label: "Accueil",      href: "/"              },
                { label: "À propos",     href: "#about"         },
                { label: "Produits",     href: "#products"      },
                { label: "Distribution", href: "#distribution"  },
                { label: "Contact",      href: "#contact"       },
              ].map((item) => (
                <Link key={item.label} href={item.href} style={{
                  color: "#374151", fontSize: 13, textDecoration: "none",
                  fontWeight: 500, fontFamily: "'Roboto', sans-serif",
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
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: "#0a8348", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "white", fontSize: 16 }}>HS</div>
                  <p style={{ color: "#ffffff", fontWeight: 800, fontSize: 16, margin: 0 }}>Horeb Solutions Sarl</p>
                </div>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.7, maxWidth: 320, margin: "0 0 12px" }}>
                  Notre mission est d&apos;offrir une logistique fiable et dynamique,
                  en plaçant votre succès au cœur de nos priorités.
                </p>
                <p style={{ color: "#fdda2b", fontStyle: "italic", fontSize: 13, margin: 0 }}>
                  Fiabilité en mouvement. Votre logistique, notre priorité.
                </p>
              </div>

              <div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>
                  Agences
                </p>
                {[
                  { city: "Yaoundé — Gare",     tel: "+237 676 165 716" },
                  { city: "Yaoundé — Acacias",  tel: "+237 699 276 185" },
                  { city: "Douala — Ville",      tel: "+237 674 879 647" },
                  { city: "Douala — Bonaberi",   tel: "+237 683 318 223" },
                  { city: "Bafoussam",           tel: "+237 650 121 811" },
                ].map((a) => (
                  <div key={a.city} style={{ marginBottom: 10 }}>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: "0 0 2px", fontWeight: 600 }}>{a.city}</p>
                    <a href={`tel:${a.tel.replace(/\s/g, "")}`} style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, textDecoration: "none" }}>{a.tel}</a>
                  </div>
                ))}
              </div>

              <div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>
                  Contact
                </p>
                <a href="mailto:info@horebsolutions.org" style={{ color: "#4ade80", fontSize: 13, textDecoration: "none", display: "block", marginBottom: 16 }}>
                  info@horebsolutions.org
                </a>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, lineHeight: 1.6, margin: "0 0 16px" }}>
                  Immeuble CCA<br />Marché Central Yaoundé<br />BP 31750, Yaoundé – Cameroun
                </p>
                <a href="https://mgi-ventures.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(74,222,128,0.5)", fontSize: 12, textDecoration: "none" }}>
                  MGI Ecosystem →
                </a>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem", textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 11, margin: 0 }}>
                © {new Date().getFullYear()} Horeb Solutions Sarl · Tous droits réservés · Une entreprise du groupe Mina-Galeed Invest (MGI) Ltd
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
