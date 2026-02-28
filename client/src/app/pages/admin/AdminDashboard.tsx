import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Package, TrendingUp, Clock, ArrowRight, CheckCircle, Truck } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Badge } from '../../components/ui/Badge';
import { Skeleton } from '../../components/ui/LoadingSkeleton';
import { formatPrice, formatDate, getOrderStatusColor } from '../../lib/utils';
import api from '../../lib/axios';

interface Stats {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  monthlyRevenue: any[];
}

interface Order {
  _id: string;
  orderNumber: string;
  customer: { name: string; phone: string };
  total: number;
  orderStatus: string;
  paymentMethod: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/orders/stats/summary'),
      api.get('/orders?limit=5'),
    ]).then(([statsRes, ordersRes]) => {
      setStats(statsRes.data);
      setRecentOrders(ordersRes.data.orders);
    }).catch(() => {
      setStats({ totalOrders: 0, pendingOrders: 0, totalRevenue: 0, monthlyRevenue: [] });
      setRecentOrders([]);
    }).finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Total Orders', value: stats?.totalOrders ?? 0, icon: <ShoppingBag size={22} />, color: 'bg-[#4A2C17]' },
    { label: 'Pending Orders', value: stats?.pendingOrders ?? 0, icon: <Clock size={22} />, color: 'bg-[#8B5E3C]' },
    { label: 'Total Revenue', value: formatPrice(stats?.totalRevenue ?? 0), icon: <TrendingUp size={22} />, color: 'bg-[#4A7C59]' },
    { label: 'Active Products', value: '—', icon: <Package size={22} />, color: 'bg-[#4A2C17]/70' },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-[#4A2C17]">Dashboard</h1>
          <p className="font-body text-sm text-[#8B5E3C]/70 mt-1">Welcome back! Here's what's happening.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statCards.map((card, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm flex items-center gap-4">
              <div className={`${card.color} text-white rounded-xl p-3 flex-shrink-0`}>
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

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { to: '/admin/orders', label: 'View Orders', icon: <ShoppingBag size={16} />, color: 'bg-[#4A2C17]' },
            { to: '/admin/products', label: 'Manage Products', icon: <Package size={16} />, color: 'bg-[#8B5E3C]' },
            { to: '/admin/analytics', label: 'Analytics', icon: <TrendingUp size={16} />, color: 'bg-[#4A7C59]' },
            { to: '/admin/cms', label: 'Edit Website', icon: <CheckCircle size={16} />, color: 'bg-[#4A2C17]/60' },
          ].map(action => (
            <Link
              key={action.to}
              to={action.to}
              className={`${action.color} text-[#FAF7F2] rounded-xl p-4 flex items-center gap-3 font-label text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity`}
            >
              {action.icon}
              {action.label}
            </Link>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h2 className="font-display text-xl font-bold text-[#4A2C17]">Recent Orders</h2>
            <Link to="/admin/orders" className="flex items-center gap-1 font-label text-xs uppercase tracking-wider text-[#8B5E3C] hover:text-[#4A2C17] transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="p-6 flex flex-col gap-4">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20 ml-auto" />
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={40} className="text-[#8B5E3C]/20 mx-auto mb-3" />
              <p className="font-body text-sm text-[#8B5E3C]/60">No orders yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Order', 'Customer', 'Total', 'Status', 'Date'].map(h => (
                      <th key={h} className="px-6 py-3 text-left font-label text-xs uppercase tracking-wider text-[#8B5E3C]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map(order => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <Link to={`/admin/orders/${order._id}`} className="font-label text-sm font-semibold text-[#4A2C17] hover:text-[#8B5E3C] transition-colors">
                          #{order.orderNumber}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-body text-sm text-[#4A2C17]">{order.customer.name}</p>
                        <p className="font-body text-xs text-[#8B5E3C]/60">{order.customer.phone}</p>
                      </td>
                      <td className="px-6 py-4 font-display text-sm font-semibold text-[#4A2C17]">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider ${getOrderStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-body text-xs text-[#8B5E3C]/60">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
