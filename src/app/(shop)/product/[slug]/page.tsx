"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, ShoppingBag, Truck, ShieldCheck, 
  Leaf, Info, CheckCircle2, ChevronRight, Share2 
} from "lucide-react";
import { getRelatedProducts } from "@/lib/data";
import { useCart, useWishlist, useProducts } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { ProductCard } from "@/components/ui/ProductCard";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const { state: productsState } = useProducts();
  const product = productsState.items.find((p) => p.slug === slug);
  const relatedProducts = product ? getRelatedProducts(product, 4) : [];

  const { dispatch: cartDispatch } = useCart();
  const { dispatch: wishlistDispatch, isWishlisted } = useWishlist();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [shareText, setShareText] = useState("Share");

  if (!product) {
    if (productsState.isLoading) {
      return (
        <div className="min-h-screen pt-32 pb-16 px-4 flex flex-col items-center justify-center bg-[#FAFAFA]">
          <div className="w-10 h-10 border-4 border-[#FEF0F3] border-t-[#EB7297] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading product details...</p>
        </div>
      );
    }

    return (
      <div className="min-h-screen pt-32 pb-16 px-4 flex flex-col items-center justify-center bg-[#FAFAFA]">
        <h1 className="font-serif text-3xl font-bold text-[#1A1A2E] mb-4">Product Not Found</h1>
        <Button onClick={() => router.push("/collections")}>Back to Shop</Button>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    
    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        id: `${product.id}-${selectedVariant.size}`,
        productId: product.id,
        name: product.name,
        image: product.images[0],
        price: selectedVariant.price,
        size: selectedVariant.size,
        thickness: "Medium", // default
        flower: product.flowers[0], // default
        quantity: quantity,
        slug: product.slug,
      },
    });
    
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleWishlist = () => {
    if (wishlisted) {
      wishlistDispatch({ type: "REMOVE", payload: product.id });
    } else {
      wishlistDispatch({
        type: "ADD",
        payload: {
          id: product.id,
          name: product.name,
          image: product.images[0],
          price: product.variants[0].price,
          slug: product.slug,
          category: product.category,
        },
      });
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} at MAHALAKSHMI Bloom Studio`,
          url: url,
        });
      } catch (err) {
        // user cancelled or share failed, fallback to copy
        navigator.clipboard.writeText(url);
        setShareText("Copied!");
        setTimeout(() => setShareText("Share"), 2000);
      }
    } else {
      navigator.clipboard.writeText(url);
      setShareText("Copied!");
      setTimeout(() => setShareText("Share"), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
          <button onClick={() => router.push("/")} className="hover:text-[#EB7297] transition-colors">Home</button>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <button onClick={() => router.push("/collections")} className="hover:text-[#EB7297] transition-colors">Collections</button>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <button onClick={() => router.push(`/collections?category=${product.category}`)} className="capitalize hover:text-[#EB7297] transition-colors">{product.category}</button>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <span className="text-[#1A1A2E] font-medium truncate">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          
          {/* Left: Images */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-[4/5] md:aspect-square bg-gray-100 rounded-[2rem] overflow-hidden shadow-sm"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && <span className="badge-pink">{product.badge}</span>}
                {product.freshToday && <span className="badge-sage">Fresh Today</span>}
              </div>
              
              <button
                onClick={handleWishlist}
                className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
              >
                <Heart className={`w-6 h-6 transition-colors ${wishlisted ? "fill-[#EB7297] text-[#EB7297]" : "text-gray-400 hover:text-[#EB7297]"}`} />
              </button>
            </motion.div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-24 h-24 rounded-xl overflow-hidden shrink-0 transition-all ${
                      activeImage === idx ? "ring-2 ring-[#EB7297] ring-offset-2" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[#93A186] font-semibold text-sm uppercase tracking-wider">{product.subcategory || product.category} Collection</p>
                <button onClick={handleShare} className="text-gray-400 hover:text-[#EB7297] transition-colors flex items-center gap-1 text-sm">
                  <Share2 className="w-4 h-4" /> {shareText}
                </button>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <StarRating rating={product.rating} />
                <span className="text-sm text-gray-500 underline underline-offset-4 cursor-pointer hover:text-[#EB7297] transition-colors">
                  {product.reviewCount} Reviews
                </span>
              </div>
              
              <div className="text-3xl font-bold text-[#EB7297] mb-2">
                ₹{selectedVariant?.price.toLocaleString()}
              </div>
              <p className="text-gray-500 leading-relaxed mb-6">
                {product.shortDescription}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-6 mb-8">
              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-[#1A1A2E]">Select Size</h3>
                  <button className="text-xs text-[#EB7297] hover:underline flex items-center gap-1">
                    <Info className="w-3 h-3" /> Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant: any) => (
                    <button
                      key={variant.size}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-5 py-2.5 rounded-xl border-2 font-semibold transition-all ${
                        selectedVariant?.size === variant.size 
                          ? "border-[#EB7297] bg-[#FEF0F3] text-[#EB7297]" 
                          : "border-gray-200 text-gray-600 hover:border-[#EB7297]/40"
                      }`}
                    >
                      {variant.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="font-semibold text-[#1A1A2E] mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#1A1A2E] transition-colors rounded-lg hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#1A1A2E] transition-colors rounded-lg hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {selectedVariant?.stock && selectedVariant.stock < 10 
                      ? <span className="text-orange-500 font-medium">Only {selectedVariant.stock} left</span> 
                      : "In Stock"
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-10">
              <Button 
                size="lg" 
                onClick={handleAddToCart}
                className={`flex-1 ${justAdded ? "bg-[#93A186] text-white" : ""}`}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {justAdded ? "Added to Cart" : "Add to Cart"}
              </Button>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-gray-100 py-6 mb-8">
              <div className="flex flex-col items-center justify-center text-center gap-2 px-2">
                <div className="w-10 h-10 rounded-full bg-[#FEF0F3] text-[#EB7297] flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-[#1A1A2E]">Freshly Picked</p>
                <p className="text-[10px] text-gray-500">Sourced daily</p>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-2 px-2 border-l border-r border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#F3F4F6] text-gray-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-[#1A1A2E]">Premium Quality</p>
                <p className="text-[10px] text-gray-500">Handcrafted design</p>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-2 px-2">
                <div className="w-10 h-10 rounded-full bg-[#eef4ea] text-[#93A186] flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-[#1A1A2E]">Same Day Delivery</p>
                <p className="text-[10px] text-gray-500">In Coimbatore</p>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-24">
          <div className="flex gap-8 border-b border-gray-200 mb-8">
            <button 
              onClick={() => setActiveTab("description")}
              className={`pb-4 font-semibold transition-all relative ${activeTab === "description" ? "text-[#EB7297]" : "text-gray-500 hover:text-gray-800"}`}
            >
              Description
              {activeTab === "description" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EB7297]" />}
            </button>
            <button 
              onClick={() => setActiveTab("details")}
              className={`pb-4 font-semibold transition-all relative ${activeTab === "details" ? "text-[#EB7297]" : "text-gray-500 hover:text-gray-800"}`}
            >
              Product Details
              {activeTab === "details" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EB7297]" />}
            </button>
            <button 
              onClick={() => setActiveTab("care")}
              className={`pb-4 font-semibold transition-all relative ${activeTab === "care" ? "text-[#EB7297]" : "text-gray-500 hover:text-gray-800"}`}
            >
              Care Instructions
              {activeTab === "care" && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EB7297]" />}
            </button>
          </div>

          <div className="max-w-3xl">
            {activeTab === "description" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose prose-pink max-w-none">
                <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Every MAHALAKSHMI mala is a work of art, meticulously hand-tied by our expert artisans who have practiced the craft for generations. We use only the finest export-quality blooms, ensuring your garland not only looks breathtaking but carries an enchanting fragrance throughout your event.
                </p>
              </motion.div>
            )}
            
            {activeTab === "details" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="grid grid-cols-3 border-b border-gray-100 pb-3">
                  <span className="text-gray-500">Flowers Used</span>
                  <span className="col-span-2 font-medium text-[#1A1A2E]">{product.flowers.join(", ")}</span>
                </div>
                <div className="grid grid-cols-3 border-b border-gray-100 pb-3">
                  <span className="text-gray-500">Ideal For</span>
                  <span className="col-span-2 font-medium text-[#1A1A2E]">{product.occasion.join(", ")}</span>
                </div>
                <div className="grid grid-cols-3 border-b border-gray-100 pb-3">
                  <span className="text-gray-500">Estimated Life</span>
                  <span className="col-span-2 font-medium text-[#1A1A2E]">{product.estimatedLife} (depending on climate)</span>
                </div>
                <div className="grid grid-cols-3 pb-3">
                  <span className="text-gray-500">Weight</span>
                  <span className="col-span-2 font-medium text-[#1A1A2E]">{product.weight || "Varies by size"}</span>
                </div>
              </motion.div>
            )}

            {activeTab === "care" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#93A186] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#1A1A2E] mb-1">Keep it cool</h4>
                    <p className="text-gray-600">Store the mala in a cool, air-conditioned room until the event begins to maintain freshness.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#93A186] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#1A1A2E] mb-1">Sprinkle water lightly</h4>
                    <p className="text-gray-600">If storing for more than 4 hours, lightly mist with water (do not soak) and keep in the provided breathable box.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#93A186] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#1A1A2E] mb-1">Avoid direct sunlight</h4>
                    <p className="text-gray-600">Keep away from direct heat and sunlight before wearing to prevent petals from wilting prematurely.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-3xl font-bold text-[#1A1A2E]">You May Also Like</h2>
              <button onClick={() => router.push(`/collections?category=${product.category}`)} className="text-[#EB7297] font-semibold hover:underline hidden sm:block">
                View Collection
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
