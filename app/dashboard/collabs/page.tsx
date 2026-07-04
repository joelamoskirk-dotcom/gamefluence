'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Download, Target, Zap, BarChart3, Users, Award, DollarSign, Rocket, TrendingUp, Star, Shield, CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';
import { COLLABS, EXPANSION_CREATORS, LEARNINGS } from '@/lib/collabs-data';
import { generateInsights, buildJacobValueCase, getWhatsFocusedOn } from '@/lib/collabz-strategy-engine';

type TabId = 'overview' | 'strategy' | 'creative' | 'kpis' | 'roster' | 'closers' | 'affiliate' | 'amp' | 'revenue' | 'learnings';

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'creative', label: 'Creative' },
  { id: 'kpis', label: 'KPIs' },
  { id: 'roster', label: 'Roster' },
  { id: 'closers', label: 'Closers' },
  { id: 'affiliate', label: 'Affiliate' },
  { id: 'amp', label: 'Paid Amp' },
  { id: 'revenue', label: 'Revenue' },
  { id: 'learnings', label: 'Learnings' },
];

export default function CollabZPage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const collab = COLLABS[0];
  const insights = generateInsights();
  const valueCase = buildJacobValueCase();
  const focus = getWhatsFocusedOn();

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">CollabZ</h1>
            <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-green-400/80 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> live
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/api/call-script-pdf" target="_blank" className="flex items-center gap-1.5 bg-white/5 border border-white/10 hover:bg-white/10 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
              <Download className="w-3 h-3" /> PDF
            </a>
            <Link href="/admin" className="text-white/40 hover:text-white/80 text-xs">Admin</Link>
          </div>
        </div>
      </header>

      {/* ─── TABS ─── */}
      <nav className="border-b border-white/10 px-4 sm:px-8 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-1 py-2">
          {TABS.map((tab, i) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}>
              <span className="text-[10px] font-mono mr-1.5 opacity-50">{i + 1}</span>{tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ─── CONTENT ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
        {activeTab === 'overview' && <OverviewSection collab={collab} />}
        {activeTab === 'strategy' && <StrategySection insights={insights} valueCase={valueCase} focus={focus} />}
        {activeTab === 'creative' && <CreativeSection />}
        {activeTab === 'kpis' && <KPIsSection />}
        {activeTab === 'roster' && <RosterSection />}
        {activeTab === 'closers' && <ClosersSection />}
        {activeTab === 'affiliate' && <AffiliateSection />}
        {activeTab === 'amp' && <AmpSection />}
        {activeTab === 'revenue' && <RevenueSection />}
        {activeTab === 'learnings' && <LearningsSection />}
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function OverviewSection({ collab }: { collab: typeof COLLABS[0] }) {
  return (<>
    {/* Hero Metric Strip */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      <Metric label="Your Take" value="$2,700" sub="/month" accent />
      <Metric label="Brand Spend" value="$8,000" sub="/month total" />
      <Metric label="Total Reach" value="1.75M" sub="followers" />
      <Metric label="Monthly Imps" value="2.1M+" sub="projected" />
      <Metric label="Status" value="Keen" sub="agreement pending" accent />
    </div>

    {/* Deal Card */}
    <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="inline-block bg-purple-500/20 text-purple-400 text-[10px] font-mono px-2 py-0.5 rounded mb-2 uppercase tracking-wider">Active Deal</div>
          <h2 className="text-xl font-bold">Jacob Tabor × P1 Sim Gear</h2>
          <p className="text-white/50 text-sm mt-1">DCS Flight Sim · RAAF · AU</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-400">34%</p>
          <p className="text-white/40 text-xs">margin</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
        <MiniStat icon="📸" label="IG" value="750K" />
        <MiniStat icon="🎵" label="TikTok" value="750K" />
        <MiniStat icon="🎬" label="YouTube" value="250K" />
        <MiniStat icon="🔥" label="Per Short" value="1M+ imps" />
        <MiniStat icon="💰" label="Short Rev" value="$3K each" />
      </div>
    </div>

    {/* Key Info */}
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-[#161616] border border-white/10 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white/80 mb-3">Call Outcomes (Jul 3)</h3>
        <div className="space-y-2 text-sm text-white/60">
          <p>✅ Keen to proceed — sending agreement</p>
          <p>✅ Accepted 20% management fee</p>
          <p>✅ Asked about affiliates (positive)</p>
          <p>⚠️ RAAF — needs content flexibility</p>
          <p>⚠️ Only 1 long-form per 8 weeks naturally</p>
          <p>🎯 Wants: force feedback stick, entry kits, DCS branded pack</p>
        </div>
      </div>
      <div className="bg-[#161616] border border-white/10 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white/80 mb-3">Competitive Intel</h3>
        <div className="space-y-2 text-sm text-white/60">
          <p><span className="text-red-400">⚔️</span> Thrustmaster — existing collab</p>
          <p><span className="text-yellow-400">⚠️</span> Wind Control — Chinese, not keen</p>
          <p><span className="text-blue-400">🔧</span> VKB — bought himself, likes it</p>
          <p><span className="text-purple-400">🎯</span> Grinelli Designs — expo partner</p>
        </div>
        <p className="text-xs text-purple-400 mt-3">P1 angle: AU-local, custom DCS branded, force feedback, entry level</p>
      </div>
    </div>
  </>);
}

function StrategySection({ insights, valueCase, focus }: { insights: ReturnType<typeof generateInsights>; valueCase: ReturnType<typeof buildJacobValueCase>; focus: ReturnType<typeof getWhatsFocusedOn> }) {
  return (<>
    {/* Focus Areas */}
    <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
      <h3 className="text-sm font-bold text-white/80 mb-4 flex items-center gap-2"><Target className="w-4 h-4 text-purple-400" /> Where to Focus Now</h3>
      <div className="space-y-3">
        {focus.map((f, i) => (
          <div key={i} className={`p-3 rounded-lg border ${f.status === 'on-track' ? 'border-green-500/30 bg-green-500/5' : f.status === 'blocked' ? 'border-red-500/30 bg-red-500/5' : 'border-amber-500/30 bg-amber-500/5'}`}>
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium text-white/90">{f.area}</p>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${f.status === 'on-track' ? 'text-green-400 bg-green-400/10' : f.status === 'blocked' ? 'text-red-400 bg-red-400/10' : 'text-amber-400 bg-amber-400/10'}`}>{f.status}</span>
            </div>
            <p className="text-xs text-white/50 mt-1">{f.recommendation}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Value Case */}
    <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/20 rounded-xl p-6">
      <h3 className="text-sm font-bold text-purple-300 mb-4">Why $8K is a Steal — Neil&apos;s Value Case</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center"><p className="text-2xl font-bold text-white">1.75M</p><p className="text-[10px] text-white/40">total followers</p></div>
        <div className="text-center"><p className="text-2xl font-bold text-white">$17.2K</p><p className="text-[10px] text-white/40">monthly impression value</p></div>
        <div className="text-center"><p className="text-2xl font-bold text-green-400">$3.80</p><p className="text-[10px] text-white/40">CPM (market: $8-15)</p></div>
      </div>
      <p className="text-xs text-white/50">{valueCase.audienceValue.discount}. Neil gets $17K+ impression value for $8K. High-intent hardware buyers, not casual viewers.</p>
    </div>

    {/* Narrative */}
    <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
      <h3 className="text-sm font-bold text-white/80 mb-3">&quot;{valueCase.narrativeAngle.headline}&quot;</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <p className="text-[10px] font-mono text-blue-400 mb-1 uppercase">For Neil</p>
          <p className="text-xs text-white/60">{valueCase.narrativeAngle.forBrand}</p>
        </div>
        <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
          <p className="text-[10px] font-mono text-green-400 mb-1 uppercase">For Jacob</p>
          <p className="text-xs text-white/60">{valueCase.narrativeAngle.forCreator}</p>
        </div>
      </div>
    </div>

    {/* Engine Insights */}
    <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
      <h3 className="text-sm font-bold text-white/80 mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-purple-400" /> Engine Insights</h3>
      <div className="space-y-3">
        {insights.filter(i => i.priority !== 'medium').slice(0, 5).map(ins => (
          <div key={ins.id} className="p-3 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">{ins.type}</span>
              <p className="text-sm font-medium text-white/90">{ins.title}</p>
            </div>
            <p className="text-xs text-white/50">{ins.insight.slice(0, 150)}...</p>
          </div>
        ))}
      </div>
    </div>
  </>);
}

function CreativeSection() {
  return (<>
    <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
      <div className="inline-block bg-purple-500/20 text-purple-400 text-[10px] font-mono px-2 py-0.5 rounded mb-3 uppercase">Content Plan</div>
      <h3 className="text-lg font-bold mb-1">2 Shorts + 1 Long-Form / Month</h3>
      <p className="text-xs text-white/50 mb-4">All content must include gameplay. No standalone rig shilling.</p>
      <div className="grid md:grid-cols-3 gap-4">
        <ContentCard type="SHORT" freq="Every 2 weeks" title="DCS Gameplay Short" reach="1M+ imps" desc="P1 gear visible in cockpit POV. Link in bio. Promo code in caption." />
        <ContentCard type="SHORT" freq="Every 2 weeks" title="Combat / Skill Short" reach="1M+ imps" desc="High-energy kills/landings with gear in frame. Cross-posted IG/TT/YT." />
        <ContentCard type="LONG" freq="1/month max" title="Force Feedback First Flight" reach="50K-100K views" desc="Full DCS mission. Genuine reaction. Affiliate in description + pinned." />
      </div>
    </div>
    <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
      <p className="text-xs text-red-300 font-medium">⚠️ Rules: ALL content must include gameplay. No unboxings without gameplay context. RAAF early-access needs clearance. Long-form must be easy — opp cost is $3K/short.</p>
    </div>
  </>);
}

function KPIsSection() {
  return (<>
    <div className="grid md:grid-cols-3 gap-4">
      <KPICard label="Attributed Revenue" target="$10K+" method="JACOBDCS promo code" critical />
      <KPICard label="Short-Form Reach" target="2M+/month" method="IG + TT + YT Shorts" />
      <KPICard label="CTR on Links" target="2.5%+" method="UTM in GA4" />
    </div>
    <div className="grid md:grid-cols-3 gap-4">
      <KPICard label="Affiliate Sales" target="4+ rigs/month" method="Shopify code tracking" />
      <KPICard label="Long-Form Views" target="50K+" method="YouTube Analytics" />
      <KPICard label="First Sale" target="< 14 days" method="Post-content attribution" critical />
    </div>
    <div className="bg-[#161616] border border-white/10 rounded-xl p-5">
      <h3 className="text-sm font-bold text-white/80 mb-3">Attribution Stack</h3>
      <div className="grid md:grid-cols-2 gap-3 text-xs text-white/60">
        <p>🏷️ <strong className="text-white/80">Promo Code:</strong> JACOBDCS at p1simgear.com.au checkout</p>
        <p>🔗 <strong className="text-white/80">UTM Links:</strong> utm_source=jacob&utm_medium=youtube&utm_campaign=p1_flight</p>
        <p>📊 <strong className="text-white/80">Monthly Report:</strong> Views, clicks, code uses, sales, revenue, ROI</p>
        <p>🎯 <strong className="text-white/80">Retargeting:</strong> GA4 audience from UTM visitors → product ads</p>
      </div>
    </div>
  </>);
}

function RosterSection() {
  return (<>
    <div className="bg-[#161616] border border-white/10 rounded-xl p-6 mb-4">
      <div className="inline-block bg-purple-500/20 text-purple-400 text-[10px] font-mono px-2 py-0.5 rounded mb-2 uppercase">Expansion</div>
      <p className="text-xs text-white/50">Once Jacob proves the model, these become sign targets. Ask: &quot;Who else in DCS creates content?&quot;</p>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      {EXPANSION_CREATORS.map(c => (
        <div key={c.name} className="bg-[#161616] border border-white/10 rounded-xl p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-sm">{c.name}</h4>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${c.priority === 'HIGH' ? 'bg-red-500/20 text-red-300' : c.priority === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300' : 'bg-white/10 text-white/40'}`}>{c.priority}</span>
          </div>
          <p className="text-[10px] text-white/40 mb-1">{c.platform} · {c.subs}</p>
          <p className="text-xs text-white/60">{c.niche}</p>
          <p className="text-xs text-purple-400 mt-2">{c.note}</p>
        </div>
      ))}
    </div>
  </>);
}

function ClosersSection() {
  const objections = [
    { q: 'Never done brand deals', a: "That's ideal — first integration always converts highest." },
    { q: "Don't want to sell out", a: '1 post/week is paid. Other 3-4 are pure DCS.' },
    { q: "What if gear's not good?", a: "You try first. If not up to standard, we don't feature it." },
    { q: 'How much?', a: 'Around $4,800/month for 4 posts, plus affiliate on top.' },
    { q: "What's the catch?", a: 'Non-exclusive. 14 days notice. You own all content.' },
    { q: 'Need to think', a: "Totally. Brand's ready to move — let's lock this week." },
  ];
  return (<>
    <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
      <h3 className="text-sm font-bold text-white/80 mb-4">Objection → Response</h3>
      <div className="space-y-3">
        {objections.map((o, i) => (
          <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5">
            <p className="text-xs text-red-300 font-medium">&quot;{o.q}&quot;</p>
            <p className="text-xs text-green-300 mt-1">→ &quot;{o.a}&quot;</p>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/20 rounded-xl p-5">
      <p className="text-sm font-bold text-green-300 mb-2">The Ultimate Close</p>
      <p className="text-sm text-green-200/80 italic">&quot;Worst case: free flight sim gear. Give me 14 days notice if it&apos;s not for you. Keep the gear.&quot;</p>
    </div>
  </>);
}

function AffiliateSection() {
  return (<>
    <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
      <div className="inline-block bg-purple-500/20 text-purple-400 text-[10px] font-mono px-2 py-0.5 rounded mb-3 uppercase">Always-On</div>
      <h3 className="text-lg font-bold mb-1">Affiliate = Low-Key Background Revenue</h3>
      <p className="text-xs text-white/50 mb-4">Not the pitch. The cherry on top. Links in every description forever. Compounding.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead><tr className="text-white/40 border-b border-white/10">
            <th className="text-left p-2">Product</th><th className="text-right p-2">Price</th><th className="text-right p-2">Jacob</th><th className="text-right p-2">You</th>
          </tr></thead>
          <tbody className="text-white/70">
            <tr className="border-b border-white/5"><td className="p-2">Fighter Pilot Pack</td><td className="text-right p-2">$3,099</td><td className="text-right p-2 text-green-400">$150</td><td className="text-right p-2 text-purple-400">$150</td></tr>
            <tr className="border-b border-white/5"><td className="p-2">VIRPIL HOSAS Bundle</td><td className="text-right p-2">$2,149</td><td className="text-right p-2 text-green-400">$100</td><td className="text-right p-2 text-purple-400">$100</td></tr>
            <tr><td className="p-2 font-bold">Full Custom Rig</td><td className="text-right p-2">$10K+</td><td className="text-right p-2 text-green-400 font-bold">$500</td><td className="text-right p-2 text-purple-400 font-bold">$500</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </>);
}

function AmpSection() {
  return (<>
    <div className="grid md:grid-cols-3 gap-4">
      <PhaseCard phase={1} title="Organic Only" desc="Baseline. No paid spend. Prove organic converts." items={['4 posts organic','Track promo code','Build attribution baseline','Cost: $0']} color="blue" />
      <PhaseCard phase={2} title="Spark Ads" desc="Boost top-performing content as YouTube ads." items={['Boost reveal video','Target flight sim audience','Budget: $500-1K/mo','2-3x organic reach']} color="purple" />
      <PhaseCard phase={3} title="Full Stack" desc="Retargeting + search + pre-rolls. Full funnel." items={['Retarget video viewers','Google Shopping ads','YouTube pre-roll on DCS','Budget: $2-5K/mo']} color="green" />
    </div>
  </>);
}

function RevenueSection() {
  return (<>
    <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
      <h3 className="text-sm font-bold text-white/80 mb-4">Monthly Revenue Stack</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-white/60">Agency fee</span><span className="text-green-400 font-bold">$1,500</span></div>
        <div className="flex justify-between"><span className="text-white/60">Commission (20%)</span><span className="text-green-400 font-bold">$1,200</span></div>
        <div className="flex justify-between"><span className="text-white/60">Affiliate (est.)</span><span className="text-amber-400">$450</span></div>
        <div className="border-t border-white/10 pt-2 flex justify-between"><span className="text-white font-bold">Total</span><span className="text-green-400 font-bold text-lg">$3,150/mo</span></div>
      </div>
    </div>
    <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/20 rounded-xl p-6">
      <h3 className="text-sm font-bold text-green-300 mb-3">Annual Projection</h3>
      <div className="grid grid-cols-4 gap-4 text-center">
        <div><p className="text-xl font-bold text-white">$32.4K</p><p className="text-[10px] text-white/40">retainer</p></div>
        <div><p className="text-xl font-bold text-white">$5.4K</p><p className="text-[10px] text-white/40">affiliate</p></div>
        <div><p className="text-xl font-bold text-green-400">$37.8K</p><p className="text-[10px] text-white/40">year 1</p></div>
        <div><p className="text-xl font-bold text-purple-400">$180K+</p><p className="text-[10px] text-white/40">3 creators scaled</p></div>
      </div>
    </div>
  </>);
}

function LearningsSection() {
  const categories = [...new Set(LEARNINGS.map(l => l.category))];
  return (<>
    <div className="grid grid-cols-3 gap-3 mb-4">
      <Metric label="Learnings" value={String(LEARNINGS.length)} sub="total" />
      <Metric label="Categories" value={String(categories.length)} sub="tracked" />
      <Metric label="Deals" value={String(COLLABS.length)} sub="active" />
    </div>
    {categories.map(cat => (
      <div key={cat} className="bg-[#161616] border border-white/10 rounded-xl p-5">
        <h3 className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-3">{cat.replace(/-/g, ' ')}</h3>
        <div className="space-y-2">
          {LEARNINGS.filter(l => l.category === cat).map((l, i) => (
            <div key={i} className="flex gap-2 items-start">
              <Star className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-white/60">{l.learning}</p>
            </div>
          ))}
        </div>
      </div>
    ))}
  </>);
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED UI COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function Metric({ label, value, sub, accent }: { label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div className="bg-[#161616] border border-white/10 rounded-xl p-4 text-center">
      <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${accent ? 'text-purple-400' : 'text-white'}`}>{value}</p>
      <p className="text-[10px] text-white/30">{sub}</p>
    </div>
  );
}

function MiniStat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
      <span className="text-lg">{icon}</span>
      <div><p className="text-xs font-bold text-white/90">{value}</p><p className="text-[10px] text-white/40">{label}</p></div>
    </div>
  );
}

function ContentCard({ type, freq, title, reach, desc }: { type: string; freq: string; title: string; reach: string; desc: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${type === 'LONG' ? 'bg-blue-500/20 text-blue-300' : 'bg-pink-500/20 text-pink-300'}`}>{type}</span>
        <span className="text-[10px] text-white/30">{reach}</span>
      </div>
      <h4 className="text-sm font-bold text-white/90 mb-1">{title}</h4>
      <p className="text-[10px] text-white/40 mb-2">{freq}</p>
      <p className="text-xs text-white/50">{desc}</p>
    </div>
  );
}

function KPICard({ label, target, method, critical }: { label: string; target: string; method: string; critical?: boolean }) {
  return (
    <div className={`bg-[#161616] border rounded-xl p-4 ${critical ? 'border-red-500/30' : 'border-white/10'}`}>
      <p className="text-xs text-white/50">{label}</p>
      <p className={`text-xl font-bold mt-1 ${critical ? 'text-red-400' : 'text-white'}`}>{target}</p>
      <p className="text-[10px] text-white/30 mt-1">{method}</p>
    </div>
  );
}

function PhaseCard({ phase, title, desc, items, color }: { phase: number; title: string; desc: string; items: string[]; color: string }) {
  const colors: Record<string, string> = { blue: 'border-blue-500/30 bg-blue-500/5', purple: 'border-purple-500/30 bg-purple-500/5', green: 'border-green-500/30 bg-green-500/5' };
  return (
    <div className={`rounded-xl p-5 border ${colors[color]}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-xs font-bold">{phase}</span>
        <h3 className="text-sm font-bold">{title}</h3>
      </div>
      <p className="text-xs text-white/50 mb-3">{desc}</p>
      <ul className="space-y-1">{items.map((item, i) => <li key={i} className="text-xs text-white/40">• {item}</li>)}</ul>
    </div>
  );
}
