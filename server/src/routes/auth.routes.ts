import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { z } from 'zod';
import { AuthService } from '../auth/auth-service.js';
import {
  clearAuthCookies,
  readCookie,
  REFRESH_COOKIE_NAME,
  setAccessCookie,
  setRefreshCookie,
} from '../auth/cookies.js';
import type { AppEnv } from '../config/env.js';
import { HttpError } from '../lib/http-error.js';
import { requireAdmin } from '../middleware/require-admin.js';

const loginSchema = z.object({
  email: z.string().trim().email().max(320),
  password: z.string().min(1).max(128),
});

function parseLoginBody(value: unknown) {
  const result = loginSchema.safeParse(value);
  if (!result.success) throw new HttpError(400, 'INVALID_LOGIN_INPUT', 'Enter a valid email and password.');
  return result.data;
}

function authResponse(issued: Awaited<ReturnType<AuthService['login']>>) {
  return {
    admin: issued.admin,
    accessTokenExpiresAt: issued.accessTokenExpiresAt.toISOString(),
    refreshTokenExpiresAt: issued.refreshTokenExpiresAt.toISOString(),
  };
}

export function createAuthRouter(authService: AuthService, env: AppEnv): Router {
  const router = Router();
  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    message: { error: { code: 'LOGIN_RATE_LIMITED', message: 'Too many sign-in attempts. Try again later.' } },
  });
  const refreshLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 60,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: { code: 'REFRESH_RATE_LIMITED', message: 'Too many refresh attempts. Try again later.' } },
  });

  router.post('/login', loginLimiter, async (request, response) => {
    const credentials = parseLoginBody(request.body);
    const issued = await authService.login(credentials.email, credentials.password, request.get('user-agent'));
    setAccessCookie(response, issued.accessToken, issued.accessTokenExpiresAt, env);
    setRefreshCookie(response, issued.refreshToken, issued.refreshTokenExpiresAt, env);
    response.status(200).json(authResponse(issued));
  });

  router.post('/refresh', refreshLimiter, async (request, response) => {
    const refreshToken = readCookie(request, REFRESH_COOKIE_NAME);
    if (!refreshToken) {
      clearAuthCookies(response, env);
      throw new HttpError(401, 'REFRESH_TOKEN_REQUIRED', 'Your session has expired. Please sign in again.');
    }
    try {
      const issued = await authService.refresh(refreshToken);
      setAccessCookie(response, issued.accessToken, issued.accessTokenExpiresAt, env);
      setRefreshCookie(response, issued.refreshToken, issued.refreshTokenExpiresAt, env);
      response.status(200).json(authResponse(issued));
    } catch (error) {
      clearAuthCookies(response, env);
      throw error;
    }
  });

  router.post('/logout', async (request, response) => {
    await authService.logoutByRefreshToken(readCookie(request, REFRESH_COOKIE_NAME));
    clearAuthCookies(response, env);
    response.status(204).send();
  });

  router.get('/me', requireAdmin(authService), (request, response) => {
    const admin = request.adminAuth!;
    response.status(200).json({
      admin: { id: admin.adminId, email: admin.email, displayName: admin.displayName },
    });
  });

  return router;
}
