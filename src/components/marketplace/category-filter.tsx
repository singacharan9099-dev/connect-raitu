import React from "react";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export function CategoryFilter({
    categories,
    selectedCategory,
    onSelectCategory,
}: CategoryFilterProps) {
    return (
        <div className="flex w-full overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-2 px-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={cn(
                            "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                            selectedCategory === category
                                ? "bg-green-600 text-white"
                                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        )}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}
