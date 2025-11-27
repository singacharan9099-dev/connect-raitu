"use client";

import React from "react";
import { MobileLayout } from "@/components/layout/mobile-layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("id") || "Unknown";

    return (
        <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <div className="mb-6 rounded-full bg-green-100 p-6">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-neutral-900">Order Placed!</h1>
            <p className="mb-8 text-neutral-500">
                Your order #{orderId} has been placed successfully. You will receive a confirmation SMS shortly.
            </p>

            <div className="w-full space-y-4">
                <Link href="/orders" className="block w-full">
                    <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg">
                        View Order
                    </Button>
                </Link>
                <Link href="/shop" className="block w-full">
                    <Button variant="outline" className="w-full h-12 text-lg">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <MobileLayout showBottomNav={false}>
            <Suspense fallback={<div>Loading...</div>}>
                <OrderSuccessContent />
            </Suspense>
        </MobileLayout>
    );
}
