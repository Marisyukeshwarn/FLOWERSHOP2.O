"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Clock, Info, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const { state, dispatch, subtotal, totalItems } = useCart();
  const router = useRouter();

  const handleUpdateQuantity = (id: string, currentQty: number, change: number) => {
    const newQty = Math.max(1, currentQty + change);
    dispatch({ type: "UPDATE_QTY", payload: { id, qty: newQty } });
  };

  const handleRemove = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const [couponCode, setCouponCode] = useState(state.couponCode || "");
  const [couponError, setCouponError] = useState("");

  useEffect(() => {
    // If cart becomes empty, remove coupon to prevent it carrying over to next order improperly
    if (state.items.length === 0 && state.couponCode) {
      dispatch({ type: "REMOVE_COUPON" });
    }
  }, [state.items.length, state.couponCode, dispatch]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    
    // In a real app, you would validate this against an API
    const validCoupons: Record<string, number> = {
      "BLOOM10": 10,
      "WEDDING20": 20,
      "FIRST50": 50,
      "FESTIVAL15": 15
    };

    const discount = validCoupons[couponCode.toUpperCase()];
    if (discount) {
      dispatch({ type: "APPLY_COUPON", payload: { code: couponCode.toUpperCase(), discount } });
      setCouponError("");
    } else {
      setCouponError("Invalid or expired coupon code");
      dispatch({ type: "REMOVE_COUPON" });
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setCouponError("");
    dispatch({ type: "REMOVE_COUPON" });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#FAFAFA] px-4 pt-20">
        <div className="w-24 h-24 bg-[#FEF0F3] rounded-full flex items-center justify-center mb-8">
          <ShoppingBag className="w-10 h-10 text-[#EB7297]" />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4 text-center">
          Your Cart is Empty
        </h1>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Looks like you haven't added any beautiful floral arrangements to your cart yet.
        </p>
        <Link href="/collections">
          <Button size="lg">Explore Collections</Button>
        </Link>
      </div>
    );
  }

  // Calculate order summary
  const { taxes, deliveryCharge, total } = useCart();

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A2E]">Shopping Cart</h1>
          <p className="text-gray-500 mt-2">You have {totalItems} items in your cart.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {state.items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 relative group"
                >
                  <Link href={`/product/${item.slug}`} className="shrink-0 block w-full sm:w-32 h-32">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </Link>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <Link href={`/product/${item.slug}`}>
                        <h3 className="font-serif font-bold text-lg text-[#1A1A2E] hover:text-[#EB7297] transition-colors line-clamp-2 pr-8">
                          {item.name}
                        </h3>
                      </Link>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors absolute top-6 right-6 sm:static"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-4">
                      <span>Size: <strong className="text-gray-700">{item.size}</strong></span>
                      {item.thickness && <span>Style: <strong className="text-gray-700">{item.thickness}</strong></span>}
                    </div>

                    <div className="mt-auto flex justify-between items-end">
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1">
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#1A1A2E] transition-colors rounded-lg hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-semibold text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#1A1A2E] transition-colors rounded-lg hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-400 mb-0.5">₹{item.price.toLocaleString()} each</p>
                        <p className="font-bold text-lg text-[#EB7297]">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 mb-6">
                <h2 className="font-serif text-xl font-bold text-[#1A1A2E] mb-6">Order Summary</h2>
                
                <div className="space-y-4 text-sm mb-6">
                  {/* Coupon Code Section */}
                  <form onSubmit={handleApplyCoupon} className="mb-4 flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Coupon Code" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#EB7297]/20 focus:border-[#EB7297] transition-all uppercase placeholder:normal-case"
                    />
                    <Button type="submit" variant="outline" size="sm" className="shrink-0 h-[42px]">Apply</Button>
                  </form>
                  {couponError && <p className="text-red-500 text-xs mt-[-12px] mb-2">{couponError}</p>}
                  
                  {state.couponCode && (
                    <div className="bg-[#eef4ea] text-[#93A186] px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-between mb-4 border border-[#93A186]/20">
                      <span>{state.couponCode} Applied ({state.couponDiscount}%)</span>
                      <button type="button" onClick={handleRemoveCoupon} className="hover:text-red-500 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1A1A2E]">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax (5%)</span>
                  <span className="font-medium text-[#1A1A2E]">₹{taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 border-b border-gray-100 pb-4">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-[#1A1A2E]">
                    {deliveryCharge === 0 ? <span className="text-green-600">Free</span> : `₹${deliveryCharge.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-[#1A1A2E] text-lg">Total</span>
                  <span className="font-bold text-2xl text-[#EB7297]">₹{total.toLocaleString()}</span>
                </div>
              </div>

              {subtotal < 2000 && subtotal > 0 && (
                <div className="bg-[#FEF0F3] text-[#EB7297] px-4 py-3 rounded-xl text-sm mb-6 flex items-start gap-2">
                  <Info className="w-5 h-5 shrink-0" />
                  <p>Add <strong>₹{(2000 - subtotal).toLocaleString()}</strong> more to your cart to get FREE delivery.</p>
                </div>
              )}

              <Button 
                size="lg" 
                className="w-full mb-4 shadow-xl shadow-[#EB7297]/20"
                onClick={() => router.push("/checkout")}
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Link href="/collections">
                <Button variant="ghost" className="w-full">Continue Shopping</Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <ShieldCheck className="w-5 h-5 text-[#93A186]" />
                  Cash on Delivery (COD) available
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock className="w-5 h-5 text-[#93A186]" />
                  Freshly made on the day of delivery
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
