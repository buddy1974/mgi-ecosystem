import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drimp Foundation — Transforming Communities. Restoring Dignity.",
  description:
    "Drimp Foundation is a humanitarian NGO dedicated to community transformation, social impact, and restoring dignity to vulnerable families across Africa. An MGI Ventures enterprise.",
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
