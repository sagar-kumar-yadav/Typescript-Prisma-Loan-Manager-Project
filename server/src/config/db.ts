import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export default prisma

export async function testConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Database connected successfully!')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error instanceof Error ? error.message : error)
    return false
  }
}