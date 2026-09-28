import React, { useState } from 'react';
import { MenuItem } from '../types.ts';
import { Plus, Check, Info, Sparkles } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onOpenDetails: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  onAddToCart,
  onOpenDetails,
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  // Render South Indian culinary SVG motifs
  const renderDishIcon = () => {
    switch (item.iconType) {
      case 'dosa':
        return (
          <svg className="w-8 h-8 text-white/95" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {/* Rolled Dosa shape */}
            <path d="M3 13c3-3 15-3 18 0l-1 5c-3 2-15 2-17 0l-1-5Z" />
            <path d="M5 14c3-1.5 11-1.5 14 0" />
            <path d="M4 17c3 1.5 13 1.5 16 0" />
          </svg>
        );
      case 'vada':
        return (
          <svg className="w-8 h-8 text-white/95" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {/* Medu Vada ring */}
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="3" />
            <path d="M9 7.5h.01M15 8h.01M8 15h.01M15.5 15.5h.01" />
          </svg>
        );
      case 'biryani':
        return (
          <svg className="w-8 h-8 text-white/95" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {/* Handi / Clay Pot */}
            <path d="M6 10h12v7a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5v-7Z" />
            <path d="M4 10h16" />
            <path d="M8 7c1-2 7-2 8 0" />
            <path d="M12 3v2" />
          </svg>
        );
      case 'curry':
        return (
          <svg className="w-8 h-8 text-white/95" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {/* Traditional Uruli pan */}
            <path d="M3 11h18v3a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-3Z" />
            <path d="M2 11h20" />
            <path d="M7 6c1 2 2 3 5 3s4-1 5-3" />
          </svg>
        );
      case 'seafood':
        return (
          <svg className="w-8 h-8 text-white/95" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {/* Wrapped banana leaf parcel */}
            <path d="M3 12c4-6 14-6 18 0-4 6-14 6-18 0Z" />
            <path d="M3 12h18" />
            <path d="M8 8l3 4-3 4M14 8l3 4-3 4" />
          </svg>
        );
      case 'kaapi':
        return (
          <svg className="w-8 h-8 text-white/95" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {/* Brass Dabara & Tumbler */}
            <path d="M7 7h10l-1.5 9h-7L7 7Z" />
            <path d="M4 16h16a3 3 0 0 1-3 4H7a3 3 0 0 1-3-4Z" />
            <path d="M9 3c0 1.5 1 2 1 3M12 2c0 1.5 1 2 1 3M15 3c0 1.5 1 2 1 3" />
          </svg>
        );
      case 'dessert':
        return (
          <svg className="w-8 h-8 text-white/95" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {/* Sweet coupe / Payasam bowl */}
            <path d="M4 9h16a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6Z" />
            <path d="M12 15v5M8 20h8" />
            <path d="M9 5c1-1 3-1 3 1s2 2 3 1" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-white/95" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 3h12l-2 16H8L6 3Z" />
            <path d="M6 8h12" />
          </svg>
        );
    }
  };

  return (
    <article
      onClick={() => onOpenDetails(item)}
      className="group relative bg-white rounded-xl border border-[#EBE3D5] hover:border-[#D48259] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Visual Art Header */}
      <div className={`relative h-36 bg-gradient-to-br ${item.warmHue} p-4 flex flex-col justify-between overflow-hidden text-white`}>
        {/* Subtle decorative radial backdrop */}
        <div 
          className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-xl pointer-events-none" 
          aria-hidden="true" 
        />
        
        <div className="flex items-center justify-between relative z-10">
          <span className="text-[11px] font-medium uppercase tracking-wider text-white/90">
            {item.categoryLabel}
          </span>
          {item.isChefSpecial && (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-200 bg-black/25 backdrop-blur-xs px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Chef's Special</span>
            </div>
          )}
        </div>

        <div className="flex items-end justify-between relative z-10">
          <div className="p-2 rounded-lg bg-black/20 backdrop-blur-xs">
            {renderDishIcon()}
          </div>
          {item.regionalName && (
            <span className="text-xs font-serif text-white/90 font-medium px-2 py-0.5 rounded bg-black/20 backdrop-blur-xs">
              {item.regionalName}
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Header & Title */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#29221F] group-hover:text-[#B84A24] transition-colors leading-snug">
              {item.name}
            </h3>
          </div>

          {/* Unboxed Metadata (Zero-Pill discipline with typographic separator) */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#8C6D58]">
            {item.dietary?.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span>{tag}</span>
                <span aria-hidden="true">·</span>
              </React.Fragment>
            ))}
            {item.spiceLevel && (
              <>
                <span className="font-medium text-[#B84A24]">{item.spiceLevel}</span>
                <span aria-hidden="true">·</span>
              </>
            )}
            {item.calories && (
              <span className="tabular-nums">{item.calories} kcal</span>
            )}
          </div>

          {/* Short description */}
          <p className="text-sm text-[#594A42] leading-relaxed line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Price & Action Bottom Row */}
        <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#8C6D58] block leading-none mb-0.5">Price</span>
            <span className="font-serif text-xl font-bold text-[#29221F] tabular-nums">
              ${item.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(item);
              }}
              className="p-2 text-[#8C6D58] hover:text-[#29221F] hover:bg-[#F3ECE2] rounded-lg transition-colors"
              title="View details & pairings"
              aria-label={`View details for ${item.name}`}
            >
              <Info className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleAdd}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                justAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#FAF3EB] text-[#B84A24] hover:bg-[#B84A24] hover:text-white border border-[#E8DEC8]'
              }`}
              aria-label={`Add ${item.name} to order`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </article>
  );
};
