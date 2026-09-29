import { createApp } from './app.js';
import { loadEnv } from './config/env.js';
import { prisma } from './db/prisma.js';

const env = loadEnv();
const app = createApp(env, prisma);

const server = app.listen(env.PORT, () => {
  console.log(`Villa Cinnamoon Castle API listening on http://localhost:${env.PORT}`);
});

async function shutdown(signal: string) {
  console.log(`${signal} received; shutting down.`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));
