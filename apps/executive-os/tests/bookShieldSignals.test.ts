import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getBookShieldFeed } from '../src/lib/bookshield-signals'

const signal = {
  id: 'SIG-0001', company: 'NMI Education', riskType: 'Publishing rights risk',
  severity: 'High', productTitle: 'Test title', status: 'Under review',
  decisionNeeded: 'Note the risk', ownerRole: 'NMI management',
  raisedAt: '2026-10-16T10:00:00.000Z', updatedAt: '2026-10-16T10:00:00.000Z',
}
const feed = {
  schema: 'nmi.bookshield.signals.v1', generatedAt: '2026-10-16T10:00:00.000Z',
  company: 'NMI Education', risk: { level: 'Moderate', openIncidents: 1, openHighSeverity: 1 },
  signals: [signal],
}

test('BookShield feed accepts only the sanitised contract and fails safely', async t => {
  const originalFetch = globalThis.fetch
  const originalUrl = process.env.BOOKSHIELD_SIGNALS_URL
  const originalToken = process.env.BOOKSHIELD_SIGNALS_TOKEN
  t.after(() => {
    globalThis.fetch = originalFetch
    if (originalUrl === undefined) delete process.env.BOOKSHIELD_SIGNALS_URL
    else process.env.BOOKSHIELD_SIGNALS_URL = originalUrl
    if (originalToken === undefined) delete process.env.BOOKSHIELD_SIGNALS_TOKEN
    else process.env.BOOKSHIELD_SIGNALS_TOKEN = originalToken
  })
  process.env.BOOKSHIELD_SIGNALS_URL = 'https://nmi.example/api/bookshield/signals'
  process.env.BOOKSHIELD_SIGNALS_TOKEN = 'test-token'
  let calls = 0
  const respond = (body: unknown, status = 200) => {
    globalThis.fetch = async (_input, options) => {
      calls++
      assert.equal(options?.redirect, 'error')
      assert.equal(options?.cache, 'no-store')
      assert.ok(options?.signal)
      return new Response(JSON.stringify(body), { status })
    }
  }
  respond(feed)
  assert.deepEqual(await getBookShieldFeed(), {
    generatedAt: feed.generatedAt, company: feed.company, risk: feed.risk, signals: feed.signals,
  })
  for (const body of [
    null, {}, { ...feed, schema: 'unknown' },
    { ...feed, risk: { ...feed.risk, level: {} } },
    { ...feed, risk: { ...feed.risk, level: 'unknown' } },
    { ...feed, risk: { ...feed.risk, openIncidents: -1 } },
    { ...feed, risk: { ...feed.risk, openHighSeverity: 2 } },
    { ...feed, signals: [null] },
    { ...feed, signals: [{ ...signal, productTitle: {} }] },
    { ...feed, signals: [{ ...signal, evidence: 'private' }] },
    { ...feed, generatedAt: 'invalid' },
  ]) {
    respond(body)
    assert.equal(await getBookShieldFeed(), null)
  }
  respond(feed, 401)
  assert.equal(await getBookShieldFeed(), null)
  respond(feed, 503)
  assert.equal(await getBookShieldFeed(), null)
  globalThis.fetch = async () => { throw new DOMException('Timed out', 'TimeoutError') }
  assert.equal(await getBookShieldFeed(), null)
  globalThis.fetch = async () => new Response('invalid json')
  assert.equal(await getBookShieldFeed(), null)
  respond(feed)
  const previousCalls = calls
  delete process.env.BOOKSHIELD_SIGNALS_TOKEN
  assert.equal(await getBookShieldFeed(), null)
  process.env.BOOKSHIELD_SIGNALS_TOKEN = 'test-token'
  for (const url of ['invalid', 'http://nmi.example', 'https://user:password@nmi.example']) {
    process.env.BOOKSHIELD_SIGNALS_URL = url
    assert.equal(await getBookShieldFeed(), null)
  }
  assert.equal(calls, previousCalls, 'missing credentials and unsafe endpoints must not fetch')
})
