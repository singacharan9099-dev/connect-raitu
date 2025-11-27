import React from "react";
import { Product } from "@/lib/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Plus } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
    product: Product;
}

import { useCart } from "@/context/cart-context";
import { useLanguage } from "@/context/language-context";

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const { t } = useLanguage();

    return (
        <Link href={`/shop/${product.id}`}>
            <Card className="overflow-hidden transition-shadow hover:shadow-md">
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                    {!product.inStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-red-600">
                                {t("shop.outOfStock")}
                            </span>
                        </div>
                    )}
                </div>
                <CardContent className="p-3">
                    <div className="mb-1 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-neutral-500">
                            {product.rating} ({product.reviews})
                        </span>
                    </div>
                    <h3 className="mb-1 line-clamp-2 text-sm font-medium text-neutral-900">
                        {product.name}
                    </h3>
                    <p className="mb-2 text-xs text-neutral-500">{product.brand}</p>
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-sm font-bold text-neutral-900">
                                ₹{product.price}
                            </span>
                            <span className="ml-1 text-xs text-neutral-400 line-through">
                                ₹{product.mrp}
                            </span>
                        </div>
                        <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-full border-green-600 text-green-600 hover:bg-green-50"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(product);
                            }}
                            disabled={!product.inStock}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
