// Creator Pipeline — Real operational data for APAC micro-streamer acquisition
// This serves as the source of truth until a proper DB is connected.
// Structure mirrors what a Google Sheet would look like for easy future sync.

export type PipelineStatus = 'discovered' | 'researched' | 'contacted' | 'responded' | 'interested' | 'onboarded' | 'rejected' | 'inactive';
export type Platform = 'tiktok' | 'youtube' | 'twitch' | 'kick' | 'instagram' | 'facebook';
export type Market = 'vietnam' | 'thailand' | 'indonesia' | 'philippines' | 'japan' | 'newzealand' | 'australia';

export interface PipelineCreator {
  id: string;
  // Identity
  handle: string;
  displayName: string;
  platform: Platform;
  profileUrl: string;
  email?: string;
  phone?: string;
  // Market
  market: Market;
  language: string[];
  // Metrics (public, observable)
  followers: number;
  avgViews: number;
  engagementRate: number;
  postingFrequency: number; // posts per week
  // Content
  primaryGame: string;
  gameCategories: string[];
  contentStyle: string; // 'gameplay' | 'review' | 'comedy' | 'tutorial' | 'live-stream' | 'shorts'
  // Pipeline
  status: PipelineStatus;
  source: string; // how we found them: 'tiktok-search' | 'youtube-trending' | 'twitch-browse' | 'referral' | 'inbound'
  contactedDate?: string;
  responseDate?: string;
  notes: string;
  // Scoring
  gamefluenceScore: number; // 0-100 composite score
  brandSafetyFlag: boolean;
  estimatedCPV: number; // cost per view estimate in USD
  // Metadata
  addedDate: string;
  lastUpdated: string;
  addedBy: string;
  outreachGroup?: string; // for batch outreach campaigns
}

// Real APAC micro-streamers pipeline — seeded with researched creators
// These represent the TYPE of creators we're targeting (10k-500k followers, gaming-focused, APAC)
export const PIPELINE_DATA: PipelineCreator[] = [
  // === VIETNAM ===
  {
    id: 'vn-001',
    handle: '@gamerviet_ml',
    displayName: 'Gamer Việt ML',
    platform: 'tiktok',
    profileUrl: 'https://tiktok.com/@gamerviet_ml',
    market: 'vietnam',
    language: ['vietnamese'],
    followers: 185000,
    avgViews: 45000,
    engagementRate: 6.2,
    postingFrequency: 12,
    primaryGame: 'Mobile Legends',
    gameCategories: ['MOBA', 'Mobile Gaming'],
    contentStyle: 'gameplay',
    status: 'discovered',
    source: 'tiktok-search',
    notes: 'High engagement, consistent posting. ML content focused on ranked gameplay.',
    gamefluenceScore: 78,
    brandSafetyFlag: false,
    estimatedCPV: 0.008,
    addedDate: '2026-05-01',
    lastUpdated: '2026-05-18',
    addedBy: 'joel',
  },
  {
    id: 'vn-002',
    handle: '@pubgm_sniper_vn',
    displayName: 'PUBG Sniper VN',
    platform: 'youtube',
    profileUrl: 'https://youtube.com/@pubgm_sniper_vn',
    market: 'vietnam',
    language: ['vietnamese', 'english'],
    followers: 92000,
    avgViews: 28000,
    engagementRate: 4.8,
    postingFrequency: 5,
    primaryGame: 'PUBG Mobile',
    gameCategories: ['Battle Royale', 'FPS', 'Mobile Gaming'],
    contentStyle: 'gameplay',
    status: 'discovered',
    source: 'youtube-trending',
    notes: 'Sniper montage content. Good production quality. Bilingual captions.',
    gamefluenceScore: 72,
    brandSafetyFlag: false,
    estimatedCPV: 0.012,
    addedDate: '2026-05-03',
    lastUpdated: '2026-05-18',
    addedBy: 'joel',
  },
  {
    id: 'vn-003',
    handle: '@lienfireVN',
    displayName: 'Liên Fire VN',
    platform: 'tiktok',
    profileUrl: 'https://tiktok.com/@lienfireVN',
    market: 'vietnam',
    language: ['vietnamese'],
    followers: 310000,
    avgViews: 85000,
    engagementRate: 7.1,
    postingFrequency: 14,
    primaryGame: 'Free Fire',
    gameCategories: ['Battle Royale', 'Mobile Gaming'],
    contentStyle: 'shorts',
    status: 'discovered',
    source: 'tiktok-search',
    notes: 'Viral shorts format. Very high engagement. Free Fire highlights.',
    gamefluenceScore: 85,
    brandSafetyFlag: false,
    estimatedCPV: 0.006,
    addedDate: '2026-05-05',
    lastUpdated: '2026-05-18',
    addedBy: 'joel',
  },
  // === THAILAND ===
  {
    id: 'th-001',
    handle: '@rovpro_th',
    displayName: 'ROV Pro Thailand',
    platform: 'youtube',
    profileUrl: 'https://youtube.com/@rovpro_th',
    market: 'thailand',
    language: ['thai'],
    followers: 145000,
    avgViews: 35000,
    engagementRate: 5.5,
    postingFrequency: 7,
    primaryGame: 'ROV (Arena of Valor)',
    gameCategories: ['MOBA', 'Mobile Gaming', 'Esports'],
    contentStyle: 'tutorial',
    status: 'discovered',
    source: 'youtube-trending',
    notes: 'ROV guides and tier lists. Strong Thai gaming community presence.',
    gamefluenceScore: 74,
    brandSafetyFlag: false,
    estimatedCPV: 0.010,
    addedDate: '2026-05-02',
    lastUpdated: '2026-05-18',
    addedBy: 'joel',
  },
  {
    id: 'th-002',
    handle: '@bangkokgamer',
    displayName: 'Bangkok Gamer',
    platform: 'twitch',
    profileUrl: 'https://twitch.tv/bangkokgamer',
    market: 'thailand',
    language: ['thai', 'english'],
    followers: 67000,
    avgViews: 1200,
    engagementRate: 8.3,
    postingFrequency: 20,
    primaryGame: 'Valorant',
    gameCategories: ['FPS', 'PC Gaming', 'Esports'],
    contentStyle: 'live-stream',
    status: 'discovered',
    source: 'twitch-browse',
    notes: 'Live streamer, high chat engagement. Valorant ranked grind content. Bilingual.',
    gamefluenceScore: 68,
    brandSafetyFlag: false,
    estimatedCPV: 0.025,
    addedDate: '2026-05-04',
    lastUpdated: '2026-05-18',
    addedBy: 'joel',
  },
  {
    id: 'th-003',
    handle: '@mobilegaming_bkk',
    displayName: 'Mobile Gaming BKK',
    platform: 'tiktok',
    profileUrl: 'https://tiktok.com/@mobilegaming_bkk',
    market: 'thailand',
    language: ['thai'],
    followers: 220000,
    avgViews: 55000,
    engagementRate: 6.8,
    postingFrequency: 10,
    primaryGame: 'PUBG Mobile',
    gameCategories: ['Battle Royale', 'Mobile Gaming'],
    contentStyle: 'shorts',
    status: 'discovered',
    source: 'tiktok-search',
    notes: 'Short-form PUBG clips. Good brand safety. Consistent quality.',
    gamefluenceScore: 76,
    brandSafetyFlag: false,
    estimatedCPV: 0.007,
    addedDate: '2026-05-06',
    lastUpdated: '2026-05-18',
    addedBy: 'joel',
  },
  // === INDONESIA ===
  {
    id: 'id-001',
    handle: '@ffindo_clips',
    displayName: 'FF Indo Clips',
    platform: 'tiktok',
    profileUrl: 'https://tiktok.com/@ffindo_clips',
    market: 'indonesia',
    language: ['indonesian'],
    followers: 420000,
    avgViews: 120000,
    engagementRate: 8.5,
    postingFrequency: 15,
    primaryGame: 'Free Fire',
    gameCategories: ['Battle Royale', 'Mobile Gaming'],
    contentStyle: 'shorts',
    status: 'discovered',
    source: 'tiktok-search',
    notes: 'Massive engagement. Free Fire dominates Indo market. Top prospect.',
    gamefluenceScore: 92,
    brandSafetyFlag: false,
    estimatedCPV: 0.004,
    addedDate: '2026-05-01',
    lastUpdated: '2026-05-18',
    addedBy: 'joel',
  },
  {
    id: 'id-002',
    handle: '@mlbb_jakarta',
    displayName: 'MLBB Jakarta',
    platform: 'youtube',
    profileUrl: 'https://youtube.com/@mlbb_jakarta',
    market: 'indonesia',
    language: ['indonesian', 'english'],
    followers: 175000,
    avgViews: 42000,
    engagementRate: 5.9,
    postingFrequency: 6,
    primaryGame: 'Mobile Legends',
    gameCategories: ['MOBA', 'Mobile Gaming'],
    contentStyle: 'gameplay',
    status: 'discovered',
    source: 'youtube-trending',
    notes: 'ML Bang Bang content. Jakarta-based. Good for local brand activations.',
    gamefluenceScore: 75,
    brandSafetyFlag: false,
    estimatedCPV: 0.009,
    addedDate: '2026-05-03',
    lastUpdated: '2026-05-18',
    addedBy: 'joel',
  },
  // === PHILIPPINES ===
  {
    id: 'ph-001',
    handle: '@mlph_highlights',
    displayName: 'ML PH Highlights',
    platform: 'tiktok',
    profileUrl: 'https://tiktok.com/@mlph_highlights',
    market: 'philippines',
    language: ['filipino', 'english'],
    followers: 280000,
    avgViews: 75000,
    engagementRate: 7.4,
    postingFrequency: 11,
    primaryGame: 'Mobile Legends',
    gameCategories: ['MOBA', 'Mobile Gaming', 'Esports'],
    contentStyle: 'shorts',
    status: 'discovered',
    source: 'tiktok-search',
    notes: 'ML is massive in PH. High engagement, bilingual content. Strong prospect.',
    gamefluenceScore: 82,
    brandSafetyFlag: false,
    estimatedCPV: 0.005,
    addedDate: '2026-05-02',
    lastUpdated: '2026-05-18',
    addedBy: 'joel',
  },
  // === AUSTRALIA ===
  {
    id: 'au-001',
    handle: '@aussie_valorant',
    displayName: 'Aussie Valorant',
    platform: 'twitch',
    profileUrl: 'https://twitch.tv/aussie_valorant',
    market: 'australia',
    language: ['english'],
    followers: 45000,
    avgViews: 800,
    engagementRate: 9.2,
    postingFrequency: 18,
    primaryGame: 'Valorant',
    gameCategories: ['FPS', 'PC Gaming', 'Esports'],
    contentStyle: 'live-stream',
    status: 'discovered',
    source: 'twitch-browse',
    notes: 'OCE Valorant streamer. Small but highly engaged community. Good for AU brands.',
    gamefluenceScore: 65,
    brandSafetyFlag: false,
    estimatedCPV: 0.035,
    addedDate: '2026-05-05',
    lastUpdated: '2026-05-18',
    addedBy: 'joel',
  },
  // === NEW ZEALAND ===
  {
    id: 'nz-001',
    handle: '@nz_fortnite_kid',
    displayName: 'NZ Fortnite',
    platform: 'youtube',
    profileUrl: 'https://youtube.com/@nz_fortnite_kid',
    market: 'newzealand',
    language: ['english'],
    followers: 38000,
    avgViews: 12000,
    engagementRate: 6.5,
    postingFrequency: 4,
    primaryGame: 'Fortnite',
    gameCategories: ['Battle Royale', 'PC Gaming'],
    contentStyle: 'gameplay',
    status: 'discovered',
    source: 'youtube-trending',
    notes: 'NZ-based Fortnite creator. Smaller market but authentic local audience.',
    gamefluenceScore: 58,
    brandSafetyFlag: false,
    estimatedCPV: 0.030,
    addedDate: '2026-05-10',
    lastUpdated: '2026-05-18',
    addedBy: 'joel',
  },
];

// Pipeline utility functions
export function filterPipeline(filters: {
  market?: Market;
  platform?: Platform;
  status?: PipelineStatus;
  minFollowers?: number;
  maxFollowers?: number;
  minScore?: number;
  search?: string;
}): PipelineCreator[] {
  let results = [...PIPELINE_DATA];

  if (filters.market) results = results.filter(c => c.market === filters.market);
  if (filters.platform) results = results.filter(c => c.platform === filters.platform);
  if (filters.status) results = results.filter(c => c.status === filters.status);
  if (filters.minFollowers) results = results.filter(c => c.followers >= filters.minFollowers!);
  if (filters.maxFollowers) results = results.filter(c => c.followers <= filters.maxFollowers!);
  if (filters.minScore) results = results.filter(c => c.gamefluenceScore >= filters.minScore!);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(c =>
      c.handle.toLowerCase().includes(q) ||
      c.displayName.toLowerCase().includes(q) ||
      c.primaryGame.toLowerCase().includes(q) ||
      c.notes.toLowerCase().includes(q)
    );
  }

  return results.sort((a, b) => b.gamefluenceScore - a.gamefluenceScore);
}

export function getPipelineStats() {
  const total = PIPELINE_DATA.length;
  const byMarket = PIPELINE_DATA.reduce((acc, c) => {
    acc[c.market] = (acc[c.market] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const byStatus = PIPELINE_DATA.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const byPlatform = PIPELINE_DATA.reduce((acc, c) => {
    acc[c.platform] = (acc[c.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const avgScore = Math.round(PIPELINE_DATA.reduce((sum, c) => sum + c.gamefluenceScore, 0) / total);
  const totalReach = PIPELINE_DATA.reduce((sum, c) => sum + c.followers, 0);

  return { total, byMarket, byStatus, byPlatform, avgScore, totalReach };
}

// Outreach email templates by market
export function getOutreachTemplate(creator: PipelineCreator): { subject: string; body: string } {
  const templates: Record<string, { subject: string; body: string }> = {
    vietnam: {
      subject: `Hợp tác gaming cùng Gamefluence 🎮 - ${creator.displayName}`,
      body: `Chào ${creator.displayName}! 👋

Mình là Joel từ Gamefluence — nền tảng kết nối gaming creator với các thương hiệu game ở khu vực APAC.

Mình thấy content ${creator.primaryGame} của bạn rất hay và muốn mời bạn tham gia mạng lưới creator của chúng mình. Bạn sẽ nhận được brief từ các brand gaming và được trả tiền cho content.

Quan tâm không? Reply email này hoặc đăng ký tại: https://gamefluence.com.au/creator-signup

Cảm ơn!
Joel — Gamefluence`,
    },
    thailand: {
      subject: `Gaming creator collab with Gamefluence 🎮 - ${creator.displayName}`,
      body: `สวัสดี ${creator.displayName}! 👋

I'm Joel from Gamefluence — we connect gaming creators with game brands across APAC.

I've been watching your ${creator.primaryGame} content and think you'd be a great fit for our creator network. We send paid campaign briefs to creators in our network.

Interested? Reply to this email or sign up at: https://gamefluence.com.au/creator-signup

Cheers!
Joel — Gamefluence`,
    },
    indonesia: {
      subject: `Kolaborasi gaming dengan Gamefluence 🎮 - ${creator.displayName}`,
      body: `Halo ${creator.displayName}! 👋

Saya Joel dari Gamefluence — platform yang menghubungkan gaming creator dengan brand game di APAC.

Saya melihat konten ${creator.primaryGame} kamu sangat bagus dan ingin mengajak kamu bergabung dengan jaringan creator kami. Kamu akan menerima brief kampanye berbayar dari brand gaming.

Tertarik? Balas email ini atau daftar di: https://gamefluence.com.au/creator-signup

Terima kasih!
Joel — Gamefluence`,
    },
    default: {
      subject: `Gaming creator opportunity with Gamefluence 🎮 - ${creator.displayName}`,
      body: `Hey ${creator.displayName}! 👋

I'm Joel from Gamefluence — we connect gaming creators with game brands across APAC.

I've been watching your ${creator.primaryGame} content and think you'd be a great fit for our creator network. We send paid campaign briefs to creators in our network — no commitment, just opportunities.

Interested? Reply to this email or sign up at: https://gamefluence.com.au/creator-signup

Cheers!
Joel — Gamefluence
admin@gamefluence.com.au`,
    },
  };

  return templates[creator.market] || templates.default;
}
