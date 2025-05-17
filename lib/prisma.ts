import { PrismaClient, Prisma } from '@prisma/client'

// Singleton pattern for Prisma Client
declare global {
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma

// Export the Prisma client instance
export default prisma

// Export Prisma namespace (for types like Prisma.ArticlesCreateInput)
export { Prisma }

// Export model types through the Prisma namespace
export type Articles = Prisma.ArticlesGetPayload<{}>
export type User = Prisma.UserGetPayload<{}>
export type Like = Prisma.LikeGetPayload<{}>
export type Comment = Prisma.CommentGetPayload<{}>