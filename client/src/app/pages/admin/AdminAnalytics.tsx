import React, { useEffect, useState } from 'react';
import { TrendingUp, ShoppingBag, DollarSign, Clock } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
} from 'recharts';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Skeleton } from '../../components/ui/LoadingSkeleton';
import { formatPrice } from '../../lib/utils';
import api from '../../lib/axios';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const PIE_COLORS = ['#4A2C17', '#8B5E3C', '#4A7C59', '#A8784E'];

export default function AdminAnalytics() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/stats/summary')
      .then(({ data }) => setStats(data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  const monthlyData = stats?.monthlyRevenue?.map((item: any) => ({
    name: MONTH_NAMES[(item._id.month - 1)],
    revenue: item.revenue,
    orders: item.orders,
  })) || [];

  const paymentData = stats?.paymentBreakdown?.map((item: any) => ({
    name: item._id?.replace('_', ' ').toUpperCase() || 'Unknown',
    value: item.count,
  })) || [];

  const statCards = [
    {
      label: 'Total Revenue',
      value: formatPrice(stats?.totalRevenue || 0),
      icon: <DollarSign size={22} />,
      color: 'bg-[#4A7C59]',
    },
    {
      label: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: <ShoppingBag size={22} />,
      color: 'bg-[#4A2C17]',
    },
    {
      label: 'Pending Orders',
      value: stats?.pendingOrders || 0,
      icon: <Clock size={22} />,
      color: 'bg-[#8B5E3C]',
    },
    {
      label: 'Avg Order Value',
      value: stats?.totalOrders ? formatPrice(Math.round((stats.totalRevenue || 0) / stats.totalOrders)) : '₱0',
      icon: <TrendingUp size={22} />,
      color: 'bg-[#4A2C17]/70',
    },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-[#4A2C17]">Analytics</h1>
          <p className="font-body text-sm text-[#8B5E3C]/70 mt-1">Business performance overview</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statCards.map((card, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
              <div className={`${card.color} text-white rounded-xl p-3`}>
                {card.icon}
              </div>
              <div>
                {loading ? (
                  <>
                    <Skeleton className="h-7 w-20 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </>
                ) : (
                  <>
                    <p className="font-display text-2xl font-bold text-[#4A2C17]">{card.value}</p>
                    <p className="font-label text-xs uppercase tracking-wider text-[#8B5E3C]/70">{card.label}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-[#4A2C17] mb-6">Monthly Revenue</h2>
            {loading ? (
              <Skeleton className="h-64 w-full" />
            ) : monthlyData.length === 0 ? (
              <div className="h-64 flex items-center justify-center">
                <p className="font-body text-sm text-[#8B5E3C]/60">No revenue data yet</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe4" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: 'Montserrat', fill: '#8B5E3C' }} />
                  <YAxis tick={{ fontSize: 11, fontFamily: 'Montserrat', fill: '#8B5E3C' }}
                    tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    formatter={(value: any) => [formatPrice(value), 'Revenue']}
                    contentStyle={{ fontFamily: 'DM Sans', fontSize: 12, borderColor: '#8B5E3C' }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#4A2C17" strokeWidth={2.5} dot={{ fill: '#4A2C17', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Payment Breakdown */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-[#4A2C17] mb-6">Payment Methods</h2>
            {loading ? (
              <Skeleton className="h-64 w-full" />
            ) : paymentData.length === 0 ? (
              <div className="h-64 flex items-center justify-center">
                <p className="font-body text-sm text-[#8B5E3C]/60">No payment data yet</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={paymentData} cx="50%" cy="45%" outerRadius={90} dataKey="value" label={({ percent }: { percent?: number }) => `${((percent ?? 0) * 100).toFixed(0)}%`}>
                    {paymentData.map((_: any, index: number) => (
                      <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Montserrat' }} />
                  <Tooltip contentStyle={{ fontFamily: 'DM Sans', fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Monthly Orders Bar Chart */}
          <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-[#4A2C17] mb-6">Monthly Orders</h2>
            {loading ? (
              <Skeleton className="h-48 w-full" />
            ) : monthlyData.length === 0 ? (
              <div className="h-48 flex items-center justify-center">
                <p className="font-body text-sm text-[#8B5E3C]/60">No order data yet</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe4" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: 'Montserrat', fill: '#8B5E3C' }} />
                  <YAxis tick={{ fontSize: 11, fontFamily: 'Montserrat', fill: '#8B5E3C' }} />
                  <Tooltip contentStyle={{ fontFamily: 'DM Sans', fontSize: 12, borderColor: '#8B5E3C' }} />
                  <Bar dataKey="orders" fill="#4A7C59" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
