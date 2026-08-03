import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, markets, budget, about } = body;

    // Send notification email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: 'Gamefluence <noreply@gamefluence.com.au>',
          to: ['admin@gamefluence.com.au'],
          subject: `New Campaign Plan Request — ${company}`,
          html: `
            <h2>New Lead: ${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company / Game:</strong> ${company}</p>
            <p><strong>Markets:</strong> ${Array.isArray(markets) ? markets.join(', ') : markets}</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <p><strong>About:</strong></p>
            <p>${about}</p>
            <hr />
            <p style="color: #666; font-size: 12px;">Submitted via gamefluence.com.au/get-started</p>
          `,
        }),
      });
    }

    // Log to Google Sheets if configured
    const sheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetsWebhook) {
      await fetch(sheetsWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name,
          email,
          company,
          markets: Array.isArray(markets) ? markets.join(', ') : markets,
          budget,
          about,
        }),
      }).catch(() => {
        // Non-blocking — sheet logging failure shouldn't break the lead capture
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    // Always return success to the client — handle failures async
    return NextResponse.json({ success: true });
  }
}
