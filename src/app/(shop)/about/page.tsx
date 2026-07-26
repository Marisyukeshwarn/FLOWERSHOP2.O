"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-[600px] w-full rounded-3xl overflow-hidden border border-sage/10 shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop"
                alt="About Mahalakshmi Bloom Studio"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-foreground/80 font-light leading-relaxed"
          >
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-8">About Mahalakshmi</h1>
            
            <p>
              Welcome to MAHALAKSHMI Bloom Studio, where we transform nature's most beautiful creations into unforgettable memories. Founded with a deep passion for floral artistry and a reverence for traditional craftsmanship, our studio is dedicated to elevating the aesthetics of your most cherished moments.
            </p>
            
            <p>
              Specializing in premium wedding malas and temple garlands, we understand that flowers are more than just decoration—they are expressions of love, devotion, and celebration. Every petal is carefully selected, and every garland is intricately woven by our skilled artisans who carry forward generations of floral design heritage.
            </p>
            
            <div className="pt-6 border-t border-sage/20 mt-6">
              <h3 className="font-serif text-2xl text-foreground mb-4">Our Promise</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage mr-3 mt-2" />
                  <span><strong>Premium Quality:</strong> Sourcing only the freshest, most vibrant blooms from select gardens.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage mr-3 mt-2" />
                  <span><strong>Bespoke Customization:</strong> Every design is tailored to perfectly match your vision and theme.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage mr-3 mt-2" />
                  <span><strong>Devotion in Craft:</strong> Ensuring absolute purity and respect for our temple offerings.</span>
                </li>
              </ul>
            </div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}
