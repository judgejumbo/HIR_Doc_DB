import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonGridProps {
  count?: number;
  className?: string;
}

const SkeletonGrid = ({ count = 12, className = "" }: SkeletonGridProps) => {
  return (
    <div className={`bg-background w-full ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
          >
            <div className="p-4 flex flex-col h-[220px]">
              {/* Document icon/thumbnail skeleton */}
              <div className="flex justify-center mb-4">
                <Skeleton className="h-16 w-16 rounded-md" />
              </div>

              {/* Document title skeleton */}
              <Skeleton className="h-5 w-3/4 mb-2" />

              {/* Document type badge skeleton */}
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4 rounded-full" />
              </div>

              {/* Last modified timestamp skeleton */}
              <div className="mt-auto">
                <Skeleton className="h-3 w-2/3" />
              </div>

              {/* Glassmorphism overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/10 to-slate-900/30 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonGrid;
