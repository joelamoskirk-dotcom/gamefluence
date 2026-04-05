// CollabZ Engine - Advanced Creator Collaboration Analytics
// Analyzes cross-creator synergies, audience overlaps, and viral amplification patterns

export interface CreatorProfile {
  id: string;
  name: string;
  platform: string;
  followers: number;
  avgViews: number;
  engagementRate: number;
  audienceDemographics: {
    ageGroups: { [key: string]: number };
    genderSplit: { male: number; female: number };
    locations: { [key: string]: number };
    interests: string[];
  };
  contentStyle: string[];
  postingSchedule: {
    timezone: string;
    peakHours: number[];
    frequency: number;
  };
  collaborationHistory: Array<{
    partnerId: string;
    campaignId: string;
    synergy: number;
    results: {
      reachMultiplier: number;
      engagementBoost: number;
      viralCoefficient: number;
    };
  }>;
}

export interface CollaborationOpportunity {
  id: string;
  type: 'cross_pollination' | 'viral_amplification' | 'audience_expansion' | 'brand_synergy';
  creators: string[];
  synergyScore: number;
  confidence: number;
  projectedImpact: {
    reachIncrease: number;
    engagementBoost: number;
    costEfficiency: number;
    viralPotential: number;
  };
  optimalTiming: {
    startDate: string;
    duration: number;
    contentSequence: Array<{
      creatorId: string;
      contentType: string;
      timing: number; // hours offset
      expectedReach: number;
    }>;
  };
  brandIntegrationOpportunities: Array<{
    brand: string;
    category: string;
    fitScore: number;
    revenueProjection: number;
  }>;
  riskFactors: Array<{
    factor: string;
    probability: number;
    impact: string;
    mitigation: string;
  }>;
}

export class CollabZEngine {
  private creators: CreatorProfile[] = [];
  private campaignHistory: any[] = [];

  constructor(creators: CreatorProfile[], campaignHistory: any[] = []) {
    this.creators = creators;
    this.campaignHistory = campaignHistory;
  }

  // Analyze audience overlap between creators
  analyzeAudienceOverlap(creator1Id: string, creator2Id: string): {
    overlapPercentage: number;
    uniqueReach: number;
    sharedInterests: string[];
    demographicAlignment: number;
  } {
    const creator1 = this.creators.find(c => c.id === creator1Id);
    const creator2 = this.creators.find(c => c.id === creator2Id);

    if (!creator1 || !creator2) {
      throw new Error('Creator not found');
    }

    // Simulate audience overlap analysis
    const platformMultiplier = creator1.platform === creator2.platform ? 0.3 : 0.15;
    const followerRatio = Math.min(creator1.followers, creator2.followers) / Math.max(creator1.followers, creator2.followers);
    
    const overlapPercentage = platformMultiplier * followerRatio * 100;
    const uniqueReach = (creator1.avgViews + creator2.avgViews) * (1 - overlapPercentage / 100);
    
    // Analyze shared interests
    const sharedInterests = creator1.audienceDemographics.interests.filter(
      interest => creator2.audienceDemographics.interests.includes(interest)
    );

    // Calculate demographic alignment
    const ageAlignment = this.calculateDemographicAlignment(
      creator1.audienceDemographics.ageGroups,
      creator2.audienceDemographics.ageGroups
    );
    const locationAlignment = this.calculateDemographicAlignment(
      creator1.audienceDemographics.locations,
      creator2.audienceDemographics.locations
    );
    const demographicAlignment = (ageAlignment + locationAlignment) / 2;

    return {
      overlapPercentage,
      uniqueReach,
      sharedInterests,
      demographicAlignment
    };
  }

  // Identify viral amplification opportunities
  identifyViralOpportunities(campaignData: any): CollaborationOpportunity[] {
    const opportunities: CollaborationOpportunity[] = [];

    // Analyze successful viral patterns from campaign history
    const viralPatterns = this.analyzeViralPatterns();

    // Cross-pollination opportunities
    const crossPollinationOpps = this.findCrossPollinationOpportunities();
    opportunities.push(...crossPollinationOpps);

    // Viral amplification chains
    const viralChainOpps = this.findViralChainOpportunities(viralPatterns);
    opportunities.push(...viralChainOpps);

    // Brand synergy opportunities
    const brandSynergyOpps = this.findBrandSynergyOpportunities();
    opportunities.push(...brandSynergyOpps);

    return opportunities.sort((a, b) => b.synergyScore - a.synergyScore);
  }

  // Predict collaboration performance
  predictCollaborationPerformance(creatorIds: string[], campaignBudget: number): {
    projectedMetrics: {
      reach: { min: number; max: number; predicted: number };
      engagement: { min: number; max: number; predicted: number };
      downloads: { min: number; max: number; predicted: number };
      cpa: { min: number; max: number; predicted: number };
      roas: { min: number; max: number; predicted: number };
    };
    confidence: number;
    keyFactors: Array<{
      factor: string;
      impact: number;
      confidence: number;
    }>;
  } {
    const selectedCreators = this.creators.filter(c => creatorIds.includes(c.id));
    
    // Calculate base metrics
    const totalFollowers = selectedCreators.reduce((sum, c) => sum + c.followers, 0);
    const avgEngagement = selectedCreators.reduce((sum, c) => sum + c.engagementRate, 0) / selectedCreators.length;
    const totalReach = selectedCreators.reduce((sum, c) => sum + c.avgViews, 0);

    // Apply collaboration multipliers
    const collaborationMultiplier = this.calculateCollaborationMultiplier(creatorIds);
    const viralPotential = this.calculateViralPotential(selectedCreators);
    const brandFitScore = this.calculateBrandFitScore(selectedCreators);

    // Predict performance with confidence intervals
    const baseReach = totalReach * collaborationMultiplier.reach;
    const baseEngagement = baseReach * (avgEngagement / 100) * collaborationMultiplier.engagement;
    const baseDownloads = baseEngagement * 0.08 * viralPotential; // 8% conversion rate
    const baseCPA = campaignBudget / baseDownloads;
    const baseROAS = (baseDownloads * 4.99) / campaignBudget; // $4.99 game price

    const confidence = Math.min(0.95, 0.6 + (collaborationMultiplier.confidence * 0.35));

    return {
      projectedMetrics: {
        reach: {
          min: Math.round(baseReach * 0.8),
          max: Math.round(baseReach * 1.3),
          predicted: Math.round(baseReach)
        },
        engagement: {
          min: Math.round(baseEngagement * 0.75),
          max: Math.round(baseEngagement * 1.4),
          predicted: Math.round(baseEngagement)
        },
        downloads: {
          min: Math.round(baseDownloads * 0.7),
          max: Math.round(baseDownloads * 1.5),
          predicted: Math.round(baseDownloads)
        },
        cpa: {
          min: Number((baseCPA * 0.6).toFixed(2)),
          max: Number((baseCPA * 1.2).toFixed(2)),
          predicted: Number(baseCPA.toFixed(2))
        },
        roas: {
          min: Number((baseROAS * 0.8).toFixed(1)),
          max: Number((baseROAS * 1.6).toFixed(1)),
          predicted: Number(baseROAS.toFixed(1))
        }
      },
      confidence,
      keyFactors: [
        { factor: 'Creator Synergy', impact: collaborationMultiplier.synergy, confidence: 0.89 },
        { factor: 'Viral Potential', impact: viralPotential, confidence: 0.82 },
        { factor: 'Brand Alignment', impact: brandFitScore, confidence: 0.91 },
        { factor: 'Audience Quality', impact: avgEngagement / 10, confidence: 0.87 }
      ]
    };
  }

  // Generate optimal content sequence for collaboration
  generateContentSequence(creatorIds: string[], campaignDuration: number): Array<{
    creatorId: string;
    contentType: string;
    timing: number;
    expectedReach: number;
    brandIntegration?: string;
  }> {
    const sequence: Array<{
      creatorId: string;
      contentType: string;
      timing: number;
      expectedReach: number;
      brandIntegration?: string;
    }> = [];
    const creators = this.creators.filter(c => creatorIds.includes(c.id));

    // Sort creators by optimal posting order
    const sortedCreators = creators.sort((a, b) => {
      // Prioritize creators with higher viral potential first
      const aViral = this.calculateCreatorViralPotential(a);
      const bViral = this.calculateCreatorViralPotential(b);
      return bViral - aViral;
    });

    let currentHour = 0;
    const hoursPerDay = 24;
    const contentGap = 8; // 8 hours between major content pieces

    sortedCreators.forEach((creator, index) => {
      // Initial content piece
      sequence.push({
        creatorId: creator.id,
        contentType: index === 0 ? 'launch_announcement' : 'reaction_content',
        timing: currentHour,
        expectedReach: creator.avgViews * (index === 0 ? 1.2 : 0.9),
        brandIntegration: index % 2 === 0 ? 'Honda Racing' : undefined
      });

      currentHour += contentGap;

      // Follow-up content
      if (campaignDuration > 7) {
        sequence.push({
          creatorId: creator.id,
          contentType: 'gameplay_showcase',
          timing: currentHour + (hoursPerDay * 2),
          expectedReach: creator.avgViews * 0.8,
          brandIntegration: 'Red Bull Gaming'
        });
      }

      // Viral challenge content (if applicable)
      if (creator.contentStyle.includes('Challenges') && index < 3) {
        sequence.push({
          creatorId: creator.id,
          contentType: 'viral_challenge',
          timing: currentHour + (hoursPerDay * 4),
          expectedReach: creator.avgViews * 1.5,
          brandIntegration: 'Ozzy Arcade Challenge'
        });
      }
    });

    return sequence.sort((a, b) => a.timing - b.timing);
  }

  // Private helper methods
  private calculateDemographicAlignment(demo1: { [key: string]: number }, demo2: { [key: string]: number }): number {
    const keys = new Set([...Object.keys(demo1), ...Object.keys(demo2)]);
    let totalDifference = 0;
    let count = 0;

    keys.forEach(key => {
      const val1 = demo1[key] || 0;
      const val2 = demo2[key] || 0;
      totalDifference += Math.abs(val1 - val2);
      count++;
    });

    return Math.max(0, 1 - (totalDifference / count / 100));
  }

  private analyzeViralPatterns(): any[] {
    // Analyze historical campaign data for viral patterns
    return [
      {
        pattern: 'racing_challenge',
        viralCoefficient: 3.4,
        optimalTiming: 'weekend_evening',
        keyElements: ['competition', 'user_generated_content', 'hashtag']
      },
      {
        pattern: 'car_culture_crossover',
        viralCoefficient: 2.1,
        optimalTiming: 'weekday_afternoon',
        keyElements: ['automotive_brands', 'lifestyle', 'aspirational']
      }
    ];
  }

  private findCrossPollinationOpportunities(): CollaborationOpportunity[] {
    const opportunities: CollaborationOpportunity[] = [];

    // Find creator pairs with optimal audience overlap
    for (let i = 0; i < this.creators.length; i++) {
      for (let j = i + 1; j < this.creators.length; j++) {
        const creator1 = this.creators[i];
        const creator2 = this.creators[j];
        
        const overlap = this.analyzeAudienceOverlap(creator1.id, creator2.id);
        
        if (overlap.overlapPercentage > 15 && overlap.overlapPercentage < 40) {
          opportunities.push({
            id: `cross_poll_${creator1.id}_${creator2.id}`,
            type: 'cross_pollination',
            creators: [creator1.id, creator2.id],
            synergyScore: 8.5 + (overlap.demographicAlignment * 1.5),
            confidence: 0.87,
            projectedImpact: {
              reachIncrease: overlap.uniqueReach / (creator1.avgViews + creator2.avgViews),
              engagementBoost: 0.23,
              costEfficiency: 0.31,
              viralPotential: 0.67
            },
            optimalTiming: {
              startDate: '2024-03-20',
              duration: 14,
              contentSequence: this.generateContentSequence([creator1.id, creator2.id], 14)
            },
            brandIntegrationOpportunities: [
              { brand: 'Honda Racing', category: 'Automotive', fitScore: 0.89, revenueProjection: 15000 },
              { brand: 'Red Bull Gaming', category: 'Energy/Gaming', fitScore: 0.82, revenueProjection: 12000 }
            ],
            riskFactors: [
              { factor: 'Audience Fatigue', probability: 0.15, impact: 'Medium', mitigation: 'Vary content formats' }
            ]
          });
        }
      }
    }

    return opportunities;
  }

  private findViralChainOpportunities(viralPatterns: any[]): CollaborationOpportunity[] {
    // Identify creators who can create viral chain reactions
    const viralCreators = this.creators.filter(c => 
      c.contentStyle.includes('Viral') || c.contentStyle.includes('Challenges')
    );

    if (viralCreators.length < 3) return [];

    return [{
      id: 'viral_chain_001',
      type: 'viral_amplification',
      creators: viralCreators.slice(0, 4).map(c => c.id),
      synergyScore: 9.2,
      confidence: 0.94,
      projectedImpact: {
        reachIncrease: 2.4,
        engagementBoost: 1.8,
        costEfficiency: 0.75,
        viralPotential: 0.94
      },
      optimalTiming: {
        startDate: '2024-03-22',
        duration: 10,
        contentSequence: this.generateContentSequence(viralCreators.slice(0, 4).map(c => c.id), 10)
      },
      brandIntegrationOpportunities: [
        { brand: 'Red Bull Racing', category: 'Sports/Energy', fitScore: 0.95, revenueProjection: 25000 }
      ],
      riskFactors: [
        { factor: 'Platform Algorithm Changes', probability: 0.20, impact: 'High', mitigation: 'Multi-platform strategy' }
      ]
    }];
  }

  private findBrandSynergyOpportunities(): CollaborationOpportunity[] {
    // Find creators with strong brand alignment
    const brandAlignedCreators = this.creators.filter(c => 
      c.contentStyle.includes('Car Culture') || c.contentStyle.includes('Lifestyle')
    );

    if (brandAlignedCreators.length === 0) return [];

    return [{
      id: 'brand_synergy_001',
      type: 'brand_synergy',
      creators: brandAlignedCreators.slice(0, 2).map(c => c.id),
      synergyScore: 8.9,
      confidence: 0.91,
      projectedImpact: {
        reachIncrease: 1.56,
        engagementBoost: 0.89,
        costEfficiency: 0.67,
        viralPotential: 0.73
      },
      optimalTiming: {
        startDate: '2024-03-25',
        duration: 21,
        contentSequence: this.generateContentSequence(brandAlignedCreators.slice(0, 2).map(c => c.id), 21)
      },
      brandIntegrationOpportunities: [
        { brand: 'BMW Gaming', category: 'Automotive', fitScore: 0.93, revenueProjection: 30000 },
        { brand: 'Mercedes-AMG', category: 'Luxury Automotive', fitScore: 0.88, revenueProjection: 35000 }
      ],
      riskFactors: [
        { factor: 'Brand Safety Concerns', probability: 0.10, impact: 'Medium', mitigation: 'Content pre-approval process' }
      ]
    }];
  }

  private calculateCollaborationMultiplier(creatorIds: string[]): {
    reach: number;
    engagement: number;
    synergy: number;
    confidence: number;
  } {
    const creators = this.creators.filter(c => creatorIds.includes(c.id));
    
    // Base multiplier increases with more creators but with diminishing returns
    const baseMultiplier = 1 + (Math.log(creators.length) * 0.3);
    
    // Platform diversity bonus
    const platforms = new Set(creators.map(c => c.platform));
    const platformBonus = platforms.size > 1 ? 0.2 : 0;
    
    // Engagement alignment bonus
    const avgEngagement = creators.reduce((sum, c) => sum + c.engagementRate, 0) / creators.length;
    const engagementBonus = avgEngagement > 8 ? 0.15 : 0;

    return {
      reach: baseMultiplier + platformBonus,
      engagement: 1 + platformBonus + engagementBonus,
      synergy: baseMultiplier + platformBonus + engagementBonus,
      confidence: Math.min(0.95, 0.7 + (creators.length * 0.05))
    };
  }

  private calculateViralPotential(creators: CreatorProfile[]): number {
    const viralFactors = creators.map(creator => {
      let score = 0;
      
      // Content style factors
      if (creator.contentStyle.includes('Viral')) score += 0.3;
      if (creator.contentStyle.includes('Challenges')) score += 0.25;
      if (creator.contentStyle.includes('Trendy')) score += 0.2;
      
      // Platform factors
      if (creator.platform === 'TikTok') score += 0.25;
      if (creator.platform === 'YouTube') score += 0.15;
      
      // Engagement factor
      score += Math.min(0.3, creator.engagementRate / 100 * 2);
      
      return Math.min(1, score);
    });

    return viralFactors.reduce((sum, score) => sum + score, 0) / viralFactors.length;
  }

  private calculateBrandFitScore(creators: CreatorProfile[]): number {
    // Calculate how well creators align with gaming/automotive brands
    const brandFitScores = creators.map(creator => {
      let score = 0.5; // Base score
      
      if (creator.contentStyle.includes('Car Culture')) score += 0.3;
      if (creator.contentStyle.includes('Gaming')) score += 0.2;
      if (creator.contentStyle.includes('Reviews')) score += 0.15;
      if (creator.contentStyle.includes('Lifestyle')) score += 0.1;
      
      return Math.min(1, score);
    });

    return brandFitScores.reduce((sum, score) => sum + score, 0) / brandFitScores.length;
  }

  private calculateCreatorViralPotential(creator: CreatorProfile): number {
    let score = 0;
    
    if (creator.contentStyle.includes('Viral')) score += 0.4;
    if (creator.contentStyle.includes('Challenges')) score += 0.3;
    if (creator.platform === 'TikTok') score += 0.2;
    score += Math.min(0.3, creator.engagementRate / 100 * 2);
    
    return score;
  }
}

// Export enhanced Vietnam creators with collaboration data
export const enhancedVietnamCreators: CreatorProfile[] = [
  {
    id: 'vn-001',
    name: 'Minh Gaming Pro',
    platform: 'YouTube',
    followers: 890000,
    avgViews: 245000,
    engagementRate: 8.7,
    audienceDemographics: {
      ageGroups: { '18-24': 35, '25-34': 45, '35-44': 20 },
      genderSplit: { male: 78, female: 22 },
      locations: { 'Ho Chi Minh City': 40, 'Hanoi': 30, 'Da Nang': 15, 'Other': 15 },
      interests: ['Racing Games', 'Car Culture', 'Gaming Reviews', 'Technology']
    },
    contentStyle: ['Gameplay', 'Reviews', 'Tutorials', 'Car Culture'],
    postingSchedule: {
      timezone: 'Asia/Ho_Chi_Minh',
      peakHours: [19, 20, 21],
      frequency: 4 // posts per week
    },
    collaborationHistory: []
  },
  {
    id: 'vn-002',
    name: 'Linh Speed Queen',
    platform: 'TikTok',
    followers: 1200000,
    avgViews: 380000,
    engagementRate: 12.4,
    audienceDemographics: {
      ageGroups: { '16-24': 55, '25-34': 35, '35-44': 10 },
      genderSplit: { male: 45, female: 55 },
      locations: { 'Ho Chi Minh City': 35, 'Hanoi': 25, 'Can Tho': 20, 'Other': 20 },
      interests: ['Racing Games', 'Lifestyle', 'Fashion', 'Viral Trends']
    },
    contentStyle: ['Short-form', 'Viral', 'Challenges', 'Trendy'],
    postingSchedule: {
      timezone: 'Asia/Ho_Chi_Minh',
      peakHours: [18, 19, 20, 21],
      frequency: 7 // posts per week
    },
    collaborationHistory: []
  }
  // Additional creators would be added here...
];