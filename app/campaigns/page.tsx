'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  Play, 
  Pause, 
  Eye, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Shield, 
  Zap,
  Target,
  Globe,
  BarChart3,
  ArrowRight,
  Briefcase
} from 'lucide-react';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 'camp_001',
      title: 'Ozzy Arcade: Global Launch Campaign',
      gameTitle: 'Ozzy Arcade',
      studio: 'Amanotes',
      status: 'completed',
      budget: 250000,
      spent: 247500,
      creatorCount: 35,
      metrics: {
        roi: 236,
        installs: 125000,
        revenue: 89500,
        reach: 4200000
      },
      regions: ['Global', 'US', 'UK', 'CA', 'AU'],
      fraudPrevented: 2850,
      fraudSavings: 12400
    },
    {
      id: 'camp_002',
      title: 'Ozzy Arcade: APAC Market Expansion',
      gameTitle: 'Ozzy Arcade',
      studio: 'Amanotes',
      status: 'active',
      budget: 180000,
      spent: 156800,
      creatorCount: 28,
      metrics: {
        roi: 243,
        installs: 98500,
        revenue: 67800,
        reach: 3800000
      },
      regions: ['TH', 'VN', 'ID', 'MY', 'SG'],
      fraudPrevented: 1950,
      fraudSavings: 8900
    },
    {
      id: 'camp_003',
      title: 'Massive APAC Gaming Expansion',
      gameTitle: 'Multiple Amanotes Titles',
      studio: 'Amanotes',
      status: 'draft',
      budget: 500000,
      spent: 0,
      creatorCount: 85,
      metrics: {
        roi: 0,
        installs: 0,
        revenue: 0,
        reach: 0
      },
      regions: ['TH', 'VN', 'ID', 'MY', 'SG', 'PH', 'KR', 'JP'],
      fraudPrevented: 0,
      fraudSavings: 0
    }
  ]);

  const [creators] = useState([
    { id: 'creator_001', name: 'GameMaster Pro', location: 'United States', followers: 259000, campaigns: 3, earnings: 28500 },
    { id: 'creator_002', name: 'StreamQueen', location: 'United Kingdom', followers: 437000, campaigns: 2, earnings: 22500 },
    { id: 'creator_003', name: 'ThaiGamerKing', location: 'Thailand', followers: 347000, campaigns: 2, earnings: 18500 },
    { id: 'creator_004', name: 'VietnamGameHub', location: 'Vietnam', followers: 299000, campaigns: 2, earnings: 15500 },
    { id: 'creator_005', name: 'IndonesiaGaming', location: 'Indonesia', followers: 312000, campaigns: 2, earnings: 17200 }
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />;
      case 'completed': return <Eye className="w-4 h-4" />;
      case 'draft': return <Calendar className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const launchCampaign = (campaignId: string) => {
    const results = {
      roi: Math.floor(Math.random() * 100) + 200,
      installs: Math.floor(Math.random() * 50000) + 20000,
      revenue: Math.floor(Math.random() * 100000) + 50000,
      fraudBlocked: Math.floor(Math.random() * 100) + 50
    };

    setCampaigns(prev => prev.map(c => 
      c.id === campaignId 
        ? { 
            ...c, 
            status: 'active',
            metrics: {
              ...c.metrics,
              roi: results.roi,
              installs: results.installs,
              revenue: results.revenue
            },
            fraudPrevented: results.fraudBlocked
          }
        : c
    ));

    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;
    
    alert(`🚀 Campaign "${campaign.title}" Launched!\n\n📈 ROI: ${results.roi}%\n📱 Installs: ${results.installs.toLocaleString()}\n💰 Revenue: $${results.revenue.toLocaleString()}\n🛡️ Fraud Blocked: ${results.fraudBlocked} events\n\n✅ Campaign is now live!`);
  };

  const pauseCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.map(c => 
      c.id === campaignId ? { ...c, status: 'paused' } : c
    ));
    alert('⏸️ Campaign paused successfully!');
  };

  const optimizeCampaign = (campaignId: string) => {
    const improvements = {
      roiIncrease: Math.floor(Math.random() * 20) + 10,
      fraudReduction: Math.floor(Math.random() * 15) + 5,
      engagementBoost: Math.floor(Math.random() * 25) + 15
    };

    setCampaigns(prev => prev.map(c => 
      c.id === campaignId 
        ? { 
            ...c, 
            metrics: {
              ...c.metrics,
              roi: c.metrics.roi + improvements.roiIncrease
            }
          }
        : c
    ));

    alert(`🤖 AI Optimization Complete!\n\n📈 ROI Improved: +${improvements.roiIncrease}%\n🛡️ Fraud Reduced: -${improvements.fraudReduction}%\n💬 Engagement Boost: +${improvements.engagementBoost}%\n\n✨ Campaign performance enhanced!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Launch APAC Campaign</h1>
              </div>
              <p className="text-lg text-blue-100 mb-4">
                Electronics brand ready? Let's capture the $2.4B APAC influencer market
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>Thailand • Vietnam • Indonesia</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>12,000+ Verified Influencers</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>340% Avg ROI</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold mb-2">$200K</div>
              <div className="text-blue-200">Ready to Deploy</div>
            </div>
          </div>
        </div>

        {/* Strategic Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* AI Batch Selection */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
              <h3 className="text-lg font-semibold">AI Batch Selection</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Let AI select 50-100 perfect influencers for maximum ROI across APAC markets
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-blue-600">$200K</span>
              <span className="text-sm text-green-600 font-medium">340% ROI</span>
            </div>
            <Button 
              onClick={() => window.location.href = '/batch-campaign'}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Launch Batch Campaign
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Market Intelligence */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-green-600" />
              <h3 className="text-lg font-semibold">APAC Market Intel</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Real-time insights into $2.4B APAC influencer market with industry benchmarks
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-green-600">$2.4B</span>
              <span className="text-sm text-green-600 font-medium">+28% Growth</span>
            </div>
            <Button 
              onClick={() => window.location.href = '/dashboard/market-intelligence'}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              View Market Data
              <BarChart3 className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Agency Demo */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-8 h-8 text-purple-600" />
              <h3 className="text-lg font-semibold">Agency Platform</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Multi-client campaign management for APAC marketing agencies
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-purple-600">50+</span>
              <span className="text-sm text-purple-600 font-medium">Agencies</span>
            </div>
            <Button 
              onClick={() => window.location.href = '/agency-demo'}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Agency Demo
              <Users className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Campaign Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Campaigns</p>
                <p className="text-3xl font-bold text-blue-600">{campaigns.length}</p>
              </div>
              <Play className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-3xl font-bold text-green-600">
                  ${campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Creators</p>
                <p className="text-3xl font-bold text-purple-600">{creators.length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg ROI</p>
                <p className="text-3xl font-bold text-orange-600">
                  {Math.round(campaigns.reduce((sum, c) => sum + c.metrics.roi, 0) / campaigns.length)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Campaign List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">All Campaigns</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <div 
                    key={campaign.id}
                    onClick={() => setSelectedCampaign(campaign)}
                    className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedCampaign?.id === campaign.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{campaign.title}</h3>
                        <p className="text-sm text-gray-600">{campaign.gameTitle} • {campaign.studio}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(campaign.status)}`}>
                          {getStatusIcon(campaign.status)}
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Budget</div>
                        <div className="font-semibold">${campaign.budget.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Creators</div>
                        <div className="font-semibold">{campaign.creatorCount}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">ROI</div>
                        <div className="font-semibold text-green-600">{campaign.metrics.roi}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Installs</div>
                        <div className="font-semibold">{campaign.metrics.installs.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {campaign.regions.slice(0, 3).join(', ')}
                          {campaign.regions.length > 3 && ` +${campaign.regions.length - 3}`}
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield className="w-4 h-4" />
                          {campaign.fraudPrevented} fraud blocked
                        </span>
                      </div>
                      
                      <div className="flex gap-2">
                        {campaign.status === 'draft' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              launchCampaign(campaign.id);
                            }}
                            className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                          >
                            Launch
                          </button>
                        )}
                        {campaign.status === 'active' && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                pauseCampaign(campaign.id);
                              }}
                              className="px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700 transition-colors"
                            >
                              Pause
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                optimizeCampaign(campaign.id);
                              }}
                              className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors flex items-center gap-1"
                            >
                              <Zap className="w-3 h-3" />
                              Optimize
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Campaign Details */}
          <div className="space-y-6">
            {selectedCampaign && (
              <>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Campaign Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{selectedCampaign.title}</h4>
                      <p className="text-sm text-gray-600">{selectedCampaign.gameTitle}</p>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Budget Usage</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(selectedCampaign.spent / selectedCampaign.budget) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>${selectedCampaign.spent.toLocaleString()} spent</span>
                        <span>${selectedCampaign.budget.toLocaleString()} budget</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{selectedCampaign.metrics.roi}%</div>
                      <div className="text-sm text-green-600">ROI</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{selectedCampaign.metrics.installs.toLocaleString()}</div>
                      <div className="text-sm text-blue-600">Installs</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{selectedCampaign.metrics.reach.toLocaleString()}</div>
                      <div className="text-sm text-purple-600">Reach</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">${selectedCampaign.metrics.revenue.toLocaleString()}</div>
                      <div className="text-sm text-orange-600">Revenue</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-red-600">Fraud Prevention</div>
                        <div className="font-semibold text-red-800">{selectedCampaign.fraudPrevented} events blocked</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-red-600">Savings</div>
                        <div className="font-semibold text-red-800">${selectedCampaign.fraudSavings}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Campaign Creators</h3>
                  
                  <div className="space-y-3">
                    {creators.slice(0, 3).map((creator) => (
                      <div key={creator.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{creator.name}</div>
                          <div className="text-sm text-gray-600">{creator.location} • {creator.followers.toLocaleString()} followers</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Earnings</div>
                          <div className="font-medium text-green-600">${creator.earnings.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}