import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drimp Foundation — Transforming Communities",
  description: "Drimp Foundation works to restore dignity and transform communities across Africa through food security, education, and sustainable development.",
  metadataBase: new URL("https://drimpfoundation.org"),
  openGraph: {
    title: "Drimp Foundation — Transforming Communities",
    description: "Drimp Foundation works to restore dignity and transform communities across Africa through food security, education, and sustainable development.",
    url: "https://drimpfoundation.org",
    siteName: "Drimp Foundation",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Drimp Foundation — Transforming Communities",
    description: "Drimp Foundation works to restore dignity and transform communities across Africa through food security, education, and sustainable development.",
  },
  alternates: {
    canonical: "https://drimpfoundation.org",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        fontFamily: "'Nunito', 'Century Gothic', Arial, sans-serif",
        background: "#FFFFFF",
        color: "#0f1e33",
      }}>
        {children}
      </body>
    </html>
  );
}
