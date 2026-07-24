"use client";

import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onChange,
  className,
}: StarRatingProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  const sizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  const displayRating = hovered ?? rating;

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[...Array(maxRating)].map((_, i) => {
        const filled = i < Math.floor(displayRating);
        const half = !filled && i < displayRating;

        return (
          <Star
            key={i}
            className={cn(
              sizes[size],
              "transition-all duration-150",
              filled ? "fill-[#EB7297] text-[#EB7297]" : half ? "fill-[#F3A6B0] text-[#F3A6B0]" : "text-[#F3CBCB]",
              interactive && "cursor-pointer hover:scale-110"
            )}
            onMouseEnter={() => interactive && setHovered(i + 1)}
            onMouseLeave={() => interactive && setHovered(null)}
            onClick={() => interactive && onChange?.(i + 1)}
          />
        );
      })}
    </div>
  );
}
