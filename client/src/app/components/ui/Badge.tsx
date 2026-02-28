import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'green' | 'roasted';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-[#8B5E3C]/10 text-[#8B5E3C]',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    green: 'bg-[#4A7C59]/10 text-[#4A7C59]',
    roasted: 'bg-[#4A2C17]/10 text-[#4A2C17]',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-label font-semibold uppercase tracking-wider',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
