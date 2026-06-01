// GFIcon — Gamefluence brand icon with live pulse animation
// Purple rings, white play arrow, dark container (#1A0A2E)
// Scale: outer ring hidden below 20px, full mark at 40px+

import React from 'react';

interface GFIconProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function GFIcon({ size = 40, className = '', animate = true }: GFIconProps) {
  const showOuterRing = size >= 20;
  const showMiddleRing = size >= 28;
  const id = `gf-icon-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Dark container */}
      <circle cx="20" cy="20" r="20" fill="#1A0A2E" />

      {/* Outer dashed ring */}
      {showOuterRing && (
        <circle
          cx="20"
          cy="20"
          r="17"
          stroke="url(#outer-gradient)"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity={animate ? undefined : 0.6}
          className={animate ? 'animate-spin' : ''}
          style={animate ? { animationDuration: '12s' } : undefined}
        />
      )}

      {/* Middle ring */}
      {showMiddleRing && (
        <circle
          cx="20"
          cy="20"
          r="13"
          stroke="url(#middle-gradient)"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          opacity={animate ? undefined : 0.7}
          className={animate ? 'animate-spin' : ''}
          style={animate ? { animationDuration: '8s', animationDirection: 'reverse' } : undefined}
        />
      )}

      {/* Inner glow */}
      <circle cx="20" cy="20" r="9" fill={`url(#${id}-inner)`} opacity="0.3" />

      {/* White play arrow */}
      <path
        d="M17 14L27 20L17 26V14Z"
        fill="white"
      />

      {/* Pulse dot */}
      {animate && (
        <circle cx="30" cy="10" r="2.5" fill="#A855F7" className="animate-pulse" />
      )}

      <defs>
        <linearGradient id="outer-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="middle-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <radialGradient id={`${id}-inner`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9333EA" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
