// Creator Performance API - Real-time tracking with historical data
// Connects to campaign data and provides time-series performance metrics

import { campaignReportGenerator } from './campaign-report-generator';

export interface CreatorPerformanceData {
  creatorId: string;
  name: string;
  avatar?: string;
  platform: 'twitch' | 'youtube' | 'tiktok' | 'instagram';
  followers: number;
  
  // Performance metrics over time
  performanceHistory: Array<{
    date: string;
    campaignId: string;
    campaignName: string;
    reach: number;
    views: number;
    engagement: number;
    engagementRate: number;
    clicks: number;
    installs: number;
    revenue: number;
    roi: number;
    fraudDetected: number;
    brandMentions: number;
    chatMentions: number;
    streamDuration?: number; // For Twitch streamers
    avgViewers?: number;
    peakViewers?: number;
  }>;
  
  // Aggregated stats
  totalReach: number;
  totalViews: number;
  avgEngagementRate: number;
  totalRevenue: number;
  avgROI: number;
  totalCampaigns: number;
  lastActive: string;
  status: 'live' | 'completed' | 'scheduled' | 'inactive';
  
  // Real-time data (if streaming)
  liveData?: {
    isLive: boolean;
    currentViewers: number;
    streamTitle: string;
    streamStartTime: string;
    recentMentions: number;
    liveEngagement: number;
  };
}

export interface APIConnection {
  platform: string;
  connected: boolean;
  lastSync: string;
  apiKey?: string;
  rateLimitRemaining: number;
  nextSyncTime: string;
}

export class CreatorPerformanceAPI {
  private creators: Map<string, CreatorPerformanceData> = new Map();
  private apiConnections: Map<string, APIConnection> = new Map();
  private realTimeUpdates: Map<string, any> = new Map();

  constructor() {
    this.initializeAPIConnections();
    this.seedCreatorData();
    this.startRealTimeUpdates();
  }

  // Initialize API connections for different platforms
  private initializeAPIConnections(): void {
    const platforms = ['twitch', 'youtube', 'tiktok', 'instagram', 'twitter'];
    
    platforms.forEach(platform => {
      this.apiConnections.set(platform, {
        platform,
        connected: true, // Simulated as connected
        lastSync: new Date().toISOString(),
        rateLimitRemaining: Math.floor(Math.random() * 1000) + 500,
        nextSyncTime: new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes
      });
    });
  }

  // Seed with real creator data from our campaigns
  private seedCreatorData(): void {
    const campaignResults = campaignReportGenerator.getAllResults();
    const allCreators = campaignResults.flatMap(result => result.creatorPerformance);
    
    // Add creators from campaigns plus additional ones
    const creatorProfiles = [
      // From Campaign 1 - Mobile RPG Launch APAC
      {
        creatorId: 'creator_001',
        name: 'GamingGuru_TH',
        platform: 'twitch' as const,
        followers: 250000,
        avatar: '🎮'
      },
      {
        creatorId: 'creator_002', 
        name: 'MobileRPGPro',
        platform: 'youtube' as const,
        followers: 180000,
        avatar: '📱'
      },
      {
        creatorId: 'creator_003',
        name: 'AsianGamerGirl',
        platform: 'tiktok' as const,
        followers: 320000,
        avatar: '👩‍🎮'
      },
      
      // From Campaign 2 - Strategy Game
      {
        creatorId: 'creator_004',
        name: 'StrategyMaster',
        platform: 'youtube' as const,
        followers: 150000,
        avatar: '🧠'
      },
      {
        creatorId: 'creator_005',
        name: 'TacticalGaming',
        platform: 'twitch' as const,
        followers: 200000,
        avatar: '⚔️'
      },
      
      // Additional active creators
      {
        creatorId: 'creator_live_1',
        name: 'LiveGamerPro',
        platform: 'twitch' as const,
        followers: 180000,
        avatar: '🔴'
      },
      {
        creatorId: 'creator_live_2',
        name: 'StreamingQueen',
        platform: 'twitch' as const,
        followers: 220000,
        avatar: '👑'
      },
      {
        creatorId: 'creator_live_3',
        name: 'EsportsLegend',
        platform: 'youtube' as const,
        followers: 150000,
        avatar: '🏆'
      },
      
      // New APAC creators
      {
        creatorId: 'creator_apac_1',
        name: 'TokyoGameMaster',
        platform: 'youtube' as const,
        followers: 280000,
        avatar: '🗾'
      },
      {
        creatorId: 'creator_apac_2',
        name: 'KoreanProGamer',
        platform: 'twitch' as const,
        followers: 195000,
        avatar: '🇰🇷'
      },
      {
        creatorId: 'creator_apac_3',
        name: 'SingaporeStreamer',
        platform: 'tiktok' as const,
        followers: 165000,
        avatar: '🇸🇬'
      },
      {
        creatorId: 'creator_apac_4',
        name: 'VietnamGaming',
        platform: 'youtube' as const,
        followers: 140000,
        avatar: '🇻🇳'
      }
    ];

    creatorProfiles.forEach(profile => {
      const performanceHistory = this.generatePerformanceHistory(profile.creatorId, profile.name);
      const aggregatedStats = this.calculateAggregatedStats(performanceHistory);
      
      const creatorData = {
        ...profile,
        performanceHistory,
        ...aggregatedStats,
        totalReach: aggregatedStats.totalReach ?? 0,
        avgROI: aggregatedStats.avgROI ?? 0,
        lastActive: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        status: this.getCreatorStatus(profile.creatorId),
        liveData: profile.platform === 'twitch' ? this.generateLiveData(profile.creatorId) : undefined
      };
      
      this.creators.set(profile.creatorId, creatorData as any);
    });
  }

  // Generate realistic performance history with dates
  private generatePerformanceHistory(creatorId: string, creatorName: string): CreatorPerformanceData['performanceHistory'] {
    const history = [];
    const campaigns = campaignReportGenerator.getAllResults();
    
    // Add performance from actual campaigns
    campaigns.forEach(campaign => {
      const creatorPerf = campaign.creatorPerformance.find(c => c.creatorId === creatorId || c.name === creatorName);
      if (creatorPerf) {
        history.push({
          date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          campaignId: campaign.campaignId,
          campaignName: `Campaign ${campaign.campaignId.split('_')[1]}`,
          reach: creatorPerf.reach,
          views: Math.floor(creatorPerf.reach * 0.7),
          engagement: creatorPerf.engagement,
          engagementRate: (creatorPerf.engagement / creatorPerf.reach) * 100,
          clicks: creatorPerf.clicks,
          installs: creatorPerf.installs,
          revenue: creatorPerf.installs * 2.5, // $2.50 per install
          roi: creatorPerf.roi,
          fraudDetected: creatorPerf.fraudDetected,
          brandMentions: Math.floor(Math.random() * 50) + 10,
          chatMentions: Math.floor(Math.random() * 200) + 50,
          streamDuration: Math.floor(Math.random() * 180) + 60, // 1-4 hours
          avgViewers: Math.floor(Math.random() * 5000) + 1000,
          peakViewers: Math.floor(Math.random() * 10000) + 2000
        });
      }
    });
    
    // Add additional historical data points
    for (let i = 0; i < 15; i++) {
      const date = new Date(Date.now() - (i + 1) * 7 * 24 * 60 * 60 * 1000); // Weekly data
      const baseReach = Math.floor(Math.random() * 50000) + 20000;
      const engagementRate = Math.random() * 5 + 3; // 3-8%
      
      history.push({
        date: date.toISOString().split('T')[0],
        campaignId: `historical_${i}`,
        campaignName: `Weekly Performance ${i + 1}`,
        reach: baseReach,
        views: Math.floor(baseReach * 0.8),
        engagement: Math.floor(baseReach * (engagementRate / 100)),
        engagementRate,
        clicks: Math.floor(baseReach * 0.05),
        installs: Math.floor(baseReach * 0.008),
        revenue: Math.floor(baseReach * 0.008) * 2.5,
        roi: Math.floor(Math.random() * 200) + 100,
        fraudDetected: Math.floor(Math.random() * 20),
        brandMentions: Math.floor(Math.random() * 30) + 5,
        chatMentions: Math.floor(Math.random() * 150) + 25,
        streamDuration: Math.floor(Math.random() * 120) + 90,
        avgViewers: Math.floor(Math.random() * 3000) + 800,
        peakViewers: Math.floor(Math.random() * 6000) + 1500
      });
    }
    
    return history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // Calculate aggregated statistics
  private calculateAggregatedStats(history: CreatorPerformanceData['performanceHistory']): Partial<CreatorPerformanceData> {
    if (history.length === 0) {
      return {
        totalReach: 0,
        totalViews: 0,
        avgEngagementRate: 0,
        totalRevenue: 0,
        avgROI: 0,
        totalCampaigns: 0
      };
    }
    
    return {
      totalReach: history.reduce((sum, h) => sum + h.reach, 0),
      totalViews: history.reduce((sum, h) => sum + h.views, 0),
      avgEngagementRate: history.reduce((sum, h) => sum + h.engagementRate, 0) / history.length,
      totalRevenue: history.reduce((sum, h) => sum + h.revenue, 0),
      avgROI: history.reduce((sum, h) => sum + h.roi, 0) / history.length,
      totalCampaigns: history.length
    };
  }

  // Get creator status
  private getCreatorStatus(creatorId: string): CreatorPerformanceData['status'] {
    const statuses: CreatorPerformanceData['status'][] = ['live', 'completed', 'scheduled', 'inactive'];
    if (creatorId.includes('live')) return 'live';
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  // Generate live streaming data
  private generateLiveData(creatorId: string): CreatorPerformanceData['liveData'] {
    const isLive = Math.random() > 0.7; // 30% chance of being live
    
    if (!isLive) return undefined;
    
    return {
      isLive: true,
      currentViewers: Math.floor(Math.random() * 5000) + 500,
      streamTitle: 'Playing New RPG Game - Campaign Live!',
      streamStartTime: new Date(Date.now() - Math.random() * 4 * 60 * 60 * 1000).toISOString(),
      recentMentions: Math.floor(Math.random() * 50) + 10,
      liveEngagement: Math.random() * 10 + 5
    };
  }

  // Start real-time updates
  private startRealTimeUpdates(): void {
    setInterval(() => {
      this.updateLiveData();
      this.syncAPIData();
    }, 30000); // Update every 30 seconds
  }

  // Update live streaming data
  private updateLiveData(): void {
    this.creators.forEach((creator, creatorId) => {
      if (creator.platform === 'twitch' && creator.liveData?.isLive) {
        // Update live metrics
        creator.liveData.currentViewers += Math.floor(Math.random() * 200) - 100;
        creator.liveData.currentViewers = Math.max(100, creator.liveData.currentViewers);
        creator.liveData.recentMentions = Math.floor(Math.random() * 20) + 5;
        creator.liveData.liveEngagement = Math.random() * 5 + 5;
      }
    });
  }

  // Sync with external APIs
  private syncAPIData(): void {
    this.apiConnections.forEach((connection, platform) => {
      if (connection.connected) {
        // Simulate API sync
        connection.lastSync = new Date().toISOString();
        connection.rateLimitRemaining = Math.max(0, connection.rateLimitRemaining - Math.floor(Math.random() * 10));
        connection.nextSyncTime = new Date(Date.now() + 15 * 60 * 1000).toISOString();
        
        // Reset rate limit if it hits 0
        if (connection.rateLimitRemaining === 0) {
          setTimeout(() => {
            connection.rateLimitRemaining = 1000;
          }, 60000); // Reset after 1 minute
        }
      }
    });
  }

  // Public API methods
  getAllCreators(): CreatorPerformanceData[] {
    return Array.from(this.creators.values()).sort((a, b) => b.totalRevenue - a.totalRevenue);
  }

  getCreator(creatorId: string): CreatorPerformanceData | null {
    return this.creators.get(creatorId) || null;
  }

  getLiveCreators(): CreatorPerformanceData[] {
    return this.getAllCreators().filter(creator => creator.liveData?.isLive);
  }

  getTopPerformers(limit: number = 10): CreatorPerformanceData[] {
    return this.getAllCreators()
      .sort((a, b) => b.avgROI - a.avgROI)
      .slice(0, limit);
  }

  getCreatorsByPlatform(platform: string): CreatorPerformanceData[] {
    return this.getAllCreators().filter(creator => creator.platform === platform);
  }

  getAPIConnections(): APIConnection[] {
    return Array.from(this.apiConnections.values());
  }

  // Get performance over time for charts
  getPerformanceTimeSeries(creatorId?: string): Array<{
    date: string;
    totalReach: number;
    totalViews: number;
    totalEngagement: number;
    totalRevenue: number;
    avgROI: number;
  }> {
    const creators = creatorId ? [this.getCreator(creatorId)].filter(Boolean) : this.getAllCreators();
    const dateMap = new Map<string, any>();
    
    creators.forEach(creator => {
      if (!creator) return;
      
      creator.performanceHistory.forEach(perf => {
        const existing = dateMap.get(perf.date) || {
          date: perf.date,
          totalReach: 0,
          totalViews: 0,
          totalEngagement: 0,
          totalRevenue: 0,
          roiSum: 0,
          roiCount: 0
        };
        
        existing.totalReach += perf.reach;
        existing.totalViews += perf.views;
        existing.totalEngagement += perf.engagement;
        existing.totalRevenue += perf.revenue;
        existing.roiSum += perf.roi;
        existing.roiCount += 1;
        
        dateMap.set(perf.date, existing);
      });
    });
    
    return Array.from(dateMap.values())
      .map(item => ({
        ...item,
        avgROI: item.roiSum / item.roiCount
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
}

// Export singleton instance
export const creatorPerformanceAPI = new CreatorPerformanceAPI();