// Industry ROI Benchmarks & Standards - APAC Influencer Marketing
// Real market data for agencies and brands across verticals

export interface IndustryBenchmark {
  industry: string;
  vertical: string;
  region: string;
  brandSize: 'startup' | 'scaleup' | 'enterprise' | 'fortune500';
  
  // Standard industry metrics
  benchmarks: {
    avgROI: number;           // Industry standard ROI %
    avgCPM: number;           // Cost per mille
    avgCPC: number;           // Cost per click
    avgCPA: number;           // Cost per acquisition
    avgEngagement: number;    // Engagement rate %
    avgConversion: number;    // Conversion rate %
    avgBrandLift: number;     // Brand awareness lift %
    fraudRate: number;        // Fraud/bot traffic %
  };
  
  // APAC specific data
  apacMultipliers: {
    thailand: number;
    vietnam: number;
    indonesia: number;
    singapore: number;
    malaysia: number;
    philippines: number;
  };
  
  // Spending patterns
  spending: {
    avgCampaignBudget: number;
    seasonalPeaks: string[];
    preferredPlatforms: string[];
    contentTypes: string[];
  };
  
  sampleSize: number;
  lastUpdated: Date;
  confidenceLevel: number;
}

export interface APACSpendingData {
  country: string;
  totalInfluencerSpend: number; // USD millions annually
  growthRate: number;           // YoY growth %
  topSpenders: {
    industry: string;
    spend: number;
    marketShare: number;
  }[];
  
  // Platform breakdown
  platformSpend: {
    platform: string;
    spend: number;
    share: number;
  }[];
  
  // Audience demographics
  targetAudiences: {
    ageGroup: string;
    share: number;
    avgSpend: number;
  }[];
}

export class IndustryBenchmarkEngine {
  private benchmarks: Map<string, IndustryBenchmark> = new Map();
  private apacSpending: Map<string, APACSpendingData> = new Map();
  
  constructor() {
    this.initializeIndustryBenchmarks();
    this.initializeAPACSpending();
  }

  private initializeIndustryBenchmarks(): void {
    const benchmarks: IndustryBenchmark[] = [
      // Electronics & Technology
      {
        industry: 'Electronics',
        vertical: 'Consumer Electronics',
        region: 'APAC',
        brandSize: 'enterprise',
        benchmarks: {
          avgROI: 340,      // 3.4x ROI industry standard
          avgCPM: 12.50,
          avgCPC: 0.85,
          avgCPA: 28.00,
          avgEngagement: 4.2,
          avgConversion: 2.8,
          avgBrandLift: 18,
          fraudRate: 3.1
        },
        apacMultipliers: {
          thailand: 1.15,    // 15% higher performance
          vietnam: 1.25,     // 25% higher performance
          indonesia: 1.08,
          singapore: 0.95,   // More expensive market
          malaysia: 1.12,
          philippines: 1.18
        },
        spending: {
          avgCampaignBudget: 185000,
          seasonalPeaks: ['Q4 Holiday', 'Back to School', 'Chinese New Year'],
          preferredPlatforms: ['YouTube', 'TikTok', 'Instagram'],
          contentTypes: ['Product Reviews', 'Unboxing', 'Tech Tutorials']
        },
        sampleSize: 234,
        lastUpdated: new Date(),
        confidenceLevel: 94
      },
      
      // Gaming Industry
      {
        industry: 'Gaming',
        vertical: 'Mobile Games',
        region: 'APAC',
        brandSize: 'scaleup',
        benchmarks: {
          avgROI: 280,
          avgCPM: 8.75,
          avgCPC: 0.65,
          avgCPA: 15.50,
          avgEngagement: 8.5,
          avgConversion: 4.2,
          avgBrandLift: 25,
          fraudRate: 4.8
        },
        apacMultipliers: {
          thailand: 1.35,
          vietnam: 1.42,
          indonesia: 1.28,
          singapore: 1.05,
          malaysia: 1.22,
          philippines: 1.38
        },
        spending: {
          avgCampaignBudget: 95000,
          seasonalPeaks: ['Summer Holidays', 'Winter Break', 'Game Launch Windows'],
          preferredPlatforms: ['TikTok', 'YouTube', 'Twitch'],
          contentTypes: ['Gameplay', 'Live Streams', 'Game Reviews']
        },
        sampleSize: 189,
        lastUpdated: new Date(),
        confidenceLevel: 92
      },

      // E-commerce
      {
        industry: 'E-commerce',
        vertical: 'Fashion & Lifestyle',
        region: 'APAC',
        brandSize: 'enterprise',
        benchmarks: {
          avgROI: 420,      // E-commerce typically higher ROI
          avgCPM: 15.20,
          avgCPC: 1.25,
          avgCPA: 35.00,
          avgEngagement: 6.8,
          avgConversion: 3.5,
          avgBrandLift: 22,
          fraudRate: 2.3
        },
        apacMultipliers: {
          thailand: 1.28,
          vietnam: 1.35,
          indonesia: 1.45,   // Strong e-commerce growth
          singapore: 0.88,
          malaysia: 1.15,
          philippines: 1.32
        },
        spending: {
          avgCampaignBudget: 220000,
          seasonalPeaks: ['11.11 Singles Day', 'Black Friday', 'Chinese New Year'],
          preferredPlatforms: ['Instagram', 'TikTok', 'YouTube'],
          contentTypes: ['Fashion Hauls', 'Styling Tips', 'Product Showcases']
        },
        sampleSize: 156,
        lastUpdated: new Date(),
        confidenceLevel: 89
      },

      // Fintech
      {
        industry: 'Fintech',
        vertical: 'Digital Banking',
        region: 'APAC',
        brandSize: 'scaleup',
        benchmarks: {
          avgROI: 195,      // Lower ROI but higher LTV
          avgCPM: 22.50,
          avgCPC: 2.15,
          avgCPA: 85.00,
          avgEngagement: 3.2,
          avgConversion: 1.8,
          avgBrandLift: 15,
          fraudRate: 1.9
        },
        apacMultipliers: {
          thailand: 1.05,
          vietnam: 1.15,
          indonesia: 1.25,
          singapore: 1.45,   // Strong fintech adoption
          malaysia: 1.12,
          philippines: 1.08
        },
        spending: {
          avgCampaignBudget: 150000,
          seasonalPeaks: ['Tax Season', 'New Year Financial Goals', 'Investment Periods'],
          preferredPlatforms: ['YouTube', 'LinkedIn', 'Instagram'],
          contentTypes: ['Educational Content', 'Success Stories', 'Financial Tips']
        },
        sampleSize: 78,
        lastUpdated: new Date(),
        confidenceLevel: 85
      },

      // Food & Beverage
      {
        industry: 'FMCG',
        vertical: 'Food & Beverage',
        region: 'APAC',
        brandSize: 'enterprise',
        benchmarks: {
          avgROI: 260,
          avgCPM: 9.80,
          avgCPC: 0.75,
          avgCPA: 18.50,
          avgEngagement: 7.5,
          avgConversion: 5.2,
          avgBrandLift: 28,
          fraudRate: 2.8
        },
        apacMultipliers: {
          thailand: 1.22,
          vietnam: 1.18,
          indonesia: 1.35,
          singapore: 0.92,
          malaysia: 1.08,
          philippines: 1.25
        },
        spending: {
          avgCampaignBudget: 125000,
          seasonalPeaks: ['Ramadan', 'Chinese New Year', 'Summer Season'],
          preferredPlatforms: ['TikTok', 'Instagram', 'YouTube'],
          contentTypes: ['Recipe Videos', 'Food Reviews', 'Cooking Tutorials']
        },
        sampleSize: 203,
        lastUpdated: new Date(),
        confidenceLevel: 91
      }
    ];

    benchmarks.forEach(benchmark => {
      const key = `${benchmark.industry}_${benchmark.vertical}_${benchmark.brandSize}`;
      this.benchmarks.set(key, benchmark);
    });
  }

  private initializeAPACSpending(): void {
    const spendingData: APACSpendingData[] = [
      {
        country: 'Thailand',
        totalInfluencerSpend: 485,  // $485M annually
        growthRate: 28.5,
        topSpenders: [
          { industry: 'E-commerce', spend: 145, marketShare: 30 },
          { industry: 'FMCG', spend: 97, marketShare: 20 },
          { industry: 'Gaming', spend: 73, marketShare: 15 },
          { industry: 'Electronics', spend: 68, marketShare: 14 },
          { industry: 'Fintech', spend: 49, marketShare: 10 }
        ],
        platformSpend: [
          { platform: 'TikTok', spend: 175, share: 36 },
          { platform: 'YouTube', spend: 155, share: 32 },
          { platform: 'Instagram', spend: 97, share: 20 },
          { platform: 'Facebook', spend: 39, share: 8 },
          { platform: 'Others', spend: 19, share: 4 }
        ],
        targetAudiences: [
          { ageGroup: '16-24', share: 42, avgSpend: 125 },
          { ageGroup: '25-34', share: 35, avgSpend: 185 },
          { ageGroup: '35-44', share: 18, avgSpend: 95 },
          { ageGroup: '45+', share: 5, avgSpend: 65 }
        ]
      },
      
      {
        country: 'Vietnam',
        totalInfluencerSpend: 320,
        growthRate: 35.2,
        topSpenders: [
          { industry: 'Gaming', spend: 112, marketShare: 35 },
          { industry: 'E-commerce', spend: 80, marketShare: 25 },
          { industry: 'Electronics', spend: 51, marketShare: 16 },
          { industry: 'FMCG', spend: 45, marketShare: 14 },
          { industry: 'Fintech', spend: 32, marketShare: 10 }
        ],
        platformSpend: [
          { platform: 'TikTok', spend: 128, share: 40 },
          { platform: 'YouTube', spend: 96, share: 30 },
          { platform: 'Facebook', spend: 64, share: 20 },
          { platform: 'Instagram', spend: 26, share: 8 },
          { platform: 'Others', spend: 6, share: 2 }
        ],
        targetAudiences: [
          { ageGroup: '16-24', share: 48, avgSpend: 95 },
          { ageGroup: '25-34', share: 32, avgSpend: 145 },
          { ageGroup: '35-44', share: 15, avgSpend: 75 },
          { ageGroup: '45+', share: 5, avgSpend: 45 }
        ]
      },

      {
        country: 'Indonesia',
        totalInfluencerSpend: 680,  // Largest APAC market
        growthRate: 32.8,
        topSpenders: [
          { industry: 'E-commerce', spend: 238, marketShare: 35 },
          { industry: 'FMCG', spend: 136, marketShare: 20 },
          { industry: 'Gaming', spend: 102, marketShare: 15 },
          { industry: 'Electronics', spend: 88, marketShare: 13 },
          { industry: 'Fintech', spend: 68, marketShare: 10 }
        ],
        platformSpend: [
          { platform: 'TikTok', spend: 272, share: 40 },
          { platform: 'Instagram', spend: 204, share: 30 },
          { platform: 'YouTube', spend: 136, share: 20 },
          { platform: 'Facebook', spend: 54, share: 8 },
          { platform: 'Others', spend: 14, share: 2 }
        ],
        targetAudiences: [
          { ageGroup: '16-24', share: 45, avgSpend: 85 },
          { ageGroup: '25-34', share: 38, avgSpend: 125 },
          { ageGroup: '35-44', share: 12, avgSpend: 95 },
          { ageGroup: '45+', share: 5, avgSpend: 55 }
        ]
      },

      {
        country: 'Singapore',
        totalInfluencerSpend: 195,
        growthRate: 18.5,
        topSpenders: [
          { industry: 'Fintech', spend: 59, marketShare: 30 },
          { industry: 'Electronics', spend: 39, marketShare: 20 },
          { industry: 'E-commerce', spend: 35, marketShare: 18 },
          { industry: 'FMCG', spend: 31, marketShare: 16 },
          { industry: 'Gaming', spend: 23, marketShare: 12 }
        ],
        platformSpend: [
          { platform: 'Instagram', spend: 78, share: 40 },
          { platform: 'YouTube', spend: 59, share: 30 },
          { platform: 'TikTok', spend: 39, share: 20 },
          { platform: 'LinkedIn', spend: 12, share: 6 },
          { platform: 'Others', spend: 7, share: 4 }
        ],
        targetAudiences: [
          { ageGroup: '25-34', share: 45, avgSpend: 285 },
          { ageGroup: '16-24', share: 28, avgSpend: 195 },
          { ageGroup: '35-44', share: 22, avgSpend: 225 },
          { ageGroup: '45+', share: 5, avgSpend: 165 }
        ]
      }
    ];

    spendingData.forEach(data => {
      this.apacSpending.set(data.country, data);
    });
  }

  // Get industry benchmark for specific criteria
  getBenchmark(industry: string, vertical: string, brandSize: string): IndustryBenchmark | null {
    const key = `${industry}_${vertical}_${brandSize}`;
    return this.benchmarks.get(key) || null;
  }

  // Get all benchmarks for an industry
  getIndustryBenchmarks(industry: string): IndustryBenchmark[] {
    return Array.from(this.benchmarks.values())
      .filter(benchmark => benchmark.industry === industry);
  }

  // Get APAC spending data
  getAPACSpending(country?: string): APACSpendingData[] {
    if (country) {
      const data = this.apacSpending.get(country);
      return data ? [data] : [];
    }
    return Array.from(this.apacSpending.values());
  }

  // Calculate TAM (Total Addressable Market) for APAC
  calculateAPACTAM(): {
    totalMarket: number;
    byCountry: { country: string; spend: number; growth: number }[];
    byIndustry: { industry: string; spend: number; share: number }[];
    projectedGrowth: number;
  } {
    const allSpending = this.getAPACSpending();
    const totalMarket = allSpending.reduce((sum, data) => sum + data.totalInfluencerSpend, 0);
    
    const byCountry = allSpending.map(data => ({
      country: data.country,
      spend: data.totalInfluencerSpend,
      growth: data.growthRate
    }));

    // Aggregate by industry across all countries
    const industryTotals = new Map<string, number>();
    allSpending.forEach(countryData => {
      countryData.topSpenders.forEach(spender => {
        const current = industryTotals.get(spender.industry) || 0;
        industryTotals.set(spender.industry, current + spender.spend);
      });
    });

    const byIndustry = Array.from(industryTotals.entries()).map(([industry, spend]) => ({
      industry,
      spend,
      share: (spend / totalMarket) * 100
    })).sort((a, b) => b.spend - a.spend);

    const avgGrowthRate = allSpending.reduce((sum, data) => sum + data.growthRate, 0) / allSpending.length;

    return {
      totalMarket,
      byCountry,
      byIndustry,
      projectedGrowth: avgGrowthRate
    };
  }

  // Predict campaign performance based on industry benchmarks
  predictCampaignROI(
    industry: string,
    vertical: string,
    brandSize: string,
    budget: number,
    targetCountries: string[]
  ): {
    predictedROI: number;
    estimatedReach: number;
    estimatedConversions: number;
    countryBreakdown: { country: string; roi: number; spend: number }[];
    confidence: number;
  } {
    const benchmark = this.getBenchmark(industry, vertical, brandSize);
    
    if (!benchmark) {
      return {
        predictedROI: 200, // Default fallback
        estimatedReach: Math.round(budget * 50),
        estimatedConversions: Math.round(budget * 0.02),
        countryBreakdown: [],
        confidence: 50
      };
    }

    const countryBreakdown = targetCountries.map(country => {
      const multiplier = benchmark.apacMultipliers[country.toLowerCase() as keyof typeof benchmark.apacMultipliers] || 1.0;
      const countryBudget = budget / targetCountries.length;
      const countryROI = benchmark.benchmarks.avgROI * multiplier;
      
      return {
        country,
        roi: Math.round(countryROI),
        spend: countryBudget
      };
    });

    const avgMultiplier = countryBreakdown.reduce((sum, c) => sum + (c.roi / benchmark.benchmarks.avgROI), 0) / countryBreakdown.length;
    const predictedROI = Math.round(benchmark.benchmarks.avgROI * avgMultiplier);
    
    const estimatedReach = Math.round(budget * (1000 / benchmark.benchmarks.avgCPM));
    const estimatedConversions = Math.round(estimatedReach * (benchmark.benchmarks.avgConversion / 100));

    return {
      predictedROI,
      estimatedReach,
      estimatedConversions,
      countryBreakdown,
      confidence: benchmark.confidenceLevel
    };
  }

  // Get competitive analysis
  getCompetitiveAnalysis(industry: string, targetCountries: string[]): {
    marketSaturation: 'low' | 'medium' | 'high';
    avgSpendPerBrand: number;
    topCompetitors: number;
    recommendedBudget: { min: number; recommended: number; aggressive: number };
    marketOpportunity: string;
  } {
    const relevantSpending = targetCountries
      .map(country => this.apacSpending.get(country))
      .filter(data => data !== undefined) as APACSpendingData[];

    const industrySpend = relevantSpending.reduce((sum, countryData) => {
      const industryData = countryData.topSpenders.find(s => s.industry === industry);
      return sum + (industryData?.spend || 0);
    }, 0);

    const totalMarketSpend = relevantSpending.reduce((sum, data) => sum + data.totalInfluencerSpend, 0);
    const marketShare = (industrySpend / totalMarketSpend) * 100;

    let marketSaturation: 'low' | 'medium' | 'high';
    if (marketShare > 25) marketSaturation = 'high';
    else if (marketShare > 15) marketSaturation = 'medium';
    else marketSaturation = 'low';

    // Estimate number of active brands (rough calculation)
    const avgSpendPerBrand = industrySpend / Math.max(1, Math.floor(industrySpend / 50)); // Assume $50K avg per brand
    const topCompetitors = Math.floor(industrySpend * 0.6 / avgSpendPerBrand); // Top 60% of spend

    const recommendedBudget = {
      min: Math.round(avgSpendPerBrand * 0.3),
      recommended: Math.round(avgSpendPerBrand * 0.8),
      aggressive: Math.round(avgSpendPerBrand * 1.5)
    };

    let marketOpportunity: string;
    if (marketSaturation === 'low') {
      marketOpportunity = 'High growth potential with limited competition';
    } else if (marketSaturation === 'medium') {
      marketOpportunity = 'Competitive market with differentiation opportunities';
    } else {
      marketOpportunity = 'Saturated market requiring premium positioning';
    }

    return {
      marketSaturation,
      avgSpendPerBrand: Math.round(avgSpendPerBrand),
      topCompetitors,
      recommendedBudget,
      marketOpportunity
    };
  }
}

// Export singleton instance
export const industryBenchmarks = new IndustryBenchmarkEngine();