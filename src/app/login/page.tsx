"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MobileLayout } from "@/components/layout/mobile-layout";
import { useAuth } from "@/context/auth-context";

import { useLanguage } from "@/context/language-context";

export default function LoginPage() {
    const { loginWithGoogle, isLoading } = useAuth();
    const { t } = useLanguage();

    return (
        <MobileLayout showBottomNav={false} headerTitle={t("login.title")}>
            <div className="flex h-full flex-col p-6 items-center justify-center">
                <div className="mb-12 flex flex-col items-center text-center">
                    <img src="/logo.png" alt="Connect Raitu" className="h-32 w-auto mb-6" />
                    <h1 className="text-2xl font-bold text-neutral-900">{t("onboard.welcome")}</h1>
                    <p className="mt-2 text-neutral-500">
                        {t("onboard.desc")}
                    </p>
                </div>

                <Button
                    onClick={() => loginWithGoogle()}
                    className="w-full max-w-sm bg-white text-neutral-900 border border-neutral-200 h-14 text-lg hover:bg-neutral-50 flex items-center justify-center gap-3"
                    disabled={isLoading}
                >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-6 w-6" />
                    {t("login.googleSignIn")}
                </Button>
            </div>
        </MobileLayout>
    );
}
