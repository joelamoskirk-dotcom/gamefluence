import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none touch-target';
    
    const variantClasses = {
      default: 'bg-primary text-white hover:bg-primary/90 hover:shadow-md active:scale-95',
      secondary: 'bg-secondary text-white hover:bg-secondary/90 hover:shadow-md active:scale-95',
      outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm active:scale-95',
      ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:scale-95',
    };
    
    const sizeClasses = {
      default: 'h-10 py-2 px-4 min-w-[44px]',
      sm: 'h-9 px-3 text-xs min-w-[36px]',
      lg: 'h-11 px-8 text-base min-w-[48px]',
    };

    return (
      <button
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };