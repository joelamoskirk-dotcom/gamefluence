'use client';

import React from 'react';
import Link from 'next/link';
import APACMarketIntelligence from '@/components/admin/APACMarketIntelligence';

export default function MarketIntelligencePage() {
  return (
    <div>
      {/* Quick link to AU Funding Analysis */}
      <div className="container mx-auto px-4 pt-6">
        <Link href="/dashboard/market-intelligence/au-funding" className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 text-sm font-medium hover:bg-amber-500/20 transition">
          🇦🇺 AU Games Funding Analysis — Screen Agency Cost-Benefit &amp; Attribution Gap →
        </Link>
      </div>
      <APACMarketIntelligence />
    </div>
  );
}