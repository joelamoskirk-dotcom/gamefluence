'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Download, Phone, DollarSign, Users, TrendingUp, Target, Zap, Award, BarChart3, ExternalLink, CheckCircle2, Circle, Clock, Star, Rocket, Shield } from 'lucide-react';
import { COLLABS, EXPANSION_CREATORS, LEARNINGS, getActiveCollabs, getTotalMonthlyRevenue } from '@/lib/collabs-data';
import { generateInsights, buildJacobValueCase, getWhatsFocusedOn } from '@/lib/collabz-strategy-engine';

type TabId = 'overview' | 'strategy' | 'creative' | 'kpis' | 'expansion' | 'closers' | 'affiliate' | 'paid-amp' | 'revenue' | 'learnings';

const TABS: { id: TabId; num: number; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', num: 1, label: 'Deal Overview', icon: <Target className="w-4 h-4" /> },
  { id: 'strategy', num: 2, label: 'Strategy Engine', icon: <Shield className="w-4 h-4" /> },
  { id: 'creative', num: 3, label: 'Creative Mockups', icon: <Zap className="w-4 h-4" /> },
  { id: 'kpis', num: 4, label: 'KPIs & Metrics', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'expansion', num: 5, label: 'Expansion Creators', icon: <Users className="w-4 h-4" /> },
  { id: 'closers', num: 6, label: 'Closers & Objections', icon: <Award className="w-4 h-4" /> },
  { id: 'affiliate', num: 7, label: 'Affiliate Engine', icon: <DollarSign className="w-4 h-4" /> },
  { id: 'paid-amp', num: 8, label: 'Paid Amplification', icon: <Rocket className="w-4 h-4" /> },
  { id: 'revenue', num: 9, label: 'Revenue Sizing', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'learnings', num: 10, label: 'Learnings', icon: <Star className="w-4 h-4" /> },
];

export default function CollabsV4Page() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 sm:px-8 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg text-gray-900">CollabZ</span>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">LIVE</span>
        </div>
        <div className="flex gap-3 text-sm items-center">
          <button
            onClick={() => window.open('/api/call-script-pdf', '_blank')}
            className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Call Script PDF
          </button>
          <Link href="/admin" className="text-gray-600 hover:text-gray-900">Admin</Link>
          <Link href="/dashboard/talent" className="text-gray-600 hover:text-gray-900">Talent</Link>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 overflow-x-auto">
        <div className="flex gap-1 py-2 min-w-max">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold ${
                activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.num}
              </span>
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'strategy' && <StrategyTab />}
        {activeTab === 'creative' && <CreativeMockupsTab />}
        {activeTab === 'kpis' && <KPIsTab />}
        {activeTab === 'expansion' && <ExpansionCreatorsTab />}
        {activeTab === 'closers' && <ClosersTab />}
        {activeTab === 'affiliate' && <AffiliateTab />}
        {activeTab === 'paid-amp' && <PaidAmpTab />}
        {activeTab === 'revenue' && <RevenueTab />}
        {activeTab === 'learnings' && <LearningsTab />}
      </div>
    </div>
  );
}

// ─── TAB 1: DEAL OVERVIEW ───────────────────────────────────────────────
function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">Jacob Tabor × P1 Sim Gear</h2>
            <p className="text-blue-100 mt-1">Flight Sim Creator Partnership — DCS Community</p>
            <p className="text-blue-200 text-sm mt-2">✅ Call complete Jul 3 — KEEN. Sending agreement.</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">$2,700</p>
            <p className="text-blue-200 text-sm">/month your take</p>
            <p className="text-blue-100 text-xs mt-1">+ affiliate passive</p>
          </div>
        </div>
      </div>

      {/* Key Numbers Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="His Fee" value="$4,800" sub="/month for 4 posts" />
        <StatCard label="Brand Spend" value="$8,000" sub="/month total to P1" />
        <StatCard label="Your Margin" value="34%" sub="$2,700/mo + affiliate" />
        <StatCard label="Affiliate" value="$1K/rig" sub="50/50 split" />
      </div>

      {/* Jacob's Reach */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Jacob&apos;s Ecosystem (Confirmed on Call)</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <MetricCard icon="📸" label="Instagram" value="750K" sub="followers" />
          <MetricCard icon="🎵" label="TikTok" value="750K" sub="followers" />
          <MetricCard icon="🎬" label="YouTube" value="250K" sub="subs (the funnel)" />
          <MetricCard icon="🔥" label="Shorts" value="1M+" sub="imps per short" />
          <MetricCard icon="💰" label="Short Rev" value="$3K" sub="per short earned" />
        </div>
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-800"><strong>Day job:</strong> RAAF (Royal Australian Air Force). Any early-access DCS builds need clearance before release. Standard DCS content is fine.</p>
        </div>
      </div>

      {/* Key Lines — what to say */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-green-600" /> Call Outcomes & Next Steps
        </h3>
        <div className="space-y-3">
          <KeyLine label="Status" line="Keen to proceed. Sending representation agreement." />
          <KeyLine label="Content" line="2 shorts/month (every 2 weeks) + 1 long-form/month. Must include gameplay." />
          <KeyLine label="Rule" line="No rig shilling. All content must integrate with DCS gameplay naturally." />
          <KeyLine label="Wants" line="Force feedback stick, entry level kits, DCS-branded pack idea." />
          <KeyLine label="Affiliates" line="Asked about it — positive. Accepted 20% management fee." />
          <KeyLine label="Next" line="Send agreement → Neil brief → Ship force feedback stick → First short by Jul 14-18." />
        </div>
      </div>

      {/* Competitive Intel */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-3">Competitive Intel (From Jacob)</h3>
        <div className="space-y-2 text-sm">
          <p className="text-gray-700">• <strong>Thrustmaster</strong> — has existing collab. P1 must differentiate.</p>
          <p className="text-gray-700">• <strong>Wind Control</strong> — Chinese brand offered a selling opp. Not enthusiastic.</p>
          <p className="text-gray-700">• <strong>VKB</strong> — bought himself. Likes it. Could be option or conflict.</p>
          <p className="text-gray-700">• <strong>Grinelli Designs</strong> — played Flight Sim Expo with them.</p>
        </div>
        <p className="text-xs text-blue-600 mt-3">P1 angle: AU-local, custom DCS-branded gear, force feedback, entry level kits — things Thrustmaster won&apos;t do.</p>
      </div>
    </div>
  );
}

// ─── TAB 2: STRATEGY ENGINE ──────────────────────────────────────────────
function StrategyTab() {
  const insights = generateInsights();
  const valueCase = buildJacobValueCase();
  const focus = getWhatsFocusedOn();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Strategy Engine — What&apos;s Working &amp; Where to Focus</h2>

      {/* Focus Areas */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">🎯 Current Focus (Priority Order)</h3>
        <div className="space-y-3">
          {focus.map((f, i) => (
            <div key={i} className={`p-4 rounded-lg border ${
              f.status === 'on-track' ? 'border-green-200 bg-green-50' :
              f.status === 'blocked' ? 'border-red-200 bg-red-50' :
              'border-amber-200 bg-amber-50'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{f.area}</p>
                  <p className="text-xs text-gray-600 mt-1">{f.recommendation}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  f.status === 'on-track' ? 'bg-green-200 text-green-800' :
                  f.status === 'blocked' ? 'bg-red-200 text-red-800' :
                  'bg-amber-200 text-amber-800'
                }`}>{f.status}</span>
              </div>
              {f.metric && <p className="text-xs text-gray-500 mt-2 italic">Metric: {f.metric}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Value Case for Neil */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-xl p-6 text-white">
        <h3 className="font-bold text-lg mb-3">Why $8K is a Steal — Neil&apos;s Value Case</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <p className="text-2xl font-bold">{valueCase.audienceValue.totalReach.toLocaleString()}</p>
            <p className="text-xs text-blue-200">Total followers</p>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <p className="text-2xl font-bold">${(valueCase.audienceValue.totalMonthlyImpressionValue / 1000).toFixed(1)}K</p>
            <p className="text-xs text-blue-200">Monthly impression value</p>
          </div>
          <div className="text-center p-3 bg-white/10 rounded-lg">
            <p className="text-2xl font-bold">$3.80</p>
            <p className="text-xs text-blue-200">Effective CPM (market: $8-15)</p>
          </div>
        </div>
        <p className="text-blue-100 text-sm">{valueCase.audienceValue.discount} — Neil gets $17K+ in impression value for $8K. His audience is high-intent hardware buyers, not casual viewers.</p>
      </div>

      {/* Narrative Angle */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-3">📖 Content Narrative: &quot;{valueCase.narrativeAngle.headline}&quot;</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-semibold text-blue-900 text-sm mb-1">For Neil (brand)</p>
            <p className="text-xs text-blue-800">{valueCase.narrativeAngle.forBrand}</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-green-900 text-sm mb-1">For Jacob (creator)</p>
            <p className="text-xs text-green-800">{valueCase.narrativeAngle.forCreator}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-3 italic">&quot;{valueCase.narrativeAngle.contentHook}&quot;</p>
      </div>

      {/* Strategic Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">🧠 Engine Insights</h3>
        <div className="space-y-3">
          {insights.filter(i => i.priority === 'critical' || i.priority === 'high').map((insight) => (
            <div key={insight.id} className={`p-4 rounded-lg border ${
              insight.priority === 'critical' ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'
            }`}>
              <div className="flex items-start gap-2">
                <span className={`text-xs px-2 py-0.5 rounded font-bold mt-0.5 ${
                  insight.priority === 'critical' ? 'bg-red-200 text-red-800' : 'bg-blue-200 text-blue-800'
                }`}>{insight.type}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{insight.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{insight.insight}</p>
                  <p className="text-xs text-gray-500 mt-2 italic">→ {insight.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attribution Strategy */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-3">🔗 Attribution-First Strategy</h3>
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
          <p className="font-semibold text-green-900 text-sm">Goal: {valueCase.attributionStrategy.firstSaleGoal}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-700"><strong>Primary:</strong> {valueCase.attributionStrategy.primaryMethod}</p>
          {valueCase.attributionStrategy.secondaryMethods.map((m, i) => (
            <p key={i} className="text-sm text-gray-600">• {m}</p>
          ))}
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800"><strong>Premium touch:</strong> {valueCase.attributionStrategy.personalTouchIdea}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB 3: CREATIVE MOCKUPS ────────────────────────────────────────────
function CreativeMockupsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Revised Content Plan — Based on Call</h2>
      <p className="text-gray-600 text-sm">Jacob&apos;s rule: all content must include gameplay. No standalone rig shilling. Shorts are his strength.</p>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Short 1 */}
        <ContentMockup
          week={1}
          type="Short-Form (Paid)"
          title="DCS Night Carrier Landing — POV with P1 Gear"
          description="15-60s short. Hands on P1 HOTAS, cockpit view, gameplay footage. Gear visible naturally. Link in bio."
          integration="P1 gear visible in use. 'My setup' tag in caption. Link in bio."
          thumbnail="✈️ Cockpit POV + hands on gear + carrier landing"
          expectedViews="1M+ impressions"
        />
        {/* Short 2 */}
        <ContentMockup
          week={3}
          type="Short-Form (Paid)"
          title="DCS Dogfight — Full Deflection Kill Compilation"
          description="15-60s short. Combat gameplay with P1 gear in frame. High energy edit. Cross-posted IG/TT/YT."
          integration="Gear in frame during gameplay. Promo code in caption."
          thumbnail="💥 Gun camera + hands on stick + kill feed"
          expectedViews="1M+ impressions"
        />
        {/* Long-form */}
        <ContentMockup
          week={4}
          type="Long-Form (Paid)"
          title="First Flight with Force Feedback — Full Mission"
          description="10-15min. Genuine first reaction to force feedback stick. Full DCS mission with gear in use. NOT a product review."
          integration="Natural gameplay integration. P1 force feedback stick as the story. Affiliate link in description + pinned comment."
          thumbnail="🎮 First flight reaction + full mission gameplay"
          expectedViews="50K–100K views"
        />
        {/* Camera Reveal Opportunity */}
        <ContentMockup
          week={2}
          type="Bonus (Organic)"
          title="New Camera Setup Reveal + Rig Tour"
          description="Jacob has a new camera coming. Setup reveal content showing full rig including P1 gear. No hard sell."
          integration="Organic brand visibility — P1 gear is just part of the rig. No paid integration needed."
          thumbnail="📷 Camera BTS + full setup + rig visible"
          expectedViews="200K–500K"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-2">Monthly Reach Projection</h3>
        <p className="text-blue-800 text-sm">
          2 shorts (2M+ impressions) + 1 long-form (50K–100K views) = <strong>2.1M–2.2M monthly reach minimum</strong>.
          That&apos;s 4x what we originally projected. His shorts alone are worth the $8K.
        </p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl p-5">
        <h3 className="font-semibold text-red-900 mb-2">⚠️ Content Rules (Non-Negotiable)</h3>
        <ul className="text-sm text-red-800 space-y-1">
          <li>• ALL content must include genuine DCS gameplay</li>
          <li>• No standalone product reviews / unboxings without gameplay context</li>
          <li>• Gear must be shown in-use, not just sitting on a desk</li>
          <li>• Early access DCS builds need RAAF approval before publishing</li>
          <li>• Long-form must be easy to produce — his opportunity cost is $3K+ per short forgone</li>
        </ul>
      </div>
    </div>
  );
}

// ─── TAB 3: KPIs & METRICS ──────────────────────────────────────────────
function KPIsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">KPIs — What We Track for P1</h2>

      {/* Primary KPIs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-green-600" /> Primary KPIs (Report to Neil Monthly)
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <KPICard metric="Attributed Revenue" target="$10K+" method="JACOBDCS promo code orders" status="kill-threshold" />
          <KPICard metric="Views Per Post" target="34K–60K" method="YouTube Analytics (Jacob shares)" status="baseline" />
          <KPICard metric="Click-Through Rate" target="2.5%+" method="UTM links in P1 GA" status="conservative" />
        </div>
      </div>

      {/* Secondary KPIs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Secondary KPIs</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <KPICard metric="Affiliate Sales" target="4+ rigs/month" method="Shopify code tracking" status="upside" />
          <KPICard metric="Engagement Rate" target="8%+" method="Comments + shares / views" status="baseline" />
          <KPICard metric="Audience Sentiment" target="Positive" method="Comment sentiment analysis" status="monitor" />
        </div>
      </div>

      {/* Tracking Methods */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Attribution Stack</h3>
        <div className="space-y-3">
          <TrackingRow icon="🏷️" method="Promo Code" detail="JACOBDCS — applied at checkout. Neil pulls Shopify report." />
          <TrackingRow icon="🔗" method="UTM Links" detail="p1simgear.com.au/...?utm_source=jacob&utm_medium=youtube&utm_campaign=p1_flight" />
          <TrackingRow icon="📊" method="Monthly Report" detail="Views, clicks, code uses, sales, revenue, ROI — delivered to Neil within 5 days of month-end" />
          <TrackingRow icon="💰" method="Affiliate Layer" detail="Separate tracking on high-value items. Commission on actual sales only." />
        </div>
      </div>

      {/* Kill Threshold */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-5">
        <h3 className="font-semibold text-red-900 mb-2">⚠️ Kill Threshold</h3>
        <p className="text-red-800 text-sm">
          Neil can cancel if promo code shows &lt;$10K in attributed sales after month 3.
          But at 2.5% CTR × 0.8% conversion × $3K AOV, we project $14K–$18K/month attributed revenue from organic alone.
        </p>
      </div>
    </div>
  );
}

// ─── TAB 4: EXPANSION CREATORS ──────────────────────────────────────────
function ExpansionCreatorsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Expansion Roster — Flight Sim Vertical</h2>
      <p className="text-gray-600 text-sm">Once Jacob proves the model, these creators become sign targets. Ask Jacob: &quot;Who else in DCS creates content?&quot;</p>

      <div className="grid md:grid-cols-2 gap-5">
        <CreatorCard
          name="Growling Sidewinder"
          platform="YouTube"
          subs="450K+"
          niche="DCS dogfight tutorials, tactics breakdowns"
          fit="Hardware review potential — uses complex HOTAS setups"
          priority="HIGH"
          note="Top DCS combat creator globally. Would validate the vertical."
        />
        <CreatorCard
          name="Spudknocker"
          platform="YouTube"
          subs="180K+"
          niche="DCS mission building, mod reviews, carrier ops"
          fit="Deep technical audience — high hardware spend"
          priority="HIGH"
          note="Loyal community, great for long-form gear deep-dives"
        />
        <CreatorCard
          name="Grim Reapers"
          platform="YouTube"
          subs="640K+"
          niche="DCS multiplayer squadrons, large-scale combat"
          fit="Multiple members = multiple integration points"
          priority="MEDIUM"
          note="Group channel — need to identify individual creator contacts"
        />
        <CreatorCard
          name="Ralfidude"
          platform="YouTube"
          subs="120K+"
          niche="Cinematic DCS content, sim racing crossover"
          fit="Crosses into sim racing — opens second brand vertical"
          priority="MEDIUM"
          note="Sim racing crossover = future P1 racing sim gear angle"
        />
        <CreatorCard
          name="Casmo"
          platform="YouTube"
          subs="95K+"
          niche="Real helicopter pilot plays DCS — authenticity goldmine"
          fit="Real-world credibility makes hardware recs very powerful"
          priority="HIGH"
          note="Former military — audience trusts gear recommendations implicitly"
        />
        <CreatorCard
          name="Matt Wagner (ED)"
          platform="YouTube"
          subs="85K+"
          niche="Eagle Dynamics community manager — DCS official"
          fit="Insider credibility, but conflict of interest with ED products"
          priority="LOW"
          note="Gateway to Eagle Dynamics partnership, not direct talent sign"
        />
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <h3 className="font-semibold text-green-900 mb-2">🎯 The Flywheel</h3>
        <p className="text-green-800 text-sm">
          Jacob × P1 → proves model → signs more DCS creators → pitches Virpil, Winwing, VKB, Thrustmaster →
          becomes THE flight sim talent agency. Zero competition in AU. You&apos;re first.
        </p>
      </div>
    </div>
  );
}

// ─── TAB 5: CLOSERS & OBJECTIONS ────────────────────────────────────────
function ClosersTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Closers & Objection Handling</h2>
      <p className="text-gray-600 text-sm">Quick-reference for the call. Every objection has a pre-loaded response.</p>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <ObjectionRow
          objection="Never done brand deals"
          response="That's ideal — your audience hasn't been sold to yet. First integration always converts highest."
        />
        <ObjectionRow
          objection="Don't want to sell out"
          response="Neither do I. 1 post/week is paid, the other 3-4 are pure DCS. Your audience won't feel it."
        />
        <ObjectionRow
          objection="What if the gear's not good?"
          response="You try it first. If it's not up to standard, we don't feature it. Your reputation comes first."
        />
        <ObjectionRow
          objection="How much do I get paid?"
          response="Based on your audience, around $4,800/month for 4 posts, plus affiliate on top."
        />
        <ObjectionRow
          objection="What's the catch?"
          response="Non-exclusive. 14 days notice. You own all content. I take 20% as management fee — standard."
        />
        <ObjectionRow
          objection="Need to think about it"
          response="Totally. I'll send you a quick summary. But the brand is ready to move — if you're keen, let's lock it this week."
        />
        <ObjectionRow
          objection="What brand is it?"
          response="AU-based flight sim hardware retailer. Once you sign representation, I'll make the intro and ship gear."
        />
        <ObjectionRow
          objection="Why me?"
          response="167K subs in DCS, 65K Discord. Your audience trusts you and they buy hardware. That's rare."
        />
      </div>

      {/* The Ultimate Close */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-6 text-white">
        <h3 className="font-bold text-lg mb-3">🎯 The Ultimate Close</h3>
        <p className="text-green-100 italic text-lg leading-relaxed">
          &quot;The worst case: you get free flight sim gear, try it, and if you don&apos;t like working with brands,
          give me 14 days notice and keep the gear.&quot;
        </p>
        <p className="text-green-200 text-sm mt-3">Zero downside framing. He has nothing to lose. This is what gets him over the line.</p>
      </div>

      {/* Post-Call Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Post-Call Actions</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <p className="font-semibold text-green-900 text-sm mb-2">✅ If Keen</p>
            <ul className="text-xs text-green-800 space-y-1">
              <li>• Send talent signup link</li>
              <li>• Update status → &quot;accepted&quot;</li>
              <li>• Confirm with Neil → ship gear</li>
              <li>• Generate first month brief</li>
            </ul>
          </div>
          <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
            <p className="font-semibold text-amber-900 text-sm mb-2">⏳ If Thinking</p>
            <ul className="text-xs text-amber-800 space-y-1">
              <li>• Follow-up email within 2 hours</li>
              <li>• Key points: non-exclusive, free gear, $4.8K/mo, paid in 4 days</li>
              <li>• Follow up in 48 hours</li>
            </ul>
          </div>
          <div className="border border-gray-200 bg-gray-50 rounded-lg p-4">
            <p className="font-semibold text-gray-700 text-sm mb-2">❌ If Declines</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Thank him, stay connected</li>
              <li>• Ask gateway question: &quot;Who else creates DCS content?&quot;</li>
              <li>• Log as declined</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB 6: AFFILIATE ENGINE ────────────────────────────────────────────
function AffiliateTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Affiliate Engine — Passive Revenue Layer</h2>
      <p className="text-gray-600 text-sm">
        Reframed: this isn&apos;t &quot;affiliate marketing.&quot; It&apos;s a performance bonus on top of the retainer. Zero extra work for Jacob.
      </p>

      {/* How to frame it on the call */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-2">📞 How to Frame on the Call</h3>
        <p className="text-blue-800 text-sm italic">
          &quot;On top of the $4,800 monthly, there&apos;s an affiliate code. If your audience buys through your link, you earn a cut forever.
          No extra work — just links in descriptions and pinned comments. It runs indefinitely even if the retainer ends.&quot;
        </p>
      </div>

      {/* Product Commission Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Commission Structure</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">Product</th>
                <th className="text-right p-3 font-semibold text-gray-700">Price</th>
                <th className="text-right p-3 font-semibold text-gray-700">Commission</th>
                <th className="text-right p-3 font-semibold text-gray-700">Jacob Gets</th>
                <th className="text-right p-3 font-semibold text-gray-700">You Get</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-3 font-medium">Fighter Pilot Pack</td>
                <td className="p-3 text-right">$3,099</td>
                <td className="p-3 text-right">$300</td>
                <td className="p-3 text-right text-green-700 font-medium">$150</td>
                <td className="p-3 text-right text-blue-700 font-medium">$150</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">VIRPIL HOSAS Bundle</td>
                <td className="p-3 text-right">$2,149</td>
                <td className="p-3 text-right">$200</td>
                <td className="p-3 text-right text-green-700 font-medium">$100</td>
                <td className="p-3 text-right text-blue-700 font-medium">$100</td>
              </tr>
              <tr className="bg-amber-50">
                <td className="p-3 font-medium">Full Custom Flight Rig</td>
                <td className="p-3 text-right">$10,000+</td>
                <td className="p-3 text-right">$1,000</td>
                <td className="p-3 text-right text-green-700 font-bold">$500</td>
                <td className="p-3 text-right text-blue-700 font-bold">$500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Why this works */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="font-semibold text-gray-900 mb-2">For Jacob</p>
          <p className="text-gray-600 text-sm">Earns passive income on products he genuinely uses. No extra work — just links in descriptions.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="font-semibold text-gray-900 mb-2">For Neil</p>
          <p className="text-gray-600 text-sm">Only pays commission on actual sales. Zero risk. Pure performance.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="font-semibold text-gray-900 mb-2">For You</p>
          <p className="text-gray-600 text-sm">Recurring passive revenue with no management overhead. Runs even if retainer ends.</p>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <h3 className="font-semibold text-green-900 mb-2">💡 Key Insight</h3>
        <p className="text-green-800 text-sm">
          The affiliate runs indefinitely — not tied to monthly paid content. Even if the retainer ends after 3 months, the affiliate links in 12+ videos keep earning forever.
          This is compounding content.
        </p>
      </div>
    </div>
  );
}

// ─── TAB 7: PAID AMPLIFICATION ──────────────────────────────────────────
function PaidAmpTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Paid Amplification Strategy</h2>
      <p className="text-gray-600 text-sm">
        Not included in the initial $8K/month deal. This is the upsell for month 2+ once organic numbers prove the concept.
      </p>

      {/* Phase approach */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border-2 border-blue-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <h3 className="font-bold text-gray-900">Month 1: Organic Only</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">Baseline. No paid spend. Prove organic reach converts for P1.</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• 4 posts, organic distribution</li>
            <li>• Track promo code sales</li>
            <li>• Build attribution baseline</li>
            <li>• Cost: $0 additional</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl border-2 border-purple-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <h3 className="font-bold text-gray-900">Month 2: Spark Ads</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">Boost top-performing organic posts as YouTube ads. Low-risk, high-signal.</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Boost Week 4 &quot;Reveal&quot; video</li>
            <li>• Target: flight sim + HOTAS audiences</li>
            <li>• Budget: $500–$1,000/month</li>
            <li>• Expected: 2–3x organic reach</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl border-2 border-green-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <h3 className="font-bold text-gray-900">Month 3+: Full Stack</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">Retargeting + search ads + YouTube pre-rolls. Full funnel.</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Retarget video viewers with P1 product ads</li>
            <li>• Google Shopping ads for P1 products</li>
            <li>• YouTube pre-roll on DCS content</li>
            <li>• Budget: $2K–$5K/month (Neil pays)</li>
          </ul>
        </div>
      </div>

      {/* Revenue Impact */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Projected Revenue Impact with Paid Amp</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-700">$14K</p>
            <p className="text-xs text-blue-600 mt-1">Month 1 (Organic)</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-700">$28K</p>
            <p className="text-xs text-purple-600 mt-1">Month 2 (+ Spark Ads)</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-700">$45K+</p>
            <p className="text-xs text-green-600 mt-1">Month 3+ (Full Stack)</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h3 className="font-semibold text-amber-900 mb-2">💰 Your Upsell Opportunity</h3>
        <p className="text-amber-800 text-sm">
          If you manage paid amp for Neil, charge 15–20% of ad spend as management fee. At $3K/month ad spend = $450–$600/month additional revenue.
          Total monthly take goes from $2,700 → $3,150–$3,300.
        </p>
      </div>
    </div>
  );
}

// ─── TAB 8: P1 REVENUE SIZING ───────────────────────────────────────────
function RevenueTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">P1 Revenue Sizing — Your Financial Model</h2>
      <p className="text-gray-600 text-sm">Conservative projections based on Jacob&apos;s real audience data.</p>

      {/* Monthly Model */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Monthly Revenue Stack</h3>
        <div className="space-y-3">
          <RevenueRow label="Agency management fee" amount={1500} type="guaranteed" />
          <RevenueRow label="Commission (20% of $6K creator fee)" amount={1200} type="guaranteed" />
          <RevenueRow label="Affiliate passive (est. 3 rigs × $150)" amount={450} type="projected" />
          <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
            <span className="font-bold text-gray-900">Monthly Total</span>
            <span className="font-bold text-lg text-green-700">$3,150/month</span>
          </div>
        </div>
      </div>

      {/* Annual Projections */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-6 text-white">
        <h3 className="font-bold text-lg mb-4">Annual Projection — Jacob × P1 Deal Only</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold">$32.4K</p>
            <p className="text-green-200 text-sm">Retainer (guaranteed)</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">$5.4K</p>
            <p className="text-green-200 text-sm">Affiliate (projected)</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">$37.8K</p>
            <p className="text-green-200 text-sm">Year 1 Total</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">$7.2K</p>
            <p className="text-green-200 text-sm">Paid amp (if upsold)</p>
          </div>
        </div>
      </div>

      {/* Vertical Scaling */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Vertical Scaling — If You Sign 3 DCS Creators</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-semibold text-gray-700">Scenario</th>
                <th className="text-right p-3 font-semibold text-gray-700">Monthly</th>
                <th className="text-right p-3 font-semibold text-gray-700">Annual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-3">Jacob only (current deal)</td>
                <td className="p-3 text-right font-medium">$3,150</td>
                <td className="p-3 text-right font-medium">$37,800</td>
              </tr>
              <tr>
                <td className="p-3">+ 1 more creator (same rate)</td>
                <td className="p-3 text-right font-medium">$6,300</td>
                <td className="p-3 text-right font-medium">$75,600</td>
              </tr>
              <tr>
                <td className="p-3">+ 2 more creators (one at premium)</td>
                <td className="p-3 text-right font-medium">$10,500</td>
                <td className="p-3 text-right font-medium">$126,000</td>
              </tr>
              <tr className="bg-green-50 font-bold">
                <td className="p-3">+ 2nd brand (Virpil/Winwing)</td>
                <td className="p-3 text-right text-green-700">$15,000+</td>
                <td className="p-3 text-right text-green-700">$180,000+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Break-even context */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-2">📐 Break-Even Context</h3>
        <p className="text-blue-800 text-sm">
          At $3,150/month, the Jacob × P1 deal alone covers a meaningful chunk of living expenses from a single phone call.
          The vertical scaling opportunity (3 creators × 2 brands) gets you to $180K/year from flight sim alone —
          before gaming, racing sim, or APAC expansion.
        </p>
      </div>
    </div>
  );
}

// ─── TAB 9: LEARNINGS ────────────────────────────────────────────────────
function LearningsTab() {
  const collab = COLLABS[0]; // Jacob × P1
  const categories = [...new Set(LEARNINGS.map(l => l.category))];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Learnings — Accumulated Intelligence</h2>
      <p className="text-gray-600 text-sm">Every deal teaches something. This feeds into future campaigns automatically.</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{LEARNINGS.length}</p>
          <p className="text-xs text-gray-500">Total learnings</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
          <p className="text-xs text-gray-500">Categories</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{COLLABS.length}</p>
          <p className="text-xs text-gray-500">Deals tracked</p>
        </div>
      </div>

      {/* By category */}
      {categories.map(cat => (
        <div key={cat} className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-bold text-gray-900 mb-3 capitalize">{cat.replace('-', ' ')}</h3>
          <div className="space-y-2">
            {LEARNINGS.filter(l => l.category === cat).map((l, i) => (
              <div key={i} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg">
                <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-800">{l.learning}</p>
                  <p className="text-xs text-gray-400 mt-1">{l.deal} · {l.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Call Notes */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-bold text-gray-900 mb-3">Call Notes Log</h3>
        {collab.callNotes.map((note, i) => (
          <div key={i} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-semibold text-blue-900 text-sm mb-2">{note.date} — {note.summary}</p>
            <ul className="space-y-1">
              {note.keyPoints.map((point, j) => (
                <li key={j} className="text-xs text-blue-800 flex gap-2">
                  <span>•</span><span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-bold text-gray-900 mb-3">Deal Timeline</h3>
        <div className="space-y-2">
          {collab.timeline.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-2">
              {item.done ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <Circle className="w-4 h-4 text-gray-300" />
              )}
              <span className={`text-sm ${item.done ? 'text-gray-500 line-through' : 'text-gray-800'}`}>{item.milestone}</span>
              <span className="text-xs text-gray-400 ml-auto">{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <h3 className="font-semibold text-green-900 mb-2">🧠 How This Works</h3>
        <p className="text-green-800 text-sm">
          All data lives in <code className="bg-green-200 px-1 rounded text-xs">lib/collabs-data.ts</code>.
          The collabs page, briefs, ROI projections, and future campaigns all read from this single file.
          Update once → flows everywhere.
        </p>
      </div>
    </div>
  );
}

// ─── REUSABLE COMPONENTS ─────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
    </div>
  );
}

function MetricCard({ icon, label, value, sub }: { icon: string; label: string; value: string; sub: string }) {
  return (
    <div className="text-center p-3 bg-gray-50 rounded-lg">
      <span className="text-2xl">{icon}</span>
      <p className="font-bold text-gray-900 mt-1">{value}</p>
      <p className="text-xs text-gray-500">{label} · {sub}</p>
    </div>
  );
}

function KeyLine({ label, line }: { label: string; line: string }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="text-xs font-bold uppercase bg-blue-100 text-blue-700 px-2 py-0.5 rounded mt-0.5 whitespace-nowrap">{label}</span>
      <p className="text-sm text-gray-700">&quot;{line}&quot;</p>
    </div>
  );
}

function ContentMockup({ week, type, title, description, integration, thumbnail, expectedViews }: {
  week: number; type: string; title: string; description: string; integration: string; thumbnail: string; expectedViews: string;
}) {
  const isPaid = type !== 'Organic (Free)';
  return (
    <div className={`rounded-xl border-2 p-5 ${isPaid ? 'border-blue-200 bg-white' : 'border-gray-200 bg-gray-50'}`}>
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs font-bold px-2 py-0.5 rounded ${isPaid ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'}`}>
          WEEK {week} · {type}
        </span>
        <span className="text-xs text-gray-500">{expectedViews} views</span>
      </div>
      <h4 className="font-bold text-gray-900 text-sm mb-2">{title}</h4>
      <p className="text-xs text-gray-600 mb-3">{description}</p>
      <div className="bg-gray-100 rounded-lg p-3 mb-3 text-center">
        <span className="text-2xl">{thumbnail.split(' ')[0]}</span>
        <p className="text-xs text-gray-500 mt-1">{thumbnail}</p>
      </div>
      <p className="text-xs text-gray-500"><strong>Integration:</strong> {integration}</p>
    </div>
  );
}

function KPICard({ metric, target, method, status }: { metric: string; target: string; method: string; status: string }) {
  const colors: Record<string, string> = {
    'kill-threshold': 'border-red-200 bg-red-50',
    'baseline': 'border-blue-200 bg-blue-50',
    'conservative': 'border-amber-200 bg-amber-50',
    'upside': 'border-green-200 bg-green-50',
    'monitor': 'border-gray-200 bg-gray-50',
  };
  return (
    <div className={`rounded-lg border p-4 ${colors[status] || 'border-gray-200'}`}>
      <p className="font-semibold text-gray-900 text-sm">{metric}</p>
      <p className="text-xl font-bold text-gray-900 mt-1">{target}</p>
      <p className="text-xs text-gray-500 mt-2">{method}</p>
    </div>
  );
}

function TrackingRow({ icon, method, detail }: { icon: string; method: string; detail: string }) {
  return (
    <div className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg">
      <span className="text-lg">{icon}</span>
      <div>
        <p className="font-semibold text-gray-900 text-sm">{method}</p>
        <p className="text-xs text-gray-600">{detail}</p>
      </div>
    </div>
  );
}

function CreatorCard({ name, platform, subs, niche, fit, priority, note }: {
  name: string; platform: string; subs: string; niche: string; fit: string; priority: string; note: string;
}) {
  const priorityColors: Record<string, string> = {
    HIGH: 'bg-red-100 text-red-700',
    MEDIUM: 'bg-amber-100 text-amber-700',
    LOW: 'bg-gray-100 text-gray-600',
  };
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-gray-900">{name}</h4>
        <span className={`text-xs font-bold px-2 py-0.5 rounded ${priorityColors[priority]}`}>{priority}</span>
      </div>
      <p className="text-xs text-gray-500 mb-2">{platform} · {subs} subs</p>
      <p className="text-sm text-gray-700 mb-2">{niche}</p>
      <p className="text-xs text-gray-500"><strong>Fit:</strong> {fit}</p>
      <p className="text-xs text-blue-600 mt-2 italic">{note}</p>
    </div>
  );
}

function ObjectionRow({ objection, response }: { objection: string; response: string }) {
  return (
    <div className="border border-gray-100 rounded-lg p-4">
      <p className="font-semibold text-red-700 text-sm mb-1">&quot;{objection}&quot;</p>
      <p className="text-sm text-gray-700">→ &quot;{response}&quot;</p>
    </div>
  );
}

function RevenueRow({ label, amount, type }: { label: string; amount: number; type: 'guaranteed' | 'projected' }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {type === 'guaranteed' ? (
          <CheckCircle2 className="w-4 h-4 text-green-500" />
        ) : (
          <Clock className="w-4 h-4 text-amber-500" />
        )}
        <span className="text-sm text-gray-700">{label}</span>
      </div>
      <span className={`font-bold text-sm ${type === 'guaranteed' ? 'text-green-700' : 'text-amber-700'}`}>
        ${amount.toLocaleString()}
      </span>
    </div>
  );
}
