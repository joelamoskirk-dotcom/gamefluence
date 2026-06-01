// GFLogo — Gamefluence wordmark + icon
// onDark: white wordmark | onLight: gradient wordmark
// Uses Space Grotesk 700, -0.5px letter-spacing

import React from 'react';
import GFIcon from './GFIcon';

interface GFLogoProps {
  onDark?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  showIcon?: boolean;
  className?: string;
}

export default function GFLogo({
  onDark = true,
  size = 'md',
  showTagline = false,
  showIcon = true,
  className = '',
}: GFLogoProps) {
  const sizes = {
    sm: { icon: 20, text: 'text-lg', tagline: 'text-[10px]' },
    md: { icon: 28, text: 'text-2xl', tagline: 'text-xs' },
    lg: { icon: 40, text: 'text-4xl', tagline: 'text-sm' },
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {showIcon && <GFIcon size={s.icon} animate={false} />}
      <div>
        <span
          className={`font-bold tracking-tight ${s.text}`}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '-0.5px',
            ...(onDark
              ? { color: '#FFFFFF' }
              : {
                  background: 'linear-gradient(135deg, #9333EA, #EC4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }),
          }}
        >
          Gamefluence
        </span>
        {showTagline && (
          <p
            className={`${s.tagline} uppercase tracking-widest`}
            style={{ color: onDark ? '#A855F7' : '#7C3AED' }}
          >
            The gaming influencer layer for APAC
          </p>
        )}
      </div>
    </div>
  );
}
