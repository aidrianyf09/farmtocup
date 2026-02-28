import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, BarChart3, Settings, LogOut, Home, Users, MapPin } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { admin, isAuthenticated, loading, logout } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A2C17] mx-auto mb-4"></div>
          <p className="font-body text-[#8B5E3C]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/products', icon: Package, label: 'Products' },
    { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
    { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/admin/farms', icon: MapPin, label: 'Farms' },
    { to: '/admin/team', icon: Users, label: 'Team' },
    { to: '/admin/cms', icon: Settings, label: 'CMS' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E1008] text-[#FAF7F2] flex flex-col fixed h-full z-40">
        <div className="p-6 border-b border-[#FAF7F2]/10">
          <Link to="/" className="block">
            <h2 className="font-display text-lg font-bold text-[#FAF7F2]">Farm to Cup</h2>
            <p className="font-label text-xs text-[#8B5E3C] tracking-widest uppercase">Admin Panel</p>
          </Link>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="flex flex-col gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm transition-colors ${
                      isActive
                        ? 'bg-[#4A2C17] text-[#FAF7F2]'
                        : 'text-[#FAF7F2]/70 hover:bg-[#FAF7F2]/10 hover:text-[#FAF7F2]'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-[#FAF7F2]/10">
          <div className="px-4 py-2 mb-2">
            <p className="font-body text-xs text-[#FAF7F2]/50">Logged in as</p>
            <p className="font-body text-sm text-[#FAF7F2] font-medium truncate">{admin?.name}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg font-body text-sm text-[#FAF7F2]/70 hover:bg-red-900/30 hover:text-red-300 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
