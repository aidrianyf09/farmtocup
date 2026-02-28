import React, { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Badge } from '../../components/ui/Badge';
import { Skeleton } from '../../components/ui/LoadingSkeleton';
import { ImageWithFallback } from '../../components/ui/ImageWithFallback';
import { formatPrice } from '../../lib/utils';
import api from '../../lib/axios';
import { toast } from 'sonner';

interface Product {
  _id: string;
  name: string;
  category: 'green' | 'roasted';
  description: string;
  price: number;
  image?: { url: string; publicId: string };
  variants: string[];
  stock: number;
  isActive: boolean;
}

const emptyForm = { name: '', category: 'green', description: '', price: '', variants: '250g,500g,1kg', stock: '0', isActive: true };

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<any>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products/admin');
      setProducts(data);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setImageFile(null);
    setShowModal(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price.toString(),
      variants: product.variants.join(','),
      stock: product.stock.toString(),
      isActive: product.isActive,
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('variants', JSON.stringify(formData.variants.split(',').map((v: string) => v.trim())));
      data.append('stock', formData.stock);
      data.append('isActive', String(formData.isActive));
      if (imageFile) data.append('image', imageFile);

      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product updated!');
      } else {
        await api.post('/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product created!');
      }
      setShowModal(false);
      fetchProducts();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch {
      toast.error('Failed to delete product');
    }
  };

  const handleToggleActive = async (product: Product) => {
    try {
      await api.put(`/products/${product._id}`, { isActive: !product.isActive });
      toast.success(`Product ${!product.isActive ? 'activated' : 'deactivated'}`);
      fetchProducts();
    } catch {
      toast.error('Failed to update product');
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-[#4A2C17]">Products</h1>
            <p className="font-body text-sm text-[#8B5E3C]/70 mt-1">{products.length} total products</p>
          </div>
          <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm">
            <Plus size={16} /> Add Product
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-56 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map(product => (
              <div key={product._id} className={`bg-white rounded-xl shadow-sm overflow-hidden border-2 transition-all ${product.isActive ? 'border-transparent' : 'border-red-200 opacity-75'}`}>
                <div className="relative h-40 overflow-hidden">
                  <ImageWithFallback
                    src={product.image?.url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    fallback="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80"
                  />
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    <Badge variant={product.category === 'green' ? 'green' : 'roasted'}>
                      {product.category}
                    </Badge>
                    {!product.isActive && <Badge variant="danger">Inactive</Badge>}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-base font-semibold text-[#4A2C17] mb-1 truncate">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display text-lg font-bold text-[#4A2C17]">{formatPrice(product.price)}</span>
                    <span className="font-label text-xs text-[#8B5E3C]/70">Stock: {product.stock}</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap mb-3">
                    {product.variants.map(v => (
                      <span key={v} className="px-2 py-0.5 bg-[#FAF7F2] rounded text-xs font-label text-[#8B5E3C]">{v}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(product)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded bg-[#4A2C17]/10 text-[#4A2C17] hover:bg-[#4A2C17] hover:text-white transition-all font-label text-xs font-semibold uppercase tracking-wider">
                      <Pencil size={13} /> Edit
                    </button>
                    <button onClick={() => handleToggleActive(product)} className="flex items-center justify-center gap-1.5 p-2 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
                      {product.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button onClick={() => handleDelete(product._id)} className="flex items-center justify-center gap-1.5 p-2 rounded bg-red-50 text-red-500 hover:bg-red-100 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-display text-xl font-bold text-[#4A2C17]">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
            </div>
            <form onSubmit={handleSave} className="p-6 flex flex-col gap-4">
              <div>
                <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17] mb-1.5 block">Name *</label>
                <input value={formData.name} onChange={e => setFormData((p: any) => ({ ...p, name: e.target.value }))} required
                  className="w-full px-4 py-2.5 rounded border border-[#8B5E3C]/30 font-body text-sm focus:outline-none focus:border-[#4A2C17]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17] mb-1.5 block">Category *</label>
                  <select value={formData.category} onChange={e => setFormData((p: any) => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded border border-[#8B5E3C]/30 font-body text-sm focus:outline-none focus:border-[#4A2C17]">
                    <option value="green">Green Beans</option>
                    <option value="roasted">Roasted</option>
                  </select>
                </div>
                <div>
                  <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17] mb-1.5 block">Price (₱) *</label>
                  <input type="number" value={formData.price} onChange={e => setFormData((p: any) => ({ ...p, price: e.target.value }))} required min="0"
                    className="w-full px-4 py-2.5 rounded border border-[#8B5E3C]/30 font-body text-sm focus:outline-none focus:border-[#4A2C17]" />
                </div>
              </div>
              <div>
                <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17] mb-1.5 block">Description *</label>
                <textarea value={formData.description} onChange={e => setFormData((p: any) => ({ ...p, description: e.target.value }))} required rows={3}
                  className="w-full px-4 py-2.5 rounded border border-[#8B5E3C]/30 font-body text-sm focus:outline-none focus:border-[#4A2C17] resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17] mb-1.5 block">Variants (comma-separated)</label>
                  <input value={formData.variants} onChange={e => setFormData((p: any) => ({ ...p, variants: e.target.value }))}
                    placeholder="250g,500g,1kg"
                    className="w-full px-4 py-2.5 rounded border border-[#8B5E3C]/30 font-body text-sm focus:outline-none focus:border-[#4A2C17]" />
                </div>
                <div>
                  <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17] mb-1.5 block">Stock</label>
                  <input type="number" value={formData.stock} onChange={e => setFormData((p: any) => ({ ...p, stock: e.target.value }))} min="0"
                    className="w-full px-4 py-2.5 rounded border border-[#8B5E3C]/30 font-body text-sm focus:outline-none focus:border-[#4A2C17]" />
                </div>
              </div>
              <div>
                <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17] mb-1.5 block">Product Image</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-[#8B5E3C]/30 rounded-xl p-6 text-center cursor-pointer hover:border-[#4A2C17]/50 transition-colors"
                >
                  <Upload size={20} className="text-[#8B5E3C]/50 mx-auto mb-2" />
                  <p className="font-body text-sm text-[#8B5E3C]/60">
                    {imageFile ? imageFile.name : (editingProduct?.image ? 'Replace image' : 'Click to upload')}
                  </p>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={e => setImageFile(e.target.files?.[0] || null)} />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.isActive} onChange={e => setFormData((p: any) => ({ ...p, isActive: e.target.checked }))}
                  className="w-4 h-4 accent-[#4A2C17]" />
                <span className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17]">Active (visible in shop)</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded border-2 border-[#8B5E3C]/30 font-label text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] hover:border-[#4A2C17] hover:text-[#4A2C17] transition-all">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-2.5 rounded bg-[#4A2C17] font-label text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] hover:bg-[#6B4423] transition-colors flex items-center justify-center gap-2">
                  {saving ? <><div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white" /> Saving...</> : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
