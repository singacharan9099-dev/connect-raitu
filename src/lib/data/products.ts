export interface Product {
    id: string;
    name: string;
    category: "Seeds" | "Fertilizer" | "Pesticides" | "Tools";
    price: number;
    mrp: number;
    image: string;
    rating: number;
    reviews: number;
    description: string;
    brand: string;
    inStock: boolean;
}

export const products: Product[] = [
    {
        id: "1",
        name: "Hybrid Tomato Seeds",
        category: "Seeds",
        price: 450,
        mrp: 500,
        image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=400",
        rating: 4.5,
        reviews: 120,
        description: "High-yield hybrid tomato seeds suitable for all seasons. Disease resistant and fast growing.",
        brand: "Syngenta",
        inStock: true,
    },
    {
        id: "2",
        name: "NPK 19-19-19 Fertilizer",
        category: "Fertilizer",
        price: 1200,
        mrp: 1500,
        image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&q=80&w=400",
        rating: 4.8,
        reviews: 85,
        description: "Balanced NPK fertilizer for overall crop growth and health. Water soluble.",
        brand: "IFFCO",
        inStock: true,
    },
    {
        id: "3",
        name: "Neem Oil Pesticide",
        category: "Pesticides",
        price: 350,
        mrp: 400,
        image: "https://images.unsplash.com/photo-1615485925763-867862f80a90?auto=format&fit=crop&q=80&w=400",
        rating: 4.2,
        reviews: 45,
        description: "Organic neem oil based pesticide. Effective against aphids, mites, and whiteflies.",
        brand: "Organic India",
        inStock: true,
    },
    {
        id: "4",
        name: "Heavy Duty Garden Spade",
        category: "Tools",
        price: 850,
        mrp: 1000,
        image: "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&q=80&w=400",
        rating: 4.9,
        reviews: 210,
        description: "Durable steel spade with ergonomic handle for easy digging and soil turning.",
        brand: "Tata Agrico",
        inStock: true,
    },
    {
        id: "5",
        name: "Cotton Seeds BG-II",
        category: "Seeds",
        price: 780,
        mrp: 850,
        image: "https://images.unsplash.com/photo-1593487023537-a72877543884?auto=format&fit=crop&q=80&w=400",
        rating: 4.6,
        reviews: 150,
        description: "Bollgard II cotton seeds for high yield and pest resistance.",
        brand: "Kaveri Seeds",
        inStock: true,
    },
    {
        id: "6",
        name: "Urea Fertilizer",
        category: "Fertilizer",
        price: 266,
        mrp: 300,
        image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=400",
        rating: 4.7,
        reviews: 300,
        description: "High nitrogen fertilizer for vegetative growth.",
        brand: "Coromandel",
        inStock: false,
    },
];

export const categories = ["All", "Seeds", "Fertilizer", "Pesticides", "Tools"];
