import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { requireSession } from '@/lib/require-auth'
import type { MessageSource } from '@mgi/database'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  // Re-validates the user against the database (deactivated users get 401)
  const userOrError = await requireSession()
  if (userOrError instanceof NextResponse) return userOrError

  const { searchParams } = new URL(req.url)
  const source = searchParams.get('source')
  const companyId = searchParams.get('company')
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = 20

  const where = {
    isArchived: false,
    ...(source && source !== 'ALL' ? { source: source as MessageSource } : {}),
    ...(companyId ? { companyId } : {}),
  }

  const [messages, total] = await Promise.all([
    prisma.message.findMany({
      where,
      orderBy: { receivedAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
    }),
    prisma.message.count({ where }),
  ])

  return NextResponse.json({ messages, total, page, limit })
}
