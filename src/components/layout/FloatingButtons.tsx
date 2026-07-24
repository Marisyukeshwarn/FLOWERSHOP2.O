"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { MessageCircle, ArrowUp } from "lucide-react";

export function FloatingButtons() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowTopBtn(latest > 400);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Scroll to Top */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ 
          opacity: showTopBtn ? 1 : 0, 
          scale: showTopBtn ? 1 : 0.8,
          y: showTopBtn ? 0 : 20,
          pointerEvents: showTopBtn ? "auto" : "none"
        }}
        onClick={scrollToTop}
        className="w-12 h-12 bg-white text-[#93A186] rounded-full shadow-lg border border-[#93A186]/20 flex items-center justify-center hover:bg-[#93A186] hover:text-white transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/919843166477"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] flex items-center justify-center relative group"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
        
        <MessageCircle className="w-7 h-7 relative z-10" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-white text-[#1A1A2E] text-sm font-semibold rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
          Chat with us
          <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-white rotate-45 border-r border-t border-gray-100" />
        </div>
      </motion.a>
    </div>
  );
}
