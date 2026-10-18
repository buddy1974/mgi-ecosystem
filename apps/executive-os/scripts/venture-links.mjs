#!/usr/bin/env node
// Prints the signed manager submission links (see src/lib/venture-link.ts).
// The key is derived from AUTH_SECRET, which must be supplied via the environment —
// never pass it on the command line or paste it into chat. Example (operator machine):
//   vercel env pull .env.links --environment production   (then delete the file)
//   node --env-file=.env.links scripts/venture-links.mjs https://os.mgi-ventures.com
// Send each manager only their own link.
import crypto from 'node:crypto'

const SLUGS = ['rogers', 'horeb', 'nmi', 'lq', 'dros', 'abba', 'mgi'] // src/lib/ventures.ts
const LABEL = 'mgi-venture-report-link:v1:'

const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET
if (!secret || secret.length < 32) {
  console.error('AUTH_SECRET missing or shorter than 32 characters — no links generated.')
  process.exit(1)
}
const base = (process.argv[2] ?? 'https://os.mgi-ventures.com').replace(/\/$/, '')

for (const slug of SLUGS) {
  const key = crypto.createHmac('sha256', secret).update(LABEL + slug).digest('base64url').slice(0, 32)
  console.log(`${slug.padEnd(8)} ${base}/submit/${slug}?k=${key}`)
}
