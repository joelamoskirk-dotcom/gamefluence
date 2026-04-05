'use client';

import { useState, useEffect } from 'react';
import { SampleDataSeeder } from '@/lib/sample-data-seeder';

interface CampaignMetrics {
  campaignId: string;
  gameTitle: string;
  totalReach: number;
  totalDownloads: number;
  totalSpend: number;
  cpa: number;
  roas: number;
  conversionRate: number;
  engagementRate: number;
  brandLift: number;
  weeklyData: Array<{
    week: number;
    reach: number;
    downloads: number;
    spend: number;
    cpa: number;
  }>;
}

export default function EnhancedAnalyticsDashboard() {
  const [selectedCampaign, setSelectedCampaign] = useState('camp_001');
  const [campaignData, setCampaignData] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    // Load sample data
    const sampleData = SampleDataSeeder.getSeededData();
    if (sampleData) {
      setCampaignData(sampleData.campaigns[0]); // Use first campaign
      setAnalyticsData(sampleData.analytics);
    }
  }, []);
  
  // Generate weekly data from campaign data
  const generateWeeklyData = (campaign: any) => {
    if (!campaign) return [];
    
    const weeks = 6;
    const totalReach = campaign.metrics?.reach || 2500000;
    const totalSpent = campaign.spent || 89500;
    const totalConversions = campaign.metrics?.conversions || 12500;
    
    return Array.from({ length: weeks }, (_, i) => ({
      week: i + 1,
      reach: Math.floor(totalReach / weeks * (0.8 + Math.random() * 0.4)),
      downloads: Math.floor(totalConversions / weeks * (0.7 + Math.random() * 0.6)),
      spend: Math.floor(totalSpent / weeks * (0.8 + Math.random() * 0.4)),
      cpa: (1.5 + Math.random() * 1.5).toFixed(2)
    }));
  };

  const weeklyData = campaignData ? generateWeeklyData(campaignData) : [];
  const currentCampaign = campaignData || {
    title: 'Loading Campaign...',
    gameTitle: 'Loading...',
    metrics: { reach: 0, conversions: 0, ctr: 0 },
    spent: 0
  };

  if (!campaignData) {
    return (
      <div className="space-y-6">
        <div className="card">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Campaign Analytics</h2>
          <p className="text-gray-600">Real-time performance tracking for {currentCampaign.gameTitle}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">Live Data</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card text-center">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Reach</h3>
          <p className="text-2xl font-bold text-primary">
            {((currentCampaign.metrics?.reach || 0) / 1000000).toFixed(1)}M
          </p>
          <p className="text-xs text-green-600">+15% vs target</p>
        </div>
        <div className="card text-center">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Conversions</h3>
          <p className="text-2xl font-bold text-secondary">
            {(currentCampaign.metrics?.conversions || 0).toLocaleString()}
          </p>
          <p className="text-xs text-green-600">+12% vs projection</p>
        </div>
        <div className="card text-center">
          <h3 className="text-sm font-medium text-gray-500 mb-1">CPM</h3>
          <p className="text-2xl font-bold text-accent">
            ${(currentCampaign.metrics?.cpm || 8.5).toFixed(2)}
          </p>
          <p className="text-xs text-green-600">20% below target</p>
        </div>
        <div className="card text-center">
          <h3 className="text-sm font-medium text-gray-500 mb-1">CTR</h3>
          <p className="text-2xl font-bold text-gaming">
            {(currentCampaign.metrics?.ctr || 3.2).toFixed(1)}%
          </p>
          <p className="text-xs text-green-600">Above 3.0% target</p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="card">
        <h3 className="font-semibold mb-4">Weekly Performance Trend</h3>
        <div className="space-y-4">
          {weeklyData.map((week) => (
            <div key={week.week} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-4">
                <span className="font-medium w-16">Week {week.week}</span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${Math.min((week.downloads / 3000) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex space-x-8 text-sm">
                <div className="text-right">
                  <p className="font-medium">{(week.reach / 1000000).toFixed(1)}M</p>
                  <p className="text-gray-500">Reach</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{week.downloads.toLocaleString()}</p>
                  <p className="text-gray-500">Conversions</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${week.spend.toLocaleString()}</p>
                  <p className="text-gray-500">Spend</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${week.cpa}</p>
                  <p className="text-gray-500">CPA</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attribution & Commerce */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-4">Attribution Tracking</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>AppsFlyer Integration</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Amazon Attribution</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Connected</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Promo Code Tracking</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">15 Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span>One-Link Attribution</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Enabled</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-4">Commerce Integration</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Amazon Purchase Links</span>
              <span className="text-green-600 font-medium">$12,400 revenue</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Brand Partnerships</span>
              <span className="text-blue-600 font-medium">3 Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Auto Brand Collabs</span>
              <span className="text-purple-600 font-medium">2 Pending</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Gaming Merchandise</span>
              <span className="text-orange-600 font-medium">$3,200 revenue</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">AI</span>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Performance Insights</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Week 3 showed peak performance - optimize similar content timing</li>
              <li>• TikTok creators driving 68% higher engagement than YouTube</li>
              <li>• Racing content performs 23% better than general gaming content</li>
              <li>• Recommend increasing budget by 25% for weeks 7-8 based on trends</li>
              <li>• Amazon integration generating additional 15% revenue per user</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}