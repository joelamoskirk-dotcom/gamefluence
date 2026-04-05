'use client';

import { useState, useEffect, useCallback } from 'react';
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
  Trophy,
  Flag,
  Star,
  Play,
  Calendar,
  DollarSign,
  UserCheck,
  Gamepad2,
  Crown
} from 'lucide-react';
import { Campaign2OzzyArcadeAPAC } from '@/lib/campaign-2-ozzy-arcade-apac';
import { APACCreatorsDatabase } from '@/lib/apac-creators-database';

export default function Campaign2APACDashboard() {
  const [campaign2Data, setCampaign2Data] = useState<any>(null);
  const [topCreators, setTopCreators] = useState<any[]>([]);
  const [campaign1Learnings, setCampaign1Learnings] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const loadCampaign2Data = useCallback(() => {
    const data = Campaign2OzzyArcadeAPAC.generateCampaign2Data();
    const creators = APACCreatorsDatabase.getTopRecommendations(20);
    const learnings = Campaign2OzzyArcadeAPAC.getCampaign1Learnings();
    
    setCampaign2Data(data);
    setTopCreators(creators);
    setCampaign1Learnings(learnings);
  }, []);

  useEffect(() => {
    loadCampaign2Data();
  }, [loadCampaign2Data]);

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

  if (!campaign2Data) return <div>Loading Campaign 2 data...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Trophy className="w-8 h-8 text-primary" />
            Campaign 2: Ozzy Arcade APAC Racing Championship
          </h1>
          <p className="text-gray-600 mt-2">Vietnamese Racing Star × APAC Gaming Collaboration</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {campaign2Data.campaignInfo.status.toUpperCase()}
            </span>
            <span className="text-sm text-gray-500">
              {campaign2Data.campaignInfo.phase}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(campaign2Data.campaignInfo.totalBudget)}
          </div>
          <div className="text-sm text-gray-500">Total Budget</div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card text-center">
          <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="text-sm font-medium text-gray-500 mb-1">Target Markets</h3>
          <p className="text-2xl font-bold">4 Countries</p>
          <p className="text-xs text-gray-500">Indonesia, Philippines, Thailand, Vietnam</p>
        </div>
        <div className="card text-center">
          <Users className="w-8 h-8 text-secondary mx-auto mb-2" />
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Creators</h3>
          <p className="text-2xl font-bold">{campaign2Data.creatorStrategy.totalCreators}</p>
          <p className="text-xs text-gray-500">APAC Gaming Influencers</p>
        </div>
        <div className="card text-center">
          <Target className="w-8 h-8 text-accent mx-auto mb-2" />
          <h3 className="text-sm font-medium text-gray-500 mb-1">Expected Downloads</h3>
          <p className="text-2xl font-bold">{formatNumber(campaign2Data.expectedOutcomes.downloads.total)}</p>
          <p className="text-xs text-gray-500">Across all markets</p>
        </div>
        <div className="card text-center">
          <DollarSign className="w-8 h-8 text-success mx-auto mb-2" />
          <h3 className="text-sm font-medium text-gray-500 mb-1">Revenue Target</h3>
          <p className="text-2xl font-bold">{formatCurrency(campaign2Data.expectedOutcomes.revenue.total)}</p>
          <p className="text-xs text-gray-500">4-month projection</p>
        </div>
      </div>

      {/* Vietnamese Racing Star Collaboration */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Crown className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl font-bold">Vietnamese Racing Star Collaboration</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-lg mb-3">Duc &quot;Lightning&quot; Nguyen</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Role:</strong> {campaign2Data.collaboration.primaryAmbassador.role}</p>
              <p><strong>Contract Value:</strong> {formatCurrency(campaign2Data.collaboration.primaryAmbassador.contractValue)}</p>
              <p><strong>Exclusivity:</strong> {campaign2Data.collaboration.primaryAmbassador.exclusivityPeriod}</p>
              <p><strong>Expected Reach:</strong> {formatNumber(campaign2Data.collaboration.crossMarketStrategy.expectedReach)}</p>
              <p><strong>Projected Conversions:</strong> {formatNumber(campaign2Data.collaboration.crossMarketStrategy.projectedConversions)}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Key Deliverables</h4>
            <ul className="space-y-1 text-sm">
              {campaign2Data.collaboration.primaryAmbassador.deliverables.map((deliverable: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Market Targeting Strategy */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Market Targeting Strategy</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {campaign2Data.marketTargeting.primaryMarkets.map((market: any, index: number) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Flag className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-lg">{market.country}</h4>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    {formatCurrency(market.budgetAllocation)}
                  </div>
                  <div className="text-xs text-gray-500">Budget Allocation</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-sm text-gray-500">Target Downloads</div>
                  <div className="font-semibold">{formatNumber(market.targetDownloads)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Expected Revenue</div>
                  <div className="font-semibold">{formatCurrency(market.expectedRevenue)}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold">{formatNumber(market.keyMetrics.reach)}</div>
                  <div className="text-gray-500">Reach</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold">{market.keyMetrics.ctr}%</div>
                  <div className="text-gray-500">CTR</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold">${market.keyMetrics.cpm}</div>
                  <div className="text-gray-500">CPM</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Creator Strategy */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Creator Strategy & Distribution</h3>
        
        {/* Tier Distribution */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Creator Tier Distribution</h4>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
              <Crown className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-700">
                {campaign2Data.creatorStrategy.tierDistribution.platinum}
              </div>
              <div className="text-sm text-yellow-600">Platinum</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
              <Star className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-700">
                {campaign2Data.creatorStrategy.tierDistribution.gold}
              </div>
              <div className="text-sm text-gray-600">Gold</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
              <UserCheck className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-700">
                {campaign2Data.creatorStrategy.tierDistribution.silver}
              </div>
              <div className="text-sm text-orange-600">Silver</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
              <Users className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-700">
                {campaign2Data.creatorStrategy.tierDistribution.bronze}
              </div>
              <div className="text-sm text-amber-600">Bronze</div>
            </div>
          </div>
        </div>

        {/* Top Recommended Creators */}
        <div>
          <h4 className="font-semibold mb-3">Top Recommended Creators</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {topCreators.slice(0, 8).map((creator, index) => (
              <div key={creator.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      creator.tier === 'platinum' ? 'bg-yellow-500' :
                      creator.tier === 'gold' ? 'bg-gray-400' :
                      creator.tier === 'silver' ? 'bg-orange-400' : 'bg-amber-400'
                    }`}></div>
                    <div>
                      <h5 className="font-semibold">{creator.name}</h5>
                      <p className="text-sm text-gray-500">{creator.country}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-primary">
                      {creator.recommendationScore.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500">Score</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                  <div className="text-center">
                    <div className="font-semibold">{formatNumber(creator.totalFollowers)}</div>
                    <div className="text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{creator.avgEngagement.toFixed(1)}%</div>
                    <div className="text-gray-500">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{creator.racingGameExperience}/10</div>
                    <div className="text-gray-500">Racing Exp</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {creator.specialties.slice(0, 3).map((specialty: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign 1 Learnings */}
      {campaign1Learnings && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Campaign 1 Learnings & Optimizations</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <div>
              <h4 className="font-semibold mb-3">Top Performers from Campaign 1</h4>
              <div className="space-y-3">
                {campaign1Learnings.topPerformers.map((performer: any, index: number) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold">{performer.name}</h5>
                      <span className="text-sm text-green-600 font-semibold">
                        {performer.performance.split(' - ')[1]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{performer.recommendation}</p>
                    <div className="flex flex-wrap gap-1">
                      {performer.keyStrengths.map((strength: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Insights */}
            <div>
              <h4 className="font-semibold mb-3">Key Insights & Optimizations</h4>
              <div className="space-y-2">
                {campaign1Learnings.keyInsights.map((insight: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{insight}</span>
                  </div>
                ))}
              </div>
              
              <h5 className="font-semibold mt-4 mb-2">Budget Optimization</h5>
              <div className="space-y-2">
                {campaign1Learnings.budgetOptimization.bestPerformingPlatforms.map((platform: any, index: number) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span>{platform.platform}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{platform.roi}x ROI</span>
                      <span className="text-blue-600">{platform.recommendation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Timeline */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Campaign Timeline & Phases</h3>
        <div className="space-y-4">
          {campaign2Data.contentPlan.phases.map((phase: any, index: number) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-lg">{phase.phase}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {phase.duration}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-semibold text-sm mb-2">Objectives</h5>
                  <ul className="space-y-1">
                    {phase.objectives.map((objective: string, idx: number) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <Target className="w-3 h-3 mt-0.5 flex-shrink-0 text-blue-500" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-semibold text-sm mb-2">Content Types</h5>
                  <ul className="space-y-1">
                    {phase.contentTypes.map((content: string, idx: number) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <Play className="w-3 h-3 mt-0.5 flex-shrink-0 text-green-500" />
                        {content}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-semibold text-sm mb-2">Key Activities</h5>
                  <ul className="space-y-1">
                    {phase.keyActivities.map((activity: string, idx: number) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <Zap className="w-3 h-3 mt-0.5 flex-shrink-0 text-purple-500" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expected Outcomes */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Expected Outcomes & Success Metrics</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Downloads by Market */}
          <div>
            <h4 className="font-semibold mb-3">Downloads by Market</h4>
            <div className="space-y-2">
              {Object.entries(campaign2Data.expectedOutcomes.downloads.byMarket).map(([market, downloads]) => (
                <div key={market} className="flex items-center justify-between">
                  <span className="text-sm">{market}</span>
                  <span className="font-semibold">{formatNumber(downloads as number)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue by Market */}
          <div>
            <h4 className="font-semibold mb-3">Revenue by Market</h4>
            <div className="space-y-2">
              {Object.entries(campaign2Data.expectedOutcomes.revenue.byMarket).map(([market, revenue]) => (
                <div key={market} className="flex items-center justify-between">
                  <span className="text-sm">{market}</span>
                  <span className="font-semibold">{formatCurrency(revenue as number)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Metrics */}
          <div>
            <h4 className="font-semibold mb-3">Brand Metrics</h4>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Brand Awareness</span>
                  <span className="font-semibold">{campaign2Data.expectedOutcomes.brandMetrics.brandAwareness}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${campaign2Data.expectedOutcomes.brandMetrics.brandAwareness}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Brand Consideration</span>
                  <span className="font-semibold">{campaign2Data.expectedOutcomes.brandMetrics.brandConsideration}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${campaign2Data.expectedOutcomes.brandMetrics.brandConsideration}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Purchase Intent</span>
                  <span className="font-semibold">{campaign2Data.expectedOutcomes.brandMetrics.purchaseIntent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${campaign2Data.expectedOutcomes.brandMetrics.purchaseIntent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}