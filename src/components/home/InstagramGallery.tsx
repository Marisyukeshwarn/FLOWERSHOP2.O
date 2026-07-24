"use client";

import React from "react";
import { motion } from "framer-motion";


const images = [
  "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621841398852-c3616641e7dc?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1596484552993-9c8e1b6f0014?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616853755490-671231f8220f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop",
];

export function InstagramGallery() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="section-badge">Follow Us</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A2E] mt-4 flex items-center justify-center gap-3">
          <svg className="w-8 h-8 text-[#EB7297]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          @mahalakshmibloom
        </h2>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Join our community of over 50,000 flower lovers. Tag us in your special moments to be featured.
        </p>
      </div>

      {/* Infinite scrolling marquee effect */}
      <div className="relative flex overflow-x-hidden -mx-4 sm:mx-0">
        <div className="animate-marquee whitespace-nowrap flex gap-4 px-4 pb-8">
          {[...images, ...images].map((src, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shrink-0 group cursor-pointer shadow-sm border border-gray-100"
            >
              <img src={src} alt="Instagram Post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg className="w-10 h-10 text-white drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 2 - 1rem)); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
