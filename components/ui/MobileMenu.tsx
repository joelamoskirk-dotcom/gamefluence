'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'Creator Signup', href: '/creator-signup' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-md hover:bg-ink-700 transition-colors duration-micro ease-brand min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X className="w-6 h-6 text-t-hi" /> : <Menu className="w-6 h-6 text-t-hi" />}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink-950/80 z-40"
            onClick={() => setOpen(false)}
          />
          {/* Slide-in panel */}
          <nav className="fixed top-0 right-0 h-full w-72 bg-ink-900 border-l border-line shadow-2xl z-50 overflow-y-auto animate-slide-in">
            <div className="flex items-center justify-between p-4 border-b border-line">
              <span className="font-bold text-lg text-t-hi notranslate" spellCheck={false}>
                Gamefluence
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-md hover:bg-ink-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5 text-t-hi" />
              </button>
            </div>

            <div className="p-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-md text-sm font-medium text-t-mid hover:text-t-hi hover:bg-ink-700 transition-colors duration-micro ease-brand"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="p-4 border-t border-line space-y-3">
              <Link href="/get-started" onClick={() => setOpen(false)}>
                <Button variant="primary" className="w-full text-sm">Get Your Campaign Plan</Button>
              </Link>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
