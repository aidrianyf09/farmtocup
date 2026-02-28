import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/axios';

interface Admin {
  id: string;
  name: string;
  email: string;
}

interface AdminAuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('ftc_admin_token');
    if (token) {
      api.get('/auth/me')
        .then(({ data }) => setAdmin(data))
        .catch(() => localStorage.removeItem('ftc_admin_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('ftc_admin_token', data.token);
    setAdmin(data.admin);
  };

  const logout = () => {
    localStorage.removeItem('ftc_admin_token');
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{
      admin,
      isAuthenticated: !!admin,
      loading,
      login,
      logout,
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
