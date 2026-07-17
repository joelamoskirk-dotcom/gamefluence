'use client';

import React from 'react';
import { Users, TrendingUp, Star, Gamepad2, BarChart3, Zap } from 'lucide-react';

export interface CreatorCardData {
  id: string;
  name: string;
  handle: string;
  platform: 'youtube' | 'twitch' | 'tiktok' | 'instagram';
  avatarUrl?: string;
  followerCount: number;
  engagementRate: number;
  gamefluenceScore: number;
  contentMatchPercent: number;
  topGames: string[];
  tier: 'diamond' | 'platinum' | 'gold' | 'silver' | 'bronze';
  market: string;
  avgViews: number;
  recentGrowth: number; // % growth last 30 days
}

const TIER_COLORS = {
  diamond: { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700', badge: 'bg-cyan-100 text-cyan-800' },
  platinum: { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-700', badge: 'bg-gray-200 text-gray-800' },
  gold: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-800' },
  silver: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', badge: 'bg-slate-100 text-slate-700' },
  bronze: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-800' },
};

const PLATFORM_ICONS: Record<string, { icon: string; color: string }> = {
  youtube: { icon: '▶️', color: 'text-red-500' },
  twitch: { icon: '🟣', color: 'text-purple-500' },
  tiktok: { icon: '♪', color: 'text-black' },
  instagram: { icon: '📷', color: 'text-pink-500' },
};

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

function ScoreBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  const percent = Math.min((value / max) * 100, 100);
  return (
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden w-full">
      <div
        className={`h-full rounded-full transition-all ${color}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

function MiniSparkline({ growth }: { growth: number }) {
  // Simple CSS-based sparkline showing trend direction
  const isPositive = growth > 0;
  const bars = [30, 45, 35, 55, 50, 65, 60, 75, 70, isPositive ? 85 : 25];

  return (
    <div className="flex items-end gap-[2px] h-6">
      {bars.map((height, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-sm transition-all ${
            isPositive ? 'bg-green-400' : 'bg-red-300'
          }`}
          style={{ height: `${height}%`, opacity: 0.4 + (i / bars.length) * 0.6 }}
        />
      ))}
    </div>
  );
}

export default function CreatorProfileCard({ creator }: { creator: CreatorCardData }) {
  const tierStyle = TIER_COLORS[creator.tier];
  const platformInfo = PLATFORM_ICONS[creator.platform];

  return (
    <div className={`rounded-xl border-2 ${tierStyle.border} ${tierStyle.bg} overflow-hidden hover:shadow-lg transition-all group`}>
      {/* Top Stats Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center text-2xl border-2 border-gray-600 flex-shrink-0">
            {creator.avatarUrl ? (
              <img src={creator.avatarUrl} alt={creator.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span>{creator.name.charAt(0)}</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-sm truncate">{creator.name}</h3>
              <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${tierStyle.badge}`}>
                {creator.tier.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-400">{platformInfo.icon} @{creator.handle}</span>
              <span className="text-[10px] text-gray-500">• {creator.market}</span>
            </div>
          </div>

          {/* Follower Count - Large */}
          <div className="text-right flex-shrink-0">
            <p className="text-xl font-bold text-white">{formatNumber(creator.followerCount)}</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Followers</p>
          </div>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-3 divide-x divide-gray-200 border-b border-gray-200">
        <div className="p-3 text-center">
          <div className="flex items-center justify-center gap-1">
            <TrendingUp className="w-3 h-3 text-green-500" />
            <span className="text-lg font-bold text-gray-900">{creator.engagementRate}%</span>
          </div>
          <p className="text-[10px] text-gray-500 uppercase mt-0.5">Engagement</p>
        </div>
        <div className="p-3 text-center">
          <div className="flex items-center justify-center gap-1">
            <Star className="w-3 h-3 text-yellow-500" />
            <span className="text-lg font-bold text-gray-900">{creator.gamefluenceScore}</span>
          </div>
          <p className="text-[10px] text-gray-500 uppercase mt-0.5">GF Score</p>
        </div>
        <div className="p-3 text-center">
          <div className="flex items-center justify-center gap-1">
            <Zap className="w-3 h-3 text-purple-500" />
            <span className="text-lg font-bold text-gray-900">{creator.contentMatchPercent}%</span>
          </div>
          <p className="text-[10px] text-gray-500 uppercase mt-0.5">Match</p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="p-4 space-y-3">
        {/* Gamefluence Score Bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-600 font-medium">Gamefluence Score</span>
            <span className="font-bold text-gray-900">{creator.gamefluenceScore}/100</span>
          </div>
          <ScoreBar value={creator.gamefluenceScore} color="bg-gradient-to-r from-primary to-purple-500" />
        </div>

        {/* Content Match Bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-600 font-medium">Content Match</span>
            <span className="font-bold text-gray-900">{creator.contentMatchPercent}%</span>
          </div>
          <ScoreBar value={creator.contentMatchPercent} color="bg-gradient-to-r from-green-400 to-emerald-500" />
        </div>

        {/* Engagement Bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-600 font-medium">Engagement Rate</span>
            <span className="font-bold text-gray-900">{creator.engagementRate}%</span>
          </div>
          <ScoreBar value={creator.engagementRate} max={15} color="bg-gradient-to-r from-orange-400 to-red-500" />
        </div>

        {/* Growth Sparkline */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <p className="text-[10px] text-gray-500 uppercase">30-Day Growth</p>
            <p className={`text-sm font-bold ${creator.recentGrowth > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {creator.recentGrowth > 0 ? '+' : ''}{creator.recentGrowth}%
            </p>
          </div>
          <MiniSparkline growth={creator.recentGrowth} />
        </div>

        {/* Top Games */}
        <div className="pt-2 border-t border-gray-100">
          <p className="text-[10px] text-gray-500 uppercase mb-1.5 flex items-center gap-1">
            <Gamepad2 className="w-3 h-3" /> Top Games
          </p>
          <div className="flex flex-wrap gap-1">
            {creator.topGames.slice(0, 3).map(game => (
              <span key={game} className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                {game}
              </span>
            ))}
          </div>
        </div>

        {/* Avg Views */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <span className="flex items-center gap-1">
            <BarChart3 className="w-3 h-3" /> Avg Views
          </span>
          <span className="font-medium text-gray-700">{formatNumber(creator.avgViews)}</span>
        </div>
      </div>
    </div>
  );
}
