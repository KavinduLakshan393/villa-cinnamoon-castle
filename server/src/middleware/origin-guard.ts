import type { NextFunction, Request, Response } from 'express';
import type { AppEnv } from '../config/env.js';
import { HttpError } from '../lib/http-error.js';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

export function originGuard(env: AppEnv) {
  return function verifyOrigin(request: Request, _response: Response, next: NextFunction) {
    if (SAFE_METHODS.has(request.method)) return next();
    const origin = request.get('origin');
    if (origin && origin !== env.FRONTEND_ORIGIN) {
      return next(new HttpError(403, 'ORIGIN_NOT_ALLOWED', 'Request origin is not allowed.'));
    }
    return next();
  };
}
