// ═══════════════════════════════════════════════════════════════════════════
// CONTENT CLIPPING ENGINE — Platform-Specific Intelligence
// ═══════════════════════════════════════════════════════════════════════════
// Automated clipping from long-form creator content into platform-optimised
// shorts. Each platform has different audiences, formats, and engagement
// patterns. The AI learns what works WHERE and clips accordingly.
//
// Revenue: Charge studios per-clip or monthly retainer.
// Easy win: Tim on Kick — nobody clips Kick content properly.
// Discord: Clips as community engagement fuel + event teasers.
// ═══════════════════════════════════════════════════════════════════════════

// ─── TYPES ──────────────────────────────────────────────────────────────

export type TargetPlatform = 'youtube_shorts' | 'tiktok' | 'instagram_reels' | 'kick' | 'discord' | 'twitter' | 'facebook';
export type ClipType = 'highlight' | 'reaction' | 'tutorial_moment' | 'kill_clip' | 'reveal' | 'emotional_peak' | 'community_moment' | 'behind_scenes';
export type SourceType = 'youtube_longform' | 'twitch_vod' | 'kick_vod' | 'uploaded_video';

export interface PlatformProfile {
  id: TargetPlatform;
  name: string;
  optimalDuration: { min: number; max: number; sweet: number }; // seconds
  aspectRatio: string;
  resolution: string;
  captionsRequired: boolean;
  hookWindow: number; // seconds — how fast you need to grab attention
  engagementDrivers: string[];
  avoidance: string[];
  cta: {
    type: string;
    placement: string;
    examples: string[];
  };
  bestPostingTimes: { day: string; time: string }[];
  audienceNotes: string;
}

export interface ClipCandidate {
  id: string;
  sourceVideoId: string;
  sourceVideoTitle: string;
  creatorName: string;
  timestamp: { start: number; end: number }; // seconds into source
  duration: number;
  type: ClipType;
  confidence: number; // 0-1 how good this moment is
  platforms: {
    platform: TargetPlatform;
    suitability: number; // 0-1
    recommendedEdit: string;
    suggestedCaption: string;
    suggestedHashtags: string[];
  }[];
  transcript?: string;
  keyMoment: string; // description of what happens
}

export interface ClipJob {
  id: string;
  clientName: string;
  sourceVideos: { url: string; title: string; creator: string }[];
  targetPlatforms: TargetPlatform[];
  status: 'queued' | 'analysing' | 'clips_ready' | 'in_review' | 'approved' | 'distributed';
  candidates: ClipCandidate[];
  approvedClips: string[]; // clip IDs approved by creator/studio
  pricing: {
    model: 'per_clip' | 'monthly_retainer' | 'per_video';
    ratePerClip: number;
    totalClips: number;
    totalCharge: number;
    cost: number; // Our actual cost
    margin: number;
  };
  createdAt: string;
}

// ─── PLATFORM PROFILES ──────────────────────────────────────────────────

export const PLATFORM_PROFILES: PlatformProfile[] = [
  {
    id: 'youtube_shorts',
    name: 'YouTube Shorts',
    optimalDuration: { min: 15, max: 60, sweet: 30 },
    aspectRatio: '9:16',
    resolution: '1080x1920',
    captionsRequired: true,
    hookWindow: 1.5, // Must hook in 1.5 seconds
    engagementDrivers: [
      'Loopability — clip that makes sense watching again',
      'Curiosity gap in first frame',
      'High energy / fast cuts',
      'Satisfying gameplay moments (kills, clutches, builds)',
      'Text overlay with context ("This should be impossible...")',
      'Subscribe CTA at natural pause point',
    ],
    avoidance: [
      'Links don\'t work in Shorts — use promo codes instead',
      'Slow intros (you have 1.5s)',
      'Horizontal gameplay without reframing',
      'Watermarks from other platforms',
    ],
    cta: {
      type: 'promo_code',
      placement: 'Pinned comment + on-screen text',
      examples: ['Use code JACOB for 10% off', 'Full video on my channel'],
    },
    bestPostingTimes: [
      { day: 'Mon-Fri', time: '12:00-14:00 AEST' },
      { day: 'Sat-Sun', time: '09:00-11:00 AEST' },
    ],
    audienceNotes: 'Discovery-focused. Shorts reach new audiences, not existing subs. Optimise for new viewer hook, not community inside jokes.',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    optimalDuration: { min: 7, max: 90, sweet: 21 },
    aspectRatio: '9:16',
    resolution: '1080x1920',
    captionsRequired: true,
    hookWindow: 1.0, // TikTok is ruthless — 1 second
    engagementDrivers: [
      'Pattern interrupt in first frame (unexpected visual/audio)',
      'Trending sounds layered under gameplay',
      'Text hook before action ("Wait for it...")',
      'POV narratives ("POV: you finally hit this shot")',
      'Duet/stitch potential — leave space for reactions',
      'Educational + entertaining = edutainment',
      'Comments bait ("Only 1% of players can do this")',
    ],
    avoidance: [
      'Corporate-feeling content',
      'Hard selling in the first 3 seconds',
      'Low resolution or bad lighting',
      'Recycled YouTube content that feels stale',
      'No trending audio = buried by algorithm',
    ],
    cta: {
      type: 'link_in_bio + promo_code',
      placement: 'Bio link + caption code',
      examples: ['Link in bio 🎮', 'Code TT15 for 15% off'],
    },
    bestPostingTimes: [
      { day: 'Tue-Thu', time: '19:00-21:00 AEST' },
      { day: 'Sat', time: '10:00-12:00 AEST' },
    ],
    audienceNotes: 'Younger audience, trend-driven. Content must feel native to TikTok — not repurposed. Use their editing style, sounds, and format conventions.',
  },
  {
    id: 'instagram_reels',
    name: 'Instagram Reels',
    optimalDuration: { min: 7, max: 90, sweet: 15 },
    aspectRatio: '9:16',
    resolution: '1080x1920',
    captionsRequired: true,
    hookWindow: 1.5,
    engagementDrivers: [
      'Aesthetic quality matters more than TikTok',
      'Clean transitions and editing',
      'Behind-the-scenes + lifestyle angle',
      'Carousel-adjacent content (save-worthy)',
      'Share-worthy moments (tag a friend who...)',
      'Product showcase through lifestyle, not ads',
    ],
    avoidance: [
      'TikTok watermark (Instagram deprioritises)',
      'Low quality / pixelated footage',
      'Too much text overlay (keep clean)',
      'Trending TikTok sounds that haven\'t crossed over',
    ],
    cta: {
      type: 'link_in_bio + story_swipeup',
      placement: 'Caption CTA + bio link',
      examples: ['Setup details in bio 👆', 'DM me "SETUP" for the full breakdown'],
    },
    bestPostingTimes: [
      { day: 'Mon-Wed', time: '11:00-13:00 AEST' },
      { day: 'Thu-Fri', time: '17:00-19:00 AEST' },
    ],
    audienceNotes: 'Lifestyle-first audience. Gaming content works when it feels aspirational — setups, aesthetics, achievements. Less sweaty, more cinematic.',
  },
  {
    id: 'kick',
    name: 'Kick',
    optimalDuration: { min: 15, max: 180, sweet: 60 },
    aspectRatio: '16:9', // Kick clips are typically landscape
    resolution: '1920x1080',
    captionsRequired: false, // Less common on Kick
    hookWindow: 3.0, // Kick audience is more patient — they're stream viewers
    engagementDrivers: [
      'Raw, unfiltered moments (Kick culture is authenticity)',
      'Chat reactions visible in clip',
      'Streamer reactions and emotional peaks',
      'Community inside jokes and callbacks',
      'Drama / controversy clips (Kick thrives on this)',
      'Win moments from gambling/gaming crossover audience',
      'Longer clips OK — audience watches full streams',
    ],
    avoidance: [
      'Over-produced / corporate feeling',
      'Removing chat overlay (it\'s part of the experience)',
      'Censoring language (Kick is less moderated)',
      'Short attention span assumptions — Kick viewers are patient',
    ],
    cta: {
      type: 'follow + clip_command',
      placement: 'End of clip + chat command',
      examples: ['Follow for more live action', '!clips in chat', 'Streaming tomorrow 8PM'],
    },
    bestPostingTimes: [
      { day: 'Daily', time: 'During/after live streams' },
      { day: 'Off-days', time: '15:00-17:00 AEST (builds anticipation)' },
    ],
    audienceNotes: 'NOBODY IS DOING THIS WELL ON KICK. Massive opportunity for Tim and other Kick streamers. Most Kick creators don\'t clip their own content — we do it for them and they grow faster. Easy sell, easy win.',
  },
  {
    id: 'discord',
    name: 'Discord',
    optimalDuration: { min: 5, max: 30, sweet: 15 },
    aspectRatio: '16:9', // Inline video in channels
    resolution: '1280x720', // Discord compresses anyway
    captionsRequired: false,
    hookWindow: 2.0,
    engagementDrivers: [
      'Community-specific moments (inside jokes, server events)',
      'Highlights from community game nights',
      'Teasers for upcoming content / streams',
      'Behind-the-scenes clips exclusive to Discord',
      'Event recaps — tournaments, challenges, raids',
      'Reaction clips that spark discussion threads',
      'Clip + poll ("Should I have pushed here?")',
    ],
    avoidance: [
      'Same content posted everywhere (Discord users want exclusivity)',
      'Long clips (Discord is for quick hits between messages)',
      'Hard promotional content (communities reject it)',
      'No context — clip needs a sentence of setup in the message',
    ],
    cta: {
      type: 'engagement_prompt',
      placement: 'Message text above/below clip',
      examples: [
        '"What would you have done here? 🤔"',
        '"Live in 2 hours — who\'s pulling up?"',
        '"Clip from last night\'s community tournament 🏆"',
        '"New map dropping tomorrow. Thoughts?"',
      ],
    },
    bestPostingTimes: [
      { day: 'Daily', time: '18:00-22:00 AEST (peak Discord activity)' },
      { day: 'Pre-stream', time: '30-60 min before going live' },
    ],
    audienceNotes: 'Discord clips serve retention and community engagement, not discovery. Use for: keeping community active between streams, building hype before events, rewarding engaged members with exclusive clips. Great for game studio community servers — clip creator content and post in their #media channel.',
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    optimalDuration: { min: 5, max: 140, sweet: 30 },
    aspectRatio: '16:9',
    resolution: '1920x1080',
    captionsRequired: true, // Most scroll with sound off
    hookWindow: 2.0,
    engagementDrivers: [
      'Quote-tweet bait ("How is this even possible")',
      'Hot takes attached to clip',
      'Breaking moments (first to post wins)',
      'Thread potential (clip 1/5 of a series)',
      'Gaming news + clip commentary',
    ],
    avoidance: [
      'Long videos (Twitter users scroll fast)',
      'No context in tweet text',
      'Posting without a hook in the tweet copy',
    ],
    cta: {
      type: 'link_in_tweet',
      placement: 'Tweet text below clip',
      examples: ['Full video: [link]', 'Streaming now: [link]'],
    },
    bestPostingTimes: [
      { day: 'Mon-Fri', time: '08:00-10:00 AEST' },
      { day: 'Daily', time: '12:00 AEST (lunch scroll)' },
    ],
    audienceNotes: 'Speed and commentary wins. First-to-post gets the engagement. Attach opinions/hot takes to clips for maximum reach.',
  },
  {
    id: 'facebook',
    name: 'Facebook Reels',
    optimalDuration: { min: 15, max: 90, sweet: 30 },
    aspectRatio: '9:16',
    resolution: '1080x1920',
    captionsRequired: true,
    hookWindow: 2.0,
    engagementDrivers: [
      'Nostalgia / "remember when" angles',
      'Family-friendly gaming content',
      'Satisfying completion clips',
      'Before/after (setup reveals, skill progression)',
      'Share-worthy wholesome moments',
    ],
    avoidance: [
      'Edgy content (FB demographic is older)',
      'Inside jokes that require platform knowledge',
      'Overly fast editing (audience prefers steady pace)',
    ],
    cta: {
      type: 'link_in_comments',
      placement: 'First comment + description',
      examples: ['Full setup tour: [link]', 'Game available here: [link]'],
    },
    bestPostingTimes: [
      { day: 'Tue-Thu', time: '09:00-11:00 AEST' },
      { day: 'Sat-Sun', time: '10:00-12:00 AEST' },
    ],
    audienceNotes: 'Older demographic. Less gaming-native but massive reach. Content needs to be accessible to non-gamers. Great for casual/mobile game studios.',
  },
];

// ─── CLIP DETECTION RULES ───────────────────────────────────────────────

export const CLIP_DETECTION_RULES = {
  // What makes a good clip for each type
  types: {
    highlight: {
      signals: ['Kill feed spike', 'Score/achievement popup', 'Audience/chat eruption', 'Rare event trigger'],
      minConfidence: 0.7,
    },
    reaction: {
      signals: ['Volume spike (creator yelling/laughing)', 'Face cam emotion change', 'Chat spam', 'Donation/sub alert'],
      minConfidence: 0.6,
    },
    tutorial_moment: {
      signals: ['Creator explaining while demonstrating', 'Slow-motion replay', '"Here\'s how you..." speech pattern', 'Zoomed-in UI element'],
      minConfidence: 0.8,
    },
    kill_clip: {
      signals: ['Kill notification', 'Damage numbers spike', 'Character elimination animation', 'Multi-kill indicator'],
      minConfidence: 0.9,
    },
    reveal: {
      signals: ['New item/skin/map first shown', 'Unboxing animation', '"Let me show you..." speech', 'Camera angle change to new subject'],
      minConfidence: 0.75,
    },
    emotional_peak: {
      signals: ['Audio intensity peak', 'Chat message velocity spike', 'Creator stands up/leaves chair', 'Extended silence followed by explosion'],
      minConfidence: 0.65,
    },
    community_moment: {
      signals: ['Multiple players on screen', 'Community challenge completion', 'Viewer interaction (polls, commands)', 'Group achievement'],
      minConfidence: 0.7,
    },
    behind_scenes: {
      signals: ['Setup/gear visible', 'Pre/post stream chat', 'Real-life interjection', 'Meta commentary about content creation'],
      minConfidence: 0.6,
    },
  },
  
  // Platform suitability scoring
  platformMatch: {
    youtube_shorts: ['kill_clip', 'highlight', 'reveal', 'tutorial_moment'],
    tiktok: ['reaction', 'emotional_peak', 'kill_clip', 'behind_scenes'],
    instagram_reels: ['behind_scenes', 'reveal', 'highlight', 'community_moment'],
    kick: ['reaction', 'emotional_peak', 'community_moment', 'highlight'],
    discord: ['community_moment', 'behind_scenes', 'highlight', 'kill_clip'],
    twitter: ['kill_clip', 'reaction', 'emotional_peak', 'reveal'],
    facebook: ['tutorial_moment', 'community_moment', 'behind_scenes', 'reveal'],
  } as Record<TargetPlatform, ClipType[]>,
};

// ─── PRICING MODEL ──────────────────────────────────────────────────────

export const CLIPPING_PRICING = {
  perClip: {
    basic: 50, // Raw clip, minimal editing
    standard: 100, // Clip + captions + CTA overlay + platform formatting
    premium: 200, // Clip + full edit + trending audio + custom transitions + A/B variants
  },
  
  retainer: {
    starter: { clipsPerMonth: 20, price: 1500, perClipEffective: 75 },
    growth: { clipsPerMonth: 50, price: 3000, perClipEffective: 60 },
    scale: { clipsPerMonth: 100, price: 5000, perClipEffective: 50 },
  },
  
  perVideo: {
    // Process one long-form video → extract all viable clips
    standard: 500, // Up to 10 clips extracted
    deep: 1000, // Up to 25 clips + multi-platform formatting
  },
  
  // What it actually costs us (time + tools)
  costPerClip: 10, // With automation, our actual cost is minimal
  marginPerClip: { basic: 40, standard: 90, premium: 190 },
};

// ─── KICK-SPECIFIC OPPORTUNITY ──────────────────────────────────────────

export const KICK_CLIPPING_STRATEGY = {
  opportunity: 'Nobody is clipping Kick content well. Streamers go live for 4-8 hours and the content dies. Zero short-form redistribution. We clip it, post it, they grow — and we charge for it.',
  
  targetCreators: [
    'Tim (existing relationship — easy first client)',
    'Any Kick streamer doing 100+ concurrent viewers',
    'Gaming streamers who ONLY stream on Kick (no YT presence = massive growth potential from clips)',
  ],
  
  workflow: [
    '1. Creator streams on Kick (4-8 hours)',
    '2. We pull the VOD within 2 hours of stream ending',
    '3. AI scans for clip-worthy moments (reactions, kills, chat eruptions)',
    '4. Generate 5-15 clips per stream, formatted for YT Shorts + TikTok + IG',
    '5. Creator approves via quick review dashboard',
    '6. We post to their secondary channels OR studio/brand channels',
    '7. Track engagement, iterate on what clip types perform best',
  ],
  
  pricing: {
    pitch: '$1,500/month for 4 streams clipped → 40-60 clips distributed across platforms',
    actualCost: '$200/month (our time with automated tools)',
    margin: '$1,300/month per creator',
    scaleTarget: '10 Kick creators = $13,000/month margin on clipping alone',
  },
  
  sellPoints: [
    'You stream 30 hours a week and get 0 content from it on other platforms',
    'Your competition on YouTube is clipping their Twitch streams — you\'re leaving growth on the table',
    'We handle everything — you just stream and approve the clips',
    'Your clips drive viewers to your live streams = more subs = more money for you',
    'Studios will pay for their game\'s moments to be clipped and distributed — you get featured',
  ],
};

// ─── DISCORD STRATEGY ───────────────────────────────────────────────────

export const DISCORD_CLIPPING_STRATEGY = {
  useCase: 'Clips as community engagement fuel. Not for discovery (Discord is closed) — for retention, hype, and keeping servers active between streams/events.',
  
  applications: [
    {
      name: 'Studio Community Servers',
      how: 'Clip creator content featuring their game → post in studio\'s #highlights or #community-clips channel',
      value: 'Keeps community engaged between updates. Players see creators playing their game = social proof.',
      revenue: 'Studio pays retainer for community content curation',
    },
    {
      name: 'Creator Discord Servers',
      how: 'Exclusive clips posted to creator\'s Discord that aren\'t on public platforms',
      value: 'Gives members reason to stay in server. Exclusive content = higher engagement = more valuable community.',
      revenue: 'Part of creator management package — increases their Discord value for sponsorships',
    },
    {
      name: 'Event Teasers',
      how: 'Clip from last tournament → post as teaser for next one. Clip from stream → "Live again tomorrow"',
      value: 'Drives attendance to live events. Builds anticipation. Keeps community active.',
      revenue: 'Included in event management packages for studios',
    },
    {
      name: 'Game Studio Pre-Launch',
      how: 'Clip creator first-look content → distribute in studio\'s Discord before public launch',
      value: 'Community feels exclusive. Builds hype. Members share clips externally = organic marketing.',
      revenue: 'Premium add-on to creator campaign packages ($500-$1000 extra)',
    },
  ],
};

// ─── HELPER FUNCTIONS ───────────────────────────────────────────────────

export function getPlatformProfile(platform: TargetPlatform): PlatformProfile | undefined {
  return PLATFORM_PROFILES.find(p => p.id === platform);
}

export function getBestPlatformsForClipType(type: ClipType): TargetPlatform[] {
  const matches: { platform: TargetPlatform; rank: number }[] = [];
  
  for (const [platform, types] of Object.entries(CLIP_DETECTION_RULES.platformMatch)) {
    const rank = types.indexOf(type);
    if (rank !== -1) {
      matches.push({ platform: platform as TargetPlatform, rank });
    }
  }
  
  return matches.sort((a, b) => a.rank - b.rank).map(m => m.platform);
}

export function calculateClippingROI(clipsPerMonth: number, tier: 'basic' | 'standard' | 'premium'): {
  monthlyRevenue: number;
  monthlyCost: number;
  monthlyProfit: number;
  marginPercent: number;
} {
  const revenue = clipsPerMonth * CLIPPING_PRICING.perClip[tier];
  const cost = clipsPerMonth * CLIPPING_PRICING.costPerClip;
  const profit = revenue - cost;
  const marginPercent = (profit / revenue) * 100;
  
  return { monthlyRevenue: revenue, monthlyCost: cost, monthlyProfit: profit, marginPercent };
}

export function estimateClipsFromVideo(videoDurationMinutes: number): number {
  // Roughly 1 clip-worthy moment per 3-4 minutes of content
  return Math.floor(videoDurationMinutes / 3.5);
}
