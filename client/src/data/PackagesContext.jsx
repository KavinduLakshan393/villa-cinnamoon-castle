import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../lib/api.js';
import { applyPackageApi } from './packages.js';

const PackagesContext = createContext({ ready: false, error: null, version: 0 });

export function PackagesProvider({ children }) {
  const [state, setState] = useState({ ready: false, error: null, version: 0 });

  useEffect(() => {
    let active = true;
    apiRequest('/packages', { retryAuth: false })
      .then((result) => {
        if (!active) return;
        applyPackageApi(result.packages);
        setState((current) => ({ ready: true, error: null, version: current.version + 1 }));
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
