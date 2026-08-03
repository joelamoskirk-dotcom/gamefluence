'use client';

import React from 'react';

interface WordmarkProps {
  className?: string;
  variant?: 'white' | 'gradient';
  height?: number;
}

export default function Wordmark({ className = '', variant = 'white', height = 24 }: WordmarkProps) {
  const id = React.useId();
  const gradientId = `wordmark-grad-${id}`;

  return (
    <svg
      viewBox="0 0 280 32"
      height={height}
      className={className}
      aria-label="Gamefluence"
      role="img"
    >
      {variant === 'gradient' && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5B2FD6" />
            <stop offset="55%" stopColor="#B845C4" />
            <stop offset="100%" stopColor="#E0518C" />
          </linearGradient>
        </defs>
      )}
      <text
        x="0"
        y="24"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="700"
        fontSize="26"
        letterSpacing="-0.02em"
        fill={variant === 'gradient' ? `url(#${gradientId})` : '#FFFFFF'}
      >
        Gamefluence
      </text>
    </svg>
  );
}
