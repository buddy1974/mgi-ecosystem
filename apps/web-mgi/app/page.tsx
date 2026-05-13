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
  { title: "Executive OS",           desc: "Centralized command center for real-time operational oversight across all entities.",           icon: "⬡" },
  { title: "AI Automation Layer",    desc: "Workflow orchestration, intelligent approval routing, and AI-powered briefings.",               icon: "⬡" },
  { title: "ERP & CRM Infrastructure", desc: "Integrated enterprise resource planning and customer relationship systems.",                  icon: "⬡" },
  { title: "Governance & Compliance", desc: "Structured approval flows, audit trails, and enterprise governance protocols.",               icon: "⬡" },
];

const expertiseDomains = [
  {
    number: "01", title: "Legal Assistance", color: "#1e40af", accent: "#3b82f6",
    intro: "Due diligence and legal monitoring to minimize risks and support informed strategic decisions.",
    services: ["Company creation & structuring", "Contract analysis, negotiation & drafting", "Legal secretariat & corporate governance", "Regulatory compliance & licensing"],
  },
  {
    number: "02", title: "Accounting & Tax Support", color: "#065f46", accent: "#10b981",
    intro: "Accounting, tax and social systems at the core of business success — compliant, reliable and optimized.",
    services: ["Personalized accounting monitoring", "Monthly tax & CNPS declarations", "Tax optimization & fiscal culture", "Approved Management Centre (CGA)"],
  },
  {
    number: "03", title: "Corporate Governance", color: "#7c2d12", accent: "#ea580c",
    intro: "Governance structures that secure decision-making processes, ensure transparency and guarantee organizational continuity.",
    services: ["General corporate policy", "Power, roles & responsibility frameworks", "Procedures, internal regulations & ethics codes", "Legal and regulatory compliance"],
  },
  {
    number: "04", title: "Digital Transformation", color: "#1e3a5f", accent: "#0ea5e9",
    intro: "Facilitating migration to secure digital systems — modernize infrastructure, protect data, enhance client experience.",
    services: ["Custom application development (web, mobile, SaaS)", "ERP & CRM integration (Odoo, Salesforce, Dynamics)", "Process automation & workflow optimization", "Cybersecurity & cloud strategy"],
  },
  {
    number: "05", title: "Digital Marketing", color: "#581c87", accent: "#a855f7",
    intro: "Building high-performance digital tools to amplify your presence, reach your target audience, and break boundaries.",
    services: ["Digital strategy & branding", "Social media management (Community Management)", "SEO & paid advertising (SEA)", "Content creation, email marketing & analytics"],
  },
  {
    number: "06", title: "HR Services", color: "#7f1d1d", accent: "#ef4444",
    intro: "Personalized HR services — candidate sourcing and screening, payroll automation, and labor law compliance.",
    services: ["Outsourced recruitment", "Staff placement & secondment (MAD)", "Outsourced payroll management", "Social audit & interim services"],
  },
  {
    number: "07", title: "Project Engineering", color: "#14532d", accent: "#22c55e",
    intro: "Expert project management and engineering — better planning, optimal use of resources, risk minimization.",
    services: ["Project setup & business plan development", "Project & program monitoring-evaluation", "Socioeconomic & environmental impact studies", "Administrative procedure tracking"],
  },
];

/* ─── ANIMATED TICKER ────────────────────────────────── */

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
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#22c55e" }} />
            <span className="text-xs font-medium whitespace-nowrap" style={{ color: "rgba(244,247,245,0.65)" }}>{label}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-ticker { animation: ticker 30s linear infinite; }
        .animate-ticker:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: "#f4f7f4" }}>

      {/* ══ NAV ══════════════════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{ background: "rgba(255,255,255,0.95)", borderBottom: "1px solid rgba(13,110,54,0.1)", boxShadow: "0 1px 20px rgba(0,0,0,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#f0f7f2", border: "1px solid rgba(13,110,54,0.2)" }}>
              <Image src="/logos/mgi-main.png" alt="MGI" width={28} height={28} className="object-contain" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight leading-none" style={{ color: "#0c1a10" }}>Mina-Galeed Invest</p>
              <p className="text-[10px] tracking-[0.2em] uppercase leading-none mt-0.5" style={{ color: "#5a7a65" }}>MGI Ltd · Est. 2019</p>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about"    className="text-sm transition-colors hover:text-[#0d6e36]" style={{ color: "#5a7a65" }}>About</Link>
            <Link href="/#expertise" className="text-sm transition-colors hover:text-[#0d6e36]" style={{ color: "#5a7a65" }}>Expertise</Link>
            <Link href="/#ventures"  className="text-sm transition-colors hover:text-[#0d6e36]" style={{ color: "#5a7a65" }}>Our Ventures</Link>
            <Link href="/#contact"   className="text-sm transition-colors hover:text-[#0d6e36]" style={{ color: "#5a7a65" }}>Contact</Link>
            <Link href="https://os.mgi-ventures.com" className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110" style={{ background: "#0d6e36" }}>
              Executive OS
            </Link>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section
        className="relative pt-40 pb-36 px-8 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0d1f10 0%, #111a0d 40%, #131508 100%)" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: "900px", height: "600px", background: "radial-gradient(ellipse at 50% 30%, rgba(34,197,94,0.14) 0%, rgba(250,204,21,0.04) 35%, transparent 65%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(22,163,74,0.08), rgba(250,204,21,0.03) 50%, transparent)" }} />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="mx-auto mb-10 flex items-center justify-center" style={{ width: "184px", height: "184px", borderRadius: "28px", background: "rgba(22,163,74,0.1)", border: "1px solid rgba(34,197,94,0.25)", boxShadow: "0 0 100px rgba(34,197,94,0.12), 0 0 40px rgba(250,204,21,0.06), 0 30px 80px rgba(0,0,0,0.4)" }}>
            <Image src="/logos/mgi-main.png" alt="Mina-Galeed Invest" width={150} height={150} className="object-contain" priority />
          </div>

          <p className="text-xs font-bold tracking-[0.35em] uppercase mb-3" style={{ color: "#22c55e" }}>
            Mina-Galeed Invest (MGI) Ltd
          </p>
          {/* Official tagline from brochure */}
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-5" style={{ color: "#4ade80" }}>
            At the Heart of SME Performance
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

      {/* ══ WHO WE ARE — REAL MGI CONTENT ════════════════════ */}
      <section id="about-preview" className="py-24 px-8" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#0d6e36" }}>Who We Are</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6" style={{ color: "#111827" }}>
                Mina-Galeed Invest (MGI) Ltd
              </h2>
              <p className="text-lg leading-relaxed mb-4" style={{ color: "#374151" }}>
                A holding company that accompanies businesses through their development cycles.
                Since 2019, MGI has been providing expert advisory, operational support, and
                technology solutions to SMEs across Cameroon and Central Africa.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#6B7280" }}>
                We deploy highly qualified experts across 7 domains of excellence — from legal
                structuring to digital transformation — ensuring every client receives
                end-to-end support tailored to their specific growth stage.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Since 2019", "Yaoundé, Cameroun", "7 Expertise Domains", "6 Ventures"].map((item) => (
                  <span key={item} className="text-xs font-semibold px-4 py-2 rounded-full" style={{ background: "#f0fdf4", color: "#0d6e36", border: "1px solid #bbf7d0" }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#0d6e36" }}>Our Values</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "Integrity",       icon: "⚖️" },
                    { value: "Excellence",      icon: "★"  },
                    { value: "Confidentiality", icon: "🔒" },
                    { value: "Innovation",      icon: "◈"  },
                  ].map((v) => (
                    <div key={v.value} className="px-4 py-3 rounded-xl flex items-center gap-3" style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}>
                      <span className="text-lg">{v.icon}</span>
                      <span className="text-sm font-semibold" style={{ color: "#111827" }}>{v.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#0d6e36" }}>5 Reasons to Choose MGI</p>
                <div className="space-y-2">
                  {["A tailored approach", "Cutting-edge technologies", "End-to-end support", "Measurable impact", "Results-driven evaluation"].map((reason, i) => (
                    <div key={reason} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0" style={{ background: "#0d6e36", color: "white" }}>
                        {i + 1}
                      </span>
                      <p className="text-sm" style={{ color: "#374151" }}>{reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ EXPERTISE — 7 DOMAINS ════════════════════════════ */}
      <section id="expertise" className="py-24 px-8" style={{ background: "#f0f7f2" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#0d6e36" }}>Our Expertise</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4" style={{ color: "#111827" }}>7 Domains of Excellence</h2>
            <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "#6B7280" }}>
              We accompany businesses at every stage of their development — from legal structuring to
              digital transformation — with highly qualified experts in each domain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseDomains.map((domain) => (
              <div key={domain.number} className="rounded-2xl p-7 flex flex-col" style={{ background: "#ffffff", border: "1px solid #e5e7eb", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl font-black" style={{ color: "#f3f4f6" }}>{domain.number}</span>
                  <span className="w-2 h-8 rounded-full" style={{ background: domain.accent }} />
                </div>
                <h3 className="text-base font-black mb-2 tracking-tight" style={{ color: "#111827" }}>{domain.title}</h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "#6B7280" }}>{domain.intro}</p>
                <ul className="space-y-1.5 mt-auto">
                  {domain.services.map((s) => (
                    <li key={s} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: domain.accent }} />
                      <span className="text-xs" style={{ color: "#374151" }}>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* CTA card */}
            <div className="rounded-2xl p-7 flex flex-col justify-center items-center text-center" style={{ background: "#0d6e36", border: "1px solid #0a5a2d" }}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#4ade80" }}>Your business</p>
              <h3 className="text-lg font-black mb-3" style={{ color: "#ffffff" }}>Ready to grow?</h3>
              <p className="text-xs leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
                We start with a situational analysis to identify your specific needs.
              </p>
              <a href="#contact" className="px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90" style={{ background: "white", color: "#0d6e36" }}>
                Contact Us →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ECOSYSTEM — DARK, PREMIUM ════════════════════════ */}
      <section id="ventures" className="py-24 px-8" style={{ background: "#0c1015" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: "#22c55e" }}>Ecosystem Architecture</p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: "#f4f7f5" }}>Our Ventures</h2>
              <p className="text-sm" style={{ color: "#3a4a42" }}>6 companies · 5 sectors</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ventures.map((v) => {
              const sharedClassName = "group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1.5";
              const sharedStyle = {
                background: `linear-gradient(145deg, ${v.color}35 0%, #1a2028 100%)`,
                border: `1px solid ${v.color}50`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
              };
              const cardContent = (
                <>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% -10%, ${v.color}28 0%, transparent 65%)` }} />
                  <div className="h-[3px] w-full flex-shrink-0" style={{ background: `linear-gradient(90deg, ${v.color}, ${v.accent})` }} />
                  <div className="flex flex-col flex-1 p-6 relative">
                    {v.comingSoon && (
                      <span className="absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        Coming soon
                      </span>
                    )}
                    <div className="w-20 h-20 rounded-xl mb-5 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105" style={{ background: `linear-gradient(145deg, ${v.color}22, ${v.accent}14)`, border: `1px solid ${v.color}35`, boxShadow: `0 4px 20px ${v.color}18` }}>
                      <Image src={v.logo} alt={v.name} width={52} height={52} className="object-contain" style={{ filter: `drop-shadow(0 0 8px ${v.color}55)` }} />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: v.accent }}>{v.tag}</p>
                    <h3 className="text-lg font-black leading-tight mb-2 tracking-tight" style={{ color: "#f4f7f5" }}>{v.name}</h3>
                    <p className="text-xs italic leading-relaxed mb-2" style={{ color: "rgba(244,247,245,0.38)" }}>&ldquo;{v.tagline}&rdquo;</p>
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
                </>
              );

              if (v.comingSoon) {
                return <div key={v.domain} className={sharedClassName} style={sharedStyle}>{cardContent}</div>;
              }
              return (
                <a key={v.domain} href={`https://${v.domain}`} target="_blank" rel="noopener noreferrer" className={sharedClassName} style={sharedStyle}>
                  {cardContent}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ ENTERPRISE SYSTEMS ═══════════════════════════════ */}
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
              <div key={s.title} className="px-7 py-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(34,197,94,0.15)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-xl" style={{ background: "rgba(13,110,54,0.3)", color: "#4ade80" }}>{s.icon}</div>
                <h3 className="text-base font-bold mb-2" style={{ color: "#f4f7f5" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(244,247,245,0.4)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="px-8 py-7 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: "rgba(13,110,54,0.2)", border: "1px solid rgba(34,197,94,0.25)" }}>
            <div>
              <h3 className="text-lg font-bold mb-1" style={{ color: "#f4f7f5" }}>MGI Executive OS</h3>
              <p className="text-sm" style={{ color: "rgba(244,247,245,0.5)" }}>
                The centralized command center for ecosystem management, approvals, communications, and strategic oversight.
              </p>
            </div>
            <Link href="https://os.mgi-ventures.com" className="flex-shrink-0 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110" style={{ background: "#16a34a" }}>
              Access Executive OS →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ POSITIONING STRIP ════════════════════════════════ */}
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

      {/* ══ FOOTER ═══════════════════════════════════════════ */}
      <footer id="contact" className="py-14 px-8" style={{ background: "#0c1710", borderTop: "1px solid rgba(34,197,94,0.1)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(13,110,54,0.25)", border: "1px solid rgba(13,110,54,0.4)" }}>
                  <Image src="/logos/mgi-main.png" alt="MGI" width={18} height={18} className="object-contain" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "rgba(244,247,245,0.6)" }}>Mina-Galeed Invest (MGI) Ltd</p>
                  <p className="text-xs" style={{ color: "rgba(244,247,245,0.25)" }}>Est. 2019 · Yaoundé, Cameroun</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(244,247,245,0.35)" }}>
                A holding company accompanying businesses through their full development cycles.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#4ade80" }}>Navigation</p>
              <div className="space-y-2">
                {[
                  { label: "About MGI",     href: "/about"      },
                  { label: "Our Expertise", href: "/#expertise" },
                  { label: "Our Ventures",  href: "/#ventures"  },
                  { label: "Executive OS",  href: "https://os.mgi-ventures.com" },
                ].map((l) => (
                  <Link key={l.label} href={l.href} className="block text-xs transition-colors hover:text-white" style={{ color: "rgba(244,247,245,0.4)" }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#4ade80" }}>Contact</p>
              <div className="space-y-2">
                <p className="text-xs" style={{ color: "rgba(244,247,245,0.5)" }}>Biyem-Assi, Yaoundé – Cameroun</p>
                <p className="text-xs" style={{ color: "rgba(244,247,245,0.5)" }}>BP 30374, Yaoundé – Cameroun</p>
                <a href="tel:+237699812513" className="block text-xs hover:text-white transition-colors" style={{ color: "rgba(244,247,245,0.5)" }}>
                  (+237) 699 81 25 13
                </a>
                <a href="mailto:info@mgi-holdings.com" className="block text-xs hover:text-white transition-colors" style={{ color: "rgba(244,247,245,0.5)" }}>
                  info@mgi-holdings.com
                </a>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <p className="text-xs" style={{ color: "rgba(244,247,245,0.2)" }}>© {new Date().getFullYear()} Mina-Galeed Invest (MGI) Ltd · All rights reserved</p>
            <Link href="https://os.mgi-ventures.com" className="text-xs font-medium transition-colors" style={{ color: "rgba(74,222,128,0.5)" }}>
              Executive OS →
            </Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
