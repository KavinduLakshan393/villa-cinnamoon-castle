import type { Prisma } from '@prisma/client';

export function money(value: Prisma.Decimal): number {
  return Number(value.toFixed(2));
}
