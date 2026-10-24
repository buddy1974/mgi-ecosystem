import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireBriefingPage, canView } from '@/lib/briefing/access'
import { modeFlag } from '@/lib/briefing/mode'

export const dynamic = 'force-dynamic'

// Decision deep link → the meeting page, scrolled to the resolution.
export default async function DecisionLink({ params }: { params: Promise<{ id: string }> }) {
  const access = await requireBriefingPage()
  const { id } = await params
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) notFound()
  const d = await prisma.execDecision.findFirst({ where: { id, isDemo: modeFlag() }, select: { id: true, meetingId: true, companySlug: true } })
  if (!d || !canView(access, d.companySlug)) notFound()
  redirect(`/briefing/meetings/${d.meetingId}#${d.id}`)
}
