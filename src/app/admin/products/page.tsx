"use client";

import React, { useState, useEffect } from "react";
import { MobileLayout } from "@/components/layout/mobile-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Search, Package } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/lib/data/products";

export default function ProductsAdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        category: "Seeds",
        price: "",
        mrp: "",
        image: "",
        description: "",
        inStock: true,
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const productData = {
                name: formData.name,
                brand: formData.brand,
                category: formData.category,
                price: parseFloat(formData.price),
                mrp: parseFloat(formData.mrp),
                image: formData.image || "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=400",
                description: formData.description,
                in_stock: formData.inStock,
                unit: "Pack", // Default unit
                rating: 4.5,
                reviews: 100,
            };

            if (editingProduct) {
                const { error } = await supabase
                    .from("products")
                    .update(productData)
                    .eq("id", editingProduct.id);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from("products")
                    .insert([productData]);

                if (error) throw error;
            }

            // Reset form
            setFormData({
                name: "",
                brand: "",
                category: "Seeds",
                price: "",
                mrp: "",
                image: "",
                description: "",
                inStock: true,
            });
            setShowAddForm(false);
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Failed to save product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            brand: product.brand,
            category: product.category,
            price: product.price.toString(),
            mrp: product.mrp.toString(),
            image: product.image,
            description: product.description || "",
            inStock: product.inStock,
        });
        setShowAddForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const { error } = await supabase
                .from("products")
                .delete()
                .eq("id", id);

            if (error) throw error;
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product.");
        }
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <MobileLayout headerTitle="Manage Products">
            <div className="p-4 space-y-4 pb-20">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900">Products</h1>
                        <p className="text-sm text-neutral-500">{products.length} total products</p>
                    </div>
                    <Button
                        onClick={() => {
                            setShowAddForm(!showAddForm);
                            setEditingProduct(null);
                            setFormData({
                                name: "",
                                brand: "",
                                category: "Seeds",
                                price: "",
                                mrp: "",
                                image: "",
                                description: "",
                                inStock: true,
                            });
                        }}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                    </Button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
                    <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Add/Edit Form */}
                {showAddForm && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Product Name *</Label>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g., Hybrid Tomato Seeds"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Brand *</Label>
                                        <Input
                                            value={formData.brand}
                                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                            placeholder="e.g., Syngenta"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Category *</Label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full rounded-md border border-neutral-200 p-2"
                                        required
                                    >
                                        <option value="Seeds">Seeds</option>
                                        <option value="Fertilizers">Fertilizers</option>
                                        <option value="Pesticides">Pesticides</option>
                                        <option value="Tools">Tools</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Price (₹) *</Label>
                                        <Input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            placeholder="450"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>MRP (₹) *</Label>
                                        <Input
                                            type="number"
                                            value={formData.mrp}
                                            onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                                            placeholder="500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Image URL</Label>
                                    <Input
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Product description..."
                                        className="w-full rounded-md border border-neutral-200 p-2 min-h-[80px]"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.inStock}
                                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                                        id="inStock"
                                    />
                                    <Label htmlFor="inStock">In Stock</Label>
                                </div>

                                <div className="flex gap-2">
                                    <Button type="submit" className="flex-1 bg-green-600" disabled={loading}>
                                        {editingProduct ? "Update Product" : "Add Product"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setShowAddForm(false);
                                            setEditingProduct(null);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Products List */}
                {loading && !showAddForm ? (
                    <div className="text-center py-8 text-neutral-500">Loading products...</div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <Package className="h-12 w-12 text-neutral-300 mx-auto mb-2" />
                        <p className="text-neutral-500">No products found</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredProducts.map((product) => (
                            <Card key={product.id}>
                                <CardContent className="p-4">
                                    <div className="flex gap-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-20 w-20 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-neutral-900">{product.name}</h3>
                                            <p className="text-sm text-neutral-500">{product.brand} • {product.category}</p>
                                            <div className="mt-1 flex items-center gap-2">
                                                <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                                                <span className="text-sm text-neutral-400 line-through">₹{product.mrp}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                                    {product.inStock ? "In Stock" : "Out of Stock"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                onClick={() => handleEdit(product)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </MobileLayout>
    );
}
