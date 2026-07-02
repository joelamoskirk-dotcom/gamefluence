'use client';

import React, { useState } from 'react';
import TalentAgreementForm from '@/components/talent/TalentAgreementForm';
import { TalentProfile } from '@/lib/mobileyes-talent-management';

export default function TalentSignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: Partial<TalentProfile> & { agreementAccepted: boolean }) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/talent-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          location: data.location,
          timezone: data.timezone,
          platforms: data.platforms,
          primaryPlatform: data.primaryPlatform,
          rateCard: data.rateCard,
          preExistingBrands: data.preExistingBrands,
          agreementVersion: data.agreementVersion,
          agreementAccepted: data.agreementAccepted,
          signedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();
      if (!result.success) {
        console.error('Submission failed:', result);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
      {/* Hero */}
      <div className="text-center mb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Mobileyes Talent 🎬
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          AU-first talent representation for live video creators. 
          Get matched with premium brands, paid in 4 business days.
        </p>
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
          <span>🟢 Kick</span>
          <span>🟣 Twitch</span>
          <span>🔴 YouTube</span>
          <span>🎵 TikTok</span>
        </div>
      </div>

      {/* M-09: Creator Promise Strip */}
      <div className="mb-8 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-6 text-xs font-mono text-gray-400 tracking-wide">
          <span>4-day payment</span>
          <span className="w-1 h-1 bg-indigo-400 rounded-full" />
          <span>Briefs translated into your language</span>
          <span className="w-1 h-1 bg-indigo-400 rounded-full" />
          <span>Non-exclusive representation</span>
        </div>
      </div>

      {/* M-07: Verticals */}
      <div className="max-w-3xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0B0F2E] rounded-xl p-5 border border-white/10">
            <div className="inline-block bg-red-500/20 text-red-400 text-xs font-mono px-2 py-0.5 rounded mb-3">CARS</div>
            <h3 className="text-white font-bold mb-2">Cars &amp; Racing</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Car culture creators, sim racing streamers, meet coverage and build content. Audiences that buy what they watch.
            </p>
          </div>
          <div className="bg-[#0B0F2E] rounded-xl p-5 border border-white/10">
            <div className="inline-block bg-red-500/20 text-red-400 text-xs font-mono px-2 py-0.5 rounded mb-3">FLIGHT</div>
            <h3 className="text-white font-bold mb-2">Flight Sims &amp; Hardware</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              DCS, MSFS and sim rig creators. The most monetisable niche in gaming — deep engagement, real hardware spend.
            </p>
          </div>
          <div className="bg-[#0B0F2E] rounded-xl p-5 border border-white/10">
            <div className="inline-block bg-red-500/20 text-red-400 text-xs font-mono px-2 py-0.5 rounded mb-3">TECH</div>
            <h3 className="text-white font-bold mb-2">Peripherals &amp; Setups</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Battlestation builds, gear reviews, stream tech. Brand-ready creators for hardware companies chasing this audience.
            </p>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4 italic">
          Also representing: live streamers, entertainment and lifestyle creators — selectively.
        </p>
      </div>

      {/* Form */}
      <TalentAgreementForm onSubmit={handleSubmit} />

      {/* Footer */}
      <div className="text-center mt-12 text-gray-500 text-sm">
        <p>© 2026 Mobileyes • admin@mobileyes.live</p>
        <p className="mt-1">Sydney, NSW, Australia</p>
        <p className="mt-2">
          <a href="/mobileyes-privacy" className="text-indigo-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
