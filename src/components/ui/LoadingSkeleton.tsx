import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("skeleton", className)}
      {...props}
    />
  );
}

export function ProductSkeleton() {
  return (
    <div className="glass-card overflow-hidden h-[420px] flex flex-col">
      <Skeleton className="w-full h-64 rounded-t-[24px] rounded-b-none" />
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="flex gap-2">
          <Skeleton className="h-4 w-12 rounded-full" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/4 rounded-md mt-1" />
        <div className="mt-auto flex justify-between items-end">
          <div className="space-y-1">
            <Skeleton className="h-3 w-16 rounded-sm" />
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}
