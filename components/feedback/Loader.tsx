'use client';

import React from 'react';
import Mark from '@/components/brand/Mark';

interface LoaderProps {
  message?: string;
}

export default function Loader({ message = 'Loading…' }: LoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink-900">
      <Mark size={72} interactive={false} autoDemo={true} />
      <p className="mt-6 font-sans text-[14px] leading-[1.65] text-t-mid">
        {message}
      </p>
    </div>
  );
}
