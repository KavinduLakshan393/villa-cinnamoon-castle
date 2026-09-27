import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../lib/api.js';

const AuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [state, setState] = useState({ status: 'loading', admin: null });

  const check = useCallback(async () => {
    try {
      const result = await apiRequest('/auth/me');
      setState({ status: 'authenticated', admin: result.admin });
    } catch {
      setState({ status: 'guest', admin: null });
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  const login = useCallback(async (email, password) => {
    const result = await apiRequest('/auth/login', {
      method: 'POST',
      retryAuth: false,
      body: { email, password },
    });
    setState({ status: 'authenticated', admin: result.admin });
    return result.admin;
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST', retryAuth: false });
    } finally {
      setState({ status: 'guest', admin: null });
    }
  }, []);

  const value = useMemo(() => ({ ...state, login, logout, check }), [state, login, logout, check]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAdminAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAdminAuth must be used inside AdminAuthProvider.');
  return value;
}
