import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = 4000;
const REDIRECT_URI = `http://localhost:${PORT}/api/admin/google/callback`;
const SCOPE = 'https://www.googleapis.com/auth/business.manage';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';

function findCredentials() {
  const secretDir = path.resolve('Client secret');
  let clientId = process.env.GBP_CLIENT_ID;
  let clientSecret = process.env.GBP_CLIENT_SECRET;
  let accountId = process.env.GBP_ACCOUNT_ID;
  let locationId = process.env.GBP_LOCATION_ID;

  if (fs.existsSync(secretDir)) {
    const files = fs.readdirSync(secretDir);
    const jsonFile = files.find((f) => f.startsWith('client_secret') && f.endsWith('.json'));
    if (jsonFile) {
      try {
        const parsed = JSON.parse(fs.readFileSync(path.join(secretDir, jsonFile), 'utf8'));
        const config = parsed.web || parsed.installed;
        if (config) {
          clientId = clientId || config.client_id;
          clientSecret = clientSecret || config.client_secret;
        }
      } catch (e) {
        console.warn('Could not parse OAuth JSON:', e.message);
      }
    }

    const txtFile = files.find((f) => f.includes('client secret') && f.endsWith('.txt'));
    if (txtFile) {
      const content = fs.readFileSync(path.join(secretDir, txtFile), 'utf8');
      const accountMatch = content.match(/account id\s*:\s*(\S+)/i);
      const locationMatch = content.match(/location id\s*:\s*(\S+)/i);
      if (accountMatch) accountId = accountId || accountMatch[1];
      if (locationMatch) locationId = locationId || locationMatch[1];
    }
  }

  return { clientId, clientSecret, accountId, locationId };
}

const creds = findCredentials();

if (!creds.clientId || !creds.clientSecret) {
  console.error('Error: Google OAuth client_id and client_secret could not be found.');
  console.error('Ensure client_secret JSON is placed in "Client secret/" directory or set GBP_CLIENT_ID and GBP_CLIENT_SECRET.');
  process.exit(1);
}

const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
authUrl.searchParams.set('client_id', creds.clientId);
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('scope', SCOPE);
authUrl.searchParams.set('access_type', 'offline');
authUrl.searchParams.set('prompt', 'consent');

const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, `http://localhost:${PORT}`);
  if (reqUrl.pathname !== '/api/admin/google/callback') {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('Not found');
    return;
  }

  const code = reqUrl.searchParams.get('code');
  const error = reqUrl.searchParams.get('error');

  if (error || !code) {
    res.writeHead(400, { 'content-type': 'text/html; charset=utf-8' });
    res.end(`<h1>Google OAuth Authorization Failed</h1><p>${error || 'No authorization code returned.'}</p>`);
    console.error('Authorization failed:', error);
    server.close();
    process.exit(1);
  }

  try {
    const tokenRes = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: creds.clientId,
        client_secret: creds.clientSecret,
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.refresh_token) {
      throw new Error(tokenData.error_description || tokenData.error || 'No refresh_token returned by Google.');
    }

    const refreshToken = tokenData.refresh_token;
    const accountStr = creds.accountId ? (creds.accountId.startsWith('accounts/') ? creds.accountId : `accounts/${creds.accountId}`) : '';
    const locationStr = creds.locationId ? (creds.locationId.startsWith('locations/') ? creds.locationId : `locations/${creds.locationId}`) : '';

    const envLines = [
      `# Netlify Environment Variables for Google Reviews`,
      `GBP_CLIENT_ID=${creds.clientId}`,
      `GBP_CLIENT_SECRET=${creds.clientSecret}`,
      `GBP_REFRESH_TOKEN=${refreshToken}`,
      accountStr ? `GBP_ACCOUNT_ID=${accountStr}` : `# GBP_ACCOUNT_ID=accounts/<your-account-id>`,
      locationStr ? `GBP_LOCATION_ID=${locationStr}` : `# GBP_LOCATION_ID=locations/<your-location-id>`,
    ].join('\n');

    const outDir = path.resolve('Client secret');
    if (fs.existsSync(outDir)) {
      fs.writeFileSync(path.join(outDir, 'netlify-env.txt'), envLines, 'utf8');
    }

    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Google Reviews Connected</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 2rem; max-width: 600px; margin: 0 auto; color: #1e293b; }
            .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; }
            h1 { color: #0f172a; font-size: 1.5rem; }
            p { line-height: 1.6; }
            code { background: #e2e8f0; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>✓ Google Authorization Successful!</h1>
            <p>Your refresh token has been securely acquired and printed to the terminal console.</p>
            <p>It has also been saved to <code>Client secret/netlify-env.txt</code> (git-ignored).</p>
            <p>You may now close this browser window and return to the terminal.</p>
          </div>
        </body>
      </html>
    `);

    console.log('\n================================================================');
    console.log('✓ Google Business Profile Refresh Token Acquired Successfully!');
    console.log('================================================================\n');
    console.log('Add these Environment Variables to Netlify:');
    console.log('(Netlify Dashboard -> Site configuration -> Environment variables)\n');
    console.log(envLines);
    console.log('\n(Saved to Client secret/netlify-env.txt)\n');

    server.close(() => {
      process.exit(0);
    });
  } catch (err) {
    res.writeHead(500, { 'content-type': 'text/html; charset=utf-8' });
    res.end(`<h1>Token Exchange Error</h1><p>${err.message}</p>`);
    console.error('Token exchange error:', err.message);
    server.close(() => {
      process.exit(1);
    });
  }
});

server.listen(PORT, () => {
  console.log('================================================================');
  console.log('Google Reviews OAuth Helper Server Running on port', PORT);
  console.log('================================================================\n');
  console.log('Please open the following link in your browser to authorize access:');
  console.log('(Sign in with villacinnamoncastle@gmail.com)\n');
  console.log(authUrl.toString());
  console.log('\nWaiting for Google callback on:', REDIRECT_URI, '...\n');
});

