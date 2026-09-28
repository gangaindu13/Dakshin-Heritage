import React, { useState } from 'react';
import { CartItem } from '../types.ts';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';

interface OrderTrayProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onProceedToReservation: () => void;
}

export const OrderTray: React.FC<OrderTrayProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToReservation,
}) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [tableOrTakeout, setTableOrTakeout] = useState<'dine-in' | 'takeout'>('dine-in');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);
  const tax = subtotal * 0.08875;
  const total = subtotal + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    setTimeout(() => {
      onClearCart();
    }, 4000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E8DEC8] shadow-2xl flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-[#E8DEC8] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2 text-[#29221F]">
              <ShoppingBag className="w-5 h-5 text-[#B84A24]" />
              <h3 className="font-serif text-xl font-bold">
                Your Tiffin & Meal Order
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#FAF3EB] text-[#B84A24] font-medium font-mono">
                {items.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#594A42] hover:text-[#29221F] hover:bg-[#F3ECE2]"
              aria-label="Close tray"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {orderPlaced ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#29221F]">
                  Order Sent to Tawa & Kitchen!
                </h4>
                <p className="text-xs sm:text-sm text-[#594A42]">
                  Nandri{guestName ? `, ${guestName}` : ''}! Your selections have been sent to our chefs for {tableOrTakeout === 'dine-in' ? 'table feast service' : 'fresh tiffin pickup at the counter'}.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setOrderPlaced(false);
                      onClose();
                    }}
                    type="button"
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#B84A24] hover:bg-[#933418] rounded-lg transition-colors"
                  >
                    Back to Menu
                  </button>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#FAF3EB] text-[#B84A24] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#29221F]">
                  Your tiffin order is empty
                </h4>
                <p className="text-xs text-[#594A42] max-w-xs mx-auto">
                  Browse our Starters & Tiffin, Dosas, Curries, Payasams, and Filter Kaapi to curate your feast.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onClose}
                    type="button"
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#B84A24] hover:bg-[#933418] rounded-lg transition-colors"
                  >
                    Explore South Indian Menu
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-white rounded-xl border border-[#E8DEC8] shadow-xs flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#8C6D58] uppercase">
                        <span>{item.categoryLabel}</span>
                        {item.regionalName && <span>· {item.regionalName}</span>}
                      </div>
                      <h5 className="font-serif text-base font-bold text-[#29221F] truncate">
                        {item.name}
                      </h5>
                      <span className="font-serif text-sm font-semibold text-[#B84A24] tabular-nums">
                        ${(item.price * quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-[#DDCFBC] rounded-md bg-[#FAF7F2]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 text-[#594A42] hover:text-[#29221F]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-[#29221F] tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 text-[#594A42] hover:text-[#29221F]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-[#8C6D58] hover:text-red-700 transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer calculation & Submit */}
          {items.length > 0 && !orderPlaced && (
            <div className="p-5 bg-white border-t border-[#E8DEC8] space-y-4">
              <div className="space-y-1.5 text-xs text-[#594A42]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#29221F] tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. NY Tax (8.875%)</span>
                  <span className="tabular-nums">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-[#F2ECE1] flex justify-between text-sm font-bold text-[#29221F]">
                  <span>Total</span>
                  <span className="font-serif text-lg text-[#B84A24] tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Order options */}
              <form onSubmit={handlePlaceOrder} className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setTableOrTakeout('dine-in')}
                    className={`py-1.5 px-3 rounded-lg border text-center font-medium ${
                      tableOrTakeout === 'dine-in'
                        ? 'border-[#B84A24] bg-[#FAF3EB] text-[#B84A24]'
                        : 'border-[#DDCFBC] text-[#594A42]'
                    }`}
                  >
                    Dine-in Feast
                  </button>
                  <button
                    type="button"
                    onClick={() => setTableOrTakeout('takeout')}
                    className={`py-1.5 px-3 rounded-lg border text-center font-medium ${
                      tableOrTakeout === 'takeout'
                        ? 'border-[#B84A24] bg-[#FAF3EB] text-[#B84A24]'
                        : 'border-[#DDCFBC] text-[#594A42]'
                    }`}
                  >
                    Tiffin Takeout
                  </button>
                </div>

                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Your Name (for kitchen ticket)"
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DDCFBC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B84A24] text-[#29221F]"
                />

                <div className="flex flex-col gap-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-semibold text-white bg-[#B84A24] hover:bg-[#933418] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Submit Kitchen Order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onProceedToReservation();
                    }}
                    className="w-full py-2 text-xs font-medium text-[#594A42] hover:text-[#29221F] hover:bg-[#FAF7F2] rounded-lg border border-transparent transition-colors"
                  >
                    Attach items to a Table Booking →
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
