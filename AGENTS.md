# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

---

## Shared Infrastructure — Do Not Touch

The following path is shared infrastructure used by Codex Desktop globally.
Do NOT read, edit, or modify any files under this path for any reason:

```
C:\Users\loneb\Documents\Codex\Projects\MCP bridge\
```

This includes `.env`, `mcp-stdio-server.js`, `package.json`, and all other files.
Use the MCP tools exposed by the bridge (`run_n8n_workflow`, `list_n8n_workflows`, etc.) but never modify the bridge itself.

---

## Next.js Version Warning

All apps run **Next.js 16.2.4**, which has breaking changes relative to earlier versions — APIs, conventions, and file structure differ significantly from training data. Before writing new Next.js code, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices.

**Critical known difference:** `next lint` was removed from the Next.js 16 CLI. Apps must NOT have `"lint": "next lint"` in their scripts — that command no longer exists and will fail CI with a misleading "invalid directory" error.

---

## Commands

All commands run from the **monorepo root** unless noted.

```bash
# Dev (runs all apps concurrently via Turbo)
pnpm dev

# Dev — single app
pnpm dev --filter @mgi/web-rogers
pnpm dev --filter executive-os

# Build all
pnpm build

# Build — single app
pnpm build --filter @mgi/web-rogers

# Type-check all (runs tsc --noEmit per app)
pnpm type-check

# Type-check — single app (run from repo root or app dir)
npx tsc --noEmit --project apps/web-rogers/tsconfig.json

# Lint all
pnpm lint

# Database
pnpm db:push       # push schema changes without migration files
pnpm db:generate   # regenerate Prisma client after schema change
pnpm db:migrate    # run migrations (dev)
pnpm db:studio     # open Prisma Studio
```

CI (`.github/workflows/ci.yml`) runs `pnpm type-check` → `pnpm lint` → `pnpm build` in that order. Required secrets: `AUTH_SECRET`, `EMAIL_SERVER`, `DATABASE_URL`, `DATABASE_URL_UNPOOLED`.

---

## Monorepo Structure

```
apps/
  executive-os/   (port 3000)  Main multi-tenant SaaS — Codex AI, auth, full DB access
  web-mgi/        (port 3001)  MGI public site — Codex API integration
  web-rogers/     (port 3002)  rogersnforgwei.com — public marketing + PayUnit registrations
  web-horeb/      (port 3003)
  web-lq/         (port 3004)
  web-dros/       (port 3005)
  web-abbaland/   (port 3006)
  web-nmi/        (port 3007)
  web-drimp/      (port 3008)

packages/
  database/       Prisma client + all type exports (PostgreSQL + Neon + pgvector)
  auth/           NextAuth (beta) + Prisma adapter + permission helpers
  ui/             Shared React components + globals.css
  types/          TypeScript type definitions (no runtime deps)
  config/         Shared ESLint, Tailwind (index.ts), and TypeScript configs
  ai/             (empty placeholder)
  audit/          (empty placeholder)
  notifications/  (empty placeholder)
```

---

## Architecture

### executive-os

The most complex app. Uses all shared packages (`@mgi/auth`, `@mgi/database`, `@mgi/ui`, `@mgi/types`). Handles multi-tenant auth via `next-auth` (beta) with the Prisma adapter. Codex API integration via `@anthropic-ai/sdk ^0.95.1`. Has its own `eslint.config.mjs` (ESLint 9 flat config). Source code lives in `src/` (not `app/` at root).

### web-rogers

Public-facing marketing site for rogersnforgwei.com. Uses `@mgi/database` for the `RogersRegistration` model. Has PayUnit payment integration in `app/api/payunit/` — do not modify these routes. No auth. Inline styles throughout (no Tailwind class-heavy approach). Components live in `components/` and `app/` (some shared via `SquareBars`, `WaveDivider`, `ScriptureDivider`).

### packages/database

The single source of truth for all DB types. When the Prisma schema changes, run `pnpm db:generate` to update the client, then restart any running dev servers. The schema uses Neon's serverless adapter and pgvector (1536-dim vectors). No migrations directory — `pnpm db:push` is used for schema changes.

Import pattern throughout the codebase:
```ts
import { prisma } from '@mgi/database'
import type { User, Company, ... } from '@mgi/database'
```

### packages/config / Design System

The `@mgi/config` Tailwind preset defines the MGI design system (`mgi-bg`, `mgi-card`, `mgi-text`, status colors). The `executive-os` and other apps extend this. Color tokens:
- Background: `#0C0F1A` (`mgi-bg`), cards: `#1E293B` (`mgi-card`)
- Status: green `#10B981`, amber `#F59E0B`, red `#EF4444`, blue `#3B82F6`
- Fonts: Inter (sans), JetBrains Mono (mono)

`web-rogers` uses its own inline color palette: purple `#3a0ca3`, pink `#f72585`, blue `#4361ee`, dark bg `#0d0120`.

### Auth (packages/auth)

Exports `auth`, `handlers`, `signIn`, `signOut` from NextAuth, plus `hasPermission`, `requirePermission`, `getUserCompanyRole`. Role hierarchy: `GlobalRole` (SUPER_ADMIN / ADMIN / USER) and `CompanyRole` (ADMIN / MANAGER / STAFF / GUEST). Only `executive-os` currently uses the auth package.

---

## Key Constraints

- **TypeScript strict** — no `any` types
- **App Router only** — all apps use Next.js App Router, no `pages/` directory
- **pnpm workspace** — always use `pnpm`, never npm or yarn
- **No `next lint`** — if a lint script is needed, use `eslint src/` (like `executive-os`) or omit the script
- **Secrets in `.env.local`** — never commit secrets; `DATABASE_URL` and `DATABASE_URL_UNPOOLED` are both required for Neon (pooled + direct connections)
- **PayUnit untouchable** — `apps/web-rogers/app/api/payunit/` routes must not be modified
- **Schema changes need `db:generate`** — after any edit to `packages/database/prisma/schema.prisma`
