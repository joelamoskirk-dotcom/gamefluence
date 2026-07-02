'use client';

import React, { useState } from 'react';
import { MobileyesTalentManagement, TalentProfile, TalentPlatformLink, RateCard } from '@/lib/mobileyes-talent-management';
import { VerificationPlatform } from '@/lib/platform-verification-engine';
import { Button } from '@/components/ui/Button';
import {
  User,
  DollarSign,
  Shield,
  CheckCircle,
  Sparkles,
  Video,
  AlertTriangle,
} from 'lucide-react';

interface TalentAgreementFormProps {
  onSubmit?: (data: Partial<TalentProfile> & { agreementAccepted: boolean }) => void;
}

type FormStep = 'personal' | 'platforms' | 'rates' | 'agreement' | 'complete';

export default function TalentAgreementForm({ onSubmit }: TalentAgreementFormProps) {
  const [step, setStep] = useState<FormStep>('personal');
  
  // Personal info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [timezone, setTimezone] = useState('Australia/Sydney');
  const [abn, setAbn] = useState(''); // Australian Business Number (optional)
  
  // Platforms
  const [platforms, setPlatforms] = useState<TalentPlatformLink[]>([]);
  const [primaryPlatform, setPrimaryPlatform] = useState<VerificationPlatform>('kick');
  const [newPlatform, setNewPlatform] = useState<VerificationPlatform>('kick');
  const [newHandle, setNewHandle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newFollowers, setNewFollowers] = useState('');
  
  // Rates
  const [fullDayRate, setFullDayRate] = useState('');
  const [halfDayRate, setHalfDayRate] = useState('');
  const [perDeliverableRate, setPerDeliverableRate] = useState('');
  const [currency, setCurrency] = useState<'AUD' | 'USD'>('AUD');
  
  // Agreement
  const [preExistingBrands, setPreExistingBrands] = useState('');
  const [agreementRead, setAgreementRead] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [understoodCommission, setUnderstoodCommission] = useState(false);
  const [understoodPayment, setUnderstoodPayment] = useState(false);
  const [understoodNonExclusive, setUnderstoodNonExclusive] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addPlatform = () => {
    if (!newHandle || !newUrl) return;
    // Validate URL format
    if (!newUrl.startsWith('https://')) {
      alert('Platform URL must start with https://');
      return;
    }
    // Validate URL matches selected platform
    const platformDomains: Record<string, string[]> = {
      kick: ['kick.com'],
      twitch: ['twitch.tv'],
      youtube: ['youtube.com', 'youtu.be'],
      tiktok: ['tiktok.com'],
    };
    const validDomains = platformDomains[newPlatform] || [];
    const urlMatchesPlatform = validDomains.some(domain => newUrl.includes(domain));
    if (!urlMatchesPlatform) {
      alert(`URL doesn't match selected platform (${newPlatform}). Expected: ${validDomains.join(' or ')}`);
      return;
    }
    setPlatforms([...platforms, {
      platform: newPlatform,
      handle: newHandle.replace(/[<>"'&]/g, ''), // sanitize
      url: newUrl,
      followerCount: Math.max(0, parseInt(newFollowers) || 0),
      verified: false,
    }]);
    setNewHandle('');
    setNewUrl('');
    setNewFollowers('');
  };

  const removePlatform = (index: number) => {
    setPlatforms(platforms.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const rateCard: RateCard = {
      fullDayRate: parseFloat(fullDayRate) || 0,
      halfDayRate: parseFloat(halfDayRate) || 0,
      perDeliverableRate: parseFloat(perDeliverableRate) || 0,
      currency,
      lastReviewed: new Date(),
      nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    };

    const talentData: Partial<TalentProfile> & { agreementAccepted: boolean } = {
      fullName,
      email,
      phone: phone || undefined,
      location,
      timezone,
      platforms,
      primaryPlatform,
      rateCard,
      preExistingBrands: preExistingBrands.split('\n').filter(b => b.trim()),
      agreementVersion: '1.0',
      agreementAccepted: true,
      notes: abn ? `ABN: ${abn.trim()}` : undefined,
    };

    if (onSubmit) {
      onSubmit(talentData);
    }

    setStep('complete');
    setIsSubmitting(false);
  };

  const canProceedFromPersonal = fullName && email && location && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canProceedFromPlatforms = platforms.length > 0;
  const canProceedFromRates = fullDayRate && halfDayRate && perDeliverableRate && 
    parseFloat(fullDayRate) > 0 && parseFloat(halfDayRate) > 0 && parseFloat(perDeliverableRate) > 0 &&
    parseFloat(fullDayRate) <= 100000 && parseFloat(halfDayRate) <= 100000 && parseFloat(perDeliverableRate) <= 100000;
  const canSubmitAgreement = agreementRead && agreementAccepted && understoodCommission && understoodPayment && understoodNonExclusive;

  const steps: { key: FormStep; label: string; number: number }[] = [
    { key: 'personal', label: 'About You', number: 1 },
    { key: 'platforms', label: 'Platforms', number: 2 },
    { key: 'rates', label: 'Rate Card', number: 3 },
    { key: 'agreement', label: 'Agreement', number: 4 },
  ];

  const currentStepIndex = steps.findIndex(s => s.key === step);

  if (step === 'complete') {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Welcome to Mobileyes! 🎬</h2>
          <p className="text-green-100 text-lg">
            Your talent profile has been submitted and agreement signed.
          </p>
        </div>
        <div className="p-8">
          <h3 className="text-xl font-bold mb-4">What Happens Next</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-indigo-600">1</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Profile Review (24-48 hours)</p>
                <p className="text-gray-600 text-sm">We verify your platforms and set you up in our system.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-indigo-600">2</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Rate Card Confirmation</p>
                <p className="text-gray-600 text-sm">We&apos;ll confirm your rates and advise on market positioning.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-indigo-600">3</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Brief Matching Begins</p>
                <p className="text-gray-600 text-sm">You&apos;ll receive briefs via email/dashboard as they match your profile.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600">Questions? Email <a href="mailto:admin@mobileyes.live" className="text-indigo-600 font-medium">admin@mobileyes.live</a></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5" />
          <span className="text-indigo-200 text-sm font-medium">MOBILEYES TALENT ONBOARDING</span>
        </div>
        <h1 className="text-2xl font-bold">Join the Roster</h1>
        <p className="text-indigo-200 mt-1">AU-first talent representation for live video creators</p>
      </div>

      {/* Progress Steps */}
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i < currentStepIndex ? 'bg-green-500 text-white' :
                i === currentStepIndex ? 'bg-indigo-600 text-white' :
                'bg-gray-200 text-gray-500'
              }`}>
                {i < currentStepIndex ? '✓' : s.number}
              </div>
              <span className={`ml-2 text-sm hidden sm:inline ${
                i === currentStepIndex ? 'text-indigo-600 font-medium' : 'text-gray-500'
              }`}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-2 ${i < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {/* Step 1: Personal Info */}
        {step === 'personal' && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              About You
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+61 4XX XXX XXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Country (e.g. Sydney, Australia)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Australia/Sydney">AEST (Sydney/Melbourne)</option>
                <option value="Australia/Brisbane">AEST (Brisbane - no DST)</option>
                <option value="Australia/Perth">AWST (Perth)</option>
                <option value="Australia/Adelaide">ACST (Adelaide)</option>
                <option value="Pacific/Auckland">NZST (Auckland)</option>
                <option value="Asia/Tokyo">JST (Tokyo)</option>
                <option value="Asia/Seoul">KST (Seoul)</option>
                <option value="Asia/Singapore">SGT (Singapore)</option>
                <option value="Asia/Bangkok">ICT (Bangkok)</option>
                <option value="Asia/Ho_Chi_Minh">ICT (Ho Chi Minh)</option>
                <option value="Asia/Jakarta">WIB (Jakarta)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ABN (optional — AU talent only)</label>
              <input
                type="text"
                value={abn}
                onChange={(e) => setAbn(e.target.value.replace(/[^0-9\s]/g, ''))}
                placeholder="XX XXX XXX XXX"
                maxLength={14}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-gray-500 mt-1">Required for invoicing if you&apos;re an Australian sole trader or company.</p>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => setStep('platforms')}
                disabled={!canProceedFromPersonal}
                className={`w-full py-3 ${canProceedFromPersonal ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-300 text-gray-500'}`}
              >
                Next: Your Platforms →
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Platforms */}
        {step === 'platforms' && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Video className="w-5 h-5 text-gray-500" />
              Your Platforms
            </h3>

            {/* Added platforms */}
            {platforms.length > 0 && (
              <div className="space-y-2">
                {platforms.map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">
                        {p.platform === 'kick' ? '🟢' : p.platform === 'twitch' ? '🟣' : p.platform === 'youtube' ? '🔴' : '🎵'}
                      </span>
                      <div>
                        <div className="font-medium">{p.handle}</div>
                        <div className="text-sm text-gray-500">{p.platform} • {p.followerCount.toLocaleString()} followers</div>
                      </div>
                    </div>
                    <button onClick={() => removePlatform(i)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                  </div>
                ))}
              </div>
            )}

            {/* Add platform form */}
            <div className="p-4 border border-dashed border-gray-300 rounded-lg space-y-3">
              <p className="text-sm font-medium text-gray-600">Add a platform:</p>
              
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value as VerificationPlatform)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="kick">🟢 Kick</option>
                  <option value="twitch">🟣 Twitch</option>
                  <option value="youtube">🔴 YouTube</option>
                  <option value="tiktok">🎵 TikTok</option>
                </select>
                <input
                  type="text"
                  value={newHandle}
                  onChange={(e) => setNewHandle(e.target.value)}
                  placeholder="Handle/Username"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="Full URL (e.g. https://kick.com/yourname)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <div className="flex gap-3">
                <input
                  type="number"
                  value={newFollowers}
                  onChange={(e) => setNewFollowers(e.target.value)}
                  placeholder="Follower count"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <Button onClick={addPlatform} disabled={!newHandle || !newUrl} className="bg-indigo-600 text-white text-sm">
                  Add Platform
                </Button>
              </div>
            </div>

            {/* Primary platform */}
            {platforms.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Platform</label>
                <select
                  value={primaryPlatform}
                  onChange={(e) => setPrimaryPlatform(e.target.value as VerificationPlatform)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {platforms.map((p, i) => (
                    <option key={i} value={p.platform}>{p.platform} — @{p.handle}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button onClick={() => setStep('personal')} variant="outline" className="flex-1">
                ← Back
              </Button>
              <Button
                onClick={() => setStep('rates')}
                disabled={!canProceedFromPlatforms}
                className={`flex-1 ${canProceedFromPlatforms ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-300 text-gray-500'}`}
              >
                Next: Rate Card →
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Rate Card */}
        {step === 'rates' && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gray-500" />
              Your Rate Card
            </h3>
            
            <p className="text-sm text-gray-600">
              Set your rates below. These are your <strong>gross rates</strong> — you&apos;ll receive 80% (Mobileyes takes 20% commission). 
              We&apos;ll review these with you and advise on market positioning.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as 'AUD' | 'USD')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="AUD">AUD (Australian Dollar)</option>
                <option value="USD">USD (US Dollar)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Day Rate (8+ hours) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={fullDayRate}
                  onChange={(e) => setFullDayRate(e.target.value)}
                  placeholder="e.g. 3000"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {fullDayRate && (
                <p className="text-sm text-green-600 mt-1">
                  You receive: ${Math.round(parseFloat(fullDayRate) * 0.8).toLocaleString()} {currency}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Half Day Rate (4 hours) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={halfDayRate}
                  onChange={(e) => setHalfDayRate(e.target.value)}
                  placeholder="e.g. 1800"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {halfDayRate && (
                <p className="text-sm text-green-600 mt-1">
                  You receive: ${Math.round(parseFloat(halfDayRate) * 0.8).toLocaleString()} {currency}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Per-Deliverable Rate (single video/mention) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={perDeliverableRate}
                  onChange={(e) => setPerDeliverableRate(e.target.value)}
                  placeholder="e.g. 1200"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {perDeliverableRate && (
                <p className="text-sm text-green-600 mt-1">
                  You receive: ${Math.round(parseFloat(perDeliverableRate) * 0.8).toLocaleString()} {currency}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={() => setStep('platforms')} variant="outline" className="flex-1">
                ← Back
              </Button>
              <Button
                onClick={() => setStep('agreement')}
                disabled={!canProceedFromRates}
                className={`flex-1 ${canProceedFromRates ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-300 text-gray-500'}`}
              >
                Next: Agreement →
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Agreement */}
        {step === 'agreement' && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5 text-gray-500" />
              Talent Management Agreement
            </h3>

            {/* Agreement Summary */}
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <h4 className="font-semibold text-indigo-800 mb-3">Key Terms Summary</h4>
              <div className="space-y-2 text-sm text-indigo-700">
                <p>• <strong>Non-exclusive</strong> — you can work with other agencies</p>
                <p>• <strong>20% commission</strong> on Mobileyes-sourced work only</p>
                <p>• <strong>4 business day payment</strong> after tech-verified completion</p>
                <p>• <strong>You choose</strong> which briefs to accept or decline</p>
                <p>• <strong>14 days notice</strong> to leave anytime</p>
                <p>• <strong>NSW jurisdiction</strong>, Australian law governs</p>
                <p>• <strong>APAC protection</strong> — fair rates for all markets</p>
              </div>
              <div className="mt-3">
                <a 
                  href="/legal/mobileyes-talent-management-agreement" 
                  target="_blank"
                  className="text-indigo-600 underline text-sm font-medium"
                >
                  Read full agreement →
                </a>
              </div>
            </div>

            {/* Pre-existing brands */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pre-existing Brand Relationships (Schedule A)
              </label>
              <p className="text-xs text-gray-500 mb-2">
                List any brands you currently work with directly. These are excluded from Mobileyes commission.
              </p>
              <textarea
                value={preExistingBrands}
                onChange={(e) => setPreExistingBrands(e.target.value)}
                placeholder="One brand per line, e.g.&#10;Monster Energy&#10;HyperX&#10;Razer"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={4}
              />
            </div>

            {/* Agreement checkboxes */}
            <div className="space-y-3 border-t pt-4">
              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreementRead}
                  onChange={(e) => setAgreementRead(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 text-sm">
                  I have read and understood the Mobileyes Talent Management Agreement
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={understoodCommission}
                  onChange={(e) => setUnderstoodCommission(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 text-sm">
                  I understand Mobileyes takes 20% commission on work they source for me
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={understoodPayment}
                  onChange={(e) => setUnderstoodPayment(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 text-sm">
                  I understand payment is made within 4 business days of tech-verified completion
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={understoodNonExclusive}
                  onChange={(e) => setUnderstoodNonExclusive(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 text-sm">
                  I understand this is non-exclusive and I can leave with 14 days notice
                </span>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-50 cursor-pointer border border-indigo-200">
                <input
                  type="checkbox"
                  checked={agreementAccepted}
                  onChange={(e) => setAgreementAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 text-sm font-medium">
                  I accept the Mobileyes Talent Management Agreement and wish to join the roster
                </span>
              </label>
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-800 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>This constitutes an electronic signature under NSW law.</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={() => setStep('rates')} variant="outline" className="flex-1">
                ← Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!canSubmitAgreement || isSubmitting}
                className={`flex-1 py-3 font-bold ${
                  canSubmitAgreement 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-gray-300 text-gray-500'
                }`}
              >
                {isSubmitting ? 'Submitting...' : '✅ Sign & Join Mobileyes'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
