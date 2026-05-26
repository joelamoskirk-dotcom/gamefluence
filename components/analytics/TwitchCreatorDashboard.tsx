'use client';

import React, { useState, useEffect } from 'react';
import {
  Twitch,
  Users,
  Eye,
  Clock,
  TrendingUp,
  Play,
  Calendar,
  Video,
  Scissors,
  Radio,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import {
  fetchCreatorProfile,
  fetchStream,
  formatViewerCount,
  getStreamDuration,
  getBroadcasterBadge,
} from '@/lib/twitch-client';
import type { TwitchCreatorProfile, TwitchStream } from '@/lib/twitch-client';

interface TwitchCreatorDashboardProps {
  twitchLogin: string;
  creatorName?: string;
}

export default function TwitchCreatorDashboard({
  twitchLogin,
  creatorName,
}: TwitchCreatorDashboardProps) {
  const [profile, setProfile] = useState<TwitchCreatorProfile | null>(null);
  const [liveStream, setLiveStream] = useState<TwitchStream | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCreatorProfile(twitchLogin);
      setProfile(data);
      if (data?.stream) {
        setLiveStream(data.stream);
      }
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Twitch data');
    } finally {
      setLoading(false);
    }
  };

  const refreshLiveStatus = async () => {
    try {
      const stream = await fetchStream(twitchLogin);
      setLiveStream(stream);
    } catch {
      // Silently fail on refresh
    }
  };

  useEffect(() => {
    loadProfile();
    // Poll live status every 60 seconds
    const interval = setInterval(refreshLiveStatus, 60_000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [twitchLogin]);

  if (loading) {
    return (
      <div className="card animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-200 rounded" />
          <div className="h-6 w-48 bg-gray-200 rounded" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card border-red-200 bg-red-50">
        <div className="flex items-center gap-2 text-red-600">
          <Twitch size={20} />
          <span className="font-medium">Twitch data unavailable</span>
        </div>
        <p className="text-sm text-red-500 mt-1">{error}</p>
        <button
          onClick={loadProfile}
          className="mt-3 text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
        >
          <RefreshCw size={14} /> Retry
        </button>
      </div>
    );
  }

  if (!profile) return null;

  const { channel, analytics } = profile;
  const badge = getBroadcasterBadge(channel.broadcasterType);

  return (
    <div className="card border-purple-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#9146FF] rounded-lg flex items-center justify-center">
            <Twitch size={22} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg">
                {channel.displayName || creatorName}
              </h3>
              {badge && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${badge.color}`}>
                  {badge.label}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">@{channel.login}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-xs text-gray-400">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={loadProfile}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh data"
          >
            <RefreshCw size={16} className="text-gray-500" />
          </button>
          <a
            href={`https://twitch.tv/${channel.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
            title="Open Twitch channel"
          >
            <ExternalLink size={16} className="text-[#9146FF]" />
          </a>
        </div>
      </div>

      {/* Live Status Banner */}
      {liveStream && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Radio size={16} className="text-red-500 animate-pulse" />
                <span className="text-sm font-bold text-red-600 uppercase">Live</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{liveStream.title}</p>
                <p className="text-sm text-gray-600">
                  Playing {liveStream.gameName} • {getStreamDuration(liveStream.startedAt)} uptime
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-red-600">
                {formatViewerCount(liveStream.viewerCount)}
              </p>
              <p className="text-xs text-gray-500">viewers</p>
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard
          icon={<Users size={18} className="text-purple-500" />}
          label="Followers"
          value={formatViewerCount(profile.followers)}
          trend={analytics.followerGrowthRate > 0 ? `+${analytics.followerGrowthRate}%/mo` : undefined}
        />
        <MetricCard
          icon={<Eye size={18} className="text-blue-500" />}
          label="Avg Viewers"
          value={formatViewerCount(analytics.avgViewers)}
          subtext={`Peak: ${formatViewerCount(analytics.peakViewers)}`}
        />
        <MetricCard
          icon={<Clock size={18} className="text-green-500" />}
          label="Avg Stream"
          value={`${Math.floor(analytics.avgStreamDuration / 60)}h ${analytics.avgStreamDuration % 60}m`}
          subtext={`${analytics.totalStreamHours}h total`}
        />
        <MetricCard
          icon={<Calendar size={18} className="text-orange-500" />}
          label="Frequency"
          value={`${analytics.streamFrequency}/week`}
          subtext="streams"
        />
      </div>

      {/* Top Games */}
      {analytics.topGames.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Play size={14} /> Top Games Streamed
          </h4>
          <div className="flex flex-wrap gap-2">
            {analytics.topGames.map((game) => (
              <span
                key={game.gameId}
                className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium"
              >
                {game.gameName}
                <span className="text-purple-400 ml-1">({game.hoursPlayed}h)</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recent Content */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Recent Clips */}
        {profile.recentClips.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Scissors size={14} /> Top Clips
            </h4>
            <div className="space-y-2">
              {profile.recentClips.slice(0, 3).map((clip) => (
                <a
                  key={clip.id}
                  href={clip.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <p className="text-sm font-medium text-gray-800 truncate">{clip.title}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span>{formatViewerCount(clip.viewCount)} views</span>
                    <span>{Math.round(clip.duration)}s</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Recent VODs */}
        {profile.recentVideos.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Video size={14} /> Recent Streams
            </h4>
            <div className="space-y-2">
              {profile.recentVideos.slice(0, 3).map((video) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <p className="text-sm font-medium text-gray-800 truncate">{video.title}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span>{formatViewerCount(video.viewCount)} views</span>
                    <span>{video.duration}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Schedule */}
      {profile.schedule && profile.schedule.segments.length > 0 && (
        <div className="mt-6 pt-4 border-t">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Calendar size={14} /> Upcoming Schedule
          </h4>
          <div className="space-y-2">
            {profile.schedule.segments.slice(0, 3).map((segment) => (
              <div
                key={segment.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium">{segment.title}</p>
                  {segment.category && (
                    <p className="text-xs text-gray-500">{segment.category.name}</p>
                  )}
                </div>
                <div className="text-right text-xs text-gray-500">
                  <p>{new Date(segment.startTime).toLocaleDateString()}</p>
                  <p>{new Date(segment.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Engagement Score */}
      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-green-500" />
            <span className="text-sm font-medium text-gray-700">Gamefluence Score</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: `${Math.min(100, (analytics.avgViewers / 100) + (profile.followers / 5000))}%` }}
              />
            </div>
            <span className="text-sm font-bold text-purple-600">
              {Math.min(100, Math.round((analytics.avgViewers / 100) + (profile.followers / 5000)))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function MetricCard({
  icon,
  label,
  value,
  trend,
  subtext,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
  subtext?: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <p className="text-lg font-bold text-gray-900">{value}</p>
      {trend && (
        <p className="text-xs text-green-600 flex items-center gap-1">
          <TrendingUp size={10} /> {trend}
        </p>
      )}
      {subtext && <p className="text-xs text-gray-400">{subtext}</p>}
    </div>
  );
}
