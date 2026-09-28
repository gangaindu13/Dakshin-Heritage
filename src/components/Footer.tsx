import React from 'react';
import { RESTAURANT_INFO } from '../data/menuData.ts';
import { Instagram, Facebook, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Starters & Tiffin', href: '#menu' },
    { label: 'Dosas & Biryanis', href: '#menu' },
    { label: 'Payasam & Sweets', href: '#menu' },
    { label: 'Filter Kaapi & Drinks', href: '#menu' },
    { label: 'Heritage & Roots', href: '#about' },
    { label: 'Table Reservations', href: '#contact' },
  ];

  return (
    <footer className="bg-[#1F1916] text-[#FAF7F2] border-t border-[#332822] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#332822]">
          
          {/* Brand & Ethos (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#B84A24] flex items-center justify-center text-white">
                <svg className="w-4 h-4 text-amber-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 14c0 3.314 3.582 6 8 6s8-2.686 8-6H4Z" fill="currentColor" fillOpacity="0.3" />
                  <path d="M12 4c-1.5 2-2 3.5-2 5a2 2 0 1 0 4 0c0-1.5-.5-3-2-5Z" fill="#FBBF24" stroke="#FBBF24" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Dakshin Heritage
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#A8988E] leading-relaxed max-w-sm">
              Authentic South Indian dining in Curry Hill, New York. Stone-ground naturally fermented dosas, aromatic Seeraga Samba clay pot biryanis, and traditional Kumbakonam brass filter coffee served with timeless hospitality.
            </p>

            <div className="pt-2 text-xs text-[#CDBDB3] space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B84A24]" />
                <span>{RESTAURANT_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B84A24]" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B84A24]" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </p>
            </div>
          </div>

          {/* Quick Menu & Site Links (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FED7AA]">
              Explore Specialties
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#A8988E] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Social Links (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FED7AA]">
              Tiffin & Meal Timings
            </h4>
            <div className="space-y-2 text-xs text-[#A8988E]">
              <div className="flex justify-between border-b border-[#2D221D] pb-1">
                <span>Mon – Thu</span>
                <span className="text-[#FAF7F2]">11:30 AM – 10:30 PM</span>
              </div>
              <div className="flex justify-between border-b border-[#2D221D] pb-1">
                <span>Fri – Sat</span>
                <span className="text-[#FAF7F2]">11:00 AM – 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday Sadhya Feast</span>
                <span className="text-[#FAF7F2]">11:00 AM – 10:00 PM</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="block text-[11px] uppercase tracking-wider text-[#A8988E] mb-2 font-medium">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#2D221D] hover:bg-[#B84A24] text-[#CDBDB3] hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#2D221D] hover:bg-[#B84A24] text-[#CDBDB3] hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://tripadvisor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-[#2D221D] hover:bg-[#B84A24] text-[11px] font-medium text-[#CDBDB3] hover:text-white transition-colors"
                >
                  TripAdvisor
                </a>
                <a
                  href="https://opentable.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-[#2D221D] hover:bg-[#B84A24] text-[11px] font-medium text-[#CDBDB3] hover:text-white transition-colors"
                >
                  OpenTable
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7A70]">
          <div>
            © {new Date().getFullYear()} Dakshin Heritage NYC. Annam Brahma · Pure Hospitality.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-[#A8988E]">
              Curry Hill, Manhattan · Stone-Ground & Pure Ghee
            </span>
            <button
              onClick={scrollToTop}
              type="button"
              className="inline-flex items-center gap-1.5 text-xs text-[#FED7AA] hover:text-white transition-colors"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
