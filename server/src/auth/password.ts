import * as argon2 from 'argon2';

export function validateAdminPassword(password: string): string | null {
  if (password.length < 12) return 'Password must contain at least 12 characters.';
  if (password.length > 128) return 'Password must not exceed 128 characters.';
  if (!/[a-z]/u.test(password)) return 'Password must include a lowercase letter.';
  if (!/[A-Z]/u.test(password)) return 'Password must include an uppercase letter.';
  if (!/[0-9]/u.test(password)) return 'Password must include a number.';
  if (!/[^A-Za-z0-9]/u.test(password)) return 'Password must include a symbol.';
  return null;
}

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, { type: argon2.argon2id });
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, password);
  } catch {
    return false;
  }
}
