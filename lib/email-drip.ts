// Email Drip Sequences — Gamefluence
// Automated follow-up emails after creator signup
// Uses Resend API (shared key: re_CzaXVhLs_MfgQV9qxS3UAEXAfBF92duFQ)

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'admin@gamefluence.com.au';

interface DripEmail {
  delayDays: number;
  subject: string;
  body: (name: string) => string;
}

// ── CREATOR SIGNUP DRIP ───────────────────────────────────────────────────────

export const creatorSignupDrip: DripEmail[] = [
  {
    delayDays: 0, // Immediate (already sent as confirmation)
    subject: 'Welcome to Gamefluence 🎮',
    body: (name) => `Hi ${name},

Thanks for joining Gamefluence! You're now in our creator network.

Here's what happens next:
1. Our team reviews your profile (within 24 hours)
2. We match you with relevant brand campaigns
3. You receive a brief with all details + payment terms
4. You create content, we handle everything else

No exclusivity required. Keep doing what you do — we bring you paid opportunities.

Questions? Reply to this email anytime.

Joel Kirk
Founder, Gamefluence
gamefluenceai.com`,
  },
  {
    delayDays: 3,
    subject: 'What brands are looking for right now',
    body: (name) => `Hi ${name},

Quick update from the Gamefluence team.

Right now, brands in our pipeline are looking for:
• Racing/sports game creators (Asphalt, EA FC, KartRider)
• Mobile Legends gameplay content
• Valorant clips and guides
• Female gaming creators (any genre)

If any of these match your content, you're in a great position for upcoming campaigns.

Make sure your profile is complete so we can match you accurately. The more we know about your audience, the better we can find campaigns that fit.

Talk soon,
Joel`,
  },
  {
    delayDays: 7,
    subject: 'Your first campaign could be soon',
    body: (name) => `Hi ${name},

It's been a week since you joined Gamefluence. Here's where things stand:

✅ Your profile has been reviewed
✅ You're in our matching system
⏳ Waiting for the right campaign to match

Campaigns typically match within 2-4 weeks of signup. The creators who get matched fastest are those who:
• Post consistently (3+ times per week)
• Have high engagement (comments, shares)
• Are responsive when we reach out with briefs

If you haven't heard from us with a campaign brief within 30 days, reply to this email and we'll prioritize your profile.

Keep creating great content.

Joel Kirk
Founder, Gamefluence`,
  },
];

// ── BRAND INQUIRY DRIP ────────────────────────────────────────────────────────

export const brandInquiryDrip: DripEmail[] = [
  {
    delayDays: 0,
    subject: 'We received your campaign inquiry',
    body: (name) => `Hi ${name},

Thanks for reaching out to Gamefluence. We've received your campaign inquiry and our team will review it within 24 hours.

What happens next:
1. We review your brief and target market
2. We share a shortlist of matched creators (anonymized performance data)
3. You approve the selection
4. Campaign goes live within 5-7 days of approval

If you need anything urgent in the meantime, reply to this email.

Joel Kirk
Founder, Gamefluence
gamefluenceai.com`,
  },
  {
    delayDays: 2,
    subject: 'Quick question about your campaign',
    body: (name) => `Hi ${name},

Following up on your Gamefluence inquiry. A couple of quick questions to help us match you with the right creators:

1. Do you have existing tracking links (AppsFlyer, Adjust, UTM)?
2. Is there a specific content format you prefer (gameplay video, live stream, TikTok clip)?
3. Any creators or competitors you've seen doing this well that we can reference?

This helps us find the perfect match faster.

Joel`,
  },
];

// ── SEND FUNCTION ─────────────────────────────────────────────────────────────

export async function sendDripEmail(to: string, subject: string, htmlBody: string): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.log(`[email-drip] Would send to ${to}: "${subject}" (Resend not configured)`);
    return false;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Gamefluence <${FROM_EMAIL}>`,
        to: [to],
        subject,
        text: htmlBody, // Plain text for now — can add HTML templates later
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('[email-drip] Send failed:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[email-drip] Error:', err);
    return false;
  }
}

// Schedule a drip sequence (in production, use a job queue like Inngest or QStash)
// For now, this is called manually or via a cron endpoint
export async function triggerDripSequence(
  type: 'creator_signup' | 'brand_inquiry',
  recipientEmail: string,
  recipientName: string,
  daysSinceSignup: number
): Promise<{ sent: boolean; emailIndex: number }> {
  const sequence = type === 'creator_signup' ? creatorSignupDrip : brandInquiryDrip;

  // Find the email that should be sent based on days since signup
  const emailToSend = sequence.find(e => e.delayDays === daysSinceSignup);

  if (!emailToSend) {
    return { sent: false, emailIndex: -1 };
  }

  const body = emailToSend.body(recipientName);
  const sent = await sendDripEmail(recipientEmail, emailToSend.subject, body);

  return { sent, emailIndex: sequence.indexOf(emailToSend) };
}

// ── INVOICE GENERATION ────────────────────────────────────────────────────────

export interface Invoice {
  invoiceId: string;
  date: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  items: { description: string; amount: number }[];
  subtotal: number;
  platformFee: number;
  total: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  campaignId: string;
}

export function generateInvoice(params: {
  clientName: string;
  clientEmail: string;
  campaignId: string;
  planName: string;
  setupFee: number;
  creatorFees: { creatorName: string; amount: number }[];
  currency?: string;
}): Invoice {
  const subtotal = params.setupFee + params.creatorFees.reduce((s, c) => s + c.amount, 0);
  const platformFee = subtotal * 0.3; // 30% platform margin
  const total = subtotal + platformFee;

  return {
    invoiceId: `GF-INV-${Date.now().toString(36).toUpperCase()}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0], // Net 14
    clientName: params.clientName,
    clientEmail: params.clientEmail,
    items: [
      { description: `Campaign Setup — ${params.planName}`, amount: params.setupFee },
      ...params.creatorFees.map(c => ({ description: `Creator: ${c.creatorName}`, amount: c.amount })),
      { description: 'Platform Fee (30%)', amount: platformFee },
    ],
    subtotal,
    platformFee,
    total,
    currency: params.currency || 'AUD',
    status: 'draft',
    campaignId: params.campaignId,
  };
}

export function formatInvoiceText(invoice: Invoice): string {
  return `
═══════════════════════════════════════
INVOICE — ${invoice.invoiceId}
═══════════════════════════════════════

Gamefluence Pty Ltd
ACN 696 199 461
Sydney, Australia
admin@gamefluence.com.au

Bill To: ${invoice.clientName}
Email: ${invoice.clientEmail}
Date: ${invoice.date}
Due: ${invoice.dueDate}

───────────────────────────────────────
ITEMS
───────────────────────────────────────
${invoice.items.map(i => `${i.description.padEnd(40)} $${i.amount.toFixed(2)}`).join('\n')}

───────────────────────────────────────
TOTAL                                    $${invoice.total.toFixed(2)} ${invoice.currency}
═══════════════════════════════════════

Payment: Stripe checkout or bank transfer
Status: ${invoice.status.toUpperCase()}
Campaign: ${invoice.campaignId}
`;
}
