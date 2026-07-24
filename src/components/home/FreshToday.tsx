"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timer, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { useProducts } from "@/lib/store";
import Link from "next/link";

export function FreshToday() {
  const { state: { items: products } } = useProducts();
  const freshToday = products.filter((p: any) => p.freshToday || p.isNew);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#FEF0F3] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#EB7297 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="section-badge !mb-0">Fresh Arrivals</span>
              <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm text-sm font-semibold text-[#EB7297] border border-[#EB7297]/20">
                <Timer className="w-4 h-4" />
                <span>
                  {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A2E] mt-4">
              Today's Fresh Collection
            </h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Hand-picked this morning. Our "Fresh Today" collection guarantees maximum lifespan and vibrant fragrance. Limited stock available daily.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link 
              href="/collections?filter=fresh" 
              className="inline-flex items-center gap-2 text-[#EB7297] font-semibold hover:text-[#d4607f] transition-colors group"
            >
              View all fresh items
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {freshToday.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
