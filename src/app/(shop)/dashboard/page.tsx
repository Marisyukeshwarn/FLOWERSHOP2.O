"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Heart, Clock, ArrowRight } from "lucide-react";
import { useAuth, useWishlist } from "@/lib/store";

export default function DashboardOverview() {
  const { state } = useAuth();
  const { state: wishlistState } = useWishlist();
  
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalOrders = orders.length;
  const activeOrders = orders.filter(o => o.status !== "delivered").length;
  const recentOrder = orders[0];

  return (
    <div className="space-y-8">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-[#FEF0F3] text-[#EB7297] flex items-center justify-center mb-3">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <p className="text-3xl font-bold text-[#1A1A2E]">{loading ? "-" : totalOrders}</p>
          <p className="text-sm text-gray-500 font-medium">Total Orders</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-[#eef4ea] text-[#93A186] flex items-center justify-center mb-3">
            <Clock className="w-6 h-6" />
          </div>
          <p className="text-3xl font-bold text-[#1A1A2E]">{loading ? "-" : activeOrders}</p>
          <p className="text-sm text-gray-500 font-medium">Active Orders</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-400 flex items-center justify-center mb-3">
            <Heart className="w-6 h-6" />
          </div>
          <p className="text-3xl font-bold text-[#1A1A2E]">{wishlistState.items.length}</p>
          <p className="text-sm text-gray-500 font-medium">Saved Items</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Order */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl font-bold text-[#1A1A2E]">Recent Order</h2>
            <Link href="/dashboard/orders" className="text-sm text-[#EB7297] font-semibold hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading order...</div>
          ) : recentOrder ? (
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{recentOrder.id}</p>
                  <p className="text-xs text-gray-500">{new Date(recentOrder.date).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  recentOrder.status === 'delivered' ? 'bg-[#eef4ea] text-[#93A186]' : 'bg-amber-50 text-amber-600'
                }`}>
                  {recentOrder.status.replace("_", " ").toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-4 mb-6">
                {recentOrder.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{item.qty}x {item.name} {item.size && `(${item.size})`}</span>
                    <span className="font-medium text-[#1A1A2E]">₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <span className="font-semibold text-[#1A1A2E]">Total</span>
                <span className="font-bold text-[#EB7297]">₹{recentOrder.total.toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
              <Link href="/collections" className="text-[#EB7297] font-semibold hover:underline">
                Start Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Account Info */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl font-bold text-[#1A1A2E]">Account Details</h2>
            <Link href="/dashboard/settings" className="text-sm text-gray-500 hover:text-[#EB7297] transition-colors">
              Edit
            </Link>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Name</p>
              <p className="font-medium text-[#1A1A2E]">{state.user?.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Email</p>
              <p className="font-medium text-[#1A1A2E]">{state.user?.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Password</p>
              <p className="font-medium text-gray-400">••••••••</p>
            </div>
          </div>
          
          {state.user?.role === "admin" && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="bg-[#1A1A2E] text-white rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Admin Access</h3>
                  <p className="text-sm text-gray-400">Manage orders and products</p>
                </div>
                <Link href="/admin" className="px-4 py-2 bg-white text-[#1A1A2E] text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors">
                  Go to Panel
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

