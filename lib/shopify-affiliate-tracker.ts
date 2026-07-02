// Shopify Affiliate Tracking Engine
// Connects to brand Shopify stores via Admin API
// Pulls orders with creator promo codes → tracks affiliate revenue
// Powers the ROI Learning Loop across all campaigns

export interface ShopifyStoreConfig {
  id: string;
  brandName: string;
  storeDomain: string; // e.g. 'p1simgear.myshopify.com'
  apiKey: string; // Shopify Admin API access token (read_orders scope)
  discountCodes: DiscountCodeMapping[];
  platform: 'gamefluence' | 'mobileyes';
  active: boolean;
}

export interface DiscountCodeMapping {
  code: string; // e.g. 'JACOBDCS'
  creatorName: string;
  creatorId: string;
  affiliatePercent: number; // e.g. 10 = 10% of sale
  creatorSplit: number; // e.g. 50 = creator gets 50% of affiliate
  mobileyesSplit: number; // e.g. 50 = Mobileyes gets 50%
  productFilter?: string[]; // Only count sales of specific products (optional)
  active: boolean;
}

export interface AffiliateOrder {
  orderId: string;
  orderNumber: number;
  createdAt: string;
  discountCode: string;
  creatorName: string;
  creatorId: string;
  // Financials
  orderTotal: number;
  discountAmount: number;
  affiliateCommission: number;
  creatorPayout: number;
  mobileyesPayout: number;
  // Order details
  products: Array<{ name: string; price: number; quantity: number }>;
  currency: string;
  // Attribution
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  // Status
  paid: boolean;
  paidAt?: string;
}

export interface AffiliateSummary {
  brandName: string;
  period: string;
  totalOrders: number;
  totalRevenue: number;
  totalAffiliateEarned: number;
  creatorPayout: number;
  mobileyesPayout: number;
  avgOrderValue: number;
  topProducts: Array<{ name: string; sales: number; revenue: number }>;
  dailyBreakdown: Array<{ date: string; orders: number; revenue: number }>;
  byCreator: Array<{
    name: string;
    code: string;
    orders: number;
    revenue: number;
    commission: number;
    creatorCut: number;
    yourCut: number;
  }>;
}

export class ShopifyAffiliateTracker {

  // Fetch orders from Shopify Admin API filtered by discount code
  static async fetchOrdersByCode(
    config: ShopifyStoreConfig,
    code: string,
    sinceDate?: string
  ): Promise<AffiliateOrder[]> {
    const since = sinceDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const url = `https://${config.storeDomain}/admin/api/2024-01/orders.json?status=any&created_at_min=${since}&limit=250`;

    try {
      const response = await fetch(url, {
        headers: {
          'X-Shopify-Access-Token': config.apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error(`[shopify] API error for ${config.brandName}: ${response.status}`);
        return [];
      }

      const data = await response.json();
      const orders = data.orders || [];

      // Filter orders that used the specific discount code
      const codeMapping = config.discountCodes.find(d => d.code === code);
      if (!codeMapping) return [];

      return orders
        .filter((order: any) => 
          order.discount_codes?.some((dc: any) => 
            dc.code.toUpperCase() === code.toUpperCase()
          )
        )
        .map((order: any) => this.mapOrder(order, codeMapping, config));
    } catch (error) {
      console.error(`[shopify] Fetch failed for ${config.brandName}:`, error);
      return [];
    }
  }

  // Fetch ALL affiliate orders across all codes for a store
  static async fetchAllAffiliateOrders(config: ShopifyStoreConfig, sinceDate?: string): Promise<AffiliateOrder[]> {
    const allOrders: AffiliateOrder[] = [];
    
    for (const codeMapping of config.discountCodes.filter(d => d.active)) {
      const orders = await this.fetchOrdersByCode(config, codeMapping.code, sinceDate);
      allOrders.push(...orders);
    }

    return allOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Map Shopify order to our AffiliateOrder format
  private static mapOrder(order: any, mapping: DiscountCodeMapping, config: ShopifyStoreConfig): AffiliateOrder {
    const orderTotal = parseFloat(order.total_price || '0');
    const discountAmount = parseFloat(order.total_discounts || '0');
    
    // Calculate affiliate commission
    const affiliateCommission = Math.round(orderTotal * (mapping.affiliatePercent / 100) * 100) / 100;
    const creatorPayout = Math.round(affiliateCommission * (mapping.creatorSplit / 100) * 100) / 100;
    const mobileyesPayout = affiliateCommission - creatorPayout;

    // Extract products
    const products = (order.line_items || []).map((item: any) => ({
      name: item.title || item.name,
      price: parseFloat(item.price || '0'),
      quantity: item.quantity || 1,
    }));

    // Extract UTM from landing page URL if available
    const landingSite = order.landing_site || '';
    const utmSource = this.extractParam(landingSite, 'utm_source');
    const utmMedium = this.extractParam(landingSite, 'utm_medium');
    const utmCampaign = this.extractParam(landingSite, 'utm_campaign');

    return {
      orderId: order.id?.toString() || '',
      orderNumber: order.order_number || 0,
      createdAt: order.created_at || new Date().toISOString(),
      discountCode: mapping.code,
      creatorName: mapping.creatorName,
      creatorId: mapping.creatorId,
      orderTotal,
      discountAmount,
      affiliateCommission,
      creatorPayout,
      mobileyesPayout,
      products,
      currency: order.currency || 'AUD',
      utmSource,
      utmMedium,
      utmCampaign,
      paid: false,
    };
  }

  // Generate summary report
  static generateSummary(
    orders: AffiliateOrder[],
    brandName: string,
    period: string
  ): AffiliateSummary {
    const totalRevenue = orders.reduce((s, o) => s + o.orderTotal, 0);
    const totalAffiliate = orders.reduce((s, o) => s + o.affiliateCommission, 0);
    const creatorPayout = orders.reduce((s, o) => s + o.creatorPayout, 0);
    const mobileyesPayout = orders.reduce((s, o) => s + o.mobileyesPayout, 0);

    // Top products
    const productMap = new Map<string, { sales: number; revenue: number }>();
    orders.forEach(o => {
      o.products.forEach(p => {
        const existing = productMap.get(p.name) || { sales: 0, revenue: 0 };
        productMap.set(p.name, { sales: existing.sales + p.quantity, revenue: existing.revenue + (p.price * p.quantity) });
      });
    });
    const topProducts = [...productMap.entries()]
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Daily breakdown
    const dailyMap = new Map<string, { orders: number; revenue: number }>();
    orders.forEach(o => {
      const date = o.createdAt.split('T')[0];
      const existing = dailyMap.get(date) || { orders: 0, revenue: 0 };
      dailyMap.set(date, { orders: existing.orders + 1, revenue: existing.revenue + o.orderTotal });
    });
    const dailyBreakdown = [...dailyMap.entries()]
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // By creator
    const creatorMap = new Map<string, { code: string; orders: number; revenue: number; commission: number; creatorCut: number; yourCut: number }>();
    orders.forEach(o => {
      const existing = creatorMap.get(o.creatorName) || { code: o.discountCode, orders: 0, revenue: 0, commission: 0, creatorCut: 0, yourCut: 0 };
      creatorMap.set(o.creatorName, {
        code: o.discountCode,
        orders: existing.orders + 1,
        revenue: existing.revenue + o.orderTotal,
        commission: existing.commission + o.affiliateCommission,
        creatorCut: existing.creatorCut + o.creatorPayout,
        yourCut: existing.yourCut + o.mobileyesPayout,
      });
    });
    const byCreator = [...creatorMap.entries()]
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.revenue - a.revenue);

    return {
      brandName,
      period,
      totalOrders: orders.length,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalAffiliateEarned: Math.round(totalAffiliate * 100) / 100,
      creatorPayout: Math.round(creatorPayout * 100) / 100,
      mobileyesPayout: Math.round(mobileyesPayout * 100) / 100,
      avgOrderValue: orders.length > 0 ? Math.round((totalRevenue / orders.length) * 100) / 100 : 0,
      topProducts,
      dailyBreakdown,
      byCreator,
    };
  }

  // ROI calculation for the brand
  static calculateROI(summary: AffiliateSummary, monthlyBrandSpend: number): {
    roi: number;
    revenuePerDollarSpent: number;
    breakEvenOrders: number;
    profitable: boolean;
    note: string;
  } {
    const roi = monthlyBrandSpend > 0 
      ? ((summary.totalRevenue - monthlyBrandSpend) / monthlyBrandSpend) * 100 
      : 0;
    const revenuePerDollar = monthlyBrandSpend > 0 ? summary.totalRevenue / monthlyBrandSpend : 0;
    const breakEvenOrders = summary.avgOrderValue > 0 ? Math.ceil(monthlyBrandSpend / summary.avgOrderValue) : 0;

    return {
      roi: Math.round(roi),
      revenuePerDollarSpent: Math.round(revenuePerDollar * 100) / 100,
      breakEvenOrders,
      profitable: summary.totalRevenue > monthlyBrandSpend,
      note: roi > 0 
        ? `Positive ROI: every $1 Neil spends generates $${revenuePerDollar.toFixed(2)} in attributed revenue`
        : `Not yet positive — need ${breakEvenOrders} orders/month to break even`,
    };
  }

  // Helper: extract URL param
  private static extractParam(url: string, param: string): string | undefined {
    try {
      const urlObj = new URL(url, 'https://placeholder.com');
      return urlObj.searchParams.get(param) || undefined;
    } catch {
      return undefined;
    }
  }

  // Get store config from env (for P1 Sim Gear)
  static getP1Config(): ShopifyStoreConfig {
    return {
      id: 'store_p1simgear',
      brandName: 'P1 Sim Gear',
      storeDomain: process.env.P1_SHOPIFY_STORE || 'p1simgear.myshopify.com',
      apiKey: process.env.P1_SHOPIFY_API_KEY || '',
      discountCodes: [
        {
          code: 'JACOBDCS',
          creatorName: 'Jacob Tabor',
          creatorId: 'talent_jacob_tabor',
          affiliatePercent: 10, // 10% of sale value
          creatorSplit: 50, // Jacob gets 50% of the 10%
          mobileyesSplit: 50, // You get 50% of the 10%
          active: true,
        },
      ],
      platform: 'mobileyes',
      active: true,
    };
  }
}
