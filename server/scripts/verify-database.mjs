import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const [admins, sessions, refreshTokens, stayOptions, packageVariants, inquiries, quoteLines] = await Promise.all([
    prisma.admin.count(),
    prisma.adminSession.count(),
    prisma.refreshToken.count(),
    prisma.stayOption.count(),
    prisma.packageVariant.count(),
    prisma.inquiry.count(),
    prisma.inquiryQuoteLine.count(),
  ]);

  const variantGroups = await prisma.stayOption.findMany({
    orderBy: [{ stayType: 'asc' }, { displayOrder: 'asc' }],
    select: {
      code: true,
      stayType: true,
      variants: {
        orderBy: { displayOrder: 'asc' },
        select: { code: true },
      },
    },
  });

  console.log(
    JSON.stringify(
      {
        connected: true,
        counts: { admins, sessions, refreshTokens, stayOptions, packageVariants, inquiries, quoteLines },
        stayOptions: variantGroups.map((option) => ({
          code: option.code,
          stayType: option.stayType,
          variantCount: option.variants.length,
        })),
      },
      null,
      2,
    ),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error instanceof Error ? error.message : error);
    await prisma.$disconnect();
    process.exit(1);
  });
