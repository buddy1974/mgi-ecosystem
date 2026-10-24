# MGI EXECUTIVE OS — PROJECT HEADER
**Version:** 1.0 | **Established:** 2026-06-03 | **Authority:** Marcel + ChatGPT (Decision Layer)

---

## PROJECT DEFINITION

**Name:** MGI Executive OS
**Type:** AI-powered Executive Operating System + Multi-entity Public Website Ecosystem
**Purpose:** Enable Rogers Nforgwei (CEO, "Daddy Rogers") to manage the entire MGI venture ecosystem from one centralized, intelligent command center. Accompanied by a public website for each of the 6 ventures.

**CEO directive (May 2026):**
> "In order of priority: 1 — Me, my person as a product and brand. Selling faith-based coaching and mentorship in leadership, business and personal development. 2 — MGI services, consultancy, online marketing. 3 — NMI."

---

## ECOSYSTEM STRUCTURE

| Entity | Domain (Canonical) | App | Status |
|---|---|---|---|
| Rogers Nforgwei (CEO Personal Brand) | rogersnforgwei.com | `apps/web-rogers` | ✅ LIVE |
| MGI / Mina-Galeed Invest Ltd. | **mgi-ventures.com** | `apps/web-mgi` | ✅ BUILT |
| Horeb Solutions | horebsolutions.org | `apps/web-horeb` | ✅ BUILT — DNS pending |
| Librairie du Quartier | librairieduquartier.org | `apps/web-lq` | 🔜 Not started |
| DROS Construction | drosconstruction.com | `apps/web-dros` | 🔜 Not started |
| Abba Land Place | abbalandplace.com | `apps/web-abbaland` | 🔜 Coming soon |
| NMI Education | nmieducation.com | `apps/web-nmi` | ⚠️ SEPARATE — DO NOT MODIFY |
| Executive OS | os.mgi-ventures.com | `apps/executive-os` | 🚧 In progress |

**Legacy domains (acknowledged — do not build on these):**
- `mina-galeed.com` → will redirect to `mgi-ventures.com` (DNS — Marcel action, later)
- `horebsolutions.com` → will redirect to `horebsolutions.org`
- `librairieduquartier.com` → will redirect to `librairieduquartier.org`

---

## EXECUTIVE OS PURPOSE

The OS enables the CEO to manage from one screen:
- Approval routing and sign-off across all ventures
- Communications inbox (email, WhatsApp, social, internal)
- Operations Bridge (venture manager submissions → CEO → Telegram reply)
- Social media scheduling and publishing
- Calendar and booking management
- AI daily briefing and executive intelligence
- Venture deep-dive dashboards
- User and team management

**CEO pain points this system solves:** Communication overload, dependency on phone calls, operational blindness, scattered tools, approval delays, manual repetitive work, poor delegation visibility.

---

## NMI INTEGRATION RULE — NON-NEGOTIABLE

```
NMI Education (`nmi-automation-os`) is a fully operational, separate enterprise OS.

RULE: DO NOT MODIFY NMI CODE. EVER.
RULE: DO NOT REFACTOR NMI. EVER.
RULE: DO NOT UPDATE NMI DEPENDENCIES. EVER.

MGI Executive OS reads FROM NMI via a read-only bridge (lib/nmi-bridge.ts).
MGI Executive OS NEVER writes TO NMI.
Integration is additive only — external read bridge, never embedded code.
```

---

## ROLE DEFINITIONS

### Marcel + ChatGPT — Decision Layer
Responsible for: strategic direction, architecture decisions, roadmap, feature prioritization, business logic, product vision, UI/UX direction, workflow design. They instruct. Everyone else executes or validates.

### Claude Cowork — Architecture Guardian & Orchestrator
Role: Instructor · Orchestrator · Validator · Reviewer · Inspector · Governance Guardian
Responsibilities: Interpret decisions → prepare Claude Code briefs → validate architecture → prevent drift → review outputs → maintain governance documents.
NOT: the main coder · the final executor · the implementation engine.

### Claude Code — Executor
Role: Implementation engine — coding, file generation, terminal, git, CI, debugging.
NOT: a decision maker — Claude Code executes validated, approved briefs only.

---

## CURRENT PHASE

**Phase: Active Development — Foundation Lock in progress**

- Public websites: Rogers (live), Horeb (built), MGI (built), others pending
- Executive OS: Shell and all module UIs built, real database connection unconfirmed
- Commerce: Zero — booking, payment, and lead-capture systems not yet built
- Security: Known issues — see `docs/known-risks.md`
- Governance: Foundation Lock sprint in progress (governance docs being populated)

---

## TECHNOLOGY STACK

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.4 (App Router only — no pages/) |
| Language | TypeScript strict (no `any`) |
| Package manager | pnpm 9.0.0 (never npm or yarn) |
| Monorepo | Turborepo |
| Styling | TailwindCSS (`@mgi/config` preset) + inline styles in web-* apps |
| UI components | shadcn/ui (executive-os only) |
| ORM | Prisma (no migrations dir — use `db:push`) |
| Database | Neon serverless PostgreSQL + pgvector (1536-dim) |
| Auth | NextAuth (beta) + Prisma adapter, JWT strategy |
| AI | Anthropic SDK `^0.95.1` (Claude Haiku, Sonnet, Opus) |
| Automation | n8n at `https://n8n.maxpromo.digital` |
| Notifications | Telegram Bot (Operations Bridge) |
| Hosting | Vercel (one project per app) |
| DNS/CDN | Cloudflare |
| Repository | GitHub — https://github.com/buddy1974/mgi-ecosystem |

---

## CRITICAL GOVERNANCE RULES

1. **PROJECT_HEADER.md, CLAUDE.md, ROADMAP.md, AGENTS.md, and docs/** must be read before any implementation begins.
2. No Claude Code session may begin without reading these documents first.
3. Architecture decisions require written approval from Marcel + ChatGPT before implementation.
4. All durable decisions must be written to `docs/decision-log.md` — chat history is NOT a source of truth.
5. No `next lint` in package.json scripts — removed in Next.js 16; use `eslint src/` instead.
6. All apps import Prisma from `@mgi/database` only — never instantiate own client.
7. All auth logic in `@mgi/auth` only.
8. All AI calls must route through `@mgi/ai` package (once implemented).
9. Every company-scoped table requires a `companyId` column.
10. CI must pass before any PR merges. No force merges.
11. Secrets in `.env.local` only — never commit secrets.
12. Images added to `public/` must be committed to git.
13. `apps/web-rogers/app/api/payunit/` — UNTOUCHABLE. Live payment processing.
14. `C:\Users\loneb\Documents\Claude\Projects\MCP bridge\` — UNTOUCHABLE. Shared infrastructure.
