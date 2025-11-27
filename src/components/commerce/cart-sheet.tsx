"use client";

import React from "react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from "lucide-react";
import { CartItem } from "./cart-item";
import { useRouter } from "next/navigation";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";

import { useLanguage } from "@/context/language-context";

export function CartSheet() {
    const { items, cartTotal, cartCount } = useCart();
    const { t } = useLanguage();
    const router = useRouter();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-6 w-6 text-neutral-600" />
                    {cartCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white">
                            {cartCount}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
                <SheetHeader className="flex flex-row items-center justify-between border-b border-neutral-200 pb-4">
                    <SheetTitle className="text-lg font-bold">
                        {t("cart.title")} ({cartCount})
                    </SheetTitle>
                    {/* Close button is handled by Sheet primitive usually, but we can add custom if needed */}
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4">
                    {items.length > 0 ? (
                        items.map((item) => <CartItem key={item.id} item={item} />)
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <ShoppingCart className="mb-4 h-12 w-12 text-neutral-300" />
                            <p className="text-neutral-500">{t("cart.empty")}</p>
                            <SheetClose asChild>
                                <Button variant="link" className="mt-2 text-green-600">
                                    {t("cart.shopNow")}
                                </Button>
                            </SheetClose>
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t border-neutral-200 pt-4">
                        <div className="mb-4 flex items-center justify-between">
                            <span className="text-base font-medium text-neutral-600">
                                {t("cart.total")}
                            </span>
                            <span className="text-xl font-bold text-neutral-900">
                                ₹{cartTotal}
                            </span>
                        </div>
                        <SheetClose asChild>
                            <Button
                                className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
                                onClick={() => router.push("/checkout")}
                            >
                                {t("cart.checkout")}
                            </Button>
                        </SheetClose>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
