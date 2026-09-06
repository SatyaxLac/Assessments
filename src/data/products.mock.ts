import { Product } from './types';

/**
 * Mock product catalog for the 1Fi Marketplace.
 *
 * This stands in for a backend catalog service. It is intentionally the ONLY
 * place product content lives — UI components receive it via the api/hooks
 * layer and never hardcode product details.
 *
 * Images use Unsplash source URLs (stable, no auth) as placeholders since no
 * product assets were provided with the assignment.
 */
export const PRODUCTS: Product[] = [
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    brand: 'Apple',
    category: 'Mobiles',
    image:
      'https://images.unsplash.com/photo-1592286927505-1def25115558?auto=format&fit=crop&w=800&q=80',
    basePrice: 79900,
    rating: 4.7,
    ratingCount: 2143,
    tagline: 'A total powerhouse with the Dynamic Island.',
    maxNoCostTenure: 12,
    variants: [
      { id: 'stor-128', label: '128 GB', group: 'Storage', priceDelta: 0, inStock: true },
      { id: 'stor-256', label: '256 GB', group: 'Storage', priceDelta: 10000, inStock: true },
      { id: 'stor-512', label: '512 GB', group: 'Storage', priceDelta: 25000, inStock: true },
      { id: 'col-black', label: 'Black', group: 'Color', priceDelta: 0, inStock: true },
      { id: 'col-blue', label: 'Blue', group: 'Color', priceDelta: 0, inStock: true },
      { id: 'col-pink', label: 'Pink', group: 'Color', priceDelta: 0, inStock: false },
    ],
    highlights: [
      '6.1-inch Super Retina XDR display',
      'A16 Bionic chip',
      '48MP main camera with 2x Telephoto',
      'USB-C connectivity',
    ],
    specs: [
      { label: 'Display', value: '6.1" OLED, 2556×1179' },
      { label: 'Chip', value: 'A16 Bionic' },
      { label: 'Camera', value: '48MP + 12MP' },
      { label: 'Battery', value: 'Up to 20 hrs video' },
      { label: 'Warranty', value: '1 year' },
    ],
  },
  {
    id: 'macbook-air-m3',
    name: 'MacBook Air M3',
    brand: 'Apple',
    category: 'Laptops',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    basePrice: 114900,
    rating: 4.8,
    ratingCount: 987,
    tagline: 'Superlight. Superfast. Built for work.',
    maxNoCostTenure: 24,
    variants: [
      { id: 'ram-8', label: '8 GB', group: 'Memory', priceDelta: 0, inStock: true },
      { id: 'ram-16', label: '16 GB', group: 'Memory', priceDelta: 20000, inStock: true },
      { id: 'ssd-256', label: '256 GB', group: 'Storage', priceDelta: 0, inStock: true },
      { id: 'ssd-512', label: '512 GB', group: 'Storage', priceDelta: 15000, inStock: true },
    ],
    highlights: [
      '13.6-inch Liquid Retina display',
      'Apple M3 chip, 8-core CPU',
      'Up to 18 hours battery life',
      'MagSafe charging',
    ],
    specs: [
      { label: 'Display', value: '13.6" Liquid Retina' },
      { label: 'Chip', value: 'Apple M3' },
      { label: 'Memory', value: '8–16 GB unified' },
      { label: 'Battery', value: 'Up to 18 hrs' },
      { label: 'Warranty', value: '1 year' },
    ],
  },
  {
    id: 'galaxy-s24',
    name: 'Galaxy S24',
    brand: 'Samsung',
    category: 'Mobiles',
    image:
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    basePrice: 74999,
    rating: 4.5,
    ratingCount: 1560,
    tagline: 'Galaxy AI is here.',
    maxNoCostTenure: 9,
    variants: [
      { id: 'stor-128', label: '128 GB', group: 'Storage', priceDelta: 0, inStock: true },
      { id: 'stor-256', label: '256 GB', group: 'Storage', priceDelta: 6000, inStock: true },
      { id: 'col-violet', label: 'Violet', group: 'Color', priceDelta: 0, inStock: true },
      { id: 'col-gray', label: 'Gray', group: 'Color', priceDelta: 0, inStock: true },
    ],
    highlights: [
      '6.2-inch Dynamic AMOLED 2X',
      'Snapdragon 8 Gen 3',
      '50MP triple camera',
      'Galaxy AI features',
    ],
    specs: [
      { label: 'Display', value: '6.2" AMOLED, 120Hz' },
      { label: 'Chip', value: 'Snapdragon 8 Gen 3' },
      { label: 'Camera', value: '50MP + 12MP + 10MP' },
      { label: 'Battery', value: '4000 mAh' },
      { label: 'Warranty', value: '1 year' },
    ],
  },
  {
    id: 'sony-wh1000xm5',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: 'Audio',
    image:
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80',
    basePrice: 29990,
    rating: 4.6,
    ratingCount: 3421,
    tagline: 'Industry-leading noise cancellation.',
    maxNoCostTenure: 6,
    variants: [
      { id: 'col-black', label: 'Black', group: 'Color', priceDelta: 0, inStock: true },
      { id: 'col-silver', label: 'Silver', group: 'Color', priceDelta: 0, inStock: true },
    ],
    highlights: [
      'Best-in-class noise cancellation',
      'Up to 30 hours battery',
      'Multipoint connection',
      'Speak-to-chat',
    ],
    specs: [
      { label: 'Type', value: 'Over-ear, wireless' },
      { label: 'Battery', value: 'Up to 30 hrs' },
      { label: 'Charging', value: 'USB-C, quick charge' },
      { label: 'Weight', value: '250 g' },
      { label: 'Warranty', value: '1 year' },
    ],
  },
  {
    id: 'apple-watch-s9',
    name: 'Apple Watch Series 9',
    brand: 'Apple',
    category: 'Wearables',
    image:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    basePrice: 41900,
    rating: 4.7,
    ratingCount: 890,
    tagline: 'Smarter. Brighter. Mightier.',
    maxNoCostTenure: 9,
    variants: [
      { id: 'size-41', label: '41 mm', group: 'Size', priceDelta: 0, inStock: true },
      { id: 'size-45', label: '45 mm', group: 'Size', priceDelta: 4000, inStock: true },
      { id: 'band-sport', label: 'Sport Band', group: 'Band', priceDelta: 0, inStock: true },
      { id: 'band-loop', label: 'Sport Loop', group: 'Band', priceDelta: 1500, inStock: true },
    ],
    highlights: [
      'S9 SiP with Double Tap gesture',
      'Brighter 2000-nit display',
      'Advanced health sensors',
      'Carbon neutral options',
    ],
    specs: [
      { label: 'Display', value: 'Always-On Retina' },
      { label: 'Chip', value: 'S9 SiP' },
      { label: 'Water', value: '50m resistant' },
      { label: 'Battery', value: 'Up to 18 hrs' },
      { label: 'Warranty', value: '1 year' },
    ],
  },
  {
    id: 'dyson-v12',
    name: 'Dyson V12 Detect Slim',
    brand: 'Dyson',
    category: 'Appliances',
    image:
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
    basePrice: 54900,
    rating: 4.4,
    ratingCount: 512,
    tagline: 'Powerful, intelligent cordless cleaning.',
    maxNoCostTenure: 12,
    variants: [
      { id: 'std', label: 'Standard', group: 'Edition', priceDelta: 0, inStock: true },
      { id: 'absolute', label: 'Absolute', group: 'Edition', priceDelta: 8000, inStock: true },
    ],
    highlights: [
      'Laser reveals microscopic dust',
      'Up to 60 minutes run time',
      'Piezo sensor counts particles',
      'HEPA filtration',
    ],
    specs: [
      { label: 'Type', value: 'Cordless stick' },
      { label: 'Run time', value: 'Up to 60 min' },
      { label: 'Bin', value: '0.35 L' },
      { label: 'Weight', value: '2.2 kg' },
      { label: 'Warranty', value: '2 years' },
    ],
  },
  {
    id: 'ipad-air',
    name: 'iPad Air',
    brand: 'Apple',
    category: 'Laptops',
    image:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    basePrice: 59900,
    rating: 4.6,
    ratingCount: 734,
    tagline: 'Serious performance in a thin design.',
    maxNoCostTenure: 18,
    variants: [
      { id: 'stor-128', label: '128 GB', group: 'Storage', priceDelta: 0, inStock: true },
      { id: 'stor-256', label: '256 GB', group: 'Storage', priceDelta: 8000, inStock: true },
      { id: 'wifi', label: 'Wi-Fi', group: 'Connectivity', priceDelta: 0, inStock: true },
      { id: 'cellular', label: 'Wi-Fi + Cellular', group: 'Connectivity', priceDelta: 12000, inStock: true },
    ],
    highlights: [
      '10.9-inch Liquid Retina display',
      'M1 chip',
      'Touch ID',
      'Works with Apple Pencil',
    ],
    specs: [
      { label: 'Display', value: '10.9" Liquid Retina' },
      { label: 'Chip', value: 'Apple M1' },
      { label: 'Camera', value: '12MP wide' },
      { label: 'Battery', value: 'Up to 10 hrs' },
      { label: 'Warranty', value: '1 year' },
    ],
  },
  {
    id: 'boat-airdopes',
    name: 'boAt Airdopes 141',
    brand: 'boAt',
    category: 'Audio',
    image:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    basePrice: 1499,
    rating: 4.1,
    ratingCount: 15320,
    tagline: 'Big sound, tiny price.',
    maxNoCostTenure: 3,
    variants: [
      { id: 'col-white', label: 'White', group: 'Color', priceDelta: 0, inStock: true },
      { id: 'col-black', label: 'Black', group: 'Color', priceDelta: 0, inStock: true },
    ],
    highlights: [
      '42H total playback',
      'Low latency Beast Mode',
      'ENx tech for calls',
      'IPX4 water resistance',
    ],
    specs: [
      { label: 'Type', value: 'TWS earbuds' },
      { label: 'Battery', value: 'Up to 42 hrs' },
      { label: 'Driver', value: '8mm' },
      { label: 'Water', value: 'IPX4' },
      { label: 'Warranty', value: '1 year' },
    ],
  },
];
