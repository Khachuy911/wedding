// lib/prisma.ts

import { PrismaClient } from "@/prisma/generated"

// Singleton pattern để tránh tạo quá nhiều Prisma Client instances
// Đặc biệt quan trọng trong Next.js development mode (hot reload)
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    })

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma
}
