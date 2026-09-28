import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, CalendarDays, Sparkles } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Menu', href: '#menu', id: 'menu' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E8DEC8]'
          : 'bg-[#FAF7F2] border-b border-[#F0E6D8]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Wordmark / Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group text-[#29221F]"
          >
            {/* Indian Brass Diya / Temple Lamp Emblem */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B84A24] via-[#C2410C] to-[#D97706] flex items-center justify-center text-white shadow-xs transition-transform duration-200 group-hover:scale-105">
              <svg className="w-5 h-5 text-amber-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {/* Brass Diya Lamp shape */}
                <path d="M4 14c0 3.314 3.582 6 8 6s8-2.686 8-6H4Z" fill="currentColor" fillOpacity="0.2" />
                <path d="M12 4c-1.5 2-2 3.5-2 5a2 2 0 1 0 4 0c0-1.5-.5-3-2-5Z" fill="#FBBF24" stroke="#FBBF24" />
                <path d="M4 14c0 3.314 3.582 6 8 6s8-2.686 8-6H4Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#29221F] leading-none">
                Dakshin Heritage
              </span>
              <span className="text-[10px] tracking-widest text-[#B84A24] font-semibold uppercase mt-0.5">
                South Indian Cuisine & Filter Kaapi
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative py-1 transition-colors ${
                    isActive
                      ? 'text-[#B84A24] font-semibold'
                      : 'text-[#594A42] hover:text-[#29221F]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B84A24] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-3">
            {/* Tasting Tray / Cart Button */}
            <button
              onClick={onOpenCart}
              type="button"
              className="relative p-2.5 text-[#594A42] hover:text-[#29221F] rounded-lg hover:bg-[#F3ECE2] transition-colors focus-visible:outline-2 focus-visible:outline-[#B84A24]"
              aria-label="View meal selections"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B84A24] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Reservation Button */}
            <button
              onClick={onOpenReservation}
              type="button"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#B84A24] hover:bg-[#933418] rounded-lg shadow-xs transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#B84A24]"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Book a Table</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 text-[#594A42] hover:text-[#29221F] rounded-lg hover:bg-[#F3ECE2] transition-colors focus-visible:outline-2 focus-visible:outline-[#B84A24]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E8DEC8] px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-3 py-2.5 text-base font-medium rounded-md transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#F3ECE2] text-[#B84A24] font-semibold'
                    : 'text-[#594A42] hover:bg-[#F3ECE2] hover:text-[#29221F]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E8DEC8]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#B84A24] hover:bg-[#933418] rounded-lg shadow-xs transition-colors"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Book a Table</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
