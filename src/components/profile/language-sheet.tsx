import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSheetProps {
    children: React.ReactNode;
}

const languages = [
    { code: "en", name: "English", native: "English" },
    { code: "te", name: "Telugu", native: "తెలుగు" },
    { code: "hi", name: "Hindi", native: "हिंदी" },
];

import { useLanguage } from "@/context/language-context";

export function LanguageSheet({ children }: LanguageSheetProps) {
    const [open, setOpen] = useState(false);
    const { language, setLanguage } = useLanguage();

    const handleSelect = (code: string) => {
        setLanguage(code as any);
        setOpen(false);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent side="bottom" className="h-[50vh] rounded-t-xl px-6 pt-6">
                <SheetHeader className="mb-6 text-left">
                    <SheetTitle className="text-xl font-bold">Select Language</SheetTitle>
                </SheetHeader>
                <div className="space-y-2">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleSelect(lang.code)}
                            className={cn(
                                "flex w-full items-center justify-between rounded-xl border p-4 text-left transition-colors",
                                language === lang.code
                                    ? "border-green-600 bg-green-50 text-green-900"
                                    : "border-neutral-100 bg-white text-neutral-900 hover:bg-neutral-50"
                            )}
                        >
                            <div>
                                <p className="font-medium">{lang.native}</p>
                                <p className="text-sm text-neutral-500">{lang.name}</p>
                            </div>
                            {language === lang.code && <Check className="h-5 w-5 text-green-600" />}
                        </button>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}
