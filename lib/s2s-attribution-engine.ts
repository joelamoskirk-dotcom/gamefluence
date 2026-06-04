// Gamefluence S2S Attribution Engine
// Server-to-server conversion tracking for creator-driven campaigns
// Fires conversion events back to TikTok, Meta, Google Ads when campaigns convert
// Discord integration tracks server joins via unique invite codes per creator

// ── TYPES ─────────────────────────────────────────────────────────────────────

export interface ConversionEvent {
  eventId: string;
  eventType: 'signup' | 'install' | 'purchase' | 'discord_join' | 'lead' | 'campaign_start';
  timestamp: string;
  // Attribution
  creatorId: string;
  creatorHandle: string;
  campaignId: string;
  // UTM params (standard structure)
  utmSource: string; // e.g. 'gamefluence'
  utmMedium: string; // e.g. 'creator_campaign'
  utmCampaign: string; // e.g. 'racing_vn_q3_2026'
  utmContent: string; // e.g. creator handle or content piece ID
  // User data (hashed for privacy)
  hashedEmail?: string;
  hashedPhone?: string;
  ipAddress?: string;
  userAgent?: string;
  // Conversion value
  value?: number;
  currency?: string;
  // Platform-specific IDs
  ttclid?: string; // TikTok click ID
  fbclid?: string; // Meta click ID
  gclid?: string; // Google click ID
  // Discord-specific
  discordInviteCode?: string;
  discordUserId?: string;
}

export interface CreatorTrackingLink {
  creatorId: string;
  creatorHandle: string;
  campaignId: string;
  baseUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  discordInviteCode?: string;
  fullUrl: string;
}

export interface S2SConfig {
  tiktok: { pixelId: string; accessToken: string; enabled: boolean };
  meta: { pixelId: string; accessToken: string; enabled: boolean };
  google: { customerId: string; conversionActionId: string; enabled: boolean };
  discord: { botToken: string; guildId: string; webhookUrl: string; enabled: boolean };
}

// ── CONFIG ────────────────────────────────────────────────────────────────────

const config: S2SConfig = {
  tiktok: {
    pixelId: process.env.TIKTOK_PIXEL_ID || '',
    accessToken: process.env.TIKTOK_ACCESS_TOKEN || '',
    enabled: !!(process.env.TIKTOK_PIXEL_ID && process.env.TIKTOK_ACCESS_TOKEN),
  },
  meta: {
    pixelId: process.env.META_PIXEL_ID || '',
    accessToken: process.env.META_ACCESS_TOKEN || '',
    enabled: !!(process.env.META_PIXEL_ID && process.env.META_ACCESS_TOKEN),
  },
  google: {
    customerId: process.env.GOOGLE_ADS_CUSTOMER_ID || '',
    conversionActionId: process.env.GOOGLE_ADS_CONVERSION_ACTION_ID || '',
    enabled: !!(process.env.GOOGLE_ADS_CUSTOMER_ID),
  },
  discord: {
    botToken: process.env.DISCORD_BOT_TOKEN || '',
    guildId: process.env.DISCORD_GUILD_ID || '',
    webhookUrl: process.env.DISCORD_WEBHOOK_URL || '',
    enabled: !!(process.env.DISCORD_BOT_TOKEN && process.env.DISCORD_GUILD_ID),
  },
};

// ── HASHING ───────────────────────────────────────────────────────────────────

async function sha256(value: string): Promise<string> {
  const crypto = await import('crypto');
  return crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
}

// ── TIKTOK EVENTS API ─────────────────────────────────────────────────────────
// Docs: https://business-api.tiktok.com/open_api/docs/page/1739584855862274

async function fireTikTokEvent(event: ConversionEvent): Promise<boolean> {
  if (!config.tiktok.enabled) return false;

  const eventMap: Record<string, string> = {
    signup: 'CompleteRegistration',
    install: 'Download',
    purchase: 'Purchase',
    lead: 'SubmitForm',
    campaign_start: 'InitiateCheckout',
    discord_join: 'AddToCart', // Closest standard event for community join
  };

  try {
    const payload = {
      pixel_code: config.tiktok.pixelId,
      event: eventMap[event.eventType] || 'CompleteRegistration',
      event_id: event.eventId,
      timestamp: new Date(event.timestamp).toISOString(),
      context: {
        user: {
          ...(event.hashedEmail && { email: event.hashedEmail }),
          ...(event.hashedPhone && { phone: event.hashedPhone }),
        },
        ip: event.ipAddress || '',
        user_agent: event.userAgent || '',
      },
      properties: {
        ...(event.value && { value: event.value, currency: event.currency || 'USD' }),
        content_type: 'product',
        contents: [{
          content_id: event.campaignId,
          content_name: event.utmCampaign,
        }],
      },
      ...(event.ttclid && { ttclid: event.ttclid }),
    };

    const res = await fetch('https://business-api.tiktok.com/open_api/v1.3/event/track/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': config.tiktok.accessToken,
      },
      body: JSON.stringify({ data: [payload] }),
    });

    const data = await res.json();
    console.log(`[s2s-tiktok] ${event.eventType} fired:`, data.code === 0 ? 'success' : data.message);
    return data.code === 0;
  } catch (err) {
    console.error('[s2s-tiktok] Error:', err);
    return false;
  }
}

// ── META CONVERSIONS API (CAPI) ───────────────────────────────────────────────
// Docs: https://developers.facebook.com/docs/marketing-api/conversions-api

async function fireMetaEvent(event: ConversionEvent): Promise<boolean> {
  if (!config.meta.enabled) return false;

  const eventMap: Record<string, string> = {
    signup: 'CompleteRegistration',
    install: 'Lead',
    purchase: 'Purchase',
    lead: 'Lead',
    campaign_start: 'InitiateCheckout',
    discord_join: 'Contact',
  };

  try {
    const payload = {
      data: [{
        event_name: eventMap[event.eventType] || 'Lead',
        event_time: Math.floor(new Date(event.timestamp).getTime() / 1000),
        event_id: event.eventId,
        action_source: 'website',
        user_data: {
          ...(event.hashedEmail && { em: [event.hashedEmail] }),
          ...(event.hashedPhone && { ph: [event.hashedPhone] }),
          client_ip_address: event.ipAddress || undefined,
          client_user_agent: event.userAgent || undefined,
          ...(event.fbclid && { fbc: `fb.1.${Date.now()}.${event.fbclid}` }),
        },
        custom_data: {
          ...(event.value && { value: event.value, currency: event.currency || 'USD' }),
          content_ids: [event.campaignId],
          content_type: 'product',
          campaign_id: event.utmCampaign,
          creator_id: event.creatorId,
        },
      }],
    };

    const res = await fetch(
      `https://graph.facebook.com/v19.0/${config.meta.pixelId}/events?access_token=${config.meta.accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    console.log(`[s2s-meta] ${event.eventType} fired:`, data.events_received ? 'success' : data.error?.message);
    return !!data.events_received;
  } catch (err) {
    console.error('[s2s-meta] Error:', err);
    return false;
  }
}

// ── GOOGLE ADS OFFLINE CONVERSIONS ────────────────────────────────────────────

async function fireGoogleEvent(event: ConversionEvent): Promise<boolean> {
  if (!config.google.enabled || !event.gclid) return false;

  // Google Ads offline conversions require OAuth2 + Google Ads API
  // For now, log the conversion for manual upload or future API integration
  console.log(`[s2s-google] Conversion logged for manual upload: gclid=${event.gclid}, event=${event.eventType}, value=${event.value}`);

  // TODO: Implement Google Ads API v15 OfflineConversionUploadService
  // Requires: OAuth2 token, developer token, customer ID
  return true;
}

// ── DISCORD TRACKING ──────────────────────────────────────────────────────────
// Track server joins via unique invite codes per creator
// Each creator gets a unique Discord invite → joins attributed to that creator

export interface DiscordInviteTracking {
  inviteCode: string;
  creatorId: string;
  creatorHandle: string;
  campaignId: string;
  uses: number;
  maxUses: number;
  createdAt: string;
}

async function handleDiscordJoin(event: ConversionEvent): Promise<boolean> {
  if (!config.discord.enabled || !event.discordInviteCode) return false;

  try {
    // Log the join attribution
    console.log(`[s2s-discord] Join attributed: invite=${event.discordInviteCode}, creator=${event.creatorHandle}, user=${event.discordUserId}`);

    // Fire webhook notification
    if (config.discord.webhookUrl) {
      await fetch(config.discord.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: null,
          embeds: [{
            title: '🎮 New Member Joined via Creator',
            color: 0x9333EA, // Brand purple
            fields: [
              { name: 'Creator', value: event.creatorHandle, inline: true },
              { name: 'Campaign', value: event.utmCampaign, inline: true },
              { name: 'Invite Code', value: event.discordInviteCode, inline: true },
            ],
            timestamp: event.timestamp,
          }],
        }),
      });
    }

    return true;
  } catch (err) {
    console.error('[s2s-discord] Error:', err);
    return false;
  }
}

// Create a tracked Discord invite for a creator
export async function createCreatorDiscordInvite(
  creatorId: string,
  creatorHandle: string,
  campaignId: string,
  channelId: string
): Promise<DiscordInviteTracking | null> {
  if (!config.discord.enabled) return null;

  try {
    const res = await fetch(`https://discord.com/api/v10/channels/${channelId}/invites`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${config.discord.botToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        max_age: 0, // Never expires
        max_uses: 0, // Unlimited
        unique: true,
        target_type: undefined,
      }),
    });

    if (!res.ok) return null;
    const invite = await res.json();

    return {
      inviteCode: invite.code,
      creatorId,
      creatorHandle,
      campaignId,
      uses: 0,
      maxUses: 0,
      createdAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error('[s2s-discord] Create invite error:', err);
    return null;
  }
}

// ── CREATIVE ANALYTICS ────────────────────────────────────────────────────────
// Track which creative formats, hooks, and content styles drive conversions
// Feeds back into creator selection and brief optimization

export interface CreativeMetrics {
  creativeId: string;
  creatorId: string;
  campaignId: string;
  // Content metadata
  platform: 'tiktok' | 'youtube' | 'twitch' | 'instagram';
  format: 'short_video' | 'long_video' | 'live_stream' | 'story' | 'post' | 'clip';
  duration: number; // seconds
  hookType: 'question' | 'challenge' | 'reaction' | 'tutorial' | 'story' | 'gameplay' | 'review';
  cta: string; // what CTA was used
  // Performance
  impressions: number;
  views: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cvr: number;
  cpc: number;
  cpa: number;
  roas: number;
  // Engagement
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  engagementRate: number;
  // Watch metrics
  avgWatchTime: number; // seconds
  completionRate: number; // percentage
  dropoffPoint: number; // seconds where most people leave
  // Attribution
  viewThroughConversions: number;
  clickThroughConversions: number;
  assistedConversions: number;
  // Creative insights (AI-derived)
  topPerformingHook: string;
  audienceResonance: number; // 0-100
  brandSafetyScore: number; // 0-100
  viralCoefficient: number; // shares/views ratio
}

export interface CreativeInsight {
  id: string;
  campaignId: string;
  market: string;
  insight: string;
  recommendation: string;
  confidence: number;
  dataSource: string;
  createdAt: string;
}

// Analyze creative performance and generate insights
export function analyzeCreativePerformance(metrics: CreativeMetrics[]): CreativeInsight[] {
  const insights: CreativeInsight[] = [];

  if (metrics.length === 0) return insights;

  // Best performing format
  const byFormat = new Map<string, { conversions: number; count: number }>();
  metrics.forEach(m => {
    const existing = byFormat.get(m.format) || { conversions: 0, count: 0 };
    byFormat.set(m.format, { conversions: existing.conversions + m.conversions, count: existing.count + 1 });
  });

  let bestFormat = '';
  let bestFormatCVR = 0;
  byFormat.forEach((data, format) => {
    const avgCVR = data.conversions / data.count;
    if (avgCVR > bestFormatCVR) { bestFormat = format; bestFormatCVR = avgCVR; }
  });

  if (bestFormat) {
    insights.push({
      id: `insight_format_${Date.now()}`,
      campaignId: metrics[0].campaignId,
      market: '',
      insight: `${bestFormat.replace(/_/g, ' ')} content converts ${((bestFormatCVR / (metrics.reduce((s, m) => s + m.cvr, 0) / metrics.length)) * 100 - 100).toFixed(0)}% better than average`,
      recommendation: `Prioritize ${bestFormat.replace(/_/g, ' ')} format in next campaign brief. Brief creators specifically on this format.`,
      confidence: Math.min(95, 60 + metrics.length * 2),
      dataSource: `${metrics.length} creatives analyzed`,
      createdAt: new Date().toISOString(),
    });
  }

  // Best performing hook type
  const byHook = new Map<string, { cvr: number; count: number }>();
  metrics.forEach(m => {
    const existing = byHook.get(m.hookType) || { cvr: 0, count: 0 };
    byHook.set(m.hookType, { cvr: existing.cvr + m.cvr, count: existing.count + 1 });
  });

  let bestHook = '';
  let bestHookCVR = 0;
  byHook.forEach((data, hook) => {
    const avgCVR = data.cvr / data.count;
    if (avgCVR > bestHookCVR) { bestHook = hook; bestHookCVR = avgCVR; }
  });

  if (bestHook) {
    insights.push({
      id: `insight_hook_${Date.now()}`,
      campaignId: metrics[0].campaignId,
      market: '',
      insight: `"${bestHook}" hooks drive the highest conversion rate across this campaign`,
      recommendation: `Include "${bestHook}" as the required hook style in creator briefs. This is what makes audiences act.`,
      confidence: Math.min(90, 55 + metrics.length * 2),
      dataSource: `${metrics.length} creatives, ${byHook.get(bestHook)?.count} using this hook`,
      createdAt: new Date().toISOString(),
    });
  }

  // Optimal video length
  const avgDurationConverters = metrics
    .filter(m => m.conversions > 0)
    .reduce((s, m) => s + m.duration, 0) / Math.max(1, metrics.filter(m => m.conversions > 0).length);

  if (avgDurationConverters > 0) {
    insights.push({
      id: `insight_duration_${Date.now()}`,
      campaignId: metrics[0].campaignId,
      market: '',
      insight: `Converting content averages ${Math.round(avgDurationConverters)}s — ${avgDurationConverters > 60 ? 'longer form works here' : 'short and punchy wins'}`,
      recommendation: `Brief creators for ${Math.round(avgDurationConverters - 5)}-${Math.round(avgDurationConverters + 10)}s content length. Outside this range, conversion drops.`,
      confidence: 72,
      dataSource: `${metrics.filter(m => m.conversions > 0).length} converting creatives`,
      createdAt: new Date().toISOString(),
    });
  }

  // Engagement vs Conversion correlation
  const highEngLowConv = metrics.filter(m => m.engagementRate > 10 && m.cvr < 1);
  const lowEngHighConv = metrics.filter(m => m.engagementRate < 5 && m.cvr > 2);

  if (highEngLowConv.length > 3) {
    insights.push({
      id: `insight_eng_vs_conv_${Date.now()}`,
      campaignId: metrics[0].campaignId,
      market: '',
      insight: `${highEngLowConv.length} creatives have high engagement (10%+) but low conversion (<1%) — entertainment without action`,
      recommendation: `These creators need stronger CTAs in their content. Add CTA requirements to brief: "mention the link/code at least twice."`,
      confidence: 80,
      dataSource: `${highEngLowConv.length} high-eng/low-conv creatives identified`,
      createdAt: new Date().toISOString(),
    });
  }

  return insights;
}

// ── MAIN CONVERSION HANDLER ───────────────────────────────────────────────────

export async function fireConversion(event: ConversionEvent): Promise<{
  tiktok: boolean;
  meta: boolean;
  google: boolean;
  discord: boolean;
}> {
  // Hash PII before sending to ad platforms
  if (event.hashedEmail && !event.hashedEmail.match(/^[a-f0-9]{64}$/)) {
    event.hashedEmail = await sha256(event.hashedEmail);
  }
  if (event.hashedPhone && !event.hashedPhone.match(/^[a-f0-9]{64}$/)) {
    event.hashedPhone = await sha256(event.hashedPhone);
  }

  // Fire to all configured platforms in parallel
  const [tiktok, meta, google, discord] = await Promise.all([
    fireTikTokEvent(event),
    fireMetaEvent(event),
    fireGoogleEvent(event),
    event.eventType === 'discord_join' ? handleDiscordJoin(event) : Promise.resolve(false),
  ]);

  console.log(`[s2s] Conversion fired: type=${event.eventType}, creator=${event.creatorHandle}, results: TT=${tiktok} META=${meta} GOOG=${google} DISC=${discord}`);

  return { tiktok, meta, google, discord };
}

// ── UTM LINK GENERATOR ────────────────────────────────────────────────────────

export function generateCreatorTrackingLink(params: {
  creatorId: string;
  creatorHandle: string;
  campaignId: string;
  baseUrl: string;
  discordInviteCode?: string;
}): CreatorTrackingLink {
  const utmSource = 'gamefluence';
  const utmMedium = 'creator_campaign';
  const utmCampaign = params.campaignId;
  const utmContent = params.creatorHandle;

  const url = new URL(params.baseUrl);
  url.searchParams.set('utm_source', utmSource);
  url.searchParams.set('utm_medium', utmMedium);
  url.searchParams.set('utm_campaign', utmCampaign);
  url.searchParams.set('utm_content', utmContent);
  url.searchParams.set('ref', params.creatorId);

  return {
    creatorId: params.creatorId,
    creatorHandle: params.creatorHandle,
    campaignId: params.campaignId,
    baseUrl: params.baseUrl,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    discordInviteCode: params.discordInviteCode,
    fullUrl: url.toString(),
  };
}
