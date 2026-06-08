// Brand Integration Tracker — Gamefluence + Mobileyes
// Tracks brand integrations within creator content (videos, streams, posts)
// Logs timestamps, duration, format, and performance of each integration
// Competitive intelligence on how other brands/platforms execute integrations

export interface BrandIntegration {
  id: string;
  // Content info
  creatorId: string;
  creatorName: string;
  contentUrl: string;
  platform: 'youtube' | 'tiktok' | 'twitch' | 'instagram' | 'kick' | 'whatnot';
  contentType: 'video' | 'live_stream' | 'short' | 'story' | 'post';
  contentTitle: string;
  totalDuration: number; // seconds
  publishedAt: string;
  // Integration details
  brandName: string;
  campaignId: string;
  integrationType: 'pre_roll' | 'mid_roll' | 'post_roll' | 'native' | 'overlay' | 'live_mention' | 'product_placement' | 'dedicated';
  integrationStart: number; // seconds from start
  integrationEnd: number; // seconds from start
  integrationDuration: number; // seconds
  // What was said/shown
  ctaType: 'link_in_bio' | 'promo_code' | 'qr_code' | 'verbal_url' | 'pinned_comment' | 'overlay_link' | 'none';
  ctaContent: string; // the actual CTA text/code
  script: string; // what the creator said (summary)
  tone: 'natural' | 'scripted' | 'enthusiastic' | 'subtle' | 'hard_sell';
  // Performance (filled after tracking period)
  viewsAtIntegration: number;
  clicksFromIntegration: number;
  conversionsFromIntegration: number;
  ctr: number;
  cvr: number;
  // Quality scoring
  seamlessness: number; // 1-10 (how natural does the integration feel)
  brandAlignment: number; // 1-10 (does the brand fit the creator's content)
  audienceReception: number; // 1-10 (comments sentiment about the integration)
  overallScore: number; // calculated
  // Competitive intel
  isCompetitor: boolean; // is this a competitor's integration we're tracking
  competitorNotes: string;
}

export interface CompetitiveIntegration {
  id: string;
  brand: string;
  platform: string;
  creator: string;
  creatorFollowers: number;
  contentUrl: string;
  integrationType: string;
  estimatedCost: string;
  effectiveness: 'high' | 'medium' | 'low';
  whatWorked: string;
  whatDidnt: string;
  lessonsForUs: string;
  spottedDate: string;
}

// ── INTEGRATION TEMPLATES ─────────────────────────────────────────────────────
// Best practices for different integration formats

export const integrationTemplates = {
  gaming_pre_roll: {
    name: 'Gaming Pre-Roll (30-60s)',
    duration: '30-60 seconds',
    placement: 'First 30-90 seconds of video',
    script: `"Before we get into today's gameplay, quick shout out to [BRAND] — they're [VALUE PROP]. If you're looking for [BENEFIT], check the link in my bio / use code [CODE] for [OFFER]. Now let's get into it."`,
    bestFor: 'YouTube gaming videos, VODs',
    tips: [
      'Keep under 60 seconds — audience drops off after that',
      'Make it conversational, not scripted',
      'Show the product/app on screen while talking',
      'Transition smoothly into gameplay',
    ],
    expectedCTR: '2-4%',
    exampleBrands: ['NordVPN', 'Raid Shadow Legends', 'Whatnot'],
  },
  gaming_mid_roll: {
    name: 'Gaming Mid-Roll (15-30s)',
    duration: '15-30 seconds',
    placement: 'Natural break point (death, loading screen, round end)',
    script: `"While we wait for the next round — [BRAND] is [VALUE PROP]. I've been using it for [PERSONAL EXPERIENCE]. Link below, code [CODE]. Alright, we're back."`,
    bestFor: 'Longer gameplay sessions, live streams',
    tips: [
      'Place at natural pauses (death screen, lobby, loading)',
      'Keep it 15-30 seconds max',
      'Personal experience > feature list',
      'Works best when creator genuinely uses the product',
    ],
    expectedCTR: '1.5-3%',
    exampleBrands: ['G Fuel', 'Backbone controller', 'Discord Nitro'],
  },
  live_stream_mention: {
    name: 'Live Stream Integration (Ongoing)',
    duration: 'Multiple mentions across stream',
    placement: 'Overlay + verbal mentions every 20-30 mins',
    script: `Casual mentions woven into natural conversation. "Chat, if you want to [BENEFIT], [BRAND] is running [OFFER] today — I'll drop the link in chat."`,
    bestFor: 'Twitch, Kick, TikTok Live, YouTube Live',
    tips: [
      'Pin the link in chat throughout stream',
      'Mention naturally 3-5 times over the session',
      'Use overlay/banner that stays visible',
      'React to chat questions about the product',
      'Whatnot model: integrate the product INTO the stream content (unboxing, giveaway)',
    ],
    expectedCTR: '3-8% (live has higher intent)',
    exampleBrands: ['Whatnot', 'Kick bonuses', 'Energy drinks'],
  },
  tiktok_native: {
    name: 'TikTok Native Integration (Full Video)',
    duration: '15-60 seconds (entire video)',
    placement: 'The video IS the integration',
    script: `The whole video is about the brand but framed as entertainment. "POV: When [RELATABLE GAMING SCENARIO] and [BRAND] saves the day" or challenge/duet format.`,
    bestFor: 'TikTok, YouTube Shorts, Instagram Reels',
    tips: [
      'Must feel like organic content, not an ad',
      'Hook in first 1 second — no "this video is sponsored by"',
      'Use trending audio/format but apply to brand message',
      'The best TikTok integrations don\'t feel like integrations',
    ],
    expectedCTR: '1-5% (high variance)',
    exampleBrands: ['Gaming phone brands', 'Snack brands', 'Game launches'],
  },
  whatnot_live_commerce: {
    name: 'Whatnot-Style Live Commerce',
    duration: 'Full stream session (1-4 hours)',
    placement: 'The entire stream is the integration',
    script: `Creator runs a live auction/unboxing/giveaway session. Brand product is the CONTENT, not a break from it. "Next up we've got [PRODUCT] — starting bid at $1, who wants it?"`,
    bestFor: 'Collectibles, gaming hardware, merch drops',
    tips: [
      'The product IS the entertainment — not interrupting it',
      'Scarcity drives action (limited quantities, auctions)',
      'Community engagement (chat decides, votes on items)',
      'MrBeast x Whatnot: $1M giveaway = ultimate example',
      'Works for: gaming collectibles, rare items, hardware, signed merch',
    ],
    expectedCTR: '10-30% (live commerce is highest conversion)',
    exampleBrands: ['Whatnot', 'eBay Live', 'TikTok Shop'],
  },
};

// ── TRACKING FUNCTIONS ────────────────────────────────────────────────────────

export function logIntegration(integration: BrandIntegration): void {
  // Calculate overall score
  integration.overallScore = Math.round(
    (integration.seamlessness * 0.3 +
    integration.brandAlignment * 0.3 +
    integration.audienceReception * 0.4)
  );

  // In production: write to Google Sheets or database
  console.log(`[integration-tracker] Logged: ${integration.creatorName} × ${integration.brandName} (${integration.integrationType}, score: ${integration.overallScore}/10)`);
}

export function logCompetitorIntegration(intel: CompetitiveIntegration): void {
  console.log(`[competitive-intel] Spotted: ${intel.creator} × ${intel.brand} on ${intel.platform} — ${intel.effectiveness} effectiveness`);
}

// ── BRIEF GENERATOR ───────────────────────────────────────────────────────────
// Generate integration briefs for creators based on campaign type

export function generateIntegrationBrief(params: {
  brand: string;
  product: string;
  offer: string;
  promoCode: string;
  platform: 'youtube' | 'tiktok' | 'twitch' | 'kick';
  contentType: 'video' | 'live_stream' | 'short';
  creatorName: string;
  keyMessage: string;
}): string {
  const { brand, product, offer, promoCode, platform, contentType, creatorName, keyMessage } = params;

  if (platform === 'tiktok' || contentType === 'short') {
    return `INTEGRATION BRIEF — ${creatorName} × ${brand}

Format: TikTok/Short (15-60s native content)
Key message: ${keyMessage}
CTA: Link in bio + code ${promoCode}
Offer: ${offer}

Requirements:
- Video must feel native to your content style
- No "this video is sponsored by" opening
- Hook viewers in first 1 second
- Show ${product} naturally in context
- Mention code "${promoCode}" verbally
- Pin link in comments

Do NOT:
- Read from a script
- Make it feel like an ad
- Use the brand's marketing language verbatim

Deadline: [TBD]
Payment: [TBD] within 7 days of publish`;
  }

  if (contentType === 'live_stream') {
    return `INTEGRATION BRIEF — ${creatorName} × ${brand}

Format: Live Stream Integration (mentions throughout)
Key message: ${keyMessage}
CTA: Chat link + code ${promoCode}
Offer: ${offer}

Requirements:
- Pin ${brand} link in chat at stream start
- Mention naturally 3-5 times over the session
- First mention within 15 minutes of going live
- Show ${product} on screen when mentioning
- React to any chat questions about the brand

Integration windows:
1. Stream start (within first 15 min)
2. After a natural break (death, round end)
3. Before ending stream (final mention)

Do NOT:
- Force a mention in the middle of intense gameplay
- Ignore chat questions about the product
- Make it sound scripted

Deadline: Stream must go live by [TBD]
Payment: [TBD] within 7 days of stream`;
  }

  // Default: YouTube video pre-roll/mid-roll
  return `INTEGRATION BRIEF — ${creatorName} × ${brand}

Format: YouTube Video Integration (30-60s segment)
Key message: ${keyMessage}
CTA: Link in description + code ${promoCode}
Offer: ${offer}

Requirements:
- 30-60 second integration segment
- Place in first 90 seconds (pre-roll) OR at natural break (mid-roll)
- Show ${product} on screen while speaking
- Mention code "${promoCode}" clearly
- Include link in video description (first 3 lines)

Talking points (choose 2-3, make it natural):
- What ${product} is
- Why you personally use/like it
- The offer (${offer})
- Code ${promoCode}

Do NOT:
- Exceed 60 seconds
- Read directly from brand copy
- Place integration where it disrupts video flow

Deadline: Publish by [TBD]
Payment: [TBD] within 7 days of publish`;
}

// ── ANALYTICS HELPERS ─────────────────────────────────────────────────────────

export function getIntegrationEffectiveness(integrations: BrandIntegration[]) {
  if (integrations.length === 0) return null;

  const byType = new Map<string, { count: number; avgCTR: number; avgScore: number }>();
  integrations.forEach(i => {
    const existing = byType.get(i.integrationType) || { count: 0, avgCTR: 0, avgScore: 0 };
    byType.set(i.integrationType, {
      count: existing.count + 1,
      avgCTR: existing.avgCTR + i.ctr,
      avgScore: existing.avgScore + i.overallScore,
    });
  });

  const results: { type: string; count: number; avgCTR: number; avgScore: number }[] = [];
  byType.forEach((data, type) => {
    results.push({
      type,
      count: data.count,
      avgCTR: Math.round((data.avgCTR / data.count) * 100) / 100,
      avgScore: Math.round((data.avgScore / data.count) * 10) / 10,
    });
  });

  return results.sort((a, b) => b.avgCTR - a.avgCTR);
}
