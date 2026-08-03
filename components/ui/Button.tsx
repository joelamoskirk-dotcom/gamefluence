'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'default';
  size?: 'default' | 'sm' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', disabled, ...props }, ref) => {
    const base = [
      'inline-flex items-center justify-center font-medium',
      'transition-all duration-micro ease-brand',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--label)] focus-visible:outline-offset-2',
      'min-h-[44px] rounded-md',
      'disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:scale-100',
    ].join(' ');

    const variants: Record<string, string> = {
      primary: [
        'bg-action text-white',
        'hover:bg-action-hover',
        'active:bg-action-active active:scale-[.98]',
      ].join(' '),
      default: [
        'bg-action text-white',
        'hover:bg-action-hover',
        'active:bg-action-active active:scale-[.98]',
      ].join(' '),
      secondary: [
        'bg-ink-600 text-t-hi border border-line-hi',
        'hover:bg-ink-700 hover:border-label',
        'active:scale-[.98]',
      ].join(' '),
      outline: [
        'bg-ink-600 text-t-hi border border-line-hi',
        'hover:bg-ink-700 hover:border-label',
        'active:scale-[.98]',
      ].join(' '),
      ghost: [
        'bg-transparent text-label border-none',
        'hover:underline',
        'active:scale-[.98]',
      ].join(' '),
    };

    const sizes: Record<string, string> = {
      default: 'h-11 px-6 py-3 text-sm',
      sm: 'h-9 px-4 py-2 text-xs',
      lg: 'h-12 px-8 py-3 text-base',
    };

    return (
      <button
        className={cn(base, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
