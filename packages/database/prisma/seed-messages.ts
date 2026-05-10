import { PrismaNeonHttp } from '@prisma/adapter-neon'
import { PrismaClient, MessageSource } from '@prisma/client'
import 'dotenv/config'

const adapter = new PrismaNeonHttp(process.env.DATABASE_URL!, {})
const prisma = new PrismaClient({ adapter } as Parameters<typeof PrismaClient>[0])

const messages = [
  {
    companyId: 'nmi',
    source: MessageSource.EMAIL,
    fromName: 'Bertrand Kamga',
    fromHandle: 'bertrand@nmieducation.com',
    subject: 'Q2 enrollment numbers — need your sign-off',
    body: `Hi Rogers,\n\nAttached are the Q2 enrollment figures. We're up 18% vs Q1 which is great news. However, I need your sign-off on the revised pricing for the professional certificate track before we publish the new intake.\n\nCan we align this week?\n\nBertrand`,
    receivedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    aiActToday: true,
    aiSummary: 'Bertrand needs sign-off on revised pricing for the NMI professional certificate track. Q2 enrollment is up 18%. Action required before new intake opens.',
    aiDraft: `Hi Bertrand,\n\nThank you for the positive enrollment numbers — 18% growth is excellent.\n\nI've reviewed the revised pricing structure. I'm aligned on the professional certificate track pricing. Please proceed with publishing the new intake schedule.\n\nLet's touch base Thursday to review the full Q2 report.\n\nRogers`,
  },
  {
    companyId: 'horeb',
    source: MessageSource.WHATSAPP,
    fromName: 'Jean-Paul Ondoa',
    fromHandle: '+237699123456',
    subject: null,
    body: `Rogers, the client in Douala is asking about the delivery timeline for the Bonabéri warehouse logistics contract. They want confirmation by end of week. Should I quote 3 weeks or 4?`,
    receivedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    aiActToday: true,
    aiSummary: 'Horeb Solutions client in Douala (Bonabéri warehouse) needs delivery timeline confirmation. Jean-Paul is asking whether to quote 3 or 4 weeks. Decision needed by end of week.',
    aiDraft: `Jean-Paul, quote 3 weeks with a 4-week buffer clause in the contract. Confirm with the operations team first that we have capacity, then send the client a formal proposal by Thursday.`,
  },
  {
    companyId: 'lq',
    source: MessageSource.INSTAGRAM,
    fromName: 'amira.reads',
    fromHandle: '@amira.reads',
    subject: null,
    body: `Bonjour! Est-ce que vous avez "L'Alchimiste" de Paulo Coelho en stock? Et est-ce que vous faites des livraisons à Yaoundé centre?`,
    receivedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    aiActToday: false,
    aiSummary: 'Instagram DM asking about stock availability of "L\'Alchimiste" by Paulo Coelho and delivery options to Yaoundé centre.',
    aiDraft: `Bonjour Amira! Oui, nous avons "L'Alchimiste" en stock. Nous livrons effectivement à Yaoundé centre. N'hésitez pas à passer commande sur notre page ou à nous appeler pour finaliser votre commande. Bonne lecture! 📚`,
  },
  {
    companyId: 'mgi',
    source: MessageSource.LINKEDIN,
    fromName: 'Sophie Menchum',
    fromHandle: 'sophie-menchum',
    subject: 'Partnership inquiry — digital transformation project',
    body: `Dear Mr. Nforgwei,\n\nI'm the CEO of TechBridge Cameroon. We've been following MGI's digital transformation work and would love to explore a potential partnership on a MINPOSTEL-funded SME digitalization project.\n\nWould you have 30 minutes for a call next week?\n\nBest regards,\nSophie Menchum`,
    receivedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    aiActToday: false,
    aiSummary: 'LinkedIn message from Sophie Menchum (CEO, TechBridge Cameroon) proposing a partnership on a MINPOSTEL-funded SME digitalization project. Requesting a 30-min call next week.',
    aiDraft: `Dear Sophie,\n\nThank you for reaching out. I've been following TechBridge's work and I'd welcome the conversation.\n\nI'm available Tuesday or Wednesday afternoon next week. Feel free to book a slot via my calendar link or suggest a time that works for you.\n\nLooking forward to connecting.\n\nRogers Nforgwei`,
  },
  {
    companyId: 'nmi',
    source: MessageSource.FACEBOOK,
    fromName: 'Parent - Fouda Eric',
    fromHandle: 'fouda.eric.parent',
    subject: null,
    body: `Bonjour, mon fils est inscrit en classe de Terminale chez NMI. Je n'ai pas encore reçu son bulletin du 2ème trimestre. Est-ce normal? Merci`,
    receivedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    aiActToday: false,
    aiSummary: 'Parent of a Terminale student asking about missing 2nd trimester report card. Should be routed to NMI administration team.',
    aiDraft: `Bonjour M. Fouda, merci de nous avoir contacté. Les bulletins du 2ème trimestre sont en cours de finalisation. Votre fils pourra le récupérer à l'administration dès lundi prochain. Pour toute urgence, contactez-nous au numéro de l'établissement. Cordialement, Équipe NMI Education`,
  },
]

async function main() {
  console.log('Seeding messages...')
  for (const msg of messages) {
    const key = `seed-${msg.companyId}-${msg.source}-${msg.fromHandle}`
    const existing = await prisma.message.findUnique({ where: { externalId: key } })
    if (!existing) {
      await prisma.message.create({ data: { ...msg, externalId: key } })
      console.log(`  Created: ${msg.fromName}`)
    } else {
      console.log(`  Skipped (exists): ${msg.fromName}`)
    }
  }
  console.log('Done.')
}

main().catch(console.error).finally(() => prisma.$disconnect())
