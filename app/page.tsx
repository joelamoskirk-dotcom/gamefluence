import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import LogoMarquee from '@/components/ui/LogoMarquee';

const MARKETS = [
  { id: 'australia', flag: '🇦🇺', name: 'Australia', creators: '45+', topGame: 'DCS / Racing Sim' },
  { id: 'new-zealand', flag: '🇳🇿', name: 'New Zealand', creators: '22+', topGame: 'Fortnite / Racing' },
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
        >
          <source src="/hero-gaming.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
            Creator-Driven UA <span className="text-accent">For Gaming Studios</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Influencer campaigns, user acquisition, and attribution — built by a team that scaled Kick to 100M users and ran UA at King and Amazon Games.
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

          {/* Market flags */}
          <div className="flex justify-center gap-4 flex-wrap text-sm text-white/60">
            {MARKETS.slice(0, 6).map(m => (
              <span key={m.id} className="flex items-center gap-1.5">
                <span className="text-lg">{m.flag}</span> {m.name}
              </span>
            ))}
            <span className="text-white/40">+3 more</span>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-16 bg-[#0D0D0D]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">How We Move the Needle</h2>
          <p className="text-white/50 text-center mb-12 max-w-2xl mx-auto text-sm">
            Four services. All measured. You keep your stack — we operate it and prove what works.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-[#161616] border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition">
              <div className="inline-block bg-pink-500/20 text-pink-400 text-xs font-mono px-2 py-1 rounded mb-4">01 · CREATOR CAMPAIGNS</div>
              <h3 className="text-white font-bold text-lg mb-3">Gaming Influencers for Reach &amp; Awareness</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Your new title needs eyeballs from the right audience. We match you with gaming creators who actually play your genre, brief them properly, and attribute every install back to the source. Not spray-and-pray — targeted, measured, repeatable.
              </p>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition">
              <div className="inline-block bg-blue-500/20 text-blue-400 text-xs font-mono px-2 py-1 rounded mb-4">02 · UA &amp; MEASUREMENT</div>
              <h3 className="text-white font-bold text-lg mb-3">User Acquisition Across Mobile &amp; Steam</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                10+ years running UA at scale across mobile and PC. MMP configuration done right (AppsFlyer, Adjust, Singular). Steam wishlist campaigns, deep-link infrastructure, incrementality testing, SKAN compliance, and channels your competitors haven&apos;t found yet. You keep the stack — we operate it and prove what works.
              </p>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition">
              <div className="inline-block bg-green-500/20 text-green-400 text-xs font-mono px-2 py-1 rounded mb-4">03 · CROSS-PROMO &amp; PORTFOLIO</div>
              <h3 className="text-white font-bold text-lg mb-3">Your Players Are Your Cheapest Installs</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                House placements, audience syncs, creator-led cross-promotion across your portfolio. We build the system that turns Game A players into Game B installs — costed on measured uplift, not guesswork. If you&apos;ve got multiple titles, this is where the compounding starts.
              </p>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition">
              <div className="inline-block bg-amber-500/20 text-amber-400 text-xs font-mono px-2 py-1 rounded mb-4">04 · iGAMING &amp; MARKET ENTRY</div>
              <h3 className="text-white font-bold text-lg mb-3">Consultancy for New Markets &amp; Regulation</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Entering APAC? Launching in a regulated market? We handle the hard stuff: iGaming licensing advisory, creative localisation, regulatory compliance, and technical implementation. From market research to live operations — one partner, end to end.
              </p>
            </div>
          </div>

          {/* Credential strip — infinite scrolling marquee */}
          <div className="mt-12 border-t border-white/10 pt-6">
            <LogoMarquee />
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
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">Launch in Under 5 Minutes</h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto text-sm">No 6-week onboarding. No "let&apos;s schedule a sync." Brief us, we match creators, you launch.</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: '1', icon: '🎯', title: 'Drop Your Brief', desc: 'Market, genre, budget, timeline. Our system scores your brief against live creator performance data.' },
              { step: '2', icon: '🤖', title: 'We Match & Vet', desc: 'AI + human curation. Every creator vetted on actual ROI history, audience quality, and brand safety. No bots.' },
              { step: '3', icon: '🚀', title: 'Go Live', desc: 'Creators activate within days. Deep-linked, tracked, attributed. You see results in real-time, not a PDF next month.' },
              { step: '4', icon: '📊', title: 'Prove It Worked', desc: 'MMP-verified attribution. Per-creator CPI, ROAS, incrementality. Exportable for your board deck or client report.' },
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
