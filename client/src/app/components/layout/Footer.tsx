import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail } from 'lucide-react';
import { useCMS } from '../../hooks/useCMS';

export function Footer() {
  const { content } = useCMS();

  return (
    <footer className="bg-[#1E1008] text-[#FAF7F2]">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-2xl font-bold text-[#FAF7F2] mb-2">Farm to Cup</h3>
            <p className="font-label text-xs tracking-widest text-[#8B5E3C] uppercase mb-4">Philippines</p>
            <p className="font-body text-sm text-[#FAF7F2]/70 leading-relaxed max-w-sm mb-6">
              Connecting Philippine highland coffee farmers with coffee lovers nationwide.
              Every cup tells a story of the land and the people who nurture it.
            </p>
            <div className="flex gap-4">
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

          {/* Quick Links */}
          <div>
            <h4 className="font-label text-xs font-semibold uppercase tracking-widest text-[#8B5E3C] mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/shop', label: 'Shop' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="font-body text-sm text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-label text-xs font-semibold uppercase tracking-widest text-[#8B5E3C] mb-4">Company</h4>
            <ul className="flex flex-col gap-3">
              {[
                { to: '/about', label: 'Who We Are' },
                { to: '/about#team', label: 'Our Team' },
                { to: '/about#story', label: 'Our Story' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="font-body text-sm text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-label text-xs font-semibold uppercase tracking-widest text-[#8B5E3C] mb-4">Support</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/connect" className="font-body text-sm text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/connect#faq" className="font-body text-sm text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors">
                  FAQs
                </Link>
              </li>
              {content?.contactEmail && (
                <li className="flex items-start gap-2 font-body text-sm text-[#FAF7F2]/70 mt-2">
                  <Mail size={14} className="mt-0.5 flex-shrink-0" />
                  <a href={`mailto:${content.contactEmail}`} className="hover:text-[#FAF7F2] transition-colors break-all">
                    {content.contactEmail}
                  </a>
                </li>
              )}
              {content?.contactPhone && (
                <li className="flex items-center gap-2 font-body text-sm text-[#FAF7F2]/70">
                  <Phone size={14} className="flex-shrink-0" />
                  <span>{content.contactPhone}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#FAF7F2]/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
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
