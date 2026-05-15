import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import NavBar from "./NavBar";

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
  icons: {
    icon: "/logos/favicon.png",
    shortcut: "/logos/favicon.png",
    apple: "/logos/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "var(--font-body, 'Nunito', 'Plus Jakarta Sans', sans-serif)", background: "#0d0120" }}>

        <NavBar />

        {children}

        {/* FOOTER */}
        <footer style={{ background: "#0d0120", padding: "4rem 2rem 2rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
              <div>
                <div style={{ display: "flex", gap: 0, marginBottom: 20, borderRadius: 4, overflow: "hidden", width: 64 }}>
                  <div style={{ flex: 1, height: 6, background: "#3a0ca3" }} />
                  <div style={{ flex: 1, height: 6, background: "#f72585" }} />
                </div>
                <p style={{ color: "#ffffff", fontWeight: 800, fontSize: 18, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                  Rogers Ngalla Nforgwei
                </p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, lineHeight: 1.7, maxWidth: 320, margin: "0 0 16px", fontWeight: 300 }}>
                  Faith-Based Coaching &amp; Mentorship in Leadership, Business and Personal Development
                </p>
                <p style={{ color: "#7b90f3", fontWeight: 300, fontStyle: "italic", fontSize: 13, margin: "0 0 16px" }}>
                  Yaound&eacute;, Cameroon
                </p>
                <a href="mailto:rogers@rogersnforgwei.com" style={{ color: "#f72585", fontSize: 13, textDecoration: "none", display: "block", marginBottom: 8 }}>
                  rogers@rogersnforgwei.com
                </a>
                <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
                  <a href="https://www.instagram.com/rogers_nforgwei/" target="_blank" rel="noopener noreferrer" style={{ color: "#7b90f3", fontSize: 12, textDecoration: "none", fontWeight: 500 }}>
                    Instagram
                  </a>
                  <a href="https://www.facebook.com/nforgwei.rogers/" target="_blank" rel="noopener noreferrer" style={{ color: "#7b90f3", fontSize: 12, textDecoration: "none", fontWeight: 500 }}>
                    Facebook
                  </a>
                </div>
              </div>

              <div>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>
                  Programs
                </p>
                {[
                  { label: "Dominion Life Men's Conference", href: "/programs/dominion-life"  },
                  { label: "Men On Duty",                    href: "/programs/men-on-duty"    },
                  { label: "CEO On Mission",                 href: "/programs/ceo-on-mission" },
                ].map((p) => (
                  <Link key={p.href} href={p.href} style={{ color: "#7b90f3", fontSize: 13, display: "block", margin: "0 0 10px", fontWeight: 300, textDecoration: "none" }}>{p.label}</Link>
                ))}
              </div>

              <div>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 16px" }}>
                  Pages
                </p>
                {[
                  { label: "About Rogers",        href: "/about"         },
                  { label: "Transformation Stories", href: "/testimonials" },
                  { label: "Coaching",            href: "/#coaching"     },
                ].map((p) => (
                  <Link key={p.href} href={p.href} style={{ color: "#7b90f3", fontSize: 13, display: "block", margin: "0 0 10px", fontWeight: 300, textDecoration: "none" }}>{p.label}</Link>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", marginBottom: 20 }}>
              <div style={{ flex: 1, height: 3, background: "#3a0ca3" }} />
              <div style={{ flex: 1, height: 3, background: "#f72585" }} />
            </div>

            <p style={{ color: "rgba(255,255,255,0.12)", fontSize: 11, margin: 0, textAlign: "center", fontFamily: "var(--font-body, 'Nunito', sans-serif)" }}>
              &copy; Rogers Ngalla Nforgwei &middot; Yaound&eacute;, Cameroon &middot; Faith &middot; Leadership &middot; Legacy
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
