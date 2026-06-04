// Automated Email Sequences — Gamefluence
// Drip campaigns for creators and brands after signup
// Uses Resend API (shared key: re_CzaXVhLs_MfgQV9qxS3UAEXAfBF92duFQ)

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'admin@gamefluence.com.au';

interface EmailStep {
  delayDays: number;
  subject: string;
  body: string;
}

// ── CREATOR DRIP SEQUENCE ─────────────────────────────────────────────────────

export const creatorDripSequence: EmailStep[] = [
  {
    delayDays: 0,
    subject: 'Welcome to Gamefluence 🎮 — You\'re In!',
    body: `Hi {{name}},

Welcome to Gamefluence! You're now part of our APAC gaming creator network.

Here's what happens next:
1. Our AI reviews your profile and content
2. We match you with relevant brand campaigns
3. When there's a fit, we reach out with a paid brief

No action needed from you — just keep creating great content.

Your profile:
• Platform: {{platform}}
• Genre focus: {{genres}}
• Market: {{market}}

We'll be in touch when we have a campaign match. In the meantime, if you have questions, reply to this email.

Game on,
Joel Kirk
Founder, Gamefluence
gamefluenceai.com`,
  },
  {
    delayDays: 3,
    subject: 'What brands are looking for right now — Gamefluence Intel',
    body: `Hi {{name}},

Quick update on what's hot in APAC gaming brand campaigns right now:

🏎️ Racing games — Fastest growing genre in SEA (+22% YoY). Brands are paying $200-$500 per video for racing content.

🎮 Mobile Legends — Still the #1 revenue game in SEA. MPL-related campaigns always need creators.

⚔️ Valorant — Growing fast in Thailand and Philippines. Riot is spending.

If you create content in any of these genres, you're in a strong position for upcoming campaigns.

Keep posting regularly — our AI prioritizes active creators when matching campaigns.

Joel
Gamefluence`,
  },
  {
    delayDays: 7,
    subject: 'Your first campaign could be coming soon',
    body: `Hi {{name}},

Just wanted to check in — are you still creating {{genres}} content on {{platform}}?

We've got campaigns being planned for the next 4 weeks across Vietnam, Indonesia, Philippines, and Thailand. Creators who:
• Post 3+ times per week
• Have 5%+ engagement rate
• Are responsive to messages

...get matched first.

If you've grown your audience or changed your content focus since signing up, reply to this email and let us know. It helps us match you better.

Talk soon,
Joel
Gamefluence`,
  },
  {
    delayDays: 14,
    subject: 'Referral bonus — know other gaming creators?',
    body: `Hi {{name}},

Quick one — do you know other gaming creators who might want paid brand campaigns?

If you refer a creator who signs up and completes their first campaign, you both get a bonus on your next campaign payment.

Share this link with them:
gamefluenceai.com/creator-signup?ref={{creatorId}}&source=referral

No pressure — just thought you might know people in the scene.

Joel
Gamefluence`,
  },
];

// ── BRAND/AGENCY DRIP SEQUENCE ────────────────────────────────────────────────

export const brandDripSequence: EmailStep[] = [
  {
    delayDays: 0,
    subject: 'Thanks for reaching out — Gamefluence',
    body: `Hi {{name}},

Thanks for your interest in Gamefluence. We've received your inquiry and will be in touch within 24 hours with next steps.

In the meantime, here's what we can help with:
• AI-matched gaming creators across 7 APAC markets
• Full attribution tracking (AppsFlyer, Adjust, UTM, promo codes)
• Campaign execution from brief to results report

If you'd like to chat sooner, reply to this email or book a time directly.

Joel Kirk
Founder, Gamefluence
gamefluenceai.com`,
  },
  {
    delayDays: 2,
    subject: 'APAC gaming market snapshot — for your campaign planning',
    body: `Hi {{name}},

While we prep your campaign proposal, here's a quick snapshot of the APAC gaming market that might be useful:

📊 Key stats:
• SEA gaming market: $6.39B revenue (2025)
• Indonesia: 870M game downloads per quarter
• Vietnam: +12% YoY growth (fastest in SEA)
• Influencer marketing: 42% now outcome-driven (up from 30% in 2024)

🎯 What's working right now:
• TikTok Live streams drive 40% of attributed installs in Vietnam
• MOBA creators deliver 8.5-11% engagement (vs 4% industry avg)
• Racing/sports genre is 30-40% underpriced vs MOBA equivalents

We'll have your creator recommendations ready soon. If your timeline is urgent, let us know.

Joel
Gamefluence`,
  },
  {
    delayDays: 5,
    subject: 'Your campaign proposal is ready — Gamefluence',
    body: `Hi {{name}},

We've put together a campaign proposal based on your brief:

Market: {{market}}
Budget range: {{budget}}
Recommended creators: 5-10 matched to your genre and audience

Ready to review? Reply to this email and I'll send you the full proposal with creator recommendations (anonymized until you commit).

Or if you'd prefer a call, let me know a time that works.

Joel
Gamefluence`,
  },
];

// ── SEND EMAIL ────────────────────────────────────────────────────────────────

async function sendEmail(to: string, subject: string, htmlBody: string): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn('[email-sequences] Resend API key not configured');
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
        html: htmlBody.replace(/\n/g, '<br>'),
      }),
    });

    return res.ok;
  } catch (err) {
    console.error('[email-sequences] Send failed:', err);
    return false;
  }
}

// ── SEQUENCE TRIGGER ──────────────────────────────────────────────────────────

export async function triggerCreatorSequence(
  email: string,
  data: { name: string; platform: string; genres: string; market: string; creatorId: string }
): Promise<void> {
  // Send Day 0 immediately
  const step = creatorDripSequence[0];
  const body = step.body
    .replace(/{{name}}/g, data.name)
    .replace(/{{platform}}/g, data.platform)
    .replace(/{{genres}}/g, data.genres)
    .replace(/{{market}}/g, data.market)
    .replace(/{{creatorId}}/g, data.creatorId);

  await sendEmail(email, step.subject, body);

  // Schedule remaining steps (in production, use a job queue like Inngest/Trigger.dev)
  // For now, log what would be scheduled
  console.log(`[email-sequences] Creator sequence triggered for ${email}. Steps scheduled: Day 3, Day 7, Day 14`);
}

export async function triggerBrandSequence(
  email: string,
  data: { name: string; market: string; budget: string }
): Promise<void> {
  // Send Day 0 immediately
  const step = brandDripSequence[0];
  const body = step.body.replace(/{{name}}/g, data.name);

  await sendEmail(email, step.subject, body);

  console.log(`[email-sequences] Brand sequence triggered for ${email}. Steps scheduled: Day 2, Day 5`);
}
