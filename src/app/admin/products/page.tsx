"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Search, Package, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Product {
    id: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    mrp: number;
    image: string;
    description: string;
    in_stock: boolean;
    unit: string;
}

export default function ProductsAdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [error, setError] = useState("");

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
            setError("");
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Fetch error:", error);
                setError(`Failed to fetch products: ${error.message}`);
                return;
            }

            setProducts(data || []);
        } catch (error: any) {
            console.error("Error fetching products:", error);
            setError(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Validate required fields
            if (!formData.name || !formData.brand || !formData.price) {
                setError("Please fill in all required fields (Name, Brand, Price)");
                setLoading(false);
                return;
            }

            const productData = {
                name: formData.name,
                brand: formData.brand,
                category: formData.category,
                price: parseFloat(formData.price),
                mrp: formData.mrp ? parseFloat(formData.mrp) : parseFloat(formData.price) * 1.2,
                image: formData.image || "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=400",
                description: formData.description || "",
                in_stock: formData.inStock,
                unit: "Pack",
                rating: 4.5,
                reviews: 100,
            };

            if (editingProduct) {
                const { error } = await supabase
                    .from("products")
                    .update(productData)
                    .eq("id", editingProduct.id);

                if (error) {
                    console.error("Update error:", error);
                    setError(`Failed to update: ${error.message}`);
                    setLoading(false);
                    return;
                }
            } else {
                const { error } = await supabase
                    .from("products")
                    .insert([productData]);

                if (error) {
                    console.error("Insert error:", error);
                    setError(`Failed to add product: ${error.message}`);
                    setLoading(false);
                    return;
                }
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
            setError("");
            await fetchProducts();
        } catch (error: any) {
            console.error("Error saving product:", error);
            setError(`Unexpected error: ${error.message}`);
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
            inStock: product.in_stock,
        });
        setShowAddForm(true);
        setError("");
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            setError("");
            const { error } = await supabase
                .from("products")
                .delete()
                .eq("id", id);

            if (error) {
                console.error("Delete error:", error);
                setError(`Failed to delete: ${error.message}`);
                return;
            }

            await fetchProducts();
        } catch (error: any) {
            console.error("Error deleting product:", error);
            setError(`Error: ${error.message}`);
        }
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-neutral-50">
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-neutral-900">Product Management</h1>
                        <p className="text-sm text-neutral-500 mt-1">{products.length} total products</p>
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
                            setError("");
                        }}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                    </Button>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start justify-between">
                        <div>
                            <p className="font-medium">Error</p>
                            <p className="text-sm mt-1">{error}</p>
                        </div>
                        <button onClick={() => setError("")} className="text-red-500 hover:text-red-700">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}

                {/* Add/Edit Form */}
                {showAddForm && (
                    <Card>
                        <CardHeader>
                            <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Selling Price (₹) *</Label>
                                        <Input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            placeholder="450"
                                            required
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>MRP (₹)</Label>
                                        <Input
                                            type="number"
                                            value={formData.mrp}
                                            onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                                            placeholder="500 (optional)"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Image URL</Label>
                                    <Input
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="https://example.com/image.jpg (optional)"
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
                                    <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700" disabled={loading}>
                                        {loading ? "Saving..." : (editingProduct ? "Update Product" : "Add Product")}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setShowAddForm(false);
                                            setEditingProduct(null);
                                            setError("");
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

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

                {/* Products List */}
                {loading && !showAddForm ? (
                    <div className="text-center py-12 text-neutral-500">Loading products...</div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <Package className="h-16 w-16 text-neutral-300 mx-auto mb-3" />
                        <p className="text-neutral-500 text-lg">No products found</p>
                        <p className="text-neutral-400 text-sm mt-1">Add your first product to get started</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProducts.map((product) => (
                            <Card key={product.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex gap-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-24 w-24 rounded-lg object-cover flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-neutral-900 truncate">{product.name}</h3>
                                            <p className="text-sm text-neutral-500 truncate">{product.brand} • {product.category}</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                                                {product.mrp && product.mrp > product.price && (
                                                    <span className="text-sm text-neutral-400 line-through">₹{product.mrp}</span>
                                                )}
                                            </div>
                                            <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${product.in_stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                                {product.in_stock ? "In Stock" : "Out of Stock"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEdit(product)}
                                            className="flex-1"
                                        >
                                            <Edit className="h-3 w-3 mr-1" />
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDelete(product.id)}
                                            className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                                        >
                                            <Trash2 className="h-3 w-3 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
