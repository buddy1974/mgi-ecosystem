import { PrismaNeonHttp } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import { neonConfig, type HTTPQueryOptions } from '@neondatabase/serverless'

// LOCAL PRESENTATION DEMO ONLY (branch demo/exos-local — never merge).
// Routes Neon HTTP queries to a local Postgres + neon HTTP proxy in Docker.
// Active only when MGI_LOCAL_DEMO_SQL_ENDPOINT is set to a loopback URL.
const demoEndpoint = process.env.MGI_LOCAL_DEMO_SQL_ENDPOINT
if (demoEndpoint) {
  if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+\/sql$/.test(demoEndpoint)) {
    throw new Error('MGI_LOCAL_DEMO_SQL_ENDPOINT must be a loopback URL (http://127.0.0.1:<port>/sql)')
  }
  neonConfig.fetchEndpoint = demoEndpoint
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
