import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prismaGlobal = globalThis as typeof globalThis & { __vccPrisma?: PrismaClient };

export const prisma = prismaGlobal.__vccPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  prismaGlobal.__vccPrisma = prisma;
}
