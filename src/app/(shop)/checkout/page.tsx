"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ShieldCheck, MapPin, Calendar, CreditCard, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/Button";

export default function CheckoutPage() {
  const router = useRouter();
  const { state, subtotal, total, deliveryCharge, taxes, dispatch } = useCart();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "Madurai",
    pincode: "",
    deliveryDate: "",
    deliveryTime: "09:00",
    specialInstructions: "",
  });

  const [orderId, setOrderId] = useState("");

  React.useEffect(() => {
    if (state.items.length === 0 && step === 1) {
      router.push("/cart");
    }
  }, [state.items.length, step, router]);

  if (state.items.length === 0 && step === 1) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Payment processing state
    
    try {
      const generatedOrderId = "ORD-" + crypto.randomUUID().split("-")[0].toUpperCase();
      
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: generatedOrderId,
          total,
          items: state.items.map(i => ({
            name: i.name,
            qty: i.quantity,
            size: i.size,
            price: i.price,
            image: i.image
          })),
          customerDetails: formData
        })
      });
      
      setOrderId(generatedOrderId);
      setTimeout(() => {
        dispatch({ type: "CLEAR_CART" });
        setStep(4); // Success state
      }, 1000);
    } catch (error) {
      console.error("Order failed", error);
      setStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {step < 4 && (
          <Link href="/cart" className="inline-flex items-center text-gray-500 hover:text-[#EB7297] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cart
          </Link>
        )}

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10 max-w-xl mx-auto">
          {[
            { id: 1, name: "Delivery" },
            { id: 2, name: "Payment" },
            { id: 3, name: step === 4 ? "Confirmed" : "Processing" }
          ].map((s, idx) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  step > s.id || (step === 4 && s.id === 3) ? 'bg-[#93A186] text-white' 
                  : step === s.id ? 'bg-[#EB7297] text-white'
                  : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > s.id || (step === 4 && s.id === 3) ? <Check className="w-4 h-4" /> : s.id}
                </div>
                <span className={`text-xs mt-2 font-medium transition-colors ${
                  step >= s.id ? 'text-[#1A1A2E]' : 'text-gray-400'
                }`}>{s.name}</span>
              </div>
              {idx < 2 && (
                <div className={`flex-1 h-[2px] mx-2 sm:mx-4 transition-colors ${
                  step > s.id ? 'bg-[#93A186]' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Checkout Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* STEP 1: Delivery Details */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10"
                >
                  <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                    <div className="w-12 h-12 rounded-full bg-[#FEF0F3] text-[#EB7297] flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[#1A1A2E]">Delivery Details</h2>
                      <p className="text-gray-500 text-sm">Where should we send your fresh flowers?</p>
                    </div>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                        <input id="firstName" required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EB7297]/20 focus:border-[#EB7297] transition-all" />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                        <input id="lastName" required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EB7297]/20 focus:border-[#EB7297] transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input id="email" required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EB7297]/20 focus:border-[#EB7297] transition-all" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input id="phone" required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EB7297]/20 focus:border-[#EB7297] transition-all" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address</label>
                      <textarea id="address" required name="address" rows={3} value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EB7297]/20 focus:border-[#EB7297] transition-all resize-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                        <select id="city" disabled name="city" value={formData.city} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed">
                          <option value="Madurai">Madurai (Currently only serving Madurai)</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="pincode" className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                        <input id="pincode" required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EB7297]/20 focus:border-[#EB7297] transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6 mt-6">
                      <div>
                        <label htmlFor="deliveryDate" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#EB7297]" /> Delivery Date
                        </label>
                        <input id="deliveryDate" required type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleInputChange} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EB7297]/20 focus:border-[#EB7297] transition-all" />
                      </div>
                      <div>
                        <label htmlFor="deliveryTime" className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time</label>
                        <select id="deliveryTime" required name="deliveryTime" value={formData.deliveryTime} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EB7297]/20 focus:border-[#EB7297] transition-all">
                          <option value="09:00">Morning (9 AM - 12 PM)</option>
                          <option value="13:00">Afternoon (1 PM - 4 PM)</option>
                          <option value="17:00">Evening (5 PM - 8 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-6">
                      <Button type="submit" size="lg" className="w-full md:w-auto shadow-lg shadow-[#EB7297]/20">
                        Continue to Payment <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 2: Payment */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10"
                >
                  <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                    <div className="w-12 h-12 rounded-full bg-[#eef4ea] text-[#93A186] flex items-center justify-center">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[#1A1A2E]">Payment Method</h2>
                      <p className="text-gray-500 text-sm">Select payment option for your order</p>
                    </div>
                  </div>

                  <form onSubmit={handlePayment} className="space-y-6">
                    {/* Payment Options */}
                    <div className="space-y-4">
                      {/* Cash on Delivery (Active & Selected) */}
                      <label className="flex items-start p-4 rounded-2xl border-2 border-[#EB7297] bg-[#FEF0F3]/30 cursor-pointer transition-all">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          defaultChecked
                          className="mt-1 accent-[#EB7297] w-4 h-4"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#1A1A2E]">Cash on Delivery (COD)</span>
                            <span className="bg-[#93A186] text-white text-xs px-2.5 py-0.5 rounded-full font-semibold">Available</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            Pay in cash when your fresh flower mala is delivered to your doorstep.
                          </p>
                        </div>
                      </label>

                      {/* Online Payment (Disabled / Unavailable notice) */}
                      <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50 opacity-80">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-500 flex items-center gap-2">
                            Online Payment (UPI / Credit Card / Net Banking)
                          </span>
                          <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">Unavailable</span>
                        </div>
                        <p className="text-xs text-amber-800 font-medium mt-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200/60">
                          ⚠️ Online payments are currently disabled. Only <strong>Cash on Delivery (COD)</strong> is accepted.
                        </p>
                      </div>
                    </div>

                    {/* No Cancellation Policy Banner */}
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
                      <p className="font-bold text-rose-950 flex items-center gap-1.5 text-sm">
                        🚫 No Cancellation Policy
                      </p>
                      <p>
                        <strong>No cancellation is available once an order is placed.</strong> All garlands and malas are handcrafted fresh specifically for your scheduled event date.
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Total Payable Amount</p>
                        <p className="text-xs font-medium text-gray-700">Cash on Delivery</p>
                      </div>
                      <span className="text-2xl font-bold text-[#EB7297]">₹{total.toLocaleString()}</span>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-full md:w-auto">
                        Back
                      </Button>
                      <Button type="submit" size="lg" className="w-full flex-1 shadow-lg shadow-[#EB7297]/20">
                        <Check className="w-4 h-4 mr-2" /> Place Order (Cash on Delivery)
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 3: Processing */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center"
                >
                  <div className="w-20 h-20 border-4 border-[#FEF0F3] border-t-[#EB7297] rounded-full animate-spin mx-auto mb-6" />
                  <h2 className="font-serif text-2xl font-bold text-[#1A1A2E] mb-2">Confirming Order...</h2>
                  <p className="text-gray-500">Please wait while we record your Cash on Delivery order</p>
                </motion.div>
              )}

              {/* STEP 4: Success */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 md:p-16 text-center"
                >
                  <div className="w-24 h-24 bg-[#eef4ea] text-[#93A186] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <Check className="w-12 h-12" />
                  </div>
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4">Order Confirmed!</h1>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Thank you for your order. We've sent a confirmation email to <strong>{formData.email}</strong> with your order details and delivery schedule.
                  </p>
                  
                  <div className="bg-gray-50 rounded-2xl p-6 inline-block mb-10 border border-gray-100 text-left w-full max-w-sm">
                    <p className="text-sm text-gray-500 mb-1">Order Number</p>
                    <p className="font-bold text-[#1A1A2E] mb-3 text-lg">{orderId}</p>

                    <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                    <p className="font-semibold text-[#EB7297] mb-3">Cash on Delivery (COD)</p>
                    
                    <p className="text-sm text-gray-500 mb-1">Delivery Date</p>
                    <p className="font-semibold text-[#1A1A2E] mb-3">{new Date(formData.deliveryDate || Date.now()).toLocaleDateString('en-IN', { dateStyle: 'medium'})}</p>

                    <div className="pt-3 border-t border-gray-200 text-xs text-rose-700 font-medium">
                      ⚠️ No cancellation available once order is placed.
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/dashboard/orders">
                      <Button variant="outline" className="w-full">Track Order</Button>
                    </Link>
                    <Link href="/">
                      <Button className="w-full">Return Home</Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Order Summary (Hide on success step) */}
          {step < 3 && (
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-28">
                <h3 className="font-serif text-xl font-bold text-[#1A1A2E] mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {state.items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-[#1A1A2E] truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500 mb-1">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold text-[#EB7297]">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Taxes</span>
                    <span>₹{taxes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery</span>
                    <span>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-2">
                    <span className="font-bold text-[#1A1A2E]">Total</span>
                    <span className="font-bold text-xl text-[#EB7297]">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-[#93A186]" /> SSL Secure Checkout
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
