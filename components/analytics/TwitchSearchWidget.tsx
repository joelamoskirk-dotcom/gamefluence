'use client';

import React, { useState } from 'react';
import { Twitch, Search, Users, Radio, ExternalLink } from 'lucide-react';
import { searchTwitchChannels, formatViewerCount, getBroadcasterBadge } from '@/lib/twitch-client';
import type { TwitchChannel } from '@/lib/twitch-client';

interface TwitchSearchWidgetProps {
  onSelectCreator?: (channel: TwitchChannel) => void;
}

export default function TwitchSearchWidget({ onSelectCreator }: TwitchSearchWidgetProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TwitchChannel[]>([]);
  const [loading, setLoading] = useState(false);
  const [liveOnly, setLiveOnly] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const channels = await searchTwitchChannels(query, { first: 12, liveOnly });
      setResults(channels);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-[#9146FF] rounded-lg flex items-center justify-center">
          <Twitch size={18} className="text-white" />
        </div>
        <h3 className="font-bold text-lg">Find Twitch Creators</h3>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Twitch channels..."
            className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-400 outline-none"
          />
        </div>
        <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={liveOnly}
            onChange={(e) => setLiveOnly(e.target.checked)}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <Radio size={14} className="text-red-500" />
          Live
        </label>
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-4 py-2 bg-[#9146FF] text-white rounded-lg hover:bg-[#7c3aed] disabled:opacity-50 transition-colors font-medium"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Results */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Twitch size={32} className="mx-auto mb-2 opacity-30" />
          <p>No channels found for &quot;{query}&quot;</p>
          <p className="text-sm mt-1">Try a different search term</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {results.map((channel) => {
            const badge = getBroadcasterBadge(channel.broadcasterType);
            return (
              <div
                key={channel.id}
                className="flex items-center gap-3 p-3 rounded-lg border hover:border-purple-300 hover:bg-purple-50/50 transition-colors cursor-pointer"
                onClick={() => onSelectCreator?.(channel)}
              >
                {channel.profileImageUrl ? (
                  <img
                    src={channel.profileImageUrl}
                    alt={channel.displayName}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Twitch size={18} className="text-purple-500" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-medium text-sm truncate">{channel.displayName}</p>
                    {badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${badge.color}`}>
                        {badge.label}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users size={10} />
                      {formatViewerCount(channel.viewCount)} views
                    </span>
                  </div>
                </div>
                <a
                  href={`https://twitch.tv/${channel.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 hover:bg-purple-100 rounded transition-colors"
                >
                  <ExternalLink size={14} className="text-purple-500" />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
