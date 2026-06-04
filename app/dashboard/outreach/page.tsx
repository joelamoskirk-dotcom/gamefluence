'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Users, Search, Filter, Globe, TrendingUp,
  ExternalLink, Mail, Star, Zap, DollarSign,
} from 'lucide-react';
import {
  getAllCreators, getCreatorsByMarketFull, getMarketStats,
  getRacingCreators, getTopPriorityCreators, outreachTemplates,
  generatePersonalizedEmail, outreachInsights,
} from '@/lib/creator-outreach-database';
import type { OutreachCreator } from '@/lib/creator-outreach-database';

type MarketFilter = 'all' | 'VN' | 'ID' | 'PH' | 'TH';
type TierFilter = 'all' | 'mega' | 'macro' | 'mid' | 'micro';

export default function OutreachPage() {
  const [market, setMarket] = useState<MarketFilter>('all');
  const [tier, setTier] = useState<TierFilter>('all');
  const [showRacingOnly, setShowRacingOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCreator, setSelectedCreator] = useState<OutreachCreator | null>(null);

  const allCreators = getAllCreators();
  let filtered = market === 'all' ? allCreators : getCreatorsByMarketFull(market as any);
  if (tier !== 'all') filtered = filtered.filter(c => c.tier === tier);
  if (showRacingOnly) filtered = getRacingCreators(filtered);
  if (searchQuery) filtered = filtered.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sorted = [...filtered].sort((a, b) => b.aiMatchScore - a.aiMatchScore);
  const stats = market === 'all' ? {
    total: allCreators.length,
    totalReach: allCreators.reduce((s, c) => s + c.followers, 0),
    avgEngagement: allCreators.reduce((s, c) => s + c.engagementRate, 0) / allCreators.length,
    racingCreators: getRacingCreators(allCreators).length,
    unrepresented: allCreators.filter(c => !c.hasWorkedBrands).length,
    avgRate: allCreators.reduce((s, c) => s + c.estimatedRate, 0) / allCreators.length,
  } : getMarketStats(market as any);

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-primary mb-6">
        <ArrowLeft className="mr-1 h-4 w-4" /> Dashboard
      </Link>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <Users size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Creator Outreach</h1>
            <p className="text-sm text-gray-500">57 creators across 4 P1 markets — AI-scored for campaign fit</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
        <div className="bg-white border rounded-xl p-3 text-center">
          <p className="text-xl font-bold">{stats.total}</p>
          <p className="text-[10px] text-gray-500">Creators</p>
        </div>
        <div className="bg-white border rounded-xl p-3 text-center">
          <p className="text-xl font-bold">{(stats.totalReach / 1000000).toFixed(1)}M</p>
          <p className="text-[10px] text-gray-500">Total Reach</p>
        </div>
        <div className="bg-white border rounded-xl p-3 text-center">
          <p className="text-xl font-bold">{stats.avgEngagement.toFixed(1)}%</p>
          <p className="text-[10px] text-gray-500">Avg Engagement</p>
        </div>
        <div className="bg-white border rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-orange-600">{stats.racingCreators}</p>
          <p className="text-[10px] text-gray-500">Racing Creators</p>
        </div>
        <div className="bg-white border rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-green-600">{stats.unrepresented}</p>
          <p className="text-[10px] text-gray-500">Unrepresented</p>
        </div>
        <div className="bg-white border rounded-xl p-3 text-center">
          <p className="text-xl font-bold">${Math.round(stats.avgRate)}</p>
          <p className="text-[10px] text-gray-500">Avg Rate</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search name or genre..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-8 pr-3 py-2 border rounded-lg text-sm w-48" />
        </div>
        <select value={market} onChange={e => setMarket(e.target.value as any)} className="px-3 py-2 border rounded-lg text-sm">
          <option value="all">All Markets</option>
          <option value="VN">🇻🇳 Vietnam</option>
          <option value="ID">🇮🇩 Indonesia</option>
          <option value="PH">🇵🇭 Philippines</option>
          <option value="TH">🇹🇭 Thailand</option>
        </select>
        <select value={tier} onChange={e => setTier(e.target.value as any)} className="px-3 py-2 border rounded-lg text-sm">
          <option value="all">All Tiers</option>
          <option value="mega">Mega (1M+)</option>
          <option value="macro">Macro (300K-1M)</option>
          <option value="mid">Mid (50K-300K)</option>
          <option value="micro">Micro (5K-50K)</option>
        </select>
        <label className="flex items-center gap-1.5 px-3 py-2 border rounded-lg text-sm cursor-pointer hover:bg-orange-50">
          <input type="checkbox" checked={showRacingOnly} onChange={e => setShowRacingOnly(e.target.checked)} className="rounded" />
          🏎️ Racing Only
        </label>
        <span className="px-3 py-2 text-sm text-gray-500">{sorted.length} results</span>
      </div>

      {/* Creator Cards */}
      <div className="space-y-3">
        {sorted.map(creator => (
          <div key={creator.id} className="card border hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedCreator(creator)}>
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {creator.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold">{creator.name}</span>
                  <span className="text-xs text-gray-500">{creator.handle}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${creator.tier === 'mega' ? 'bg-purple-100 text-purple-700' : creator.tier === 'macro' ? 'bg-blue-100 text-blue-700' : creator.tier === 'mid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {creator.tier}
                  </span>
                  <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">{creator.platform}</span>
                  <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">{creator.market}</span>
                  {creator.genres.some(g => g.toLowerCase().includes('racing') || g.toLowerCase().includes('drift')) && (
                    <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded">🏎️ Racing</span>
                  )}
                </div>
                <div className="flex gap-4 text-xs text-gray-500 mt-1">
                  <span>{creator.followers.toLocaleString()} followers</span>
                  <span>{creator.engagementRate}% eng</span>
                  <span>${creator.estimatedRate}/campaign</span>
                  <span className="font-medium text-primary">Score: {creator.aiMatchScore}/100</span>
                </div>
              </div>

              {/* Priority indicator */}
              <div className="shrink-0 text-right">
                {creator.aiMatchScore >= 95 && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">🔥 SIGN NOW</span>}
                {creator.aiMatchScore >= 85 && creator.aiMatchScore < 95 && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">⭐ High Priority</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Creator Detail Modal */}
      {selectedCreator && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCreator(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-xl">
                {selectedCreator.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <h2 className="text-xl font-bold">{selectedCreator.name}</h2>
                <p className="text-sm text-gray-500">{selectedCreator.handle} • {selectedCreator.market} • {selectedCreator.platform}</p>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-4">{selectedCreator.description}</p>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-lg font-bold">{selectedCreator.followers.toLocaleString()}</p>
                <p className="text-[10px] text-gray-500">Followers</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-lg font-bold">{selectedCreator.engagementRate}%</p>
                <p className="text-[10px] text-gray-500">Engagement</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-lg font-bold">${selectedCreator.estimatedRate}</p>
                <p className="text-[10px] text-gray-500">Est. Rate</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-1">Genres</p>
              <div className="flex flex-wrap gap-1">
                {selectedCreator.genres.map(g => <span key={g} className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded">{g}</span>)}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-1">Best For</p>
              <p className="text-sm">{selectedCreator.bestFor}</p>
            </div>

            <div className="flex gap-3">
              <a href={selectedCreator.profileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200">
                <ExternalLink size={14} /> View Profile
              </a>
              <a href={`/creator-signup?ref=${selectedCreator.id}&source=dm_outreach&market=${selectedCreator.market}`} target="_blank" className="flex items-center gap-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200">
                <Mail size={14} /> Signup Link
              </a>
            </div>

            <button onClick={() => setSelectedCreator(null)} className="mt-4 w-full py-2 bg-gray-100 rounded-lg text-sm text-gray-600 hover:bg-gray-200">Close</button>
          </div>
        </div>
      )}
    </main>
  );
}
