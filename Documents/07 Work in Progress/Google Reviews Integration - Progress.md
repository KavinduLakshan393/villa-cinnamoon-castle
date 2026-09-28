# Google Reviews Integration — Progress

**Status:** In progress (paused on 2026-09-28)
**Goal:** Show every real Google review of Villa Cinnamoon Castle on the website, not just the 5 that the Places API returns. At the time of writing that is 106 reviews, rated 4.9 ★.
**Decision:** Google Business Profile API (planned as DEC-028). The Places API (5 reviews only) and third-party widgets were rejected.

---

## 1. How it will work

```
Google Business Profile API
        │  (read-only, about once a day, with the manager's one-time permission)
        ▼
server: review sync ──► PostgreSQL (google_reviews, google_connections)
        │
        ▼
GET /api/reviews  (rating, total, every review, sort and paging)
        │
        ▼
Website: two moving review rows + a "Read all reviews" panel
```

- Visitors' browsers never contact Google. Reviews are served from our own server, which keeps the Privacy notice accurate and the page fast.
- Reviews are shown unedited, with the reviewer's name and a Google attribution link.
- Google profile photos are not shown, because they would load from Google in the visitor's browser.

---

## 2. Google-side setup (done by the site manager)

| # | Step | Status |
|---|---|---|
| 1 | Manager access to the Business Profile. Devindu Deshan is the Primary owner; `villacinnamoncastle@gmail.com` is a Manager. The profile is verified and about 2 years old, with 106 reviews. | ✅ Done |
| 2 | Google Cloud project `villa-cinnamoon-reviews` | ✅ Done |
| 3 | Basic API access request. **Case ID `5-2724000041787`**, submitted 2026-09-28. Google quoted 7–10 business days. | ⏳ Awaiting Google |
| 4 | Enabled the My Business Account Management API and the My Business Business Information API | ✅ Done |
| 5 | OAuth consent screen (External, app name "Villa Cinnamoon Castle Reviews", test user `villacinnamoncastle@gmail.com`) | ✅ Done |
| 5a | `business.manage` scope under **Data Access** | ❓ To confirm |
| 6 | Web OAuth client. Redirect URI: `http://localhost:4000/api/admin/google/callback`. `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` and `GOOGLE_REDIRECT_URI` are set in `server/.env` (git-ignored). | ✅ Done |

### After Google approves the request

1. Check that approval arrived: Cloud Console → **APIs & Services → Quotas**. The Business Profile quota changes from 0 to about 300.
2. Enable the **Google My Business API** under APIs & Services → Library. It only appears after approval.
3. In the website admin, open **Reviews → Connect Google** and select **Allow**. This screen will be built as part of the remaining work.

### Known limitation: the consent app stays in "Testing"

The app cannot be published yet. Publishing needs a home page and a privacy-policy link on a domain the villa owns. A Facebook link fails Google's Authorized domains check.

While the app is in Testing, **Google's permission expires every 7 days**. The admin Reviews page will show a "Reconnect Google" prompt when that happens.

**At launch:**
1. Add the villa's domain under Branding → Authorized domains.
2. Set the home page to `https://<domain>/` and the privacy policy to `https://<domain>/privacy`.
3. Select **Publish app**.
4. Add the live callback URL as a redirect URI on the OAuth client.

---

## 3. Built so far (committed)

| Area | File | What it does |
|---|---|---|
| Database | `server/prisma/schema.prisma`, `server/prisma/migrations/20260928000200_google_reviews/` | `google_connections` holds a single row: the encrypted refresh token, location, rating, total and sync status. `google_reviews` holds every review, stored unedited. Constraints keep the rating between 1 and 5 and allow only one connection row. The migration is applied to the local database. |
| Settings | `server/src/config/env.ts` | Optional `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI` and `GOOGLE_REVIEWS_SYNC_HOURS` (default 24). Without them, the rest of the API still runs. |
| Token encryption | `server/src/google/token-crypto.ts` | AES-256-GCM encryption for the refresh token. The key is derived with HKDF from the existing `AUTH_ACCESS_TOKEN_SECRET` under its own label. |
| OAuth | `server/src/google/oauth.ts` | Builds the sign-in URL (offline access, `business.manage`). The signed, 10-minute `state` token proves an admin started the flow, since the admin cookies are SameSite=Strict and aren't sent on the Google redirect. Also exchanges the code, refreshes the access token and revokes access. |
| Google API client | `server/src/google/business-profile.ts` | Finds the villa's account and location, then reads **every** review, 50 per page. It normalises star ratings, anonymous reviewers and owner replies without changing any text. Errors that mean "access not approved yet" are recognised. |

The server type-checks (`tsc --noEmit`).

---

## 4. Still to do

1. **`server/src/google/review-sync.ts`:** the sync service. It refreshes the access token, finds the location, reads all reviews, then in one transaction upserts every review, deletes the ones removed on Google, and stores the rating and total. Errors are saved in plain language, and an expired permission sets `needsReconnect`. The service runs 30 s after start-up and then every `GOOGLE_REVIEWS_SYNC_HOURS`, and never runs twice at once. (Written, but not yet saved to the repository.)
2. **Routes:**
   - Public `GET /api/reviews?sort=newest|highest|lowest|featured&limit&offset`. Returns the rating, total, star distribution and reviews (with owner replies), cached for 5 minutes.
   - Admin `GET /api/admin/google/status`, `POST /api/admin/google/connect` (returns the Google sign-in URL), `POST /api/admin/google/sync`, `DELETE /api/admin/google/connection`.
   - Public `GET /api/admin/google/callback`, protected by the signed state. It stores the encrypted token, starts the first sync, then redirects to `/admin/reviews`.
   - Start the sync schedule in `server/src/server.ts`.
3. **Admin page `/admin/reviews`:** connection status, location, last sync and review count, with Connect / Reconnect, Sync now and Disconnect buttons. Add it to the admin navigation.
4. **Website:**
   - `GoogleReviews.jsx` loads featured reviews from `/api/reviews`.
   - A new **"Read all N reviews"** panel shows every review, 10 at a time, sortable, with the star breakdown and owner replies.
   - The development placeholder reviews in `client/src/data/reviews.js` stay as a fallback only while developing locally. Production falls back to a "Read reviews on Google" link.
5. **Tests:** token encryption round-trip, state signing and expiry, review normalisation, paging with a mocked `fetch`, the `/api/reviews` response shape, and the error messages.
6. **Documents:**
   - DEC-028 in the Decision Log.
   - Privacy page: reviews are fetched by our server and stored; no Google request from visitors' browsers.
   - Website Copy: the "Read all reviews" labels.
   - Document Register.
7. **Launch items:** publish the consent app on the villa's domain (section 2), add the live redirect URI, set the `site.googleReviewsUrl` link, and remove the placeholder reviews.

---

## 5. Notes

- **Local database:** the database user cannot create a shadow database, so `prisma migrate dev` fails. New migrations are generated with `prisma migrate diff --from-schema-datasource … --to-schema-datamodel … --script` and applied with `prisma migrate deploy`. Remove the "Loaded Prisma config" lines that the command prints into the file.
- **Windows:** `prisma generate` reports EPERM on the query-engine DLL while `server:dev` is running. The types are still generated; restart the server to use the new tables.
- **Local setup screenshots** in `Google business profile/` are git-ignored, because some show the Cloud project number.
