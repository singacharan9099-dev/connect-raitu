import React from "react";
import { CropPlan } from "@/lib/ai-service";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, Calendar, TrendingUp, Droplets } from "lucide-react";

interface CropPlanResultProps {
    plans: CropPlan[];
}

export function CropPlanResult({ plans }: CropPlanResultProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-neutral-900">Recommended Crops</h3>
            {plans.map((plan, index) => (
                <Card key={index} className="overflow-hidden border-green-100">
                    <div className="bg-green-50 px-4 py-2 border-b border-green-100 flex justify-between items-center">
                        <span className="font-bold text-green-800">{plan.crop}</span>
                        <span className="text-xs font-medium bg-white px-2 py-1 rounded-full text-green-600 border border-green-200">
                            {(plan.suitability * 100).toFixed(0)}% Match
                        </span>
                    </div>
                    <CardContent className="p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-start gap-2">
                                <Calendar className="h-4 w-4 text-neutral-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-neutral-500">Duration</p>
                                    <p className="text-sm font-medium text-neutral-900">
                                        {plan.duration}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <Sprout className="h-4 w-4 text-neutral-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-neutral-500">Est. Yield</p>
                                    <p className="text-sm font-medium text-neutral-900">
                                        {plan.estimatedYield}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-2 bg-neutral-50 p-2 rounded-lg">
                            <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                            <div>
                                <p className="text-xs text-neutral-500">Potential Revenue</p>
                                <p className="text-sm font-bold text-green-700">
                                    {plan.estimatedRevenue}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="mb-1 text-xs font-medium text-neutral-500">
                                Key Requirements:
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {plan.requirements.map((req, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600"
                                    >
                                        {req}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
