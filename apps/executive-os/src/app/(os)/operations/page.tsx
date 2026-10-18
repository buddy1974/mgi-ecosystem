import { prisma } from '@mgi/database'
import OperationsClient from './OperationsClient'
import { requirePageUser } from '@/lib/require-auth'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function OperationsPage() {
  await requirePageUser()
  const reports = await prisma.ventureReport.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return <OperationsClient reports={reports} />
}
