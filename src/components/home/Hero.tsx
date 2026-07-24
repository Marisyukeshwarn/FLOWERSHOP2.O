"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Search } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/60 via-[#1A1A2E]/30 to-[#1A1A2E]/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2000&auto=format&fit=crop"
          alt="Premium Floral Background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="badge-outline bg-white/10 border-white/20 text-white mb-6">
            Premium Floral Design Studio
          </span>
        </motion.div>

        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 font-bold leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Crafting Beautiful <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F3A6B0] to-[#EB7297]">
            Floral Moments
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/90 mb-10 font-light max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Premium Wedding Malas, Temple Garlands & Custom Floral Designs for Every Occasion. Delivered fresh in Coimbatore.
        </motion.p>

        <motion.div
          className="w-full max-w-xl mx-auto mb-8 bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-2 flex items-center shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="flex-1 flex items-center px-4">
            <Search className="w-5 h-5 text-white/70 mr-3" />
            <input 
              type="text" 
              placeholder="Search for rose garlands, orchids..." 
              className="w-full bg-transparent text-white placeholder-white/70 focus:outline-none"
              onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))} // Mock trigger for actual search bar if we wanted
            />
          </div>
          <Link href="/collections">
            <Button className="h-12 px-8 rounded-full shadow-lg">Shop Now</Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Link href="/shop/customize" className="text-white hover:text-[#F3A6B0] text-sm font-medium underline underline-offset-4 transition-colors">
            Or build your own custom mala
          </Link>
        </motion.div>
      </div>

      {/* Floating flower petals */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
         {[...Array(6)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute text-2xl drop-shadow-lg"
             initial={{ top: "-10%", left: `${Math.random() * 100}%`, rotate: 0, opacity: 0 }}
             animate={{ 
               top: "110%", 
               left: `${Math.random() * 100}%`,
               rotate: 360,
               opacity: [0, 1, 1, 0]
             }}
             transition={{ 
               duration: Math.random() * 10 + 10, 
               repeat: Infinity, 
               delay: Math.random() * 5,
               ease: "linear" 
             }}
           >
             {["🌸", "🌺", "🌹"][i % 3]}
           </motion.div>
         ))}
      </div>
    </section>
  );
}
