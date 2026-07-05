import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const MARKETS = [
  { id: 'indonesia', flag: '🇮🇩', name: 'Indonesia', creators: '65+', topGame: 'Mobile Legends' },
  { id: 'philippines', flag: '🇵🇭', name: 'Philippines', creators: '52+', topGame: 'Mobile Legends' },
  { id: 'vietnam', flag: '🇻🇳', name: 'Vietnam', creators: '48+', topGame: 'Arena of Valor' },
  { id: 'thailand', flag: '🇹🇭', name: 'Thailand', creators: '38+', topGame: 'Valorant / RoV' },
  { id: 'malaysia', flag: '🇲🇾', name: 'Malaysia', creators: '28+', topGame: 'Mobile Legends' },
  { id: 'singapore', flag: '🇸🇬', name: 'Singapore', creators: '17+', topGame: 'Valorant' },
  { id: 'south-korea', flag: '🇰🇷', name: 'South Korea', creators: '32+', topGame: 'League of Legends' },
];

const ATTRIBUTION_PARTNERS = [
  { name: 'AppsFlyer OneLink', desc: 'Deep linking & attribution' },
  { name: 'Adjust', desc: 'Multi-touch attribution' },
  { name: 'UTM / Promo Codes', desc: 'Agency standard tracking' },
  { name: 'Custom SDK', desc: 'Direct integration' },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col pb-16 sm:pb-0">

      {/* ── HERO: Video Background ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0D0D0D] via-[#1a0533] to-[#0D0D0D]">
        {/* Video loads lazily — text renders immediately */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          preload="none"
        >
          <source src="https://www.pexels.com/download/video/8128283/" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 mb-6 text-sm text-white">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Gaming creator campaigns across APAC
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
            Gaming Creator Marketing <span className="text-accent">Across Asia-Pacific</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Connect your brand with authentic gaming creators in Vietnam, Thailand, Indonesia, Philippines, New Zealand &amp; Australia. AI-powered matching. Real attribution.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-12">
            <Link href="/get-started">
              <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg bg-accent hover:bg-accent/90 text-white">
                Launch a Campaign
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20">
                See Pricing
              </Button>
            </Link>
          </div>

          {/* Market flags ticker */}
          <div className="flex justify-center gap-6 text-sm text-white/60">
            {MARKETS.map(m => (
              <span key={m.id} className="flex items-center gap-1.5">
                <span className="text-xl">{m.flag}</span> {m.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRENTLY OPERATING (G-07) ── */}
      <section className="py-10 bg-[#0D0D0D]">
        <div className="container mx-auto px-4">
          <p className="text-[10px] font-mono tracking-[0.2em] text-white/50 mb-4 uppercase">Currently Operating</p>
          <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-green-400/80 uppercase tracking-wider">Live</span>
            </div>
            {/* Feature-flagged: swap to named case study when caseStudyApproved = true */}
            {process.env.NEXT_PUBLIC_CASE_STUDY_APPROVED === 'true' ? (
              <div>
                <h3 className="text-white font-bold text-lg">Roadburn Games — Gumball 3000: World Tour</h3>
                <p className="text-white/60 text-sm mt-1">Live-ops creator system + UA + measurement. Full case study available.</p>
              </div>
            ) : (
              <div>
                <h3 className="text-white font-bold text-lg">Arcade racing portfolio</h3>
                <p className="text-white/60 text-sm mt-1">Live-ops creator system + UA + measurement. Case study coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SERVICES (G-06) ── */}
      <section className="py-16 bg-[#0D0D0D]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">What We Operate</h2>
          <p className="text-white/50 text-center mb-10 max-w-xl mx-auto text-sm">
            Three service lines. Repeatable. Measured. Always-on.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
              <div className="inline-block bg-purple-500/20 text-purple-400 text-xs font-mono px-2 py-1 rounded mb-4">LIVE-OPS</div>
              <h3 className="text-white font-bold text-lg mb-3">Live-Ops Creator System</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Every content drop becomes a creator campaign. We match gaming creators to your update, deep link their audiences straight into the new content, and read out results within 7 days. Repeatable, measured, always-on.
              </p>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
              <div className="inline-block bg-purple-500/20 text-purple-400 text-xs font-mono px-2 py-1 rounded mb-4">UA</div>
              <h3 className="text-white font-bold text-lg mb-3">UA &amp; Measurement</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Attribution stood up properly — MMP configuration, deep-link infrastructure, incrementality testing, and incremental ad channels you&apos;ve never bought. You keep the stack; we operate it.
              </p>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
              <div className="inline-block bg-purple-500/20 text-purple-400 text-xs font-mono px-2 py-1 rounded mb-4">GROWTH</div>
              <h3 className="text-white font-bold text-lg mb-3">Cross-Promo &amp; Portfolio Growth</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Your existing players are your cheapest installs. House placements, audience syncs and creator-led cross-promotion across your portfolio — costed on measured uplift.
              </p>
            </div>
          </div>

          {/* G-09: APAC proof strip */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 text-white/40 text-xs font-mono tracking-wide">
              <span>Vietnam-first APAC operation</span>
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
              <span>HCMC creator network</span>
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
              <span>AU HQ</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARKET CARDS ── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">Choose Your Market</h2>
          <p className="text-gray-500 text-center mb-10 max-w-xl mx-auto">
            Select a market to start your campaign. Our AI matches you with the highest-performing local gaming creators.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {MARKETS.map(m => (
              <Link key={m.id} href="/get-started">
                <div className="bg-white rounded-xl border border-gray-200 p-5 hover:border-primary hover:shadow-lg transition-all cursor-pointer group">
                  <div className="text-3xl mb-3">{m.flag}</div>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{m.name}</h3>
                  <div className="mt-3 space-y-1 text-sm text-gray-500">
                    <div className="flex justify-between"><span>Creators</span><span className="font-medium text-gray-900">{m.creators}</span></div>
                    <div className="flex justify-between"><span>Top Game</span><span className="font-medium text-gray-900">{m.topGame}</span></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">How Agencies Use Gamefluence</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: '1', icon: '🎯', title: 'Submit Brief', desc: 'Select market, genre, budget. Our AI analyses your brief against historical campaign data.' },
              { step: '2', icon: '🤖', title: 'AI Matches Creators', desc: 'Machine learning scores every creator on ROI history, engagement, audience quality and brand safety.' },
              { step: '3', icon: '💳', title: 'Pay & Launch', desc: 'Secure Stripe checkout. On-platform creators activate instantly. Others enter smart outreach.' },
              { step: '4', icon: '📊', title: 'Track & Optimise', desc: 'Real-time attribution via AppsFlyer, Adjust, UTM or promo codes. Every install tracked.' },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl mx-auto mb-4">{s.icon}</div>
                <div className="text-xs font-bold text-primary mb-1">STEP {s.step}</div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ATTRIBUTION INTEGRATION ── */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Your Attribution, Our Platform</h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                We integrate with whatever tracking your agency already uses. No new SDK required — just plug in your links.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ATTRIBUTION_PARTNERS.map(p => (
                <div key={p.name} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
                  <h3 className="font-bold text-sm mb-1">{p.name}</h3>
                  <p className="text-xs text-gray-400">{p.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-bold mb-3">How it works in your campaign dashboard</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-accent font-bold mb-1">1. Paste your link</div>
                  <p className="text-gray-400">AppsFlyer OneLink, Adjust tracker, or UTM-tagged URL — whatever your agency standard is.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-accent font-bold mb-1">2. We distribute</div>
                  <p className="text-gray-400">Each creator gets a unique tracked link. Every click, install, and conversion is attributed.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-accent font-bold mb-1">3. Real-time reporting</div>
                  <p className="text-gray-400">See per-creator ROI, CPI, and conversion data in your Gamefluence dashboard — exportable for client reports.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF / STATS ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto text-center">
            {[
              { value: '280+', label: 'Creators in Network' },
              { value: '7', label: 'APAC Markets' },
              { value: '24hr', label: 'Campaign Activation' },
              { value: '5.8x', label: 'Avg Campaign ROI' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl sm:text-4xl font-bold text-gaming">{s.value}</div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-gradient-to-r from-gaming to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to reach APAC gamers?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Launch your first campaign in under 5 minutes. AI-selected creators. Real attribution. Pay only for results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/get-started">
              <Button size="lg" className="bg-white text-gaming hover:bg-gray-100">
                Start Campaign
              </Button>
            </Link>
            <Link href="/creator-signup">
              <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20">
                Join as Creator
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
