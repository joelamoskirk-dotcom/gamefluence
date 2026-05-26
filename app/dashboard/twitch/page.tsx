'use client';

import React, { useState } from 'react';
import { Twitch, ArrowLeft, Plus, X } from 'lucide-react';
import Link from 'next/link';
import TwitchCreatorDashboard from '@/components/analytics/TwitchCreatorDashboard';
import TwitchSearchWidget from '@/components/analytics/TwitchSearchWidget';
import type { TwitchChannel } from '@/lib/twitch-client';

// Default APAC gaming creators to track
const defaultCreators = [
  { login: 'rfrush', name: 'RFrush' },
  { login: 'bfrush', name: 'BFrush' },
  { login: 'gloomy_gaming', name: 'Gloomy Gaming' },
];

export default function TwitchDashboardPage() {
  const [trackedCreators, setTrackedCreators] = useState(defaultCreators);
  const [showSearch, setShowSearch] = useState(false);

  const handleAddCreator = (channel: TwitchChannel) => {
    if (trackedCreators.some((c) => c.login === channel.login)) return;
    setTrackedCreators((prev) => [
      ...prev,
      { login: channel.login, name: channel.displayName },
    ]);
    setShowSearch(false);
  };

  const handleRemoveCreator = (login: string) => {
    setTrackedCreators((prev) => prev.filter((c) => c.login !== login));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#9146FF] rounded-xl flex items-center justify-center">
              <Twitch size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Twitch Creator Analytics</h1>
              <p className="text-sm text-gray-500">
                Live streaming data and performance metrics for APAC gaming creators
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowSearch(!showSearch)}
          className="flex items-center gap-2 px-4 py-2 bg-[#9146FF] text-white rounded-lg hover:bg-[#7c3aed] transition-colors"
        >
          {showSearch ? <X size={18} /> : <Plus size={18} />}
          {showSearch ? 'Close' : 'Add Creator'}
        </button>
      </div>

      {/* Search Widget */}
      {showSearch && (
        <div className="mb-8">
          <TwitchSearchWidget onSelectCreator={handleAddCreator} />
        </div>
      )}

      {/* Tracked Creators */}
      <div className="space-y-6">
        {trackedCreators.map((creator) => (
          <div key={creator.login} className="relative">
            <button
              onClick={() => handleRemoveCreator(creator.login)}
              className="absolute top-4 right-16 z-10 p-1.5 bg-white border rounded-full hover:bg-red-50 hover:border-red-200 transition-colors"
              title="Remove creator"
            >
              <X size={14} className="text-gray-400 hover:text-red-500" />
            </button>
            <TwitchCreatorDashboard
              twitchLogin={creator.login}
              creatorName={creator.name}
            />
          </div>
        ))}
      </div>

      {trackedCreators.length === 0 && (
        <div className="text-center py-16">
          <Twitch size={48} className="mx-auto mb-4 text-purple-300" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No creators tracked</h3>
          <p className="text-gray-500 mb-4">
            Add Twitch creators to monitor their streaming performance
          </p>
          <button
            onClick={() => setShowSearch(true)}
            className="px-6 py-2 bg-[#9146FF] text-white rounded-lg hover:bg-[#7c3aed] transition-colors"
          >
            Search Creators
          </button>
        </div>
      )}

      {/* Integration Info */}
      <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
        <h3 className="font-bold text-purple-900 mb-2">Twitch Helix API Integration</h3>
        <p className="text-sm text-purple-700 mb-3">
          This dashboard pulls live data from the Twitch Helix API including channel info,
          stream status, follower counts, clips, VODs, and streaming schedules.
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/60 rounded-lg p-3">
            <p className="font-medium text-purple-800">Real-time Status</p>
            <p className="text-purple-600">Live stream detection with viewer counts, game info, and uptime tracking</p>
          </div>
          <div className="bg-white/60 rounded-lg p-3">
            <p className="font-medium text-purple-800">Performance Analytics</p>
            <p className="text-purple-600">Average viewers, stream frequency, duration patterns, and growth rates</p>
          </div>
          <div className="bg-white/60 rounded-lg p-3">
            <p className="font-medium text-purple-800">Content Discovery</p>
            <p className="text-purple-600">Top clips, recent VODs, and upcoming schedule for campaign planning</p>
          </div>
        </div>
      </div>
    </main>
  );
}
