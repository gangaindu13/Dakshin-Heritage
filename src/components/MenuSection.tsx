import React, { useState, useMemo } from 'react';
import { MenuItem, MenuCategory } from '../types.ts';
import { MenuCard } from './MenuCard.tsx';
import { Search, Sparkles, Filter, X } from 'lucide-react';

interface MenuSectionProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onOpenDetails: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onAddToCart,
  onOpenDetails,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');

  const categories: { id: MenuCategory | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'All Specialties', count: items.length },
    { id: 'starters', label: 'Starters & Tiffin', count: items.filter((i) => i.category === 'starters').length },
    { id: 'mains', label: 'Main Courses & Dosas', count: items.filter((i) => i.category === 'mains').length },
    { id: 'desserts', label: 'Desserts & Payasam', count: items.filter((i) => i.category === 'desserts').length },
    { id: 'drinks', label: 'Filter Kaapi & Drinks', count: items.filter((i) => i.category === 'drinks').length },
  ];

  const dietaryOptions = [
    { id: 'all', label: 'All Diets' },
    { id: 'Chef Specialty', label: "Chef's Specials" },
    { id: 'Vegetarian', label: 'Vegetarian' },
    { id: 'Vegan', label: 'Vegan' },
    { id: 'Gluten-Free', label: 'Gluten-Free' },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      // Search match
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.regionalName && item.regionalName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.pairing && item.pairing.toLowerCase().includes(searchQuery.toLowerCase()));

      // Dietary match
      let matchesDietary = true;
      if (dietaryFilter === 'Chef Specialty') {
        matchesDietary = !!item.isChefSpecial;
      } else if (dietaryFilter !== 'all') {
        matchesDietary = !!item.dietary?.includes(dietaryFilter);
      }

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [items, selectedCategory, searchQuery, dietaryFilter]);

  return (
    <section id="menu" className="py-20 bg-[#FAF7F2] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B84A24]">
            <span className="w-2 h-2 rounded-full bg-[#B84A24]" />
            <span>The Dakshin Heritage Menu</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#29221F] tracking-tight">
            Culinary Treasures of the Four Southern States
          </h2>
          <p className="text-sm sm:text-base text-[#594A42] leading-relaxed">
            From the cast-iron dosa tawas of Tamil Nadu and the coconut groves of Kerala to the aromatic spice hills of Karnataka and royal kitchens of Andhra.
          </p>
        </div>

        {/* Category Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#E8DEC8]">
          
          {/* Main Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#B84A24] text-white shadow-xs'
                      : 'bg-[#F2ECE1] text-[#594A42] hover:bg-[#E8DEC8] hover:text-[#29221F]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-xs px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-[#933418] text-white' : 'bg-[#E5DBCB] text-[#594A42]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Dietary Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[200px] flex-1 sm:flex-initial">
              <Search className="w-4 h-4 text-[#8C6D58] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dosa, biryani, kaapi..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-[#DDCFBC] rounded-lg text-[#29221F] placeholder-[#8C6D58] focus:outline-none focus:ring-2 focus:ring-[#B84A24] focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  type="button"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C6D58] hover:text-[#29221F]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dietary Dropdown/Tabs */}
            <div className="flex items-center gap-1 bg-[#F2ECE1] p-1 rounded-lg">
              {dietaryOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setDietaryFilter(opt.id)}
                  type="button"
                  className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    dietaryFilter === opt.id
                      ? 'bg-white text-[#B84A24] shadow-xs'
                      : 'text-[#594A42] hover:text-[#29221F]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Count & Active Filters Indicator */}
        <div className="py-4 flex items-center justify-between text-xs text-[#8C6D58]">
          <span>
            Showing <strong className="text-[#29221F] tabular-nums">{filteredItems.length}</strong> {filteredItems.length === 1 ? 'item' : 'items'}
          </span>
          {(searchQuery || dietaryFilter !== 'all' || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              type="button"
              className="text-[#B84A24] hover:underline flex items-center gap-1 font-medium"
            >
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onAddToCart={onAddToCart}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8DEC8] p-8 max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF3EB] text-[#B84A24] flex items-center justify-center mx-auto">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#29221F]">
              No South Indian dishes found
            </h3>
            <p className="text-xs text-[#594A42]">
              No dishes match your query "{searchQuery || dietaryFilter}". Try selecting another category or resetting filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              type="button"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#B84A24] hover:bg-[#933418] rounded-lg transition-colors"
            >
              Show Full Menu
            </button>
          </div>
        )}

        {/* Banana Leaf Sadhya Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-[#F3ECE2] border border-[#E2D5C3] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-[#B84A24] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Sunday Special Feast</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#29221F]">
              Grand Traditional Banana Leaf Sadhya (24 Delicacies)
            </h4>
            <p className="text-xs sm:text-sm text-[#594A42] max-w-xl">
              Served exclusively on Sunday afternoons. Enjoy our ceremonial vegetarian feast served on fresh green plantain leaves, featuring Avial, Thoran, Olan, Kalan, Pachadi, Sambar, Rasam, and two varieties of warm payasams. $32 per person.
            </p>
          </div>
          <button
            onClick={() => {
              const resSection = document.getElementById('contact');
              resSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            type="button"
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#29221F] hover:bg-[#1A1513] rounded-lg transition-colors whitespace-nowrap"
          >
            Reserve Sadhya Leaf Seating
          </button>
        </div>

      </div>
    </section>
  );
};
