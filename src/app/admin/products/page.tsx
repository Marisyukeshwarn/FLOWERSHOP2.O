"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Sparkles, Check, Wifi, RefreshCw, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [pulse, setPulse] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "wedding",
    price: 450,
    imageUrl: "",
    shortDescription: "",
    description: "",
    estimatedLife: "24–36 hours",
  });
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      setImageUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const categories = [
    { id: "wedding", name: "Wedding Malas" },
    { id: "reception", name: "Reception Malas" },
    { id: "entrance", name: "Entrance Malas" },
    { id: "temple", name: "Temple Garland" },
    { id: "marriage", name: "Marriage Ceremony" },
    { id: "garland", name: "Traditional Garland" },
    { id: "hair", name: "Hair Flowers" },
    { id: "bouquet", name: "Bouquets" },
    { id: "decor", name: "Floral Decor" },
  ];

  // Fetch products on mount + subscribe to SSE
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const eventSource = new EventSource('/api/events');
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPulse(true);
      setTimeout(() => setPulse(false), 800);
      if (data.type === 'ADD_PRODUCT') {
        setProducts(prev => [data.product, ...prev]);
      } else if (data.type === 'UPDATE_PRODUCT') {
        setProducts(prev => prev.map(p => p.id === data.product.id ? data.product : p));
      } else if (data.type === 'DELETE_PRODUCT') {
        setProducts(prev => prev.filter(p => p.id !== data.productId));
      }
    };

    return () => eventSource.close();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "wedding",
      price: 450,
      imageUrl: "",
      shortDescription: "",
      description: "",
      estimatedLife: "24–36 hours",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      category: product.category || "wedding",
      price: product.variants?.[0]?.price || product.price || 450,
      imageUrl: product.images?.[0] || product.image || "",
      shortDescription: product.shortDescription || "",
      description: product.description || "",
      estimatedLife: product.estimatedLife || "24–36 hours",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `product-${Date.now()}`;
    const productPayload = {
      id: editingProduct ? editingProduct.id : `prd_${Date.now()}`,
      name: formData.name,
      category: formData.category,
      subcategory: "Standard",
      flowers: editingProduct?.flowers || ["Rose", "Jasmine"],
      occasion: editingProduct?.occasion || ["Wedding", "Special Event"],
      images: [formData.imageUrl || "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop"],
      slug,
      description: formData.description,
      shortDescription: formData.shortDescription,
      variants: [{ size: "Standard", price: Number(formData.price), stock: 20 }],
      rating: editingProduct?.rating || 4.9,
      reviewCount: editingProduct?.reviewCount || 0,
      isNew: true,
      freshToday: true,
      estimatedLife: formData.estimatedLife,
      tags: [formData.category, "fresh"],
      badge: "New",
    };

    try {
      if (editingProduct) {
        await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productPayload),
        });
        // SSE will update state automatically
      } else {
        await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productPayload),
        });
        // SSE will update state automatically
      }
    } catch (err) {
      console.error(err);
    }

    setSaving(false);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product? This will instantly remove it from the storefront.")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    // SSE will update state automatically
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1A1A2E] flex items-center gap-2">
            Product Catalog <Sparkles className="w-5 h-5 text-[#EB7297]" />
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm text-gray-500">Changes sync to the storefront in real-time.</p>
            <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-300 ${
              pulse ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
            }`}>
              <Wifi className="w-3 h-3" />
              {pulse ? 'Synced!' : 'Live'}
            </span>
          </div>
        </div>
        <Button onClick={handleOpenAddModal} className="gap-2 shadow-lg shadow-[#EB7297]/20">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600">Image</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Name</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Category</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Price</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">Loading products...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    No products found. Click "Add Product" to create your first item.
                  </td>
                </tr>
              ) : (
                products.map((product: any) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      {product.images?.[0] || product.image ? (
                        <img
                          src={product.images?.[0] || product.image}
                          alt={product.name}
                          className="w-14 h-14 rounded-xl object-cover border border-gray-100 shadow-sm"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-400 truncate max-w-xs">{product.shortDescription}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#FEF0F3] text-[#EB7297] capitalize">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ₹{product.variants?.[0]?.price || product.price || 0}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEditModal(product)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-[#EB7297] hover:bg-[#FEF0F3] rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs text-gray-400">
          <span>{products.length} products in catalog</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Real-time sync active — changes appear on storefront instantly
          </span>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <h2 className="text-xl font-serif font-bold text-gray-900">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Royal Rose & Jasmine Garland"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#EB7297] focus:border-transparent text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#EB7297] focus:border-transparent text-sm bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Starting Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#EB7297] focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Product Image
                </label>
                {/* File Upload Area */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative cursor-pointer group border-2 border-dashed border-gray-200 hover:border-[#EB7297] rounded-xl p-4 transition-colors bg-gray-50 hover:bg-[#FEF0F3]/30 flex flex-col items-center justify-center gap-2 min-h-[100px]"
                >
                  {imageUploading ? (
                    <RefreshCw className="w-6 h-6 animate-spin text-[#EB7297]" />
                  ) : formData.imageUrl ? (
                    <>
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-24 h-24 rounded-xl object-cover shadow-md"
                      />
                      <span className="text-xs text-[#EB7297] font-medium group-hover:underline">
                        Click to change image
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-7 h-7 text-gray-400 group-hover:text-[#EB7297] transition-colors" />
                      <p className="text-sm font-medium text-gray-600">Click to upload image</p>
                      <p className="text-xs text-gray-400">PNG, JPG, WEBP, GIF — any format</p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageFileChange}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief 1-line highlights"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#EB7297] focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Full Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of flowers, craftsmanship..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#EB7297] focus:border-transparent text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving} className="gap-2 shadow-lg shadow-[#EB7297]/20">
                  {saving ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  {saving ? 'Syncing...' : (editingProduct ? "Save Changes" : "Add Product")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
