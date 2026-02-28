import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail } from 'lucide-react';
import { useCMS } from '../../hooks/useCMS';

export function Footer() {
  const { content } = useCMS();

  return (
    <footer className="bg-[#1E1008] text-[#FAF7F2]">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold text-[#FAF7F2] mb-2">Farm to Cup</h3>
            <p className="font-label text-xs tracking-widest text-[#8B5E3C] uppercase mb-4">Philippines</p>
            <p className="font-body text-sm text-[#FAF7F2]/70 leading-relaxed max-w-sm">
              Connecting Philippine highland coffee farmers with coffee lovers nationwide.
              Every cup tells a story of the land and the people who nurture it.
            </p>
            <div className="flex gap-4 mt-6">
              {content?.facebookUrl && (
                <a href={content.facebookUrl} target="_blank" rel="noopener noreferrer"
                  className="text-[#FAF7F2]/60 hover:text-[#8B5E3C] transition-colors">
                  <Facebook size={20} />
                </a>
              )}
              {content?.instagramUrl && (
                <a href={content.instagramUrl} target="_blank" rel="noopener noreferrer"
                  className="text-[#FAF7F2]/60 hover:text-[#8B5E3C] transition-colors">
                  <Instagram size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-label text-xs font-semibold uppercase tracking-widest text-[#8B5E3C] mb-4">Navigate</h4>
            <ul className="flex flex-col gap-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/shop', label: 'Shop' },
                { to: '/connect', label: 'Connect' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="font-body text-sm text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-label text-xs font-semibold uppercase tracking-widest text-[#8B5E3C] mb-4">Contact</h4>
            <ul className="flex flex-col gap-3">
              {content?.contactEmail && (
                <li className="flex items-center gap-2 font-body text-sm text-[#FAF7F2]/70">
                  <Mail size={14} />
                  <a href={`mailto:${content.contactEmail}`} className="hover:text-[#FAF7F2] transition-colors">
                    {content.contactEmail}
                  </a>
                </li>
              )}
              {content?.contactPhone && (
                <li className="flex items-center gap-2 font-body text-sm text-[#FAF7F2]/70">
                  <Phone size={14} />
                  <span>{content.contactPhone}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#FAF7F2]/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-[#FAF7F2]/40">
            © {new Date().getFullYear()} Farm to Cup Philippines. All rights reserved.
          </p>
          <p className="font-body text-xs text-[#FAF7F2]/40">
            Farm. Roast. Brew.
          </p>
        </div>
      </div>
    </footer>
  );
}
