"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, ShoppingBag, Heart, Settings, LogOut, ChevronRight } from "lucide-react";
import { useAuth } from "@/lib/store";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { state, dispatch } = useAuth();

  useEffect(() => {
    if (state.isHydrated && !state.isAuthenticated) {
      router.push("/auth/login?redirect=" + encodeURIComponent(pathname));
    }
  }, [state.isAuthenticated, state.isHydrated, router, pathname]);

  if (!state.isHydrated || !state.isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]"><div className="w-10 h-10 border-4 border-[#FEF0F3] border-t-[#EB7297] rounded-full animate-spin" /></div>;
  }

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: User },
    { name: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
    { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-[#1A1A2E]">My Account</h1>
          <p className="text-gray-500 mt-1">Welcome back, {state.user?.name}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 sticky top-28">
              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${
                        isActive 
                          ? "bg-[#FEF0F3] text-[#EB7297] font-semibold" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-[#1A1A2E]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? "text-[#EB7297]" : "text-gray-400"}`} />
                        {item.name}
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-[#EB7297]" />}
                    </Link>
                  );
                })}
                
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </main>

        </div>
      </div>
    </div>
  );
}
