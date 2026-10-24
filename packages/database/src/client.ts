import { PrismaNeonHttp } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import { neonConfig, type HTTPQueryOptions } from '@neondatabase/serverless'

// Local development / end-to-end tests only: routes Neon HTTP queries to a local Postgres
// behind a local Neon HTTP proxy (Docker). Loopback URLs only; never active on Vercel.
const localSqlEndpoint = process.env.MGI_LOCAL_SQL_ENDPOINT
if (localSqlEndpoint) {
  if (process.env.VERCEL) throw new Error('MGI_LOCAL_SQL_ENDPOINT must not be set on Vercel')
  if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+\/sql$/.test(localSqlEndpoint)) {
    throw new Error('MGI_LOCAL_SQL_ENDPOINT must be a loopback URL (http://127.0.0.1:<port>/sql)')
  }
  neonConfig.fetchEndpoint = localSqlEndpoint
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const adapter = new PrismaNeonHttp(
    process.env.DATABASE_URL!,
    {} as HTTPQueryOptions<false, false>
  )
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
