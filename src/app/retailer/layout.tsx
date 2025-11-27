"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, CreditCard, LogOut, Store } from "lucide-react";

export default function RetailerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/retailer" },
        { icon: Package, label: "Inventory", href: "/retailer/inventory" },
        { icon: ShoppingCart, label: "Orders", href: "/retailer/orders" },
        { icon: CreditCard, label: "Payments", href: "/retailer/payments" },
    ];

    return (
        <div className="flex h-screen bg-neutral-50">
            {/* Sidebar */}
            <aside className="w-64 border-r border-neutral-200 bg-white hidden md:flex md:flex-col">
                <div className="flex h-16 items-center border-b border-neutral-200 px-6">
                    <Store className="mr-2 h-6 w-6 text-green-600" />
                    <span className="text-lg font-bold text-neutral-900">Retailer Portal</span>
                </div>
                <nav className="flex-1 space-y-1 p-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                                        ? "bg-green-50 text-green-700"
                                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                                    }`}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="border-t border-neutral-200 p-4">
                    <button className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                        <LogOut className="mr-3 h-5 w-5" />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-6 md:hidden">
                    <div className="flex items-center">
                        <Store className="mr-2 h-6 w-6 text-green-600" />
                        <span className="font-bold text-neutral-900">Retailer</span>
                    </div>
                </header>
                <div className="p-6 md:p-8">{children}</div>
            </main>
        </div>
    );
}
