'use client';

import React, { useState } from 'react';
import {
  Globe,
  TrendingUp,
  BarChart3,
  Clock,
  Target,
  Download,
  FileText,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Gamepad2,
  Tv,
  DollarSign,
  Users,
  Zap,
} from 'lucide-react';
import {
  apacMarketTrends,
  marketInsights,
  campaign4Brief,
  getTotalAPACMetrics,
  getInsightsByCategory,
  exportInsightAsText,
  exportAllInsightsAsText,
  exportCampaignBriefAsText,
} from '@/lib/apac-market-trends-2026';
import type { MarketInsightText, MarketTrendData } from '@/lib/apac-market-trends-2026';

type TabId = 'overview' | 'genres' | 'attention' | 'strategy' | 'campaign';

export default function APACMarketInsightsDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const totals = getTotalAPACMetrics();

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportAll = () => {
    const text = exportAllInsightsAsText() + '\n\n' + exportCampaignBriefAsText();
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gamefluence-apac-intelligence-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Market Overview', icon: <Globe size={16} /> },
    { id: 'genres', label: 'Genre Analysis', icon: <Gamepad2 size={16} /> },
    { id: 'attention', label: 'Attention Economy', icon: <Tv size={16} /> },
    { id: 'strategy', label: 'Strategic Recs', icon: <Target size={16} /> },
    { id: 'campaign', label: 'Campaign 4 Brief', icon: <Zap size={16} /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <BarChart3 size={22} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">APAC Market Intelligence</h2>
            <p className="text-sm text-gray-500">Latest trends, genre analysis, and strategic insights — Q2 2026</p>
          </div>
        </div>
        <button
          onClick={handleExportAll}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Download size={16} />
          Export All
        </button>
      </div>

      {/* Top-Level Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <MetricTile icon={<Globe size={18} className="text-blue-500" />} label="Markets Tracked" value={String(totals.markets)} />
        <MetricTile icon={<Download size={18} className="text-green-500" />} label="Q1 Downloads" value={`${(totals.downloads / 1000).toFixed(1)}B`} sub="across SEA" />
        <MetricTile icon={<DollarSign size={18} className="text-yellow-500" />} label="IAP Revenue" value={`$${totals.iapRevenue}M`} sub="quarterly" />
        <MetricTile icon={<Tv size={18} className="text-purple-500" />} label="Hours Watched" value={`${(totals.streamingHours / 1000).toFixed(1)}B`} sub="quarterly" />
        <MetricTile icon={<Users size={18} className="text-pink-500" />} label="Influencer Spend" value={`$${totals.influencerSpend}M`} sub={`${totals.avgROI.toFixed(1)}x avg ROI`} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'overview' && (
          <>
            <MarketTrendsGrid markets={apacMarketTrends} />
            <InsightCards
              insights={getInsightsByCategory('market_overview')}
              expandedId={expandedInsight}
              onToggle={setExpandedInsight}
              onCopy={handleCopy}
              copiedId={copiedId}
            />
          </>
        )}
        {activeTab === 'genres' && (
          <>
            <GenreBreakdown markets={apacMarketTrends} />
            <InsightCards
              insights={getInsightsByCategory('genre_analysis')}
              expandedId={expandedInsight}
              onToggle={setExpandedInsight}
              onCopy={handleCopy}
              copiedId={copiedId}
            />
          </>
        )}
        {activeTab === 'attention' && (
          <>
            <AttentionMetrics markets={apacMarketTrends} />
            <InsightCards
              insights={getInsightsByCategory('attention_economy')}
              expandedId={expandedInsight}
              onToggle={setExpandedInsight}
              onCopy={handleCopy}
              copiedId={copiedId}
            />
          </>
        )}
        {activeTab === 'strategy' && (
          <InsightCards
            insights={getInsightsByCategory('strategic_recommendation')}
            expandedId={expandedInsight}
            onToggle={setExpandedInsight}
            onCopy={handleCopy}
            copiedId={copiedId}
          />
        )}
        {activeTab === 'campaign' && <CampaignBriefView onCopy={handleCopy} copiedId={copiedId} />}
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function MetricTile({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <p className="text-xl font-bold">{value}</p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  );
}

function MarketTrendsGrid({ markets }: { markets: MarketTrendData[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {markets.map((m) => (
        <div key={m.countryCode} className="card border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold">{m.market}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full ${m.yoyGrowth > 5 ? 'bg-green-100 text-green-700' : m.yoyGrowth > 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
              {m.yoyGrowth > 0 ? '+' : ''}{m.yoyGrowth}% YoY
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <div><span className="text-gray-500">Downloads:</span> <span className="font-medium">{m.q1Downloads}M</span></div>
            <div><span className="text-gray-500">IAP Rev:</span> <span className="font-medium">${m.iapRevenue}M</span></div>
            <div><span className="text-gray-500">Streaming:</span> <span className="font-medium">{(m.streamingHours.totalHoursWatched / 1000).toFixed(1)}B hrs</span></div>
            <div><span className="text-gray-500">Inf. ROI:</span> <span className="font-medium">{m.influencerMetrics.avgCampaignROI}x</span></div>
          </div>
          <div className="flex flex-wrap gap-1">
            {m.topGenres.slice(0, 3).map((g) => (
              <span key={g.genre} className={`text-[10px] px-1.5 py-0.5 rounded ${g.trend === 'rising' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'}`}>
                {g.genre} {g.trend === 'rising' ? '↑' : '→'}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function GenreBreakdown({ markets }: { markets: MarketTrendData[] }) {
  // Aggregate genre data across markets
  const genreMap = new Map<string, { totalHours: number; avgGrowth: number; markets: number; trend: string }>();
  markets.forEach((m) => {
    m.topGenres.forEach((g) => {
      const existing = genreMap.get(g.genre) || { totalHours: 0, avgGrowth: 0, markets: 0, trend: g.trend };
      genreMap.set(g.genre, {
        totalHours: existing.totalHours + g.hoursWatched,
        avgGrowth: existing.avgGrowth + g.yoyGrowth,
        markets: existing.markets + 1,
        trend: g.trend === 'rising' ? 'rising' : existing.trend,
      });
    });
  });

  const genres = Array.from(genreMap.entries())
    .map(([name, data]) => ({ name, ...data, avgGrowth: data.avgGrowth / data.markets }))
    .sort((a, b) => b.totalHours - a.totalHours);

  return (
    <div className="card">
      <h3 className="font-bold mb-4 flex items-center gap-2"><Gamepad2 size={18} /> Genre Performance Across APAC</h3>
      <div className="space-y-3">
        {genres.slice(0, 8).map((g) => (
          <div key={g.name} className="flex items-center gap-3">
            <div className="w-32 text-sm font-medium truncate">{g.name}</div>
            <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden relative">
              <div
                className={`h-full rounded-full ${g.trend === 'rising' ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-blue-400 to-indigo-500'}`}
                style={{ width: `${Math.min(100, (g.totalHours / genres[0].totalHours) * 100)}%` }}
              />
              <span className="absolute inset-0 flex items-center px-3 text-xs font-medium">
                {g.totalHours.toLocaleString()}M hrs watched
              </span>
            </div>
            <span className={`text-xs font-medium w-16 text-right ${g.avgGrowth > 5 ? 'text-green-600' : 'text-gray-500'}`}>
              {g.avgGrowth > 0 ? '+' : ''}{g.avgGrowth.toFixed(0)}% YoY
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${g.trend === 'rising' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
              {g.trend === 'rising' ? '↑ Rising' : '→ Stable'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AttentionMetrics({ markets }: { markets: MarketTrendData[] }) {
  return (
    <div className="card">
      <h3 className="font-bold mb-4 flex items-center gap-2"><Tv size={18} /> Platform Attention Distribution by Market</h3>
      <div className="space-y-4">
        {markets.map((m) => (
          <div key={m.countryCode}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{m.market}</span>
              <span className="text-xs text-gray-500">{(m.streamingHours.totalHoursWatched / 1000).toFixed(1)}B hrs total</span>
            </div>
            <div className="flex h-5 rounded-full overflow-hidden">
              <div className="bg-red-500 flex items-center justify-center" style={{ width: `${m.streamingHours.youtubeShare}%` }}>
                <span className="text-[9px] text-white font-medium">YT {m.streamingHours.youtubeShare}%</span>
              </div>
              <div className="bg-black flex items-center justify-center" style={{ width: `${m.streamingHours.tiktokLiveShare}%` }}>
                <span className="text-[9px] text-white font-medium">TT {m.streamingHours.tiktokLiveShare}%</span>
              </div>
              <div className="bg-purple-600 flex items-center justify-center" style={{ width: `${m.streamingHours.twitchShare}%` }}>
                <span className="text-[9px] text-white font-medium">TW {m.streamingHours.twitchShare}%</span>
              </div>
              <div className="bg-gray-400 flex-1 flex items-center justify-center">
                <span className="text-[9px] text-white font-medium">Other</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-4 pt-3 border-t text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded" /> YouTube</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-black rounded" /> TikTok Live</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-purple-600 rounded" /> Twitch</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-400 rounded" /> Other</span>
      </div>
    </div>
  );
}

function InsightCards({
  insights,
  expandedId,
  onToggle,
  onCopy,
  copiedId,
}: {
  insights: MarketInsightText[];
  expandedId: string | null;
  onToggle: (id: string | null) => void;
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
}) {
  return (
    <div className="space-y-4">
      {insights.map((insight) => {
        const isExpanded = expandedId === insight.id;
        return (
          <div key={insight.id} className="card border-l-4 border-l-primary">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <FileText size={14} className="text-primary" />
                  <h4 className="font-bold text-sm">{insight.title}</h4>
                  <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                    {insight.confidence}% confidence
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{insight.summary}</p>
              </div>
              <div className="flex items-center gap-1 ml-3">
                <button
                  onClick={() => onCopy(exportInsightAsText(insight), insight.id)}
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                  title="Copy to clipboard"
                >
                  {copiedId === insight.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-400" />}
                </button>
                <button
                  onClick={() => onToggle(isExpanded ? null : insight.id)}
                  className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                >
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>
            </div>

            {isExpanded && (
              <div className="mt-4 pt-4 border-t space-y-4">
                <div className="prose prose-sm max-w-none">
                  {insight.detail.split('\n\n').map((para, i) => (
                    <p key={i} className="text-sm text-gray-600 leading-relaxed">{para}</p>
                  ))}
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">Key Data Points</h5>
                  <ul className="space-y-1">
                    {insight.dataPoints.map((dp, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <TrendingUp size={12} className="text-primary mt-0.5 shrink-0" />
                        {dp}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-gray-400">Last updated: {insight.lastUpdated}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CampaignBriefView({ onCopy, copiedId }: { onCopy: (text: string, id: string) => void; copiedId: string | null }) {
  const b = campaign4Brief;

  return (
    <div className="space-y-6">
      {/* Campaign Header */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{b.campaignName}</h3>
            <p className="text-sm text-gray-600">{b.duration}</p>
          </div>
          <button
            onClick={() => onCopy(exportCampaignBriefAsText(), 'campaign_brief')}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border rounded-lg hover:bg-gray-50 text-sm"
          >
            {copiedId === 'campaign_brief' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            Export Brief
          </button>
        </div>
        <p className="text-sm text-gray-700">{b.objective}</p>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white/60 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-primary">${(b.totalBudget / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-gray-500">Total Budget</p>
          </div>
          <div className="bg-white/60 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-600">{b.creatorStrategy.totalCreators}</p>
            <p className="text-xs text-gray-500">Creators</p>
          </div>
          <div className="bg-white/60 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-purple-600">{b.markets.length}</p>
            <p className="text-xs text-gray-500">Markets</p>
          </div>
        </div>
      </div>

      {/* Market Allocation */}
      <div className="card">
        <h4 className="font-bold mb-4">Market Budget Allocation</h4>
        <div className="space-y-3">
          {b.markets.map((m) => (
            <div key={m.countryCode} className="flex items-center gap-3">
              <span className="w-24 text-sm font-medium">{m.market}</span>
              <div className="flex-1 h-7 bg-gray-100 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                  style={{ width: `${m.budgetPercentage * 4}%` }}
                />
                <span className="absolute inset-0 flex items-center px-3 text-xs font-medium">
                  ${(m.budgetAllocation / 1000000).toFixed(1)}M ({m.budgetPercentage}%) — {(m.targetDownloads / 1000000).toFixed(1)}M downloads target
                </span>
              </div>
              <span className="text-xs text-gray-500 w-16 text-right">{m.creatorCount} creators</span>
            </div>
          ))}
        </div>
      </div>

      {/* Genre Strategy */}
      <div className="card">
        <h4 className="font-bold mb-4">Genre Strategy</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {b.genreStrategy.map((g) => (
            <div key={g.genre} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium">{g.genre}</h5>
                <span className="text-sm font-bold text-green-600">{g.expectedROI}x ROI</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">{g.budgetShare}% budget — {g.targetAudience}</p>
              <p className="text-sm text-gray-600">{g.rationale}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {g.contentFormat.map((f) => (
                  <span key={f} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded">{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="card">
        <h4 className="font-bold mb-4">Campaign KPIs</h4>
        <div className="grid md:grid-cols-2 gap-3">
          {b.kpis.map((kpi) => (
            <div key={kpi.metric} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium">{kpi.metric}</p>
                <p className="text-xs text-gray-500">Benchmark: {kpi.benchmark}{kpi.unit === '%' || kpi.unit === 'x' ? kpi.unit : ` ${kpi.unit}`}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{kpi.target}{kpi.unit === '%' || kpi.unit === 'x' ? kpi.unit : ''}</p>
                <p className="text-[10px] text-gray-400">Stretch: {kpi.stretch}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Narrative */}
      <div className="card border-l-4 border-l-green-500">
        <h4 className="font-bold mb-2 flex items-center gap-2"><Target size={16} className="text-green-500" /> Strategic Narrative</h4>
        <p className="text-sm text-gray-700 leading-relaxed">{b.strategicNarrative}</p>
      </div>

      {/* Competitive Advantages */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h4 className="font-bold mb-3 text-green-700">Competitive Advantages</h4>
          <ul className="space-y-2">
            {b.competitiveAdvantage.map((c, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                <Check size={14} className="text-green-500 mt-0.5 shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h4 className="font-bold mb-3 text-orange-700">Risk Factors</h4>
          <ul className="space-y-2">
            {b.riskFactors.map((r, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-orange-500 mt-0.5 shrink-0">⚠</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
