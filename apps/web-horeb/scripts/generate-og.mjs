/**
 * OG image generator — Horeb Solutions Sarl
 * Outputs: public/og/horeb-og.jpg (1200×630)
 * Run from monorepo root: node apps/web-horeb/scripts/generate-og.mjs
 */
import { createRequire } from 'module';
import { mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dir   = dirname(fileURLToPath(import.meta.url));
const require  = createRequire(import.meta.url);
const sharp    = require(resolve(__dir, '../../../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp'));

const OUT_DIR  = resolve(__dir, '../public/og');
const OUT_FILE = resolve(OUT_DIR, 'horeb-og.jpg');

const GREEN      = '#007A3D';
const DARK_GREEN = '#005F32';
const YELLOW     = '#FFC928';
const WHITE      = '#FFFFFF';
const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="${DARK_GREEN}"/>
      <stop offset="100%" stop-color="${GREEN}"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Decorative circles -->
  <circle cx="1120" cy="90"  r="220" fill="${YELLOW}" fill-opacity="0.07"/>
  <circle cx="80"   cy="560" r="160" fill="${WHITE}"  fill-opacity="0.04"/>
  <circle cx="600"  cy="630" r="300" fill="${WHITE}"  fill-opacity="0.025"/>

  <!-- Top yellow accent bar -->
  <rect x="0" y="0" width="${W}" height="6" fill="${YELLOW}" opacity="0.9"/>

  <!-- HS badge -->
  <rect x="549" y="100" width="102" height="68" rx="12"
        fill="${YELLOW}" fill-opacity="0.15"
        stroke="${YELLOW}" stroke-opacity="0.4" stroke-width="2"/>
  <text x="600" y="145"
        font-family="sans-serif" font-size="30" font-weight="bold"
        fill="${YELLOW}" text-anchor="middle">HS</text>

  <!-- Main headline -->
  <text x="600" y="250"
        font-family="sans-serif" font-size="72" font-weight="bold"
        fill="${WHITE}" text-anchor="middle">Horeb Solutions Sarl</text>

  <!-- Yellow divider -->
  <rect x="440" y="272" width="320" height="4" rx="2" fill="${YELLOW}"/>

  <!-- Tagline -->
  <text x="600" y="340"
        font-family="sans-serif" font-size="34"
        fill="${YELLOW}" text-anchor="middle">Votre partenaire de la distribution</text>

  <!-- Services -->
  <text x="600" y="410"
        font-family="sans-serif" font-size="20"
        fill="${WHITE}" fill-opacity="0.45" text-anchor="middle">
    Manuels scolaires · Fournitures · Matériels didactiques
  </text>

  <!-- Badge strip -->
  <rect x="380" y="480" width="440" height="52" rx="26"
        fill="${WHITE}" fill-opacity="0.06"
        stroke="${WHITE}" stroke-opacity="0.12" stroke-width="1"/>
  <text x="600" y="513"
        font-family="sans-serif" font-size="17"
        fill="${WHITE}" fill-opacity="0.55" text-anchor="middle">
    6 Agences · 10 Partenaires relais · Réseau national
  </text>

  <!-- Domain -->
  <text x="600" y="590"
        font-family="sans-serif" font-size="16"
        fill="${WHITE}" fill-opacity="0.28" text-anchor="middle">horebsolutions.org</text>
</svg>`;

mkdirSync(OUT_DIR, { recursive: true });

await sharp(Buffer.from(svg))
  .resize(W, H)
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(OUT_FILE);

console.log(`✓  ${OUT_FILE}`);
