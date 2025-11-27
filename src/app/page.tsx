"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MobileLayout } from "@/components/layout/mobile-layout";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, CloudSun, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useLanguage } from "@/context/language-context";

export default function Home() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/onboarding");
    }
  }, [isLoading, isAuthenticated, router]);

  // Timeout for loading state
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn("Loading timeout - forcing page render");
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-100">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading Connect Raitu...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <MobileLayout>
      <div className="space-y-6 p-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
          <Input
            placeholder={t("home.search")}
            className="pl-10 h-12 rounded-full border-neutral-200 shadow-sm"
          />
        </div>

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-green-500 p-6 text-white shadow-lg">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Kharif Season Sale</h2>
            <p className="mb-4 text-green-50">Get up to 40% off on hybrid seeds</p>
            <Link href="/shop">
              <Button variant="secondary" className="bg-white text-green-700 hover:bg-green-50">
                Shop Now
              </Button>
            </Link>
          </div>
          <div className="absolute -right-4 -bottom-4 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-neutral-900">{t("home.categories")}</h3>
          <div className="grid grid-cols-4 gap-4">
            {["Seeds", "Fertilizer", "Pesticides", "Tools"].map((cat) => (
              <Link href={`/shop?category=${cat}`} key={cat} className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-700 shadow-sm transition-transform hover:scale-105">
                  <span className="text-xs font-bold">{cat[0]}</span>
                </div>
                <span className="text-xs font-medium text-neutral-600">{cat}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Weather Widget */}
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <CloudSun className="h-10 w-10 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-blue-900">Hyderabad</p>
                <h4 className="text-2xl font-bold text-blue-700">28°C</h4>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-600">Rain likely</p>
              <p className="text-xs text-blue-600">Humidity: 65%</p>
            </div>
          </CardContent>
        </Card>

        {/* Mandi Prices */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-neutral-900">Mandi Prices</h3>
            <Button variant="link" className="text-green-600 h-auto p-0">View All</Button>
          </div>
          <div className="space-y-3">
            {[
              { crop: "Tomato", price: "₹20/kg", trend: "up" },
              { crop: "Onion", price: "₹30/kg", trend: "down" },
            ].map((item) => (
              <Card key={item.crop}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-neutral-100"></div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">{item.crop}</h4>
                      <p className="text-xs text-neutral-500">Bowenpally Mandi</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-neutral-900">{item.price}</p>
                    <div className="flex items-center justify-end gap-1 text-xs">
                      {item.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />
                      )}
                      <span className={item.trend === "up" ? "text-green-600" : "text-red-600"}>
                        {item.trend === "up" ? "+2.5%" : "-1.2%"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* Recommended Products */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-neutral-900">Recommended</h3>
            <Link href="/shop" className="text-sm font-medium text-green-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* We'll import products dynamically or use a subset */}
            <Link href="/shop/1" className="block">
              <Card className="overflow-hidden">
                <div className="aspect-square bg-neutral-100">
                  <img src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=400" alt="Tomato Seeds" className="h-full w-full object-cover" />
                </div>
                <CardContent className="p-3">
                  <h4 className="text-sm font-medium text-neutral-900 line-clamp-1">Hybrid Tomato Seeds</h4>
                  <p className="text-xs text-neutral-500">Syngenta</p>
                  <p className="mt-1 text-sm font-bold text-neutral-900">₹450</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/shop/2" className="block">
              <Card className="overflow-hidden">
                <div className="aspect-square bg-neutral-100">
                  <img src="https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&q=80&w=400" alt="NPK Fertilizer" className="h-full w-full object-cover" />
                </div>
                <CardContent className="p-3">
                  <h4 className="text-sm font-medium text-neutral-900 line-clamp-1">NPK 19-19-19</h4>
                  <p className="text-xs text-neutral-500">IFFCO</p>
                  <p className="mt-1 text-sm font-bold text-neutral-900">₹1200</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
