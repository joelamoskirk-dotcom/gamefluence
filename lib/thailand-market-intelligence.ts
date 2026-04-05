// Thailand Gaming Market Intelligence
// Comprehensive data for Thai gaming influencer campaigns

export interface ThaiCreator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  tier: 'mega' | 'macro' | 'micro' | 'nano';
  followers: number;
  engagement: number;
  avgViews: number;
  demographics: {
    ageGroups: { [key: string]: number };
    gender: { male: number; female: number };
    locations: { [key: string]: number };
  };
  gameGenres: string[];
  platforms: string[];
  rates: {
    postRate: number;
    storyRate: number;
    videoRate: number;
    streamRate: number;
  };
  brandSafety: number;
  responseTime: string;
  languages: string[];
  recentCampaigns: string[];
}

export interface ThaiMarketData {
  totalGamers: number;
  mobileGamers: number;
  avgSpending: number;
  topGenres: { genre: string; share: number }[];
  demographics: {
    ageGroups: { [key: string]: number };
    gender: { male: number; female: number };
    income: { [key: string]: number };
  };
  platforms: { platform: string; users: number; growth: number }[];
  seasonality: { month: string; activity: number }[];
}

// Thai Gaming Market Overview
export const thailandMarketData: ThaiMarketData = {
  totalGamers: 32000000,
  mobileGamers: 28800000,
  avgSpending: 1250, // THB per year
  topGenres: [
    { genre: 'Mobile RPG', share: 28 },
    { genre: 'Battle Royale', share: 22 },
    { genre: 'Music/Rhythm', share: 18 },
    { genre: 'Puzzle/Casual', share: 15 },
    { genre: 'Racing', share: 12 },
    { genre: 'Strategy', share: 5 }
  ],
  demographics: {
    ageGroups: {
      '13-17': 15,
      '18-24': 35,
      '25-34': 28,
      '35-44': 15,
      '45+': 7
    },
    gender: { male: 58, female: 42 },
    income: {
      'Low (< 15K THB)': 25,
      'Middle (15K-40K THB)': 45,
      'High (40K+ THB)': 30
    }
  },
  platforms: [
    { platform: 'YouTube', users: 25000000, growth: 12 },
    { platform: 'TikTok', users: 22000000, growth: 28 },
    { platform: 'Facebook Gaming', users: 18000000, growth: 8 },
    { platform: 'Twitch', users: 3500000, growth: 35 },
    { platform: 'Instagram', users: 20000000, growth: 15 }
  ],
  seasonality: [
    { month: 'Jan', activity: 95 },
    { month: 'Feb', activity: 88 },
    { month: 'Mar', activity: 92 },
    { month: 'Apr', activity: 110 }, // Songkran holiday
    { month: 'May', activity: 98 },
    { month: 'Jun', activity: 102 },
    { month: 'Jul', activity: 105 }, // School holidays
    { month: 'Aug', activity: 100 },
    { month: 'Sep', activity: 95 },
    { month: 'Oct', activity: 108 }, // Gaming season
    { month: 'Nov', activity: 112 }, // Peak gaming
    { month: 'Dec', activity: 118 }  // Holiday peak
  ]
};

// Top Thai Gaming Creators Database
export const thaiCreators: ThaiCreator[] = [
  {
    id: 'creator-th-001',
    name: 'GamingWithPat',
    handle: '@gamingwithpat',
    avatar: '/avatars/pat-thai.jpg',
    tier: 'mega',
    followers: 2800000,
    engagement: 8.5,
    avgViews: 450000,
    demographics: {
      ageGroups: { '13-17': 25, '18-24': 40, '25-34': 25, '35+': 10 },
      gender: { male: 65, female: 35 },
      locations: { 'Bangkok': 35, 'Chiang Mai': 15, 'Phuket': 12, 'Other Thailand': 28, 'SEA': 10 }
    },
    gameGenres: ['Mobile RPG', 'Battle Royale', 'Racing'],
    platforms: ['YouTube', 'TikTok', 'Facebook Gaming'],
    rates: {
      postRate: 180000,
      storyRate: 85000,
      videoRate: 320000,
      streamRate: 150000
    },
    brandSafety: 95,
    responseTime: '2-4 hours',
    languages: ['Thai', 'English'],
    recentCampaigns: ['Garena RoV', 'PUBG Mobile', 'Mobile Legends']
  },
  {
    id: 'creator-th-002',
    name: 'MusicGameQueen',
    handle: '@musicgamequeen',
    avatar: '/avatars/queen-thai.jpg',
    tier: 'macro',
    followers: 1200000,
    engagement: 12.3,
    avgViews: 280000,
    demographics: {
      ageGroups: { '13-17': 35, '18-24': 35, '25-34': 20, '35+': 10 },
      gender: { male: 25, female: 75 },
      locations: { 'Bangkok': 40, 'Chiang Mai': 18, 'Pattaya': 10, 'Other Thailand': 25, 'SEA': 7 }
    },
    gameGenres: ['Music/Rhythm', 'Puzzle/Casual', 'Mobile RPG'],
    platforms: ['TikTok', 'YouTube', 'Instagram'],
    rates: {
      postRate: 95000,
      storyRate: 45000,
      videoRate: 165000,
      streamRate: 85000
    },
    brandSafety: 98,
    responseTime: '1-2 hours',
    languages: ['Thai', 'English'],
    recentCampaigns: ['Piano Tiles', 'Beat Fever', 'Candy Crush']
  },
  {
    id: 'creator-th-003',
    name: 'ThaiGamerPro',
    handle: '@thaigamerpro',
    avatar: '/avatars/pro-thai.jpg',
    tier: 'macro',
    followers: 850000,
    engagement: 9.8,
    avgViews: 195000,
    demographics: {
      ageGroups: { '13-17': 20, '18-24': 45, '25-34': 25, '35+': 10 },
      gender: { male: 70, female: 30 },
      locations: { 'Bangkok': 30, 'Chiang Mai': 20, 'Phuket': 8, 'Other Thailand': 32, 'SEA': 10 }
    },
    gameGenres: ['Battle Royale', 'Strategy', 'Racing'],
    platforms: ['YouTube', 'Twitch', 'Facebook Gaming'],
    rates: {
      postRate: 75000,
      storyRate: 35000,
      videoRate: 135000,
      streamRate: 95000
    },
    brandSafety: 92,
    responseTime: '3-6 hours',
    languages: ['Thai', 'English'],
    recentCampaigns: ['Free Fire', 'Call of Duty Mobile', 'Racing Master']
  },
  {
    id: 'creator-th-004',
    name: 'CasualGamerGirl',
    handle: '@casualgamergirl',
    avatar: '/avatars/casual-thai.jpg',
    tier: 'micro',
    followers: 320000,
    engagement: 15.2,
    avgViews: 85000,
    demographics: {
      ageGroups: { '13-17': 30, '18-24': 40, '25-34': 20, '35+': 10 },
      gender: { male: 20, female: 80 },
      locations: { 'Bangkok': 45, 'Chiang Mai': 15, 'Other Thailand': 35, 'SEA': 5 }
    },
    gameGenres: ['Puzzle/Casual', 'Music/Rhythm', 'Mobile RPG'],
    platforms: ['TikTok', 'Instagram', 'YouTube'],
    rates: {
      postRate: 28000,
      storyRate: 15000,
      videoRate: 48000,
      streamRate: 25000
    },
    brandSafety: 96,
    responseTime: '30 minutes - 1 hour',
    languages: ['Thai'],
    recentCampaigns: ['Homescapes', 'Gardenscapes', 'Coin Master']
  },
  {
    id: 'creator-th-005',
    name: 'BangkokStreamer',
    handle: '@bangkokstreamer',
    avatar: '/avatars/bangkok-thai.jpg',
    tier: 'micro',
    followers: 180000,
    engagement: 18.5,
    avgViews: 52000,
    demographics: {
      ageGroups: { '13-17': 15, '18-24': 50, '25-34': 25, '35+': 10 },
      gender: { male: 60, female: 40 },
      locations: { 'Bangkok': 60, 'Other Thailand': 30, 'SEA': 10 }
    },
    gameGenres: ['Battle Royale', 'Mobile RPG', 'Strategy'],
    platforms: ['Twitch', 'YouTube', 'TikTok'],
    rates: {
      postRate: 18000,
      storyRate: 8500,
      videoRate: 32000,
      streamRate: 22000
    },
    brandSafety: 89,
    responseTime: '1-3 hours',
    languages: ['Thai', 'English'],
    recentCampaigns: ['Arena of Valor', 'Mobile Legends', 'Clash Royale']
  }
];

// Campaign Performance Predictions
export interface CampaignPrediction {
  totalReach: number;
  engagementRate: number;
  estimatedViews: number;
  clickThroughRate: number;
  conversionRate: number;
  estimatedDownloads: number;
  revenueImpact: number;
  brandAwareness: number;
  audienceOverlap: number;
}

export function calculateCampaignPrediction(
  selectedCreators: string[],
  campaignBudget: number,
  gameGenre: string
): CampaignPrediction {
  const creators = thaiCreators.filter(c => selectedCreators.includes(c.id));
  
  const totalFollowers = creators.reduce((sum, c) => sum + c.followers, 0);
  const avgEngagement = creators.reduce((sum, c) => sum + c.engagement, 0) / creators.length;
  const totalViews = creators.reduce((sum, c) => sum + c.avgViews, 0);
  
  // Genre-specific multipliers
  const genreMultipliers: { [key: string]: number } = {
    'Mobile RPG': 1.2,
    'Battle Royale': 1.4,
    'Music/Rhythm': 1.1,
    'Puzzle/Casual': 0.9,
    'Racing': 1.0,
    'Strategy': 0.8
  };
  
  const genreMultiplier = genreMultipliers[gameGenre] || 1.0;
  
  // Calculate audience overlap (diminishing returns)
  const overlapFactor = Math.max(0.6, 1 - (creators.length - 1) * 0.15);
  
  const prediction: CampaignPrediction = {
    totalReach: Math.round(totalFollowers * overlapFactor),
    engagementRate: avgEngagement,
    estimatedViews: Math.round(totalViews * genreMultiplier),
    clickThroughRate: 2.8 + (avgEngagement * 0.3),
    conversionRate: 1.2 + (genreMultiplier * 0.5),
    estimatedDownloads: Math.round((totalViews * genreMultiplier * 0.028 * (1.2 + genreMultiplier * 0.5)) / 100),
    revenueImpact: Math.round(campaignBudget * (2.5 + genreMultiplier)),
    brandAwareness: Math.round(Math.min(95, (totalFollowers * overlapFactor) / 10000)),
    audienceOverlap: Math.round((1 - overlapFactor) * 100)
  };
  
  return prediction;
}

// Thai Gaming Companies Database
export const thaiGamingCompanies = [
  {
    id: 'amanotes',
    name: 'Amanotes',
    type: 'Music Gaming Studio',
    headquarters: 'Ho Chi Minh City (Thai Office: Bangkok)',
    games: ['Piano Tiles', 'Beat Fever', 'Dancing Road', 'Magic Tiles'],
    monthlyUsers: 15000000,
    targetAudience: 'Casual music game players, 13-35 years',
    marketFocus: ['Thailand', 'Vietnam', 'Indonesia', 'Philippines'],
    typicalBudget: '$50K - $200K',
    campaignGoals: ['User Acquisition', 'Brand Awareness', 'Engagement']
  },
  {
    id: 'garena',
    name: 'Garena (Sea Limited)',
    type: 'Gaming Platform & Publisher',
    headquarters: 'Singapore (Thai Office: Bangkok)',
    games: ['Free Fire', 'Arena of Valor', 'Call of Duty Mobile'],
    monthlyUsers: 45000000,
    targetAudience: 'Competitive gamers, 16-30 years',
    marketFocus: ['Thailand', 'Vietnam', 'Indonesia', 'Malaysia', 'Philippines'],
    typicalBudget: '$100K - $500K',
    campaignGoals: ['User Acquisition', 'Tournament Promotion', 'Retention']
  },
  {
    id: 'true-digital',
    name: 'True Digital Group',
    type: 'Digital Entertainment Conglomerate',
    headquarters: 'Bangkok, Thailand',
    games: ['True Gaming Platform', 'Esports Events'],
    monthlyUsers: 8000000,
    targetAudience: 'Thai gamers, all demographics',
    marketFocus: ['Thailand'],
    typicalBudget: '$25K - $150K',
    campaignGoals: ['Platform Growth', 'Local Engagement', 'Esports Promotion']
  }
];

// Market Intelligence Insights
export const thailandInsights = {
  bestPerformingGenres: [
    'Music/Rhythm games see 40% higher engagement in Thailand',
    'Battle Royale games peak during evening hours (7-11 PM)',
    'Mobile RPG campaigns perform best with female creators',
    'Casual puzzle games have highest conversion rates among 25-35 age group'
  ],
  seasonalTrends: [
    'Gaming activity increases 25% during Songkran (April)',
    'School holidays (July-August) show 20% higher engagement',
    'Year-end holidays (December) are peak gaming season',
    'Rainy season (June-October) favors indoor gaming content'
  ],
  culturalConsiderations: [
    'Thai creators prefer collaborative content over competitive',
    'Family-friendly content performs better than mature themes',
    'Local language content gets 3x higher engagement',
    'Buddhist holidays may affect campaign timing'
  ],
  platformPreferences: [
    'TikTok dominates among Gen Z Thai gamers',
    'YouTube remains king for gaming tutorials',
    'Facebook Gaming strong for live streaming',
    'Instagram effective for lifestyle gaming content'
  ]
};