import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// The NMI database uses the Prisma @@map/@map names (orders, invoices.due_date, agent_runs.started_at).
// The bridge previously queried "Order", "Invoice", "dueDate" ... which do not exist, so it always
// fell back to "not connected". Guard against that regression.
const src = readFileSync(join(process.cwd(), 'src', 'lib', 'nmi-bridge.ts'), 'utf8')

test('nmi-bridge queries the mapped NMI table names', () => {
  for (const table of ['orders', 'invoices', 'stock', 'manuscripts', 'tasks', 'notifications', 'whatsapp_messages', 'agent_runs']) {
    assert.match(src, new RegExp(`FROM ${table}(\\s|$)`), `missing FROM ${table}`)
  }
})

test('nmi-bridge does not use unmapped PascalCase names', () => {
  for (const bad of ['"Order"', '"Invoice"', '"Stock"', '"Manuscript"', '"Task"', '"Notification"', '"WhatsAppMessage"', '"AgentRun"', '"dueDate"', '"startedAt"']) {
    assert.ok(!src.includes(bad), `still uses ${bad}`)
  }
})
