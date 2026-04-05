'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  Globe, 
  TrendingUp, 
  DollarSign, 
  Users, 
  BarChart3,
  Target,
  Zap,
  Award,
  Eye,
  ArrowRight,
  Filter,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Star,
  Briefcase,
  PieChart,
  LineChart
} from 'lucide-react';
import { industryBenchmarks, type IndustryBenchmark, type APACSpendingData } from '@/lib/industry-benchmarks';

interface MarketAnalysis {
  totalTAM: number;
  growthRate: number;
  topOpportunities: {
    country: string;
    industry: string;
    opportunity: number;
    rationale: string;
  }[];
  competitiveGaps: {
    segment: string;
    gap: number;
    potential: number;
  }[];
}

export default function APACMarketIntelligence() {
  const [selectedIndustry, setSelectedIndustry] = useState('Electronics');
  const [selectedCountries, setSelectedCountries] = useState(['Thailand', 'Vietnam', 'Indonesia']);
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Get TAM data
  const tamData = industryBenchmarks.calculateAPACTAM();
  const spendingData = industryBenchmarks.getAPACSpending();
  const industryBenchmarkData = industryBenchmarks.getIndustryBenchmarks(selectedIndustry);

  useEffect(() => {
    generateMarketAnalysis();
  }, [selectedIndustry, selectedCountries]);

  const generateMarketAnalysis = () => {
    setIsLoading(true);
    
    // Simulate analysis processing
    setTimeout(() => {
      const analysis: MarketAnalysis = {
        totalTAM: tamData.totalMarket,
        growthRate: tamData.projectedGrowth,
        topOpportunities: [
          {
            country: 'Indonesia',
            industry: 'E-commerce',
            opportunity: 285,
            rationale: 'Largest market with highest growth rate and strong mobile adoption'
          },
          {
            country: 'Vietnam',
            industry: 'Gaming',
            opportunity: 195,
            rationale: 'Exceptional engagement rates and growing disposable income'
          },
          {
            country: 'Thailand',
            industry: 'Electronics',
            opportunity: 165,
            rationale: 'Premium market with high conversion rates and brand loyalty'
          }
        ],
        competitiveGaps: [
          { segment: 'Gaming Influencers in Indonesia', gap: 45, potential: 125 },
          { segment: 'Tech Reviews in Vietnam', gap: 38, potential: 95 },
          { segment: 'Lifestyle Content in Thailand', gap: 32, potential: 85 }
        ]
      };
      
      setMarketAnalysis(analysis);
      setIsLoading(false);
    }, 1500);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount * 1000000);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const industries = ['Electronics', 'Gaming', 'E-commerce', 'Fintech', 'FMCG'];
  const countries = ['Thailand', 'Vietnam', 'Indonesia', 'Singapore', 'Malaysia', 'Philippines'];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8" />
              <h1 className="text-3xl font-bold">APAC Market Intelligence</h1>
            </div>
            <p className="text-lg text-blue-100 mb-4">
              Real-time insights into the ${(tamData.totalMarket / 1000).toFixed(1)}B APAC influencer market
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>+{tamData.projectedGrowth.toFixed(1)}% YoY Growth</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>12,000+ Verified Influencers</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>6 Primary Markets</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-2">{formatCurrency(tamData.totalMarket)}</div>
            <div className="text-blue-200">Total Addressable Market</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Market Analysis Controls</h2>
          <Button
            onClick={generateMarketAnalysis}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Analyzing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh Analysis
              </div>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Target Industry
            </label>
            <div className="grid grid-cols-3 gap-2">
              {industries.map(industry => (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`p-3 text-sm rounded-lg border transition-all ${
                    selectedIndustry === industry
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Target Markets ({selectedCountries.length} selected)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {countries.map(country => (
                <button
                  key={country}
                  onClick={() => {
                    if (selectedCountries.includes(country)) {
                      setSelectedCountries(prev => prev.filter(c => c !== country));
                    } else {
                      setSelectedCountries(prev => [...prev, country]);
                    }
                  }}
                  className={`p-3 text-sm rounded-lg border transition-all ${
                    selectedCountries.includes(country)
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-green-300'
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b">
          <div className="flex">
            {[
              { id: 'overview', label: 'Market Overview', icon: Globe },
              { id: 'spending', label: 'Spending Analysis', icon: DollarSign },
              { id: 'benchmarks', label: 'Industry Benchmarks', icon: BarChart3 },
              { id: 'opportunities', label: 'Opportunities', icon: Target }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Market Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-6 h-6 text-blue-600" />
                    <h3 className="font-semibold">Total Market Size</h3>
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {formatCurrency(tamData.totalMarket)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Across {tamData.byCountry.length} APAC markets
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    <h3 className="font-semibold">Growth Rate</h3>
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    +{tamData.projectedGrowth.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">
                    Year-over-year growth
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 text-purple-600" />
                    <h3 className="font-semibold">Top Industry</h3>
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {tamData.byIndustry[0]?.industry}
                  </div>
                  <div className="text-sm text-gray-600">
                    {tamData.byIndustry[0]?.share.toFixed(1)}% market share
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-blue-600" />
                    Market by Country
                  </h3>
                  <div className="space-y-3">
                    {tamData.byCountry.map((country, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{country.country}</div>
                          <div className="text-sm text-gray-600">+{country.growth.toFixed(1)}% growth</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{formatCurrency(country.spend)}</div>
                          <div className="text-sm text-gray-600">
                            {((country.spend / tamData.totalMarket) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-green-600" />
                    Market by Industry
                  </h3>
                  <div className="space-y-3">
                    {tamData.byIndustry.slice(0, 6).map((industry, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{industry.industry}</div>
                          <div className="text-sm text-gray-600">{industry.share.toFixed(1)}% share</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{formatCurrency(industry.spend)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Spending Analysis Tab */}
          {activeTab === 'spending' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                {spendingData.map((country, idx) => (
                  <div key={idx} className="bg-white border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{country.country}</h3>
                      <div className="text-sm text-green-600 font-medium">
                        +{country.growthRate.toFixed(1)}%
                      </div>
                    </div>
                    
                    <div className="text-2xl font-bold text-blue-600 mb-4">
                      {formatCurrency(country.totalInfluencerSpend)}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Top Spenders:</div>
                      {country.topSpenders.slice(0, 3).map((spender, sidx) => (
                        <div key={sidx} className="flex justify-between text-sm">
                          <span className="text-gray-600">{spender.industry}</span>
                          <span className="font-medium">{spender.marketShare}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-2">Market Intelligence Insights</h3>
                    <div className="space-y-2 text-sm text-yellow-700">
                      <div>• Indonesia represents 35% of total APAC influencer spend with highest growth potential</div>
                      <div>• Gaming industry shows 40% higher engagement rates in Vietnam compared to regional average</div>
                      <div>• E-commerce brands in Thailand have 25% higher conversion rates than other verticals</div>
                      <div>• Singapore fintech sector shows premium pricing with 60% higher CPMs but 2x better ROI</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Industry Benchmarks Tab */}
          {activeTab === 'benchmarks' && (
            <div className="space-y-8">
              {industryBenchmarkData.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {industryBenchmarkData.map((benchmark, idx) => (
                    <div key={idx} className="bg-white border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">{benchmark.vertical}</h3>
                          <div className="text-sm text-gray-600">{benchmark.brandSize} brands</div>
                        </div>
                        <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                          {benchmark.confidenceLevel}% confidence
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {benchmark.benchmarks.avgROI}%
                          </div>
                          <div className="text-sm text-gray-600">Avg ROI</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            ${benchmark.benchmarks.avgCPA}
                          </div>
                          <div className="text-sm text-gray-600">Avg CPA</div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Engagement Rate:</span>
                          <span className="font-medium">{benchmark.benchmarks.avgEngagement}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Conversion Rate:</span>
                          <span className="font-medium">{benchmark.benchmarks.avgConversion}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fraud Rate:</span>
                          <span className="font-medium text-red-600">{benchmark.benchmarks.fraudRate}%</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <div className="text-sm font-medium text-gray-700 mb-2">APAC Performance Multipliers:</div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center">
                            <div className="font-medium">Thailand</div>
                            <div className="text-green-600">+{((benchmark.apacMultipliers.thailand - 1) * 100).toFixed(0)}%</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">Vietnam</div>
                            <div className="text-green-600">+{((benchmark.apacMultipliers.vietnam - 1) * 100).toFixed(0)}%</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">Indonesia</div>
                            <div className="text-green-600">+{((benchmark.apacMultipliers.indonesia - 1) * 100).toFixed(0)}%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Benchmark Data Available</h3>
                  <p className="text-gray-600 mb-4">
                    Select a different industry to view benchmark data
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Opportunities Tab */}
          {activeTab === 'opportunities' && marketAnalysis && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  Top Market Opportunities
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {marketAnalysis.topOpportunities.map((opportunity, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-semibold">{opportunity.country}</div>
                        <div className="text-2xl font-bold text-green-600">
                          ${opportunity.opportunity}M
                        </div>
                      </div>
                      <div className="text-sm text-blue-600 font-medium mb-2">
                        {opportunity.industry}
                      </div>
                      <div className="text-sm text-gray-600">
                        {opportunity.rationale}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  Competitive Gaps & White Space
                </h3>
                <div className="space-y-4">
                  {marketAnalysis.competitiveGaps.map((gap, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{gap.segment}</div>
                        <div className="text-sm text-gray-600">
                          {gap.gap}% market gap identified
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">
                          ${gap.potential}M
                        </div>
                        <div className="text-sm text-gray-600">Potential</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">Strategic Recommendations</h3>
                    <div className="space-y-2 text-sm text-blue-700">
                      <div>• Prioritize Indonesia for e-commerce campaigns with 45% higher ROI potential</div>
                      <div>• Expand gaming influencer network in Vietnam for premium engagement rates</div>
                      <div>• Target electronics brands in Thailand during Q4 for seasonal spending peaks</div>
                      <div>• Develop fintech-specific packages for Singapore's premium market</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Panel */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to Capture Market Opportunity?</h2>
            <p className="text-blue-100 mb-4">
              Launch campaigns in high-opportunity markets with our AI-powered platform
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>Industry-leading ROI</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>APAC market expertise</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>AI-powered optimization</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => window.location.href = '/campaigns'}
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3"
            >
              Launch Campaign
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}