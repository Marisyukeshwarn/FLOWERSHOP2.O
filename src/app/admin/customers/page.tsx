"use client";

import React, { useState, useEffect } from "react";
import { Users, Mail, Phone, ShoppingBag, Wifi, Search } from "lucide-react";

export default function AdminCustomersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    fetch("/api/orders")
      .then(r => r.json())
      .then(data => setOrders(Array.isArray(data) ? data : []));

    const es = new EventSource("/api/events");
    es.onopen = () => setConnected(true);
    es.onerror = () => setConnected(false);
    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "NEW_ORDER") {
        setOrders(prev => [data.order, ...prev]);
      } else if (data.type === "UPDATE_ORDER") {
        setOrders(prev => prev.map(o => o.id === data.order.id ? data.order : o));
      }
    };
    return () => es.close();
  }, []);

  // Derive actual customer records dynamically from order history
  const customerMap = new Map<string, { id: string; name: string; email: string; phone: string; orders: number; totalSpent: number }>();

  orders.forEach((o, idx) => {
    const details = o.customerDetails || {};
    const email = details.email || o.email || `customer-${idx + 1}@example.com`;
    const firstName = details.firstName || '';
    const lastName = details.lastName || '';
    const name = (firstName || lastName) ? `${firstName} ${lastName}`.trim() : (o.name || 'Customer');
    const phone = details.phone || o.phone || '+91 -';

    if (!customerMap.has(email)) {
      customerMap.set(email, {
        id: `cust_${idx + 1}`,
        name,
        email,
        phone,
        orders: 1,
        totalSpent: Number(o.total) || 0
      });
    } else {
      const existing = customerMap.get(email)!;
      existing.orders += 1;
      existing.totalSpent += Number(o.total) || 0;
    }
  });

  const customers = Array.from(customerMap.values());

  const filtered = customers.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1A1A2E] flex items-center gap-2">
            Customers <Users className="w-5 h-5 text-[#EB7297]" />
          </h1>
          <p className="text-sm text-gray-500 mt-1">Order counts update live as new orders arrive.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium ${
            connected ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
          }`}>
            <Wifi className="w-3 h-3" />
            {connected ? "Live" : "Connecting..."}
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#EB7297]/20 focus:border-[#EB7297] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-600">Customer</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Contact</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Orders</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Total Spent</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#EB7297] to-[#F3A6B0] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {c.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-gray-900">{c.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 space-y-1">
                  <p className="text-xs text-gray-500 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-gray-400" /> {c.email}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gray-400" /> {c.phone}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-[#EB7297]" />
                    <span className="font-semibold text-gray-900">{c.orders}</span>
                    <span className="text-gray-400 text-xs">orders</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  ₹{c.totalSpent.toLocaleString("en-IN")}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    c.orders > 3 ? "bg-[#eef4ea] text-[#93A186]" : "bg-gray-100 text-gray-600"
                  }`}>
                    {c.orders > 3 ? "VIP" : "Regular"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs text-gray-400">
          <span>{filtered.length} customers</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Order counts update in real-time
          </span>
        </div>
      </div>
    </div>
  );
}
