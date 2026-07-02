import { NextRequest, NextResponse } from 'next/server';
import { ShopifyAffiliateTracker } from '@/lib/shopify-affiliate-tracker';

// Runs daily via Vercel Cron — pulls affiliate orders from connected Shopify stores
// vercel.json: { "crons": [{ "path": "/api/cron/affiliate-sync", "schedule": "0 6 * * *" }] }

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const results: Array<{ brand: string; orders: number; revenue: number; yourCut: number }> = [];

    // P1 Sim Gear
    const p1Config = ShopifyAffiliateTracker.getP1Config();
    if (p1Config.apiKey) {
      const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const orders = await ShopifyAffiliateTracker.fetchAllAffiliateOrders(p1Config, last30Days);
      const summary = ShopifyAffiliateTracker.generateSummary(orders, p1Config.brandName, 'Last 30 days');
      
      results.push({
        brand: p1Config.brandName,
        orders: summary.totalOrders,
        revenue: summary.totalRevenue,
        yourCut: summary.mobileyesPayout,
      });

      // TODO: Log to Google Sheets "Affiliate Revenue" tab
      // TODO: Update collabs dashboard with real-time data
    } else {
      results.push({ brand: 'P1 Sim Gear', orders: 0, revenue: 0, yourCut: 0 });
    }

    // Add more stores here as you sign more brands:
    // const store2Config = getStore2Config();
    // ...

    return NextResponse.json({
      success: true,
      syncedAt: new Date().toISOString(),
      stores: results,
      totalRevenue: results.reduce((s, r) => s + r.revenue, 0),
      totalYourCut: results.reduce((s, r) => s + r.yourCut, 0),
    });
  } catch (error) {
    console.error('[cron/affiliate-sync] Error:', error);
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}
