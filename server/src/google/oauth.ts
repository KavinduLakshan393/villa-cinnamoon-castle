import { randomUUID } from 'node:crypto';
import { jwtVerify, SignJWT } from 'jose';
import type { AppEnv } from '../config/env.js';

export const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/business.manage';
const AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const REVOKE_URL = 'https://oauth2.googleapis.com/revoke';

const STATE_ISSUER = 'villa-cinnamoon-castle-api';
const STATE_AUDIENCE = 'google-oauth-callback';
const STATE_TTL_SECONDS = 10 * 60;

export interface GoogleOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

/** Null when the Google credentials are not set in the server environment. */
export function googleOAuthConfig(env: AppEnv): GoogleOAuthConfig | null {
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET || !env.GOOGLE_REDIRECT_URI) return null;
  return { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET, redirectUri: env.GOOGLE_REDIRECT_URI };
}

/** Raised for OAuth failures whose Google error code the caller may act on. */
export class GoogleOAuthError extends Error {
  constructor(
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'GoogleOAuthError';
  }
}

export interface OAuthState {
  adminId: string;
  returnTo: string;
}

const stateKey = (secret: string) => new TextEncoder().encode(secret);

/**
 * The callback arrives from Google as a cross-site navigation, so the admin's
 * SameSite=Strict cookies are not sent with it. The signed, short-lived state
 * proves the flow was started by a signed-in administrator.
 */
export async function signState(state: OAuthState, secret: string): Promise<string> {
  return new SignJWT({ returnTo: state.returnTo })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuer(STATE_ISSUER)
    .setAudience(STATE_AUDIENCE)
    .setSubject(state.adminId)
    .setJti(randomUUID())
    .setIssuedAt()
    .setExpirationTime(`${STATE_TTL_SECONDS}s`)
    .sign(stateKey(secret));
}

export async function verifyState(token: string, secret: string): Promise<OAuthState> {
  const { payload } = await jwtVerify(token, stateKey(secret), {
    algorithms: ['HS256'],
    issuer: STATE_ISSUER,
    audience: STATE_AUDIENCE,
    requiredClaims: ['sub', 'exp'],
  });
  if (typeof payload.sub !== 'string' || typeof payload.returnTo !== 'string') {
    throw new Error('OAuth state is incomplete.');
  }
  return { adminId: payload.sub, returnTo: payload.returnTo };
}

export function buildAuthUrl(config: GoogleOAuthConfig, state: string): string {
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    scope: GOOGLE_SCOPE,
    access_type: 'offline',
    // Always ask again so Google issues a fresh refresh token on reconnect.
    prompt: 'consent',
    include_granted_scopes: 'true',
    state,
  });
  return `${AUTH_URL}?${params.toString()}`;
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}

async function postToken(body: Record<string, string>, fetchImpl: typeof fetch): Promise<TokenResponse> {
  const response = await fetchImpl(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body: new URLSearchParams(body).toString(),
  });
  const payload = (await response.json().catch(() => ({}))) as Partial<TokenResponse> & {
    error?: string;
    error_description?: string;
  };
  if (!response.ok || !payload.access_token) {
    throw new GoogleOAuthError(payload.error ?? 'token_request_failed', payload.error_description ?? 'Google did not issue a token.');
  }
  return payload as TokenResponse;
}

export function exchangeCode(config: GoogleOAuthConfig, code: string, fetchImpl: typeof fetch = fetch) {
  return postToken(
    {
      code,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: config.redirectUri,
      grant_type: 'authorization_code',
    },
    fetchImpl,
  );
}

/** A fresh access token. `invalid_grant` means the owner must reconnect. */
export async function refreshAccessToken(
  config: GoogleOAuthConfig,
  refreshToken: string,
  fetchImpl: typeof fetch = fetch,
): Promise<string> {
  const token = await postToken(
    {
      refresh_token: refreshToken,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: 'refresh_token',
    },
    fetchImpl,
  );
  return token.access_token;
}

/** Best effort: the stored connection is removed whether or not Google confirms. */
export async function revokeToken(token: string, fetchImpl: typeof fetch = fetch): Promise<void> {
  await fetchImpl(REVOKE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ token }).toString(),
  }).catch(() => undefined);
}
