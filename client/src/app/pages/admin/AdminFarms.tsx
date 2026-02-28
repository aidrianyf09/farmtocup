import React, { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, Upload } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { ImageWithFallback } from '../../components/ui/ImageWithFallback';
import { Skeleton } from '../../components/ui/LoadingSkeleton';
import api from '../../lib/axios';
import { toast } from 'sonner';

interface Farm { _id: string; name: string; region: string; description?: string; image?: { url: string }; }
const emptyForm = { name: '', region: '', description: '' };

export default function AdminFarms() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Farm | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchFarms(); }, []);

  const fetchFarms = async () => {
    try { const { data } = await api.get('/farms/admin'); setFarms(data); }
    catch { toast.error('Failed to load farms'); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setEditing(null); setFormData(emptyForm); setImageFile(null); setShowModal(true); };
  const openEdit = (farm: Farm) => { setEditing(farm); setFormData({ name: farm.name, region: farm.region, description: farm.description || '' }); setImageFile(null); setShowModal(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      if (imageFile) data.append('image', imageFile);
      if (editing) { await api.put(`/farms/${editing._id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Farm updated!'); }
      else { await api.post('/farms', data, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Farm added!'); }
      setShowModal(false); fetchFarms();
    } catch { toast.error('Failed to save farm'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this farm?')) return;
    try { await api.delete(`/farms/${id}`); toast.success('Farm deleted'); fetchFarms(); }
    catch { toast.error('Failed to delete farm'); }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-[#4A2C17]">Partner Farms</h1>
            <p className="font-body text-sm text-[#8B5E3C]/70 mt-1">{farms.length} farms</p>
          </div>
          <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm"><Plus size={16} /> Add Farm</button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {farms.map(farm => (
              <div key={farm._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="h-36 overflow-hidden relative">
                  <ImageWithFallback src={farm.image?.url} alt={farm.name} className="w-full h-full object-cover"
                    fallback="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=80" />
                </div>
                <div className="p-4">
                  <p className="font-label text-xs text-[#8B5E3C] uppercase tracking-wider mb-1">{farm.region}</p>
                  <h3 className="font-display text-lg font-semibold text-[#4A2C17] mb-1">{farm.name}</h3>
                  {farm.description && <p className="font-body text-xs text-[#8B5E3C]/70 line-clamp-2 mb-3">{farm.description}</p>}
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(farm)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded bg-[#4A2C17]/10 text-[#4A2C17] hover:bg-[#4A2C17] hover:text-white transition-all font-label text-xs font-semibold uppercase tracking-wider">
                      <Pencil size={13} /> Edit
                    </button>
                    <button onClick={() => handleDelete(farm._id)} className="flex items-center justify-center p-2 rounded bg-red-50 text-red-500 hover:bg-red-100 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-display text-xl font-bold text-[#4A2C17]">{editing ? 'Edit Farm' : 'Add Farm'}</h2>
            </div>
            <form onSubmit={handleSave} className="p-6 flex flex-col gap-4">
              {['name', 'region', 'description'].map(key => (
                <div key={key}>
                  <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17] mb-1.5 block">{key}</label>
                  {key === 'description'
                    ? <textarea value={(formData as any)[key]} onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))} rows={3}
                        className="w-full px-4 py-2.5 rounded border border-[#8B5E3C]/30 font-body text-sm focus:outline-none focus:border-[#4A2C17] resize-none" />
                    : <input value={(formData as any)[key]} onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))} required={key !== 'description'}
                        className="w-full px-4 py-2.5 rounded border border-[#8B5E3C]/30 font-body text-sm focus:outline-none focus:border-[#4A2C17]" />
                  }
                </div>
              ))}
              <div>
                <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17] mb-1.5 block">Image</label>
                <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-[#8B5E3C]/30 rounded-xl p-4 text-center cursor-pointer hover:border-[#4A2C17]/50 transition-colors">
                  <Upload size={18} className="text-[#8B5E3C]/50 mx-auto mb-1" />
                  <p className="font-body text-xs text-[#8B5E3C]/60">{imageFile ? imageFile.name : 'Click to upload'}</p>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => setImageFile(e.target.files?.[0] || null)} />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded border-2 border-[#8B5E3C]/30 font-label text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] hover:border-[#4A2C17] transition-all">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded bg-[#4A2C17] font-label text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] hover:bg-[#6B4423] transition-colors flex items-center justify-center gap-2">
                  {saving ? <><div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white" /> Saving...</> : 'Save Farm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
