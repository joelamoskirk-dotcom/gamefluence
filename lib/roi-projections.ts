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
    // UPDATED with real data from Jul 3 call:
    // Jacob confirmed: 750K IG, 750K TT, 250K YT
    // Shorts: 1M+ impressions each, $3K revenue per short
    // Long-form: 50K-100K views
    const avgViewsLongForm = 75000; // midpoint of 50K-100K
    const shortFormImpressions = 1000000; // per short
    const shortsPerMonth = 2;
    const longFormPerMonth = 1;

    // Conservative assumptions for flight sim hardware
    const ctr = 2.5; // 2.5% CTR (high-intent audience)
    const conversionRate = 0.8; // 0.8% of clicks buy
    const avgOrderValue = 3099; // Fighter Pilot Pack
    const postsPerMonth = 3; // 2 shorts + 1 long-form

    // Total monthly impressions across all content
    const totalImpressions = (shortsPerMonth * shortFormImpressions) + avgViewsLongForm;
    // Only long-form drives direct purchase (shorts drive awareness)
    const purchaseImpressions = avgViewsLongForm;
    const clicks = Math.round(purchaseImpressions * (ctr / 100));
    const sales = Math.round(clicks * (conversionRate / 100));
    const monthlyRevenue = sales * avgOrderValue;

    const brandSpend = 8000;
    const productSupply = 750;
    const totalInvestment = brandSpend + productSupply;

    const roi = ((monthlyRevenue - totalInvestment) / totalInvestment) * 100;
    const revenuePerDollar = monthlyRevenue / totalInvestment;

    // Mobileyes take
    const mobileyesMonthly = 2700;
    const affiliatePassive = sales * (avgOrderValue * 0.10 * 0.50);

    return {
      collabId: 'collab_jacob_p1',
      creatorName: 'Jacob Tabor',
      brandName: 'P1 Sim Gear',
      period: 'Monthly (projected)',

      monthlyBrandSpend: brandSpend,
      productSupplyCost: productSupply,
      totalMonthlyInvestment: totalInvestment,

      postsPerMonth,
      avgViewsPerPost: avgViewsLongForm,
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
        `2 shorts/month × 1M+ impressions each = 2M+ awareness impressions (top of funnel)`,
        `1 long-form/month × 75K views = purchase-intent audience (bottom of funnel)`,
        `${ctr}% CTR on long-form — conservative for high-intent flight sim hardware audience`,
        `${conversionRate}% conversion rate — considered $3K purchase but trusted creator recommendation`,
        `$${avgOrderValue.toLocaleString()} AOV — Fighter Pilot Pack as anchor product`,
        'Total reach: 1.75M followers (750K IG + 750K TT + 250K YT)',
        'Shorts drive awareness, long-form drives purchase decisions (APAC learning applied)',
        'No paid media amplification assumed — organic only in month 1',
      ],
      risks: [
        'Jacob works for RAAF — content scheduling needs flexibility',
        'Only 1 long-form per 8 weeks organically — may need incentive for monthly',
        'Thrustmaster existing collab — P1 must differentiate (AU-local, force feedback, entry kits)',
        'Seasonal variation + RAAF commitments could affect posting consistency',
        'DCS audience may already own flight gear — repeat purchase rate unknown',
      ],
      upside: [
        'Shorts reach 1M+ impressions EACH — brand awareness far exceeds $8K value',
        'Force feedback stick = genuine excitement = best-ever "first flight" content',
        'DCS-branded P1 pack idea from Jacob = co-branded viral product',
        'Flight Sim Expo appearances = physical brand presence + content',
        'Gateway to entire flight sim creator vertical — zero agency competition in AU',
        'Personalised setup call for buyers = premium experience + word-of-mouth',
        'Jacob can help quit RAAF if scaled to 2+ brand deals',
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
