"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { StarRating } from "@/components/ui/StarRating";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-[#FEF0F3] relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#EB7297]/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge bg-white">Client Stories</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A2E] mt-4">
              Loved by Thousands
            </h2>
          </motion.div>
        </div>

        {/* Auto-scroll track */}
        <div className="relative flex overflow-x-hidden -mx-4 sm:mx-0 py-4">
          <div className="animate-marquee-slow whitespace-nowrap flex gap-6 px-4">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="w-[350px] md:w-[450px] shrink-0 bg-white p-8 rounded-3xl shadow-sm border border-[#EB7297]/10 hover:shadow-xl transition-all whitespace-normal"
              >
                <StarRating rating={testimonial.rating} size="sm" className="mb-6" />
                <p className="text-[#1A1A2E]/80 text-base md:text-lg mb-8 font-light italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-[#1A1A2E]">{testimonial.name}</h4>
                    <p className="text-sm text-[#93A186]">{testimonial.event} • {testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 2 - 1.5rem)); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 40s linear infinite;
        }
        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
