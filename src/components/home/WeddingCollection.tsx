"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function WeddingCollection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] overflow-hidden group"
        >
          {/* Banner Image */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop"
              alt="Premium Wedding Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>

          <div className="relative z-10 px-8 py-20 md:p-24 md:w-2/3 lg:w-1/2 flex flex-col items-start text-white">
            <span className="badge-pink mb-6">Premium Collection</span>
            
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Royal Wedding <br /> Collection
            </h2>
            
            <p className="text-gray-200 text-lg mb-10 max-w-md font-light leading-relaxed">
              Elevate your special day with our luxurious, handcrafted garlands featuring exotic orchids, premium roses, and divine lotus.
            </p>
            
            <Link 
              href="/wedding"
              className="group/btn inline-flex items-center gap-3 bg-white text-[#EB7297] px-8 py-4 rounded-full font-semibold hover:bg-[#FEF0F3] transition-colors shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            >
              Explore the Collection
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
