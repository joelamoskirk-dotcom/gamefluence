// ═══════════════════════════════════════════════════════════════════════════
// COLLABZ STRATEGY ENGINE
// ═══════════════════════════════════════════════════════════════════════════
// Learns from every deal, creator profile, and campaign outcome.
// Surfaces: what's working, where to focus, how to convert.
// Feeds into: CollabZ UI, brief generation, attribution strategy.

import { COLLABS, LEARNINGS, type Collab } from './collabs-data';

// ─── STRATEGIC INSIGHTS ─────────────────────────────────────────────────

export interface StrategicInsight {
  id: string;
  type: 'conversion' | 'attribution' | 'content' | 'pricing' | 'narrative' | 'pipeline';
  priority: 'critical' | 'high' | 'medium';
  title: string;
  insight: string;
  action: string;
  source: string; // what data generated this
}

export interface CreatorValueCase {
  creatorId: string;
  audienceValue: {
    totalReach: number;
    platforms: { name: string; followers: number; cpm: number; monthlyValue: number }[];
    totalMonthlyImpressionValue: number;
    marketRate: string;
    yourRate: string;
    discount: string;
  };
  narrativeAngle: {
    headline: string;
    forBrand: string;
    forCreator: string;
    contentHook: string;
  };
  attributionStrategy: {
    primaryMethod: string;
    secondaryMethods: string[];
    firstSaleGoal: string;
    retargetingPlan: string;
    personalTouchIdea: string;
  };
  quitDayJobModel: {
    currentIncome: string;
    monthlyFromDeal: number;
    affiliateProjection: number;
    scaledIncome: string;
    timelineToReplace: string;
  };
}

// ─── GENERATE INSIGHTS FROM DATA ────────────────────────────────────────

export function generateInsights(): StrategicInsight[] {
  const insights: StrategicInsight[] = [];
  const jacob = COLLABS[0];

  if (!jacob) return insights;

  // Attribution-first insight
  insights.push({
    id: 'attr-first-sale',
    type: 'attribution',
    priority: 'critical',
    title: 'Get Rig #1 Sold & Attributed',
    insight: `Neil needs to see ONE attributed sale to believe the model works. Jacob's first long-form "force feedback first flight" video is the conversion event. Every viewer who clicks the UTM link and uses JACOBDCS = proof of concept.`,
    action: 'Ensure UTM links, promo code, and Shopify tracking are live BEFORE first content drops. Consider a personalised setup call from Jacob to the first buyer as a premium touch.',
    source: 'Jacob call notes + P1 deal terms',
  });

  // Content narrative insight
  insights.push({
    id: 'unmasking-narrative',
    type: 'narrative',
    priority: 'high',
    title: '"Unmasking" Content Narrative',
    insight: `Jacob's audience follows him for DCS secrets — tactics, rig setup, gameplay technique. The P1 integration should feel like Jacob "revealing" his setup secrets. "This is what I actually fly with" = authentic endorsement, not an ad.`,
    action: 'Brief Jacob on the "unmasking" angle: reveal your rig, your tactics, your setup. P1 gear is just part of the story. Content hook: "The gear behind my kills."',
    source: 'Creator profile interests + content rules',
  });

  // Pricing justification
  insights.push({
    id: 'pricing-justification',
    type: 'pricing',
    priority: 'high',
    title: 'Why $8K is a Steal for Neil',
    insight: `Jacob's 1.75M total followers × standard CPM rates = $15K–$25K/month market rate. His shorts alone hit 1M impressions each ($3K value per short at $3 CPM). Neil is getting 2.1M monthly reach for $8K — that's $3.80 CPM all-in. Industry standard for gaming hardware is $8–$15 CPM.`,
    action: 'Include CPM comparison in Neil brief. Show: market rate $20K+ → your rate $8K → 60% below market. The audience is high-intent hardware buyers, not casual viewers.',
    source: 'Creator channels data + industry benchmarks',
  });

  // Affiliate framing
  insights.push({
    id: 'affiliate-lowkey',
    type: 'content',
    priority: 'medium',
    title: 'Affiliate = Always-On Background Revenue',
    insight: `Don't lead with affiliate. It's not the pitch — it's the cherry on top. Frame it as: "Links stay in every video description forever. If someone buys 6 months from now, you both earn." Low-key, always-on, compounding.`,
    action: 'Ensure affiliate links are in EVERY video description and pinned comment from day 1. No hard sell. Just presence. The branding does the work.',
    source: 'Jacob call notes + deal terms',
  });

  // Personalised buyer experience
  insights.push({
    id: 'personal-setup-call',
    type: 'conversion',
    priority: 'high',
    title: 'Personalised Setup Call for First Buyer',
    insight: `If the first person who buys a P1 rig through Jacob's code gets a 15-min setup call with Jacob himself, that's a viral moment. They'll post about it. Their friends will want the same deal. It makes the $3K purchase feel like a $10K experience.`,
    action: 'Propose to Neil: first 3 buyers via JACOBDCS get a free 15-min video call with Jacob for setup help. Cost: Jacob\'s time (30 mins total). Value: social proof, word-of-mouth, retention.',
    source: 'User feedback + premium experience strategy',
  });

  // Quit day job pathway
  insights.push({
    id: 'quit-raaf-path',
    type: 'pipeline',
    priority: 'medium',
    title: 'Jacob\'s Path to Full-Time Creator',
    insight: `Jacob currently earns ~$80K–$100K/year from RAAF. His shorts already earn $3K each (est. $6K–$12K/month). Adding $4,800/month retainer + affiliate gets him to $12K–$18K/month total. At 2 brand deals he's at $24K+/month — well above RAAF salary. Show him this path.`,
    action: 'When sending agreement, include a simple one-pager showing his income trajectory: 1 deal → 2 deals → full-time creator. Don\'t push — just plant the seed.',
    source: 'Creator profile + deal terms + RAAF income estimate',
  });

  // Retargeting strategy
  insights.push({
    id: 'retarget-viewers',
    type: 'attribution',
    priority: 'high',
    title: 'Retarget Video Viewers → P1 Product Pages',
    insight: `Anyone who watches 50%+ of Jacob's long-form P1 content is a warm lead. If Neil has Google Ads / Meta pixel on p1simgear.com.au, we can retarget UTM visitors with product ads within 24 hours. This closes the gap between "watched video" and "bought rig."`,
    action: 'Confirm Neil has GA4 + Google Ads conversion tracking on p1simgear.com.au. Set up retargeting audience: visitors from utm_source=jacob. Run product carousel ads to them.',
    source: 'Attribution strategy + APAC campaign learnings',
  });

  // Content strategy from APAC learnings
  insights.push({
    id: 'apac-learning-applied',
    type: 'content',
    priority: 'medium',
    title: 'APAC Insight: Short-Form Drives Discovery, Long-Form Drives Purchase',
    insight: `From APAC mock campaigns: short-form content (TikTok/Reels) drives awareness and discovery (top of funnel), but long-form YouTube drives actual purchase decisions for high-ticket items ($1K+). Jacob's structure naturally maps to this: shorts = awareness, YouTube = conversion.`,
    action: 'Structure KPIs accordingly: shorts measured on reach/impressions, long-form measured on clicks/promo code usage/attributed revenue.',
    source: 'APAC campaign intelligence + content analysis engine',
  });

  return insights;
}

// ─── CREATOR VALUE CASE (For Neil) ──────────────────────────────────────

export function buildJacobValueCase(): CreatorValueCase {
  return {
    creatorId: 'jacob-tabor',
    audienceValue: {
      totalReach: 1750000,
      platforms: [
        { name: 'Instagram', followers: 750000, cpm: 4.50, monthlyValue: 6750 },
        { name: 'TikTok', followers: 750000, cpm: 3.00, monthlyValue: 4500 },
        { name: 'YouTube', followers: 250000, cpm: 12.00, monthlyValue: 6000 },
      ],
      totalMonthlyImpressionValue: 17250,
      marketRate: '$18,000–$25,000/month',
      yourRate: '$8,000/month',
      discount: '56–68% below market rate',
    },
    narrativeAngle: {
      headline: 'Unmasking the Sim Pilot — The Gear, The Tactics, The Secrets',
      forBrand: 'Jacob doesn\'t sell gear. He reveals his world. P1 is part of that world. His audience discovers the gear through his gameplay — not through an ad.',
      forCreator: 'You keep making the content you love. The gear is just part of your setup. We make sure you get paid for showing what you already use.',
      contentHook: '"The gear behind my kills" — every video is a window into how Jacob flies. P1 is what he flies with.',
    },
    attributionStrategy: {
      primaryMethod: 'Promo code JACOBDCS at P1 checkout (tracked via Shopify)',
      secondaryMethods: [
        'UTM-tagged links in every description (tracked in GA4)',
        'Unique landing page: p1simgear.com.au/jacob',
        'Google Ads retargeting on UTM visitors',
        'Pinned comment links with click tracking',
      ],
      firstSaleGoal: 'Get 1 attributed rig sale within 14 days of first content. This proves the model to Neil and unlocks month 2+.',
      retargetingPlan: 'Retarget anyone who visits P1 via Jacob\'s UTM links within 7 days. Show them the exact product featured in the video. Close the loop.',
      personalTouchIdea: 'First 3 buyers via JACOBDCS get a free 15-min video call with Jacob for rig setup help. Creates social proof + word-of-mouth + makes $3K feel like $10K.',
    },
    quitDayJobModel: {
      currentIncome: '~$80K–$100K/year (RAAF estimate)',
      monthlyFromDeal: 4800,
      affiliateProjection: 600,
      scaledIncome: '2 brand deals + shorts = $24K+/month ($288K/year)',
      timelineToReplace: '6–12 months if P1 proves successful + signs 1 more brand',
    },
  };
}

// ─── WHAT'S WORKING / WHERE TO FOCUS ────────────────────────────────────

export interface FocusRecommendation {
  area: string;
  status: 'on-track' | 'needs-attention' | 'blocked';
  recommendation: string;
  metric?: string;
}

export function getWhatsFocusedOn(): FocusRecommendation[] {
  return [
    {
      area: 'Get Jacob Signed',
      status: 'on-track',
      recommendation: 'Send agreement today. He\'s keen — don\'t let momentum fade. Follow up within 24 hours if no response.',
      metric: 'Agreement sent → signed within 72 hours',
    },
    {
      area: 'Brief Neil',
      status: 'needs-attention',
      recommendation: 'Neil brief is ready (proposals/p1-neil-brief-post-call.md). Send today with the pricing justification: $8K for $17K+ in impression value.',
      metric: 'Neil confirms + ships gear within 7 days',
    },
    {
      area: 'Attribution Setup',
      status: 'needs-attention',
      recommendation: 'Confirm Neil has Shopify promo code tracking + GA4 + UTM attribution ready BEFORE first content. This is non-negotiable for proving ROI.',
      metric: 'All tracking live before Jul 14',
    },
    {
      area: 'First Content = First Sale',
      status: 'blocked',
      recommendation: 'Blocked until gear ships. Force feedback stick is the priority ship. "First flight with FF" short will be the highest-engagement piece.',
      metric: 'First attributed sale within 14 days of content',
    },
    {
      area: 'Personalised Buyer Experience',
      status: 'needs-attention',
      recommendation: 'Propose to Neil: first 3 JACOBDCS buyers get a setup call with Jacob. Cost is 30 mins of Jacob\'s time. Makes the brand feel premium and drives word-of-mouth.',
      metric: 'Setup call offered to first 3 buyers',
    },
  ];
}
