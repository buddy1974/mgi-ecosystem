import { prisma } from '@mgi/database'
import OperationsClient from './OperationsClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function OperationsPage() {
  const reports = await prisma.ventureReport.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return <OperationsClient reports={reports} />
}
