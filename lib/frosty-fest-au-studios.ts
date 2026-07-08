// Frosty Games Fest 2026 — AU/NZ Studio Prospecting Database
// Source: Frosty Games Fest 2026 showcase (June 7, 2026)
// 51 games from 50+ studios across Australia & New Zealand
// All studios are potential Gamefluence clients for creator UA + attribution

export interface FrostyStudio {
  id: string;
  studioName: string;
  gameTitle: string;
  genre: string;
  releaseStatus: 'released' | 'early_access' | 'demo_available' | 'announced' | 'date_confirmed';
  releaseDate?: string; // confirmed date if known
  releaseWindow?: string; // Q3 2026, etc.
  steamPage?: string;
  website?: string;
  contactEmail?: string; // to be filled via research
  contactName?: string;
  country: 'AU' | 'NZ';
  region?: string;
  
  // Campaign Fit Assessment
  creatorFit: 'high' | 'medium' | 'low';
  creatorFitReason: string;
  streamPotential: 'high' | 'medium' | 'low';
  urgency: 'immediate' | 'soon' | 'future'; // how soon they need UA
  estimatedBudget: 'micro' | 'small' | 'medium' | 'funded';
  
  // Outreach
  outreachStatus: 'not_contacted' | 'researching' | 'email_sent' | 'replied' | 'meeting_booked' | 'closed';
  outreachPriority: 1 | 2 | 3; // 1 = highest
  notes: string;
  
  // Frosty connection
  frostyRelationship: string; // how we connect via Frosty
}

export const FROSTY_FEST_STUDIOS: FrostyStudio[] = [
  // ═══ PRIORITY 1: Launching within 60 days, high creator fit ═══
  {
    id: 'space-rock-games',
    studioName: 'Space Rock Games',
    gameTitle: 'Doomsday Diner',
    genre: 'Post-apocalyptic cooking sim',
    releaseStatus: 'date_confirmed',
    releaseDate: '2026-07-23',
    country: 'AU',
    creatorFit: 'high',
    creatorFitReason: 'Cooking sims are massive on YouTube/TikTok. Post-apocalyptic twist is viral bait. Short-form content gold.',
    streamPotential: 'high',
    urgency: 'immediate',
    estimatedBudget: 'small',
    outreachStatus: 'not_contacted',
    outreachPriority: 1,
    notes: 'Launches July 23 — 2 weeks away. They need creators NOW. Perfect first outreach.',
    frostyRelationship: 'Featured at Frosty Fest 2026 with release date announcement'
  },
  {
    id: 'totem-softproducts',
    studioName: 'Totem Softproducts',
    gameTitle: 'HYPER PRIMATE',
    genre: 'Parkour platformer / speedrun',
    releaseStatus: 'date_confirmed',
    releaseDate: '2026-07-17',
    country: 'AU',
    creatorFit: 'high',
    creatorFitReason: 'Speedrun games are streamer magnets. Challenge content, time trials, competitive clips. Perfect for short-form.',
    streamPotential: 'high',
    urgency: 'immediate',
    estimatedBudget: 'micro',
    outreachStatus: 'not_contacted',
    outreachPriority: 1,
    notes: 'Launches July 17 — 9 days. Extremely urgent. Speedrun creators love this genre.',
    frostyRelationship: 'Release date confirmed at Frosty Fest 2026'
  },
  {
    id: 'little-nebula',
    studioName: 'Little Nebula',
    gameTitle: 'Bravest Coconut',
    genre: 'Story-rich puzzle adventure',
    releaseStatus: 'date_confirmed',
    releaseDate: '2026-07-10',
    country: 'AU',
    creatorFit: 'medium',
    creatorFitReason: 'Charming indie puzzle game. Good for cozy gaming creators and narrative-focused channels.',
    streamPotential: 'medium',
    urgency: 'immediate',
    estimatedBudget: 'micro',
    outreachStatus: 'not_contacted',
    outreachPriority: 1,
    notes: 'Launches July 10 — TOMORROW. May be too late for pre-launch but post-launch creator push still works.',
    frostyRelationship: 'Release date announced at Frosty Fest 2026'
  },
  {
    id: 'yetibytes',
    studioName: 'YETIBYTES',
    gameTitle: 'DWARRF: A Pinball Roguelike',
    genre: 'Deck-building physics roguelike (pinball/pachinko)',
    releaseStatus: 'date_confirmed',
    releaseDate: '2026-08-21',
    country: 'AU',
    creatorFit: 'high',
    creatorFitReason: 'Roguelikes dominate Twitch/YouTube. Pinball twist is unique hook. Content creators love roguelikes for series content.',
    streamPotential: 'high',
    urgency: 'soon',
    estimatedBudget: 'small',
    outreachStatus: 'not_contacted',
    outreachPriority: 1,
    notes: 'Aug 21 launch. 6 weeks out — ideal timing for creator campaign planning.',
    frostyRelationship: 'Release date announced at Frosty Fest 2026'
  },
  {
    id: 'snickerdoodle-funk',
    studioName: 'Snickerdoodle Games & Funk Games',
    gameTitle: 'Sludgineers',
    genre: 'Idle clicker / cleaning sim',
    releaseStatus: 'date_confirmed',
    releaseDate: '2026-08-25',
    country: 'AU',
    creatorFit: 'medium',
    creatorFitReason: 'Idle games have dedicated YouTube audience. Satisfying cleaning mechanic is great for short-form clips.',
    streamPotential: 'medium',
    urgency: 'soon',
    estimatedBudget: 'micro',
    outreachStatus: 'not_contacted',
    outreachPriority: 2,
    notes: 'Aug 25 launch. Good for cozy/idle gaming creators.',
    frostyRelationship: 'Release date confirmed at Frosty Fest 2026'
  },
  {
    id: 'busalonium',
    studioName: 'Busalonium',
    gameTitle: 'L8R SK8R',
    genre: '3D platformer / speedrun',
    releaseStatus: 'date_confirmed',
    releaseDate: '2026-08-28',
    country: 'AU',
    creatorFit: 'high',
    creatorFitReason: 'Skating + speedrun + collect-a-thon. Triple threat for content creators. Tony Hawk nostalgia audience.',
    streamPotential: 'high',
    urgency: 'soon',
    estimatedBudget: 'small',
    outreachStatus: 'not_contacted',
    outreachPriority: 1,
    notes: 'Aug 28 launch. Stylised skating platformer — perfect for short-form content clips.',
    frostyRelationship: 'Release date announced at Frosty Fest 2026'
  },

  // ═══ PRIORITY 1: Known studios with funding/profile ═══
  {
    id: 'chaos-theory-games',
    studioName: 'Chaos Theory Games',
    gameTitle: 'Rusthaven',
    genre: 'Solarpunk management sim',
    releaseStatus: 'announced',
    country: 'AU',
    creatorFit: 'high',
    creatorFitReason: 'Known studio. Management sims are YouTube gold (Cities Skylines audience). Solarpunk is trending aesthetic.',
    streamPotential: 'high',
    urgency: 'future',
    estimatedBudget: 'funded',
    outreachStatus: 'not_contacted',
    outreachPriority: 1,
    notes: 'Established AU studio — likely has real budget. Solarpunk + management = massive creator audience. ScreenHub feature already.',
    frostyRelationship: 'Featured at Frosty Fest 2026, previously covered by ScreenHub'
  },
  {
    id: 'tin-man-games',
    studioName: 'Tin Man Games',
    gameTitle: 'Atlanta TD',
    genre: 'Tower defence',
    releaseStatus: 'early_access',
    releaseWindow: 'December 2026',
    country: 'AU',
    creatorFit: 'high',
    creatorFitReason: 'Tin Man Games is established. Tower defence is proven streamer genre. Early access = ongoing creator content.',
    streamPotential: 'high',
    urgency: 'future',
    estimatedBudget: 'funded',
    outreachStatus: 'not_contacted',
    outreachPriority: 1,
    notes: 'Known AU studio (Gamebook Adventures, etc). Tower defence is reliable creator content. Dec EA launch gives time to plan.',
    frostyRelationship: 'Early access window announced at Frosty Fest 2026'
  },

  // ═══ PRIORITY 2: High creator fit, timing flexible ═══
  {
    id: 'fuzzy-ghost',
    studioName: 'Fuzzy Ghost',
    gameTitle: 'Janet DeMornay Is A Slumlord (and a witch)',
    genre: 'Comedy-horror / renting sim',
    releaseStatus: 'demo_available',
    country: 'AU',
    creatorFit: 'high',
    creatorFitReason: 'Comedy-horror is the most streamed indie genre. Long development = built-in community. Demo just dropped = wishlist push time.',
    streamPotential: 'high',
    urgency: 'soon',
    estimatedBudget: 'small',
    outreachStatus: 'not_contacted',
    outreachPriority: 1,
    notes: 'Years in development, strong community anticipation. Demo launch at Frosty Fest. Horror creators will love this.',
    frostyRelationship: 'Surprise demo announcement at Frosty Fest 2026 — opened the show'
  },
  {
    id: 'lablab',
    studioName: 'lablab',
    gameTitle: 'Cow Chess',
    genre: 'Real-time artillery shooter (Worms meets Smash)',
    releaseStatus: 'announced',
    country: 'AU',
    creatorFit: 'high',
    creatorFitReason: 'Multiplayer party games are streamer content machines. Worms nostalgia + competitive = endless clip potential.',
    streamPotential: 'high',
    urgency: 'future',
    estimatedBudget: 'micro',
    outreachStatus: 'not_contacted',
    outreachPriority: 2,
    notes: 'No release date yet but viral potential is massive. Multiplayer = group streams = exponential reach.',
    frostyRelationship: 'New gameplay trailer at Frosty Fest 2026'
  },
  {
    id: 'origame-digital',
    studioName: 'ORIGAME Digital',
    gameTitle: 'Penguin Colony',
    genre: 'Cosmic horror (from penguin perspective)',
    releaseStatus: 'announced',
    releaseWindow: '2026',
    country: 'AU',
    creatorFit: 'high',
    creatorFitReason: 'Unique hook = viral potential. Horror creators, weird games channels (like Markiplier audience). Meme potential.',
    streamPotential: 'high',
    urgency: 'soon',
    estimatedBudget: 'small',
    outreachStatus: 'not_contacted',
    outreachPriority: 2,
    notes: 'Cosmic horror from a penguin POV — this is the kind of game that goes viral from one streamer clip.',
    frostyRelationship: 'Gameplay and making-of trailer at Frosty Fest 2026'
  },
  {
    id: 'tyrian-games',
    studioName: 'Tyrian Games',
    gameTitle: 'HAWKER',
    genre: 'Roguelite action RPG / shopkeeper hybrid',
    releaseStatus: 'announced',
    country: 'AU',
    creatorFit: 'high',
    creatorFitReason: 'Roguelite + shopkeeper is proven formula (Moonlighter audience). Grimdark aesthetic differentiates.',
    streamPotential: 'high',
    urgency: 'future',
    estimatedBudget: 'small',
    outreachStatus: 'not_contacted',
    outreachPriority: 2,
    notes: 'Roguelites dominate indie streaming. This has a clear comp audience (Moonlighter, Hades fans).',
    frostyRelationship: 'New gameplay trailer at Frosty Fest 2026'
  },
  {
    id: 'piers-zip',
    studioName: 'piers.zip',
    gameTitle: 'Freeline',
    genre: 'Speedrun parkour platformer',
    releaseStatus: 'announced',
    country: 'AU',
    creatorFit: 'high',
    creatorFitReason: 'Speedrun games are content creator goldmines. Cat protagonist + corporate dystopia = personality.',
    streamPotential: 'high',
    urgency: 'future',
    estimatedBudget: 'micro',
    outreachStatus: 'not_contacted',
    outreachPriority: 2,
    notes: 'Speedrun platformer with a cat reclaiming rooftops. Perfect for movement-tech creator content.',
    frostyRelationship: 'Premiere reveal trailer at Frosty Fest 2026'
  },
  {
    id: 'winter-schloss',
    studioName: 'Winter Schloss Studios',
    gameTitle: 'Night Shift: 1999',
    genre: 'Visual novel / vampire sim',
    releaseStatus: 'announced',
    releaseWindow: 'Q3 2026',
    country: 'AU',
    region: 'Sydney',
    creatorFit: 'medium',
    creatorFitReason: 'Visual novels have dedicated creator community. Sydney setting is unique. Vampire trend still strong.',
    streamPotential: 'medium',
    urgency: 'soon',
    estimatedBudget: 'micro',
    outreachStatus: 'not_contacted',
    outreachPriority: 2,
    notes: 'Set in Kings Cross Sydney 1999 — local flavour. VN creators will pick this up organically but we can accelerate.',
    frostyRelationship: 'Release window announced at Frosty Fest 2026'
  },
  {
    id: 'dark-product',
    studioName: 'Dark Product',
    gameTitle: 'Night Shift: 1999',
    genre: 'Visual novel',
    releaseStatus: 'announced',
    releaseWindow: 'Q3 2026',
    country: 'AU',
    creatorFit: 'medium',
    creatorFitReason: 'See Winter Schloss — same game',
    streamPotential: 'medium',
    urgency: 'soon',
    estimatedBudget: 'micro',
    outreachStatus: 'not_contacted',
    outreachPriority: 3,
    notes: 'Publisher/partner for Night Shift: 1999',
    frostyRelationship: 'Featured at Frosty Fest 2026'
  },
  {
    id: 'daydream-gallery',
    studioName: 'Daydream Gallery',
    gameTitle: 'Trading Card Inspector',
    genre: 'Papers Please-style card inspection',
    releaseStatus: 'released',
    country: 'AU',
    creatorFit: 'high',
    creatorFitReason: 'Already released = immediate ROI opportunity. Papers Please-style = proven streamer genre. TCG audience overlap.',
    streamPotential: 'high',
    urgency: 'immediate',
    estimatedBudget: 'micro',
    outreachStatus: 'not_contacted',
    outreachPriority: 1,
    notes: 'SURPRISE RELEASED during Frosty Fest. Available NOW on Steam. They need post-launch creator push immediately.',
    frostyRelationship: 'Surprise-released during Frosty Fest 2026 showcase'
  },
  {
    id: 'jwt-production',
    studioName: 'JWT Production',
    gameTitle: 'Acting Out',
    genre: 'Online co-op movie scene filming',
    releaseStatus: 'early_access',
    releaseWindow: 'July 2026',
    country: 'AU',
    creatorFit: 'high',
    creatorFitReason: 'Co-op party game = friend group content = viral clips. Think Content Warning / Lethal Company audience.',
    streamPotential: 'high',
    urgency: 'immediate',
    estimatedBudget: 'small',
    outreachStatus: 'not_contacted',
    outreachPriority: 1,
    notes: 'Early access THIS MONTH. Co-op games are THE streamer genre right now. Group content creators will love this.',
    frostyRelationship: 'Early access window announced at Frosty Fest 2026'
  },
  {
    id: 'blight-software',
    studioName: 'Blight Software',
    gameTitle: 'BLIGHTEN',
    genre: 'Horror FPS',
    releaseStatus: 'announced',
    releaseWindow: '2026',
    country: 'AU',
    creatorFit: 'high',
    creatorFitReason: 'Horror FPS is the most-streamed indie genre. Jump scares = clips = views. Proven formula.',
    streamPotential: 'high',
    urgency: 'soon',
    estimatedBudget: 'small',
    outreachStatus: 'not_contacted',
    outreachPriority: 2,
    notes: 'Horror FPS in abandoned facility. Every horror streamer needs content like this.',
    frostyRelationship: 'Exclusive gameplay trailer at Frosty Fest 2026'
  },
  {
    id: 'we-made-a-thing',
    studioName: 'We Made A Thing Studios',
    gameTitle: 'Box Knight',
    genre: 'Office brawler / party game',
    releaseStatus: 'announced',
    country: 'AU',
    creatorFit: 'high',
    creatorFitReason: 'Party brawler with Aussie animal costumes. Group content potential. Casual audience appeal.',
    streamPotential: 'high',
    urgency: 'future',
    estimatedBudget: 'micro',
    outreachStatus: 'not_contacted',
    outreachPriority: 2,
    notes: 'Australian animal costumes announced at Frosty Fest. Local flavour + party game = perfect for AU creators.',
    frostyRelationship: 'New content trailer at Frosty Fest 2026'
  },
  {
    id: 'parasol-corp',
    studioName: 'Parasol Corp',
    gameTitle: 'Cozy Game Restoration',
    genre: 'Cartridge cleaning simulator',
    releaseStatus: 'date_confirmed',
    releaseDate: '2026-09-24',
    country: 'AU',
    creatorFit: 'medium',
    creatorFitReason: 'ASMR/satisfying content potential. Cozy gaming is a massive YouTube niche. Nostalgia factor.',
    streamPotential: 'medium',
    urgency: 'soon',
    estimatedBudget: 'micro',
    outreachStatus: 'not_contacted',
    outreachPriority: 2,
    notes: 'Sept 24 launch. Satisfying cleaning + retro nostalgia. Perfect for cozy gaming creators and ASMR channels.',
    frostyRelationship: 'Release date confirmed at Frosty Fest 2026'
  },
  {
    id: 'wombat-brawler',
    studioName: 'Wombat Brawler',
    gameTitle: 'Wild n Chill',
    genre: 'Wilderness survival sandbox',
    releaseStatus: 'announced',
    country: 'AU',
    creatorFit: 'high',
    creatorFitReason: 'Survival sandbox + fishing sequel. Proven audience from Cast n Chill. Cozy survival is trending hard.',
    streamPotential: 'high',
    urgency: 'future',
    estimatedBudget: 'small',
    outreachStatus: 'not_contacted',
    outreachPriority: 2,
    notes: 'Sequel to popular Cast n Chill. Built-in audience. Survival sandbox creators will want early access.',
    frostyRelationship: 'Revealed at Frosty Fest 2026'
  },

  // ═══ PRIORITY 3: NZ studios and longer-term prospects ═══
  {
    id: 'middle-space',
    studioName: 'Middle Space',
    gameTitle: 'Cloudlings',
    genre: 'Colony sim / survival',
    releaseStatus: 'announced',
    country: 'NZ',
    creatorFit: 'high',
    creatorFitReason: 'Colony sims (RimWorld audience) are evergreen streamer content. Floating island mechanic is unique hook.',
    streamPotential: 'high',
    urgency: 'future',
    estimatedBudget: 'small',
    outreachStatus: 'not_contacted',
    outreachPriority: 2,
    notes: 'NZ studio. Colony sims are content machines — each playthrough is unique. Good for series content.',
    frostyRelationship: 'Premiere reveal trailer at Frosty Fest 2026'
  },
  {
    id: 'disparity-games',
    studioName: 'Disparity Games',
    gameTitle: 'Toil&Trubble',
    genre: 'Life sim / witch adventure',
    releaseStatus: 'announced',
    country: 'NZ',
    creatorFit: 'medium',
    creatorFitReason: 'Cozy witch sim with a piglet. Stardew Valley-adjacent audience. Cozy gaming community will love this.',
    streamPotential: 'medium',
    urgency: 'future',
    estimatedBudget: 'micro',
    outreachStatus: 'not_contacted',
    outreachPriority: 3,
    notes: 'NZ studio. Premiere reveal at Frosty Fest. Cozy witch games have proven audience (Wylde Flowers, etc).',
    frostyRelationship: 'Major premiere reveal at Frosty Fest 2026'
  },
  {
    id: 'hewers-workshop',
    studioName: "Hewer's Workshop",
    gameTitle: 'Attack of the Astrals',
    genre: 'Turn-based strategy roguelike',
    releaseStatus: 'announced',
    releaseWindow: '2026',
    country: 'AU',
    creatorFit: 'medium',
    creatorFitReason: 'Strategy roguelikes have dedicated streaming audience (Into the Breach, Slay the Spire fans).',
    streamPotential: 'medium',
    urgency: 'soon',
    estimatedBudget: 'micro',
    outreachStatus: 'not_contacted',
    outreachPriority: 3,
    notes: 'Launches 2026. Cascading attack mechanic is interesting for highlight clips.',
    frostyRelationship: 'Exclusive gameplay trailer at Frosty Fest 2026'
  },
  {
    id: 'wildboy-studios',
    studioName: 'Wildboy Studios',
    gameTitle: 'Echo Zero',
    genre: 'Tower defence rogue-lite',
    releaseStatus: 'announced',
    country: 'AU',
    creatorFit: 'medium',
    creatorFitReason: 'TD + roguelite hybrid. Proven formula for indie content creators.',
    streamPotential: 'medium',
    urgency: 'future',
    estimatedBudget: 'micro',
    outreachStatus: 'not_contacted',
    outreachPriority: 3,
    notes: 'Premiere reveal at Frosty Fest. Sci-fi underworld setting differentiates from other TD games.',
    frostyRelationship: 'Premiere reveal at Frosty Fest 2026'
  },
  {
    id: 'duobonza',
    studioName: 'DuoBonza',
    gameTitle: 'Fishing Echoes',
    genre: 'Fantasy fishing RPG',
    releaseStatus: 'demo_available',
    releaseWindow: '2026',
    country: 'AU',
    region: 'Queensland',
    creatorFit: 'medium',
    creatorFitReason: 'Fishing games have dedicated audience. Fantasy twist with combat makes it more streamable.',
    streamPotential: 'medium',
    urgency: 'soon',
    estimatedBudget: 'micro',
    outreachStatus: 'not_contacted',
    outreachPriority: 3,
    notes: 'Inspired by North Queensland rainforests. Demo available now. Fish fight back with elemental magic.',
    frostyRelationship: 'Demo announced at Frosty Fest 2026'
  },
];

// ═══ Outreach Priority Summary ═══
export const OUTREACH_SUMMARY = {
  immediate: [
    'HYPER PRIMATE (July 17)',
    'Bravest Coconut (July 10)',
    'Doomsday Diner (July 23)',
    'Trading Card Inspector (RELEASED)',
    'Acting Out (Early Access July)',
  ],
  within_6_weeks: [
    'DWARRF: A Pinball Roguelike (Aug 21)',
    'Sludgineers (Aug 25)',
    'L8R SK8R (Aug 28)',
    'Janet DeMornay (demo live)',
  ],
  planning_phase: [
    'Chaos Theory Games — Rusthaven (funded, known studio)',
    'Tin Man Games — Atlanta TD (funded, Dec EA)',
    'Cow Chess — lablab (viral potential)',
    'Penguin Colony — ORIGAME Digital (unique hook)',
    'HAWKER — Tyrian Games (roguelite)',
    'Wild n Chill — Wombat Brawler (sequel)',
  ],
  total_studios: 25,
  priority_1_count: 10,
  with_confirmed_dates: 8,
  released_already: 1,
};

// ═══ Email Research Needed ═══
// Studios to research contact details for (Steam pages, LinkedIn, Twitter/X, Bluesky):
export const EMAIL_RESEARCH_LIST = [
  'Space Rock Games — Doomsday Diner (check Steam dev page)',
  'Totem Softproducts — HYPER PRIMATE',
  'Daydream Gallery — Trading Card Inspector (just released, likely responding to press)',
  'JWT Production — Acting Out',
  'Fuzzy Ghost — Janet DeMornay',
  'Chaos Theory Games — Rusthaven (likely has biz dev contact)',
  'Tin Man Games — Atlanta TD (established studio, public contacts)',
  'YETIBYTES — DWARRF',
  'Busalonium — L8R SK8R',
  'lablab — Cow Chess',
];
