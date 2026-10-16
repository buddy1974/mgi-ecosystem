import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

// @mgi/database uses the Neon HTTP adapter, which cannot run transactions.
// Prisma 7 runs $transaction, updateMany and createMany inside one, so they fail
// at runtime ("Transactions are not supported in HTTP mode") while mocked unit
// tests still pass. Verified against a real Neon test branch on 2026-10-16.
const FORBIDDEN = /\.\s*(\$transaction|updateMany|createMany|createManyAndReturn|updateManyAndReturn)\s*\(/

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) return sourceFiles(p)
    return /\.tsx?$/.test(name) ? [p] : []
  })
}

test('MGI source avoids Prisma operations that need a transaction on the Neon HTTP adapter', () => {
  const offenders = sourceFiles(join(__dirname, '..', 'src')).flatMap((file) =>
    readFileSync(file, 'utf8').split('\n')
      .map((line, i) => ({ line, i }))
      .filter(({ line }) => FORBIDDEN.test(line) && !line.trim().startsWith('//'))
      .map(({ i }) => `${file}:${i + 1}`),
  )
  assert.deepEqual(offenders, [])
})
