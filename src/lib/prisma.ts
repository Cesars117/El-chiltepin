import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // @ts-ignore - Prisma 7 might need specific config depending on the provider, 
    // but this should work for local sqlite dev.
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
