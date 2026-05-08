import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@mgi/database'
import { auth } from '@/auth'
import type { MessageSource } from '@mgi/database'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

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
