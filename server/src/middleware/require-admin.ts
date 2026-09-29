import type { NextFunction, Request, Response } from 'express';
import type { AuthService } from '../auth/auth-service.js';
import { ACCESS_COOKIE_NAME, readCookie } from '../auth/cookies.js';
import { HttpError } from '../lib/http-error.js';

export function requireAdmin(authService: AuthService) {
  return async function adminAuthentication(request: Request, _response: Response, next: NextFunction) {
    try {
      const accessToken = readCookie(request, ACCESS_COOKIE_NAME);
      if (!accessToken) throw new HttpError(401, 'AUTHENTICATION_REQUIRED', 'Authentication is required.');
      const admin = await authService.authenticate(accessToken);
      request.adminAuth = {
        adminId: admin.id,
        sessionId: admin.sessionId,
        email: admin.email,
        displayName: admin.displayName,
      };
      next();
    } catch (error) {
      next(error);
    }
  };
}
