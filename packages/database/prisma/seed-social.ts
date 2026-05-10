import { PrismaNeonHttp } from '@prisma/adapter-neon'
import { PrismaClient, SocialPlatform, SocialPostStatus } from '@prisma/client'
import 'dotenv/config'

const adapter = new PrismaNeonHttp(process.env.DATABASE_URL!, {})
const prisma = new PrismaClient({ adapter } as Parameters<typeof PrismaClient>[0])

function daysFromNow(days: number): Date {
  const d = new Date(); d.setDate(d.getDate() + days); d.setHours(10, 0, 0, 0); return d
}
function daysAgo(days: number): Date {
  const d = new Date(); d.setDate(d.getDate() - days); d.setHours(10, 0, 0, 0); return d
}

const posts = [
  { companyId: 'nmi', platform: SocialPlatform.FACEBOOK, content: "🎓 Inscriptions ouvertes pour la rentrée 2026–2027 ! NMI Education accueille de nouveaux élèves dans tous les cycles. Contactez-nous pour plus d'informations. #NMIEducation #Cameroun #Education", status: SocialPostStatus.PUBLISHED, publishedAt: daysAgo(3), scheduledAt: null, mediaUrls: [] },
  { companyId: 'nmi', platform: SocialPlatform.INSTAGRAM, content: 'Notre équipe enseignante dédiée à l\'excellence 📚✨ Chaque jour, nous formons les leaders de demain. Bienvenue à NMI Education. #NMIEducation #Excellence #Yaoundé', status: SocialPostStatus.SCHEDULED, scheduledAt: daysFromNow(2), publishedAt: null, mediaUrls: [] },
  { companyId: 'nmi', platform: SocialPlatform.LINKEDIN, content: 'NMI Education is proud to announce our new STEM curriculum launching this academic year. We are committed to preparing students for the digital economy. Reach out to learn more about our programs.', status: SocialPostStatus.DRAFT, scheduledAt: null, publishedAt: null, mediaUrls: [] },
  { companyId: 'horeb', platform: SocialPlatform.FACEBOOK, content: '🚛 Horeb Solutions — votre partenaire logistique de confiance. Livraisons sécurisées, à l\'heure, partout au Cameroun. Demandez votre devis aujourd\'hui ! #HorebSolutions #Logistique', status: SocialPostStatus.PUBLISHED, publishedAt: daysAgo(5), scheduledAt: null, mediaUrls: [] },
  { companyId: 'horeb', platform: SocialPlatform.TWITTER, content: 'Notre flotte s\'agrandit ! 2 nouveaux Toyota Hilux rejoignent notre réseau. Fiabilité en mouvement. 🚛 #HorebSolutions #Transport #Cameroun', status: SocialPostStatus.SCHEDULED, scheduledAt: daysFromNow(1), publishedAt: null, mediaUrls: [] },
  { companyId: 'lq', platform: SocialPlatform.INSTAGRAM, content: '📖 Nouvelle arrivage ! Des centaines de titres neufs viennent d\'enrichir notre catalogue. Romans, essais, livres jeunesse — venez découvrir ! #LibrairieduQuartier #Lecture #Douala', status: SocialPostStatus.DRAFT, scheduledAt: null, publishedAt: null, mediaUrls: [] },
  { companyId: 'lq', platform: SocialPlatform.TIKTOK, content: 'Le livre de la semaine 📚 Cette semaine nous vous recommandons "L\'Afrique en marche" — un regard lucide sur notre continent. Disponible en librairie ! #BookTok #Lecture #Cameroun', status: SocialPostStatus.SCHEDULED, scheduledAt: daysFromNow(3), publishedAt: null, mediaUrls: [] },
  { companyId: 'rogers', platform: SocialPlatform.FACEBOOK, content: '💡 "Leadership is not about being in charge. It\'s about taking care of those in your charge." — New episode of CEO On Mission is live. Link in bio. #CEOOnMission #Leadership', status: SocialPostStatus.PUBLISHED, publishedAt: daysAgo(1), scheduledAt: null, mediaUrls: [] },
  { companyId: 'rogers', platform: SocialPlatform.LINKEDIN, content: "Excited to announce that Dominion Life Men's Conference 2026 is officially open for registration. This year's theme: 'Forged for Purpose.' 500 men. One mission. Join us.", status: SocialPostStatus.DRAFT, scheduledAt: null, publishedAt: null, mediaUrls: [] },
  { companyId: 'mgi', platform: SocialPlatform.LINKEDIN, content: 'MGI — Mina-Galeed Invest is expanding its service offering across Cameroon and Central Africa. Legal, Accounting, Digital Transformation, HR, and Project Engineering under one roof. Start well. Grow well.', status: SocialPostStatus.SCHEDULED, scheduledAt: daysFromNow(5), publishedAt: null, mediaUrls: [] },
]

async function main() {
  console.log('Seeding social posts...')
  for (const post of posts) {
    const existing = await prisma.socialPost.findFirst({
      where: { companyId: post.companyId, platform: post.platform, status: post.status },
    })
    if (!existing) {
      await prisma.socialPost.create({ data: post })
      console.log(`  Created: [${post.companyId}] ${post.platform} — ${post.status}`)
    } else {
      console.log(`  Skipped: [${post.companyId}] ${post.platform}`)
    }
  }
  console.log('Done.')
  await prisma.$disconnect()
}

main().catch((e) => { console.error(e); process.exit(1) })
