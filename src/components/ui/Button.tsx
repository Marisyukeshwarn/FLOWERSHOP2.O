"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'sage';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, loading, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB7297] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none font-sans";

    const variants = {
      primary: "btn-pink-gradient text-white shadow-lg",
      secondary: "bg-[#F3CBCB] text-[#EB7297] hover:bg-[#F3A6B0] hover:text-white",
      outline: "border-2 border-[#EB7297] text-[#EB7297] hover:bg-[#EB7297] hover:text-white bg-transparent",
      ghost: "text-[#EB7297] hover:bg-[#FEF0F3]",
      sage: "btn-sage-gradient text-white shadow-md",
    };

    const sizes = {
      sm: "h-9 px-5 text-sm gap-1.5",
      md: "h-11 px-7 text-sm gap-2",
      lg: "h-13 px-9 text-base gap-2",
      xl: "h-15 px-12 text-lg gap-2.5",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.03 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
