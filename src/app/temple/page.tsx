"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/Button';

export default function TemplePage() {
  const templeProducts = products.filter(p => p.category === 'temple');

  return (
    <div className="min-h-screen bg-ivory">
      {/* Specialty Hero */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-foreground/50 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1596484552993-9c8e1b6f0014?q=80&w=2000&auto=format&fit=crop"
          alt="Temple Garlands"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
          <motion.h1 
            className="font-serif text-5xl md:text-7xl text-ivory mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Temple Garlands
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-ivory/90 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Sacred floral offerings crafted with devotion and purity.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Devotion in Every Petal</h2>
          <p className="text-foreground/70 font-light leading-relaxed">
            Our temple garlands are prepared with the utmost respect and purity. Using traditional flowers like Lotus, Tulsi, Marigold, and Jasmine, we create sacred arrangements perfect for deity offerings, pujas, and temple ceremonies. We ensure complete purity in our crafting process.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {templeProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={`/product/${product.slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-sage/10 hover:shadow-md transition-all">
                <div className="relative h-72 overflow-hidden">
                  <div className="absolute inset-0 bg-foreground/5 group-hover:bg-transparent transition-colors z-10 duration-500" />
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-sage transition-colors">{product.name}</h3>
                  <div className="pt-4 border-t border-sage/10 mt-4">
                    <p className="text-xs text-foreground/60 mb-1">For Price Details</p>
                    <p className="text-sm font-medium text-foreground">Contact Us</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center bg-cream p-12 rounded-3xl border border-sage/10">
          <h3 className="font-serif text-2xl text-foreground mb-4">Bulk Temple Orders</h3>
          <p className="text-foreground/70 mb-8 max-w-xl mx-auto font-light">
            We accept regular bulk orders for daily temple rituals and special festival requirements.
          </p>
          <Link href="/contact">
            <Button size="lg">Contact for Bulk Orders</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
