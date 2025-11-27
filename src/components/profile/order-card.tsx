import React from "react";
import { Order } from "@/context/cart-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // We might need to create this or use a simple span
import { ChevronRight, Package } from "lucide-react";
import Link from "next/link";

interface OrderCardProps {
    order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Processing":
                return "bg-yellow-100 text-yellow-800";
            case "Shipped":
                return "bg-blue-100 text-blue-800";
            case "Delivered":
                return "bg-green-100 text-green-800";
            case "Cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-neutral-100 text-neutral-800";
        }
    };

    return (
        <Link href={`/orders/${order.id}`}>
            <Card className="mb-4 overflow-hidden transition-shadow hover:shadow-md">
                <CardContent className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600">
                                <Package className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-neutral-900">
                                    Order #{order.id}
                                </p>
                                <p className="text-xs text-neutral-500">{formatDate(order.date)}</p>
                            </div>
                        </div>
                        <span
                            className={`rounded-full px-2 py-1 text-[10px] font-bold ${getStatusColor(
                                order.status
                            )}`}
                        >
                            {order.status}
                        </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                        <div>
                            <p className="text-xs text-neutral-500">
                                {order.items.length} Items
                            </p>
                            <p className="text-sm font-bold text-neutral-900">
                                ₹{order.total}
                            </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-neutral-400" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
