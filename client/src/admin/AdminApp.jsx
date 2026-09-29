import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AdminAuthProvider, useAdminAuth } from './AuthContext.jsx';
import LoadingSpinner from '../components/loading/LoadingSpinner.jsx';
import AdminLogin from './AdminLogin.jsx';
import AdminShell from './AdminShell.jsx';
import AdminInquiries from './AdminInquiries.jsx';
import AdminPackages from './AdminPackages.jsx';
import './Admin.css';

function ProtectedAdmin() {
  const { status } = useAdminAuth();
  if (status === 'loading') {
    return (
      <div className="admin-loading" role="status">
        <LoadingSpinner />
        Checking your session…
      </div>
    );
  }
  return status === 'authenticated' ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

function LoginRoute() {
  const { status } = useAdminAuth();
  if (status === 'loading') return <div className="admin-loading" role="status"><LoadingSpinner />Checking your session…</div>;
  return status === 'authenticated' ? <Navigate to="/admin/inquiries" replace /> : <AdminLogin />;
}

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={10}
        containerClassName="admin-toaster"
        containerStyle={{ top: 'calc(var(--nav-height) + 16px)', right: 'var(--gutter)' }}
        toastOptions={{
          className: 'admin-toast',
          duration: 4200,
          style: {
            maxWidth: '440px',
            padding: '14px 16px',
            border: '1px solid var(--border)',
            borderRadius: '0',
            background: 'var(--surface)',
            color: 'var(--text-primary)',
            boxShadow: '0 18px 46px rgba(23, 26, 23, 0.16)',
            fontFamily: 'var(--font-primary)',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          },
          success: { iconTheme: { primary: 'var(--accent)', secondary: 'var(--surface)' } },
          error: { duration: 5600, iconTheme: { primary: 'var(--error)', secondary: 'var(--surface)' } },
        }}
      />
      <Routes>
        <Route path="login" element={<LoginRoute />} />
        <Route element={<ProtectedAdmin />}>
          <Route element={<AdminShell />}>
            <Route index element={<Navigate to="inquiries" replace />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="packages" element={<AdminPackages />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/admin/inquiries" replace />} />
      </Routes>
    </AdminAuthProvider>
  );
}
