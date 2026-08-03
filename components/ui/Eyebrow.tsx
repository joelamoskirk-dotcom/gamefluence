import React from 'react';
import { cn } from '@/lib/utils';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export default function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'font-mono text-[11px] font-normal tracking-[0.16em] uppercase text-label',
        className
      )}
    >
      {children}
    </span>
  );
}
