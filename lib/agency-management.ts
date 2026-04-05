// Agency Management System - APAC Agencies & Brands Platform
// Connects agencies and brands with gaming creators across APAC markets

export interface APACAgency {
  id: string;
  name: string;
  type: 'full_service' | 'digital_specialist' | 'gaming_focused' | 'regional_network';
  headquarters: string;
  markets: string[];
  clientCount: number;
  totalSpend: number;
  specialties: string[];
  tier: 'enterprise' | 'growth' | 'startup';
  contactInfo: {
    primaryContact: string;
    email: string;
    phone: string;
  };
  performance: {
    campaignsManaged: number;
    avgROI: number;
    clientRetention: number;
    marketExpertise: number;
  };
  clients: BrandClient[];
  status: 'active' | 'onboarding' | 'prospect';
  joinDate: Date;
}

export interface BrandClient {
  id: string;
  name: string;
  industry: string;
  category: 'gaming' | 'tech' | 'ecommerce' | 'fintech' | 'lifestyle' | 'fmcg';
  targetMarkets: string[];
  monthlyBudget: number;
  objectives: string[];
  kpis: string[];
  campaignHistory: {
    campaignId: string;
    spend: number;
    roi: number;
    performance: 'excellent' | 'good' | 'average' | 'poor';
  }[];
}

export interface AgencyDashboard {
  agencyId: string;
  clients: BrandClient[];
  activeCampaigns: number;
  totalSpend: number;
  totalROI: number;
  marketPerformance: {
    [market: string]: {
      spend: number;
      roi: number;
      campaigns: number;
    };
  };
  creatorNetwork: {
    totalCreators: number;
    activeCreators: number;
    topPerformers: string[];
  };
  whiteLabel: {
    enabled: boolean;
    brandingCustomization: any;
    clientPortalAccess: boolean;
  };
}

export class AgencyManagementSystem {
  private agencies: Map<string, APACAgency> = new Map();
  private agencyDashboards: Map<string, AgencyDashboard> = new Map();

  constructor() {
    this.initializeAPACAgencies();
    this.setupAgencyDashboards();
  }

  // Initialize major APAC agencies and their brand clients
  private initializeAPACAgencies() {
    console.log('🏢 Initializing APAC Agency Network...');

    const agencies: APACAgency[] = [
      {
        id: 'agency_001',
        name: 'Digital Horizon APAC',
        type: 'full_service',
        headquarters: 'Singapore',
        markets: ['Singapore', 'Malaysia', 'Thailand', 'Vietnam', 'Indonesia'],
        clientCount: 24,
        totalSpend: 2400000,
        specialties: ['Gaming Marketing', 'Influencer Campaigns', 'Cross-Market Attribution'],
        tier: 'enterprise',
        contactInfo: {
          primaryContact: 'Sarah Chen',
          email: 'sarah.chen@digitalhorizon.asia',
          phone: '+65-9123-4567'
        },
        performance: {
          campaignsManaged: 156,
          avgROI: 4.2,
          clientRetention: 92,
          marketExpertise: 9.1
        },
        clients: [
          {
            id: 'client_001',
            name: 'TechNova Gaming',
            industry: 'Gaming Technology',
            category: 'gaming',
            targetMarkets: ['Vietnam', 'Thailand', 'Indonesia'],
            monthlyBudget: 180000,
            objectives: ['User Acquisition', 'Brand Awareness', 'Market Penetration'],
            kpis: ['CPI', 'ROAS', 'Brand Lift', 'Market Share'],
            campaignHistory: [
              { campaignId: 'camp_001', spend: 150000, roi: 4.8, performance: 'excellent' },
              { campaignId: 'camp_002', spend: 120000, roi: 3.9, performance: 'good' }
            ]
          },
          {
            id: 'client_002',
            name: 'StreamTech Solutions',
            industry: 'Streaming Technology',
            category: 'tech',
            targetMarkets: ['Thailand', 'Malaysia', 'Singapore'],
            monthlyBudget: 95000,
            objectives: ['Creator Partnerships', 'Platform Adoption', 'Community Building'],
            kpis: ['Creator Signups', 'Platform Usage', 'Community Engagement'],
            campaignHistory: [
              { campaignId: 'camp_003', spend: 85000, roi: 5.2, performance: 'excellent' }
            ]
          },
          {
            id: 'client_003',
            name: 'APAC Fintech Pro',
            industry: 'Financial Technology',
            category: 'fintech',
            targetMarkets: ['Vietnam', 'Indonesia', 'Thailand'],
            monthlyBudget: 220000,
            objectives: ['Gaming Audience Acquisition', 'App Downloads', 'User Onboarding'],
            kpis: ['App Installs', 'Registration Rate', 'First Transaction'],
            campaignHistory: [
              { campaignId: 'camp_004', spend: 200000, roi: 3.7, performance: 'good' }
            ]
          }
        ],
        status: 'active',
        joinDate: new Date('2023-08-15')
      },
      {
        id: 'agency_002',
        name: 'Vietnam Digital Collective',
        type: 'regional_network',
        headquarters: 'Ho Chi Minh City',
        markets: ['Vietnam'],
        clientCount: 18,
        totalSpend: 1800000,
        specialties: ['Vietnamese Market', 'Local Creator Network', 'Cultural Localization'],
        tier: 'growth',
        contactInfo: {
          primaryContact: 'Nguyễn Minh Đức',
          email: 'duc.nguyen@vndigital.vn',
          phone: '+84-90-123-4567'
        },
        performance: {
          campaignsManaged: 89,
          avgROI: 5.1,
          clientRetention: 88,
          marketExpertise: 9.8
        },
        clients: [
          {
            id: 'client_004',
            name: 'VietCommerce Plus',
            industry: 'E-commerce',
            category: 'ecommerce',
            targetMarkets: ['Vietnam'],
            monthlyBudget: 150000,
            objectives: ['Gaming Audience Reach', 'Product Awareness', 'Sales Conversion'],
            kpis: ['Reach', 'Click-through Rate', 'Conversion Rate', 'Revenue'],
            campaignHistory: [
              { campaignId: 'camp_005', spend: 140000, roi: 6.2, performance: 'excellent' },
              { campaignId: 'camp_006', spend: 110000, roi: 4.8, performance: 'good' }
            ]
          },
          {
            id: 'client_005',
            name: 'Saigon Lifestyle Brands',
            industry: 'Consumer Goods',
            category: 'lifestyle',
            targetMarkets: ['Vietnam'],
            monthlyBudget: 85000,
            objectives: ['Youth Engagement', 'Brand Positioning', 'Community Building'],
            kpis: ['Engagement Rate', 'Brand Sentiment', 'Community Growth'],
            campaignHistory: [
              { campaignId: 'camp_007', spend: 75000, roi: 4.5, performance: 'good' }
            ]
          }
        ],
        status: 'active',
        joinDate: new Date('2023-09-20')
      },
      {
        id: 'agency_003',
        name: 'Thailand Gaming Hub',
        type: 'gaming_focused',
        headquarters: 'Bangkok',
        markets: ['Thailand'],
        clientCount: 12,
        totalSpend: 1200000,
        specialties: ['Gaming Industry', 'Esports Marketing', 'Thai Creator Network'],
        tier: 'growth',
        contactInfo: {
          primaryContact: 'Siriporn Thanakit',
          email: 'siri@thaigaminghub.co.th',
          phone: '+66-89-123-4567'
        },
        performance: {
          campaignsManaged: 67,
          avgROI: 4.9,
          clientRetention: 95,
          marketExpertise: 9.5
        },
        clients: [
          {
            id: 'client_006',
            name: 'Bangkok Gaming Studios',
            industry: 'Game Development',
            category: 'gaming',
            targetMarkets: ['Thailand'],
            monthlyBudget: 120000,
            objectives: ['Game Promotion', 'Player Acquisition', 'Community Engagement'],
            kpis: ['Game Downloads', 'Player Retention', 'Community Size'],
            campaignHistory: [
              { campaignId: 'camp_008', spend: 110000, roi: 5.8, performance: 'excellent' }
            ]
          },
          {
            id: 'client_007',
            name: 'Thai Esports League',
            industry: 'Esports',
            category: 'gaming',
            targetMarkets: ['Thailand'],
            monthlyBudget: 95000,
            objectives: ['Tournament Promotion', 'Sponsor Activation', 'Audience Growth'],
            kpis: ['Viewership', 'Sponsor Engagement', 'Tournament Participation'],
            campaignHistory: [
              { campaignId: 'camp_009', spend: 85000, roi: 4.2, performance: 'good' }
            ]
          }
        ],
        status: 'active',
        joinDate: new Date('2023-10-10')
      },
      {
        id: 'agency_004',
        name: 'Indonesia Creative Network',
        type: 'digital_specialist',
        headquarters: 'Jakarta',
        markets: ['Indonesia'],
        clientCount: 21,
        totalSpend: 1950000,
        specialties: ['Indonesian Market', 'Creative Campaigns', 'Multi-Platform Strategy'],
        tier: 'enterprise',
        contactInfo: {
          primaryContact: 'Andi Pratama',
          email: 'andi@idcreative.id',
          phone: '+62-812-345-6789'
        },
        performance: {
          campaignsManaged: 124,
          avgROI: 4.6,
          clientRetention: 90,
          marketExpertise: 9.3
        },
        clients: [
          {
            id: 'client_008',
            name: 'Jakarta Tech Ventures',
            industry: 'Technology',
            category: 'tech',
            targetMarkets: ['Indonesia'],
            monthlyBudget: 175000,
            objectives: ['Tech Product Launch', 'Developer Community', 'Market Education'],
            kpis: ['Product Awareness', 'Developer Signups', 'Community Engagement'],
            campaignHistory: [
              { campaignId: 'camp_010', spend: 160000, roi: 5.1, performance: 'excellent' }
            ]
          },
          {
            id: 'client_009',
            name: 'Indo FMCG Brands',
            industry: 'Consumer Goods',
            category: 'fmcg',
            targetMarkets: ['Indonesia'],
            monthlyBudget: 130000,
            objectives: ['Youth Market Penetration', 'Brand Awareness', 'Purchase Intent'],
            kpis: ['Brand Recall', 'Purchase Intent', 'Market Share'],
            campaignHistory: [
              { campaignId: 'camp_011', spend: 125000, roi: 3.8, performance: 'good' }
            ]
          }
        ],
        status: 'active',
        joinDate: new Date('2023-07-25')
      },
      {
        id: 'agency_005',
        name: 'APAC Growth Partners',
        type: 'full_service',
        headquarters: 'Hong Kong',
        markets: ['Hong Kong', 'Taiwan', 'South Korea', 'Japan'],
        clientCount: 16,
        totalSpend: 3200000,
        specialties: ['Cross-Market Campaigns', 'Premium Brands', 'Performance Marketing'],
        tier: 'enterprise',
        contactInfo: {
          primaryContact: 'Kim Min-jun',
          email: 'minjun@apacgrowth.com',
          phone: '+852-9876-5432'
        },
        performance: {
          campaignsManaged: 98,
          avgROI: 4.4,
          clientRetention: 94,
          marketExpertise: 8.9
        },
        clients: [
          {
            id: 'client_010',
            name: 'Premium Gaming Hardware',
            industry: 'Gaming Hardware',
            category: 'gaming',
            targetMarkets: ['Hong Kong', 'Taiwan', 'South Korea'],
            monthlyBudget: 280000,
            objectives: ['Product Launch', 'Gaming Community', 'Sales Growth'],
            kpis: ['Product Awareness', 'Sales Revenue', 'Community Engagement'],
            campaignHistory: [
              { campaignId: 'camp_012', spend: 250000, roi: 4.7, performance: 'excellent' }
            ]
          }
        ],
        status: 'active',
        joinDate: new Date('2023-06-12')
      }
    ];

    agencies.forEach(agency => {
      this.agencies.set(agency.id, agency);
    });

    console.log('✅ APAC agency network initialized');
  }

  // Setup agency dashboards with multi-client management
  private setupAgencyDashboards() {
    console.log('📊 Setting up agency dashboards...');

    Array.from(this.agencies.entries()).forEach(([agencyId, agency]) => {
      const dashboard: AgencyDashboard = {
        agencyId,
        clients: agency.clients,
        activeCampaigns: agency.performance.campaignsManaged,
        totalSpend: agency.totalSpend,
        totalROI: agency.performance.avgROI,
        marketPerformance: this.calculateMarketPerformance(agency),
        creatorNetwork: {
          totalCreators: this.calculateCreatorNetwork(agency.markets),
          activeCreators: Math.floor(this.calculateCreatorNetwork(agency.markets) * 0.7),
          topPerformers: this.getTopCreatorsForMarkets(agency.markets)
        },
        whiteLabel: {
          enabled: agency.tier === 'enterprise',
          brandingCustomization: {
            logo: agency.name,
            colors: this.getAgencyBrandColors(agency.type),
            customDomain: `${agency.name.toLowerCase().replace(/\s+/g, '')}.gamefluence.ai`
          },
          clientPortalAccess: true
        }
      };

      this.agencyDashboards.set(agencyId, dashboard);
    });

    console.log('✅ Agency dashboards configured');
  }

  // Calculate market performance for agency
  private calculateMarketPerformance(agency: APACAgency): any {
    const performance: any = {};
    
    agency.markets.forEach(market => {
      const marketClients = agency.clients.filter(client => 
        client.targetMarkets.includes(market)
      );
      
      const totalSpend = marketClients.reduce((sum, client) => 
        sum + client.monthlyBudget, 0
      );
      
      const avgROI = marketClients.reduce((sum, client) => {
        const clientROI = client.campaignHistory.reduce((roiSum, campaign) => 
          roiSum + campaign.roi, 0
        ) / client.campaignHistory.length;
        return sum + clientROI;
      }, 0) / marketClients.length;

      performance[market] = {
        spend: totalSpend,
        roi: avgROI || 0,
        campaigns: marketClients.reduce((sum, client) => 
          sum + client.campaignHistory.length, 0
        )
      };
    });

    return performance;
  }

  // Calculate creator network size for markets
  private calculateCreatorNetwork(markets: string[]): number {
    const creatorCounts: { [key: string]: number } = {
      'Vietnam': 1250,
      'Thailand': 980,
      'Indonesia': 1850,
      'Singapore': 420,
      'Malaysia': 680,
      'Hong Kong': 320,
      'Taiwan': 540,
      'South Korea': 890,
      'Japan': 1200
    };

    return markets.reduce((total, market) => 
      total + (creatorCounts[market] || 100), 0
    );
  }

  // Get top creators for markets
  private getTopCreatorsForMarkets(markets: string[]): string[] {
    const topCreators: { [key: string]: string[] } = {
      'Vietnam': ['Viruss', 'Độ Mixi', 'Xemesis'],
      'Thailand': ['OhmFluke', 'Kaykai Salaider', 'GamingGangster'],
      'Indonesia': ['Jess No Limit', 'MiawAug', 'Frost Diamond'],
      'Singapore': ['SGGamer Pro', 'Lion City Gaming'],
      'Malaysia': ['MYGaming Hub', 'KL Streamers']
    };

    const allTopCreators = markets.flatMap(market => 
      topCreators[market] || []
    );

    return Array.from(new Set(allTopCreators)).slice(0, 5);
  }

  // Get agency brand colors based on type
  private getAgencyBrandColors(type: string): any {
    const colorSchemes = {
      'full_service': { primary: '#2563eb', secondary: '#1d4ed8' },
      'digital_specialist': { primary: '#7c3aed', secondary: '#6d28d9' },
      'gaming_focused': { primary: '#dc2626', secondary: '#b91c1c' },
      'regional_network': { primary: '#059669', secondary: '#047857' }
    };

    return colorSchemes[type as keyof typeof colorSchemes] || colorSchemes['full_service'];
  }

  // Public API methods
  getAgency(agencyId: string): APACAgency | undefined {
    return this.agencies.get(agencyId);
  }

  getAgencyDashboard(agencyId: string): AgencyDashboard | undefined {
    return this.agencyDashboards.get(agencyId);
  }

  getAllAgencies(): APACAgency[] {
    return Array.from(this.agencies.values());
  }

  getAgenciesByMarket(market: string): APACAgency[] {
    return Array.from(this.agencies.values()).filter(agency =>
      agency.markets.includes(market)
    );
  }

  getAgenciesByTier(tier: string): APACAgency[] {
    return Array.from(this.agencies.values()).filter(agency =>
      agency.tier === tier
    );
  }

  // Generate agency performance report
  generateAgencyReport(agencyId: string): any {
    const agency = this.agencies.get(agencyId);
    const dashboard = this.agencyDashboards.get(agencyId);

    if (!agency || !dashboard) return null;

    return {
      agency: {
        name: agency.name,
        type: agency.type,
        tier: agency.tier,
        markets: agency.markets
      },
      performance: {
        totalClients: agency.clientCount,
        totalSpend: agency.totalSpend,
        avgROI: agency.performance.avgROI,
        clientRetention: agency.performance.clientRetention,
        campaignsManaged: agency.performance.campaignsManaged
      },
      marketBreakdown: dashboard.marketPerformance,
      creatorNetwork: dashboard.creatorNetwork,
      topClients: agency.clients
        .sort((a, b) => b.monthlyBudget - a.monthlyBudget)
        .slice(0, 5)
        .map(client => ({
          name: client.name,
          industry: client.industry,
          budget: client.monthlyBudget,
          performance: this.calculateClientPerformance(client)
        })),
      recommendations: this.generateAgencyRecommendations(agency, dashboard)
    };
  }

  // Calculate client performance
  private calculateClientPerformance(client: BrandClient): any {
    const avgROI = client.campaignHistory.reduce((sum, campaign) => 
      sum + campaign.roi, 0
    ) / client.campaignHistory.length;
    
    const totalSpend = client.campaignHistory.reduce((sum, campaign) => 
      sum + campaign.spend, 0
    );

    return {
      avgROI,
      totalSpend,
      campaignCount: client.campaignHistory.length,
      performance: avgROI > 4.5 ? 'excellent' : avgROI > 3.5 ? 'good' : 'average'
    };
  }

  // Generate recommendations for agency
  private generateAgencyRecommendations(agency: APACAgency, dashboard: AgencyDashboard): string[] {
    const recommendations = [];

    // Market expansion recommendations
    if (agency.markets.length < 3) {
      recommendations.push('Consider expanding to additional APAC markets for growth');
    }

    // Creator network recommendations
    if (dashboard.creatorNetwork.activeCreators < 100) {
      recommendations.push('Expand creator network to improve campaign options');
    }

    // ROI optimization
    if (agency.performance.avgROI < 4.0) {
      recommendations.push('Focus on ROI optimization through better creator matching');
    }

    // Client retention
    if (agency.performance.clientRetention < 90) {
      recommendations.push('Implement client success programs to improve retention');
    }

    // White-label opportunities
    if (agency.tier === 'growth' && agency.clientCount > 15) {
      recommendations.push('Consider upgrading to enterprise tier for white-label features');
    }

    return recommendations;
  }
}

// Export singleton instance
export const agencyManagement = new AgencyManagementSystem();