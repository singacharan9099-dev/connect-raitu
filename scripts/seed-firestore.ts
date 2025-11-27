import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase config - replace with your values or use env vars
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAXz9cIcsoLqaCdWidZqWywNK9ZXgNpDk4",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "connect-raitu.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "connect-raitu",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "connect-raitu.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1012097245308",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1012097245308:web:c8dd3eb1d271270b7469f9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleProducts = [
    {
        id: "1",
        name: "Hybrid Tomato Seeds",
        price: 450,
        unit: "500g",
        category: "Seeds",
        image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400",
        rating: 4.5,
        reviews: 128,
        inStock: true,
    },
    {
        id: "2",
        name: "NPK 19-19-19 Fertilizer",
        price: 850,
        unit: "5kg",
        category: "Fertilizers",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
        rating: 4.8,
        reviews: 342,
        inStock: true,
    },
    {
        id: "3",
        name: "Neem Oil Pesticide",
        price: 350,
        unit: "1L",
        category: "Pesticides",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400",
        rating: 4.3,
        reviews: 89,
        inStock: true,
    },
    {
        id: "4",
        name: "Drip Irrigation Kit",
        price: 2500,
        unit: "50m",
        category: "Equipment",
        image: "https://images.unsplash.com/photo-1625246376162-84b9f3a6f79c?w=400",
        rating: 4.7,
        reviews: 56,
        inStock: true,
    },
    {
        id: "5",
        name: "Organic Compost",
        price: 300,
        unit: "10kg",
        category: "Fertilizers",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
        rating: 4.6,
        reviews: 234,
        inStock: true,
    },
];

async function seedFirestore() {
    try {
        console.log("Starting Firestore seeding...");

        for (const product of sampleProducts) {
            const docRef = await addDoc(collection(db, "products"), product);
            console.log(`✓ Added product: ${product.name} (ID: ${docRef.id})`);
        }

        console.log("\n✓ Successfully seeded Firestore with sample products!");
        console.log(`Total products added: ${sampleProducts.length}`);
        process.exit(0);
    } catch (error) {
        console.error("Error seeding Firestore:", error);
        process.exit(1);
    }
}

seedFirestore();
