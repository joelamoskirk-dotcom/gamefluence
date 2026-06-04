// Invoice API — Generate and serve campaign invoices
// Returns HTML that can be printed to PDF via browser

import { NextRequest, NextResponse } from 'next/server';
import { createCampaignInvoice, renderInvoiceHTML } from '@/lib/invoice-generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { clientCompany, clientName, clientEmail, campaignName, campaignId, creators, platformFeePercent, setupFee } = body;

    if (!clientCompany || !clientName || !creators?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const invoice = createCampaignInvoice({
      clientCompany,
      clientName,
      clientEmail: clientEmail || '',
      campaignName: campaignName || 'Campaign',
      campaignId: campaignId || `GF-${Date.now()}`,
      creators,
      platformFeePercent,
      setupFee,
    });

    const html = renderInvoiceHTML(invoice);

    // Return both the invoice data and rendered HTML
    return NextResponse.json({
      success: true,
      invoice,
      html,
    });
  } catch (error) {
    console.error('[invoice] Error:', error);
    return NextResponse.json({ error: 'Failed to generate invoice' }, { status: 500 });
  }
}

// GET — render invoice directly as HTML page (for print-to-PDF)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const clientCompany = searchParams.get('company') || 'Client';
  const clientName = searchParams.get('name') || 'Client';
  const campaignName = searchParams.get('campaign') || 'Campaign';
  const amount = parseInt(searchParams.get('amount') || '500');

  const invoice = createCampaignInvoice({
    clientCompany,
    clientName,
    clientEmail: '',
    campaignName,
    campaignId: `GF-${Date.now()}`,
    creators: [{ name: 'Creator Campaign', rate: amount }],
  });

  const html = renderInvoiceHTML(invoice);

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
