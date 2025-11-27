import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingBag, TrendingUp } from "lucide-react";

export default function RetailerDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
                <p className="text-neutral-500">Overview of your store performance.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-neutral-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹45,231.89</div>
                        <p className="text-xs text-neutral-500">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-neutral-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12</div>
                        <p className="text-xs text-neutral-500">+2 since last hour</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                        <Package className="h-4 w-4 text-neutral-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-neutral-500">Requires attention</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                        <TrendingUp className="h-4 w-4 text-neutral-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-neutral-500">+201 since last hour</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Ramesh Kumar</p>
                                    <p className="text-sm text-neutral-500">ramesh@example.com</p>
                                </div>
                                <div className="ml-auto font-medium">+₹1,999.00</div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Suresh Reddy</p>
                                    <p className="text-sm text-neutral-500">suresh@example.com</p>
                                </div>
                                <div className="ml-auto font-medium">+₹39.00</div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Anita Singh</p>
                                    <p className="text-sm text-neutral-500">anita@example.com</p>
                                </div>
                                <div className="ml-auto font-medium">+₹299.00</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Top Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Hybrid Tomato Seeds</p>
                                    <p className="text-sm text-neutral-500">120 sold</p>
                                </div>
                                <div className="ml-auto font-medium">₹12k</div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">NPK Fertilizer</p>
                                    <p className="text-sm text-neutral-500">85 sold</p>
                                </div>
                                <div className="ml-auto font-medium">₹8.5k</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
