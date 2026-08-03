'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  mode?: 'base' | 'band' | 'gradient';
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ mode = 'base', children, className, id }: SectionProps) {
  const modeStyles: Record<string, string> = {
    base: 'bg-ink-900',
    band: 'bg-ink-850',
    gradient: '',
  };

  const gradientStyle = mode === 'gradient'
    ? { background: 'var(--gradient)' }
    : undefined;

  if (process.env.NODE_ENV === 'development' && mode === 'gradient') {
    // Dev-time guard: warn if multiple gradient sections render
    if (typeof window !== 'undefined') {
      const existing = document.querySelectorAll('[data-section-gradient]');
      if (existing.length > 0) {
        console.warn(
          '[Section] More than one mode="gradient" section is rendering on this page. ' +
          'The design system allows at most one gradient section per page.'
        );
      }
    }
  }

  return (
    <section
      id={id}
      className={cn('w-full', modeStyles[mode], className)}
      style={gradientStyle}
      data-section-gradient={mode === 'gradient' ? '' : undefined}
    >
      {children}
    </section>
  );
}
