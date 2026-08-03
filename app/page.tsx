import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import LogoMarquee from '@/components/ui/LogoMarquee';

function ServiceCard({ eyebrow, heading, body, outcome }: {
  eyebrow: string;
  heading: string;
  body: string;
  outcome: { label: string; value: string };
}) {
  return (
    <div className="bg-ink-700 border border-line rounded-md p-6">
      <span className="font-mono text-[11px] font-normal tracking-[0.16em] uppercase text-label mb-3 block">{eyebrow}</span>
      <h3 className="font-sans text-[16px] font-bold leading-[1.35] text-t-hi mb-2">{heading}</h3>
      <p className="text-[14px] leading-[1.65] text-t-mid max-w-[68ch]">{body}</p>
      <hr className="border-line my-4" />
      <div className="mt-4">
        <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-t-lo">{outcome.label}</span>
        <p className="text-[14px] text-t-hi font-medium mt-1">{outcome.value}</p>
      </div>
    </div>
  );
}

const ATTRIBUTION_PARTNERS = [
  { name: 'AppsFlyer OneLink', desc: 'Deep linking & attribution' },
  { name: 'Adjust', desc: 'Multi-touch attribution' },
  { name: 'UTM / Promo Codes', desc: 'Agency standard tracking' },
  { name: 'Custom SDK', desc: 'Direct integration' },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col pb-16 sm:pb-0">

      {/* ── HERO ── */}
      <Section mode="base">
        <div className="relative min-h-[85vh] flex items-center overflow-hidden">
          {/* Desktop video */}
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover hidden sm:block grayscale"
            poster=""
          >
            <source src="/videos/hero-loop-desktop.mp4" type="video/mp4" />
          </video>
          {/* Mobile video */}
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover sm:hidden grayscale"
            poster=""
          >
            <source src="/videos/hero-loop-mobile.mp4" type="video/mp4" />
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-ink-900/65 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-transparent to-ink-900/80" />

          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto text-t-hi" style={{ letterSpacing: '-0.02em' }}>
              Your Players Are Watching Streams Right Now.
            </h1>

            <p className="text-xl sm:text-2xl text-t-mid mb-4 max-w-2xl mx-auto font-medium">
              Turning attention into attributable installs.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-12 mt-8">
              <Link href="/get-started">
                <Button variant="primary" size="lg" className="w-full sm:w-auto text-base sm:text-lg">
                  Get Your Campaign Plan
                </Button>
              </Link>
              <a href="#services">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base sm:text-lg">
                  See How It Works
                </Button>
              </a>
            </div>

            {/* Market flags */}
            <div className="flex justify-center gap-3 sm:gap-4 flex-wrap text-sm text-t-lo">
              <span className="flex items-center gap-1.5"><span className="text-lg">🇦🇺</span> Australia</span>
              <span className="flex items-center gap-1.5"><span className="text-lg">🇳🇿</span> New Zealand</span>
              <span className="flex items-center gap-1.5"><span className="text-lg">🇮🇩</span> Indonesia</span>
              <span className="flex items-center gap-1.5"><span className="text-lg">🇻🇳</span> Vietnam</span>
              <span className="flex items-center gap-1.5"><span className="text-lg">🇹🇭</span> Thailand</span>
              <span className="flex items-center gap-1.5"><span className="text-lg">🇵🇭</span> Philippines</span>
              <span className="flex items-center gap-1.5"><span className="text-lg">🇲🇾</span> Malaysia</span>
              <span className="flex items-center gap-1.5"><span className="text-lg">🇸🇬</span> Singapore</span>
              <span className="flex items-center gap-1.5"><span className="text-lg">🇰🇷</span> South Korea</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ── TRUST STRIP ── */}
      <Section mode="band">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-t-hi text-sm sm:text-base font-medium max-w-3xl mx-auto">
            Founded on 20 years across Activision Blizzard, King, Prime Gaming, AWS for Games, AppsFlyer, and InMobi.
          </p>
          <p className="text-t-lo text-sm mt-2 max-w-2xl mx-auto">
            Not a marketplace. Not a self-serve tool. A specialist team that runs your campaigns and owns the outcome.
          </p>
        </div>
      </Section>

      {/* ── SERVICES ── */}
      <Section mode="base" id="services">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-t-hi text-center mb-3">What We Do</h2>
          <p className="text-t-lo text-center mb-12 max-w-2xl mx-auto text-sm">
            Live video, UA, and measurement — all under one roof, all attributed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <ServiceCard
              eyebrow="01 · Live & Video Creator Campaigns"
              heading="Streams, Gameplay, and Video That Drives Installs"
              body="We match you with gaming creators who stream and produce video in your genre. Briefed properly, going live on Twitch, YouTube, TikTok, and Kick — with every install tracked back to the creator who drove it."
              outcome={{ label: 'Result', value: 'More players from live audiences — with proof of which stream drove each install.' }}
            />
            <ServiceCard
              eyebrow="02 · UA & Measurement"
              heading="User Acquisition Infrastructure Done Right"
              body="MMP configuration (AppsFlyer, Adjust, Singular), deep-link infrastructure, Steam wishlist campaigns, incrementality testing, and channels your competitors haven't found yet. Built by people who've configured these systems at scale."
              outcome={{ label: 'Result', value: "Lower CPI, higher-quality installs, and a measurement stack that proves what's working." }}
            />
            <ServiceCard
              eyebrow="03 · Cross-Promo & Retargeting"
              heading="Your Existing Players Drive New Installs"
              body="Audience syncs, creator-led cross-promotion, house placements, and retargeting across your portfolio. We build the system that turns Game A players into Game B installs — costed on measured uplift."
              outcome={{ label: 'Result', value: 'Compound growth across your titles — your cheapest installs come from players you already have.' }}
            />
          </div>

          {/* Credential strip */}
          <div className="mt-12 border-t border-line pt-6">
            <LogoMarquee />
          </div>
        </div>
      </Section>

      {/* ── HOW IT WORKS ── */}
      <Section mode="band">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-t-hi text-center mb-3">How It Works</h2>
          <p className="text-t-lo text-center mb-12 max-w-xl mx-auto text-sm">
            No 6-week onboarding. Brief us, we match creators, they go live.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: '1', icon: '🎯', title: 'Send Your Brief', desc: 'Market, genre, budget, timeline. We score it against live creator performance data and come back with a plan.' },
              { step: '2', icon: '🎮', title: 'We Match & Vet', desc: 'Every creator vetted on actual ROI history, audience quality, and brand safety. No bots, no inflated numbers.' },
              { step: '3', icon: '📡', title: 'Creators Go Live', desc: 'Streams, gameplay content, and video integrations activate within days. Deep-linked, tracked, attributed in real-time.' },
              { step: '4', icon: '📊', title: 'Prove It Worked', desc: 'MMP-verified attribution. Per-creator CPI, ROAS, and incrementality. Exportable for your board deck or client report.' },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-md bg-ink-700 flex items-center justify-center text-2xl mx-auto mb-4">{s.icon}</div>
                <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-label mb-1 block">Step {s.step}</span>
                <h3 className="font-bold text-t-hi mb-2">{s.title}</h3>
                <p className="text-sm text-t-mid">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── ATTRIBUTION INTEGRATION ── */}
      <Section mode="base">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-t-hi mb-3">Your Attribution Stack, Our Execution</h2>
              <p className="text-t-lo max-w-xl mx-auto">
                We integrate with whatever measurement your team already uses. No new SDK required.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ATTRIBUTION_PARTNERS.map(p => (
                <div key={p.name} className="bg-ink-700 border border-line rounded-md p-5 hover:border-line-hi transition-colors duration-micro ease-brand">
                  <h3 className="font-bold text-sm text-t-hi mb-1">{p.name}</h3>
                  <p className="text-xs text-t-lo">{p.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-ink-700 border border-line rounded-md p-6">
              <h3 className="font-bold text-t-hi mb-3">How attribution works in practice</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-ink-600 rounded-md p-4">
                  <div className="text-label font-bold mb-1">1. Paste your link</div>
                  <p className="text-t-lo">AppsFlyer OneLink, Adjust tracker, or UTM — whatever your standard is.</p>
                </div>
                <div className="bg-ink-600 rounded-md p-4">
                  <div className="text-label font-bold mb-1">2. Creators go live</div>
                  <p className="text-t-lo">Each creator gets a unique tracked link. Every click, install, and conversion is attributed to their stream.</p>
                </div>
                <div className="bg-ink-600 rounded-md p-4">
                  <div className="text-label font-bold mb-1">3. Real-time reporting</div>
                  <p className="text-t-lo">Per-creator ROI, CPI, and conversion data — exportable for client reports.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── STATS BAND ── */}
      <Section mode="band">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto text-center">
            {[
              { value: '280+', label: 'Creators in Network' },
              { value: '9', label: 'APAC Markets' },
              { value: '24hr', label: 'Campaign Activation' },
              { value: '20yrs', label: 'Industry Experience' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl sm:text-4xl font-bold text-t-hi">{s.value}</div>
                <div className="text-sm text-t-lo mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CTA — the single gradient section ── */}
      <Section mode="gradient">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-t-hi mb-4">Ready to put live creators to work?</h2>
          <p className="text-lg text-t-hi/80 mb-8 max-w-xl mx-auto">
            Tell us about your game. We&apos;ll come back with a campaign plan tailored to your market, genre, and budget.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/get-started">
              <Button variant="primary" size="lg">
                Get Your Campaign Plan
              </Button>
            </Link>
            <Link href="/creator-signup">
              <Button variant="ghost" size="lg" className="text-t-hi hover:text-t-hi">
                Join as Creator
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
