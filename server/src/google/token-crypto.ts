import { createCipheriv, createDecipheriv, hkdfSync, randomBytes } from 'node:crypto';

// The Google refresh token is encrypted at rest with AES-256-GCM. The key is
// derived (HKDF) from the server's existing secret under a label of its own,
// so no extra secret has to be configured and that secret is never reused as-is.
const ALGORITHM = 'aes-256-gcm';
const VERSION = 'v1';

function deriveKey(secret: string): Buffer {
  return Buffer.from(hkdfSync('sha256', secret, 'villa-cinnamoon-castle', 'google-refresh-token-v1', 32));
}

export function encryptToken(plain: string, secret: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGORITHM, deriveKey(secret), iv);
  const body = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [VERSION, iv.toString('base64url'), tag.toString('base64url'), body.toString('base64url')].join('.');
}

export function decryptToken(stored: string, secret: string): string {
  const [version, iv, tag, body] = stored.split('.');
  if (version !== VERSION || !iv || !tag || !body) throw new Error('Unrecognised encrypted token format.');
  const decipher = createDecipheriv(ALGORITHM, deriveKey(secret), Buffer.from(iv, 'base64url'));
  decipher.setAuthTag(Buffer.from(tag, 'base64url'));
  return Buffer.concat([decipher.update(Buffer.from(body, 'base64url')), decipher.final()]).toString('utf8');
}
