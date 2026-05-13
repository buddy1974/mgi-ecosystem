import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NMI Education — Bilingual Publishing Leader in Africa",
  description:
    "NMI Education — bilingual educational publisher. 1.5 million books annually. 60% local market coverage. Continental distribution across Africa. Led by Rogers Nforgwei.",
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
            <p style={{ color: "rgba(255,255,255,0.12)", fontSize: 11, margin: 0, textAlign: "center" }}>
              © {new Date().getFullYear()} NMI Education · All rights reserved · A Mina-Galeed Invest (MGI) Ltd enterprise
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
