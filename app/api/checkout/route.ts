// Stripe Checkout Session API
// Creates a real Stripe checkout session for campaign payments
// Uses the Stripe secret key from env vars

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planName, amount, currency, customerEmail, campaignId, creatorCount } = body;

    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey || stripeKey.startsWith('sk_test_your')) {
      // Stripe not configured — return simulated session for dev
      return NextResponse.json({
        success: true,
        sessionId: `sim_${Date.now()}`,
        url: null, // No redirect — show success inline
        simulated: true,
        message: 'Stripe not configured. Payment simulated for development.',
      });
    }

    // Create real Stripe Checkout Session
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': 'payment',
        'success_url': `${process.env.NEXT_PUBLIC_APP_URL || 'https://gamefluenceai.com'}/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': `${process.env.NEXT_PUBLIC_APP_URL || 'https://gamefluenceai.com'}/dashboard?payment=cancelled`,
        'customer_email': customerEmail || '',
        'line_items[0][price_data][currency]': currency || 'aud',
        'line_items[0][price_data][product_data][name]': `Gamefluence Campaign: ${planName || 'Standard'}`,
        'line_items[0][price_data][product_data][description]': `${creatorCount || 1} creator(s) • Campaign ID: ${campaignId || 'new'}`,
        'line_items[0][price_data][unit_amount]': String(Math.round((amount || 299) * 100)), // cents
        'line_items[0][quantity]': '1',
        'metadata[campaign_id]': campaignId || '',
        'metadata[plan]': planName || '',
        'metadata[creator_count]': String(creatorCount || 0),
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('[checkout] Stripe error:', error);
      return NextResponse.json({ error: 'Payment setup failed', details: error.error?.message }, { status: 500 });
    }

    const session = await res.json();
    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
      simulated: false,
    });
  } catch (error) {
    console.error('[checkout] Error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
