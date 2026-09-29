# Demo Deployment Progress

Last updated: 29 September 2026

## Objective

Deploy the project for demonstration purposes using:

- **Netlify** for the React/Vite public website and admin UI
- **Railway** for the Node.js/Express backend
- **Neon** for the hosted PostgreSQL database
- **GitHub** as the deployment source

> This document intentionally contains no passwords, API secrets, administrator
> credentials, or database connection strings.

## Current status

| Area | Provider | Status | Notes |
| --- | --- | --- | --- |
| Source code | GitHub | Ready | Deployment configuration was committed and pushed to the `enhancements` branch. |
| PostgreSQL | Neon | Live | The project is in Singapore (`ap-southeast-1`). Pooled and direct connection strings configured with `connect_timeout=30`. |
| Backend | Railway | Live | Deployed in Southeast Asia (Singapore). Prisma migrations and seed passed. Healthcheck `GET /api/health` verified returning `{ status: 'ok', database: 'connected' }`. |
| Frontend | Netlify | In progress | Ready to deploy with `/api/*` proxy redirect pointing to Railway. |
| Production admin | Neon/Railway | Ready | Can be created securely now that the database and backend are operational. |
| End-to-end verification | All services | Pending Netlify | Requires Netlify frontend deployment. |

## Work completed

### Repository preparation

- Added `netlify.toml` with `/api/*` proxy redirect to Railway.
- Removed unused `render.yaml`.
- Verified the client production build.
- Verified the server TypeScript check.
- Ran the server test suite successfully (12 tests).

### Neon database

- Created the Neon project `villa-cinnamoon-castle` in Singapore region.
- Configured pooled URL for runtime and direct URL for Prisma migrations.
- Confirmed database connectivity and successful seeding.

### Railway backend

- Connected GitHub repository branch `enhancements`.
- Configured service in Southeast Asia (Singapore) region.
- Added environment variables (`DATABASE_URL`, `DIRECT_URL`, `NODE_ENV=production`, `TRUST_PROXY=true`, auth secrets).
- Pre-deploy command (`npm run db:migrate:deploy && npm run db:seed`) executed successfully.
- Public domain generated: `https://villa-cinnamoon-castle-production.up.railway.app`.
- Verified `GET /api/health` responds with HTTP 200 `{ status: "ok", database: "connected" }`.

## Current status

Backend and Database are fully operational.
The next step is deploying the frontend on Netlify.

## Decisions made

- Render was evaluated but not selected because the required deployment path
  requested payment-card details.
- Railway was selected for the demo backend. Its displayed offer is a limited
  trial (`30 days or $5 credit`), not permanent free hosting.
- Neon remains the PostgreSQL provider.
- Netlify remains the frontend provider.
- The browser should continue using same-origin `/api` requests. Netlify will
  proxy those requests to Railway so the existing secure, host-only,
  `SameSite=Strict` authentication cookies continue to work.
- `VITE_API_URL` should remain unset for the Netlify build.

## Next steps

1. Create or update the Railway service from the GitHub repository.
2. Set its deployment region to Singapore or the closest available Asian region.
3. Add the required environment variables without exposing their values in Git.
4. Run the migration and seed through Railway's pre-deploy command.
5. Confirm `GET /api/health` succeeds on the Railway public domain.
6. Add the real Railway domain to `netlify.toml` before the SPA fallback:

   ```toml
   [[redirects]]
     from = "/api/*"
     to = "https://REPLACE-WITH-RAILWAY-DOMAIN/api/:splat"
     status = 200
     force = true
   ```

7. Remove the unused Render configuration after Railway is confirmed.
8. Commit and push the final deployment configuration.
9. Deploy Netlify from branch `enhancements` using:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `dist`
10. Update `FRONTEND_ORIGIN` in Railway if the actual Netlify URL differs from
    the planned URL.
11. Create the single production administrator account securely.
12. Verify:
    - Public pages and package data
    - Inquiry creation and WhatsApp hand-off
    - Admin login, access-token refresh, and logout
    - Package and price-variant CRUD
    - Inquiry filtering, expansion, acceptance, and rejection

## Security notes

- Never commit `.env` files or connection strings.
- Keep the access-token secret only in the Railway environment settings.
- Use the Neon pooled URL for normal application connections.
- Rotate any secret immediately if it is accidentally shown publicly.
- Do not place production administrator credentials in this document.
