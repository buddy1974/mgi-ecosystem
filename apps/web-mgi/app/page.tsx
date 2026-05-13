import Image from "next/image";
import Link from "next/link";

/* ─── BRAND DATA ─────────────────────────────────────── */

const expertise = [
  { label: "Corporate Governance",        icon: "◈" },
  { label: "Legal & Fiscal Advisory",     icon: "◉" },
  { label: "Accounting Services",         icon: "◆" },
  { label: "ERP & CRM Integration",       icon: "◐" },
  { label: "AI & Workflow Automation",    icon: "◑" },
  { label: "Digital Transformation",      icon: "◒" },
  { label: "Human Resources",             icon: "◓" },
  { label: "Project Engineering",         icon: "◔" },
  { label: "Marketing & Business Growth", icon: "◕" },
];

const stats = [
  { value: "2019", label: "Founded"           },
  { value: "6",    label: "Venture Companies" },
  { value: "5",    label: "Industry Sectors"  },
  { value: "9",    label: "Service Domains"   },
];

const ventures = [
  {
    name:      "Rogers Nforgwei Platform",
    domain:    "rogersnforgwei.com",
    logo:      "/logos/mgi-main.png",
    color:     "#3a0ca3",
    accent:    "#f72585",
    tag:       "Executive Development",
    tagline:   "Switch on the better side of the future.",
    programs:  ["Dominion Life Men's Conference", "Men On Duty", "CEO On Mission"],
    comingSoon: false,
  },
  {
    name:      "Horeb Solutions",
    domain:    "horebsolutions.org",
    logo:      "/logos/horeb-solutions.png",
    color:     "#0a8348",
    accent:    "#fdda2b",
    tag:       "Logistics",
    tagline:   "Reliability in motion. Your logistics, our priority.",
    programs:  [],
    comingSoon: false,
  },
  {
    name:      "NMI Education",
    domain:    "nmieducation.com",
    logo:      "/logos/nmi-main.png",
    color:     "#1a56db",
    accent:    "#60a5fa",
    tag:       "Education",
    tagline:   "Empowering minds. Building futures.",
    programs:  [],
    comingSoon: false,
  },
  {
    name:      "Librairie du Quartier",
    domain:    "librairieduquartier.org",
    logo:      "/logos/librairie-du-quartier.png",
    color:     "#393186",
    accent:    "#EF7F1B",
    tag:       "Community & Culture",
    tagline:   "Your neighborhood. Your knowledge.",
    programs:  [],
    comingSoon: false,
  },
  {
    name:      "DROS Construction",
    domain:    "drosconstruction.com",
    logo:      "/logos/dros-construction.png",
    color:     "#1c3a2e",
    accent:    "#a3855a",
    tag:       "Construction & Development",
    tagline:   "Building structures that stand the test of time.",
    programs:  [],
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

/* ─── PAGE ───────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070a08] text-[#f4f7f5] overflow-x-hidden">

      {/* ══ NAV ══════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#070a08]/90 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "#0d110e", border: "1px solid rgba(13,110,54,0.4)" }}
            >
              <Image
                src="/logos/mgi-main.png"
                alt="MGI"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-tight leading-none">
                Mina-Galeed Invest
              </p>
              <p className="text-[10px] text-white/30 tracking-[0.2em] uppercase leading-none mt-0.5">
                MGI Ltd · Est. 2019
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-white/40">
            <span className="hover:text-white/70 cursor-pointer transition-colors">About</span>
            <span className="hover:text-white/70 cursor-pointer transition-colors">Expertise</span>
            <span className="hover:text-white/70 cursor-pointer transition-colors">Ventures</span>
            <Link
              href="https://os.mgi-ventures.com"
              className="px-4 py-2 rounded-lg text-white/80 hover:text-white font-medium border transition-colors"
              style={{ borderColor: "rgba(13,110,54,0.5)", background: "rgba(13,110,54,0.15)" }}
            >
              Executive OS
            </Link>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className="relative pt-32 pb-24 px-8 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full pointer-events-none opacity-[0.07] blur-[140px]"
          style={{ background: "#0d6e36" }}
        />

        <div className="relative max-w-5xl mx-auto text-center">

          {/* Large hero logo */}
          <div
            className="w-40 h-40 md:w-52 md:h-52 rounded-3xl mx-auto mb-10 flex items-center justify-center"
            style={{
              background: "#0d110e",
              border: "1px solid rgba(13,110,54,0.35)",
              boxShadow: "0 0 60px rgba(13,110,54,0.12), 0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            <Image
              src="/logos/mgi-main.png"
              alt="Mina-Galeed Invest"
              width={120}
              height={120}
              className="object-contain"
              priority
            />
          </div>

          <p
            className="text-xs font-semibold tracking-[0.35em] uppercase mb-6"
            style={{ color: "#16a34a" }}
          >
            Mina-Galeed Invest (MGI) Ltd
          </p>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.0] mb-6 text-white">
            Start well.{" "}
            <span style={{ color: "#4ade80" }}>Grow well.</span>
          </h1>

          <p className="text-lg text-white/45 max-w-2xl mx-auto leading-relaxed mb-4">
            A holding company accompanying enterprises through their full development cycle —
            from legal structuring and governance to digital transformation and intelligent systems.
          </p>
          <p
            className="text-sm tracking-widest uppercase mb-16"
            style={{ color: "#7a8f84" }}
          >
            Rogers Nforgwei · Founder & CEO · Yaoundé, Cameroon
          </p>

          {/* Enterprise activity pillars */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {expertise.map((e) => (
              <div
                key={e.label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left"
                style={{
                  background: "#0d110e",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <span className="text-sm flex-shrink-0" style={{ color: "#16a34a" }}>
                  {e.icon}
                </span>
                <p className="text-xs text-white/55 leading-tight font-medium">{e.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ AT A GLANCE ════════════════════════════════════ */}
      <section
        className="border-y py-16 px-8"
        style={{ borderColor: "rgba(255,255,255,0.05)", background: "#0d110e" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p
                  className="text-4xl md:text-5xl font-black mb-2"
                  style={{ color: "#4ade80" }}
                >
                  {s.value}
                </p>
                <p className="text-sm text-white/40 tracking-widest uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CORE EXPERTISE ═════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="mb-14">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3 font-semibold"
            style={{ color: "#16a34a" }}
          >
            Core Expertise
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Enterprise Transformation Services
          </h2>
          <p className="text-white/40 mt-3 max-w-xl leading-relaxed">
            MGI accompanies businesses across their full development cycles through
            nine integrated service domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {expertise.map((e) => (
            <div
              key={e.label}
              className="px-6 py-5 rounded-2xl flex items-start gap-4 group hover:border-[#0d6e36]/50 transition-colors duration-300"
              style={{
                background: "#0d110e",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                style={{ background: "rgba(13,110,54,0.2)", color: "#4ade80" }}
              >
                {e.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-white/80">{e.label}</p>
                <div
                  className="mt-2 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: "#16a34a" }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ ECOSYSTEM ARCHITECTURE ═════════════════════════ */}
      <section
        className="py-24 px-8"
        style={{ background: "#0a0d0b", borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3 font-semibold"
              style={{ color: "#16a34a" }}
            >
              Ecosystem Architecture
            </p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Our Ventures
              </h2>
              <p className="text-sm text-white/25">6 companies · 5 sectors</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ventures.map((v) => (
              <a
                key={v.domain}
                href={v.comingSoon ? "#" : `https://${v.domain}`}
                target={v.comingSoon ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "#0d110e",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Entity color top bar */}
                <div
                  className="h-[2px] w-full flex-shrink-0"
                  style={{ background: `linear-gradient(90deg, ${v.color}, ${v.accent})` }}
                />

                {/* Hover tint */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${v.color}18, transparent 60%)` }}
                />

                <div className="p-6 flex flex-col flex-1 relative">
                  {v.comingSoon && (
                    <span
                      className="absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      Coming soon
                    </span>
                  )}

                  {/* Logo */}
                  <div
                    className="w-20 h-20 rounded-xl mb-5 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(145deg, ${v.color}22, ${v.accent}14)`,
                      border: `1px solid ${v.color}35`,
                    }}
                  >
                    <Image
                      src={v.logo}
                      alt={v.name}
                      width={52}
                      height={52}
                      className="object-contain"
                      style={{ filter: `drop-shadow(0 0 8px ${v.color}55)` }}
                    />
                  </div>

                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
                    style={{ color: v.accent }}
                  >
                    {v.tag}
                  </p>

                  <h3 className="text-lg font-black text-white leading-tight mb-2 tracking-tight">
                    {v.name}
                  </h3>

                  <p className="text-xs text-white/35 italic leading-relaxed mb-2">
                    &ldquo;{v.tagline}&rdquo;
                  </p>

                  <p className="text-[11px] text-white/20 mb-4">{v.domain}</p>

                  {v.programs.length > 0 && (
                    <div
                      className="mt-auto pt-4 space-y-1.5"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      {v.programs.map((p) => (
                        <div key={p} className="flex items-center gap-2">
                          <span
                            className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: v.accent }}
                          />
                          <p className="text-xs text-white/35">{p}</p>
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

      {/* ══ ENTERPRISE SYSTEMS LAYER ═══════════════════════ */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="mb-14">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3 font-semibold"
            style={{ color: "#16a34a" }}
          >
            Enterprise Systems
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Intelligent Infrastructure
          </h2>
          <p className="text-white/40 mt-3 max-w-xl leading-relaxed">
            MGI operates a centralized technology and governance layer enabling
            real-time oversight, AI-driven automation, and operational intelligence
            across the full ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {systems.map((s) => (
            <div
              key={s.title}
              className="px-7 py-6 rounded-2xl"
              style={{
                background: "#0d110e",
                border: "1px solid rgba(13,110,54,0.2)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-xl"
                style={{ background: "rgba(13,110,54,0.25)", color: "#4ade80" }}
              >
                {s.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Executive OS CTA */}
        <div
          className="mt-8 px-8 py-7 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: "linear-gradient(135deg, rgba(13,110,54,0.15), rgba(13,110,54,0.08))",
            border: "1px solid rgba(13,110,54,0.3)",
          }}
        >
          <div>
            <h3 className="text-lg font-bold text-white mb-1">MGI Executive OS</h3>
            <p className="text-sm text-white/45">
              The centralized command center for ecosystem management, approvals, communications, and strategic oversight.
            </p>
          </div>
          <Link
            href="https://os.mgi-ventures.com"
            className="flex-shrink-0 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110"
            style={{ background: "#0d6e36" }}
          >
            Access Executive OS →
          </Link>
        </div>
      </section>

      {/* ══ POSITIONING STRIP ══════════════════════════════ */}
      <section
        className="py-20 px-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "#0d110e" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-4xl font-bold text-white/55 leading-relaxed">
            &ldquo;At the heart of business performance.&rdquo;
          </p>
          <p
            className="text-sm mt-4 tracking-widest uppercase"
            style={{ color: "#3a4a42" }}
          >
            Mina-Galeed Invest (MGI) Ltd · Yaoundé, Cameroon
          </p>
        </div>
      </section>

      {/* ══ FOOTER ═════════════════════════════════════════ */}
      <footer
        className="py-10 px-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(13,110,54,0.2)", border: "1px solid rgba(13,110,54,0.3)" }}
            >
              <Image
                src="/logos/mgi-main.png"
                alt="MGI"
                width={18}
                height={18}
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-white/50">Mina-Galeed Invest (MGI) Ltd</p>
              <p className="text-xs text-white/20">© {new Date().getFullYear()} · All rights reserved</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-white/25">
            <span>Yaoundé, Cameroon</span>
            <Link
              href="https://os.mgi-ventures.com"
              className="font-medium transition-colors hover:text-white/50"
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
