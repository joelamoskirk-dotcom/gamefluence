// Roster Builder — Track progress toward 20-creator milestone
// Live tracker for signed creators, combined reach, and pilot readiness

export interface SignedCreator {
  id: string;
  name: string;
  handle: string;
  platform: 'tiktok' | 'youtube' | 'twitch' | 'instagram' | 'facebook';
  market: string;
  followers: number;
  avgViews: number;
  engagementRate: number;
  genres: string[];
  signedDate: string;
  source: 'cake_vietnam' | 'supanova' | 'dm_outreach' | 'inbound' | 'referral';
  status: 'signed' | 'onboarding' | 'active' | 'paused';
  notes: string;
}

export interface RosterMilestone {
  target: number;
  label: string;
  unlocks: string;
  reached: boolean;
}

export const milestones: RosterMilestone[] = [
  { target: 5, label: 'First 5', unlocks: 'Proof of concept — you can sign creators', reached: false },
  { target: 10, label: 'Double digits', unlocks: 'Enough for a micro-campaign test', reached: false },
  { target: 20, label: 'Credibility threshold', unlocks: 'Reach out to Tim. Pitch brands. "1M+ combined reach"', reached: false },
  { target: 30, label: 'Pilot-ready', unlocks: 'Run first paid campaign. Case study material.', reached: false },
  { target: 50, label: 'Network effect', unlocks: 'Creators refer creators. Brands see real scale.', reached: false },
];

// Seed with empty roster — you'll add real creators as they sign
export const signedRoster: SignedCreator[] = [];

export function getRosterStats(roster: SignedCreator[]) {
  const totalCreators = roster.length;
  const totalFollowers = roster.reduce((s, c) => s + c.followers, 0);
  const totalAvgViews = roster.reduce((s, c) => s + c.avgViews, 0);
  const avgEngagement = roster.length > 0
    ? roster.reduce((s, c) => s + c.engagementRate, 0) / roster.length
    : 0;
  const markets = [...new Set(roster.map(c => c.market))];
  const platforms = [...new Set(roster.map(c => c.platform))];
  const bySource = {
    cake_vietnam: roster.filter(c => c.source === 'cake_vietnam').length,
    supanova: roster.filter(c => c.source === 'supanova').length,
    dm_outreach: roster.filter(c => c.source === 'dm_outreach').length,
    inbound: roster.filter(c => c.source === 'inbound').length,
    referral: roster.filter(c => c.source === 'referral').length,
  };

  return {
    totalCreators,
    totalFollowers,
    totalAvgViews,
    avgEngagement: Math.round(avgEngagement * 10) / 10,
    markets,
    platforms,
    bySource,
    combinedReachFormatted: totalFollowers >= 1000000
      ? `${(totalFollowers / 1000000).toFixed(1)}M`
      : `${(totalFollowers / 1000).toFixed(0)}K`,
    nextMilestone: milestones.find(m => m.target > totalCreators) || milestones[milestones.length - 1],
    progressPercent: Math.min(100, (totalCreators / 20) * 100),
  };
}

export function formatReachDeck(roster: SignedCreator[]) {
  const stats = getRosterStats(roster);
  return `GAMEFLUENCE CREATOR NETWORK — LIVE STATS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Creators Signed:     ${stats.totalCreators}
Combined Reach:      ${stats.combinedReachFormatted} followers
Markets Active:      ${stats.markets.join(', ') || 'None yet'}
Platforms:           ${stats.platforms.join(', ') || 'None yet'}
Avg Engagement:      ${stats.avgEngagement}%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Source Breakdown:
  Vietnam (Cake):    ${stats.bySource.cake_vietnam}
  Supanova:          ${stats.bySource.supanova}
  DM Outreach:       ${stats.bySource.dm_outreach}
  Inbound:           ${stats.bySource.inbound}
  Referral:          ${stats.bySource.referral}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
}
