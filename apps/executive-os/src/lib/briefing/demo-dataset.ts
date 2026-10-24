// DEMO DATASET — fictional, deterministic, every reference prefixed DEMO- and every title
// marked "(DEMO)". No real people: owners and attendees are role labels. No e-mail
// addresses or phone numbers. Dates are relative to the reset moment so that "overdue"
// stays overdue whenever the demo is replayed; amounts and relationships never change.
//
// Relationships (checked by tests/briefing-demo.test.ts):
//   CUSTOMER ← ORDER (data.customerRef) → INVOICE (parentRef = order) ← PAYMENT (parentRef = invoice)
//   ORDER → STOCK_MOVEMENT (parentRef = order, same quantities)  [distributor orders]
//   MEETING → DECISION → COMMITMENT;  APPROVAL_REQUEST.data.unblocksCommitmentRef → COMMITMENT
import { doualaDayStart } from './rules'

const DAY = 86_400_000
const HOUR = 3_600_000

export const demoId = (ref: string) => ref.toLowerCase()

export interface SeedRecord {
  id: string; ref: string; companySlug: string; domain: string; recordType: string; title: string; summary?: string
  status: string; execStatus?: string; amount?: number; currency?: string; occurredAt: Date; dueAt?: Date
  sourceSystem: 'DEMO'; sourceRef?: string; parentRef?: string; data?: Record<string, unknown>
}
export interface SeedMeeting { id: string; ref: string; companySlug: string; title: string; heldAt: Date; chair: string; attendees: string[]; agenda: string[]; minutes: string; summary: string; documents: { name: string; note: string }[] }
export interface SeedDecision { id: string; ref: string; meetingId: string; companySlug: string; text: string; rationale: string; status: string }
export interface SeedCommitment {
  id: string; ref: string; companySlug: string; decisionId?: string; title: string; deliverable: string; ownerName: string; ownerRole: string
  committedAt: Date; dueAt: Date; progress: number; status: string; blocker?: string; delayCause?: string; deliveredAt?: Date; evidence?: string; acceptedBy?: string; acceptedAt?: Date
}
export interface SeedActivity { subjectType: string; subjectId: string; action: string; fromStatus?: string; toStatus?: string; note?: string; actor: string; createdAt: Date }

export interface DemoDataset { records: SeedRecord[]; meetings: SeedMeeting[]; decisions: SeedDecision[]; commitments: SeedCommitment[]; activities: SeedActivity[] }

/** Small deterministic PRNG (mulberry32) — same anchor-independent sequence every time. */
function prng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const DEMO_PRODUCTS = [
  { ref: 'DEMO-NMI-PRD-MATH6', title: 'Mathématiques 6e (DEMO)', price: 4500 },
  { ref: 'DEMO-NMI-PRD-ENG1', title: 'English Grammar Form 1 (DEMO)', price: 3800 },
  { ref: 'DEMO-NMI-PRD-PHY4', title: 'Physics Form 4 (DEMO)', price: 5200 },
  { ref: 'DEMO-NMI-PRD-LECCP', title: 'Lecture CP (DEMO)', price: 2900 },
  { ref: 'DEMO-NMI-PRD-HG3', title: 'Histoire-Géographie 3e (DEMO)', price: 4200 },
  { ref: 'DEMO-NMI-PRD-CHEMLS', title: 'Chemistry Lower Sixth (DEMO)', price: 6100 },
] as const
type ProductKey = 'MATH6' | 'ENG1' | 'PHY4' | 'LECCP' | 'HG3' | 'CHEMLS'
const P = Object.fromEntries(DEMO_PRODUCTS.map((p) => [p.ref.replace('DEMO-NMI-PRD-', ''), p])) as Record<ProductKey, (typeof DEMO_PRODUCTS)[number]>

export const DEMO_BRANCHES = [
  { code: 'DLA', name: 'Douala branch (DEMO)', region: 'Littoral', base: 30 },
  { code: 'YDE', name: 'Yaoundé branch (DEMO)', region: 'Centre', base: 34 },
  { code: 'BDA', name: 'Bamenda branch (DEMO)', region: 'North-West', base: 26 },
  { code: 'GAR', name: 'Garoua branch (DEMO)', region: 'North', base: 18 },
] as const
const B = Object.fromEntries(DEMO_BRANCHES.map((b) => [b.code, b])) as Record<'DLA' | 'YDE' | 'BDA' | 'GAR', (typeof DEMO_BRANCHES)[number]>

export const DEMO_CUSTOMERS = [
  { ref: 'DEMO-NMI-CUS-HORIZON', name: 'Librairie Horizon (DEMO)', type: 'Distributor', city: 'Douala', region: 'Littoral', creditLimit: 5_000_000 },
  { ref: 'DEMO-NMI-CUS-SAVANNAH', name: 'Savannah Books Distribution (DEMO)', type: 'Distributor', city: 'Garoua', region: 'North', creditLimit: 6_000_000 },
  { ref: 'DEMO-NMI-CUS-EXCELLENCE', name: 'Collège Excellence (DEMO)', type: 'School', city: 'Yaoundé', region: 'Centre', creditLimit: 3_000_000 },
  { ref: 'DEMO-NMI-CUS-BBC', name: 'Bamenda Book Centre (DEMO)', type: 'Distributor', city: 'Bamenda', region: 'North-West', creditLimit: 3_000_000 },
  { ref: 'DEMO-NMI-CUS-KRIBI', name: 'Kribi School Supplies (DEMO)', type: 'Retailer', city: 'Kribi', region: 'South', creditLimit: 1_000_000 },
  { ref: 'DEMO-NMI-CUS-COUNTER', name: 'Shop counter sales (DEMO)', type: 'Walk-in customers', city: 'All branches', region: 'All', creditLimit: 0 },
] as const
const C = Object.fromEntries(DEMO_CUSTOMERS.map((c) => [c.ref.replace('DEMO-NMI-CUS-', ''), c])) as Record<string, (typeof DEMO_CUSTOMERS)[number]>

interface DistributorOrder { no: string; daysAgo: number; customer: string; branch: keyof typeof B; region?: string; lines: [ProductKey, number][]; payments: [number, number, string][] }

/** Explicit distributor orders (payments: [daysAgo, amount, method]). Order 0412 is the flagship order-to-cash story. */
export const DISTRIBUTOR_ORDERS: DistributorOrder[] = [
  { no: '0398', daysAgo: 55, customer: 'HORIZON', branch: 'DLA', lines: [['MATH6', 200], ['PHY4', 150]], payments: [[30, 1_680_000, 'Bank transfer']] },
  { no: '0405', daysAgo: 63, customer: 'HORIZON', branch: 'DLA', lines: [['LECCP', 300]], payments: [] },
  { no: '0412', daysAgo: 68, customer: 'SAVANNAH', branch: 'GAR', lines: [['MATH6', 400], ['ENG1', 350], ['HG3', 266]], payments: [[45, 1_500_000, 'Mobile money']] },
  { no: '0421', daysAgo: 40, customer: 'EXCELLENCE', branch: 'YDE', lines: [['MATH6', 120], ['ENG1', 120], ['HG3', 120]], payments: [[20, 1_500_000, 'Bank transfer']] },
  { no: '0433', daysAgo: 35, customer: 'BBC', branch: 'BDA', lines: [['ENG1', 250], ['CHEMLS', 80]], payments: [[10, 400_000, 'Mobile money']] },
  { no: '0440', daysAgo: 12, customer: 'SAVANNAH', branch: 'GAR', lines: [['PHY4', 200]], payments: [] },
  { no: '0447', daysAgo: 6, customer: 'EXCELLENCE', branch: 'YDE', lines: [['CHEMLS', 150]], payments: [] },
  { no: '0452', daysAgo: 2, customer: 'HORIZON', branch: 'DLA', lines: [['MATH6', 300], ['ENG1', 200]], payments: [] },
  { no: '0455', daysAgo: 1, customer: 'KRIBI', branch: 'DLA', region: 'South', lines: [['LECCP', 150]], payments: [[1, 435_000, 'Mobile money']] },
]

const ROLE = {
  president: 'President, MGI (DEMO role)',
  groupFinance: 'Group Finance Director (DEMO)',
  nmiGm: 'NMI General Manager (DEMO)',
  nmiFinance: 'NMI Finance Manager (DEMO)',
  nmiSales: 'NMI Sales Manager (DEMO)',
  drosMd: 'DROS Managing Director (DEMO)',
  it: 'Group IT Lead (DEMO)',
  rogers: 'Programmes Coordinator (DEMO)',
  print: 'NMI Production Manager (DEMO)',
}

export function buildDemoDataset(anchor: Date): DemoDataset {
  const today = doualaDayStart(anchor)
  const at = (daysAgo: number, hour = 10) => new Date(today.getTime() - daysAgo * DAY + hour * HOUR)
  const records: SeedRecord[] = []
  const add = (r: Omit<SeedRecord, 'id' | 'sourceSystem'>) => records.push({ ...r, id: demoId(r.ref), sourceSystem: 'DEMO' })

  for (const p of DEMO_PRODUCTS) {
    add({ ref: p.ref, companySlug: 'nmi', domain: 'PUBLISHING', recordType: 'PRODUCT', title: p.title, status: 'ACTIVE', execStatus: 'CLOSED', amount: p.price, currency: 'XAF', occurredAt: at(400), data: { unitPrice: p.price } })
  }
  for (const c of DEMO_CUSTOMERS) {
    add({ ref: c.ref, companySlug: 'nmi', domain: 'DISTRIBUTION', recordType: 'CUSTOMER', title: c.name, status: 'ACTIVE', execStatus: 'CLOSED', occurredAt: at(400), data: { type: c.type, city: c.city, region: c.region, creditLimit: c.creditLimit } })
  }

  const lineOf = (k: ProductKey, qty: number) => ({ productRef: P[k].ref, title: P[k].title, qty, unitPrice: P[k].price })

  // Shop counter (barcode POS) sales: one ticket batch per branch per day, days 1–60.
  const rnd = prng(20261024)
  const keys: ProductKey[] = ['MATH6', 'ENG1', 'PHY4', 'LECCP', 'HG3', 'CHEMLS']
  for (let d = 60; d >= 1; d--) {
    for (const br of DEMO_BRANCHES) {
      // Every title sells every day with small noise, so week-on-week totals are stable
      // (±~5%) — only the deliberate Bamenda story crosses the alert threshold.
      // Bamenda shop sales fall in the last 7 days — the "sales change" story.
      const factor = br.code === 'BDA' && d <= 7 ? 0.55 : 1
      const lines = keys.map((k) => lineOf(k, Math.max(1, Math.round((br.base / 6 + rnd() * 2 - 1) * factor))))
      const amount = lines.reduce((s, l) => s + l.qty * l.unitPrice, 0)
      const dd = String(d).padStart(2, '0')
      const ref = `DEMO-NMI-POS-${br.code}-D${dd}`
      const inv = `DEMO-NMI-INVP-${br.code}-D${dd}`
      add({ ref, companySlug: 'nmi', domain: 'SALES', recordType: 'ORDER', title: `${br.name} shop sales, day −${d}`, status: 'POSTED', execStatus: 'CLOSED', amount, currency: 'XAF', occurredAt: at(d, 18),
        data: { channel: 'SHOP', customerRef: C.COUNTER.ref, customerName: C.COUNTER.name, branch: br.name, region: br.region, lines, invoiceRef: inv } })
      add({ ref: inv, companySlug: 'nmi', domain: 'RECEIVABLES', recordType: 'INVOICE', title: `Receipt batch ${br.name}, day −${d}`, status: 'PAID', execStatus: 'CLOSED', amount, currency: 'XAF', occurredAt: at(d, 18), dueAt: at(d, 18), parentRef: ref,
        data: { customerRef: C.COUNTER.ref, customerName: C.COUNTER.name, branch: br.name } })
      add({ ref: `DEMO-NMI-PAYP-${br.code}-D${dd}`, companySlug: 'nmi', domain: 'RECEIVABLES', recordType: 'PAYMENT', title: `Counter takings ${br.name}, day −${d}`, status: 'RECEIVED', execStatus: 'CLOSED', amount, currency: 'XAF', occurredAt: at(d, 19), parentRef: inv, data: { method: 'Cash / mobile money (POS)' } })
    }
  }

  for (const o of DISTRIBUTOR_ORDERS) {
    const cust = C[o.customer]
    const br = B[o.branch]
    const lines = o.lines.map(([k, q]) => lineOf(k, q))
    const amount = lines.reduce((s, l) => s + l.qty * l.unitPrice, 0)
    const paid = o.payments.reduce((s, p) => s + p[1], 0)
    const orderRef = `DEMO-NMI-ORD-${o.no}`, invRef = `DEMO-NMI-INV-${o.no}`
    const status = paid >= amount ? 'PAID' : paid > 0 ? 'PARTIAL' : 'ISSUED'
    add({ ref: orderRef, companySlug: 'nmi', domain: 'DISTRIBUTION', recordType: 'ORDER', title: `Order ${o.no} — ${cust.name}`, status: 'DELIVERED', execStatus: 'CLOSED', amount, currency: 'XAF', occurredAt: at(o.daysAgo, 11),
      data: { channel: 'DISTRIBUTOR', customerRef: cust.ref, customerName: cust.name, branch: br.name, region: o.region ?? br.region, lines, invoiceRef: invRef } })
    add({ ref: invRef, companySlug: 'nmi', domain: 'RECEIVABLES', recordType: 'INVOICE', title: `Invoice ${o.no} — ${cust.name}`, status, execStatus: status === 'PAID' ? 'CLOSED' : 'NEW', amount, currency: 'XAF',
      occurredAt: at(o.daysAgo, 12), dueAt: at(o.daysAgo - 30, 12), parentRef: orderRef,
      summary: `Delivered by e-mail as PDF (simulated — no message was sent). Terms 30 days.`,
      data: { customerRef: cust.ref, customerName: cust.name, branch: br.name, terms: '30 days', delivery: 'E-mail PDF (simulated)' } })
    o.payments.forEach(([d, amt, method], i) => add({ ref: `DEMO-NMI-PAY-${o.no}-${i + 1}`, companySlug: 'nmi', domain: 'RECEIVABLES', recordType: 'PAYMENT', title: `Payment ${i + 1} on invoice ${o.no}`, status: 'RECEIVED', execStatus: 'CLOSED', amount: amt, currency: 'XAF', occurredAt: at(d, 15), parentRef: invRef, data: { method, customerRef: cust.ref } }))
    add({ ref: `DEMO-NMI-STK-${o.no}`, companySlug: 'nmi', domain: 'INVENTORY', recordType: 'STOCK_MOVEMENT', title: `Stock out for order ${o.no} — ${br.name}`, status: 'POSTED', execStatus: 'CLOSED', occurredAt: at(o.daysAgo, 11), parentRef: orderRef,
      data: { direction: 'OUT', branch: br.name, lines: lines.map((l) => ({ productRef: l.productRef, title: l.title, qty: l.qty })) } })
  }

  const stock = (code: string, br: keyof typeof B, k: ProductKey, qty: number, weeklyDemand: number, topTitle: boolean) =>
    add({ ref: `DEMO-NMI-STL-${code}`, companySlug: 'nmi', domain: 'INVENTORY', recordType: 'STOCK_LEVEL', title: `${P[k].title} at ${B[br].name}`, status: qty < weeklyDemand ? 'BELOW_DEMAND' : 'OK', execStatus: qty < weeklyDemand ? 'NEW' : 'CLOSED', occurredAt: at(0, 7),
      data: { branch: B[br].name, title: P[k].title, productRef: P[k].ref, qty, weeklyDemand, topTitle } })
  stock('BDA-MATH6', 'BDA', 'MATH6', 12, 90, true)
  stock('DLA-ENG1', 'DLA', 'ENG1', 30, 45, false)
  stock('GAR-PHY4', 'GAR', 'PHY4', 60, 40, false)
  stock('YDE-HG3', 'YDE', 'HG3', 140, 55, false)

  add({ ref: 'DEMO-NMI-PRN-0019', companySlug: 'nmi', domain: 'PUBLISHING', recordType: 'PRINT_JOB', title: 'Physics Form 4 (DEMO) reprint, 5,000 copies — printer 6 days late', status: 'DELAYED', occurredAt: at(20), dueAt: at(6),
    summary: 'External printer reports a paper shortage. Branch stock covers about 3 weeks.', data: { copies: 5000, printer: 'External printer (DEMO)', originalDue: at(6).toISOString().slice(0, 10) } })

  // DROS — an active project waiting on a client decision.
  add({ ref: 'DEMO-DROS-PRJ-0004', companySlug: 'dros', domain: 'PROJECT', recordType: 'PROJECT', title: 'Warehouse extension, Bonabéri (DEMO) — roofing decision pending 9 days', status: 'IN_PROGRESS', amount: 96_000_000, currency: 'XAF', occurredAt: at(120),
    summary: 'Foundations and structure complete. Roofing cannot start until the client chooses the roofing material.',
    data: { milestones: [{ name: 'Foundations', status: 'Done' }, { name: 'Structure', status: 'Done' }, { name: 'Roofing', status: 'Waiting for client decision (9 days)' }, { name: 'Handover', status: 'Planned' }], client: 'Logistics client (DEMO)' } })

  // Rogers programmes — registrations (programme names from apps/web-rogers/lib/programs.ts).
  const reg = (no: string, programme: string, status: string, daysAgo: number) =>
    add({ ref: `DEMO-RGR-REG-${no}`, companySlug: 'rogers', domain: 'PROGRAMME', recordType: 'REGISTRATION', title: `${programme} — registrant #${no} (DEMO)`, status, execStatus: status === 'CONFIRMED' ? 'CLOSED' : 'NEW', amount: 50_000, currency: 'XAF', occurredAt: at(daysAgo, 14),
      data: { programme, payment: status === 'CONFIRMED' ? 'Paid (simulated)' : 'Not completed', channel: 'Website form (simulated)' } })
  reg('0101', 'Men On Duty', 'CONFIRMED', 5)
  reg('0102', "Dominion Life Men's Conference", 'CONFIRMED', 3)
  reg('0103', 'Men On Duty', 'INITIATED', 4)
  reg('0104', 'CEO On Mission', 'INITIATED', 3)

  // Governance — two coordination meetings, decisions, commitments.
  const meetings: SeedMeeting[] = [
    {
      id: demoId('DEMO-MGI-MTG-2026-09'), ref: 'DEMO-MGI-MTG-2026-09', companySlug: 'mgi', title: 'Group coordination meeting — September (DEMO)', heldAt: at(40, 9), chair: ROLE.president,
      attendees: [ROLE.groupFinance, ROLE.nmiGm, ROLE.print, ROLE.drosMd], agenda: ['School-year reprints', 'DROS pipeline review'],
      minutes: 'Reprint schedule agreed for the start of the school year. DROS to publish a monthly pipeline summary.',
      summary: 'Two decisions, both implemented.', documents: [{ name: 'Reprint plan (DEMO).pdf', note: 'Attachment placeholder — no file stored in the demo' }],
    },
    {
      id: demoId('DEMO-MGI-MTG-2026-10'), ref: 'DEMO-MGI-MTG-2026-10', companySlug: 'mgi', title: 'Group coordination meeting — October (DEMO)', heldAt: at(10, 9), chair: ROLE.president,
      attendees: [ROLE.groupFinance, ROLE.nmiGm, ROLE.nmiFinance, ROLE.drosMd, ROLE.it, ROLE.rogers],
      agenda: ['NMI receivables over 30 days', 'Barcode POS and Odoo posting at the Douala shop', 'Paperless invoicing', 'DROS response times'],
      minutes: [
        '1. Receivables: distributors over 30 days stand at about 3.6 M XAF. The President asked for a 40% reduction before 30 November.',
        '2. Barcode POS: shop sales at Douala are not posting reliably to Odoo accounting. The IT lead needs the Odoo partner support contract to fix the integration.',
        '3. Paperless: every branch invoice to customers goes out by e-mail/WhatsApp from 1 November; paper only on request.',
        '4. DROS: every inquiry answered within 48 hours, weekly pipeline report to the President.',
      ].join('\n'),
      summary: 'Four resolutions with named owners and due dates.', documents: [{ name: 'Receivables ageing (DEMO).xlsx', note: 'Attachment placeholder — no file stored in the demo' }],
    },
  ]
  const decisions: SeedDecision[] = []
  const commitments: SeedCommitment[] = []
  const dec = (ref: string, meeting: string, text: string, rationale: string, status = 'OPEN') =>
    decisions.push({ id: demoId(ref), ref, meetingId: demoId(meeting), companySlug: 'mgi', text, rationale, status })
  const cmt = (c: Omit<SeedCommitment, 'id'>) => commitments.push({ ...c, id: demoId(c.ref) })

  dec('DEMO-MGI-RES-2026-09-01', 'DEMO-MGI-MTG-2026-09', 'Reprint the three best-selling titles before the school year.', 'Avoid stock-outs at the start of term.', 'IMPLEMENTED')
  dec('DEMO-MGI-RES-2026-09-02', 'DEMO-MGI-MTG-2026-09', 'DROS publishes a monthly pipeline summary.', 'Visibility of construction opportunities.', 'IMPLEMENTED')
  cmt({ ref: 'DEMO-NMI-CMT-0901', companySlug: 'nmi', decisionId: demoId('DEMO-MGI-RES-2026-09-01'), title: 'Reprint Mathématiques 6e (DEMO)', deliverable: '8,000 copies in central stock', ownerName: ROLE.print, ownerRole: 'NMI Production Manager',
    committedAt: at(40), dueAt: at(25), progress: 100, status: 'ACCEPTED', deliveredAt: at(21), evidence: 'Goods received note GRN-DEMO-0911', delayCause: 'RESOURCES', acceptedBy: ROLE.president, acceptedAt: at(20) })
  cmt({ ref: 'DEMO-NMI-CMT-0902', companySlug: 'nmi', decisionId: demoId('DEMO-MGI-RES-2026-09-01'), title: 'Reprint English Grammar Form 1 (DEMO)', deliverable: '6,000 copies in central stock', ownerName: ROLE.print, ownerRole: 'NMI Production Manager',
    committedAt: at(40), dueAt: at(25), progress: 100, status: 'ACCEPTED', deliveredAt: at(26), evidence: 'Goods received note GRN-DEMO-0907', acceptedBy: ROLE.president, acceptedAt: at(24) })
  cmt({ ref: 'DEMO-DROS-CMT-0903', companySlug: 'dros', decisionId: demoId('DEMO-MGI-RES-2026-09-02'), title: 'First monthly pipeline summary', deliverable: 'One-page pipeline summary to the President', ownerName: ROLE.drosMd, ownerRole: 'DROS Managing Director',
    committedAt: at(40), dueAt: at(30), progress: 100, status: 'ACCEPTED', deliveredAt: at(28), evidence: 'Pipeline summary (DEMO) shared in the OS', delayCause: 'OWNER', acceptedBy: ROLE.president, acceptedAt: at(27) })

  dec('DEMO-MGI-RES-2026-10-01', 'DEMO-MGI-MTG-2026-10', 'Reduce NMI receivables older than 30 days by 40% before 30 November.', 'Distributor balances are tying up working capital needed for reprints.')
  dec('DEMO-MGI-RES-2026-10-02', 'DEMO-MGI-MTG-2026-10', 'Stabilise barcode POS sales posting to Odoo accounting at the Douala shop.', 'Unposted shop sales distort the daily figures and the accounts.')
  dec('DEMO-MGI-RES-2026-10-03', 'DEMO-MGI-MTG-2026-10', 'Paperless: send every branch invoice to customers by e-mail/WhatsApp from 1 November.', 'Paperless policy; faster delivery; searchable history.')
  dec('DEMO-MGI-RES-2026-10-04', 'DEMO-MGI-MTG-2026-10', 'DROS answers every inquiry within 48 hours and reports the pipeline weekly.', 'Inquiries were being lost between e-mail and phone.')

  cmt({ ref: 'DEMO-MGI-CMT-RES01', companySlug: 'nmi', decisionId: demoId('DEMO-MGI-RES-2026-10-01'), title: 'Collections plan for distributors over 30 days', deliverable: 'Plan per distributor with agreed payment dates, signed off by the Group Finance Director', ownerName: ROLE.nmiFinance, ownerRole: 'NMI Finance Manager',
    committedAt: at(10), dueAt: at(3, 18), progress: 60, status: 'IN_PROGRESS' })
  cmt({ ref: 'DEMO-MGI-CMT-RES02', companySlug: 'nmi', decisionId: demoId('DEMO-MGI-RES-2026-10-02'), title: 'Fix barcode POS → Odoo posting at the Douala shop', deliverable: 'All Douala shop tickets post to Odoo the same day for 10 consecutive days', ownerName: ROLE.it, ownerRole: 'Group IT Lead',
    committedAt: at(10), dueAt: at(-12, 18), progress: 25, status: 'BLOCKED', delayCause: 'MANAGEMENT_DEPENDENCY', blocker: 'Odoo partner support contract (2.4 M XAF) is waiting for the President’s approval.' })
  cmt({ ref: 'DEMO-MGI-CMT-RES03', companySlug: 'nmi', decisionId: demoId('DEMO-MGI-RES-2026-10-03'), title: 'Paperless invoice delivery in all branches', deliverable: 'E-mail/WhatsApp invoice template live in 4 branches; staff trained', ownerName: ROLE.nmiGm, ownerRole: 'NMI General Manager',
    committedAt: at(10), dueAt: at(1, 18), progress: 100, status: 'DELIVERED', deliveredAt: at(2, 16), evidence: 'Template configured; 4 branches trained (attendance sheet DEMO); sample invoice DEMO-NMI-INV-0452 delivered by e-mail (simulated).' })
  cmt({ ref: 'DEMO-DROS-CMT-RES04', companySlug: 'dros', decisionId: demoId('DEMO-MGI-RES-2026-10-04'), title: '48-hour inquiry response and weekly pipeline report', deliverable: 'Shared inquiry log; first weekly report', ownerName: ROLE.drosMd, ownerRole: 'DROS Managing Director',
    committedAt: at(10), dueAt: at(5, 18), progress: 100, status: 'ACCEPTED', deliveredAt: at(6, 12), evidence: 'Inquiry log (DEMO) and weekly report #1', acceptedBy: ROLE.president, acceptedAt: at(5, 9) })

  const activities: SeedActivity[] = []
  for (const c of commitments) {
    activities.push({ subjectType: 'COMMITMENT', subjectId: c.id, action: 'ASSIGNED', toStatus: 'OPEN', note: c.deliverable, actor: ROLE.president, createdAt: c.committedAt })
    if (c.status === 'BLOCKED') activities.push({ subjectType: 'COMMITMENT', subjectId: c.id, action: 'BLOCKED', fromStatus: 'IN_PROGRESS', toStatus: 'BLOCKED', note: `${c.delayCause}: ${c.blocker}`, actor: c.ownerName, createdAt: at(4, 15) })
    if (c.status === 'IN_PROGRESS') activities.push({ subjectType: 'COMMITMENT', subjectId: c.id, action: 'PROGRESS', fromStatus: 'OPEN', toStatus: 'IN_PROGRESS', note: '0% → 60% · Plans agreed with 2 of 4 distributors', actor: c.ownerName, createdAt: at(5, 16) })
    if (c.deliveredAt) activities.push({ subjectType: 'COMMITMENT', subjectId: c.id, action: 'DELIVERED', toStatus: 'DELIVERED', note: c.evidence, actor: c.ownerName, createdAt: c.deliveredAt })
    if (c.acceptedAt) activities.push({ subjectType: 'COMMITMENT', subjectId: c.id, action: 'ACCEPTED', fromStatus: 'DELIVERED', toStatus: 'ACCEPTED', actor: ROLE.president, createdAt: c.acceptedAt })
  }
  for (const r of records.filter((x) => !['ORDER', 'INVOICE', 'PAYMENT', 'STOCK_MOVEMENT'].includes(x.recordType))) {
    activities.push({ subjectType: 'RECORD', subjectId: r.id, action: 'RECEIVED', toStatus: r.status, actor: 'source:DEMO', createdAt: r.occurredAt })
  }
  return { records, meetings, decisions, commitments, activities }
}
