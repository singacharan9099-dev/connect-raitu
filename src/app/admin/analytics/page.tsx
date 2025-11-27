import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-neutral-900">Analytics</h1>
                <p className="text-neutral-500">Detailed insights into platform performance.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>User Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex h-64 items-end justify-between gap-2 px-2">
                            {[40, 55, 45, 60, 75, 65, 85, 90, 80, 95, 100, 110].map((h, i) => (
                                <div key={i} className="w-full bg-green-100 hover:bg-green-200 transition-colors relative group">
                                    <div
                                        className="absolute bottom-0 w-full bg-green-500 rounded-t-sm transition-all duration-500"
                                        style={{ height: `${h}%` }}
                                    />
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-neutral-500">
                                        {i + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-center text-sm text-neutral-500">Monthly Active Users (Last 12 Months)</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center h-80">
                        <div className="relative h-48 w-48 rounded-full border-8 border-neutral-100">
                            <div className="absolute inset-0 rounded-full border-8 border-green-500 border-l-transparent border-b-transparent rotate-45" />
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-2xl font-bold text-neutral-900">75%</span>
                                <span className="text-xs text-neutral-500">Seeds</span>
                            </div>
                        </div>
                        <div className="ml-8 space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-green-500" />
                                <span className="text-sm text-neutral-600">Seeds (75%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-neutral-200" />
                                <span className="text-sm text-neutral-600">Fertilizers (15%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-neutral-200" />
                                <span className="text-sm text-neutral-600">Equipment (10%)</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
