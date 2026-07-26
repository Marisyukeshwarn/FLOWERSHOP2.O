"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/Button';

export default function WeddingPage() {
  const weddingProducts = products.filter(p => p.category === 'wedding');

  return (
    <div className="min-h-screen bg-ivory">
      {/* Specialty Hero */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-foreground/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop"
          alt="Wedding Malas"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
          <motion.h1 
            className="font-serif text-5xl md:text-7xl text-ivory mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Wedding Malas
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-ivory/90 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Elegant, handcrafted floral designs for your most special day.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">The Perfect Garland for the Perfect Moment</h2>
            <p className="text-foreground/70 font-light leading-relaxed mb-6">
              Our wedding malas are crafted with the freshest blooms, intricately woven with traditional patterns and modern elegance. From the classic red rose and jasmine combination to exotic orchids and tuberoses, we ensure your garlands perfectly match your wedding theme.
            </p>
            <p className="text-foreground/70 font-light leading-relaxed">
              Each piece is fully customizable in length, thickness, and accents to provide the ultimate luxury floral experience.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1621841398852-c3616641e7dc?q=80&w=800&auto=format&fit=crop" className="rounded-2xl h-64 w-full object-cover" alt="Wedding Detail 1" />
            <img src="https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=800&auto=format&fit=crop" className="rounded-2xl h-64 w-full object-cover mt-8" alt="Wedding Detail 2" />
          </div>
        </div>

        <h3 className="font-serif text-3xl text-foreground mb-10 text-center">Featured Wedding Designs</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {weddingProducts.map((product, index) => (
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
          <h3 className="font-serif text-2xl text-foreground mb-4">Have a custom design in mind?</h3>
          <p className="text-foreground/70 mb-8 max-w-xl mx-auto font-light">
            We specialize in bringing your unique floral vision to life. Contact our design team to discuss your bespoke wedding requirements.
          </p>
          <Link href="/contact">
            <Button size="lg">Consult Our Team</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
