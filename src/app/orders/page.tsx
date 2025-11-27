"use client";

import React from "react";
import { MobileLayout } from "@/components/layout/mobile-layout";
import { useCart } from "@/context/cart-context";
import { OrderCard } from "@/components/profile/order-card";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useLanguage } from "@/context/language-context";

export default function OrdersPage() {
    const { orders } = useCart();
    const { t } = useLanguage();

    return (
        <MobileLayout headerTitle={t("orders.title")}>
            <div className="p-4">
                {orders.length > 0 ? (
                    <div className="space-y-2">
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                ) : (
                    <div className="flex h-[60vh] flex-col items-center justify-center text-center">
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
                            <ShoppingBag className="h-10 w-10 text-green-600" />
                        </div>
                        <h2 className="mb-2 text-xl font-bold text-neutral-900">
                            {t("orders.empty")}
                        </h2>
                        <p className="mb-6 max-w-xs text-neutral-500">
                            {t("orders.emptyDesc")}
                        </p>
                        <Link href="/shop">
                            <Button className="bg-green-600 hover:bg-green-700">
                                {t("cart.shopNow")}
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </MobileLayout>
    );
}
