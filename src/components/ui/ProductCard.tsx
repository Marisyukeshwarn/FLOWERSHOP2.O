"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import { Product } from "@/lib/data";
import { useCart, useWishlist } from "@/lib/store";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  index?: number;
}

export function ProductCard({ product, className, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const { dispatch: cartDispatch } = useCart();
  const { dispatch: wishlistDispatch, isWishlisted } = useWishlist();
  const [justAdded, setJustAdded] = React.useState(false);

  const wishlisted = isWishlisted(product.id);
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const defaultVariant = product.variants[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        id: `${product.id}-${defaultVariant.size}`,
        productId: product.id,
        name: product.name,
        image: product.images[0],
        price: defaultVariant.price,
        size: defaultVariant.size,
        thickness: "Medium",
        flower: product.flowers[0],
        quantity: 1,
        slug: product.slug,
      },
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      wishlistDispatch({ type: "REMOVE", payload: product.id });
    } else {
      wishlistDispatch({
        type: "ADD",
        payload: {
          id: product.id,
          name: product.name,
          image: product.images[0],
          price: lowestPrice,
          slug: product.slug,
          category: product.category,
        },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className={cn("group relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`}>
        <div
          className="glass-card overflow-hidden cursor-pointer"
          style={{ boxShadow: isHovered ? "0 20px 50px rgba(235,114,151,0.18)" : "0 4px 20px rgba(235,114,151,0.07)" }}
        >
          {/* Image Area */}
          <div className="relative h-64 overflow-hidden rounded-t-[24px] img-zoom-container">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Dark overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.badge && (
                <span className="badge-pink">{product.badge}</span>
              )}
              {product.freshToday && (
                <span className="badge-sage">Fresh Today</span>
              )}
            </div>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={cn(
                "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
                wishlisted
                  ? "bg-[#EB7297] text-white"
                  : "bg-white/90 text-gray-500 hover:text-[#EB7297] hover:bg-white"
              )}
            >
              <Heart className={cn("w-4 h-4", wishlisted && "fill-current")} />
            </button>

            {/* Quick view on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2"
                >
                  <span className="flex items-center gap-1.5 bg-white/95 text-[#EB7297] text-xs font-semibold px-4 py-2 rounded-full shadow-lg whitespace-nowrap">
                    <Eye className="w-3.5 h-3.5" />
                    Quick View
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Flower tags */}
            <div className="flex flex-wrap gap-1 mb-2">
              {product.flowers.slice(0, 2).map((f) => (
                <span key={f} className="text-[10px] text-[#93A186] bg-[#93A186]/10 px-2 py-0.5 rounded-full font-medium">
                  {f}
                </span>
              ))}
            </div>

            <h3 className="font-serif text-base font-semibold text-[#1A1A2E] mb-1 line-clamp-1 group-hover:text-[#EB7297] transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3 h-3",
                      i < Math.floor(product.rating) ? "fill-[#EB7297] text-[#EB7297]" : "text-[#F3CBCB]"
                    )}
                  />
                ))}
              </div>
              <span className="text-[11px] text-gray-400">({product.reviewCount})</span>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-gray-400">Starting from</p>
                <p className="text-lg font-bold text-[#EB7297]">₹{lowestPrice.toLocaleString()}</p>
              </div>

              <button
                onClick={handleAddToCart}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all",
                  justAdded
                    ? "bg-[#93A186] text-white"
                    : "btn-pink-gradient text-white"
                )}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                {justAdded ? "Added!" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
