"use client";

import Image from "next/image";
import Link from "next/link";

/* ─── BRAND DATA ─────────────────────────────────────── */

const expertise = [
  "Corporate Governance",
  "Legal & Fiscal Advisory",
  "Accounting Services",
  "ERP & CRM Integration",
  "AI & Workflow Automation",
  "Digital Transformation",
  "Human Resources",
  "Project Engineering",
  "Marketing & Business Growth",
];

const stats = [
  { value: "2019", label: "Founded"           },
  { value: "6",    label: "Venture Companies" },
  { value: "5",    label: "Industry Sectors"  },
  { value: "9",    label: "Service Domains"   },
];

const ventures = [
  {
    name:     "Rogers Nforgwei Platform",
    domain:   "rogersnforgwei.com",
    logo:     "/logos/mgi-main.png",
    color:    "#3a0ca3",
    accent:   "#f72585",
    tag:      "Executive Development",
    tagline:  "Switch on the better side of the future.",
    programs: ["Dominion Life Men's Conference", "Men On Duty", "CEO On Mission"],
    comingSoon: false,
  },
  {
    name:     "Horeb Solutions",
    domain:   "horebsolutions.org",
    logo:     "/logos/horeb-solutions.png",
    color:    "#0a8348",
    accent:   "#fdda2b",
    tag:      "Logistics",
    tagline:  "Reliability in motion. Your logistics, our priority.",
    programs: [],
    comingSoon: false,
  },
  {
    name:     "NMI Education",
    domain:   "nmieducation.com",
    logo:     "/logos/nmi-main.png",
    color:    "#1a56db",
    accent:   "#60a5fa",
    tag:      "Education",
    tagline:  "Empowering minds. Building futures.",
    programs: [],
    comingSoon: false,
  },
  {
    name:     "Librairie du Quartier",
    domain:   "librairieduquartier.org",
    logo:     "/logos/librairie-du-quartier.png",
    color:    "#393186",
    accent:   "#EF7F1B",
    tag:      "Community & Culture",
    tagline:  "Your neighborhood. Your knowledge.",
    programs: [],
    comingSoon: false,
  },
  {
    name:     "DROS Construction",
    domain:   "drosconstruction.com",
    logo:     "/logos/dros-construction.png",
    color:    "#1c3a2e",
    accent:   "#a3855a",
    tag:      "Construction & Development",
    tagline:  "Building structures that stand the test of time.",
    programs: [],
    comingSoon: false,
  },
  {
    name:       "Abba Land Place",
    domain:     "abbalandplace.com",
    logo:       "/logos/drimp-foundation.png",
    color:      "#023F78",
    accent:     "#FC9D02",
    tag:        "Real Estate",
    tagline:    "Premium land. Premium living.",
    programs:   [],
    comingSoon: true,
  },
];

const systems = [
  {
    title: "Executive OS",
    desc:  "Centralized command center for real-time operational oversight across all entities.",
    icon:  "⬡",
  },
  {
    title: "AI Automation Layer",
    desc:  "Workflow orchestration, intelligent approval routing, and AI-powered briefings.",
    icon:  "⬡",
  },
  {
    title: "ERP & CRM Infrastructure",
    desc:  "Integrated enterprise resource planning and customer relationship systems.",
    icon:  "⬡",
  },
  {
    title: "Governance & Compliance",
    desc:  "Structured approval flows, audit trails, and enterprise governance protocols.",
    icon:  "⬡",
  },
];

/* ─── ANIMATED TICKER COMPONENT ─────────────────────── */

function ActivityTicker() {
  const items = [...expertise, ...expertise];

  return (
    <div
      className="relative w-full overflow-hidden mt-12"
      style={{ maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)" }}
    >
      <div className="flex gap-4 animate-ticker" style={{ width: "max-content" }}>
        {items.map((label, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#22c55e" }} />
            <span className="text-xs font-medium whitespace-nowrap" style={{ color: "rgba(244,247,245,0.65)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: "#f4f7f4" }}>

      {/* ══ NAV — WHITE, INSTITUTIONAL ════════════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{
          background: "rgba(255,255,255,0.95)",
          borderBottom: "1px solid rgba(13,110,54,0.1)",
          boxShadow: "0 1px 20px rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#f0f7f2", border: "1px solid rgba(13,110,54,0.2)" }}
            >
              <Image src="/logos/mgi-main.png" alt="MGI" width={28} height={28} className="object-contain" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight leading-none" style={{ color: "#0c1a10" }}>
                Mina-Galeed Invest
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase leading-none mt-0.5" style={{ color: "#5a7a65" }}>
                MGI Ltd · Est. 2019
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["About", "Expertise", "Ventures"].map(item => (
              <span key={item} className="text-sm cursor-pointer transition-colors hover:text-[#0d6e36]" style={{ color: "#5a7a65" }}>
                {item}
              </span>
            ))}
            <Link
              href="https://os.mgi-ventures.com"
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110"
              style={{ background: "#0d6e36" }}
            >
              Executive OS
            </Link>
          </div>
        </div>
      </nav>

      {/* ══ HERO — WARM, EXPANSIVE, SUNLIT ════════════════ */}
      <section
        className="relative pt-40 pb-36 px-8 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0d1f10 0%, #111a0d 40%, #131508 100%)",
        }}
      >
        {/* Warm sunrise atmospheric glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "900px",
            height: "600px",
            background: "radial-gradient(ellipse at 50% 30%, rgba(34,197,94,0.14) 0%, rgba(250,204,21,0.04) 35%, transparent 65%)",
          }}
        />
        {/* Warm horizon warmth at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(22,163,74,0.08), rgba(250,204,21,0.03) 50%, transparent)",
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center">

          {/* Large logo — 150px in 184px container */}
          <div
            className="mx-auto mb-10 flex items-center justify-center"
            style={{
              width: "184px",
              height: "184px",
              borderRadius: "28px",
              background: "rgba(22,163,74,0.1)",
              border: "1px solid rgba(34,197,94,0.25)",
              boxShadow: "0 0 100px rgba(34,197,94,0.12), 0 0 40px rgba(250,204,21,0.06), 0 30px 80px rgba(0,0,0,0.4)",
            }}
          >
            <Image
              src="/logos/mgi-main.png"
              alt="Mina-Galeed Invest"
              width={150}
              height={150}
              className="object-contain"
              priority
            />
          </div>

          <p className="text-xs font-bold tracking-[0.35em] uppercase mb-5" style={{ color: "#22c55e" }}>
            Mina-Galeed Invest (MGI) Ltd
          </p>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.0] mb-6" style={{ color: "#f4f7f5" }}>
            Start well.{" "}
            <span style={{ color: "#4ade80" }}>Grow well.</span>
          </h1>

          <p className="text-lg max-w-2xl mx-auto leading-relaxed mb-4" style={{ color: "rgba(244,247,245,0.5)" }}>
            A holding company accompanying enterprises through their full development cycle —
            from legal structuring and governance to digital transformation and intelligent systems.
          </p>
          <p className="text-sm tracking-widest uppercase mb-0" style={{ color: "rgba(244,247,245,0.22)" }}>
            Rogers Nforgwei · Founder & CEO · Yaoundé, Cameroon
          </p>

          <ActivityTicker />
        </div>
      </section>

      {/* ══ AT A GLANCE — WHITE ═══════════════════════════ */}
      <section className="py-20 px-8" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-12 text-center" style={{ color: "#0d6e36" }}>
            MGI At A Glance
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center py-8 rounded-2xl" style={{ background: "#f0f7f2" }}>
                <p className="text-5xl md:text-6xl font-black mb-2" style={{ color: "#0d6e36" }}>{s.value}</p>
                <p className="text-xs tracking-widest uppercase font-semibold" style={{ color: "#5a7a65" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CORE EXPERTISE — LIGHT ════════════════════════ */}
      <section className="py-24 px-8" style={{ background: "#f0f7f2" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#16a34a" }}>Core Expertise</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3" style={{ color: "#0c1a10" }}>
              Enterprise Transformation Services
            </h2>
            <p className="max-w-xl leading-relaxed" style={{ color: "#5a7a65" }}>
              MGI accompanies businesses across their full development cycles through nine integrated service domains.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {expertise.map((label) => (
              <div
                key={label}
                className="px-6 py-5 rounded-2xl flex items-start gap-4 group transition-all duration-300 hover:shadow-md"
                style={{ background: "#ffffff", border: "1px solid rgba(13,110,54,0.1)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-base font-bold"
                  style={{ background: "#e8f5eb", color: "#0d6e36" }}
                >
                  ◈
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "#0c1a10" }}>{label}</p>
                  <div className="mt-2 h-px w-0 group-hover:w-full transition-all duration-500" style={{ background: "#16a34a" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ECOSYSTEM — DARK, PREMIUM ═════════════════════ */}
      <section className="py-24 px-8" style={{ background: "#0c1015" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#22c55e" }}>
              Ecosystem Architecture
            </p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: "#f4f7f5" }}>Our Ventures</h2>
              <p className="text-sm" style={{ color: "#3a4a42" }}>6 companies · 5 sectors</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ventures.map((v) => (
              <a
                key={v.domain}
                href={v.comingSoon ? "#" : `https://${v.domain}`}
                target={v.comingSoon ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1.5"
                style={{
                  background: `linear-gradient(145deg, ${v.color}35 0%, #1a2028 100%)`,
                  border: `1px solid ${v.color}50`,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% -10%, ${v.color}28 0%, transparent 65%)` }}
                />
                <div className="h-[3px] w-full flex-shrink-0" style={{ background: `linear-gradient(90deg, ${v.color}, ${v.accent})` }} />
                <div className="flex flex-col flex-1 p-6 relative">
                  {v.comingSoon && (
                    <span
                      className="absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      Coming soon
                    </span>
                  )}
                  <div
                    className="w-20 h-20 rounded-xl mb-5 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(145deg, ${v.color}22, ${v.accent}14)`,
                      border: `1px solid ${v.color}35`,
                      boxShadow: `0 4px 20px ${v.color}18`,
                    }}
                  >
                    <Image src={v.logo} alt={v.name} width={52} height={52} className="object-contain"
                      style={{ filter: `drop-shadow(0 0 8px ${v.color}55)` }} />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: v.accent }}>{v.tag}</p>
                  <h3 className="text-lg font-black leading-tight mb-2 tracking-tight" style={{ color: "#f4f7f5" }}>{v.name}</h3>
                  <p className="text-xs italic leading-relaxed mb-2" style={{ color: "rgba(244,247,245,0.38)" }}>
                    &ldquo;{v.tagline}&rdquo;
                  </p>
                  <p className="text-[11px] mb-4" style={{ color: "rgba(244,247,245,0.2)" }}>{v.domain}</p>
                  {v.programs.length > 0 && (
                    <div className="mt-auto pt-4 space-y-1.5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      {v.programs.map((p) => (
                        <div key={p} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: v.accent }} />
                          <p className="text-xs" style={{ color: "rgba(244,247,245,0.38)" }}>{p}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ENTERPRISE SYSTEMS — DARK ═════════════════════ */}
      <section className="py-24 px-8" style={{ background: "#0f1a12" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#22c55e" }}>Enterprise Systems</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3" style={{ color: "#f4f7f5" }}>Intelligent Infrastructure</h2>
            <p className="max-w-xl leading-relaxed" style={{ color: "rgba(244,247,245,0.45)" }}>
              MGI operates a centralized technology and governance layer enabling real-time oversight,
              AI-driven automation, and operational intelligence across the full ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {systems.map((s) => (
              <div key={s.title} className="px-7 py-6 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(34,197,94,0.15)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-xl"
                  style={{ background: "rgba(13,110,54,0.3)", color: "#4ade80" }}>{s.icon}</div>
                <h3 className="text-base font-bold mb-2" style={{ color: "#f4f7f5" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(244,247,245,0.4)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div
            className="px-8 py-7 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: "rgba(13,110,54,0.2)", border: "1px solid rgba(34,197,94,0.25)" }}
          >
            <div>
              <h3 className="text-lg font-bold mb-1" style={{ color: "#f4f7f5" }}>MGI Executive OS</h3>
              <p className="text-sm" style={{ color: "rgba(244,247,245,0.5)" }}>
                The centralized command center for ecosystem management, approvals, communications, and strategic oversight.
              </p>
            </div>
            <Link
              href="https://os.mgi-ventures.com"
              className="flex-shrink-0 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110"
              style={{ background: "#16a34a" }}
            >
              Access Executive OS →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ POSITIONING STRIP — WARM LIGHT ════════════════ */}
      <section className="py-20 px-8" style={{ background: "#e8f5eb" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-4xl font-bold leading-relaxed" style={{ color: "#0d6e36" }}>
            &ldquo;At the heart of business performance.&rdquo;
          </p>
          <p className="text-sm mt-4 tracking-widest uppercase" style={{ color: "#5a7a65" }}>
            Mina-Galeed Invest (MGI) Ltd · Yaoundé, Cameroon
          </p>
        </div>
      </section>

      {/* ══ FOOTER ═════════════════════════════════════════ */}
      <footer className="py-10 px-8" style={{ background: "#0c1710", borderTop: "1px solid rgba(34,197,94,0.1)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(13,110,54,0.25)", border: "1px solid rgba(13,110,54,0.4)" }}
            >
              <Image src="/logos/mgi-main.png" alt="MGI" width={18} height={18} className="object-contain" />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "rgba(244,247,245,0.5)" }}>Mina-Galeed Invest (MGI) Ltd</p>
              <p className="text-xs" style={{ color: "rgba(244,247,245,0.2)" }}>© {new Date().getFullYear()} · All rights reserved</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs" style={{ color: "rgba(244,247,245,0.25)" }}>
            <span>Yaoundé, Cameroon</span>
            <Link
              href="https://os.mgi-ventures.com"
              className="font-medium transition-colors"
              style={{ color: "rgba(74,222,128,0.5)" }}
            >
              Executive OS →
            </Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
