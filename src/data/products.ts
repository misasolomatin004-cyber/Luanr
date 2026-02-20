export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  isPopular?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Elegant Silk Dress",
    category: "Dresses",
    price: 1200,
    oldPrice: 1500,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    colors: ["Pink", "White"],
    sizes: ["S", "M", "L"],
    isNew: true,
  },
  {
    id: 2,
    name: "Classic Black Blazer",
    category: "Jackets",
    price: 2500,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    colors: ["Black"],
    sizes: ["M", "L", "XL"],
    isPopular: true,
  },
  {
    id: 3,
    name: "High-Waist Jeans",
    category: "Jeans",
    price: 1800,
    oldPrice: 2200,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    colors: ["Blue", "Black"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 4,
    name: "Cozy Knit Sweater",
    category: "Tops",
    price: 950,
    image: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    colors: ["Beige", "White", "Pink"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 5,
    name: "Pleated Midi Skirt",
    category: "Skirts",
    price: 1100,
    oldPrice: 1400,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    colors: ["Black", "Pink"],
    sizes: ["XS", "S", "M"],
  },
  {
    id: 6,
    name: "Sporty Crop Top",
    category: "Sportswear",
    price: 650,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    colors: ["Black", "White"],
    sizes: ["XS", "S", "M"],
    isNew: true,
  },
  {
    id: 7,
    name: "Oversized Denim Jacket",
    category: "Jackets",
    price: 2100,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    colors: ["Blue"],
    sizes: ["S", "M", "L", "XL"],
    isPopular: true,
  },
  {
    id: 8,
    name: "Summer Floral Dress",
    category: "Dresses",
    price: 1350,
    oldPrice: 1800,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    colors: ["Pink", "White"],
    sizes: ["XS", "S", "M"],
  },
  {
    id: 9,
    name: "Basic White Tee",
    category: "Tops",
    price: 450,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    colors: ["White", "Black", "Beige"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 10,
    name: "Yoga Leggings",
    category: "Sportswear",
    price: 850,
    oldPrice: 1200,
    image: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    colors: ["Black", "Blue"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 11,
    name: "Evening Gown",
    category: "Dresses",
    price: 4500,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop",
    rating: 5.0,
    colors: ["Black", "Red"],
    sizes: ["S", "M", "L"],
    isPopular: true,
  },
  {
    id: 12,
    name: "Leather Mini Skirt",
    category: "Skirts",
    price: 1600,
    image: "https://images.unsplash.com/photo-1551163943-3f6a29e39454?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    colors: ["Black"],
    sizes: ["XS", "S", "M"],
  }
];
