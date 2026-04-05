// Campaign 2: Ozzy Arcade APAC Racing Championship
// Vietnamese Racing Star Collaboration across Indonesia, Philippines, Thailand

import { APACCreatorsDatabase } from './apac-creators-database';
import { APACMarketIntelligence } from './apac-market-intelligence';

export interface Campaign2Data {
  campaignInfo: {
    id: string;
    title: string;
    subtitle: string;
    gameTitle: string;
    studio: string;
    status: 'planning' | 'active' | 'completed';
    phase: string;
    startDate: Date;
    endDate: Date;
    totalBudget: number;
    allocatedBudget: number;
    remainingBudget: number;
  };
  collaboration: {
    primaryAmbassador: {
      name: string;
      role: string;
      contractValue: number;
      exclusivityPeriod: string;
      deliverables: string[];
    };
    crossMarketStrategy: {
      type: string;
      duration: string;
      markets: string[];
      expectedReach: number;
      projectedConversions: number;
    };
  };
  marketTargeting: {
    primaryMarkets: Array<{
      country: string;
      budgetAllocation: number;
      targetDownloads: number;
      expectedRevenue: number;
      keyMetrics: {
        reach: number;
        engagement: number;
        conversions: number;
        ctr: number;
        cpm: number;
      };
    }>;
  };
  creatorStrategy: {
    totalCreators: number;
    tierDistribution: {
      platinum: number;
      gold: number;
      silver: number;
      bronze: number;
    };
    selectedCreators: any[];
    collaborationTypes: string[];
    contentFormats: string[];
  };
  contentPlan: {
    phases: Array<{
      phase: string;
      duration: string;
      objectives: string[];
      contentTypes: string[];
      keyActivities: string[];
    }>;
    crossCulturalElements: string[];
    localizationStrategy: any;
  };
  expectedOutcomes: {
    downloads: {
      total: number;
      byMarket: Record<string, number>;
    };
    revenue: {
      total: number;
      byMarket: Record<string, number>;
    };
    engagement: {
      totalReach: number;
      totalEngagement: number;
      avgEngagementRate: number;
    };
    brandMetrics: {
      brandAwareness: number;
      brandConsideration: number;
      purchaseIntent: number;
    };
  };
}

export class Campaign2OzzyArcadeAPAC {
  static generateCampaign2Data(): Campaign2Data {
    const topCreators = APACCreatorsDatabase.getTopRecommendations(100);
    const marketData = new APACMarketIntelligence().getAvailableRegions();
    const collaboration = { type: 'Vietnam Racing Star Collaboration', status: 'active' };
    const expansion = { strategy: 'APAC Expansion', markets: ['vietnam', 'thailand', 'indonesia'], localizationStrategy: 'Local language content with cultural gaming references' };

    return {
      campaignInfo: {
        id: 'camp_002_apac',
        title: 'Ozzy Arcade: APAC Racing Championship',
        subtitle: 'Vietnamese Racing Star x APAC Gaming Collaboration',
        gameTitle: 'Ozzy Arcade: APAC Racing Championship',
        studio: 'Ozzy Arcade Studios',
        status: 'planning',
        phase: 'Pre-Launch Strategy',
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-07-31'),
        totalBudget: 2500000, // $2.5M USD
        allocatedBudget: 1200000, // $1.2M allocated so far
        remainingBudget: 1300000
      },

      collaboration: {
        primaryAmbassador: {
          name: 'Duc "Lightning" Nguyen',
          role: 'Primary Racing Ambassador & Cross-Market Influencer',
          contractValue: 450000, // $450K for 4-month exclusive
          exclusivityPeriod: '4 months exclusive, 8 months non-compete',
          deliverables: [
            '24 YouTube racing tutorials and gameplay videos',
            '48 TikTok racing challenges and behind-the-scenes content',
            '12 live streaming events across all markets',
            '4 cross-country virtual racing tournaments',
            'Exclusive racing track design collaboration',
            'Cultural exchange gaming sessions with local creators',
            'Professional racing insights and game feedback'
          ]
        },
        crossMarketStrategy: {
          type: 'Multi-Market Racing Championship Series',
          duration: '4 months with 3 major tournament phases',
          markets: ['Vietnam', 'Indonesia', 'Philippines', 'Thailand'],
          expectedReach: 18500000, // 18.5M total reach
          projectedConversions: 125000 // 125K downloads from collaboration alone
        }
      },

      marketTargeting: {
        primaryMarkets: [
          {
            country: 'Indonesia',
            budgetAllocation: 750000, // 30% of budget - largest market
            targetDownloads: 850000,
            expectedRevenue: 2800000,
            keyMetrics: {
              reach: 6200000,
              engagement: 480000,
              conversions: 38000,
              ctr: 4.2,
              cpm: 9.8
            }
          },
          {
            country: 'Philippines',
            budgetAllocation: 600000, // 24% of budget
            targetDownloads: 650000,
            expectedRevenue: 1950000,
            keyMetrics: {
              reach: 4800000,
              engagement: 420000,
              conversions: 32000,
              ctr: 4.6,
              cpm: 8.4
            }
          },
          {
            country: 'Thailand',
            budgetAllocation: 650000, // 26% of budget - high spending power
            targetDownloads: 580000,
            expectedRevenue: 2400000,
            keyMetrics: {
              reach: 3900000,
              engagement: 380000,
              conversions: 35000,
              ctr: 5.1,
              cpm: 11.2
            }
          },
          {
            country: 'Vietnam',
            budgetAllocation: 500000, // 20% of budget - existing strong presence
            targetDownloads: 420000,
            expectedRevenue: 1850000,
            keyMetrics: {
              reach: 3600000,
              engagement: 340000,
              conversions: 28000,
              ctr: 4.8,
              cpm: 7.9
            }
          }
        ]
      },

      creatorStrategy: {
        totalCreators: 100,
        tierDistribution: {
          platinum: 8, // Top performers including Vietnamese stars
          gold: 22, // Strong regional influencers
          silver: 35, // Mid-tier creators with good engagement
          bronze: 35 // Emerging creators and micro-influencers
        },
        selectedCreators: topCreators.slice(0, 100),
        collaborationTypes: [
          'Exclusive Racing Ambassador Program',
          'Cross-Market Tournament Participation',
          'Cultural Exchange Gaming Sessions',
          'Local Market Racing Challenges',
          'Behind-the-Scenes Content Creation',
          'Community Building Activities',
          'Educational Racing Content',
          'Live Streaming Events'
        ],
        contentFormats: [
          'Long-form YouTube racing tutorials (10-20 min)',
          'Short-form TikTok racing challenges (30-60 sec)',
          'Live streaming racing tournaments (2-4 hours)',
          'Instagram Stories racing tips and tricks',
          'Facebook Gaming community events',
          'Cross-platform racing competitions',
          'Cultural exchange content',
          'Professional racing insights'
        ]
      },

      contentPlan: {
        phases: [
          {
            phase: 'Phase 1: Market Entry & Awareness (Month 1)',
            duration: '4 weeks',
            objectives: [
              'Introduce Ozzy Arcade to APAC markets',
              'Establish Vietnamese racing star as primary ambassador',
              'Build initial creator network and community',
              'Generate buzz and anticipation'
            ],
            contentTypes: [
              'Teaser trailers with racing star',
              'Creator recruitment and onboarding content',
              'Market-specific localization announcements',
              'Behind-the-scenes development content'
            ],
            keyActivities: [
              'Vietnamese racing star announcement campaign',
              'Top-tier creator partnership reveals',
              'Market-specific social media campaigns',
              'Gaming press and media outreach'
            ]
          },
          {
            phase: 'Phase 2: Engagement & Competition (Months 2-3)',
            duration: '8 weeks',
            objectives: [
              'Drive active gameplay and downloads',
              'Execute cross-market racing tournaments',
              'Build competitive gaming communities',
              'Maximize engagement and viral content'
            ],
            contentTypes: [
              'Weekly racing tournaments and challenges',
              'Cross-cultural gaming collaborations',
              'Educational racing tutorials and guides',
              'Community-generated content campaigns'
            ],
            keyActivities: [
              'APAC Racing Championship Series launch',
              'Cross-market creator collaboration events',
              'Community challenges and competitions',
              'User-generated content campaigns'
            ]
          },
          {
            phase: 'Phase 3: Optimization & Expansion (Month 4)',
            duration: '4 weeks',
            objectives: [
              'Optimize performance based on data insights',
              'Expand successful content formats',
              'Prepare for long-term market presence',
              'Measure and report campaign success'
            ],
            contentTypes: [
              'Performance optimization content',
              'Success story showcases',
              'Community celebration events',
              'Future roadmap announcements'
            ],
            keyActivities: [
              'Campaign performance analysis and optimization',
              'Community celebration and awards',
              'Long-term partnership establishment',
              'Next phase planning and announcement'
            ]
          }
        ],
        crossCulturalElements: [
          'Vietnamese racing expertise shared across markets',
          'Local racing tracks and cultural elements in each market',
          'Cross-market creator collaboration sessions',
          'Cultural exchange through gaming content',
          'Local language content with subtitles',
          'Regional racing traditions and customs integration'
        ],
        localizationStrategy: expansion.localizationStrategy
      },

      expectedOutcomes: {
        downloads: {
          total: 2500000, // 2.5M total downloads
          byMarket: {
            'Indonesia': 850000,
            'Philippines': 650000,
            'Thailand': 580000,
            'Vietnam': 420000
          }
        },
        revenue: {
          total: 9000000, // $9M total revenue
          byMarket: {
            'Indonesia': 2800000,
            'Philippines': 1950000,
            'Thailand': 2400000,
            'Vietnam': 1850000
          }
        },
        engagement: {
          totalReach: 18500000, // 18.5M total reach
          totalEngagement: 1620000, // 1.62M total engagement
          avgEngagementRate: 8.8 // 8.8% average engagement rate
        },
        brandMetrics: {
          brandAwareness: 67, // 67% brand awareness in target markets
          brandConsideration: 34, // 34% brand consideration
          purchaseIntent: 28 // 28% purchase intent
        }
      }
    };
  }

  static getCampaign1Learnings() {
    return {
      topPerformers: [
        {
          name: 'Mai Game Girl',
          performance: 'Exceptional - 94.2% campaign success rate',
          keyStrengths: ['Cross-market appeal', 'High female engagement', 'Educational content'],
          recommendation: 'Promote to Platinum tier, increase budget allocation by 40%'
        },
        {
          name: 'Thao Racing Rookie',
          performance: 'Strong - 91.7% campaign success rate',
          keyStrengths: ['Beginner-friendly content', 'High conversion rates', 'Authentic personality'],
          recommendation: 'Maintain Gold tier, focus on tutorial content expansion'
        },
        {
          name: 'Duc Speed Demon',
          performance: 'Excellent - 89.4% campaign success rate',
          keyStrengths: ['Technical expertise', 'Professional commentary', 'Tournament hosting'],
          recommendation: 'Partner for advanced racing content and tournaments'
        },
        {
          name: 'Linh Drift Queen',
          performance: 'Very Good - 87.8% campaign success rate',
          keyStrengths: ['Female racing representation', 'Community building', 'Live streaming'],
          recommendation: 'Expand live streaming content, focus on community events'
        }
      ],
      keyInsights: [
        'Female gaming creators showed 23% higher engagement rates',
        'Tutorial and educational content had 34% better conversion rates',
        'Cross-platform campaigns performed 45% better than single-platform',
        'Live streaming events generated 67% more community engagement',
        'Racing-specific content outperformed general gaming by 89%'
      ],
      optimizationRecommendations: [
        'Increase female creator representation to 40% of total creators',
        'Prioritize educational and tutorial content formats',
        'Implement cross-platform content strategies for all creators',
        'Schedule regular live streaming events and tournaments',
        'Focus exclusively on racing-game specialized creators'
      ],
      budgetOptimization: {
        bestPerformingPlatforms: [
          { platform: 'TikTok', roi: 4.7, recommendation: 'Increase budget by 35%' },
          { platform: 'YouTube', roi: 3.9, recommendation: 'Maintain current allocation' },
          { platform: 'Twitch', roi: 3.2, recommendation: 'Focus on live events' }
        ],
        contentTypeROI: [
          { type: 'Racing Tutorials', roi: 5.2, recommendation: 'Double content production' },
          { type: 'Live Tournaments', roi: 4.8, recommendation: 'Weekly tournament series' },
          { type: 'Behind-the-Scenes', roi: 3.6, recommendation: 'Monthly special content' }
        ]
      }
    };
  }

  static getCreatorRecommendations() {
    const allCreators = APACCreatorsDatabase.generateFullCreatorDatabase();
    
    return {
      topRecommendations: allCreators
        .filter(creator => creator.recommendationScore > 85)
        .sort((a, b) => b.recommendationScore - a.recommendationScore)
        .slice(0, 20),
      
      byMarket: {
        indonesia: allCreators
          .filter(creator => creator.country === 'Indonesia' && creator.availability === 'available')
          .sort((a, b) => b.recommendationScore - a.recommendationScore)
          .slice(0, 10),
        
        philippines: allCreators
          .filter(creator => creator.country === 'Philippines' && creator.availability === 'available')
          .sort((a, b) => b.recommendationScore - a.recommendationScore)
          .slice(0, 10),
        
        thailand: allCreators
          .filter(creator => creator.country === 'Thailand' && creator.availability === 'available')
          .sort((a, b) => b.recommendationScore - a.recommendationScore)
          .slice(0, 10),
        
        vietnam: allCreators
          .filter(creator => creator.country === 'Vietnam' && creator.availability === 'available')
          .sort((a, b) => b.recommendationScore - a.recommendationScore)
          .slice(0, 10)
      },
      
      specializedRecommendations: {
        femaleCreators: allCreators
          .filter(creator => creator.audienceDemographics.genderSplit.female > 50)
          .sort((a, b) => b.recommendationScore - a.recommendationScore)
          .slice(0, 15),
        
        racingSpecialists: allCreators
          .filter(creator => creator.racingGameExperience >= 8)
          .sort((a, b) => b.recommendationScore - a.recommendationScore)
          .slice(0, 25),
        
        liveStreamers: allCreators
          .filter(creator => creator.specialties.includes('Live Streaming'))
          .sort((a, b) => b.recommendationScore - a.recommendationScore)
          .slice(0, 20),
        
        educationalCreators: allCreators
          .filter(creator => creator.specialties.includes('Tutorials') || creator.specialties.includes('Educational Content'))
          .sort((a, b) => b.recommendationScore - a.recommendationScore)
          .slice(0, 20)
      }
    };
  }
}