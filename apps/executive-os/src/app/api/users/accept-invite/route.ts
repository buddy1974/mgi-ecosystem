import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 100_000, 64, 'sha512').toString('hex')
  return `${salt}:${hash}`
}

export async function POST(req: NextRequest) {
  const { token, password } = await req.json()

  if (!token || !password || password.length < 8) {
    return NextResponse.json({ error: 'Token and password (min 8 chars) required' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { inviteToken: token } })

  if (!user || !user.inviteExpires || user.inviteExpires < new Date()) {
    return NextResponse.json({ error: 'Invalid or expired invite link' }, { status: 400 })
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password:      hashPassword(password),
      status:        'active',
      inviteToken:   null,
      inviteExpires: null,
    },
  })

  return NextResponse.json({ success: true })
}
