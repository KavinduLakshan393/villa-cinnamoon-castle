import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import HomePage from './pages/HomePage';
import TheVillaPage from './pages/TheVillaPage';
import PackagesPage from './pages/PackagesPage';
import ReservePage from './pages/ReservePage';
import ExperiencesPage from './pages/ExperiencesPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

// Scroll to top upon route transition
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <BookingProvider>
      <ScrollToTop />
      <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {!isAdmin && <Navbar />}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/the-villa" element={<TheVillaPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/reserve" element={<ReservePage />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        {!isAdmin && <Footer />}
      </div>
    </BookingProvider>
  );
}
