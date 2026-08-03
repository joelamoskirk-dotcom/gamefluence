'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface MarkProps {
  size?: number;
  interactive?: boolean;
  autoDemo?: boolean;
  className?: string;
}

export default function Mark({
  size = 140,
  interactive = true,
  autoDemo = true,
  className = '',
}: MarkProps) {
  const [active, setActive] = useState(false);
  const [locked, setLocked] = useState(false);
  const touched = useRef(false);
  const autoDemoTimer = useRef<NodeJS.Timeout | null>(null);
  const returnTimer = useRef<NodeJS.Timeout | null>(null);
  const id = React.useId();
  const gradientId = `mark-grad-${id}`;
  const ringGradientId = `mark-ring-${id}`;

  // Check reduced motion
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const cancelTimers = useCallback(() => {
    if (autoDemoTimer.current) {
      clearTimeout(autoDemoTimer.current);
      autoDemoTimer.current = null;
    }
    if (returnTimer.current) {
      clearTimeout(returnTimer.current);
      returnTimer.current = null;
    }
  }, []);

  // Auto-demo: play transition once at 3s, return after 1400ms
  useEffect(() => {
    if (!autoDemo || prefersReducedMotion.current) return;

    autoDemoTimer.current = setTimeout(() => {
      if (!touched.current) {
        setActive(true);
        returnTimer.current = setTimeout(() => {
          if (!touched.current) {
            setActive(false);
          }
        }, 1400);
      }
    }, 3000);

    return cancelTimers;
  }, [autoDemo, cancelTimers]);

  const handleHover = () => {
    if (!interactive || locked) return;
    touched.current = true;
    cancelTimers();
    setActive(true);
  };

  const handleLeave = () => {
    if (!interactive || locked) return;
    setActive(false);
  };

  const handleClick = () => {
    if (!interactive) return;
    touched.current = true;
    cancelTimers();
    setLocked(true);
    setActive(true);
  };

  // Rest state: triangle rotated -90° scaled(.93,1.16); rule: scaleX(0) opacity 0
  // Active state: triangle rotate(0) scale(1,1); rule: scaleX(1) opacity 1
  const triangleTransform = active
    ? 'rotate(0deg) scale(1, 1)'
    : 'rotate(-90deg) scale(0.93, 1.16)';

  const ruleTransform = active
    ? 'scaleX(1)'
    : 'scaleX(0)';

  const ruleOpacity = active ? 1 : 0;

  const transitionStyle = prefersReducedMotion.current
    ? 'none'
    : undefined;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      className={className}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : 'img'}
      aria-label="Gamefluence mark"
      style={{ cursor: interactive ? 'pointer' : 'default' }}
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3A3F52" />
          <stop offset="100%" stopColor="#20242F" />
        </radialGradient>
        <linearGradient id={ringGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5B2FD6" />
          <stop offset="55%" stopColor="#B845C4" />
          <stop offset="100%" stopColor="#E0518C" />
        </linearGradient>
      </defs>

      {/* Disc */}
      <circle cx="70" cy="70" r="58" fill={`url(#${gradientId})`} />
      <circle cx="70" cy="70" r="58" fill="none" stroke={`url(#${ringGradientId})`} strokeWidth="4" />

      {/* Glyph group: translate(70,70) scale(.72) translate(-60,-55) */}
      <g transform="translate(70,70) scale(0.72) translate(-60,-55)">
        {/* Triangle: M32 36 L88 36 L60 74 Z */}
        <path
          d="M32 36 L88 36 L60 74 Z"
          fill="none"
          stroke="white"
          strokeWidth="10"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{
            transform: triangleTransform,
            transformOrigin: '60px 55px',
            transition: transitionStyle || `transform 300ms cubic-bezier(.2,.85,.3,1)`,
          }}
        />

        {/* Rule: rect x=27 y=87 w=66 h=10 rx=5 — MUST be <rect>, never <line> */}
        <rect
          x="27"
          y="87"
          width="66"
          height="10"
          rx="5"
          fill="white"
          style={{
            transform: ruleTransform,
            transformOrigin: '60px 92px',
            opacity: ruleOpacity,
            transition: transitionStyle || `transform 180ms cubic-bezier(.2,.85,.3,1) 200ms, opacity 180ms cubic-bezier(.2,.85,.3,1) 200ms`,
          }}
        />
      </g>
    </svg>
  );
}
