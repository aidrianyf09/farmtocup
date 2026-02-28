import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Skeleton } from '../../components/ui/LoadingSkeleton';
import { formatPrice, formatDate, getOrderStatusColor, getPaymentStatusColor } from '../../lib/utils';
import api from '../../lib/axios';
import { toast } from 'sonner';

const ORDER_STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
const PAYMENT_STATUSES = ['pending', 'paid', 'failed'];

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params: any = { limit: 50 };
      if (statusFilter) params.status = statusFilter;
      const { data } = await api.get('/orders', { params });
      setOrders(data.orders);
    } catch {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, field: string, value: string) => {
    setUpdating(orderId);
    try {
      await api.patch(`/orders/${orderId}`, { [field]: value });
      toast.success('Order updated!');
      fetchOrders();
    } catch {
      toast.error('Failed to update order');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-[#4A2C17]">Orders</h1>
            <p className="font-body text-sm text-[#8B5E3C]/70 mt-1">{orders.length} orders</p>
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-[#8B5E3C]/30 font-body text-sm text-[#4A2C17] focus:outline-none focus:border-[#4A2C17] bg-white"
          >
            <option value="">All Statuses</option>
            {ORDER_STATUSES.map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-6 flex flex-col gap-4">
              {Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-display text-2xl text-[#8B5E3C]/40 mb-2">No orders found</p>
              <p className="font-body text-sm text-[#8B5E3C]/30">Orders will appear here once customers start placing them.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {orders.map(order => (
                <div key={order._id}>
                  {/* Row */}
                  <div
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-label text-sm font-bold text-[#4A2C17]">#{order.orderNumber}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider ${getOrderStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-body text-sm text-[#4A2C17]">{order.customer.name}</p>
                        <p className="font-body text-xs text-[#8B5E3C]/60">{order.customer.phone}</p>
                        <p className="font-body text-xs text-[#8B5E3C]/60">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-lg font-bold text-[#4A2C17]">{formatPrice(order.total)}</p>
                      <p className="font-label text-xs text-[#8B5E3C]/60 uppercase">{order.paymentMethod?.replace('_', ' ')}</p>
                    </div>
                    <ChevronDown size={16} className={`text-[#8B5E3C]/50 transition-transform ${expandedOrder === order._id ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Expanded Details */}
                  {expandedOrder === order._id && (
                    <div className="px-6 py-5 bg-[#FAF7F2]/50 border-t border-gray-100">
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Customer Info */}
                        <div>
                          <h4 className="font-label text-xs uppercase tracking-widest text-[#8B5E3C] mb-3">Customer</h4>
                          <div className="font-body text-sm text-[#4A2C17] space-y-1">
                            <p className="font-semibold">{order.customer.name}</p>
                            <p>{order.customer.email}</p>
                            <p>{order.customer.phone}</p>
                            <p className="text-[#8B5E3C]/70">{order.customer.address}, {order.customer.city}</p>
                            <p className="text-[#8B5E3C]/70">{order.customer.province}</p>
                          </div>
                        </div>

                        {/* Items */}
                        <div>
                          <h4 className="font-label text-xs uppercase tracking-widest text-[#8B5E3C] mb-3">Items Ordered</h4>
                          <div className="flex flex-col gap-2">
                            {order.items?.map((item: any, i: number) => (
                              <div key={i} className="flex justify-between font-body text-sm">
                                <span className="text-[#4A2C17]">{item.productName} ({item.variant}) x{item.quantity}</span>
                                <span className="font-semibold text-[#4A2C17]">{formatPrice(item.price * item.quantity)}</span>
                              </div>
                            ))}
                            <div className="border-t border-[#8B5E3C]/20 pt-2 mt-1 flex justify-between font-semibold">
                              <span className="text-[#4A2C17]">Total</span>
                              <span className="text-[#4A2C17]">{formatPrice(order.total)}</span>
                            </div>
                          </div>
                          {order.notes && (
                            <p className="mt-3 font-body text-xs text-[#8B5E3C] italic bg-white rounded p-2">Note: {order.notes}</p>
                          )}
                        </div>

                        {/* Update Status */}
                        <div>
                          <h4 className="font-label text-xs uppercase tracking-widest text-[#8B5E3C] mb-3">Update Status</h4>
                          <div className="flex flex-col gap-3">
                            <div>
                              <label className="font-label text-xs text-[#8B5E3C]/70 mb-1 block">Order Status</label>
                              <select
                                value={order.orderStatus}
                                onChange={e => handleStatusUpdate(order._id, 'orderStatus', e.target.value)}
                                disabled={updating === order._id}
                                className="w-full px-3 py-2 rounded border border-[#8B5E3C]/30 font-body text-sm focus:outline-none focus:border-[#4A2C17] bg-white"
                              >
                                {ORDER_STATUSES.map(s => (
                                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="font-label text-xs text-[#8B5E3C]/70 mb-1 block">Payment Status</label>
                              <select
                                value={order.paymentStatus}
                                onChange={e => handleStatusUpdate(order._id, 'paymentStatus', e.target.value)}
                                disabled={updating === order._id}
                                className="w-full px-3 py-2 rounded border border-[#8B5E3C]/30 font-body text-sm focus:outline-none focus:border-[#4A2C17] bg-white"
                              >
                                {PAYMENT_STATUSES.map(s => (
                                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
