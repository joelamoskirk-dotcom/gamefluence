// Batch Campaign Engine
// Wires together: brief → AI creator selection → payment → outreach queue

import { gamefluenceAI, CampaignBrief, CreatorSignal, CreatorRecommendation } from './advanced-gamefluence-ai-engine';
import { createCustomer, createProduct, simulatePayment, formatAmountForStripe } from './stripe-mcp';

export interface BatchCampaignOrder {
  id: string;
  status: 'pending' | 'paid' | 'selecting' | 'outreach' | 'active' | 'complete';
  brief: CampaignBrief;
  customerName: string;
  customerEmail: string;
  totalCost: number;
  stripeCustomerId?: string;
  stripePaymentId?: string;
  selectedCreators: CreatorRecommendation[];
  outreachQueue: OutreachTask[];
  createdAt: number;
  paidAt?: number;
}

export interface OutreachTask {
  creatorId: string;
  creatorName: string;
  platform: string;
  isOnPlatform: boolean;
  priority: 'immediate' | 'high' | 'medium' | 'low';
  status: 'queued' | 'contacted' | 'responded' | 'confirmed' | 'declined';
  outreachMessage?: string;
  contactedAt?: number;
}

// Mock creator pool — in production this comes from DB
export const CREATOR_POOL: CreatorSignal[] = [
  {
    creatorId: 'vn-001', platform: 'YouTube', followers: 890000,
    engagementRate: 8.7, avgConversions: 4.2, market: 'vietnam',
    genres: ['mobile_rpg', 'battle_royale'], brandSafetyScore: 94,
    audienceQuality: 88, pastCampaignROI: [3.1, 3.8, 2.9],
    onPlatform: true, leadScore: 95, tier: 'platinum',
  },
  {
    creatorId: 'vn-002', platform: 'TikTok', followers: 1200000,
    engagementRate: 12.4, avgConversions: 5.1, market: 'vietnam',
    genres: ['casual', 'mobile_rpg'], brandSafetyScore: 91,
    audienceQuality: 85, pastCampaignROI: [4.2, 3.6],
    onPlatform: true, leadScore: 98, tier: 'diamond',
  },
  {
    creatorId: 'th-001', platform: 'YouTube', followers: 650000,
    engagementRate: 7.2, avgConversions: 3.8, market: 'thailand',
    genres: ['mobile_rpg', 'strategy'], brandSafetyScore: 89,
    audienceQuality: 82, pastCampaignROI: [2.8, 3.2],
    onPlatform: true, leadScore: 88, tier: 'gold',
  },
  {
    creatorId: 'th-002', platform: 'TikTok', followers: 420000,
    engagementRate: 9.8, avgConversions: 4.5, market: 'thailand',
    genres: ['casual', 'battle_royale'], brandSafetyScore: 87,
    audienceQuality: 80, pastCampaignROI: [],
    onPlatform: false, leadScore: 72, tier: 'gold',
  },
  {
    creatorId: 'id-001', platform: 'YouTube', followers: 1100000,
    engagementRate: 6.9, avgConversions: 3.2, market: 'indonesia',
    genres: ['mobile_rpg', 'racing'], brandSafetyScore: 92,
    audienceQuality: 90, pastCampaignROI: [3.5, 4.1, 3.8],
    onPlatform: true, leadScore: 96, tier: 'platinum',
  },
  {
    creatorId: 'id-002', platform: 'TikTok', followers: 780000,
    engagementRate: 11.2, avgConversions: 4.8, market: 'indonesia',
    genres: ['casual', 'mobile_rpg'], brandSafetyScore: 88,
    audienceQuality: 83, pastCampaignROI: [3.2],
    onPlatform: false, leadScore: 65, tier: 'platinum',
  },
  {
    creatorId: 'vn-003', platform: 'Twitch', followers: 320000,
    engagementRate: 14.1, avgConversions: 6.2, market: 'vietnam',
    genres: ['battle_royale', 'strategy'], brandSafetyScore: 96,
    audienceQuality: 92, pastCampaignROI: [],
    onPlatform: false, leadScore: 58, tier: 'gold',
  },
  {
    creatorId: 'ph-001', platform: 'YouTube', followers: 540000,
    engagementRate: 8.1, avgConversions: 3.6, market: 'philippines',
    genres: ['mobile_rpg', 'casual'], brandSafetyScore: 90,
    audienceQuality: 84, pastCampaignROI: [2.4, 2.8],
    onPlatform: true, leadScore: 82, tier: 'gold',
  },
];

function generateOutreachMessage(creator: CreatorSignal, brief: CampaignBrief): string {
  const marketNames: Record<string, string> = {
    vietnam: 'Vietnam', thailand: 'Thailand',
    indonesia: 'Indonesia', philippines: 'Philippines',
  };
  const market = marketNames[brief.market] ?? brief.market;

  if (creator.onPlatform) {
    return `Hi! We have a new ${brief.genre} campaign brief for ${market} that matches your profile perfectly. Budget: $${brief.budget.toLocaleString()}. Interested?`;
  }
  return `Hey! We're Gamefluence — we connect gaming creators with paid brand campaigns in ${market}. Your ${brief.genre} content is a great fit for an upcoming campaign. Quick 2-min signup: https://gamefluence.ai/creator-signup`;
}

export async function processBatchCampaignOrder(
  brief: CampaignBrief,
  customerName: string,
  customerEmail: string
): Promise<BatchCampaignOrder> {
  const orderId = `order_${Date.now()}`;

  const order: BatchCampaignOrder = {
    id: orderId,
    status: 'pending',
    brief,
    customerName,
    customerEmail,
    totalCost: brief.budget,
    selectedCreators: [],
    outreachQueue: [],
    createdAt: Date.now(),
  };

  // Step 1: Take payment via MCP
  order.status = 'pending';
  const customer = await createCustomer(customerName, customerEmail);
  order.stripeCustomerId = customer.id;

  const product = await createProduct(
    `Batch Campaign — ${brief.genre} in ${brief.market}`,
    `${brief.creatorCount} creators, $${brief.budget.toLocaleString()} budget`
  );

  const payment = await simulatePayment(customer.id, formatAmountForStripe(brief.budget));
  order.stripePaymentId = payment.id;
  order.paidAt = Date.now();
  order.status = 'paid';

  // Step 2: AI selects best creators from pool
  order.status = 'selecting';
  const recommendations = gamefluenceAI.selectCreatorsForBrief(CREATOR_POOL, brief);
  order.selectedCreators = recommendations;

  // Step 3: Build outreach queue
  order.status = 'outreach';
  order.outreachQueue = recommendations.map((rec) => ({
    creatorId: rec.creator.creatorId,
    creatorName: rec.creator.creatorId, // in prod: lookup display name
    platform: rec.creator.platform,
    isOnPlatform: rec.creator.onPlatform,
    priority: rec.outreachPriority,
    status: rec.creator.onPlatform ? 'queued' : 'queued',
    outreachMessage: generateOutreachMessage(rec.creator, brief),
  }));

  order.status = 'active';
  return order;
}

export function getGrowthInsights() {
  return {
    insights: gamefluenceAI.generateInsights(),
    stats: gamefluenceAI.getLearningStats(),
    yieldByMarket: ['vietnam', 'thailand', 'indonesia', 'philippines'].map((m) => ({
      market: m,
      ...gamefluenceAI.getYieldRecommendations(m),
    })),
  };
}
