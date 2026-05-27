// Supanova Sydney 2026 — Event Intelligence & Creator Targets
// Internal founder-only data for event planning and creator outreach

export interface EventCreatorTarget {
  id: string;
  name: string;
  handle: string;
  platform: 'youtube' | 'tiktok' | 'twitch' | 'instagram';
  profileUrl: string;
  profileImage: string; // URL to their profile pic
  followers: number;
  avgViews: number;
  engagementRate: number;
  tier: 'priority_sign' | 'high_value' | 'anchor' | 'aspirational';
  genres: string[];
  apacFit: number; // 1-5
  hunger: number; // 1-5
  platformSpread: number; // 1-5
  professionalism: number; // 1-5
  growthTrajectory: number; // 1-5
  totalScore: number; // out of 25
  worksBrands: boolean;
  knownBrands: string[];
  estMonthlyEarnings: string;
  represented: 'no' | 'likely' | 'yes';
  representedBy: string;
  heritage: string;
  languages: string[];
  notes: string;
  outreachStatus: 'not_contacted' | 'contacted' | 'interested' | 'signed' | 'passed';
}

export interface EventTask {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO date
  category: 'prep' | 'equipment' | 'content' | 'outreach' | 'follow_up';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export interface EventConfig {
  name: string;
  dates: string;
  venue: string;
  signupUrl: string;
  signupCode: string;
  links: { label: string; url: string }[];
}

export const supanovaConfig: EventConfig = {
  name: 'Supanova Sydney 2026',
  dates: 'June 19–21, 2026',
  venue: 'Sydney Showground, Olympic Park',
  signupUrl: 'https://gamefluenceai.com/creator-signup?event=supanova-sydney-2026',
  signupCode: 'SUPANOVA2026',
  links: [
    { label: 'Event Page', url: 'https://www.supanova.com.au/events/sydney-2026/ticket-info/' },
    { label: 'Level Up (Industry Day)', url: 'https://www.supanova.com.au/events/sydney-2026/level-up-in-sydney/' },
    { label: 'Guests', url: 'https://www.supanova.com.au/guest/' },
    { label: 'Exhibitors', url: 'https://www.supanova.com.au/exhibitors/' },
    { label: 'Venue Info', url: 'https://www.sydneyolympicpark.com.au/things-to-see-and-do/supanova-comic-con-gaming' },
  ],
};

export const creatorTargets: EventCreatorTarget[] = [
  {
    id: 'exxy_eric_do',
    name: 'Exxy (Eric Do)',
    handle: '@Exxyy_',
    platform: 'twitch',
    profileUrl: 'https://www.twitch.tv/exxyy_',
    profileImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/placeholder.png',
    followers: 22000,
    avgViews: 850,
    engagementRate: 12.5,
    tier: 'priority_sign',
    genres: ['Valorant', 'FPS', 'Esports'],
    apacFit: 5,
    hunger: 5,
    platformSpread: 3,
    professionalism: 4,
    growthTrajectory: 4,
    totalScore: 21,
    worksBrands: false,
    knownBrands: ['Avant Gaming (org sponsor only)'],
    estMonthlyEarnings: '$500–1.5K',
    represented: 'no',
    representedBy: 'Avant Gaming org only',
    heritage: 'Vietnamese-Australian',
    languages: ['English', 'Vietnamese'],
    notes: 'Vietnamese-Australian Valorant pro player for Avant Gaming. Perfect APAC bridge creator. Small audience but high credibility in competitive scene. Likely at gaming events in Sydney.',
    outreachStatus: 'not_contacted',
  },
  {
    id: 'rileyj',
    name: 'RileyJ',
    handle: '@riley.hemson',
    platform: 'tiktok',
    profileUrl: 'https://www.tiktok.com/@riley.hemson',
    profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder.jpeg',
    followers: 645000,
    avgViews: 224800,
    engagementRate: 11.8,
    tier: 'high_value',
    genres: ['Gaming', 'Comedy', 'Variety'],
    apacFit: 3,
    hunger: 4,
    platformSpread: 3,
    professionalism: 4,
    growthTrajectory: 5,
    totalScore: 19,
    worksBrands: true,
    knownBrands: ['Likely endemic gaming brands'],
    estMonthlyEarnings: '$2K–5K',
    represented: 'no',
    representedBy: '',
    heritage: 'Australian',
    languages: ['English'],
    notes: 'Massive TikTok engagement (11.8%). Growing fast. 224K avg views = insane ratio. Likely unrepresented at this size. Sign before someone else does.',
    outreachStatus: 'not_contacted',
  },
  {
    id: 'janelle_han',
    name: 'Janelle Han',
    handle: '@janellemyh',
    platform: 'tiktok',
    profileUrl: 'https://www.tiktok.com/@janellemyh',
    profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder.jpeg',
    followers: 577000,
    avgViews: 60000,
    engagementRate: 8.8,
    tier: 'high_value',
    genres: ['Gaming', 'Lifestyle', 'Anime'],
    apacFit: 5,
    hunger: 4,
    platformSpread: 3,
    professionalism: 4,
    growthTrajectory: 4,
    totalScore: 20,
    worksBrands: true,
    knownBrands: ['Lifestyle + gaming crossover brands'],
    estMonthlyEarnings: '$2K–4K',
    represented: 'likely',
    representedBy: 'Unknown — check at event',
    heritage: 'Asian-Australian',
    languages: ['English'],
    notes: 'Asian-Australian female gaming creator. Perfect for brands wanting to reach female APAC gaming audiences. Vietnamese/SEA audiences would connect with her aesthetic. Check representation status in person.',
    outreachStatus: 'not_contacted',
  },
  {
    id: 'walkrman',
    name: 'Walkrman',
    handle: '@walkrman_',
    platform: 'tiktok',
    profileUrl: 'https://www.tiktok.com/@walkrman_',
    profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder.jpeg',
    followers: 382000,
    avgViews: 183000,
    engagementRate: 14.2,
    tier: 'high_value',
    genres: ['Gaming', 'Comedy'],
    apacFit: 3,
    hunger: 4,
    platformSpread: 2,
    professionalism: 3,
    growthTrajectory: 5,
    totalScore: 17,
    worksBrands: false,
    knownBrands: [],
    estMonthlyEarnings: '$1K–3K',
    represented: 'no',
    representedBy: '',
    heritage: 'Australian',
    languages: ['English'],
    notes: '183K avg views on 382K followers = 48% view rate which is insane. Pure gaming content. Likely unrepresented. Prime Gamefluence target — sign fast.',
    outreachStatus: 'not_contacted',
  },
  {
    id: 'gamerjoob',
    name: 'GamerJoob',
    handle: '@GamerJoob',
    platform: 'youtube',
    profileUrl: 'https://www.youtube.com/@GamerJoob',
    profileImage: 'https://yt3.googleusercontent.com/placeholder.jpg',
    followers: 470000,
    avgViews: 33300,
    engagementRate: 1.9,
    tier: 'anchor',
    genres: ['Comedy Gaming', 'Variety', 'Challenge'],
    apacFit: 2,
    hunger: 3,
    platformSpread: 3,
    professionalism: 4,
    growthTrajectory: 3,
    totalScore: 15,
    worksBrands: true,
    knownBrands: ['Endemic gaming brands'],
    estMonthlyEarnings: '$2K–5K',
    represented: 'no',
    representedBy: '',
    heritage: 'Australian',
    languages: ['English'],
    notes: 'Established Aussie gaming comedy channel. 470K subs. Likely at Supanova. Good anchor creator for roster credibility. May need APAC angle explained.',
    outreachStatus: 'not_contacted',
  },
  {
    id: 'alicia_jade',
    name: 'Alicia Jade',
    handle: '@aliciajade.com',
    platform: 'tiktok',
    profileUrl: 'https://www.tiktok.com/@aliciajade.com',
    profileImage: 'https://p16-sign-sg.tiktokcdn.com/placeholder.jpeg',
    followers: 997000,
    avgViews: 6400,
    engagementRate: 13.1,
    tier: 'anchor',
    genres: ['Gaming', 'Lifestyle', 'Fashion'],
    apacFit: 3,
    hunger: 3,
    platformSpread: 4,
    professionalism: 4,
    growthTrajectory: 3,
    totalScore: 17,
    worksBrands: true,
    knownBrands: ['Fashion + gaming crossover'],
    estMonthlyEarnings: '$4K–8K',
    represented: 'likely',
    representedBy: 'Unknown — large following suggests management',
    heritage: 'Australian',
    languages: ['English'],
    notes: 'Nearly 1M TikTok. Female gaming + lifestyle crossover. High engagement. Likely represented at this size — worth checking. Would be a strong anchor for female audience campaigns.',
    outreachStatus: 'not_contacted',
  },
  {
    id: 'm4jor_bernard',
    name: 'm4jor (Bernard Chau)',
    handle: '@mFOURjor',
    platform: 'twitch',
    profileUrl: 'https://www.twitch.tv/mfourjor',
    profileImage: 'https://static-cdn.jtvnw.net/jtv_user_pictures/placeholder.png',
    followers: 18000,
    avgViews: 420,
    engagementRate: 9.8,
    tier: 'priority_sign',
    genres: ['Valorant', 'FPS', 'Esports'],
    apacFit: 5,
    hunger: 5,
    platformSpread: 2,
    professionalism: 4,
    growthTrajectory: 4,
    totalScore: 20,
    worksBrands: false,
    knownBrands: ['Avant Gaming org only'],
    estMonthlyEarnings: '$500–1.5K',
    represented: 'no',
    representedBy: 'Avant Gaming org only',
    heritage: 'Asian-Australian (Chinese)',
    languages: ['English', 'Cantonese'],
    notes: 'Asian-Australian Valorant player for Avant Gaming. Small but credible. Perfect for Vietnamese/Chinese market campaigns. Esports credibility. Likely at gaming events.',
    outreachStatus: 'not_contacted',
  },
  {
    id: 'abc_gamer',
    name: 'ABC Gamer',
    handle: '@ABCGamer',
    platform: 'youtube',
    profileUrl: 'https://www.youtube.com/@ABCGamer',
    profileImage: 'https://yt3.googleusercontent.com/placeholder.jpg',
    followers: 413000,
    avgViews: 2100,
    engagementRate: 5.3,
    tier: 'anchor',
    genres: ['Mobile Gaming', 'Reviews', 'Guides'],
    apacFit: 4,
    hunger: 3,
    platformSpread: 2,
    professionalism: 4,
    growthTrajectory: 2,
    totalScore: 15,
    worksBrands: true,
    knownBrands: ['Mobile game publishers'],
    estMonthlyEarnings: '$1K–3K',
    represented: 'no',
    representedBy: '',
    heritage: 'Australian',
    languages: ['English'],
    notes: 'Mobile gaming focus = directly aligned with SEA market. 413K subs but lower avg views suggests older content library driving subs. Still valuable for mobile game campaigns.',
    outreachStatus: 'not_contacted',
  },
  {
    id: 'david_wellman',
    name: 'David Wellman (xtr3m3z)',
    handle: '@xtr3m3z',
    platform: 'instagram',
    profileUrl: 'https://www.instagram.com/xtr3m3z/',
    profileImage: 'https://instagram.placeholder.com/xtr3m3z.jpg',
    followers: 471000,
    avgViews: 15000,
    engagementRate: 4.2,
    tier: 'anchor',
    genres: ['Retro Gaming', 'Collectibles', 'ASMR Gaming'],
    apacFit: 2,
    hunger: 2,
    platformSpread: 3,
    professionalism: 5,
    growthTrajectory: 3,
    totalScore: 15,
    worksBrands: true,
    knownBrands: ['Gaming collectible brands', 'Retro gaming companies'],
    estMonthlyEarnings: '$3K–6K',
    represented: 'no',
    representedBy: '',
    heritage: 'Australian',
    languages: ['English'],
    notes: 'Retro + modern gaming collector. 471K IG. Supanova regular (collectibles scene). Good for gaming culture content and non-endemic brand campaigns. Niche but professional.',
    outreachStatus: 'not_contacted',
  },
];

export const eventTasks: EventTask[] = [
  // PREP (2+ weeks before)
  { id: 't1', title: 'Buy Supanova 3-day pass', description: 'Purchase online at supanova.com.au — Friday Level Up + Sat/Sun', dueDate: '2026-06-01', category: 'prep', priority: 'high', completed: false },
  { id: 't2', title: 'Order wireless lav mic', description: 'DJI Mic 2 or Rode Wireless GO II — essential for interviews on loud convention floor', dueDate: '2026-06-01', category: 'equipment', priority: 'high', completed: false },
  { id: 't3', title: 'Order portable LED panel', description: 'Aputure MC or Ulanzi VL49 — pocket fill light for face shots', dueDate: '2026-06-01', category: 'equipment', priority: 'high', completed: false },
  { id: 't4', title: 'Print business cards with QR code', description: 'QR links to gamefluenceai.com/creator-signup?event=supanova-sydney-2026 — 100 cards minimum', dueDate: '2026-06-10', category: 'prep', priority: 'high', completed: false },
  { id: 't5', title: 'Buy extra GoPro batteries (2x)', description: 'Full day 4K shooting drains batteries in 90 mins', dueDate: '2026-06-05', category: 'equipment', priority: 'high', completed: false },
  { id: 't6', title: 'Buy SD cards (2x 128GB)', description: '4K footage fills 64GB in ~2 hours', dueDate: '2026-06-05', category: 'equipment', priority: 'high', completed: false },
  { id: 't7', title: 'Research creator social profiles', description: 'Check latest content from target creators — know what they play, recent posts, any brand deals visible', dueDate: '2026-06-15', category: 'outreach', priority: 'medium', completed: false },
  { id: 't8', title: 'Pre-DM top 3 targets', description: 'Send casual DM to Exxy, RileyJ, Janelle — "Hey, heading to Supanova — would love to connect if you\'re there"', dueDate: '2026-06-12', category: 'outreach', priority: 'high', completed: false },
  { id: 't9', title: 'Set up event-specific signup tracking', description: 'Ensure /creator-signup?event=supanova-sydney-2026 is tracked in leads API', dueDate: '2026-06-10', category: 'prep', priority: 'medium', completed: false },
  { id: 't10', title: 'Charge all devices', description: 'GoPro, gimbal, phone, power bank — all fully charged night before', dueDate: '2026-06-18', category: 'equipment', priority: 'high', completed: false },
  // EVENT DAYS
  { id: 't11', title: 'Friday: Level Up Industry Day', description: 'Film E-Racing GT7, Rocket League comps. Network with game devs. Fewer crowds = better interview footage.', dueDate: '2026-06-19', category: 'content', priority: 'high', completed: false },
  { id: 't12', title: 'Saturday: Main floor filming + outreach', description: 'Hero video shots: cosplay, gaming floor, neon lighting, crowds. Approach creators at booths.', dueDate: '2026-06-20', category: 'content', priority: 'high', completed: false },
  { id: 't13', title: 'Sunday: Final outreach + wrap shots', description: 'Follow up with anyone you missed. Get closing shots. Sunset/evening atmosphere.', dueDate: '2026-06-21', category: 'content', priority: 'medium', completed: false },
  // FOLLOW UP (within 1 week)
  { id: 't14', title: 'Send follow-up DMs/emails to all contacts', description: 'Personalized message within 24hrs. Include signup link and "great meeting you at Supanova"', dueDate: '2026-06-22', category: 'follow_up', priority: 'high', completed: false },
  { id: 't15', title: 'Back up all footage to cloud', description: 'Upload to Google Drive or iCloud. Don\'t lose the content.', dueDate: '2026-06-22', category: 'content', priority: 'high', completed: false },
  { id: 't16', title: 'Edit hero video (15-30 sec loop)', description: 'Cut best shots into looping hero video for gamefluenceai.com. No audio needed.', dueDate: '2026-06-28', category: 'content', priority: 'high', completed: false },
  { id: 't17', title: 'Cut 3-5 social clips', description: 'Short clips for TikTok/Instagram — BTS, event energy, creator meetings', dueDate: '2026-06-28', category: 'content', priority: 'medium', completed: false },
  { id: 't18', title: 'Onboard first signed creators', description: 'Get signed creators into the system. Set up profiles. Begin matching with briefs.', dueDate: '2026-07-05', category: 'follow_up', priority: 'high', completed: false },
  { id: 't19', title: 'Post LinkedIn recap', description: 'Professional post about Supanova experience, gaming creator economy, APAC opportunity', dueDate: '2026-06-25', category: 'content', priority: 'medium', completed: false },
  { id: 't20', title: 'Update website with new video', description: 'Replace Coverr stock video with Supanova footage on landing page', dueDate: '2026-07-01', category: 'content', priority: 'high', completed: false },
];

// Google Calendar ICS export
export function generateGoogleCalendarUrl(task: EventTask): string {
  const start = task.dueDate.replace(/-/g, '');
  const end = start; // single day events
  const title = encodeURIComponent(`[Gamefluence] ${task.title}`);
  const details = encodeURIComponent(task.description);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}`;
}

export function generateICSFile(): string {
  const events = eventTasks.map(task => {
    const date = task.dueDate.replace(/-/g, '');
    return `BEGIN:VEVENT
DTSTART;VALUE=DATE:${date}
DTEND;VALUE=DATE:${date}
SUMMARY:[Gamefluence] ${task.title}
DESCRIPTION:${task.description.replace(/\n/g, '\\n')}
CATEGORIES:${task.category}
PRIORITY:${task.priority === 'high' ? 1 : task.priority === 'medium' ? 5 : 9}
END:VEVENT`;
  }).join('\n');

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Gamefluence//Supanova 2026//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Supanova Sydney 2026 - Gamefluence
${events}
END:VCALENDAR`;
}

export function getTierColor(tier: EventCreatorTarget['tier']): string {
  switch (tier) {
    case 'priority_sign': return 'bg-red-100 text-red-700 border-red-200';
    case 'high_value': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'anchor': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'aspirational': return 'bg-purple-100 text-purple-700 border-purple-200';
  }
}

export function getTierLabel(tier: EventCreatorTarget['tier']): string {
  switch (tier) {
    case 'priority_sign': return '🔥 Priority Sign';
    case 'high_value': return '⭐ High Value';
    case 'anchor': return '💎 Anchor';
    case 'aspirational': return '🏆 Aspirational';
  }
}


// ── SOCIAL INTEL & TIMING STRATEGY ────────────────────────────────────────────

export interface SocialIntelEntry {
  id: string;
  source: 'linkedin' | 'twitter' | 'tiktok' | 'instagram' | 'other';
  personName: string;
  personHandle: string;
  content: string;
  opportunity: string;
  dateSpotted: string;
  priority: 'high' | 'medium' | 'low';
  actionTaken: boolean;
}

export const dailySearchQueries = [
  { platform: 'LinkedIn', query: '"Supanova" "Sydney" 2026', frequency: 'Daily from June 1', purpose: 'Find who in your network is attending, exhibiting, or speaking' },
  { platform: 'LinkedIn', query: '"gaming creator" OR "content creator" "Sydney"', frequency: 'Every 2 days', purpose: 'Identify local creators posting about gaming content' },
  { platform: 'LinkedIn', query: '"Supanova" "excited" OR "see you there" OR "booth"', frequency: 'Daily from June 10', purpose: 'Spot creators announcing attendance — DM them before the event' },
  { platform: 'Twitter/X', query: '#Supanova2026 OR #SupanovaSydney', frequency: 'Daily from June 1', purpose: 'Real-time chatter about who\'s going, what panels, meetups' },
  { platform: 'TikTok', query: 'supanova sydney 2026', frequency: 'Every 3 days', purpose: 'Creators making "getting ready for Supanova" content = confirmed attendance' },
  { platform: 'Instagram', query: '#supanova2026 #supanovasydney', frequency: 'Daily from June 15', purpose: 'Stories/posts from creators packing, traveling, or previewing cosplay' },
  { platform: 'YouTube', query: 'supanova sydney 2026 vlog', frequency: 'Weekly', purpose: 'Creators planning Supanova vlogs = high-value targets (they\'re already creating content there)' },
];

export const timingStrategy = [
  {
    timeSlot: 'Friday 9–11am',
    location: 'Level Up seminars',
    whosThere: 'Industry professionals, game devs, educators',
    approach: 'Professional networking mode. Business cards. Talk about APAC market opportunity.',
    bestFor: 'Brand-side contacts (potential clients), game studio partnerships',
  },
  {
    timeSlot: 'Friday 11am–2pm',
    location: 'E-Racing / Rocket League area',
    whosThere: 'Competitive gamers, esports enthusiasts, younger creators',
    approach: 'Casual. Watch them play, compliment their skills, then introduce yourself.',
    bestFor: 'Esports creators (Exxy, m4jor types), racing game content creators',
  },
  {
    timeSlot: 'Friday 2–5pm',
    location: 'Gaming floor (less crowded)',
    whosThere: 'Dedicated gamers, indie devs testing games',
    approach: 'Relaxed conversations. People have time on Friday. Longer chats possible.',
    bestFor: 'In-depth creator conversations, filming B-roll without crowds',
  },
  {
    timeSlot: 'Saturday 10am–12pm',
    location: 'Main entrance / gaming hall',
    whosThere: 'Everyone arriving fresh. Creators setting up. Energy is high.',
    approach: 'Quick intros. People are excited but moving fast. Get contact info, plan to reconnect later.',
    bestFor: 'First contact with many people. Cast a wide net.',
  },
  {
    timeSlot: 'Saturday 12–3pm',
    location: 'Cosplay areas / main stage',
    whosThere: 'Cosplayers, photographers, TikTok creators filming content',
    approach: 'Film them (ask permission). Offer to send them the footage. Natural conversation starter.',
    bestFor: 'Hero video footage. TikTok/Instagram creators. Female gaming audience creators.',
  },
  {
    timeSlot: 'Saturday 3–5pm',
    location: 'Artist alley / merch area',
    whosThere: 'Creators browsing, taking breaks between panels. More relaxed.',
    approach: 'Casual. "What did you think of [panel]?" People are in social mode.',
    bestFor: 'Deeper conversations. Creators who are winding down and open to chatting.',
  },
  {
    timeSlot: 'Saturday 5–7pm',
    location: 'Food court / outside areas',
    whosThere: 'Everyone taking a break. Groups forming for dinner plans.',
    approach: 'Most natural networking time. Offer to buy someone a coffee. Join a group.',
    bestFor: 'Building real relationships. This is where deals actually happen.',
  },
  {
    timeSlot: 'Sunday 10am–1pm',
    location: 'Gaming floor / panels',
    whosThere: 'Dedicated fans. Creators doing final content. Less corporate energy.',
    approach: 'Follow up with people you met Saturday. "Hey, we chatted yesterday about..."',
    bestFor: 'Converting warm leads. Second conversations are where commitment happens.',
  },
  {
    timeSlot: 'Sunday 1–4pm',
    location: 'Everywhere (event winding down)',
    whosThere: 'People in "last chance" mode. More open to spontaneous connections.',
    approach: 'Direct. "Before the event ends, I wanted to make sure we connected..."',
    bestFor: 'Final outreach sweep. Grab anyone you missed.',
  },
];

export const linkedInExportInstructions = `
## How to Export Your LinkedIn Connections

1. Go to linkedin.com/mypreferences/d/download-my-data
2. Select "Connections" checkbox
3. Click "Request archive"
4. Wait for email (usually 10 minutes)
5. Download the CSV file
6. Upload it to the Supanova dashboard (coming soon)

## What You'll Get
- First Name, Last Name
- Email Address (if they shared it)
- Company
- Position
- Connected On date

## How to Use It
- Filter for gaming/esports/content creator roles
- Filter for Sydney-based connections
- Cross-reference with Supanova exhibitor/guest lists
- Pre-DM connections who might be attending
`;

export const salesNavStrategy = `
## LinkedIn Sales Navigator — Free Trial Strategy

### When to Start
Activate free trial: **June 5, 2026** (2 weeks before event)
Cancel before: **July 4, 2026** (avoid charge)

### Searches to Run

1. **"Content Creator" + "Gaming" + "Sydney"**
   → Find local gaming creators in your extended network

2. **"Supanova" in posts (last 30 days)**
   → See who's talking about attending

3. **"Influencer Marketing" + "Gaming" + "Australia"**
   → Find agency contacts (potential Gamefluence clients)

4. **"Esports" + "Australia" + current company: any**
   → Find esports org people who might introduce you to their creators

### InMail Templates

**To a Creator:**
"Hey [Name] — saw you're heading to Supanova! I run Gamefluence, a gaming creator platform focused on APAC brand campaigns. Would love to buy you a coffee at the event and chat about how we're helping Aussie creators get paid campaigns from SEA gaming brands. No pressure — just a conversation. Are you free Saturday afternoon?"

**To an Industry Contact:**
"Hi [Name] — noticed we're both in the APAC gaming space. I'm building Gamefluence (gaming creator marketing for SEA markets) and will be at Supanova Sydney. Would be great to connect briefly if you're there. Happy to share what we're seeing in the Vietnam/Indonesia creator economy."
`;
