// AU Studio Outreach Engine — Frosty Fest 2026 Campaign
// Email templates and outreach strategy for ANZ indie gaming studios
// Messaging: We saw your game at Frosty Fest → we do creator UA + attribution → let's talk

export interface OutreachEmail {
  id: string;
  templateName: string;
  subject: string;
  body: string;
  context: string; // when to use this template
  followUpDays: number; // days before follow-up
}

export interface OutreachSequence {
  name: string;
  targetAudience: string;
  emails: OutreachEmail[];
}

// ═══ OUTREACH SEQUENCE: Studios with imminent launches (< 30 days) ═══
export const IMMINENT_LAUNCH_SEQUENCE: OutreachSequence = {
  name: 'Frosty Fest — Imminent Launch Studios',
  targetAudience: 'Studios launching within 30 days (Doomsday Diner, HYPER PRIMATE, Acting Out, Trading Card Inspector)',
  emails: [
    {
      id: 'imminent-1',
      templateName: 'Frosty Fest — Launch Week Offer',
      subject: 'Saw {{game_title}} at Frosty Fest — creator campaign idea',
      body: `Hey {{contact_name}},

Joel here from Gamefluence. Caught {{game_title}} at Frosty Fest — {{specific_compliment}}.

Quick context: I spent 10 years running gaming UA at King, Amazon Games, and AppsFlyer before starting Gamefluence. We run creator campaigns for indie studios and handle the attribution so you actually know what's working.

With {{game_title}} launching {{launch_context}}, figured I'd reach out directly:

We could get 5-10 gaming creators producing content for {{game_title}} within a week. Each one tracked with unique links so you see exactly which creator drives which installs. No spray-and-pray — targeted creators who actually play your genre.

For studios coming out of Frosty Fest, we're offering free attribution reporting on your first campaign — we want to build case studies in the ANZ scene.

Worth a 15-min call this week?

Joel Kirk
Gamefluence | gamefluence.com.au
Previously: King, Amazon Games, AppsFlyer, AWS Gaming`,
      context: 'Use for studios with confirmed launch dates within 30 days',
      followUpDays: 3,
    },
    {
      id: 'imminent-2',
      templateName: 'Follow-up — Launch Approaching',
      subject: 'Re: {{game_title}} — quick question',
      body: `Hey {{contact_name}},

Following up on my last note. With {{game_title}} launching {{days_until_launch}} days from now, wanted to flag something:

The biggest indie games that broke through in the last 2 years (Schedule I, Lethal Company, Content Warning) all had one thing in common — creator discovery drove their sales, not paid ads.

We can set up a creator campaign for {{game_title}} in under a week. You'd have:
- 5-10 creators making content pre-launch or launch week
- Every click/install attributed back to specific creators
- Real-time dashboard showing what's working

No long contracts. No big upfront commitment. Just: does it work? (Spoiler: it does.)

Happy to jump on a quick call or just reply here with questions.

Joel`,
      context: 'Send 3 days after first email if no reply',
      followUpDays: 5,
    },
    {
      id: 'imminent-3',
      templateName: 'Final touch — Value add',
      subject: '{{game_title}} launch — one more thought',
      body: `Hey {{contact_name}},

Last note from me — just wanted to share something useful regardless:

We just published a piece on why most indie games die without creator-driven discovery, and the measurement gap in ANZ gaming funding. Might be relevant as you prep for launch:

gamefluence.com.au/news/7

If {{game_title}} takes off (which I think it will given the Frosty Fest reception), we're here whenever you want to add fuel to the fire. No pressure.

Good luck with the launch!

Joel`,
      context: 'Send 5 days after follow-up. Provides value even if they don\'t reply.',
      followUpDays: 0,
    },
  ],
};

// ═══ OUTREACH SEQUENCE: Funded/established studios (Chaos Theory, Tin Man, etc) ═══
export const FUNDED_STUDIO_SEQUENCE: OutreachSequence = {
  name: 'Frosty Fest — Established/Funded Studios',
  targetAudience: 'Known studios with budget (Chaos Theory Games, Tin Man Games, Wombat Brawler)',
  emails: [
    {
      id: 'funded-1',
      templateName: 'Peer-level intro — Established Studio',
      subject: '{{studio_name}} + Gamefluence — creator UA for {{game_title}}',
      body: `Hey {{contact_name}},

Joel Kirk here — spent the last decade running gaming UA (King, Amazon Games, AppsFlyer) and now run Gamefluence, a creator marketing + attribution platform built for gaming studios.

Saw {{game_title}} at Frosty Fest. {{specific_insight_about_game}}.

The short version of what we do: we run creator campaigns for gaming studios and handle the measurement layer — MMP-verified attribution, per-creator CPI, incrementality testing. You know what's actually driving installs vs. what's just noise.

For context, we recently ran a campaign that delivered $0.80 CPI through creator-attributed installs vs $2.50-8.00 through standard paid UA in APAC markets.

We're building out our ANZ case study portfolio and {{game_title}} feels like a natural fit. Would love to chat about how creator UA could work for your launch timeline.

Free for a call next week?

Joel Kirk
Gamefluence | gamefluence.com.au
Published: IAB, The Drum, Activision Blizzard Media`,
      context: 'Use for established studios with real budgets and longer timelines',
      followUpDays: 5,
    },
    {
      id: 'funded-2',
      templateName: 'Follow-up — Case study offer',
      subject: 'Re: {{studio_name}} + Gamefluence',
      body: `Hey {{contact_name}},

Following up on my earlier note. One thing I forgot to mention:

We're looking to build 2-3 ANZ case studies this quarter. For the right studios, we're offering free attribution reporting — you get the full measurement layer on your creator campaign at no cost, and we get a case study we can share (anonymised if you prefer).

For {{game_title}}, that would mean:
- We set up tracked links for every creator touchpoint
- You see real-time data on which creators drive which outcomes
- Post-campaign report showing verified ROI, CPI per creator, retention curves

The only investment from your side would be the creator fees themselves (we help negotiate those too).

Interested? Even a 15-min chat would tell us both if there's a fit.

Joel`,
      context: 'Send 5 days after initial email',
      followUpDays: 7,
    },
  ],
};

// ═══ OUTREACH SEQUENCE: High viral-potential games (Cow Chess, Penguin Colony, etc) ═══
export const VIRAL_POTENTIAL_SEQUENCE: OutreachSequence = {
  name: 'Frosty Fest — Viral Potential Games',
  targetAudience: 'Studios with high viral/streamer potential (Cow Chess, Penguin Colony, Freeline, HAWKER)',
  emails: [
    {
      id: 'viral-1',
      templateName: 'Viral potential angle',
      subject: '{{game_title}} has Lethal Company energy — here\'s why',
      body: `Hey {{contact_name}},

Joel from Gamefluence. Saw {{game_title}} at Frosty Fest and immediately thought: this has breakout potential.

{{viral_reason}}

Quick context on me: I've spent 10+ years in gaming UA and creator marketing (King, Amazon Games, scaled Kick to 100M users). I know what makes creators pick up a game organically vs what needs a push.

{{game_title}} has the hook. The question is: do you want to leave discovery to chance, or do you want to engineer it?

What we do:
1. Identify the exact creators whose audience matches your game
2. Get your game in their hands with proper briefing
3. Track every install back to the source with MMP attribution
4. Tell you exactly what worked and what to do more of

The studios that broke out (Lethal Company, Content Warning, Schedule I) all had creator ecosystems. They just didn't have measurement. We add the measurement.

Worth chatting about when the time's right?

Joel`,
      context: 'Use for games with high viral/streamer potential that could break out',
      followUpDays: 7,
    },
  ],
};

// ═══ FROSTY GAMES FEST PARTNERSHIP ANGLE ═══
export const FROSTY_PARTNERSHIP_PITCH = {
  context: 'Pitch to Frosty Games Fest team directly — offer free attribution for showcased games',
  angle: `
    We're a friend of Frosty. Pitch:
    - Offer free attribution reporting for Frosty Fest showcased studios
    - This data goes back to Screen Australia / funding bodies as proof of ROI
    - Frosty Fest becomes the only showcase that can show what happened AFTER the trailer
    - We build the measurement layer, they get the data, funding bodies get proof
    - Everyone wins: studios get free analytics, Frosty gets differentiation, funders get accountability
  `,
  emailDraft: `
Subject: Frosty Games Fest x Gamefluence — free attribution for showcased studios

Hey team,

Joel Kirk here from Gamefluence — we're a creator marketing + attribution platform for gaming (background: King, Amazon Games, AppsFlyer, AWS Gaming).

Congrats on Frosty Fest 2026 — brilliant showcase. 51 games, massive quality.

Quick idea: what if Frosty Fest showcased studios could get free attribution reporting post-showcase?

Here's the pitch:
- We provide tracked links + measurement for any Frosty Fest studio that wants it
- Studios see which creator content, press coverage, or wishlist spike actually drove installs
- You (Frosty) get to show funding bodies (Screen Australia, CODE NZ) that your showcase drove measurable economic outcomes
- The data becomes the case for more funding into ANZ game dev

No one in the ANZ scene is doing post-showcase measurement. Frosty could be the first showcase that proves ROI for participating studios — not just "we got a trailer slot" but "this showcase drove X installs and Y revenue."

Happy to chat more about how this could work. Free for a call next week?

Joel Kirk
Gamefluence | gamefluence.com.au
  `,
};

// ═══ SCREEN AUSTRALIA / FUNDING BODY ANGLE ═══
export const FUNDING_BODY_PITCH = {
  target: 'Screen Australia, Screen Queensland, Screen NSW, CODE (NZ)',
  angle: `
    Problem: Government funds ~26 games per round with zero post-release performance tracking.
    Solution: We provide the attribution layer that proves their investment generated measurable outcomes.
    Offer: Free pilot — we track creator-attributed installs for 5 government-funded games and present the data.
    Outcome: They get case studies for treasury. We get deal flow from studios they fund.
  `,
};

// ═══ AMY CALL PREP — RETARGETING STRATEGY ═══
export const AMY_CALL_STRATEGY = {
  context: 'Prep for Amy meeting — feed learnings back',
  keyQuestions: [
    'Who did Amy recommend we speak with?',
    'Which studios have active budget right now?',
    'Any creator intros she can make?',
    'Is there a Frosty Games community/Discord we should be in?',
    'Can she intro us to the Frosty Games organisers for the attribution partnership pitch?',
  ],
  followUpActions: [
    'Reach out to Jane (Tempo Lab) directly after Amy call',
    'Write Frosty Fest content piece after Amy gives context on angle',
    'Get Amy to soft-intro us to any studios she knows with budget',
    'Ask about Screen Australia contacts — who makes funding decisions?',
  ],
  retargetingFromFrosty: {
    youtubeChannel: 'https://www.youtube.com/@FrostyGamesFest',
    vodReplay: 'https://www.youtube.com/watch?v=6mmuYcEEEJU',
    strategy: [
      'Subscribe and engage on VOD — comment with value-add insight',
      'YouTube ad retargeting against Frosty Fest VOD viewers (industry audience)',
      'Frosty Games newsletter (beehiiv) — subscribe and engage',
      'Monitor Steam event page for showcased games — track wishlist movement',
      'Follow all showcased studios on Twitter/Bluesky — engage with their content',
    ],
  },
  contentPlayAfterAmy: {
    title: '51 ANZ Games Just Launched at Frosty Fest. Here\'s Why Most Won\'t Find Their Audience.',
    angle: 'Discovery problem + measurement gap + creator UA as the solution',
    timing: 'Write AFTER Amy call for proper context and angle',
    reminder: true,
  },
};

// ═══ RETARGETING STRATEGY DASHBOARD DATA ═══
export interface RetargetingSource {
  name: string;
  type: 'showcase' | 'funding_body' | 'industry_news' | 'community';
  url: string;
  monitorFrequency: 'daily' | 'weekly' | 'monthly';
  lastChecked?: Date;
  insights: string[];
}

export const AU_GAMING_ECOSYSTEM_SOURCES: RetargetingSource[] = [
  {
    name: 'Frosty Games Fest',
    type: 'showcase',
    url: 'https://www.frostygamesfest.com/',
    monitorFrequency: 'weekly',
    insights: ['51 games showcased June 2026', '200+ submissions', 'Supported by CODE NZ'],
  },
  {
    name: 'Screen Australia — Games',
    type: 'funding_body',
    url: 'https://www.screenaustralia.gov.au/funding-and-support/games',
    monitorFrequency: 'monthly',
    insights: ['Games Production Fund up to $100K per title', '~26 games funded per round', 'Zero post-release tracking'],
  },
  {
    name: 'Screen Queensland',
    type: 'funding_body',
    url: 'https://www.screenqueensland.com.au/',
    monitorFrequency: 'monthly',
    insights: ['Up to $300K lifetime per project', 'Active digital games program'],
  },
  {
    name: 'Screen NSW',
    type: 'funding_body',
    url: 'https://www.screen.nsw.gov.au/',
    monitorFrequency: 'monthly',
    insights: ['10% Digital Games Rebate on $350K+ expenditure'],
  },
  {
    name: 'CODE (Centre of Digital Excellence) NZ',
    type: 'funding_body',
    url: 'https://www.code.nz/',
    monitorFrequency: 'monthly',
    insights: ['Supports Frosty Games Fest', 'NZ game dev accelerator'],
  },
  {
    name: 'ScreenHub AU — Games Section',
    type: 'industry_news',
    url: 'https://www.screenhub.com.au/news-type/games/',
    monitorFrequency: 'daily',
    insights: ['Primary ANZ games journalism', 'Covers Frosty Fest, studio news, funding announcements'],
  },
  {
    name: 'IGEA (Interactive Games & Entertainment Association)',
    type: 'community',
    url: 'https://igea.net/',
    monitorFrequency: 'weekly',
    insights: ['Industry body for AU/NZ games', 'Runs GCAP and Melbourne International Games Week'],
  },
  {
    name: 'GCAP (Game Connect Asia Pacific)',
    type: 'community',
    url: 'https://www.gcap.com.au/',
    monitorFrequency: 'monthly',
    insights: ['Annual AU game dev conference', 'Best place to meet AU studio founders'],
  },
  {
    name: 'Steam Next Fest — ANZ Games',
    type: 'showcase',
    url: 'https://store.steampowered.com/sale/nextfest',
    monitorFrequency: 'monthly',
    insights: ['Frosty Games curates ANZ games for Next Fest', 'Demo visibility spike'],
  },
  {
    name: 'Frosty Games Newsletter (Beehiiv)',
    type: 'community',
    url: 'https://frostygamesfest.beehiiv.com/',
    monitorFrequency: 'weekly',
    insights: ['Monthly updates on ANZ game releases', 'Frosty Finds curated lists'],
  },
];
