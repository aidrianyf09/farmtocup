import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { CartProvider } from './app/context/CartContext';
import { AdminAuthProvider } from './app/context/AdminAuthContext';
import { Navbar } from './app/components/layout/Navbar';
import { Footer } from './app/components/layout/Footer';

// Public Pages
import Home from './app/pages/Home';
import About from './app/pages/About';
import Shop from './app/pages/Shop';
import Checkout from './app/pages/Checkout';
import Connect from './app/pages/Connect';

// Admin Pages
import AdminLogin from './app/pages/admin/AdminLogin';
import AdminDashboard from './app/pages/admin/AdminDashboard';
import AdminProducts from './app/pages/admin/AdminProducts';
import AdminOrders from './app/pages/admin/AdminOrders';
import AdminAnalytics from './app/pages/admin/AdminAnalytics';
import AdminFarms from './app/pages/admin/AdminFarms';
import AdminTeam from './app/pages/admin/AdminTeam';
import AdminCMS from './app/pages/admin/AdminCMS';

// Layout wrapper for public pages (Navbar + Footer)
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <CartProvider>
          <Toaster
            position="top-right"
            richColors
            toastOptions={{
              style: {
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
              },
            }}
          />
          <Routes>
            {/* ── Public Routes ── */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/shop" element={<PublicLayout><Shop /></PublicLayout>} />
            <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
            <Route path="/connect" element={<PublicLayout><Connect /></PublicLayout>} />

            {/* ── Admin Routes ── */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/farms" element={<AdminFarms />} />
            <Route path="/admin/team" element={<AdminTeam />} />
            <Route path="/admin/cms" element={<AdminCMS />} />

            {/* ── 404 ── */}
            <Route path="*" element={
              <PublicLayout>
                <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center text-center px-6 pt-20">
                  <div>
                    <h1 className="font-display text-9xl font-bold text-[#4A2C17]/10 mb-2">404</h1>
                    <h2 className="font-display text-3xl font-bold text-[#4A2C17] mb-3">Page Not Found</h2>
                    <p className="font-body text-base text-[#8B5E3C]/70 mb-8">
                      Looks like this page got lost somewhere in the highlands.
                    </p>
                    <a href="/" className="btn-primary text-sm">Back to Home</a>
                  </div>
                </div>
              </PublicLayout>
            } />
          </Routes>
        </CartProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}
