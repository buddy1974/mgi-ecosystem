import { PrismaNeonHttp } from '@prisma/adapter-neon'
import { PrismaClient, ApprovalCategory, ApprovalPriority } from '@prisma/client'
import 'dotenv/config'

const adapter = new PrismaNeonHttp(process.env.DATABASE_URL!, {})
const prisma = new PrismaClient({ adapter } as Parameters<typeof PrismaClient>[0])

const approvals = [
  {
    companyId: 'nmi',
    category: ApprovalCategory.FINANCE,
    title: 'Q3 Marketing Budget — NMI Education',
    description: 'Approve revised Q3 marketing spend for NMI Education. Includes Facebook ads campaign for professional certificate intake (XAF 1.2M), billboard placements in Yaoundé centre (XAF 800K), and influencer partnerships (XAF 400K). Previous Q3 budget was XAF 1.8M — this is an increase of XAF 600K driven by the new professional track launch.',
    amount: 2400000,
    currency: 'XAF',
    requestedBy: 'Bertrand Kamga',
    requestedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 14 * 60 * 60 * 1000),
    priority: ApprovalPriority.CRITICAL,
    n8nWorkflow: 'WF-0042',
    aiAnalysis: 'Budget increase of 33% is justified by the professional certificate launch. Facebook ROI from Q2 was 4.2x. Billboard placements in Yaoundé centre align with target demographic. Recommend approval with a cap review at 60 days. Risk: LOW.',
    aiRisk: 'LOW',
  },
  {
    companyId: 'horeb',
    category: ApprovalCategory.PROCUREMENT,
    title: 'Fleet Vehicle Lease — 2× Toyota Hilux',
    description: 'Horeb Solutions requires 2 additional Toyota Hilux pickups for the Bonabéri logistics contract. Proposed lease: 36 months at XAF 285,000/month per vehicle (total XAF 570,000/month). Supplier: Cameroun Auto SARL, Douala. Required for contract start date June 15.',
    amount: 570000,
    currency: 'XAF',
    requestedBy: 'Jean-Paul Ondoa',
    requestedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 - 6 * 60 * 60 * 1000),
    priority: ApprovalPriority.CRITICAL,
    n8nWorkflow: 'WF-0039',
    aiAnalysis: 'Contract revenue from Bonabéri client is XAF 2.1M/month. Vehicle lease cost is 27% of contract value — within acceptable operating cost threshold. Supplier Cameroun Auto SARL has existing relationship with MGI. Recommend approval. Risk: LOW.',
    aiRisk: 'LOW',
  },
  {
    companyId: 'lq',
    category: ApprovalCategory.HIRING,
    title: 'New Sales Associate — Librairie du Quartier',
    description: 'Request to hire one full-time sales associate for the Yaoundé Bastos location. Salary: XAF 120,000/month. Candidate: Emile Fopa, 23, licence in Lettres Modernes from UYI. Start date proposed: June 1. Headcount budget for LQ in 2026 allows 1 additional hire.',
    amount: 120000,
    currency: 'XAF',
    requestedBy: 'Store Manager LQ',
    requestedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    priority: ApprovalPriority.NORMAL,
    n8nWorkflow: 'WF-0051',
    aiAnalysis: 'Within approved headcount budget. Candidate profile matches role requirements. XAF 120K/month is market rate for this position. No financial risk. Recommend straightforward approval. Risk: LOW.',
    aiRisk: 'LOW',
  },
  {
    companyId: 'rogers',
    category: ApprovalCategory.MARKETING,
    title: 'Speaking Engagement — Douala Business Forum',
    description: 'Request to accept speaking invitation at the Douala Business Forum, July 18. Organiser offering XAF 500K honorarium. Requires travel + 2-night hotel (est. XAF 180K). Net: XAF 320K. Topic proposed: "AI-powered leadership for African CEOs." Rogers\' PA recommends accepting for brand visibility and lead generation for CEO On Mission program.',
    amount: 500000,
    currency: 'XAF',
    requestedBy: 'Rogers PA',
    requestedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    priority: ApprovalPriority.NORMAL,
    n8nWorkflow: 'WF-0047',
    aiAnalysis: 'Positive ROI: XAF 320K net after expenses. Topic aligns with CEO On Mission program positioning. Douala Business Forum 2025 had 340 attendees, 60% C-suite. Recommend accepting. Suggest confirming AV setup for slide deck in advance. Risk: LOW.',
    aiRisk: 'LOW',
  },
  {
    companyId: 'dros',
    category: ApprovalCategory.PROCUREMENT,
    title: 'Geotech Survey — DROS Bafoussam Site',
    description: 'Approval required for geotechnical survey of the Bafoussam construction site before foundation work begins. Contractor: Sol Ingénierie Cameroun. Quote: XAF 1,850,000. Turnaround: 3 weeks. Report required before bank will release first tranche of project financing.',
    amount: 1850000,
    currency: 'XAF',
    requestedBy: 'DROS Site Manager',
    requestedAt: new Date(Date.now() - 26 * 60 * 60 * 1000),
    priority: ApprovalPriority.HIGH,
    n8nWorkflow: 'WF-0044',
    aiAnalysis: 'Geotech survey is a hard prerequisite for bank financing release. Delaying risks 3+ week project slip. Sol Ingénierie Cameroun is an accredited contractor. XAF 1.85M is within industry rate for this survey size. CRITICAL path item — recommend immediate approval. Risk: MEDIUM (project delays if rejected).',
    aiRisk: 'MEDIUM',
  },
  {
    companyId: 'mgi',
    category: ApprovalCategory.LEGAL,
    title: 'Partnership Agreement — TechBridge Cameroon',
    description: 'MGI and TechBridge Cameroon have agreed in principle to collaborate on the MINPOSTEL SME digitalization project. Legal has drafted a partnership agreement. Key terms: revenue share 60/40 (MGI/TechBridge), 18-month initial term, MGI holds IP rights on any software developed. Legal review complete. Ready for CEO signature.',
    amount: null,
    currency: 'XAF',
    requestedBy: 'MGI Legal Team',
    requestedAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
    priority: ApprovalPriority.HIGH,
    n8nWorkflow: 'WF-0053',
    aiAnalysis: '60/40 revenue split is standard for this type of government project. IP retention clause is well-drafted. TechBridge Cameroon is reputable (verified via RCCM). Only flag: clause 7.3 on exit terms should be reviewed — current wording allows TechBridge to exit with 30 days notice with no penalty. Recommend approval with minor clause 7.3 revision. Risk: MEDIUM.',
    aiRisk: 'MEDIUM',
  },
]

async function main() {
  console.log('Seeding approvals...')
  for (const approval of approvals) {
    const existing = await prisma.approval.findFirst({
      where: { title: approval.title, companyId: approval.companyId },
    })
    if (!existing) {
      await prisma.approval.create({ data: approval })
      console.log(`  Created: ${approval.title.slice(0, 50)}`)
    } else {
      console.log(`  Skipped: ${approval.title.slice(0, 50)}`)
    }
  }
  console.log('Done.')
}

main().catch(console.error).finally(() => prisma.$disconnect())
