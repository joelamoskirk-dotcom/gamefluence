// Twitch Helix API Integration for Gamefluence
// Server-side Twitch API client with OAuth2 app access token management

export interface TwitchChannel {
  id: string;
  login: string;
  displayName: string;
  type: string;
  broadcasterType: 'partner' | 'affiliate' | '';
  description: string;
  profileImageUrl: string;
  offlineImageUrl: string;
  viewCount: number;
  createdAt: string;
}

export interface TwitchStream {
  id: string;
  userId: string;
  userName: string;
  gameId: string;
  gameName: string;
  type: 'live' | '';
  title: string;
  viewerCount: number;
  startedAt: string;
  language: string;
  thumbnailUrl: string;
  tags: string[];
  isMature: boolean;
}

export interface TwitchClip {
  id: string;
  url: string;
  embedUrl: string;
  broadcasterId: string;
  broadcasterName: string;
  creatorId: string;
  creatorName: string;
  videoId: string;
  gameId: string;
  language: string;
  title: string;
  viewCount: number;
  createdAt: string;
  thumbnailUrl: string;
  duration: number;
}

export interface TwitchVideo {
  id: string;
  streamId: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  createdAt: string;
  publishedAt: string;
  url: string;
  thumbnailUrl: string;
  viewable: string;
  viewCount: number;
  language: string;
  type: 'upload' | 'archive' | 'highlight';
  duration: string;
}

export interface TwitchFollowerCount {
  total: number;
  userId: string;
}

export interface TwitchSchedule {
  segments: {
    id: string;
    startTime: string;
    endTime: string;
    title: string;
    canceledUntil: string | null;
    category: { id: string; name: string } | null;
    isRecurring: boolean;
  }[];
  broadcasterId: string;
  broadcasterName: string;
  broadcasterLogin: string;
}

export interface TwitchCreatorProfile {
  channel: TwitchChannel;
  stream: TwitchStream | null;
  followers: number;
  recentClips: TwitchClip[];
  recentVideos: TwitchVideo[];
  schedule: TwitchSchedule | null;
  analytics: TwitchChannelAnalytics;
}

export interface TwitchChannelAnalytics {
  avgViewers: number;
  peakViewers: number;
  totalStreamHours: number;
  avgStreamDuration: number; // minutes
  topGames: { gameId: string; gameName: string; hoursPlayed: number }[];
  streamFrequency: number; // streams per week
  followerGrowthRate: number; // percentage per month
  chatEngagementRate: number; // messages per viewer per hour
}

// ── Token Management ──────────────────────────────────────────────────────────

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAppAccessToken(): Promise<string> {
  // Return cached token if still valid (with 5 min buffer)
  if (cachedToken && cachedToken.expiresAt > Date.now() + 300_000) {
    return cachedToken.token;
  }

  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET must be set');
  }

  const res = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    }),
  });

  if (!res.ok) {
    throw new Error(`Twitch OAuth failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return cachedToken.token;
}

// ── Helix API Calls ───────────────────────────────────────────────────────────

async function helixGet<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const clientId = process.env.TWITCH_CLIENT_ID;
  if (!clientId) throw new Error('TWITCH_CLIENT_ID must be set');

  const token = await getAppAccessToken();
  const url = new URL(`https://api.twitch.tv/helix/${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Client-Id': clientId,
    },
    next: { revalidate: 60 }, // Cache for 60 seconds in Next.js
  });

  if (!res.ok) {
    throw new Error(`Twitch Helix ${endpoint}: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function getChannel(login: string): Promise<TwitchChannel | null> {
  try {
    const data = await helixGet<{ data: TwitchChannel[] }>('users', { login });
    return data.data[0] || null;
  } catch (err) {
    console.warn(`[twitch-api] getChannel(${login}) failed:`, err);
    return null;
  }
}

export async function getChannelById(userId: string): Promise<TwitchChannel | null> {
  try {
    const data = await helixGet<{ data: TwitchChannel[] }>('users', { id: userId });
    return data.data[0] || null;
  } catch (err) {
    console.warn(`[twitch-api] getChannelById(${userId}) failed:`, err);
    return null;
  }
}

export async function getStream(userId: string): Promise<TwitchStream | null> {
  try {
    const data = await helixGet<{ data: TwitchStream[] }>('streams', { user_id: userId });
    return data.data[0] || null;
  } catch (err) {
    console.warn(`[twitch-api] getStream(${userId}) failed:`, err);
    return null;
  }
}

export async function getStreamByLogin(login: string): Promise<TwitchStream | null> {
  try {
    const data = await helixGet<{ data: TwitchStream[] }>('streams', { user_login: login });
    return data.data[0] || null;
  } catch (err) {
    console.warn(`[twitch-api] getStreamByLogin(${login}) failed:`, err);
    return null;
  }
}

export async function getFollowerCount(broadcasterId: string): Promise<number> {
  try {
    const data = await helixGet<{ total: number }>('channels/followers', {
      broadcaster_id: broadcasterId,
    });
    return data.total;
  } catch (err) {
    console.warn(`[twitch-api] getFollowerCount(${broadcasterId}) failed:`, err);
    return 0;
  }
}

export async function getClips(
  broadcasterId: string,
  options?: { first?: number; startedAt?: string; endedAt?: string }
): Promise<TwitchClip[]> {
  try {
    const params: Record<string, string> = {
      broadcaster_id: broadcasterId,
      first: String(options?.first || 10),
    };
    if (options?.startedAt) params.started_at = options.startedAt;
    if (options?.endedAt) params.ended_at = options.endedAt;

    const data = await helixGet<{ data: TwitchClip[] }>('clips', params);
    return data.data;
  } catch (err) {
    console.warn(`[twitch-api] getClips(${broadcasterId}) failed:`, err);
    return [];
  }
}

export async function getVideos(
  userId: string,
  options?: { first?: number; type?: 'upload' | 'archive' | 'highlight' }
): Promise<TwitchVideo[]> {
  try {
    const params: Record<string, string> = {
      user_id: userId,
      first: String(options?.first || 10),
    };
    if (options?.type) params.type = options.type;

    const data = await helixGet<{ data: TwitchVideo[] }>('videos', params);
    return data.data;
  } catch (err) {
    console.warn(`[twitch-api] getVideos(${userId}) failed:`, err);
    return [];
  }
}

export async function getSchedule(broadcasterId: string): Promise<TwitchSchedule | null> {
  try {
    const data = await helixGet<{ data: TwitchSchedule }>('schedule', {
      broadcaster_id: broadcasterId,
    });
    return data.data;
  } catch (err) {
    console.warn(`[twitch-api] getSchedule(${broadcasterId}) failed:`, err);
    return null;
  }
}

export async function searchChannels(
  query: string,
  options?: { first?: number; liveOnly?: boolean }
): Promise<TwitchChannel[]> {
  try {
    const params: Record<string, string> = {
      query,
      first: String(options?.first || 20),
    };
    if (options?.liveOnly) params.live_only = 'true';

    const data = await helixGet<{ data: TwitchChannel[] }>('search/channels', params);
    return data.data;
  } catch (err) {
    console.warn(`[twitch-api] searchChannels(${query}) failed:`, err);
    return [];
  }
}

// ── Full Creator Profile ──────────────────────────────────────────────────────

export async function getCreatorProfile(login: string): Promise<TwitchCreatorProfile | null> {
  const channel = await getChannel(login);
  if (!channel) return null;

  const [stream, followers, clips, videos, schedule] = await Promise.all([
    getStream(channel.id),
    getFollowerCount(channel.id),
    getClips(channel.id, { first: 5 }),
    getVideos(channel.id, { first: 10, type: 'archive' }),
    getSchedule(channel.id),
  ]);

  // Compute analytics from available video data
  const analytics = computeAnalytics(videos, stream);

  return {
    channel,
    stream,
    followers,
    recentClips: clips,
    recentVideos: videos,
    schedule,
    analytics,
  };
}

// ── Analytics Computation ─────────────────────────────────────────────────────

function computeAnalytics(
  videos: TwitchVideo[],
  currentStream: TwitchStream | null
): TwitchChannelAnalytics {
  const archiveVideos = videos.filter((v) => v.type === 'archive');

  // Parse duration strings like "3h24m10s"
  const parseDuration = (d: string): number => {
    const hours = d.match(/(\d+)h/)?.[1] ? parseInt(d.match(/(\d+)h/)![1]) : 0;
    const minutes = d.match(/(\d+)m/)?.[1] ? parseInt(d.match(/(\d+)m/)![1]) : 0;
    return hours * 60 + minutes;
  };

  const durations = archiveVideos.map((v) => parseDuration(v.duration));
  const totalMinutes = durations.reduce((sum, d) => sum + d, 0);
  const avgDuration = durations.length > 0 ? totalMinutes / durations.length : 0;
  const totalHours = totalMinutes / 60;

  // Estimate stream frequency from archive dates
  let streamFrequency = 0;
  if (archiveVideos.length >= 2) {
    const dates = archiveVideos.map((v) => new Date(v.createdAt).getTime()).sort();
    const spanDays = (dates[dates.length - 1] - dates[0]) / (1000 * 60 * 60 * 24);
    streamFrequency = spanDays > 0 ? (archiveVideos.length / spanDays) * 7 : 0;
  }

  const avgViewers = archiveVideos.length > 0
    ? archiveVideos.reduce((sum, v) => sum + v.viewCount, 0) / archiveVideos.length
    : 0;

  return {
    avgViewers: Math.round(avgViewers),
    peakViewers: currentStream?.viewerCount || Math.round(avgViewers * 1.5),
    totalStreamHours: Math.round(totalHours),
    avgStreamDuration: Math.round(avgDuration),
    topGames: [], // Would need game data correlation
    streamFrequency: Math.round(streamFrequency * 10) / 10,
    followerGrowthRate: 0, // Requires historical data
    chatEngagementRate: 0, // Requires EventSub or chat data
  };
}

// ── Fallback Data (for when API is unavailable) ───────────────────────────────

export function getFallbackCreatorProfile(login: string): TwitchCreatorProfile {
  const hash = login.split('').reduce((h, c) => (Math.imul(31, h) + c.charCodeAt(0)) | 0, 0);
  const seed = Math.abs(hash);

  return {
    channel: {
      id: `fallback_${seed % 100000}`,
      login,
      displayName: login.charAt(0).toUpperCase() + login.slice(1),
      type: '',
      broadcasterType: seed % 3 === 0 ? 'partner' : seed % 3 === 1 ? 'affiliate' : '',
      description: `Gaming content creator specializing in APAC markets.`,
      profileImageUrl: '',
      offlineImageUrl: '',
      viewCount: 50000 + (seed % 500000),
      createdAt: '2020-01-15T00:00:00Z',
    },
    stream: null,
    followers: 10000 + (seed % 200000),
    recentClips: [],
    recentVideos: [],
    schedule: null,
    analytics: {
      avgViewers: 200 + (seed % 5000),
      peakViewers: 500 + (seed % 15000),
      totalStreamHours: 100 + (seed % 500),
      avgStreamDuration: 120 + (seed % 180),
      topGames: [
        { gameId: '1', gameName: 'Mobile Legends', hoursPlayed: 50 + (seed % 100) },
        { gameId: '2', gameName: 'Free Fire', hoursPlayed: 30 + (seed % 80) },
      ],
      streamFrequency: 3 + (seed % 4),
      followerGrowthRate: 2 + (seed % 8),
      chatEngagementRate: 5 + (seed % 15),
    },
  };
}
