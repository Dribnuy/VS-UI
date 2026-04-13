export type ProductCategory = "perfumes" | "sprays" | "lotions";

export type Product = {
  id: string;
  slug: string;
  category: ProductCategory;
  name: { uk: string; en: string };
  description: { uk: string; en: string };
  priceUah: number;
  volumeMl?: number;
  images: string[];
  inStock: boolean;
  tags?: Array<"new" | "hit" | "sale">;
};

export const categories: Array<{ id: ProductCategory; labelKey: "perfumes" | "sprays" | "lotions" }> =
  [
    { id: "perfumes", labelKey: "perfumes" },
    { id: "sprays", labelKey: "sprays" },
    { id: "lotions", labelKey: "lotions" },
  ];

// MVP: local mock data (replace with DB later)
export const products: Product[] = [
  {
    id: "vs-bombshell-edp-50",
    slug: "bombshell-edp-50",
    category: "perfumes",
    name: { uk: "Bombshell Eau de Parfum 50 мл", en: "Bombshell Eau de Parfum 50 ml" },
    description: {
      uk: "Легендарний аромат з яскравим, жіночним звучанням. Ідеально для щоденного використання.",
      en: "A signature bright, feminine scent. Perfect for everyday wear.",
    },
    priceUah: 1999,
    volumeMl: 50,
    images: ["/products/bombshell-1.jpg", "/products/bombshell-2.jpg"],
    inStock: true,
    tags: ["hit"],
  },
  {
    id: "vs-tease-edp-50",
    slug: "tease-edp-50",
    category: "perfumes",
    name: { uk: "Tease Eau de Parfum 50 мл", en: "Tease Eau de Parfum 50 ml" },
    description: {
      uk: "Солодко‑квіткова композиція з грайливим характером.",
      en: "A playful sweet floral blend.",
    },
    priceUah: 1899,
    volumeMl: 50,
    images: ["/products/tease-1.jpg"],
    inStock: true,
    tags: ["new"],
  },
  {
    id: "vs-mist-coconut-250",
    slug: "coconut-passion-mist-250",
    category: "sprays",
    name: { uk: "Coconut Passion Fragrance Mist 250 мл", en: "Coconut Passion Fragrance Mist 250 ml" },
    description: {
      uk: "Спрей для тіла з теплими тропічними нотами. Легкий шлейф на цілий день.",
      en: "Body mist with warm tropical notes and a light all-day trail.",
    },
    priceUah: 699,
    volumeMl: 250,
    images: ["/products/coconut-mist-1.jpg"],
    inStock: true,
  },
  {
    id: "vs-mist-velvet-250",
    slug: "velvet-petals-mist-250",
    category: "sprays",
    name: { uk: "Velvet Petals Fragrance Mist 250 мл", en: "Velvet Petals Fragrance Mist 250 ml" },
    description: {
      uk: "Квітковий спрей з ніжним звучанням. Добре поєднується з лосьйоном.",
      en: "A soft floral mist. Pairs well with matching lotion.",
    },
    priceUah: 699,
    volumeMl: 250,
    images: ["/products/velvet-mist-1.jpg"],
    inStock: false,
    tags: ["sale"],
  },
  {
    id: "vs-lotion-velvet-236",
    slug: "velvet-petals-lotion-236",
    category: "lotions",
    name: { uk: "Velvet Petals Body Lotion 236 мл", en: "Velvet Petals Body Lotion 236 ml" },
    description: {
      uk: "Лосьйон для тіла з ароматом і доглядом. Швидко вбирається, не липкий.",
      en: "A fast-absorbing body lotion with scent + care.",
    },
    priceUah: 749,
    volumeMl: 236,
    images: ["/products/velvet-lotion-1.jpg"],
    inStock: true,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export function getProductsByCategory(category: ProductCategory) {
  return products.filter((p) => p.category === category);
}

