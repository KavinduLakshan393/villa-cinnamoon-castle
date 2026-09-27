# Villa Cinnamoon Castle server database

This directory contains the PostgreSQL schema, migration and current-package seed for the admin/backend work.

## Data model

- `stay_options` stores one customer-facing row and its shared schedule, capacity and display copy.
- `package_variants` stores the flat, Non-A/C or A/C prices belonging to a stay option.
- `inquiries` stores customer/contact/date data and the admin decision.
- `inquiry_quote_lines` stores one weekday and/or weekend selection with the immutable rate quoted at submission time.
- `admins`, `admin_sessions` and `refresh_tokens` support authenticated admin access, token rotation and revocation without storing raw refresh tokens.

The schema is in third normal form for the current domain: stay-option facts are stored once, variant facts are stored once, and inquiry selections reference their parent records. The `quoted_*` columns are immutable transaction facts, not current package master data.

## Local or hosted PostgreSQL

Copy `.env.example` to `.env` and set both URLs. For a normal local or single-URL hosted database, both values can be identical. For a serverless host, use its pooled URL as `DATABASE_URL` and direct URL as `DIRECT_URL`.

```powershell
Copy-Item .env.example .env
npm run db:migrate:deploy
npm run db:generate
npm run db:seed
```

Do not commit `.env` or real credentials.

## Phase 1 administrator authentication

Generate an access-token signing secret and add it to `.env` as `AUTH_ACCESS_TOKEN_SECRET`:

```powershell
npm run auth:generate-secret
```

Create the single Phase 1 administrator with a hidden password prompt:

```powershell
npm run admin:create
```

If the password is forgotten, reset it locally. This also revokes every existing refresh session:

```powershell
npm run admin:reset-password
```

The API issues a short-lived access token and rotates a hashed, seven-day refresh token. Both raw tokens are sent only in HttpOnly cookies.

## Phase 1 API

Public endpoints:

- `GET /api/health`
- `GET /api/packages` — active stay options and active price variants
- `POST /api/inquiries` — validates the stay, recalculates its quote from database prices, and stores an immutable snapshot
- `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout`

Authenticated administrator endpoints:

- `GET /api/auth/me`
- `GET|POST|PATCH|DELETE /api/admin/packages` — stay-option management
- `POST /api/admin/packages/:id/variants`
- `PATCH|DELETE /api/admin/package-variants/:id`
- `GET /api/admin/inquiries` — grouped by check-in date and ordered by exact submission time, earliest first
- `GET /api/admin/inquiries/:id`
- `PATCH /api/admin/inquiries/:id/decision` — accepts `ACCEPTED` or `REJECTED` and returns the specific customer's WhatsApp URL with a fixed draft message

Package and variant deletion is a soft delete. Historical inquiry quote lines therefore retain the exact package labels and prices originally submitted.
