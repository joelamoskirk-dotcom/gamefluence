import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function CreatorsPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 mb-6 text-sm text-green-700">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Accepting AU &amp; APAC creators
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Get Paid to Game
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          We connect gaming creators with brands who pay properly and fast. No chasing invoices. No content you wouldn&apos;t make anyway. Non-exclusive. 4-day payment. Keep your audience, keep your style.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/talent-signup">
            <Button>Apply Now — 2 Minutes</Button>
          </Link>
          <Link href="/get-started">
            <Button variant="outline">I&apos;m a Brand</Button>
          </Link>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">How Creator Matching Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-bold mb-2">1. Tell Us Your Goals</h3>
            <p className="text-sm text-gray-600">
              Share your game, target markets, audience demographics, and campaign objectives.
              We handle the rest.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="font-bold mb-2">2. AI Finds Your Match</h3>
            <p className="text-sm text-gray-600">
              Our engine scores creators on engagement, cultural fit, audience overlap,
              and brand safety — with 94.7% prediction accuracy.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="font-bold mb-2">3. Campaign Launches</h3>
            <p className="text-sm text-gray-600">
              We manage briefing, content approval, and performance tracking.
              You get real-time attribution and ROI reporting.
            </p>
          </div>
        </div>
      </div>

      {/* Why Private Roster */}
      <div className="max-w-3xl mx-auto mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100">
        <h3 className="font-bold text-lg mb-3">Why We Don&apos;t Share Our Roster</h3>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-green-500 mt-0.5">✓</span>
            <span><strong>Creator Protection</strong> — Our creators trust us to manage inbound. No spam, no lowball offers.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-500 mt-0.5">✓</span>
            <span><strong>Better Matches</strong> — AI matching outperforms manual browsing. We find creators you&apos;d never discover on your own.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-500 mt-0.5">✓</span>
            <span><strong>Exclusive Access</strong> — Many of our creators work exclusively through Gamefluence for APAC campaigns.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-500 mt-0.5">✓</span>
            <span><strong>Quality Guarantee</strong> — Every creator is vetted for authenticity, brand safety, and performance history.</span>
          </li>
        </ul>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-3xl font-bold text-primary">280+</p>
          <p className="text-sm text-gray-500">Verified Creators</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-purple-600">7</p>
          <p className="text-sm text-gray-500">APAC Markets</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-green-600">94.7%</p>
          <p className="text-sm text-gray-500">Match Accuracy</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-orange-500">5.8x</p>
          <p className="text-sm text-gray-500">Avg Campaign ROI</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <Link href="/get-started">
          <Button className="px-8 py-3 text-lg">Start Your Campaign</Button>
        </Link>
        <p className="text-sm text-gray-500 mt-3">
          Free consultation. No commitment required.
        </p>
      </div>
    </main>
  );
}
