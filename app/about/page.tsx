import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const OUTCOMES = [
  { metric: '100M+', outcome: 'Users acquired across gaming platforms', context: 'Scaled Kick from zero to 100M+ users' },
  { metric: '98%', outcome: 'UA growth delivered for Halfbrick Studios', context: '1B+ download gaming brand, published in The Drum' },
  { metric: '9 figures', outcome: 'Gaming revenue generated at AWS', context: 'Enterprise partnerships across APAC' },
  { metric: '5.8x', outcome: 'Average campaign ROAS for clients', context: 'Verified via MMP attribution' },
  { metric: '$0.80', outcome: 'CPI via creator-attributed installs', context: 'vs $2.50–$8.00 through paid UA channels' },
  { metric: '24hr', outcome: 'From brief to creator activation', context: 'No 6-week onboarding cycles' },
];

const WORKED_WITH = [
  { name: 'King (Candy Crush)', type: 'Studio' },
  { name: 'Amazon Games', type: 'Platform' },
  { name: 'Prime Gaming', type: 'Platform' },
  { name: 'Activision Blizzard', type: 'Studio' },
  { name: 'Kick', type: 'Platform' },
  { name: 'AppsFlyer', type: 'Attribution' },
  { name: 'AWS Gaming', type: 'Infrastructure' },
  { name: 'IGN', type: 'Media' },
  { name: 'Twitch', type: 'Platform' },
  { name: 'InMobi', type: 'Ad Tech' },
  { name: 'Halfbrick Studios', type: 'Studio' },
  { name: 'IAB', type: 'Industry Body' },
];

const PROOF_POINTS = [
  {
    title: 'Candy Crush Friends Saga — 10M+ Installs',
    description: 'Launched with Emily Ratajkowski & Vanessa Hudgens. Combined influencer UA with performance marketing. Guinness World Record for largest live mobile gameplay at Brookfield Place, NYC.',
    url: 'https://www.youtube.com/watch?v=lp9I0ZJiJLo',
    source: 'King / Activision Blizzard',
  },
  {
    title: 'IAB Opt-In Value Exchange Playbook',
    description: '"Value exchange lies within the core customer experience and advertisers should look for experiences that are rewarding for users." — Joel Kirk, quoted in the global industry standard.',
    url: 'https://www.iab.com/guidelines/opt-in-value-exchange-advertising-playbook-for-brands/',
    source: 'IAB',
  },
  {
    title: 'Halfbrick: 98% UA Growth',
    description: 'Grew user acquisition by 98% for a gaming brand with 1B+ downloads using attribution frameworks. Published in The Drum.',
    url: 'https://www.thedrum.com/industryinsights/2022/09/19/how-halfbrick-increased-user-acquisition-98-midst-competitive-gaming',
    source: 'The Drum / AppsFlyer',
  },
  {
    title: 'IAB Gaming Upfronts — 99% Viewability',
    description: 'Delivered 99% viewability and 100% eyes-on attention for Nestle/KitKat across Candy Crush. 2.3x purchase intent.',
    url: 'https://www.iabuk.com/member-content/capturing-focus-driving-results-why-gaming-matters-more-ever',
    source: 'IAB UK',
  },
  {
    title: 'Doing Mobile Video Right — Global Series',
    description: "Authored InMobi's global go-to-market for mobile video. 47% higher CTR on landscape, 22% higher VCR on short-form, 50% lower CPA vs interstitial.",
    url: 'https://www.inmobi.com/blog/doing-mobile-video-right-vlog-part-3',
    source: 'InMobi',
  },
  {
    title: 'InMobi: Programmatic Video Buying',
    description: 'Part 1 of the Doing Mobile Video Right vlog series — programmatic buying strategies for mobile-first video campaigns.',
    url: 'https://www.inmobi.com/blog/doing-mobile-video-right-vlog-part-1-programmatic-with-kayla-wilson',
    source: 'InMobi',
  },
  {
    title: 'Mobile Video Metrics That Matter',
    description: 'Guide to next-gen video ad measurement — interstitial, rewarded, interactive end cards. The metrics framework for mobile-first campaigns.',
    url: 'https://www.inmobi.com/blog/why-the-right-mobile-video-advertising-metrics-make-all-the-difference',
    source: 'InMobi',
  },
  {
    title: 'Viewability Standards for Mobile Video',
    description: 'Defining the new viewability benchmarks for in-app video advertising across smartphones.',
    url: 'https://www.inmobi.com/blog/2017/09/19/metrics-that-matter-the-new-viewability-standards-for-mobile-video',
    source: 'InMobi',
  },
];


const WHO_THIS_IS_FOR = [
  { label: 'Gaming studios launching new titles', desc: 'You need installs from the right players, not just impressions.' },
  { label: 'Publishers with multi-title portfolios', desc: 'Cross-promo between your games. Compound your existing audience.' },
  { label: 'Agencies running gaming campaigns', desc: 'White-label creator campaigns with real attribution for client reports.' },
  { label: 'Government funding bodies', desc: 'Post-release measurement that proves public investment generated economic return.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] pb-16">

      {/* ── HERO: CTA Above Fold ── */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0D0D0D] to-[#0a0a1a]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-4">Gaming Creator Marketing &amp; UA</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              We get gaming brands<br />
              <span className="text-accent">more players, faster.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-8">
              Creator campaigns, user acquisition, and MMP-verified attribution — from the team that scaled Kick to 100M users, ran UA at King, and built attribution frameworks at AppsFlyer.
            </p>

            {/* CTA — Above the fold */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-10">
              <Link href="/get-started">
                <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg bg-accent hover:bg-accent/90 text-white">
                  Launch a Campaign
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base sm:text-lg border-2 border-white text-white bg-white/10 hover:bg-white/20">
                  See Pricing
                </Button>
              </Link>
            </div>

            {/* Quick proof */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/50">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> No lock-in contracts</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> Live in 24 hours</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> MMP-verified attribution</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORKED WITH — drives inbound ── */}
      <section className="py-12 bg-[#0D0D0D] border-t border-white/5">
        <div className="container mx-auto px-4">
          <p className="text-center text-[10px] uppercase tracking-[0.2em] text-white/30 mb-8">Built by 20 years working with</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-w-4xl mx-auto">
            {WORKED_WITH.map((w, i) => (
              <div key={i} className="bg-[#161616] border border-white/10 rounded-lg p-3 text-center hover:border-white/20 transition">
                <p className="text-white font-semibold text-sm">{w.name}</p>
                <p className="text-white/30 text-[10px] mt-0.5">{w.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUTCOME NUMBERS (not job titles) ── */}
      <section className="py-16 bg-[#0D0D0D]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">Results, Not Resumes</h2>
          <p className="text-white/50 text-center mb-10 max-w-xl mx-auto text-sm">
            We don&apos;t sell titles. We sell outcomes. Here&apos;s what we&apos;ve actually delivered.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OUTCOMES.map((o, i) => (
              <div key={i} className="bg-[#161616] border border-white/10 rounded-xl p-6 hover:border-accent/30 transition">
                <p className="text-3xl font-bold text-white mb-1">{o.metric}</p>
                <p className="text-white/80 font-medium text-sm mb-2">{o.outcome}</p>
                <p className="text-white/40 text-xs">{o.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ── */}
      <section className="py-16 bg-[#0a0a1a]">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">Who This Is For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WHO_THIS_IS_FOR.map((item, i) => (
              <div key={i} className="bg-[#161616] border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  {item.label}
                </h3>
                <p className="text-white/60 text-sm pl-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER — Outcome-focused, not CV ── */}
      <section className="py-16 bg-[#0D0D0D]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-[#161616] border border-white/10 rounded-2xl p-8 md:p-12">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Founder</p>
            <h2 className="text-3xl font-bold text-white mb-6">Joel Kirk</h2>
            
            <div className="space-y-4 text-white/70 text-sm leading-relaxed">
              <p>
                <strong className="text-white">The short version:</strong> 20 years in gaming UA, creator marketing, and attribution. I&apos;ve run campaigns at scale — not advised on them from the outside.
              </p>
              <p>
                Scaled <strong className="text-white">Kick</strong> from launch to 100M+ users. Ran mobile gaming UA at <strong className="text-white">King</strong> (Candy Crush). Built attribution measurement at <strong className="text-white">AppsFlyer</strong> — including the <a href="https://www.thedrum.com/industryinsights/2022/09/19/how-halfbrick-increased-user-acquisition-98-midst-competitive-gaming" target="_blank" rel="noopener" className="text-blue-400 hover:text-blue-300 underline">Halfbrick Studios case study</a> (98% UA growth, published in The Drum).
              </p>
              <p>
                Led gaming partnerships at <strong className="text-white">AWS</strong> earning 9 figures in revenue. Delivered <a href="https://www.iabuk.com/member-content/capturing-focus-driving-results-why-gaming-matters-more-ever" target="_blank" rel="noopener" className="text-blue-400 hover:text-blue-300 underline">99% viewability</a> across Candy Crush campaigns at <strong className="text-white">Activision Blizzard</strong>. Co-authored the <a href="https://www.iab.com/guidelines/opt-in-value-exchange-advertising-playbook-for-brands/" target="_blank" rel="noopener" className="text-blue-400 hover:text-blue-300 underline">IAB Opt-In Value Exchange Playbook</a> — the global standard for rewarded video.
              </p>
              <p>
                <strong className="text-white">Gamefluence exists because</strong> I kept seeing the same gap: great games dying without discovery, great creators without measurement, and great funding bodies without proof their investment worked. We fix all three.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF: Published Work ── */}
      <section className="py-16 bg-[#0D0D0D]">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-white text-center mb-3">Published &amp; Verified</h2>
          <p className="text-white/40 text-center text-sm mb-10">Not claims — published case studies and industry standards you can verify.</p>
          
          <div className="space-y-3">
            {PROOF_POINTS.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="block bg-[#161616] border border-white/10 rounded-xl p-5 hover:border-blue-500/30 hover:bg-[#1a1a2e] transition group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium group-hover:text-blue-400 transition">{link.title}</p>
                    <p className="text-white/50 text-sm mt-1">{link.description}</p>
                  </div>
                  <span className="text-white/30 text-xs font-mono shrink-0 ml-4">{link.source}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONVERSION CTA ── */}
      <section className="py-16 bg-gradient-to-r from-gaming to-accent">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Stop guessing. Start measuring.</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            One partner for creator campaigns, UA, and attribution. No lock-in. Pay for results. Live in 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/get-started">
              <Button size="lg" className="bg-white text-gaming hover:bg-gray-100 font-bold">
                Launch a Campaign
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/news">
              <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white/20">
                Read Our Thinking
              </Button>
            </Link>
          </div>
          <p className="text-white/50 text-xs mt-6">Or email joel@gamefluence.com.au — replies within 4 hours.</p>
        </div>
      </section>
    </main>
  );
}
