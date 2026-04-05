'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  Music, 
  Users, 
  TrendingUp, 
  Target, 
  DollarSign,
  Play,
  Heart,
  Share2,
  Download,
  Eye,
  Star,
  MapPin,
  Clock,
  Zap,
  Trophy,
  Smartphone,
  Globe,
  BarChart3,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { 
  thaiCreators, 
  thailandMarketData, 
  calculateCampaignPrediction,
  thailandInsights,
  type ThaiCreator,
  type CampaignPrediction
} from '@/lib/thailand-market-intelligence';

interface CampaignBuilder {
  gameTitle: string;
  genre: string;
  budget: number;
  duration: number;
  objectives: string[];
  selectedCreators: string[];
  contentTypes: string[];
  targetAudience: string;
}

export default function ThailandAmanotesCampaign() {
  const [campaign, setCampaign] = useState<CampaignBuilder>({
    gameTitle: 'Beat Fever: Music Rhythm Game',
    genre: 'Music/Rhythm',
    budget: 75000,
    duration: 14,
    objectives: ['User Acquisition', 'Brand Awareness'],
    selectedCreators: [],
    contentTypes: ['Video Review', 'Live Stream', 'TikTok Challenge'],
    targetAudience: 'Thai music game enthusiasts, 16-35 years'
  });

  const [prediction, setPrediction] = useState<CampaignPrediction | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);

  // Calculate predictions when creators change
  useEffect(() => {
    if (campaign.selectedCreators.length > 0) {
      const pred = calculateCampaignPrediction(
        campaign.selectedCreators,
        campaign.budget,
        campaign.genre
      );
      setPrediction(pred);
    } else {
      setPrediction(null);
    }
  }, [campaign.selectedCreators, campaign.budget, campaign.genre]);

  const handleCreatorToggle = (creatorId: string) => {
    setCampaign(prev => ({
      ...prev,
      selectedCreators: prev.selectedCreators.includes(creatorId)
        ? prev.selectedCreators.filter(id => id !== creatorId)
        : [...prev.selectedCreators, creatorId]
    }));
  };

  const getCreatorsByTier = (tier: string) => {
    return thaiCreators.filter(creator => creator.tier === tier);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const CreatorCard = ({ creator }: { creator: ThaiCreator }) => {
    const isSelected = campaign.selectedCreators.includes(creator.id);
    const totalCost = creator.rates.videoRate + creator.rates.postRate;
    
    return (
      <div 
        className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
          isSelected 
            ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105' 
            : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
        }`}
        onClick={() => handleCreatorToggle(creator.id)}
      >
        {isSelected && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        )}
        
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {creator.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">{creator.name}</h3>
            <p className="text-gray-600">{creator.handle}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                creator.tier === 'mega' ? 'bg-purple-100 text-purple-800' :
                creator.tier === 'macro' ? 'bg-blue-100 text-blue-800' :
                creator.tier === 'micro' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {creator.tier.toUpperCase()}
              </span>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-3 h-3" />
                {creator.responseTime}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatNumber(creator.followers)}
            </div>
            <div className="text-sm text-gray-500">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {creator.engagement}%
            </div>
            <div className="text-sm text-gray-500">Engagement</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">Specializes in:</div>
          <div className="flex flex-wrap gap-1">
            {creator.gameGenres.slice(0, 3).map(genre => (
              <span key={genre} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                {genre}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">Platforms:</div>
          <div className="flex gap-2">
            {creator.platforms.map(platform => (
              <div key={platform} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold">
                  {platform === 'YouTube' ? 'YT' : 
                   platform === 'TikTok' ? 'TT' :
                   platform === 'Instagram' ? 'IG' :
                   platform === 'Twitch' ? 'TW' : 'FB'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-bold text-green-600">
                {formatCurrency(totalCost)}
              </div>
              <div className="text-sm text-gray-500">Package Rate</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-purple-600">
                Brand Safety: {creator.brandSafety}%
              </div>
              <div className="text-xs text-gray-500">
                Avg Views: {formatNumber(creator.avgViews)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Music className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Thailand Music Gaming Campaign</h1>
            </div>
            <p className="text-lg text-purple-100 mb-4">
              Launch Beat Fever across Thailand's vibrant gaming community
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{thailandMarketData.totalGamers.toLocaleString()} Thai Gamers</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <span>{thailandMarketData.mobileGamers.toLocaleString()} Mobile Players</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>฿{thailandMarketData.avgSpending} Avg Spending</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-2">{formatCurrency(campaign.budget)}</div>
            <div className="text-purple-200">Campaign Budget</div>
          </div>
        </div>
      </div>

      {/* Market Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Music Gaming Trends
          </h3>
          <div className="space-y-3">
            {thailandInsights.bestPerformingGenres.slice(0, 2).map((insight, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{insight}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Seasonal Insights
          </h3>
          <div className="space-y-3">
            {thailandInsights.seasonalTrends.slice(0, 2).map((trend, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{trend}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-600" />
            Platform Performance
          </h3>
          <div className="space-y-3">
            {thailandMarketData.platforms.slice(0, 3).map((platform) => (
              <div key={platform.platform} className="flex justify-between items-center">
                <span className="text-sm font-medium">{platform.platform}</span>
                <div className="text-right">
                  <div className="text-sm font-bold">{formatNumber(platform.users)}</div>
                  <div className="text-xs text-green-600">+{platform.growth}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>      {/* 
Creator Selection */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b">
          <h2 className="text-2xl font-bold mb-2">Select Thai Gaming Creators</h2>
          <p className="text-gray-600">
            Choose from our curated network of verified Thai gaming influencers
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Mega (1M+ followers)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Macro (100K-1M)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Micro (10K-100K)</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Mega Influencers */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-600" />
              Mega Influencers (Premium Tier)
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getCreatorsByTier('mega').map(creator => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </div>

          {/* Macro Influencers */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-600" />
              Macro Influencers (Growth Tier)
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {getCreatorsByTier('macro').map(creator => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </div>

          {/* Micro Influencers */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-600" />
              Micro Influencers (Engagement Tier)
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {getCreatorsByTier('micro').map(creator => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Predictions */}
      {prediction && campaign.selectedCreators.length > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-green-600" />
            AI-Powered Campaign Predictions
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {formatNumber(prediction.totalReach)}
              </div>
              <div className="text-sm text-gray-600">Total Reach</div>
              <div className="text-xs text-green-600 mt-1">
                {prediction.audienceOverlap}% overlap accounted
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {formatNumber(prediction.estimatedViews)}
              </div>
              <div className="text-sm text-gray-600">Estimated Views</div>
              <div className="text-xs text-green-600 mt-1">
                Genre-optimized
              </div>
            </div>
            
            <div className="text-3xl font-bold text-green-600 mb-2 text-center">
              {formatNumber(prediction.estimatedDownloads)}
            </div>
            <div className="text-sm text-gray-600 text-center">App Downloads</div>
            <div className="text-xs text-green-600 mt-1 text-center">
              {prediction.conversionRate.toFixed(1)}% conversion rate
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {formatCurrency(prediction.revenueImpact)}
              </div>
              <div className="text-sm text-gray-600">Revenue Impact</div>
              <div className="text-xs text-green-600 mt-1">
                {(prediction.revenueImpact / campaign.budget).toFixed(1)}x ROI
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Audience Demographics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Primary Age Group:</span>
                  <span className="text-sm font-semibold">18-24 years (38%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Gender Split:</span>
                  <span className="text-sm font-semibold">45% Male, 55% Female</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Top Location:</span>
                  <span className="text-sm font-semibold">Bangkok (35%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Engagement Rate:</span>
                  <span className="text-sm font-semibold text-green-600">
                    {prediction.engagementRate.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Performance Metrics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Click-Through Rate:</span>
                  <span className="text-sm font-semibold text-blue-600">
                    {prediction.clickThroughRate.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Brand Awareness Lift:</span>
                  <span className="text-sm font-semibold text-purple-600">
                    {prediction.brandAwareness}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Campaign Duration:</span>
                  <span className="text-sm font-semibold">{campaign.duration} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Cost per Download:</span>
                  <span className="text-sm font-semibold text-green-600">
                    {formatCurrency(campaign.budget / prediction.estimatedDownloads)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Ready to Launch Campaign?</h3>
                <p className="text-blue-100">
                  {campaign.selectedCreators.length} creators selected • 
                  Estimated {campaign.duration} day campaign • 
                  {formatNumber(prediction.totalReach)} total reach
                </p>
              </div>
              <Button 
                onClick={() => setShowResults(true)}
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3"
              >
                Launch Campaign
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Summary */}
      {campaign.selectedCreators.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-yellow-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Select Creators to See Predictions</h3>
          <p className="text-gray-600 mb-4">
            Choose from our verified Thai gaming creators to see AI-powered campaign predictions, 
            audience insights, and ROI estimates.
          </p>
          <div className="text-sm text-gray-500">
            💡 Tip: Mix different creator tiers for optimal reach and engagement
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Campaign Successfully Created!</h2>
              <p className="text-gray-600">
                Your Thailand music gaming campaign is now live and being executed by our AI system.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-4">Campaign Details:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Game:</span>
                  <div className="font-semibold">{campaign.gameTitle}</div>
                </div>
                <div>
                  <span className="text-gray-600">Budget:</span>
                  <div className="font-semibold">{formatCurrency(campaign.budget)}</div>
                </div>
                <div>
                  <span className="text-gray-600">Creators:</span>
                  <div className="font-semibold">{campaign.selectedCreators.length} selected</div>
                </div>
                <div>
                  <span className="text-gray-600">Duration:</span>
                  <div className="font-semibold">{campaign.duration} days</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-semibold">Creators Contacted</div>
                  <div className="text-sm text-gray-600">
                    All selected creators have been notified and briefed
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-semibold">Content Creation Started</div>
                  <div className="text-sm text-gray-600">
                    First content pieces expected within 24-48 hours
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="font-semibold">Real-time Tracking Active</div>
                  <div className="text-sm text-gray-600">
                    Monitor performance in your dashboard
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={() => setShowResults(false)}
                className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Close
              </Button>
              <Button 
                onClick={() => window.location.href = '/dashboard/analytics'}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                View Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}