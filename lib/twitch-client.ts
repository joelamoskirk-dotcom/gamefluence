// Twitch Client - Browser-side API wrapper
// Calls the /api/twitch proxy route to fetch Twitch data securely

import type {
  TwitchChannel,
  TwitchStream,
  TwitchClip,
  TwitchVideo,
  TwitchSchedule,
  TwitchCreatorProfile,
  TwitchChannelAnalytics,
} from './twitch-api';

export type {
  TwitchChannel,
  TwitchStream,
  TwitchClip,
  TwitchVideo,
  TwitchSchedule,
  TwitchCreatorProfile,
  TwitchChannelAnalytics,
};

interface TwitchApiResponse<T> {
  data: T;
  fallback?: boolean;
  error?: string;
}

async function fetchTwitch<T>(params: Record<string, string>): Promise<TwitchApiResponse<T>> {
  const url = new URL('/api/twitch', window.location.origin);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Twitch API error: ${res.status}`);
  }

  return res.json();
}

// ── Public Client API ─────────────────────────────────────────────────────────

export async function fetchChannel(login: string): Promise<TwitchChannel | null> {
  const { data } = await fetchTwitch<TwitchChannel | null>({ action: 'channel', login });
  return data;
}

export async function fetchStream(login: string): Promise<TwitchStream | null> {
  const { data } = await fetchTwitch<TwitchStream | null>({ action: 'stream', login });
  return data;
}

export async function fetchStreamByUserId(userId: string): Promise<TwitchStream | null> {
  const { data } = await fetchTwitch<TwitchStream | null>({ action: 'stream', user_id: userId });
  return data;
}

export async function fetchFollowerCount(broadcasterId: string): Promise<number> {
  const { data } = await fetchTwitch<{ total: number }>({ action: 'followers', broadcaster_id: broadcasterId });
  return data.total;
}

export async function fetchClips(broadcasterId: string, first = 10): Promise<TwitchClip[]> {
  const { data } = await fetchTwitch<TwitchClip[]>({
    action: 'clips',
    broadcaster_id: broadcasterId,
    first: String(first),
  });
  return data;
}

export async function fetchVideos(
  userId: string,
  options?: { first?: number; type?: 'upload' | 'archive' | 'highlight' }
): Promise<TwitchVideo[]> {
  const params: Record<string, string> = { action: 'videos', user_id: userId };
  if (options?.first) params.first = String(options.first);
  if (options?.type) params.type = options.type;

  const { data } = await fetchTwitch<TwitchVideo[]>(params);
  return data;
}

export async function fetchSchedule(broadcasterId: string): Promise<TwitchSchedule | null> {
  const { data } = await fetchTwitch<TwitchSchedule | null>({ action: 'schedule', broadcaster_id: broadcasterId });
  return data;
}

export async function fetchCreatorProfile(login: string): Promise<TwitchCreatorProfile | null> {
  const { data } = await fetchTwitch<TwitchCreatorProfile | null>({ action: 'profile', login });
  return data;
}

export async function searchTwitchChannels(
  query: string,
  options?: { first?: number; liveOnly?: boolean }
): Promise<TwitchChannel[]> {
  const params: Record<string, string> = { action: 'search', query };
  if (options?.first) params.first = String(options.first);
  if (options?.liveOnly) params.live_only = 'true';

  const { data } = await fetchTwitch<TwitchChannel[]>(params);
  return data;
}

// ── Utility Helpers ───────────────────────────────────────────────────────────

export function formatViewerCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}

export function getStreamDuration(startedAt: string): string {
  const start = new Date(startedAt);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

export function getTwitchThumbnailUrl(
  templateUrl: string,
  width = 440,
  height = 248
): string {
  return templateUrl
    .replace('{width}', String(width))
    .replace('{height}', String(height));
}

export function getBroadcasterBadge(type: 'partner' | 'affiliate' | ''): {
  label: string;
  color: string;
} | null {
  switch (type) {
    case 'partner':
      return { label: 'Partner', color: 'bg-purple-500 text-white' };
    case 'affiliate':
      return { label: 'Affiliate', color: 'bg-blue-500 text-white' };
    default:
      return null;
  }
}
