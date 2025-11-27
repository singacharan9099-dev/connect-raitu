import React from "react";
import { ChevronRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface ProfileMenuItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
    onClick?: () => void;
    isDestructive?: boolean;
}

export const ProfileMenuItem = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ProfileMenuItemProps>(
    ({ icon: Icon, label, href, onClick, isDestructive = false, ...props }, ref) => {
        const content = (
            <div
                className={`flex items-center justify-between p-4 transition-colors hover:bg-neutral-50 ${isDestructive ? "text-red-600" : "text-neutral-900"
                    }`}
            >
                <div className="flex items-center gap-3">
                    <Icon
                        className={`h-5 w-5 ${isDestructive ? "text-red-600" : "text-neutral-500"
                            }`}
                    />
                    <span className="font-medium">{label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-neutral-300" />
            </div>
        );

        if (onClick) {
            return (
                <button
                    ref={ref as React.Ref<HTMLButtonElement>}
                    className="w-full text-left"
                    onClick={onClick}
                    {...props}
                >
                    {content}
                </button>
            );
        }

        return (
            <Link
                href={href}
                className="block"
                ref={ref as React.Ref<HTMLAnchorElement>}
                {...props}
            >
                {content}
            </Link>
        );
    }
);

ProfileMenuItem.displayName = "ProfileMenuItem";
