import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingCart, DollarSign, Activity } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-neutral-900">Platform Overview</h1>
                <p className="text-neutral-500">Welcome back, Admin.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
                        <Users className="h-4 w-4 text-neutral-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12,345</div>
                        <p className="text-xs text-neutral-500">+180 this month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Retailers</CardTitle>
                        <Users className="h-4 w-4 text-neutral-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">342</div>
                        <p className="text-xs text-neutral-500">+12 this month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total GMV</CardTitle>
                        <DollarSign className="h-4 w-4 text-neutral-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹1.2Cr</div>
                        <p className="text-xs text-neutral-500">+8% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Activity className="h-4 w-4 text-neutral-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">573</div>
                        <p className="text-xs text-neutral-500">+201 since last hour</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Registrations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between border-b border-neutral-100 pb-2 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-neutral-100" />
                                        <div>
                                            <p className="text-sm font-medium">New User {i}</p>
                                            <p className="text-xs text-neutral-500">Farmer • Karimnagar</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-neutral-400">2h ago</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Platform Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center gap-3 border-b border-neutral-100 pb-2 last:border-0 last:pb-0">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                                        <ShoppingCart className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Order #{1000 + i} Placed</p>
                                        <p className="text-xs text-neutral-500">₹{500 * i} • Via App</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
