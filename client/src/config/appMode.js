const configuredMode = (import.meta.env?.VITE_APP_MODE ?? 'frontend-only').trim().toLowerCase();

export const appMode = configuredMode === 'full-stack' ? 'full-stack' : 'frontend-only';
export const isFrontendOnly = appMode === 'frontend-only';

