'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  Users, 
  Target, 
  Zap, 
  TrendingUp, 
  DollarSign,
  CheckCircle,
  Star,
  Globe,
  Filter,
  Search,
  ArrowRight,
  BarChart3,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  Award,
  Briefcase
} from 'lucide-react';

interface InfluencerProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  tier: 'nano' | 'micro' | 'macro' | 'mega';
  category: string;
  followers: number;
  engagement: number;
  avgViews: number;
  
  // Performance metrics
  metrics: {
    brandSafety: number;
    responseTime: string;
    completionRate: number;
    avgROI: number;
  };
  
  // Audience data
  audience: {
    ageGroups: { [key: string]: number };
    gender: { male: number; female: number };
    locations: { [key: string]: number };
    interests: string[];
  };
  
  // Pricing
  rates: {
    postRate: number;
    storyRate: number;
    videoRate: number;
    packageRate: number;
  };
  
  // Platform presence
  platforms: {
    platform: string;
    followers: number;
    engagement: number;
  }[];
  
  // Recent work
  recentCampaigns: string[];
  languages: string[];
  specialties: string[];
}

interface CampaignBrief {
  objectives: string[];
  targetAudience: string;
  budget: number;
  duration: number;
  contentTypes: string[];
  kpis: string[];
  brandGuidelines: string[];
}

interface BatchRecommendation {
  totalInfluencers: number;
  estimatedReach: number;
  estimatedEngagement: number;
  totalCost: number;
  predictedROI: number;
  audienceOverlap: number;
  
  tierBreakdown: {
    tier: string;
    count: number;
    reach: number;
    cost: number;
  }[];
  
  categoryMix: {
    category: string;
    count: number;
    rationale: string;
  }[];
}

export default function BatchInfluencerSelector() {
  const [campaignBrief, setCampaignBrief] = useState<CampaignBrief>({
    objectives: ['Brand Awareness', 'User Acquisition'],
    targetAudience: 'APAC gaming enthusiasts, 18-35 years',
    budget: 200000,
    duration: 21,
    contentTypes: ['Video Reviews', 'Live Streams', 'Social Posts'],
    kpis: ['Reach', 'Engagement', 'Conversions', 'Brand Lift'],
    brandGuidelines: ['Family-friendly content', 'Authentic reviews', 'Clear disclosures']
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Gaming', 'Tech', 'Lifestyle']);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['Thailand', 'Vietnam', 'Indonesia']);
  const [batchRecommendation, setBatchRecommendation] = useState<BatchRecommendation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Mock influencer database
  const influencerCategories = [
    { name: 'Gaming', count: 1250, avgEngagement: 8.5, avgCost: 2500 },
    { name: 'Tech', count: 890, avgEngagement: 6.2, avgCost: 3200 },
    { name: 'Lifestyle', count: 2100, avgEngagement: 7.8, avgCost: 2800 },
    { name: 'Fashion', count: 1650, avgEngagement: 9.1, avgCost: 3500 },
    { name: 'Food', count: 1420, avgEngagement: 8.9, avgCost: 2200 },
    { name: 'Fitness', count: 980, avgEngagement: 7.5, avgCost: 2600 },
    { name: 'Travel', count: 750, avgEngagement: 6.8, avgCost: 3800 },
    { name: 'Beauty', count: 1850, avgEngagement: 9.5, avgCost: 3100 }
  ];

  const apacRegions = [
    { name: 'Thailand', influencers: 3200, avgCost: 0.85, growth: 28 },
    { name: 'Vietnam', influencers: 2800, avgCost: 0.65, growth: 35 },
    { name: 'Indonesia', influencers: 4500, avgCost: 0.45, growth: 32 },
    { name: 'Singapore', influencers: 1200, avgCost: 1.25, growth: 18 },
    { name: 'Malaysia', influencers: 1800, avgCost: 0.75, growth: 25 },
    { name: 'Philippines', influencers: 2200, avgCost: 0.55, growth: 30 }
  ];

  // Generate AI-powered batch recommendations
  const generateBatchRecommendation = () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const totalInfluencers = Math.floor(campaignBrief.budget / 2000); // Avg $2K per influencer
      const baseReach = totalInfluencers * 45000; // Avg 45K reach per influencer
      const audienceOverlap = Math.max(15, Math.min(35, totalInfluencers * 0.8)); // Overlap increases with count
      const effectiveReach = Math.round(baseReach * (1 - audienceOverlap / 100));
      
      const recommendation: BatchRecommendation = {
        totalInfluencers: Math.min(totalInfluencers, 100), // Cap at 100 influencers
        estimatedReach: effectiveReach,
        estimatedEngagement: Math.round(effectiveReach * 0.078), // 7.8% avg engagement
        totalCost: Math.round(campaignBrief.budget * 0.95), // 95% of budget
        predictedROI: Math.round(280 + (selectedRegions.length * 15)), // Higher ROI with more regions
        audienceOverlap,
        
        tierBreakdown: [
          { tier: 'Mega (1M+)', count: Math.floor(totalInfluencers * 0.1), reach: Math.round(effectiveReach * 0.4), cost: Math.round(campaignBrief.budget * 0.35) },
          { tier: 'Macro (100K-1M)', count: Math.floor(totalInfluencers * 0.3), reach: Math.round(effectiveReach * 0.35), cost: Math.round(campaignBrief.budget * 0.4) },
          { tier: 'Micro (10K-100K)', count: Math.floor(totalInfluencers * 0.6), reach: Math.round(effectiveReach * 0.25), cost: Math.round(campaignBrief.budget * 0.25) }
        ],
        
        categoryMix: selectedCategories.map(category => {
          const categoryData = influencerCategories.find(c => c.name === category);
          return {
            category,
            count: Math.floor(totalInfluencers / selectedCategories.length),
            rationale: category === 'Gaming' ? 'Core audience alignment with high engagement' :
                      category === 'Tech' ? 'Product category synergy and credibility' :
                      category === 'Lifestyle' ? 'Broader reach and authentic integration' :
                      'Strategic audience expansion and brand association'
          };
        })
      };
      
      setBatchRecommendation(recommendation);
      setIsGenerating(false);
      setShowResults(true);
    }, 2500);
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

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8" />
              <h1 className="text-3xl font-bold">AI Batch Influencer Selection</h1>
            </div>
            <p className="text-lg text-blue-100 mb-4">
              Let our AI select the perfect mix of 50-100 influencers for maximum impact
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>12,000+ APAC Influencers</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>AI-Powered Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Optimized for ROI</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-2">{formatCurrency(campaignBrief.budget)}</div>
            <div className="text-blue-200">Campaign Budget</div>
          </div>
        </div>
      </div>

      {/* Campaign Brief */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-b">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-600" />
            Campaign Brief & Objectives
          </h2>
          <p className="text-gray-600">
            Define your campaign goals and let our AI find the perfect influencer mix
          </p>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Campaign Details */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Campaign Objectives
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Brand Awareness', 'User Acquisition', 'Engagement', 'Sales', 'App Downloads', 'Brand Lift'].map(objective => (
                  <label key={objective} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={campaignBrief.objectives.includes(objective)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCampaignBrief(prev => ({
                            ...prev,
                            objectives: [...prev.objectives, objective]
                          }));
                        } else {
                          setCampaignBrief(prev => ({
                            ...prev,
                            objectives: prev.objectives.filter(o => o !== objective)
                          }));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{objective}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Budget & Duration
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    value={campaignBrief.budget}
                    onChange={(e) => setCampaignBrief(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Campaign Budget"
                  />
                  <div className="text-xs text-gray-500 mt-1">Total campaign budget (USD)</div>
                </div>
                <div>
                  <input
                    type="number"
                    value={campaignBrief.duration}
                    onChange={(e) => setCampaignBrief(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Duration"
                  />
                  <div className="text-xs text-gray-500 mt-1">Campaign duration (days)</div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Target Audience
              </label>
              <textarea
                value={campaignBrief.targetAudience}
                onChange={(e) => setCampaignBrief(prev => ({ ...prev, targetAudience: e.target.value }))}
                className="w-full p-3 border rounded-lg h-20"
                placeholder="Describe your target audience..."
              />
            </div>
          </div>

          {/* Right Column - Targeting */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Influencer Categories
              </label>
              <div className="grid grid-cols-2 gap-2">
                {influencerCategories.map(category => (
                  <label key={category.name} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories(prev => [...prev, category.name]);
                        } else {
                          setSelectedCategories(prev => prev.filter(c => c !== category.name));
                        }
                      }}
                      className="rounded"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{category.name}</div>
                      <div className="text-xs text-gray-500">
                        {category.count} influencers • {category.avgEngagement}% engagement
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Target Regions
              </label>
              <div className="grid grid-cols-2 gap-2">
                {apacRegions.map(region => (
                  <label key={region.name} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedRegions.includes(region.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRegions(prev => [...prev, region.name]);
                        } else {
                          setSelectedRegions(prev => prev.filter(r => r !== region.name));
                        }
                      }}
                      className="rounded"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{region.name}</div>
                      <div className="text-xs text-gray-500">
                        {region.influencers} influencers • +{region.growth}% growth
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="bg-gray-50 p-6 border-t">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">
                Selected: {selectedCategories.length} categories • {selectedRegions.length} regions
              </div>
              <div className="text-xs text-gray-500">
                AI will optimize influencer mix for maximum ROI and reach
              </div>
            </div>
            <Button
              onClick={generateBatchRecommendation}
              disabled={isGenerating || selectedCategories.length === 0 || selectedRegions.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Generating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Generate AI Recommendations
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      {showResults && batchRecommendation && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Award className="w-6 h-6 text-green-600" />
                AI-Optimized Influencer Portfolio
              </h2>
              <p className="text-gray-600">
                Perfect mix of {batchRecommendation.totalInfluencers} influencers across {selectedCategories.length} categories
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {batchRecommendation.predictedROI}% ROI
              </div>
              <div className="text-sm text-gray-600">Predicted return</div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {formatNumber(batchRecommendation.estimatedReach)}
              </div>
              <div className="text-sm text-gray-600">Total Reach</div>
              <div className="text-xs text-green-600 mt-1">
                {batchRecommendation.audienceOverlap}% overlap optimized
              </div>
            </div>
            
            <div className="text-center bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {formatNumber(batchRecommendation.estimatedEngagement)}
              </div>
              <div className="text-sm text-gray-600">Est. Engagement</div>
              <div className="text-xs text-green-600 mt-1">
                7.8% avg rate
              </div>
            </div>
            
            <div className="text-center bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {batchRecommendation.totalInfluencers}
              </div>
              <div className="text-sm text-gray-600">Influencers</div>
              <div className="text-xs text-green-600 mt-1">
                Optimized mix
              </div>
            </div>
            
            <div className="text-center bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {formatCurrency(batchRecommendation.totalCost)}
              </div>
              <div className="text-sm text-gray-600">Total Investment</div>
              <div className="text-xs text-green-600 mt-1">
                95% of budget
              </div>
            </div>
          </div>

          {/* Tier Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Influencer Tier Distribution
              </h3>
              <div className="space-y-4">
                {batchRecommendation.tierBreakdown.map((tier, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{tier.tier}</div>
                      <div className="text-sm text-gray-600">{tier.count} influencers</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatNumber(tier.reach)} reach</div>
                      <div className="text-sm text-gray-600">{formatCurrency(tier.cost)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Category Strategy
              </h3>
              <div className="space-y-4">
                {batchRecommendation.categoryMix.map((category, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{category.category}</div>
                      <div className="text-sm font-semibold">{category.count} influencers</div>
                    </div>
                    <div className="text-xs text-gray-600">{category.rationale}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => setShowResults(false)}
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-8 py-3"
            >
              Modify Brief
            </Button>
            <Button
              onClick={() => alert('🚀 Campaign launched! Our AI is now contacting all selected influencers and will provide real-time updates in your dashboard.')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-semibold"
            >
              Launch Campaign
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      {!showResults && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Batch Selection Works Better</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered Optimization</h3>
              <p className="text-sm text-gray-600">
                Our AI analyzes 50+ data points per influencer to create the perfect mix for your objectives
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Audience Overlap Minimized</h3>
              <p className="text-sm text-gray-600">
                Smart selection reduces audience overlap by 60% compared to manual selection
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Higher ROI Guaranteed</h3>
              <p className="text-sm text-gray-600">
                Batch campaigns show 40% higher ROI than individual influencer selection
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}