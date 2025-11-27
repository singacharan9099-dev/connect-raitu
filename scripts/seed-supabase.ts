import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const sampleProducts = [
    {
        name: "Hybrid Tomato Seeds",
        price: 450,
        unit: "500g",
        category: "Seeds",
        image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400",
        rating: 4.5,
        reviews: 128,
        in_stock: true,
        description: "High-yield hybrid tomato seeds suitable for all seasons.",
        brand: "Syngenta"
    },
    {
        name: "NPK 19-19-19 Fertilizer",
        price: 850,
        unit: "5kg",
        category: "Fertilizer",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
        rating: 4.8,
        reviews: 342,
        in_stock: true,
        description: "Balanced NPK fertilizer for overall crop growth.",
        brand: "IFFCO"
    },
    {
        name: "Neem Oil Pesticide",
        price: 350,
        unit: "1L",
        category: "Pesticides",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400",
        rating: 4.3,
        reviews: 89,
        in_stock: true,
        description: "Organic neem oil based pesticide.",
        brand: "Organic India"
    },
    {
        name: "Drip Irrigation Kit",
        price: 2500,
        unit: "50m",
        category: "Tools",
        image: "https://images.unsplash.com/photo-1625246376162-84b9f3a6f79c?w=400",
        rating: 4.7,
        reviews: 56,
        in_stock: true,
        description: "Complete drip irrigation kit for small gardens.",
        brand: "Jain Irrigation"
    },
    {
        name: "Organic Compost",
        price: 300,
        unit: "10kg",
        category: "Fertilizer",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
        rating: 4.6,
        reviews: 234,
        in_stock: true,
        description: "Rich organic compost for soil enrichment.",
        brand: "City Compost"
    },
];

async function seedSupabase() {
    try {
        console.log("Starting Supabase seeding...");

        const { data, error } = await supabase
            .from('products')
            .insert(sampleProducts)
            .select();

        if (error) throw error;

        console.log("\n✓ Successfully seeded Supabase with sample products!");
        console.log(`Total products added: ${data.length}`);
        process.exit(0);
    } catch (error) {
        console.error("Error seeding Supabase:", error);
        process.exit(1);
    }
}

seedSupabase();
