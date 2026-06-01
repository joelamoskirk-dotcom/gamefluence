'use client';

import React from 'react';
import Link from 'next/link';
import GFIcon from '@/components/ui/GFIcon';
import GFLogo from '@/components/ui/GFLogo';

// Brand test page — dark-native Gamefluence visual identity
// Following Brand Book v1.0 Section 02: 5-token colour system, Space Grotesk, gradient CTAs

const MARKETS = [
  { flag: '🇮🇩', name: 'Indonesia', creators: '65+' },
  { flag: '🇵🇭', name: 'Philippines', creators: '52+' },
  { flag: '🇻🇳', name: 'Vietnam', creators: '48+' },
  { flag: '🇹🇭', name: 'Thailand', creators: '38+' },
  { flag: '🇲🇾', name: 'Malaysia', creators: '28+' },
  { flag: '🇸🇬', name: 'Singapore', creators: '17+' },
  { flag: '🇰🇷', name: 'South Korea', creators: '32+' },
];

export default function BrandTestPage() {
  return (
    <div style={{ background: '#0D0D0D', minHeight: '100vh', fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;800&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14" style={{ background: '#0D0D0D', borderBottom: '1px solid #222' }}>
        <GFLogo onDark size="sm" showIcon />
        <div className="flex items-center gap-4">
          <Link href="/get-started" className="text-sm text-white/60 hover:text-white transition-colors">For Brands</Link>
          <Link href="/creators" className="text-sm text-white/60 hover:text-white transition-colors">How It Works</Link>
          <Link href="/pricing" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</Link>
          <Link href="/get-started">
            <button className="px-4 py-1.5 text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
              Get started
            </button>
          </Link>
          <Link href="/creator-signup">
            <button className="px-4 py-1.5 text-sm font-medium text-white rounded-lg" style={{ background: 'linear-gradient(135deg, #9333EA, #EC4899)' }}>
              Join as creator
            </button>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
        {/* Background pulse rings */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-[600px] h-[600px] rounded-full border border-dashed border-purple-500 animate-spin" style={{ animationDuration: '30s' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-pink-500 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8 text-sm" style={{ background: '#2D1B69', color: '#C4B5FD', border: '1px solid #4C1D95' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#A855F7' }} />
            Gaming creator campaigns across APAC
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight" style={{ letterSpacing: '-1px' }}>
            Gaming Creator Marketing{' '}
            <span style={{ background: 'linear-gradient(135deg, #9333EA, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Across Asia-Pacific
            </span>
          </h1>

          <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
            Connect your brand with authentic gaming creators in Vietnam, Thailand, Indonesia, Philippines, Malaysia, Singapore & South Korea. AI-powered matching. Real attribution.
          </p>

          {/* CTAs — one gradient max per hero */}
          <div className="flex justify-center gap-4">
            <Link href="/get-started">
              <button className="px-8 py-3 text-base font-semibold text-white rounded-xl transition-transform hover:scale-105" style={{ background: 'linear-gradient(135deg, #9333EA, #EC4899)' }}>
                Launch a Campaign
              </button>
            </Link>
            <Link href="/pricing">
              <button className="px-8 py-3 text-base font-semibold text-white/80 rounded-xl border border-white/20 hover:bg-white/5 transition-colors">
                See Pricing
              </button>
            </Link>
          </div>

          {/* Market flags */}
          <div className="flex justify-center gap-5 mt-12 text-sm text-white/40">
            {MARKETS.map(m => (
              <span key={m.name} className="flex items-center gap-1.5">
                <span className="text-lg">{m.flag}</span> {m.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4" style={{ letterSpacing: '-0.3px' }}>
            How Agencies Use Gamefluence
          </h2>
          <p className="text-white/40 text-center mb-12 max-w-xl mx-auto">
            Four steps from brief to measurable results.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', icon: '🎯', title: 'Submit Brief', desc: 'Market, genre, budget. Our AI analyses against historical data.' },
              { step: '2', icon: '🤖', title: 'AI Matches', desc: 'Creators scored on ROI history, engagement, audience quality, brand safety.' },
              { step: '3', icon: '💳', title: 'Pay & Launch', desc: 'Secure checkout. Creators activate instantly.' },
              { step: '4', icon: '📊', title: 'Track & Optimise', desc: 'Real-time attribution. Every install tracked per creator.' },
            ].map(s => (
              <div key={s.step} className="text-center p-6 rounded-xl" style={{ background: '#161616' }}>
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-xs font-bold mb-1" style={{ color: '#A855F7' }}>STEP {s.step}</div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/50">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKET CARDS */}
      <section className="py-20 px-6" style={{ background: '#161616' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4" style={{ letterSpacing: '-0.3px' }}>
            Choose Your Market
          </h2>
          <p className="text-white/40 text-center mb-12">
            Select a market. Our AI matches you with the highest-performing local gaming creators.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {MARKETS.map(m => (
              <Link key={m.name} href="/get-started">
                <div className="p-5 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer group" style={{ background: '#0D0D0D' }}>
                  <div className="text-3xl mb-3">{m.flag}</div>
                  <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">{m.name}</h3>
                  <p className="text-sm text-white/40 mt-1">{m.creators} creators</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '280+', label: 'Creators' },
            { value: '7', label: 'APAC Markets' },
            { value: '24hr', label: 'Activation' },
            { value: '5.8x', label: 'Avg ROI' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-bold" style={{ background: 'linear-gradient(135deg, #9333EA, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {s.value}
              </div>
              <div className="text-sm text-white/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 text-center" style={{ background: 'linear-gradient(135deg, #9333EA20, #EC489920)' }}>
        <h2 className="text-3xl font-bold text-white mb-4">Ready to reach APAC gamers?</h2>
        <p className="text-white/60 mb-8 max-w-xl mx-auto">
          Launch your first campaign in under 5 minutes. AI-selected creators. Real attribution.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/get-started">
            <button className="px-8 py-3 font-semibold text-white rounded-xl" style={{ background: 'linear-gradient(135deg, #9333EA, #EC4899)' }}>
              Start Campaign
            </button>
          </Link>
          <Link href="/creator-signup">
            <button className="px-8 py-3 font-semibold text-white/80 rounded-xl border border-white/20 hover:bg-white/5">
              Join as Creator
            </button>
          </Link>
        </div>
      </section>

      {/* COMPONENT SHOWCASE (for your review) */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Brand System Components</h2>

          {/* Icons at different sizes */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wide mb-4">Icon Scale</h3>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <GFIcon size={16} animate={false} />
                <p className="text-[10px] text-white/40 mt-2">16px (favicon)</p>
              </div>
              <div className="text-center">
                <GFIcon size={28} animate={false} />
                <p className="text-[10px] text-white/40 mt-2">28px (nav)</p>
              </div>
              <div className="text-center">
                <GFIcon size={40} />
                <p className="text-[10px] text-white/40 mt-2">40px (avatar)</p>
              </div>
              <div className="text-center">
                <GFIcon size={64} />
                <p className="text-[10px] text-white/40 mt-2">64px (hero)</p>
              </div>
            </div>
          </div>

          {/* Logo variants */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wide mb-4">Logo Variants</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl" style={{ background: '#161616' }}>
                <GFLogo onDark size="md" showTagline />
                <p className="text-[10px] text-white/30 mt-3">Primary — dark surface</p>
              </div>
              <div className="p-6 rounded-xl bg-white">
                <GFLogo onDark={false} size="md" showTagline />
                <p className="text-[10px] text-gray-400 mt-3">Reversed — light surface</p>
              </div>
            </div>
          </div>

          {/* Colour tokens */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wide mb-4">5-Token Colour System</h3>
            <div className="grid grid-cols-5 gap-3">
              <div>
                <div className="h-16 rounded-lg" style={{ background: 'linear-gradient(135deg, #9333EA, #EC4899)' }} />
                <p className="text-[10px] text-white/50 mt-2">Brand gradient</p>
              </div>
              <div>
                <div className="h-16 rounded-lg" style={{ background: '#A855F7' }} />
                <p className="text-[10px] text-white/50 mt-2">Brand purple</p>
              </div>
              <div>
                <div className="h-16 rounded-lg" style={{ background: '#EC4899' }} />
                <p className="text-[10px] text-white/50 mt-2">Brand pink</p>
              </div>
              <div>
                <div className="h-16 rounded-lg" style={{ background: '#0D0D0D', border: '1px solid #333' }} />
                <p className="text-[10px] text-white/50 mt-2">Dark bg</p>
              </div>
              <div>
                <div className="h-16 rounded-lg" style={{ background: '#161616' }} />
                <p className="text-[10px] text-white/50 mt-2">Dark surface</p>
              </div>
            </div>
          </div>

          {/* Button system */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wide mb-4">Button System</h3>
            <div className="flex items-center gap-4">
              <button className="px-6 py-2 text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/5">
                Primary
              </button>
              <button className="px-6 py-2 text-sm font-medium text-white/50 rounded-lg hover:text-white">
                Ghost
              </button>
              <button className="px-6 py-2 text-sm font-medium text-white rounded-lg" style={{ background: 'linear-gradient(135deg, #9333EA, #EC4899)' }}>
                Gradient (hero only)
              </button>
              <button className="px-6 py-2 text-sm font-medium rounded-lg" style={{ background: '#161616', color: '#666' }}>
                Muted
              </button>
            </div>
            <p className="text-[10px] text-white/30 mt-3">Rule: One gradient button per hero section only. Never on forms or repeated actions.</p>
          </div>

          {/* Progress bar */}
          <div>
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wide mb-4">Progress Bar (gradient fill, no green)</h3>
            <div className="w-full h-3 rounded-full" style={{ background: '#161616' }}>
              <div className="h-full rounded-full w-3/4" style={{ background: 'linear-gradient(90deg, #7C3AED, #EC4899)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <div className="py-8 px-6 text-center border-t border-white/10">
        <p className="text-xs text-white/30">
          Brand Test Page — Gamefluence Visual Identity v1.0 — Compare with current site at /
        </p>
        <div className="flex justify-center gap-4 mt-3">
          <Link href="/" className="text-xs text-purple-400 hover:text-purple-300">← Current site</Link>
          <Link href="/founder" className="text-xs text-purple-400 hover:text-purple-300">Founder login</Link>
        </div>
      </div>
    </div>
  );
}
