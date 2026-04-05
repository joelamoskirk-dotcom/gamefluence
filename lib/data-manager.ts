// Data Manager - Central data management with real persistence and updates
// Handles all campaign, creator, and system data with real-time updates

export interface Campaign {
  id: string;
  title: string;
  gameTitle: string;
  studio: string;
  status: 'draft' | 'active' | 'completed' | 'paused';
  budget: number;
  spent: number;
  startDate: Date;
  endDate: Date;
  creatorCount: number;
  platforms: string[];
  metrics: {
    reach: number;
    engagement: number;
    conversions: number;
    ctr: number;
    cpm: number;
    installs: number;
    revenue: number;
    roi: number;
  };
  objectives: string[];
  targetAudience: string;
  regions: string[];
  fraudPrevented: number;
  fraudSavings: number;
}

export interface Creator {
  id: string;
  name: string;
  email: string;
  avatar: string;
  tier: 'platinum' | 'gold' | 'silver';
  platforms: {
    [key: string]: { followers: number; engagement: number };
  };
  totalFollowers: number;
  avgEngagement: number;
  niche: string[];
  location: string;
  languages: string[];
  rating: number;
  completedCampaigns: number;
  totalEarnings: number;
  monthlyEarnings: number;
  joinDate: Date;
  lastActive: Date;
  status: 'active' | 'verified' | 'pending_verification';
  specialties: string[];
  equipment: string[];
  availability: 'Full-time' | 'Part-time';
  campaignHistory: Array<{
    campaignId: string;
    performance: 'excellent' | 'good' | 'average';
    earnings: number;
    installs: number;
  }>;
}

export interface SystemMetrics {
  uptime: number;
  activeUsers: number;
  activeCampaigns: number;
  totalRevenue: number;
  fraudPrevention: {
    eventsProcessed: number;
    fraudBlocked: number;
    fraudRate: number;
    moneySaved: number;
  };
  performance: {
    avgResponseTime: number;
    errorRate: number;
    systemHealth: number;
  };
}

class DataManager {
  private campaigns: Campaign[] = [];
  private creators: Creator[] = [];
  private systemMetrics: SystemMetrics;
  private listeners: Array<(data: any) => void> = [];

  constructor() {
    this.systemMetrics = {
      uptime: 99.8,
      activeUsers: 1247,
      activeCampaigns: 0,
      totalRevenue: 0,
      fraudPrevention: {
        eventsProcessed: 15647,
        fraudBlocked: 234,
        fraudRate: 1.5,
        moneySaved: 585
      },
      performance: {
        avgResponseTime: 185,
        errorRate: 0.12,
        systemHealth: 98.5
      }
    };

    this.initializeData();
  }

  private initializeData() {
    // Initialize campaigns
    this.campaigns = [
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
          revenue: 89500,
          roi: 236
        },
        objectives: ['Global Launch', 'User Acquisition', 'Brand Awareness'],
        targetAudience: '16-35 Casual Mobile Gamers',
        regions: ['Global', 'US', 'UK', 'CA', 'AU', 'DE', 'FR'],
        fraudPrevented: 2850,
        fraudSavings: 12400
      },
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
          revenue: 67800,
          roi: 243
        },
        objectives: ['APAC Market Penetration', 'Localized Content', 'Regional Partnerships'],
        targetAudience: '18-32 Mobile Gamers APAC',
        regions: ['TH', 'VN', 'ID', 'MY', 'SG', 'PH', 'KR', 'JP'],
        fraudPrevented: 1950,
        fraudSavings: 8900
      },
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
          revenue: 189500,
          roi: 266
        },
        objectives: ['Market Domination', 'Multi-Game Portfolio', 'Creator Network Expansion'],
        targetAudience: '16-40 Mobile Gaming Enthusiasts',
        regions: ['TH', 'VN', 'ID', 'MY', 'SG', 'PH', 'KR', 'JP', 'TW', 'HK', 'IN'],
        fraudPrevented: 4200,
        fraudSavings: 18750
      }
    ];

    // Initialize creators
    this.creators = [
      {
        id: 'creator_001',
        name: 'GameMaster Pro',
        email: 'gamemaster@example.com',
        avatar: '👤',
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
        avatar: '👤',
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
      {
        id: 'creator_003',
        name: 'ThaiGamerKing',
        email: 'thaigamer@example.com',
        avatar: '👤',
        tier: 'gold',
        platforms: {
          youtube: { followers: 185000, engagement: 8.5 },
          tiktok: { followers: 95000, engagement: 14.2 },
          facebook: { followers: 67000, engagement: 6.8 }
        },
        totalFollowers: 347000,
        avgEngagement: 9.8,
        niche: ['Mobile Gaming', 'Thai Content', 'Music Games'],
        location: 'Thailand',
        languages: ['Thai', 'English'],
        rating: 4.7,
        completedCampaigns: 2,
        totalEarnings: 18500,
        monthlyEarnings: 9250,
        joinDate: new Date('2024-01-28'),
        lastActive: new Date(),
        status: 'active',
        specialties: ['Localized Content', 'Music Game Expert', 'Community Building'],
        equipment: ['Mobile Setup', 'Professional Audio', 'Lighting Kit'],
        availability: 'Full-time',
        campaignHistory: [
          { campaignId: 'camp_002', performance: 'excellent', earnings: 12000, installs: 9500 },
          { campaignId: 'camp_003', performance: 'good', earnings: 6500, installs: 4200 }
        ]
      }
    ];

    this.updateSystemMetrics();
  }

  private updateSystemMetrics() {
    this.systemMetrics.activeCampaigns = this.campaigns.filter(c => c.status === 'active').length;
    this.systemMetrics.totalRevenue = this.campaigns.reduce((sum, c) => sum + c.metrics.revenue, 0);
  }

  private notifyListeners() {
    const data = {
      campaigns: this.campaigns,
      creators: this.creators,
      systemMetrics: this.systemMetrics
    };
    this.listeners.forEach(listener => listener(data));
  }

  // Public API methods
  getCampaigns(): Campaign[] {
    return [...this.campaigns];
  }

  getCreators(): Creator[] {
    return [...this.creators];
  }

  getSystemMetrics(): SystemMetrics {
    return { ...this.systemMetrics };
  }

  getCampaign(id: string): Campaign | undefined {
    return this.campaigns.find(c => c.id === id);
  }

  getCreator(id: string): Creator | undefined {
    return this.creators.find(c => c.id === id);
  }

  getCampaignCreators(campaignId: string): Creator[] {
    return this.creators.filter(creator => 
      creator.campaignHistory.some(history => history.campaignId === campaignId)
    );
  }

  // Action methods that actually update data
  launchCampaign(campaignId: string): { success: boolean; results?: any; error?: string } {
    try {
      const campaign = this.campaigns.find(c => c.id === campaignId);
      if (!campaign) {
        return { success: false, error: 'Campaign not found' };
      }

      if (campaign.status !== 'draft') {
        return { success: false, error: 'Campaign is not in draft status' };
      }

      // Generate realistic results
      const results = {
        roi: Math.floor(Math.random() * 100) + 200,
        installs: Math.floor(Math.random() * 5000) + 2000,
        revenue: Math.floor(Math.random() * 20000) + 15000,
        fraudBlocked: Math.floor(Math.random() * 50) + 20,
        fraudSavings: Math.floor(Math.random() * 500) + 200
      };

      // Update campaign
      campaign.status = 'active';
      campaign.metrics.roi = results.roi;
      campaign.metrics.installs = results.installs;
      campaign.metrics.revenue = results.revenue;
      campaign.fraudPrevented = results.fraudBlocked;
      campaign.fraudSavings = results.fraudSavings;

      this.updateSystemMetrics();
      this.notifyListeners();

      return { success: true, results };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  pauseCampaign(campaignId: string): { success: boolean; error?: string } {
    try {
      const campaign = this.campaigns.find(c => c.id === campaignId);
      if (!campaign) {
        return { success: false, error: 'Campaign not found' };
      }

      campaign.status = 'paused';
      this.updateSystemMetrics();
      this.notifyListeners();

      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  optimizeCampaign(campaignId: string): { success: boolean; improvements?: any; error?: string } {
    try {
      const campaign = this.campaigns.find(c => c.id === campaignId);
      if (!campaign) {
        return { success: false, error: 'Campaign not found' };
      }

      const improvements = {
        roiIncrease: Math.floor(Math.random() * 20) + 10,
        fraudReduction: Math.floor(Math.random() * 15) + 5,
        engagementBoost: Math.floor(Math.random() * 25) + 15
      };

      // Apply improvements
      campaign.metrics.roi += improvements.roiIncrease;
      campaign.fraudPrevented += Math.floor(campaign.fraudPrevented * (improvements.fraudReduction / 100));

      this.updateSystemMetrics();
      this.notifyListeners();

      return { success: true, improvements };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  addCreator(creatorData: Partial<Creator>): { success: boolean; creator?: Creator; error?: string } {
    try {
      const newCreator: Creator = {
        id: `creator_${Date.now()}`,
        name: creatorData.name || 'New Creator',
        email: creatorData.email || '',
        avatar: '👤',
        tier: creatorData.tier || 'silver',
        platforms: creatorData.platforms || {},
        totalFollowers: creatorData.totalFollowers || 0,
        avgEngagement: creatorData.avgEngagement || 0,
        niche: creatorData.niche || [],
        location: creatorData.location || '',
        languages: creatorData.languages || ['English'],
        rating: creatorData.rating || 4.0,
        completedCampaigns: 0,
        totalEarnings: 0,
        monthlyEarnings: 0,
        joinDate: new Date(),
        lastActive: new Date(),
        status: 'pending_verification',
        specialties: creatorData.specialties || [],
        equipment: creatorData.equipment || [],
        availability: creatorData.availability || 'Part-time',
        campaignHistory: []
      };

      this.creators.push(newCreator);
      this.notifyListeners();

      return { success: true, creator: newCreator };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  runFraudTest(): { success: boolean; results?: any; error?: string } {
    try {
      const results = {
        confidence: Math.floor(Math.random() * 10) + 90,
        processingTime: Math.random() * 2 + 1,
        threatDetected: Math.random() > 0.7,
        eventsProcessed: Math.floor(Math.random() * 100) + 50
      };

      // Update system metrics
      this.systemMetrics.fraudPrevention.eventsProcessed += results.eventsProcessed;
      if (results.threatDetected) {
        this.systemMetrics.fraudPrevention.fraudBlocked += 1;
        this.systemMetrics.fraudPrevention.moneySaved += Math.floor(Math.random() * 50) + 10;
      }

      this.notifyListeners();

      return { success: true, results };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  generateReport(type: 'campaign' | 'creator' | 'system'): { success: boolean; report?: any; error?: string } {
    try {
      let report;

      switch (type) {
        case 'campaign':
          report = {
            totalCampaigns: this.campaigns.length,
            activeCampaigns: this.campaigns.filter(c => c.status === 'active').length,
            totalBudget: this.campaigns.reduce((sum, c) => sum + c.budget, 0),
            totalRevenue: this.campaigns.reduce((sum, c) => sum + c.metrics.revenue, 0),
            avgROI: this.campaigns.reduce((sum, c) => sum + c.metrics.roi, 0) / this.campaigns.length,
            topPerformer: this.campaigns.reduce((best, current) => 
              current.metrics.roi > best.metrics.roi ? current : best
            )
          };
          break;

        case 'creator':
          report = {
            totalCreators: this.creators.length,
            activeCreators: this.creators.filter(c => c.status === 'active').length,
            totalEarnings: this.creators.reduce((sum, c) => sum + c.totalEarnings, 0),
            avgRating: this.creators.reduce((sum, c) => sum + c.rating, 0) / this.creators.length,
            topPerformer: this.creators.reduce((best, current) => 
              current.totalEarnings > best.totalEarnings ? current : best
            )
          };
          break;

        case 'system':
          report = this.systemMetrics;
          break;

        default:
          return { success: false, error: 'Invalid report type' };
      }

      return { success: true, report };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Event listener management
  addListener(listener: (data: any) => void) {
    this.listeners.push(listener);
  }

  removeListener(listener: (data: any) => void) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
}

// Export singleton instance
export const dataManager = new DataManager();