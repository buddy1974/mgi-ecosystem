import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rogers Nforgwei — CEO · Founder · Leader",
  description:
    "Rogers Nforgwei is the Founder & CEO of Mina-Galeed Invest (MGI) Ltd. Speaker, executive mentor, and leader of transformational programs for men and CEOs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "'Montserrat', sans-serif", background: "#0a0414" }}>
        {/* ── NAV ── */}
        <nav
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "rgba(10,4,20,0.92)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(58,12,163,0.25)",
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 2rem",
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <div>
                <span style={{ color: "#ffffff", fontWeight: 900, fontSize: 16, letterSpacing: "-0.02em" }}>
                  Rogers Nforgwei
                </span>
                <span style={{ color: "#f72585", fontWeight: 700, fontSize: 10, display: "block", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 1 }}>
                  CEO · Founder · Leader
                </span>
              </div>
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {[
                { label: "About",    href: "#about"    },
                { label: "Programs", href: "#programs" },
                { label: "Vision",   href: "#vision"   },
                { label: "Contact",  href: "#contact"  },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, textDecoration: "none", fontWeight: 500 }}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://mgi-ventures.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#3a0ca3",
                  color: "white",
                  padding: "8px 20px",
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                MGI Ecosystem →
              </a>
            </div>
          </div>
        </nav>

        {children}

        {/* ── FOOTER ── */}
        <footer style={{ background: "#060211", borderTop: "1px solid rgba(58,12,163,0.2)", padding: "3rem 2rem" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
            <span style={{ color: "#ffffff", fontWeight: 900, fontSize: 18, letterSpacing: "-0.02em" }}>Rogers Nforgwei</span>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, margin: 0 }}>
              Founder & CEO · Mina-Galeed Invest (MGI) Ltd · Yaoundé, Cameroun
            </p>
            <a href="mailto:rogers@rogersnforgwei.com" style={{ color: "#f72585", fontSize: 12, textDecoration: "none" }}>
              rogers@rogersnforgwei.com
            </a>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, margin: 0 }}>
              © {new Date().getFullYear()} Rogers Nforgwei · All rights reserved
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
