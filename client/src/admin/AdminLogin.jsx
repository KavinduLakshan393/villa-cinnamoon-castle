import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAdminAuth } from './AuthContext.jsx';
import Button from '../components/Button.jsx';

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const admin = await login(email.trim(), password);
      toast.success(`Welcome back, ${admin.displayName}.`);
    } catch (requestError) {
      setError(requestError.message || 'Sign-in failed.');
      toast.error(requestError.message || 'Sign-in failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-login">
      <a className="admin-brand" href="/" aria-label="Villa Cinnamoon Castle home">
        <span>Villa</span>
        <span>Cinnamoon</span>
        <span>Castle</span>
      </a>
      <main className="admin-login__main">
        <div className="admin-login__intro">
          <p className="eyebrow">Private administration</p>
          <h1>Welcome <span className="editorial">back.</span></h1>
          <p className="lead">Sign in to manage stay packages and customer inquiries.</p>
        </div>
        <form className="admin-login__card" onSubmit={submit} noValidate>
          <div className="field">
            <label className="field__label" htmlFor="admin-email">Email address</label>
            <input
              className="field__input"
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="admin-password">Password</label>
            <input
              className="field__input"
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error && <p className="admin-alert is-error" role="alert">{error}</p>}
          <Button type="submit" disabled={busy} className={busy ? 'is-busy' : ''}>
            {busy ? 'Signing in…' : 'Sign in'}
          </Button>
          <p className="caption">Forgot your password? Use the secure local password-reset command on the server.</p>
        </form>
      </main>
    </div>
  );
}
