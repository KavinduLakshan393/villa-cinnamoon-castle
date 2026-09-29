import type { Request, Response } from 'express';
import type { AppEnv } from '../config/env.js';

export const ACCESS_COOKIE_NAME = 'vcc_admin_access';
export const REFRESH_COOKIE_NAME = 'vcc_admin_refresh';

function cookieBase(env: AppEnv) {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
  };
}

export function setAccessCookie(response: Response, token: string, expiresAt: Date, env: AppEnv): void {
  response.cookie(ACCESS_COOKIE_NAME, token, {
    ...cookieBase(env),
    path: '/api',
    expires: expiresAt,
  });
}

export function setRefreshCookie(response: Response, token: string, expiresAt: Date, env: AppEnv): void {
  response.cookie(REFRESH_COOKIE_NAME, token, {
    ...cookieBase(env),
    path: '/api/auth',
    expires: expiresAt,
  });
}

export function clearAuthCookies(response: Response, env: AppEnv): void {
  response.clearCookie(ACCESS_COOKIE_NAME, { ...cookieBase(env), path: '/api' });
  response.clearCookie(REFRESH_COOKIE_NAME, { ...cookieBase(env), path: '/api/auth' });
}

export function readCookie(request: Request, name: string): string | null {
  const header = request.headers.cookie;
  if (!header) return null;
  for (const part of header.split(';')) {
    const separator = part.indexOf('=');
    if (separator < 0) continue;
    if (part.slice(0, separator).trim() !== name) continue;
    try {
      return decodeURIComponent(part.slice(separator + 1).trim());
    } catch {
      return null;
    }
  }
  return null;
}
