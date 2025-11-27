"use client";

import React from "react";
import { MobileLayout } from "@/components/layout/mobile-layout";
import { useCart } from "@/context/cart-context";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, MapPin, CreditCard, Phone } from "lucide-react";

export default function OrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { orders } = useCart();
    const order = orders.find((o) => o.id === params.id);

    if (!order) {
        return (
            <MobileLayout headerTitle="Order Details">
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                    <p className="mb-4 text-neutral-500">Order not found</p>
                    <Button onClick={() => router.push("/orders")}>
                        Back to Orders
                    </Button>
                </div>
            </MobileLayout>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <MobileLayout headerTitle={`Order #${order.id}`} showBottomNav={false}>
            <div className="pb-8">
                {/* Status Header */}
                <div className="bg-white p-6 border-b border-neutral-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <Package className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-bold text-neutral-900">{order.status}</p>
                            <p className="text-xs text-neutral-500">
                                {formatDate(order.date)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Items List */}
                <div className="mt-4 bg-white p-4">
                    <h3 className="mb-3 text-sm font-semibold text-neutral-900">
                        Items ({order.items.length})
                    </h3>
                    <div className="space-y-4">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex gap-3 border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-neutral-100">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-neutral-900 line-clamp-2">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-neutral-500 mt-1">
                                        Qty: {item.quantity} × ₹{item.price}
                                    </p>
                                </div>
                                <div className="text-sm font-bold text-neutral-900">
                                    ₹{item.price * item.quantity}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="mt-4 bg-white p-4">
                    <h3 className="mb-3 text-sm font-semibold text-neutral-900">
                        Payment Details
                    </h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-neutral-600">
                            <span>Subtotal</span>
                            <span>₹{order.total}</span>
                        </div>
                        <div className="flex justify-between text-neutral-600">
                            <span>Delivery Fee</span>
                            <span className="text-green-600">Free</span>
                        </div>
                        <div className="border-t border-neutral-100 pt-2 mt-2 flex justify-between font-bold text-neutral-900">
                            <span>Total Amount</span>
                            <span>₹{order.total}</span>
                        </div>
                    </div>
                </div>

                {/* Delivery Details */}
                <div className="mt-4 bg-white p-4">
                    <h3 className="mb-3 text-sm font-semibold text-neutral-900">
                        Delivery Details
                    </h3>
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <MapPin className="h-5 w-5 text-neutral-400" />
                            <div>
                                <p className="text-sm font-medium text-neutral-900">
                                    Delivery Address
                                </p>
                                <p className="text-sm text-neutral-500">{order.address}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <CreditCard className="h-5 w-5 text-neutral-400" />
                            <div>
                                <p className="text-sm font-medium text-neutral-900">
                                    Payment Method
                                </p>
                                <p className="text-sm text-neutral-500">
                                    {order.paymentMethod}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Help Section */}
                <div className="mt-6 px-4">
                    <Button variant="outline" className="w-full gap-2 h-12">
                        <Phone className="h-4 w-4" />
                        Need Help with this Order?
                    </Button>
                </div>
            </div>
        </MobileLayout>
    );
}
