"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
    onImageSelected: (file: File) => void;
}

export function ImageUpload({ onImageSelected }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            onImageSelected(file);
        }
    };

    const clearImage = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="w-full">
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            {!preview ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 py-12 text-center transition-colors hover:bg-neutral-100 active:bg-neutral-200"
                >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Upload className="h-8 w-8" />
                    </div>
                    <p className="text-sm font-medium text-neutral-900">
                        Click to Upload Photo
                    </p>
                    <p className="text-xs text-neutral-500">
                        Take a clear photo of the affected leaf
                    </p>
                </div>
            ) : (
                <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-black">
                    <img
                        src={preview}
                        alt="Uploaded plant"
                        className="h-64 w-full object-contain"
                    />
                    <button
                        onClick={clearImage}
                        className="absolute right-2 top-2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
