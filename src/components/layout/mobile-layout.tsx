"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { BottomNav } from "@/components/ui/bottom-nav";
import { CartSheet } from "@/components/commerce/cart-sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
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

    // Hide bottom nav on onboarding, login, and admin screens
    const isAuthScreen =
        pathname.includes("/onboarding") ||
        pathname.includes("/login") ||
        pathname.includes("/admin");
    const shouldShowNav = showBottomNav && !isAuthScreen;

    return (
        <div className="flex min-h-screen w-full justify-center bg-neutral-100">
            <div className="relative flex h-full min-h-screen w-full md:max-w-full flex-col bg-white shadow-xl">
                {/* Header */}
                {!isAuthScreen && (
                    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-4">
                        <div className="flex items-center gap-8">
                            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                <img src="/logo.png" alt="Connect Raitu" className="h-8 w-auto" />
                                <h1 className="text-lg font-semibold text-green-700">
                                    {headerTitle}
                                </h1>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center gap-6">
                                <Link href="/" className="text-sm font-medium text-neutral-600 hover:text-green-600 transition-colors">Home</Link>
                                <Link href="/shop" className="text-sm font-medium text-neutral-600 hover:text-green-600 transition-colors">Shop</Link>
                                <Link href="/doctor" className="text-sm font-medium text-neutral-600 hover:text-green-600 transition-colors">Plant Doctor</Link>
                                <Link href="/advisory" className="text-sm font-medium text-neutral-600 hover:text-green-600 transition-colors">Crop Planner</Link>
                                <Link href="/profile" className="text-sm font-medium text-neutral-600 hover:text-green-600 transition-colors">Profile</Link>
                            </nav>
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
