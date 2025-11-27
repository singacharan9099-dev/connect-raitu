import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth-context";
import { Loader2 } from "lucide-react";

import { useLanguage } from "@/context/language-context";

interface EditProfileSheetProps {
    children: React.ReactNode;
}

export function EditProfileSheet({ children }: EditProfileSheetProps) {
    const { user, updateProfile } = useAuth();
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [phone, setPhone] = useState(user?.phone || "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const success = await updateProfile({ name, phone });
        setLoading(false);
        if (success) {
            setOpen(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent side="bottom" className="h-[90vh] rounded-t-xl px-6 pt-6">
                <SheetHeader className="mb-6 text-left">
                    <SheetTitle className="text-xl font-bold">{t("profile.editProfile")}</SheetTitle>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">{t("profile.fullName")}</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t("profile.fullName")}
                            className="h-12 text-lg"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">{t("profile.phoneNumber")}</Label>
                        <Input
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={t("profile.phoneNumber")}
                            className="h-12 text-lg"
                        />
                    </div>
                    <Button type="submit" className="w-full h-12 text-lg bg-green-600" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                        {t("profile.saveChanges")}
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}
