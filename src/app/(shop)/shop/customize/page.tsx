"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Sparkles, AlertCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { customizeOptions } from "@/lib/data";
import { useCart } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function CustomizePage() {
  const router = useRouter();
  const { dispatch: cartDispatch } = useCart();
  
  // Steps: 0: Flower, 1: Color, 2: Size & Thickness, 3: Budget & Review
  const [currentStep, setCurrentStep] = useState(0);
  
  // Selections
  const [selectedFlower, setSelectedFlower] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedThickness, setSelectedThickness] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  
  // Estimate Price
  const estimatedPrice = useMemo(() => {
    if (!selectedFlower || !selectedSize || !selectedThickness) return null;
    
    const flower = customizeOptions.flowerTypes.find(f => f.id === selectedFlower);
    const size = customizeOptions.sizes.find(s => s.id === selectedSize);
    const thickness = customizeOptions.thickness.find(t => t.id === selectedThickness);
    const budget = selectedBudget ? customizeOptions.budgets.find(b => b.id === selectedBudget) : { multiplier: 1 };
    
    if (!flower || !size || !thickness || !budget) return null;
    
    // Base formula for custom mala
    const baseLengthPrice = flower.basePrice * parseFloat(size.name.replace(' ft', '')) * 10;
    const price = baseLengthPrice * thickness.multiplier * budget.multiplier;
    
    return Math.round(price);
  }, [selectedFlower, selectedSize, selectedThickness, selectedBudget]);

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 0: return !!selectedFlower;
      case 1: return !!selectedColor;
      case 2: return !!selectedSize && !!selectedThickness;
      case 3: return !!selectedBudget;
      default: return false;
    }
  };

  const handleAddToCart = () => {
    if (!estimatedPrice) return;
    
    const flowerName = customizeOptions.flowerTypes.find(f => f.id === selectedFlower)?.name || "";
    const colorName = customizeOptions.colors.find(c => c.id === selectedColor)?.name || "";
    const sizeName = customizeOptions.sizes.find(s => s.id === selectedSize)?.name || "";
    const thickName = customizeOptions.thickness.find(t => t.id === selectedThickness)?.name || "";
    
    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        id: `custom-${Date.now()}`,
        productId: "custom-mala",
        name: `Custom ${flowerName} Mala (${colorName})`,
        image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop", // placeholder for custom
        price: estimatedPrice,
        size: sizeName,
        thickness: thickName,
        flower: flowerName,
        quantity: 1,
        slug: "customize",
      }
    });
    
    router.push("/cart");
  };

  const steps = [
    { title: "Flower Type", desc: "Choose your primary bloom" },
    { title: "Color Palette", desc: "Select a color combination" },
    { title: "Dimensions", desc: "Select size and thickness" },
    { title: "Review", desc: "Finalize your design" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <div className="bg-[#1A1A2E] text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-[#EB7297]/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-1/4 w-[200px] h-[200px] bg-[#93A186]/20 rounded-full blur-[80px]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Link href="/collections" className="inline-flex items-center text-white/60 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Custom Mala Builder
          </h1>
          <p className="text-white/70 font-light max-w-xl mx-auto">
            Design your perfect garland. Our expert artisans will bring your unique vision to life for your special day.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* Stepper */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 mb-8 flex flex-col md:flex-row justify-between relative">
          {/* Progress Line */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-1 bg-gray-100 -translate-y-1/2 z-0" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-row md:flex-col items-center gap-4 md:gap-2 mb-4 md:mb-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                currentStep === idx 
                  ? "bg-[#EB7297] text-white shadow-md shadow-[#EB7297]/30" 
                  : currentStep > idx 
                    ? "bg-[#93A186] text-white" 
                    : "bg-gray-100 text-gray-400"
              }`}>
                {currentStep > idx ? <Check className="w-5 h-5" /> : idx + 1}
              </div>
              <div className="text-left md:text-center">
                <p className={`font-semibold text-sm ${currentStep === idx ? "text-[#1A1A2E]" : "text-gray-500"}`}>{step.title}</p>
                <p className="text-xs text-gray-400 hidden lg:block">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Editor */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[500px] flex flex-col"
              >
                
                {/* STEP 1: FLOWER TYPE */}
                {currentStep === 0 && (
                  <div>
                    <div className="mb-8">
                      <h2 className="font-serif text-2xl font-bold text-[#1A1A2E] mb-2">Choose Primary Flower</h2>
                      <p className="text-gray-500 text-sm">Select the main flower that will form the base of your mala.</p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {customizeOptions.flowerTypes.map(flower => (
                        <button
                          key={flower.id}
                          onClick={() => setSelectedFlower(flower.id)}
                          className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${
                            selectedFlower === flower.id 
                              ? "border-[#EB7297] bg-[#FEF0F3] shadow-md" 
                              : "border-gray-100 hover:border-[#EB7297]/40 hover:bg-gray-50"
                          }`}
                        >
                          <span className="text-4xl">{flower.emoji}</span>
                          <span className={`font-semibold ${selectedFlower === flower.id ? "text-[#EB7297]" : "text-gray-700"}`}>
                            {flower.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: COLOR */}
                {currentStep === 1 && (
                  <div>
                    <div className="mb-8">
                      <h2 className="font-serif text-2xl font-bold text-[#1A1A2E] mb-2">Color Palette</h2>
                      <p className="text-gray-500 text-sm">Select a color combination that matches your event theme.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {customizeOptions.colors.map(color => (
                        <button
                          key={color.id}
                          onClick={() => setSelectedColor(color.id)}
                          className={`p-5 rounded-2xl border-2 flex items-center justify-between transition-all ${
                            selectedColor === color.id 
                              ? "border-[#EB7297] bg-[#FEF0F3]" 
                              : "border-gray-100 hover:border-[#EB7297]/40 hover:bg-gray-50"
                          }`}
                        >
                          <span className={`font-semibold ${selectedColor === color.id ? "text-[#EB7297]" : "text-gray-700"}`}>
                            {color.name}
                          </span>
                          <div className="flex -space-x-2">
                            {color.colors.map((c, i) => (
                              <div key={i} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: c }} />
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3: SIZE & THICKNESS */}
                {currentStep === 2 && (
                  <div className="space-y-10">
                    <div>
                      <div className="mb-6">
                        <h2 className="font-serif text-2xl font-bold text-[#1A1A2E] mb-2">Dimensions</h2>
                        <p className="text-gray-500 text-sm">Select the length of the garland (drop length from neck).</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {customizeOptions.sizes.map(size => (
                          <button
                            key={size.id}
                            onClick={() => setSelectedSize(size.id)}
                            className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                              selectedSize === size.id 
                                ? "border-[#EB7297] bg-[#FEF0F3] text-[#EB7297]" 
                                : "border-gray-100 text-gray-600 hover:border-[#EB7297]/40"
                            }`}
                          >
                            {size.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-6">
                        <h2 className="font-serif text-xl font-bold text-[#1A1A2E] mb-2">Thickness Style</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {customizeOptions.thickness.map(thick => (
                          <button
                            key={thick.id}
                            onClick={() => setSelectedThickness(thick.id)}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                              selectedThickness === thick.id 
                                ? "border-[#EB7297] bg-[#FEF0F3]" 
                                : "border-gray-100 hover:border-[#EB7297]/40"
                            }`}
                          >
                            <span className={`block font-semibold mb-1 ${selectedThickness === thick.id ? "text-[#EB7297]" : "text-gray-800"}`}>
                              {thick.name}
                            </span>
                            <span className="text-xs text-gray-500">{thick.description}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: BUDGET & REVIEW */}
                {currentStep === 3 && (
                  <div>
                    <div className="mb-8">
                      <h2 className="font-serif text-2xl font-bold text-[#1A1A2E] mb-2">Final Details</h2>
                      <p className="text-gray-500 text-sm">Select your budget range. This helps us decide the density of premium flowers vs filler flowers.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                      {customizeOptions.budgets.map(budget => (
                        <button
                          key={budget.id}
                          onClick={() => setSelectedBudget(budget.id)}
                          className={`p-5 rounded-2xl border-2 text-left transition-all ${
                            selectedBudget === budget.id 
                              ? "border-[#EB7297] bg-[#FEF0F3]" 
                              : "border-gray-100 hover:border-[#EB7297]/40"
                          }`}
                        >
                          <span className={`block font-semibold mb-1 ${selectedBudget === budget.id ? "text-[#EB7297]" : "text-gray-800"}`}>
                            {budget.name} Level
                          </span>
                          <span className="text-sm font-medium text-gray-600 block">{budget.range}</span>
                        </button>
                      ))}
                    </div>

                    <div className="bg-[#FEF0F3]/50 p-6 rounded-2xl border border-[#F3CBCB] flex items-start gap-4">
                      <AlertCircle className="w-6 h-6 text-[#EB7297] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-[#1A1A2E] mb-1">Custom Order Note</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          The generated price is an estimate based on your selections. For highly complex custom designs or rare flower requests, our design team will contact you after order placement to confirm exact pricing and availability.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-auto pt-8 flex justify-between">
                  <Button 
                    variant="ghost" 
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={currentStep === 0 ? "opacity-0 pointer-events-none" : ""}
                  >
                    Back
                  </Button>
                  
                  {currentStep < 3 ? (
                    <Button 
                      onClick={handleNext} 
                      disabled={!isStepComplete(currentStep)}
                    >
                      Continue to Next Step
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleAddToCart}
                      disabled={!isStepComplete(3)}
                      className="bg-[#93A186] hover:bg-[#7a8a6e] shadow-lg shadow-[#93A186]/30 border-none"
                    >
                      <Sparkles className="w-4 h-4 mr-2" /> Book Custom Mala
                    </Button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Live Preview & Estimate */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-serif text-xl font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#EB7297]" /> Your Design
              </h3>
              
              {/* Image Preview Mockup */}
              <div className="w-full h-48 bg-gray-50 rounded-2xl border border-gray-200 mb-6 flex flex-col items-center justify-center relative overflow-hidden group">
                {selectedFlower ? (
                   <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#FEF0F3] to-white p-4">
                      <div className="text-6xl animate-bounce" style={{ animationDuration: '3s' }}>
                        {customizeOptions.flowerTypes.find(f => f.id === selectedFlower)?.emoji}
                      </div>
                      <p className="text-sm font-semibold text-[#EB7297]">Custom Blueprint Generated</p>
                   </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-2">
                      <Sparkles className="w-5 h-5 text-gray-300" />
                    </div>
                    <span className="text-sm text-gray-400 font-medium">Preview will appear here</span>
                  </>
                )}
              </div>

              {/* Selections List */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-sm text-gray-500">Flower</span>
                  <span className="text-sm font-semibold text-[#1A1A2E]">
                    {selectedFlower ? customizeOptions.flowerTypes.find(f => f.id === selectedFlower)?.name : "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-sm text-gray-500">Color</span>
                  <span className="text-sm font-semibold text-[#1A1A2E]">
                    {selectedColor ? customizeOptions.colors.find(c => c.id === selectedColor)?.name : "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-sm text-gray-500">Size</span>
                  <span className="text-sm font-semibold text-[#1A1A2E]">
                    {selectedSize ? customizeOptions.sizes.find(s => s.id === selectedSize)?.name : "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-sm text-gray-500">Thickness</span>
                  <span className="text-sm font-semibold text-[#1A1A2E]">
                    {selectedThickness ? customizeOptions.thickness.find(t => t.id === selectedThickness)?.name : "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="text-sm text-gray-500">Budget Tier</span>
                  <span className="text-sm font-semibold text-[#1A1A2E]">
                    {selectedBudget ? customizeOptions.budgets.find(b => b.id === selectedBudget)?.name : "—"}
                  </span>
                </div>
              </div>

              {/* Price Estimate */}
              <div className="bg-[#1A1A2E] text-white p-5 rounded-2xl mb-4">
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Estimated Price</p>
                {estimatedPrice ? (
                  <p className="text-3xl font-bold font-serif">₹{estimatedPrice.toLocaleString()}</p>
                ) : (
                  <p className="text-lg font-medium text-white/40">Complete selections</p>
                )}
              </div>
              
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
                <PhoneCall className="w-3.5 h-3.5" /> Need help? <a href="tel:+919843166477" className="font-semibold text-[#EB7297] hover:underline">+91 98431 66477</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
