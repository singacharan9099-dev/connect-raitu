"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type UserRole = "FARMER" | "RETAILER" | "ADMIN";

interface User {
    id: string;
    name: string;
    phone: string;
    role: UserRole;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    loginWithGoogle: () => Promise<void>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [authPhone, setAuthPhone] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                // Fetch profile or default
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                setUser({
                    id: session.user.id,
                    name: profile?.full_name || "Farmer",
                    phone: session.user.phone || "",
                    role: profile?.role || "FARMER",
                });
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin,
                },
            });
            if (error) throw error;
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    const logout = async () => {
        try {
            await supabase.auth.signOut();
            router.push("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const updateProfile = async (data: Partial<User>) => {
        if (!user) return false;
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: data.name,
                    phone: data.phone,
                    role: data.role
                })
                .eq('id', user.id);

            if (error) throw error;

            setUser(prev => prev ? { ...prev, ...data } : null);
            return true;
        } catch (error) {
            console.error("Error updating profile:", error);
            return false;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                loginWithGoogle,
                logout,
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}


