// Vercel Cron Job — Email Drip Processor
// Runs daily, checks for scheduled emails, sends them via Resend
// Configured in vercel.json with schedule: "0 9 * * *" (9am UTC daily)

import { NextRequest, NextResponse } from 'next/server';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'admin@gamefluence.com.au';
const CRON_SECRET = process.env.CRON_SECRET || '';

// In-memory queue (replace with Google Sheets or DB in production)
// This gets populated when creators/brands sign up
interface ScheduledEmail {
  id: string;
  to: string;
  subject: string;
  body: string;
  sendAfter: string; // ISO date
  sent: boolean;
  type: 'creator_drip' | 'brand_drip';
  step: number;
}

// Global queue — persists across warm invocations on Vercel
const emailQueue: ScheduledEmail[] = [];

// Add to queue (called from signup flows via import)
function scheduleEmailInternal(email: ScheduledEmail) {
  emailQueue.push(email);
}

function addToCreatorDrip(to: string, name: string, data: { platform: string; genres: string; market: string; creatorId: string }) {
  const now = new Date();

  // Day 3
  const day3 = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  emailQueue.push({
    id: `drip_${Date.now()}_d3`,
    to,
    subject: 'What brands are looking for right now — Gamefluence Intel',
    body: getCreatorDay3Email(name, data),
    sendAfter: day3.toISOString(),
    sent: false,
    type: 'creator_drip',
    step: 2,
  });

  // Day 7
  const day7 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  emailQueue.push({
    id: `drip_${Date.now()}_d7`,
    to,
    subject: 'Your first campaign could be coming soon',
    body: getCreatorDay7Email(name, data),
    sendAfter: day7.toISOString(),
    sent: false,
    type: 'creator_drip',
    step: 3,
  });

  // Day 14
  const day14 = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  emailQueue.push({
    id: `drip_${Date.now()}_d14`,
    to,
    subject: 'Referral bonus — know other gaming creators?',
    body: getCreatorDay14Email(name, data),
    sendAfter: day14.toISOString(),
    sent: false,
    type: 'creator_drip',
    step: 4,
  });
}

function addToBrandDrip(to: string, name: string, data: { market: string; budget: string }) {
  const now = new Date();

  // Day 2
  const day2 = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
  emailQueue.push({
    id: `brand_drip_${Date.now()}_d2`,
    to,
    subject: 'APAC gaming market snapshot — for your campaign planning',
    body: getBrandDay2Email(name),
    sendAfter: day2.toISOString(),
    sent: false,
    type: 'brand_drip',
    step: 2,
  });

  // Day 5
  const day5 = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
  emailQueue.push({
    id: `brand_drip_${Date.now()}_d5`,
    to,
    subject: 'Your campaign proposal is ready — Gamefluence',
    body: getBrandDay5Email(name, data),
    sendAfter: day5.toISOString(),
    sent: false,
    type: 'brand_drip',
    step: 3,
  });
}

// GET handler — Vercel Cron calls this
export async function GET(request: NextRequest) {
  // Verify cron secret (prevents unauthorized calls)
  const authHeader = request.headers.get('authorization');
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const pending = emailQueue.filter(e => !e.sent && new Date(e.sendAfter) <= now);

  let sent = 0;
  let failed = 0;

  for (const email of pending) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `Gamefluence <${FROM_EMAIL}>`,
          to: [email.to],
          subject: email.subject,
          html: email.body.replace(/\n/g, '<br>'),
        }),
      });

      if (res.ok) {
        email.sent = true;
        sent++;
      } else {
        failed++;
      }
    } catch {
      failed++;
    }
  }

  return NextResponse.json({
    processed: pending.length,
    sent,
    failed,
    queueSize: emailQueue.filter(e => !e.sent).length,
    timestamp: now.toISOString(),
  });
}

// ── EMAIL TEMPLATES ───────────────────────────────────────────────────────────

function getCreatorDay3Email(name: string, data: { platform: string; genres: string; market: string }) {
  return `Hi ${name},

Quick update on what's hot in APAC gaming brand campaigns right now:

🏎️ Racing games — Fastest growing genre in SEA (+22% YoY). Brands paying $200-$500/video.
🎮 Mobile Legends — #1 revenue game in SEA. MPL campaigns always need creators.
⚔️ Valorant — Growing fast in Thailand and Philippines. Riot is spending.

If you create ${data.genres} content on ${data.platform}, you're well positioned.

Keep posting regularly — our AI prioritizes active creators when matching campaigns.

Joel
Gamefluence`;
}

function getCreatorDay7Email(name: string, data: { platform: string; genres: string; market: string }) {
  return `Hi ${name},

Checking in — are you still creating ${data.genres} content on ${data.platform}?

We've got campaigns being planned for the next 4 weeks. Creators who:
• Post 3+ times per week
• Have 5%+ engagement rate
• Are responsive to messages
...get matched first.

If your content focus has changed since signing up, reply and let us know.

Joel
Gamefluence`;
}

function getCreatorDay14Email(name: string, data: { creatorId: string }) {
  return `Hi ${name},

Know other gaming creators who might want paid brand campaigns?

Refer a creator who signs up and completes their first campaign — you both get a bonus.

Share this link: gamefluenceai.com/creator-signup?ref=${data.creatorId}&source=referral

Joel
Gamefluence`;
}

function getBrandDay2Email(name: string) {
  return `Hi ${name},

While we prep your campaign proposal, here's a quick APAC gaming market snapshot:

📊 Key stats:
• SEA gaming market: $6.39B revenue (2025)
• Indonesia: 870M game downloads per quarter
• Vietnam: +12% YoY growth (fastest in SEA)
• Influencer marketing: 42% now outcome-driven

🎯 What's working right now:
• TikTok Live streams drive 40% of attributed installs in Vietnam
• MOBA creators deliver 8.5-11% engagement (vs 4% avg)
• Racing/sports genre is 30-40% underpriced

We'll have your creator recommendations ready soon.

Joel
Gamefluence`;
}

function getBrandDay5Email(name: string, data: { market: string; budget: string }) {
  return `Hi ${name},

We've put together a campaign proposal based on your brief:

Market: ${data.market}
Budget: ${data.budget}
Recommended creators: 5-10 matched to your audience

Reply to this email and I'll send the full proposal with creator recommendations.

Joel
Gamefluence`;
}
