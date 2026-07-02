// ROI Projection Engine — Models campaign return for collabs
// Feeds into the collabs dashboard so you can see projected vs actual ROI

export interface ROIProjection {
  collabId: string;
  creatorName: string;
  brandName: string;
  period: string;

  // Investment (what brand pays)
  monthlyBrandSpend: number;
  productSupplyCost: number;
  totalMonthlyInvestment: number;

  // Projected reach
  postsPerMonth: number;
  avgViewsPerPost: number;
  totalMonthlyImpressions: number;
  estimatedCTR: number; // click-through rate %
  estimatedClicks: number;
  estimatedConversionRate: number; // % of clicks that buy
  projectedSalesPerMonth: number;
  avgOrderValue: number;
  projectedMonthlyRevenue: number;

  // ROI
  projectedROI: number; // (revenue - investment) / investment * 100
  projectedRevenuePerDollarSpent: number;
  breakEvenMonths: number; // how many months to recover product supply investment
  monthlyGrossProfit: number; // revenue - investment

  // Your take
  monthlyMobileyesRevenue: number;
  annualMobileyesRevenue: number;
  affiliatePassiveMonthly: number;

  // Confidence
  confidence: 'high' | 'medium' | 'low';
  assumptions: string[];
  risks: string[];
  upside: string[];
}

export class ROIProjectionEngine {

  static projectJacobP1(): ROIProjection {
    // Real data from screenshots:
    const avgViews = 47000; // average of 60K and 34K recent videos
    const subs = 167000;
    const discordMembers = 65759;

    // Conservative assumptions for first-time brand deal
    const ctr = 2.5; // 2.5% CTR (flight sim audience is high-intent)
    const conversionRate = 0.8; // 0.8% of clicks buy ($3K is a considered purchase)
    const avgOrderValue = 3099; // Fighter Pilot Pack as anchor product
    const postsPerMonth = 4;

    const totalImpressions = avgViews * postsPerMonth;
    const clicks = Math.round(totalImpressions * (ctr / 100));
    const sales = Math.round(clicks * (conversionRate / 100));
    const monthlyRevenue = sales * avgOrderValue;

    const brandSpend = 8000;
    const productSupply = 750; // avg monthly
    const totalInvestment = brandSpend + productSupply;

    const roi = ((monthlyRevenue - totalInvestment) / totalInvestment) * 100;
    const revenuePerDollar = monthlyRevenue / totalInvestment;

    // Mobileyes take
    const mobileyesMonthly = 2700; // commission ($1,200) + agency fee ($1,500)
    const affiliatePassive = sales * (avgOrderValue * 0.10 * 0.50); // 10% affiliate, 50% your split

    return {
      collabId: 'collab_jacob_p1',
      creatorName: 'Jacob Tabor',
      brandName: 'P1 Sim Gear',
      period: 'Monthly (projected)',

      monthlyBrandSpend: brandSpend,
      productSupplyCost: productSupply,
      totalMonthlyInvestment: totalInvestment,

      postsPerMonth,
      avgViewsPerPost: avgViews,
      totalMonthlyImpressions: totalImpressions,
      estimatedCTR: ctr,
      estimatedClicks: clicks,
      estimatedConversionRate: conversionRate,
      projectedSalesPerMonth: sales,
      avgOrderValue,
      projectedMonthlyRevenue: monthlyRevenue,

      projectedROI: Math.round(roi),
      projectedRevenuePerDollarSpent: Math.round(revenuePerDollar * 100) / 100,
      breakEvenMonths: monthlyRevenue > totalInvestment ? 1 : Math.ceil(totalInvestment / monthlyRevenue),
      monthlyGrossProfit: monthlyRevenue - totalInvestment,

      monthlyMobileyesRevenue: mobileyesMonthly,
      annualMobileyesRevenue: mobileyesMonthly * 12,
      affiliatePassiveMonthly: Math.round(affiliatePassive),

      confidence: 'medium',
      assumptions: [
        `Average ${avgViews.toLocaleString()} views per video (based on recent DCS content performance)`,
        `${ctr}% CTR — conservative for high-intent flight sim hardware audience`,
        `${conversionRate}% conversion rate — considered purchase but trusted creator recommendation`,
        `$${avgOrderValue.toLocaleString()} AOV — Fighter Pilot Pack as anchor product`,
        'Discord community (65K) provides additional unpaid reach not modelled',
        'No paid media amplification assumed — organic only',
      ],
      risks: [
        'Jacob has no prior brand deal track record — conversion rate is estimated',
        'DCS audience may already own flight gear — repeat purchase rate unknown',
        'Seasonal variation (holiday spikes, quiet periods)',
        'If Jacob posts inconsistently, reach drops linearly',
      ],
      upside: [
        'DCS Discord (65K members) = additional free distribution channel not modelled',
        'Flight sim audience word-of-mouth is extremely strong — one viral review could 10x',
        'Jacob becomes a referral source for other flight sim creators → more roster talent',
        'Affiliate continues earning even if retainer ends',
        'P1 could expand to racing sim gear through same relationship',
      ],
    };
  }

  // Format projection as a dashboard card summary
  static getQuickSummary(projection: ROIProjection): {
    headline: string;
    roi: string;
    salesPerMonth: string;
    revenuePerMonth: string;
    yourTake: string;
    confidence: string;
  } {
    return {
      headline: `${projection.creatorName} × ${projection.brandName}`,
      roi: `${projection.projectedROI > 0 ? '+' : ''}${projection.projectedROI}% projected ROI`,
      salesPerMonth: `~${projection.projectedSalesPerMonth} sales/month`,
      revenuePerMonth: `$${projection.projectedMonthlyRevenue.toLocaleString()} attributed revenue`,
      yourTake: `$${projection.monthlyMobileyesRevenue.toLocaleString()}/mo + $${projection.affiliatePassiveMonthly.toLocaleString()}/mo affiliate`,
      confidence: projection.confidence,
    };
  }
}
