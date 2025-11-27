"use client";

import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/mobile-layout";
import { ImageUpload } from "@/components/ai/image-upload";
import { DiagnosisResult } from "@/components/ai/diagnosis-result";
import { analyzePlantImage, Diagnosis } from "@/lib/ai-service";
import { Button } from "@/components/ui/button";
import { Loader2, Stethoscope } from "lucide-react";

import { useLanguage } from "@/context/language-context";

export default function DoctorPage() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
    const { t } = useLanguage();

    const handleAnalyze = async () => {
        if (!selectedImage) return;

        setAnalyzing(true);
        try {
            const result = await analyzePlantImage(selectedImage);
            setDiagnosis(result);
        } catch (error) {
            console.error("Analysis failed", error);
        } finally {
            setAnalyzing(false);
        }
    };

    const handleReset = () => {
        setSelectedImage(null);
        setDiagnosis(null);
    };

    return (
        <MobileLayout headerTitle={t("ai.doctor.title")}>
            <div className="p-4">
                {!diagnosis ? (
                    <div className="space-y-6">
                        <div className="rounded-xl bg-green-50 p-4 text-center">
                            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                                <Stethoscope className="h-6 w-6" />
                            </div>
                            <h2 className="font-bold text-green-900">{t("ai.doctor.subtitle")}</h2>
                            <p className="text-sm text-green-700">
                                {t("ai.doctor.description")}
                            </p>
                        </div>

                        <ImageUpload onImageSelected={setSelectedImage} />

                        {selectedImage && (
                            <Button
                                className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
                                onClick={handleAnalyze}
                                disabled={analyzing}
                            >
                                {analyzing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {t("ai.doctor.analyzing")}
                                    </>
                                ) : (
                                    t("ai.doctor.diagnose")
                                )}
                            </Button>
                        )}
                    </div>
                ) : (
                    <DiagnosisResult diagnosis={diagnosis} onReset={handleReset} />
                )}
            </div>
        </MobileLayout>
    );
}
