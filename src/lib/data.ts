// ─── Product Types ─────────────────────────────────────────────────────────────

export type MalaCategory =
  | "entrance"
  | "wedding"
  | "reception"
  | "marriage"
  | "custom"
  | "temple"
  | "hair"
  | "decor"
  | "bouquet"
  | "garland";

export type FlowerType =
  | "Rose"
  | "Jasmine"
  | "Marigold"
  | "Orchid"
  | "Carnation"
  | "Lotus"
  | "Tuberose"
  | "Mixed";

export interface ProductVariant {
  size: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  category: MalaCategory;
  subcategory?: string;
  flowers: FlowerType[];
  occasion: string[];
  images: string[];
  slug: string;
  description: string;
  shortDescription: string;
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  freshToday?: boolean;
  isPremium?: boolean;
  estimatedLife: string;
  weight?: string;
  tags: string[];
  badge?: string;
}

// ─── Products Catalog ──────────────────────────────────────────────────────────

export const products: Product[] = [];

// ─── Categories ────────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
}

export const shopCategories: Category[] = [
  {
    id: "c1",
    name: "Entrance Malas",
    slug: "entrance",
    description: "Beautiful entrance & door decorations",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop",
    productCount: 6,
    featured: true,
  },
  {
    id: "c2",
    name: "Wedding Malas",
    slug: "wedding",
    description: "Premium bridal & groom garlands",
    image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=600&auto=format&fit=crop",
    productCount: 5,
    featured: true,
  },
  {
    id: "c3",
    name: "Reception Malas",
    slug: "reception",
    description: "Elegant reception garlands",
    image: "https://images.unsplash.com/photo-1521427780400-4e7b900a6abb?q=80&w=600&auto=format&fit=crop",
    productCount: 3,
    featured: true,
  },
  {
    id: "c4",
    name: "Marriage Ceremony",
    slug: "marriage",
    description: "Sacred ceremony garlands",
    image: "https://images.unsplash.com/photo-1616853755490-671231f8220f?q=80&w=600&auto=format&fit=crop",
    productCount: 3,
    featured: true,
  },
  {
    id: "c5",
    name: "Temple Garlands",
    slug: "temple",
    description: "Pure divine temple offerings",
    image: "https://images.unsplash.com/photo-1596484552993-9c8e1b6f0014?q=80&w=600&auto=format&fit=crop",
    productCount: 2,
    featured: true,
  },
  {
    id: "c6",
    name: "Bridal Hair Flowers",
    slug: "hair",
    description: "Delicate bridal hair arrangements",
    image: "https://images.unsplash.com/photo-1600326145359-3a45c8502392?q=80&w=600&auto=format&fit=crop",
    productCount: 2,
    featured: true,
  },
];

// ─── Event Occasions ───────────────────────────────────────────────────────────

export const eventOccasions = [
  { id: "o1", name: "Wedding", icon: "💍", slug: "wedding" },
  { id: "o2", name: "Reception", icon: "🥂", slug: "reception" },
  { id: "o3", name: "Engagement", icon: "💐", slug: "engagement" },
  { id: "o4", name: "Housewarming", icon: "🏡", slug: "housewarming" },
  { id: "o5", name: "Baby Shower", icon: "👶", slug: "baby-shower" },
  { id: "o6", name: "Naming Ceremony", icon: "🌸", slug: "naming-ceremony" },
  { id: "o7", name: "Birthday", icon: "🎂", slug: "birthday" },
  { id: "o8", name: "Anniversary", icon: "❤️", slug: "anniversary" },
  { id: "o9", name: "Temple Festival", icon: "🪔", slug: "temple-festival" },
  { id: "o10", name: "Corporate Events", icon: "🏢", slug: "corporate" },
];

// ─── Testimonials ──────────────────────────────────────────────────────────────

export const testimonials = [
  {
    id: "t1",
    name: "Priya & Rahul",
    text: "MAHALAKSHMI made our wedding absolutely magical! The malas were so fresh, intricately designed, and the jasmine fragrance filled the entire mandap. We couldn't have asked for anything more beautiful.",
    event: "Wedding Mala",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=47",
    location: "Coimbatore",
  },
  {
    id: "t2",
    name: "Anjali Menon",
    text: "I ordered garlands for our temple consecration ceremony. The devotion and craftsmanship visible in every petal was extraordinary. The lotus garlands were pristine and absolutely divine.",
    event: "Temple Garland",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=44",
    location: "Tirupur",
  },
  {
    id: "t3",
    name: "Karthik Subramaniam",
    text: "From inquiry to delivery, the experience was premium. The custom rose and jasmine entrance malas for our corporate event were flawless. Our guests were amazed. Will order again!",
    event: "Entrance Mala",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=12",
    location: "Chennai",
  },
  {
    id: "t4",
    name: "Meena & Vijay",
    text: "We ordered the Royal Wedding Mala for our reception and it was absolutely breathtaking. The orchids and roses were so fresh even after 6 hours! Best florist in Coimbatore without doubt.",
    event: "Royal Wedding Mala",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=39",
    location: "Coimbatore",
  },
  {
    id: "t5",
    name: "Saranya Krishnan",
    text: "The jasmine veni for my wedding was perfect — fragrant, fresh, and exactly what I envisioned. The team was so responsive and even accommodated a last-minute size change!",
    event: "Jasmine Veni",
    rating: 5,
    avatar: "https://i.pravatar.cc/80?img=49",
    location: "Erode",
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

export const allCategories = Array.from(new Set(products.map((p) => p.category)));
export const allFlowers = Array.from(new Set(products.flatMap((p) => p.flowers)));
export const allOccasions = Array.from(new Set(products.flatMap((p) => p.occasion)));
export const bestSellers = products.filter((p) => p.isBestSeller);
export const freshToday = products.filter((p) => p.freshToday);
export const premiumProducts = products.filter((p) => p.isPremium);
export const featuredProducts = products.filter((p) => p.isFeatured);

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.flowers.some((f) => product.flowers.includes(f))))
    .slice(0, limit);
}

// ─── Order Mock Data ───────────────────────────────────────────────────────────

export const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-12-15",
    status: "delivered",
    items: [{ name: "Traditional Rose Wedding Mala", qty: 2, size: "5 ft", price: 1300 }],
    total: 2680,
    trackingSteps: [
      { label: "Order Placed", done: true, time: "10:00 AM" },
      { label: "Preparing", done: true, time: "11:30 AM" },
      { label: "Making Mala", done: true, time: "1:00 PM" },
      { label: "Quality Check", done: true, time: "2:30 PM" },
      { label: "Packed", done: true, time: "3:00 PM" },
      { label: "Out for Delivery", done: true, time: "4:00 PM" },
      { label: "Delivered", done: true, time: "5:30 PM" },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2025-01-05",
    status: "out_for_delivery",
    items: [{ name: "Grand Entrance Mala", qty: 1, size: "10 ft", price: 2600 }],
    total: 2680,
    trackingSteps: [
      { label: "Order Placed", done: true, time: "9:00 AM" },
      { label: "Preparing", done: true, time: "10:30 AM" },
      { label: "Making Mala", done: true, time: "12:00 PM" },
      { label: "Quality Check", done: true, time: "2:00 PM" },
      { label: "Packed", done: true, time: "2:45 PM" },
      { label: "Out for Delivery", done: true, time: "3:30 PM" },
      { label: "Delivered", done: false, time: "" },
    ],
  },
];

// ─── Customize Options ─────────────────────────────────────────────────────────

export const customizeOptions = {
  flowerTypes: [
    { id: "rose", name: "Rose", emoji: "🌹", basePrice: 100 },
    { id: "jasmine", name: "Jasmine", emoji: "🌸", basePrice: 80 },
    { id: "marigold", name: "Marigold", emoji: "🌼", basePrice: 60 },
    { id: "orchid", name: "Orchid", emoji: "💜", basePrice: 160 },
    { id: "lotus", name: "Lotus", emoji: "🪷", basePrice: 140 },
    { id: "carnation", name: "Carnation", emoji: "🌺", basePrice: 90 },
    { id: "mixed", name: "Mixed Flowers", emoji: "💐", basePrice: 110 },
  ],
  colors: [
    { id: "red-white", name: "Red & White", colors: ["#DC143C", "#FFFFFF"] },
    { id: "yellow-red", name: "Yellow & Red", colors: ["#FFD700", "#DC143C"] },
    { id: "white-green", name: "White & Green", colors: ["#FFFFFF", "#93A186"] },
    { id: "pink-white", name: "Pink & White", colors: ["#EB7297", "#FFFFFF"] },
    { id: "purple-white", name: "Purple & White", colors: ["#9370DB", "#FFFFFF"] },
    { id: "custom", name: "Custom Color", colors: ["#EB7297", "#F3CBCB"] },
  ],
  sizes: [
    { id: "2ft", name: "2 ft", multiplier: 0.5 },
    { id: "3ft", name: "3 ft", multiplier: 0.7 },
    { id: "4ft", name: "4 ft", multiplier: 1.0 },
    { id: "5ft", name: "5 ft", multiplier: 1.25 },
    { id: "6ft", name: "6 ft", multiplier: 1.5 },
    { id: "7ft", name: "7 ft", multiplier: 1.75 },
    { id: "8ft", name: "8 ft", multiplier: 2.0 },
    { id: "10ft", name: "10 ft", multiplier: 2.5 },
    { id: "12ft", name: "12 ft", multiplier: 3.0 },
  ],
  thickness: [
    { id: "thin", name: "Thin", description: "Light & delicate", multiplier: 0.8 },
    { id: "medium", name: "Medium", description: "Classic style", multiplier: 1.0 },
    { id: "thick", name: "Thick", description: "Full & lush", multiplier: 1.3 },
    { id: "extra-thick", name: "Extra Thick", description: "Grand & opulent", multiplier: 1.6 },
  ],
  budgets: [
    { id: "economy", name: "Economy", range: "₹400 – ₹800", multiplier: 0.7 },
    { id: "standard", name: "Standard", range: "₹800 – ₹1,500", multiplier: 1.0 },
    { id: "premium", name: "Premium", range: "₹1,500 – ₹3,000", multiplier: 1.4 },
    { id: "luxury", name: "Luxury", range: "₹3,000+", multiplier: 2.0 },
  ],
};
