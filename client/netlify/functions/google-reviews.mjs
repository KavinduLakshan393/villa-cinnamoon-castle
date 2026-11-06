import {
  normalizeResourceName,
  normalizeReviews,
  selectLocation,
} from './lib/google-reviews.mjs';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const BUSINESS_INFO_URL = 'https://mybusinessbusinessinformation.googleapis.com/v1';
const REVIEWS_URL = 'https://mybusiness.googleapis.com/v4';
const REQUEST_TIMEOUT_MS = 10_000;

function response(data, status, cacheControl) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': cacheControl,
    },
  });
}

async function fetchJson(url, options, signal) {
  const result = await fetch(url, { ...options, signal });
  if (!result.ok) throw new Error(`Google API request failed with status ${result.status}.`);
  return result.json();
}

async function getAccessToken(env, signal) {
  const body = new URLSearchParams({
    client_id: env.GBP_CLIENT_ID,
    client_secret: env.GBP_CLIENT_SECRET,
    refresh_token: env.GBP_REFRESH_TOKEN,
    grant_type: 'refresh_token',
  });
  const payload = await fetchJson(
    TOKEN_URL,
    {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    },
    signal,
  );

  if (!payload?.access_token) throw new Error('Google did not return an access token.');
  return payload.access_token;
}

async function findLocation(accountName, token, env, signal) {
  if (env.GBP_LOCATION_ID) return normalizeResourceName(env.GBP_LOCATION_ID, 'locations');

  const url = new URL(`${BUSINESS_INFO_URL}/${accountName}/locations`);
  url.searchParams.set('readMask', 'name,title');
  url.searchParams.set('pageSize', '100');
  const payload = await fetchJson(
    url,
    { headers: { authorization: `Bearer ${token}` } },
    signal,
  );

  return selectLocation(payload?.locations, env.GBP_LOCATION_TITLE || 'Villa Cinnamoon Castle');
}

export default async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { allow: 'GET, OPTIONS' } });
  }
  if (request.method !== 'GET') {
    return response({ error: 'Method not allowed.' }, 405, 'no-store');
  }

  const env = process.env;
  const required = ['GBP_ACCOUNT_ID', 'GBP_CLIENT_ID', 'GBP_CLIENT_SECRET', 'GBP_REFRESH_TOKEN'];
  if (required.some((key) => !env[key])) {
    return response({ error: 'Reviews are not configured.' }, 503, 'no-store');
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const accountName = normalizeResourceName(env.GBP_ACCOUNT_ID, 'accounts');
    const token = await getAccessToken(env, controller.signal);
    const locationName = await findLocation(accountName, token, env, controller.signal);
    const url = new URL(`${REVIEWS_URL}/${accountName}/${locationName}/reviews`);
    url.searchParams.set('pageSize', '50');
    url.searchParams.set('orderBy', 'updateTime desc');
    const payload = await fetchJson(
      url,
      { headers: { authorization: `Bearer ${token}` } },
      controller.signal,
    );
    const reviews = normalizeReviews(payload);

    return response(
      reviews,
      200,
      'public, max-age=300, s-maxage=21600, stale-while-revalidate=86400',
    );
  } catch (error) {
    console.error('Google Reviews Netlify function error:', error);
    return response({ error: 'Reviews are temporarily unavailable.' }, 502, 'no-store');
  } finally {
    clearTimeout(timer);
  }
};
