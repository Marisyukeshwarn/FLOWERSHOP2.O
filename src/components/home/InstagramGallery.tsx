"use client";

import React from "react";
import { motion } from "framer-motion";
import { useProducts } from "@/lib/store";
import { ImageIcon } from "lucide-react";

export function InstagramGallery() {
  const { state: { items: products } } = useProducts();

  // Collect all product images dynamically
  const galleryImages = products
    .flatMap(p => p.images || [])
    .filter(Boolean)
    .slice(0, 12); // Max 12 images

  const hasImages = galleryImages.length > 0;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="section-badge">Our Gallery</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A2E] mt-4 flex items-center justify-center gap-3">
          <svg className="w-8 h-8 text-[#EB7297]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          @mahalakshmibloom
        </h2>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          {hasImages
            ? "Browse our latest handcrafted floral designs. Add products from the admin panel to feature them here."
            : "Add products from the admin panel to showcase your floral designs here."}
        </p>
      </div>

      {hasImages ? (
        /* Infinite scrolling marquee effect with real product images */
        <div className="relative flex overflow-x-hidden -mx-4 sm:mx-0">
          <div className="animate-marquee whitespace-nowrap flex gap-4 px-4 pb-8">
            {[...galleryImages, ...galleryImages].map((src, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shrink-0 group cursor-pointer shadow-sm border border-gray-100"
              >
                <img src={src} alt="Product" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty state — shown when no products have been added yet */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-64 h-64 md:w-72 md:h-72 rounded-2xl bg-gradient-to-br from-[#FEF0F3] to-[#eef4ea] border-2 border-dashed border-[#EB7297]/20 flex flex-col items-center justify-center gap-3"
              >
                <ImageIcon className="w-10 h-10 text-[#EB7297]/30" />
                <p className="text-xs text-[#EB7297]/50 font-medium text-center px-4">
                  Add products from admin to show here
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 2 - 1rem)); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
