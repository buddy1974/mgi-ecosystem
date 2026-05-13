import Link from "next/link";

export const metadata = {
  title: "Expertise — Mina-Galeed Invest (MGI) Ltd",
  description:
    "7 domains of excellence — Legal Assistance, Accounting & Tax, Corporate Governance, Digital Transformation, Digital Marketing, HR Services, Project Engineering.",
};

const domains = [
  {
    number: "01",
    slug: "legal-assistance",
    title: "Legal Assistance",
    color: "#1e40af",
    accent: "#3b82f6",
    intro:
      "MGI provides end-to-end legal support to help businesses start right, structure soundly, and operate in full regulatory compliance.",
    services: [
      { name: "Company Creation & Structuring",       detail: "Accompaniment through the full process of business creation, legal form selection, and corporate structuring." },
      { name: "Contract Analysis, Negotiation & Drafting", detail: "Statutes, commercial and civil contracts, partnership agreements, and general terms and conditions." },
      { name: "Legal Monitoring & Dispute Prevention", detail: "Ongoing legal watch, pre-litigation management, and dispute resolution support." },
      { name: "Legal Secretariat",                    detail: "Organization of general assemblies, notices, minutes, fiscal registration, and management reports." },
      { name: "Permits, Authorizations & Licenses",   detail: "Tracking and management of all administrative procedures for approvals and regulatory licenses." },
    ],
  },
  {
    number: "02",
    slug: "accounting-tax",
    title: "Accounting & Tax Support",
    color: "#065f46",
    accent: "#10b981",
    intro:
      "Rigorous accounting and fiscal systems that keep businesses compliant, financially optimized, and audit-ready.",
    services: [
      { name: "Personalized Accounting Monitoring",  detail: "Full-service bookkeeping and financial tracking tailored to your business structure and sector." },
      { name: "Monthly Tax & CNPS Declarations",     detail: "On-time filing of all monthly tax obligations and social security contributions (CNPS)." },
      { name: "Tax Optimization & Fiscal Culture",   detail: "Strategic advisory to minimize tax exposure while maintaining full legal compliance." },
      { name: "Fiscal Audit Support",                detail: "Expert accompaniment throughout fiscal control procedures to protect your business." },
      { name: "Approved Management Centre (CGA)",    detail: "Access to the benefits of MGI's Approved Management Centre status for eligible businesses." },
      { name: "Business Incubation & Acceleration",  detail: "Financial structure and capacity building for early-stage and growing businesses." },
    ],
  },
  {
    number: "03",
    slug: "corporate-governance",
    title: "Corporate Governance",
    color: "#7c2d12",
    accent: "#ea580c",
    intro:
      "Governance frameworks that secure decision-making, establish clear accountability, and ensure every organization operates with clarity and integrity.",
    services: [
      { name: "General Corporate Policy",            detail: "Design and implementation of organizational policies that align leadership, operations, and strategy." },
      { name: "Power, Roles & Responsibility Frameworks", detail: "Delimitation of authority and decision-making processes across all levels of the organization." },
      { name: "Procedures & Internal Regulations",   detail: "Procedure manuals, internal regulations, codes of ethics, and operational frameworks." },
      { name: "Legal & Regulatory Compliance",       detail: "Ongoing compliance monitoring to ensure alignment with applicable laws and industry regulations." },
      { name: "Situational Analysis",                detail: "In-depth diagnostic of the governance state to identify gaps and priority improvements." },
    ],
  },
  {
    number: "04",
    slug: "digital-transformation",
    title: "Digital Transformation",
    color: "#1e3a5f",
    accent: "#0ea5e9",
    intro:
      "Migration to secure, high-performance digital systems — modernizing infrastructure, protecting data, and enhancing user experience across the organization.",
    services: [
      { name: "Custom Application Development",       detail: "Web applications, mobile apps, and SaaS platforms built for your specific operational needs." },
      { name: "ERP & CRM Integration",                detail: "Accounting, commercial, and HR management via Odoo, Salesforce, Microsoft Dynamics, and others." },
      { name: "Process Automation & Workflow Optimization", detail: "Automated workflows and intelligent data management to eliminate manual inefficiencies." },
      { name: "UX/UI & Digital Redesign",             detail: "Websites, digital interfaces, and user experience redesign for modern enterprise standards." },
      { name: "Cybersecurity & Data Protection",      detail: "Security audits, protection strategies, and compliance with data protection regulations." },
      { name: "Cloud Strategy & Secure Hosting",      detail: "Cloud architecture design, migration planning, and managed hosting solutions." },
      { name: "IT Solutions, Maintenance & Networks", detail: "Full IT infrastructure setup, preventive and curative maintenance, and network management." },
    ],
  },
  {
    number: "05",
    slug: "digital-marketing",
    title: "Digital Marketing",
    color: "#581c87",
    accent: "#a855f7",
    intro:
      "High-performance digital tools to amplify your presence, reach the right audience, and grow your brand with measurable results.",
    services: [
      { name: "Digital Strategy & Branding",           detail: "Positioning, brand identity, and comprehensive digital strategy aligned with business objectives." },
      { name: "Social Media Management",               detail: "Community management, content planning, and audience engagement across all major platforms." },
      { name: "SEO & Paid Advertising (SEA)",          detail: "Search engine optimization and paid campaign management to drive qualified traffic." },
      { name: "Email Marketing & Automation",          detail: "Automated email campaigns and nurturing sequences designed to convert and retain clients." },
      { name: "Content Creation & Storytelling",       detail: "Professional content production that communicates your value proposition clearly and memorably." },
      { name: "Web Analytics & Conversion Optimization (CRO)", detail: "Data analysis and conversion rate optimization to maximize the ROI of your digital presence." },
    ],
  },
  {
    number: "06",
    slug: "hr-services",
    title: "HR Services",
    color: "#7f1d1d",
    accent: "#ef4444",
    intro:
      "Personalized HR services covering the full talent lifecycle — from sourcing and selection to payroll, compliance, and workforce optimization.",
    services: [
      { name: "Outsourced Recruitment",               detail: "End-to-end recruitment: candidate search, profile selection, assessment, interview, and placement." },
      { name: "Staff Placement & Secondment (MAD)",   detail: "Placement of qualified personnel and workforce secondment for project-based or ongoing needs." },
      { name: "Interim Services",                     detail: "Rapid deployment of qualified interim staff to cover short-term operational gaps." },
      { name: "Outsourced Payroll Management",        detail: "Full payroll processing, statutory deductions, and compliance with labor regulations." },
      { name: "Social Audit",                         detail: "Assessment of HR practices and working conditions against legal and organizational standards." },
    ],
  },
  {
    number: "07",
    slug: "project-engineering",
    title: "Project Engineering",
    color: "#14532d",
    accent: "#22c55e",
    intro:
      "Expert project structuring, management, and evaluation — ensuring better planning, optimal resource allocation, and risk minimization for every initiative.",
    services: [
      { name: "Project Setup & Structuring",           detail: "Full project design and structuring from concept to execution-ready documentation." },
      { name: "Business Plan Development",             detail: "Professional business plan preparation for financing, partnership, and strategic planning purposes." },
      { name: "Project & Program Monitoring-Evaluation", detail: "Implementation tracking, performance measurement, and corrective action management." },
      { name: "Socioeconomic & Environmental Impact Studies", detail: "Assessment of project impacts on local communities, economy, and natural environment." },
      { name: "Risk & Hazard Studies",                 detail: "Identification, analysis, and mitigation planning for operational and environmental risks." },
      { name: "Administrative Procedure Tracking",     detail: "End-to-end management of all administrative, regulatory, and permitting procedures." },
    ],
  },
];

export default function ExpertisePage() {
  return (
    <main>
      <div className="h-16" />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="py-28 px-8" style={{ background: "linear-gradient(160deg, #0d1f10 0%, #111a0d 40%, #131508 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#4ade80" }}>Our Expertise</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6" style={{ color: "#f4f7f5" }}>
            7 Domains of Excellence
          </h1>
          <p className="text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(244,247,245,0.55)" }}>
            We accompany businesses at every stage of their development — from
            legal structuring at creation to digital transformation at scale.
            Each domain is staffed by highly qualified experts who begin with a
            thorough situational analysis of your specific needs.
          </p>
        </div>
      </section>

      {/* ── HOW WE WORK ──────────────────────────────────── */}
      <section className="py-20 px-8" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Situational Analysis",          body: "We begin every engagement with a thorough analysis of your specific situation — your structure, sector, stage of growth, and operational challenges." },
              { step: "02", title: "Tailored Solution Design",      body: "Based on the analysis, we design a solution that fits your reality — not a template. Every recommendation is specific, actionable, and realistic." },
              { step: "03", title: "End-to-End Delivery & Evaluation", body: "We accompany you from implementation through results evaluation, measuring impact with clear indicators and adjusting as needed." },
            ].map((s) => (
              <div key={s.step} className="flex gap-5">
                <span className="text-4xl font-black flex-shrink-0 leading-none" style={{ color: "#d1fae5" }}>{s.step}</span>
                <div>
                  <h3 className="text-base font-black mb-2" style={{ color: "#111827" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7 DOMAINS ────────────────────────────────────── */}
      <section className="py-24 px-8" style={{ background: "#f0f7f2" }}>
        <div className="max-w-7xl mx-auto space-y-8">
          {domains.map((domain) => (
            <div key={domain.slug} className="rounded-2xl overflow-hidden" style={{ background: "#ffffff", border: "1px solid #e5e7eb" }}>
              <div
                className="px-8 py-6 flex items-center gap-6"
                style={{ background: `linear-gradient(135deg, ${domain.color}12 0%, transparent 100%)`, borderBottom: `3px solid ${domain.accent}` }}
              >
                <span className="text-4xl font-black flex-shrink-0" style={{ color: domain.accent }}>{domain.number}</span>
                <div>
                  <h2 className="text-xl font-black tracking-tight" style={{ color: "#111827" }}>{domain.title}</h2>
                  <p className="text-sm leading-relaxed mt-1 max-w-3xl" style={{ color: "#6B7280" }}>{domain.intro}</p>
                </div>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {domain.services.map((service) => (
                  <div key={service.name} className="rounded-xl p-5" style={{ background: "#f9fafb", border: `1px solid ${domain.accent}22` }}>
                    <div className="flex items-start gap-2 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: domain.accent }} />
                      <h4 className="text-sm font-bold leading-snug" style={{ color: "#111827" }}>{service.name}</h4>
                    </div>
                    <p className="text-xs leading-relaxed pl-3.5" style={{ color: "#6B7280" }}>{service.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24 px-8" style={{ background: "#0d6e36" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-4" style={{ color: "#ffffff" }}>Which domain fits your challenge?</h2>
          <p className="text-base mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            Contact MGI for a free situational analysis. We&apos;ll identify
            exactly which expertise domains apply to your current stage and objectives.
          </p>
          <Link href="/contact" className="inline-block px-10 py-4 rounded-xl text-sm font-bold transition-all hover:opacity-90" style={{ background: "white", color: "#0d6e36" }}>
            Request a Free Analysis →
          </Link>
        </div>
      </section>
    </main>
  );
}
