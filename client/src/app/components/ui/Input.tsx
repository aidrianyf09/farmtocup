import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded border font-body text-sm text-[#1E1008] bg-white',
            'border-[#8B5E3C]/30 focus:outline-none focus:border-[#4A2C17] focus:ring-1 focus:ring-[#4A2C17]',
            'placeholder:text-[#8B5E3C]/50 transition-colors',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-600 font-body">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
