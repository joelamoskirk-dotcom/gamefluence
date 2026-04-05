'use client';

import React from 'react';
import AdvancedAIDashboard from '@/components/analytics/AdvancedAIDashboard';

export default function AIInsightsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Insights</h1>
        <p className="text-gray-600">
          Advanced AI-powered analytics with predictive modeling and optimization recommendations
        </p>
      </div>
      
      <AdvancedAIDashboard />
    </div>
  );
}