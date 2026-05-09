import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@mgi/database'

let cachedBriefing: { text: string; generatedAt: Date } | null = null
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

async function getBriefingContext(): Promise<string> {
  const now = new Date()
  const todayEnd = new Date()
  todayEnd.setHours(23, 59, 59, 999)

  const [
    pendingApprovals,
    criticalApprovals,
    unreadMessages,
    todayEvents,
    scheduledPosts,
    pendingBookings,
  ] = await Promise.all([
    prisma.approval.count({ where: { status: 'PENDING' } }).catch(() => 0),
    prisma.approval.count({ where: { status: 'PENDING', priority: 'CRITICAL' } }).catch(() => 0),
    prisma.message.count({ where: { isRead: false, isArchived: false } }).catch(() => 0),
    prisma.event.findMany({
      where: { startAt: { gte: now, lte: todayEnd }, status: { not: 'CANCELLED' } },
      orderBy: { startAt: 'asc' },
      select: { title: true, startAt: true, companyId: true },
    }).catch(() => []),
    prisma.socialPost.count({ where: { status: 'SCHEDULED' } }).catch(() => 0),
    prisma.bookingRequest.count({ where: { status: 'PENDING' } }).catch(() => 0),
  ])

  const todayEventsList = todayEvents
    .map((e) => {
      const time = e.startAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      const company = e.companyId ? `[${e.companyId.toUpperCase()}]` : '[CEO]'
      return `${time} ${company} ${e.title}`
    })
    .join(', ')

  const today = now.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return `
Date: ${today}

LIVE ECOSYSTEM DATA:
- Pending approvals: ${pendingApprovals} total (${criticalApprovals} CRITICAL)
- Unread messages: ${unreadMessages}
- Today's calendar: ${todayEvents.length} event${todayEvents.length !== 1 ? 's' : ''}${todayEvents.length > 0 ? ` — ${todayEventsList}` : ''}
- Scheduled social posts: ${scheduledPosts}
- Pending booking requests: ${pendingBookings}
`.trim()
}

export async function getAIBriefing(): Promise<string | null> {
  if (cachedBriefing && Date.now() - cachedBriefing.generatedAt.getTime() < CACHE_TTL_MS) {
    return cachedBriefing.text
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.warn('[AI Briefing] ANTHROPIC_API_KEY not set — skipping briefing generation')
    return null
  }

  try {
    const context = await getBriefingContext()
    const client = new Anthropic({ apiKey })

    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: `You are the AI Chief of Staff for Rogers Nforgwei, CEO of the MGI ecosystem — a group of 6 ventures in Cameroon (NMI Education, Horeb Solutions, Librairie du Quartier, DROS Construction, Rogers Nforgwei personal brand, and MGI Holding).

Write a concise executive briefing for Rogers based on the following live data. Be direct, specific, and action-oriented. 4–5 sentences maximum. Write in the second person ("You have...", "Today..."). Do not use bullet points — write in flowing prose. Highlight what needs attention most urgently.

${context}

Write the briefing now:`,
        },
      ],
    })

    const firstBlock = message.content[0]
    const text = firstBlock.type === 'text' ? firstBlock.text : null
    if (!text) return null

    cachedBriefing = { text, generatedAt: new Date() }
    return text
  } catch (error) {
    console.error('[AI Briefing] Generation failed:', error)
    return cachedBriefing?.text ?? null
  }
}
