import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import type { PrismaClient } from '@prisma/client';
import { AuthService } from './auth/auth-service.js';
import type { AppEnv } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';
import { originGuard } from './middleware/origin-guard.js';
import { requireAdmin } from './middleware/require-admin.js';
import { createAuthRouter } from './routes/auth.routes.js';
import { createHealthRouter } from './routes/health.routes.js';
import { createAdminInquiriesRouter, createPublicInquiriesRouter } from './routes/inquiries.routes.js';
import {
  createAdminPackagesRouter,
  createAdminPackageVariantsRouter,
  createPublicPackagesRouter,
} from './routes/packages.routes.js';

export function createApp(env: AppEnv, database: PrismaClient): Express {
  const app = express();
  const authService = new AuthService(database, env);

  app.disable('x-powered-by');
  if (env.TRUST_PROXY) app.set('trust proxy', 1);

  app.use(helmet());
  app.use(
    cors({
      origin: env.FRONTEND_ORIGIN,
      credentials: true,
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
  );
  app.use(originGuard(env));
  app.use(express.json({ limit: '32kb' }));

  app.use('/api/health', createHealthRouter(database));
  app.use('/api/auth', createAuthRouter(authService, env));
  app.use('/api/packages', createPublicPackagesRouter(database));
  app.use('/api/inquiries', createPublicInquiriesRouter(database));
  app.use('/api/admin/packages', requireAdmin(authService), createAdminPackagesRouter(database));
  app.use('/api/admin/package-variants', requireAdmin(authService), createAdminPackageVariantsRouter(database));
  app.use('/api/admin/inquiries', requireAdmin(authService), createAdminInquiriesRouter(database));

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
