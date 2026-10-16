// Read-only readiness inventory. Never prints connection strings or business records.
// Usage: node --import tsx scripts/readinessInventory.ts <env-file> <mgi|nmi>
import { readFileSync } from 'node:fs'
import { neon } from '@neondatabase/serverless'

async function main() {
  const [file, app] = process.argv.slice(2)
  if (!file || !['mgi', 'nmi'].includes(app)) throw new Error('Expected env-file and mgi|nmi')
  const contents = readFileSync(file, 'utf8')
  const match = contents.match(/^DATABASE_URL\s*=\s*(.+)$/m)
  const url = match?.[1].trim().replace(/^(['"])(.*)\1$/, '$2')
  if (!url) throw new Error('DATABASE_URL missing')
  const sql = neon(url)
  const tables = app === 'mgi'
    ? ['users', 'approvals', 'messages', 'events', 'venture_reports']
    : ['users', 'orders', 'invoices', 'stock', 'products', 'bs_print_batches', 'bs_copy_checks', 'bs_cases', 'bs_case_events', 'bs_evidence', 'bs_exec_signals']
  const [available] = await sql.transaction((tx) => [tx.query(
    "select table_name from information_schema.tables where table_schema = 'public' and table_name = any($1::text[])", [tables],
  )], { readOnly: true })
  const names = new Set(available.map((row) => String(row.table_name)))
  const present = tables.filter((table) => names.has(table))
  const counts = await sql.transaction((tx) => present.map((table) =>
    // Identifiers come only from the fixed allowlist above.
    tx.query(`select count(*)::int as count from "${table}"`),
  ), { readOnly: true })
  console.log(JSON.stringify({ app, source: 'configured local connection; not independently matched to Vercel',
    tables: tables.map((table) => ({ table, exists: names.has(table), count: names.has(table) ? counts[present.indexOf(table)][0].count : null })),
  }, null, 2))
}

main().catch(() => { console.error('Read-only inventory failed; connection details withheld'); process.exitCode = 1 })
