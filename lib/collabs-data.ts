// ═══════════════════════════════════════════════════════════════════════════
// COLLABS DATA LAYER — Single Source of Truth
// ═══════════════════════════════════════════════════════════════════════════
// Everything reads from here: collabs page, briefs, ROI, future campaigns.
// Update this file → everything downstream updates automatically.

// ─── TYPES ──────────────────────────────────────────────────────────────

export type CollabStatus = 'prospecting' | 'discovery_call' | 'agreement_sent' | 'signed' | 'active' | 'paused' | 'completed' | 'declined';
export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';
export type ContentType = 'short-form' | 'long-form' | 'livestream' | 'organic';

export interface CreatorProfile {
  id: string;
  name: string;
  email: string;
  channels: {
    youtube?: { handle: string; subscribers: number };
    instagram?: { handle: string; followers: number };
    tiktok?: { handle: string; followers: number };
    twitch?: { handle: string; followers: number };
    discord?: { name: string; members: number };
  };
  niche: string[];
  dayJob?: string;
  location: string;
  contentRules: string[];
  existingCollabs: { brand: string; relationship: string }[];
  interests: string[];
  notes: string[];
}

export interface DealTerms {
  monthlyBrandSpend: number;
  creatorFee: number;
  agencyFee: number;
  yourCommission: number;
  yourMonthlyTake: number;
  affiliateStructure: {
    product: string;
    price: number;
    totalCommission: number;
    creatorSplit: number;
    yourSplit: number;
  }[];
  paymentTerms: string;
  noticePeriod: string;
  exclusivity: string;
}

export interface ContentPlan {
  deliverables: {
    type: ContentType;
    frequency: string;
    description: string;
    expectedReach: string;
    rules: string[];
  }[];
  totalMonthlyReach: string;
  contentRatio: string;
}

export interface Collab {
  id: string;
  status: CollabStatus;
  statusUpdated: string;
  creator: CreatorProfile;
  brand: {
    name: string;
    contact: string;
    contactEmail?: string;
    location: string;
    website?: string;
  };
  deal: DealTerms;
  contentPlan: ContentPlan;
  timeline: { milestone: string; date: string; done: boolean }[];
  callNotes: { date: string; summary: string; keyPoints: string[] }[];
  learnings: string[];
  risks: { risk: string; mitigation: string }[];
  opportunities: { opportunity: string; detail: string; action: string }[];
  competitiveIntel: { brand: string; relationship: string; notes: string }[];
}

export interface ExpansionCreator {
  name: string;
  platform: string;
  subs: string;
  niche: string;
  fit: string;
  priority: Priority;
  note: string;
}

// ─── LEARNINGS (Accumulated across all deals) ───────────────────────────

export const LEARNINGS: { date: string; deal: string; learning: string; category: string }[] = [
  {
    date: '2026-07-03',
    deal: 'Jacob Tabor × P1',
    learning: 'Creators with high short-form revenue ($3K/short) won\'t do long-form unless the pay justifies opportunity cost. Structure deals around their strength format.',
    category: 'deal-structure',
  },
  {
    date: '2026-07-03',
    deal: 'Jacob Tabor × P1',
    learning: 'Don\'t say "influencer marketing" to authentic creators. Frame as "making your content pay." Performance, not promotion.',
    category: 'messaging',
  },
  {
    date: '2026-07-03',
    deal: 'Jacob Tabor × P1',
    learning: 'Ask about existing brand relationships early. Jacob already has Thrustmaster — P1 needs differentiation angle (AU-local, custom, force feedback).',
    category: 'discovery',
  },
  {
    date: '2026-07-03',
    deal: 'Jacob Tabor × P1',
    learning: 'Creators in government/military roles (RAAF) have content clearance requirements. Factor this into timelines.',
    category: 'compliance',
  },
  {
    date: '2026-07-03',
    deal: 'Jacob Tabor × P1',
    learning: 'The "worst case: free gear, keep it, leave anytime" close works. Zero downside framing gets them over the line.',
    category: 'closing',
  },
  {
    date: '2026-07-03',
    deal: 'Jacob Tabor × P1',
    learning: 'Always ask the gateway question: "Who else creates content in [niche]?" Even if the deal falls through, you get referrals.',
    category: 'pipeline',
  },
  {
    date: '2026-07-03',
    deal: 'Jacob Tabor × P1',
    learning: 'Affiliates are an easy upsell. Creators understand passive income. Mention it as "extra income on top with zero extra work."',
    category: 'upsell',
  },
  {
    date: '2026-07-03',
    deal: 'Jacob Tabor × P1',
    learning: 'Verify audience size on the call. Our research said 167K YT — actual was 250K YT + 750K IG + 750K TT. Always confirm.',
    category: 'research',
  },
  {
    date: '2026-07-03',
    deal: 'APAC Campaign Learnings',
    learning: 'Short-form content drives discovery and awareness (top of funnel). Long-form YouTube drives actual purchase decisions for high-ticket items ($1K+). Structure KPIs accordingly.',
    category: 'content-strategy',
  },
  {
    date: '2026-07-03',
    deal: 'APAC Campaign Learnings',
    learning: 'For hardware/high-AOV products: measure shorts on reach/impressions, measure long-form on clicks/promo code/attributed revenue. Different content = different KPIs.',
    category: 'attribution',
  },
  {
    date: '2026-07-03',
    deal: 'APAC Campaign Learnings',
    learning: 'Retargeting video viewers within 7 days with product ads closes the gap between "watched" and "bought." Requires GA4 + Google Ads on brand site.',
    category: 'attribution',
  },
  {
    date: '2026-07-03',
    deal: 'APAC Campaign Learnings',
    learning: 'Personalised buyer experiences (setup calls, exclusive access) turn $3K purchases into $10K feelings. First 3 buyers get VIP treatment = social proof + word-of-mouth.',
    category: 'conversion',
  },
  {
    date: '2026-07-03',
    deal: 'APAC Campaign Learnings',
    learning: 'The "unmasking" narrative works better than product reviews. Audiences want to discover what creators use — not be sold to. Frame brand integration as revelation, not promotion.',
    category: 'messaging',
  },
  {
    date: '2026-07-03',
    deal: 'Jacob Tabor × P1',
    learning: 'Ask about NEGATIVE past brand deal experiences. Jacob had a terrible Thrustmaster deal ($500/short + hand-cam requirement = chore). Knowing this shaped our entire pitch around flexibility and no forced formats.',
    category: 'discovery',
  },
  {
    date: '2026-07-03',
    deal: 'Jacob Tabor × P1',
    learning: 'Start with a PILOT — one video. De-risks for everyone. Creator tests without commitment. Brand gets proof-of-concept data. You get paid a pilot fee. Then scale to retainer on results.',
    category: 'deal-structure',
  },
  {
    date: '2026-07-03',
    deal: 'Jacob Tabor × P1',
    learning: 'YouTube Shorts links don\'t work well — platform prevents users from leaving the app. Need deferred deep linking or promo codes as primary attribution for short-form.',
    category: 'attribution',
  },
  {
    date: '2026-07-03',
    deal: 'Jacob Tabor × P1',
    learning: 'Creators who are quality-obsessed (8hrs on a 40-second clip) need FLEXIBLE timelines. Never set hard deadlines. Say "when you\'re ready" not "by Friday."',
    category: 'deal-structure',
  },
];

// ─── ACTIVE COLLABS ─────────────────────────────────────────────────────

export const COLLABS: Collab[] = [
  {
    id: 'collab_jacob_p1',
    status: 'agreement_sent',
    statusUpdated: '2026-07-03',
    creator: {
      id: 'jacob-tabor',
      name: 'Jacob Tabor',
      email: 'jacob_tabor@outlook.com',
      channels: {
        youtube: { handle: '@jacobtabor', subscribers: 250000 },
        instagram: { handle: '@jacobtabor', followers: 750000 },
        tiktok: { handle: '@jacobtabor', followers: 750000 },
      },
      niche: ['DCS', 'Flight Sim', 'Military Aviation', 'Sim Hardware'],
      dayJob: 'RAAF (Royal Australian Air Force)',
      location: 'Australia',
      contentRules: [
        'ALL content must include genuine DCS gameplay',
        'No standalone product reviews / unboxings without gameplay',
        'Gear must be shown in-use, not just sitting on a desk',
        'Early access DCS builds need RAAF approval before publishing',
        'Long-form must be easy to produce — opportunity cost is $3K+ per short forgone',
        'No "rig shilling" — authentic gameplay integration only',
      ],
      existingCollabs: [
        { brand: 'Thrustmaster', relationship: 'Active collab' },
        { brand: 'Wind Control', relationship: 'Offered selling opp (Chinese brand, not enthusiastic)' },
        { brand: 'VKB', relationship: 'Bought himself — likes it' },
      ],
      interests: [
        'Force feedback stick',
        'Entry level kits',
        'DCS-branded version of P1 pack',
        'Camera reveal content',
        'Other games: War Thunder',
        'Flight Sim Expo appearances',
      ],
      notes: [
        'Makes $3K per short — 1M+ impressions each',
        'Only does 1 long-form every ~8 weeks organically',
        'Shorts are his money maker — any long-form must justify opportunity cost',
        'YouTube is the funnel, customisation and time are his challenges',
        'Works for the RAAF — scheduling needs flexibility',
        'Played Flight Sim Expo (Grinelli Designs): https://www.youtube.com/watch?v=hXJbFgeezBs',
        'Accepted 20% management fee — keen to sign',
        'Interested in mutual benefit partnerships',
      ],
    },
    brand: {
      name: 'P1 Sim Gear',
      contact: 'Neil',
      location: 'QLD, Australia',
      website: 'p1simgear.com.au',
    },
    deal: {
      monthlyBrandSpend: 8000,
      creatorFee: 4800,
      agencyFee: 1500,
      yourCommission: 1200,
      yourMonthlyTake: 2700,
      affiliateStructure: [
        { product: 'Fighter Pilot Pack', price: 3099, totalCommission: 300, creatorSplit: 150, yourSplit: 150 },
        { product: 'VIRPIL HOSAS Bundle', price: 2149, totalCommission: 200, creatorSplit: 100, yourSplit: 100 },
        { product: 'Full Custom Flight Rig', price: 10000, totalCommission: 1000, creatorSplit: 500, yourSplit: 500 },
      ],
      paymentTerms: '4 business days after post verification',
      noticePeriod: '14 days',
      exclusivity: 'Non-exclusive. No competing flight sim hardware retailers during retainer.',
    },
    contentPlan: {
      deliverables: [
        {
          type: 'short-form',
          frequency: 'Every 2 weeks (2/month)',
          description: 'IG Reels / TikTok / YT Shorts — P1 gear visible in DCS gameplay',
          expectedReach: '1M+ impressions per short',
          rules: ['Must include gameplay', 'Gear visible in use', 'Link in bio', 'Promo code in caption'],
        },
        {
          type: 'long-form',
          frequency: '1 per month (max)',
          description: 'YouTube video — gameplay-integrated, P1 gear in use throughout',
          expectedReach: '50K–100K+ views',
          rules: ['Must include DCS gameplay', 'Not a product review', 'Gear shown in-use naturally', 'Affiliate link in description + pinned comment'],
        },
      ],
      totalMonthlyReach: '2.1M–2.2M minimum (2M shorts + 100K long-form)',
      contentRatio: '3 paid pieces + organic content = audience doesn\'t feel sold to',
    },
    timeline: [
      { milestone: 'Discovery call', date: '2026-07-03', done: true },
      { milestone: 'Send representation agreement', date: '2026-07-04', done: false },
      { milestone: 'Jacob signs', date: '2026-07-04 to 07', done: false },
      { milestone: 'Send Neil brief for approval', date: '2026-07-04', done: false },
      { milestone: 'Neil confirms + ships force feedback stick', date: '2026-07-07 to 10', done: false },
      { milestone: 'First short (force feedback first flight)', date: '2026-07-14 to 18', done: false },
      { milestone: 'First long-form video', date: '2026-07-21 to 28', done: false },
      { milestone: 'Affiliate code active', date: '2026-07-14', done: false },
      { milestone: 'First monthly report to Neil', date: '2026-08-05', done: false },
      { milestone: '3-month retainer review', date: '2026-10-01', done: false },
    ],
    callNotes: [
      {
        date: '2026-07-03',
        summary: 'Excellent call. Jacob is keen. Much bigger audience than researched. Pilot approach agreed — one rig rundown video first.',
        keyPoints: [
          'Channels: 750K IG, 750K TT, 250K YT (not 167K as researched)',
          'Makes $3K per short, 1M+ impressions each',
          'Only 1 long-form every 8 weeks organically — high opportunity cost',
          'Works for the RAAF as avionics technician — 11 years in Air Force',
          'Located Port Stephens / Newcastle area, NSW',
          'All content must include gameplay — no standalone rig shilling',
          'Bad experience with Thrustmaster: hand-cam requirement made gaming a chore. Was paid $500/short. Stopped.',
          'Existing collabs: Thrustmaster (ended), Wind Control (not keen), VKB (bought himself)',
          'Wants: force feedback stick, entry level kits, DCS-branded pack',
          'Open to face reveal — but wants to coincide with leaving corporate job',
          'Played Flight Sim Expo (Grinelli Designs) — open to public appearances',
          'Interested in affiliate links as low-risk mutual benefit model',
          'Accepted 20% management fee, non-exclusive',
          'Pilot approach: one rig rundown video to prove the model, then scale',
          'Considering adding Facebook for additional reach',
          'Spends 8+ hours on a 40-second clip — quality-obsessed',
          'Won\'t work with "scummy" products. Audience trust comes first.',
          'Platform constraints: links in YT Shorts don\'t work well — need deferred deep linking',
          'Keen to proceed — sending agreement + reverse brief to Neil',
        ],
      },
    ],
    learnings: [
      'Verify audience size on the call — research was 3x understated',
      'Short-form creators need deals structured around shorts, not long-form',
      'RAAF clearance means buffer time on DCS early access content',
      '"Worst case: free gear" close works perfectly',
      'Force feedback stick = highest excitement product to ship first',
    ],
    risks: [
      { risk: 'RAAF approval delays on early-access DCS content', mitigation: 'Standard DCS content is fine — only applies to unreleased builds' },
      { risk: 'High opportunity cost on long-form ($3K+ per short forgone)', mitigation: 'Keep long-form easy to produce — gameplay he\'d record anyway' },
      { risk: 'Thrustmaster existing relationship', mitigation: 'P1 differentiates: AU-local, custom DCS-branded, force feedback, entry level' },
      { risk: 'Content quality if rushed', mitigation: 'Clear content rules — gameplay integration only, no rig shilling' },
      { risk: 'Seasonal RAAF commitments', mitigation: 'Flexible scheduling, no hard deadlines on content' },
    ],
    opportunities: [
      { opportunity: 'DCS branded P1 pack', detail: 'Jacob floated co-branded product idea', action: 'Neil to explore custom "Jacob Tabor DCS Edition" bundle' },
      { opportunity: 'Camera reveal content', detail: 'New camera setup coming — natural integration', action: 'Time first P1 content around camera reveal' },
      { opportunity: 'Flight Sim Expo', detail: 'Jacob played at expo (Grinelli Designs)', action: 'P1 sponsors Jacob at next expo — physical + content' },
      { opportunity: 'Other games', detail: 'War Thunder, other sims', action: 'Expands P1 audience beyond DCS-only' },
      { opportunity: 'Entry level kits', detail: 'Jacob wants to promote accessible hardware', action: 'Great for younger/newer audience — high volume' },
      { opportunity: 'Force feedback stick', detail: 'Jacob specifically wants one', action: 'Ship first — "first flight with FF" = killer content' },
    ],
    competitiveIntel: [
      { brand: 'Thrustmaster', relationship: 'Active collab', notes: 'Major competitor. P1 angle: AU-local, custom, force feedback, entry level.' },
      { brand: 'Wind Control', relationship: 'Offered selling opp', notes: 'Chinese brand. Jacob not enthusiastic. Not a real threat.' },
      { brand: 'VKB', relationship: 'Personal purchase', notes: 'Jacob likes product. Could be future conflict or opportunity.' },
      { brand: 'Grinelli Designs', relationship: 'Event partner', notes: 'Played Flight Sim Expo with them. Potential co-marketing.' },
    ],
  },
];

// ─── EXPANSION ROSTER ───────────────────────────────────────────────────

// ─── UPCOMING CALLS (Ready for post-call learnings) ─────────────────────

export interface UpcomingCall {
  id: string;
  contact: string;
  company?: string;
  date: string;
  context: string;
  objectives: string[];
  feedBackTo: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
  callNotes?: { date: string; summary: string; keyPoints: string[] };
  learnings?: string[];
}

export const UPCOMING_CALLS: UpcomingCall[] = [
  {
    id: 'call_ceri_hutton',
    contact: 'Ceri Hutton',
    date: '2026-07-TBD',
    context: 'Impact gaming discussion — government attribution, live-ops creator integration, investability thesis. Full call script at proposals/ceri-hutton-call-script.md. Research at SCREEN_FUNDING_ANALYSIS.md.',
    objectives: [
      'Validate impact gaming thesis — does "attribution for government" resonate?',
      'Understand Ceri\'s network and position in gaming/investment/policy ecosystem',
      'Find the first pilot — one funded game with full attribution = the case study',
      'Explore partnership angles: advisory, introductions, government consulting',
      'Get feedback on gaming vs gambling framing — does it help or hurt?',
      'Learn: who else should we be talking to?',
    ],
    feedBackTo: [
      'Impact Gaming news article (app/news/[id]/page.tsx → id 4)',
      'Collabs data layer (lib/collabs-data.ts → LEARNINGS array)',
      'Screen Funding Analysis (SCREEN_FUNDING_ANALYSIS.md)',
      'Ceri call script (proposals/ceri-hutton-call-script.md)',
    ],
    status: 'scheduled',
  },
];

export const EXPANSION_CREATORS: ExpansionCreator[] = [
  {
    name: 'Growling Sidewinder',
    platform: 'YouTube',
    subs: '450K+',
    niche: 'DCS dogfight tutorials, tactics breakdowns',
    fit: 'Hardware review potential — uses complex HOTAS setups',
    priority: 'HIGH',
    note: 'Top DCS combat creator globally. Would validate the vertical.',
  },
  {
    name: 'Spudknocker',
    platform: 'YouTube',
    subs: '180K+',
    niche: 'DCS mission building, mod reviews, carrier ops',
    fit: 'Deep technical audience — high hardware spend',
    priority: 'HIGH',
    note: 'Loyal community, great for long-form gear deep-dives',
  },
  {
    name: 'Grim Reapers',
    platform: 'YouTube',
    subs: '640K+',
    niche: 'DCS multiplayer squadrons, large-scale combat',
    fit: 'Multiple members = multiple integration points',
    priority: 'MEDIUM',
    note: 'Group channel — need individual creator contacts',
  },
  {
    name: 'Ralfidude',
    platform: 'YouTube',
    subs: '120K+',
    niche: 'Cinematic DCS content, sim racing crossover',
    fit: 'Crosses into sim racing — opens second brand vertical',
    priority: 'MEDIUM',
    note: 'Sim racing crossover = future P1 racing sim gear angle',
  },
  {
    name: 'Casmo',
    platform: 'YouTube',
    subs: '95K+',
    niche: 'Real helicopter pilot plays DCS — authenticity goldmine',
    fit: 'Real-world credibility makes hardware recs very powerful',
    priority: 'HIGH',
    note: 'Former military — audience trusts gear recs implicitly',
  },
  {
    name: 'Matt Wagner (ED)',
    platform: 'YouTube',
    subs: '85K+',
    niche: 'Eagle Dynamics community manager — DCS official',
    fit: 'Insider credibility, but conflict of interest with ED products',
    priority: 'LOW',
    note: 'Gateway to Eagle Dynamics partnership, not direct talent sign',
  },
];

// ─── HELPER FUNCTIONS ───────────────────────────────────────────────────

export function getCollabById(id: string): Collab | undefined {
  return COLLABS.find(c => c.id === id);
}

export function getActiveCollabs(): Collab[] {
  return COLLABS.filter(c => !['declined', 'completed'].includes(c.status));
}

export function getCollabsByStatus(status: CollabStatus): Collab[] {
  return COLLABS.filter(c => c.status === status);
}

export function getTotalMonthlyRevenue(): number {
  return getActiveCollabs().reduce((sum, c) => sum + c.deal.yourMonthlyTake, 0);
}

export function getTotalAnnualRevenue(): number {
  return getTotalMonthlyRevenue() * 12;
}

export function getLearningsByCategory(category: string): typeof LEARNINGS {
  return LEARNINGS.filter(l => l.category === category);
}

export function getAllLearnings(): typeof LEARNINGS {
  return LEARNINGS;
}

export function getRecentLearnings(count: number = 5): typeof LEARNINGS {
  return [...LEARNINGS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count);
}

export function getUpcomingCallById(id: string): UpcomingCall | undefined {
  return UPCOMING_CALLS.find(c => c.id === id);
}

export function getScheduledCalls(): UpcomingCall[] {
  return UPCOMING_CALLS.filter(c => c.status === 'scheduled');
}

export function completeCall(id: string, notes: { summary: string; keyPoints: string[] }, learnings: string[]): void {
  const call = UPCOMING_CALLS.find(c => c.id === id);
  if (call) {
    call.status = 'completed';
    call.callNotes = { date: new Date().toISOString().split('T')[0], ...notes };
    call.learnings = learnings;
  }
}
