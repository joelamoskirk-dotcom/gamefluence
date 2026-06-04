// Discord Webhook Endpoint
// Receives member_join events from Discord bot
// Attributes joins to creators via invite code tracking
// Fires S2S conversion events back to ad platforms

import { NextRequest, NextResponse } from 'next/server';
import { fireConversion } from '@/lib/s2s-attribution-engine';
import { logCreatorSignup } from '@/lib/google-sheets-db';

// In-memory invite tracking (replace with DB when scaling)
const inviteMap = new Map<string, { creatorId: string; creatorHandle: string; campaignId: string }>();

// Register a creator's invite code for tracking (called internally)
function registerInvite(code: string, creatorId: string, creatorHandle: string, campaignId: string) {
  inviteMap.set(code, { creatorId, creatorHandle, campaignId });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verify the request is from our Discord bot (simple token check)
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.DISCORD_WEBHOOK_SECRET;
    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { event, data } = body;

    switch (event) {
      case 'member_join': {
        const { userId, username, inviteCode, guildId } = data;

        // Look up which creator this invite belongs to
        const attribution = inviteMap.get(inviteCode);

        if (attribution) {
          // Fire S2S conversion
          await fireConversion({
            eventId: `discord_${userId}_${Date.now()}`,
            eventType: 'discord_join',
            timestamp: new Date().toISOString(),
            creatorId: attribution.creatorId,
            creatorHandle: attribution.creatorHandle,
            campaignId: attribution.campaignId,
            utmSource: 'gamefluence',
            utmMedium: 'discord_invite',
            utmCampaign: attribution.campaignId,
            utmContent: attribution.creatorHandle,
            discordInviteCode: inviteCode,
            discordUserId: userId,
          });

          // Log to Google Sheets
          logCreatorSignup({
            creatorName: username,
            email: '',
            socialProfile: `discord:${userId}`,
            platform: 'discord',
            outreachRef: attribution.creatorId,
            outreachSource: 'discord_invite',
          }).catch(() => {});

          return NextResponse.json({
            success: true,
            attributed: true,
            creator: attribution.creatorHandle,
            campaign: attribution.campaignId,
          });
        }

        // No attribution found — organic join
        return NextResponse.json({ success: true, attributed: false });
      }

      case 'invite_create': {
        // Bot created a new invite — register it
        const { code, creatorId, creatorHandle, campaignId } = data;
        if (code && creatorId) {
          registerInvite(code, creatorId, creatorHandle, campaignId);
        }
        return NextResponse.json({ success: true, registered: true });
      }

      default:
        return NextResponse.json({ error: `Unknown event: ${event}` }, { status: 400 });
    }
  } catch (error) {
    console.error('[webhooks/discord] Error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
