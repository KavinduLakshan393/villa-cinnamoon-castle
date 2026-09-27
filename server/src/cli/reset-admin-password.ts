import { input } from '@inquirer/prompts';
import { z } from 'zod';
import { normalizeAdminEmail } from '../auth/auth-service.js';
import { hashPassword } from '../auth/password.js';
import { prisma } from '../db/prisma.js';
import { promptForNewPassword } from './prompt-password.js';

const emailSchema = z.string().trim().email().max(320);

async function main() {
  const email = await input({
    message: 'Admin email',
    validate: (value) => emailSchema.safeParse(value).success || 'Enter a valid email address.',
  });
  const admin = await prisma.admin.findUnique({ where: { email: normalizeAdminEmail(email) } });
  if (!admin) throw new Error('No administrator exists with that email address.');

  const rawPassword = await promptForNewPassword();
  const passwordHash = await hashPassword(rawPassword);
  const now = new Date();
  const sessions = await prisma.adminSession.findMany({ where: { adminId: admin.id }, select: { id: true } });
  const sessionIds = sessions.map((session) => session.id);

  await prisma.$transaction([
    prisma.admin.update({ where: { id: admin.id }, data: { passwordHash } }),
    prisma.adminSession.updateMany({
      where: { id: { in: sessionIds }, revokedAt: null },
      data: { revokedAt: now },
    }),
    prisma.refreshToken.updateMany({
      where: { adminSessionId: { in: sessionIds }, revokedAt: null },
      data: { revokedAt: now },
    }),
  ]);

  console.log('Admin password updated. All existing sessions have been revoked.');
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error instanceof Error ? error.message : error);
    await prisma.$disconnect();
    process.exit(1);
  });
