import React, { useState } from 'react';
import { Mail, Phone, Facebook, Instagram, MessageCircle, Send } from 'lucide-react';
import { useCMS } from '../hooks/useCMS';
import api from '../lib/axios';
import { toast } from 'sonner';

export default function Connect() {
  const { content } = useCMS();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/contact', formData);
      toast.success('Message sent! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative h-52 bg-[#4A7C59] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200&q=80)' }} />
        <div className="relative z-10 text-center px-6">
          <p className="font-label text-xs tracking-[0.3em] uppercase text-[#FAF7F2]/70 mb-3">We'd Love to Hear From You</p>
          <h1 className="font-display text-5xl font-bold text-[#FAF7F2]">Connect</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-3xl font-bold text-[#4A2C17] mb-6">Get in Touch</h2>
              <p className="font-body text-base text-[#1E1008]/70 leading-relaxed mb-10">
                Whether you're interested in our coffee, private events, farm tours, or just want to chat about Philippine specialty coffee — we're here for you.
              </p>

              <div className="flex flex-col gap-6 mb-10">
                {content?.contactEmail && (
                  <a href={`mailto:${content.contactEmail}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-[#4A2C17]/10 flex items-center justify-center text-[#4A2C17] group-hover:bg-[#4A2C17] group-hover:text-[#FAF7F2] transition-all">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="font-label text-xs uppercase tracking-wider text-[#8B5E3C]">Email</p>
                      <p className="font-body text-sm text-[#1E1008]">{content.contactEmail}</p>
                    </div>
                  </a>
                )}
                {content?.contactPhone && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#4A2C17]/10 flex items-center justify-center text-[#4A2C17]">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="font-label text-xs uppercase tracking-wider text-[#8B5E3C]">Phone / WhatsApp</p>
                      <p className="font-body text-sm text-[#1E1008]">{content.contactPhone}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex flex-col gap-4">
                <h3 className="font-label text-xs uppercase tracking-widest text-[#8B5E3C]">Follow Us</h3>
                <div className="flex gap-4">
                  {content?.facebookUrl && (
                    <a href={content.facebookUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3 bg-[#1877F2] text-white rounded-lg font-label text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity">
                      <Facebook size={16} /> Facebook
                    </a>
                  )}
                  {content?.instagramUrl && (
                    <a href={content.instagramUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-label text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity">
                      <Instagram size={16} /> Instagram
                    </a>
                  )}
                </div>
                {content?.whatsappNumber && (
                  <a
                    href={`https://wa.me/${content.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-5 py-3 bg-[#25D366] text-white rounded-lg font-label text-xs font-semibold uppercase tracking-wider w-fit hover:opacity-90 transition-opacity"
                  >
                    <MessageCircle size={16} /> Chat on WhatsApp
                  </a>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-display text-3xl font-bold text-[#4A2C17] mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17]">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Juan dela Cruz"
                      required
                      className="px-4 py-3 rounded border border-[#8B5E3C]/30 font-body text-sm text-[#1E1008] bg-white focus:outline-none focus:border-[#4A2C17] focus:ring-1 focus:ring-[#4A2C17] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17]">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="juan@example.com"
                      required
                      className="px-4 py-3 rounded border border-[#8B5E3C]/30 font-body text-sm text-[#1E1008] bg-white focus:outline-none focus:border-[#4A2C17] focus:ring-1 focus:ring-[#4A2C17] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17]">Phone</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+63 9XX XXX XXXX"
                    className="px-4 py-3 rounded border border-[#8B5E3C]/30 font-body text-sm text-[#1E1008] bg-white focus:outline-none focus:border-[#4A2C17] focus:ring-1 focus:ring-[#4A2C17] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17]">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="px-4 py-3 rounded border border-[#8B5E3C]/30 font-body text-sm text-[#1E1008] bg-white focus:outline-none focus:border-[#4A2C17] focus:ring-1 focus:ring-[#4A2C17] transition-colors"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Question</option>
                    <option value="wholesale">Wholesale / B2B</option>
                    <option value="events">Private Events</option>
                    <option value="farm-tour">Farm Tour</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17]">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    required
                    className="px-4 py-3 rounded border border-[#8B5E3C]/30 font-body text-sm text-[#1E1008] bg-white focus:outline-none focus:border-[#4A2C17] focus:ring-1 focus:ring-[#4A2C17] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary text-sm flex items-center justify-center gap-2 self-start"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
