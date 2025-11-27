"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MobileLayout } from "@/components/layout/mobile-layout";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sprout, ShoppingBag, Stethoscope } from "lucide-react";

const slides = [
    {
        id: 1,
        title: "Welcome to Connect Raitu",
        description: "Your one-stop solution for all agriculture needs.",
        icon: Sprout,
        color: "text-green-600",
    },
    {
        id: 2,
        title: "Buy Quality Inputs",
        description: "Get seeds, fertilizers, and tools delivered to your farm.",
        icon: ShoppingBag,
        color: "text-blue-600",
    },
    {
        id: 3,
        title: "AI Plant Doctor",
        description: "Diagnose crop diseases instantly with our AI technology.",
        icon: Stethoscope,
        color: "text-teal-600",
    },
];

export default function OnboardingPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const router = useRouter();

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            router.push("/login");
        }
    };

    return (
        <MobileLayout showBottomNav={false}>
            <div className="flex h-full flex-col justify-between p-6">
                <div className="flex flex-1 flex-col items-center justify-center space-y-8">
                    <img src="/logo.png" alt="Connect Raitu" className="h-20 w-auto mb-4" />
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className={`mb-6 rounded-full bg-neutral-100 p-8 ${slides[currentSlide].color}`}>
                                {React.createElement(slides[currentSlide].icon, { size: 64 })}
                            </div>
                            <h2 className="mb-2 text-2xl font-bold text-neutral-900">
                                {slides[currentSlide].title}
                            </h2>
                            <p className="text-neutral-500">
                                {slides[currentSlide].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Dots Indicator */}
                    <div className="flex space-x-2">
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 w-2 rounded-full transition-colors ${index === currentSlide ? "bg-green-600" : "bg-neutral-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <Button onClick={nextSlide} className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg">
                    {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </MobileLayout>
    );
}
