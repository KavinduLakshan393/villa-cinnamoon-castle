import { NavLink, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAdminAuth } from './AuthContext.jsx';

export default function AdminShell() {
  const { admin, logout } = useAdminAuth();
  const signOut = async () => {
    await logout();
    toast.success('Signed out securely.');
  };
  return (
    <div className="admin-shell">
      <header className="admin-header">
        <a className="admin-brand" href="/" aria-label="Villa Cinnamoon Castle home">
          <span>Villa</span><span>Cinnamoon</span><span>Castle</span>
        </a>
        <div className="admin-header__account">
          <span className="admin-header__name">{admin.displayName}</span>
          <button type="button" className="admin-text-button" onClick={signOut}>Sign out</button>
        </div>
      </header>
      <div className="admin-shell__body">
        <nav className="admin-nav" aria-label="Administration">
          <p className="admin-nav__label">Manage</p>
          <NavLink to="/admin/inquiries" className={({ isActive }) => `admin-nav__link${isActive ? ' is-active' : ''}`}>
            Inquiries
          </NavLink>
          <NavLink to="/admin/packages" className={({ isActive }) => `admin-nav__link${isActive ? ' is-active' : ''}`}>
            Packages
          </NavLink>
          <a className="admin-nav__site" href="/" target="_blank" rel="noopener noreferrer">View website ↗</a>
        </nav>
        <main className="admin-content" id="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
