import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function SearchBar({
    value,
    onChange,
    placeholder = "Search...",
}: SearchBarProps) {
    return (
        <div className="relative px-4">
            <Search className="absolute left-7 top-3.5 h-5 w-5 text-neutral-400" />
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="pl-10 h-12 rounded-full border-neutral-200 shadow-sm bg-white"
            />
        </div>
    );
}
