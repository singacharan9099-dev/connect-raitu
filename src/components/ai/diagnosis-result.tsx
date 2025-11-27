import React from "react";
import { Diagnosis } from "@/lib/ai-service";
import { AlertTriangle, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DiagnosisResultProps {
    diagnosis: Diagnosis;
    onReset: () => void;
}

export function DiagnosisResult({ diagnosis, onReset }: DiagnosisResultProps) {
    return (
        <div className="space-y-6">
            <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-red-700">
                    <AlertTriangle className="h-5 w-5" />
                    <h3 className="font-bold">Diagnosis: {diagnosis.disease}</h3>
                </div>
                <p className="text-sm text-red-600">{diagnosis.description}</p>
                <div className="mt-2 text-xs font-medium text-red-500">
                    Confidence: {(diagnosis.confidence * 100).toFixed(0)}%
                </div>
            </div>

            <div>
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-neutral-900">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Recommended Treatment
                </h4>
                <ul className="space-y-2 pl-2">
                    {diagnosis.treatment.map((step, index) => (
                        <li key={index} className="flex gap-2 text-sm text-neutral-600">
                            <span className="font-bold text-green-600">{index + 1}.</span>
                            {step}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-neutral-900">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Preventive Measures
                </h4>
                <ul className="space-y-2 pl-2">
                    {diagnosis.preventiveMeasures.map((step, index) => (
                        <li key={index} className="flex gap-2 text-sm text-neutral-600">
                            <span className="block h-1.5 w-1.5 translate-y-2 rounded-full bg-blue-400" />
                            {step}
                        </li>
                    ))}
                </ul>
            </div>

            <Button onClick={onReset} className="w-full" variant="outline">
                Analyze Another Plant
            </Button>
        </div>
    );
}
