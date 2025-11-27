import { supabase } from "./supabase";
import { Product } from "./data/products";
import { Order } from "@/context/cart-context";

// Products
export async function getProducts(): Promise<Product[]> {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*');

        if (error) throw error;

        // Map Supabase data to Product interface if needed
        return data.map((p: any) => ({
            id: p.id.toString(),
            name: p.name,
            price: p.price,
            mrp: p.price * 1.2, // Default MRP if missing
            unit: p.unit,
            category: p.category,
            image: p.image,
            rating: p.rating,
            reviews: p.reviews,
            description: p.description || "No description available",
            brand: p.brand || "Generic",
            inStock: p.in_stock
        }));
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

// Orders
export async function createOrder(order: Omit<Order, "id">, userId: string): Promise<string | null> {
    try {
        const orderId = Math.floor(100000 + Math.random() * 900000).toString();

        const { error } = await supabase
            .from('orders')
            .insert({
                id: orderId,
                user_id: userId,
                items: order.items,
                total: order.total,
                status: order.status,
                date: order.date,
                address: order.address,
                payment_method: order.paymentMethod // Note: snake_case in DB
            });

        if (error) throw error;
        return orderId;
    } catch (error) {
        console.error("Error creating order:", error);
        return null;
    }
}

export async function getUserOrders(userId: string): Promise<Order[]> {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', userId)
            .order('date', { ascending: false });

        if (error) throw error;

        return data.map((o: any) => ({
            id: o.id,
            date: o.date,
            items: o.items,
            total: o.total,
            status: o.status,
            address: o.address,
            paymentMethod: o.payment_method
        }));
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return [];
    }
};
