"use client";

import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/mobile-layout";
import { CropPlannerForm } from "@/components/ai/crop-planner-form";
import { CropPlanResult } from "@/components/ai/crop-plan-result";
import { generateCropPlan, CropPlan } from "@/lib/ai-service";
import { Sprout } from "lucide-react";

import { useLanguage } from "@/context/language-context";

export default function AdvisoryPage() {
    const [loading, setLoading] = useState(false);
    const [plans, setPlans] = useState<CropPlan[] | null>(null);
    const { t } = useLanguage();

    const handleGeneratePlan = async (data: {
        soilType: string;
        season: string;
        acres: string;
    }) => {
        setLoading(true);
        try {
            const results = await generateCropPlan(
                data.soilType,
                data.season,
                data.acres
            );
            setPlans(results);
        } catch (error) {
            console.error("Planning failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MobileLayout headerTitle={t("ai.planner.title")}>
            <div className="p-4">
                {!plans ? (
                    <div className="space-y-6">
                        <div className="rounded-xl bg-blue-50 p-4 text-center">
                            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <Sprout className="h-6 w-6" />
                            </div>
                            <h2 className="font-bold text-blue-900">{t("ai.planner.subtitle")}</h2>
                            <p className="text-sm text-blue-700">
                                {t("ai.planner.description")}
                            </p>
                        </div>

                        <CropPlannerForm onSubmit={handleGeneratePlan} loading={loading} />
                    </div>
                ) : (
                    <div className="space-y-6">
                        <CropPlanResult plans={plans} />
                        <button
                            onClick={() => setPlans(null)}
                            className="w-full text-center text-sm font-medium text-neutral-500 hover:text-neutral-900"
                        >
                            {t("ai.planner.startOver")}
                        </button>
                    </div>
                )}
            </div>
        </MobileLayout>
    );
}
