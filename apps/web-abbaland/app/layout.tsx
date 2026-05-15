import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: 'Abba Land Place by DRIMP — Real Estate Cameroon', template: '%s | Abba Land Place' },
  description: 'Premium real estate development in Cameroon by DRIMP Foundation. Abba Land Place — quality land and property for families and investors.',
  metadataBase: new URL('https://www.abbalandplace.com'),
  openGraph: { title: 'Abba Land Place by DRIMP — Real Estate Cameroon', description: 'Premium real estate development in Cameroon.', siteName: 'Abba Land Place', locale: 'en_US', type: 'website' },
  twitter: { card: 'summary', title: 'Abba Land Place', description: 'Premium real estate in Cameroon.' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        fontFamily: "'DM Sans', sans-serif",
        background: "#110d07",
      }}>
        {children}
      </body>
    </html>
  );
}
