'use client';

import React from 'react';
import RealTimeInfluenceDashboard from '@/components/analytics/RealTimeInfluenceDashboard';

export default function RealTimePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Real-Time Dashboard</h1>
        <p className="text-gray-600">
          Live campaign performance monitoring with 5-minute refresh intervals
        </p>
      </div>
      
      <RealTimeInfluenceDashboard creatorId="campaign_3_live" />
    </div>
  );
}