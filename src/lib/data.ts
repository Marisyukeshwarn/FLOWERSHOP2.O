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

export const products: Product[] = [
  // ENTRANCE MALAS
  {
    id: "e1",
    name: "Small Entrance Mala",
    category: "entrance",
    subcategory: "Standard",
    flowers: ["Rose", "Jasmine"],
    occasion: ["Wedding", "Reception", "Housewarming"],
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621841398852-c3616641e7dc?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "small-entrance-mala",
    description:
      "A beautiful entrance mala crafted with fresh roses and jasmine, perfect for home entrances and small event doorways. Each mala is handwoven by skilled artisans to ensure density and fragrance.",
    shortDescription: "Fresh Rose & Jasmine entrance decoration",
    variants: [
      { size: "3 ft", price: 450, stock: 25 },
      { size: "4 ft", price: 580, stock: 20 },
    ],
    rating: 4.8,
    reviewCount: 124,
    isBestSeller: true,
    freshToday: true,
    estimatedLife: "24–36 hours",
    weight: "150–250g",
    tags: ["entrance", "door decoration", "rose", "jasmine"],
    badge: "Best Seller",
  },
  {
    id: "e2",
    name: "Standard Entrance Mala",
    category: "entrance",
    subcategory: "Standard",
    flowers: ["Rose", "Marigold"],
    occasion: ["Wedding", "Reception", "Temple Festival"],
    images: [
      "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "standard-entrance-mala",
    description:
      "Our Standard Entrance Mala combines vibrant roses and marigold to create a welcoming floral arch that radiates warmth and festivity.",
    shortDescription: "Vibrant Rose & Marigold entrance garland",
    variants: [
      { size: "5 ft", price: 750, stock: 18 },
      { size: "6 ft", price: 900, stock: 15 },
    ],
    rating: 4.7,
    reviewCount: 89,
    isBestSeller: true,
    estimatedLife: "24–36 hours",
    tags: ["entrance", "marigold", "rose"],
  },
  {
    id: "e3",
    name: "Premium Entrance Mala",
    category: "entrance",
    subcategory: "Premium",
    flowers: ["Orchid", "Rose", "Jasmine"],
    occasion: ["Wedding", "Reception", "Corporate Events"],
    images: [
      "https://images.unsplash.com/photo-1596484552993-9c8e1b6f0014?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "premium-entrance-mala",
    description:
      "Luxurious orchid and rose combination with jasmine accents. Our Premium Entrance Mala makes a grand statement for high-end events and premium weddings.",
    shortDescription: "Luxurious Orchid & Rose grand entrance",
    variants: [
      { size: "7 ft", price: 1200, stock: 12 },
      { size: "8 ft", price: 1500, stock: 10 },
    ],
    rating: 4.9,
    reviewCount: 67,
    isPremium: true,
    isNew: false,
    estimatedLife: "24–48 hours",
    tags: ["premium", "orchid", "entrance"],
    badge: "Premium",
  },
  {
    id: "e4",
    name: "Grand Entrance Mala",
    category: "entrance",
    subcategory: "Grand",
    flowers: ["Rose", "Orchid", "Carnation", "Jasmine"],
    occasion: ["Wedding", "Reception", "Stage Decoration"],
    images: [
      "https://images.unsplash.com/photo-1616853755490-671231f8220f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "grand-entrance-mala",
    description:
      "The most majestic entrance mala we offer. A multi-flower grand garland that transforms any entrance into a royal gateway. Perfect for premium weddings and five-star events.",
    shortDescription: "Royal multi-flower grand entrance",
    variants: [
      { size: "9 ft", price: 2200, stock: 8 },
      { size: "10 ft", price: 2600, stock: 6 },
      { size: "12 ft", price: 3200, stock: 4 },
    ],
    rating: 4.9,
    reviewCount: 42,
    isPremium: true,
    isFeatured: true,
    estimatedLife: "24–48 hours",
    tags: ["grand", "premium", "wedding", "stage"],
    badge: "Grand",
  },
  {
    id: "e5",
    name: "Temple Entrance Mala",
    category: "entrance",
    subcategory: "Temple",
    flowers: ["Marigold", "Lotus", "Jasmine"],
    occasion: ["Temple Festival", "Housewarming", "Naming Ceremony"],
    images: [
      "https://images.unsplash.com/photo-1596484552993-9c8e1b6f0014?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "temple-entrance-mala",
    description:
      "Sacred and pure, our Temple Entrance Mala is crafted with traditional flowers in a ritually appropriate manner, bringing divine blessings to your entrance.",
    shortDescription: "Sacred Marigold & Lotus temple entrance",
    variants: [
      { size: "4 ft", price: 550, stock: 20 },
      { size: "5 ft", price: 680, stock: 15 },
      { size: "6 ft", price: 820, stock: 12 },
    ],
    rating: 4.8,
    reviewCount: 98,
    freshToday: true,
    estimatedLife: "24–36 hours",
    tags: ["temple", "puja", "marigold", "lotus"],
  },
  {
    id: "e6",
    name: "Stage Decoration Entrance Mala",
    category: "entrance",
    subcategory: "Stage",
    flowers: ["Rose", "Carnation", "Orchid"],
    occasion: ["Wedding", "Reception", "Birthday", "Anniversary"],
    images: [
      "https://images.unsplash.com/photo-1521427780400-4e7b900a6abb?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "stage-decoration-entrance-mala",
    description:
      "Designed specifically for stage backdrops and main entrances at events. Dense, dramatic, and absolutely stunning with rose, carnation, and orchid blooms.",
    shortDescription: "Dramatic Rose & Carnation stage entrance",
    variants: [
      { size: "8 ft", price: 1800, stock: 10 },
      { size: "10 ft", price: 2400, stock: 6 },
      { size: "12 ft", price: 3000, stock: 4 },
    ],
    rating: 4.7,
    reviewCount: 55,
    isPremium: true,
    estimatedLife: "24–48 hours",
    tags: ["stage", "event", "premium"],
    badge: "Premium",
  },

  // WEDDING MALAS
  {
    id: "w1",
    name: "Traditional Rose Wedding Mala",
    category: "wedding",
    flowers: ["Rose"],
    occasion: ["Wedding", "Engagement"],
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "traditional-rose-wedding-mala",
    description:
      "The timeless red rose wedding mala, a symbol of eternal love. Each rose is hand-selected for freshness and bloom, creating a garland that photographs beautifully and carries a divine fragrance.",
    shortDescription: "Classic red rose bridal garland",
    variants: [
      { size: "3 ft", price: 800, stock: 20 },
      { size: "4 ft", price: 1000, stock: 15 },
      { size: "5 ft", price: 1300, stock: 12 },
      { size: "6 ft", price: 1600, stock: 10 },
      { size: "7 ft", price: 1900, stock: 8 },
    ],
    rating: 4.9,
    reviewCount: 212,
    isBestSeller: true,
    isFeatured: true,
    freshToday: true,
    estimatedLife: "12–24 hours",
    weight: "200–400g",
    tags: ["wedding", "rose", "bridal", "traditional"],
    badge: "Best Seller",
  },
  {
    id: "w2",
    name: "Jasmine Wedding Mala",
    category: "wedding",
    flowers: ["Jasmine"],
    occasion: ["Wedding", "Engagement", "Marriage Ceremony"],
    images: [
      "https://images.unsplash.com/photo-1616853755490-671231f8220f?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "jasmine-wedding-mala",
    description:
      "Pure white jasmine, the queen of fragrance. Our Jasmine Wedding Mala fills the ceremony with its heavenly scent, making it an unforgettable sensory experience for all.",
    shortDescription: "Fragrant pure white jasmine mala",
    variants: [
      { size: "3 ft", price: 700, stock: 18 },
      { size: "4 ft", price: 900, stock: 14 },
      { size: "5 ft", price: 1100, stock: 10 },
      { size: "6 ft", price: 1400, stock: 8 },
    ],
    rating: 4.8,
    reviewCount: 176,
    isBestSeller: true,
    freshToday: true,
    estimatedLife: "12–24 hours",
    tags: ["wedding", "jasmine", "white", "fragrant"],
  },
  {
    id: "w3",
    name: "Mixed Flower Wedding Mala",
    category: "wedding",
    flowers: ["Rose", "Jasmine", "Marigold"],
    occasion: ["Wedding", "Reception", "Engagement"],
    images: [
      "https://images.unsplash.com/photo-1521427780400-4e7b900a6abb?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "mixed-flower-wedding-mala",
    description:
      "A vibrant medley of roses, jasmine, and marigold woven together to create a colorful, fragrant celebration of love. Ideal for couples who want a festive, joyful look.",
    shortDescription: "Colorful mixed flower celebration mala",
    variants: [
      { size: "3 ft", price: 750, stock: 15 },
      { size: "4 ft", price: 950, stock: 12 },
      { size: "5 ft", price: 1200, stock: 10 },
      { size: "6 ft", price: 1500, stock: 8 },
      { size: "7 ft", price: 1800, stock: 6 },
    ],
    rating: 4.7,
    reviewCount: 143,
    isNew: true,
    estimatedLife: "12–24 hours",
    tags: ["wedding", "mixed", "colorful"],
    badge: "New",
  },
  {
    id: "w4",
    name: "Luxury Wedding Mala",
    category: "wedding",
    flowers: ["Orchid", "Rose", "Carnation"],
    occasion: ["Wedding", "Reception", "Engagement"],
    images: [
      "https://images.unsplash.com/photo-1600326145359-3a45c8502392?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "luxury-wedding-mala",
    description:
      "Our Luxury Wedding Mala is crafted with premium orchids, roses, and carnations for the couple who wants an extraordinary floral experience. Every bloom is selected for perfection.",
    shortDescription: "Premium orchid & rose luxury bridal mala",
    variants: [
      { size: "4 ft", price: 2500, stock: 8 },
      { size: "5 ft", price: 3200, stock: 6 },
      { size: "6 ft", price: 4000, stock: 4 },
    ],
    rating: 5.0,
    reviewCount: 68,
    isPremium: true,
    isFeatured: true,
    estimatedLife: "24–36 hours",
    tags: ["luxury", "orchid", "premium", "wedding"],
    badge: "Luxury",
  },
  {
    id: "w5",
    name: "Royal Wedding Mala",
    category: "wedding",
    flowers: ["Rose", "Orchid", "Lotus", "Jasmine"],
    occasion: ["Wedding", "Reception"],
    images: [
      "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521427780400-4e7b900a6abb?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "royal-wedding-mala",
    description:
      "The pinnacle of our wedding collection. The Royal Wedding Mala combines the finest roses, orchids, lotus, and jasmine in an intricate weave that mirrors the grandeur of a royal ceremony.",
    shortDescription: "The ultimate royal multi-flower mala",
    variants: [
      { size: "5 ft", price: 4500, stock: 5 },
      { size: "6 ft", price: 5500, stock: 4 },
      { size: "7 ft", price: 6500, stock: 3 },
    ],
    rating: 5.0,
    reviewCount: 31,
    isPremium: true,
    isFeatured: true,
    estimatedLife: "24–36 hours",
    tags: ["royal", "luxury", "wedding", "premium"],
    badge: "Royal",
  },

  // RECEPTION MALAS
  {
    id: "r1",
    name: "Rose Reception Mala",
    category: "reception",
    flowers: ["Rose"],
    occasion: ["Reception", "Wedding"],
    images: [
      "https://images.unsplash.com/photo-1521427780400-4e7b900a6abb?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "rose-reception-mala",
    description:
      "Elegant red and pink rose garlands for your reception ceremony. Perfectly crafted to complement formal evening receptions and grand hall décor.",
    shortDescription: "Classic rose garland for receptions",
    variants: [
      { size: "4 ft", price: 1100, stock: 15 },
      { size: "5 ft", price: 1400, stock: 12 },
      { size: "6 ft", price: 1700, stock: 10 },
      { size: "7 ft", price: 2000, stock: 8 },
    ],
    rating: 4.7,
    reviewCount: 88,
    isBestSeller: true,
    estimatedLife: "24–36 hours",
    tags: ["reception", "rose"],
  },
  {
    id: "r2",
    name: "Orchid Reception Mala",
    category: "reception",
    flowers: ["Orchid"],
    occasion: ["Reception", "Wedding", "Corporate Events"],
    images: [
      "https://images.unsplash.com/photo-1600326145359-3a45c8502392?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "orchid-reception-mala",
    description:
      "Exotic and rare, our Orchid Reception Mala brings an air of sophistication to any reception. Orchids last longer and make a bold visual statement under event lighting.",
    shortDescription: "Exotic orchid mala for elegant receptions",
    variants: [
      { size: "4 ft", price: 2000, stock: 10 },
      { size: "5 ft", price: 2600, stock: 8 },
      { size: "6 ft", price: 3200, stock: 6 },
    ],
    rating: 4.8,
    reviewCount: 62,
    isPremium: true,
    estimatedLife: "36–48 hours",
    tags: ["reception", "orchid", "premium"],
    badge: "Premium",
  },
  {
    id: "r3",
    name: "Carnation Reception Mala",
    category: "reception",
    flowers: ["Carnation"],
    occasion: ["Reception", "Anniversary", "Birthday"],
    images: [
      "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "carnation-reception-mala",
    description:
      "Long-lasting carnations in a choice of colors make this the most durable and vivid reception mala we offer. Perfect for extended celebration events.",
    shortDescription: "Vibrant & long-lasting carnation mala",
    variants: [
      { size: "4 ft", price: 900, stock: 18 },
      { size: "5 ft", price: 1100, stock: 14 },
      { size: "6 ft", price: 1350, stock: 10 },
      { size: "7 ft", price: 1600, stock: 8 },
    ],
    rating: 4.6,
    reviewCount: 77,
    estimatedLife: "36–48 hours",
    tags: ["reception", "carnation", "colorful"],
  },

  // MARRIAGE CEREMONY MALAS
  {
    id: "m1",
    name: "Muhurtham Mala",
    category: "marriage",
    flowers: ["Jasmine", "Rose"],
    occasion: ["Marriage Ceremony", "Wedding"],
    images: [
      "https://images.unsplash.com/photo-1616853755490-671231f8220f?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "muhurtham-mala",
    description:
      "Specially crafted for the sacred Muhurtham moment, this mala combines pure jasmine and rose in the traditional South Indian style. Auspiciously made at the right time for the right occasion.",
    shortDescription: "Sacred mala for the Muhurtham moment",
    variants: [
      { size: "3 ft", price: 850, stock: 20 },
      { size: "4 ft", price: 1050, stock: 15 },
      { size: "5 ft", price: 1300, stock: 10 },
    ],
    rating: 4.9,
    reviewCount: 145,
    isBestSeller: true,
    freshToday: true,
    estimatedLife: "12–24 hours",
    tags: ["muhurtham", "marriage", "jasmine", "sacred"],
    badge: "Best Seller",
  },
  {
    id: "m2",
    name: "Traditional Temple Mala",
    category: "marriage",
    flowers: ["Lotus", "Jasmine", "Marigold"],
    occasion: ["Marriage Ceremony", "Temple Festival"],
    images: [
      "https://images.unsplash.com/photo-1596484552993-9c8e1b6f0014?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "traditional-temple-mala",
    description:
      "Sacred traditional mala made with lotus, jasmine, and marigold — flowers revered in South Indian temple traditions. Ensures divine blessings for the married couple.",
    shortDescription: "Sacred lotus & jasmine temple mala",
    variants: [
      { size: "3 ft", price: 650, stock: 22 },
      { size: "4 ft", price: 820, stock: 18 },
      { size: "5 ft", price: 1000, stock: 12 },
    ],
    rating: 4.8,
    reviewCount: 118,
    estimatedLife: "12–24 hours",
    tags: ["temple", "marriage", "lotus", "traditional"],
  },
  {
    id: "m3",
    name: "Double Layer Mala",
    category: "marriage",
    flowers: ["Rose", "Jasmine"],
    occasion: ["Marriage Ceremony", "Wedding", "Reception"],
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "double-layer-mala",
    description:
      "A bold, thick double-layered garland with roses on the outside and jasmine inside — creating an extraordinary visual depth and an intoxicating fragrance combination.",
    shortDescription: "Thick double-layer rose & jasmine mala",
    variants: [
      { size: "3 ft", price: 1400, stock: 10 },
      { size: "4 ft", price: 1800, stock: 8 },
      { size: "5 ft", price: 2200, stock: 6 },
    ],
    rating: 4.9,
    reviewCount: 86,
    isPremium: true,
    estimatedLife: "12–24 hours",
    tags: ["double layer", "thick", "premium", "marriage"],
    badge: "Premium",
  },

  // TEMPLE GARLANDS
  {
    id: "t1",
    name: "Traditional Lotus Garland",
    category: "temple",
    flowers: ["Lotus"],
    occasion: ["Temple Festival", "Puja", "Housewarming"],
    images: [
      "https://images.unsplash.com/photo-1596484552993-9c8e1b6f0014?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "traditional-lotus-garland",
    description:
      "Sacred lotus garland, perfect for deity offerings and temple rituals. Lotuses are hand-picked at dawn for maximum freshness and spiritual purity.",
    shortDescription: "Sacred lotus deity offering garland",
    variants: [
      { size: "2 ft", price: 350, stock: 30 },
      { size: "3 ft", price: 480, stock: 25 },
      { size: "4 ft", price: 620, stock: 20 },
    ],
    rating: 4.9,
    reviewCount: 234,
    isBestSeller: true,
    freshToday: true,
    estimatedLife: "12–18 hours",
    tags: ["temple", "lotus", "sacred", "puja"],
    badge: "Best Seller",
  },
  {
    id: "t2",
    name: "Marigold Temple Garland",
    category: "temple",
    flowers: ["Marigold"],
    occasion: ["Temple Festival", "Puja", "Naming Ceremony", "Housewarming"],
    images: [
      "https://images.unsplash.com/photo-1621841398852-c3616641e7dc?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "marigold-temple-garland",
    description:
      "Bright golden marigold garlands — a staple of South Indian temple worship and festival décor. Vibrant, fragrant, and deeply auspicious.",
    shortDescription: "Golden marigold auspicious garland",
    variants: [
      { size: "2 ft", price: 250, stock: 40 },
      { size: "3 ft", price: 350, stock: 35 },
      { size: "4 ft", price: 460, stock: 28 },
    ],
    rating: 4.8,
    reviewCount: 312,
    isBestSeller: true,
    freshToday: true,
    estimatedLife: "24–48 hours",
    tags: ["temple", "marigold", "festival", "auspicious"],
  },

  // HAIR PIECES
  {
    id: "h1",
    name: "Jasmine Veni",
    category: "hair",
    flowers: ["Jasmine"],
    occasion: ["Wedding", "Reception", "Engagement"],
    images: [
      "https://images.unsplash.com/photo-1616853755490-671231f8220f?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "jasmine-veni",
    description:
      "Traditional South Indian jasmine hair veni for brides. Strings of fragrant jasmine buds woven into a classic pattern for the perfect bridal look.",
    shortDescription: "Traditional bridal jasmine hair veni",
    variants: [
      { size: "12 inches", price: 180, stock: 30 },
      { size: "18 inches", price: 250, stock: 25 },
      { size: "24 inches", price: 320, stock: 20 },
    ],
    rating: 4.8,
    reviewCount: 189,
    isBestSeller: true,
    freshToday: true,
    estimatedLife: "12–18 hours",
    tags: ["bridal", "hair", "jasmine", "veni"],
    badge: "Best Seller",
  },
  {
    id: "h2",
    name: "Orchid Bridal Hair Piece",
    category: "hair",
    flowers: ["Orchid"],
    occasion: ["Reception", "Wedding", "Engagement"],
    images: [
      "https://images.unsplash.com/photo-1600326145359-3a45c8502392?q=80&w=1000&auto=format&fit=crop",
    ],
    slug: "orchid-bridal-hair-piece",
    description:
      "Delicate orchid arrangements to complete the perfect bridal look. Modern and elegant, perfect for reception ceremonies and evening events.",
    shortDescription: "Elegant orchid bridal hair arrangement",
    variants: [
      { size: "Small", price: 350, stock: 20 },
      { size: "Medium", price: 500, stock: 15 },
      { size: "Large", price: 700, stock: 10 },
    ],
    rating: 4.7,
    reviewCount: 97,
    isNew: true,
    estimatedLife: "24–36 hours",
    tags: ["bridal", "orchid", "hair", "modern"],
    badge: "New",
  },
];

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
    text: "SUTHISKA made our wedding absolutely magical! The malas were so fresh, intricately designed, and the jasmine fragrance filled the entire mandap. We couldn't have asked for anything more beautiful.",
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
