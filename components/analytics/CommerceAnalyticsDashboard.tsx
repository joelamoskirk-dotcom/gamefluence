// Commerce Analytics Dashboard - Industry Best Practices Implementation
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Eye, 
  MapPin,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Zap
} from 'lucide-react';

// Industry-standard interfaces following AWS/Google Cloud/Azure best practices
interface RevenueMetrics {
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  averageOrderValue: number;
  conversionRate: number;
  customerLifetimeValue: number;
  churnRate: number;
}

interface AttributionData {
  creatorId: string;
  creatorName: string;
  attributionLinks: {
    linkId: string;
    linkType: 'utm' | 'postback' | 'pixel' | 'sdk';
    clicks: number;
    conversions: number;
    revenue: number;
    conversionRate: number;
  }[];
  totalRevenue: number;
  totalConversions: number;
  roi: number;
}

interface GeographicData {
  region: string;
  country: string;
  city: string;
  audienceSize: number;
  revenue: number;
  conversionRate: number;
  averageOrderValue: number;
}

interface CreatorPerformanceMetrics {
  creatorId: string;
  name: string;
  tier: 'Diamond' | 'Platinum' | 'Gold' | 'Silver' | 'Bronze';
  gamefluenceScore: number;
  reach: number;
  uniqueAudience: number;
  revenue: number;
  conversions: number;
  roi: number;
  satisfactionScore: number;
  paymentPreference: string;
}

interface CommerceAnalyticsDashboardProps {
  campaignId?: string;
  timeRange?: '24h' | '7d' | '30d' | '90d';
}

export default function CommerceAnalyticsDashboard({ 
  campaignId, 
  timeRange: initialTimeRange = '30d' 
}: CommerceAnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(initialTimeRange);
  const [revenueMetrics, setRevenueMetrics] = useState<RevenueMetrics | null>(null);
  const [attributionData, setAttributionData] = useState<AttributionData[]>([]);
  const [geographicData, setGeographicData] = useState<GeographicData[]>([]);
  const [creatorMetrics, setCreatorMetrics] = useState<CreatorPerformanceMetrics[]>([]);

  const loadCommerceData = useCallback(async () => {
    setLoading(true);
    
    try {
      // Simulate API calls with proper error handling
      await Promise.all([
        loadAttributionData(),
        loadCreatorMetrics()
      ]);
    } catch (error) {
      console.error('Failed to load commerce data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize data with industry-standard performance optimization
  useEffect(() => {
    loadCommerceData();
  }, [campaignId, timeRange, loadCommerceData]);

  const loadRevenueMetrics = async () => {
    // Simulate high-performance data loading with caching
    const mockRevenue: RevenueMetrics = {
      totalRevenue: 2450000,
      monthlyRecurringRevenue: 185000,
      averageOrderValue: 89.50,
      conversionRate: 3.2,
      customerLifetimeValue: 450.00,
      churnRate: 2.1
    };
    setRevenueMetrics(mockRevenue);
  };

  const loadAttributionData = async () => {
    // Mock attribution data with industry-standard tracking
    const mockAttribution: AttributionData[] = [
      {
        creatorId: 'creator_1',
        creatorName: 'GameMaster Alex',
        attributionLinks: [
          {
            linkId: 'utm_alex_001',
            linkType: 'utm',
            clicks: 15420,
            conversions: 485,
            revenue: 43250,
            conversionRate: 3.14
          },
          {
            linkId: 'pixel_alex_001',
            linkType: 'pixel',
            clicks: 8920,
            conversions: 267,
            revenue: 23890,
            conversionRate: 2.99
          }
        ],
        totalRevenue: 67140,
        totalConversions: 752,
        roi: 340
      }
    ];
    setAttributionData(mockAttribution);
  };

  const loadGeographicData = async () => {
    const mockGeoData: GeographicData[] = [
      {
        region: 'North America',
        country: 'United States',
        city: 'Los Angeles',
        audienceSize: 125000,
        revenue: 890000,
        conversionRate: 3.8,
        averageOrderValue: 95.50
      },
      {
        region: 'Europe',
        country: 'United Kingdom',
        city: 'London',
        audienceSize: 89000,
        revenue: 567000,
        conversionRate: 3.2,
        averageOrderValue: 87.20
      },
      {
        region: 'Asia Pacific',
        country: 'Japan',
        city: 'Tokyo',
        audienceSize: 156000,
        revenue: 1200000,
        conversionRate: 4.1,
        averageOrderValue: 102.30
      }
    ];
    setGeographicData(mockGeoData);
  };

  const loadCreatorMetrics = async () => {
    const mockCreatorData: CreatorPerformanceMetrics[] = [
      {
        creatorId: 'creator_1',
        name: 'GameMaster Alex',
        tier: 'Diamond',
        gamefluenceScore: 94,
        reach: 250000,
        uniqueAudience: 185000,
        revenue: 67140,
        conversions: 752,
        roi: 340,
        satisfactionScore: 4.8,
        paymentPreference: 'PayPal'
      },
      {
        creatorId: 'creator_2',
        name: 'StreamQueen Sarah',
        tier: 'Platinum',
        gamefluenceScore: 91,
        reach: 180000,
        uniqueAudience: 142000,
        revenue: 45890,
        conversions: 523,
        roi: 285,
        satisfactionScore: 4.6,
        paymentPreference: 'Bank Transfer'
      }
    ];
    setCreatorMetrics(mockCreatorData);
  };

  // Utility functions for data formatting
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getTierColor = (tier: string): string => {
    const colors = {
      'Diamond': 'text-purple-600 bg-purple-50',
      'Platinum': 'text-blue-600 bg-blue-50',
      'Gold': 'text-yellow-600 bg-yellow-50',
      'Silver': 'text-gray-600 bg-gray-50',
      'Bronze': 'text-orange-600 bg-orange-50'
    };
    return colors[tier as keyof typeof colors] || 'text-gray-600 bg-gray-50';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Commerce Analytics</h1>
          <p className="text-gray-600">Revenue tracking and performance insights</p>
        </div>
        
        <div className="flex gap-4">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <Button variant="outline">
            Export Report
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b pb-4">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'attribution', label: 'Attribution', icon: Target },
          { id: 'geography', label: 'Geography', icon: MapPin },
          { id: 'creators', label: 'Creator Performance', icon: Users },
          { id: 'operations', label: 'Operations', icon: AlertTriangle }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>      {/* 
Overview Tab */}
      {activeTab === 'overview' && revenueMetrics && (
        <div className="space-y-6">
          {/* Key Revenue Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">{formatCurrency(revenueMetrics.totalRevenue)}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <DollarSign className="text-primary" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">MRR</p>
                  <p className="text-2xl font-bold">{formatCurrency(revenueMetrics.monthlyRecurringRevenue)}</p>
                </div>
                <div className="bg-secondary/10 p-3 rounded-full">
                  <TrendingUp className="text-secondary" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">AOV</p>
                  <p className="text-2xl font-bold">{formatCurrency(revenueMetrics.averageOrderValue)}</p>
                </div>
                <div className="bg-accent/10 p-3 rounded-full">
                  <BarChart3 className="text-accent" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold">{formatPercentage(revenueMetrics.conversionRate)}</p>
                </div>
                <div className="bg-success/10 p-3 rounded-full">
                  <Target className="text-success" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">CLV</p>
                  <p className="text-2xl font-bold">{formatCurrency(revenueMetrics.customerLifetimeValue)}</p>
                </div>
                <div className="bg-gaming/10 p-3 rounded-full">
                  <Users className="text-gaming" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Churn Rate</p>
                  <p className="text-2xl font-bold">{formatPercentage(revenueMetrics.churnRate)}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertTriangle className="text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Chart Placeholder */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Revenue Trends</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Revenue chart visualization</p>
                <p className="text-sm">Connect to analytics service for real-time data</p>
              </div>
            </div>
          </div>
        </div>
      )}      
{/* Attribution Tab */}
      {activeTab === 'attribution' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Attribution & Tracking Links</h2>
            <Button>Generate New Link</Button>
          </div>

          <div className="space-y-4">
            {attributionData.map(creator => (
              <div key={creator.creatorId} className="card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{creator.creatorName}</h3>
                    <div className="text-sm text-gray-600">
                      Total Revenue: {formatCurrency(creator.totalRevenue)} | 
                      Conversions: {creator.totalConversions.toLocaleString()} | 
                      ROI: {creator.roi}%
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {creator.attributionLinks.map(link => (
                    <div key={link.linkId} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            link.linkType === 'utm' ? 'bg-blue-100 text-blue-800' :
                            link.linkType === 'pixel' ? 'bg-green-100 text-green-800' :
                            link.linkType === 'postback' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {link.linkType.toUpperCase()}
                          </span>
                          <code className="text-sm bg-white px-2 py-1 rounded border">
                            {link.linkId}
                          </code>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{formatCurrency(link.revenue)}</div>
                          <div className="text-sm text-gray-500">Revenue</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-semibold">{link.clicks.toLocaleString()}</div>
                          <div className="text-gray-500">Clicks</div>
                        </div>
                        <div>
                          <div className="font-semibold">{link.conversions.toLocaleString()}</div>
                          <div className="text-gray-500">Conversions</div>
                        </div>
                        <div>
                          <div className="font-semibold">{formatPercentage(link.conversionRate)}</div>
                          <div className="text-gray-500">CVR</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}      
{/* Geography Tab */}
      {activeTab === 'geography' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Geographic Performance</h2>
            <div className="flex gap-2">
              <Button variant="outline">View Map</Button>
              <Button variant="outline">Export Data</Button>
            </div>
          </div>

          {/* Geographic Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Top Performing Regions</h3>
              <div className="space-y-3">
                {geographicData
                  .sort((a, b) => b.revenue - a.revenue)
                  .map((region, index) => (
                    <div key={`${region.country}-${region.city}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">{region.city}, {region.country}</div>
                          <div className="text-sm text-gray-600">{region.region}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(region.revenue)}</div>
                        <div className="text-sm text-gray-500">{region.audienceSize.toLocaleString()} audience</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Conversion Rates by Region</h3>
              <div className="space-y-3">
                {geographicData
                  .sort((a, b) => b.conversionRate - a.conversionRate)
                  .map(region => (
                    <div key={`cvr-${region.country}-${region.city}`} className="flex items-center justify-between">
                      <span className="font-medium">{region.city}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(region.conversionRate / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold w-12 text-right">
                          {formatPercentage(region.conversionRate)}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Detailed Geographic Table */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Detailed Geographic Analysis</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Location</th>
                    <th className="text-right py-2">Audience</th>
                    <th className="text-right py-2">Revenue</th>
                    <th className="text-right py-2">AOV</th>
                    <th className="text-right py-2">CVR</th>
                  </tr>
                </thead>
                <tbody>
                  {geographicData.map(region => (
                    <tr key={`table-${region.country}-${region.city}`} className="border-b">
                      <td className="py-2">
                        <div>
                          <div className="font-medium">{region.city}</div>
                          <div className="text-gray-500 text-xs">{region.country}, {region.region}</div>
                        </div>
                      </td>
                      <td className="text-right py-2">{region.audienceSize.toLocaleString()}</td>
                      <td className="text-right py-2 font-semibold">{formatCurrency(region.revenue)}</td>
                      <td className="text-right py-2">{formatCurrency(region.averageOrderValue)}</td>
                      <td className="text-right py-2">{formatPercentage(region.conversionRate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}      {/* 
Creator Performance Tab */}
      {activeTab === 'creators' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Creator Performance Analytics</h2>
            <div className="flex gap-2">
              <Button variant="outline">Batch Campaign (50)</Button>
              <Button variant="outline">Batch Campaign (100)</Button>
              <Button variant="outline">Batch Campaign (500)</Button>
              <Button>Custom Batch</Button>
            </div>
          </div>

          <div className="space-y-4">
            {creatorMetrics.map(creator => (
              <div key={creator.creatorId} className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                      🎮
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{creator.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTierColor(creator.tier)}`}>
                          {creator.tier}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getScoreColor(creator.gamefluenceScore)}`}>
                          {creator.gamefluenceScore}/100 Gamefluence
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{formatCurrency(creator.revenue)}</div>
                    <div className="text-sm text-gray-500">Total Revenue</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold">{creator.reach.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Total Reach</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{creator.uniqueAudience.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Unique Audience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{creator.conversions.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Conversions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-success">{creator.roi}%</div>
                    <div className="text-sm text-gray-500">ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{creator.satisfactionScore}/5</div>
                    <div className="text-sm text-gray-500">CSAT</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold">{creator.paymentPreference}</div>
                    <div className="text-sm text-gray-500">Payment</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Yield Efficiency: <span className="font-semibold">High</span> | 
                      Recommendation Score: <span className="font-semibold">95/100</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Profile</Button>
                      <Button size="sm">Collaborate Again</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}   
   {/* Operations Tab */}
      {activeTab === 'operations' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Business Operations</h2>
            <Button variant="outline">View All Issues</Button>
          </div>

          {/* Operations Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Campaigns</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Zap className="text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Open Cases</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <AlertTriangle className="text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">System Errors</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg CSAT</p>
                  <p className="text-2xl font-bold">4.7/5</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Issues */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Recent Issues & Cases</h3>
            <div className="space-y-3">
              {[
                {
                  id: 'case_001',
                  title: 'Payment processing delay for Creator Alex',
                  status: 'In Progress',
                  priority: 'High',
                  created: '2 hours ago'
                },
                {
                  id: 'case_002',
                  title: 'Attribution link not tracking properly',
                  status: 'Resolved',
                  priority: 'Medium',
                  created: '1 day ago'
                },
                {
                  id: 'case_003',
                  title: 'Campaign metrics discrepancy',
                  status: 'Open',
                  priority: 'Low',
                  created: '3 days ago'
                }
              ].map(issue => (
                <div key={issue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{issue.title}</div>
                    <div className="text-sm text-gray-600">Case ID: {issue.id} • {issue.created}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      issue.priority === 'High' ? 'bg-red-100 text-red-800' :
                      issue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {issue.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      issue.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      issue.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {issue.status}
                    </span>
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