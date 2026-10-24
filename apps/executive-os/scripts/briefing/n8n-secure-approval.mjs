#!/usr/bin/env node
// Secures the production n8n workflow "MGI — New Approval Alert" (oLXVXlcLpslPDj4b) in place:
//   - moves the inline Resend key into an n8n credential (encrypted at rest),
//   - adds Header Auth (x-n8n-key) to the webhook with a newly generated key,
//   - replaces the nodes with docs/briefing-centre/n8n-security/mgi-approval-alert.secured.json
//     (same webhook path, same recipient), keeps the workflow active.
// Talks to the local n8n API (http://127.0.0.1:5678) with the n8n-bridge API key from
// ~/.claude.json. No secret is printed. Touches no other workflow.
//   node scripts/briefing/n8n-secure-approval.mjs inspect | apply
import { randomBytes } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const WF_ID = 'oLXVXlcLpslPDj4b'
const API = 'http://127.0.0.1:5678/api/v1'
const APP = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const SECRETS = join(APP, '..', '..', '.briefing-local', 'production', 'secrets.json')
const key = JSON.parse(readFileSync(join(homedir(), '.claude.json'), 'utf8')).mcpServers['n8n-bridge'].env.N8N_API_KEY
const call = async (method, path, body) => {
  const r = await fetch(API + path, { method, headers: { 'X-N8N-API-KEY': key, 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined })
  const text = await r.text()
  if (!r.ok) throw new Error(`${method} ${path} → ${r.status} ${text.slice(0, 200)}`)
  return text ? JSON.parse(text) : {}
}

const wf = await call('GET', `/workflows/${WF_ID}`)
const http = wf.nodes.find((n) => n.type === 'n8n-nodes-base.httpRequest')
const hook = wf.nodes.find((n) => n.type === 'n8n-nodes-base.webhook')
const inlineAuth = http?.parameters?.headerParameters?.parameters?.find((p) => p.name === 'Authorization')?.value
const recipientMatch = String(http?.parameters?.jsonBody ?? '').match(/"to"\s*:\s*\[\s*"([^"]+)"/)
const state = {
  name: wf.name, active: wf.active, nodes: wf.nodes.map((n) => `${n.name} (${n.type.split('.').pop()})`),
  webhookPath: hook?.parameters?.path, webhookAuth: hook?.parameters?.authentication ?? 'none',
  inlineResendKey: Boolean(inlineAuth && /^Bearer re_/.test(inlineAuth)), credentialBased: Boolean(http?.credentials), recipientFound: Boolean(recipientMatch),
}
console.log(JSON.stringify(state, null, 2))
if (process.argv[2] !== 'apply') process.exit(0)

if (!state.inlineResendKey && state.credentialBased) { console.log('Already secured — nothing to do.'); process.exit(0) }
if (!inlineAuth || !recipientMatch) throw new Error('Unexpected workflow shape — refusing to change it')

// Backup of the current definition (contains the old key → private, git-ignored folder).
const backup = join(APP, '..', '..', '.briefing-local', 'production', `n8n-${WF_ID}-before.json`)
writeFileSync(backup, JSON.stringify(wf, null, 2))

const s = existsSync(SECRETS) ? JSON.parse(readFileSync(SECRETS, 'utf8')) : {}
s.n8nWebhookKey ??= randomBytes(32).toString('base64url')
writeFileSync(SECRETS, JSON.stringify(s, null, 2))

const resendCred = await call('POST', '/credentials', { name: 'Resend API key (MGI approval alert)', type: 'httpHeaderAuth', data: { name: 'Authorization', value: inlineAuth } })
const hookCred = await call('POST', '/credentials', { name: 'MGI OS → n8n webhook key (x-n8n-key)', type: 'httpHeaderAuth', data: { name: 'x-n8n-key', value: s.n8nWebhookKey } })

const secured = JSON.parse(readFileSync(join(APP, 'docs', 'briefing-centre', 'n8n-security', 'mgi-approval-alert.secured.json'), 'utf8'))
const nodes = secured.nodes.map((n) => {
  const node = { ...n, parameters: { ...n.parameters } }
  if (node.type === 'n8n-nodes-base.webhook') {
    node.webhookId = hook.webhookId ?? node.webhookId // keep the existing registration id
    node.credentials = { httpHeaderAuth: { id: hookCred.id, name: hookCred.name } }
  }
  if (node.name === 'Send via Resend') {
    node.credentials = { httpHeaderAuth: { id: resendCred.id, name: resendCred.name } }
    node.parameters.jsonBody = node.parameters.jsonBody.replace('REPLACE-WITH-RECIPIENT', recipientMatch[1])
  }
  return node
})
await call('PUT', `/workflows/${WF_ID}`, { name: wf.name, nodes, connections: secured.connections, settings: { executionOrder: 'v1', timezone: 'Africa/Douala' } })
if (wf.active) {
  await call('POST', `/workflows/${WF_ID}/deactivate`)
  await call('POST', `/workflows/${WF_ID}/activate`)
}
const after = await call('GET', `/workflows/${WF_ID}`)
const raw = JSON.stringify(after.nodes)
console.log(JSON.stringify({
  applied: true, active: after.active, nodes: after.nodes.map((n) => n.name),
  webhookAuth: after.nodes.find((n) => n.type === 'n8n-nodes-base.webhook')?.parameters?.authentication,
  inlineKeyRemaining: /re_[A-Za-z0-9_]{20,}/.test(raw), credentials: [resendCred.name, hookCred.name], backup: 'private (.briefing-local/production)',
}, null, 2))
