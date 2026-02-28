import React from 'react';
import { cn } from '../../lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse bg-[#8B5E3C]/10 rounded', className)} />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="p-5 flex flex-col gap-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between items-center mt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-10 w-28 rounded" />
        </div>
      </div>
    </div>
  );
}
