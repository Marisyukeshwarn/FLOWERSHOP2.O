import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "pink" | "sage" | "outline" | "ghost";
  children: React.ReactNode;
}

export function Badge({ variant = "pink", className, children, ...props }: BadgeProps) {
  const variants = {
    pink: "badge-pink",
    sage: "badge-sage",
    outline: "border border-[#EB7297] text-[#EB7297] bg-transparent text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider",
    ghost: "bg-[#FEF0F3] text-[#EB7297] text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider",
  };

  return (
    <span className={cn(variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
