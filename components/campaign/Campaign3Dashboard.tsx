'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  Share2, 
  Download,
  DollarSign,
  Target,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Pause,
  BarChart3,
  Smartphone,
  Monitor,
  Headphones,
  Zap,
  Trophy,
  RefreshCw,
  Copy,
  Settings,
  Lightbulb,
  Calendar,
  MapPin,
  ThumbsUp
} from 'lucide-react';

interface CampaignMetrics {
  totalReach: number;
  impressions: number;
  engagement: number;
  clicks: number;
  downloads: number;
  cost: number;
  roi: number;
  brandAwareness: number;
  completionRate: number;
}

interface CreatorPerformance {
  id: string;
  name: string;
  avatar: string;
  tier: string;
  contentPieces: number;
  views: number;
  engagement: number;
  clicks: number;
  downloads: number;
  cost: number;
  roi: number;
  status: 'completed' | 'in_progress' | 'pending';
  topContent: {
    title: string;
    views: number;
    engagement: number;
    platform: string;
  }[];
}

interface CampaignData {
  id: string;
  name: string;
  client: string;
  agency: string;
  product: string;
  startDate: Date;
  endDate: Date;
  status: 'live' | 'completed' | 'paused';
  budget: {
    total: number;
    spent: number;
    remaining: number;
    agencyCommission: number;
  };
  objectives: string[];
  targetMarkets: string[];
  metrics: CampaignMetrics;
  creators: CreatorPerformance[];
  timeline: {
    date: Date;
    milestone: string;
    status: 'completed' | 'current' | 'upcoming';
    description: string;
  }[];
}

export default function Campaign3Dashboard() {
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '14d' | '30d'>('14d');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [animatedMetrics, setAnimatedMetrics] = useState<Partial<CampaignMetrics>>({});

  // Simulate real campaign data
  useEffect(() => {
    const mockCampaignData: CampaignData = {
      id: 'campaign-truemove-gaming-x1',
      name: 'TrueMove Gaming Pro X1 Launch Campaign',
      client: 'TrueMove Digital Electronics',
      agency: 'Digital Boost Thailand',
      product: 'Gaming Pro X1 Smartphone',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-02-05'),
      status: 'completed',
      budget: {
        total: 194775, // Including VAT
        spent: 187250,
        remaining: 7525,
        agencyCommission: 25500
      },
      objectives: ['Brand Awareness', 'Product Launch', 'Gaming Community Engagement'],
      targetMarkets: ['Thailand', 'Vietnam', 'Indonesia'],
      metrics: {
        totalReach: 2847000,
        impressions: 8920000,
        engagement: 742000,
        clicks: 89400,
        downloads: 15600,
        cost: 187250,
        roi: 4.2,
        brandAwareness: 87,
        completionRate: 96
      },
      creators: [
        {
          id: 'creator-th-001',
          name: 'GamingWithPat',
          avatar: '/avatars/pat-thai.jpg',
          tier: 'mega',
          contentPieces: 4,
          views: 1250000,
          engagement: 106250,
          clicks: 31250,
          downloads: 5200,
          cost: 85000,
          roi: 3.8,
          status: 'completed',
          topContent: [
            { title: 'Gaming Pro X1 Unboxing & First Impressions', views: 485000, engagement: 41250, platform: 'YouTube' },
            { title: 'Mobile Gaming Beast Mode Test', views: 320000, engagement: 28800, platform: 'YouTube' },
            { title: 'Gaming Setup Tour with Pro X1', views: 280000, engagement: 22400, platform: 'TikTok' }
          ]
        },
        {
          id: 'creator-th-002',
          name: 'MusicGameQueen',
          avatar: '/avatars/queen-thai.jpg',
          tier: 'macro',
          contentPieces: 5,
          views: 890000,
          engagement: 109480,
          clicks: 26700,
          downloads: 4800,
          cost: 52000,
          roi: 5.1,
          status: 'completed',
          topContent: [
            { title: 'Gaming Pro X1 Rhythm Game Challenge', views: 380000, engagement: 46740, platform: 'TikTok' },
            { title: 'Audio Quality Test - Gaming Headset Review', views: 250000, engagement: 32500, platform: 'YouTube' },
            { title: 'Mobile Gaming Setup for Girls', views: 180000, engagement: 21600, platform: 'Instagram' }
          ]
        },
        {
          id: 'creator-th-003',
          name: 'ThaiGamerPro',
          avatar: '/avatars/pro-thai.jpg',
          tier: 'macro',
          contentPieces: 3,
          views: 520000,
          engagement: 50960,
          clicks: 20800,
          downloads: 3200,
          cost: 38000,
          roi: 4.5,
          status: 'completed',
          topContent: [
            { title: 'Gaming Pro X1 vs Competition Comparison', views: 280000, engagement: 25200, platform: 'YouTube' },
            { title: 'Pro Gaming Tips with New Hardware', views: 150000, engagement: 16500, platform: 'Twitch' },
            { title: 'Gaming Pro X1 Live Stream Session', views: 90000, engagement: 9260, platform: 'Facebook Gaming' }
          ]
        },
        {
          id: 'creator-th-004',
          name: 'CasualGamerGirl',
          avatar: '/avatars/casual-thai.jpg',
          tier: 'micro',
          contentPieces: 6,
          views: 187000,
          engagement: 28420,
          clicks: 10650,
          downloads: 2400,
          cost: 12250,
          roi: 6.2,
          status: 'completed',
          topContent: [
            { title: 'Cute Gaming Setup with Pro X1', views: 85000, engagement: 12750, platform: 'TikTok' },
            { title: 'Gaming Phone for Casual Players', views: 52000, engagement: 7800, platform: 'Instagram' },
            { title: 'Pro X1 Camera Test for Content Creation', views: 50000, engagement: 7750, platform: 'YouTube' }
          ]
        }
      ],
      timeline: [
        { date: new Date('2024-01-15'), milestone: 'Campaign Launch', status: 'completed', description: 'All creators briefed and content creation started' },
        { date: new Date('2024-01-18'), milestone: 'First Content Live', status: 'completed', description: 'Initial unboxing videos published' },
        { date: new Date('2024-01-22'), milestone: 'Mid-Campaign Review', status: 'completed', description: 'Performance optimization and budget reallocation' },
        { date: new Date('2024-01-28'), milestone: 'Peak Performance', status: 'completed', description: 'Highest engagement and conversion rates achieved' },
        { date: new Date('2024-02-05'), milestone: 'Campaign Completion', status: 'completed', description: 'All deliverables completed, final reporting' }
      ]
    };

    setCampaignData(mockCampaignData);

    // Animate metrics on load
    const animateMetrics = () => {
      const metrics = mockCampaignData.metrics;
      const steps = 50;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedMetrics({
          totalReach: Math.floor(metrics.totalReach * progress),
          impressions: Math.floor(metrics.impressions * progress),
          engagement: Math.floor(metrics.engagement * progress),
          clicks: Math.floor(metrics.clicks * progress),
          downloads: Math.floor(metrics.downloads * progress),
          roi: Number((metrics.roi * progress).toFixed(1)),
          brandAwareness: Math.floor(metrics.brandAwareness * progress),
          completionRate: Math.floor(metrics.completionRate * progress)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedMetrics(metrics);
        }
      }, 50);
    };

    setTimeout(animateMetrics, 500);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return `฿${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!campaignData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Campaign Success Dashboard</h1>
            </div>
            <p className="text-lg text-green-100 mb-4">
              {campaignData.name} - Exceeding all expectations! 🎉
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Campaign Completed Successfully</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>All Objectives Achieved</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>ROI: {animatedMetrics.roi || 0}x Target</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-green-200">Campaign Performance</div>
            <div className="text-4xl font-bold mb-2">
              {animatedMetrics.completionRate || 0}%
            </div>
            <div className="text-green-200">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Reach</p>
              <p className="text-3xl font-bold text-blue-600">
                {formatNumber(animatedMetrics.totalReach || 0)}
              </p>
              <p className="text-green-600 text-sm flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +35% vs target
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">App Downloads</p>
              <p className="text-3xl font-bold text-purple-600">
                {formatNumber(animatedMetrics.downloads || 0)}
              </p>
              <p className="text-green-600 text-sm flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +22% vs target
              </p>
            </div>
            <Download className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">ROI</p>
              <p className="text-3xl font-bold text-green-600">
                {animatedMetrics.roi || 0}x
              </p>
              <p className="text-green-600 text-sm flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +68% vs target
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Brand Awareness</p>
              <p className="text-3xl font-bold text-orange-600">
                {animatedMetrics.brandAwareness || 0}%
              </p>
              <p className="text-green-600 text-sm flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +45% vs target
              </p>
            </div>
            <Eye className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Budget Performance */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-green-600" />
          Budget Performance & Agency Earnings
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="font-semibold">Total Client Budget:</span>
                <span className="text-xl font-bold text-green-600">
                  {formatCurrency(campaignData.budget.total)}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="font-semibold">Campaign Spend:</span>
                <span className="text-xl font-bold text-blue-600">
                  {formatCurrency(campaignData.budget.spent)}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                <span className="font-semibold">Agency Commission:</span>
                <span className="text-xl font-bold text-purple-600">
                  {formatCurrency(campaignData.budget.agencyCommission)}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                <span className="font-semibold">Budget Remaining:</span>
                <span className="text-xl font-bold text-orange-600">
                  {formatCurrency(campaignData.budget.remaining)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4 text-center">Campaign Efficiency</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">96%</div>
                <div className="text-sm text-gray-600">Budget Utilization</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(Math.round(campaignData.budget.spent / (animatedMetrics.downloads || 1)))}
                </div>
                <div className="text-sm text-gray-600">Cost per Download</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {((campaignData.budget.agencyCommission / campaignData.budget.total) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Agency Margin</div>
              </div>
            </div>
          </div>
        </div>
      </div> 
     {/* Creator Performance */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-600" />
          Creator Performance Breakdown
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaignData.creators.map((creator) => (
            <div key={creator.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {creator.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{creator.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      creator.tier === 'mega' ? 'bg-purple-100 text-purple-800' :
                      creator.tier === 'macro' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {creator.tier.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(creator.status)}`}>
                      {creator.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {creator.contentPieces} content pieces • ROI: {creator.roi}x
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{formatNumber(creator.views)}</div>
                  <div className="text-xs text-gray-500">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{formatNumber(creator.engagement)}</div>
                  <div className="text-xs text-gray-500">Engagement</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{formatNumber(creator.downloads)}</div>
                  <div className="text-xs text-gray-500">Downloads</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-sm mb-2">Top Performing Content:</h4>
                <div className="space-y-2">
                  {creator.topContent.slice(0, 2).map((content, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <div className="flex-1">
                        <div className="font-medium truncate">{content.title}</div>
                        <div className="text-xs text-gray-500">{content.platform}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-blue-600">{formatNumber(content.views)}</div>
                        <div className="text-xs text-gray-500">{formatNumber(content.engagement)} eng.</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Investment:</span>
                  <span className="font-bold">{formatCurrency(creator.cost)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">ROI:</span>
                  <span className="font-bold text-green-600">{creator.roi}x</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Timeline */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-600" />
          Campaign Timeline & Milestones
        </h2>
        
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div className="space-y-6">
            {campaignData.timeline.map((milestone, index) => (
              <div key={index} className="relative flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  milestone.status === 'completed' ? 'bg-green-500' :
                  milestone.status === 'current' ? 'bg-blue-500' :
                  'bg-gray-300'
                }`}>
                  {milestone.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <Clock className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold">{milestone.milestone}</h3>
                    <span className="text-sm text-gray-500">
                      {milestone.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Recommendations */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8 border border-yellow-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-600" />
            AI-Powered Recommendations
          </h2>
          <Button
            onClick={() => setShowRecommendations(!showRecommendations)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            {showRecommendations ? 'Hide' : 'Show'} Recommendations
          </Button>
        </div>

        {showRecommendations && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Next Campaign Suggestions */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-blue-600" />
                Next Campaign Ideas
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Gaming Pro X1 Accessories Launch</h4>
                  <p className="text-sm text-blue-600 mb-2">
                    Leverage successful creators for accessory products
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="bg-blue-200 px-2 py-1 rounded">Est. Budget: ฿120K</span>
                    <span className="bg-blue-200 px-2 py-1 rounded">ROI: 3.8x</span>
                    <span className="bg-blue-200 px-2 py-1 rounded">Same Creators</span>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800">Expand to Vietnam Market</h4>
                  <p className="text-sm text-green-600 mb-2">
                    Similar audience profile with Vietnamese gaming creators
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="bg-green-200 px-2 py-1 rounded">Est. Budget: ฿180K</span>
                    <span className="bg-green-200 px-2 py-1 rounded">ROI: 3.5x</span>
                    <span className="bg-green-200 px-2 py-1 rounded">New Market</span>
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800">Gaming Pro X1 Pro Model</h4>
                  <p className="text-sm text-purple-600 mb-2">
                    Premium model targeting hardcore gamers
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="bg-purple-200 px-2 py-1 rounded">Est. Budget: ฿250K</span>
                    <span className="bg-purple-200 px-2 py-1 rounded">ROI: 4.1x</span>
                    <span className="bg-purple-200 px-2 py-1 rounded">Premium Tier</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Optimization Insights */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Optimization Insights
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <ThumbsUp className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Micro-influencers outperformed</h4>
                    <p className="text-xs text-gray-600">
                      CasualGamerGirl achieved 6.2x ROI - consider more micro-tier creators
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">TikTok content performed best</h4>
                    <p className="text-xs text-gray-600">
                      Short-form content had 40% higher engagement rates
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Optimal posting times identified</h4>
                    <p className="text-xs text-gray-600">
                      7-9 PM Thailand time showed highest engagement
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Regional performance insights</h4>
                    <p className="text-xs text-gray-600">
                      Bangkok and Chiang Mai showed highest conversion rates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
            <Copy className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Duplicate Campaign</h3>
            <p className="text-sm text-gray-600 mb-4">
              Create a new campaign using the same successful settings
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
              Duplicate & Customize
            </Button>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
            <RefreshCw className="w-8 h-8 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Reactivate Creators</h3>
            <p className="text-sm text-gray-600 mb-4">
              Launch follow-up campaign with same high-performing creators
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
              Reactivate Campaign
            </Button>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
            <Settings className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Save as Template</h3>
            <p className="text-sm text-gray-600 mb-4">
              Save campaign settings as template for future use
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full">
              Create Template
            </Button>
          </div>
        </div>
      </div>

      {/* Client Testimonial */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-8 h-8" />
          </div>
          <blockquote className="text-xl font-medium mb-4">
            "This campaign exceeded all our expectations! The ROI was incredible and the gaming community 
            response was phenomenal. We're definitely planning our next campaign with the same team."
          </blockquote>
          <div className="text-green-100">
            <div className="font-semibold">Siriporn Tanaka</div>
            <div className="text-sm">Marketing Director, TrueMove Digital Electronics</div>
          </div>
        </div>
      </div>
    </div>
  );
}