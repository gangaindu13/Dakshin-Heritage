import React from 'react';
import { Award, Clock, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      title: 'Stone-Ground Fermentation',
      description:
        'Our idli and dosa batters are ground exclusively in traditional granite stone grinders for hours, followed by natural 48-hour wild fermentation that yields unparalleled lightness, crispness, and gut-healthy probiotics.',
    },
    {
      title: 'Pure Cow Ghee & Cold-Pressed Oils',
      description:
        'We never use processed palm oils. Every dosa is crisped in golden A2 cow ghee, and our curries and tadkas are tempered with cold-pressed gingelly (sesame) oil and pure virgin coconut oil.',
    },
    {
      title: 'Western Ghats Spices & Fresh Curry Leaves',
      description:
        'Our Tellicherry black peppercorns, Guntur red chilies, green cardamom, and fresh curry leaves are sourced directly from sustainable agro-forest estates in Kerala and Tamil Nadu.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#F5EFE6] border-t border-[#E8DEC8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B84A24]">
              <span className="w-6 h-px bg-[#B84A24]" />
              <span>Heritage & Culinary Roots</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#29221F] tracking-tight leading-tight text-balance">
              Celebrating the soul and spice of ancestral South Indian kitchens.
            </h2>

            <p className="text-base text-[#594A42] leading-relaxed">
              Dakshin Heritage was established to preserve and celebrate the extraordinary diversity of South Indian gastronomy. South Indian food is far more than street snacks; it is an ancient science of slow fermentation, fragrant mustard tadkas, tangy kokum, and warm coconut milk.
            </p>

            <p className="text-sm text-[#594A42] leading-relaxed">
              Whether you are savoring our crispy Mysore Masala Dosa, indulging in a fiery Chettinad Seeraga Samba biryani slow-cooked in earthenware clay pots, or ending with a frothy brass tumbler of filter coffee, every bite is cooked with reverence, purity, and heartfelt hospitality.
            </p>

            {/* Chef Quote Card */}
            <div className="p-6 rounded-xl bg-white border border-[#E2D5C3] shadow-xs space-y-3">
              <blockquote className="font-serif text-lg italic text-[#29221F] leading-snug">
                "In South Indian tradition, feeding a guest is considered Annam Brahma — serving food is serving the divine. We prepare our podis and chutneys every single morning just as our grandmothers did."
              </blockquote>
              <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE1]">
                <div>
                  <span className="block text-xs font-bold text-[#29221F]">Chef Sundaram Raghavan</span>
                  <span className="block text-[11px] text-[#8C6D58]">Culinary Director & Master of Dakshin Tiffin</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#B84A24] font-medium">
                  <Award className="w-4 h-4" />
                  <span>Michelin Bib Gourmand 2024–2026</span>
                </div>
              </div>
            </div>

          </div>

          {/* Side Visual Card / Kitchen Rhythms */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#2D221D] rounded-2xl text-white p-8 border border-[#44352D] shadow-lg relative overflow-hidden">
              <div 
                className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#B84A24]/30 blur-2xl" 
                aria-hidden="true" 
              />
              
              <h3 className="font-serif text-2xl font-bold mb-6 relative z-10 text-[#FAF7F2]">
                Our Kitchen Rituals
              </h3>

              <div className="space-y-5 relative z-10 text-xs">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#FDBA74] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-semibold text-white">05:00 AM — Stone Batter Grinding</strong>
                    <span className="text-[#CDBDB3]">Checking naturally aerated urad dal batter to ensure feathery idlis.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-[#FDBA74] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-semibold text-white">06:30 AM — Fresh Coconut Chutneys & Sambar</strong>
                    <span className="text-[#CDBDB3]">Cracking fresh coconuts and simmering toor dal with shallots and drumstick.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#FDBA74] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-semibold text-white">10:00 AM — Brewing Filter Kaapi Decoction</strong>
                    <span className="text-[#CDBDB3]">Dripping rich plantation Peaberry coffee grounds in brass percolators.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-[#FDBA74] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-semibold text-white">11:30 AM — Tawas Seasoned & Open</strong>
                    <span className="text-[#CDBDB3]">Ladlefuls of batter sizzle on hot cast iron, releasing golden aromas.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="bg-white rounded-xl p-6 border border-[#E2D5C3] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D48259] transition-colors"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-[#FAF3EB] text-[#B84A24] flex items-center justify-center font-serif font-bold text-lg">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#29221F]">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#594A42] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="text-[11px] font-mono text-[#8C6D58] border-t border-[#F2ECE1] pt-3">
                Heritage Commitment
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
