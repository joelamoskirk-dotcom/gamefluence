'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Creators', href: '/creators' },
  { label: 'Launch Campaign', href: '/batch-campaign', accent: true },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Analytics', href: '/dashboard/analytics' },
  { label: 'Market Intelligence', href: '/dashboard/market-intelligence' },
  { label: 'Agency Demo', href: '/agency-demo' },
  { label: 'Creator Signup', href: '/creator-signup' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'News', href: '/news' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpen(false)}
          />
          {/* Slide-in panel */}
          <nav className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 overflow-y-auto animate-slide-in">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-bold text-lg gaming-gradient bg-clip-text text-transparent notranslate">
                Gamefluence.AI
              </span>
              <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    item.accent
                      ? 'bg-accent/10 text-accent hover:bg-accent/20'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="p-4 border-t space-y-2">
              <Link href="/login" onClick={() => setOpen(false)}>
                <button className="w-full btn-primary text-sm">Login</button>
              </Link>
              <Link href="/login" onClick={() => setOpen(false)}>
                <button className="w-full btn-secondary text-sm">Sign Up</button>
              </Link>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
