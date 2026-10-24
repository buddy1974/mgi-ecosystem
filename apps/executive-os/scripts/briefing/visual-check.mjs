#!/usr/bin/env node
// Visual check of the hosted staging deployment in headless Chrome (DevTools protocol).
// Signs in through the real login form with the synthetic executive account, then captures
// desktop (1440×900) and phone (390×844, mobile emulation) screenshots and measures
// horizontal overflow. The Vercel protection bypass is sent as a request header only.
//   node scripts/briefing/visual-check.mjs [--staff]
import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..')
const s = JSON.parse(readFileSync(join(ROOT, '.briefing-local', 'staging', 'staging-secrets.json'), 'utf8'))
const OUT = join(ROOT, '.briefing-local', 'staging', 'screens')
mkdirSync(OUT, { recursive: true })
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const port = 9341
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'vchk-'))}`, 'about:blank'], { stdio: 'ignore' })
await new Promise((r) => setTimeout(r, 2500))
const page = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page')
const ws = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((r) => ws.addEventListener('open', r))
let id = 0
const pending = new Map()
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) } })
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
const evalJs = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result?.result?.value
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

await send('Page.enable')
await send('Network.enable')
await send('Network.setExtraHTTPHeaders', { headers: { 'x-vercel-protection-bypass': s.bypass } })
const consoleErrors = []
await send('Runtime.enable')
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.method === 'Runtime.exceptionThrown') consoleErrors.push(m.params.exceptionDetails.text) })

async function go(path) {
  await send('Page.navigate', { url: s.url + path })
  await sleep(800)
  for (let i = 0; i < 40; i++) {
    if ((await evalJs('document.readyState')) === 'complete' && (await evalJs('!!document.querySelector("h1, main")'))) break
    await sleep(500)
  }
  await sleep(800)
}
const staff = process.argv.includes('--staff')
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
await go('/briefing/records/demo-nmi-inv-0412')
const loginUrl = await evalJs('location.href')
await evalJs(`(() => {
  const set = (el, v) => { Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, v); el.dispatchEvent(new Event('input', { bubbles: true })) }
  set(document.querySelector('#cred-email'), ${JSON.stringify(staff ? s.accounts.staff : s.accounts.president)})
  set(document.querySelector('#password'), ${JSON.stringify(staff ? s.staffPassword : s.presidentPassword)})
  document.querySelector('#cred-email').form.requestSubmit()
})()`)
await sleep(5000)
const afterLogin = await evalJs('location.pathname')
const report = { at: new Date().toISOString(), loginRedirect: loginUrl.replace(s.url, ''), landedAfterLogin: afterLogin, pages: [] }
console.log(`login page: ${report.loginRedirect}\nafter sign-in: ${afterLogin}`)

const pages = staff
  ? { 'staff-overview': '/briefing', 'staff-nmi-record': '/briefing/records/demo-nmi-inv-0412', 'staff-dros-record': '/briefing/records/demo-dros-prj-0004' }
  : {
      overview: '/briefing', invoice: '/briefing/records/demo-nmi-inv-0412', customer: '/briefing/records/demo-nmi-cus-savannah',
      commitments: '/briefing/commitments', commitment: '/briefing/commitments/demo-mgi-cmt-res01', meetings: '/briefing/meetings',
      meeting: '/briefing/meetings/demo-mgi-mtg-2026-10', finance: '/briefing/finance/nmi', records: '/briefing/records?q=zzz-no-match',
      outbox: '/briefing/notifications', coverage: '/briefing/coverage', demo: '/briefing/demo', missing: '/briefing/records/does-not-exist',
    }
for (const [viewport, metrics] of [['desktop', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false }], ['phone', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true }]]) {
  await send('Emulation.setDeviceMetricsOverride', metrics)
  for (const [name, path] of Object.entries(pages)) {
    await go(path)
    let m
    for (let i = 0; i < 3 && !m; i++) m = await evalJs(`(() => { const main = document.querySelector('main') ?? document.documentElement; return {
      title: document.querySelector('h1')?.textContent?.trim() ?? '', overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      mainOverflow: main.scrollWidth > main.clientWidth + 1, demoBanner: document.body.innerText.includes('DEMO MODE'), notFound: /could not be found|This item is not available/.test(document.body.innerText),
      height: main.scrollHeight } })()`) ?? (await sleep(1500), undefined)
    m ??= { title: '(no data)', overflow: null, mainOverflow: null, demoBanner: null, notFound: null }
    const shot = await send('Page.captureScreenshot', { format: 'png' })
    writeFileSync(join(OUT, `${viewport}-${name}.png`), Buffer.from(shot.result.data, 'base64'))
    report.pages.push({ viewport, name, path, ...m })
    console.log(`${viewport.padEnd(7)} ${name.padEnd(17)} h1="${m.title.slice(0, 50)}" overflow=${m.overflow || m.mainOverflow} demoBanner=${m.demoBanner} notFound=${m.notFound}`)
  }
}
report.consoleErrors = consoleErrors
console.log(`uncaught page errors: ${consoleErrors.length}`)
writeFileSync(join(OUT, `report${staff ? '-staff' : ''}.json`), JSON.stringify(report, null, 2))
ws.close()
chrome.kill()
process.exit(0)
