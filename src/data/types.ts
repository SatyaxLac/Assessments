export type Category = 'Mobiles' | 'Laptops' | 'Audio' | 'Wearables' | 'Appliances';

export interface Variant {
  id: string;
  label: string; // e.g. "128GB", "Midnight"
  group: string; // e.g. "Storage", "Color" — variants are grouped in the UI
  priceDelta: number; // added to basePrice (can be 0 or negative)
  inStock: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  image: string; // remote URL
  gallery?: string[];
  basePrice: number; // INR, before variant deltas
  rating?: number; // 0–5
  ratingCount?: number;
  tagline?: string; // short marketing line
  maxNoCostTenure: number; // e.g. 12 -> "No-cost EMI upto 12 months"
  variants: Variant[];
  specs: ProductSpec[];
  highlights: string[];
}

export interface EmiPlan {
  id: string;
  tenureMonths: number;
  monthlyAmount: number; // INR / month
  totalPayable: number; // INR over full tenure
  interestRate: number; // annual %, 0 for no-cost
  noCost: boolean;
  recommended?: boolean;
}
