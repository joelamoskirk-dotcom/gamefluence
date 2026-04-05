'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  Globe, 
  TrendingUp, 
  Users, 
  Target,
  DollarSign,
  Eye,
  Smartphone,
  Monitor,
  Gamepad2,
  Tv,
  Radio,
  Youtube,
  Instagram,
  Facebook,
  Twitter,
  Twitch,
  MapPin,
  BarChart3,
  PieChart,
  LineChart,
  Filter,
  Search,
  Calendar,
  AlertTriangle,
  Star,
  Zap,
  TrendingDown,
  ArrowRight,
  Info,
  Play,
  Pause
} from 'lucide-react';

interface MarketData {
  country: string;
  countryCode: string;
  coordinates: { lat: number; lng: number };
  population: number;
  gamers: number;
  mobileGamers: number;
  avgSpending: number;
  currency: string;
  
  // Market maturity
  maturityLevel: 'emerging' | 'developing' | 'mature';
  growthRate: number;
  
  // Platform dominance
  platforms: {
    platform: string;
    users: number;
    growth: number;
    dominance: number; // 0-100
    avgEngagement: number;
  }[];
  
  // Competitive landscape
  competitors: {
    category: string;
    brands: {
      name: string;
      marketShare: number;
      spendEstimate: number;
      primaryChannels: string[];
      strength: 'low' | 'medium' | 'high' | 'dominant';
    }[];
  }[];
  
  // Media mix insights
  mediaMix: {
    channel: string;
    share: number;
    cost: number; // CPM
    effectiveness: number; // 0-100
    trend: 'rising' | 'stable' | 'declining';
  }[];
  
  // Seasonal patterns
  seasonality: {
    month: string;
    activity: number;
    competition: number;
    cost: number;
  }[];
  
  // Creator economy
  creatorEconomy: {
    totalCreators: number;
    avgRates: {
      nano: number;
      micro: number;
      macro: number;
      mega: number;
    };
    topGenres: string[];
    saturation: number; // 0-100
  };
}

interface FilterState {
  countries: string[];
  categories: string[];
  platforms: string[];
  budgetRange: string;
  timeframe: string;
}

export default function MarketIntelligenceDashboard() {
  const [selectedCountry, setSelectedCountry] = useState<string>('Thailand');
  const [selectedView, setSelectedView] = useState<'overview' | 'competitive' | 'media-mix' | 'creators'>('overview');
  const [filters, setFilters] = useState<FilterState>({
    countries: ['Thailand'],
    categories: ['Gaming Electronics'],
    platforms: ['All'],
    budgetRange: '50K-200K',
    timeframe: '2024'
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // Comprehensive APAC market data
  const marketData: MarketData[] = [
    {
      country: 'Thailand',
      countryCode: 'TH',
      coordinates: { lat: 13.7563, lng: 100.5018 },
      population: 70000000,
      gamers: 32000000,
      mobileGamers: 28800000,
      avgSpending: 1250,
      currency: 'THB',
      maturityLevel: 'developing',
      growthRate: 15.2,
      platforms: [
        { platform: 'YouTube', users: 25000000, growth: 12, dominance: 85, avgEngagement: 8.5 },
        { platform: 'TikTok', users: 22000000, growth: 28, dominance: 78, avgEngagement: 12.3 },
        { platform: 'Facebook Gaming', users: 18000000, growth: 8, dominance: 65, avgEngagement: 6.2 },
        { platform: 'Instagram', users: 20000000, growth: 15, dominance: 70, avgEngagement: 9.1 },
        { platform: 'Twitch', users: 3500000, growth: 35, dominance: 45, avgEngagement: 15.8 }
      ],
      competitors: [
        {
          category: 'Gaming Smartphones',
          brands: [
            { name: 'ASUS ROG Phone', marketShare: 25, spendEstimate: 15000000, primaryChannels: ['YouTube', 'Twitch'], strength: 'high' },
            { name: 'Xiaomi Black Shark', marketShare: 20, spendEstimate: 12000000, primaryChannels: ['TikTok', 'Instagram'], strength: 'high' },
            { name: 'Samsung Galaxy Gaming', marketShare: 18, spendEstimate: 18000000, primaryChannels: ['YouTube', 'Facebook'], strength: 'dominant' },
            { name: 'Razer Phone', marketShare: 12, spendEstimate: 8000000, primaryChannels: ['Twitch', 'YouTube'], strength: 'medium' },
            { name: 'OnePlus Gaming', marketShare: 10, spendEstimate: 6000000, primaryChannels: ['Instagram', 'TikTok'], strength: 'medium' }
          ]
        },
        {
          category: 'Gaming Accessories',
          brands: [
            { name: 'Logitech G', marketShare: 30, spendEstimate: 10000000, primaryChannels: ['YouTube', 'Twitch'], strength: 'dominant' },
            { name: 'SteelSeries', marketShare: 22, spendEstimate: 8000000, primaryChannels: ['Twitch', 'YouTube'], strength: 'high' },
            { name: 'HyperX', marketShare: 18, spendEstimate: 7000000, primaryChannels: ['YouTube', 'Instagram'], strength: 'high' },
            { name: 'Corsair', marketShare: 15, spendEstimate: 6000000, primaryChannels: ['YouTube', 'Facebook'], strength: 'medium' },
            { name: 'Razer', marketShare: 15, spendEstimate: 9000000, primaryChannels: ['Twitch', 'TikTok'], strength: 'high' }
          ]
        }
      ],
      mediaMix: [
        { channel: 'Gaming Influencers', share: 35, cost: 45, effectiveness: 92, trend: 'rising' },
        { channel: 'YouTube Ads', share: 25, cost: 65, effectiveness: 78, trend: 'stable' },
        { channel: 'TikTok Ads', share: 20, cost: 55, effectiveness: 85, trend: 'rising' },
        { channel: 'Facebook Gaming', share: 12, cost: 40, effectiveness: 72, trend: 'declining' },
        { channel: 'Traditional TV', share: 5, cost: 120, effectiveness: 45, trend: 'declining' },
        { channel: 'Esports Sponsorship', share: 3, cost: 200, effectiveness: 88, trend: 'rising' }
      ],
      seasonality: [
        { month: 'Jan', activity: 95, competition: 85, cost: 100 },
        { month: 'Feb', activity: 88, competition: 80, cost: 95 },
        { month: 'Mar', activity: 92, competition: 90, cost: 105 },
        { month: 'Apr', activity: 110, competition: 120, cost: 125 }, // Songkran
        { month: 'May', activity: 98, competition: 95, cost: 100 },
        { month: 'Jun', activity: 102, competition: 100, cost: 110 },
        { month: 'Jul', activity: 105, competition: 110, cost: 115 }, // School holidays
        { month: 'Aug', activity: 100, competition: 105, cost: 110 },
        { month: 'Sep', activity: 95, competition: 90, cost: 95 },
        { month: 'Oct', activity: 108, competition: 115, cost: 120 }, // Gaming season
        { month: 'Nov', activity: 112, competition: 125, cost: 130 }, // Peak gaming
        { month: 'Dec', activity: 118, competition: 140, cost: 145 }  // Holiday peak
      ],
      creatorEconomy: {
        totalCreators: 15000,
        avgRates: { nano: 2500, micro: 12000, macro: 45000, mega: 180000 },
        topGenres: ['Mobile Gaming', 'Battle Royale', 'Music Games', 'Casual Gaming'],
        saturation: 65
      }
    },
    {
      country: 'Vietnam',
      countryCode: 'VN',
      coordinates: { lat: 14.0583, lng: 108.2772 },
      population: 98000000,
      gamers: 44000000,
      mobileGamers: 40000000,
      avgSpending: 980,
      currency: 'VND',
      maturityLevel: 'emerging',
      growthRate: 22.5,
      platforms: [
        { platform: 'YouTube', users: 35000000, growth: 18, dominance: 88, avgEngagement: 9.2 },
        { platform: 'TikTok', users: 28000000, growth: 45, dominance: 82, avgEngagement: 14.1 },
        { platform: 'Facebook Gaming', users: 25000000, growth: 12, dominance: 75, avgEngagement: 7.8 },
        { platform: 'Instagram', users: 22000000, growth: 20, dominance: 68, avgEngagement: 8.9 },
        { platform: 'Twitch', users: 2800000, growth: 55, dominance: 35, avgEngagement: 18.2 }
      ],
      competitors: [
        {
          category: 'Gaming Smartphones',
          brands: [
            { name: 'Xiaomi Black Shark', marketShare: 35, spendEstimate: 20000000, primaryChannels: ['TikTok', 'YouTube'], strength: 'dominant' },
            { name: 'ASUS ROG Phone', marketShare: 22, spendEstimate: 15000000, primaryChannels: ['YouTube', 'Facebook'], strength: 'high' },
            { name: 'Samsung Galaxy Gaming', marketShare: 18, spendEstimate: 12000000, primaryChannels: ['Facebook', 'Instagram'], strength: 'high' },
            { name: 'OnePlus Gaming', marketShare: 15, spendEstimate: 8000000, primaryChannels: ['TikTok', 'Instagram'], strength: 'medium' },
            { name: 'Realme Gaming', marketShare: 10, spendEstimate: 6000000, primaryChannels: ['TikTok', 'YouTube'], strength: 'medium' }
          ]
        }
      ],
      mediaMix: [
        { channel: 'Gaming Influencers', share: 42, cost: 35, effectiveness: 94, trend: 'rising' },
        { channel: 'TikTok Ads', share: 28, cost: 40, effectiveness: 89, trend: 'rising' },
        { channel: 'YouTube Ads', share: 18, cost: 50, effectiveness: 82, trend: 'stable' },
        { channel: 'Facebook Gaming', share: 8, cost: 30, effectiveness: 75, trend: 'declining' },
        { channel: 'Traditional Media', share: 3, cost: 80, effectiveness: 35, trend: 'declining' },
        { channel: 'Esports Events', share: 1, cost: 150, effectiveness: 92, trend: 'rising' }
      ],
      seasonality: [
        { month: 'Jan', activity: 105, competition: 95, cost: 90 }, // Tet holiday
        { month: 'Feb', activity: 120, competition: 110, cost: 105 }, // Post-Tet gaming
        { month: 'Mar', activity: 98, competition: 100, cost: 100 },
        { month: 'Apr', activity: 102, competition: 105, cost: 110 },
        { month: 'May', activity: 95, competition: 90, cost: 95 },
        { month: 'Jun', activity: 108, competition: 115, cost: 120 }, // Summer gaming
        { month: 'Jul', activity: 112, competition: 125, cost: 130 }, // Peak summer
        { month: 'Aug', activity: 110, competition: 120, cost: 125 },
        { month: 'Sep', activity: 100, competition: 105, cost: 110 }, // Back to school
        { month: 'Oct', activity: 105, competition: 110, cost: 115 },
        { month: 'Nov', activity: 108, competition: 115, cost: 120 },
        { month: 'Dec', activity: 115, competition: 130, cost: 140 } // Holiday season
      ],
      creatorEconomy: {
        totalCreators: 22000,
        avgRates: { nano: 1800, micro: 8500, macro: 32000, mega: 125000 },
        topGenres: ['Mobile MOBA', 'Battle Royale', 'RPG', 'Casual Gaming'],
        saturation: 45
      }
    },
    {
      country: 'Indonesia',
      countryCode: 'ID',
      coordinates: { lat: -0.7893, lng: 113.9213 },
      population: 275000000,
      gamers: 95000000,
      mobileGamers: 88000000,
      avgSpending: 850,
      currency: 'IDR',
      maturityLevel: 'emerging',
      growthRate: 18.7,
      platforms: [
        { platform: 'YouTube', users: 85000000, growth: 15, dominance: 92, avgEngagement: 8.8 },
        { platform: 'TikTok', users: 65000000, growth: 35, dominance: 85, avgEngagement: 13.5 },
        { platform: 'Instagram', users: 70000000, growth: 22, dominance: 78, avgEngagement: 9.5 },
        { platform: 'Facebook Gaming', users: 45000000, growth: 10, dominance: 68, avgEngagement: 6.9 },
        { platform: 'Twitch', users: 8500000, growth: 48, dominance: 42, avgEngagement: 16.8 }
      ],
      competitors: [
        {
          category: 'Gaming Smartphones',
          brands: [
            { name: 'Xiaomi Black Shark', marketShare: 28, spendEstimate: 25000000, primaryChannels: ['YouTube', 'TikTok'], strength: 'dominant' },
            { name: 'ASUS ROG Phone', marketShare: 25, spendEstimate: 22000000, primaryChannels: ['YouTube', 'Instagram'], strength: 'high' },
            { name: 'Samsung Galaxy Gaming', marketShare: 20, spendEstimate: 18000000, primaryChannels: ['Instagram', 'Facebook'], strength: 'high' },
            { name: 'Realme Gaming', marketShare: 15, spendEstimate: 12000000, primaryChannels: ['TikTok', 'YouTube'], strength: 'medium' },
            { name: 'OnePlus Gaming', marketShare: 12, spendEstimate: 10000000, primaryChannels: ['Instagram', 'TikTok'], strength: 'medium' }
          ]
        }
      ],
      mediaMix: [
        { channel: 'Gaming Influencers', share: 38, cost: 28, effectiveness: 91, trend: 'rising' },
        { channel: 'YouTube Ads', share: 30, cost: 42, effectiveness: 85, trend: 'stable' },
        { channel: 'TikTok Ads', share: 22, cost: 35, effectiveness: 88, trend: 'rising' },
        { channel: 'Instagram Ads', share: 8, cost: 45, effectiveness: 79, trend: 'stable' },
        { channel: 'Traditional TV', share: 2, cost: 95, effectiveness: 40, trend: 'declining' }
      ],
      seasonality: [
        { month: 'Jan', activity: 100, competition: 100, cost: 100 },
        { month: 'Feb', activity: 95, competition: 95, cost: 95 },
        { month: 'Mar', activity: 98, competition: 100, cost: 105 },
        { month: 'Apr', activity: 102, competition: 105, cost: 110 },
        { month: 'May', activity: 105, competition: 110, cost: 115 },
        { month: 'Jun', activity: 110, competition: 120, cost: 125 }, // Ramadan gaming
        { month: 'Jul', activity: 115, competition: 125, cost: 130 }, // School holidays
        { month: 'Aug', activity: 118, competition: 130, cost: 135 }, // Independence Day
        { month: 'Sep', activity: 108, competition: 115, cost: 120 },
        { month: 'Oct', activity: 105, competition: 110, cost: 115 },
        { month: 'Nov', activity: 110, competition: 120, cost: 125 },
        { month: 'Dec', activity: 120, competition: 140, cost: 150 } // Holiday peak
      ],
      creatorEconomy: {
        totalCreators: 45000,
        avgRates: { nano: 1200, micro: 6500, macro: 28000, mega: 95000 },
        topGenres: ['Mobile MOBA', 'Battle Royale', 'Simulation', 'Strategy'],
        saturation: 55
      }
    }
  ];

  const getCurrentMarketData = () => {
    return marketData.find(m => m.country === selectedCountry) || marketData[0];
  };

  const formatCurrency = (amount: number, currency: string) => {
    const symbols: { [key: string]: string } = {
      'THB': '฿',
      'VND': '₫',
      'IDR': 'Rp',
      'USD': '$'
    };
    
    if (currency === 'VND' || currency === 'IDR') {
      return `${symbols[currency]}${(amount * 1000).toLocaleString()}`;
    }
    return `${symbols[currency] || '$'}${amount.toLocaleString()}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const getCompetitionLevel = (competition: number) => {
    if (competition >= 130) return { level: 'Very High', color: 'text-red-600 bg-red-100' };
    if (competition >= 110) return { level: 'High', color: 'text-orange-600 bg-orange-100' };
    if (competition >= 95) return { level: 'Medium', color: 'text-yellow-600 bg-yellow-100' };
    return { level: 'Low', color: 'text-green-600 bg-green-100' };
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'declining': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8" />
              <h1 className="text-3xl font-bold">APAC Market Intelligence</h1>
            </div>
            <p className="text-lg text-blue-100 mb-4">
              Interactive competitive landscape and media mix analysis across Asia-Pacific gaming markets
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Real-time Competitive Data</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>Media Mix Optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Creator Economy Insights</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-200">Total APAC Gamers</div>
            <div className="text-4xl font-bold">171M</div>
            <div className="text-blue-200">Across 3 Key Markets</div>
          </div>
        </div>
      </div>     
 {/* Interactive Map & Country Selection */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Interactive Market Map</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <select
                value={filters.budgetRange}
                onChange={(e) => setFilters(prev => ({ ...prev, budgetRange: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="50K-200K">$50K - $200K</option>
                <option value="200K-500K">$200K - $500K</option>
                <option value="500K+">$500K+</option>
              </select>
            </div>
            <Button
              onClick={() => setIsAnimating(!isAnimating)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
            >
              {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isAnimating ? 'Pause' : 'Animate'}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Country Cards */}
          <div className="lg:col-span-1 space-y-4">
            {marketData.map((market) => (
              <div
                key={market.country}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  selectedCountry === market.country
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
                onClick={() => setSelectedCountry(market.country)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">{market.country}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    market.maturityLevel === 'mature' ? 'bg-green-100 text-green-800' :
                    market.maturityLevel === 'developing' ? 'bg-blue-100 text-blue-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {market.maturityLevel.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gamers:</span>
                    <span className="font-semibold">{formatNumber(market.gamers)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth:</span>
                    <span className="font-semibold text-green-600">+{market.growthRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Spend:</span>
                    <span className="font-semibold">{formatCurrency(market.avgSpending, market.currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Creators:</span>
                    <span className="font-semibold">{formatNumber(market.creatorEconomy.totalCreators)}</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t">
                  <div className="text-xs text-gray-500 mb-1">Creator Saturation</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        market.creatorEconomy.saturation >= 70 ? 'bg-red-500' :
                        market.creatorEconomy.saturation >= 50 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${market.creatorEconomy.saturation}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{market.creatorEconomy.saturation}% saturated</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Map Visualization */}
          <div className="lg:col-span-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 relative overflow-hidden">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">APAC Gaming Market Overview</h3>
              <p className="text-gray-600">Click countries for detailed competitive analysis</p>
            </div>
            
            {/* Simplified Map Representation */}
            <div className="relative h-96 bg-gradient-to-b from-blue-100 to-green-100 rounded-lg overflow-hidden">
              {marketData.map((market, index) => (
                <div
                  key={market.country}
                  className={`absolute cursor-pointer transition-all duration-300 ${
                    selectedCountry === market.country ? 'scale-110 z-10' : 'hover:scale-105'
                  }`}
                  style={{
                    left: `${20 + index * 25}%`,
                    top: `${30 + index * 15}%`,
                  }}
                  onClick={() => setSelectedCountry(market.country)}
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                    selectedCountry === market.country ? 'bg-blue-600' : 'bg-purple-500'
                  }`}>
                    <div className="text-center">
                      <div className="text-xs">{market.countryCode}</div>
                      <div className="text-xs">{formatNumber(market.gamers)}</div>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <div className="text-sm font-semibold">{market.country}</div>
                    <div className="text-xs text-gray-600">+{market.growthRate}% growth</div>
                  </div>
                </div>
              ))}
              
              {/* Market Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <path
                  d="M 20% 30% Q 50% 20% 45% 45%"
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                />
                <path
                  d="M 45% 45% Q 60% 55% 70% 60%"
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                />
              </svg>
            </div>
            
            {/* Market Stats Overlay */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <h4 className="font-semibold mb-2">Regional Totals</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Total Population:</span>
                  <span className="font-semibold">443M</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Gamers:</span>
                  <span className="font-semibold">171M</span>
                </div>
                <div className="flex justify-between">
                  <span>Mobile Gamers:</span>
                  <span className="font-semibold">157M</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Creators:</span>
                  <span className="font-semibold">82K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Selector */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center space-x-4">
          {[
            { id: 'overview', label: 'Market Overview', icon: Globe },
            { id: 'competitive', label: 'Competitive Landscape', icon: Target },
            { id: 'media-mix', label: 'Media Mix Analysis', icon: BarChart3 },
            { id: 'creators', label: 'Creator Economy', icon: Users }
          ].map((view) => {
            const Icon = view.icon;
            return (
              <Button
                key={view.id}
                onClick={() => setSelectedView(view.id as any)}
                className={`flex items-center gap-2 px-6 py-3 ${
                  selectedView === view.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {view.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Content Based on Selected View */}
      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Market Maturity */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              {getCurrentMarketData().country} Market Maturity
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Market Stage:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  getCurrentMarketData().maturityLevel === 'mature' ? 'bg-green-100 text-green-800' :
                  getCurrentMarketData().maturityLevel === 'developing' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {getCurrentMarketData().maturityLevel.toUpperCase()}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Growth Rate:</span>
                <span className="font-bold text-green-600">+{getCurrentMarketData().growthRate}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Gaming Penetration:</span>
                <span className="font-bold">
                  {Math.round((getCurrentMarketData().gamers / getCurrentMarketData().population) * 100)}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Mobile Gaming:</span>
                <span className="font-bold">
                  {Math.round((getCurrentMarketData().mobileGamers / getCurrentMarketData().gamers) * 100)}%
                </span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Market Opportunity</h4>
              <p className="text-sm text-blue-700">
                {getCurrentMarketData().maturityLevel === 'emerging' 
                  ? 'High growth potential with lower competition. Ideal for early market entry.'
                  : getCurrentMarketData().maturityLevel === 'developing'
                  ? 'Balanced growth and competition. Good opportunity for established brands.'
                  : 'Mature market with high competition but stable revenue potential.'
                }
              </p>
            </div>
          </div>

          {/* Platform Dominance */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-purple-600" />
              Platform Dominance
            </h3>
            
            <div className="space-y-4">
              {getCurrentMarketData().platforms.map((platform) => (
                <div key={platform.platform} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{platform.platform}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{formatNumber(platform.users)}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        platform.growth >= 20 ? 'bg-green-100 text-green-800' :
                        platform.growth >= 10 ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        +{platform.growth}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${platform.dominance}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Dominance: {platform.dominance}%</span>
                    <span>Engagement: {platform.avgEngagement}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedView === 'competitive' && (
        <div className="space-y-6">
          {getCurrentMarketData().competitors.map((category) => (
            <div key={category.category} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-red-600" />
                {category.category} - Competitive Landscape
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Market Share Chart */}
                <div>
                  <h4 className="font-semibold mb-4">Market Share Distribution</h4>
                  <div className="space-y-3">
                    {category.brands.map((brand) => (
                      <div key={brand.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{brand.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{brand.marketShare}%</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              brand.strength === 'dominant' ? 'bg-red-100 text-red-800' :
                              brand.strength === 'high' ? 'bg-orange-100 text-orange-800' :
                              brand.strength === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {brand.strength.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              brand.strength === 'dominant' ? 'bg-red-500' :
                              brand.strength === 'high' ? 'bg-orange-500' :
                              brand.strength === 'medium' ? 'bg-yellow-500' :
                              'bg-gray-500'
                            }`}
                            style={{ width: `${brand.marketShare * 2}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Est. Spend: {formatCurrency(brand.spendEstimate / 1000, 'USD')}K</span>
                          <span>Channels: {brand.primaryChannels.join(', ')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Competitive Intelligence */}
                <div>
                  <h4 className="font-semibold mb-4">Competitive Intelligence</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="font-semibold text-red-800">High Competition Alert</span>
                      </div>
                      <p className="text-sm text-red-700">
                        {category.brands.filter(b => b.strength === 'dominant' || b.strength === 'high').length} major competitors 
                        control {category.brands.filter(b => b.strength === 'dominant' || b.strength === 'high')
                          .reduce((sum, b) => sum + b.marketShare, 0)}% of market share
                      </p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-blue-800">Channel Insights</span>
                      </div>
                      <div className="text-sm text-blue-700 space-y-1">
                        <div>• YouTube dominates with {category.brands.filter(b => b.primaryChannels.includes('YouTube')).length} major brands</div>
                        <div>• TikTok growing with {category.brands.filter(b => b.primaryChannels.includes('TikTok')).length} brands investing</div>
                        <div>• Twitch specialized for gaming-focused brands</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-800">Opportunity Gap</span>
                      </div>
                      <p className="text-sm text-green-700">
                        {100 - category.brands.reduce((sum, b) => sum + b.marketShare, 0)}% market share available 
                        for new entrants with differentiated positioning
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )} 
     {selectedView === 'media-mix' && (
        <div className="space-y-6">
          {/* Media Mix Overview */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              {getCurrentMarketData().country} Media Mix Analysis
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Channel Performance */}
              <div>
                <h4 className="font-semibold mb-4">Channel Performance & Share</h4>
                <div className="space-y-4">
                  {getCurrentMarketData().mediaMix.map((channel) => (
                    <div key={channel.channel} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{channel.channel}</span>
                          {getTrendIcon(channel.trend)}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">{channel.share}%</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            channel.effectiveness >= 90 ? 'bg-green-100 text-green-800' :
                            channel.effectiveness >= 80 ? 'bg-blue-100 text-blue-800' :
                            channel.effectiveness >= 70 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {channel.effectiveness}% effective
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            channel.trend === 'rising' ? 'bg-green-500' :
                            channel.trend === 'declining' ? 'bg-red-500' :
                            'bg-blue-500'
                          }`}
                          style={{ width: `${channel.share * 2}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>CPM: ${channel.cost}</span>
                        <span className={`font-semibold ${
                          channel.trend === 'rising' ? 'text-green-600' :
                          channel.trend === 'declining' ? 'text-red-600' :
                          'text-gray-600'
                        }`}>
                          {channel.trend.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Optimization Recommendations */}
              <div>
                <h4 className="font-semibold mb-4">Optimization Recommendations</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-800">High Opportunity</span>
                    </div>
                    <div className="text-sm text-green-700 space-y-1">
                      {getCurrentMarketData().mediaMix
                        .filter(c => c.trend === 'rising' && c.effectiveness >= 85)
                        .map(c => (
                          <div key={c.channel}>• Increase {c.channel} investment (+{c.effectiveness}% effective)</div>
                        ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="font-semibold text-yellow-800">Optimize Budget</span>
                    </div>
                    <div className="text-sm text-yellow-700 space-y-1">
                      {getCurrentMarketData().mediaMix
                        .filter(c => c.cost > 100 && c.effectiveness < 70)
                        .map(c => (
                          <div key={c.channel}>• Reduce {c.channel} spend (${c.cost} CPM, {c.effectiveness}% effective)</div>
                        ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-blue-800">Best Performers</span>
                    </div>
                    <div className="text-sm text-blue-700">
                      Gaming Influencers lead with {getCurrentMarketData().mediaMix[0].effectiveness}% effectiveness 
                      at ${getCurrentMarketData().mediaMix[0].cost} CPM - ideal for electronics brands
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seasonal Competition Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Seasonal Competition & Cost Analysis
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-4">Monthly Competition Levels</h4>
                <div className="space-y-3">
                  {getCurrentMarketData().seasonality.map((month) => {
                    const competition = getCompetitionLevel(month.competition);
                    return (
                      <div key={month.month} className="flex items-center justify-between">
                        <span className="font-medium w-12">{month.month}</span>
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                month.competition >= 130 ? 'bg-red-500' :
                                month.competition >= 110 ? 'bg-orange-500' :
                                month.competition >= 95 ? 'bg-yellow-500' :
                                'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(month.competition, 150) / 1.5}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${competition.color}`}>
                          {competition.level}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Cost Optimization Calendar</h4>
                <div className="space-y-3">
                  {getCurrentMarketData().seasonality
                    .sort((a, b) => a.cost - b.cost)
                    .slice(0, 6)
                    .map((month) => (
                      <div key={month.month} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <span className="font-medium">{month.month}</span>
                          <div className="text-xs text-gray-600">
                            Activity: {month.activity}% | Competition: {month.competition}%
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">{month.cost}% cost</div>
                          <div className="text-xs text-green-700">
                            {month.cost < 100 ? 'Low Cost' : month.cost < 120 ? 'Medium Cost' : 'High Cost'}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2">Optimal Campaign Windows</h5>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>• <strong>Feb-Mar:</strong> Low competition, stable costs</div>
                    <div>• <strong>May-Jun:</strong> Moderate activity, good value</div>
                    <div>• <strong>Sep:</strong> Post-holiday recovery, lower costs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'creators' && (
        <div className="space-y-6">
          {/* Creator Economy Overview */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              {getCurrentMarketData().country} Creator Economy
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Creator Tiers */}
              <div>
                <h4 className="font-semibold mb-4">Creator Tier Pricing</h4>
                <div className="space-y-4">
                  {Object.entries(getCurrentMarketData().creatorEconomy.avgRates).map(([tier, rate]) => (
                    <div key={tier} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium capitalize">{tier}</span>
                        <div className="text-xs text-gray-600">
                          {tier === 'nano' ? '1K-10K' :
                           tier === 'micro' ? '10K-100K' :
                           tier === 'macro' ? '100K-1M' :
                           '1M+ followers'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(rate, getCurrentMarketData().currency)}</div>
                        <div className="text-xs text-gray-500">avg per post</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Market Saturation */}
              <div>
                <h4 className="font-semibold mb-4">Market Saturation Analysis</h4>
                <div className="text-center mb-4">
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${getCurrentMarketData().creatorEconomy.saturation * 3.51} 351`}
                        className={`${
                          getCurrentMarketData().creatorEconomy.saturation >= 70 ? 'text-red-500' :
                          getCurrentMarketData().creatorEconomy.saturation >= 50 ? 'text-yellow-500' :
                          'text-green-500'
                        }`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{getCurrentMarketData().creatorEconomy.saturation}%</div>
                        <div className="text-xs text-gray-600">Saturated</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Creators:</span>
                    <span className="font-semibold">{formatNumber(getCurrentMarketData().creatorEconomy.totalCreators)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Status:</span>
                    <span className={`font-semibold ${
                      getCurrentMarketData().creatorEconomy.saturation >= 70 ? 'text-red-600' :
                      getCurrentMarketData().creatorEconomy.saturation >= 50 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {getCurrentMarketData().creatorEconomy.saturation >= 70 ? 'Highly Saturated' :
                       getCurrentMarketData().creatorEconomy.saturation >= 50 ? 'Moderately Saturated' :
                       'Emerging Market'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Top Genres */}
              <div>
                <h4 className="font-semibold mb-4">Popular Gaming Genres</h4>
                <div className="space-y-3">
                  {getCurrentMarketData().creatorEconomy.topGenres.map((genre, index) => (
                    <div key={genre} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-500' :
                        'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium">{genre}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-700">
                    <strong>Opportunity:</strong> {getCurrentMarketData().creatorEconomy.topGenres[0]} creators 
                    have highest engagement rates for electronics brands
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Creator ROI Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Creator ROI & Performance Insights
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">ROI by Creator Tier</h4>
                {[
                  { tier: 'Nano', roi: 6.8, cost: getCurrentMarketData().creatorEconomy.avgRates.nano, color: 'bg-green-500' },
                  { tier: 'Micro', roi: 5.2, cost: getCurrentMarketData().creatorEconomy.avgRates.micro, color: 'bg-blue-500' },
                  { tier: 'Macro', roi: 4.1, cost: getCurrentMarketData().creatorEconomy.avgRates.macro, color: 'bg-purple-500' },
                  { tier: 'Mega', roi: 3.8, cost: getCurrentMarketData().creatorEconomy.avgRates.mega, color: 'bg-orange-500' }
                ].map((tier) => (
                  <div key={tier.tier} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{tier.tier} Creators</span>
                      <span className="font-bold text-green-600">{tier.roi}x ROI</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 rounded-full ${tier.color}`}
                        style={{ width: `${tier.roi * 15}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Avg Cost: {formatCurrency(tier.cost, getCurrentMarketData().currency)}</span>
                      <span>Performance: {tier.roi > 5 ? 'Excellent' : tier.roi > 4 ? 'Good' : 'Average'}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Strategic Recommendations</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-800">Best Value</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Nano and Micro creators offer highest ROI for electronics brands. 
                      Consider 70% micro/nano, 30% macro/mega mix.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-blue-800">Market Entry</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      {getCurrentMarketData().creatorEconomy.saturation < 50 
                        ? 'Low saturation market - excellent opportunity for new brand partnerships'
                        : 'Moderate saturation - focus on differentiated creator partnerships'
                      }
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-purple-800">Timing Strategy</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      Launch campaigns during low-competition months (Feb-Mar, Sep) 
                      for 20-30% better creator availability and rates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Panel */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Launch in {getCurrentMarketData().country}?</h2>
          <p className="text-blue-100 mb-6">
            Use these market insights to create data-driven campaigns with competitive advantages
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3">
              <Target className="w-4 h-4 mr-2" />
              Create Campaign Brief
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3">
              <Users className="w-4 h-4 mr-2" />
              Browse {getCurrentMarketData().country} Creators
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}