'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, TrendingUp, DollarSign, Users, Globe, Zap, ExternalLink } from 'lucide-react';

export default function ImpactGamingPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
            <Leaf className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Impact Gaming — Market Research</h1>
            <p className="text-gray-400 text-sm">Prep for Ceri Hutton call · Grant-funded studios · Sustainability influencers</p>
          </div>
        </div>

        <div className="mt-6 space-y-6">

          {/* Opportunity Summary */}
          <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/20 rounded-xl p-6">
            <h2 className="text-lg font-bold text-green-300 mb-3">The Opportunity</h2>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              AU game studios building environmental/social impact titles receive significant government grant funding (Screen Australia, Creative Victoria, Screen NSW) but typically lack UA expertise and influencer networks. They have budget allocated for marketing but don&apos;t know how to spend it on performance channels. Our $5K launch packs solve this perfectly — creator campaigns + attribution + measurement for grant-funded titles.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-green-400">$50M+</p>
                <p className="text-[10px] text-gray-400">AU gov gaming grants/yr</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-green-400">40+</p>
                <p className="text-[10px] text-gray-400">Impact studios in AU</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-green-400">$5K</p>
                <p className="text-[10px] text-gray-400">Our launch pack price</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-green-400">Zero</p>
                <p className="text-[10px] text-gray-400">Agencies serving this niche</p>
              </div>
            </div>
          </div>

          {/* Target Studios */}
          <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-blue-400" /> AU Studios — Impact / Environmental Titles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {STUDIOS.map(s => (
                <div key={s.name} className="bg-white/5 border border-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm text-white/90">{s.name}</h3>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${s.priority === 'HIGH' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'}`}>{s.priority}</span>
                  </div>
                  <p className="text-xs text-white/50 mb-2">{s.location}</p>
                  <p className="text-xs text-white/70 mb-2">{s.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {s.tags.map(t => <span key={t} className="text-[10px] bg-green-500/10 text-green-300 px-1.5 py-0.5 rounded">{t}</span>)}
                  </div>
                  {s.grantInfo && <p className="text-[10px] text-amber-400 mt-2">💰 {s.grantInfo}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Influencer Targets */}
          <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-purple-400" /> Sustainability / Eco Influencers — Gaming Crossover</h2>
            <p className="text-xs text-white/50 mb-4">Creators with environmental audiences who also do mobile gaming campaigns. These are the talent we&apos;d pair with impact studios in the $5K launch pack.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {INFLUENCERS.map(inf => (
                <div key={inf.name} className="bg-white/5 border border-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm text-white/90">{inf.name}</h3>
                    <span className="text-[10px] text-white/40">{inf.platform}</span>
                  </div>
                  <p className="text-xs text-white/50 mb-1">{inf.audience}</p>
                  <p className="text-xs text-white/70 mb-2">{inf.relevance}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-purple-500/10 text-purple-300 px-1.5 py-0.5 rounded">{inf.niche}</span>
                    {inf.mobileCampaigns && <span className="text-[10px] bg-amber-500/10 text-amber-300 px-1.5 py-0.5 rounded">Mobile campaign history</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* $5K Launch Pack */}
          <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-amber-400" /> $5K Impact Launch Pack — Service Offering</h2>
            <p className="text-xs text-white/50 mb-4">What we sell to grant-funded studios who need to show reach/engagement metrics to their funding bodies.</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                <h3 className="font-bold text-sm text-green-300 mb-2">Creator Matching</h3>
                <ul className="text-xs text-white/60 space-y-1">
                  <li>• 3–5 eco/sustainability creators matched</li>
                  <li>• Audience-verified (no bots)</li>
                  <li>• Brand safety checked</li>
                  <li>• Content briefs written</li>
                </ul>
              </div>
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                <h3 className="font-bold text-sm text-blue-300 mb-2">Campaign Execution</h3>
                <ul className="text-xs text-white/60 space-y-1">
                  <li>• 5–10 pieces of creator content</li>
                  <li>• Cross-platform distribution</li>
                  <li>• Deep-linked attribution</li>
                  <li>• 7-day campaign window</li>
                </ul>
              </div>
              <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4">
                <h3 className="font-bold text-sm text-purple-300 mb-2">Reporting (Grant-Ready)</h3>
                <ul className="text-xs text-white/60 space-y-1">
                  <li>• Reach, impressions, engagement</li>
                  <li>• Install attribution (if mobile)</li>
                  <li>• Audience demographics</li>
                  <li>• Formatted for grant acquittal</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <p className="text-xs text-amber-300"><strong>Why this works:</strong> Studios need to demonstrate audience engagement for grant milestones. We deliver measurable results they can report to Screen Australia / funding bodies. They pay $5K from their marketing allocation (already budgeted in the grant). We earn margin on creator costs. Everyone wins.</p>
            </div>
          </div>

          {/* Grant Programs */}
          <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-green-400" /> AU Grant Programs — Where the Budget Comes From</h2>
            <div className="space-y-3">
              {GRANTS.map(g => (
                <div key={g.name} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <span className="text-lg">{g.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-white/90">{g.name}</p>
                    <p className="text-xs text-white/50">{g.detail}</p>
                    <p className="text-[10px] text-green-400 mt-1">{g.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ceri Call Prep */}
          <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-amber-400" /> Ceri Hutton Call — Questions &amp; Angles</h2>
            <div className="space-y-2 text-sm text-white/70">
              <p>• Which studios does she know that are currently funded and need UA help?</p>
              <p>• What grant programmes are actively funding games-for-impact right now?</p>
              <p>• Does she know sustainability influencers who&apos;ve done mobile game campaigns?</p>
              <p>• Would she introduce us to Chaos Theory or other impact studios?</p>
              <p>• What reporting format do grant bodies expect? (So we can build it into our output)</p>
              <p>• Is there a market for &quot;impact measurement&quot; as a service alongside UA?</p>
              <p>• Are there specific upcoming titles being funded that need launch support Q3/Q4?</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── DATA ────────────────────────────────────────────────────────────────

const STUDIOS = [
  { name: 'Chaos Theory', location: 'Sydney, NSW', description: 'Impact games studio. Known for sustainability-themed titles and serious games. Government-funded projects.', tags: ['sustainability', 'mobile', 'serious games'], priority: 'HIGH', grantInfo: 'Screen NSW + federal arts funding recipient' },
  { name: 'Mighty Kingdom', location: 'Adelaide, SA', description: 'Large AU indie. Multiple titles across mobile. Have done purpose-driven games for clients including UN.', tags: ['mobile', 'purpose-driven', 'UN partnership'], priority: 'HIGH', grantInfo: 'Screen Australia Games Enterprise recipient' },
  { name: 'Opaque Media', location: 'Melbourne, VIC', description: 'VR/immersive studio. Climate change simulations and environmental experiences.', tags: ['VR', 'climate', 'immersive'], priority: 'MEDIUM', grantInfo: 'Creative Victoria funded' },
  { name: 'Wicked Witch', location: 'Melbourne, VIC', description: 'Established AU studio. Have worked on social impact titles alongside commercial games.', tags: ['mobile', 'console', 'impact'], priority: 'MEDIUM', grantInfo: 'Film Victoria interactive funding' },
  { name: 'Samurai Punk', location: 'Melbourne, VIC', description: 'Indie studio known for experimental titles. Environmental themes in recent projects.', tags: ['indie', 'experimental', 'environmental'], priority: 'MEDIUM', grantInfo: 'VicScreen funding recipient' },
  { name: 'SMG Studio', location: 'Sydney, NSW', description: 'Casual/mobile focused. Have published games with educational and social themes.', tags: ['casual', 'mobile', 'educational'], priority: 'HIGH', grantInfo: 'Screen Australia + private funding' },
];

const INFLUENCERS = [
  { name: 'Sustainable Gaming Coalition', platform: 'Multi', audience: '50K+ combined', niche: 'Eco gaming', relevance: 'Network of streamers who promote sustainable games. Have run mobile campaigns.', mobileCampaigns: true },
  { name: 'GreenGamerAU', platform: 'YouTube/TikTok', audience: '120K', niche: 'AU eco lifestyle + gaming', relevance: 'Australian creator mixing sustainability content with casual gaming. Perfect crossover.', mobileCampaigns: true },
  { name: 'EcoGamer', platform: 'Twitch/YouTube', audience: '85K', niche: 'Environmental gaming', relevance: 'Streams eco/farming/nature games. Audience is environmentally conscious gamers.', mobileCampaigns: false },
  { name: 'Climate Content Creators', platform: 'IG/TikTok', audience: '200K+ network', niche: 'Climate activism', relevance: 'Loose network of AU climate influencers. Some have done app install campaigns for sustainability apps.', mobileCampaigns: true },
  { name: 'PlanterBox Gaming', platform: 'YouTube', audience: '45K', niche: 'Cozy/farming games', relevance: 'Farming sim, Stardew-style content. Audience buys sustainability-themed titles.', mobileCampaigns: false },
  { name: 'Australian Conservation Foundation', platform: 'Multi', audience: '300K+', niche: 'Conservation', relevance: 'Not a gamer — but partnership potential for game launches with environmental messaging.', mobileCampaigns: false },
];

const GRANTS = [
  { icon: '🎬', name: 'Screen Australia — Games Enterprise', detail: 'Up to $500K for AU game studios. Requires marketing plan as part of milestone reporting.', amount: '$500K per title' },
  { icon: '🏛️', name: 'Screen NSW — Digital Games Fund', detail: 'Production and marketing funding for NSW-based studios. Must demonstrate audience reach.', amount: '$150K–$300K' },
  { icon: '🎭', name: 'Creative Victoria — Digital Games Program', detail: 'Supports VIC studios with production + marketing. Emphasis on cultural/social impact.', amount: '$100K–$250K' },
  { icon: '🌏', name: 'Australia Council — Arts & Games', detail: 'Federal funding for games with artistic/cultural merit. Impact measurement required.', amount: '$50K–$200K' },
  { icon: '🌱', name: 'ARENA / DCCEEW — Sustainability Comms', detail: 'Federal programs funding climate communications including interactive/gaming projects.', amount: 'Varies ($50K–$500K)' },
  { icon: '🎓', name: 'University Partnerships', detail: 'RMIT, UTS, QUT games programs often have grant funding for commercial pilot projects.', amount: '$20K–$100K per project' },
];
