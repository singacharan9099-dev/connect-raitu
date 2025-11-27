"use client";

import React, { useState } from "react";
import { MobileLayout } from "@/components/layout/mobile-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, MapPin, Trash2 } from "lucide-react";

interface Address {
    id: string;
    type: "Home" | "Farm" | "Other";
    line1: string;
    line2?: string;
    city: string;
    pincode: string;
}

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: "1",
            type: "Home",
            line1: "123 Village Road",
            city: "Guntur",
            pincode: "522001",
        },
    ]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newAddress, setNewAddress] = useState<Partial<Address>>({ type: "Home" });

    const handleAddAddress = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newAddress.line1 || !newAddress.city || !newAddress.pincode) return;

        const address: Address = {
            id: Date.now().toString(),
            type: newAddress.type as "Home" | "Farm" | "Other",
            line1: newAddress.line1,
            line2: newAddress.line2,
            city: newAddress.city,
            pincode: newAddress.pincode,
        };

        setAddresses([...addresses, address]);
        setShowAddForm(false);
        setNewAddress({ type: "Home" });
    };

    const handleDelete = (id: string) => {
        setAddresses(addresses.filter((a) => a.id !== id));
    };

    return (
        <MobileLayout headerTitle="My Addresses">
            <div className="p-4 space-y-4 pb-20">
                {addresses.map((addr) => (
                    <div
                        key={addr.id}
                        className="flex items-start justify-between rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
                    >
                        <div className="flex gap-3">
                            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                                <MapPin className="h-4 w-4" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-neutral-900">{addr.type}</h3>
                                <p className="text-sm text-neutral-500">{addr.line1}</p>
                                {addr.line2 && <p className="text-sm text-neutral-500">{addr.line2}</p>}
                                <p className="text-sm text-neutral-500">
                                    {addr.city}, {addr.pincode}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(addr.id)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                ))}

                {showAddForm ? (
                    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                        <h3 className="mb-4 font-semibold">Add New Address</h3>
                        <form onSubmit={handleAddAddress} className="space-y-4">
                            <div>
                                <Label>Address Type</Label>
                                <select
                                    className="w-full rounded-lg border p-2"
                                    value={newAddress.type}
                                    onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value as any })}
                                >
                                    <option value="Home">Home</option>
                                    <option value="Farm">Farm</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <Label>Address Line 1</Label>
                                <Input
                                    value={newAddress.line1 || ""}
                                    onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                                    placeholder="House/Farm No, Street"
                                    required
                                />
                            </div>
                            <div>
                                <Label>City/Village</Label>
                                <Input
                                    value={newAddress.city || ""}
                                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                    placeholder="City or Village"
                                    required
                                />
                            </div>
                            <div>
                                <Label>Pincode</Label>
                                <Input
                                    value={newAddress.pincode || ""}
                                    onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                    placeholder="522xxx"
                                    maxLength={6}
                                    required
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowAddForm(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1 bg-green-600">
                                    Save Address
                                </Button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <Button
                        onClick={() => setShowAddForm(true)}
                        className="w-full bg-white text-green-600 border border-green-600 hover:bg-green-50"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add New Address
                    </Button>
                )}
            </div>
        </MobileLayout>
    );
}
