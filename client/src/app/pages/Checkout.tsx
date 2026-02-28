import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, MessageCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCMS } from '../hooks/useCMS';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { formatPrice } from '../lib/utils';
import api from '../lib/axios';
import { toast } from 'sonner';

const PAYMENT_METHODS = [
  { value: 'gcash', label: 'GCash', icon: '📱' },
  { value: 'maya', label: 'Maya', icon: '💳' },
  { value: 'bank_transfer', label: 'Bank Transfer', icon: '🏦' },
  { value: 'cod', label: 'Cash on Delivery (+₱150)', icon: '💵' },
];

const PH_PROVINCES = [
  'Metro Manila', 'Abra', 'Agusan del Norte', 'Agusan del Sur', 'Aklan', 'Albay',
  'Antique', 'Apayao', 'Aurora', 'Basilan', 'Bataan', 'Batanes', 'Batangas',
  'Benguet', 'Biliran', 'Bohol', 'Bukidnon', 'Bulacan', 'Cagayan', 'Camarines Norte',
  'Camarines Sur', 'Camiguin', 'Capiz', 'Catanduanes', 'Cavite', 'Cebu',
  'Compostela Valley', 'Cotabato', 'Davao del Norte', 'Davao del Sur', 'Davao Oriental',
  'Eastern Samar', 'Guimaras', 'Ifugao', 'Ilocos Norte', 'Ilocos Sur', 'Iloilo',
  'Isabela', 'Kalinga', 'La Union', 'Laguna', 'Lanao del Norte', 'Lanao del Sur',
  'Leyte', 'Maguindanao', 'Marinduque', 'Masbate', 'Misamis Occidental',
  'Misamis Oriental', 'Mountain Province', 'Negros Occidental', 'Negros Oriental',
  'Northern Samar', 'Nueva Ecija', 'Nueva Vizcaya', 'Occidental Mindoro',
  'Oriental Mindoro', 'Palawan', 'Pampanga', 'Pangasinan', 'Quezon', 'Quirino',
  'Rizal', 'Romblon', 'Samar', 'Sarangani', 'Siquijor', 'Sorsogon',
  'South Cotabato', 'Southern Leyte', 'Sultan Kudarat', 'Sulu', 'Surigao del Norte',
  'Surigao del Sur', 'Tarlac', 'Tawi-Tawi', 'Zambales', 'Zamboanga del Norte',
  'Zamboanga del Sur', 'Zamboanga Sibugay',
];

export default function Checkout() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const { content } = useCMS();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('gcash');
  const [contactChannel, setContactChannel] = useState<'whatsapp' | 'messenger'>('whatsapp');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '',
    city: '', province: 'Metro Manila', zipCode: '', notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shippingFee = paymentMethod === 'cod' ? 150 : 0;
  const total = totalPrice + shippingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) { toast.error('Your cart is empty.'); return; }
    if (!validate()) { toast.error('Please fill in all required fields.'); return; }

    setLoading(true);
    try {
      const orderPayload = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          province: formData.province,
          zipCode: formData.zipCode,
        },
        items: items.map(item => ({
          productId: item.id,
          variant: item.selectedVariant,
          quantity: item.quantity,
        })),
        paymentMethod,
        notes: formData.notes,
        contactChannel,
      };

      const { data: order } = await api.post('/orders', orderPayload);
      clearCart();
      toast.success(`Order #${order.orderNumber} placed successfully!`);

      if (contactChannel === 'whatsapp' && content?.whatsappNumber) {
        const msg = encodeURIComponent(
          `Hi Farm to Cup! I just placed Order #${order.orderNumber}.\n\nName: ${formData.name}\nTotal: ${formatPrice(total)}\nPayment: ${paymentMethod.toUpperCase()}\n\nPlease confirm my order. Thank you!`
        );
        window.open(`https://wa.me/${content.whatsappNumber}?text=${msg}`, '_blank');
      } else if (contactChannel === 'messenger' && content?.messengerUrl) {
        window.open(content.messengerUrl, '_blank');
      }

      navigate('/');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] pt-16 lg:pt-20 flex items-center justify-center">
        <div className="text-center px-6 py-20">
          <ShoppingBag size={64} className="text-[#8B5E3C]/30 mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold text-[#4A2C17] mb-3">Your Cart is Empty</h2>
          <p className="font-body text-base text-[#8B5E3C]/70 mb-8">Add some coffee to get started.</p>
          <Link to="/shop" className="btn-primary text-sm">Browse Coffee</Link>
        </div>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded border border-[#8B5E3C]/30 font-body text-sm text-[#1E1008] bg-white focus:outline-none focus:border-[#4A2C17] focus:ring-1 focus:ring-[#4A2C17] transition-colors";
  const labelClass = "font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17] mb-1.5 block";

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-16 lg:pt-20">
      <div className="container-custom py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/shop" className="text-[#8B5E3C] hover:text-[#4A2C17] transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-display text-3xl font-bold text-[#4A2C17]">Checkout</h1>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Form */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Customer Info */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="font-display text-xl font-bold text-[#4A2C17] mb-6">Delivery Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input name="name" value={formData.name} onChange={handleChange}
                      placeholder="Juan dela Cruz" className={`${inputClass} ${errors.name ? 'border-red-500' : ''}`} />
                    {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange}
                      placeholder="juan@example.com" className={`${inputClass} ${errors.email ? 'border-red-500' : ''}`} />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number *</label>
                    <input name="phone" value={formData.phone} onChange={handleChange}
                      placeholder="+63 9XX XXX XXXX" className={`${inputClass} ${errors.phone ? 'border-red-500' : ''}`} />
                    {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>City / Municipality *</label>
                    <input name="city" value={formData.city} onChange={handleChange}
                      placeholder="Baguio City" className={`${inputClass} ${errors.city ? 'border-red-500' : ''}`} />
                    {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Street Address *</label>
                    <input name="address" value={formData.address} onChange={handleChange}
                      placeholder="House No., Street, Barangay" className={`${inputClass} ${errors.address ? 'border-red-500' : ''}`} />
                    {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Province</label>
                    <select name="province" value={formData.province} onChange={handleChange} className={inputClass}>
                      {PH_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>ZIP Code</label>
                    <input name="zipCode" value={formData.zipCode} onChange={handleChange}
                      placeholder="2600" className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Order Notes (Optional)</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange}
                      rows={3} placeholder="Special instructions for your order..."
                      className={`${inputClass} resize-none`} />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="font-display text-xl font-bold text-[#4A2C17] mb-6">Payment Method</h2>
                <div className="grid grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map(method => (
                    <label key={method.value}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === method.value
                          ? 'border-[#4A2C17] bg-[#4A2C17]/5'
                          : 'border-[#8B5E3C]/20 hover:border-[#8B5E3C]/50'
                      }`}>
                      <input type="radio" name="paymentMethod" value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={() => setPaymentMethod(method.value)} className="sr-only" />
                      <span className="text-xl">{method.icon}</span>
                      <span className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17]">
                        {method.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact Channel */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="font-display text-xl font-bold text-[#4A2C17] mb-2">Order Confirmation Channel</h2>
                <p className="font-body text-sm text-[#8B5E3C]/70 mb-5">We'll send your order confirmation through:</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'whatsapp' as const, label: 'WhatsApp', icon: '💬', color: '#25D366' },
                    { value: 'messenger' as const, label: 'Messenger', icon: '📨', color: '#0084FF' },
                  ].map(ch => (
                    <label key={ch.value}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        contactChannel === ch.value
                          ? 'border-[#4A2C17] bg-[#4A2C17]/5'
                          : 'border-[#8B5E3C]/20 hover:border-[#8B5E3C]/50'
                      }`}>
                      <input type="radio" name="contactChannel" value={ch.value}
                        checked={contactChannel === ch.value}
                        onChange={() => setContactChannel(ch.value)} className="sr-only" />
                      <span className="text-xl">{ch.icon}</span>
                      <span className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17]">{ch.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 className="font-display text-xl font-bold text-[#4A2C17] mb-5">Order Summary</h2>

                {/* Cart Items */}
                <div className="flex flex-col gap-4 mb-5 max-h-72 overflow-y-auto">
                  {items.map(item => (
                    <div key={`${item.id}-${item.selectedVariant}`} className="flex gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#FAF7F2]">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          fallback="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&q=80"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-medium text-[#4A2C17] truncate">{item.name}</p>
                        <p className="font-label text-xs text-[#8B5E3C]">{item.selectedVariant}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button onClick={() => updateQuantity(item.id, item.selectedVariant, item.quantity - 1)}
                            className="w-5 h-5 rounded-full border border-[#8B5E3C]/30 text-[#8B5E3C] hover:border-[#4A2C17] hover:text-[#4A2C17] flex items-center justify-center text-xs transition-colors">
                            −
                          </button>
                          <span className="font-label text-xs font-semibold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.selectedVariant, item.quantity + 1)}
                            className="w-5 h-5 rounded-full border border-[#8B5E3C]/30 text-[#8B5E3C] hover:border-[#4A2C17] hover:text-[#4A2C17] flex items-center justify-center text-xs transition-colors">
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <span className="font-label text-xs font-bold text-[#4A2C17]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button onClick={() => removeItem(item.id, item.selectedVariant)}
                          className="text-[#8B5E3C]/50 hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-[#8B5E3C]/10 pt-4 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-[#8B5E3C]/80">Subtotal</span>
                    <span className="font-body text-sm text-[#4A2C17]">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-[#8B5E3C]/80">Shipping</span>
                    <span className="font-body text-sm text-[#4A2C17]">
                      {shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-[#8B5E3C]/10 mt-2">
                    <span className="font-label text-sm font-bold uppercase tracking-wider text-[#4A2C17]">Total</span>
                    <span className="font-display text-xl font-bold text-[#4A2C17]">{formatPrice(total)}</span>
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="btn-primary w-full mt-6 flex items-center justify-center gap-2 text-sm">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <MessageCircle size={16} />
                      Place Order via {contactChannel === 'whatsapp' ? 'WhatsApp' : 'Messenger'}
                    </>
                  )}
                </button>

                <p className="font-body text-xs text-[#8B5E3C]/60 text-center mt-3 leading-relaxed">
                  After placing your order, you'll be redirected to confirm and coordinate payment.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
