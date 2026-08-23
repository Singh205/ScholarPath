import React from 'react';
import { cn } from '../../lib/utils';

export interface ProgressProps {
  value: number;
  max?: number;
  variant?: 'brand' | 'safe' | 'warning' | 'danger';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = 'brand',
  className,
  size = 'md',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const colors = {
    brand: 'bg-brand-600',
    safe: 'bg-safe-600',
    warning: 'bg-warning-500',
    danger: 'bg-danger-600',
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full bg-slate-100 rounded-full overflow-hidden', sizes[size], className)}>
      <div
        className={cn('h-full transition-all duration-500 ease-out rounded-full', colors[variant])}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
