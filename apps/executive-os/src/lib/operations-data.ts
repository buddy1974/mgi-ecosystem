import { prisma } from '@mgi/database'

export async function getNewOperationsCount(): Promise<number> {
  return prisma.ventureReport.count({ where: { status: 'new' } })
}
