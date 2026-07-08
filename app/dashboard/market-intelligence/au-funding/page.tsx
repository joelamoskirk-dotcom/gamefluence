'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const AU_BREAKOUT_GAMES = [
  { game: 'Hollow Knight', studio: 'Team Cherry', location: 'Adelaide, SA', funding: 'Kickstarter ($57K)', revenue: '$316M gross (Steam)', units: '15M', roi: '930,000%' },
  { game: 'Hollow Knight: Silksong', studio: 'Team Cherry', location: 'Adelaide, SA', funding: 'Self-funded', revenue: '~$100M (first months)', units: '5.5M+', roi: 'N/A' },
  { game: 'Cult of the Lamb', studio: 'Massive Monster', location: 'Melbourne, VIC', funding: 'Film Victoria', revenue: '$90M+', units: '4.5M', roi: '90,000%' },
  { game: 'Untitled Goose Game', studio: 'House House', location: 'Melbourne, VIC', funding: 'Film Victoria', revenue: '~$20-30M', units: '1M+', roi: '20,000%+' },
  { game: 'Unpacking', studio: 'Witch Beam', location: 'Brisbane, QLD', funding: 'Screen QLD', revenue: '~$12M', units: '1M', roi: '12,000%' },
];

const FUNDING_PROGRAMS = [
  { body: 'Screen Australia', program: 'Games Production Fund', amount: 'Up to $100K', criteria: 'Budget under $500K, early prototype, "significant milestone"', acquittal: 'Release, early access, or "cultural worth"' },
  { body: 'Screen Queensland', program: 'Games Grants', amount: 'Up to $200K ($300K lifetime)', criteria: '75% QLD team, original IP', acquittal: 'Milestone-based (prototype/release)' },
  { body: 'Screen NSW', program: 'Digital Games Rebate', amount: '10% rebate on $350K+ spend', criteria: 'NSW expenditure threshold', acquittal: 'Expenditure verification' },
  { body: 'Screen Australia', program: 'Emerging Gamemakers', amount: 'Up to $30K', criteria: 'Budget under $500K, new project', acquittal: '"Significant milestone"' },
];

const TRAVEL_PROGRAMS = [
  { body: 'Screen NSW', event: 'PAX Market Support', amount: '$2,150/dev', cohort: '10 devs', outcome: 'Not tracked' },
  { body: 'Screen NSW', event: 'GDC Market Travel', amount: '~$5-7K', cohort: '5-10 devs', outcome: 'Not tracked' },
  { body: 'Screen NSW', event: 'Gamescom Market Travel', amount: '~$5-7K', cohort: '5-10 devs', outcome: 'Not tracked' },
  { body: 'Screen QLD', event: 'GDC Grants', amount: '$3-5K', cohort: '5 devs', outcome: 'Not tracked' },
  { body: 'Screen QLD', event: 'Gamescom Grants', amount: '$4-7.5K', cohort: '3-5 devs', outcome: 'Not tracked' },
  { body: 'Screen QLD', event: 'BitSummit Grants', amount: '$3K/project', cohort: 'Varies', outcome: 'Not tracked' },
];

export default function AUFundingAnalysisPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Nav */}
        <Link href="/dashboard/market-intelligence" className="inline-flex items-center text-white/50 hover:text-white mb-6 text-sm">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Market Intelligence
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">AU Games Funding Analysis</h1>
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-mono rounded">INTERNAL</span>
          </div>
          <p className="text-white/50">Cost-benefit analysis of Australian screen agency games funding. The case for real-time attribution.</p>
          <p className="text-white/30 text-xs mt-1">Reference for: Ceri Hutton call, investor conversations, government pitches</p>
        </div>

        {/* The One-Liner */}
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6 mb-8">
          <p className="text-lg text-white/90 italic">&ldquo;Gambling operators know exactly what a player is worth before they open the doors. We give game studios the same clarity — without the extractive mechanics. That&apos;s what makes gaming investable.&rdquo;</p>
        </div>

        {/* Gaming vs Gambling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#161616] border border-green-500/20 rounded-xl p-6">
            <h3 className="text-green-400 font-bold text-sm uppercase tracking-wider mb-3">Gambling (How Govt Sees ROI)</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>✓ Real-time revenue data before investment</li>
              <li>✓ Every dollar tracked, every player profiled</li>
              <li>✓ Daily/weekly/monthly reporting to treasury</li>
              <li>✓ Clear ROI: $X invested → $Y tax revenue → Z jobs</li>
              <li>✓ Data exists to defend budget increases</li>
            </ul>
          </div>
          <div className="bg-[#161616] border border-red-500/20 rounded-xl p-6">
            <h3 className="text-red-400 font-bold text-sm uppercase tracking-wider mb-3">Gaming (Current State)</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>✗ No post-release performance tracking required</li>
              <li>✗ Acquittal = "reached a milestone" (release = success)</li>
              <li>✗ Zero ongoing reporting after grant</li>
              <li>✗ No ROI story: $100K invested → game released → ???</li>
              <li>✗ Data to defend investment DOESN&apos;T EXIST</li>
            </ul>
          </div>
        </div>

        {/* Breakout Games Table */}
        <div className="bg-[#161616] border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">AU Breakout Games — Known Revenue</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/40 text-xs uppercase border-b border-white/10">
                  <th className="text-left py-3 pr-4">Game</th>
                  <th className="text-left py-3 pr-4">Studio</th>
                  <th className="text-left py-3 pr-4">Location</th>
                  <th className="text-left py-3 pr-4">Funding</th>
                  <th className="text-right py-3 pr-4">Revenue</th>
                  <th className="text-right py-3 pr-4">Units</th>
                  <th className="text-right py-3">ROI if $100K</th>
                </tr>
              </thead>
              <tbody>
                {AU_BREAKOUT_GAMES.map((game, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 pr-4 text-white font-medium">{game.game}</td>
                    <td className="py-3 pr-4 text-white/60">{game.studio}</td>
                    <td className="py-3 pr-4 text-white/50">{game.location}</td>
                    <td className="py-3 pr-4 text-white/50">{game.funding}</td>
                    <td className="py-3 pr-4 text-right text-green-400 font-medium">{game.revenue}</td>
                    <td className="py-3 pr-4 text-right text-white/70">{game.units}</td>
                    <td className="py-3 text-right text-green-400">{game.roi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/30 text-xs mt-4">All succeeded through organic/creator discovery. None had funded UA or marketing plans. Every one succeeded despite the system, not because of it.</p>
        </div>

        {/* The Problem */}
        <div className="bg-[#161616] border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">The Numbers That Should Terrify Funders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-white">14K+</p>
              <p className="text-white/40 text-xs">Games on Steam/year</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-white">98%</p>
              <p className="text-white/40 text-xs">Are indie titles</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-red-400">50%</p>
              <p className="text-white/40 text-xs">Earn &lt;$500 lifetime</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-white">$4.2B</p>
              <p className="text-white/40 text-xs">AU consumer spend (2025)</p>
            </div>
          </div>
          <p className="text-white/50 text-sm">50% of indie games earn less than $500. Total. Not monthly. That&apos;s where most funded games end up — and nobody tracks it because acquittal doesn&apos;t require revenue reporting.</p>
        </div>

        {/* Funding Programs */}
        <div className="bg-[#161616] border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Current Funding Programs</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/40 text-xs uppercase border-b border-white/10">
                  <th className="text-left py-3 pr-4">Body</th>
                  <th className="text-left py-3 pr-4">Program</th>
                  <th className="text-left py-3 pr-4">Amount</th>
                  <th className="text-left py-3 pr-4">Acquittal Criteria</th>
                </tr>
              </thead>
              <tbody>
                {FUNDING_PROGRAMS.map((p, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 pr-4 text-white/70">{p.body}</td>
                    <td className="py-3 pr-4 text-white font-medium">{p.program}</td>
                    <td className="py-3 pr-4 text-white/60">{p.amount}</td>
                    <td className="py-3 pr-4 text-amber-400/80 text-xs">{p.acquittal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Travel Funding — "Who Not What" */}
        <div className="bg-[#161616] border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">Travel Funding — The &ldquo;Who Not What&rdquo; Problem</h2>
          <p className="text-white/50 text-sm mb-4">States fund developers to attend events. Zero post-event outcome tracking. Selection based on residency/identity, not commercial readiness.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/40 text-xs uppercase border-b border-white/10">
                  <th className="text-left py-3 pr-4">Body</th>
                  <th className="text-left py-3 pr-4">Event</th>
                  <th className="text-left py-3 pr-4">Grant</th>
                  <th className="text-left py-3 pr-4">Cohort</th>
                  <th className="text-left py-3">Outcome Tracked?</th>
                </tr>
              </thead>
              <tbody>
                {TRAVEL_PROGRAMS.map((t, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 pr-4 text-white/70">{t.body}</td>
                    <td className="py-3 pr-4 text-white">{t.event}</td>
                    <td className="py-3 pr-4 text-white/60">{t.amount}</td>
                    <td className="py-3 pr-4 text-white/50">{t.cohort}</td>
                    <td className="py-3 text-red-400 text-xs font-mono">{t.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reference Cases */}
        <div className="bg-[#161616] border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Reference Cases</h2>
          <div className="space-y-4">
            <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
              <h3 className="text-red-400 font-bold text-sm mb-1">AIGF Killed (2014) — The Cautionary Tale</h3>
              <p className="text-white/60 text-sm">$20M fund, axed by Abbott govt. Only 1 distribution round: 21 projects, $2.6M. $10M clawed back. Zero outcomes data ever published. Govt argument: &ldquo;Can&apos;t justify the spend.&rdquo; Without attribution, funding is politically indefensible.</p>
            </div>
            <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
              <h3 className="text-red-400 font-bold text-sm mb-1">Victorian Commonwealth Games ($589M Waste, 2024)</h3>
              <p className="text-white/60 text-sm">Cost blew from $2.5B to $7B. Auditor General: &ldquo;significant waste of taxpayer money&rdquo; with &ldquo;no discernible benefit.&rdquo; Investment without real-time measurement = uncontrolled risk.</p>
            </div>
            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
              <h3 className="text-green-400 font-bold text-sm mb-1">Massive Monster (Cult of the Lamb) — The Positive Model</h3>
              <p className="text-white/60 text-sm">Melbourne studio, Film Vic ecosystem. $90M+ revenue. Now running MASS co-working space + private investment fund for local devs. When funded studios succeed, they reinvest in the ecosystem.</p>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
              <h3 className="text-blue-400 font-bold text-sm mb-1">Team Cherry (Hollow Knight) — Self-Funded Success</h3>
              <p className="text-white/60 text-sm">3-person team, Adelaide. Kickstarter $57K. $316M gross revenue. Zero government funding. Biggest AU game export ever received no govt support. If attribution existed, govt could have offered proactive support and claimed enabling credit.</p>
            </div>
          </div>
        </div>

        {/* Our Position */}
        <div className="bg-gradient-to-r from-green-500/5 to-blue-500/5 border border-green-500/20 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Our Position (Not Attacking — Improving)</h2>
          <div className="space-y-4 text-sm text-white/70">
            <div>
              <p className="text-white font-medium mb-1">To Screen Australia:</p>
              <p className="italic">&ldquo;Your grants create some of Australia&apos;s most important cultural exports. But you can&apos;t prove that. We build the attribution layer that lets you tell treasury: our funded games generated X installs, Y revenue, Z jobs.&rdquo;</p>
            </div>
            <div>
              <p className="text-white font-medium mb-1">To Studios:</p>
              <p className="italic">&ldquo;Include a go-to-market plan with measurable KPIs in your application. Installs target, revenue projection, creator strategy. You&apos;ll stand out from every other build-and-hope application.&rdquo;</p>
            </div>
            <div>
              <p className="text-white font-medium mb-1">To Government:</p>
              <p className="italic">&ldquo;The AIGF was killed because nobody could prove it worked. If attribution existed from day one, you&apos;d have had the case study to defend the program. We prevent that from ever happening again.&rdquo;</p>
            </div>
          </div>
        </div>

        {/* What Real-Time Analytics Changes */}
        <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">What Real-Time Analytics Changes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-bold text-sm mb-2">For Studios</h3>
              <ul className="space-y-1 text-xs text-white/50">
                <li>• Know within weeks if game is working</li>
                <li>• Optimise spend in-flight</li>
                <li>• Build case for follow-on funding</li>
                <li>• Prove grant generated economic output</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-bold text-sm mb-2">For Screen Agencies</h3>
              <ul className="space-y-1 text-xs text-white/50">
                <li>• Track portfolio performance</li>
                <li>• Identify what works and adjust</li>
                <li>• Present treasury with impact data</li>
                <li>• Justify budget increases with evidence</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-bold text-sm mb-2">For The Ecosystem</h3>
              <ul className="space-y-1 text-xs text-white/50">
                <li>• Intelligence flows back to industry</li>
                <li>• Commercial plans become standard</li>
                <li>• More funding flows in</li>
                <li>• &ldquo;Fund the economy&rdquo; replaces &ldquo;fund the launch&rdquo;</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
