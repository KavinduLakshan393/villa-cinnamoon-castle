import { input } from '@inquirer/prompts';
import { z } from 'zod';
import { normalizeAdminEmail } from '../auth/auth-service.js';
import { hashPassword } from '../auth/password.js';
import { prisma } from '../db/prisma.js';
import { promptForNewPassword } from './prompt-password.js';

const emailSchema = z.string().trim().email().max(320);

async function main() {
  const existingAdmins = await prisma.admin.count();
  if (existingAdmins > 0) {
    throw new Error('Phase 1 allows one administrator. An admin account already exists.');
  }

  const email = await input({
    message: 'Admin email',
    validate: (value) => emailSchema.safeParse(value).success || 'Enter a valid email address.',
  });
  const displayName = await input({
    message: 'Admin display name',
    validate: (value) => {
      const length = value.trim().length;
      return (length >= 2 && length <= 120) || 'Display name must contain 2 to 120 characters.';
    },
  });
  const rawPassword = await promptForNewPassword();
  const passwordHash = await hashPassword(rawPassword);

  const admin = await prisma.admin.create({
    data: {
      email: normalizeAdminEmail(email),
      displayName: displayName.trim(),
      passwordHash,
    },
    select: { email: true, displayName: true },
  });

  console.log(`Administrator created: ${admin.displayName} <${admin.email}>`);
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error instanceof Error ? error.message : error);
    await prisma.$disconnect();
    process.exit(1);
  });
