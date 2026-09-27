const configuredBase = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

let refreshPromise = null;

function endpoint(path) {
  return `${configuredBase}/api${path.startsWith('/') ? path : `/${path}`}`;
}

async function parseResponse(response) {
  if (response.status === 204) return null;
  const contentType = response.headers.get('content-type') ?? '';
  return contentType.includes('application/json') ? response.json() : null;
}

async function refreshSession() {
  const response = await fetch(endpoint('/auth/refresh'), {
    method: 'POST',
    credentials: 'include',
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new ApiError(response.status, 'SESSION_EXPIRED', 'Your session has expired. Please sign in again.');
  return parseResponse(response);
}

export async function apiRequest(path, options = {}) {
  const { body, retryAuth = true, headers, ...fetchOptions } = options;
  const requestHeaders = { Accept: 'application/json', ...headers };
  if (body !== undefined) requestHeaders['Content-Type'] = 'application/json';
  const response = await fetch(endpoint(path), {
    credentials: 'include',
    ...fetchOptions,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (response.status === 401 && retryAuth && path !== '/auth/login' && path !== '/auth/refresh') {
    refreshPromise ??= refreshSession().finally(() => {
      refreshPromise = null;
    });
    try {
      await refreshPromise;
    } catch {
      throw new ApiError(401, 'SESSION_EXPIRED', 'Your session has expired. Please sign in again.');
    }
    return apiRequest(path, { ...options, retryAuth: false });
  }

  const payload = await parseResponse(response);
  if (!response.ok) {
    throw new ApiError(
      response.status,
      payload?.error?.code ?? 'REQUEST_FAILED',
      payload?.error?.message ?? 'The request could not be completed.',
    );
  }
  return payload;
}
