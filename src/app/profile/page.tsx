"use client";

import React from "react";
import { MobileLayout } from "@/components/layout/mobile-layout";
import {
    User,
    ShoppingBag,
    MapPin,
    Globe,
    HelpCircle,
    LogOut,
    ChevronRight,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { ProfileMenuItem } from "@/components/profile/profile-menu-item";

import { EditProfileSheet } from "@/components/profile/edit-profile-sheet";
import { LanguageSheet } from "@/components/profile/language-sheet";
import { SupportSheet } from "@/components/profile/support-sheet";

import { useLanguage } from "@/context/language-context";

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const { orders } = useCart();
    const { t } = useLanguage();

    return (
        <MobileLayout headerTitle={t("profile.title")}>
            <div className="pb-8">
                {/* Profile Header */}
                <div className="bg-white p-6 pb-8">
                    <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 ring-4 ring-green-50">
                            <User className="h-10 w-10 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-neutral-900">
                                {user?.name || "Farmer"}
                            </h2>
                            <p className="text-neutral-500">+91 {user?.phone}</p>
                            <EditProfileSheet>
                                <button className="mt-1 text-xs font-medium text-green-600 hover:underline">
                                    {t("profile.editProfile")}
                                </button>
                            </EditProfileSheet>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="px-4 -mt-4 mb-6">
                    <div className="grid grid-cols-2 gap-4 rounded-xl bg-white p-4 shadow-sm border border-neutral-100">
                        <div className="text-center border-r border-neutral-100">
                            <p className="text-2xl font-bold text-neutral-900">
                                {orders.length}
                            </p>
                            <p className="text-xs text-neutral-500">{t("profile.totalOrders")}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-neutral-900">₹0</p>
                            <p className="text-xs text-neutral-500">{t("profile.totalSavings")}</p>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-2 px-4">
                    <div className="overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm">
                        <ProfileMenuItem
                            icon={ShoppingBag}
                            label={t("profile.myOrders")}
                            href="/orders"
                        />
                        <div className="h-px bg-neutral-100" />
                        <ProfileMenuItem
                            icon={MapPin}
                            label={t("profile.myAddresses")}
                            href="/profile/addresses"
                        />
                        <div className="h-px bg-neutral-100" />
                        <LanguageSheet>
                            <div className="w-full">
                                <ProfileMenuItem
                                    icon={Globe}
                                    label={t("profile.changeLanguage")}
                                    href="#"
                                />
                            </div>
                        </LanguageSheet>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm">
                        <SupportSheet>
                            <div className="w-full">
                                <ProfileMenuItem
                                    icon={HelpCircle}
                                    label={t("profile.helpSupport")}
                                    href="#"
                                />
                            </div>
                        </SupportSheet>
                        <div className="h-px bg-neutral-100" />
                        <ProfileMenuItem
                            icon={LogOut}
                            label={t("profile.logout")}
                            href="#"
                            onClick={logout}
                            isDestructive
                        />
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-neutral-400">Connect Raitu v1.0.0</p>
                </div>
            </div>
        </MobileLayout>
    );
}
