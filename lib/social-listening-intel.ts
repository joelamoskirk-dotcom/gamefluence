// Social Listening Intelligence System
// Manual + structured intel feed for tracking APAC gaming market signals
// across platforms, brands, creators, and trends

export interface SocialSignal {
  id: string;
  dateSpotted: string;
  platform: 'twitter' | 'tiktok' | 'youtube' | 'linkedin' | 'instagram' | 'twitch';
  market: string; // country code or 'global'
  category: 'trending_game' | 'brand_campaign' | 'creator_move' | 'market_shift' | 'competitor' | 'opportunity';
  title: string;
  detail: string;
  sourceUrl?: string;
  personOrBrand?: string;
  relevanceScore: number; // 1-10
  actionable: boolean;
  actionNote?: string;
}

export interface MarketSearchQuery {
  market: string;
  platform: string;
  query: string;
  purpose: string;
  frequency: string;
}

export interface BrandTracker {
  brand: string;
  category: string;
  markets: string[];
  lastSeenCampaign: string;
  creatorsUsed: string[];
  estimatedSpend: string;
  notes: string;
}

// ── MARKET-SPECIFIC SEARCH QUERIES ────────────────────────────────────────────
// Run these regularly to stay ahead of the market

export const marketSearchQueries: MarketSearchQuery[] = [
  // VIETNAM
  { market: 'Vietnam', platform: 'TikTok', query: '#gamevietnam OR #gamervn OR #lienquanmobile', purpose: 'Trending Vietnamese gaming content, new creators emerging', frequency: 'Every 2 days' },
  { market: 'Vietnam', platform: 'YouTube', query: 'game mobile vietnam 2026', purpose: 'New game launches being promoted by VN creators', frequency: 'Weekly' },
  { market: 'Vietnam', platform: 'Twitter/X', query: '#VCS OR #ArenaOfValor vietnam', purpose: 'Esports scene activity, tournament announcements', frequency: 'Every 3 days' },
  { market: 'Vietnam', platform: 'Facebook', query: 'Groups: "Game thủ Việt Nam" OR "Cộng đồng game mobile"', purpose: 'Community sentiment, what games are hot in VN gaming groups', frequency: 'Weekly' },

  // INDONESIA
  { market: 'Indonesia', platform: 'TikTok', query: '#gameindonesia OR #mlbb OR #freefire indonesia', purpose: 'Trending ID gaming content, MLBB/FF creator activity', frequency: 'Every 2 days' },
  { market: 'Indonesia', platform: 'YouTube', query: 'mobile legends indonesia creator 2026', purpose: 'New MLBB creators, brand integrations in ID market', frequency: 'Weekly' },
  { market: 'Indonesia', platform: 'Twitter/X', query: '#MPLIndonesia OR #MLBB OR "Mobile Legends" indonesia', purpose: 'MPL tournament buzz, brand sponsors visible', frequency: 'Every 3 days' },
  { market: 'Indonesia', platform: 'Instagram', query: '#gamingindonesia #esportsindonesia', purpose: 'Creator lifestyle content, brand partnerships visible in posts', frequency: 'Weekly' },

  // PHILIPPINES
  { market: 'Philippines', platform: 'TikTok', query: '#gamingph OR #mlbbph OR #valorantph', purpose: 'Filipino gaming trends, new creators', frequency: 'Every 2 days' },
  { market: 'Philippines', platform: 'YouTube', query: 'mobile legends philippines streamer 2026', purpose: 'PH MLBB scene, who brands are working with', frequency: 'Weekly' },
  { market: 'Philippines', platform: 'Twitter/X', query: '#MPLPH OR #ValorantPH OR "gaming Philippines"', purpose: 'Esports activity, brand campaign announcements', frequency: 'Every 3 days' },

  // THAILAND
  { market: 'Thailand', platform: 'TikTok', query: '#เกม OR #RoV OR #Valorant thailand', purpose: 'Thai gaming trends (RoV = Arena of Valor in TH)', frequency: 'Every 3 days' },
  { market: 'Thailand', platform: 'YouTube', query: 'valorant thailand streamer OR "RoV" thailand 2026', purpose: 'Thai Valorant/RoV scene, premium creator content', frequency: 'Weekly' },
  { market: 'Thailand', platform: 'Twitch', query: 'Browse > Thailand > Top channels', purpose: 'Who is streaming in TH, what games, viewer counts', frequency: 'Weekly' },

  // SOUTH KOREA
  { market: 'South Korea', platform: 'Twitch', query: 'Browse > Korea > Top channels (Valorant, LoL)', purpose: 'KR streaming landscape, who is growing', frequency: 'Weekly' },
  { market: 'South Korea', platform: 'YouTube', query: '발로란트 스트리머 OR "league of legends" korea 2026', purpose: 'Korean esports/gaming creator scene', frequency: 'Every 2 weeks' },

  // MALAYSIA & SINGAPORE
  { market: 'Malaysia/Singapore', platform: 'TikTok', query: '#gamingmalaysia OR #gamingsg OR #mlbbmy', purpose: 'MY/SG gaming trends, trilingual content', frequency: 'Weekly' },
  { market: 'Malaysia/Singapore', platform: 'YouTube', query: 'gaming malaysia singapore creator 2026', purpose: 'Cross-border creators, English content hub', frequency: 'Every 2 weeks' },

  // BRAND CAMPAIGNS (cross-market)
  { market: 'Global/APAC', platform: 'Twitter/X', query: '"sponsored" OR "#ad" (mobile legends OR valorant OR "free fire") APAC', purpose: 'Spot active brand campaigns using gaming creators', frequency: 'Every 3 days' },
  { market: 'Global/APAC', platform: 'YouTube', query: '"sponsored by" gaming mobile APAC 2026', purpose: 'Find which brands are spending on gaming creator content', frequency: 'Weekly' },
  { market: 'Global/APAC', platform: 'LinkedIn', query: '"influencer marketing" "gaming" "APAC" OR "Southeast Asia"', purpose: 'Industry moves, agency hires, platform announcements', frequency: 'Every 3 days' },
  { market: 'Global/APAC', platform: 'LinkedIn', query: '"creator economy" "gaming" Australia OR "Asia Pacific"', purpose: 'Thought leadership, competitor activity, market reports', frequency: 'Weekly' },
];

// ── BRANDS TO TRACK ───────────────────────────────────────────────────────────
// Brands actively running gaming creator campaigns in APAC

export const brandsToTrack: BrandTracker[] = [
  { brand: 'Moonton (Mobile Legends)', category: 'Game Publisher', markets: ['ID', 'PH', 'MY', 'SG'], lastSeenCampaign: 'MPL Season 16 creator activations', creatorsUsed: ['Various MPL streamers'], estimatedSpend: '$2M+/season across SEA', notes: 'Biggest spender in SEA gaming creator space. MPL ecosystem is massive.' },
  { brand: 'Garena (Free Fire)', category: 'Game Publisher', markets: ['ID', 'VN', 'TH', 'PH'], lastSeenCampaign: 'Free Fire EWC 2025 creator push', creatorsUsed: ['Regional FF streamers'], estimatedSpend: '$1.5M+/year SEA', notes: 'Strong TikTok Live presence. 155M watch hours on TikTok alone.' },
  { brand: 'Riot Games (Valorant)', category: 'Game Publisher', markets: ['TH', 'KR', 'PH', 'SG'], lastSeenCampaign: 'VCT APAC creator content', creatorsUsed: ['Pro players, casters, content creators'], estimatedSpend: '$500K+/year APAC', notes: 'Growing fast in TH and KR. Red Bull partnership for AU events.' },
  { brand: 'miHoYo/HoYoverse (Genshin)', category: 'Game Publisher', markets: ['TH', 'SG', 'KR', 'VN'], lastSeenCampaign: 'Version update creator previews', creatorsUsed: ['Anime/gaming crossover creators'], estimatedSpend: '$1M+/year APAC', notes: 'Premium brand. Works with anime-adjacent creators. High production value.' },
  { brand: 'EA Sports (FC Mobile)', category: 'Game Publisher', markets: ['ID', 'MY', 'TH', 'KR'], lastSeenCampaign: 'FC Mobile season launch', creatorsUsed: ['Sports + gaming crossover'], estimatedSpend: '$300K+/year SEA', notes: 'Growing in racing/sports genre. Good fit for Gamefluence expertise.' },
  { brand: 'Razer', category: 'Gaming Hardware', markets: ['SG', 'MY', 'ID', 'TH'], lastSeenCampaign: 'Product launches with gaming creators', creatorsUsed: ['Tech reviewers, esports players'], estimatedSpend: '$200K+/year SEA', notes: 'Singapore HQ. Non-endemic brand using gaming creators. Potential Gamefluence client.' },
  { brand: 'Red Bull', category: 'Non-Endemic', markets: ['AU', 'TH', 'KR', 'PH'], lastSeenCampaign: 'Red Bull One for All (Valorant AU)', creatorsUsed: ['Esports pros + content creators'], estimatedSpend: '$500K+/year gaming APAC', notes: 'Major non-endemic brand in gaming. Runs tournaments. Potential agency client.' },
  { brand: 'Shopee', category: 'E-commerce', markets: ['ID', 'PH', 'VN', 'TH', 'MY'], lastSeenCampaign: 'Shopee x gaming creator livestreams', creatorsUsed: ['Gaming + lifestyle creators'], estimatedSpend: '$1M+/year gaming activations', notes: 'E-commerce giant using gaming creators for live commerce. Huge budgets.' },
];

// ── CATEGORY DEFINITIONS ──────────────────────────────────────────────────────

export const signalCategories = {
  trending_game: { label: '🎮 Trending Game', color: 'bg-purple-100 text-purple-700', description: 'New game gaining traction, genre shift, viral moment' },
  brand_campaign: { label: '💰 Brand Campaign', color: 'bg-green-100 text-green-700', description: 'Brand running creator campaign — potential client or competitor intel' },
  creator_move: { label: '👤 Creator Move', color: 'bg-blue-100 text-blue-700', description: 'Creator switching platforms, signing with agency, going viral' },
  market_shift: { label: '📊 Market Shift', color: 'bg-orange-100 text-orange-700', description: 'Platform policy change, new feature, audience behavior shift' },
  competitor: { label: '⚔️ Competitor', color: 'bg-red-100 text-red-700', description: 'Competing platform or agency activity' },
  opportunity: { label: '🎯 Opportunity', color: 'bg-yellow-100 text-yellow-700', description: 'Gap in market, unserved need, timing window' },
};

// ── SAMPLE SIGNALS (seed data) ────────────────────────────────────────────────

export const sampleSignals: SocialSignal[] = [
  {
    id: 'sig_001',
    dateSpotted: '2026-05-25',
    platform: 'twitter',
    market: 'ID',
    category: 'brand_campaign',
    title: 'Shopee x Mobile Legends creator livestream campaign spotted',
    detail: 'Shopee Indonesia running live commerce streams with MLBB creators during MPL playoffs. Creators doing product unboxing while streaming ranked games. Estimated 5-8 creators involved.',
    personOrBrand: 'Shopee Indonesia',
    relevanceScore: 8,
    actionable: true,
    actionNote: 'Shopee is spending big on gaming creators. Could be a Gamefluence client target. Research their agency.',
  },
  {
    id: 'sig_002',
    dateSpotted: '2026-05-24',
    platform: 'tiktok',
    market: 'VN',
    category: 'trending_game',
    title: 'New racing game "Speed Drifters 2" trending in Vietnam TikTok',
    detail: 'NetEase racing game gaining traction with Vietnamese creators. Multiple 1M+ view TikToks in last week. No visible brand campaign yet — organic growth.',
    relevanceScore: 9,
    actionable: true,
    actionNote: 'Racing game + Vietnam = Gamefluence sweet spot. Research if NetEase has APAC marketing agency. Could pitch Gamefluence for their creator campaign.',
  },
  {
    id: 'sig_003',
    dateSpotted: '2026-05-23',
    platform: 'linkedin',
    market: 'global',
    category: 'competitor',
    title: 'Famesters agency expanding APAC gaming division',
    detail: 'Famesters (influencer marketing agency) posted about hiring for APAC gaming vertical. They already have iGaming report. Could become direct competitor.',
    sourceUrl: 'https://famesters.com',
    personOrBrand: 'Famesters',
    relevanceScore: 7,
    actionable: true,
    actionNote: 'Monitor their APAC moves. Differentiate on racing/sports expertise and AI matching. They are generalist — we are specialist.',
  },
  {
    id: 'sig_004',
    dateSpotted: '2026-05-22',
    platform: 'youtube',
    market: 'TH',
    category: 'creator_move',
    title: 'Thai Valorant creator "KadoomVAL" hit 500K subs',
    detail: 'Top Thai Valorant content creator crossed 500K YouTube subscribers. Posting daily. No visible management/agency. High engagement in comments.',
    personOrBrand: 'KadoomVAL',
    relevanceScore: 8,
    actionable: true,
    actionNote: 'Perfect Gamefluence target for Thailand market. 500K and likely unrepresented. Add to outreach pipeline.',
  },
  {
    id: 'sig_005',
    dateSpotted: '2026-05-20',
    platform: 'twitter',
    market: 'PH',
    category: 'opportunity',
    title: 'MLBB M7 viewership record creates brand demand spike',
    detail: 'After M7 hit 5.59M peak viewers, multiple brands tweeting about wanting to "get into mobile esports." Demand > supply of agencies who understand the space.',
    relevanceScore: 9,
    actionable: true,
    actionNote: 'Perfect timing to pitch Gamefluence to brands asking "how do we reach mobile gamers?" Use M7 stats in outreach.',
  },
];
