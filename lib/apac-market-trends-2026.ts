// APAC Gaming Market Trends 2026 - Latest Intelligence
// Based on Sensor Tower, Stream Hatchet, Escharts, and industry data
// Sources: Sensor Tower SEA Report 2025, Stream Hatchet YouTube Gaming 2025,
// Escharts Mobile Esports 2025, AnyMind APAC Influencer Marketing Report 2026

export interface MarketTrendData {
  market: string;
  countryCode: string;
  q1Downloads: number; // millions
  yoyGrowth: number; // percentage
  iapRevenue: number; // USD millions
  topGenres: GenreTrend[];
  streamingHours: StreamingMetrics;
  influencerMetrics: InfluencerMarketMetrics;
  strategicInsight: string;
}

export interface GenreTrend {
  genre: string;
  downloadShare: number; // percentage
  revenueShare: number; // percentage
  yoyGrowth: number;
  hoursWatched: number; // millions
  topTitles: string[];
  trend: 'rising' | 'stable' | 'declining';
}

export interface StreamingMetrics {
  totalHoursWatched: number; // millions per quarter
  twitchShare: number;
  youtubeShare: number;
  tiktokLiveShare: number;
  avgConcurrentViewers: number;
  peakViewers: number;
  topStreamedGames: string[];
}

export interface InfluencerMarketMetrics {
  totalSpend: number; // USD millions
  avgCampaignROI: number;
  outcomeDrivenShare: number; // percentage of campaigns focused on outcomes vs awareness
  avgCreatorRate: { micro: number; mid: number; macro: number; mega: number };
  platformSplit: { youtube: number; tiktok: number; twitch: number; instagram: number };
}

export interface MarketInsightText {
  id: string;
  category: 'market_overview' | 'genre_analysis' | 'attention_economy' | 'strategic_recommendation';
  title: string;
  summary: string;
  detail: string;
  dataPoints: string[];
  confidence: number;
  lastUpdated: string;
  exportable: boolean;
}

export interface APACCampaignBrief {
  campaignName: string;
  objective: string;
  totalBudget: number;
  duration: string;
  markets: CampaignMarketAllocation[];
  genreStrategy: GenreStrategy[];
  creatorStrategy: CreatorAllocationStrategy;
  kpis: CampaignKPI[];
  strategicNarrative: string;
  riskFactors: string[];
  competitiveAdvantage: string[];
}

export interface CampaignMarketAllocation {
  market: string;
  countryCode: string;
  budgetAllocation: number;
  budgetPercentage: number;
  targetDownloads: number;
  creatorCount: number;
  primaryGenres: string[];
  rationale: string;
}

export interface GenreStrategy {
  genre: string;
  budgetShare: number;
  targetAudience: string;
  contentFormat: string[];
  expectedROI: number;
  rationale: string;
}

export interface CreatorAllocationStrategy {
  totalCreators: number;
  tierBreakdown: { mega: number; macro: number; mid: number; micro: number };
  budgetSplit: { mega: number; macro: number; mid: number; micro: number };
  selectionCriteria: string[];
}

export interface CampaignKPI {
  metric: string;
  target: number;
  unit: string;
  benchmark: number;
  stretch: number;
}

// ── MARKET TREND DATA (2025-2026 Latest) ──────────────────────────────────────

export const apacMarketTrends: MarketTrendData[] = [
  {
    market: 'Indonesia',
    countryCode: 'ID',
    q1Downloads: 870,
    yoyGrowth: 9,
    iapRevenue: 142,
    topGenres: [
      { genre: 'Arcade & Simulation', downloadShare: 28, revenueShare: 8, yoyGrowth: 14, hoursWatched: 320, topTitles: ['Stumble Guys', 'Subway Surfers'], trend: 'rising' },
      { genre: 'Battle Royale', downloadShare: 18, revenueShare: 22, yoyGrowth: 3, hoursWatched: 890, topTitles: ['Free Fire', 'PUBG Mobile'], trend: 'stable' },
      { genre: 'MOBA', downloadShare: 12, revenueShare: 35, yoyGrowth: 7, hoursWatched: 1200, topTitles: ['Mobile Legends: Bang Bang', 'Arena of Valor'], trend: 'rising' },
      { genre: 'Strategy & RPG', downloadShare: 15, revenueShare: 28, yoyGrowth: 11, hoursWatched: 280, topTitles: ['Genshin Impact', 'Honkai: Star Rail'], trend: 'rising' },
    ],
    streamingHours: {
      totalHoursWatched: 2800,
      twitchShare: 12,
      youtubeShare: 58,
      tiktokLiveShare: 25,
      avgConcurrentViewers: 420000,
      peakViewers: 5594138,
      topStreamedGames: ['Mobile Legends', 'Free Fire', 'PUBG Mobile', 'Genshin Impact'],
    },
    influencerMetrics: {
      totalSpend: 185,
      avgCampaignROI: 4.2,
      outcomeDrivenShare: 42,
      avgCreatorRate: { micro: 150, mid: 800, macro: 3500, mega: 15000 },
      platformSplit: { youtube: 45, tiktok: 32, twitch: 8, instagram: 15 },
    },
    strategicInsight: 'Indonesia remains the volume leader with 870M downloads in Q1 2025 (+9% QoQ). MOBA dominates revenue while Arcade drives installs. Mobile Legends ecosystem is the primary attention anchor with record-breaking 5.59M peak concurrent viewers at M7 World Championship.',
  },
  {
    market: 'Philippines',
    countryCode: 'PH',
    q1Downloads: 366,
    yoyGrowth: -1,
    iapRevenue: 98,
    topGenres: [
      { genre: 'MOBA', downloadShare: 22, revenueShare: 42, yoyGrowth: 5, hoursWatched: 980, topTitles: ['Mobile Legends: Bang Bang', 'League of Legends: Wild Rift'], trend: 'rising' },
      { genre: 'Battle Royale', downloadShare: 16, revenueShare: 18, yoyGrowth: -2, hoursWatched: 540, topTitles: ['PUBG Mobile', 'Free Fire'], trend: 'stable' },
      { genre: 'Casual & Puzzle', downloadShare: 25, revenueShare: 12, yoyGrowth: 8, hoursWatched: 120, topTitles: ['Candy Crush', 'Royal Match'], trend: 'rising' },
      { genre: 'RPG', downloadShare: 14, revenueShare: 22, yoyGrowth: 15, hoursWatched: 210, topTitles: ['Genshin Impact', 'Ragnarok Origin'], trend: 'rising' },
    ],
    streamingHours: {
      totalHoursWatched: 1900,
      twitchShare: 10,
      youtubeShare: 52,
      tiktokLiveShare: 30,
      avgConcurrentViewers: 310000,
      peakViewers: 2100000,
      topStreamedGames: ['Mobile Legends', 'Valorant', 'PUBG Mobile', 'League of Legends: Wild Rift'],
    },
    influencerMetrics: {
      totalSpend: 120,
      avgCampaignROI: 3.8,
      outcomeDrivenShare: 38,
      avgCreatorRate: { micro: 100, mid: 600, macro: 2800, mega: 12000 },
      platformSplit: { youtube: 40, tiktok: 35, twitch: 7, instagram: 18 },
    },
    strategicInsight: 'Philippines is the MOBA heartland of SEA with Mobile Legends commanding 42% of IAP revenue. Community-driven content and family gaming culture create high engagement. TikTok Live growing fastest as a discovery platform for gaming creators.',
  },
  {
    market: 'Vietnam',
    countryCode: 'VN',
    q1Downloads: 329,
    yoyGrowth: 12,
    iapRevenue: 118,
    topGenres: [
      { genre: 'MOBA', downloadShare: 20, revenueShare: 30, yoyGrowth: 8, hoursWatched: 720, topTitles: ['Arena of Valor', 'Mobile Legends'], trend: 'rising' },
      { genre: 'Strategy', downloadShare: 18, revenueShare: 25, yoyGrowth: 12, hoursWatched: 340, topTitles: ['Rise of Kingdoms', 'Clash of Clans'], trend: 'rising' },
      { genre: 'Shooters', downloadShare: 15, revenueShare: 20, yoyGrowth: 6, hoursWatched: 580, topTitles: ['Free Fire', 'CrossFire Mobile'], trend: 'stable' },
      { genre: 'Racing & Sports', downloadShare: 12, revenueShare: 10, yoyGrowth: 22, hoursWatched: 180, topTitles: ['Asphalt 9', 'EA Sports FC Mobile'], trend: 'rising' },
    ],
    streamingHours: {
      totalHoursWatched: 1650,
      twitchShare: 8,
      youtubeShare: 48,
      tiktokLiveShare: 35,
      avgConcurrentViewers: 280000,
      peakViewers: 1800000,
      topStreamedGames: ['Arena of Valor', 'Free Fire', 'Lien Quan Mobile', 'PUBG Mobile'],
    },
    influencerMetrics: {
      totalSpend: 95,
      avgCampaignROI: 4.8,
      outcomeDrivenShare: 45,
      avgCreatorRate: { micro: 80, mid: 450, macro: 2200, mega: 9000 },
      platformSplit: { youtube: 38, tiktok: 40, twitch: 6, instagram: 16 },
    },
    strategicInsight: 'Vietnam shows the fastest download growth in SEA (+12% YoY) with highest ROI for influencer campaigns (4.8x). Racing & Sports genre growing 22% YoY — strong alignment with Gamefluence racing campaign expertise. TikTok Live now the primary discovery platform.',
  },
  {
    market: 'Thailand',
    countryCode: 'TH',
    q1Downloads: 245,
    yoyGrowth: 4,
    iapRevenue: 162,
    topGenres: [
      { genre: 'Strategy & RPG', downloadShare: 22, revenueShare: 38, yoyGrowth: 9, hoursWatched: 380, topTitles: ['Genshin Impact', 'Honkai: Star Rail', 'Rise of Kingdoms'], trend: 'rising' },
      { genre: 'Shooters', downloadShare: 18, revenueShare: 24, yoyGrowth: 5, hoursWatched: 620, topTitles: ['Valorant', 'PUBG Mobile', 'Free Fire'], trend: 'stable' },
      { genre: 'MOBA', downloadShare: 15, revenueShare: 20, yoyGrowth: 3, hoursWatched: 540, topTitles: ['Mobile Legends', 'RoV (Arena of Valor)'], trend: 'stable' },
      { genre: 'Casual & Simulation', downloadShare: 20, revenueShare: 8, yoyGrowth: 12, hoursWatched: 90, topTitles: ['Roblox', 'Stumble Guys'], trend: 'rising' },
    ],
    streamingHours: {
      totalHoursWatched: 1400,
      twitchShare: 15,
      youtubeShare: 55,
      tiktokLiveShare: 22,
      avgConcurrentViewers: 220000,
      peakViewers: 1500000,
      topStreamedGames: ['Valorant', 'Mobile Legends', 'RoV', 'Genshin Impact'],
    },
    influencerMetrics: {
      totalSpend: 145,
      avgCampaignROI: 3.5,
      outcomeDrivenShare: 40,
      avgCreatorRate: { micro: 200, mid: 1000, macro: 4500, mega: 18000 },
      platformSplit: { youtube: 50, tiktok: 28, twitch: 12, instagram: 10 },
    },
    strategicInsight: 'Thailand leads SEA in IAP revenue ($162M in Q1 2025) despite lower download volume — indicating premium spending behavior. Strategy & RPG dominate revenue. Higher creator rates reflect quality-focused market. Twitch has strongest share in SEA here (15%).',
  },
  {
    market: 'Malaysia',
    countryCode: 'MY',
    q1Downloads: 185,
    yoyGrowth: 6,
    iapRevenue: 78,
    topGenres: [
      { genre: 'MOBA', downloadShare: 20, revenueShare: 32, yoyGrowth: 4, hoursWatched: 420, topTitles: ['Mobile Legends', 'League of Legends: Wild Rift'], trend: 'stable' },
      { genre: 'Racing & Sports', downloadShare: 14, revenueShare: 15, yoyGrowth: 18, hoursWatched: 150, topTitles: ['EA Sports FC Mobile', 'Asphalt 9'], trend: 'rising' },
      { genre: 'Strategy', downloadShare: 16, revenueShare: 22, yoyGrowth: 8, hoursWatched: 180, topTitles: ['Rise of Kingdoms', 'Clash Royale'], trend: 'rising' },
      { genre: 'Shooters', downloadShare: 15, revenueShare: 18, yoyGrowth: 2, hoursWatched: 380, topTitles: ['PUBG Mobile', 'Valorant'], trend: 'stable' },
    ],
    streamingHours: {
      totalHoursWatched: 820,
      twitchShare: 14,
      youtubeShare: 50,
      tiktokLiveShare: 28,
      avgConcurrentViewers: 95000,
      peakViewers: 680000,
      topStreamedGames: ['Mobile Legends', 'Valorant', 'PUBG Mobile', 'Dota 2'],
    },
    influencerMetrics: {
      totalSpend: 68,
      avgCampaignROI: 3.9,
      outcomeDrivenShare: 44,
      avgCreatorRate: { micro: 120, mid: 650, macro: 3000, mega: 13000 },
      platformSplit: { youtube: 42, tiktok: 30, twitch: 14, instagram: 14 },
    },
    strategicInsight: 'Malaysia is a trilingual market (English/Malay/Chinese) offering cross-border content amplification. Racing & Sports genre growing 18% YoY. Strong tech adoption and high smartphone penetration make it ideal for premium mobile gaming campaigns.',
  },
  {
    market: 'Singapore',
    countryCode: 'SG',
    q1Downloads: 42,
    yoyGrowth: 3,
    iapRevenue: 58,
    topGenres: [
      { genre: 'Strategy & RPG', downloadShare: 25, revenueShare: 40, yoyGrowth: 10, hoursWatched: 85, topTitles: ['Genshin Impact', 'Honkai: Star Rail'], trend: 'rising' },
      { genre: 'Shooters', downloadShare: 18, revenueShare: 22, yoyGrowth: 4, hoursWatched: 120, topTitles: ['Valorant', 'Counter-Strike 2'], trend: 'stable' },
      { genre: 'MOBA', downloadShare: 12, revenueShare: 18, yoyGrowth: 2, hoursWatched: 95, topTitles: ['Mobile Legends', 'Dota 2'], trend: 'stable' },
      { genre: 'Simulation', downloadShare: 15, revenueShare: 12, yoyGrowth: 15, hoursWatched: 40, topTitles: ['Roblox', 'The Sims'], trend: 'rising' },
    ],
    streamingHours: {
      totalHoursWatched: 380,
      twitchShare: 22,
      youtubeShare: 48,
      tiktokLiveShare: 18,
      avgConcurrentViewers: 45000,
      peakViewers: 320000,
      topStreamedGames: ['Valorant', 'Dota 2', 'Genshin Impact', 'Mobile Legends'],
    },
    influencerMetrics: {
      totalSpend: 52,
      avgCampaignROI: 3.2,
      outcomeDrivenShare: 48,
      avgCreatorRate: { micro: 300, mid: 1500, macro: 6000, mega: 25000 },
      platformSplit: { youtube: 45, tiktok: 22, twitch: 20, instagram: 13 },
    },
    strategicInsight: 'Singapore is the premium gateway — highest ARPU in SEA with $58M IAP from just 42M downloads. Twitch has its strongest SEA presence here (22%). English-first market serves as regional content hub. Ideal for premium brand partnerships and cross-border amplification.',
  },
  {
    market: 'South Korea',
    countryCode: 'KR',
    q1Downloads: 310,
    yoyGrowth: 2,
    iapRevenue: 890,
    topGenres: [
      { genre: 'MMORPG', downloadShare: 18, revenueShare: 35, yoyGrowth: -3, hoursWatched: 680, topTitles: ['Lineage M', 'Odin: Valhalla Rising'], trend: 'declining' },
      { genre: 'Strategy', downloadShare: 15, revenueShare: 20, yoyGrowth: 8, hoursWatched: 420, topTitles: ['Rise of Kingdoms', 'Clash of Clans'], trend: 'rising' },
      { genre: 'Shooters', downloadShare: 20, revenueShare: 22, yoyGrowth: 12, hoursWatched: 1200, topTitles: ['Valorant', 'Overwatch 2', 'PUBG'], trend: 'rising' },
      { genre: 'Sports & Racing', downloadShare: 12, revenueShare: 10, yoyGrowth: 15, hoursWatched: 280, topTitles: ['FC Online', 'KartRider Rush+'], trend: 'rising' },
    ],
    streamingHours: {
      totalHoursWatched: 3200,
      twitchShare: 28,
      youtubeShare: 35,
      tiktokLiveShare: 12,
      avgConcurrentViewers: 580000,
      peakViewers: 3200000,
      topStreamedGames: ['League of Legends', 'Valorant', 'MapleStory', 'FC Online'],
    },
    influencerMetrics: {
      totalSpend: 320,
      avgCampaignROI: 3.1,
      outcomeDrivenShare: 52,
      avgCreatorRate: { micro: 400, mid: 2000, macro: 8000, mega: 35000 },
      platformSplit: { youtube: 35, tiktok: 20, twitch: 30, instagram: 15 },
    },
    strategicInsight: 'South Korea is the esports capital with highest streaming hours in APAC (3.2B). Twitch commands 28% share — strongest in the region. Shooters growing 12% YoY as Valorant displaces traditional MMORPG dominance. Premium market with $890M IAP revenue.',
  },
];

// ── STRATEGIC TEXT INSIGHTS ───────────────────────────────────────────────────
// Exportable business intelligence summaries for dashboards and reports

export const marketInsights: MarketInsightText[] = [
  // MARKET OVERVIEW
  {
    id: 'overview_sea_2026',
    category: 'market_overview',
    title: 'Southeast Asia Gaming Market Overview — Q2 2026',
    summary: 'SEA gaming market reached $6.39B in 2025 revenue with 2B+ quarterly installs. Indonesia leads downloads (870M/quarter), Thailand leads IAP revenue ($162M/quarter). Influencer marketing shifting from awareness to outcome-driven campaigns (42% in 2025, up from 30% in 2024).',
    detail: `The Southeast Asian mobile gaming market continues its trajectory as a global powerhouse. Q1 2025 data shows nearly 2 billion game installs across the region, with Indonesia maintaining its position as the download leader at 870 million installs (+9% QoQ). Thailand has emerged as the revenue champion with $162M in IAP revenue, reflecting premium spending behavior despite lower volume.

The influencer marketing landscape is undergoing a fundamental shift. According to AnyMind Group's 2026 report, outcome-driven campaigns in APAC grew to 42.47% of total tracked activity in 2025, up from 30.67% in 2024. This signals maturation from brand awareness plays to measurable performance marketing — exactly where Gamefluence's attribution capabilities provide competitive advantage.

The total addressable market for gaming influencer marketing in SEA is estimated at $665M annually, growing at 18% CAGR. Mobile gaming ads account for 68% of all gaming ad spend globally, with SEA representing the fastest-growing regional segment.`,
    dataPoints: [
      'SEA gaming revenue: $6.39B (2025), projected $7.37B by 2027',
      'Q1 2025 installs: ~2B across SEA (Indonesia 870M, Philippines 366M, Vietnam 329M)',
      'Thailand IAP revenue: $162M/quarter (highest in SEA)',
      'Outcome-driven influencer campaigns: 42% (up from 30% in 2024)',
      'SEA advertising market: $28.34B in 2025, growing to $63.89B by 2031 (14.5% CAGR)',
      'Indonesia entering global top-3 by downloads with 10% YoY growth',
      'Vietnam fastest growing: +12% YoY download growth',
    ],
    confidence: 92,
    lastUpdated: '2026-05-26',
    exportable: true,
  },
  {
    id: 'overview_streaming_economy',
    category: 'market_overview',
    title: 'APAC Streaming Economy — Platform Dynamics 2026',
    summary: 'YouTube Gaming hit 8.8B hours watched in 2025 (+12% YoY), commanding ~25% of live-streaming gaming platforms. Twitch holds 67% market share in gaming hours watched globally but faces YouTube growth pressure in APAC. TikTok Live emerging as primary discovery platform in Vietnam and Philippines.',
    detail: `The live streaming landscape is experiencing a platform power shift in APAC. YouTube Gaming reached a record 8.8 billion hours watched in 2025, a 12% year-over-year increase, accounting for approximately 25% of hours watched across live-streaming gaming platforms. The global gaming streaming market generated approximately 9 billion hours watched across all major platforms in Q2 2026.

In Southeast Asia specifically, YouTube dominates with 48-58% share across markets, but TikTok Live is the fastest-growing platform, particularly in Vietnam (35% share) and Philippines (30% share). Twitch maintains strongest presence in Singapore (22%), South Korea (28%), and Thailand (15%) — markets with higher ARPU and more established PC gaming cultures.

For Gamefluence campaigns, this multi-platform reality means creator selection must account for platform-specific audience behaviors. A creator with 500K YouTube subscribers may deliver different campaign outcomes than one with 500K TikTok followers, particularly for conversion-focused objectives.`,
    dataPoints: [
      'YouTube Gaming: 8.8B hours watched in 2025 (+12% YoY)',
      'Global gaming streams: ~9B hours watched in Q2 2026',
      'Twitch: 240M monthly active users, 67% gaming content market share',
      'TikTok Live: Free Fire alone generated 155M watch hours on platform',
      'Live streaming market: $76.86B in 2025, growing to $97.39B in 2026',
      'Total live streaming watch time: 36.4B hours in 2025',
      'M7 MLBB World Championship: 5.59M peak concurrent viewers (mobile esports record)',
    ],
    confidence: 90,
    lastUpdated: '2026-05-26',
    exportable: true,
  },
  // GENRE ANALYSIS
  {
    id: 'genre_moba_dominance',
    category: 'genre_analysis',
    title: 'MOBA Genre — The Revenue Engine of SEA Gaming',
    summary: 'Mobile Legends: Bang Bang dominates SEA with 475M+ viewer hours in 2024, 5.59M peak viewers at M7 2025, and 35-42% IAP revenue share in Indonesia/Philippines. MOBA creators command highest engagement rates and brand safety scores across the region.',
    detail: `MOBA remains the undisputed revenue king of Southeast Asian gaming. Mobile Legends: Bang Bang alone generated over 475 million viewer hours in 2024 esports, with the M7 World Championship in 2025 shattering all mobile esports records at 5.59 million peak concurrent viewers. The MPL (Mobile Legends Professional League) seasons consistently cross 100 million hours watched per season since late 2023.

For influencer campaigns, MOBA creators offer the highest engagement-to-cost ratio in SEA. Their audiences are deeply engaged (avg 8.5-11% engagement rate), predominantly male 18-34, and highly responsive to in-game purchase recommendations. The community-driven nature of MOBA content creates natural amplification through team-based content and tournament coverage.

Key opportunity: MOBA creators in Philippines and Indonesia have the strongest community trust scores, making them ideal for outcome-driven campaigns where conversion matters more than reach.`,
    dataPoints: [
      'MLBB: 475M+ viewer hours (2024), top mobile esport globally',
      'M7 World Championship: 5.59M peak viewers (all-time mobile esports record)',
      'MPL seasons: 100M+ hours watched per season since 2023',
      'MOBA IAP revenue share: 35% (Indonesia), 42% (Philippines)',
      'Esports World Cup 2025: MLBB most viewed tournament (50.32M hours)',
      'Arena of Valor: Record viewership in 2025 season',
      'MOBA creator engagement: 8.5-11% avg (vs 4-6% industry average)',
    ],
    confidence: 95,
    lastUpdated: '2026-05-26',
    exportable: true,
  },
  {
    id: 'genre_shooters_growth',
    category: 'genre_analysis',
    title: 'Shooters & Battle Royale — Platform Shift Driving New Opportunities',
    summary: 'Shooters growing 12% YoY in South Korea as Valorant displaces traditional titles. Free Fire maintains SEA dominance with 155M TikTok Live watch hours. PUBG Mobile World Championship generated 64.5M hours watched. Shooter creators offer highest streaming hours and cross-platform reach.',
    detail: `The Shooters category is experiencing a generational shift across APAC. Valorant's rise is reshaping the competitive landscape, particularly in Thailand and South Korea where it's displacing traditional MMORPG and older FPS titles. Meanwhile, Free Fire and PUBG Mobile maintain their mobile-first dominance in price-sensitive markets like Indonesia, Vietnam, and Philippines.

The streaming economics of shooter content are compelling: shooter creators typically stream 4-6 hours per session (vs 2-3 for MOBA), generating more sponsorship inventory per creator. Free Fire's TikTok Live presence (155M watch hours) demonstrates the genre's adaptability to short-form platforms.

For campaign planning, shooter creators offer the broadest demographic reach (18-34 male, expanding to 16-28 female with Valorant) and the most natural integration points for non-endemic brands through in-stream sponsorships and tournament partnerships.`,
    dataPoints: [
      'Shooters YoY growth: +12% (South Korea), +6% (Vietnam), +5% (Thailand)',
      'Free Fire: 155M watch hours on TikTok Live alone',
      'PUBG Mobile World Championship: 64.5M hours watched (all-time record)',
      'Free Fire EWC 2025: 5.93M hours watched, 292K avg viewers',
      'Valorant: Fastest growing esport in Thailand and South Korea',
      'Shooter streaming sessions: 4-6 hours avg (highest among genres)',
      'Snapdragon Pro Series APAC: 1M peak viewers, 4M+ hours watched',
    ],
    confidence: 91,
    lastUpdated: '2026-05-26',
    exportable: true,
  },
  {
    id: 'genre_racing_opportunity',
    category: 'genre_analysis',
    title: 'Racing & Sports — Fastest Growing Genre in SEA (Gamefluence Sweet Spot)',
    summary: 'Racing & Sports growing 18-22% YoY across Vietnam and Malaysia — fastest genre growth in SEA. KartRider Rush+ and EA Sports FC Mobile driving new audience segments. Aligns directly with Gamefluence campaign expertise from Campaign 1-2 success.',
    detail: `Racing & Sports represents the highest-growth genre opportunity in Southeast Asia, growing 18-22% year-over-year in Vietnam and Malaysia. This growth is driven by EA Sports FC Mobile's expansion, KartRider Rush+ in South Korea, and Asphalt 9's continued mobile dominance.

This genre aligns perfectly with Gamefluence's proven campaign expertise. Campaigns 1 and 2 demonstrated strong performance with racing content creators in Vietnam, achieving above-benchmark engagement and conversion rates. The genre's visual spectacle makes it ideal for streaming content, while its competitive nature drives community engagement.

Key strategic advantage: Racing/Sports creators are currently undervalued relative to MOBA and Shooter creators (30-40% lower rates), yet deliver comparable engagement rates. This pricing inefficiency creates a window for Gamefluence to lock in partnerships before market correction.`,
    dataPoints: [
      'Racing & Sports YoY growth: +22% (Vietnam), +18% (Malaysia), +15% (South Korea)',
      'Genre revenue share growing: 10-15% across SEA markets',
      'Creator rates: 30-40% below MOBA/Shooter equivalents (pricing inefficiency)',
      'Gamefluence Campaign 1-2 racing ROI: 4.8x (above 4.2x market average)',
      'EA Sports FC Mobile: Top 3 sports game across all SEA markets',
      'KartRider Rush+: 280M streaming hours in South Korea',
      'Audience overlap with auto/tech brands: 65% (highest non-endemic opportunity)',
    ],
    confidence: 88,
    lastUpdated: '2026-05-26',
    exportable: true,
  },
  // ATTENTION ECONOMY
  {
    id: 'attention_hours_watched',
    category: 'attention_economy',
    title: 'Attention Economy — Where APAC Gaming Hours Are Going',
    summary: 'Total gaming streaming in APAC: ~12.4B hours watched quarterly. YouTube dominates volume (48-58% share), TikTok Live fastest growing (25-35% in SEA), Twitch strongest in premium markets (22-28% in SG/KR). Average session: 1.5 hours. Peak attention windows: 7-11pm local time.',
    detail: `Understanding where attention flows is critical for campaign timing and platform selection. Across APAC gaming markets tracked by Gamefluence, approximately 12.4 billion hours of gaming content are consumed quarterly across streaming platforms.

Platform attention distribution varies significantly by market maturity:
- Emerging markets (Indonesia, Philippines, Vietnam): YouTube 48-52%, TikTok Live 25-35%, Twitch 6-12%
- Premium markets (Singapore, South Korea, Thailand): YouTube 35-55%, Twitch 15-28%, TikTok Live 12-22%

Peak attention windows across SEA are remarkably consistent: 7-11pm local time on weekdays, with extended windows (2pm-midnight) on weekends. Mobile gaming sessions average 22 minutes, but streaming viewership sessions average 1.5 hours — indicating that creator content captures 4x the attention of direct gameplay.

For campaign optimization, this means creator-driven content delivers significantly more brand exposure time per impression than traditional UA channels. A 30-second mid-roll in a 4-hour stream reaches viewers in a high-attention state, compared to interstitial ads during casual gameplay.`,
    dataPoints: [
      'APAC gaming streaming: ~12.4B hours watched per quarter',
      'Global gaming streams: 9B hours in Q2 2026',
      'Average streaming session: 1.5 hours (vs 22 min gameplay session)',
      'Peak attention: 7-11pm local time (weekdays), 2pm-midnight (weekends)',
      'Creator content attention multiplier: 4x vs direct gameplay',
      'YouTube Gaming global: 8.8B hours in 2025 (+12% YoY)',
      'Total live streaming: 223B hours globally in 2025 (+19% YoY)',
      'Mobile esports peak: 5.59M concurrent (M7 MLBB 2025)',
    ],
    confidence: 87,
    lastUpdated: '2026-05-26',
    exportable: true,
  },
  {
    id: 'attention_platform_strategy',
    category: 'attention_economy',
    title: 'Platform Strategy — Multi-Platform Attention Capture',
    summary: 'Optimal APAC campaign requires 3-platform approach: YouTube for depth (long-form, VOD discovery), TikTok Live for reach (viral discovery, younger demos), Twitch for engagement (real-time interaction, premium audiences). Budget split recommendation: 45% YouTube, 30% TikTok, 15% Twitch, 10% Instagram.',
    detail: `No single platform captures the full APAC gaming audience. Effective campaigns require a coordinated multi-platform strategy that leverages each platform's unique attention characteristics:

YouTube (45% budget): The depth platform. Long-form content (15-45 min) drives the highest brand recall and conversion intent. VOD discovery means content continues generating impressions for 30-90 days post-publish. Best for: detailed game reviews, sponsored gameplay series, tutorial content.

TikTok Live (30% budget): The discovery platform. Short-form clips (15-60 sec) and live streams drive viral reach and younger demographic capture (16-24). Fastest growing in Vietnam (+35% share) and Philippines (+30% share). Best for: awareness campaigns, game launches, trend-riding content.

Twitch (15% budget): The engagement platform. Real-time interaction creates deepest brand-audience connection. Strongest in premium markets (Singapore 22%, South Korea 28%, Thailand 15%). Best for: community building, live events, premium brand partnerships.

Instagram (10% budget): The lifestyle platform. Static and Stories content bridges gaming into lifestyle context. Best for: non-endemic brand partnerships, female audience capture, behind-the-scenes content.`,
    dataPoints: [
      'YouTube: 8.8B gaming hours (2025), 30-90 day content longevity',
      'TikTok Live: Fastest growing, 155M hours for Free Fire alone',
      'Twitch: 240M MAU, highest real-time engagement rates',
      'Multi-platform creators: 2.3x higher campaign ROI vs single-platform',
      'Cross-platform content repurposing: 40% cost reduction',
      'Recommended split: 45% YouTube, 30% TikTok, 15% Twitch, 10% Instagram',
      'Platform-native content: 67% higher engagement vs cross-posted',
    ],
    confidence: 85,
    lastUpdated: '2026-05-26',
    exportable: true,
  },
  // STRATEGIC RECOMMENDATIONS
  {
    id: 'strategy_campaign_4_brief',
    category: 'strategic_recommendation',
    title: 'Campaign 4 Strategic Recommendation — APAC-Wide Expansion',
    summary: 'Recommended $12.5M campaign across 7 markets, 280 creators, 6-month duration. Focus: MOBA + Racing genres, multi-platform execution, outcome-driven KPIs. Expected: 18.5M downloads, $72M projected revenue, 5.8x ROI.',
    detail: `Based on current market trends, Campaign 3 learnings, and competitive landscape analysis, the recommended Campaign 4 strategy is a full APAC-wide expansion leveraging Gamefluence's proven racing expertise while capturing the MOBA revenue opportunity.

Campaign Architecture:
- Total Budget: $12.5M (up from $8.5M Campaign 3)
- Duration: 6 months (July-December 2026)
- Markets: 7 primary (ID, PH, VN, TH, MY, SG, KR)
- Creators: 280 total (40 mega, 80 macro, 100 mid, 60 micro)
- Genres: MOBA (40%), Racing/Sports (30%), Shooters (20%), Casual (10%)

The key strategic shift from Campaign 3 is the dual-genre approach: leveraging MOBA's massive audience for reach and revenue, while maintaining Racing/Sports as the differentiated expertise that no competitor can match. This creates a defensible market position.

Outcome-driven KPIs align with the industry shift identified in AnyMind's 2026 report — 42% of APAC influencer campaigns now focus on measurable outcomes rather than awareness metrics.`,
    dataPoints: [
      'Recommended budget: $12.5M (47% increase from Campaign 3)',
      'Target markets: 7 (Indonesia, Philippines, Vietnam, Thailand, Malaysia, Singapore, South Korea)',
      'Creator network: 280 (40 mega, 80 macro, 100 mid, 60 micro)',
      'Expected downloads: 18.5M across all markets',
      'Projected revenue: $72M (5.8x ROI)',
      'Genre split: MOBA 40%, Racing 30%, Shooters 20%, Casual 10%',
      'Platform split: YouTube 45%, TikTok 30%, Twitch 15%, Instagram 10%',
      'Campaign duration: 6 months (July-December 2026)',
    ],
    confidence: 82,
    lastUpdated: '2026-05-26',
    exportable: true,
  },
  {
    id: 'strategy_competitive_moat',
    category: 'strategic_recommendation',
    title: 'Competitive Moat — Why Gamefluence Wins in APAC',
    summary: 'Three defensible advantages: (1) Racing/Sports genre expertise no competitor has, (2) Multi-market attribution across 7 APAC markets, (3) AI-powered creator matching with 94.7% prediction accuracy. Combined with outcome-driven measurement, this positions Gamefluence as the only agency-first platform purpose-built for APAC gaming.',
    detail: `Gamefluence's competitive position in APAC gaming influencer marketing rests on three reinforcing advantages that competitors cannot easily replicate:

1. Genre Expertise (Racing/Sports): No other platform has demonstrated campaign success in the fastest-growing SEA genre. Campaigns 1-2 established proof points that attract racing game publishers and automotive brands. This expertise is expanding into the broader Sports category as EA Sports FC Mobile grows.

2. Multi-Market Attribution: Cross-border campaign measurement across 7 APAC markets with privacy-first methodology. As outcome-driven campaigns grow to 42%+ of the market, attribution capability becomes the primary differentiator for agency clients who need to justify spend.

3. AI Creator Matching (94.7% accuracy): The creator selection engine, trained on Campaign 1-3 performance data, predicts campaign outcomes with higher accuracy than any competitor. This compounds with each campaign — more data improves predictions, which improves outcomes, which attracts more clients.

The agency-first positioning is critical: agencies managing multiple brand clients across APAC need a platform that handles multi-market complexity. No competitor offers white-label, multi-currency, multi-market campaign management with integrated attribution.`,
    dataPoints: [
      'Racing/Sports genre: 18-22% YoY growth, 30-40% underpriced creators',
      'Attribution capability: Cross-border measurement across 7 markets',
      'AI accuracy: 94.7% prediction (up from 91.8% in Campaign 2)',
      'Outcome-driven market share: 42% and growing (industry tailwind)',
      'Agency TAM in APAC: $665M gaming influencer marketing annually',
      'Competitor gap: No platform offers multi-market + genre expertise + attribution',
      'Data moat: Each campaign improves AI by 2-3% accuracy',
    ],
    confidence: 86,
    lastUpdated: '2026-05-26',
    exportable: true,
  },
];

// ── CAMPAIGN 4 BRIEF ──────────────────────────────────────────────────────────

export const campaign4Brief: APACCampaignBrief = {
  campaignName: 'APAC Gaming Domination — Campaign 4',
  objective: 'Establish Gamefluence as the definitive APAC gaming influencer platform through a multi-genre, multi-market campaign targeting 18.5M downloads and $72M projected revenue across 7 markets.',
  totalBudget: 12500000,
  duration: 'July 2026 — December 2026 (6 months)',
  markets: [
    { market: 'Indonesia', countryCode: 'ID', budgetAllocation: 2800000, budgetPercentage: 22, targetDownloads: 4200000, creatorCount: 65, primaryGenres: ['MOBA', 'Battle Royale', 'Racing'], rationale: 'Largest download market (870M/quarter), MOBA revenue leader, proven Campaign 1-3 performance' },
    { market: 'Philippines', countryCode: 'PH', budgetAllocation: 2200000, budgetPercentage: 18, targetDownloads: 3500000, creatorCount: 52, primaryGenres: ['MOBA', 'RPG', 'Casual'], rationale: 'MOBA heartland (42% IAP share), community-driven culture, strong TikTok Live growth' },
    { market: 'Vietnam', countryCode: 'VN', budgetAllocation: 2000000, budgetPercentage: 16, targetDownloads: 3200000, creatorCount: 48, primaryGenres: ['MOBA', 'Racing', 'Shooters'], rationale: 'Fastest growing market (+12% YoY), highest influencer ROI (4.8x), racing genre sweet spot' },
    { market: 'Thailand', countryCode: 'TH', budgetAllocation: 1800000, budgetPercentage: 14, targetDownloads: 2400000, creatorCount: 38, primaryGenres: ['Strategy/RPG', 'Shooters', 'MOBA'], rationale: 'Highest IAP revenue ($162M/quarter), premium audience, strongest Twitch presence in SEA' },
    { market: 'South Korea', countryCode: 'KR', budgetAllocation: 1500000, budgetPercentage: 12, targetDownloads: 2200000, creatorCount: 32, primaryGenres: ['Shooters', 'Racing/Sports', 'Strategy'], rationale: 'Esports capital, highest streaming hours (3.2B), Twitch 28% share, premium brand partnerships' },
    { market: 'Malaysia', countryCode: 'MY', budgetAllocation: 1200000, budgetPercentage: 10, targetDownloads: 1800000, creatorCount: 28, primaryGenres: ['MOBA', 'Racing', 'Strategy'], rationale: 'Trilingual market for cross-border amplification, Racing growing 18% YoY' },
    { market: 'Singapore', countryCode: 'SG', budgetAllocation: 1000000, budgetPercentage: 8, targetDownloads: 1200000, creatorCount: 17, primaryGenres: ['Strategy/RPG', 'Shooters', 'MOBA'], rationale: 'Premium gateway (highest ARPU), English content hub, regional influence multiplier' },
  ],
  genreStrategy: [
    { genre: 'MOBA', budgetShare: 40, targetAudience: 'Male 18-34, competitive gamers, team-oriented', contentFormat: ['Tournament coverage', 'Pro player collabs', 'Tier lists', 'Live coaching'], expectedROI: 5.2, rationale: 'Highest revenue genre in SEA (35-42% IAP share), proven engagement, massive esports audience' },
    { genre: 'Racing & Sports', budgetShare: 30, targetAudience: 'Male 16-30, casual-competitive, auto/sports enthusiasts', contentFormat: ['Gameplay challenges', 'Car/team reviews', 'Tournament streams', 'Brand integrations'], expectedROI: 6.1, rationale: 'Fastest growing genre (18-22% YoY), Gamefluence expertise, underpriced creators, non-endemic brand appeal' },
    { genre: 'Shooters', budgetShare: 20, targetAudience: 'Male 16-28, competitive, tech-savvy', contentFormat: ['Ranked gameplay', 'Weapon guides', 'Tournament highlights', 'Team content'], expectedROI: 4.8, rationale: 'Highest streaming hours per creator, Valorant growth wave, cross-platform reach' },
    { genre: 'Casual & Simulation', budgetShare: 10, targetAudience: 'Mixed 14-35, family-friendly, broad appeal', contentFormat: ['Challenge videos', 'Community events', 'Collab content', 'Short-form clips'], expectedROI: 3.9, rationale: 'Arcade & Simulation dominate downloads, broad demographic reach, brand-safe content' },
  ],
  creatorStrategy: {
    totalCreators: 280,
    tierBreakdown: { mega: 40, macro: 80, mid: 100, micro: 60 },
    budgetSplit: { mega: 35, macro: 30, mid: 25, micro: 10 },
    selectionCriteria: [
      'AI match score > 85 (94.7% prediction accuracy)',
      'Cultural fit score > 90 for target market',
      'Brand safety score > 95',
      'Multi-platform presence (2+ platforms minimum)',
      'Engagement rate > 6% (above industry 4% average)',
      'Content consistency (3+ posts/week minimum)',
      'Audience authenticity score > 92% (fraud prevention)',
    ],
  },
  kpis: [
    { metric: 'Total Downloads', target: 18500000, unit: 'installs', benchmark: 14250000, stretch: 22000000 },
    { metric: 'Projected Revenue', target: 72000000, unit: 'USD', benchmark: 57500000, stretch: 85000000 },
    { metric: 'Campaign ROI', target: 5.8, unit: 'x', benchmark: 4.6, stretch: 6.8 },
    { metric: 'Avg Engagement Rate', target: 8.5, unit: '%', benchmark: 6.0, stretch: 10.0 },
    { metric: 'Cost Per Install', target: 0.68, unit: 'USD', benchmark: 0.85, stretch: 0.55 },
    { metric: 'Brand Safety Score', target: 97, unit: '%', benchmark: 95, stretch: 99 },
    { metric: 'Creator Retention', target: 85, unit: '%', benchmark: 70, stretch: 92 },
    { metric: 'Cross-Market Amplification', target: 2.8, unit: 'x', benchmark: 2.0, stretch: 3.5 },
  ],
  strategicNarrative: 'Campaign 4 represents Gamefluence\'s transition from market entrant to market leader. By combining proven Racing/Sports expertise with MOBA\'s massive revenue potential, we create a dual-engine growth strategy that no competitor can replicate. The 280-creator network across 7 markets establishes the largest APAC gaming influencer operation, while AI-powered selection (94.7% accuracy) ensures every dollar delivers measurable outcomes.',
  riskFactors: [
    'MOBA market saturation in Philippines may cap growth at 3.2M downloads',
    'South Korea entry requires premium creator rates ($35K+ for mega tier)',
    'Currency fluctuation across 7 markets impacts budget allocation (±8%)',
    'Platform algorithm changes (especially TikTok) could reduce organic reach',
    'Creator exclusivity conflicts with competing campaigns in peak season',
    'Regulatory compliance variations (especially South Korea gaming regulations)',
  ],
  competitiveAdvantage: [
    'Only platform with proven Racing/Sports genre expertise in APAC',
    'AI creator matching at 94.7% accuracy (competitors at ~75-80%)',
    'Multi-market attribution across 7 countries (no competitor offers this)',
    'Agency-first platform with white-label and multi-currency support',
    'Privacy-first fraud prevention (no user-level tracking required)',
    'Campaign 1-3 data moat: 250+ creator performance histories',
  ],
};

// ── HELPER FUNCTIONS ──────────────────────────────────────────────────────────

export function getInsightsByCategory(category: MarketInsightText['category']): MarketInsightText[] {
  return marketInsights.filter((i) => i.category === category);
}

export function getInsightById(id: string): MarketInsightText | undefined {
  return marketInsights.find((i) => i.id === id);
}

export function getMarketTrend(countryCode: string): MarketTrendData | undefined {
  return apacMarketTrends.find((m) => m.countryCode === countryCode);
}

export function getTotalAPACMetrics() {
  const totals = apacMarketTrends.reduce(
    (acc, m) => ({
      downloads: acc.downloads + m.q1Downloads,
      iapRevenue: acc.iapRevenue + m.iapRevenue,
      streamingHours: acc.streamingHours + m.streamingHours.totalHoursWatched,
      influencerSpend: acc.influencerSpend + m.influencerMetrics.totalSpend,
    }),
    { downloads: 0, iapRevenue: 0, streamingHours: 0, influencerSpend: 0 }
  );
  return {
    ...totals,
    markets: apacMarketTrends.length,
    avgROI: apacMarketTrends.reduce((s, m) => s + m.influencerMetrics.avgCampaignROI, 0) / apacMarketTrends.length,
  };
}

export function exportInsightAsText(insight: MarketInsightText): string {
  return `# ${insight.title}
Category: ${insight.category.replace(/_/g, ' ').toUpperCase()}
Confidence: ${insight.confidence}%
Last Updated: ${insight.lastUpdated}

## Summary
${insight.summary}

## Detail
${insight.detail}

## Key Data Points
${insight.dataPoints.map((d) => `• ${d}`).join('\n')}

---
Generated by Gamefluence Market Intelligence Engine
`;
}

export function exportAllInsightsAsText(): string {
  return marketInsights
    .filter((i) => i.exportable)
    .map(exportInsightAsText)
    .join('\n\n');
}

export function exportCampaignBriefAsText(): string {
  const b = campaign4Brief;
  return `# ${b.campaignName}
## Objective
${b.objective}

## Budget & Duration
- Total Budget: $${(b.totalBudget / 1000000).toFixed(1)}M
- Duration: ${b.duration}

## Market Allocation
${b.markets.map((m) => `- ${m.market} (${m.countryCode}): $${(m.budgetAllocation / 1000000).toFixed(1)}M (${m.budgetPercentage}%) — ${m.targetDownloads.toLocaleString()} target downloads, ${m.creatorCount} creators`).join('\n')}

## Genre Strategy
${b.genreStrategy.map((g) => `- ${g.genre} (${g.budgetShare}% budget): ${g.expectedROI}x expected ROI — ${g.rationale}`).join('\n')}

## Creator Strategy
- Total: ${b.creatorStrategy.totalCreators} creators
- Mega: ${b.creatorStrategy.tierBreakdown.mega} (${b.creatorStrategy.budgetSplit.mega}% budget)
- Macro: ${b.creatorStrategy.tierBreakdown.macro} (${b.creatorStrategy.budgetSplit.macro}% budget)
- Mid: ${b.creatorStrategy.tierBreakdown.mid} (${b.creatorStrategy.budgetSplit.mid}% budget)
- Micro: ${b.creatorStrategy.tierBreakdown.micro} (${b.creatorStrategy.budgetSplit.micro}% budget)

## KPIs
${b.kpis.map((k) => `- ${k.metric}: ${k.target}${k.unit === '%' || k.unit === 'x' ? k.unit : ' ' + k.unit} (benchmark: ${k.benchmark}, stretch: ${k.stretch})`).join('\n')}

## Strategic Narrative
${b.strategicNarrative}

## Risk Factors
${b.riskFactors.map((r) => `- ${r}`).join('\n')}

## Competitive Advantages
${b.competitiveAdvantage.map((c) => `- ${c}`).join('\n')}

---
Generated by Gamefluence Campaign Intelligence Engine
`;
}
