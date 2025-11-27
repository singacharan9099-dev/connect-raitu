import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function InventoryPage() {
    const products = [
        { id: 1, name: "Hybrid Tomato Seeds", category: "Seeds", price: 450, stock: 120, status: "In Stock" },
        { id: 2, name: "NPK 19-19-19 Fertilizer", category: "Fertilizers", price: 850, stock: 45, status: "In Stock" },
        { id: 3, name: "Neem Oil Pesticide", category: "Pesticides", price: 350, stock: 8, status: "Low Stock" },
        { id: 4, name: "Drip Irrigation Kit", category: "Equipment", price: 2500, stock: 0, status: "Out of Stock" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Inventory</h1>
                    <p className="text-neutral-500">Manage your products and stock levels.</p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <Input placeholder="Search products..." className="pl-10 bg-white" />
                </div>
                <select className="h-10 rounded-md border border-neutral-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600">
                    <option>All Categories</option>
                    <option>Seeds</option>
                    <option>Fertilizers</option>
                </select>
            </div>

            <div className="rounded-md border border-neutral-200 bg-white">
                <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-50 text-neutral-500">
                        <tr>
                            <th className="px-6 py-3 font-medium">Product Name</th>
                            <th className="px-6 py-3 font-medium">Category</th>
                            <th className="px-6 py-3 font-medium">Price</th>
                            <th className="px-6 py-3 font-medium">Stock</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-neutral-50">
                                <td className="px-6 py-4 font-medium text-neutral-900">{product.name}</td>
                                <td className="px-6 py-4 text-neutral-500">{product.category}</td>
                                <td className="px-6 py-4 text-neutral-900">₹{product.price}</td>
                                <td className="px-6 py-4 text-neutral-500">{product.stock}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${product.status === "In Stock"
                                                ? "bg-green-100 text-green-800"
                                                : product.status === "Low Stock"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {product.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-green-600 hover:text-green-700 font-medium">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
