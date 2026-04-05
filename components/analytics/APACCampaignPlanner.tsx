'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  Calendar, 
  TrendingUp, 
  Target, 
  BarChart3,
  Globe,
  DollarSign,
  Users,
  Zap,
  AlertTriangle,
  CheckCircle,
  Star,
  ArrowRight,
  Download,
  Share2,
  Filter,
  Search,
  Eye,
  Heart,
  ShoppingCart,
  MousePointer,
  Smartphone,
  Monitor,
  Mail,
  Clock,
  Bell,
  FileText,
  PieChart,
  LineChart,
  BarChart,
  TrendingDown
} from 'lucide-react';

interface CampaignWindow {
  month: string;
  period: string;
  regions: string[];
  
  // Market conditions
  competition: number; // 0-100
  cost: number; // relative to baseline
  activity: number; // market activity level
  
  // Cultural events
  holidays: string[];
  culturalEvents: string[];
  
  // Optimal strategies
  recommendedGenres: string[];
  recommendedBudget: string;
  expectedROI: number;
  
  // Competitive intelligence
  majorCampaigns: {
    brand: string;
    category: string;
    estimatedSpend: number;
    channels: string[];
  }[];
  
  // Performance benchmarks
  benchmarks: {
    avgCTR: number;
    avgEngagement: number;
    avgConversion: number;
    avgCPM: number;
  };
}

interface RegionalIntelligence {
  region: string;
  totalAddressableMarket: number; // USD
  marketShare: {
    gamefluence: number;
    traditional: number;
    direct: number;
    other: number;
  };
  
  // Performance vs industry
  performance: {
    socialReturn: number; // vs industry avg
    websiteReturn: number;
    ecommerceReturn: number;
    attributableReach: number;
    influencePower: number; // 0-100
  };
  
  // Brand awareness metrics
  brandAwareness: {
    aided: number;
    unaided: number;
    uplift: number;
    sentiment: number;
  };
  
  // A/B testing results
  creativeTests: {
    testName: string;
    variant: string;
    performance: number;
    significance: number;
  }[];
}

interface SurveyInsights {
  campaignId: string;
  responseRate: number;
  insights: {
    brandRecall: number;
    purchaseIntent: number;
    brandPerception: number;
    contentRelevance: number;
    creatorTrust: number;
  };
  demographics: {
    ageGroup: string;
    responses: number;
    avgScore: number;
  }[];
  openFeedback: string[];
}

export default function APACCampaignPlanner() {
  const [selectedView, setSelectedView] = useState<'planner' | 'intelligence' | 'benchmarks' | 'surveys'>('planner');
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['Thailand', 'Vietnam']);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'2024' | '2025'>('2024');
  const [showExportModal, setShowExportModal] = useState(false);

  // Comprehensive campaign planning data
  const campaignWindows: CampaignWindow[] = [
    {
      month: 'January',
      period: 'Q1 Start',
      regions: ['Thailand', 'Vietnam', 'Indonesia'],
      competition: 85,
      cost: 95,
      activity: 90,
      holidays: ['New Year', 'Chinese New Year (late Jan)'],
      culturalEvents: ['Post-holiday gaming surge', 'New Year resolutions'],
      recommendedGenres: ['Fitness Gaming', 'Educational Games', 'Productivity Apps'],
      recommendedBudget: '$75K-150K',
      expectedROI: 3.8,
      majorCampaigns: [
        { brand: 'Samsung Galaxy', category: 'Gaming Phone', estimatedSpend: 2000000, channels: ['YouTube', 'Instagram'] },
        { brand: 'ASUS ROG', category: 'Gaming Laptop', estimatedSpend: 1500000, channels: ['Twitch', 'YouTube'] }
      ],
      benchmarks: { avgCTR: 2.8, avgEngagement: 8.5, avgConversion: 1.2, avgCPM: 45 }
    },
    {
      month: 'February',
      period: 'Chinese New Year',
      regions: ['Vietnam', 'Thailand', 'Indonesia'],
      competition: 120,
      cost: 140,
      activity: 130,
      holidays: ['Chinese New Year', 'Tet Holiday (Vietnam)'],
      culturalEvents: ['Family gaming time', 'Gift-giving season', 'Red envelope campaigns'],
      recommendedGenres: ['Family Games', 'Multiplayer Games', 'Social Gaming'],
      recommendedBudget: '$100K-200K',
      expectedROI: 4.5,
      majorCampaigns: [
        { brand: 'Xiaomi Gaming', category: 'Gaming Phone', estimatedSpend: 3000000, channels: ['TikTok', 'YouTube'] },
        { brand: 'Razer', category: 'Gaming Accessories', estimatedSpend: 1800000, channels: ['Twitch', 'Instagram'] }
      ],
      benchmarks: { avgCTR: 3.5, avgEngagement: 12.8, avgConversion: 2.1, avgCPM: 65 }
    },
    {
      month: 'March',
      period: 'Post-Holiday Recovery',
      regions: ['Thailand', 'Indonesia', 'Philippines'],
      competition: 75,
      cost: 85,
      activity: 95,
      holidays: [],
      culturalEvents: ['Back to routine', 'Spring gaming season'],
      recommendedGenres: ['Battle Royale', 'Strategy Games', 'Esports'],
      recommendedBudget: '$50K-125K',
      expectedROI: 4.2,
      majorCampaigns: [
        { brand: 'OnePlus Gaming', category: 'Gaming Phone', estimatedSpend: 1200000, channels: ['YouTube', 'TikTok'] }
      ],
      benchmarks: { avgCTR: 3.1, avgEngagement: 9.2, avgConversion: 1.8, avgCPM: 38 }
    },
    {
      month: 'April',
      period: 'Songkran & Spring',
      regions: ['Thailand', 'Vietnam', 'Indonesia'],
      competition: 110,
      cost: 125,
      activity: 115,
      holidays: ['Songkran (Thailand)', 'Easter'],
      culturalEvents: ['Water festival gaming', 'Holiday travel', 'Mobile gaming peak'],
      recommendedGenres: ['Mobile Games', 'Casual Gaming', 'Music Games'],
      recommendedBudget: '$80K-160K',
      expectedROI: 3.9,
      majorCampaigns: [
        { brand: 'True Gaming', category: 'Gaming Platform', estimatedSpend: 2500000, channels: ['Facebook Gaming', 'YouTube'] }
      ],
      benchmarks: { avgCTR: 3.3, avgEngagement: 11.5, avgConversion: 1.9, avgCPM: 55 }
    },
    {
      month: 'May',
      period: 'Mid-Year Stability',
      regions: ['Vietnam', 'Indonesia', 'Philippines'],
      competition: 90,
      cost: 100,
      activity: 105,
      holidays: ['Labor Day'],
      culturalEvents: ['Stable gaming patterns', 'Esports tournaments'],
      recommendedGenres: ['Competitive Gaming', 'RPG', 'Strategy'],
      recommendedBudget: '$60K-140K',
      expectedROI: 4.1,
      majorCampaigns: [
        { brand: 'Garena', category: 'Gaming Platform', estimatedSpend: 1800000, channels: ['Facebook Gaming', 'Twitch'] }
      ],
      benchmarks: { avgCTR: 2.9, avgEngagement: 8.8, avgConversion: 1.6, avgCPM: 42 }
    },
    {
      month: 'June',
      period: 'Ramadan Gaming',
      regions: ['Indonesia', 'Malaysia', 'Philippines'],
      competition: 115,
      cost: 130,
      activity: 125,
      holidays: ['Ramadan', 'Eid preparation'],
      culturalEvents: ['Evening gaming surge', 'Family gaming', 'Iftar gaming sessions'],
      recommendedGenres: ['Family Games', 'Casual Gaming', 'Social Games'],
      recommendedBudget: '$90K-180K',
      expectedROI: 4.3,
      majorCampaigns: [
        { brand: 'Realme Gaming', category: 'Gaming Phone', estimatedSpend: 2200000, channels: ['TikTok', 'Instagram'] }
      ],
      benchmarks: { avgCTR: 3.6, avgEngagement: 13.2, avgConversion: 2.3, avgCPM: 58 }
    },
    {
      month: 'July',
      period: 'Summer Gaming Peak',
      regions: ['Thailand', 'Vietnam', 'Indonesia'],
      competition: 125,
      cost: 135,
      activity: 140,
      holidays: ['School holidays'],
      culturalEvents: ['Summer gaming surge', 'Youth gaming peak', 'Esports season'],
      recommendedGenres: ['Battle Royale', 'Multiplayer', 'Streaming Games'],
      recommendedBudget: '$100K-220K',
      expectedROI: 4.0,
      majorCampaigns: [
        { brand: 'ASUS ROG', category: 'Gaming Hardware', estimatedSpend: 2800000, channels: ['Twitch', 'YouTube'] },
        { brand: 'HyperX', category: 'Gaming Accessories', estimatedSpend: 1600000, channels: ['YouTube', 'Instagram'] }
      ],
      benchmarks: { avgCTR: 3.4, avgEngagement: 12.1, avgConversion: 2.0, avgCPM: 62 }
    },
    {
      month: 'August',
      period: 'Independence Celebrations',
      regions: ['Indonesia', 'Philippines', 'Malaysia'],
      competition: 120,
      cost: 130,
      activity: 135,
      holidays: ['Independence Day (Indonesia)', 'National Day (Malaysia)'],
      culturalEvents: ['Patriotic gaming content', 'National pride campaigns'],
      recommendedGenres: ['Local Games', 'Cultural Games', 'National Esports'],
      recommendedBudget: '$85K-170K',
      expectedROI: 4.2,
      majorCampaigns: [
        { brand: 'Local Gaming Studios', category: 'Mobile Games', estimatedSpend: 1400000, channels: ['TikTok', 'Facebook'] }
      ],
      benchmarks: { avgCTR: 3.2, avgEngagement: 10.8, avgConversion: 1.9, avgCPM: 52 }
    },
    {
      month: 'September',
      period: 'Back to School',
      regions: ['Thailand', 'Vietnam', 'Philippines'],
      competition: 95,
      cost: 105,
      activity: 110,
      holidays: [],
      culturalEvents: ['Back to school', 'Routine establishment', 'Educational gaming'],
      recommendedGenres: ['Educational Games', 'Productivity Apps', 'Study Games'],
      recommendedBudget: '$65K-145K',
      expectedROI: 3.7,
      majorCampaigns: [
        { brand: 'Educational Gaming', category: 'Learning Apps', estimatedSpend: 1000000, channels: ['YouTube', 'Instagram'] }
      ],
      benchmarks: { avgCTR: 2.7, avgEngagement: 8.1, avgConversion: 1.4, avgCPM: 40 }
    },
    {
      month: 'October',
      period: 'Gaming Season Start',
      regions: ['Thailand', 'Vietnam', 'Indonesia'],
      competition: 115,
      cost: 120,
      activity: 125,
      holidays: ['Halloween preparation'],
      culturalEvents: ['Gaming season kickoff', 'Esports tournaments', 'New game releases'],
      recommendedGenres: ['Horror Games', 'Action Games', 'New Releases'],
      recommendedBudget: '$80K-165K',
      expectedROI: 4.1,
      majorCampaigns: [
        { brand: 'Gaming Publishers', category: 'New Games', estimatedSpend: 2000000, channels: ['Twitch', 'YouTube'] }
      ],
      benchmarks: { avgCTR: 3.1, avgEngagement: 9.8, avgConversion: 1.7, avgCPM: 48 }
    },
    {
      month: 'November',
      period: 'Pre-Holiday Peak',
      regions: ['Thailand', 'Vietnam', 'Indonesia', 'Philippines'],
      competition: 135,
      cost: 145,
      activity: 150,
      holidays: ['Black Friday', 'Singles Day'],
      culturalEvents: ['Shopping season', 'Gift preparation', 'Gaming deals'],
      recommendedGenres: ['All Categories', 'Gift Games', 'Premium Games'],
      recommendedBudget: '$120K-250K',
      expectedROI: 3.8,
      majorCampaigns: [
        { brand: 'Major Gaming Brands', category: 'All Categories', estimatedSpend: 4000000, channels: ['All Platforms'] }
      ],
      benchmarks: { avgCTR: 3.8, avgEngagement: 14.5, avgConversion: 2.5, avgCPM: 75 }
    },
    {
      month: 'December',
      period: 'Holiday Peak',
      regions: ['All APAC'],
      competition: 150,
      cost: 160,
      activity: 170,
      holidays: ['Christmas', 'New Year preparation'],
      culturalEvents: ['Holiday gaming', 'Gift gaming', 'Family gaming time'],
      recommendedGenres: ['Family Games', 'Gift Games', 'Holiday Specials'],
      recommendedBudget: '$150K-300K',
      expectedROI: 3.5,
      majorCampaigns: [
        { brand: 'All Major Brands', category: 'Holiday Campaigns', estimatedSpend: 6000000, channels: ['All Platforms'] }
      ],
      benchmarks: { avgCTR: 4.2, avgEngagement: 16.8, avgConversion: 2.8, avgCPM: 85 }
    }
  ];

  // Regional intelligence data
  const regionalIntelligence: RegionalIntelligence[] = [
    {
      region: 'Thailand',
      totalAddressableMarket: 450000000, // $450M USD
      marketShare: { gamefluence: 2.5, traditional: 65, direct: 25, other: 7.5 },
      performance: {
        socialReturn: 145, // 45% above industry avg
        websiteReturn: 132,
        ecommerceReturn: 158,
        attributableReach: 89,
        influencePower: 78
      },
      brandAwareness: { aided: 23, unaided: 8, uplift: 15, sentiment: 72 },
      creativeTests: [
        { testName: 'Gaming Setup vs Product Focus', variant: 'Gaming Setup', performance: 134, significance: 95 },
        { testName: 'Influencer vs Brand Voice', variant: 'Influencer Voice', performance: 128, significance: 92 },
        { testName: 'Short vs Long Form', variant: 'Short Form', performance: 142, significance: 98 }
      ]
    },
    {
      region: 'Vietnam',
      totalAddressableMarket: 380000000, // $380M USD
      marketShare: { gamefluence: 1.8, traditional: 58, direct: 32, other: 8.2 },
      performance: {
        socialReturn: 162, // 62% above industry avg
        websiteReturn: 148,
        ecommerceReturn: 171,
        attributableReach: 94,
        influencePower: 85
      },
      brandAwareness: { aided: 19, unaided: 6, uplift: 13, sentiment: 76 },
      creativeTests: [
        { testName: 'Local vs Global Content', variant: 'Local Content', performance: 156, significance: 97 },
        { testName: 'TikTok vs YouTube Format', variant: 'TikTok Format', performance: 139, significance: 94 }
      ]
    },
    {
      region: 'Indonesia',
      totalAddressableMarket: 720000000, // $720M USD
      marketShare: { gamefluence: 1.2, traditional: 52, direct: 38, other: 8.8 },
      performance: {
        socialReturn: 138,
        websiteReturn: 125,
        ecommerceReturn: 149,
        attributableReach: 82,
        influencePower: 71
      },
      brandAwareness: { aided: 16, unaided: 4, uplift: 12, sentiment: 69 },
      creativeTests: [
        { testName: 'Religious Sensitivity Test', variant: 'Culturally Adapted', performance: 167, significance: 99 },
        { testName: 'Price vs Feature Focus', variant: 'Price Focus', performance: 143, significance: 91 }
      ]
    }
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  const getCompetitionLevel = (level: number) => {
    if (level >= 140) return { label: 'Extreme', color: 'bg-red-500 text-white' };
    if (level >= 120) return { label: 'Very High', color: 'bg-red-400 text-white' };
    if (level >= 100) return { label: 'High', color: 'bg-orange-400 text-white' };
    if (level >= 80) return { label: 'Medium', color: 'bg-yellow-400 text-black' };
    return { label: 'Low', color: 'bg-green-400 text-white' };
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-8 h-8" />
              <h1 className="text-3xl font-bold">APAC Campaign Intelligence Platform</h1>
            </div>
            <p className="text-lg text-purple-100 mb-4">
              Advanced campaign planning, competitive intelligence, and performance benchmarking across Asia-Pacific
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>5 Markets Covered</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>Real-time Benchmarks</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Predictive Analytics</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-purple-200">Total Addressable Market</div>
            <div className="text-4xl font-bold">$1.55B</div>
            <div className="text-purple-200">Across APAC Gaming</div>
          </div>
        </div>
      </div>

      {/* View Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center space-x-4">
          {[
            { id: 'planner', label: 'Campaign Planner', icon: Calendar },
            { id: 'intelligence', label: 'Market Intelligence', icon: Target },
            { id: 'benchmarks', label: 'Performance Benchmarks', icon: BarChart3 },
            { id: 'surveys', label: 'Survey Insights', icon: FileText }
          ].map((view) => {
            const Icon = view.icon;
            return (
              <Button
                key={view.id}
                onClick={() => setSelectedView(view.id as any)}
                className={`flex items-center gap-2 px-6 py-3 ${
                  selectedView === view.id
                    ? 'bg-purple-600 text-white'
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

      {/* Campaign Planner View */}
      {selectedView === 'planner' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Year-Round Campaign Planning</h2>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {campaignWindows.slice(0, 4).map((window) => {
                const competition = getCompetitionLevel(window.competition);
                return (
                  <div key={window.month} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg">{window.month}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${competition.color}`}>
                        {competition.label}
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Expected ROI:</span>
                        <span className="font-semibold text-green-600">{window.expectedROI}x</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Budget Range:</span>
                        <span className="font-semibold">{window.recommendedBudget}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Cost Index:</span>
                        <span className="font-semibold">{window.cost}%</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">Key Events:</div>
                      <div className="space-y-1">
                        {window.holidays.slice(0, 2).map((holiday) => (
                          <div key={holiday} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {holiday}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">Recommended Genres:</div>
                      <div className="flex flex-wrap gap-1">
                        {window.recommendedGenres.slice(0, 2).map((genre) => (
                          <span key={genre} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm">
                      Plan Campaign
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Market Intelligence View */}
      {selectedView === 'intelligence' && (
        <div className="space-y-6">
          {regionalIntelligence.map((region) => (
            <div key={region.region} className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">{region.region} Market Intelligence</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Market Share</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Gamefluence:</span>
                      <span className="font-bold text-purple-600">{region.marketShare.gamefluence}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Traditional Agencies:</span>
                      <span className="font-semibold">{region.marketShare.traditional}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Direct Brand:</span>
                      <span className="font-semibold">{region.marketShare.direct}%</span>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-sm font-semibold text-green-800">TAM: {formatCurrency(region.totalAddressableMarket)}</div>
                    <div className="text-xs text-green-600">Total Addressable Market</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Performance vs Industry</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Social Return:</span>
                      <span className="font-bold text-green-600">+{region.performance.socialReturn - 100}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>E-commerce Return:</span>
                      <span className="font-bold text-green-600">+{region.performance.ecommerceReturn - 100}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Influence Power:</span>
                      <span className="font-bold text-blue-600">{region.performance.influencePower}/100</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Brand Awareness</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Aided Recall:</span>
                      <span className="font-semibold">{region.brandAwareness.aided}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Unaided Recall:</span>
                      <span className="font-semibold">{region.brandAwareness.unaided}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Brand Uplift:</span>
                      <span className="font-bold text-green-600">+{region.brandAwareness.uplift}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Export & Actions */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Export Intelligence Reports</h2>
            <p className="text-purple-100">
              Generate comprehensive reports for stakeholders and strategic planning
            </p>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={() => setShowExportModal(true)}
              className="bg-white text-purple-600 hover:bg-purple-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button className="bg-purple-500 hover:bg-purple-400 text-white">
              <Share2 className="w-4 h-4 mr-2" />
              Share Insights
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}