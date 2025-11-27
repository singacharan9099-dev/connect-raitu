"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import { MobileLayout } from "@/components/layout/mobile-layout";
import { products as staticProducts, categories, Product } from "@/lib/data/products";
import { ProductCard } from "@/components/marketplace/product-card";
import { CategoryFilter } from "@/components/marketplace/category-filter";
import { SearchBar } from "@/components/marketplace/search-bar";
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/lib/db-service";
import { useLanguage } from "@/context/language-context";

function ShopContent() {
    const searchParams = useSearchParams();
    const { t } = useLanguage();
    const initialCategory = searchParams.get("category") || "All";
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const dbProducts = await getProducts();
                setProducts(dbProducts);
            } catch (error) {
                console.error("Failed to fetch products", error);
                // Only fallback on error if absolutely necessary, or just show empty
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory =
                selectedCategory === "All" || product.category === selectedCategory;
            const matchesSearch = product.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery, products]);

    if (loading) {
        return <div className="p-8 text-center text-neutral-500">{t("common.loading")}</div>;
    }

    return (
        <div className="space-y-4 py-4">
            <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={t("shop.search")}
            />

            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            <div className="px-4">
                <h2 className="mb-3 text-lg font-semibold text-neutral-900">
                    {selectedCategory === "All" ? t("shop.allCategories") : selectedCategory}
                    <span className="ml-2 text-sm font-normal text-neutral-500">
                        ({filteredProducts.length})
                    </span>
                </h2>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex h-40 flex-col items-center justify-center text-center">
                        <p className="text-neutral-500">No products found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <MobileLayout headerTitle="Marketplace">
            <Suspense fallback={<div className="p-4 text-center">Loading marketplace...</div>}>
                <ShopContent />
            </Suspense>
        </MobileLayout>
    );
}
