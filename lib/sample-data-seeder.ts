// Sample Data Seeder - Populates all dashboards with realistic data
// Ensures every component has rich, interactive data even on first load

export interface SampleDataSet {
  campaigns: any[];
  creators: any[];
  analytics: any;
  payments: any[];
  tickets: any[];
  workflows: any[];
  marketInsights: any[];
  systemMetrics: any;
}

export class SampleDataSeeder {
  static generateComprehensiveDataSet(): SampleDataSet {
    return {
      campaigns: this.generateCampaigns(),
      creators: this.generateCreators(),
      analytics: this.generateAnalytics(),
      payments: this.generatePayments(),
      tickets: this.generateTickets(),
      workflows: this.generateWorkflows(),
      marketInsights: this.generateMarketInsights(),
      systemMetrics: this.generateSystemMetrics()
    };
  }

  private static generateCampaigns() {
    return [
      // Campaign 1: Original Ozzy Arcade Campaign
      {
        id: 'camp_001',
        title: 'Ozzy Arcade: Global Launch Campaign',
        gameTitle: 'Ozzy Arcade',
        studio: 'Amanotes',
        status: 'completed',
        budget: 250000,
        spent: 247500,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-02-15'),
        creatorCount: 35,
        platforms: ['youtube', 'twitch', 'tiktok', 'instagram'],
        metrics: {
          reach: 4200000,
          engagement: 285000,
          conversions: 18500,
          ctr: 4.2,
          cpm: 6.80,
          installs: 125000,
          revenue: 285000, // Fixed: Revenue > Budget for positive ROI
          roi: 14 // Fixed: (285000 - 250000) / 250000 * 100 = 14% ROI
        },
        objectives: ['Global Launch', 'User Acquisition', 'Brand Awareness'],
        targetAudience: '16-35 Casual Mobile Gamers',
        regions: ['Global', 'US', 'UK', 'CA', 'AU', 'DE', 'FR'],
        fraudPrevented: 2850,
        fraudSavings: 12400,
        // Enterprise Attribution Metrics (AppsFlyer-style)
        attribution: {
          organicInstalls: 45000,
          nonOrganicInstalls: 80000,
          organicRate: 36.0,
          retentionDay1: 68.5,
          retentionDay7: 24.2,
          retentionDay30: 8.7,
          ltv: {
            day1: 0.85,
            day7: 2.40,
            day30: 8.95,
            day90: 18.50
          },
          cohortAnalysis: {
            week1: { users: 125000, revenue: 12500, arpu: 0.10 },
            week2: { users: 98000, revenue: 18200, arpu: 0.19 },
            week3: { users: 76000, revenue: 22800, arpu: 0.30 },
            week4: { users: 58000, revenue: 25600, arpu: 0.44 }
          },
          conversionFunnel: {
            impressions: 8500000,
            clicks: 357000,
            installs: 125000,
            registrations: 89000,
            purchases: 18500,
            ctr: 4.2,
            cvr: 35.0,
            purchaseRate: 20.8
          }
        }
      },

      // Campaign 2: APAC Expansion
      {
        id: 'camp_002',
        title: 'Ozzy Arcade: APAC Market Expansion',
        gameTitle: 'Ozzy Arcade',
        studio: 'Amanotes',
        status: 'active',
        budget: 180000,
        spent: 156800,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-15'),
        creatorCount: 28,
        platforms: ['youtube', 'twitch', 'tiktok'],
        metrics: {
          reach: 3800000,
          engagement: 245000,
          conversions: 15200,
          ctr: 3.8,
          cpm: 7.20,
          installs: 98500,
          revenue: 198000, // Fixed: Revenue > Budget for positive ROI
          roi: 10 // Fixed: (198000 - 180000) / 180000 * 100 = 10% ROI
        },
        objectives: ['APAC Market Penetration', 'Localized Content', 'Regional Partnerships'],
        targetAudience: '18-32 Mobile Gamers APAC',
        regions: ['TH', 'VN', 'ID', 'MY', 'SG', 'PH', 'KR', 'JP'],
        fraudPrevented: 1950,
        fraudSavings: 8900,
        // Enhanced APAC Attribution Metrics
        attribution: {
          organicInstalls: 38500,
          nonOrganicInstalls: 60000,
          organicRate: 39.1,
          retentionDay1: 71.2,
          retentionDay7: 27.8,
          retentionDay30: 11.5,
          ltv: {
            day1: 0.92,
            day7: 2.65,
            day30: 10.20,
            day90: 21.50
          },
          cohortAnalysis: {
            week1: { users: 98500, revenue: 9850, arpu: 0.10 },
            week2: { users: 78200, revenue: 15640, arpu: 0.20 },
            week3: { users: 62500, revenue: 20000, arpu: 0.32 },
            week4: { users: 48500, revenue: 22275, arpu: 0.46 }
          },
          conversionFunnel: {
            impressions: 7200000,
            clicks: 273600,
            installs: 98500,
            registrations: 68950,
            purchases: 15200,
            ctr: 3.8,
            cvr: 36.0,
            purchaseRate: 22.0
          },
          networkBreakdown: {
            gamefluence: { spend: 52000, installs: 32500, revenue: 65000, roas: 1.25 },
            facebook: { spend: 52000, installs: 28200, revenue: 56800, roas: 1.09 },
            google: { spend: 52800, installs: 37800, revenue: 76200, roas: 1.44 }
          }
        }
      },

      // Campaign 3: Massive APAC Expansion
      {
        id: 'camp_003',
        title: 'Massive APAC Gaming Expansion',
        gameTitle: 'Multiple Amanotes Titles',
        studio: 'Amanotes',
        status: 'active',
        budget: 500000,
        spent: 287500,
        startDate: new Date('2024-02-15'),
        endDate: new Date('2024-04-30'),
        creatorCount: 85,
        platforms: ['youtube', 'twitch', 'tiktok', 'instagram', 'facebook'],
        metrics: {
          reach: 8500000,
          engagement: 520000,
          conversions: 32500,
          ctr: 4.5,
          cpm: 5.90,
          installs: 245000,
          revenue: 575000, // Fixed: Revenue > Budget for positive ROI
          roi: 15 // Fixed: (575000 - 500000) / 500000 * 100 = 15% ROI
        },
        objectives: ['Market Domination', 'Multi-Game Portfolio', 'Creator Network Expansion'],
        targetAudience: '16-40 Mobile Gaming Enthusiasts',
        regions: ['TH', 'VN', 'ID', 'MY', 'SG', 'PH', 'KR', 'JP', 'TW', 'HK', 'IN'],
        fraudPrevented: 4200,
        fraudSavings: 18750
      },

      // Additional campaigns for variety
      {
        id: 'camp_004',
        title: 'Indie Game Spotlight Series',
        gameTitle: 'Various Indie Titles',
        studio: 'Indie Collective',
        status: 'draft',
        budget: 45000,
        spent: 0,
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-03-31'),
        creatorCount: 12,
        platforms: ['youtube', 'tiktok', 'instagram'],
        metrics: {
          reach: 0,
          engagement: 0,
          conversions: 0,
          ctr: 0,
          cpm: 0,
          installs: 0,
          revenue: 0,
          roi: 0
        },
        objectives: ['Discovery', 'Community Support', 'Niche Audience'],
        targetAudience: '20-35 Indie Game Enthusiasts',
        regions: ['Global'],
        fraudPrevented: 0,
        fraudSavings: 0
      }
    ];
  }

  private static generateCreators() {
    return [
      // Global Campaign Creators
      {
        id: 'creator_001',
        name: 'GameMaster Pro',
        email: 'gamemaster@example.com',
        avatar: '/api/placeholder/64/64',
        tier: 'gold',
        platforms: {
          youtube: { followers: 125000, engagement: 7.2 },
          twitch: { followers: 89000, engagement: 8.1 },
          tiktok: { followers: 45000, engagement: 12.3 }
        },
        totalFollowers: 259000,
        avgEngagement: 8.2,
        niche: ['Casual Games', 'Mobile Gaming', 'Reviews'],
        location: 'United States',
        languages: ['English'],
        rating: 4.8,
        completedCampaigns: 3,
        totalEarnings: 28500,
        monthlyEarnings: 9500,
        joinDate: new Date('2024-01-10'),
        lastActive: new Date(),
        status: 'active',
        specialties: ['Mobile Game Reviews', 'Casual Gaming', 'Live Streaming'],
        equipment: ['4K Camera', 'Professional Microphone', 'Gaming Setup'],
        availability: 'Full-time',
        campaignHistory: [
          { campaignId: 'camp_001', performance: 'excellent', earnings: 12500, installs: 8500 },
          { campaignId: 'camp_002', performance: 'good', earnings: 8500, installs: 5200 },
          { campaignId: 'camp_003', performance: 'excellent', earnings: 7500, installs: 4800 }
        ]
      },

      {
        id: 'creator_002',
        name: 'StreamQueen',
        email: 'streamqueen@example.com',
        avatar: '/api/placeholder/64/64',
        tier: 'platinum',
        platforms: {
          twitch: { followers: 203000, engagement: 9.1 },
          youtube: { followers: 156000, engagement: 6.8 },
          instagram: { followers: 78000, engagement: 11.2 }
        },
        totalFollowers: 437000,
        avgEngagement: 8.7,
        niche: ['Action', 'Multiplayer', 'Live Streaming'],
        location: 'United Kingdom',
        languages: ['English'],
        rating: 4.9,
        completedCampaigns: 2,
        totalEarnings: 22500,
        monthlyEarnings: 11250,
        joinDate: new Date('2024-01-12'),
        lastActive: new Date(),
        status: 'active',
        specialties: ['Live Commentary', 'Community Engagement', 'Reaction Content'],
        equipment: ['Streaming Setup', 'Green Screen', 'Multiple Cameras'],
        availability: 'Full-time',
        campaignHistory: [
          { campaignId: 'camp_001', performance: 'excellent', earnings: 15000, installs: 12500 },
          { campaignId: 'camp_003', performance: 'good', earnings: 7500, installs: 6200 }
        ]
      },

      // APAC Campaign Creators - Authentic APAC Profiles
      {
        id: 'creator_003',
        name: 'Siriporn "Siri" Thanakit', // Authentic Thai name
        email: 'siri.thanakit@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face', // Real photo
        tier: 'gold',
        platforms: {
          youtube: { followers: 285000, engagement: 12.5 },
          tiktok: { followers: 195000, engagement: 18.2 },
          facebook: { followers: 167000, engagement: 8.8 }
        },
        totalFollowers: 647000,
        avgEngagement: 13.2,
        niche: ['Mobile Gaming', 'Thai Content', 'Music Games', 'APAC Gaming'],
        location: 'Bangkok, Thailand',
        languages: ['Thai', 'English'],
        rating: 4.9,
        completedCampaigns: 8,
        totalEarnings: 45500,
        monthlyEarnings: 18250,
        joinDate: new Date('2023-08-15'),
        lastActive: new Date(),
        status: 'active',
        specialties: ['Thai Market Expert', 'Music Game Specialist', 'Live Streaming', 'Community Building'],
        equipment: ['Professional Mobile Setup', 'Ring Light Pro', 'Wireless Lavalier Mic', '4K Webcam'],
        availability: 'Full-time',
        apacMetrics: {
          apacReach: 580000,
          localEngagement: 15.8,
          culturalRelevance: 9.2,
          languageLocalization: 'Native Thai + English'
        },
        campaignHistory: [
          { campaignId: 'camp_002', performance: 'excellent', earnings: 18000, installs: 15500, apacInstalls: 14200 },
          { campaignId: 'camp_003', performance: 'excellent', earnings: 27500, installs: 22800, apacInstalls: 21500 }
        ]
      },

      {
        id: 'creator_004',
        name: 'Nguyễn Minh Đức', // Authentic Vietnamese name
        email: 'duc.nguyen.gaming@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face', // Real photo
        tier: 'platinum',
        platforms: {
          youtube: { followers: 198000, engagement: 11.8 },
          tiktok: { followers: 356000, engagement: 16.5 },
          instagram: { followers: 145000, engagement: 13.2 }
        },
        totalFollowers: 699000,
        avgEngagement: 13.8,
        niche: ['Mobile Gaming', 'Vietnamese Content', 'MOBA Games', 'Casual Games'],
        location: 'Ho Chi Minh City, Vietnam',
        languages: ['Vietnamese', 'English'],
        rating: 4.8,
        completedCampaigns: 12,
        totalEarnings: 52500,
        monthlyEarnings: 21750,
        joinDate: new Date('2023-06-20'),
        lastActive: new Date(),
        status: 'active',
        specialties: ['Vietnamese Localization', 'Short-form Content', 'Mobile Gaming', 'MOBA Expert'],
        equipment: ['Mobile Studio Setup', 'Professional Lighting', 'Wireless Mic System', 'Green Screen'],
        availability: 'Full-time',
        apacMetrics: {
          apacReach: 620000,
          localEngagement: 17.2,
          culturalRelevance: 9.5,
          languageLocalization: 'Native Vietnamese + English'
        },
        campaignHistory: [
          { campaignId: 'camp_002', performance: 'excellent', earnings: 22500, installs: 18200, apacInstalls: 17800 },
          { campaignId: 'camp_003', performance: 'excellent', earnings: 30000, installs: 25600, apacInstalls: 24200 }
        ]
      },

      {
        id: 'creator_005',
        name: 'Andi Pratama Wijaya', // Authentic Indonesian name
        email: 'andi.pratama.gaming@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face', // Real photo
        tier: 'gold',
        platforms: {
          youtube: { followers: 245000, engagement: 10.9 },
          instagram: { followers: 189000, engagement: 14.5 },
          tiktok: { followers: 278000, engagement: 19.2 }
        },
        totalFollowers: 712000,
        avgEngagement: 14.9,
        niche: ['Mobile Gaming', 'Indonesian Content', 'Music Games', 'Battle Royale'],
        location: 'Jakarta, Indonesia',
        languages: ['Indonesian', 'English'],
        rating: 4.7,
        completedCampaigns: 10,
        totalEarnings: 48200,
        monthlyEarnings: 19600,
        joinDate: new Date('2023-07-10'),
        lastActive: new Date(),
        status: 'active',
        specialties: ['Indonesian Market', 'Music Game Content', 'Community Engagement', 'Live Streaming'],
        equipment: ['Professional Setup', 'Audio Interface', 'Multiple Cameras', 'Stream Deck'],
        availability: 'Full-time',
        apacMetrics: {
          apacReach: 650000,
          localEngagement: 16.8,
          culturalRelevance: 9.1,
          languageLocalization: 'Native Indonesian + English'
        },
        campaignHistory: [
          { campaignId: 'camp_002', performance: 'excellent', earnings: 19500, installs: 16800, apacInstalls: 16200 },
          { campaignId: 'camp_003', performance: 'good', earnings: 28700, installs: 23100, apacInstalls: 22500 }
        ]
      },

      // Massive APAC Expansion Creators
      {
        id: 'creator_006',
        name: 'KoreanGamePro',
        email: 'koreangamer@example.com',
        avatar: '/api/placeholder/64/64',
        tier: 'platinum',
        platforms: {
          youtube: { followers: 289000, engagement: 9.2 },
          twitch: { followers: 156000, engagement: 8.8 },
          instagram: { followers: 95000, engagement: 12.1 }
        },
        totalFollowers: 540000,
        avgEngagement: 10.0,
        niche: ['Mobile Gaming', 'Korean Content', 'Competitive Gaming'],
        location: 'South Korea',
        languages: ['Korean', 'English'],
        rating: 4.9,
        completedCampaigns: 1,
        totalEarnings: 15500,
        monthlyEarnings: 15500,
        joinDate: new Date('2024-02-18'),
        lastActive: new Date(),
        status: 'active',
        specialties: ['Korean Market Expert', 'Competitive Gaming', 'High Production Value'],
        equipment: ['Professional Studio', 'Multiple Cameras', 'Advanced Audio'],
        availability: 'Full-time',
        campaignHistory: [
          { campaignId: 'camp_003', performance: 'excellent', earnings: 15500, installs: 12800 }
        ]
      },

      {
        id: 'creator_007',
        name: 'JapanMobileGaming',
        email: 'japangaming@example.com',
        avatar: '/api/placeholder/64/64',
        tier: 'gold',
        platforms: {
          youtube: { followers: 198000, engagement: 7.5 },
          tiktok: { followers: 125000, engagement: 11.8 },
          instagram: { followers: 67000, engagement: 9.5 }
        },
        totalFollowers: 390000,
        avgEngagement: 9.6,
        niche: ['Mobile Gaming', 'Japanese Content', 'Music Games'],
        location: 'Japan',
        languages: ['Japanese', 'English'],
        rating: 4.7,
        completedCampaigns: 1,
        totalEarnings: 13200,
        monthlyEarnings: 13200,
        joinDate: new Date('2024-02-20'),
        lastActive: new Date(),
        status: 'active',
        specialties: ['Japanese Market', 'Music Game Expert', 'Cultural Localization'],
        equipment: ['Mobile Studio', 'Professional Lighting', 'Audio Equipment'],
        availability: 'Full-time',
        campaignHistory: [
          { campaignId: 'camp_003', performance: 'good', earnings: 13200, installs: 9500 }
        ]
      },

      {
        id: 'creator_008',
        name: 'SingaporeGamer',
        email: 'singaporegamer@example.com',
        avatar: '/api/placeholder/64/64',
        tier: 'silver',
        platforms: {
          youtube: { followers: 89000, engagement: 8.2 },
          instagram: { followers: 78000, engagement: 10.8 },
          tiktok: { followers: 56000, engagement: 13.5 }
        },
        totalFollowers: 223000,
        avgEngagement: 10.8,
        niche: ['Mobile Gaming', 'English Content', 'Casual Games'],
        location: 'Singapore',
        languages: ['English', 'Mandarin'],
        rating: 4.5,
        completedCampaigns: 1,
        totalEarnings: 8500,
        monthlyEarnings: 8500,
        joinDate: new Date('2024-02-22'),
        lastActive: new Date(),
        status: 'active',
        specialties: ['English Content APAC', 'Casual Gaming', 'Cross-cultural Appeal'],
        equipment: ['Compact Setup', 'Good Audio', 'Mobile Optimized'],
        availability: 'Part-time',
        campaignHistory: [
          { campaignId: 'camp_003', performance: 'good', earnings: 8500, installs: 6200 }
        ]
      },

      {
        id: 'creator_009',
        name: 'PhilippinesGamers',
        email: 'philippinesgamers@example.com',
        avatar: '/api/placeholder/64/64',
        tier: 'gold',
        platforms: {
          youtube: { followers: 156000, engagement: 8.8 },
          facebook: { followers: 98000, engagement: 7.2 },
          tiktok: { followers: 67000, engagement: 14.1 }
        },
        totalFollowers: 321000,
        avgEngagement: 10.0,
        niche: ['Mobile Gaming', 'Filipino Content', 'Community Gaming'],
        location: 'Philippines',
        languages: ['Filipino', 'English'],
        rating: 4.6,
        completedCampaigns: 1,
        totalEarnings: 9800,
        monthlyEarnings: 9800,
        joinDate: new Date('2024-02-25'),
        lastActive: new Date(),
        status: 'active',
        specialties: ['Filipino Market', 'Community Building', 'Facebook Gaming'],
        equipment: ['Standard Setup', 'Good Internet', 'Mobile Focus'],
        availability: 'Full-time',
        campaignHistory: [
          { campaignId: 'camp_003', performance: 'good', earnings: 9800, installs: 7500 }
        ]
      },

      {
        id: 'creator_010',
        name: 'MalaysiaGamingHub',
        email: 'malaysiagaming@example.com',
        avatar: '/api/placeholder/64/64',
        tier: 'silver',
        platforms: {
          youtube: { followers: 78000, engagement: 7.8 },
          instagram: { followers: 89000, engagement: 11.2 },
          tiktok: { followers: 45000, engagement: 12.8 }
        },
        totalFollowers: 212000,
        avgEngagement: 10.6,
        niche: ['Mobile Gaming', 'Malaysian Content', 'Music Games'],
        location: 'Malaysia',
        languages: ['Malay', 'English'],
        rating: 4.4,
        completedCampaigns: 1,
        totalEarnings: 7500,
        monthlyEarnings: 7500,
        joinDate: new Date('2024-02-28'),
        lastActive: new Date(),
        status: 'active',
        specialties: ['Malaysian Market', 'Bilingual Content', 'Music Gaming'],
        equipment: ['Basic Setup', 'Mobile Optimized', 'Good Audio'],
        availability: 'Part-time',
        campaignHistory: [
          { campaignId: 'camp_003', performance: 'average', earnings: 7500, installs: 5200 }
        ]
      },

      // Recently discovered creators
      {
        id: 'creator_011',
        name: 'StreamingQueen',
        email: 'streamingqueen@example.com',
        avatar: '/api/placeholder/64/64',
        tier: 'gold',
        platforms: {
          twitch: { followers: 220000, engagement: 9.5 },
          youtube: { followers: 145000, engagement: 7.8 },
          tiktok: { followers: 89000, engagement: 13.2 }
        },
        totalFollowers: 454000,
        avgEngagement: 10.2,
        niche: ['Live Streaming', 'Mobile Gaming', 'Community'],
        location: 'Australia',
        languages: ['English'],
        rating: 4.8,
        completedCampaigns: 0,
        totalEarnings: 0,
        monthlyEarnings: 0,
        joinDate: new Date('2024-03-01'),
        lastActive: new Date(),
        status: 'verified',
        specialties: ['Live Streaming', 'Community Engagement', 'Interactive Content'],
        equipment: ['Professional Streaming Setup', 'Multiple Cameras', 'Advanced Audio'],
        availability: 'Full-time',
        campaignHistory: []
      },

      {
        id: 'creator_012',
        name: 'IndiaGamingPro',
        email: 'indiagaming@example.com',
        avatar: '/api/placeholder/64/64',
        tier: 'silver',
        platforms: {
          youtube: { followers: 189000, engagement: 8.5 },
          instagram: { followers: 156000, engagement: 10.8 },
          facebook: { followers: 98000, engagement: 6.5 }
        },
        totalFollowers: 443000,
        avgEngagement: 8.6,
        niche: ['Mobile Gaming', 'Hindi Content', 'Casual Games'],
        location: 'India',
        languages: ['Hindi', 'English'],
        rating: 4.5,
        completedCampaigns: 0,
        totalEarnings: 0,
        monthlyEarnings: 0,
        joinDate: new Date('2024-03-02'),
        lastActive: new Date(),
        status: 'pending_verification',
        specialties: ['Indian Market', 'Hindi Content', 'Large Audience'],
        equipment: ['Mobile Setup', 'Good Lighting', 'Audio Equipment'],
        availability: 'Full-time',
        campaignHistory: []
      }
    ];
  }

  private static generateAnalytics() {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toISOString().split('T')[0],
        campaigns: 3 + Math.floor(Math.random() * 5),
        reach: 50000 + Math.floor(Math.random() * 100000),
        engagement: 3000 + Math.floor(Math.random() * 8000),
        conversions: 200 + Math.floor(Math.random() * 500),
        revenue: 5000 + Math.floor(Math.random() * 15000),
        ctr: 2.5 + Math.random() * 3,
        cpm: 5 + Math.random() * 10
      };
    });

    return {
      daily: last30Days,
      summary: {
        totalCampaigns: 47,
        totalReach: 8500000,
        totalEngagement: 650000,
        totalConversions: 45000,
        totalRevenue: 485000,
        avgCTR: 3.8,
        avgCPM: 7.2,
        topPlatforms: [
          { platform: 'youtube', percentage: 45 },
          { platform: 'twitch', percentage: 32 },
          { platform: 'tiktok', percentage: 23 }
        ],
        topGenres: [
          { genre: 'RPG', percentage: 38 },
          { genre: 'Action', percentage: 28 },
          { genre: 'Strategy', percentage: 20 },
          { genre: 'Indie', percentage: 14 }
        ]
      }
    };
  }

  private static generatePayments() {
    return [
      {
        id: 'pay_001',
        campaignId: 'camp_001',
        creatorId: 'creator_001',
        amount: 8500,
        status: 'completed',
        method: 'bank_transfer',
        processedAt: new Date('2024-01-20'),
        description: 'Mystic Realms Campaign - YouTube Content'
      },
      {
        id: 'pay_002',
        campaignId: 'camp_001',
        creatorId: 'creator_002',
        amount: 12500,
        status: 'pending',
        method: 'paypal',
        processedAt: null,
        description: 'Mystic Realms Campaign - Twitch Streaming'
      },
      {
        id: 'pay_003',
        campaignId: 'camp_002',
        creatorId: 'creator_001',
        amount: 6200,
        status: 'completed',
        method: 'stripe',
        processedAt: new Date('2023-12-15'),
        description: 'Arena Championship - Content Creation'
      }
    ];
  }

  private static generateTickets() {
    return [
      {
        id: 'ticket_001',
        title: 'Payment delay for Campaign #123',
        description: 'Creator reports payment not received after 14 days',
        type: 'billing',
        priority: 'high',
        status: 'in_progress',
        reporterId: 'creator_001',
        assignedTo: 'support_agent_1',
        createdAt: new Date('2024-01-25'),
        updatedAt: new Date('2024-01-26'),
        slaTarget: new Date('2024-01-27'),
        slaStatus: 'within_sla'
      },
      {
        id: 'ticket_002',
        title: 'Dashboard loading issues',
        description: 'Campaign dashboard not loading properly on mobile',
        type: 'technical',
        priority: 'medium',
        status: 'open',
        reporterId: 'creator_002',
        assignedTo: null,
        createdAt: new Date('2024-01-26'),
        updatedAt: new Date('2024-01-26'),
        slaTarget: new Date('2024-01-28'),
        slaStatus: 'within_sla'
      }
    ];
  }

  private static generateWorkflows() {
    return [
      {
        id: 'workflow_001',
        name: 'New Creator Onboarding',
        trigger: 'creator_signup',
        steps: [
          { action: 'send_welcome_email', delay: 0 },
          { action: 'schedule_onboarding_call', delay: 1440 },
          { action: 'send_platform_guide', delay: 2880 }
        ],
        isActive: true,
        executionCount: 156,
        successRate: 94
      },
      {
        id: 'workflow_002',
        name: 'Campaign Completion Follow-up',
        trigger: 'campaign_completed',
        steps: [
          { action: 'generate_performance_report', delay: 0 },
          { action: 'send_satisfaction_survey', delay: 720 },
          { action: 'process_final_payment', delay: 1440 }
        ],
        isActive: true,
        executionCount: 89,
        successRate: 97
      }
    ];
  }

  private static generateMarketInsights() {
    return [
      {
        id: 'insight_001',
        category: 'gaming_trends',
        title: 'RPG Games Showing 34% Growth',
        description: 'Role-playing games experiencing significant audience growth across all platforms',
        impact: 'high',
        confidence: 0.92,
        dataPoints: [
          { metric: 'audience_growth', value: 34, period: 'Q4_2023' },
          { metric: 'engagement_rate', value: 8.2, period: 'Q4_2023' },
          { metric: 'creator_adoption', value: 67, period: 'Q4_2023' }
        ],
        recommendations: [
          'Increase RPG campaign budget allocation',
          'Recruit more RPG-focused creators',
          'Develop RPG-specific campaign templates'
        ],
        timestamp: new Date()
      },
      {
        id: 'insight_002',
        category: 'creator_behavior',
        title: 'Short-Form Content Dominance',
        description: 'Creators increasingly focusing on 60-second content formats',
        impact: 'critical',
        confidence: 0.89,
        dataPoints: [
          { metric: 'short_form_adoption', value: 78, period: 'Q4_2023' },
          { metric: 'engagement_boost', value: 45, period: 'Q4_2023' }
        ],
        recommendations: [
          'Adapt campaign briefs for short-form content',
          'Create vertical video guidelines',
          'Offer short-form content bonuses'
        ],
        timestamp: new Date()
      },
      {
        id: 'insight_003',
        category: 'platform_trends',
        title: 'TikTok Gaming Content Surge',
        description: 'Gaming content on TikTok showing 156% growth in engagement',
        impact: 'high',
        confidence: 0.85,
        dataPoints: [
          { metric: 'platform_growth', value: 156, period: 'Q4_2023' },
          { metric: 'creator_migration', value: 23, period: 'Q4_2023' }
        ],
        recommendations: [
          'Expand TikTok creator network',
          'Develop TikTok-specific campaigns',
          'Invest in TikTok advertising'
        ],
        timestamp: new Date()
      }
    ];
  }

  private static generateSystemMetrics() {
    const last24Hours = Array.from({ length: 24 }, (_, i) => {
      const timestamp = new Date();
      timestamp.setHours(timestamp.getHours() - (23 - i));
      return {
        timestamp,
        cpu_usage: 30 + Math.random() * 40,
        memory_usage: 50 + Math.random() * 30,
        active_users: 100 + Math.floor(Math.random() * 200),
        api_calls: 1000 + Math.floor(Math.random() * 2000),
        response_time: 150 + Math.random() * 200,
        error_rate: Math.random() * 2
      };
    });

    return {
      realtime: last24Hours,
      summary: {
        uptime: 99.8,
        total_users: 2847,
        active_campaigns: 23,
        total_transactions: 1456,
        system_health: 'excellent',
        last_incident: new Date('2024-01-15'),
        avg_response_time: 245,
        error_rate: 0.12
      }
    };
  }

  // Utility method to populate localStorage with sample data
  static seedBrowserStorage() {
    if (typeof window !== 'undefined') {
      const data = this.generateComprehensiveDataSet();

      // Store in localStorage for persistence
      localStorage.setItem('gamefluence_sample_data', JSON.stringify(data));
      localStorage.setItem('gamefluence_data_seeded', 'true');
      localStorage.setItem('gamefluence_seed_timestamp', new Date().toISOString());

      console.log('✅ Sample data seeded successfully');
      return data;
    }
    return null;
  }

  // Method to get seeded data
  static getSeededData(): SampleDataSet | null {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('gamefluence_sample_data');
      if (stored) {
        return JSON.parse(stored);
      }
    }
    return null;
  }

  // Check if data needs refreshing (older than 24 hours)
  static needsRefresh(): boolean {
    if (typeof window !== 'undefined') {
      const timestamp = localStorage.getItem('gamefluence_seed_timestamp');
      if (timestamp) {
        const seedTime = new Date(timestamp);
        const now = new Date();
        const hoursDiff = (now.getTime() - seedTime.getTime()) / (1000 * 60 * 60);
        return hoursDiff > 24;
      }
    }
    return true;
  }

  // Generate real-time updates for live dashboards
  static generateRealtimeUpdate() {
    return {
      timestamp: new Date(),
      active_users: 150 + Math.floor(Math.random() * 100),
      new_campaigns: Math.floor(Math.random() * 3),
      completed_payments: Math.floor(Math.random() * 5),
      system_load: 40 + Math.random() * 30,
      api_response_time: 200 + Math.random() * 100
    };
  }
}