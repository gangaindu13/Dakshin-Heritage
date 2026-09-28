export type MenuCategory = 'starters' | 'mains' | 'desserts' | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  regionalName?: string; // e.g. "மெது வடை" or English regional indicator
  category: MenuCategory;
  categoryLabel: string;
  description: string;
  price: number;
  dietary?: string[];
  pairing?: string;
  preparationNote?: string;
  isChefSpecial?: boolean;
  calories?: number;
  spiceLevel?: 'Mild' | 'Medium' | 'Fiery';
  iconType: 'vada' | 'dosa' | 'biryani' | 'curry' | 'seafood' | 'dessert' | 'kaapi' | 'beverage';
  warmHue: string; // Tailwind gradient classes for the visual art card
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface ReservationDetails {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'traditional' | 'main-hall' | 'courtyard';
  specialRequests?: string;
}
