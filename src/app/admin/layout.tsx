"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, ShoppingCart, Users, Package, Settings, LogOut, Search, Images, MessageSquareQuote } from "lucide-react";
import { useAuth } from "@/lib/store";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { state, dispatch } = useAuth();

  useEffect(() => {
    if (pathname === "/admin/login") return;
    if (state.isHydrated) {
      if (!state.isAuthenticated) {
        router.push("/admin/login?redirect=" + encodeURIComponent(pathname));
      } else if (state.user?.role !== "admin") {
        router.push("/dashboard");
      }
    }
  }, [state.isAuthenticated, state.user, state.isHydrated, pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!state.isHydrated || !state.isAuthenticated || state.user?.role !== "admin") {
    return <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]"><div className="w-10 h-10 border-4 border-[#1A1A2E] border-t-transparent rounded-full animate-spin" /></div>;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Gallery", href: "/admin/gallery", icon: Images },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#1A1A2E] text-white hidden md:flex flex-col fixed inset-y-0 z-50">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="inline-block">
            <span className="font-serif text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#EB7297] flex items-center justify-center text-sm">SB</span>
              Admin Panel
            </span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <p className="px-4 text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Management</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? "bg-[#EB7297] text-white font-medium shadow-md shadow-[#EB7297]/20" 
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-white/50"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
              {state.user?.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{state.user?.name}</p>
              <p className="text-xs text-white/50 truncate">Administrator</p>
            </div>
          </div>
          <button
            onClick={() => dispatch({ type: "LOGOUT" })}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/70 hover:bg-white/10 hover:text-red-400 transition-all font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Admin Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center flex-1">
            <div className="max-w-md w-full hidden sm:block relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search orders, products, customers..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#EB7297]/20 focus:bg-white transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-[#EB7297] hover:underline">
              View Storefront
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 md:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
