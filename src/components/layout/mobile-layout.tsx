"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BottomNav } from "@/components/ui/bottom-nav";
import { CartSheet } from "@/components/commerce/cart-sheet";
import { usePathname } from "next/navigation";
import { LanguageSheet } from "@/components/profile/language-sheet";
import { Globe } from "lucide-react";

interface MobileLayoutProps {
    children: React.ReactNode;
    className?: string;
    showBottomNav?: boolean;
    headerTitle?: string;
}

export function MobileLayout({
    children,
    className,
    showBottomNav = true,
    headerTitle = "Connect Raitu",
}: MobileLayoutProps) {
    const pathname = usePathname();

    // Hide bottom nav on onboarding and login screens
    const isAuthScreen =
        pathname.includes("/onboarding") || pathname.includes("/login");
    const shouldShowNav = showBottomNav && !isAuthScreen;

    return (
        <div className="flex min-h-screen w-full justify-center bg-neutral-100">
            <div className="relative flex h-full min-h-screen w-full max-w-md flex-col bg-white shadow-xl">
                {/* Header */}
                {!isAuthScreen && (
                    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-4">
                        <div className="flex items-center gap-2">
                            <img src="/logo.png" alt="Connect Raitu" className="h-8 w-auto" />
                            <h1 className="text-lg font-semibold text-green-700">
                                {headerTitle}
                            </h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <LanguageSheet>
                                <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-full">
                                    <Globe className="h-5 w-5" />
                                </button>
                            </LanguageSheet>
                            <CartSheet />
                        </div>
                    </header>
                )}

                {/* Main Content */}
                <main className={cn("flex-1 overflow-y-auto pb-20", className)}>
                    {children}
                </main>

                {/* Bottom Navigation */}
                {shouldShowNav && <BottomNav />}
            </div>
        </div>
    );
}
