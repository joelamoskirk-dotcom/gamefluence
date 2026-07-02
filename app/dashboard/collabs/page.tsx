'use client';

import React from 'react';
import {
  ExternalLink,
  Users,
  DollarSign,
  TrendingUp,
  Target,
  Zap,
  Video,
  Package,
  Brain,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline underline-offset-2"
    >
      {children}
      <ExternalLink className="w-3 h-3" />
    </a>
  );
}

export default function CollabsDashboard() {
  const [integrationChecks, setIntegrationChecks] = React.useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setIntegrationChecks(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      // Persist to localStorage so it survives refresh
      localStorage.setItem('collab_integration_checks', JSON.stringify(updated));
      return updated;
    });
  };

  React.useEffect(() => {
    const saved = localStorage.getItem('collab_integration_checks');
    if (saved) setIntegrationChecks(JSON.parse(saved));
  }, []);
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10 space-y-12 max-w-5xl mx-auto">
      {/* Page Header */}
      <header className="border-b border-gray-800 pb-6">
        <h1 className="text-3xl font-bold tracking-tight">Collabs Strategic Dashboard</h1>
        <p className="text-gray-400 mt-2">
          DCS × P1 Sim Gear × Jacob Tabor — July 2026
        </p>
      </header>

      {/* ─────────────────────────────────────────────── */}
      {/* SECTION 1: THE MARKET */}
      {/* ─────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl font-black text-gray-600">01</span>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              THE MARKET
            </h2>
            <p className="text-sm text-gray-400">Why this collab exists</p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-5">
          <p className="text-gray-300">
            <strong className="text-white">DCS (Digital Combat Simulator)</strong> is the world&apos;s most realistic flight sim.
            The audience is deeply invested — financially and emotionally — in the hardware that powers their experience.
          </p>

          {/* Audience Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'YouTube Subs', value: '167K' },
              { label: 'Instagram', value: '113K' },
              { label: 'Discord Members', value: '65.7K' },
              { label: 'Total YT Views', value: '35.5M' },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-800 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-blue-400">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Market Insight */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-green-400">Market Insight</span>
            </div>
            <p className="text-gray-300 text-sm">
              Flight sim audiences spend <strong className="text-white">$2K–$12K</strong> on their setups.
              Highest hardware spend in gaming. High intent, high value, low competition.
            </p>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Community Links
            </h3>
            <div className="flex flex-wrap gap-3 text-sm">
              <ExtLink href="https://youtube.com/user/eagledynamicstv">YouTube</ExtLink>
              <ExtLink href="https://instagram.com/digitalcombatsimulator">Instagram</ExtLink>
              <ExtLink href="https://discord.gg/6tydSKb5fx">Discord</ExtLink>
              <ExtLink href="https://facebook.com/EagleDynamics">Facebook</ExtLink>
              <ExtLink href="https://forum.dcs.world">Forums</ExtLink>
            </div>
          </div>

          {/* Top Videos */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
              <Video className="w-4 h-4" />
              Top 3 Videos
            </h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>
                <ExtLink href="https://youtube.com/user/eagledynamicstv">
                  DCS 2025 AND BEYOND
                </ExtLink>{' '}
                — <span className="text-white font-medium">1.9M views</span>
              </li>
              <li>
                <ExtLink href="https://youtube.com/user/eagledynamicstv">
                  DCS SUMMER SALE 2026
                </ExtLink>{' '}
                — <span className="text-white font-medium">60K views</span>
              </li>
              <li>
                <ExtLink href="https://youtube.com/user/eagledynamicstv">
                  F-100D SUPER SABRE
                </ExtLink>{' '}
                — <span className="text-white font-medium">34K views</span>
              </li>
            </ul>
          </div>

          {/* Terry Insight */}
          <div className="bg-purple-950/40 border border-purple-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-400">Terry&apos;s Insight (AI Agent)</span>
            </div>
            <p className="text-gray-300 text-sm italic">
              &ldquo;Flight sim is the most monetisable niche in gaming — high intent, high spend, low agency competition.
              First-mover advantage is enormous.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────── */}
      {/* SECTION 2: THE PLAYERS */}
      {/* ─────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl font-black text-gray-600">02</span>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              THE PLAYERS
            </h2>
            <p className="text-sm text-gray-400">Who&apos;s involved — both sides with full detail</p>
          </div>
        </div>

        {/* Creator Side */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-green-400 flex items-center gap-2">
            <Video className="w-5 h-5" />
            Creator — Jacob Tabor
          </h3>

          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="space-y-2">
              <p><span className="text-gray-500">Email:</span> jacob_tabor@outlook.com</p>
              <p><span className="text-gray-500">Meeting:</span> Jul 3 2026 @ 11am</p>
              <p><span className="text-gray-500">Connection:</span> DCS community creator</p>
              <p><span className="text-gray-500">Personal Channels:</span> TBD (confirm in meeting)</p>
            </div>
            <div className="space-y-2">
              <p><span className="text-gray-500">Ecosystem Access:</span> 167K YT + 113K IG + 65K Discord</p>
              <p><span className="text-gray-500">Prior Brand Deals:</span> None known — first-mover opportunity</p>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-2">
            <p className="text-sm font-semibold text-gray-300">Goals (likely):</p>
            <p className="text-sm text-gray-400">
              Monetise content, get free gear, build brand relationships, grow audience
            </p>
            <p className="text-sm font-semibold text-gray-300 mt-3">What he needs to hear:</p>
            <p className="text-sm text-green-400 italic">
              &ldquo;Non-exclusive, free gear, paid in 4 days, keep gear even if you leave.&rdquo;
            </p>
          </div>
        </div>

        {/* Brand Side */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Brand — P1 Sim Gear (Player1)
          </h3>

          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="space-y-2">
              <p><span className="text-gray-500">Contact:</span> Neil</p>
              <p>
                <span className="text-gray-500">Website:</span>{' '}
                <ExtLink href="https://p1simgear.com.au">p1simgear.com.au</ExtLink>
              </p>
              <p><span className="text-gray-500">Location:</span> Queensland, Australia</p>
              <p><span className="text-gray-500">Phone:</span> 0488 385 870</p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Products &amp; Pricing</h4>
            <div className="space-y-2">
              {[
                { name: 'Fighter Pilot Pack', price: '$3,099', url: 'https://p1simgear.com.au/products/fighter-pilot-pack' },
                { name: 'VIRPIL WarBRD-D HOSAS Bundle', price: '$2,149', url: 'https://p1simgear.com.au/products/virpil-warbrd-d-hosas-bundle-alpha-prime-edition' },
                { name: 'Trak Racer TR8 Pro Flight', price: '$1,129', url: 'https://p1simgear.com.au/products/trak-racer-tr8-pro-flight-simulator-cockpit-flight-seat' },
                { name: 'Full Custom Rig (estimate)', price: '~$10,000', url: '' },
              ].map((product) => (
                <div key={product.name} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-2 text-sm">
                  <span className="text-gray-300">
                    {product.url ? (
                      <ExtLink href={product.url}>{product.name}</ExtLink>
                    ) : (
                      product.name
                    )}
                  </span>
                  <span className="font-bold text-white">{product.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Commerce Metrics */}
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { label: 'ARPU Estimate', value: '$3,000–$10,000 per customer' },
              { label: 'Margin Estimate', value: '30–50% on hardware retail' },
              { label: 'ROI Requirement', value: 'Break even at 2–3 rig sales/month' },
              { label: 'Repeat Purchase', value: 'Low — upsell via accessories/upgrades' },
            ].map((metric) => (
              <div key={metric.label} className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-xs text-gray-500">{metric.label}</div>
                <div className="text-sm text-gray-300">{metric.value}</div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-2">
            <p className="text-sm font-semibold text-gray-300">Goals (likely):</p>
            <p className="text-sm text-gray-400">
              Sell more flight sim bundles, reach the DCS community, become the go-to AU retailer for flight sim hardware
            </p>
            <p className="text-sm font-semibold text-gray-300 mt-3">What Neil needs to hear:</p>
            <p className="text-sm text-blue-400 italic">
              &ldquo;Creator with direct access to 167K flight sim enthusiasts for 70% below market rate.
              Tracked via promo code — you see every sale.&rdquo;
            </p>
          </div>
        </div>

        {/* Your Value */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
          <h3 className="text-lg font-bold text-yellow-400 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Your Value (Mobileyes)
          </h3>
          <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
            <li>You connect Jacob&apos;s audience to Neil&apos;s products</li>
            <li>You handle everything: brief, links, verification, payment, reporting</li>
            <li>You take 34% effective margin (commission + agency fee)</li>
            <li>You build a reusable engine: this model works for ANY hardware brand × creator pairing</li>
          </ul>
        </div>
      </section>

      {/* ─────────────────────────────────────────────── */}
      {/* SECTION 3: THE DEAL */}
      {/* ─────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl font-black text-gray-600">03</span>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-400" />
              THE DEAL
            </h2>
            <p className="text-sm text-gray-400">How it works — the brief Jacob would follow</p>
          </div>
        </div>

        {/* Content Brief */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-5">
          <h3 className="text-md font-bold text-gray-200">Content Brief</h3>
          <div className="bg-gray-800/50 border-l-4 border-blue-500 rounded-r-lg p-4">
            <p className="text-sm text-gray-300 italic">
              &ldquo;For your audience of 167K on YouTube and 113K on Instagram, we need 4 posts over July — one per week.
              Post at your normal time to keep engagement high. Between paid posts, keep doing normal DCS combat content.
              Your audience shouldn&apos;t feel a shift.&rdquo;
            </p>
          </div>

          {/* Monthly Calendar */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Monthly Content Calendar</h4>
            <div className="space-y-3">
              {[
                { week: 'Week 1', title: 'GEAR BREAKDOWN', desc: 'Show your P1 flight setup, what each piece does, how it improves DCS gameplay' },
                { week: 'Week 2', title: 'SKILL SESSION', desc: 'DCS tutorial/combat using P1 gear — technique-focused, gear visible' },
                { week: 'Week 3', title: 'NORMAL DCS CONTENT', desc: 'Regular missions/combat — no hard sell, gear naturally present' },
                { week: 'Week 4', title: 'REVEAL/UPGRADE', desc: 'Unbox new P1 gear or show a rig upgrade' },
              ].map((week) => (
                <div key={week.week} className="flex gap-4 items-start bg-gray-800 rounded-lg p-3">
                  <span className="text-xs font-bold text-blue-400 whitespace-nowrap min-w-[60px]">{week.week}</span>
                  <div>
                    <span className="text-sm font-semibold text-white">{week.title}</span>
                    <p className="text-xs text-gray-400 mt-0.5">{week.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attribution */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Attribution Requirements</h4>
            <ul className="space-y-1 text-sm text-gray-400 list-disc list-inside">
              <li>Promo code: <span className="font-mono text-green-400 bg-gray-800 px-2 py-0.5 rounded">JACOBDCS</span> (in video description + pinned comment)</li>
              <li>UTM links provided by Mobileyes (copy-paste into description)</li>
              <li>Post at your normal schedule — consistency matters more than timing</li>
            </ul>
          </div>

          {/* Financials */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              Financials at $8K/month
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Neil pays</span>
                  <span className="font-bold text-white">$8,000</span>
                </div>
                <p className="text-xs text-gray-500">Creator $6K + Agency fee $1.5K + Product ~$500</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Jacob gets</span>
                  <span className="font-bold text-green-400">$4,800/month</span>
                </div>
                <p className="text-xs text-gray-500">80% of $6K creator fee</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">You keep</span>
                  <span className="font-bold text-yellow-400">$2,700/month</span>
                </div>
                <p className="text-xs text-gray-500">Commission $1,200 + Agency $1,500</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Affiliate</span>
                  <span className="font-bold text-purple-400">$1K/rig (50/50)</span>
                </div>
                <p className="text-xs text-gray-500">JACOBDCS on Fighter Pilot Pack &amp; VIRPIL</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Payment: Jacob paid within 4 business days of each post verification.
            </p>
          </div>

          {/* Dazza Insight */}
          <div className="bg-green-950/30 border border-green-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-green-400">Dazza&apos;s Insight (AI Agent)</span>
            </div>
            <p className="text-gray-300 text-sm italic">
              &ldquo;At $8K, Neil breaks even at 2.5 rig sales/month. With 47K avg views and 2.5% CTR into a high-intent audience,
              this should hit 3–4 sales conservatively. Push the affiliate angle — it&apos;s pure upside for everyone with zero risk.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────── */}
      {/* SECTION 3.5: INTEGRATION & TRACKING */}
      {/* ─────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl font-black text-gray-600">03b</span>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              INTEGRATION &amp; TRACKING
            </h2>
            <p className="text-sm text-gray-400">What drives people from sim → store — and how we get paid</p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-5">
          {/* Integration Methods Checklist */}
          <h3 className="text-md font-bold text-gray-200">Integration Types (Confirm with Jacob)</h3>
          <p className="text-xs text-gray-500">Check what Jacob is willing to do. Each method has different tracking capability.</p>

          <div className="space-y-3">
            {[
              { id: 'promo_desc', method: 'Promo Code in Description', viable: true, tracking: 'High', note: 'JACOBDCS in video description — trackable via Shopify. This is your primary attribution.', revenue: true },
              { id: 'promo_spoken', method: 'Promo Code Spoken in Video', viable: true, tracking: 'High', note: '"Use code JACOBDCS at checkout" — drives immediate action. Viewers remember codes better when spoken.', revenue: true },
              { id: 'pinned_comment', method: 'Pinned Comment with Link', viable: true, tracking: 'High', note: 'UTM-tagged link pinned in YouTube comments. Stays visible. Easy click-through.', revenue: true },
              { id: 'chat_command', method: 'Chat Command (Live Streams)', viable: true, tracking: 'Medium', note: '!gear or !p1 bot command in Twitch/Kick/YouTube Live chat. Good for live but not tracked unless UTM.', revenue: false },
              { id: 'link_bio', method: 'Link in Bio / About', viable: true, tracking: 'Medium', note: 'Permanent UTM link in YouTube About section or Instagram bio. Low effort, passive.', revenue: true },
              { id: 'desc_link', method: 'Video Description Link', viable: true, tracking: 'High', note: 'UTM-tagged link in every video description. Standard practice. High click-through for engaged viewers.', revenue: true },
              { id: 'qr_code', method: 'QR Code On-Screen', viable: false, tracking: 'Low', note: 'QR codes don&apos;t work well for sim/PC audiences — they&apos;re already on a computer, not scanning with phones.', revenue: false },
              { id: 'landing_page', method: 'Dedicated Landing Page', viable: true, tracking: 'High', note: 'p1simgear.com.au/jacob — custom URL for him. Tracks all traffic. Premium feel. Ask Neil to set this up.', revenue: true },
              { id: 'discord_pin', method: 'Discord Server Pin', viable: true, tracking: 'Medium', note: 'If Jacob has access to DCS Discord, pin affiliate link in relevant channels. 65K members see it.', revenue: true },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition ${integrationChecks[item.id] ? 'bg-green-900/30 border border-green-700' : item.viable ? 'bg-gray-800 hover:bg-gray-750' : 'bg-gray-800/40 opacity-60'}`}
              >
                <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 transition ${integrationChecks[item.id] ? 'bg-green-500 text-white' : item.viable ? 'bg-gray-600 text-gray-400' : 'bg-red-600/50 text-red-200'}`}>
                  {integrationChecks[item.id] ? '✓' : item.viable ? '○' : '✗'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-sm font-medium ${integrationChecks[item.id] ? 'text-green-300' : 'text-white'}`}>{item.method}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${item.tracking === 'High' ? 'bg-green-900 text-green-400' : item.tracking === 'Medium' ? 'bg-yellow-900 text-yellow-400' : 'bg-red-900 text-red-400'}`}>
                      {item.tracking} tracking
                    </span>
                    {item.revenue && <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-900 text-purple-400">💰 Revenue</span>}
                    {integrationChecks[item.id] && <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-800 text-green-300">CONFIRMED ✓</span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{item.note}</p>
                </div>
              </button>
            ))}
          </div>

          {/* What Actually Drives Sales from Sim */}
          <div className="bg-blue-950/30 border border-blue-800/50 rounded-lg p-4 mt-4">
            <h4 className="text-sm font-semibold text-blue-400 mb-2">What Actually Drives Purchases from Flight Sim Audiences</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>1. <strong className="text-white">Spoken recommendation + code</strong> — &ldquo;I fly with P1 gear, code JACOBDCS for tracking&rdquo; in the first 30 seconds</p>
              <p>2. <strong className="text-white">Gear visible in use</strong> — audience sees the HOTAS/wheel/pedals working during gameplay</p>
              <p>3. <strong className="text-white">Honest comparison</strong> — &ldquo;I switched from X to this, here&apos;s why&rdquo; content converts highest</p>
              <p>4. <strong className="text-white">Description link</strong> — people check the description after watching, click through to see price</p>
              <p>5. <strong className="text-white">Repeat exposure</strong> — seeing P1 gear in every video over weeks builds purchase intent without hard selling</p>
            </div>
          </div>

          {/* Analytics You Need to See */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mt-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              Analytics You Track (How You Get Paid)
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-2 text-sm">
                <p className="font-medium text-white">From Neil (Shopify API — daily sync):</p>
                <ul className="space-y-1 text-gray-400 text-xs list-disc list-inside">
                  <li>Orders with code JACOBDCS (count + revenue)</li>
                  <li>Products purchased (which rigs convert)</li>
                  <li>Average order value</li>
                  <li>Refund rate</li>
                  <li>Attributed revenue → your affiliate cut</li>
                </ul>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-white">From Jacob (YouTube Analytics — monthly):</p>
                <ul className="space-y-1 text-gray-400 text-xs list-disc list-inside">
                  <li>Views per post</li>
                  <li>Click-through rate on description links</li>
                  <li>Watch time (did they see the P1 integration?)</li>
                  <li>Audience retention at integration point</li>
                  <li>Comments mentioning P1/gear</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-900 rounded-lg">
              <p className="text-xs text-gray-500">
                <strong className="text-yellow-400">Your revenue trigger:</strong> Every order with JACOBDCS code = you earn affiliate commission.
                The daily Shopify sync (built into your platform at <code className="text-gray-400">/api/cron/affiliate-sync</code>) pulls this automatically.
                Neil gives you the API key → you see sales in real-time → you get paid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────── */}
      {/* SECTION 4: THE STRATEGY */}
      {/* ─────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl font-black text-gray-600">04</span>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              THE STRATEGY
            </h2>
            <p className="text-sm text-gray-400">Why it compounds — learnings feed the next deal</p>
          </div>
        </div>

        {/* What We Learn */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-5">
          <h3 className="text-md font-bold text-gray-200">What We Learn From This Collab</h3>
          <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
            <li>Actual conversion rate from flight sim content → hardware purchase</li>
            <li>Which content type converts best (gear breakdown vs skill session vs reveal)</li>
            <li>Jacob&apos;s true reach and influence within the DCS community</li>
            <li>Whether Discord drives additional unpaid sales</li>
            <li>P1&apos;s actual margins and willingness to scale spend</li>
          </ul>

          <h3 className="text-md font-bold text-gray-200 pt-2">How Learnings Feed the Platform</h3>
          <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
            <li>Conversion data updates our ROI projection engine for future hardware deals</li>
            <li>Content performance trains Terry on what &ldquo;good&rdquo; looks like for flight sim creators</li>
            <li>Rate data confirms our pricing tier for the &ldquo;flight sim&rdquo; vertical</li>
            <li>If successful: Jacob becomes our gateway to sign 5–10 more DCS creators</li>
            <li>If successful: P1 becomes proof point to pitch Virpil, Winwing, VKB, Thrustmaster</li>
          </ul>
        </div>

        {/* The Flywheel */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h3 className="text-md font-bold text-gray-200 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            The Flywheel
          </h3>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              Jacob × P1 → <span className="text-white font-medium">proves model</span> → signs more DCS creators →
              pitches more hardware brands → <span className="text-blue-400 font-medium">becomes THE flight sim agency</span> →
              builds into sim racing (same audience crossover) → <span className="text-green-400 font-medium">scales across all sim verticals</span>
            </p>
          </div>
        </div>

        {/* Discord Opportunity */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h3 className="text-md font-bold text-gray-200 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            Discord Opportunity (Jason Connection)
          </h3>
          <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
            <li>65K DCS Discord members = massive untapped channel</li>
            <li>Jason (Joel&apos;s mate) just started at Discord</li>
            <li>Future play: Sponsored server events, P1 gear giveaways, affiliate links in pinned channels</li>
            <li>This is a SEPARATE revenue stream on top of the content deal</li>
          </ul>
        </div>

        {/* CEO & CMO Insights */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-950/30 border border-blue-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">CEO Insight</span>
            </div>
            <p className="text-gray-300 text-sm italic">
              &ldquo;This single collab, if it works, unlocks an entire vertical. The flight sim hardware market has
              NO agency representation in Australia. You are first. Every deal after this one is easier because you have proof.&rdquo;
            </p>
          </div>
          <div className="bg-pink-950/30 border border-pink-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-pink-400" />
              <span className="text-sm font-semibold text-pink-400">CMO Insight</span>
            </div>
            <p className="text-gray-300 text-sm italic">
              &ldquo;The language for this audience is precision, authenticity, and performance. They don&apos;t respond to hype —
              they respond to genuine reviews from someone who uses the gear daily in the most demanding sim on the market.
              Jacob&apos;s content style must be &apos;I use this, here&apos;s why&apos; not &apos;BUY THIS NOW&apos;.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 pt-6 pb-12 text-center">
        <p className="text-xs text-gray-500">
          Mobileyes Collabs — Reference Document — Last updated July 2026
        </p>
      </footer>
    </div>
  );
}
