'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Mail, Users, TrendingUp, Globe, CheckCircle, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { PipelineCreator, Market, Platform, PipelineStatus } from '@/lib/creator-pipeline';

export default function PipelineDashboard() {
  const [creators, setCreators] = useState<PipelineCreator[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [outreachTemplates, setOutreachTemplates] = useState<any[]>([]);
  const [showOutreach, setShowOutreach] = useState(false);
  const [loading, setLoading] = useState(true);

  // Filters
  const [marketFilter, setMarketFilter] = useState<string>('');
  const [platformFilter, setPlatformFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [minScore, setMinScore] = useState<string>('');

  useEffect(() => {
    fetchPipeline();
  }, [marketFilter, platformFilter, statusFilter, searchQuery, minScore]);

  async function fetchPipeline() {
    setLoading(true);
    const params = new URLSearchParams();
    if (marketFilter) params.set('market', marketFilter);
    if (platformFilter) params.set('platform', platformFilter);
    if (statusFilter) params.set('status', statusFilter);
    if (searchQuery) params.set('search', searchQuery);
    if (minScore) params.set('minScore', minScore);

    const res = await fetch(`/api/pipeline?${params.toString()}`);
    const data = await res.json();
    setCreators(data.creators);
    setStats(data.stats);
    setLoading(false);
  }

  function toggleSelect(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  function selectAll() {
    if (selected.size === creators.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(creators.map(c => c.id)));
    }
  }

  async function generateOutreach() {
    const res = await fetch('/api/pipeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creatorIds: Array.from(selected), action: 'generate-outreach' }),
    });
    const data = await res.json();
    setOutreachTemplates(data.outreach);
    setShowOutreach(true);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  const marketLabels: Record<string, string> = {
    vietnam: '🇻🇳 Vietnam', thailand: '🇹🇭 Thailand', indonesia: '🇮🇩 Indonesia',
    philippines: '🇵🇭 Philippines', japan: '🇯🇵 Japan', newzealand: '🇳🇿 New Zealand', australia: '🇦🇺 Australia',
  };

  const platformColors: Record<string, string> = {
    tiktok: 'bg-pink-100 text-pink-800', youtube: 'bg-red-100 text-red-800',
    twitch: 'bg-purple-100 text-purple-800', kick: 'bg-green-100 text-green-800',
    instagram: 'bg-orange-100 text-orange-800', facebook: 'bg-blue-100 text-blue-800',
  };

  const statusColors: Record<string, string> = {
    discovered: 'bg-gray-100 text-gray-700', researched: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700', responded: 'bg-green-100 text-green-700',
    interested: 'bg-emerald-100 text-emerald-700', onboarded: 'bg-purple-100 text-purple-700',
    rejected: 'bg-red-100 text-red-700', inactive: 'bg-gray-100 text-gray-500',
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Creator Pipeline</h1>
            <p className="text-gray-500">Discover, filter, and outreach to APAC gaming creators</p>
          </div>
          <div className="flex gap-2">
            {selected.size > 0 && (
              <Button onClick={generateOutreach} className="bg-primary text-white">
                <Mail className="w-4 h-4 mr-2" />
                Generate Outreach ({selected.size})
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-500">Total Pipeline</div>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-primary">{stats.avgScore}</div>
              <div className="text-sm text-gray-500">Avg Score</div>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-green-600">{(stats.totalReach / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-gray-500">Total Reach</div>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-purple-600">{Object.keys(stats.byMarket).length}</div>
              <div className="text-sm text-gray-500">Markets</div>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-2xl font-bold text-orange-600">{stats.byStatus?.onboarded || 0}</div>
              <div className="text-sm text-gray-500">Onboarded</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search creators, games..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm"
                />
              </div>
            </div>
            <select value={marketFilter} onChange={e => setMarketFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
              <option value="">All Markets</option>
              <option value="vietnam">🇻🇳 Vietnam</option>
              <option value="thailand">🇹🇭 Thailand</option>
              <option value="indonesia">🇮🇩 Indonesia</option>
              <option value="philippines">🇵🇭 Philippines</option>
              <option value="japan">🇯🇵 Japan</option>
              <option value="newzealand">🇳🇿 New Zealand</option>
              <option value="australia">🇦🇺 Australia</option>
            </select>
            <select value={platformFilter} onChange={e => setPlatformFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
              <option value="">All Platforms</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="twitch">Twitch</option>
              <option value="kick">Kick</option>
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
              <option value="">All Status</option>
              <option value="discovered">Discovered</option>
              <option value="contacted">Contacted</option>
              <option value="responded">Responded</option>
              <option value="onboarded">Onboarded</option>
            </select>
            <select value={minScore} onChange={e => setMinScore(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
              <option value="">Min Score</option>
              <option value="60">60+</option>
              <option value="70">70+</option>
              <option value="80">80+</option>
              <option value="90">90+</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" checked={selected.size === creators.length && creators.length > 0} onChange={selectAll} className="rounded" />
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Creator</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Platform</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Market</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">Followers</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">Eng %</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-600">Score</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Game</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {creators.map(creator => (
                  <tr key={creator.id} className={`hover:bg-gray-50 ${selected.has(creator.id) ? 'bg-primary/5' : ''}`}>
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.has(creator.id)} onChange={() => toggleSelect(creator.id)} className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{creator.displayName}</div>
                      <div className="text-gray-500 text-xs">{creator.handle}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${platformColors[creator.platform]}`}>
                        {creator.platform}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs">{marketLabels[creator.market]}</td>
                    <td className="px-4 py-3 text-right font-medium">{(creator.followers / 1000).toFixed(0)}K</td>
                    <td className="px-4 py-3 text-right">{creator.engagementRate}%</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                        creator.gamefluenceScore >= 80 ? 'bg-green-100 text-green-700' :
                        creator.gamefluenceScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {creator.gamefluenceScore}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{creator.primaryGame}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[creator.status]}`}>
                        {creator.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <a href={creator.profileUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {creators.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-500">No creators match your filters</div>
          )}
        </div>

        {/* Outreach Modal */}
        {showOutreach && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Outreach Templates ({outreachTemplates.length})</h2>
                <button onClick={() => setShowOutreach(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">Copy these templates and send via Gmail to each creator. Personalized by market and language.</p>
              <div className="space-y-4">
                {outreachTemplates.map((item, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-medium">{item.creator.displayName}</span>
                        <span className="text-gray-500 text-sm ml-2">{item.creator.handle}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${platformColors[item.creator.platform]}`}>
                        {item.creator.platform}
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded p-3 mb-2">
                      <div className="text-xs text-gray-500 mb-1">Subject:</div>
                      <div className="text-sm font-medium">{item.template.subject}</div>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-xs text-gray-500 mb-1">Body:</div>
                      <pre className="text-sm whitespace-pre-wrap font-sans">{item.template.body}</pre>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`Subject: ${item.template.subject}\n\n${item.template.body}`)}
                      className="mt-2 text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Copy to clipboard
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
