"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp, Users, ShoppingBag, IndianRupee,
  ArrowUpRight, Package, Wifi, Clock, ChevronRight, Images
} from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
  processing: "Processing",
  preparing: "Preparing",
  making: "Making Mala",
  quality_check: "Quality Check",
  packed: "Packed",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

function getStatusBadge(status: string) {
  switch (status) {
    case "delivered": return "bg-green-50 text-green-700";
    case "out_for_delivery": return "bg-blue-50 text-blue-700";
    default: return "bg-amber-50 text-amber-700";
  }
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [galleryCount, setGalleryCount] = useState<number>(0);
  const [activity, setActivity] = useState<{ id: string; msg: string; time: string; type: string }[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Fetch initial data
    Promise.all([
      fetch("/api/orders").then(r => r.json()),
      fetch("/api/products").then(r => r.json()),
      fetch("/api/gallery").then(r => r.json()),
    ]).then(([ordersData, productsData, galleryData]) => {
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setProducts(Array.isArray(productsData) ? productsData : []);
      setGalleryCount(Array.isArray(galleryData) ? galleryData.length : 0);
    });

    // SSE for live updates
    const es = new EventSource("/api/events");
    es.onopen = () => setConnected(true);
    es.onerror = () => setConnected(false);
    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      if (data.type === "NEW_ORDER") {
        setOrders(prev => [data.order, ...prev]);
        setActivity(prev => [
          { id: Date.now().toString(), msg: `New order ${data.order.id} received`, time: now, type: "order" },
          ...prev.slice(0, 9),
        ]);
      } else if (data.type === "UPDATE_ORDER") {
        setOrders(prev => prev.map(o => o.id === data.order.id ? data.order : o));
        setActivity(prev => [
          { id: Date.now().toString(), msg: `Order ${data.order.id} → ${STATUS_LABELS[data.order.status] ?? data.order.status}`, time: now, type: "order" },
          ...prev.slice(0, 9),
        ]);
      } else if (data.type === "ADD_PRODUCT") {
        setProducts(prev => [data.product, ...prev]);
        setActivity(prev => [
          { id: Date.now().toString(), msg: `Product added: "${data.product.name}"`, time: now, type: "product" },
          ...prev.slice(0, 9),
        ]);
      } else if (data.type === "UPDATE_PRODUCT") {
        setProducts(prev => prev.map(p => p.id === data.product.id ? data.product : p));
        setActivity(prev => [
          { id: Date.now().toString(), msg: `Product updated: "${data.product.name}"`, time: now, type: "product" },
          ...prev.slice(0, 9),
        ]);
      } else if (data.type === "DELETE_PRODUCT") {
        setProducts(prev => prev.filter(p => p.id !== data.productId));
        setActivity(prev => [
          { id: Date.now().toString(), msg: `Product deleted`, time: now, type: "product" },
          ...prev.slice(0, 9),
        ]);
      }
    };

    return () => es.close();
  }, []);

  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const activeOrders = orders.filter(o => o.status !== "delivered").length;
  const recentOrders = [...orders].slice(0, 5);

  const stats = [
    {
      name: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      change: "+12.5%",
      trend: "up",
      icon: IndianRupee,
      color: "bg-[#FEF0F3] text-[#EB7297]",
    },
    {
      name: "Active Orders",
      value: activeOrders.toString(),
      change: "+4.2%",
      trend: "up",
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-600",
    },
    {
      name: "Products Live",
      value: products.length.toString(),
      change: "",
      trend: "up",
      icon: Package,
      color: "bg-[#eef4ea] text-[#93A186]",
    },
    {
      name: "Gallery Images",
      value: galleryCount.toString(),
      change: "",
      trend: "up",
      icon: Images,
      color: "bg-orange-50 text-orange-600",
    },
    {
      name: "Total Orders",
      value: orders.length.toString(),
      change: "+18.1%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-serif">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Here's what's happening with your store right now.</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
          connected ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-100 text-gray-500"
        }`}>
          <Wifi className="w-3.5 h-3.5" />
          {connected ? "Live — real-time data" : "Connecting..."}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {stat.change && (
                  <div className="flex items-center text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-600">
                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    {stat.change}
                  </div>
                )}
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.name}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm font-medium text-[#EB7297] hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                  <th className="px-6 py-3 font-semibold">Order ID</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">No orders yet.</td></tr>
                ) : recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-3.5 text-gray-500">
                      {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(order.status)}`}>
                        {STATUS_LABELS[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 font-semibold text-gray-900 text-right">
                      ₹{order.total.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">Live Activity</h2>
            <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live
            </span>
          </div>
          <div className="flex-1 divide-y divide-gray-50 overflow-y-auto max-h-72">
            {activity.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 text-center text-gray-400">
                <Clock className="w-8 h-8 mb-3 opacity-30" />
                <p className="text-sm">Waiting for activity...</p>
                <p className="text-xs mt-1">Updates appear here in real-time</p>
              </div>
            ) : activity.map((item) => (
              <div key={item.id} className="flex items-start gap-3 px-5 py-3.5">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  item.type === "order" ? "bg-[#EB7297]" : "bg-[#93A186]"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 font-medium leading-snug">{item.msg}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">Updates shown as they happen</p>
          </div>
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-base font-bold text-gray-900">Live Product Catalog</h2>
          <Link href="/admin/products" className="text-sm font-medium text-[#EB7297] hover:underline flex items-center gap-1">
            Manage <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-4 p-6 overflow-x-auto">
          {products.slice(0, 8).map(p => (
            <div key={p.id} className="flex-shrink-0 w-32 group">
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm mb-2">
                {p.images?.[0] ? (
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Package className="w-6 h-6" />
                  </div>
                )}
              </div>
              <p className="text-xs font-semibold text-gray-800 truncate">{p.name}</p>
              <p className="text-xs text-[#EB7297] font-bold mt-0.5">₹{p.variants?.[0]?.price ?? p.price ?? 0}</p>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-sm text-gray-400 py-4">No products yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
