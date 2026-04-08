// APAC Market Intelligence Profiles
// Sources: Newzoo, Sensor Tower, AppsFlyer, Niko Partners, Statista (2025 data)
// Content rephrased for compliance with licensing restrictions

export interface MarketProfile {
  id: string;
  name: string;
  flag: string;
  region: 'sea' | 'east_asia' | 'oceania';

  // Market size
  gamingRevenue: string;       // total gaming market USD
  mobileRevenue: string;       // mobile gaming USD
  totalGamers: string;         // active players
  mobileShare: number;         // % of revenue from mobile

  // Player behaviour
  avgDailyPlaytime: string;    // hours
  peakPlayHours: string;       // local time
  preferredPlatform: string;
  topGames: string[];
  dominantGenres: string[];

  // Creator / influencer landscape
  creatorEcosystem: string;    // description
  primaryPlatforms: string[];  // where creators post
  avgCreatorRate: string;      // per campaign USD
  microInfluencerRate: string; // <100K followers

  // Attribution & measurement maturity
  measurementMaturity: 'advanced' | 'developing' | 'emerging';
  commonMMP: string[];         // AppsFlyer, Adjust etc
  attributionNotes: string;
  fraudRisk: 'low' | 'medium' | 'high';

  // Agency landscape
  agencyActivity: 'very_active' | 'active' | 'growing' | 'early';
  majorAgencies: string[];
  campaignBudgetRange: string;
  brandCategories: string[];

  // Economics
  avgCPI: string;              // cost per install USD
  avgCPA: string;              // cost per action
  avgARPU: string;             // avg revenue per user
  expectedROI: string;

  // Local market factors
  localRepRequired: boolean;
  localLanguageRequired: boolean;
  incentivesCommon: boolean;
  incentiveNotes: string;
  culturalNotes: string;
  regulatoryNotes: string;

  // Recommended hire profile
  localHireProfile: {
    role: string;
    skills: string[];
    languages: string[];
    salary: string;
    why: string;
  };
}

export const MARKET_PROFILES: Record<string, MarketProfile> = {
  vietnam: {
    id: 'vietnam', name: 'Vietnam', flag: '🇻🇳', region: 'sea',
    gamingRevenue: '$1.1B', mobileRevenue: '$680M', totalGamers: '45M', mobileShare: 72,
    avgDailyPlaytime: '2.8 hrs', peakPlayHours: '19:00-23:00 ICT',
    preferredPlatform: 'Mobile (Android 85%)',
    topGames: ['Mobile Legends', 'Liên Quân Mobile', 'PUBG Mobile', 'Free Fire', 'Genshin Impact'],
    dominantGenres: ['MOBA', 'Battle Royale', 'Mobile RPG', 'Casual'],
    creatorEcosystem: 'Rapidly growing. TikTok and YouTube dominate. Café gaming culture drives organic content. Micro-influencers have outsized engagement due to tight community trust.',
    primaryPlatforms: ['TikTok', 'YouTube', 'Facebook Gaming'],
    avgCreatorRate: '$200-800', microInfluencerRate: '$50-200',
    measurementMaturity: 'developing',
    commonMMP: ['AppsFlyer', 'Adjust'],
    attributionNotes: 'AppsFlyer is dominant among larger studios. Many local publishers still rely on UTM and promo codes. Device-level attribution works well on Android. iOS SKAN adoption is low.',
    fraudRisk: 'medium',
    agencyActivity: 'active',
    majorAgencies: ['Dentsu Vietnam', 'Publicis', 'GroupM', 'local boutiques'],
    campaignBudgetRange: '$5K-50K per campaign',
    brandCategories: ['Mobile Games', 'Fintech', 'E-commerce', 'FMCG'],
    avgCPI: '$0.25-0.45', avgCPA: '$1.50-3.00', avgARPU: '$2.80/month', expectedROI: '2.8-3.5x',
    localRepRequired: true, localLanguageRequired: true, incentivesCommon: true,
    incentiveNotes: 'In-game rewards and phone top-ups are highly effective. Cash incentives less common but growing. Creators expect upfront payment.',
    culturalNotes: 'Gaming café culture is central. Group gaming sessions drive word-of-mouth. Vietnamese creators prefer working in Vietnamese — English-only briefs get lower response rates.',
    regulatoryNotes: 'Gaming content requires age ratings. Gambling-adjacent mechanics face scrutiny. Foreign companies need local entity or partner.',
    localHireProfile: {
      role: 'Market Manager / Creator Relations',
      skills: ['Creator outreach', 'Vietnamese social media', 'Campaign management', 'Basic analytics'],
      languages: ['Vietnamese (native)', 'English (working)'],
      salary: '$800-1,500/month',
      why: 'Vietnamese creators strongly prefer local contacts. Language barrier is the #1 friction point. A local rep 3x your creator response rate.'
    }
  },

  thailand: {
    id: 'thailand', name: 'Thailand', flag: '🇹🇭', region: 'sea',
    gamingRevenue: '$1.3B', mobileRevenue: '$850M', totalGamers: '38M', mobileShare: 68,
    avgDailyPlaytime: '3.1 hrs', peakPlayHours: '18:00-22:00 ICT',
    preferredPlatform: 'Mobile (Android 78%, iOS 22%)',
    topGames: ['PUBG Mobile', 'ROV (Arena of Valor)', 'Free Fire', 'Genshin Impact', 'Honkai Star Rail'],
    dominantGenres: ['Battle Royale', 'MOBA', 'Gacha RPG', 'Casual'],
    creatorEcosystem: 'Mature and competitive. Thailand has a strong esports scene with government backing. Creators are professional and expect structured briefs. YouTube and TikTok are primary.',
    primaryPlatforms: ['YouTube', 'TikTok', 'Facebook Gaming', 'Twitch'],
    avgCreatorRate: '$300-1,200', microInfluencerRate: '$80-300',
    measurementMaturity: 'developing',
    commonMMP: ['AppsFlyer', 'Adjust', 'Branch'],
    attributionNotes: 'More sophisticated than Vietnam. Larger studios use AppsFlyer OneLink. Thai agencies are familiar with MMP dashboards. UTM still common for smaller brands.',
    fraudRisk: 'medium',
    agencyActivity: 'very_active',
    majorAgencies: ['Dentsu Thailand', 'Publicis Groupe', 'Mindshare', 'CJ WORX', 'Rabbit Digital'],
    campaignBudgetRange: '$10K-80K per campaign',
    brandCategories: ['Mobile Games', 'Automotive', 'Telco', 'Banking', 'FMCG'],
    avgCPI: '$0.35-0.55', avgCPA: '$2.00-4.00', avgARPU: '$3.50/month', expectedROI: '2.5-3.2x',
    localRepRequired: true, localLanguageRequired: true, incentivesCommon: true,
    incentiveNotes: 'Thai gamers respond well to exclusive in-game items and LINE sticker packs. Promo codes with tangible rewards outperform pure awareness campaigns.',
    culturalNotes: 'Esports is mainstream — government-supported events draw massive audiences. Thai creators are brand-savvy and negotiate professionally. Respect hierarchy in business dealings.',
    regulatoryNotes: 'Gaming content is regulated by MDES. Loot box mechanics face increasing scrutiny. Foreign companies can operate but benefit from local partnerships.',
    localHireProfile: {
      role: 'Country Manager / Agency Liaison',
      skills: ['Agency relationships', 'Esports network', 'Thai media buying', 'Contract negotiation'],
      languages: ['Thai (native)', 'English (fluent)'],
      salary: '$1,200-2,500/month',
      why: 'Thailand agency scene is relationship-driven. A well-connected local manager opens doors to Dentsu, Publicis, and the esports circuit that cold outreach cannot.'
    }
  },

  indonesia: {
    id: 'indonesia', name: 'Indonesia', flag: '🇮🇩', region: 'sea',
    gamingRevenue: '$2.1B', mobileRevenue: '$1.5B', totalGamers: '72M', mobileShare: 78,
    avgDailyPlaytime: '3.4 hrs', peakPlayHours: '19:00-23:00 WIB',
    preferredPlatform: 'Mobile (Android 92%)',
    topGames: ['Free Fire', 'Mobile Legends', 'PUBG Mobile', 'Stumble Guys', 'Roblox'],
    dominantGenres: ['Battle Royale', 'MOBA', 'Casual', 'Hyper-casual'],
    creatorEcosystem: 'Largest in SEA by volume. Massive TikTok adoption. Micro-influencers dominate — high trust, low cost. Creator economy is booming but rates are the lowest in APAC.',
    primaryPlatforms: ['TikTok', 'YouTube', 'Instagram', 'Facebook Gaming'],
    avgCreatorRate: '$150-600', microInfluencerRate: '$30-150',
    measurementMaturity: 'emerging',
    commonMMP: ['AppsFlyer', 'Adjust'],
    attributionNotes: 'Attribution is less mature. Many campaigns still measured by download counts and promo code redemptions. AppsFlyer growing but not universal. High Android share makes device-level tracking viable.',
    fraudRisk: 'high',
    agencyActivity: 'active',
    majorAgencies: ['Dentsu Indonesia', 'GroupM', 'Hakuhodo', 'local digital agencies'],
    campaignBudgetRange: '$3K-40K per campaign',
    brandCategories: ['Mobile Games', 'E-commerce', 'Telco', 'Fintech', 'FMCG'],
    avgCPI: '$0.15-0.35', avgCPA: '$0.80-2.00', avgARPU: '$1.80/month', expectedROI: '3.0-4.0x',
    localRepRequired: true, localLanguageRequired: true, incentivesCommon: true,
    incentiveNotes: 'Incentivised installs are extremely common and expected. Phone credit top-ups, in-game diamonds, and GoPay vouchers drive massive volume. Must filter for quality.',
    culturalNotes: 'Indonesia is price-sensitive but volume is enormous. Bahasa Indonesia content only — English content gets minimal traction. Community-driven gaming culture. Ramadan is peak gaming season.',
    regulatoryNotes: 'Kominfo regulates digital content. Games must be registered. Foreign companies need local entity. Payment processing requires local partner.',
    localHireProfile: {
      role: 'Creator Acquisition Lead',
      skills: ['TikTok creator network', 'Bahasa content review', 'Volume campaign management', 'Fraud detection'],
      languages: ['Bahasa Indonesia (native)', 'English (basic)'],
      salary: '$600-1,200/month',
      why: 'Volume market — you need someone who can manage 50+ micro-influencers simultaneously. Fraud filtering is critical. Local language is non-negotiable.'
    }
  },

  japan: {
    id: 'japan', name: 'Japan', flag: '🇯🇵', region: 'east_asia',
    gamingRevenue: '$16.6B', mobileRevenue: '$11.5B', totalGamers: '55M', mobileShare: 69,
    avgDailyPlaytime: '2.2 hrs', peakPlayHours: '21:00-01:00 JST',
    preferredPlatform: 'Mobile (iOS 55%, Android 45%)',
    topGames: ['Genshin Impact', 'Monster Strike', 'Fate/Grand Order', 'Uma Musume', 'Puzzle & Dragons'],
    dominantGenres: ['Gacha RPG', 'Puzzle', 'Strategy', 'Console ports', 'Rhythm'],
    creatorEcosystem: 'Highly professional and premium. YouTube dominates. VTubers are a major force — virtual creators command massive audiences. Rates are 5-10x SEA markets. Quality expectations are extremely high.',
    primaryPlatforms: ['YouTube', 'Twitch', 'NicoNico', 'TikTok (growing)'],
    avgCreatorRate: '$2,000-10,000', microInfluencerRate: '$500-2,000',
    measurementMaturity: 'advanced',
    commonMMP: ['AppsFlyer', 'Adjust', 'Kochava', 'Singular'],
    attributionNotes: 'Most sophisticated measurement in APAC. All major studios use MMPs. SKAN adoption is high due to iOS dominance. Incrementality testing is common among top publishers. Agencies expect granular reporting.',
    fraudRisk: 'low',
    agencyActivity: 'very_active',
    majorAgencies: ['CyberAgent', 'Dentsu', 'Hakuhodo', 'ADK', 'Septeni'],
    campaignBudgetRange: '$20K-200K per campaign',
    brandCategories: ['Mobile Games', 'Console Games', 'Anime/IP', 'Automotive', 'Electronics'],
    avgCPI: '$2.50-7.00', avgCPA: '$8.00-20.00', avgARPU: '$28.00/month', expectedROI: '3.5-4.5x',
    localRepRequired: true, localLanguageRequired: true, incentivesCommon: false,
    incentiveNotes: 'Japanese gamers are high-value organic spenders. Incentivised installs are frowned upon and damage brand perception. Focus on quality content and authentic creator endorsement.',
    culturalNotes: 'Quality over quantity. Japanese audiences expect polished, localised content. VTuber collaborations can be more effective than traditional influencers. Business relationships are formal — expect longer sales cycles but higher LTV.',
    regulatoryNotes: 'Gacha mechanics regulated under JARO guidelines. Kompu gacha banned. Transparent odds disclosure required. Consumer protection is strict.',
    localHireProfile: {
      role: 'Japan Business Development Manager',
      skills: ['Agency relationships (CyberAgent, Dentsu)', 'Japanese business etiquette', 'Gaming industry network', 'VTuber ecosystem knowledge'],
      languages: ['Japanese (native)', 'English (business)'],
      salary: '$4,000-7,000/month',
      why: 'Japan is the highest-ARPU market in APAC. Business is done through relationships and trust built over time. A native Japanese BD manager with agency connections is essential — cold outreach does not work here.'
    }
  },

  philippines: {
    id: 'philippines', name: 'Philippines', flag: '🇵🇭', region: 'sea',
    gamingRevenue: '$1.5B', mobileRevenue: '$1.0B', totalGamers: '68M', mobileShare: 73,
    avgDailyPlaytime: '3.6 hrs', peakPlayHours: '20:00-00:00 PHT',
    preferredPlatform: 'Mobile (Android 88%)',
    topGames: ['Mobile Legends', 'Genshin Impact', 'Call of Duty Mobile', 'Roblox', 'Valorant'],
    dominantGenres: ['MOBA', 'Battle Royale', 'RPG', 'FPS'],
    creatorEcosystem: 'English-speaking advantage. Filipino creators produce content in English and Tagalog, giving them cross-market reach. Strong esports culture around Mobile Legends. YouTube and TikTok dominant.',
    primaryPlatforms: ['YouTube', 'TikTok', 'Facebook Gaming', 'Twitch'],
    avgCreatorRate: '$150-700', microInfluencerRate: '$40-150',
    measurementMaturity: 'developing',
    commonMMP: ['AppsFlyer', 'Adjust'],
    attributionNotes: 'Growing MMP adoption. Larger publishers use AppsFlyer. Many local campaigns still rely on social media metrics and promo codes. Digital wallets (GCash) enable easy creator payments.',
    fraudRisk: 'medium',
    agencyActivity: 'growing',
    majorAgencies: ['Dentsu Philippines', 'Publicis', 'Havas', 'local digital shops'],
    campaignBudgetRange: '$5K-35K per campaign',
    brandCategories: ['Mobile Games', 'Telco', 'E-commerce', 'Fintech', 'Food & Beverage'],
    avgCPI: '$0.30-0.50', avgCPA: '$1.50-3.50', avgARPU: '$2.20/month', expectedROI: '2.2-3.0x',
    localRepRequired: false, localLanguageRequired: false, incentivesCommon: true,
    incentiveNotes: 'GCash rewards and mobile load top-ups are highly effective. Play-to-earn culture means gamers are receptive to incentivised campaigns. English briefs work fine.',
    culturalNotes: 'Filipinos are the most engaged social media users in APAC. Gaming is deeply social — group play and streaming culture. English proficiency means creators can serve both local and international audiences.',
    regulatoryNotes: 'Relatively open market. No specific gaming content regulations beyond general advertising standards. Foreign companies can operate directly.',
    localHireProfile: {
      role: 'Community & Creator Manager',
      skills: ['Social media management', 'Creator outreach', 'Community building', 'English content'],
      languages: ['English (fluent)', 'Tagalog (native)'],
      salary: '$500-1,000/month',
      why: 'Philippines is the easiest APAC market to activate remotely due to English proficiency. A local community manager amplifies reach but is not strictly required for initial campaigns.'
    }
  },

  australia: {
    id: 'australia', name: 'Australia', flag: '🇦🇺', region: 'oceania',
    gamingRevenue: '$3.4B', mobileRevenue: '$1.8B', totalGamers: '17M', mobileShare: 53,
    avgDailyPlaytime: '1.8 hrs', peakPlayHours: '19:00-23:00 AEST',
    preferredPlatform: 'Console & PC (47%), Mobile (53%)',
    topGames: ['Fortnite', 'Call of Duty', 'FIFA/EA FC', 'Genshin Impact', 'Minecraft'],
    dominantGenres: ['FPS', 'Sports', 'Battle Royale', 'Open World', 'Casual'],
    creatorEcosystem: 'Mature Western-style market. YouTube and Twitch dominant. Creators are professional with established rate cards. Smaller pool but high production quality. Strong crossover with US/UK audiences.',
    primaryPlatforms: ['YouTube', 'Twitch', 'TikTok', 'Instagram'],
    avgCreatorRate: '$1,500-5,000', microInfluencerRate: '$300-1,000',
    measurementMaturity: 'advanced',
    commonMMP: ['AppsFlyer', 'Adjust', 'Branch', 'Kochava'],
    attributionNotes: 'Full MMP adoption. Agencies expect AppsFlyer or Adjust dashboards as standard. SKAN and Privacy Sandbox compliance required. Incrementality measurement is expected for larger campaigns.',
    fraudRisk: 'low',
    agencyActivity: 'very_active',
    majorAgencies: ['Dentsu', 'OMD', 'Mindshare', 'PHD', 'Essence Mediacom'],
    campaignBudgetRange: '$15K-100K per campaign',
    brandCategories: ['Mobile Games', 'Console Games', 'Streaming', 'Telco', 'Retail'],
    avgCPI: '$2.00-5.00', avgCPA: '$6.00-15.00', avgARPU: '$18.00/month', expectedROI: '2.0-3.0x',
    localRepRequired: false, localLanguageRequired: false, incentivesCommon: false,
    incentiveNotes: 'Incentivised installs are not standard practice. Australian audiences value authentic content. Performance marketing is sophisticated — agencies expect full-funnel attribution.',
    culturalNotes: 'Western market dynamics. Agencies operate like US/UK counterparts. Gaming is mainstream across all demographics. Console and PC gaming are significant — not mobile-only.',
    regulatoryNotes: 'ACCC regulates advertising. Influencer disclosure requirements (must label sponsored content). Privacy Act applies. Age-gating required for certain content.',
    localHireProfile: {
      role: 'APAC Head of Partnerships (based in AU)',
      skills: ['Agency sales', 'APAC strategy', 'Performance marketing', 'Cross-market coordination'],
      languages: ['English (native)'],
      salary: '$6,000-10,000/month',
      why: 'Australia is your HQ market and credibility anchor. An AU-based partnerships lead gives agencies confidence and coordinates the SEA/Japan teams. Also handles AU/NZ campaigns directly.'
    }
  },
};

// Summary comparison for quick reference
export function getMarketComparison() {
  return Object.values(MARKET_PROFILES).map(m => ({
    market: m.name,
    flag: m.flag,
    revenue: m.gamingRevenue,
    gamers: m.totalGamers,
    mobileShare: m.mobileShare + '%',
    avgPlaytime: m.avgDailyPlaytime,
    cpi: m.avgCPI,
    arpu: m.avgARPU,
    roi: m.expectedROI,
    measurement: m.measurementMaturity,
    agencyActivity: m.agencyActivity,
    localRepNeeded: m.localRepRequired,
    topGenre: m.dominantGenres[0],
    hireRole: m.localHireProfile.role,
    hireCost: m.localHireProfile.salary,
  }));
}
