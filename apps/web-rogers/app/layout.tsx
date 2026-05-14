import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rogers Nforgwei — CEO · Apostle · Visionary",
  description: "Rogers Nforgwei is a visionary leader, entrepreneur, and apostle driving transformation across business, faith, and community.",
  metadataBase: new URL("https://rogersnforgwei.com"),
  openGraph: {
    title: "Rogers Nforgwei — CEO · Apostle · Visionary",
    description: "Rogers Nforgwei is a visionary leader, entrepreneur, and apostle driving transformation across business, faith, and community.",
    url: "https://rogersnforgwei.com",
    siteName: "Rogers Nforgwei",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Rogers Nforgwei — CEO · Apostle · Visionary",
    description: "Rogers Nforgwei is a visionary leader, entrepreneur, and apostle driving transformation across business, faith, and community.",
  },
  alternates: {
    canonical: "https://rogersnforgwei.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#0a0414" }}>

        {/* NAV */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(10,4,20,0.96)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(58,12,163,0.25)",
          boxShadow: "0 1px 20px rgba(58,12,163,0.15)",
        }}>
          <div style={{
            maxWidth: 1280, margin: "0 auto",
            padding: "0 2rem", height: 70,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
              {/* Square bar brand mark — purple + pink */}
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <div style={{ width: 28, height: 5, background: "#3a0ca3", borderRadius: 2 }} />
                <div style={{ width: 20, height: 5, background: "#f72585", borderRadius: 2 }} />
              </div>
              <div>
                <p style={{ color: "#ffffff", fontWeight: 800, fontSize: 16, margin: 0, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                  Rogers Nforgwei
                </p>
                <p style={{ color: "#7b90f3", fontWeight: 300, fontSize: 10, margin: 0 }}>
                  Switch on the better side of the future
                </p>
              </div>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              {[
                { label: "Home",     href: "/"         },
                { label: "About",    href: "#about"    },
                { label: "Programs", href: "#programs" },
                { label: "Vision",   href: "#vision"   },
                { label: "Contact",  href: "#contact"  },
              ].map((item) => (
                <Link key={item.label} href={item.href} style={{
                  color: "rgba(255,255,255,0.6)", fontSize: 13, textDecoration: "none", fontWeight: 500,
                }}>
                  {item.label}
                </Link>
              ))}
              <a href="#contact" style={{
                background: "linear-gradient(90deg, #3a0ca3, #4361ee)",
                color: "white", padding: "9px 22px", borderRadius: 10,
                fontSize: 13, fontWeight: 700, textDecoration: "none",
                boxShadow: "0 2px 16px rgba(58,12,163,0.4)",
              }}>
                Connect
              </a>
            </div>
          </div>
        </nav>

        {children}

        {/* FOOTER */}
        <footer style={{ background: "#060210", padding: "4rem 2rem 2rem", borderTop: "1px solid rgba(58,12,163,0.2)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
              <div>
                <div style={{ display: "flex", gap: 0, marginBottom: 20, borderRadius: 4, overflow: "hidden", width: 64 }}>
                  <div style={{ flex: 1, height: 6, background: "#3a0ca3" }} />
                  <div style={{ flex: 1, height: 6, background: "#f72585" }} />
                </div>
                <p style={{ color: "#ffffff", fontWeight: 800, fontSize: 18, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                  Rogers Nforgwei
                </p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, lineHeight: 1.7, maxWidth: 320, margin: "0 0 16px", fontWeight: 300 }}>
                  Impacting and Changing lives and communities.
                </p>
                <p style={{ color: "#7b90f3", fontWeight: 300, fontStyle: "italic", fontSize: 13, margin: "0 0 16px" }}>
                  &ldquo;Switch on the better side of the future.&rdquo;
                </p>
                <a href="mailto:rogers@rogersnforgwei.com" style={{ color: "#f72585", fontSize: 13, textDecoration: "none" }}>
                  rogers@rogersnforgwei.com
                </a>
              </div>

              <div>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>
                  Programs
                </p>
                {["Dominion Life Men's Conference", "Men On Duty", "CEO On Mission"].map((p) => (
                  <p key={p} style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, margin: "0 0 10px", fontWeight: 300 }}>{p}</p>
                ))}
              </div>

              <div>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>
                  Identity
                </p>
                {["Business man", "Development Director", "Humanitarian", "Coach and Mentor", "CEO NMI Education", "Man of God"].map((d) => (
                  <p key={d} style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, margin: "0 0 8px", fontWeight: 300 }}>{d}</p>
                ))}
              </div>
            </div>

            {/* Full-width square bar — brand footer element */}
            <div style={{ display: "flex", marginBottom: 20 }}>
              <div style={{ flex: 1, height: 3, background: "#3a0ca3" }} />
              <div style={{ flex: 1, height: 3, background: "#f72585" }} />
            </div>

            <p style={{ color: "rgba(255,255,255,0.12)", fontSize: 11, margin: 0, textAlign: "center" }}>
              © {new Date().getFullYear()} Rogers Nforgwei · All rights reserved · MGI Ecosystem
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
