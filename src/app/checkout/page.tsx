"use client";

import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/mobile-layout";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Loader2, MapPin, CreditCard } from "lucide-react";

export default function CheckoutPage() {
    const { items, cartTotal, placeOrder } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");

    if (items.length === 0) {
        // Ideally we should redirect here, but for now let's just render null or a message
        // router.push("/shop"); 
        // Returning null causes hydration issues if we redirect immediately during render
        return (
            <MobileLayout headerTitle="Checkout">
                <div className="p-8 text-center">
                    <p>Your cart is empty.</p>
                    <Button onClick={() => router.push("/shop")} className="mt-4">Go to Shop</Button>
                </div>
            </MobileLayout>
        );
    }

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const orderId = placeOrder(address, "Cash on Delivery");
        setLoading(false);
        router.push(`/order-success?id=${orderId}`);
    };

    return (
        <MobileLayout headerTitle="Checkout" showBottomNav={false}>
            <div className="p-4 space-y-6">
                {/* Order Summary */}
                <div className="rounded-lg border border-neutral-200 bg-white p-4">
                    <h3 className="mb-3 text-sm font-semibold text-neutral-900">
                        Order Summary
                    </h3>
                    <div className="space-y-2">
                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-neutral-600">
                                    {item.quantity}x {item.name}
                                </span>
                                <span className="font-medium">
                                    ₹{item.price * item.quantity}
                                </span>
                            </div>
                        ))}
                        <div className="border-t border-neutral-100 pt-2 mt-2 flex justify-between font-bold">
                            <span>Total</span>
                            <span>₹{cartTotal}</span>
                        </div>
                    </div>
                </div>

                {/* Delivery Address */}
                <div className="rounded-lg border border-neutral-200 bg-white p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <h3 className="text-sm font-semibold text-neutral-900">
                            Delivery Address
                        </h3>
                    </div>
                    <Input
                        placeholder="Enter full address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="h-20"
                        required
                    />
                </div>

                {/* Payment Method */}
                <div className="rounded-lg border border-neutral-200 bg-white p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <CreditCard className="h-4 w-4 text-green-600" />
                        <h3 className="text-sm font-semibold text-neutral-900">
                            Payment Method
                        </h3>
                    </div>
                    <div className="flex items-center gap-3 rounded-md border border-green-200 bg-green-50 p-3">
                        <div className="h-4 w-4 rounded-full border-4 border-green-600 bg-white" />
                        <span className="text-sm font-medium text-green-900">
                            Cash on Delivery
                        </span>
                    </div>
                </div>

                {/* Place Order Button */}
                <div className="fixed bottom-0 left-0 right-0 border-t border-neutral-200 bg-white p-4">
                    <Button
                        className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
                        onClick={handlePlaceOrder}
                        disabled={loading || !address}
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                        Place Order • ₹{cartTotal}
                    </Button>
                </div>
                <div className="h-20" />
            </div>
        </MobileLayout>
    );
}
