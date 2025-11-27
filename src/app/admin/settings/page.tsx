"use client";

import React from "react";
import { MobileLayout } from "@/components/layout/mobile-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsAdminPage() {
    return (
        <MobileLayout headerTitle="Admin Settings">
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
                        <p className="text-sm text-neutral-500">Platform configuration</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-12">
                            <SettingsIcon className="h-12 w-12 text-neutral-300 mx-auto mb-2" />
                            <p className="text-neutral-500">Settings configuration coming soon</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MobileLayout>
    );
}
