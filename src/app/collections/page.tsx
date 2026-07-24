"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Filter, X, Grid, List, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { allCategories, allFlowers, allOccasions, Product } from "@/lib/data";
import { useProducts } from "@/lib/store";

function CollectionsContent() {
  const { state: { items: products } } = useProducts();
  const searchParams = useSearchParams();
  const initCategory = searchParams.get("category") || "all";
  const initSearch = searchParams.get("search") || "";
  const initEvent = searchParams.get("event") || "all";
  const initFilter = searchParams.get("filter") || ""; // e.g. "fresh"

  const [activeCategory, setActiveCategory] = useState<string>(initCategory);
  const [activeFlower, setActiveFlower] = useState<string>("all");
  const [activeOccasion, setActiveOccasion] = useState<string>(initEvent);
  const [searchQuery, setSearchQuery] = useState(initSearch);
  const [isFresh, setIsFresh] = useState(initFilter === "fresh");
  const [isPremium, setIsPremium] = useState(false);
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Sync state with URL if it changes externally
  useEffect(() => {
    if (searchParams.get("category")) setActiveCategory(searchParams.get("category")!);
    if (searchParams.get("search")) setSearchQuery(searchParams.get("search")!);
    if (searchParams.get("event")) setActiveOccasion(searchParams.get("event")!);
    if (searchParams.get("filter") === "fresh") setIsFresh(true);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (activeFlower !== "all") {
      result = result.filter((p) => {
        if (activeFlower && !p.flowers.includes(activeFlower)) return false;
        return true;
      });
    }
    if (activeOccasion !== "all") {
      result = result.filter((p: Product) => p.occasion?.some((o: string) => o.toLowerCase().replace(" ", "-") === activeOccasion.toLowerCase().replace(" ", "-")));
    }
    if (isFresh) {
      result = result.filter((p) => p.freshToday);
    }
    if (isPremium) {
      result = result.filter((p) => p.isPremium);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p: Product) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.flowers?.some((f: string) => f.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.variants[0].price - a.variants[0].price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // featured / default
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [activeCategory, activeFlower, activeOccasion, isFresh, isPremium, searchQuery, sortBy]);

  const clearFilters = () => {
    setActiveCategory("all");
    setActiveFlower("all");
    setActiveOccasion("all");
    setSearchQuery("");
    setIsFresh(false);
    setIsPremium(false);
  };

  const hasActiveFilters =
    activeCategory !== "all" ||
    activeFlower !== "all" ||
    activeOccasion !== "all" ||
    isFresh ||
    isPremium ||
    searchQuery !== "";

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-[#FEF0F3] py-20 px-4 text-center border-b border-[#F3CBCB]/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/40" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A2E] font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {activeCategory !== "all"
              ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Collection`
              : "All Collections"}
          </motion.h1>
          <motion.p
            className="text-gray-600 text-lg md:text-xl font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Explore our premium range of custom floral designs. Select a design to customize it for your special occasion.
          </motion.p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <span className="text-[#1A1A2E] font-semibold">{filteredProducts.length} Designs</span>
          <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
        </div>

        {/* Filters Sidebar */}
        <motion.aside
          className={`w-full md:w-72 shrink-0 ${isFilterOpen ? "block" : "hidden md:block"}`}
          initial={false}
          animate={{ height: isFilterOpen || (typeof window !== "undefined" && window.innerWidth >= 768) ? "auto" : 0, opacity: 1 }}
        >
          <div className="sticky top-28 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-8">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h2 className="font-serif text-xl font-bold text-[#1A1A2E] flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#EB7297]" /> Filters
              </h2>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-xs text-[#EB7297] font-semibold uppercase tracking-wider hover:underline">
                  Clear All
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Filters</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isFresh}
                    onChange={(e) => setIsFresh(e.target.checked)}
                    className="w-4 h-4 text-[#EB7297] border-gray-300 rounded focus:ring-[#EB7297]"
                  />
                  <span className="text-gray-600 group-hover:text-[#EB7297] text-sm transition-colors">Fresh Today</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isPremium}
                    onChange={(e) => setIsPremium(e.target.checked)}
                    className="w-4 h-4 text-[#EB7297] border-gray-300 rounded focus:ring-[#EB7297]"
                  />
                  <span className="text-gray-600 group-hover:text-[#EB7297] text-sm transition-colors">Premium Only</span>
                </label>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Category</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    checked={activeCategory === "all"}
                    onChange={() => setActiveCategory("all")}
                    className="w-4 h-4 text-[#EB7297] border-gray-300 focus:ring-[#EB7297]"
                  />
                  <span className="text-gray-600 group-hover:text-[#EB7297] text-sm transition-colors">All Categories</span>
                </label>
                {allCategories.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      checked={activeCategory === cat}
                      onChange={() => setActiveCategory(cat)}
                      className="w-4 h-4 text-[#EB7297] border-gray-300 focus:ring-[#EB7297]"
                    />
                    <span className="text-gray-600 group-hover:text-[#EB7297] text-sm capitalize transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Flower Filter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Primary Flower</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="flower"
                    checked={activeFlower === "all"}
                    onChange={() => setActiveFlower("all")}
                    className="w-4 h-4 text-[#EB7297] border-gray-300 focus:ring-[#EB7297]"
                  />
                  <span className="text-gray-600 group-hover:text-[#EB7297] text-sm transition-colors">All Flowers</span>
                </label>
                {allFlowers.map((flower) => (
                  <label key={flower} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="flower"
                      checked={activeFlower === flower}
                      onChange={() => setActiveFlower(flower)}
                      className="w-4 h-4 text-[#EB7297] border-gray-300 focus:ring-[#EB7297]"
                    />
                    <span className="text-gray-600 group-hover:text-[#EB7297] text-sm capitalize transition-colors">{flower}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Occasion Filter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Occasion</h3>
              <select 
                value={activeOccasion} 
                onChange={(e) => setActiveOccasion(e.target.value)}
                className="input-field w-full"
              >
                <option value="all">All Occasions</option>
                {allOccasions.map((occ) => (
                  <option key={occ} value={occ.toLowerCase().replace(" ", "-")}>{occ}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.aside>

        {/* Product Grid Area */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="hidden md:flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-[#1A1A2E] font-medium">Showing {filteredProducts.length} floral designs</span>
            
            <div className="flex items-center gap-6">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm font-medium text-[#1A1A2E] bg-transparent border-none focus:ring-0 cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-white shadow-sm text-[#EB7297]" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-white shadow-sm text-[#EB7297]" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Search indicator */}
          {searchQuery && (
            <div className="mb-6 bg-white p-4 rounded-xl border border-[#EB7297]/20 flex items-center justify-between">
              <span className="text-gray-700">Search results for <strong className="text-[#EB7297]">"{searchQuery}"</strong></span>
              <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-[#EB7297]">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-24 h-24 bg-[#FEF0F3] rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="w-10 h-10 text-[#EB7297]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1A1A2E] mb-2">No designs found</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8">
                We couldn't find any malas matching your current filters. Try adjusting them or clear all filters to see our full collection.
              </p>
              <Button onClick={clearFilters} size="lg">Clear All Filters</Button>
            </div>
          ) : (
            <motion.div 
              className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6" 
                : "flex flex-col gap-6"
              }
              layout
            >
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={index} 
                    className={viewMode === "list" ? "w-full md:flex-row h-auto" : ""}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#FEF0F3] border-t-[#EB7297] rounded-full animate-spin" /></div>}>
      <CollectionsContent />
    </Suspense>
  );
}
