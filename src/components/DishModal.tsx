import React, { useState } from 'react';
import { MenuItem } from '../types.ts';
import { X, Sparkles, Plus, Minus, Check, Flame } from 'lucide-react';

interface DishModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

export const DishModal: React.FC<DishModalProps> = ({ item, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    onAddToCart(item, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF7F2] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E8DEC8] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
      >
        {/* Banner with gradient & category */}
        <div className={`p-6 bg-gradient-to-br ${item.warmHue} text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/80 font-medium mb-1">
            <span>{item.categoryLabel}</span>
            {item.regionalName && (
              <>
                <span>·</span>
                <span className="font-serif text-amber-200">{item.regionalName}</span>
              </>
            )}
            {item.isChefSpecial && (
              <>
                <span>·</span>
                <span className="text-amber-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Chef’s Special
                </span>
              </>
            )}
          </div>

          <h3 id="dish-modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-white pr-8">
            {item.name}
          </h3>

          <div className="mt-3 flex items-center gap-3">
            <span className="font-serif text-2xl font-bold tabular-nums text-white">
              ${item.price.toFixed(2)}
            </span>
            {item.spiceLevel && (
              <span className="text-xs text-white/90 bg-black/20 px-2 py-0.5 rounded-full">
                {item.spiceLevel} Spice
              </span>
            )}
            {item.calories && (
              <span className="text-xs text-white/80 border-l border-white/20 pl-3">
                {item.calories} Calories
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <p className="text-sm text-[#594A42] leading-relaxed">
            {item.description}
          </p>

          {/* Details & Pairings */}
          <div className="space-y-3 bg-white rounded-xl p-4 border border-[#E8DEC8] text-xs">
            {item.pairing && (
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#B84A24] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#29221F]">Serving Accompaniment / Pairing</strong>
                  <span className="text-[#594A42]">{item.pairing}</span>
                </div>
              </div>
            )}

            {item.preparationNote && (
              <div className="flex items-start gap-2.5 pt-2 border-t border-[#F2ECE1]">
                <Flame className="w-4 h-4 text-[#B84A24] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#29221F]">Kitchen Preparation</strong>
                  <span className="text-[#594A42]">{item.preparationNote}</span>
                </div>
              </div>
            )}

            {item.dietary && item.dietary.length > 0 && (
              <div className="pt-2 border-t border-[#F2ECE1]">
                <strong className="block text-[#29221F] mb-1">Dietary Attributes</strong>
                <div className="flex flex-wrap gap-2 text-[#8C6D58]">
                  {item.dietary.join(' · ')}
                </div>
              </div>
            )}
          </div>

          {/* Quantity Selector & Add Button */}
          <div className="pt-2 flex items-center justify-between gap-4">
            <div className="flex items-center border border-[#DDCFBC] rounded-lg bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 text-[#594A42] hover:text-[#29221F] transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-sm font-semibold text-[#29221F] tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 text-[#594A42] hover:text-[#29221F] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#B84A24] hover:bg-[#933418] text-white shadow-xs'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Order</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add ${(item.price * quantity).toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
