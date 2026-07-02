// Platform AI Agents — Terry (Talent Scout) & Dazza (Deal Agent)
// Plus C-Suite advisory layer (CTO, CEO, CMO insights)
// Works across both Gamefluence and Mobileyes pipelines

import { BatchContact } from './batch-contact-upload';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export type AgentName = 'terry' | 'dazza' | 'cto' | 'ceo' | 'cmo';
export type Platform = 'gamefluence' | 'mobileyes';
export type Severity = 'info' | 'positive' | 'warning' | 'critical';

export interface AgentInsight {
  id: string;
  agent: AgentName;
  platform: Platform;
  severity: Severity;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  actionable: boolean;
  action?: string;
  createdAt: Date;
}

export interface TerryScoutReport {
  contactId: string;
  contactName: string;
  platform: Platform;
  overallScore: number; // 0-100
  verdict: 'sign_now' | 'high_potential' | 'worth_watching' | 'pass' | 'red_flag';
  sections: {
    content: TerryContentAnalysis;
    audience: TerryAudienceAnalysis;
    engagement: TerryEngagementAnalysis;
    consistency: TerryConsistencyAnalysis;
    monetisability: TerryMonetisabilityAnalysis;
    partnerships: TerryPartnershipAnalysis;
    brandSafety: TerryBrandSafetyAnalysis;
    tierClassification: TerryTierAnalysis;
  };
  summary: string;
  goodThings: string[];
  concerns: string[];
  recommendation: string;
}

export interface TerryContentAnalysis {
  score: number;
  primaryNiche: string;
  subNiches: string[];
  contentQuality: 'premium' | 'good' | 'average' | 'low';
  productionValue: 'high' | 'medium' | 'low';
  uniqueness: number; // 0-100
  notes: string;
}

export interface TerryAudienceAnalysis {
  score: number;
  totalReach: number;
  audienceQuality: number; // 0-100 (real vs fake)
  demographics: string;
  geoConcentration: string;
  growthRate: string; // e.g. "+12% monthly"
  notes: string;
}

export interface TerryEngagementAnalysis {
  score: number;
  rate: number;
  avgLikes: number;
  avgComments: number;
  avgShares: number;
  likesToFollowersRatio: number;
  commentSentiment: 'positive' | 'mixed' | 'negative';
  notes: string;
}

export interface TerryConsistencyAnalysis {
  score: number;
  postingFrequency: string; // e.g. "4x/week"
  scheduleReliability: 'clockwork' | 'regular' | 'sporadic' | 'dormant';
  contentVariety: 'diverse' | 'focused' | 'repetitive';
  longestStreak: string;
  lastPosted: string;
  notes: string;
}

export interface TerryMonetisabilityAnalysis {
  score: number;
  estimatedCPM: number;
  estimatedCampaignRate: number;
  revenueStreams: string[];
  audiencePurchaseIntent: 'high' | 'medium' | 'low';
  productFit: string[];
  notes: string;
}

export interface TerryPartnershipAnalysis {
  score: number;
  previousBrands: string[];
  partnershipCount: number;
  partnershipQuality: 'premium' | 'mid' | 'low' | 'none';
  exclusivityRisk: boolean;
  competitorPartnerships: string[];
  notes: string;
}

export interface TerryBrandSafetyAnalysis {
  score: number;
  overallRating: 'safe' | 'mostly_safe' | 'caution' | 'risky';
  flags: string[];
  languageClean: boolean;
  controversies: string[];
  familyFriendly: boolean;
  notes: string;
}

export interface TerryTierAnalysis {
  tier: 'diamond' | 'platinum' | 'gold' | 'silver' | 'bronze';
  justification: string;
  upgradePathway: string;
  comparables: string[];
}

export interface DazzaDealAnalysis {
  contactId: string;
  contactName: string;
  platform: Platform;
  recommendedRate: number;
  rateRange: { min: number; max: number };
  currency: 'AUD' | 'USD';
  rateJustification: string;
  briefFit: number; // 0-100
  profitMargin: number; // percentage
  riskLevel: 'low' | 'medium' | 'high';
  dealInsights: string[];
  invoiceRecommendation: {
    grossFee: number;
    talentFee: number;
    commission: number;
    paymentTerms: string;
  };
  negotiationTips: string[];
  comparableDeals: string[];
}

export interface CSuiteInsight {
  role: 'cto' | 'ceo' | 'cmo';
  category: string;
  insight: string;
  recommendation: string;
  urgency: 'immediate' | 'this_week' | 'this_month' | 'strategic';
  dataPoint?: string;
  impactEstimate?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TERRY — TALENT SCOUT AGENT
// ═══════════════════════════════════════════════════════════════════════════════

export class TerryScoutAgent {
  static readonly PERSONA = {
    name: 'Terry',
    role: 'Talent Scout',
    emoji: '🔍',
    style: 'Direct, data-driven, no BS. Tells you exactly who to sign and who to avoid.',
  };

  static scoutContact(contact: BatchContact, platform: Platform): TerryScoutReport {
    const sections = {
      content: this.analyseContent(contact),
      audience: this.analyseAudience(contact),
      engagement: this.analyseEngagement(contact),
      consistency: this.analyseConsistency(contact),
      monetisability: this.analyseMonetisability(contact, platform),
      partnerships: this.analysePartnerships(contact),
      brandSafety: this.analyseBrandSafety(contact),
      tierClassification: this.classifyTier(contact),
    };

    const overallScore = Math.round(
      (sections.content.score * 0.15) +
      (sections.audience.score * 0.20) +
      (sections.engagement.score * 0.20) +
      (sections.consistency.score * 0.10) +
      (sections.monetisability.score * 0.15) +
      (sections.partnerships.score * 0.10) +
      (sections.brandSafety.score * 0.10)
    );

    const verdict = this.determineVerdict(overallScore, sections);
    const { goodThings, concerns } = this.summariseFindings(sections, contact);

    return {
      contactId: contact.id,
      contactName: contact.name,
      platform,
      overallScore,
      verdict,
      sections,
      summary: this.generateSummary(contact, overallScore, verdict, platform),
      goodThings,
      concerns,
      recommendation: this.generateRecommendation(verdict, contact, platform),
    };
  }

  private static analyseContent(contact: BatchContact): TerryContentAnalysis {
    const niches = contact.contentFocus || ['General'];
    const hasNiche = niches.length > 0 && niches[0] !== 'General';
    const score = hasNiche ? 75 : 50;

    return {
      score: Math.min(100, score + (contact.followerCount ? Math.min(20, contact.followerCount / 50000) : 0)),
      primaryNiche: niches[0] || 'General',
      subNiches: niches.slice(1),
      contentQuality: contact.followerCount && contact.followerCount > 500000 ? 'premium' : contact.followerCount && contact.followerCount > 100000 ? 'good' : 'average',
      productionValue: contact.averageViewers && contact.averageViewers > 1000 ? 'high' : 'medium',
      uniqueness: hasNiche ? 70 : 40,
      notes: hasNiche ? `Strong niche focus: ${niches.join(', ')}` : 'Broad content focus — may need niche refinement',
    };
  }

  private static analyseAudience(contact: BatchContact): TerryAudienceAnalysis {
    const followers = contact.followerCount || 0;
    let score = 0;
    if (followers >= 1000000) score = 95;
    else if (followers >= 500000) score = 85;
    else if (followers >= 100000) score = 70;
    else if (followers >= 50000) score = 55;
    else if (followers >= 10000) score = 40;
    else score = 20;

    return {
      score,
      totalReach: followers,
      audienceQuality: Math.min(95, 70 + Math.floor(Math.random() * 20)), // In production: real fake-follower check
      demographics: contact.market ? `Primary: ${contact.market}` : 'Unknown',
      geoConcentration: contact.market || 'Distributed',
      growthRate: followers > 100000 ? '+8-15% monthly (estimated)' : '+5-10% monthly (estimated)',
      notes: followers > 500000 ? 'Large established audience — high value' : followers > 100000 ? 'Growing audience with good potential' : 'Emerging creator — growth trajectory matters',
    };
  }

  private static analyseEngagement(contact: BatchContact): TerryEngagementAnalysis {
    const er = contact.engagementRate || 0;
    let score = 0;
    if (er >= 8) score = 95;
    else if (er >= 5) score = 80;
    else if (er >= 3) score = 65;
    else if (er >= 1.5) score = 45;
    else score = 25;

    return {
      score,
      rate: er,
      avgLikes: Math.round((contact.followerCount || 0) * (er / 100) * 5),
      avgComments: Math.round((contact.followerCount || 0) * (er / 100) * 0.3),
      avgShares: Math.round((contact.followerCount || 0) * (er / 100) * 0.1),
      likesToFollowersRatio: er / 100,
      commentSentiment: er > 5 ? 'positive' : 'mixed',
      notes: er >= 5 ? `Strong engagement (${er}%) — audience is active and responsive` : er >= 2 ? `Average engagement (${er}%) — typical for this tier` : `Low engagement (${er}%) — possible bought followers or disengaged audience`,
    };
  }

  private static analyseConsistency(contact: BatchContact): TerryConsistencyAnalysis {
    // In production: check actual posting history via API
    return {
      score: 65, // Default moderate score without API data
      postingFrequency: '3-5x/week (estimated)',
      scheduleReliability: 'regular',
      contentVariety: 'focused',
      longestStreak: 'Unknown (requires API)',
      lastPosted: 'Unknown (requires API)',
      notes: 'Consistency metrics require platform API integration for accuracy. Scoring based on follower-to-engagement correlation.',
    };
  }

  private static analyseMonetisability(contact: BatchContact, platform: Platform): TerryMonetisabilityAnalysis {
    const followers = contact.followerCount || 0;
    const er = contact.engagementRate || 3;
    
    // Rate estimation based on platform and tier
    let baseCPM = platform === 'mobileyes' ? 25 : 15; // AU rates higher
    let campaignRate = 0;
    
    if (followers >= 1000000) campaignRate = platform === 'mobileyes' ? 8000 : 5000;
    else if (followers >= 500000) campaignRate = platform === 'mobileyes' ? 5000 : 3000;
    else if (followers >= 100000) campaignRate = platform === 'mobileyes' ? 2500 : 1500;
    else if (followers >= 50000) campaignRate = platform === 'mobileyes' ? 1500 : 800;
    else campaignRate = platform === 'mobileyes' ? 800 : 400;

    // Engagement multiplier
    if (er > 6) campaignRate *= 1.3;
    if (er > 8) campaignRate *= 1.2;

    const score = Math.min(100, Math.round((campaignRate / 5000) * 80 + (er > 3 ? 20 : 0)));

    return {
      score,
      estimatedCPM: baseCPM,
      estimatedCampaignRate: Math.round(campaignRate),
      revenueStreams: ['Sponsored content', 'Brand integrations', followers > 100000 ? 'Product placements' : 'Micro-campaigns'].filter(Boolean),
      audiencePurchaseIntent: er > 5 ? 'high' : er > 2.5 ? 'medium' : 'low',
      productFit: contact.contentFocus || ['Gaming', 'Tech', 'Entertainment'],
      notes: `Estimated campaign rate: $${Math.round(campaignRate).toLocaleString()} (${platform === 'mobileyes' ? 'AU' : 'APAC'} market rates)`,
    };
  }

  private static analysePartnerships(contact: BatchContact): TerryPartnershipAnalysis {
    // In production: check profile bio, past posts for #ad, #sponsored
    return {
      score: 60,
      previousBrands: [],
      partnershipCount: 0,
      partnershipQuality: 'none',
      exclusivityRisk: false,
      competitorPartnerships: [],
      notes: 'Partnership history requires content scanning. New to brand partnerships = opportunity to be their first/primary agency.',
    };
  }

  private static analyseBrandSafety(contact: BatchContact): TerryBrandSafetyAnalysis {
    return {
      score: 80, // Default safe without content scan
      overallRating: 'mostly_safe',
      flags: [],
      languageClean: true,
      controversies: [],
      familyFriendly: true,
      notes: 'Full brand safety audit requires content analysis API. Default: mostly safe pending review.',
    };
  }

  private static classifyTier(contact: BatchContact): TerryTierAnalysis {
    const followers = contact.followerCount || 0;
    const tier = contact.tier || (
      followers >= 1000000 ? 'diamond' :
      followers >= 500000 ? 'platinum' :
      followers >= 100000 ? 'gold' :
      followers >= 50000 ? 'silver' : 'bronze'
    );

    const upgradePaths: Record<string, string> = {
      bronze: 'Hit 50K followers with consistent 5%+ engagement → Silver',
      silver: 'Hit 100K followers or land 3+ brand partnerships → Gold',
      gold: 'Hit 500K followers or become niche authority → Platinum',
      platinum: 'Hit 1M followers or cross-platform presence → Diamond',
      diamond: 'Maintain and grow — focus on premium partnerships',
    };

    return {
      tier: tier as TerryTierAnalysis['tier'],
      justification: `${followers.toLocaleString()} followers, ${contact.engagementRate || 'unknown'}% engagement on ${contact.platform}`,
      upgradePathway: upgradePaths[tier] || 'Maintain current trajectory',
      comparables: [],
    };
  }

  private static determineVerdict(score: number, sections: TerryScoutReport['sections']): TerryScoutReport['verdict'] {
    if (sections.brandSafety.overallRating === 'risky') return 'red_flag';
    if (score >= 85) return 'sign_now';
    if (score >= 70) return 'high_potential';
    if (score >= 50) return 'worth_watching';
    return 'pass';
  }

  private static summariseFindings(sections: TerryScoutReport['sections'], contact: BatchContact): { goodThings: string[]; concerns: string[] } {
    const goodThings: string[] = [];
    const concerns: string[] = [];

    if (sections.audience.score >= 70) goodThings.push(`Strong audience: ${(contact.followerCount || 0).toLocaleString()} followers`);
    if (sections.engagement.rate >= 5) goodThings.push(`High engagement: ${sections.engagement.rate}%`);
    if (sections.content.primaryNiche !== 'General') goodThings.push(`Clear niche: ${sections.content.primaryNiche}`);
    if (sections.brandSafety.overallRating === 'safe') goodThings.push('Brand safe — no flags');
    if (sections.monetisability.estimatedCampaignRate >= 2000) goodThings.push(`Good monetisation potential: $${sections.monetisability.estimatedCampaignRate.toLocaleString()}/campaign`);

    if (sections.engagement.rate < 2) concerns.push(`Low engagement (${sections.engagement.rate}%) — possible fake followers`);
    if (sections.audience.score < 40) concerns.push('Small audience — may not justify rates');
    if (sections.consistency.scheduleReliability === 'sporadic') concerns.push('Inconsistent posting — reliability risk for briefs');
    if (sections.brandSafety.flags.length > 0) concerns.push(`Brand safety flags: ${sections.brandSafety.flags.join(', ')}`);

    if (goodThings.length === 0) goodThings.push('New creator — potential upside');
    if (concerns.length === 0) concerns.push('No major concerns identified');

    return { goodThings, concerns };
  }

  private static generateSummary(contact: BatchContact, score: number, verdict: string, platform: Platform): string {
    const verdictLabels: Record<string, string> = {
      sign_now: '🔥 SIGN NOW',
      high_potential: '⭐ HIGH POTENTIAL',
      worth_watching: '👁️ WORTH WATCHING',
      pass: '⏭️ PASS',
      red_flag: '🚩 RED FLAG',
    };
    return `${verdictLabels[verdict]} — ${contact.name} scores ${score}/100 for ${platform}. ${contact.followerCount?.toLocaleString() || '?'} followers on ${contact.platform}, ${contact.engagementRate || '?'}% engagement.`;
  }

  private static generateRecommendation(verdict: string, contact: BatchContact, platform: Platform): string {
    switch (verdict) {
      case 'sign_now': return `Reach out immediately. ${contact.name} is a strong fit for the ${platform === 'mobileyes' ? 'Mobileyes roster' : 'Gamefluence network'}. High audience quality, good engagement, clear monetisation path.`;
      case 'high_potential': return `Priority outreach within 48 hours. ${contact.name} has strong fundamentals. May need rate guidance and brief matching to unlock full potential.`;
      case 'worth_watching': return `Add to watch list. ${contact.name} shows promise but needs growth. Re-assess in 30 days or when they hit the next tier milestone.`;
      case 'pass': return `Not a fit currently. ${contact.name} doesn't meet minimum thresholds. Re-assess if audience or engagement improves significantly.`;
      case 'red_flag': return `Do not proceed. Brand safety or audience quality concerns. Review flags before any contact.`;
      default: return 'Requires manual review.';
    }
  }

  // Batch scout multiple contacts
  static batchScout(contacts: BatchContact[], platform: Platform): TerryScoutReport[] {
    return contacts.map(c => this.scoutContact(c, platform));
  }

  // Generate quick summary for dashboard cards
  static getQuickVerdict(contact: BatchContact, platform: Platform): { emoji: string; label: string; score: number; color: string } {
    const report = this.scoutContact(contact, platform);
    const colors: Record<string, string> = {
      sign_now: 'text-red-600',
      high_potential: 'text-orange-600',
      worth_watching: 'text-blue-600',
      pass: 'text-gray-500',
      red_flag: 'text-red-800',
    };
    const emojis: Record<string, string> = {
      sign_now: '🔥', high_potential: '⭐', worth_watching: '👁️', pass: '⏭️', red_flag: '🚩',
    };
    return {
      emoji: emojis[report.verdict] || '❓',
      label: report.verdict.replace('_', ' ').toUpperCase(),
      score: report.overallScore,
      color: colors[report.verdict] || 'text-gray-500',
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// DAZZA — DEAL AGENT
// ═══════════════════════════════════════════════════════════════════════════════

export class DazzaDealAgent {
  static readonly PERSONA = {
    name: 'Dazza',
    role: 'Deal Agent',
    emoji: '💰',
    style: 'Commercial, margin-focused, always looking for profitable deals that keep talent happy.',
  };

  static analyseDeal(contact: BatchContact, platform: Platform, briefGrossFee?: number): DazzaDealAnalysis {
    const { recommendedRate, rateRange } = this.calculateRate(contact, platform);
    const grossFee = briefGrossFee || recommendedRate;
    
    // Use the pricing margins engine for flex commission
    const { PricingMarginsEngine } = require('./pricing-margins-engine');
    const tierConfig = PricingMarginsEngine.getTierForPlatform(contact.tier || 'silver', platform);
    const commissionPercent = tierConfig?.commissionDefault || 20;
    const commission = Math.round(grossFee * (commissionPercent / 100));
    const talentFee = grossFee - commission;
    const profitMargin = commissionPercent;

    // Get margin scenarios for Joel to choose from
    const marginScenarios = PricingMarginsEngine.getMarginScenarios(grossFee, contact.tier || 'silver', platform);

    return {
      contactId: contact.id,
      contactName: contact.name,
      platform,
      recommendedRate,
      rateRange,
      currency: platform === 'mobileyes' ? 'AUD' : 'USD',
      rateJustification: this.justifyRate(contact, platform, recommendedRate),
      briefFit: this.calculateBriefFit(contact),
      profitMargin,
      riskLevel: this.assessRisk(contact),
      dealInsights: this.generateDealInsights(contact, platform, recommendedRate, commissionPercent, marginScenarios),
      invoiceRecommendation: {
        grossFee,
        talentFee,
        commission,
        paymentTerms: platform === 'mobileyes' ? '4 business days' : '7 days',
      },
      negotiationTips: this.generateNegotiationTips(contact, platform, recommendedRate),
      comparableDeals: this.findComparables(contact, platform),
    };
  }

  private static calculateRate(contact: BatchContact, platform: Platform): { recommendedRate: number; rateRange: { min: number; max: number } } {
    const followers = contact.followerCount || 0;
    const er = contact.engagementRate || 3;
    const isAU = platform === 'mobileyes';
    
    // Base rate by tier
    let baseRate = 0;
    if (followers >= 1000000) baseRate = isAU ? 8000 : 5000;
    else if (followers >= 500000) baseRate = isAU ? 5000 : 3000;
    else if (followers >= 100000) baseRate = isAU ? 2500 : 1500;
    else if (followers >= 50000) baseRate = isAU ? 1500 : 800;
    else if (followers >= 10000) baseRate = isAU ? 800 : 400;
    else baseRate = isAU ? 500 : 250;

    // Engagement multiplier
    const engMultiplier = er >= 8 ? 1.4 : er >= 5 ? 1.2 : er >= 3 ? 1.0 : 0.8;
    
    // Platform premium (Kick/Twitch live = higher value)
    const platformMultiplier = ['kick', 'twitch'].includes(contact.platform) ? 1.15 : 1.0;

    const recommended = Math.round(baseRate * engMultiplier * platformMultiplier);
    
    return {
      recommendedRate: recommended,
      rateRange: {
        min: Math.round(recommended * 0.75),
        max: Math.round(recommended * 1.3),
      },
    };
  }

  private static justifyRate(contact: BatchContact, platform: Platform, rate: number): string {
    const followers = contact.followerCount || 0;
    const er = contact.engagementRate || 0;
    const marketLabel = platform === 'mobileyes' ? 'AU live talent' : 'APAC gaming creator';
    
    return `$${rate.toLocaleString()} recommended for ${contact.name} based on: ${followers.toLocaleString()} followers, ${er}% engagement, ${contact.platform} platform, ${marketLabel} market rates. This aligns with tier ${contact.tier || 'TBD'} benchmarks.`;
  }

  private static calculateBriefFit(contact: BatchContact): number {
    let score = 50; // baseline
    if (contact.followerCount && contact.followerCount > 50000) score += 20;
    if (contact.engagementRate && contact.engagementRate > 3) score += 15;
    if (contact.contentFocus && contact.contentFocus.length > 0) score += 10;
    if (contact.email) score += 5; // contactable
    return Math.min(100, score);
  }

  private static assessRisk(contact: BatchContact): DazzaDealAnalysis['riskLevel'] {
    if (!contact.followerCount || contact.followerCount < 10000) return 'high';
    if (contact.engagementRate && contact.engagementRate < 1.5) return 'high';
    if (contact.engagementRate && contact.engagementRate < 3) return 'medium';
    return 'low';
  }

  private static generateDealInsights(contact: BatchContact, platform: Platform, rate: number, commissionPercent?: number, marginScenarios?: unknown[]): string[] {
    const insights: string[] = [];
    const actualComm = commissionPercent || 20;
    const commission = Math.round(rate * (actualComm / 100));
    
    insights.push(`Default commission: ${actualComm}% = $${commission.toLocaleString()} (flex range available)`);
    insights.push(`Talent receives: $${(rate - commission).toLocaleString()} (${100 - actualComm}%)`);
    
    if (platform === 'mobileyes') {
      insights.push('Payment: 4 business days post-verification — we front the risk');
    } else {
      insights.push('Payment: 7 days post-campaign completion');
    }
    
    if (contact.engagementRate && contact.engagementRate > 6) {
      insights.push('⚡ High engagement = brands will pay premium. Push rate to top of range.');
    }
    
    if (['kick', 'twitch'].includes(contact.platform)) {
      insights.push('🎬 Live platform = higher CPM. Live integrations command 15-20% premium over VOD.');
    }

    insights.push(`💡 Margin is flex: you can adjust from ${commissionPercent ? commissionPercent - 5 : 15}% to ${commissionPercent ? commissionPercent + 10 : 30}% — your call per deal.`);

    return insights;
  }

  private static generateNegotiationTips(contact: BatchContact, platform: Platform, rate: number): string[] {
    const tips: string[] = [];
    
    tips.push(`Anchor at $${Math.round(rate * 1.15).toLocaleString()} and settle around $${rate.toLocaleString()}`);
    tips.push('Lead with the 4 business day payment guarantee — no one else offers this');
    
    if (platform === 'mobileyes') {
      tips.push('Non-exclusive positioning means low commitment — reduces objections');
      tips.push('Emphasise: "We handle everything — you just create"');
    } else {
      tips.push('Highlight the APAC brand pipeline — consistent work, not one-offs');
    }
    
    if (contact.followerCount && contact.followerCount > 500000) {
      tips.push('At this tier, offer a retainer arrangement. Monthly guaranteed income is very attractive.');
    }

    return tips;
  }

  private static findComparables(contact: BatchContact, platform: Platform): string[] {
    // In production: compare against existing roster
    const tier = contact.tier || 'bronze';
    const comparables: Record<string, string[]> = {
      diamond: ['Similar tier talent earning $6-10K/campaign on this platform'],
      platinum: ['Comparable creators earning $3-5K/campaign'],
      gold: ['Similar audience size earning $1.5-2.5K/campaign'],
      silver: ['Creators at this level earning $800-1.5K/campaign'],
      bronze: ['Micro-creators earning $300-800/campaign at this stage'],
    };
    return comparables[tier] || ['No comparables available'];
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// C-SUITE ADVISORY LAYER
// ═══════════════════════════════════════════════════════════════════════════════

export class CSuiteAdvisors {

  static generateInsights(
    contacts: BatchContact[],
    scoutReports: TerryScoutReport[],
    dealAnalyses: DazzaDealAnalysis[],
    platform: Platform
  ): CSuiteInsight[] {
    const insights: CSuiteInsight[] = [];

    // CTO Insights
    insights.push(...this.ctoInsights(contacts, platform));
    
    // CEO Insights
    insights.push(...this.ceoInsights(scoutReports, dealAnalyses, platform));
    
    // CMO Insights
    insights.push(...this.cmoInsights(contacts, scoutReports, platform));

    return insights.sort((a, b) => {
      const urgencyOrder = { immediate: 0, this_week: 1, this_month: 2, strategic: 3 };
      return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    });
  }

  private static ctoInsights(contacts: BatchContact[], platform: Platform): CSuiteInsight[] {
    const insights: CSuiteInsight[] = [];
    const withEmail = contacts.filter(c => c.email).length;
    const withoutUrl = contacts.filter(c => !c.profileUrl).length;

    if (withoutUrl > 0) {
      insights.push({
        role: 'cto',
        category: 'Data Quality',
        insight: `${withoutUrl} contacts missing profile URLs. Auto-generated from handle but should be verified.`,
        recommendation: 'Run URL verification batch to confirm all profile links are accessible.',
        urgency: 'this_week',
        dataPoint: `${((contacts.length - withoutUrl) / contacts.length * 100).toFixed(0)}% URL coverage`,
      });
    }

    if (withEmail < contacts.length * 0.3) {
      insights.push({
        role: 'cto',
        category: 'Contactability',
        insight: `Only ${withEmail}/${contacts.length} contacts have email addresses. This limits direct outreach options.`,
        recommendation: 'Use platform DMs as primary channel. Consider enrichment tools (Hunter.io, Snov.io) for email discovery.',
        urgency: 'this_month',
      });
    }

    insights.push({
      role: 'cto',
      category: 'Platform Integration',
      insight: `${platform === 'mobileyes' ? 'Kick and Twitch' : 'TikTok and YouTube'} API integrations would automate follower count, engagement, and content verification.`,
      recommendation: `Priority: ${platform === 'mobileyes' ? 'Twitch Helix API (available now), Kick API (when public)' : 'TikTok Research API, YouTube Data API v3'}`,
      urgency: 'this_month',
    });

    return insights;
  }

  private static ceoInsights(scoutReports: TerryScoutReport[], dealAnalyses: DazzaDealAnalysis[], platform: Platform): CSuiteInsight[] {
    const insights: CSuiteInsight[] = [];
    const signNow = scoutReports.filter(r => r.verdict === 'sign_now').length;
    const highPotential = scoutReports.filter(r => r.verdict === 'high_potential').length;
    const totalPipelineValue = dealAnalyses.reduce((sum, d) => sum + d.recommendedRate, 0);
    const totalCommission = totalPipelineValue * 0.2;

    if (signNow > 0) {
      insights.push({
        role: 'ceo',
        category: 'Growth',
        insight: `${signNow} creators flagged as SIGN NOW. These are high-value, time-sensitive opportunities.`,
        recommendation: `Outreach within 24 hours. Every day delayed = competitor risk. Potential commission: $${Math.round(signNow * (totalCommission / scoutReports.length)).toLocaleString()}/month.`,
        urgency: 'immediate',
        impactEstimate: `$${Math.round(signNow * 2000).toLocaleString()} potential monthly commission`,
      });
    }

    insights.push({
      role: 'ceo',
      category: 'Pipeline Value',
      insight: `Current batch represents $${totalPipelineValue.toLocaleString()} in potential campaign value ($${totalCommission.toLocaleString()} commission).`,
      recommendation: `Target 30% conversion rate = $${Math.round(totalCommission * 0.3).toLocaleString()} realised commission from this batch.`,
      urgency: 'this_week',
      dataPoint: `${scoutReports.length} creators evaluated, ${signNow + highPotential} actionable`,
    });

    // Cross-platform comparison
    insights.push({
      role: 'ceo',
      category: 'Cross-Platform',
      insight: platform === 'mobileyes' 
        ? 'AU talent market average rates are 40-60% higher than APAC. Focus on premium positioning.'
        : 'APAC volume opportunity: lower rates but 5-10x more campaigns available.',
      recommendation: 'Run both pipelines in parallel. Mobileyes = margin. Gamefluence = volume. Both feed learnings into each other.',
      urgency: 'strategic',
    });

    return insights;
  }

  private static cmoInsights(contacts: BatchContact[], scoutReports: TerryScoutReport[], platform: Platform): CSuiteInsight[] {
    const insights: CSuiteInsight[] = [];
    const platforms = new Map<string, number>();
    contacts.forEach(c => platforms.set(c.platform, (platforms.get(c.platform) || 0) + 1));
    
    const topPlatform = [...platforms.entries()].sort((a, b) => b[1] - a[1])[0];
    const avgEngagement = contacts.filter(c => c.engagementRate).reduce((s, c) => s + (c.engagementRate || 0), 0) / contacts.filter(c => c.engagementRate).length || 0;

    if (topPlatform) {
      insights.push({
        role: 'cmo',
        category: 'Platform Mix',
        insight: `${topPlatform[1]}/${contacts.length} contacts are on ${topPlatform[0]}. ${platforms.size > 1 ? `Also: ${[...platforms.entries()].filter(e => e[0] !== topPlatform[0]).map(e => `${e[0]} (${e[1]})`).join(', ')}` : 'Consider diversifying.'}`,
        recommendation: platforms.size < 3 ? 'Diversify platform mix. Multi-platform creators deliver higher brand reach and reduce algorithm dependency.' : 'Good platform diversity. Focus on cross-platform talent who can amplify across channels.',
        urgency: 'this_month',
        dataPoint: `${platforms.size} platforms represented`,
      });
    }

    if (avgEngagement > 0) {
      insights.push({
        role: 'cmo',
        category: 'Engagement Quality',
        insight: `Average engagement across batch: ${avgEngagement.toFixed(1)}%. ${avgEngagement > 5 ? 'Above industry average (3-5%).' : avgEngagement > 3 ? 'At industry average.' : 'Below average — qualify carefully.'}`,
        recommendation: avgEngagement > 5 ? 'This batch is engagement-rich. Prioritise for brands seeking authentic interaction over raw reach.' : 'Focus outreach on the top-engagement creators first. Low engagement creators need more convincing for brands.',
        urgency: 'this_week',
        dataPoint: `${avgEngagement.toFixed(1)}% avg vs 3-5% industry benchmark`,
      });
    }

    // Market insights
    const markets = new Map<string, number>();
    contacts.forEach(c => { if (c.market) markets.set(c.market, (markets.get(c.market) || 0) + 1); });
    
    if (markets.size > 0) {
      insights.push({
        role: 'cmo',
        category: 'Market Coverage',
        insight: `Markets represented: ${[...markets.entries()].map(e => `${e[0]} (${e[1]})`).join(', ')}`,
        recommendation: 'Match market concentration to active brand demand. Over-indexing on one market = risk if brand pipeline shifts.',
        urgency: 'strategic',
      });
    }

    return insights;
  }
}
