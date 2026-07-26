"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Trash2, Heart, ShoppingBag } from "lucide-react";
import { useWishlist, useCart } from "@/lib/store";
import { Button } from "@/components/ui/Button";

export default function WishlistPage() {
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();

  const handleRemove = (id: string) => {
    wishlistDispatch({ type: "REMOVE", payload: id });
  };

  const handleMoveToCart = (item: any) => {
    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        id: `${item.id}-default`,
        productId: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        size: "Standard",
        thickness: "Medium",
        flower: "Standard",
        quantity: 1,
        slug: item.slug,
      },
    });
    wishlistDispatch({ type: "REMOVE", payload: item.id });
  };

  if (wishlistState.items.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="w-20 h-20 bg-[#FEF0F3] rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-8 h-8 text-[#EB7297]" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#1A1A2E] mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Save your favorite floral designs here to easily find them later for your special event.
        </p>
        <Link href="/collections">
          <Button>Explore Collections</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#1A1A2E]">My Wishlist</h2>
          <p className="text-gray-500 text-sm mt-1">{wishlistState.items.length} items saved</p>
        </div>
        <button 
          onClick={() => wishlistDispatch({ type: "CLEAR" })}
          className="text-sm font-semibold text-gray-400 hover:text-red-500 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {wishlistState.items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group border border-gray-100 rounded-2xl p-4 flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gray-50">
                <Link href={`/product/${item.slug}`}>
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </Link>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 flex flex-col">
                <p className="text-xs text-[#93A186] font-semibold uppercase tracking-wider mb-1">{item.category}</p>
                <Link href={`/product/${item.slug}`}>
                  <h3 className="font-serif font-bold text-[#1A1A2E] line-clamp-1 hover:text-[#EB7297] transition-colors mb-2">
                    {item.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between mt-auto pt-4">
                  <p className="font-bold text-[#EB7297]">₹{item.price.toLocaleString()}</p>
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#1A1A2E] hover:bg-[#EB7297] hover:text-white transition-colors"
                    title="Move to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
