import { describe, expect, it } from 'vitest';
import {
  createAccessToken,
  createRefreshToken,
  hashRefreshToken,
  verifyAccessToken,
  type AccessTokenConfig,
} from './tokens.js';

const config: AccessTokenConfig = {
  secret: 'test-only-secret-that-is-longer-than-thirty-two-characters',
  ttlSeconds: 60,
};

describe('admin tokens', () => {
  it('signs and verifies the required access-token claims', async () => {
    const issued = await createAccessToken({ adminId: 'admin-1', sessionId: 'session-1' }, config);
    await expect(verifyAccessToken(issued.token, config)).resolves.toEqual({
      adminId: 'admin-1',
      sessionId: 'session-1',
    });
    expect(issued.expiresAt.getTime()).toBeGreaterThan(Date.now());
  });

  it('rejects a token verified with another secret', async () => {
    const issued = await createAccessToken({ adminId: 'admin-1', sessionId: 'session-1' }, config);
    await expect(
      verifyAccessToken(issued.token, { ...config, secret: 'another-test-secret-that-is-over-thirty-two-characters' }),
    ).rejects.toBeTruthy();
  });

  it('creates opaque refresh tokens and deterministic SHA-256 hashes', () => {
    const first = createRefreshToken();
    const second = createRefreshToken();
    expect(first).not.toEqual(second);
    expect(hashRefreshToken(first)).toHaveLength(64);
    expect(hashRefreshToken(first)).toEqual(hashRefreshToken(first));
    expect(hashRefreshToken(first)).not.toEqual(hashRefreshToken(second));
  });
});
