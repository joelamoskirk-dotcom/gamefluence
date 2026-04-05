'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  Globe, 
  TrendingUp, 
  Users, 
  Target,
  BarChart3,
  Eye,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Trophy,
  MapPin,
  DollarSign,
  Play,
  Pause,
  Settings
} from 'lucide-react';
import { SoutheastAsiaMarketIntelligence } from '@/lib/southeast-asia-market-intelligence';

interface Campaign2Data {
  strategy: any;
  marketInsights: any[];
  topPerformers: any[];
  budget: number;
  timeline: any[];
  expectedResults: any;
}

export default function Campaign2Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [campaign2Data, setCampaign2Data] = useState<Campaign2Data | null>(null);
  const [selectedRegions, setSelectedRegions] = useState(['Vietnam', 'Indonesia', 'Philippines', 'Thailand', 'Australia']);
  const [budget, setBudget] = useState(500000);
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    loadCampaign2Data();
  }, [budget, selectedRegions]);

  const loadCampaign2Data = () => {
    // Generate Campaign 2 strategy using AI
    const strategy = SoutheastAsiaMarketIntelligence.generateCampaign2Strategy(budget);
    const topPerformers = SoutheastAsiaMarketIntelligence.getTopPerformersFromCampaign1();
    
    const marketInsights = selectedRegions.map(region => ({
      region,
      ...SoutheastAsiaMarketIntelligence.getRegionalMarketInsights(region)
    }));

    setCampaign2Data({
      strategy,
      marketInsights,
      topPerformers,
      budget,
      timeline: strategy.timeline,
      expectedResults: strategy.expectedResults
    });
  };

  const handleLaunchCampaign = () => {
    setIsLaunched(true);
    // In real implementation, this would trigger the campaign launch
    console.log('🚀 Campaign 2 Launched!', campaign2Data?.strategy);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (!campaign2Data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Campaign 2 Strategy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Campaign 2: Southeast Asian Expansion</h1>
            <p className="text-purple-100 text-lg">Vietnamese Racing Star × Ozzy Arcade Collaboration</p>
            <div className="flex items-center mt-4 space-x-6">
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                <span>{selectedRegions.length} Markets</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>{campaign2Data.strategy.influencers.length} Influencers</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                <span>{formatCurrency(budget)} Budget</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            {!isLaunched ? (
              <Button 
                onClick={handleLaunchCampaign}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg"
              >
                <Play className="h-5 w-5 mr-2" />
                Launch Campaign 2
              </Button>
            ) : (
              <div className="bg-green-500 rounded-lg px-6 py-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Campaign Active</span>
                </div>
                <p className="text-sm text-green-100 mt-1">Phase 1: Foundation</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Strategy Overview', icon: Target },
            { id: 'markets', label: 'Market Analysis', icon: Globe },
            { id: 'influencers', label: 'Influencer Mix', icon: Users },
            { id: 'timeline', label: 'Campaign Timeline', icon: Clock },
            { id: 'performance', label: 'Expected Results', icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Strategy Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Key Metrics */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Campaign 2 Strategy</h3>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-900 mb-2">Core Strategy</h4>
                <p className="text-blue-800">{campaign2Data.strategy.strategy}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Success Factors</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    {campaign2Data.strategy.successFactors.slice(0, 3).map((factor: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-900 mb-2">Key Risks</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    {campaign2Data.strategy.risks.slice(0, 3).map((risk: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Campaign 1 Top Performers */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                Campaign 1 Top Performers (Returning)
              </h3>
              <div className="space-y-3">
                {campaign2Data.topPerformers.slice(0, 4).map((performer: any) => (
                  <div key={performer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {performer.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{performer.name}</p>
                        <p className="text-sm text-gray-600">{performer.platform} • {performer.region}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">
                        {performer.campaign1Performance?.roi.toFixed(1)}x ROI
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatNumber(performer.campaign1Performance?.reach)} reach
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Campaign Projections</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Reach</span>
                  <span className="font-semibold">{formatNumber(campaign2Data.expectedResults.totalReach)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Expected Conversions</span>
                  <span className="font-semibold">{formatNumber(campaign2Data.expectedResults.expectedConversions)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Projected ROI</span>
                  <span className="font-semibold text-green-600">{campaign2Data.expectedResults.projectedROI.toFixed(1)}x</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Campaign Duration</span>
                  <span className="font-semibold">16 weeks</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Budget Allocation</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Budget</span>
                  <span className="font-semibold">{formatCurrency(budget)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="text-sm text-gray-600">75% allocated to influencer partnerships</div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Vietnamese Racing Star</h3>
              <div className="bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg p-4 text-white">
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Featured Partnership</span>
                </div>
                <p className="text-sm opacity-90">
                  Exclusive collaboration with Vietnam&apos;s top racing influencer for authentic market entry
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm">Expected Impact</span>
                  <span className="font-bold">+40% Engagement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Market Analysis */}
      {activeTab === 'markets' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaign2Data.marketInsights.map((market: any) => (
              <div key={market.region} className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                    {market.region}
                  </h3>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Market Size</p>
                    <p className="font-semibold">{formatNumber(market.marketSize)}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Growth Rate</span>
                    <span className="font-semibold text-green-600">+{market.growth}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Recommended Budget</span>
                    <span className="font-semibold">{formatCurrency(market.recommendedBudget)}</span>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Top Opportunities</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {market.opportunities.slice(0, 2).map((opp: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <TrendingUp className="h-3 w-3 mr-2 mt-1 text-green-500 flex-shrink-0" />
                          {opp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Challenges</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {market.challenges.slice(0, 2).map((challenge: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <AlertTriangle className="h-3 w-3 mr-2 mt-1 text-yellow-500 flex-shrink-0" />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t">
                    <p className="text-sm font-medium text-gray-700 mb-2">Top Influencers</p>
                    <div className="space-y-2">
                      {market.topInfluencers.slice(0, 2).map((influencer: any) => (
                        <div key={influencer.id} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{influencer.name}</span>
                          <span className="font-medium">{formatNumber(influencer.followers)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Influencer Mix */}
      {activeTab === 'influencers' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Selected Influencer Portfolio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaign2Data.strategy.influencers.map((influencer: any) => (
                <div key={influencer.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {influencer.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{influencer.name}</p>
                        <p className="text-sm text-gray-600">{influencer.platform}</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      influencer.tier === 'platinum' ? 'bg-purple-100 text-purple-800' :
                      influencer.tier === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {influencer.tier}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Region</span>
                      <span className="font-medium">{influencer.region}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Followers</span>
                      <span className="font-medium">{formatNumber(influencer.followers)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Engagement</span>
                      <span className="font-medium">{influencer.engagement}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Collaboration Score</span>
                      <span className="font-medium text-green-600">{influencer.collaborationScore}/100</span>
                    </div>
                  </div>

                  {influencer.campaign1Performance && (
                    <div className="mt-3 pt-3 border-t bg-green-50 rounded p-2">
                      <p className="text-xs font-medium text-green-800 mb-1">Campaign 1 Performance</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-green-600">ROI: {influencer.campaign1Performance.roi}x</span>
                        <span className="text-green-600">{formatNumber(influencer.campaign1Performance.conversions)} conversions</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap gap-1">
                    {influencer.niche.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-6">Campaign 2 Execution Timeline</h3>
            <div className="space-y-6">
              {campaign2Data.timeline.map((phase: any, index: number) => (
                <div key={index} className="flex">
                  <div className="flex flex-col items-center mr-6">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    {index < campaign2Data.timeline.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">{phase.phase}</h4>
                    <p className="text-gray-600 mb-3">Duration: {phase.duration}</p>
                    <ul className="space-y-2">
                      {phase.activities.map((activity: string, actIndex: number) => (
                        <li key={actIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Performance Projections */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card text-center">
              <Eye className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{formatNumber(campaign2Data.expectedResults.totalReach)}</p>
              <p className="text-gray-600">Total Reach</p>
            </div>
            <div className="card text-center">
              <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{formatNumber(campaign2Data.expectedResults.expectedConversions)}</p>
              <p className="text-gray-600">Expected Conversions</p>
            </div>
            <div className="card text-center">
              <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{campaign2Data.expectedResults.projectedROI.toFixed(1)}x</p>
              <p className="text-gray-600">Projected ROI</p>
            </div>
            <div className="card text-center">
              <DollarSign className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{formatCurrency(campaign2Data.expectedResults.projectedROI * budget)}</p>
              <p className="text-gray-600">Expected Revenue</p>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Market Penetration Forecast</h3>
            <div className="space-y-4">
              {campaign2Data.expectedResults.marketPenetration.map((market: any) => (
                <div key={market.region} className="flex items-center justify-between">
                  <span className="font-medium">{market.region}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${market.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-12">{market.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}