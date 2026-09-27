import { describe, expect, it } from 'vitest';
import { hashPassword, validateAdminPassword, verifyPassword } from './password.js';

describe('admin password security', () => {
  it('enforces the phase-1 password policy', () => {
    expect(validateAdminPassword('short')).toBeTruthy();
    expect(validateAdminPassword('alllowercase123!')).toBeTruthy();
    expect(validateAdminPassword('Valid-Admin-Password-42!')).toBeNull();
  });

  it('hashes with Argon2id and verifies without exposing the password', async () => {
    const password = 'Valid-Admin-Password-42!';
    const hash = await hashPassword(password);
    expect(hash).toMatch(/^\$argon2id\$/u);
    await expect(verifyPassword(hash, password)).resolves.toBe(true);
    await expect(verifyPassword(hash, 'wrong-password')).resolves.toBe(false);
    expect(hash).not.toContain(password);
  });
});
