import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abba Land Place — A Premium Hospitality Destination",
  description: "Abba Land Place is a premium hospitality destination currently in preparation — where African excellence meets world-class refinement.",
  metadataBase: new URL("https://abbalandplace.com"),
  openGraph: {
    title: "Abba Land Place — A Premium Hospitality Destination",
    description: "Abba Land Place is a premium hospitality destination currently in preparation — where African excellence meets world-class refinement.",
    url: "https://abbalandplace.com",
    siteName: "Abba Land Place",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Abba Land Place — A Premium Hospitality Destination",
    description: "Abba Land Place is a premium hospitality destination currently in preparation — where African excellence meets world-class refinement.",
  },
  alternates: {
    canonical: "https://abbalandplace.com",
  },
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
