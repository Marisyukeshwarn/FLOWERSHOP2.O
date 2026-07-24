import React from "react";
import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white pt-20 pb-8 relative overflow-hidden">
      {/* Decorative gradient blur in background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#EB7297]/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#93A186]/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter Section */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm">
          <div className="max-w-lg">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-3">Join our Bloom Club</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Subscribe to get exclusive access to new floral collections, festival discounts, and expert flower care tips.
            </p>
          </div>
          <div className="w-full md:w-auto flex-1 max-w-md relative">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-white/10 border border-white/20 rounded-full h-14 pl-6 pr-32 text-white placeholder-gray-400 focus:outline-none focus:border-[#EB7297] transition-colors"
            />
            <Button className="absolute right-1.5 top-1.5 h-11 px-6 rounded-full" size="sm">
              Subscribe
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-[#EB7297] transition-colors">
                MAHALAKSHMI
                <span className="block text-[10px] font-sans tracking-[0.2em] text-[#93A186] uppercase mt-0.5">
                  Bloom Studio
                </span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              India's premium floral studio. Crafting unforgettable moments with fresh, luxurious custom garlands and wedding malas.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#EB7297] hover:text-white hover:border-[#EB7297] transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#EB7297] hover:text-white hover:border-[#EB7297] transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#EB7297] hover:text-white hover:border-[#EB7297] transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EB7297]" /> Shop Collections
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/shop/wedding-malas" className="hover:text-[#EB7297] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Wedding Malas</Link></li>
              <li><Link href="/shop/entrance-malas" className="hover:text-[#EB7297] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Entrance Decoration</Link></li>
              <li><Link href="/temple" className="hover:text-[#EB7297] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Temple Offerings</Link></li>
              <li><Link href="/shop/customize" className="hover:text-[#EB7297] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Custom Mala Builder</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#93A186]" /> Useful Links
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-[#93A186] transition-colors">About Us</Link></li>
              <li><Link href="/track" className="hover:text-[#93A186] transition-colors">Track Order</Link></li>
              <li><Link href="/faq" className="hover:text-[#93A186] transition-colors">FAQ & Support</Link></li>
              <li><Link href="/contact" className="hover:text-[#93A186] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EB7297]" /> Get in Touch
            </h3>
            <ul className="space-y-5 text-sm text-gray-400">
              <li className="flex items-start group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-3 mt-0.5 group-hover:bg-[#EB7297] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <span className="block text-white font-medium mb-1">+91 98431 66477</span>
                  <span className="text-xs text-gray-500">Mon-Sat, 9am - 8pm</span>
                </div>
              </li>
              <li className="flex items-start group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-3 mt-0.5 group-hover:bg-[#EB7297] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <span className="block text-white font-medium mb-1">hello@mahalakshmibloom.com</span>
                  <span className="text-xs text-gray-500">For online order queries</span>
                </div>
              </li>
              <li className="flex items-start group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-3 mt-0.5 group-hover:bg-[#EB7297] transition-colors shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="leading-relaxed pt-1">
                  Coimbatore, Tamil Nadu<br />India - 641001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} MAHALAKSHMI Bloom Studio. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
