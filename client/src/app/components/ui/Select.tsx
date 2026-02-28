import React from 'react';
import { cn } from '../../lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-label text-xs font-semibold uppercase tracking-wider text-[#4A2C17]">
          {label}
        </label>
      )}
      <select
        className={cn(
          'w-full px-4 py-3 rounded border font-body text-sm text-[#1E1008] bg-white',
          'border-[#8B5E3C]/30 focus:outline-none focus:border-[#4A2C17] focus:ring-1 focus:ring-[#4A2C17]',
          'transition-colors appearance-none cursor-pointer',
          error && 'border-red-500',
          className
        )}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600 font-body">{error}</p>}
    </div>
  );
}
