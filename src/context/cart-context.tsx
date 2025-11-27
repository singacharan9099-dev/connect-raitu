"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/lib/data/products";
import { createOrder } from "@/lib/db-service";
import { useAuth } from "./auth-context";

export interface CartItem extends Product {
    quantity: number;
}

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
    address: string;
    paymentMethod: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
    orders: Order[];
    placeOrder: (address: string, paymentMethod: string) => Promise<string | null>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const { user } = useAuth();

    // Load cart and orders from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        const savedOrders = localStorage.getItem("orders");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart from local storage", e);
            }
        }
        if (savedOrders) {
            try {
                setOrders(JSON.parse(savedOrders));
            } catch (e) {
                console.error("Failed to parse orders from local storage", e);
            }
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    // Save orders to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    const addToCart = (product: Product) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const placeOrder = async (address: string, paymentMethod: string) => {
        const cartTotal = items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        const newOrder: any = {
            items: [...items],
            total: cartTotal,
            status: "Processing",
            date: new Date().toISOString(),
            address,
            paymentMethod,
        };

        try {
            let orderId = Math.floor(100000 + Math.random() * 900000).toString();

            if (user) {
                // If logged in, save to Firestore
                const id = await createOrder(newOrder, user.id);
                if (id) orderId = id;
            }

            const orderWithId = { ...newOrder, id: orderId };
            setOrders((prev) => [orderWithId, ...prev]);
            clearCart();
            return orderId;
        } catch (error) {
            console.error("Failed to place order", error);
            // Fallback to local
            const orderId = Math.floor(100000 + Math.random() * 900000).toString();
            const orderWithId = { ...newOrder, id: orderId };
            setOrders((prev) => [orderWithId, ...prev]);
            clearCart();
            return orderId;
        }
    };

    const cartTotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const cartCount = items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
                orders,
                placeOrder,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
