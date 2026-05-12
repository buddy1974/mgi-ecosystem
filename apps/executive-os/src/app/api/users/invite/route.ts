import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { auth } from '@/auth'
import { triggerN8nWorkflow } from '@/lib/n8n'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { email, name, role } = await req.json()
  if (!email || !role) {
    return NextResponse.json({ error: 'Email and role required' }, { status: 400 })
  }

  const inviteToken   = crypto.randomBytes(32).toString('hex')
  const inviteExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const user = await prisma.user.upsert({
    where:  { email },
    update: { inviteToken, inviteExpires, status: 'invited', name },
    create: { email, name, status: 'invited', inviteToken, inviteExpires },
  })

  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://os.mgi-ventures.com'}/auth/accept-invite?token=${inviteToken}`

  triggerN8nWorkflow('mgi-approval-alert', {
    title:       `You've been invited to MGI Executive OS`,
    requestedBy: (session.user as { name?: string })?.name ?? 'The MGI Team',
    entity:      'MGI Executive OS',
    priority:    'normal',
    reviewUrl:   inviteUrl,
  }).catch(console.error)

  return NextResponse.json({ success: true, userId: user.id, inviteUrl })
}
