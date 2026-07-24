"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { shopCategories } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export function FeaturedCollections() {
  return (
    <section className="py-24 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-badge">Curated For You</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A2E] mt-4 font-bold">
              Explore Collections
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto mt-4">
              Discover our premium range of handcrafted floral designs, tailored perfectly for your grand occasions.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shopCategories.filter(c => c.featured).slice(0, 6).map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/collections?category=${category.slug}`} className="group block">
                <div className="relative h-80 w-full overflow-hidden rounded-3xl mb-4 bg-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity z-10 duration-500" />
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-6 left-6 z-20 pr-6">
                    <h3 className="font-serif text-2xl text-white font-semibold mb-1 group-hover:text-[#F3CBCB] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm flex items-center gap-2">
                      {category.productCount} Designs
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
