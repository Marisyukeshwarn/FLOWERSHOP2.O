"use client";

import React, { useState, useEffect } from "react";
import { Check, Package, Truck, CheckCircle2, Plus, Wifi } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [newOrderFlash, setNewOrderFlash] = useState<string | null>(null);

  useEffect(() => {
    // Initial fetch
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        if (data.length > 0) setExpandedOrder(data[0].id);
        setLoading(false);
      });

    // Subscribe to SSE for realtime updates
    const eventSource = new EventSource('/api/events');

    eventSource.onopen = () => setConnected(true);
    eventSource.onerror = () => setConnected(false);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'NEW_ORDER') {
        setOrders(prev => [data.order, ...prev]);
        setExpandedOrder(data.order.id);
        setNewOrderFlash(data.order.id);
        setTimeout(() => setNewOrderFlash(null), 2000);
      } else if (data.type === 'UPDATE_ORDER') {
        setOrders(prev => prev.map((o: any) => o.id === data.order.id ? data.order : o));
        // Flash the updated order
        setNewOrderFlash(data.order.id);
        setTimeout(() => setNewOrderFlash(null), 2000);
      }
    };

    return () => {
      eventSource.close();
      setConnected(false);
    };
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle2 className="w-5 h-5 text-[#93A186]" />;
      case "out_for_delivery": return <Truck className="w-5 h-5 text-amber-500" />;
      default: return <Package className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-[#93A186]';
      case 'out_for_delivery': return 'text-amber-600';
      default: return 'text-blue-600';
    }
  };

  const getStatusLabel = (status: string) => status.replace(/_/g, ' ');

  const createTestOrder = async () => {
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        total: 1500,
        items: [{ name: 'Traditional Rose Wedding Mala', qty: 1, size: '5 ft', price: 1500 }]
      })
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A2E]">Order History</h2>
            <p className="text-gray-500 text-sm mt-1">Track your active orders and view past purchases</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Live indicator */}
            <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              connected ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
            }`}>
              <Wifi className="w-3 h-3" />
              {connected ? 'Live updates on' : 'Connecting...'}
            </div>
            {/* Test Order button */}
            <button
              onClick={createTestOrder}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#EB7297] to-[#d96688] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Place Test Order
            </button>
          </div>
        </div>
      </div>

      {/* Orders list */}
      <div className="divide-y divide-gray-100">
        {loading ? (
          <div className="p-10 text-center text-gray-400">
            <Package className="w-8 h-8 mx-auto mb-3 opacity-40" />
            Loading your orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            <Package className="w-8 h-8 mx-auto mb-3 opacity-40" />
            No orders yet. Place a test order to get started!
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className={`p-6 md:p-8 transition-all duration-500 ${
                newOrderFlash === order.id ? 'bg-[#EB7297]/5' : ''
              }`}
            >
              <div
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    order.status === "delivered" ? "bg-[#eef4ea]" : "bg-gray-50"
                  }`}>
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A2E]">{order.id}</h3>
                    <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 md:gap-8">
                  <div className="text-left md:text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Total</p>
                    <p className="font-bold text-[#EB7297]">₹{order.total.toLocaleString()}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Status</p>
                    <p className={`font-semibold capitalize text-sm ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              {expandedOrder === order.id && (
                <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">

                  {/* Items */}
                  <div>
                    <h4 className="font-semibold text-[#1A1A2E] mb-4 text-sm uppercase tracking-wide">Items Ordered</h4>
                    <div className="space-y-3">
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center text-sm bg-gray-50 rounded-xl p-3">
                          <div>
                            <span className="text-gray-900 font-medium">{item.name}</span>
                            {item.size && <span className="ml-2 text-xs text-gray-400">({item.size})</span>}
                            <span className="ml-2 text-xs text-gray-500">× {item.qty}</span>
                          </div>
                          <span className="text-gray-700 font-semibold">₹{item.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div>
                    <h4 className="font-semibold text-[#1A1A2E] mb-4 text-sm uppercase tracking-wide">Tracking</h4>
                    <div className="relative pl-6 space-y-5">
                      <div className="absolute top-2 bottom-2 left-[11px] w-0.5 bg-gray-100" />
                      {order.trackingSteps.map((step: any, idx: number) => (
                        <div key={idx} className="relative flex items-start gap-4">
                          <div className={`absolute -left-6 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center shrink-0 z-10 transition-all duration-500 ${
                            step.done ? "bg-[#93A186]" : "bg-gray-200"
                          }`}>
                            {step.done && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <div className="-mt-0.5">
                            <p className={`text-sm font-semibold transition-colors ${step.done ? "text-[#1A1A2E]" : "text-gray-400"}`}>
                              {step.label}
                            </p>
                            {step.time && <p className="text-xs text-gray-500 mt-0.5">{step.time}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {!loading && orders.length > 0 && (
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-center gap-2 text-xs text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Order status updates appear here automatically
        </div>
      )}
    </div>
  );
}
