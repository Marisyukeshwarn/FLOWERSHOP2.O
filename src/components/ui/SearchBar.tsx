"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { products } from "@/lib/data";
import Link from "next/link";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const results = query.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.flowers.some((f) => f.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/collections?search=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex flex-col pt-24 items-center px-4"
        >
          {/* Background click to close */}
          <div className="absolute inset-0 z-0" onClick={onClose} />

          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-sage-100"
          >
            <form onSubmit={handleSearch} className="relative flex items-center">
              <Search className="absolute left-6 w-6 h-6 text-[#EB7297]" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for malas, flowers, occasions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-20 pl-16 pr-16 bg-transparent text-xl font-medium text-[#1A1A2E] placeholder-gray-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-6 p-2 text-gray-400 hover:text-[#EB7297] hover:bg-[#FEF0F3] rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </form>

            {/* Results Dropdown */}
            {query.trim() && (
              <div className="border-t border-gray-100 bg-gray-50/50 max-h-[60vh] overflow-y-auto">
                {results.length > 0 ? (
                  <div className="p-4 flex flex-col gap-2">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-3 hover:bg-white rounded-2xl transition-colors group"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 rounded-xl object-cover shadow-sm"
                        />
                        <div className="flex-1">
                          <h4 className="font-serif font-semibold text-[#1A1A2E] group-hover:text-[#EB7297] transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-xs text-[#93A186] capitalize">{product.category} Mala</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#EB7297] transition-colors" />
                      </Link>
                    ))}
                    <button
                      onClick={handleSearch}
                      className="mt-2 text-sm font-semibold text-[#EB7297] text-center p-3 hover:bg-[#FEF0F3] rounded-xl transition-colors"
                    >
                      View all results for "{query}"
                    </button>
                  </div>
                ) : (
                  <div className="p-10 text-center text-gray-500">
                    <p className="mb-2">No results found for "{query}"</p>
                    <p className="text-sm">Try searching for "rose", "wedding", or "entrance"</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
