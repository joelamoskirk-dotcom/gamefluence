// Pricing & Margins Engine — Founder-Controlled Flex Pricing
// The tiers are guidelines. Joel has final say. This engine provides the ranges
// and lets you override per-deal while tracking actual margins for learning.

// ═══════════════════════════════════════════════════════════════════════════════
// CORE PRINCIPLE: Agents RECOMMEND. Joel DECIDES. System TRACKS & LEARNS.
// ═══════════════════════════════════════════════════════════════════════════════

export type PricingPlatform = 'gamefluence' | 'mobileyes';

export interface TierPricingConfig {
  tier: string;
  platform: PricingPlatform;
  // Rate ranges (what we quote the brand)
  brandRateMin: number;
  brandRateMax: number;
  brandRateTypical: number;
  // Commission flex
  commissionMin: number; // percentage — floor (e.g. 15%)
  commissionMax: number; // percentage — ceiling (e.g. 30%)
  commissionDefault: number; // standard (e.g. 20%)
  // What talent sees
  talentRateNote: string; // e.g. "Talent receives 80% of agreed fee"
  currency: 'AUD' | 'USD';
}

export interface DealPricing {
  id: string;
  platform: PricingPlatform;
  talentName: string;
  brandName: string;
  tier: string;
  
  // What the brand pays
  brandFee: number;
  
  // Your commission (flex)
  commissionPercent: number; // The actual % you're taking on this deal
  commissionAmount: number;
  
  // What talent receives
  talentFee: number;
  talentPercent: number; // What % the talent gets
  
  // Margin analysis
  effectiveMargin: number; // Same as commissionPercent but calculated
  isAboveFloor: boolean;
  isBelowCeiling: boolean;
  marginVsDefault: number; // +/- from the 20% default
  
  // Context
  rationale?: string; // Joel's note on why this rate was chosen
  overrideApplied: boolean; // Did Joel override Dazza's recommendation?
  dazzaRecommended?: number; // What Dazza suggested
  
  // Metadata
  createdAt: Date;
  status: 'draft' | 'quoted' | 'accepted' | 'invoiced' | 'paid';
}

export interface MarginOverride {
  type: 'fixed_commission' | 'fixed_talent_rate' | 'fixed_brand_rate' | 'custom_split';
  value: number; // Either the commission %, the talent rate, or the brand rate
  reason: string;
}

export interface ProfitabilityReport {
  platform: PricingPlatform;
  period: string;
  totalRevenue: number; // Total brand fees
  totalCommission: number;
  totalTalentPayout: number;
  averageMargin: number; // Average commission %
  dealCount: number;
  marginDistribution: {
    below15: number;
    between15and20: number;
    at20: number;
    between20and25: number;
    above25: number;
  };
  bestMarginDeal: { name: string; margin: number };
  worstMarginDeal: { name: string; margin: number };
  recommendations: string[];
}

export class PricingMarginsEngine {

  // ═══════════════════════════════════════════════════════════════════════════
  // TIER RATE CARDS — Your pricing Bible (flex built in)
  // ═══════════════════════════════════════════════════════════════════════════

  static getTierConfig(): TierPricingConfig[] {
    return [
      // MOBILEYES — AU Live Talent (higher rates, premium market)
      { tier: 'diamond', platform: 'mobileyes', brandRateMin: 6000, brandRateMax: 15000, brandRateTypical: 8000, commissionMin: 15, commissionMax: 25, commissionDefault: 20, talentRateNote: 'Talent receives 75-85% depending on deal structure', currency: 'AUD' },
      { tier: 'platinum', platform: 'mobileyes', brandRateMin: 3500, brandRateMax: 7000, brandRateTypical: 5000, commissionMin: 15, commissionMax: 25, commissionDefault: 20, talentRateNote: 'Talent receives 75-85%', currency: 'AUD' },
      { tier: 'gold', platform: 'mobileyes', brandRateMin: 1800, brandRateMax: 4000, brandRateTypical: 2500, commissionMin: 18, commissionMax: 28, commissionDefault: 20, talentRateNote: 'Talent receives 72-82%', currency: 'AUD' },
      { tier: 'silver', platform: 'mobileyes', brandRateMin: 800, brandRateMax: 2000, brandRateTypical: 1500, commissionMin: 18, commissionMax: 30, commissionDefault: 20, talentRateNote: 'Talent receives 70-82%', currency: 'AUD' },
      { tier: 'bronze', platform: 'mobileyes', brandRateMin: 400, brandRateMax: 1000, brandRateTypical: 700, commissionMin: 20, commissionMax: 35, commissionDefault: 25, talentRateNote: 'Talent receives 65-80%', currency: 'AUD' },

      // GAMEFLUENCE — APAC Gaming (volume market, lower rates, higher volume)
      { tier: 'diamond', platform: 'gamefluence', brandRateMin: 4000, brandRateMax: 12000, brandRateTypical: 6000, commissionMin: 15, commissionMax: 25, commissionDefault: 20, talentRateNote: 'Creator receives 75-85%', currency: 'USD' },
      { tier: 'platinum', platform: 'gamefluence', brandRateMin: 2000, brandRateMax: 5000, brandRateTypical: 3000, commissionMin: 18, commissionMax: 25, commissionDefault: 20, talentRateNote: 'Creator receives 75-82%', currency: 'USD' },
      { tier: 'gold', platform: 'gamefluence', brandRateMin: 1000, brandRateMax: 2500, brandRateTypical: 1500, commissionMin: 18, commissionMax: 28, commissionDefault: 20, talentRateNote: 'Creator receives 72-82%', currency: 'USD' },
      { tier: 'silver', platform: 'gamefluence', brandRateMin: 500, brandRateMax: 1200, brandRateTypical: 800, commissionMin: 20, commissionMax: 30, commissionDefault: 20, talentRateNote: 'Creator receives 70-80%', currency: 'USD' },
      { tier: 'bronze', platform: 'gamefluence', brandRateMin: 200, brandRateMax: 600, brandRateTypical: 400, commissionMin: 20, commissionMax: 35, commissionDefault: 25, talentRateNote: 'Creator receives 65-80%', currency: 'USD' },
    ];
  }

  static getTierForPlatform(tier: string, platform: PricingPlatform): TierPricingConfig | undefined {
    return this.getTierConfig().find(t => t.tier === tier && t.platform === platform);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // DEAL PRICING — Build a deal with flex margin
  // ═══════════════════════════════════════════════════════════════════════════

  static priceDeal(params: {
    platform: PricingPlatform;
    talentName: string;
    brandName: string;
    tier: string;
    brandFee: number;
    override?: MarginOverride;
    dazzaRecommended?: number;
    rationale?: string;
  }): DealPricing {
    const tierConfig = this.getTierForPlatform(params.tier, params.platform);
    let commissionPercent = tierConfig?.commissionDefault || 20;
    let brandFee = params.brandFee;
    let overrideApplied = false;

    // Apply overrides
    if (params.override) {
      overrideApplied = true;
      switch (params.override.type) {
        case 'fixed_commission':
          commissionPercent = params.override.value;
          break;
        case 'fixed_talent_rate':
          // Work backwards from talent rate to find commission
          const talentRate = params.override.value;
          commissionPercent = ((brandFee - talentRate) / brandFee) * 100;
          break;
        case 'fixed_brand_rate':
          brandFee = params.override.value;
          break;
        case 'custom_split':
          commissionPercent = params.override.value;
          break;
      }
    }

    // Clamp commission to floor/ceiling
    const floor = tierConfig?.commissionMin || 15;
    const ceiling = tierConfig?.commissionMax || 35;
    commissionPercent = Math.max(floor, Math.min(ceiling, commissionPercent));

    const commissionAmount = Math.round(brandFee * (commissionPercent / 100));
    const talentFee = brandFee - commissionAmount;
    const talentPercent = 100 - commissionPercent;

    return {
      id: `deal_${Date.now()}`,
      platform: params.platform,
      talentName: params.talentName,
      brandName: params.brandName,
      tier: params.tier,
      brandFee,
      commissionPercent,
      commissionAmount,
      talentFee,
      talentPercent,
      effectiveMargin: commissionPercent,
      isAboveFloor: commissionPercent > floor,
      isBelowCeiling: commissionPercent < ceiling,
      marginVsDefault: commissionPercent - (tierConfig?.commissionDefault || 20),
      rationale: params.rationale,
      overrideApplied,
      dazzaRecommended: params.dazzaRecommended,
      createdAt: new Date(),
      status: 'draft',
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MARGIN SCENARIOS — Show Joel the options before he decides
  // ═══════════════════════════════════════════════════════════════════════════

  static getMarginScenarios(brandFee: number, tier: string, platform: PricingPlatform): Array<{
    label: string;
    commissionPercent: number;
    commissionAmount: number;
    talentFee: number;
    isDefault: boolean;
    note: string;
  }> {
    const tierConfig = this.getTierForPlatform(tier, platform);
    const defaultComm = tierConfig?.commissionDefault || 20;
    const floor = tierConfig?.commissionMin || 15;
    const ceiling = tierConfig?.commissionMax || 35;

    const scenarios = [
      { percent: floor, label: 'Minimum (talent-friendly)', note: 'Use for high-value talent you want to lock in' },
      { percent: defaultComm - 2, label: 'Slightly below standard', note: 'Sweetener without significant margin hit' },
      { percent: defaultComm, label: 'Standard', note: 'Default commission — fair for both sides' },
      { percent: defaultComm + 3, label: 'Above standard', note: 'Use for high-effort briefs or new talent' },
      { percent: defaultComm + 5, label: 'Premium margin', note: 'High-effort deal, complex brief, or agency pipeline' },
      { percent: ceiling, label: 'Maximum', note: 'Only for high-service deals where you manage everything' },
    ];

    return scenarios
      .filter(s => s.percent >= floor && s.percent <= ceiling)
      .map(s => ({
        label: s.label,
        commissionPercent: s.percent,
        commissionAmount: Math.round(brandFee * (s.percent / 100)),
        talentFee: brandFee - Math.round(brandFee * (s.percent / 100)),
        isDefault: s.percent === defaultComm,
        note: s.note,
      }));
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PROFITABILITY TRACKING — Learn from actual deal performance
  // ═══════════════════════════════════════════════════════════════════════════

  static calculateProfitability(deals: DealPricing[], platform: PricingPlatform): ProfitabilityReport {
    const platformDeals = deals.filter(d => d.platform === platform);
    const paidDeals = platformDeals.filter(d => d.status === 'paid' || d.status === 'invoiced');

    const totalRevenue = paidDeals.reduce((s, d) => s + d.brandFee, 0);
    const totalCommission = paidDeals.reduce((s, d) => s + d.commissionAmount, 0);
    const totalTalentPayout = paidDeals.reduce((s, d) => s + d.talentFee, 0);
    const averageMargin = paidDeals.length > 0 
      ? paidDeals.reduce((s, d) => s + d.commissionPercent, 0) / paidDeals.length 
      : 0;

    const marginDistribution = {
      below15: paidDeals.filter(d => d.commissionPercent < 15).length,
      between15and20: paidDeals.filter(d => d.commissionPercent >= 15 && d.commissionPercent < 20).length,
      at20: paidDeals.filter(d => d.commissionPercent === 20).length,
      between20and25: paidDeals.filter(d => d.commissionPercent > 20 && d.commissionPercent <= 25).length,
      above25: paidDeals.filter(d => d.commissionPercent > 25).length,
    };

    const sorted = [...paidDeals].sort((a, b) => b.commissionPercent - a.commissionPercent);
    const best = sorted[0];
    const worst = sorted[sorted.length - 1];

    const recommendations: string[] = [];
    if (averageMargin < 18) recommendations.push('Average margin below 18% — push rates up or reduce below-standard deals');
    if (averageMargin > 25) recommendations.push('High average margin (>25%) — sustainable but watch for talent churn');
    if (marginDistribution.below15 > 0) recommendations.push(`${marginDistribution.below15} deals below floor — review if these are justified loss-leaders`);
    if (totalRevenue > 0 && totalCommission / totalRevenue < 0.18) recommendations.push('Revenue-to-commission ratio weak — consider repricing lowest-margin tiers');

    return {
      platform,
      period: 'All time',
      totalRevenue,
      totalCommission,
      totalTalentPayout,
      averageMargin,
      dealCount: paidDeals.length,
      marginDistribution,
      bestMarginDeal: best ? { name: `${best.talentName} × ${best.brandName}`, margin: best.commissionPercent } : { name: 'N/A', margin: 0 },
      worstMarginDeal: worst ? { name: `${worst.talentName} × ${worst.brandName}`, margin: worst.commissionPercent } : { name: 'N/A', margin: 0 },
      recommendations,
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CROSS-PLATFORM COMPARISON — Are we pricing right?
  // ═══════════════════════════════════════════════════════════════════════════

  static comparePlatformPricing(): {
    mobileyes: { avgRate: number; avgMargin: number; currency: string };
    gamefluence: { avgRate: number; avgMargin: number; currency: string };
    insight: string;
  } {
    const mbConfig = this.getTierConfig().filter(t => t.platform === 'mobileyes');
    const gfConfig = this.getTierConfig().filter(t => t.platform === 'gamefluence');

    const mbAvgRate = mbConfig.reduce((s, t) => s + t.brandRateTypical, 0) / mbConfig.length;
    const gfAvgRate = gfConfig.reduce((s, t) => s + t.brandRateTypical, 0) / gfConfig.length;
    const mbAvgMargin = mbConfig.reduce((s, t) => s + t.commissionDefault, 0) / mbConfig.length;
    const gfAvgMargin = gfConfig.reduce((s, t) => s + t.commissionDefault, 0) / gfConfig.length;

    return {
      mobileyes: { avgRate: Math.round(mbAvgRate), avgMargin: mbAvgMargin, currency: 'AUD' },
      gamefluence: { avgRate: Math.round(gfAvgRate), avgMargin: gfAvgMargin, currency: 'USD' },
      insight: `Mobileyes averages $${Math.round(mbAvgRate)} AUD/deal at ${mbAvgMargin}% margin. Gamefluence averages $${Math.round(gfAvgRate)} USD/deal at ${gfAvgMargin}% margin. Mobileyes = premium margin play. Gamefluence = volume play.`,
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // WHEN TO USE WHICH MARGIN — Dazza's decision framework for Joel
  // ═══════════════════════════════════════════════════════════════════════════

  static getMarginGuidance(context: {
    isNewTalent: boolean;
    isRepeatBrand: boolean;
    isHighEffort: boolean;
    isFabulatePipeline: boolean;
    isExclusivityDeal: boolean;
    tierLevel: string;
  }): { suggestedPercent: number; reasoning: string } {
    let percent = 20; // default
    const reasons: string[] = [];

    // Adjustments
    if (context.isNewTalent) { percent -= 2; reasons.push('-2% for new talent (incentivise first deal)'); }
    if (context.isRepeatBrand) { percent += 2; reasons.push('+2% for repeat brand (proven pipeline)'); }
    if (context.isHighEffort) { percent += 3; reasons.push('+3% for high-effort brief management'); }
    if (context.isFabulatePipeline) { percent -= 1; reasons.push('-1% for Fabulate pipeline (lower acquisition cost)'); }
    if (context.isExclusivityDeal) { percent += 5; reasons.push('+5% for exclusivity management'); }
    if (context.tierLevel === 'bronze') { percent += 3; reasons.push('+3% for bronze tier (higher service ratio)'); }
    if (context.tierLevel === 'diamond') { percent -= 2; reasons.push('-2% for diamond tier (retain high-value talent)'); }

    return {
      suggestedPercent: Math.max(15, Math.min(35, percent)),
      reasoning: `Base 20% ${reasons.length > 0 ? '→ ' + reasons.join(', ') : '(no adjustments)'} = ${Math.max(15, Math.min(35, percent))}%`,
    };
  }
}
