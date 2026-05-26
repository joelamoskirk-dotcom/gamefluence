import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Gamefluence</h1>
          <p className="text-xl text-gray-300">
            Connecting brands with gaming creators across Asia-Pacific.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Gamefluence is a gaming creator marketing platform built for agencies and brands targeting APAC markets. We connect you with authentic gaming content creators in Vietnam, Thailand, Indonesia, Philippines, Japan, New Zealand, and Australia.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our platform handles creator matching, campaign coordination, and attribution tracking — so you can focus on strategy while we handle execution.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-12">Why APAC Gaming</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Southeast Asia and the broader APAC region represent some of the fastest-growing gaming markets in the world. Mobile gaming dominates, creator culture is thriving, and brands are looking for authentic ways to reach engaged audiences.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              We built Gamefluence because we saw a gap: agencies needed a platform that understood local markets, local creators, and local gaming culture — not a one-size-fits-all global tool.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-12">How We Work</h2>
            <div className="space-y-4 mb-8">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">You tell us your goals</h3>
                  <p className="text-gray-600">Market, genre, budget, target audience — we take it from there.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">We match you with creators</h3>
                  <p className="text-gray-600">Vetted gaming creators in your target market, matched to your brand and audience.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Campaign goes live</h3>
                  <p className="text-gray-600">Creators produce content, we track everything — installs, engagement, conversions.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">You see results</h3>
                  <p className="text-gray-600">Full attribution reporting. Know exactly what worked and what to scale.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-12">Company</h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              <strong>Gamefluence Pty Ltd</strong>
            </p>
            <p className="text-gray-600 leading-relaxed mb-2">
              ACN: 696 199 461
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Sydney, Australia
            </p>
            <p className="text-gray-600 leading-relaxed">
              Questions? Reach us at{' '}
              <a href="mailto:admin@gamefluence.com.au" className="text-primary hover:underline">admin@gamefluence.com.au</a>
            </p>
          </div>

          <div className="mt-12 text-center">
            <Link href="/get-started">
              <Button size="lg" className="bg-primary text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
