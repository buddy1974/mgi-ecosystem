# MGI EXECUTIVE OS — ROADMAP
**Version:** 1.0 | **Date:** 2026-06-03 | **Status:** Active — reflects actual repository reality
**Authority:** Marcel + ChatGPT | **Source of truth:** This file + PROJECT_HEADER.md

> This roadmap reflects ACTUAL state as of June 2026. Not theoretical. Not aspirational.
> Every "✅ Complete" has been verified against committed code.

---

## PHASE 0 — FOUNDATION (✅ COMPLETE)
**Goal:** Monorepo scaffolding, shared packages, database schema, auth skeleton, CI pipeline.

- ✅ Turborepo monorepo with pnpm workspace
- ✅ `@mgi/database` — Prisma + Neon + pgvector, full schema (18 models)
- ✅ `@mgi/auth` — NextAuth (beta), Prisma adapter, JWT, RBAC helpers
- ✅ `@mgi/ui` — Shared Sidebar, TopBar, design tokens
- ✅ `@mgi/types` — TypeScript interfaces
- ✅ `@mgi/config` — Shared ESLint, Tailwind preset, tsconfig
- ✅ GitHub Actions CI (type-check → lint → build)
- ✅ All 8 Vercel projects provisioned
- ✅ All 6 entity domains on Cloudflare (Marcel controls)
- ⚠️ `@mgi/ai`, `@mgi/audit`, `@mgi/notifications` — created, empty placeholders

---

## PHASE 1 — EXECUTIVE OS SHELL (✅ COMPLETE)
**Goal:** Full OS shell with auth, navigation, all module UIs built and rendering.

- ✅ Login page (magic link + credentials)
- ✅ Auth guard on all OS routes
- ✅ Sidebar with live badge counts (messages, approvals, bookings, posts, ops)
- ✅ TopBar
- ✅ Dashboard — GreetingHeader, KPI row, AI Briefing Card, VenturesTable, CalendarPreview, ApprovalsPreview
- ✅ Approvals Center — full list, category filter, priority indicators, stats
- ✅ Communications Inbox — source filter, message cards, ActToday, star/archive, stats
- ✅ Operations Bridge — manager submit form, CEO inbox, Telegram round-trip
- ✅ Social Command — post composer, schedule, list, stats, platform coverage
- ✅ Calendar — 14-day strip, event groups, booking requests
- ✅ Venture Dashboards — all 7 ventures configured with colors, social, programs
- ✅ Priority Tracker — UI built (⚠️ currently on mock data — see Phase 3)
- ✅ Settings / User Management — invite flow, accept invite
- ✅ Admin editor route (purpose TBD)
- ✅ NMI read-only bridge (10 KPIs from NMI DB via `NMI_DATABASE_URL`)
- ✅ AI Daily Briefing — Claude Haiku, live DB context, 1-hour cache
- ✅ n8n integration — `triggerN8nWorkflow()` used in approvals + venture-reply
- ✅ Telegram integration — Operations Bridge alerts and CEO replies

**Phase 1 known gap:** Most modules query a real database but the production DB has no live data yet. Priority Tracker uses hardcoded mock data.

---

## PHASE 2 — ROGERS NFORGWEI PLATFORM (✅ COMPLETE — v1)
**Goal:** Full public site for rogersnforgwei.com, CEO personal brand and program showcase.

- ✅ Homepage — hero, programs, about, testimonials, CTA
- ✅ Program pages — Dominion Life Men's Conference, Men On Duty, CEO On Mission
- ✅ Biography + authority positioning
- ✅ PayUnit payment integration (`/api/payunit/` — UNTOUCHABLE)
- ✅ Mobile UX overhaul
- ✅ Full SEO package — metadata, OG, JSON-LD
- ✅ Vapi.ai AI callbot integration
- ✅ Premium visual system (Rogers brand: #3a0ca3, #f72585, Nexa)
- ✅ Deployed to rogersnforgwei.com

**Phase 2 remaining (Rogers Commerce Engine — next priority):**
- ❌ Booking system (/book-a-session) — no Calendly embed yet
- ❌ Events hub (/events) — no event pages
- ❌ Stripe payment — no online payment for sessions/programs
- ❌ FAQ page with AI widget
- ❌ Contact page (filtered — no direct phone)
- ❌ Newsletter + lead capture
- ❌ Testimonials page (standalone)
- ❌ n8n: booking notification + payment confirmation workflows

---

## PHASE 3 — HOREB SOLUTIONS PLATFORM (✅ COMPLETE — v1)
**Goal:** Full French-language public site for horebsolutions.org.

- ✅ 10-section French homepage
- ✅ Real agency data (6 agencies, 10 relay partners, 6 retail zones)
- ✅ Services, vision/mission, national coverage, gallery, B2B CTA
- ✅ Contact section with verified phone/email
- ✅ SEO metadata + JSON-LD + OG image (programmatic)
- ✅ Horeb Solutions logo in navbar and footer
- ✅ Mobile responsive
- ✅ All images committed to git
- ⚠️ DNS pointing to Vercel pending (Marcel action required)

---

## PHASE 4 — MGI CORPORATE WEBSITE (✅ COMPLETE — v1)
**Goal:** Brochure-faithful green corporate site for mgi-ventures.com.

- ✅ 8-section French homepage (Navbar, Hero, About, Values/Atouts, 7 Services, Partners, Contact, Footer)
- ✅ Green corporate identity (#0B9444, #007F3A, #72BF44)
- ✅ Square bullet markers (■) throughout per brochure
- ✅ 7 service blocks with brochure-faithful alternating image/text layout
- ✅ French content — all 7 services with full descriptions and bullet points
- ✅ All images in `public/mgi-images/`
- ✅ Ventures showcase ("Ils nous font confiance") — 7 venture logos
- ✅ `mgi-content.ts` data file — single source of truth
- ⚠️ Domain URLs corrected in Foundation Lock (June 2026)

---

## PHASE 5 — SECURITY HARDENING (🚧 IN PROGRESS)
**Goal:** Close critical security gaps identified in June 2026 audit.

- ✅ N8N_SECRET hardcoded fallback removed — Foundation Lock (June 2026)
- ❌ Rate limiting on public endpoints (venture-report, publish-due)
- ❌ Zod input validation on all API routes
- ❌ Company membership validation on write routes
- ❌ publish-due route authentication
- ❌ Prisma audit middleware (`audit_logs` table never written to)

---

## PHASE 6 — NMI INTEGRATION (🔜 PLANNED — 2027)
**Goal:** Read-only data bridge from NMI OS into MGI Executive OS.
**Constraint:** NMI OS code is NEVER modified. Integration only.

- ✅ `lib/nmi-bridge.ts` — reads 10 KPIs from NMI DB (implemented in Phase 1)
- ❌ NMI website cutover (awaiting Rogers' 2027 restructuring)
- ❌ Full NMI data feed into OS dashboard

---

## PHASE 7 — ENTITY EXPANSION (🔜 PLANNED)
**Goal:** Build remaining entity websites and deepen existing ones.

**Remaining entity sites (not started):**
- ❌ Librairie du Quartier (librairieduquartier.org) — brand: #393186, Helvetica
- ❌ DROS Construction (drosconstruction.com) — no brand files yet, no social presence
- ❌ Abba Land Place (abbalandplace.com) — coming soon placeholder only
- ❌ Drimp Foundation (drimpfoundation.org) — needs dedicated architecture session first

**Content depth for existing sites:**
- ❌ Horeb: expanded services, case studies, inquiry form
- ❌ Rogers Commerce: booking, events, Stripe (overlaps Phase 2 remaining)
- ❌ MGI: AI readiness assessment funnel, discovery call booking, case studies

---

## PHASE 8 — OS OPERATIONAL ACTIVATION (🔜 NEXT PRIORITY AFTER PHASE 5)
**Goal:** Rogers can actually use the OS as a daily operational tool.

**Three mandatory gates (nothing in this phase works without them):**
- ❌ `DATABASE_URL` / `DATABASE_URL_UNPOOLED` confirmed live in Vercel env (executive-os)
- ❌ `ANTHROPIC_API_KEY` set in Vercel (executive-os) — required for AI briefing
- ❌ `os.mgi-ventures.com` DNS → Vercel confirmed live

**Once gates are open:**
- ❌ Priority Tracker → connect to real DB (remove mock data)
- ❌ Inbox ingestion → n8n webhooks per source feed messages
- ❌ Social publishing → n8n cron triggers `publish-due`
- ❌ Calendar event creation UI
- ❌ User management CRUD complete
- ❌ Implement `@mgi/ai` package — model routing
- ❌ Implement `@mgi/audit` — Prisma middleware
- ❌ Implement `@mgi/notifications` — multi-channel service

---

## PHASE 9 — ADVANCED AI & AUTOMATION (🔜 FUTURE)
- ❌ AI Executive Assistant (Claude Sonnet chat in OS)
- ❌ Meeting Brief Generator
- ❌ AI Decision Support
- ❌ Voice Memo Processor (Whisper)
- ❌ AI Content Command Center
- ❌ RAG Document Search (pgvector provisioned, pipeline needed)
- ❌ Social Media Intelligence module
- ❌ AI Brand Monitor

---

## DEPENDENCY MAP

```
Phase 5 (Security) ────── Must close before Rogers Commerce goes live
Phase 8 gate: DB live ──► Priority Tracker real data → Inbox → All OS modules
Phase 8 gate: Auth live ► Rogers can log in to OS
Phase 8 gate: OS DNS ───► Operations Bridge manager links go live

Rogers Commerce ────────► Stripe → n8n booking/payment workflows
Rogers Commerce ────────► Booking page → Events hub → FAQ + AI widget

Phase 6 (NMI) ─────────► Blocked until 2027 Rogers restructuring
Phase 7 (DROS) ─────────► Blocked until brand files available
Phase 7 (Drimp) ────────► Blocked until dedicated architecture session
```

---

## WHAT MUST NOT BE BUILT YET

| Item | Reason |
|---|---|
| Native mobile app | OS has no real data yet — build after OS is operational |
| Custom community platform | Use Discord/Circle until scale demands custom |
| Video course hosting | Vimeo/Loom embeds first |
| AI Brand Monitor | Needs data foundation |
| NMI rebuild | Awaiting 2027 restructuring |
| Drimp full rebuild | Needs dedicated architecture session |
| Custom email marketing | Use ConvertKit/Resend via n8n |
| Advanced RAG | Needs document vault populated first |

---

## OPEN QUESTIONS (Blocking Commerce)

| # | Question | Blocks |
|---|---|---|
| 1 | Booking system: Calendly embed or custom? | Rogers /book-a-session |
| 2 | Payments: Stripe Payment Links or embedded Checkout? | Rogers Stripe integration |
| 3 | Email platform: ConvertKit, Mailchimp, Brevo, or Resend? | n8n email workflows |
| 4 | What is Rogers' first paid offering to launch? | Phase 2 Commerce |
| 5 | Is there an event coming up that needs a page immediately? | Rogers /events |

---

*This document is the repository's canonical roadmap. Update it when phases complete or priorities shift. Do not let it drift from reality.*
