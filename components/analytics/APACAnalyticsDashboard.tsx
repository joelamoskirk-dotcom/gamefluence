'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Globe,
  Star,
  Award,
  AlertTriangle,
  CheckCircle,
  Crown,
  Zap,
  BarChart3,
  Eye,
  Shield
} from 'lucide-react';
import { apacStreamerAnalysis, StreamerProfile, MarketAnalysis } from '@/lib/apac-market-streamer-analysis';

export default function APACAnalyticsDashboard() {
  const [selectedMarket, setSelectedMarket] = useState('vietnam');
  const [collabStrategy, setCollabStrategy] = useState<any>(null);
  const [marketComparison, setMarketComparison] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAPACData();
  }, []);

  const loadAPACData = async () => {
    try {
      setLoading(true);
      
      // Generate optimal collaboration strategy
      const strategy = apacStreamerAnalysis.generateOptimalCollabStrategy(500000, 1000000);
      const comparison = apacStreamerAnalysis.generateMarketComparison();
      
      setCollabStrategy(strategy);
      setMarketComparison(comparison);
    } catch (error) {
      console.error('Error loading APAC data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'S': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'A': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'B': return 'bg-green-100 text-green-800 border-green-200';
      case 'C': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getROIColor = (roi: number) => {
    if (roi >= 6.0) return 'text-green-600';
    if (roi >= 5.0) return 'text-blue-600';
    if (roi >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
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
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">APAC Streamer Analysis</h1>
          <p className="text-gray-600 mt-1">
            Market-by-market analysis targeting $1M+ return on $500K investment
          </p>
        </div>
        <Button onClick={loadAPACData} className="bg-purple-600 hover:bg-purple-700">
          <Globe className="h-4 w-4 mr-2" />
          Refresh Analysis
        </Button>
      </div>

      {/* Strategy Overview */}
      {collabStrategy && (
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-purple-600" />
              <span>Optimal Collaboration Strategy</span>
              <Badge className={collabStrategy.targetAchievement >= 100 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {collabStrategy.targetAchievement.toFixed(1)}% of target
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(collabStrategy.totalBudget)}
                </div>
                <div className="text-sm text-gray-600">Total Budget</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(collabStrategy.totalExpectedReturn)}
                </div>
                <div className="text-sm text-gray-600">Expected Return</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {(collabStrategy.overallROI * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600">Overall ROI</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {collabStrategy.marketStrategies.length}
                </div>
                <div className="text-sm text-gray-600">Markets</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">Strategy Recommendation</h4>
                {collabStrategy.targetAchievement >= 100 ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                )}
              </div>
              <p className={`font-medium ${collabStrategy.targetAchievement >= 100 ? 'text-green-700' : 'text-yellow-700'}`}>
                {collabStrategy.recommendation}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <Tabs value="strategy" onValueChange={() => {}} className="space-y-4">
        <TabsList>
          <TabsTrigger value="strategy">Market Strategy</TabsTrigger>
          <TabsTrigger value="streamers">Top Streamers</TabsTrigger>
          <TabsTrigger value="comparison">Market Comparison</TabsTrigger>
          <TabsTrigger value="timeline">Execution Timeline</TabsTrigger>
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
        </TabsList>

        {/* Market Strategy Tab */}
        <TabsContent value="strategy" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {collabStrategy?.marketStrategies.map((strategy: any, index: number) => (
              <Card key={index} className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Globe className="h-5 w-5" />
                      <span>{strategy.market}</span>
                    </span>
                    <Badge className="bg-purple-100 text-purple-800">
                      {(strategy.marketROI * 100).toFixed(0)}% ROI
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Budget Allocation */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Budget:</span>
                      <div className="font-semibold">{formatCurrency(strategy.allocatedBudget)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Expected Return:</span>
                      <div className="font-semibold text-green-600">{formatCurrency(strategy.expectedReturn)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Installs:</span>
                      <div className="font-semibold">{formatNumber(strategy.expectedInstalls)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Market Share:</span>
                      <div className="font-semibold">{strategy.competitiveAdvantage.marketDominance.toFixed(1)}%</div>
                    </div>
                  </div>

                  {/* Selected Collaborations */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Selected Streamers</h4>
                    <div className="space-y-2">
                      {strategy.selectedCollabs.map((collab: any, collabIndex: number) => (
                        <div key={collabIndex} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <Badge className={getTierColor(collab.tier)}>
                                {collab.tier}
                              </Badge>
                              <span className="font-medium text-sm">{collab.streamer}</span>
                              {collab.exclusivity && <Crown className="h-4 w-4 text-yellow-500" />}
                            </div>
                            <span className={`text-sm font-semibold ${getROIColor(collab.roi)}`}>
                              {collab.roi.toFixed(1)}x ROI
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                            <div>Cost: {formatCurrency(collab.cost)}</div>
                            <div>Installs: {formatNumber(collab.expectedInstalls)}</div>
                            <div>Revenue: {formatCurrency(collab.expectedRevenue)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Competitive Advantage */}
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h5 className="font-medium text-blue-900 mb-1">Competitive Position</h5>
                    <p className="text-sm text-blue-700">{strategy.competitiveAdvantage.advantage}</p>
                    <div className="text-xs text-blue-600 mt-1">
                      Quality Score: {strategy.competitiveAdvantage.audienceQuality.toFixed(1)}/10
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Top Streamers Tab */}
        <TabsContent value="streamers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Top APAC Streamers by ROI</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Rank</th>
                      <th className="text-left py-3 px-4 font-semibold">Streamer</th>
                      <th className="text-left py-3 px-4 font-semibold">Market</th>
                      <th className="text-right py-3 px-4 font-semibold">ROI</th>
                      <th className="text-right py-3 px-4 font-semibold">Cost</th>
                      <th className="text-right py-3 px-4 font-semibold">Expected Revenue</th>
                      <th className="text-right py-3 px-4 font-semibold">Installs</th>
                      <th className="text-right py-3 px-4 font-semibold">Market Share</th>
                      <th className="text-left py-3 px-4 font-semibold">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collabStrategy?.topCollabs.map((streamer: any, index: number) => (
                      <tr key={index} className={`border-b ${index < 3 ? 'bg-yellow-50' : ''}`}>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">#{streamer.rank}</span>
                            {index < 3 && <Award className="h-4 w-4 text-yellow-500" />}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{streamer.name}</div>
                            <div className="text-sm text-gray-600">{streamer.realName}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{streamer.market}</Badge>
                        </td>
                        <td className="text-right py-3 px-4">
                          <div className="flex items-center justify-end space-x-1">
                            <Badge className={getTierColor(streamer.tier)}>
                              {streamer.tier}
                            </Badge>
                            <span className={`font-semibold ${getROIColor(streamer.roi)}`}>
                              {streamer.roi.toFixed(1)}x
                            </span>
                          </div>
                        </td>
                        <td className="text-right py-3 px-4">{formatCurrency(streamer.cost)}</td>
                        <td className="text-right py-3 px-4 text-green-600 font-medium">
                          {formatCurrency(streamer.expectedRevenue)}
                        </td>
                        <td className="text-right py-3 px-4">{formatNumber(streamer.expectedInstalls)}</td>
                        <td className="text-right py-3 px-4">{streamer.marketShare.toFixed(1)}%</td>
                        <td className="py-3 px-4">
                          <div className="text-xs">
                            {streamer.exclusivity && (
                              <Badge className="bg-yellow-100 text-yellow-800 mb-1">Exclusive</Badge>
                            )}
                            <div className="text-gray-600">{streamer.recommendation}</div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Market Comparison Tab */}
        <TabsContent value="comparison" className="space-y-4">
          {marketComparison && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {marketComparison.markets.map((market: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{market.market}</span>
                      {market.market === marketComparison.bestMarket.market && (
                        <Badge className="bg-green-100 text-green-800">Best Market</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Gaming Population:</span>
                        <div className="font-semibold">{formatNumber(market.population)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Avg Spend:</span>
                        <div className="font-semibold">{formatCurrency(market.averageSpend)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Growth Rate:</span>
                        <div className="font-semibold text-green-600">+{market.marketGrowth}%</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Opportunity:</span>
                        <div className="font-semibold">{market.marketOpportunity}/10</div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-3">
                      <div className="text-sm text-gray-600 mb-1">Recommended Budget:</div>
                      <div className="font-semibold text-lg">{formatCurrency(market.recommendedBudget)}</div>
                    </div>
                    
                    <div className="border-t pt-3">
                      <div className="text-sm text-gray-600 mb-1">Expected Return:</div>
                      <div className="font-semibold text-lg text-green-600">{formatCurrency(market.expectedReturn)}</div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600 mb-1">Top Streamer:</div>
                      <div className="font-medium">{market.topStreamer}</div>
                      <div className="text-sm text-blue-600">{market.topStreamerROI.toFixed(1)}x ROI</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Execution Timeline Tab */}
        <TabsContent value="timeline" className="space-y-4">
          {collabStrategy?.timeline && (
            <div className="space-y-6">
              {collabStrategy.timeline.phases.map((phase: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{phase.phase}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{phase.duration}</Badge>
                        <Badge className="bg-blue-100 text-blue-800">
                          {formatCurrency(phase.budget)}
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Activities</h4>
                        <ul className="space-y-2">
                          {phase.activities.map((activity: string, actIndex: number) => (
                            <li key={actIndex} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Expected Results</h4>
                        <div className="bg-green-50 rounded-lg p-3">
                          <p className="text-sm text-green-700">{phase.expectedResults}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Key Milestones */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Milestones & Success Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Milestones</h4>
                      <ul className="space-y-2">
                        {collabStrategy.timeline.keyMilestones.map((milestone: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Target className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{milestone}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Success Metrics</h4>
                      <ul className="space-y-2">
                        {collabStrategy.timeline.successMetrics.map((metric: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <BarChart3 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{metric}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Risk Assessment Tab */}
        <TabsContent value="risks" className="space-y-4">
          {collabStrategy?.riskAssessment && (
            <div className="space-y-6">
              {/* Risk Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Risk Assessment Overview</span>
                    </span>
                    <Badge className={
                      collabStrategy.riskAssessment.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                      collabStrategy.riskAssessment.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {collabStrategy.riskAssessment.riskLevel} Risk
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {collabStrategy.riskAssessment.overallRiskScore}
                      </div>
                      <div className="text-sm text-gray-600">Risk Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {collabStrategy.riskAssessment.identifiedRisks.length}
                      </div>
                      <div className="text-sm text-gray-600">Identified Risks</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${
                        collabStrategy.riskAssessment.riskLevel === 'Low' ? 'text-green-600' :
                        collabStrategy.riskAssessment.riskLevel === 'Medium' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {collabStrategy.riskAssessment.riskLevel}
                      </div>
                      <div className="text-sm text-gray-600">Risk Level</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-blue-700 font-medium">
                      {collabStrategy.riskAssessment.recommendation}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Risks */}
              <div className="grid grid-cols-1 gap-4">
                {collabStrategy.riskAssessment.identifiedRisks.map((risk: any, index: number) => (
                  <Card key={index} className={`border-l-4 ${
                    risk.severity === 'High' ? 'border-l-red-500' :
                    risk.severity === 'Medium' ? 'border-l-yellow-500' :
                    'border-l-green-500'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{risk.type}</h4>
                          <p className="text-sm text-gray-600 mb-2">{risk.market}</p>
                          <p className="text-sm text-gray-700">{risk.description}</p>
                        </div>
                        <Badge className={
                          risk.severity === 'High' ? 'bg-red-100 text-red-800' :
                          risk.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {risk.severity}
                        </Badge>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Mitigation Strategy:</p>
                        <p className="text-sm text-gray-600">{risk.mitigation}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}