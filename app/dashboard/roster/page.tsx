'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Users, TrendingUp, Plus, Target, Zap,
  Globe, CheckCircle, Circle, Trophy, Download,
} from 'lucide-react';
import {
  milestones, getRosterStats, formatReachDeck,
} from '@/lib/roster-builder';
import type { SignedCreator } from '@/lib/roster-builder';

export default function RosterBuilderPage() {
  const [roster, setRoster] = useState<SignedCreator[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '', handle: '', platform: 'tiktok' as SignedCreator['platform'],
    market: 'Vietnam', followers: '', avgViews: '', engagementRate: '',
    genres: '', source: 'cake_vietnam' as SignedCreator['source'], notes: '',
  });

  const stats = getRosterStats(roster);

  const addCreator = () => {
    if (!form.name || !form.handle) return;
    const creator: SignedCreator = {
      id: `cr_${Date.now()}`,
      name: form.name,
      handle: form.handle,
      platform: form.platform,
      market: form.market,
      followers: parseInt(form.followers) || 0,
      avgViews: parseInt(form.avgViews) || 0,
      engagementRate: parseFloat(form.engagementRate) || 0,
      genres: form.genres.split(',').map(g => g.trim()).filter(Boolean),
      signedDate: new Date().toISOString().split('T')[0],
      source: form.source,
      status: 'signed',
      notes: form.notes,
    };
    setRoster(prev => [...prev, creator]);
    setForm({ name: '', handle: '', platform: 'tiktok', market: 'Vietnam', followers: '', avgViews: '', engagementRate: '', genres: '', source: 'cake_vietnam', notes: '' });
    setShowForm(false);
  };

  const exportDeck = () => {
    const text = formatReachDeck(roster);
    navigator.clipboard.writeText(text);
    alert('Reach stats copied to clipboard!');
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-primary mb-6">
        <ArrowLeft className="mr-1 h-4 w-4" /> Dashboard
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Users size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Roster Builder</h1>
            <p className="text-sm text-gray-500">Track your path to 20 signed creators → pilot campaign</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={exportDeck} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm">
            <Download size={16} /> Copy Reach Stats
          </button>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
            <Plus size={16} /> Add Creator
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-green-800">Progress to Credibility Threshold</h3>
          <span className="text-2xl font-bold text-green-700">{stats.totalCreators}/20</span>
        </div>
        <div className="w-full h-4 bg-green-200 rounded-full overflow-hidden mb-3">
          <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500" style={{ width: `${stats.progressPercent}%` }} />
        </div>
        <div className="flex justify-between text-xs text-green-600">
          {milestones.slice(0, 4).map(m => (
            <div key={m.target} className="flex items-center gap-1">
              {stats.totalCreators >= m.target ? <CheckCircle size={12} /> : <Circle size={12} />}
              <span>{m.target} — {m.label}</span>
            </div>
          ))}
        </div>
        {stats.nextMilestone && stats.totalCreators < 20 && (
          <p className="text-sm text-green-700 mt-3 bg-white/50 rounded p-2">
            <strong>Next unlock:</strong> {stats.nextMilestone.unlocks}
          </p>
        )}
        {stats.totalCreators >= 20 && (
          <div className="mt-3 bg-green-100 border border-green-300 rounded-lg p-3 flex items-center gap-2">
            <Trophy size={18} className="text-green-700" />
            <span className="text-sm font-bold text-green-800">CREDIBILITY THRESHOLD REACHED — Time to pitch Tim and brands!</span>
          </div>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{stats.totalCreators}</p>
          <p className="text-xs text-gray-500">Creators Signed</p>
        </div>
        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">{stats.combinedReachFormatted}</p>
          <p className="text-xs text-gray-500">Combined Reach</p>
        </div>
        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-purple-600">{stats.markets.length}</p>
          <p className="text-xs text-gray-500">Markets</p>
        </div>
        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-orange-600">{stats.avgEngagement}%</p>
          <p className="text-xs text-gray-500">Avg Engagement</p>
        </div>
        <div className="bg-white border rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-pink-600">{stats.platforms.length}</p>
          <p className="text-xs text-gray-500">Platforms</p>
        </div>
      </div>

      {/* Add Creator Form */}
      {showForm && (
        <div className="card mb-6 border-green-200">
          <h3 className="font-bold mb-4">Add Signed Creator</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <input placeholder="Creator name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
            <input placeholder="@handle" value={form.handle} onChange={e => setForm({...form, handle: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
            <select value={form.platform} onChange={e => setForm({...form, platform: e.target.value as any})} className="px-3 py-2 border rounded-lg text-sm">
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="twitch">Twitch</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
            </select>
            <select value={form.market} onChange={e => setForm({...form, market: e.target.value})} className="px-3 py-2 border rounded-lg text-sm">
              <option value="Vietnam">Vietnam</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Philippines">Philippines</option>
              <option value="Thailand">Thailand</option>
              <option value="Australia">Australia</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Singapore">Singapore</option>
              <option value="South Korea">South Korea</option>
            </select>
            <input placeholder="Followers" type="number" value={form.followers} onChange={e => setForm({...form, followers: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
            <input placeholder="Avg views" type="number" value={form.avgViews} onChange={e => setForm({...form, avgViews: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
            <input placeholder="Engagement %" value={form.engagementRate} onChange={e => setForm({...form, engagementRate: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
            <input placeholder="Genres (comma separated)" value={form.genres} onChange={e => setForm({...form, genres: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
            <select value={form.source} onChange={e => setForm({...form, source: e.target.value as any})} className="px-3 py-2 border rounded-lg text-sm">
              <option value="cake_vietnam">Cake (Vietnam)</option>
              <option value="supanova">Supanova</option>
              <option value="dm_outreach">DM Outreach</option>
              <option value="inbound">Inbound (signup form)</option>
              <option value="referral">Referral</option>
            </select>
          </div>
          <input placeholder="Notes" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="w-full mt-3 px-3 py-2 border rounded-lg text-sm" />
          <button onClick={addCreator} disabled={!form.name || !form.handle} className="mt-3 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium">
            Add to Roster
          </button>
        </div>
      )}

      {/* Roster List */}
      {roster.length > 0 ? (
        <div className="space-y-3">
          {roster.map((creator, i) => (
            <div key={creator.id} className="card border flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold">{creator.name}</span>
                  <span className="text-xs text-gray-500">{creator.handle}</span>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">{creator.platform}</span>
                  <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">{creator.market}</span>
                </div>
                <div className="flex gap-4 text-xs text-gray-500 mt-1">
                  <span>{creator.followers.toLocaleString()} followers</span>
                  <span>{creator.engagementRate}% eng</span>
                  <span>Source: {creator.source.replace(/_/g, ' ')}</span>
                  <span>Signed: {creator.signedDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <Users size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No creators signed yet</h3>
          <p className="text-sm text-gray-500 mb-4">Start by getting Cake to source Vietnamese creators, or DM AU targets directly.</p>
          <button onClick={() => setShowForm(true)} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
            Add Your First Creator
          </button>
        </div>
      )}
    </main>
  );
}
