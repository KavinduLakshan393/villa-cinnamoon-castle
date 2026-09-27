import { Router } from 'express';
import type { PrismaClient } from '@prisma/client';

export function createHealthRouter(database: PrismaClient): Router {
  const router = Router();
  router.get('/', async (_request, response) => {
    try {
      await database.$queryRaw`SELECT 1`;
      response.status(200).json({ status: 'ok', database: 'connected' });
    } catch {
      response.status(503).json({ status: 'unavailable', database: 'disconnected' });
    }
  });
  return router;
}
