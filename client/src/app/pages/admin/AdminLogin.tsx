import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Coffee, Lock, Mail } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { toast } from 'sonner';

export default function AdminLogin() {
  const { login, isAuthenticated, loading } = useAdminAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please enter email and password.');
      return;
    }
    setSubmitting(true);
    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back!');
    } catch {
      toast.error('Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1E1008] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B5E3C]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1008] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4A2C17] mb-4">
            <Coffee size={28} className="text-[#FAF7F2]" />
          </div>
          <h1 className="font-display text-3xl font-bold text-[#FAF7F2]">Farm to Cup</h1>
          <p className="font-label text-xs tracking-widest uppercase text-[#8B5E3C] mt-1">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-[#2A1810] rounded-2xl p-8 shadow-2xl border border-[#FAF7F2]/5">
          <h2 className="font-display text-xl font-semibold text-[#FAF7F2] mb-6">Sign In</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] mb-1.5 block">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B5E3C]/60" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  placeholder="admin@farmtocup.ph"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1E1008] border border-[#FAF7F2]/10 text-[#FAF7F2] text-sm font-body placeholder:text-[#FAF7F2]/30 focus:outline-none focus:border-[#8B5E3C] transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B5E3C]/60" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={e => setFormData(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#1E1008] border border-[#FAF7F2]/10 text-[#FAF7F2] text-sm font-body placeholder:text-[#FAF7F2]/30 focus:outline-none focus:border-[#8B5E3C] transition-colors"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-lg bg-[#8B5E3C] text-[#FAF7F2] font-label text-sm font-semibold uppercase tracking-wider hover:bg-[#A8784E] transition-colors flex items-center justify-center gap-2 mt-2"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Signing In...
                </>
              ) : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
