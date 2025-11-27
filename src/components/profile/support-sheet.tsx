import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Phone, Mail, MessageCircle } from "lucide-react";

import { useLanguage } from "@/context/language-context";

interface SupportSheetProps {
    children: React.ReactNode;
}

export function SupportSheet({ children }: SupportSheetProps) {
    const { t } = useLanguage();
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent side="bottom" className="h-[60vh] rounded-t-xl px-6 pt-6">
                <SheetHeader className="mb-6 text-left">
                    <SheetTitle className="text-xl font-bold">{t("support.title")}</SheetTitle>
                </SheetHeader>
                <div className="space-y-4">
                    <div className="rounded-xl bg-green-50 p-4">
                        <h3 className="font-semibold text-green-900">{t("support.need Help")}</h3>
                        <p className="mt-1 text-sm text-green-700">
                            {t("support.availability")}
                        </p>
                    </div>

                    <a
                        href="tel:+919999999999"
                        className="flex items-center gap-4 rounded-xl border border-neutral-100 p-4 hover:bg-neutral-50"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <Phone className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-medium text-neutral-900">{t("support.callUs")}</p>
                            <p className="text-sm text-neutral-500">+91 99999 99999</p>
                        </div>
                    </a>

                    <a
                        href="mailto:support@connectraitu.com"
                        className="flex items-center gap-4 rounded-xl border border-neutral-100 p-4 hover:bg-neutral-50"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                            <Mail className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-medium text-neutral-900">{t("support.emailSupport")}</p>
                            <p className="text-sm text-neutral-500">support@connectraitu.com</p>
                        </div>
                    </a>

                    <a
                        href="#"
                        className="flex items-center gap-4 rounded-xl border border-neutral-100 p-4 hover:bg-neutral-50"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <MessageCircle className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-medium text-neutral-900">{t("support.whatsapp")}</p>
                            <p className="text-sm text-neutral-500">{t("support.chatWithUs")}</p>
                        </div>
                    </a>
                </div>
            </SheetContent>
        </Sheet>
    );
}
