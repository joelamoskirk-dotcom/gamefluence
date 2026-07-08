// ═══════════════════════════════════════════════════════════════════════════
// DIGITAL TURBINE ACP EDGE — Self-Serve UA Campaign Management
// ═══════════════════════════════════════════════════════════════════════════
// INTERNAL ONLY — Not exposed publicly. This is our backend integration
// with DT's ACP Edge self-serve platform for running app install campaigns.
//
// Revenue model: Client pays us for "UA campaigns" → we run on DT ACP Edge
// → report installs back → keep the margin between what client pays and
// what DT charges. Plus creative production as an add-on revenue stream.
// ═══════════════════════════════════════════════════════════════════════════

// ─── TYPES ──────────────────────────────────────────────────────────────

export type CampaignStatus = 'draft' | 'pending_review' | 'live' | 'paused' | 'completed' | 'cancelled';
export type BidType = 'CPI' | 'CPA' | 'CPE';
export type CreativeFormat = 'interstitial' | 'rewarded' | 'banner' | 'native' | 'offer_wall' | 'singletap';
export type Platform = 'android' | 'ios' | 'both';

export interface DTCampaign {
  id: string;
  clientName: string;
  appName: string;
  appStoreUrl: string;
  platform: Platform;
  status: CampaignStatus;
  
  // What the client pays us
  clientBudget: {
    totalBudget: number;
    dailyCap: number;
    clientCPI: number; // What we charge client per install
  };
  
  // What we pay DT (our actual cost)
  dtConfig: {
    dtCPI: number; // What DT charges us per install
    bidType: BidType;
    countries: string[];
    sources?: string[];
    dailyBudgetOnDT: number;
  };
  
  // Our margin
  margin: {
    perInstall: number; // clientCPI - dtCPI
    marginPercent: number;
    projectedMonthlyProfit: number;
  };
  
  // Creatives (additional revenue stream)
  creatives: Creative[];
  
  // Tracking
  tracking: {
    mmpPartner: 'appsflyer' | 'adjust' | 'singular' | 'branch';
    trackingLink: string;
    postbackUrl?: string;
    events: { name: string; payout?: number }[];
  };
  
  // Performance
  performance: {
    installs: number;
    spend: number;
    revenue: number; // What client has paid us
    profit: number;
    avgCPI: number;
    countries: { country: string; installs: number; cpi: number }[];
  };
  
  createdAt: string;
  updatedAt: string;
}

export interface Creative {
  id: string;
  name: string;
  format: CreativeFormat;
  dimensions: string;
  fileUrl?: string;
  status: 'draft' | 'in_production' | 'review' | 'approved' | 'live';
  // Creative production pricing
  productionCost: number; // What it costs us to make (or $0 if we do it ourselves)
  clientCharge: number; // What we charge the client
  creativeMargin: number;
}

// ─── REVENUE STREAMS ────────────────────────────────────────────────────

export interface RevenueStream {
  id: string;
  name: string;
  type: 'ua_margin' | 'creative_production' | 'management_fee' | 'creator_commission' | 'affiliate' | 'clipping_service';
  description: string;
  monthlyRevenue: number;
  marginPercent: number;
  effort: 'low' | 'medium' | 'high';
  scalable: boolean;
}

export const REVENUE_STREAMS: RevenueStream[] = [
  {
    id: 'dt_ua_margin',
    name: 'UA Campaign Margin (DT ACP Edge)',
    type: 'ua_margin',
    description: 'Client pays us $X CPI, we buy installs on DT for $Y CPI, keep the spread. Self-serve dashboard means zero ops overhead once set up.',
    monthlyRevenue: 0, // Populate per campaign
    marginPercent: 30, // Target 30-40% margin on installs
    effort: 'low',
    scalable: true,
  },
  {
    id: 'creative_production',
    name: 'Creative Production',
    type: 'creative_production',
    description: 'Build ad creatives for clients: video, playables, banners, end cards. Charge $500-$5000 per set. We make them ourselves = near-100% margin.',
    monthlyRevenue: 0,
    marginPercent: 85,
    effort: 'medium',
    scalable: true,
  },
  {
    id: 'creator_management',
    name: 'Creator Management (20% Commission)',
    type: 'creator_commission',
    description: 'Talent representation — 20% of creator earnings. Already operating with Jacob Tabor deal.',
    monthlyRevenue: 2700,
    marginPercent: 100, // Pure commission
    effort: 'medium',
    scalable: true,
  },
  {
    id: 'content_clipping',
    name: 'Content Clipping Service',
    type: 'clipping_service',
    description: 'Clip long-form creator content into platform-optimised shorts. Charge studios per-clip or monthly retainer. Easy win for Kick creators (nobody does this).',
    monthlyRevenue: 0,
    marginPercent: 90,
    effort: 'low',
    scalable: true,
  },
  {
    id: 'affiliate_revenue',
    name: 'Affiliate Revenue',
    type: 'affiliate',
    description: 'Revenue share on product sales driven through creator links. 50/50 split with creator on each sale.',
    monthlyRevenue: 0,
    marginPercent: 50,
    effort: 'low',
    scalable: true,
  },
];

// ─── DT ACP EDGE CONFIGURATION ─────────────────────────────────────────

export const DT_CONFIG = {
  // ACP Edge dashboard access
  dashboardUrl: 'https://acp.digitalturbine.com',
  
  // Supported countries for AU-focused campaigns
  primaryMarkets: ['AU', 'NZ'],
  secondaryMarkets: ['SG', 'MY', 'TH', 'VN', 'ID', 'PH', 'KR', 'JP'],
  
  // Typical CPI ranges by market (what DT charges us)
  cpiRanges: {
    AU: { min: 1.50, max: 4.00, avg: 2.50 },
    NZ: { min: 1.20, max: 3.50, avg: 2.00 },
    SG: { min: 1.00, max: 3.00, avg: 1.80 },
    MY: { min: 0.50, max: 1.50, avg: 0.80 },
    TH: { min: 0.40, max: 1.20, avg: 0.70 },
    VN: { min: 0.30, max: 1.00, avg: 0.50 },
    ID: { min: 0.30, max: 0.90, avg: 0.45 },
    PH: { min: 0.35, max: 1.00, avg: 0.55 },
    KR: { min: 2.00, max: 6.00, avg: 3.50 },
    JP: { min: 2.50, max: 7.00, avg: 4.00 },
  } as Record<string, { min: number; max: number; avg: number }>,
  
  // What we charge clients (markup over DT cost)
  markupStrategy: {
    defaultMarkup: 0.35, // 35% markup on DT cost
    premiumMarkup: 0.50, // 50% for premium service / small budgets
    volumeMarkup: 0.25, // 25% for high-volume clients (>$50K/mo)
  },
  
  // Available ad formats on DT
  formats: ['interstitial', 'rewarded', 'banner', 'native', 'offer_wall', 'singletap'] as CreativeFormat[],
  
  // SingleTap = frictionless install (no redirect to app store, installs in background)
  singleTapNote: 'SingleTap installs happen without leaving the app — highest conversion format. Premium pricing justified.',
};

// ─── CAMPAIGN MANAGEMENT FUNCTIONS ──────────────────────────────────────

export function calculateMargin(clientCPI: number, dtCPI: number): { perInstall: number; marginPercent: number } {
  const perInstall = clientCPI - dtCPI;
  const marginPercent = (perInstall / clientCPI) * 100;
  return { perInstall, marginPercent };
}

export function calculateClientCPI(country: string, markup?: number): number {
  const range = DT_CONFIG.cpiRanges[country];
  if (!range) return 3.00; // Default for unknown markets
  const effectiveMarkup = markup || DT_CONFIG.markupStrategy.defaultMarkup;
  return Number((range.avg * (1 + effectiveMarkup)).toFixed(2));
}

export function projectMonthlyProfit(campaign: DTCampaign): number {
  const dailyInstalls = campaign.dtConfig.dailyBudgetOnDT / campaign.dtConfig.dtCPI;
  const dailyProfit = dailyInstalls * campaign.margin.perInstall;
  return dailyProfit * 30;
}

export function generateInstallReport(campaign: DTCampaign): {
  totalInstalls: number;
  totalClientSpend: number;
  totalDTCost: number;
  grossProfit: number;
  marginPercent: number;
} {
  const totalInstalls = campaign.performance.installs;
  const totalClientSpend = totalInstalls * campaign.clientBudget.clientCPI;
  const totalDTCost = totalInstalls * campaign.dtConfig.dtCPI;
  const grossProfit = totalClientSpend - totalDTCost;
  const marginPercent = totalClientSpend > 0 ? (grossProfit / totalClientSpend) * 100 : 0;
  
  return { totalInstalls, totalClientSpend, totalDTCost, grossProfit, marginPercent };
}

// ─── CREATIVE PRODUCTION PRICING ────────────────────────────────────────

export const CREATIVE_PRICING = {
  // What we charge clients for creative production
  packages: [
    {
      name: 'Starter Creative Pack',
      includes: ['3x static banners (300x250, 320x480, 728x90)', '1x end card', 'Copywriting'],
      price: 500,
      cost: 50, // Our cost (just our time + tools)
      margin: 450,
    },
    {
      name: 'Video Ad Pack',
      includes: ['1x 15s video ad', '1x 30s video ad', '3x static banners', 'End cards for each'],
      price: 2000,
      cost: 200,
      margin: 1800,
    },
    {
      name: 'Full Creative Suite',
      includes: ['3x video ads (15s, 30s, 60s)', '5x static banners all sizes', 'Playable ad concept', 'A/B test variants', 'Platform-specific cuts'],
      price: 5000,
      cost: 500,
      margin: 4500,
    },
    {
      name: 'Content Clipping Pack',
      includes: ['10x clips from creator long-form', 'Platform-optimised (YT Shorts, TT, IG Reels, Kick)', 'Captions + CTAs added', 'Deep links embedded'],
      price: 1500,
      cost: 100, // Our time with automated tools
      margin: 1400,
    },
  ],
};

// ─── ACTIVE CAMPAIGNS (Seed) ────────────────────────────────────────────

export const DT_CAMPAIGNS: DTCampaign[] = [
  // Placeholder — populate when first client campaign goes live
];

// ─── HELPER: Build campaign from client brief ───────────────────────────

export function createCampaignFromBrief(brief: {
  clientName: string;
  appName: string;
  appStoreUrl: string;
  platform: Platform;
  countries: string[];
  monthlyBudget: number;
  mmpPartner: 'appsflyer' | 'adjust' | 'singular' | 'branch';
  trackingLink: string;
}): DTCampaign {
  // Calculate optimal CPI and margin per country
  const primaryCountry = brief.countries[0] || 'AU';
  const dtCPI = DT_CONFIG.cpiRanges[primaryCountry]?.avg || 2.50;
  const clientCPI = calculateClientCPI(primaryCountry);
  const marginCalc = calculateMargin(clientCPI, dtCPI);
  
  const dailyBudget = brief.monthlyBudget / 30;
  const dailyDTBudget = dailyBudget * (1 - marginCalc.marginPercent / 100);
  
  return {
    id: `dt_${Date.now()}`,
    clientName: brief.clientName,
    appName: brief.appName,
    appStoreUrl: brief.appStoreUrl,
    platform: brief.platform,
    status: 'draft',
    clientBudget: {
      totalBudget: brief.monthlyBudget,
      dailyCap: dailyBudget,
      clientCPI,
    },
    dtConfig: {
      dtCPI,
      bidType: 'CPI',
      countries: brief.countries,
      dailyBudgetOnDT: dailyDTBudget,
    },
    margin: {
      perInstall: marginCalc.perInstall,
      marginPercent: marginCalc.marginPercent,
      projectedMonthlyProfit: (dailyDTBudget / dtCPI) * marginCalc.perInstall * 30,
    },
    creatives: [],
    tracking: {
      mmpPartner: brief.mmpPartner,
      trackingLink: brief.trackingLink,
      events: [{ name: 'install' }],
    },
    performance: {
      installs: 0,
      spend: 0,
      revenue: 0,
      profit: 0,
      avgCPI: 0,
      countries: [],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
