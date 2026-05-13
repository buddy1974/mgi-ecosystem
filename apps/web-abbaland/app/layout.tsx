import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abba Land Place — Something Exceptional Is Coming",
  description:
    "Abba Land Place — a premium hospitality destination. Something exceptional is coming. An MGI Ventures enterprise.",
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
