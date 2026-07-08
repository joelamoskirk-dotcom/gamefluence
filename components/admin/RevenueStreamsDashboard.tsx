'use client';

import React from 'react';
import { REVENUE_STREAMS } from '@/lib/digital-turbine-integration';
import { CLIPPING_PRICING, KICK_CLIPPING_STRATEGY } from '@/lib/content-clipping-engine';
import { getTotalMonthlyRevenue, getTotalAnnualRevenue, getActiveCollabs } from '@/lib/collabs-data';

export default function RevenueStreamsDashboard() {
  // Live numbers from collabs
  const creatorRevenue = getTotalMonthlyRevenue();
  const activeDeals = getActiveCollabs().length;

  // Projected revenue streams (conservative estimates)
  const streams = [
    {
      name: 'Creator Management (20% Commission)',
      status: 'active' as const,
      monthlyRevenue: creatorRevenue,
      description: `${activeDeals} active deal(s). 20% of creator earnings.`,
      margin: 100,
      effort: 'medium',
      scalePath: 'Sign more creators → more brand deals → compounding',
    },
    {
      name: 'UA Campaigns (DT ACP Edge Margin)',
      status: 'ready' as const,
      monthlyRevenue: 0,
      description: 'Self-serve on DT, sell to clients at markup. 30-40% margin on installs.',
      margin: 35,
      effort: 'low',
      scalePath: 'Each client = recurring margin with zero extra ops once set up',
    },
    {
      name: 'Content Clipping (Kick + Multi-Platform)',
      status: 'ready' as const,
      monthlyRevenue: 0,
      description: 'Clip long-form into platform-optimised shorts. Tim on Kick = first client.',
      margin: 90,
      effort: 'low',
      scalePath: '10 Kick creators = $13K/mo. Add studios = more.',
    },
    {
      name: 'Creative Production',
      status: 'ready' as const,
      monthlyRevenue: 0,
      description: 'Video ads, banners, playables for UA clients. We make them = near-zero cost.',
      margin: 85,
      effort: 'medium',
      scalePath: 'Upsell to every UA client. Package with campaigns.',
    },
    {
      name: 'Affiliate Revenue',
      status: 'active' as const,
      monthlyRevenue: 0,
      description: 'Revenue share on product sales via creator links. 50/50 split.',
      margin: 50,
      effort: 'low',
      scalePath: 'Passive income that grows with creator audience size',
    },
  ];

  const totalActive = streams.filter(s => s.status === 'active').reduce((sum, s) => sum + s.monthlyRevenue, 0);
  
  // Conservative projections if all streams activated
  const projectedMonthly = {
    creator: creatorRevenue,
    ua: 3500, // 1 client at $10K budget, 35% margin
    clipping: 1500, // 1 Kick creator on retainer
    creative: 2000, // 1 creative package/month
    affiliate: 500, // Early affiliate income
  };
  const projectedTotal = Object.values(projectedMonthly).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Revenue Streams</h1>
          <p className="text-white/50 text-sm mt-1">All ways you make money. Hero services + easy wins.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#161616] border border-white/10 rounded-xl p-5">
          <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Active Monthly</p>
          <p className="text-3xl font-bold text-white">${totalActive.toLocaleString()}</p>
          <p className="text-white/30 text-xs mt-1">Currently earning</p>
        </div>
        <div className="bg-[#161616] border border-green-500/20 rounded-xl p-5">
          <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Projected (All Active)</p>
          <p className="text-3xl font-bold text-green-400">${projectedTotal.toLocaleString()}</p>
          <p className="text-green-400/50 text-xs mt-1">Conservative with 1 client each</p>
        </div>
        <div className="bg-[#161616] border border-white/10 rounded-xl p-5">
          <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Projected Annual</p>
          <p className="text-3xl font-bold text-white">${(projectedTotal * 12).toLocaleString()}</p>
          <p className="text-white/30 text-xs mt-1">Before scaling</p>
        </div>
        <div className="bg-[#161616] border border-white/10 rounded-xl p-5">
          <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Revenue Streams</p>
          <p className="text-3xl font-bold text-white">{streams.length}</p>
          <p className="text-white/30 text-xs mt-1">{streams.filter(s => s.status === 'active').length} active, {streams.filter(s => s.status === 'ready').length} ready to activate</p>
        </div>
      </div>

      {/* Projection Breakdown */}
      <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Monthly Projection (Conservative — 1 Client Each)</h3>
        <div className="space-y-3">
          {Object.entries(projectedMonthly).map(([key, value]) => {
            const total = projectedTotal;
            const pct = (value / total) * 100;
            const labels: Record<string, string> = {
              creator: 'Creator Management',
              ua: 'UA Campaigns (DT)',
              clipping: 'Content Clipping',
              creative: 'Creative Production',
              affiliate: 'Affiliate Revenue',
            };
            const colors: Record<string, string> = {
              creator: 'bg-purple-500',
              ua: 'bg-blue-500',
              clipping: 'bg-green-500',
              creative: 'bg-amber-500',
              affiliate: 'bg-pink-500',
            };
            return (
              <div key={key}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-white/70">{labels[key]}</span>
                  <span className="text-white font-medium">${value.toLocaleString()}/mo</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${colors[key]} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Streams */}
      <div className="space-y-4">
        <h3 className="text-white font-bold text-lg">All Streams</h3>
        {streams.map((stream, i) => (
          <div key={i} className="bg-[#161616] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h4 className="text-white font-bold">{stream.name}</h4>
                <span className={`px-2 py-0.5 rounded text-xs font-mono ${
                  stream.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {stream.status}
                </span>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">${stream.monthlyRevenue.toLocaleString()}/mo</p>
                <p className="text-white/40 text-xs">{stream.margin}% margin · {stream.effort} effort</p>
              </div>
            </div>
            <p className="text-white/50 text-sm mb-2">{stream.description}</p>
            <p className="text-white/30 text-xs italic">Scale: {stream.scalePath}</p>
          </div>
        ))}
      </div>

      {/* The Flywheel */}
      <div className="bg-gradient-to-r from-purple-500/5 to-blue-500/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-3">How It All Connects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-white/60">
          <div>
            <p className="text-white font-medium mb-2">Inbound → Multiple Revenue</p>
            <ul className="space-y-1">
              <li>• Studio wants UA → Run on DT (margin) + make creatives (margin) + clip content (margin)</li>
              <li>• Creator wants growth → Clip their streams (retainer) + get brand deals (commission)</li>
              <li>• Brand wants reach → Match creator (commission) + run paid UA (margin) + content clipping (retainer)</li>
            </ul>
          </div>
          <div>
            <p className="text-white font-medium mb-2">Every Client = Multiple Streams</p>
            <ul className="space-y-1">
              <li>• 1 game studio: UA margin + creative + clipping = $7,000/mo from one client</li>
              <li>• 1 Kick streamer: clipping + brand deals + affiliate = $3,000/mo from one creator</li>
              <li>• 1 hardware brand: creator commission + content + cross-promo = $5,000/mo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
