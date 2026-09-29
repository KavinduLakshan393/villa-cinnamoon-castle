# Demo hosting

The demo deployment uses these providers:

- Netlify: React/Vite public site and admin UI
- Render: Node.js/Express API
- Neon: PostgreSQL database

## Deployment order

1. Create the Neon PostgreSQL project.
2. Add Neon's pooled URL as `DATABASE_URL` and direct URL as `DIRECT_URL` in Render.
3. Deploy the Render Blueprint from `render.yaml`.
4. Add the assigned Render API URL to `netlify.toml` as the first redirect.
5. Deploy the Netlify site from `netlify.toml`.
6. Set Render's `FRONTEND_ORIGIN` to the final Netlify origin, without a trailing slash.
7. Create the production administrator locally while connected to Neon.
8. Verify health, login/refresh/logout, packages, and inquiries.

## Netlify API proxy

Insert this rule before the SPA fallback, replacing the example hostname with
the actual Render hostname:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://villa-cinnamoon-castle-api.onrender.com/api/:splat"
  status = 200
  force = true
```

The browser continues to call same-origin `/api` paths. This is required for
the existing secure, host-only, `SameSite=Strict` authentication cookies.

## Secrets

Never commit database connection strings, administrator credentials, or token
secrets. Enter them only in Neon/Render dashboards or a temporary local shell.
