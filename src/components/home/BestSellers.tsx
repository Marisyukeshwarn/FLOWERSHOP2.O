"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { useProducts } from "@/lib/store";

export function BestSellers() {
  const { state: { items: products } } = useProducts();
  const bestSellers = products.filter((p: any) => p.isBestSeller || p.isNew);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden relative" ref={ref}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FEF0F3] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">Most Loved</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A2E] mt-4">
              Our Best Sellers
            </h2>
            <p className="text-gray-500 mt-4 max-w-lg">
              Discover the floral designs most loved by our customers. Handcrafted with devotion and the freshest blooms.
            </p>
          </motion.div>

          {/* Carousel Controls */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-3"
          >
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#EB7297] hover:border-[#EB7297] hover:bg-[#FEF0F3] transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#EB7297] hover:border-[#EB7297] hover:bg-[#FEF0F3] transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative -mx-4 sm:mx-0">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-12 pt-4 px-4 sm:px-0 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {bestSellers.map((product, index) => (
              <div key={product.id} className="min-w-[300px] md:min-w-[350px] snap-start">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
