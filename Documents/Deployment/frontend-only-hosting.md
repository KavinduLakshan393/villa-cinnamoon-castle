# Frontend-only production hosting

## Active deployment boundary

- Netlify serves the React/Vite website.
- The production build uses `VITE_APP_MODE=frontend-only` (also the safe default).
- Public packages come from `client/src/data/packages.js` and are validated before every build.
- Inquiries are prepared in the browser and handed directly to WhatsApp.
- The production website does not call Railway, Neon or a booking-submission API.
- The admin, Express, Prisma and migration code remains in the repository for future reactivation.

## Netlify settings

- Base directory: `client`
- Build command: `npm run build`
- Publish directory: `client/dist` (shown as `dist` relative to the base)
- Environment: `VITE_APP_MODE=frontend-only` may be set explicitly; no API or database secret is required.
- The repository `netlify.toml` contains the SPA fallback, cache policy and security headers. It intentionally contains no `/api` proxy.

## Package update procedure

1. Edit the version-controlled catalogue in `client/src/data/packages.js`.
2. Run `npm --prefix client run validate:catalog`.
3. Run `npm --prefix client test` and `npm run build`.
4. Review the Netlify deploy preview, including a weekday, weekend and mixed-stay estimate.
5. Merge and deploy only after the displayed prices and WhatsApp draft are confirmed.

## Cutover procedure

1. Deploy the frontend-only branch to a Netlify preview.
2. Verify the public pages and the complete inquiry flow without sending a real customer message.
3. Confirm the browser makes no `/api` or Railway request.
4. Deploy to production and repeat the smoke test.
5. Preserve a database backup, then pause Railway and Neon. Do not delete their projects during the transition.

## Rollback

1. Resume Neon and Railway.
2. Redeploy the last verified full-stack commit from `enhancements`.
3. Restore the `/api` proxy configuration used by that full-stack deployment.
4. Verify `/api/health`, package loading, inquiry persistence and admin authentication before reopening the admin workflow.
