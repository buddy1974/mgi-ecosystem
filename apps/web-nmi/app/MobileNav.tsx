"use client";
import { useState } from "react";

export default function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const accent = "#4a90d9";
  const links = [
    { label: "About",      href: "#about"        },
    { label: "Programs",   href: "#publishing"   },
    { label: "Admissions", href: "#distribution" },
    { label: "Contact",    href: "#contact"      },
  ];

  return (
    <>
      {/* Hamburger — mobile only */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: "flex", flexDirection: "column", gap: 5, padding: 8, background: "transparent", border: "none", cursor: "pointer" }}
        className="md:hidden"
        aria-label="Toggle menu"
      >
        <span style={{ display: "block", width: 22, height: 2, background: accent, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
        <span style={{ display: "block", width: 22, height: 2, background: accent, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
        <span style={{ display: "block", width: 22, height: 2, background: accent, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
      </button>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "#050d1a", zIndex: 999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}
          className="md:hidden"
        >
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "transparent", border: "none", color: accent, fontSize: 28, cursor: "pointer", lineHeight: 1 }}>✕</button>
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} style={{ color: "rgba(255,255,255,0.85)", fontSize: 28, fontWeight: 600, textDecoration: "none", letterSpacing: "0.05em", fontFamily: "system-ui, sans-serif" }}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
