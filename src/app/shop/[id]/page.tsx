"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { MobileLayout } from "@/components/layout/mobile-layout";
import { products } from "@/lib/data/products";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft, ShoppingCart, Share2 } from "lucide-react";
import { useCart } from "@/context/cart-context";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const product = products.find((p) => p.id === params.id);

    if (!product) {
        return (
            <MobileLayout>
                <div className="flex h-full items-center justify-center">
                    <p>Product not found</p>
                </div>
            </MobileLayout>
        );
    }

    return (
        <MobileLayout showBottomNav={false}>
            <div className="relative">
                {/* Header Actions */}
                <div className="absolute left-4 top-4 z-10 flex w-[calc(100%-32px)] justify-between">
                    <Button
                        size="icon"
                        variant="secondary"
                        className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-5 w-5 text-neutral-900" />
                    </Button>
                    <Button
                        size="icon"
                        variant="secondary"
                        className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    >
                        <Share2 className="h-5 w-5 text-neutral-900" />
                    </Button>
                </div>

                {/* Product Image */}
                <div className="aspect-square w-full bg-neutral-100">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="relative -mt-6 rounded-t-3xl bg-white p-6 shadow-lg">
                    <div className="mb-4">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                {product.category}
                            </span>
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium text-neutral-900">
                                    {product.rating}
                                </span>
                                <span className="text-sm text-neutral-500">
                                    ({product.reviews} reviews)
                                </span>
                            </div>
                        </div>
                        <h1 className="mb-1 text-2xl font-bold text-neutral-900">
                            {product.name}
                        </h1>
                        <p className="text-sm text-neutral-500">By {product.brand}</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                            Description
                        </h3>
                        <p className="text-neutral-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Price and Action */}
                    <div className="fixed bottom-0 left-0 right-0 border-t border-neutral-200 bg-white p-4 max-w-md mx-auto">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-xs text-neutral-500">Total Price</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-neutral-900">
                                        ₹{product.price}
                                    </span>
                                    <span className="text-sm text-neutral-400 line-through">
                                        ₹{product.mrp}
                                    </span>
                                </div>
                            </div>
                            <Button
                                className="flex-1 bg-green-600 hover:bg-green-700 h-12 text-lg"
                                disabled={!product.inStock}
                                onClick={() => addToCart(product)}
                            >
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                {product.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                        </div>
                    </div>

                    {/* Spacer for fixed bottom bar */}
                    <div className="h-20" />
                </div>
            </div>
        </MobileLayout>
    );
}
