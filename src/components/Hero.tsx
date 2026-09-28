import React from 'react';
import { Clock, MapPin, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onBookTable }) => {
  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Warm ambient background glows */}
      <div 
        className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#FDBA74]/35 to-[#FED7AA]/20 blur-3xl pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/2 left-0 -ml-24 w-80 h-80 rounded-full bg-gradient-to-tr from-[#FEF08A]/30 to-[#FDBA74]/20 blur-2xl pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Text (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Subtle editorial kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B84A24]">
              <span className="w-6 h-px bg-[#B84A24]" />
              <span>Ancestral Flavours of the Deep South · Curry Hill, NY</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#29221F] leading-[1.1] text-balance">
              Stone-ground dosas, clay pot curries, and authentic filter kaapi.
            </h1>

            <p className="text-base sm:text-lg text-[#594A42] leading-relaxed max-w-2xl">
              Welcome to Dakshin Heritage. We grind our heirloom rice batters in granite stone grinders, roast whole Chettinad spices on heavy iron skillets, and serve steaming dosas on fresh banana leaves with aromatic sambar and stone-ground chutneys.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                type="button"
                className="px-6 py-3 text-sm font-semibold text-white bg-[#B84A24] hover:bg-[#933418] rounded-lg shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#B84A24]"
              >
                Explore South Indian Menu
              </button>
              <button
                onClick={onBookTable}
                type="button"
                className="px-6 py-3 text-sm font-semibold text-[#29221F] bg-[#EFE7DA] hover:bg-[#E5DBCB] border border-[#DDCFBC] rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[#B84A24]"
              >
                Reserve a Table
              </button>
            </div>

            {/* Quick Informational Highlights */}
            <div className="pt-6 border-t border-[#E8DEC8] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#594A42]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B84A24] shrink-0" />
                <span>Lunch & Dinner Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B84A24] shrink-0" />
                <span>248 Lexington Ave, NYC</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B84A24] shrink-0" />
                <span>Sunday Grand Banana Leaf Sadhya</span>
              </div>
            </div>

          </div>

          {/* Hero Feature Visual Card (5 cols on lg) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#2D221D] to-[#1C1613] text-[#FAF7F2] p-8 shadow-xl overflow-hidden border border-[#44352D]">
              
              {/* Warm spice & brass glow overlay */}
              <div 
                className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-gradient-to-br from-[#D97706]/35 to-transparent blur-2xl" 
                aria-hidden="true" 
              />
              <div 
                className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-gradient-to-tr from-[#B84A24]/30 to-transparent blur-xl" 
                aria-hidden="true" 
              />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#FED7AA]">
                    <Sparkles className="w-3.5 h-3.5 text-[#FDBA74]" />
                    <span>Signature Tiffin Feast</span>
                  </div>
                  <span className="text-xs text-[#CDBDB3] font-mono tabular-nums">
                    Fresh Every Morning
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Mysore Masala Dosa
                  </h3>
                  <p className="text-xs text-[#D8C9BF] leading-relaxed">
                    Golden cast-iron tawa crepe smeared with fiery red garlic-chili paste, stuffed with tempered turmeric potato masala, served with drumstick sambar and fresh coconut, tomato & coriander chutneys.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#44352D] flex items-center justify-between">
                  <div>
                    <span className="block text-[11px] text-[#A8988E] uppercase tracking-wider">Traditional Companion</span>
                    <span className="text-xs font-medium text-[#FED7AA]">Kumbakonam Brass Filter Kaapi</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[11px] text-[#A8988E] uppercase tracking-wider">Price</span>
                    <span className="text-xl font-bold font-serif text-white tabular-nums">$14.50</span>
                  </div>
                </div>

                <div className="bg-[#3D2F28]/70 rounded-xl p-3 border border-[#523F36] flex items-center gap-3 text-xs text-[#D8C9BF]">
                  <div className="w-2 h-2 rounded-full bg-[#F59E0B] shrink-0" />
                  <span>Naturally fermented 48-hour batter prepared with heritage parboiled ponni rice & urad dal.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
