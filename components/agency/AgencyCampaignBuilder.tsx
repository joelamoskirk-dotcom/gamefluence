'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { 
  Building2, 
  Users, 
  Globe, 
  Target, 
  DollarSign,
  BarChart3,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
  Eye,
  Clock
} from 'lucide-react';
import { agencyManagement, APACAgency, BrandClient } from '@/lib/agency-management';
import { apacStreamerAnalysis } from '@/lib/apac-market-streamer-analysis';

export default function AgencyCampaignBuilder() {
  const [selectedAgency, setSelectedAgency] = useState<APACAgency | null>(null);
  const [selectedClient, setSelectedClient] = useState<BrandClient | null>(null);
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
  const [campaignBudget, setCampaignBudget] = useState<number>(100000);
  const [campaignObjective, setCampaignObjective] = useState<string>('brand_awareness');
  const [agencies, setAgencies] = useState<APACAgency[]>([]);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAgencyData();
  }, []);

  const loadAgencyData = async () => {
    try {
      setLoading(true);
      const allAgencies = agencyManagement.getAllAgencies();
      setAgencies(allAgencies);
      
      if (allAgencies.length > 0) {
        setSelectedAgency(allAgencies[0]);
        if (allAgencies[0].clients.length > 0) {
          setSelectedClient(allAgencies[0].clients[0]);
        }
      }
    } catch (error) {
      console.error('Error loading agency data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateCampaignRecommendations = () => {
    if (!selectedClient || selectedMarkets.length === 0) return;

    // Generate recommendations based on selected markets and budget
    const strategy = apacStreamerAnalysis.generateOptimalCollabStrategy(campaignBudget, campaignBudget * 2);
    setRecommendations(strategy);
  };

  const getAgencyTierColor = (tier: string) => {
    switch (tier) {
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      case 'growth': return 'bg-blue-100 text-blue-800';
      case 'startup': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getClientCategoryColor = (category: string) => {
    switch (category) {
      case 'gaming': return 'bg-red-100 text-red-800';
      case 'tech': return 'bg-blue-100 text-blue-800';
      case 'ecommerce': return 'bg-green-100 text-green-800';
      case 'fintech': return 'bg-purple-100 text-purple-800';
      case 'lifestyle': return 'bg-pink-100 text-pink-800';
      case 'fmcg': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
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
          <h1 className="text-3xl font-bold text-gray-900">Agency Campaign Builder</h1>
          <p className="text-gray-600 mt-1">
            Create multi-brand campaigns across APAC markets with gaming creators
          </p>
        </div>
        <Button onClick={loadAgencyData} className="bg-blue-600 hover:bg-blue-700">
          <Building2 className="h-4 w-4 mr-2" />
          Refresh Agencies
        </Button>
      </div>

      {/* Campaign Builder */}
      <Tabs value="setup" onValueChange={() => {}} className="space-y-4">
        <TabsList>
          <TabsTrigger value="setup">Campaign Setup</TabsTrigger>
          <TabsTrigger value="creators">Creator Selection</TabsTrigger>
          <TabsTrigger value="preview">Campaign Preview</TabsTrigger>
          <TabsTrigger value="launch">Launch & Monitor</TabsTrigger>
        </TabsList>

        {/* Campaign Setup Tab */}
        <TabsContent value="setup" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Agency Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Select Agency</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {agencies.map((agency) => (
                  <div
                    key={agency.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedAgency?.id === agency.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      setSelectedAgency(agency);
                      setSelectedClient(agency.clients[0] || null);
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{agency.name}</h4>
                      <Badge className={getAgencyTierColor(agency.tier)}>
                        {agency.tier}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4" />
                        <span>{agency.markets.join(', ')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{agency.clientCount} clients</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4" />
                        <span>{formatCurrency(agency.totalSpend)} total spend</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Client Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Select Brand Client</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedAgency?.clients.map((client) => (
                  <div
                    key={client.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedClient?.id === client.id 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedClient(client)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{client.name}</h4>
                      <Badge className={getClientCategoryColor(client.category)}>
                        {client.category}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>{client.industry}</div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4" />
                        <span>{formatCurrency(client.monthlyBudget)}/month</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4" />
                        <span>{client.targetMarkets.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-8 text-gray-500">
                    Select an agency to view clients
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Campaign Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Campaign Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Market Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Markets
                  </label>
                  <div className="space-y-2">
                    {['Vietnam', 'Thailand', 'Indonesia', 'Singapore', 'Malaysia'].map((market) => (
                      <label key={market} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedMarkets.includes(market)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedMarkets([...selectedMarkets, market]);
                            } else {
                              setSelectedMarkets(selectedMarkets.filter(m => m !== market));
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">{market}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Budget
                  </label>
                  <input
                    type="number"
                    value={campaignBudget}
                    onChange={(e) => setCampaignBudget(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="10000"
                    step="10000"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Recommended: {formatCurrency(campaignBudget * 2)} expected return
                  </div>
                </div>

                {/* Objective */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Objective
                  </label>
                  <select
                    value={campaignObjective}
                    onChange={(e) => setCampaignObjective(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="brand_awareness">Brand Awareness</option>
                    <option value="user_acquisition">User Acquisition</option>
                    <option value="engagement">Engagement</option>
                    <option value="conversions">Conversions</option>
                    <option value="community_building">Community Building</option>
                  </select>
                </div>

                {/* Generate Recommendations Button */}
                <Button
                  onClick={generateCampaignRecommendations}
                  disabled={!selectedClient || selectedMarkets.length === 0}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Generate Creator Recommendations
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Summary */}
          {selectedClient && selectedMarkets.length > 0 && (
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  <span>Campaign Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedClient.name}
                    </div>
                    <div className="text-sm text-gray-600">Brand Client</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedMarkets.length}
                    </div>
                    <div className="text-sm text-gray-600">Target Markets</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {formatCurrency(campaignBudget)}
                    </div>
                    <div className="text-sm text-gray-600">Campaign Budget</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {campaignObjective.replace('_', ' ')}
                    </div>
                    <div className="text-sm text-gray-600">Primary Objective</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Creator Selection Tab */}
        <TabsContent value="creators" className="space-y-4">
          {recommendations ? (
            <div className="space-y-6">
              {/* Strategy Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Creator Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(recommendations.totalExpectedReturn)}
                      </div>
                      <div className="text-sm text-gray-600">Expected Return</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {(recommendations.overallROI * 100).toFixed(0)}%
                      </div>
                      <div className="text-sm text-gray-600">ROI</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {recommendations.marketStrategies.length}
                      </div>
                      <div className="text-sm text-gray-600">Markets</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {recommendations.topCollabs.length}
                      </div>
                      <div className="text-sm text-gray-600">Top Creators</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800">Strategy Recommendation</span>
                    </div>
                    <p className="text-green-700">{recommendations.recommendation}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Top Creators */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Gaming Creators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendations.topCollabs.slice(0, 6).map((creator: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                            #{creator.rank}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{creator.name}</h4>
                            <p className="text-sm text-gray-600">{creator.realName}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline">{creator.market}</Badge>
                              <Badge className={creator.tier === 'S' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
                                {creator.tier} Tier
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            {creator.roi.toFixed(1)}x ROI
                          </div>
                          <div className="text-sm text-gray-600">
                            {formatCurrency(creator.cost)} cost
                          </div>
                          <div className="text-sm text-gray-600">
                            {formatCurrency(creator.expectedRevenue)} revenue
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Generate creator recommendations first</p>
                <p className="text-sm text-gray-500 mt-2">
                  Complete the campaign setup to see recommended gaming creators
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Campaign Preview Tab */}
        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Campaign preview will be available after creator selection</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Launch & Monitor Tab */}
        <TabsContent value="launch" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Launch Campaign</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Campaign launch and monitoring tools</p>
                <p className="text-sm text-gray-500 mt-2">
                  Real-time performance tracking and optimization recommendations
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}