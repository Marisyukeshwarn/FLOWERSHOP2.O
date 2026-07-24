"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { eventOccasions } from "@/lib/data";

export function EventCategories() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="section-badge">Shop by Event</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A2E] mt-4">
            Floral Magic for Every Occasion
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {eventOccasions.map((occasion, index) => (
            <motion.div
              key={occasion.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                href={`/collections?event=${occasion.slug}`}
                className="group flex flex-col items-center p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-[0_12px_40px_rgba(235,114,151,0.12)] hover:border-[#EB7297]/30 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#FEF0F3] group-hover:bg-gradient-to-br group-hover:from-[#EB7297] group-hover:to-[#F3A6B0] flex items-center justify-center text-3xl mb-4 transition-colors duration-300">
                  <span className="group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">{occasion.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-800 text-center group-hover:text-[#EB7297] transition-colors">
                  {occasion.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
