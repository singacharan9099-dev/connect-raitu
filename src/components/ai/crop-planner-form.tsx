"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface CropPlannerFormProps {
    onSubmit: (data: { soilType: string; season: string; acres: string }) => void;
    loading: boolean;
}

export function CropPlannerForm({ onSubmit, loading }: CropPlannerFormProps) {
    const [soilType, setSoilType] = useState("");
    const [season, setSeason] = useState("");
    const [acres, setAcres] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ soilType, season, acres });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Soil Type
                </label>
                <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value)}
                    className="flex h-12 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                >
                    <option value="">Select Soil Type</option>
                    <option value="Red Soil">Red Soil</option>
                    <option value="Black Soil">Black Soil</option>
                    <option value="Alluvial Soil">Alluvial Soil</option>
                    <option value="Loamy Soil">Loamy Soil</option>
                </select>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Season
                </label>
                <select
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="flex h-12 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                >
                    <option value="">Select Season</option>
                    <option value="Kharif (Monsoon)">Kharif (Monsoon)</option>
                    <option value="Rabi (Winter)">Rabi (Winter)</option>
                    <option value="Zaid (Summer)">Zaid (Summer)</option>
                </select>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Land Area (Acres)
                </label>
                <Input
                    type="number"
                    placeholder="e.g. 2.5"
                    value={acres}
                    onChange={(e) => setAcres(e.target.value)}
                    required
                />
            </div>

            <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
                disabled={loading}
            >
                {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                Generate Plan
            </Button>
        </form>
    );
}
