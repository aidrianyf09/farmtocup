import React, { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, Upload } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { ImageWithFallback } from '../../components/ui/ImageWithFallback';
import { Skeleton } from '../../components/ui/LoadingSkeleton';
import api from '../../lib/axios';
import { toast } from 'sonner';

interface Member { _id: string; name: string; role: string; bio?: string; photo?: { url: string }; email?: string; }
const emptyForm = { name: '', role: '', bio: '', email: '', facebook: '', instagram: '', linkedin: '' };

export default function AdminTeam() {
  const [team, setTeam] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchTeam(); }, []);

  const fetchTeam = async () => {
    try { const { data } = await api.get('/team/admin'); setTeam(data); }
    catch { toast.error('Failed to load team'); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setEditing(null); setFormData(emptyForm); setPhotoFile(null); setShowModal(true); };
  const openEdit = (member: Member) => {
    setEditing(member);
    setFormData({ name: member.name, role: member.role, bio: member.bio || '', email: member.email || '', facebook: '', instagram: '', linkedin: '' });
    setPhotoFile(null); setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      if (photoFile) data.append('photo', photoFile);
      if (editing) { await api.put(`/team/${editing._id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Member updated!'); }
      else { await api.post('/team', data, { headers: { 'Content-Type': 'multipart/form-data' } }); toast.success('Member added!'); }
      setShowModal(false); fetchTeam();
    } catch { toast.error('Failed to save member'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this team member?')) return;
    try { await api.delete(`/team/${id}`); toast.success('Member removed'); fetchTeam(); }
    catch { toast.error('Failed to remove member'); }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-[#4A2C17]">Team Members</h1>
            <p className="font-body text-sm text-[#8B5E3C]/70 mt-1">{team.length} members</p>
          </div>
          <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm"><Plus size={16} /> Add Member</button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {team.map(member => (
              <div key={member._id} className="bg-white rounded-xl shadow-sm p-5 flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#8B5E3C]/20">
                  <ImageWithFallback src={member.photo?.url} alt={member.name} className="w-full h-full object-cover"
                    fallback={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=4A2C17&color=FAF7F2&size=64`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-semibold text-[#4A2C17] truncate">{member.name}</h3>
                  <p className="font-label text-xs text-[#8B5E3C] uppercase tracking-wider mb-2">{member.role}</p>
                  {member.bio && <p className="font-body text-xs text-[#8B5E3C]/70 line-clamp-2 mb-3">{member.bio}</p>}
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(member)} className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#4A2C17]/10 text-[#4A2C17] hover:bg-[#4A2C17] hover:text-white transition-all font-label text-xs font-semibold uppercase tracking-wider">
                      <Pencil size={11} /> Edit
                    </button>
                    <button onClick={() => handleDelete(member._id)} className="flex items-center gap-1 p-1.5 rounded bg-red-50 text-red-500 hover:bg-red-100 transition-all">
                      <Trash2 size={13} />
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
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-display text-xl font-bold text-[#4A2C17]">{editing ? 'Edit Member' : 'Add Member'}</h2>
            </div>
            <form onSubmit={handleSave} className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                {['name', 'role', 'email', 'facebook', 'instagram', 'linkedin'].map(key => (
                  <div key={key} className={key === 'name' || key === 'role' ? '' : ''}>
                    <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17] mb-1.5 block">{key}</label>
                    <input value={(formData as any)[key]} onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))} required={key === 'name' || key === 'role'}
                      className="w-full px-3 py-2.5 rounded border border-[#8B5E3C]/30 font-body text-sm focus:outline-none focus:border-[#4A2C17]" />
                  </div>
                ))}
              </div>
              <div>
                <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17] mb-1.5 block">Bio</label>
                <textarea value={formData.bio} onChange={e => setFormData(p => ({ ...p, bio: e.target.value }))} rows={3}
                  className="w-full px-4 py-2.5 rounded border border-[#8B5E3C]/30 font-body text-sm focus:outline-none focus:border-[#4A2C17] resize-none" />
              </div>
              <div>
                <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17] mb-1.5 block">Profile Photo</label>
                <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-[#8B5E3C]/30 rounded-xl p-4 text-center cursor-pointer hover:border-[#4A2C17]/50 transition-colors">
                  <Upload size={18} className="text-[#8B5E3C]/50 mx-auto mb-1" />
                  <p className="font-body text-xs text-[#8B5E3C]/60">{photoFile ? photoFile.name : 'Click to upload'}</p>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => setPhotoFile(e.target.files?.[0] || null)} />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded border-2 border-[#8B5E3C]/30 font-label text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] hover:border-[#4A2C17] transition-all">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded bg-[#4A2C17] font-label text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] hover:bg-[#6B4423] transition-colors flex items-center justify-center gap-2">
                  {saving ? <><div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white" /> Saving...</> : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
