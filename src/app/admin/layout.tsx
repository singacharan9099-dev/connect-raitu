"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ShoppingBag, BarChart3, Settings, LogOut, ShieldCheck } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { icon: LayoutDashboard, label: "Overview", href: "/admin" },
        { icon: Users, label: "Users", href: "/admin/users" },
        { icon: ShoppingBag, label: "Marketplace", href: "/admin/marketplace" },
        { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
        { icon: Settings, label: "Settings", href: "/admin/settings" },
    ];

    return (
        <div className="flex h-screen bg-neutral-100">
            {/* Sidebar */}
            <aside className="w-64 bg-neutral-900 text-white hidden md:flex md:flex-col">
                <div className="flex h-16 items-center px-6 border-b border-neutral-800">
                    <ShieldCheck className="mr-2 h-6 w-6 text-green-500" />
                    <span className="text-lg font-bold">Admin Panel</span>
                </div>
                <nav className="flex-1 space-y-1 p-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                                        ? "bg-green-600 text-white"
                                        : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                                    }`}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="border-t border-neutral-800 p-4">
                    <button className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white">
                        <LogOut className="mr-3 h-5 w-5" />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="flex h-16 items-center justify-between bg-white px-6 shadow-sm md:hidden">
                    <div className="flex items-center">
                        <ShieldCheck className="mr-2 h-6 w-6 text-green-600" />
                        <span className="font-bold text-neutral-900">Admin</span>
                    </div>
                </header>
                <div className="p-6 md:p-8">{children}</div>
            </main>
        </div>
    );
}
