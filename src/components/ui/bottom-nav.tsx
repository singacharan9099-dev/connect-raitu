"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, ShoppingCart, Stethoscope, BookOpen, User } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function BottomNav() {
    const pathname = usePathname();
    const { t } = useLanguage();

    const navItems = [
        { href: "/", label: t("nav.home"), icon: Home },
        { href: "/shop", label: t("nav.shop"), icon: ShoppingCart },
        { href: "/doctor", label: t("ai.doctor.title"), icon: Stethoscope },
        { href: "/advisory", label: t("ai.planner.title"), icon: BookOpen },
        { href: "/profile", label: t("nav.profile"), icon: User },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden h-16 items-center justify-around border-t border-neutral-200 bg-white px-2 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] max-w-md mx-auto">
            {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                    <Link
                        key={href}
                        href={href}
                        className={cn(
                            "flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-1 transition-colors",
                            isActive ? "text-green-600" : "text-neutral-500 hover:text-neutral-900"
                        )}
                    >
                        <Icon className={cn("h-6 w-6", isActive && "fill-current")} />
                        <span className="text-[10px] font-medium">{label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
