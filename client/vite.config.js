import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function googleReviewsDevPlugin() {
  return {
    name: 'google-reviews-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/google-reviews')) {
          return next();
        }
        try {
          const fs = await import('node:fs');
          const path = await import('node:path');
          const envCandidates = [
            path.resolve('../Client secret/netlify-env.txt'),
            path.resolve('Client secret/netlify-env.txt'),
          ];
          for (const envPath of envCandidates) {
            if (fs.existsSync(envPath)) {
              const content = fs.readFileSync(envPath, 'utf8');
              for (const line of content.split('\n')) {
                const match = line.match(/^([A-Z_]+)=(.*)$/);
                if (match) process.env[match[1]] = match[2].trim();
              }
              break;
            }
          }
          const { default: handler } = await import('./netlify/functions/google-reviews.mjs');
          const url = `http://${req.headers.host || 'localhost:5173'}${req.url}`;
          const webReq = new Request(url, { method: req.method });
          const webRes = await handler(webReq);
          res.statusCode = webRes.status;
          webRes.headers.forEach((val, key) => res.setHeader(key, val));
          const text = await webRes.text();
          res.end(text);
        } catch (err) {
          console.error('Dev Google reviews middleware error:', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), googleReviewsDevPlugin()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});

