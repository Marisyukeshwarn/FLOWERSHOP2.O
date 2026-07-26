"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { products } from '@/lib/data';

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="bg-cream py-20 px-4 sm:px-6 lg:px-8 text-center border-b border-sage/10">
        <motion.h1 
          className="font-serif text-4xl md:text-5xl text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Gallery
        </motion.h1>
        <motion.p 
          className="text-foreground/70 max-w-2xl mx-auto font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A visual journey through our most cherished floral creations.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="break-inside-avoid overflow-hidden rounded-2xl relative group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            >
              <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col justify-end p-6 duration-300">
                <p className="text-white font-serif text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{product.name}</p>
                <p className="text-sage text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 capitalize">{product.category}</p>
              </div>
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}
          
          {/* Add a few extra decorative images for the masonry effect */}
          <motion.div
              className="break-inside-avoid overflow-hidden rounded-2xl relative group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
            <img src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop" className="w-full h-auto" alt="Floral Decoration" />
          </motion.div>

          <motion.div
              className="break-inside-avoid overflow-hidden rounded-2xl relative group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
            <img src="https://images.unsplash.com/photo-1621841398852-c3616641e7dc?q=80&w=800&auto=format&fit=crop" className="w-full h-auto" alt="Marigold Detail" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
