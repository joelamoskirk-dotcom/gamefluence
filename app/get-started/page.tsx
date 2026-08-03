'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import Section from '@/components/ui/Section';

const MARKETS = [
  'Australia & NZ',
  'Indonesia',
  'Vietnam',
  'Thailand',
  'Philippines',
  'Malaysia & Singapore',
  'South Korea',
  'Japan',
  'Global',
];

const BUDGETS = [
  'Under $10k',
  '$10k – $50k',
  '$50k – $100k',
  '$100k+',
  'Not sure yet',
];

export default function GetStarted() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    markets: [] as string[],
    budget: '',
    about: '',
  });

  const handleMarketToggle = (market: string) => {
    setFormData(prev => ({
      ...prev,
      markets: prev.markets.includes(market)
        ? prev.markets.filter(m => m !== market)
        : [...prev.markets, market],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send to API route which emails + logs to sheet
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      // Still show success — we'll handle failures server-side
    }

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen pb-16 sm:pb-0">
        <Section mode="base">
          <div className="container mx-auto px-4 py-24 text-center max-w-lg">
            <div className="w-16 h-16 rounded-full bg-ink-700 flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--label)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-t-hi mb-4">We&apos;ve got your brief.</h1>
            <p className="text-t-mid text-base mb-2">
              Expect a tailored campaign plan in your inbox within 24 hours.
            </p>
            <p className="text-t-lo text-sm">
              If your timeline is urgent, reply to the confirmation email and we&apos;ll prioritise.
            </p>
          </div>
        </Section>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-16 sm:pb-0">
      <Section mode="base">
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-t-hi mb-3">Get Your Campaign Plan</h1>
            <p className="text-t-mid max-w-lg mx-auto">
              Tell us about your game and target market. We&apos;ll come back within 24 hours with a tailored plan — creators, channels, timeline, and projected outcomes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block font-mono text-[11px] tracking-[0.16em] uppercase text-label mb-2">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-ink-700 border border-line rounded-md px-4 py-3 text-t-hi text-sm placeholder:text-t-lo focus:outline-none focus:border-label transition-colors duration-micro ease-brand min-h-[44px]"
                placeholder="Jane Smith"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-mono text-[11px] tracking-[0.16em] uppercase text-label mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-ink-700 border border-line rounded-md px-4 py-3 text-t-hi text-sm placeholder:text-t-lo focus:outline-none focus:border-label transition-colors duration-micro ease-brand min-h-[44px]"
                placeholder="jane@studio.com"
              />
            </div>

            {/* Company / Game */}
            <div>
              <label htmlFor="company" className="block font-mono text-[11px] tracking-[0.16em] uppercase text-label mb-2">
                Company / Game Title
              </label>
              <input
                id="company"
                type="text"
                required
                value={formData.company}
                onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full bg-ink-700 border border-line rounded-md px-4 py-3 text-t-hi text-sm placeholder:text-t-lo focus:outline-none focus:border-label transition-colors duration-micro ease-brand min-h-[44px]"
                placeholder="Studio name or game title"
              />
            </div>

            {/* Markets */}
            <div>
              <label className="block font-mono text-[11px] tracking-[0.16em] uppercase text-label mb-3">
                Target Market(s)
              </label>
              <div className="flex flex-wrap gap-2">
                {MARKETS.map(market => (
                  <button
                    key={market}
                    type="button"
                    onClick={() => handleMarketToggle(market)}
                    className={`px-3 py-2 rounded-sm text-xs font-medium transition-colors duration-micro ease-brand min-h-[36px] ${
                      formData.markets.includes(market)
                        ? 'bg-ink-600 border border-label text-label'
                        : 'bg-ink-700 border border-line text-t-lo hover:border-line-hi'
                    }`}
                  >
                    {market}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block font-mono text-[11px] tracking-[0.16em] uppercase text-label mb-2">
                Rough Budget Range
              </label>
              <select
                id="budget"
                required
                value={formData.budget}
                onChange={e => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full bg-ink-700 border border-line rounded-md px-4 py-3 text-t-hi text-sm focus:outline-none focus:border-label transition-colors duration-micro ease-brand min-h-[44px] appearance-none"
              >
                <option value="" disabled className="text-t-lo">Select a range</option>
                {BUDGETS.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* About */}
            <div>
              <label htmlFor="about" className="block font-mono text-[11px] tracking-[0.16em] uppercase text-label mb-2">
                Tell Us About Your Game
              </label>
              <textarea
                id="about"
                required
                rows={4}
                value={formData.about}
                onChange={e => setFormData(prev => ({ ...prev, about: e.target.value }))}
                className="w-full bg-ink-700 border border-line rounded-md px-4 py-3 text-t-hi text-sm placeholder:text-t-lo focus:outline-none focus:border-label transition-colors duration-micro ease-brand resize-none"
                placeholder="Genre, platform, what you're trying to achieve, timeline — anything that helps us build your plan."
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full text-base"
              disabled={loading}
            >
              {loading ? 'Sending…' : 'Get Your Campaign Plan'}
            </Button>

            <p className="text-center text-t-lo text-xs mt-4">
              No obligation. No sales automation. A real person reads this and replies.
            </p>
          </form>
        </div>
      </Section>
    </main>
  );
}
