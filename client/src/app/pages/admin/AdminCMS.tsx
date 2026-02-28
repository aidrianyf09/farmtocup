import React, { useState, useEffect, useRef } from 'react';
import { Save, Upload, Image } from 'lucide-react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Skeleton } from '../../components/ui/LoadingSkeleton';
import { ImageWithFallback } from '../../components/ui/ImageWithFallback';
import api from '../../lib/axios';
import { toast } from 'sonner';

const IMAGE_FIELDS = [
  { field: 'heroImage', label: 'Hero Background Image' },
  { field: 'weddingsImage', label: 'Weddings Event Image' },
  { field: 'birthdaysImage', label: 'Birthdays Event Image' },
  { field: 'farmToursImage', label: 'Farm Tours Event Image' },
  { field: 'brandStoryImage', label: 'Brand Story Image (About Page)' },
];

export default function AdminCMS() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    api.get('/cms')
      .then(({ data }) => setContent(data))
      .catch(() => toast.error('Failed to load CMS content'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key: string, value: string) => {
    setContent((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await api.put('/cms', content);
      setContent(data);
      toast.success('Content saved!');
    } catch {
      toast.error('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (field: string, file: File) => {
    setUploadingField(field);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await api.post(`/cms/upload/${field}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setContent(data);
      toast.success('Image updated!');
    } catch {
      toast.error('Failed to upload image');
    } finally {
      setUploadingField(null);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 flex flex-col gap-4">
          {Array(8).fill(0).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
        </div>
      </AdminLayout>
    );
  }

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-[#8B5E3C]/30 font-body text-sm text-[#1E1008] bg-white focus:outline-none focus:border-[#4A2C17] transition-colors";
  const labelClass = "font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17] mb-1.5 block";

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-[#4A2C17]">Website Content</h1>
            <p className="font-body text-sm text-[#8B5E3C]/70 mt-1">Edit website text and images</p>
          </div>
          <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 text-sm">
            {saving ? <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> Saving...</> : <><Save size={16} /> Save All Changes</>}
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Hero Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-[#4A2C17] mb-5">Hero Section</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className={labelClass}>Headline</label>
                <input value={content?.heroHeadline || ''} onChange={e => handleChange('heroHeadline', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Subtitle / Tagline</label>
                <input value={content?.heroSubtitle || ''} onChange={e => handleChange('heroSubtitle', e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-[#4A2C17] mb-5">Events Section</h2>
            <div className="flex flex-col gap-4">
              {[
                { titleKey: 'weddingsTitle', descKey: 'weddingsDesc', label: 'Weddings' },
                { titleKey: 'birthdaysTitle', descKey: 'birthdaysDesc', label: 'Birthdays' },
                { titleKey: 'farmToursTitle', descKey: 'farmToursDesc', label: 'Farm Tours' },
              ].map(({ titleKey, descKey, label }) => (
                <div key={titleKey} className="border border-[#8B5E3C]/10 rounded-xl p-4">
                  <p className="font-label text-xs font-semibold text-[#8B5E3C] uppercase tracking-wider mb-2">{label}</p>
                  <input value={content?.[titleKey] || ''} onChange={e => handleChange(titleKey, e.target.value)}
                    placeholder="Title" className={`${inputClass} mb-2`} />
                  <textarea value={content?.[descKey] || ''} onChange={e => handleChange(descKey, e.target.value)}
                    rows={2} placeholder="Description" className={`${inputClass} resize-none`} />
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-[#4A2C17] mb-5">Contact & Social</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: 'contactEmail', label: 'Email', placeholder: 'hello@farmtocup.ph' },
                { key: 'contactPhone', label: 'Phone', placeholder: '+63 917...' },
                { key: 'facebookUrl', label: 'Facebook URL', placeholder: 'https://facebook.com/...' },
                { key: 'instagramUrl', label: 'Instagram URL', placeholder: 'https://instagram.com/...' },
                { key: 'whatsappNumber', label: 'WhatsApp Number', placeholder: '639171234567' },
                { key: 'messengerUrl', label: 'Messenger URL', placeholder: 'https://m.me/...' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className={labelClass}>{label}</label>
                  <input value={content?.[key] || ''} onChange={e => handleChange(key, e.target.value)}
                    placeholder={placeholder} className={inputClass} />
                </div>
              ))}
            </div>
          </div>

          {/* Brand Story */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-[#4A2C17] mb-5">Brand Story (About Page)</h2>
            <textarea
              value={content?.brandStoryText || ''}
              onChange={e => handleChange('brandStoryText', e.target.value)}
              rows={8}
              placeholder="Tell the Farm to Cup story..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Image Uploads */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold text-[#4A2C17] mb-5">Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {IMAGE_FIELDS.map(({ field, label }) => (
                <div key={field} className="flex flex-col gap-2">
                  <p className="font-label text-xs uppercase tracking-wider text-[#8B5E3C] text-center">{label}</p>
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-[#FAF7F2] border-2 border-dashed border-[#8B5E3C]/20">
                    {content?.[field]?.url && (
                      <ImageWithFallback src={content[field].url} alt={label} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-all group">
                      <button
                        onClick={() => fileRefs.current[field]?.click()}
                        disabled={uploadingField === field}
                        className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg px-3 py-1.5 font-label text-xs font-semibold text-[#4A2C17] flex items-center gap-1.5"
                      >
                        {uploadingField === field ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b border-[#4A2C17]" />
                        ) : (
                          <Upload size={12} />
                        )}
                        Upload
                      </button>
                    </div>
                    {!content?.[field]?.url && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                        <Image size={24} className="text-[#8B5E3C]/30" />
                        <button
                          onClick={() => fileRefs.current[field]?.click()}
                          className="font-label text-xs text-[#8B5E3C]/50 hover:text-[#4A2C17] transition-colors"
                        >
                          Upload
                        </button>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={el => { fileRefs.current[field] = el; }}
                    onChange={e => { const file = e.target.files?.[0]; if (file) handleImageUpload(field, file); }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
