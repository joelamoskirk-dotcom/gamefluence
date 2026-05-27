'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Radio, Search, Plus, Globe, TrendingUp,
  ExternalLink, Filter, Download, Eye, Target, Zap,
} from 'lucide-react';
import {
  marketSearchQueries, brandsToTrack, signalCategories, sampleSignals,
} from '@/lib/social-listening-intel';
import type { SocialSignal, BrandTracker } from '@/lib/social-listening-intel';

type Tab = 'feed' | 'searches' | 'brands' | 'add';

export default function SocialListeningPage() {
  const [activeTab, setActiveTab] = useState<Tab>('feed');
  const [signals, setSignals] = useState<SocialSignal[]>(sampleSignals);
  const [filterMarket, setFilterMarket] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredSignals = signals.filter(s => {
    if (filterMarket !== 'all' && s.market !== filterMarket) return false;
    if (filterCategory !== 'all' && s.category !== filterCategory) return false;
    return true;
  }).sort((a, b) => new Date(b.dateSpotted).getTime() - new Date(a.dateSpotted).getTime());

  // New signal form
  const [newSignal, setNewSignal] = useState({
    platform: 'twitter' as SocialSignal['platform'],
    market: 'global',
    category: 'opportunity' as SocialSignal['category'],
    title: '',
    detail: '',
    sourceUrl: '',
    personOrBrand: '',
    relevanceScore: 7,
    actionNote: '',
  });

  const addSignal = () => {
    if (!newSignal.title) return;
    const signal: SocialSignal = {
      id: `sig_${Date.now()}`,
      dateSpotted: new Date().toISOString().split('T')[0],
      ...newSignal,
      actionable: !!newSignal.actionNote,
    };
    setSignals(prev => [signal, ...prev]);
    setNewSignal({ platform: 'twitter', market: 'global', category: 'opportunity', title: '', detail: '', sourceUrl: '', personOrBrand: '', relevanceScore: 7, actionNote: '' });
    setActiveTab('feed');
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-primary mb-6">
        <ArrowLeft className="mr-1 h-4 w-4" /> Dashboard
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center">
            <Radio size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Social Listening</h1>
            <p className="text-sm text-gray-500">APAC gaming market signals — trends, brands, creators, opportunities</p>
          </div>
        </div>
        <button onClick={() => setActiveTab('add')} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm">
          <Plus size={16} /> Log Signal
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-500">Total Signals</p>
          <p className="text-2xl font-bold">{signals.length}</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-500">Actionable</p>
          <p className="text-2xl font-bold text-green-600">{signals.filter(s => s.actionable).length}</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-500">Brands Tracked</p>
          <p className="text-2xl font-bold text-blue-600">{brandsToTrack.length}</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-xs text-gray-500">Markets Monitored</p>
          <p className="text-2xl font-bold text-purple-600">7</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg mb-6">
        {([
          { id: 'feed' as Tab, label: 'Intel Feed', icon: <Eye size={14} /> },
          { id: 'searches' as Tab, label: 'Search Queries', icon: <Search size={14} /> },
          { id: 'brands' as Tab, label: 'Brand Tracker', icon: <Target size={14} /> },
          { id: 'add' as Tab, label: 'Log New Signal', icon: <Plus size={14} /> },
        ]).map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Feed Tab */}
      {activeTab === 'feed' && (
        <div>
          {/* Filters */}
          <div className="flex gap-3 mb-4">
            <select value={filterMarket} onChange={e => setFilterMarket(e.target.value)} className="text-sm border rounded-lg px-3 py-1.5">
              <option value="all">All Markets</option>
              <option value="VN">Vietnam</option>
              <option value="ID">Indonesia</option>
              <option value="PH">Philippines</option>
              <option value="TH">Thailand</option>
              <option value="KR">South Korea</option>
              <option value="MY">Malaysia</option>
              <option value="SG">Singapore</option>
              <option value="global">Global/APAC</option>
            </select>
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="text-sm border rounded-lg px-3 py-1.5">
              <option value="all">All Categories</option>
              {Object.entries(signalCategories).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>

          {/* Signal Cards */}
          <div className="space-y-3">
            {filteredSignals.map(signal => {
              const cat = signalCategories[signal.category];
              return (
                <div key={signal.id} className="card border-l-4 border-l-primary hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${cat.color}`}>{cat.label}</span>
                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">{signal.platform}</span>
                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">{signal.market}</span>
                        {signal.actionable && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">⚡ Actionable</span>}
                      </div>
                      <h4 className="font-medium text-sm">{signal.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{signal.detail}</p>
                      {signal.actionNote && (
                        <p className="text-xs text-green-700 mt-2 bg-green-50 px-2 py-1 rounded"><strong>Action:</strong> {signal.actionNote}</p>
                      )}
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p className="text-xs text-gray-400">{signal.dateSpotted}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] text-gray-500">Relevance:</span>
                        <span className={`text-xs font-bold ${signal.relevanceScore >= 8 ? 'text-red-600' : signal.relevanceScore >= 6 ? 'text-orange-600' : 'text-gray-500'}`}>{signal.relevanceScore}/10</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Searches Tab */}
      {activeTab === 'searches' && (
        <div className="space-y-6">
          {['Vietnam', 'Indonesia', 'Philippines', 'Thailand', 'South Korea', 'Malaysia/Singapore', 'Global/APAC'].map(market => {
            const queries = marketSearchQueries.filter(q => q.market === market);
            if (queries.length === 0) return null;
            return (
              <div key={market} className="card">
                <h3 className="font-bold mb-3 flex items-center gap-2"><Globe size={16} /> {market}</h3>
                <div className="space-y-2">
                  {queries.map((q, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded shrink-0 mt-0.5">{q.platform}</span>
                      <div className="flex-1">
                        <code className="text-xs bg-white px-2 py-0.5 rounded border break-all">{q.query}</code>
                        <p className="text-[10px] text-gray-500 mt-1">{q.purpose}</p>
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0">{q.frequency}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Brands Tab */}
      {activeTab === 'brands' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">Brands actively running gaming creator campaigns in APAC. Track their activity to identify potential clients and understand competitive landscape.</p>
          {brandsToTrack.map((brand, i) => (
            <div key={i} className="card border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold">{brand.brand}</h4>
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">{brand.category}</span>
                  </div>
                  <p className="text-sm text-gray-600">{brand.lastSeenCampaign}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {brand.markets.map(m => (
                      <span key={m} className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">{m}</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2 italic">{brand.notes}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-green-600">{brand.estimatedSpend}</p>
                  <p className="text-[10px] text-gray-400">est. annual spend</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Signal Tab */}
      {activeTab === 'add' && (
        <div className="max-w-2xl">
          <div className="card">
            <h3 className="font-bold mb-4">Log a Market Signal</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Platform</label>
                  <select value={newSignal.platform} onChange={e => setNewSignal({...newSignal, platform: e.target.value as any})} className="w-full mt-1 text-sm border rounded-lg px-3 py-2">
                    <option value="twitter">Twitter/X</option>
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">YouTube</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="instagram">Instagram</option>
                    <option value="twitch">Twitch</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Market</label>
                  <select value={newSignal.market} onChange={e => setNewSignal({...newSignal, market: e.target.value})} className="w-full mt-1 text-sm border rounded-lg px-3 py-2">
                    <option value="global">Global/APAC</option>
                    <option value="VN">Vietnam</option>
                    <option value="ID">Indonesia</option>
                    <option value="PH">Philippines</option>
                    <option value="TH">Thailand</option>
                    <option value="KR">South Korea</option>
                    <option value="MY">Malaysia</option>
                    <option value="SG">Singapore</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Category</label>
                  <select value={newSignal.category} onChange={e => setNewSignal({...newSignal, category: e.target.value as any})} className="w-full mt-1 text-sm border rounded-lg px-3 py-2">
                    {Object.entries(signalCategories).map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Title (what did you spot?)</label>
                <input type="text" value={newSignal.title} onChange={e => setNewSignal({...newSignal, title: e.target.value})} className="w-full mt-1 text-sm border rounded-lg px-3 py-2" placeholder="e.g. New racing game trending in Vietnam TikTok" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Detail</label>
                <textarea rows={3} value={newSignal.detail} onChange={e => setNewSignal({...newSignal, detail: e.target.value})} className="w-full mt-1 text-sm border rounded-lg px-3 py-2" placeholder="What did you see? Context, numbers, who was involved..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">Person/Brand</label>
                  <input type="text" value={newSignal.personOrBrand} onChange={e => setNewSignal({...newSignal, personOrBrand: e.target.value})} className="w-full mt-1 text-sm border rounded-lg px-3 py-2" placeholder="Who was involved?" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Relevance (1-10)</label>
                  <input type="number" min={1} max={10} value={newSignal.relevanceScore} onChange={e => setNewSignal({...newSignal, relevanceScore: parseInt(e.target.value)})} className="w-full mt-1 text-sm border rounded-lg px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Source URL (optional)</label>
                <input type="url" value={newSignal.sourceUrl} onChange={e => setNewSignal({...newSignal, sourceUrl: e.target.value})} className="w-full mt-1 text-sm border rounded-lg px-3 py-2" placeholder="https://..." />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Action to take (leave blank if just FYI)</label>
                <input type="text" value={newSignal.actionNote} onChange={e => setNewSignal({...newSignal, actionNote: e.target.value})} className="w-full mt-1 text-sm border rounded-lg px-3 py-2" placeholder="What should we do about this?" />
              </div>
              <button onClick={addSignal} disabled={!newSignal.title} className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 font-medium">
                Log Signal
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
