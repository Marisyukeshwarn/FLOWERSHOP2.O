"use client";

import React, { useState, useEffect } from "react";
import { Filter, Search, RefreshCw, ChevronRight, Download } from "lucide-react";

const STATUS_ORDER = ['processing', 'preparing', 'making', 'quality_check', 'packed', 'out_for_delivery', 'delivered'];

const STATUS_LABELS: Record<string, string> = {
  processing: 'Processing',
  preparing: 'Preparing',
  making: 'Making Mala',
  quality_check: 'Quality Check',
  packed: 'Packed',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
};

function getStatusBadge(status: string) {
  switch (status) {
    case 'delivered': return 'bg-green-50 text-green-700 border border-green-200';
    case 'out_for_delivery': return 'bg-blue-50 text-blue-700 border border-blue-200';
    case 'packed': return 'bg-purple-50 text-purple-700 border border-purple-200';
    case 'quality_check': return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
    case 'making': return 'bg-pink-50 text-pink-700 border border-pink-200';
    case 'preparing': return 'bg-amber-50 text-amber-700 border border-amber-200';
    default: return 'bg-gray-50 text-gray-700 border border-gray-200';
  }
}

export default function AdminOrders() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [advancing, setAdvancing] = useState<string | null>(null);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Initial fetch
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });

    // Subscribe to SSE for realtime updates
    const eventSource = new EventSource('/api/events');
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPulse(true);
      setTimeout(() => setPulse(false), 800);
      if (data.type === 'NEW_ORDER') {
        setOrders(prev => [data.order, ...prev]);
      } else if (data.type === 'UPDATE_ORDER') {
        setOrders(prev => prev.map((o: any) => o.id === data.order.id ? data.order : o));
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleAdvanceStatus = async (id: string) => {
    setAdvancing(id);
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}), // empty body = auto-advance
    });
    setAdvancing(null);
  };

  const filteredOrders = orders
    .filter(o => filter === "all" || o.status === filter)
    .filter(o => !search || o.id.toLowerCase().includes(search.toLowerCase()));

  const handleDownloadCSV = () => {
    if (filteredOrders.length === 0) return;
    
    const headers = ["Order ID", "Date", "Items", "Total (Rs)", "Status"];
    const rows = filteredOrders.map(order => [
      order.id,
      new Date(order.date).toLocaleDateString('en-IN'),
      order.items.map((i: any) => `${i.name} (Qty: ${i.qty})`).join('; '),
      order.total,
      STATUS_LABELS[order.status] ?? order.status
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.map(field => `"${String(field).replace(/"/g, '""')}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `suthiska_orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 font-serif">Order Management</h1>
            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
              pulse ? 'bg-green-100 text-green-700 scale-105' : 'bg-gray-100 text-gray-500'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${pulse ? 'bg-green-500 animate-ping' : 'bg-gray-400'}`} />
              {pulse ? 'Update received' : 'Live'}
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">Changes update on the customer dashboard in real-time.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by order ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#EB7297]/20 focus:border-[#EB7297] outline-none"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-2">
            <Filter className="w-4 h-4" />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="all">All Orders</option>
              {STATUS_ORDER.map(s => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={handleDownloadCSV}
            disabled={filteredOrders.length === 0}
            className="flex items-center gap-2 text-sm bg-[#EB7297] text-white px-4 py-2 rounded-lg hover:bg-[#d96688] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4 font-semibold">Order</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Items</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Total</th>
                <th className="px-6 py-4 font-semibold text-right">Advance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr><td colSpan={6} className="text-center p-10 text-gray-400">Loading orders...</td></tr>
              ) : filteredOrders.map((order) => {
                const isDelivered = order.status === 'delivered';
                return (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">{order.id}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {order.items.map((i: any) => i.name).join(', ')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}`}>
                        {STATUS_LABELS[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ₹{order.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {!isDelivered ? (
                        <button
                          onClick={() => handleAdvanceStatus(order.id)}
                          disabled={advancing === order.id}
                          className="flex items-center gap-1.5 ml-auto px-3 py-1.5 bg-[#EB7297] text-white rounded-lg text-xs font-medium hover:bg-[#d96688] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {advancing === order.id ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <ChevronRight className="w-3 h-3" />
                          )}
                          {advancing === order.id ? 'Updating...' : `→ ${STATUS_LABELS[STATUS_ORDER[STATUS_ORDER.indexOf(order.status) + 1]] ?? ''}`}
                        </button>
                      ) : (
                        <span className="text-xs text-green-600 font-medium mr-2">✓ Complete</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {!loading && filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-400 bg-gray-50/50">
          <span>Showing {filteredOrders.length} of {orders.length} orders</span>
          <span className="flex items-center gap-1.5 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Connected — real-time updates active
          </span>
        </div>
      </div>
    </div>
  );
}
