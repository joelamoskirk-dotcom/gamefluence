// Advanced Gamefluence AI Engine
// Learning engine that improves creator selection based on campaign history

export interface CampaignOutcome {
  campaignId: string;
  creatorId: string;
  market: string;
  genre: string;
  budget: number;
  actualReach: number;
  actualEngagement: number;
  actualConversions: number;
  actualROI: number;
  creatorScore: number; // 0-100 how well this creator performed
  timestamp: number;
}

export interface CreatorSignal {
  creatorId: string;
  platform: string;
  followers: number;
  engagementRate: number;
  avgConversions: number;
  market: string;
  genres: string[];
  brandSafetyScore: number;
  audienceQuality: number;
  pastCampaignROI: number[]; // historical ROI per campaign
  onPlatform: boolean; // signed up to Gamefluence
  leadScore: number; // 0-100 likelihood to respond to outreach
  tier: 'diamond' | 'platinum' | 'gold' | 'silver' | 'bronze';
}

export interface CampaignBrief {
  genre: string;
  market: string;
  budget: number;
  targetConversions: number;
  minFollowers: number;
  preferOnPlatform: boolean;
  creatorCount: number;
}

export interface CreatorRecommendation {
  creator: CreatorSignal;
  score: number;
  reason: string[];
  predictedROI: number;
  predictedConversions: number;
  outreachPriority: 'immediate' | 'high' | 'medium' | 'low';
  isOnPlatform: boolean;
}

export interface LearningInsight {
  type: 'market' | 'genre' | 'creator_tier' | 'budget_range' | 'collab';
  insight: string;
  confidence: number;
  actionable: string;
  dataPoints: number;
}

// In-memory learning store (in production this would be a DB)
const learningStore: {
  outcomes: CampaignOutcome[];
  marketPerformance: Record<string, { avgROI: number; count: number }>;
  genrePerformance: Record<string, { avgROI: number; count: number }>;
  creatorPerformance: Record<string, { avgROI: number; avgConversions: number; count: number }>;
  tierPerformance: Record<string, { avgROI: number; count: number }>;
} = {
  outcomes: [],
  marketPerformance: {
    vietnam: { avgROI: 3.2, count: 12 },
    thailand: { avgROI: 2.8, count: 8 },
    indonesia: { avgROI: 3.5, count: 6 },
    philippines: { avgROI: 2.4, count: 4 },
    australia: { avgROI: 2.6, count: 3 },
    japan: { avgROI: 3.9, count: 7 },
  },
  genrePerformance: {
    mobile_rpg: { avgROI: 3.8, count: 15 },
    battle_royale: { avgROI: 3.1, count: 10 },
    casual: { avgROI: 2.2, count: 8 },
    racing: { avgROI: 2.9, count: 7 },
    strategy: { avgROI: 3.4, count: 5 },
    gacha: { avgROI: 4.2, count: 6 },
  },
  creatorPerformance: {},
  tierPerformance: {
    diamond: { avgROI: 4.1, count: 5 },
    platinum: { avgROI: 3.4, count: 12 },
    gold: { avgROI: 2.8, count: 20 },
    silver: { avgROI: 2.1, count: 18 },
    bronze: { avgROI: 1.6, count: 10 },
  },
};

export class AdvancedGamefluenceAI {
  private static instance: AdvancedGamefluenceAI;

  static getInstance(): AdvancedGamefluenceAI {
    if (!AdvancedGamefluenceAI.instance) {
      AdvancedGamefluenceAI.instance = new AdvancedGamefluenceAI();
    }
    return AdvancedGamefluenceAI.instance;
  }

  // Record campaign outcome to feed the learning engine
  recordOutcome(outcome: CampaignOutcome): void {
    learningStore.outcomes.push(outcome);

    // Update market performance
    const mp = learningStore.marketPerformance[outcome.market] ?? { avgROI: 0, count: 0 };
    mp.avgROI = (mp.avgROI * mp.count + outcome.actualROI) / (mp.count + 1);
    mp.count++;
    learningStore.marketPerformance[outcome.market] = mp;

    // Update genre performance
    const gp = learningStore.genrePerformance[outcome.genre] ?? { avgROI: 0, count: 0 };
    gp.avgROI = (gp.avgROI * gp.count + outcome.actualROI) / (gp.count + 1);
    gp.count++;
    learningStore.genrePerformance[outcome.genre] = gp;

    // Update creator performance
    const cp = learningStore.creatorPerformance[outcome.creatorId] ?? {
      avgROI: 0,
      avgConversions: 0,
      count: 0,
    };
    cp.avgROI = (cp.avgROI * cp.count + outcome.actualROI) / (cp.count + 1);
    cp.avgConversions =
      (cp.avgConversions * cp.count + outcome.actualConversions) / (cp.count + 1);
    cp.count++;
    learningStore.creatorPerformance[outcome.creatorId] = cp;
  }

  // Score a creator against a brief using learned data
  scoreCreator(creator: CreatorSignal, brief: CampaignBrief): number {
    let score = 0;

    // 1. Market fit (25 pts) — learned from past campaigns
    const marketData = learningStore.marketPerformance[brief.market];
    const marketROI = marketData?.avgROI ?? 2.0;
    score += Math.min(25, (marketROI / 5) * 25);

    // 2. Genre fit (20 pts)
    const genreData = learningStore.genrePerformance[brief.genre];
    const genreROI = genreData?.avgROI ?? 2.0;
    score += Math.min(20, (genreROI / 5) * 20);

    // 3. Creator historical performance (20 pts)
    const creatorData = learningStore.creatorPerformance[creator.creatorId];
    if (creatorData && creatorData.count > 0) {
      score += Math.min(20, (creatorData.avgROI / 5) * 20);
    } else {
      // No history — use tier as proxy
      const tierData = learningStore.tierPerformance[creator.tier];
      score += Math.min(20, ((tierData?.avgROI ?? 2.0) / 5) * 20);
    }

    // 4. Engagement quality (15 pts)
    score += Math.min(15, creator.engagementRate * 1.5);

    // 5. Audience quality (10 pts)
    score += (creator.audienceQuality / 100) * 10;

    // 6. Brand safety (10 pts)
    score += (creator.brandSafetyScore / 100) * 10;

    // Bonus: on-platform creators get +5 (easier to activate)
    if (creator.onPlatform) score += 5;

    return Math.min(100, Math.round(score));
  }

  // Select best creators for a brief from available pool
  selectCreatorsForBrief(
    creators: CreatorSignal[],
    brief: CampaignBrief
  ): CreatorRecommendation[] {
    const eligible = creators.filter(
      (c) => c.followers >= brief.minFollowers && c.market === brief.market
    );

    const scored = eligible.map((creator) => {
      const score = this.scoreCreator(creator, brief);
      const creatorData = learningStore.creatorPerformance[creator.creatorId];
      const marketROI = learningStore.marketPerformance[brief.market]?.avgROI ?? 2.5;

      const predictedROI = creatorData
        ? creatorData.avgROI * 0.7 + marketROI * 0.3
        : marketROI;

      const predictedConversions = Math.round(
        (creator.followers * (creator.engagementRate / 100) * creator.avgConversions) / 100
      );

      const reasons: string[] = [];
      if (creator.onPlatform) reasons.push('Already on Gamefluence platform');
      if (creatorData && creatorData.count > 0)
        reasons.push(`${creatorData.count} past campaigns, avg ${creatorData.avgROI.toFixed(1)}x ROI`);
      if (creator.engagementRate > 7) reasons.push('High engagement rate');
      if (creator.audienceQuality > 85) reasons.push('Premium audience quality');
      if (creator.genres.includes(brief.genre)) reasons.push(`Specialises in ${brief.genre}`);

      const outreachPriority: CreatorRecommendation['outreachPriority'] = creator.onPlatform
        ? 'immediate'
        : creator.leadScore > 75
        ? 'high'
        : creator.leadScore > 50
        ? 'medium'
        : 'low';

      return {
        creator,
        score,
        reason: reasons,
        predictedROI,
        predictedConversions,
        outreachPriority,
        isOnPlatform: creator.onPlatform,
      };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, brief.creatorCount);
  }

  // Generate growth flywheel insights from learned data
  generateInsights(): LearningInsight[] {
    const insights: LearningInsight[] = [];

    // Market insights
    const markets = Object.entries(learningStore.marketPerformance).sort(
      (a, b) => b[1].avgROI - a[1].avgROI
    );
    if (markets.length > 0) {
      const [topMarket, topData] = markets[0];
      insights.push({
        type: 'market',
        insight: `${topMarket} is your highest-performing market at ${topData.avgROI.toFixed(1)}x avg ROI`,
        confidence: Math.min(0.95, 0.5 + topData.count * 0.04),
        actionable: `Prioritise ${topMarket} creators in next campaign brief`,
        dataPoints: topData.count,
      });
    }

    // Genre insights
    const genres = Object.entries(learningStore.genrePerformance).sort(
      (a, b) => b[1].avgROI - a[1].avgROI
    );
    if (genres.length > 0) {
      const [topGenre, topData] = genres[0];
      insights.push({
        type: 'genre',
        insight: `${topGenre} campaigns deliver ${topData.avgROI.toFixed(1)}x ROI on average`,
        confidence: Math.min(0.95, 0.5 + topData.count * 0.04),
        actionable: `Target ${topGenre} game clients for highest yield`,
        dataPoints: topData.count,
      });
    }

    // Tier insights
    const tiers = Object.entries(learningStore.tierPerformance).sort(
      (a, b) => b[1].avgROI - a[1].avgROI
    );
    if (tiers.length > 0) {
      const [topTier, topData] = tiers[0];
      insights.push({
        type: 'creator_tier',
        insight: `${topTier} tier creators average ${topData.avgROI.toFixed(1)}x ROI`,
        confidence: Math.min(0.95, 0.5 + topData.count * 0.03),
        actionable: `Prioritise ${topTier} tier in creator selection for premium campaigns`,
        dataPoints: topData.count,
      });
    }

    // Budget range insight
    const highROI = learningStore.outcomes.filter((o) => o.actualROI > 3);
    if (highROI.length > 2) {
      const avgBudget = highROI.reduce((s, o) => s + o.budget, 0) / highROI.length;
      insights.push({
        type: 'budget_range',
        insight: `Campaigns with ~$${Math.round(avgBudget / 1000)}K budget consistently hit 3x+ ROI`,
        confidence: 0.82,
        actionable: `Recommend $${Math.round(avgBudget * 0.8 / 1000)}K–$${Math.round(avgBudget * 1.2 / 1000)}K budget range to new clients`,
        dataPoints: highROI.length,
      });
    }

    return insights;
  }

  // Yield management: suggest pricing adjustments based on demand signals
  getYieldRecommendations(market: string): {
    suggestedPriceMultiplier: number;
    reason: string;
    demandSignal: 'high' | 'medium' | 'low';
  } {
    const marketData = learningStore.marketPerformance[market];
    if (!marketData) {
      return { suggestedPriceMultiplier: 1.0, reason: 'Insufficient data', demandSignal: 'medium' };
    }

    if (marketData.avgROI > 3.5 && marketData.count > 5) {
      return {
        suggestedPriceMultiplier: 1.2,
        reason: `${market} is outperforming — increase rates by 20%`,
        demandSignal: 'high',
      };
    }
    if (marketData.avgROI < 2.0) {
      return {
        suggestedPriceMultiplier: 0.85,
        reason: `${market} underperforming — reduce rates to drive volume`,
        demandSignal: 'low',
      };
    }
    return {
      suggestedPriceMultiplier: 1.0,
      reason: `${market} performing at target`,
      demandSignal: 'medium',
    };
  }

  getLearningStats() {
    return {
      totalOutcomes: learningStore.outcomes.length,
      marketsTracked: Object.keys(learningStore.marketPerformance).length,
      genresTracked: Object.keys(learningStore.genrePerformance).length,
      creatorsTracked: Object.keys(learningStore.creatorPerformance).length,
    };
  }
}

export const gamefluenceAI = AdvancedGamefluenceAI.getInstance();

// Seed Japan historical campaign outcomes for learning
[
  { campaignId: 'jp-hist-1', creatorId: 'jp-001', market: 'japan', genre: 'gacha', budget: 40000, actualReach: 1200000, actualEngagement: 96000, actualConversions: 8400, actualROI: 4.1, creatorScore: 92, timestamp: Date.now() - 86400000 * 30 },
  { campaignId: 'jp-hist-2', creatorId: 'jp-002', market: 'japan', genre: 'mobile_rpg', budget: 25000, actualReach: 680000, actualEngagement: 62000, actualConversions: 5100, actualROI: 3.6, creatorScore: 85, timestamp: Date.now() - 86400000 * 20 },
  { campaignId: 'jp-hist-3', creatorId: 'jp-004', market: 'japan', genre: 'strategy', budget: 30000, actualReach: 520000, actualEngagement: 69000, actualConversions: 6200, actualROI: 4.4, creatorScore: 94, timestamp: Date.now() - 86400000 * 15 },
  { campaignId: 'jp-hist-4', creatorId: 'jp-001', market: 'japan', genre: 'gacha', budget: 60000, actualReach: 1800000, actualEngagement: 140000, actualConversions: 12600, actualROI: 4.5, creatorScore: 96, timestamp: Date.now() - 86400000 * 10 },
  { campaignId: 'jp-hist-5', creatorId: 'jp-003', market: 'japan', genre: 'casual', budget: 20000, actualReach: 950000, actualEngagement: 109000, actualConversions: 7300, actualROI: 3.9, creatorScore: 88, timestamp: Date.now() - 86400000 * 5 },
  { campaignId: 'jp-hist-6', creatorId: 'jp-002', market: 'japan', genre: 'gacha', budget: 35000, actualReach: 720000, actualEngagement: 66000, actualConversions: 5800, actualROI: 4.0, creatorScore: 87, timestamp: Date.now() - 86400000 * 3 },
  { campaignId: 'jp-hist-7', creatorId: 'jp-004', market: 'japan', genre: 'mobile_rpg', budget: 28000, actualReach: 480000, actualEngagement: 64000, actualConversions: 5500, actualROI: 3.7, creatorScore: 86, timestamp: Date.now() - 86400000 },
].forEach(o => gamefluenceAI.recordOutcome(o));
