"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useCart, useWishlist, useAuth } from "@/lib/store";
import { SearchBar } from "@/components/ui/SearchBar";
import { shopCategories } from "@/lib/data";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop By Category", href: "/collections", hasDropdown: true },
  { name: "Wedding", href: "/wedding" },
  { name: "Temple", href: "/temple" },
  { name: "Custom Mala", href: "/shop/customize" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { scrollY } = useScroll();
  const { totalItems } = useCart();
  const { state: wishlistState } = useWishlist();
  const { state: authState, dispatch: authDispatch } = useAuth();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
    setUserDropdownOpen(false);
  };

  return (
    <>
      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile menu"
                className="text-[#1A1A2E] p-2 -ml-2"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center group relative z-50">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1A2E] group-hover:text-[#EB7297] transition-colors">
                SUTHISKA
                <span className="block text-[10px] font-sans tracking-[0.2em] text-[#93A186] uppercase mt-0.5">
                  Bloom Studio
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setDropdownOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setDropdownOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-[#1A1A2E] hover:text-[#EB7297] transition-colors flex items-center gap-1"
                  >
                    {link.name}
                  </Link>

                  {/* Mega Dropdown */}
                  {link.hasDropdown && (
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] pt-4"
                        >
                          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden p-6 grid grid-cols-3 gap-6">
                            {shopCategories.map((cat) => (
                              <Link
                                key={cat.id}
                                href={`/collections?category=${cat.slug}`}
                                className="group block"
                                onClick={() => setDropdownOpen(false)}
                              >
                                <div className="h-24 rounded-xl overflow-hidden mb-3 relative">
                                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
                                  <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  />
                                </div>
                                <h4 className="text-sm font-semibold text-[#1A1A2E] group-hover:text-[#EB7297] transition-colors">
                                  {cat.name}
                                </h4>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Icons & CTA */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search products"
                className="text-[#1A1A2E] hover:text-[#EB7297] transition-colors p-2 hidden sm:block"
              >
                <Search className="w-5 h-5" />
              </button>
              
              {/* Auth */}
              <div 
                className="relative"
                onMouseEnter={() => setUserDropdownOpen(true)}
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                {authState.isAuthenticated ? (
                  <>
                    <button aria-label="User account" className="text-[#1A1A2E] hover:text-[#EB7297] transition-colors p-2">
                      <User className="w-5 h-5" />
                    </button>
                    
                    <AnimatePresence>
                      {userDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full right-0 pt-2 w-48"
                        >
                          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2 flex flex-col">
                            <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                              <p className="text-sm font-semibold text-[#1A1A2E] truncate">{authState.user?.name}</p>
                              <p className="text-xs text-gray-500 truncate">{authState.user?.email}</p>
                            </div>
                            <Link href="/dashboard" className="px-4 py-2 text-sm text-gray-700 hover:text-[#EB7297] hover:bg-[#FEF0F3] transition-colors">
                              Dashboard
                            </Link>
                            <Link href="/dashboard/orders" className="px-4 py-2 text-sm text-gray-700 hover:text-[#EB7297] hover:bg-[#FEF0F3] transition-colors">
                              My Orders
                            </Link>
                            {authState.user?.role === "admin" && (
                              <Link href="/admin" className="px-4 py-2 text-sm text-[#93A186] font-medium hover:bg-[#93A186]/10 transition-colors">
                                Admin Panel
                              </Link>
                            )}
                            <button
                              onClick={handleLogout}
                              className="px-4 py-2 text-sm text-red-500 text-left hover:bg-red-50 transition-colors border-t border-gray-50 mt-1"
                            >
                              Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link href="/auth/login" aria-label="Login / Account" className="text-[#1A1A2E] hover:text-[#EB7297] transition-colors p-2">
                    <User className="w-5 h-5" />
                  </Link>
                )}
              </div>

              <Link href="/dashboard/wishlist" className="text-[#1A1A2E] hover:text-[#EB7297] transition-colors p-2 relative hidden sm:block">
                <Heart className="w-5 h-5" />
                {wishlistState.items.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#EB7297] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {wishlistState.items.length}
                  </span>
                )}
              </Link>
              
              <Link href="/cart" className="text-[#1A1A2E] hover:text-[#EB7297] transition-colors p-2 relative">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#EB7297] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              <Link href="/contact" className="hidden lg:block ml-2">
                <Button size="sm">Book Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Full Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col"
          >
            <div className="flex justify-between items-center h-20 px-4 border-b border-gray-100">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1A2E]">
                SUTHISKA
                <span className="block text-[10px] font-sans tracking-[0.2em] text-[#93A186] uppercase mt-0.5">
                  Bloom Studio
                </span>
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close mobile menu"
                className="p-2 text-gray-500 hover:text-[#EB7297] bg-gray-50 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-6">
              {/* Mobile Search */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="flex items-center gap-3 w-full bg-gray-50 p-4 rounded-2xl text-gray-500 font-medium"
              >
                <Search className="w-5 h-5 text-[#EB7297]" />
                Search for products...
              </button>

              <nav className="flex flex-col gap-4 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-serif text-[#1A1A2E] hover:text-[#EB7297] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                
                <Link
                  href="/dashboard/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif text-[#1A1A2E] hover:text-[#EB7297] transition-colors flex items-center gap-2 mt-2"
                >
                  My Wishlist {wishlistState.items.length > 0 && <span className="text-sm bg-[#EB7297] text-white px-2 py-0.5 rounded-full font-sans">{wishlistState.items.length}</span>}
                </Link>
              </nav>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-4">
              {!authState.isAuthenticated && (
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Login / Sign Up</Button>
                </Link>
              )}
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Contact for Booking</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
