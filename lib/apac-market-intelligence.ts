// APAC Influencer Market Intelligence - Complete ecosystem analysis
// Industry benchmarks, TAM analysis, and agency-focused insights

export interface APACRegion {
  code: string;
  name: string;
  enabled: boolean;
  marketSize: number; // USD millions
  gamingPopulation: number;
  avgCPI: number;
  avgEngagement: number;
  topGenres: string[];
  launchPriority: 'high' | 'medium' | 'low' | 'blocked';
}

export interface GenreBenchmark {
  genre: string;
  subGenre?: string;
  brandCategory: string;
  benchmarks: {
    avgROI: number;
    avgCPI: number;
    avgEngagement: number;
    avgRetention: number;
    fraudRate: number;
    conversionRate: number;
  };
  sampleSize: number;
  lastUpdated: Date;
  confidenceLevel: number;
}

export interface CohortAnalysis {
  cohortId: string;
  cohortName: string;
  genre: string;
  subGenre: string;
  brandCategory: string;
  region: string;
  launchDate: Date;
  
  // Performance metrics
  metrics: {
    day1Retention: number;
    day7Retention: number;
    day30Retention: number;
    avgSessionLength: number;
    ltv: number;
    cac: number;
    paybackPeriod: number;
  };
  
  // Comparison to benchmarks
  vsIndustry: {
    retentionDelta: number;
    ltvDelta: number;
    cacDelta: number;
    overallScore: number;
  };
  
  // Learning insights
  insights: string[];
  recommendations: string[];
}

export class APACMarketIntelligence {
  private regions: Map<string, APACRegion> = new Map();
  private genreBenchmarks: Map<string, GenreBenchmark> = new Map();
  private cohortData: Map<string, CohortAnalysis> = new Map();
  private accessLevel: 'founder' | 'admin' | 'user' = 'user';

  constructor(accessLevel: 'founder' | 'admin' | 'user' = 'user') {
    this.accessLevel = accessLevel;
    this.initializeAPACRegions();
    this.initializeGenreBenchmarks();
    this.initializeCohortData();
  }

  // Initialize APAC regions with market data
  private initializeAPACRegions(): void {
    const regions: APACRegion[] = [
      {
        code: 'TH',
        name: 'Thailand',
        enabled: true,
        marketSize: 1200,
        gamingPopulation: 32000000,
        avgCPI: 0.85,
        avgEngagement: 7.2,
        topGenres: ['Mobile RPG', 'Battle Royale', 'Casual'],
        launchPriority: 'high'
      },
      {
        code: 'VN',
        name: 'Vietnam', 
        enabled: true,
        marketSize: 800,
        gamingPopulation: 23000000,
        avgCPI: 0.65,
        avgEngagement: 8.1,
        topGenres: ['MOBA', 'Mobile RPG', 'Strategy'],
        launchPriority: 'high'
      },
      {
        code: 'SG',
        name: 'Singapore',
        enabled: true,
        marketSize: 450,
        gamingPopulation: 3200000,
        avgCPI: 1.25,
        avgEngagement: 6.8,
        topGenres: ['Strategy', 'RPG', 'Simulation'],
        launchPriority: 'medium'
      },
      {
        code: 'MY',
        name: 'Malaysia',
        enabled: true,
        marketSize: 650,
        gamingPopulation: 15000000,
        avgCPI: 0.75,
        avgEngagement: 7.5,
        topGenres: ['Mobile RPG', 'Racing', 'Sports'],
        launchPriority: 'medium'
      },
      {
        code: 'ID',
        name: 'Indonesia',
        enabled: true,
        marketSize: 1800,
        gamingPopulation: 95000000,
        avgCPI: 0.45,
        avgEngagement: 8.7,
        topGenres: ['Battle Royale', 'MOBA', 'Casual'],
        launchPriority: 'high'
      },
      {
        code: 'PH',
        name: 'Philippines',
        enabled: true,
        marketSize: 900,
        gamingPopulation: 43000000,
        avgCPI: 0.55,
        avgEngagement: 8.3,
        topGenres: ['MOBA', 'Battle Royale', 'RPG'],
        launchPriority: 'high'
      },
      {
        code: 'JP',
        name: 'Japan',
        enabled: this.accessLevel === 'founder',
        marketSize: 4200,
        gamingPopulation: 75000000,
        avgCPI: 2.15,
        avgEngagement: 5.9,
        topGenres: ['Gacha', 'RPG', 'Puzzle'],
        launchPriority: 'blocked' // Requires founder access
      },
      {
        code: 'KR',
        name: 'South Korea',
        enabled: this.accessLevel === 'founder',
        marketSize: 3800,
        gamingPopulation: 28000000,
        avgCPI: 1.95,
        avgEngagement: 6.2,
        topGenres: ['MMORPG', 'Strategy', 'Battle Royale'],
        launchPriority: 'blocked' // Requires founder access
      },
      {
        code: 'CN',
        name: 'China',
        enabled: false, // Blocked for all
        marketSize: 15000,
        gamingPopulation: 720000000,
        avgCPI: 1.35,
        avgEngagement: 7.8,
        topGenres: ['MOBA', 'RPG', 'Strategy'],
        launchPriority: 'blocked'
      },
      {
        code: 'IN',
        name: 'India',
        enabled: this.accessLevel === 'founder',
        marketSize: 2100,
        gamingPopulation: 420000000,
        avgCPI: 0.25,
        avgEngagement: 9.1,
        topGenres: ['Battle Royale', 'Casual', 'Sports'],
        launchPriority: 'blocked' // Future expansion
      }
    ];

    regions.forEach(region => {
      this.regions.set(region.code, region);
    });
  }

  // Initialize genre benchmarks with tiered access
  private initializeGenreBenchmarks(): void {
    const benchmarks: GenreBenchmark[] = [
      // Mobile RPG benchmarks
      {
        genre: 'Mobile RPG',
        subGenre: 'Turn-based',
        brandCategory: 'Indie Studio',
        benchmarks: {
          avgROI: 245,
          avgCPI: 0.75,
          avgEngagement: 7.8,
          avgRetention: 42,
          fraudRate: 2.1,
          conversionRate: 12.5
        },
        sampleSize: 156,
        lastUpdated: new Date(),
        confidenceLevel: 95
      },
      {
        genre: 'Mobile RPG',
        subGenre: 'Action RPG',
        brandCategory: 'AA Studio',
        benchmarks: {
          avgROI: 320,
          avgCPI: 1.25,
          avgEngagement: 8.9,
          avgRetention: 38,
          fraudRate: 1.8,
          conversionRate: 15.2
        },
        sampleSize: 89,
        lastUpdated: new Date(),
        confidenceLevel: 92
      },
      // Battle Royale benchmarks
      {
        genre: 'Battle Royale',
        subGenre: 'Mobile BR',
        brandCategory: 'AAA Studio',
        benchmarks: {
          avgROI: 180,
          avgCPI: 1.85,
          avgEngagement: 9.2,
          avgRetention: 28,
          fraudRate: 3.2,
          conversionRate: 8.7
        },
        sampleSize: this.accessLevel === 'founder' ? 234 : 45, // Limited data for non-founders
        lastUpdated: new Date(),
        confidenceLevel: this.accessLevel === 'founder' ? 98 : 85
      },
      // Strategy Game benchmarks
      {
        genre: 'Strategy',
        subGenre: 'Real-time Strategy',
        brandCategory: 'Indie Studio',
        benchmarks: {
          avgROI: 195,
          avgCPI: 0.95,
          avgEngagement: 6.8,
          avgRetention: 45,
          fraudRate: 1.9,
          conversionRate: 11.3
        },
        sampleSize: 67,
        lastUpdated: new Date(),
        confidenceLevel: 89
      },
      // MOBA benchmarks (APAC specific)
      {
        genre: 'MOBA',
        subGenre: 'Mobile MOBA',
        brandCategory: 'AA Studio',
        benchmarks: {
          avgROI: 275,
          avgCPI: 1.15,
          avgEngagement: 8.5,
          avgRetention: 35,
          fraudRate: 2.3,
          conversionRate: 13.8
        },
        sampleSize: this.accessLevel === 'founder' ? 178 : 32,
        lastUpdated: new Date(),
        confidenceLevel: this.accessLevel === 'founder' ? 96 : 82
      }
    ];

    benchmarks.forEach(benchmark => {
      const key = `${benchmark.genre}_${benchmark.subGenre}_${benchmark.brandCategory}`;
      this.genreBenchmarks.set(key, benchmark);
    });
  }

  // Initialize cohort analysis data
  private initializeCohortData(): void {
    const cohorts: CohortAnalysis[] = [
      {
        cohortId: 'cohort_th_rpg_001',
        cohortName: 'Thailand Mobile RPG Q1 2024',
        genre: 'Mobile RPG',
        subGenre: 'Turn-based',
        brandCategory: 'Indie Studio',
        region: 'TH',
        launchDate: new Date('2024-01-15'),
        metrics: {
          day1Retention: 68,
          day7Retention: 42,
          day30Retention: 18,
          avgSessionLength: 12.5,
          ltv: 8.75,
          cac: 2.15,
          paybackPeriod: 14
        },
        vsIndustry: {
          retentionDelta: 12.5, // 12.5% above industry
          ltvDelta: 8.2,
          cacDelta: -15.3, // 15.3% lower CAC (better)
          overallScore: 85
        },
        insights: [
          'Thai users show 25% higher retention than regional average',
          'Turn-based RPG performs exceptionally well in Thailand market',
          'Weekend engagement spikes by 40% during local festivals'
        ],
        recommendations: [
          'Increase Thailand budget allocation by 30%',
          'Focus on turn-based mechanics for APAC expansion',
          'Schedule major updates around Thai cultural events'
        ]
      },
      {
        cohortId: 'cohort_vn_moba_001',
        cohortName: 'Vietnam MOBA Launch Q2 2024',
        genre: 'MOBA',
        subGenre: 'Mobile MOBA',
        brandCategory: 'AA Studio',
        region: 'VN',
        launchDate: new Date('2024-04-20'),
        metrics: {
          day1Retention: 72,
          day7Retention: 48,
          day30Retention: 22,
          avgSessionLength: 18.3,
          ltv: 12.40,
          cac: 1.85,
          paybackPeriod: 9
        },
        vsIndustry: {
          retentionDelta: 18.7,
          ltvDelta: 15.2,
          cacDelta: -22.1,
          overallScore: 92
        },
        insights: this.accessLevel === 'founder' ? [
          'Vietnam MOBA market shows highest engagement in APAC',
          'Competitive gameplay drives 35% longer sessions',
          'Social features increase retention by 28%',
          'Esports integration boosts LTV by 45%'
        ] : [
          'Vietnam shows strong MOBA engagement',
          'Competitive features drive retention'
        ],
        recommendations: this.accessLevel === 'founder' ? [
          'Prioritize Vietnam for MOBA genre expansion',
          'Implement tournament features for user retention',
          'Partner with local esports organizations',
          'Develop Vietnam-specific competitive seasons'
        ] : [
          'Consider Vietnam expansion',
          'Focus on competitive features'
        ]
      }
    ];

    // Add more cohorts for founder access
    if (this.accessLevel === 'founder') {
      cohorts.push(
        {
          cohortId: 'cohort_id_br_001',
          cohortName: 'Indonesia Battle Royale Q3 2024',
          genre: 'Battle Royale',
          subGenre: 'Mobile BR',
          brandCategory: 'AAA Studio',
          region: 'ID',
          launchDate: new Date('2024-07-10'),
          metrics: {
            day1Retention: 58,
            day7Retention: 32,
            day30Retention: 12,
            avgSessionLength: 22.1,
            ltv: 6.85,
            cac: 1.25,
            paybackPeriod: 18
          },
          vsIndustry: {
            retentionDelta: -8.5, // Below industry average
            ltvDelta: -12.3,
            cacDelta: 8.7, // Higher CAC (worse)
            overallScore: 68
          },
          insights: [
            'Indonesia BR market highly competitive with established players',
            'Lower retention due to market saturation',
            'Price-sensitive market requires different monetization',
            'Local partnerships essential for market penetration'
          ],
          recommendations: [
            'Reduce Indonesia BR investment by 40%',
            'Focus on unique gameplay differentiators',
            'Implement local payment methods',
            'Partner with Indonesian gaming influencers'
          ]
        }
      );
    }

    cohorts.forEach(cohort => {
      this.cohortData.set(cohort.cohortId, cohort);
    });
  } 
 // Get available regions based on access level
  getAvailableRegions(): APACRegion[] {
    return Array.from(this.regions.values())
      .filter(region => region.enabled)
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1, blocked: 0 };
        return priorityOrder[b.launchPriority] - priorityOrder[a.launchPriority];
      });
  }

  // Get default region (Thailand for APAC focus)
  getDefaultRegion(): APACRegion {
    return this.regions.get('TH')!;
  }

  // Get genre benchmarks with access control
  getGenreBenchmarks(genre?: string, brandCategory?: string): GenreBenchmark[] {
    let benchmarks = Array.from(this.genreBenchmarks.values());
    
    if (genre) {
      benchmarks = benchmarks.filter(b => b.genre === genre);
    }
    
    if (brandCategory) {
      benchmarks = benchmarks.filter(b => b.brandCategory === brandCategory);
    }
    
    // Limit data for non-founders
    if (this.accessLevel !== 'founder') {
      benchmarks = benchmarks.map(benchmark => ({
        ...benchmark,
        sampleSize: Math.min(benchmark.sampleSize, 50),
        confidenceLevel: Math.min(benchmark.confidenceLevel, 85)
      }));
    }
    
    return benchmarks;
  }

  // Get cohort analysis with tiered access
  getCohortAnalysis(region?: string, genre?: string): CohortAnalysis[] {
    let cohorts = Array.from(this.cohortData.values());
    
    if (region) {
      cohorts = cohorts.filter(c => c.region === region);
    }
    
    if (genre) {
      cohorts = cohorts.filter(c => c.genre === genre);
    }
    
    // Limit insights for non-founders
    if (this.accessLevel !== 'founder') {
      cohorts = cohorts.map(cohort => ({
        ...cohort,
        insights: cohort.insights.slice(0, 2), // Only first 2 insights
        recommendations: cohort.recommendations.slice(0, 2) // Only first 2 recommendations
      }));
    }
    
    return cohorts.sort((a, b) => b.launchDate.getTime() - a.launchDate.getTime());
  }

  // Compare campaign performance to benchmarks
  compareToBenchmark(
    campaignData: {
      genre: string;
      subGenre: string;
      brandCategory: string;
      roi: number;
      cpi: number;
      engagement: number;
      retention: number;
    }
  ): {
    benchmark: GenreBenchmark | null;
    comparison: {
      roiDelta: number;
      cpiDelta: number;
      engagementDelta: number;
      retentionDelta: number;
      overallScore: number;
    };
    insights: string[];
  } {
    const key = `${campaignData.genre}_${campaignData.subGenre}_${campaignData.brandCategory}`;
    const benchmark = this.genreBenchmarks.get(key);
    
    if (!benchmark) {
      return {
        benchmark: null,
        comparison: {
          roiDelta: 0,
          cpiDelta: 0,
          engagementDelta: 0,
          retentionDelta: 0,
          overallScore: 0
        },
        insights: ['No benchmark data available for this genre/category combination']
      };
    }
    
    const comparison = {
      roiDelta: ((campaignData.roi - benchmark.benchmarks.avgROI) / benchmark.benchmarks.avgROI) * 100,
      cpiDelta: ((campaignData.cpi - benchmark.benchmarks.avgCPI) / benchmark.benchmarks.avgCPI) * 100,
      engagementDelta: ((campaignData.engagement - benchmark.benchmarks.avgEngagement) / benchmark.benchmarks.avgEngagement) * 100,
      retentionDelta: ((campaignData.retention - benchmark.benchmarks.avgRetention) / benchmark.benchmarks.avgRetention) * 100,
      overallScore: 0
    };
    
    // Calculate overall score (weighted average)
    comparison.overallScore = (
      comparison.roiDelta * 0.4 +
      (-comparison.cpiDelta) * 0.3 + // Lower CPI is better
      comparison.engagementDelta * 0.2 +
      comparison.retentionDelta * 0.1
    );
    
    const insights = this.generateBenchmarkInsights(comparison, benchmark, this.accessLevel);
    
    return { benchmark, comparison, insights };
  }

  // Generate insights based on benchmark comparison
  private generateBenchmarkInsights(
    comparison: any,
    benchmark: GenreBenchmark,
    accessLevel: string
  ): string[] {
    const insights = [];
    
    if (comparison.roiDelta > 20) {
      insights.push(`ROI is ${comparison.roiDelta.toFixed(1)}% above ${benchmark.genre} benchmark - excellent performance`);
    } else if (comparison.roiDelta < -20) {
      insights.push(`ROI is ${Math.abs(comparison.roiDelta).toFixed(1)}% below benchmark - needs optimization`);
    }
    
    if (comparison.cpiDelta < -15) {
      insights.push(`CPI is ${Math.abs(comparison.cpiDelta).toFixed(1)}% lower than benchmark - efficient acquisition`);
    } else if (comparison.cpiDelta > 15) {
      insights.push(`CPI is ${comparison.cpiDelta.toFixed(1)}% higher than benchmark - review targeting`);
    }
    
    if (accessLevel === 'founder') {
      // Additional founder-only insights
      if (comparison.engagementDelta > 10) {
        insights.push(`Engagement significantly above benchmark suggests strong product-market fit`);
      }
      
      if (comparison.retentionDelta > 15) {
        insights.push(`High retention indicates potential for premium monetization strategies`);
      }
      
      if (comparison.overallScore > 25) {
        insights.push(`Overall performance suggests scaling opportunity - consider 2x budget allocation`);
      } else if (comparison.overallScore < -25) {
        insights.push(`Performance below expectations - recommend campaign pause and optimization`);
      }
    }
    
    return insights;
  }

  // Get market opportunity analysis
  getMarketOpportunity(genre: string, brandCategory: string): {
    totalMarketSize: number;
    addressableMarket: number;
    competitionLevel: 'low' | 'medium' | 'high';
    recommendedRegions: string[];
    estimatedROI: number;
    confidenceLevel: number;
  } {
    const availableRegions = this.getAvailableRegions();
    const genreBenchmark = this.getGenreBenchmarks(genre, brandCategory)[0];
    
    const totalMarketSize = availableRegions.reduce((sum, region) => sum + region.marketSize, 0);
    const addressableMarket = totalMarketSize * 0.15; // Assume 15% addressable
    
    // Determine competition level based on genre
    const competitionLevels = {
      'Battle Royale': 'high',
      'MOBA': 'high',
      'Mobile RPG': 'medium',
      'Strategy': 'medium',
      'Casual': 'low'
    };
    
    const competitionLevel = competitionLevels[genre as keyof typeof competitionLevels] || 'medium';
    
    // Recommend top regions based on market size and CPI
    const recommendedRegions = availableRegions
      .filter(region => region.launchPriority === 'high')
      .sort((a, b) => (b.marketSize / b.avgCPI) - (a.marketSize / a.avgCPI))
      .slice(0, 3)
      .map(region => region.name);
    
    const estimatedROI = genreBenchmark ? genreBenchmark.benchmarks.avgROI : 200;
    const confidenceLevel = this.accessLevel === 'founder' ? 92 : 75;
    
    return {
      totalMarketSize,
      addressableMarket,
      competitionLevel: competitionLevel as 'low' | 'medium' | 'high',
      recommendedRegions,
      estimatedROI,
      confidenceLevel
    };
  }

  // Get access level information
  getAccessInfo(): {
    level: string;
    availableRegions: number;
    benchmarkAccuracy: string;
    insightDepth: string;
    upgradeMessage?: string;
  } {
    const availableRegions = this.getAvailableRegions().length;
    
    const accessInfo = {
      founder: {
        level: 'Founder',
        availableRegions,
        benchmarkAccuracy: 'Full dataset (95%+ confidence)',
        insightDepth: 'Complete analysis with strategic recommendations'
      },
      admin: {
        level: 'Admin',
        availableRegions: availableRegions - 2,
        benchmarkAccuracy: 'Limited dataset (85% confidence)',
        insightDepth: 'Basic insights with limited recommendations',
        upgradeMessage: 'Upgrade to Founder access for complete market intelligence'
      },
      user: {
        level: 'User',
        availableRegions: availableRegions - 4,
        benchmarkAccuracy: 'Sample dataset (75% confidence)',
        insightDepth: 'Basic performance comparison only',
        upgradeMessage: 'Contact sales for advanced market intelligence features'
      }
    };
    
    return accessInfo[this.accessLevel];
  }
}

// Export with different access levels
export const apacMarketIntelligence = new APACMarketIntelligence('user');
export const apacMarketIntelligenceAdmin = new APACMarketIntelligence('admin');
export const apacMarketIntelligenceFounder = new APACMarketIntelligence('founder');