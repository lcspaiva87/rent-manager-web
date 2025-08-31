// Importa o client Prisma gerado em prisma/schema.prisma (output custom em lib/generated/prisma)
import { PrismaClient } from '@/lib/generated/prisma';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Ajuste níveis válidos de log (ex.: 'query', 'info', 'warn', 'error')
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
