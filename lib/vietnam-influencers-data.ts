// Vietnam Gaming Influencers Database - AI-Curated Data
export interface InfluencerProfile {
  id: string;
  name: string;
  handle: string;
  platform: 'YouTube' | 'TikTok' | 'Facebook Gaming';
  followers: number;
  avgViews: number;
  engagementRate: number;
  category: string[];
  tier: '20K' | '50K' | '100K' | '250K';
  demographics: {
    ageGroup: string;
    genderSplit: { male: number; female: number };
    topLocations: string[];
  };
  contentStyle: string[];
  avgCPM: number;
  estimatedCost: number;
  recentPerformance: {
    avgLikes: number;
    avgComments: number;
    avgShares: number;
  };
  gamingFocus: string[];
  brandSafety: number; // 1-10 scale
  responseRate: number; // percentage
  lastActive: string;
}

export const vietnamInfluencers: InfluencerProfile[] = [
  // 250K Tier - Premium Creators
  {
    id: 'vn-001',
    name: 'Minh Gaming Pro',
    handle: '@minhgamingpro',
    platform: 'YouTube',
    followers: 890000,
    avgViews: 245000,
    engagementRate: 8.7,
    category: ['Racing', 'Action', 'Reviews'],
    tier: '250K',
    demographics: {
      ageGroup: '18-34',
      genderSplit: { male: 78, female: 22 },
      topLocations: ['Ho Chi Minh City', 'Hanoi', 'Da Nang']
    },
    contentStyle: ['Gameplay', 'Reviews', 'Tutorials'],
    avgCPM: 3.20,
    estimatedCost: 8500,
    recentPerformance: {
      avgLikes: 18500,
      avgComments: 1240,
      avgShares: 890
    },
    gamingFocus: ['Mobile Racing', 'Car Games', 'Arcade'],
    brandSafety: 9,
    responseRate: 85,
    lastActive: '2024-03-15'
  },
  {
    id: 'vn-002',
    name: 'Linh Speed Queen',
    handle: '@linhspeedqueen',
    platform: 'TikTok',
    followers: 1200000,
    avgViews: 380000,
    engagementRate: 12.4,
    category: ['Racing', 'Lifestyle', 'Gaming'],
    tier: '250K',
    demographics: {
      ageGroup: '16-28',
      genderSplit: { male: 45, female: 55 },
      topLocations: ['Ho Chi Minh City', 'Hanoi', 'Can Tho']
    },
    contentStyle: ['Short-form', 'Viral', 'Challenges'],
    avgCPM: 2.80,
    estimatedCost: 12000,
    recentPerformance: {
      avgLikes: 45000,
      avgComments: 3200,
      avgShares: 2100
    },
    gamingFocus: ['Mobile Racing', 'Casual Games', 'Trending Games'],
    brandSafety: 8,
    responseRate: 92,
    lastActive: '2024-03-15'
  },
  {
    id: 'vn-003',
    name: 'Duc Car Master',
    handle: '@duccarmaster',
    platform: 'YouTube',
    followers: 750000,
    avgViews: 185000,
    engagementRate: 9.2,
    category: ['Racing', 'Car Culture', 'Gaming'],
    tier: '250K',
    demographics: {
      ageGroup: '20-35',
      genderSplit: { male: 82, female: 18 },
      topLocations: ['Ho Chi Minh City', 'Hanoi', 'Hai Phong']
    },
    contentStyle: ['Long-form', 'Educational', 'Entertainment'],
    avgCPM: 3.50,
    estimatedCost: 7800,
    recentPerformance: {
      avgLikes: 15200,
      avgComments: 980,
      avgShares: 650
    },
    gamingFocus: ['Racing Simulators', 'Car Games', 'Mobile Racing'],
    brandSafety: 9,
    responseRate: 78,
    lastActive: '2024-03-14'
  },

  // 100K Tier - High-Value Creators
  {
    id: 'vn-004',
    name: 'Tuan Mobile Gamer',
    handle: '@tuanmobilegamer',
    platform: 'TikTok',
    followers: 580000,
    avgViews: 125000,
    engagementRate: 11.8,
    category: ['Mobile Gaming', 'Racing', 'Action'],
    tier: '100K',
    demographics: {
      ageGroup: '18-30',
      genderSplit: { male: 70, female: 30 },
      topLocations: ['Ho Chi Minh City', 'Da Nang', 'Hanoi']
    },
    contentStyle: ['Quick Tips', 'Gameplay', 'Reactions'],
    avgCPM: 2.40,
    estimatedCost: 4200,
    recentPerformance: {
      avgLikes: 12800,
      avgComments: 850,
      avgShares: 420
    },
    gamingFocus: ['Mobile Racing', 'Arcade Games', 'Casual Gaming'],
    brandSafety: 8,
    responseRate: 88,
    lastActive: '2024-03-15'
  },
  {
    id: 'vn-005',
    name: 'Anh Racing Legend',
    handle: '@anhracinglegend',
    platform: 'YouTube',
    followers: 420000,
    avgViews: 95000,
    engagementRate: 7.9,
    category: ['Racing', 'Gaming', 'Tech'],
    tier: '100K',
    demographics: {
      ageGroup: '22-38',
      genderSplit: { male: 85, female: 15 },
      topLocations: ['Hanoi', 'Ho Chi Minh City', 'Hue']
    },
    contentStyle: ['Reviews', 'Gameplay', 'Comparisons'],
    avgCPM: 3.10,
    estimatedCost: 3800,
    recentPerformance: {
      avgLikes: 7200,
      avgComments: 480,
      avgShares: 290
    },
    gamingFocus: ['Racing Games', 'Mobile Gaming', 'Game Reviews'],
    brandSafety: 9,
    responseRate: 82,
    lastActive: '2024-03-15'
  },

  // 50K Tier - Growing Creators
  {
    id: 'vn-006',
    name: 'Mai Game Girl',
    handle: '@maigamegirl',
    platform: 'TikTok',
    followers: 280000,
    avgViews: 65000,
    engagementRate: 13.2,
    category: ['Gaming', 'Lifestyle', 'Racing'],
    tier: '50K',
    demographics: {
      ageGroup: '16-25',
      genderSplit: { male: 35, female: 65 },
      topLocations: ['Ho Chi Minh City', 'Hanoi', 'Da Nang']
    },
    contentStyle: ['Trendy', 'Fun', 'Relatable'],
    avgCPM: 2.20,
    estimatedCost: 2100,
    recentPerformance: {
      avgLikes: 8500,
      avgComments: 620,
      avgShares: 380
    },
    gamingFocus: ['Mobile Games', 'Casual Racing', 'Social Gaming'],
    brandSafety: 8,
    responseRate: 90,
    lastActive: '2024-03-15'
  },
  {
    id: 'vn-007',
    name: 'Khang Speed Demon',
    handle: '@khangspeeddemon',
    platform: 'YouTube',
    followers: 195000,
    avgViews: 42000,
    engagementRate: 8.5,
    category: ['Racing', 'Action', 'Gaming'],
    tier: '50K',
    demographics: {
      ageGroup: '18-32',
      genderSplit: { male: 75, female: 25 },
      topLocations: ['Da Nang', 'Ho Chi Minh City', 'Nha Trang']
    },
    contentStyle: ['High-energy', 'Competitive', 'Entertaining'],
    avgCPM: 2.90,
    estimatedCost: 1800,
    recentPerformance: {
      avgLikes: 3200,
      avgComments: 280,
      avgShares: 150
    },
    gamingFocus: ['Racing Games', 'Competitive Gaming', 'Mobile Racing'],
    brandSafety: 8,
    responseRate: 85,
    lastActive: '2024-03-14'
  },

  // 20K Tier - Emerging Creators
  {
    id: 'vn-008',
    name: 'Huy Arcade Master',
    handle: '@huyarcademaster',
    platform: 'TikTok',
    followers: 125000,
    avgViews: 28000,
    engagementRate: 14.8,
    category: ['Arcade', 'Retro Gaming', 'Racing'],
    tier: '20K',
    demographics: {
      ageGroup: '18-28',
      genderSplit: { male: 68, female: 32 },
      topLocations: ['Ho Chi Minh City', 'Hanoi', 'Can Tho']
    },
    contentStyle: ['Nostalgic', 'Fun', 'Creative'],
    avgCPM: 1.80,
    estimatedCost: 850,
    recentPerformance: {
      avgLikes: 4100,
      avgComments: 320,
      avgShares: 180
    },
    gamingFocus: ['Arcade Games', 'Retro Racing', 'Mobile Classics'],
    brandSafety: 9,
    responseRate: 95,
    lastActive: '2024-03-15'
  },
  {
    id: 'vn-009',
    name: 'Thao Racing Rookie',
    handle: '@thaoracingrookie',
    platform: 'YouTube',
    followers: 89000,
    avgViews: 18500,
    engagementRate: 9.7,
    category: ['Racing', 'Beginner Gaming', 'Tutorials'],
    tier: '20K',
    demographics: {
      ageGroup: '16-26',
      genderSplit: { male: 45, female: 55 },
      topLocations: ['Hanoi', 'Ho Chi Minh City', 'Hai Phong']
    },
    contentStyle: ['Educational', 'Beginner-friendly', 'Encouraging'],
    avgCPM: 2.10,
    estimatedCost: 650,
    recentPerformance: {
      avgLikes: 1800,
      avgComments: 150,
      avgShares: 85
    },
    gamingFocus: ['Racing Tutorials', 'Mobile Gaming', 'Beginner Content'],
    brandSafety: 10,
    responseRate: 92,
    lastActive: '2024-03-15'
  },
  {
    id: 'vn-010',
    name: 'Nam Drift King',
    handle: '@namdriftking',
    platform: 'TikTok',
    followers: 156000,
    avgViews: 35000,
    engagementRate: 12.1,
    category: ['Racing', 'Car Culture', 'Gaming'],
    tier: '20K',
    demographics: {
      ageGroup: '20-30',
      genderSplit: { male: 80, female: 20 },
      topLocations: ['Ho Chi Minh City', 'Da Nang', 'Vung Tau']
    },
    contentStyle: ['Action-packed', 'Skillful', 'Impressive'],
    avgCPM: 1.95,
    estimatedCost: 920,
    recentPerformance: {
      avgLikes: 4200,
      avgComments: 280,
      avgShares: 160
    },
    gamingFocus: ['Drift Racing', 'Car Games', 'Mobile Racing'],
    brandSafety: 8,
    responseRate: 87,
    lastActive: '2024-03-15'
  }
];

// Campaign Budget Tiers
export const campaignTiers = {
  '20K': {
    budget: 20000,
    targetInfluencers: 15,
    expectedReach: 2500000,
    estimatedCPA: 2.40,
    expectedDownloads: 8333
  },
  '50K': {
    budget: 50000,
    targetInfluencers: 12,
    expectedReach: 6200000,
    estimatedCPA: 2.20,
    expectedDownloads: 22727
  },
  '100K': {
    budget: 100000,
    targetInfluencers: 10,
    expectedReach: 12500000,
    estimatedCPA: 2.00,
    expectedDownloads: 50000
  },
  '250K': {
    budget: 250000,
    targetInfluencers: 8,
    expectedReach: 28000000,
    estimatedCPA: 1.80,
    expectedDownloads: 138889
  }
};

// AI-powered matching algorithm
export function getRecommendedInfluencers(
  budget: number,
  targetAudience: string[],
  campaignGoals: string[]
): InfluencerProfile[] {
  // Simulate AI matching based on budget, audience, and goals
  const tier = budget <= 20000 ? '20K' : 
               budget <= 50000 ? '50K' : 
               budget <= 100000 ? '100K' : '250K';
  
  return vietnamInfluencers
    .filter(influencer => influencer.tier === tier)
    .sort((a, b) => {
      // AI scoring based on engagement, brand safety, and relevance
      const scoreA = (a.engagementRate * 0.4) + (a.brandSafety * 0.3) + (a.responseRate * 0.3);
      const scoreB = (b.engagementRate * 0.4) + (b.brandSafety * 0.3) + (b.responseRate * 0.3);
      return scoreB - scoreA;
    });
}