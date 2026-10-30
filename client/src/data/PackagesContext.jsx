import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../lib/api.js';
import { applyPackageApi } from './packages.js';
import { isFrontendOnly } from '../config/appMode.js';

const staticState = { ready: true, error: null, version: 0, source: 'static' };
const apiState = { ready: false, error: null, version: 0, source: 'api' };
const PackagesContext = createContext(isFrontendOnly ? staticState : apiState);

export function PackagesProvider({ children }) {
  const [state, setState] = useState(isFrontendOnly ? staticState : apiState);

  useEffect(() => {
    if (isFrontendOnly) return undefined;
    let active = true;
    apiRequest('/packages', { retryAuth: false })
      .then((result) => {
        if (!active) return;
        applyPackageApi(result.packages);
        setState((current) => ({ ready: true, error: null, version: current.version + 1, source: 'api' }));
      })
      .catch((error) => {
        if (active) setState((current) => ({ ...current, ready: true, error }));
      });
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => state, [state]);
  return <PackagesContext.Provider value={value}>{children}</PackagesContext.Provider>;
}

export function usePackages() {
  return useContext(PackagesContext);
}
