'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import APACMarketInsightsDashboard from '@/components/analytics/APACMarketInsightsDashboard';

export default function MarketTrendsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/dashboard"
        className="flex items-center text-gray-600 hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Dashboard
      </Link>

      <APACMarketInsightsDashboard />
    </main>
  );
}
