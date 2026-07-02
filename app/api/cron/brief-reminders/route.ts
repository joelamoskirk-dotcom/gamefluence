import { NextRequest, NextResponse } from 'next/server';
import { sendBriefReminderEmail, sendBriefAutoDeclinedEmail, sendBriefResponseAdminNotification } from '@/lib/mobileyes-email';

// Cron endpoint: Check for briefs approaching 48-hour deadline
// Runs every hour via Vercel Cron
// vercel.json: { "crons": [{ "path": "/api/cron/brief-reminders", "schedule": "0 * * * *" }] }

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // In production: query Google Sheets or DB for briefs with status='sent'
    // Check sentAt timestamp against current time:
    // - If 24 hours passed → send reminder
    // - If 48 hours passed → auto-decline + notify

    const results = {
      remindersChecked: 0,
      remindersSent: 0,
      autoDeclined: 0,
      errors: 0,
    };

    // This would be replaced with real sheet reads in production:
    // const pendingBriefs = await getMobileyesPendingBriefs();
    // For now, this is the structural shell ready for live data.
    
    const pendingBriefs: Array<{
      briefId: string;
      talentEmail: string;
      talentName: string;
      brandName: string;
      campaignName: string;
      sentAt: string;
      acceptUrl: string;
      status: string;
    }> = []; // Will be populated from Sheets in production

    const now = Date.now();

    for (const brief of pendingBriefs) {
      results.remindersChecked++;
      const sentTime = new Date(brief.sentAt).getTime();
      const hoursSinceSent = (now - sentTime) / (1000 * 60 * 60);

      if (hoursSinceSent >= 48 && brief.status === 'sent') {
        // Auto-decline
        await sendBriefAutoDeclinedEmail({
          talentEmail: brief.talentEmail,
          talentName: brief.talentName,
          brandName: brief.brandName,
          campaignName: brief.campaignName,
        });
        await sendBriefResponseAdminNotification({
          talentName: brief.talentName,
          brandName: brief.brandName,
          campaignName: brief.campaignName,
          accepted: false,
          declineReason: 'Auto-declined: 48-hour response window expired',
        });
        results.autoDeclined++;
        // TODO: Update sheet status to 'auto_declined'
      } else if (hoursSinceSent >= 24 && hoursSinceSent < 25 && brief.status === 'sent') {
        // Send 24-hour reminder (only in the 24-25 hour window to avoid duplicate sends)
        const hoursRemaining = Math.round(48 - hoursSinceSent);
        await sendBriefReminderEmail({
          talentEmail: brief.talentEmail,
          talentName: brief.talentName,
          brandName: brief.brandName,
          campaignName: brief.campaignName,
          acceptUrl: brief.acceptUrl,
          hoursRemaining,
        });
        results.remindersSent++;
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Brief reminder cron completed',
      results,
      ranAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[cron/brief-reminders] Error:', error);
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 });
  }
}
