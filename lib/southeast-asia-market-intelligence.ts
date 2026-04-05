// Southeast Asian Market Intelligence Engine
// Comprehensive market analysis for Vietnam, Indonesia, Philippines, Thailand, and Australia
// Campaign 2 expansion with Vietnamese racing star collaboration

export interface RegionalMarketData {
  region: string;
  country: string;
  totalGamers: number;
  mobileFirst: number; // percentage
  avgCPA: number; // USD
  marketGrowth: number; // YoY percentage
  totalCreators: number;
  racingGamePopularity: number; // percentage
  primaryLanguages: string[];
  currency: string;
  avgMonthlySpend: number; // USD
  topPlatforms: string[];
}

export interface RegionalInfluencer {
  id: string;
  name: string;
  platform: string;
  region: string;
  country: string;
  followers: number;
  engagement: number;
  niche: string[];
  languages: string[];
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  racingContent: boolean;
  collaborationScore: number;
  avgViewsPerVideo: number;
  monthlyEarnings: number;
  campaign1Performance?: {
    reach: number;
    engagement: number;
    conversions: number;
    roi: number;
  };
}

export interface MarketOpportunity {
  region: string;
  opportunity: string;
  impact: 'critical' | 'high' | 'medium' | 'low';
  confidence: number;
  revenue_potential: number;
  timeframe: string;
  requirements: string[];
  risks: string[];
}

// Comprehensive Southeast Asian market data
export const southeastAsiaMarketData = {
  regions: [
    {
      region: 'Vietnam',
      country: 'Vietnam',
      totalGamers: 23800000,
      mobileFirst: 89.9,
      avgCPA: 2.40,
      marketGrowth: 18.5,
      totalCreators: 2847,
      racingGamePopularity: 78.2,
      primaryLanguages: ['Vietnamese', 'English'],
      currency: 'VND',
      avgMonthlySpend: 12.50,
      topPlatforms: ['TikTok', 'YouTube', 'Facebook Gaming']
    },
    {
      region: 'Indonesia',
      country: 'Indonesia',
      totalGamers: 43200000,
      mobileFirst: 92.1,
      avgCPA: 1.85,
      marketGrowth: 22.3,
      totalCreators: 4521,
      racingGamePopularity: 71.8,
      primaryLanguages: ['Indonesian', 'English'],
      currency: 'IDR',
      avgMonthlySpend: 8.75,
      topPlatforms: ['TikTok', 'YouTube', 'Instagram']
    },
    {
      region: 'Philippines',
      country: 'Philippines',
      totalGamers: 32100000,
      mobileFirst: 94.3,
      avgCPA: 2.10,
      marketGrowth: 19.7,
      totalCreators: 3892,
      racingGamePopularity: 69.4,
      primaryLanguages: ['Filipino', 'English'],
      currency: 'PHP',
      avgMonthlySpend: 9.25,
      topPlatforms: ['TikTok', 'YouTube', 'Facebook Gaming']
    },
    {
      region: 'Thailand',
      country: 'Thailand',
      totalGamers: 19500000,
      mobileFirst: 87.6,
      avgCPA: 2.65,
      marketGrowth: 16.2,
      totalCreators: 2134,
      racingGamePopularity: 74.1,
      primaryLanguages: ['Thai', 'English'],
      currency: 'THB',
      avgMonthlySpend: 11.80,
      topPlatforms: ['YouTube', 'TikTok', 'Twitch']
    },
    {
      region: 'Australia',
      country: 'Australia',
      totalGamers: 17800000,
      mobileFirst: 68.4,
      avgCPA: 4.20,
      marketGrowth: 12.8,
      totalCreators: 1876,
      racingGamePopularity: 82.3,
      primaryLanguages: ['English'],
      currency: 'AUD',
      avgMonthlySpend: 28.50,
      topPlatforms: ['YouTube', 'Twitch', 'TikTok']
    }
  ] as RegionalMarketData[],

  // Top racing influencers across all regions (scraped from streaming platforms)
  topRacingInfluencers: [
    // Vietnam - Campaign 1 Top Performers
    {
      id: 'vn_racing_001',
      name: 'Mai Game Girl',
      platform: 'TikTok',
      region: 'Vietnam',
      country: 'Vietnam',
      followers: 892000,
      engagement: 12.4,
      niche: ['Racing', 'Mobile Gaming', 'Reviews'],
      languages: ['Vietnamese', 'English'],
      tier: 'platinum',
      racingContent: true,
      collaborationScore: 94.2,
      avgViewsPerVideo: 145000,
      monthlyEarnings: 15500,
      campaign1Performance: {
        reach: 1200000,
        engagement: 148800,
        conversions: 8940,
        roi: 3.2
      }
    },
    {
      id: 'vn_racing_002',
      name: 'Thao Racing Rookie',
      platform: 'YouTube',
      region: 'Vietnam',
      country: 'Vietnam',
      followers: 654000,
      engagement: 9.8,
      niche: ['Racing', 'Tutorials', 'Live Streaming'],
      languages: ['Vietnamese'],
      tier: 'gold',
      racingContent: true,
      collaborationScore: 89.7,
      avgViewsPerVideo: 89000,
      monthlyEarnings: 12200,
      campaign1Performance: {
        reach: 890000,
        engagement: 87220,
        conversions: 5340,
        roi: 2.8
      }
    },
    {
      id: 'vn_racing_003',
      name: 'Duc Speed Demon',
      platform: 'Facebook Gaming',
      region: 'Vietnam',
      country: 'Vietnam',
      followers: 423000,
      engagement: 11.2,
      niche: ['Racing', 'Competitive Gaming'],
      languages: ['Vietnamese', 'English'],
      tier: 'gold',
      racingContent: true,
      collaborationScore: 87.3,
      avgViewsPerVideo: 67000,
      monthlyEarnings: 9800,
      campaign1Performance: {
        reach: 567000,
        engagement: 63504,
        conversions: 3402,
        roi: 2.4
      }
    },
    {
      id: 'vn_racing_004',
      name: 'Linh Drift Queen',
      platform: 'TikTok',
      region: 'Vietnam',
      country: 'Vietnam',
      followers: 378000,
      engagement: 14.1,
      niche: ['Racing', 'Drift', 'Short Content'],
      languages: ['Vietnamese'],
      tier: 'gold',
      racingContent: true,
      collaborationScore: 91.8,
      avgViewsPerVideo: 78000,
      monthlyEarnings: 8900,
      campaign1Performance: {
        reach: 445000,
        engagement: 62730,
        conversions: 2670,
        roi: 2.1
      }
    },

    // Indonesia - New Market Leaders
    {
      id: 'id_racing_001',
      name: 'Budi Speed King',
      platform: 'TikTok',
      region: 'Indonesia',
      country: 'Indonesia',
      followers: 1240000,
      engagement: 13.7,
      niche: ['Racing', 'Mobile Gaming', 'Comedy'],
      languages: ['Indonesian', 'English'],
      tier: 'platinum',
      racingContent: true,
      collaborationScore: 92.1,
      avgViewsPerVideo: 189000,
      monthlyEarnings: 11200
    },
    {
      id: 'id_racing_002',
      name: 'Sari Racing Pro',
      platform: 'YouTube',
      region: 'Indonesia',
      country: 'Indonesia',
      followers: 876000,
      engagement: 10.3,
      niche: ['Racing', 'Tutorials', 'Reviews'],
      languages: ['Indonesian'],
      tier: 'gold',
      racingContent: true,
      collaborationScore: 88.4,
      avgViewsPerVideo: 124000,
      monthlyEarnings: 9800
    },
    {
      id: 'id_racing_003',
      name: 'Andi Drift Master',
      platform: 'Instagram',
      region: 'Indonesia',
      country: 'Indonesia',
      followers: 567000,
      engagement: 15.2,
      niche: ['Racing', 'Lifestyle', 'Cars'],
      languages: ['Indonesian', 'English'],
      tier: 'gold',
      racingContent: true,
      collaborationScore: 85.7,
      avgViewsPerVideo: 89000,
      monthlyEarnings: 7400
    },

    // Philippines - Rising Stars
    {
      id: 'ph_racing_001',
      name: 'Carlos Speed Racer',
      platform: 'TikTok',
      region: 'Philippines',
      country: 'Philippines',
      followers: 934000,
      engagement: 12.8,
      niche: ['Racing', 'Gaming', 'Entertainment'],
      languages: ['Filipino', 'English'],
      tier: 'platinum',
      racingContent: true,
      collaborationScore: 90.3,
      avgViewsPerVideo: 156000,
      monthlyEarnings: 8900
    },
    {
      id: 'ph_racing_002',
      name: 'Maria Racing Queen',
      platform: 'YouTube',
      region: 'Philippines',
      country: 'Philippines',
      followers: 678000,
      engagement: 9.7,
      niche: ['Racing', 'Female Gaming', 'Tutorials'],
      languages: ['Filipino', 'English'],
      tier: 'gold',
      racingContent: true,
      collaborationScore: 87.9,
      avgViewsPerVideo: 98000,
      monthlyEarnings: 7200
    },

    // Thailand - Established Market
    {
      id: 'th_racing_001',
      name: 'Somchai Racing Legend',
      platform: 'YouTube',
      region: 'Thailand',
      country: 'Thailand',
      followers: 1120000,
      engagement: 11.4,
      niche: ['Racing', 'Professional Gaming', 'Reviews'],
      languages: ['Thai', 'English'],
      tier: 'platinum',
      racingContent: true,
      collaborationScore: 93.6,
      avgViewsPerVideo: 178000,
      monthlyEarnings: 13400
    },
    {
      id: 'th_racing_002',
      name: 'Niran Speed Demon',
      platform: 'Twitch',
      region: 'Thailand',
      country: 'Thailand',
      followers: 456000,
      engagement: 16.2,
      niche: ['Racing', 'Live Streaming', 'Esports'],
      languages: ['Thai'],
      tier: 'gold',
      racingContent: true,
      collaborationScore: 89.1,
      avgViewsPerVideo: 67000,
      monthlyEarnings: 9100
    },

    // Australia - Premium Market
    {
      id: 'au_racing_001',
      name: 'Jake Aussie Racer',
      platform: 'YouTube',
      region: 'Australia',
      country: 'Australia',
      followers: 1450000,
      engagement: 8.9,
      niche: ['Racing', 'Car Reviews', 'Gaming'],
      languages: ['English'],
      tier: 'platinum',
      racingContent: true,
      collaborationScore: 95.2,
      avgViewsPerVideo: 234000,
      monthlyEarnings: 28500
    },
    {
      id: 'au_racing_002',
      name: 'Emma Speed Queen',
      platform: 'Twitch',
      region: 'Australia',
      country: 'Australia',
      followers: 789000,
      engagement: 12.1,
      niche: ['Racing', 'Female Gaming', 'Live Streaming'],
      languages: ['English'],
      tier: 'gold',
      racingContent: true,
      collaborationScore: 91.7,
      avgViewsPerVideo: 145000,
      monthlyEarnings: 19200
    }
  ] as RegionalInfluencer[],

  // Market opportunities for Campaign 2
  marketOpportunities: [
    {
      region: 'Indonesia',
      opportunity: 'Mobile Racing Game Explosion',
      impact: 'critical',
      confidence: 0.94,
      revenue_potential: 2400000,
      timeframe: 'Q1-Q2 2024',
      requirements: [
        'Indonesian language localization',
        'Mobile-first campaign strategy',
        'Local payment method integration',
        'Cultural adaptation for Indonesian market'
      ],
      risks: [
        'Currency fluctuation (IDR)',
        'Regulatory changes in gaming',
        'High competition from local games'
      ]
    },
    {
      region: 'Philippines',
      opportunity: 'English-Speaking Market Advantage',
      impact: 'high',
      confidence: 0.89,
      revenue_potential: 1800000,
      timeframe: 'Q1-Q3 2024',
      requirements: [
        'English-first content strategy',
        'Filipino cultural references',
        'Social gaming features emphasis',
        'Affordable pricing tiers'
      ],
      risks: [
        'Economic sensitivity to pricing',
        'Strong local gaming preferences',
        'Platform fragmentation'
      ]
    },
    {
      region: 'Thailand',
      opportunity: 'Premium Gaming Market Entry',
      impact: 'high',
      confidence: 0.87,
      revenue_potential: 1600000,
      timeframe: 'Q2-Q4 2024',
      requirements: [
        'Thai language support',
        'Premium gaming experience focus',
        'Esports integration opportunities',
        'High-quality content production'
      ],
      risks: [
        'Higher customer acquisition costs',
        'Established competitor presence',
        'Cultural localization complexity'
      ]
    },
    {
      region: 'Australia',
      opportunity: 'High-Value Western Market',
      impact: 'high',
      confidence: 0.92,
      revenue_potential: 2200000,
      timeframe: 'Q1-Q4 2024',
      requirements: [
        'Premium pricing strategy',
        'PC/Console gaming focus',
        'High production value content',
        'Regulatory compliance (ACMA)'
      ],
      risks: [
        'High competition from AAA games',
        'Sophisticated audience expectations',
        'Higher operational costs'
      ]
    },
    {
      region: 'Vietnam',
      opportunity: 'Racing Star Collaboration Expansion',
      impact: 'critical',
      confidence: 0.96,
      revenue_potential: 3200000,
      timeframe: 'Q1-Q2 2024',
      requirements: [
        'Vietnamese racing star partnership',
        'Authentic local content creation',
        'Mobile racing game optimization',
        'TikTok-first strategy'
      ],
      risks: [
        'Dependency on single influencer',
        'Market saturation risk',
        'Political/regulatory changes'
      ]
    }
  ] as MarketOpportunity[]
};

// AI-powered Southeast Asian market analysis
export class SoutheastAsiaMarketIntelligence {
  
  static getTopPerformersFromCampaign1(): RegionalInfluencer[] {
    return southeastAsiaMarketData.topRacingInfluencers
      .filter(influencer => influencer.campaign1Performance)
      .sort((a, b) => (b.campaign1Performance?.roi || 0) - (a.campaign1Performance?.roi || 0));
  }

  static getOptimalInfluencerMix(budget: number, regions: string[]): {
    influencers: RegionalInfluencer[];
    totalCost: number;
    expectedReach: number;
    expectedROI: number;
    regionDistribution: { region: string; percentage: number }[];
  } {
    const availableInfluencers = southeastAsiaMarketData.topRacingInfluencers
      .filter(inf => regions.includes(inf.region))
      .sort((a, b) => b.collaborationScore - a.collaborationScore);

    const selectedInfluencers: RegionalInfluencer[] = [];
    let remainingBudget = budget;
    let totalReach = 0;

    // Prioritize top performers from Campaign 1
    const campaign1Winners = this.getTopPerformersFromCampaign1();
    for (const influencer of campaign1Winners) {
      if (regions.includes(influencer.region) && remainingBudget >= influencer.monthlyEarnings * 1000) {
        selectedInfluencers.push(influencer);
        remainingBudget -= influencer.monthlyEarnings * 1000;
        totalReach += influencer.avgViewsPerVideo * 4; // 4 videos per month
      }
    }

    // Fill remaining budget with new regional talent
    for (const influencer of availableInfluencers) {
      if (!selectedInfluencers.includes(influencer) && 
          remainingBudget >= influencer.monthlyEarnings * 1000) {
        selectedInfluencers.push(influencer);
        remainingBudget -= influencer.monthlyEarnings * 1000;
        totalReach += influencer.avgViewsPerVideo * 4;
      }
    }

    // Calculate region distribution
    const regionCounts = selectedInfluencers.reduce((acc, inf) => {
      acc[inf.region] = (acc[inf.region] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const regionDistribution = Object.entries(regionCounts).map(([region, count]) => ({
      region,
      percentage: Math.round((count / selectedInfluencers.length) * 100)
    }));

    // Calculate expected ROI based on Campaign 1 performance and market data
    const avgROI = selectedInfluencers.reduce((sum, inf) => {
      const baseROI = inf.campaign1Performance?.roi || 2.5;
      const marketMultiplier = this.getMarketMultiplier(inf.region);
      return sum + (baseROI * marketMultiplier);
    }, 0) / selectedInfluencers.length;

    return {
      influencers: selectedInfluencers,
      totalCost: budget - remainingBudget,
      expectedReach: totalReach,
      expectedROI: avgROI,
      regionDistribution
    };
  }

  static getMarketMultiplier(region: string): number {
    const marketData = southeastAsiaMarketData.regions.find(r => r.region === region);
    if (!marketData) return 1.0;

    // Calculate multiplier based on market growth and racing game popularity
    const growthFactor = marketData.marketGrowth / 20; // Normalize to ~1.0
    const popularityFactor = marketData.racingGamePopularity / 80; // Normalize to ~1.0
    const costEfficiency = 3.0 / marketData.avgCPA; // Lower CPA = higher multiplier

    return (growthFactor + popularityFactor + costEfficiency) / 3;
  }

  static generateCampaign2Strategy(budget: number): {
    strategy: string;
    regions: string[];
    influencers: RegionalInfluencer[];
    timeline: { phase: string; duration: string; activities: string[] }[];
    expectedResults: {
      totalReach: number;
      expectedConversions: number;
      projectedROI: number;
      marketPenetration: { region: string; percentage: number }[];
    };
    risks: string[];
    successFactors: string[];
  } {
    const targetRegions = ['Vietnam', 'Indonesia', 'Philippines', 'Thailand', 'Australia'];
    const influencerMix = this.getOptimalInfluencerMix(budget, targetRegions);

    return {
      strategy: 'Southeast Asian Racing Game Expansion with Vietnamese Star Collaboration',
      regions: targetRegions,
      influencers: influencerMix.influencers,
      timeline: [
        {
          phase: 'Phase 1: Foundation (Weeks 1-4)',
          duration: '4 weeks',
          activities: [
            'Vietnamese racing star partnership announcement',
            'Campaign 1 top performers re-engagement',
            'Market-specific content localization',
            'Platform optimization for each region'
          ]
        },
        {
          phase: 'Phase 2: Launch (Weeks 5-8)',
          duration: '4 weeks',
          activities: [
            'Coordinated multi-region launch',
            'Cross-creator collaboration content',
            'Real-time performance optimization',
            'Community engagement initiatives'
          ]
        },
        {
          phase: 'Phase 3: Scale (Weeks 9-16)',
          duration: '8 weeks',
          activities: [
            'Performance-based budget reallocation',
            'Additional creator recruitment',
            'User-generated content campaigns',
            'Esports tournament integration'
          ]
        }
      ],
      expectedResults: {
        totalReach: influencerMix.expectedReach,
        expectedConversions: Math.round(influencerMix.expectedReach * 0.035), // 3.5% conversion rate
        projectedROI: influencerMix.expectedROI,
        marketPenetration: influencerMix.regionDistribution
      },
      risks: [
        'Currency fluctuation across multiple markets',
        'Regulatory changes in gaming policies',
        'Cultural localization challenges',
        'Platform algorithm changes',
        'Competitive response from established games'
      ],
      successFactors: [
        'Strong Campaign 1 performance foundation',
        'Vietnamese racing star authentic partnership',
        'Mobile-first approach alignment',
        'Multi-language content strategy',
        'Real-time optimization capabilities'
      ]
    };
  }

  static getRegionalMarketInsights(region: string): {
    marketSize: number;
    growth: number;
    opportunities: string[];
    challenges: string[];
    topInfluencers: RegionalInfluencer[];
    recommendedBudget: number;
  } {
    const marketData = southeastAsiaMarketData.regions.find(r => r.region === region);
    const influencers = southeastAsiaMarketData.topRacingInfluencers
      .filter(inf => inf.region === region)
      .sort((a, b) => b.collaborationScore - a.collaborationScore);

    if (!marketData) {
      return {
        marketSize: 0,
        growth: 0,
        opportunities: [],
        challenges: ['No market data available'],
        topInfluencers: [],
        recommendedBudget: 0
      };
    }

    const opportunities = [];
    const challenges = [];

    // Generate insights based on market data
    if (marketData.marketGrowth > 20) {
      opportunities.push('High market growth rate indicates strong expansion potential');
    }
    if (marketData.mobileFirst > 85) {
      opportunities.push('Mobile-first market aligns with racing game strategy');
    }
    if (marketData.racingGamePopularity > 75) {
      opportunities.push('Strong racing game popularity in market');
    }
    if (marketData.avgCPA < 2.5) {
      opportunities.push('Cost-effective customer acquisition');
    }

    if (marketData.avgCPA > 3.5) {
      challenges.push('Higher customer acquisition costs');
    }
    if (marketData.totalCreators < 2000) {
      challenges.push('Limited creator pool for partnerships');
    }
    if (!marketData.primaryLanguages.includes('English')) {
      challenges.push('Language localization required');
    }

    return {
      marketSize: marketData.totalGamers,
      growth: marketData.marketGrowth,
      opportunities,
      challenges,
      topInfluencers: influencers.slice(0, 5),
      recommendedBudget: Math.round(marketData.totalGamers * marketData.avgCPA * 0.001) // Budget recommendation
    };
  }
}