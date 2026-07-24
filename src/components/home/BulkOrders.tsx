"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Truck, Percent, PhoneCall } from "lucide-react";

export function BulkOrders() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#93A186] to-[#7a8a6e] rounded-[2rem] overflow-hidden relative shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#EB7297]/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />

          <div className="relative z-10 px-8 py-16 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-outline bg-white/10 text-white border-white/30 mb-6 inline-block text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Corporate & Event Planners
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
                Bulk Orders & <br /> Wholesale Pricing
              </h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed font-light">
                Planning a large wedding, corporate event, or daily temple offerings? Partner with us for special wholesale rates, dedicated account management, and priority delivery.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact?type=bulk">
                  <Button size="lg" className="bg-white text-[#93A186] hover:bg-gray-50 w-full sm:w-auto shadow-xl">
                    Request a Quote
                  </Button>
                </Link>
                <a href="tel:+919843166477">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                    Call Now
                  </Button>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white">
                <Percent className="w-8 h-8 mb-4 text-[#F3A6B0]" />
                <h3 className="font-semibold text-lg mb-2">Volume Discounts</h3>
                <p className="text-sm text-white/80">Save up to 30% on large orders of wedding malas and bulk flowers.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white">
                <Truck className="w-8 h-8 mb-4 text-[#F3A6B0]" />
                <h3 className="font-semibold text-lg mb-2">Priority Delivery</h3>
                <p className="text-sm text-white/80">Dedicated delivery fleet ensuring fresh flowers reach your venue on time.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white sm:col-span-2">
                <PhoneCall className="w-8 h-8 mb-4 text-[#F3A6B0]" />
                <h3 className="font-semibold text-lg mb-2">Dedicated Support</h3>
                <p className="text-sm text-white/80">A personal account manager to handle your event's entire floral requirement from concept to delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
