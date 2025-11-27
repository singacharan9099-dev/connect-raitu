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
                                <Link href="/advisory" className="text-sm font-medium text-neutral-600 hover:text-green-600 transition-colors">Crop Planner</Link>
                                <Link href="/profile" className="text-sm font-medium text-neutral-600 hover:text-green-600 transition-colors">Profile</Link>
                            </nav >
                        </div >
        <div className="flex items-center gap-3">
            <LanguageSheet>
                <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-full">
                    <Globe className="h-5 w-5" />
                </button>
            </LanguageSheet>
            <CartSheet />
        </div>
                    </header >
                )
}

{/* Main Content */ }
<main className={cn("flex-1 overflow-y-auto pb-20", className)}>
    {children}
</main>

{/* Bottom Navigation */ }
{ shouldShowNav && <BottomNav /> }
            </div >
        </div >
    );
}
