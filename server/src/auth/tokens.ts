import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { jwtVerify, SignJWT } from 'jose';
import type { AppEnv } from '../config/env.js';

const ACCESS_TOKEN_ALGORITHM = 'HS256';
const ACCESS_TOKEN_ISSUER = 'villa-cinnamoon-castle-api';
const ACCESS_TOKEN_AUDIENCE = 'villa-cinnamoon-castle-admin';

export interface AccessTokenConfig {
  secret: string;
  ttlSeconds: number;
}

export interface AccessTokenClaims {
  adminId: string;
  sessionId: string;
}

export function accessTokenConfigFromEnv(env: AppEnv): AccessTokenConfig {
  return {
    secret: env.AUTH_ACCESS_TOKEN_SECRET,
    ttlSeconds: env.AUTH_ACCESS_TOKEN_TTL_MINUTES * 60,
  };
}

function signingKey(secret: string): Uint8Array {
  return new TextEncoder().encode(secret);
}

export async function createAccessToken(
  claims: AccessTokenClaims,
  config: AccessTokenConfig,
): Promise<{ token: string; expiresAt: Date }> {
  const now = Math.floor(Date.now() / 1000);
  const expiresAtSeconds = now + config.ttlSeconds;
  const token = await new SignJWT({ sessionId: claims.sessionId })
    .setProtectedHeader({ alg: ACCESS_TOKEN_ALGORITHM, typ: 'JWT' })
    .setIssuer(ACCESS_TOKEN_ISSUER)
    .setAudience(ACCESS_TOKEN_AUDIENCE)
    .setSubject(claims.adminId)
    .setJti(randomUUID())
    .setIssuedAt(now)
    .setExpirationTime(expiresAtSeconds)
    .sign(signingKey(config.secret));

  return { token, expiresAt: new Date(expiresAtSeconds * 1000) };
}

export async function verifyAccessToken(token: string, config: AccessTokenConfig): Promise<AccessTokenClaims> {
  const { payload } = await jwtVerify(token, signingKey(config.secret), {
    algorithms: [ACCESS_TOKEN_ALGORITHM],
    issuer: ACCESS_TOKEN_ISSUER,
    audience: ACCESS_TOKEN_AUDIENCE,
    requiredClaims: ['sub', 'exp', 'iat', 'jti'],
  });

  if (typeof payload.sub !== 'string' || typeof payload.sessionId !== 'string') {
    throw new Error('Access token claims are incomplete.');
  }

  return { adminId: payload.sub, sessionId: payload.sessionId };
}

export function createRefreshToken(): string {
  return randomBytes(48).toString('base64url');
}

export function hashRefreshToken(token: string): string {
  return createHash('sha256').update(token, 'utf8').digest('hex');
}
