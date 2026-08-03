'use client';

import React from 'react';
import Mark from './Mark';
import Wordmark from './Wordmark';

interface LogoProps {
  markSize?: number;
  className?: string;
  interactive?: boolean;
  autoDemo?: boolean;
}

export default function Logo({
  markSize = 40,
  className = '',
  interactive = true,
  autoDemo = true,
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Mark
        size={markSize}
        interactive={interactive}
        autoDemo={autoDemo}
      />
      <Wordmark height={20} variant="white" />
    </div>
  );
}
