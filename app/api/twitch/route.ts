// Twitch API Proxy Route
// Handles server-side Twitch Helix API calls to keep credentials secure

import { NextRequest, NextResponse } from 'next/server';
import {
  getChannel,
  getStream,
  getStreamByLogin,
  getFollowerCount,
  getClips,
  getVideos,
  getSchedule,
  getCreatorProfile,
  searchChannels,
  getFallbackCreatorProfile,
} from '@/lib/twitch-api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  if (!action) {
    return NextResponse.json({ error: 'Missing action parameter' }, { status: 400 });
  }

  // Check if Twitch credentials are configured
  const hasCredentials = process.env.TWITCH_CLIENT_ID && process.env.TWITCH_CLIENT_SECRET;

  try {
    switch (action) {
      case 'channel': {
        const login = searchParams.get('login');
        if (!login) return NextResponse.json({ error: 'Missing login parameter' }, { status: 400 });

        if (!hasCredentials) {
          return NextResponse.json({ data: getFallbackCreatorProfile(login).channel, fallback: true });
        }

        const channel = await getChannel(login);
        return NextResponse.json({ data: channel });
      }

      case 'stream': {
        const login = searchParams.get('login');
        const userId = searchParams.get('user_id');
        if (!login && !userId) {
          return NextResponse.json({ error: 'Missing login or user_id parameter' }, { status: 400 });
        }

        if (!hasCredentials) {
          return NextResponse.json({ data: null, fallback: true });
        }

        const stream = login ? await getStreamByLogin(login) : await getStream(userId!);
        return NextResponse.json({ data: stream });
      }

      case 'followers': {
        const broadcasterId = searchParams.get('broadcaster_id');
        if (!broadcasterId) {
          return NextResponse.json({ error: 'Missing broadcaster_id parameter' }, { status: 400 });
        }

        if (!hasCredentials) {
          return NextResponse.json({ data: { total: 0 }, fallback: true });
        }

        const total = await getFollowerCount(broadcasterId);
        return NextResponse.json({ data: { total } });
      }

      case 'clips': {
        const broadcasterId = searchParams.get('broadcaster_id');
        if (!broadcasterId) {
          return NextResponse.json({ error: 'Missing broadcaster_id parameter' }, { status: 400 });
        }

        if (!hasCredentials) {
          return NextResponse.json({ data: [], fallback: true });
        }

        const first = searchParams.get('first');
        const clips = await getClips(broadcasterId, { first: first ? parseInt(first) : 10 });
        return NextResponse.json({ data: clips });
      }

      case 'videos': {
        const userId = searchParams.get('user_id');
        if (!userId) {
          return NextResponse.json({ error: 'Missing user_id parameter' }, { status: 400 });
        }

        if (!hasCredentials) {
          return NextResponse.json({ data: [], fallback: true });
        }

        const type = searchParams.get('type') as 'upload' | 'archive' | 'highlight' | undefined;
        const first = searchParams.get('first');
        const videos = await getVideos(userId, {
          first: first ? parseInt(first) : 10,
          type: type || undefined,
        });
        return NextResponse.json({ data: videos });
      }

      case 'schedule': {
        const broadcasterId = searchParams.get('broadcaster_id');
        if (!broadcasterId) {
          return NextResponse.json({ error: 'Missing broadcaster_id parameter' }, { status: 400 });
        }

        if (!hasCredentials) {
          return NextResponse.json({ data: null, fallback: true });
        }

        const schedule = await getSchedule(broadcasterId);
        return NextResponse.json({ data: schedule });
      }

      case 'profile': {
        const login = searchParams.get('login');
        if (!login) return NextResponse.json({ error: 'Missing login parameter' }, { status: 400 });

        if (!hasCredentials) {
          return NextResponse.json({ data: getFallbackCreatorProfile(login), fallback: true });
        }

        const profile = await getCreatorProfile(login);
        return NextResponse.json({ data: profile });
      }

      case 'search': {
        const query = searchParams.get('query');
        if (!query) return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });

        if (!hasCredentials) {
          return NextResponse.json({ data: [], fallback: true });
        }

        const liveOnly = searchParams.get('live_only') === 'true';
        const first = searchParams.get('first');
        const results = await searchChannels(query, {
          first: first ? parseInt(first) : 20,
          liveOnly,
        });
        return NextResponse.json({ data: results });
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (error) {
    console.error(`[api/twitch] Error for action=${action}:`, error);

    // Return fallback data on error so UI doesn't break
    const login = searchParams.get('login');
    if (action === 'profile' && login) {
      return NextResponse.json({ data: getFallbackCreatorProfile(login), fallback: true });
    }

    return NextResponse.json(
      { error: 'Twitch API error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 502 }
    );
  }
}
