'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { 
  TrendingUp, 
  TrendingDown,
  Target, 
  DollarSign, 
  Users, 
  BarChart3,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Eye,
  Brain,
  Zap,
  Globe,
  Shield,
  Award
} from 'lucide-react';
import { enhancedMarketIntelligence, NetworkPerformance } from '@/lib/enhanced-market-intelligence';

export default function EnhancedIntelligenceDashboard() {
  const [selectedRegion, setSelectedRegion] = useState('vietnam');
  const [networkReport, setNetworkReport] = useState<any>(null);
  const [launchReadiness, setLaunchReadiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIntelligenceData();
  }, [selectedRegion]);

  const loadIntelligenceData = async () => {
    try {
      setLoading(true);
      
      // Get network comparison report for selected region
      const report = enhancedMarketIntelligence.generateNetworkComparisonReport(selectedRegion);
      const readiness = enhancedMarketIntelligence.generateAPACLaunchReadiness();
      
      setNetworkReport(report);
      setLaunchReadiness(readiness);
    } catch (error) {
      console.error('Error loading intelligence data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getROASColor = (roas: number) => {
    if (roas >= 1.4) return 'text-green-600';
    if (roas >= 1.2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getROASBadge = (roas: number) => {
    if (roas >= 1.4) return 'bg-green-100 text-green-800';
    if (roas >= 1.2) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getPerformanceIcon = (roas: number) => {
    if (roas >= 1.4) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (roas >= 1.2) return <Target className="h-4 w-4 text-yellow-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
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
          <h1 className="text-3xl font-bold text-gray-900">Enhanced Market Intelligence</h1>
          <p className="text-gray-600 mt-1">
            AppsFlyer-style network performance & APAC market analysis
          </p>
        </div>
        <div className="flex space-x-2">
          <select 
            value={selectedRegion} 
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white"
          >
            <option value="vietnam">Vietnam</option>
            <option value="thailand">Thailand</option>
            <option value="indonesia">Indonesia</option>
          </select>
          <Button onClick={loadIntelligenceData} className="bg-blue-600 hover:bg-blue-700">
            <Brain className="h-4 w-4 mr-2" />
            Refresh Analysis
          </Button>
        </div>
      </div>

      {/* APAC Launch Readiness */}
      {launchReadiness && (
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-blue-600" />
              <span>APAC Launch Readiness Assessment</span>
              <Badge className={launchReadiness.overallReadiness > 8.0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {launchReadiness.overallReadiness.toFixed(1)}/10
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {launchReadiness.keyMetrics.averageROAS.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Average ROAS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${(launchReadiness.keyMetrics.projectedRevenue / 1000).toFixed(0)}K
                </div>
                <div className="text-sm text-gray-600">Projected Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {launchReadiness.keyMetrics.competitivePosition}
                </div>
                <div className="text-sm text-gray-600">Market Position</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {launchReadiness.aiEngineStatus.optimizations}
                </div>
                <div className="text-sm text-gray-600">AI Optimizations</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">Recommendation</h4>
                {launchReadiness.overallReadiness > 8.0 ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                )}
              </div>
              <p className={`font-medium ${launchReadiness.overallReadiness > 8.0 ? 'text-green-700' : 'text-yellow-700'}`}>
                {launchReadiness.recommendation}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Network Performance Comparison */}
      {networkReport && (
        <Tabs value="networks" onValueChange={() => {}} className="space-y-4">
          <TabsList>
            <TabsTrigger value="networks">Network Performance</TabsTrigger>
            <TabsTrigger value="benchmarks">Market Benchmarks</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
            <TabsTrigger value="insights">AI Engine Updates</TabsTrigger>
          </TabsList>

          {/* Network Performance Tab */}
          <TabsContent value="networks" className="space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Spend</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${(networkReport.summary.totalSpend / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Installs</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(networkReport.summary.totalInstalls / 1000).toFixed(1)}K
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average ROAS</p>
                      <p className={`text-2xl font-bold ${getROASColor(networkReport.summary.averageROAS)}`}>
                        {networkReport.summary.averageROAS.toFixed(2)}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average CPI</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${networkReport.summary.averageCPI.toFixed(2)}
                      </p>
                    </div>
                    <Target className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Network Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Network Performance Comparison - {selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Network</th>
                        <th className="text-right py-3 px-4 font-semibold">Spend</th>
                        <th className="text-right py-3 px-4 font-semibold">Installs</th>
                        <th className="text-right py-3 px-4 font-semibold">ROAS</th>
                        <th className="text-right py-3 px-4 font-semibold">CPI</th>
                        <th className="text-right py-3 px-4 font-semibold">CPA</th>
                        <th className="text-right py-3 px-4 font-semibold">CVR</th>
                        <th className="text-right py-3 px-4 font-semibold">D30 Retention</th>
                        <th className="text-right py-3 px-4 font-semibold">Quality Score</th>
                        <th className="text-right py-3 px-4 font-semibold">Fraud Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {networkReport.networkPerformance.map((network: NetworkPerformance, index: number) => (
                        <tr key={network.networkId} className={`border-b ${index === 0 ? 'bg-green-50' : ''}`}>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              {getPerformanceIcon(network.roas)}
                              <span className="font-medium">{network.networkName}</span>
                              {index === 0 && <Badge className="bg-green-100 text-green-800 text-xs">Best</Badge>}
                            </div>
                          </td>
                          <td className="text-right py-3 px-4">${(network.spend / 1000).toFixed(0)}K</td>
                          <td className="text-right py-3 px-4">{(network.installs / 1000).toFixed(1)}K</td>
                          <td className="text-right py-3 px-4">
                            <Badge className={getROASBadge(network.roas)}>
                              {network.roas.toFixed(2)}
                            </Badge>
                          </td>
                          <td className="text-right py-3 px-4">${network.cpi.toFixed(2)}</td>
                          <td className="text-right py-3 px-4">${network.cpa.toFixed(2)}</td>
                          <td className="text-right py-3 px-4">{network.cvr.toFixed(1)}%</td>
                          <td className="text-right py-3 px-4">{network.retentionDay30.toFixed(1)}%</td>
                          <td className="text-right py-3 px-4">
                            <div className="flex items-center justify-end space-x-1">
                              <span>{network.qualityScore.toFixed(1)}</span>
                              {network.qualityScore >= 8.0 && <CheckCircle className="h-4 w-4 text-green-600" />}
                            </div>
                          </td>
                          <td className="text-right py-3 px-4">
                            <span className={network.fraudRate > 2.0 ? 'text-red-600' : 'text-green-600'}>
                              {network.fraudRate.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Market Benchmarks Tab */}
          <TabsContent value="benchmarks" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gaming vs Ecom Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Gaming vs Ecommerce Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Gaming ROAS</span>
                      <span className="font-bold text-blue-600">
                        {networkReport.benchmarkComparison.gamingVsEcom.gamingROAS.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Ecommerce ROAS</span>
                      <span className="font-bold text-green-600">
                        {networkReport.benchmarkComparison.gamingVsEcom.ecomROAS.toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <p className="text-sm text-gray-700">
                        {networkReport.benchmarkComparison.gamingVsEcom.performance}
                      </p>
                      <p className="text-sm text-blue-600 mt-2 font-medium">
                        {networkReport.benchmarkComparison.gamingVsEcom.recommendation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Position */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Position Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Our Market Share</span>
                      <span className="font-bold text-purple-600">
                        {networkReport.benchmarkComparison.marketPosition.ourMarketShare}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Growth Opportunity</span>
                      <span className="font-bold text-green-600">
                        +{networkReport.benchmarkComparison.marketPosition.growthOpportunity}%
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <p className="text-sm text-blue-600 font-medium">
                        {networkReport.benchmarkComparison.marketPosition.recommendation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {networkReport.recommendations.map((rec: any, index: number) => (
                <Card key={index} className={`border-l-4 ${
                  rec.priority === 'high' ? 'border-l-red-500' : 'border-l-yellow-500'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{rec.action}</h4>
                        <p className="text-sm text-gray-600">{rec.reason}</p>
                      </div>
                      <Badge className={rec.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                        {rec.priority}
                      </Badge>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-gray-700">Expected Impact:</p>
                      <p className="text-sm text-green-600">{rec.expectedImpact}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* AI Engine Updates Tab */}
          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {networkReport.aiInsights.map((insight: any, index: number) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 flex items-center space-x-2">
                          <Brain className="h-4 w-4 text-blue-600" />
                          <span>{insight.engine}</span>
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">{insight.update}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {Math.round(insight.confidence * 100)}% confidence
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-green-700">Impact:</p>
                        <p className="text-sm text-green-600">{insight.impact}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-blue-700">Implementation:</p>
                        <p className="text-sm text-blue-600">{insight.implementation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}