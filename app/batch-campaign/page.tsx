'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { processBatchCampaignOrder, getGrowthInsights, BatchCampaignOrder } from '@/lib/batch-campaign-engine';
import { gamefluenceAI } from '@/lib/advanced-gamefluence-ai-engine';
import { CREATOR_POOL } from '@/lib/batch-campaign-engine';
import {
  Users, DollarSign, TrendingUp, Brain, CheckCircle,
  AlertCircle, Zap, Target, Globe, BarChart3
} from 'lucide-react';

const MARKETS = ['vietnam', 'thailand', 'indonesia', 'philippines', 'australia', 'japan'];
const GENRES = ['mobile_rpg', 'battle_royale', 'casual', 'racing', 'strategy', 'gacha'];

type Step = 'brief' | 'preview' | 'payment' | 'processing' | 'complete';

export default function BatchCampaignPage() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>('brief');
  const [brief, setBrief] = useState({
    genre: 'mobile_rpg',
    market: 'vietnam',
    budget: 25000,
    targetConversions: 5000,
    minFollowers: 100000,
    preferOnPlatform: true,
    creatorCount: 5,
  });
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  // Read market from URL param (from homepage market cards)
  useEffect(() => {
    const urlMarket = searchParams.get('market');
    if (urlMarket && MARKETS.includes(urlMarket)) {
      setBrief(prev => ({ ...prev, market: urlMarket }));
    }
  }, [searchParams]);
  const [order, setOrder] = useState<BatchCampaignOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState('');

  // Preview AI selection before payment
  const previewCreators = gamefluenceAI.selectCreatorsForBrief(CREATOR_POOL, brief);
  const insights = getGrowthInsights();

  const handlePurchase = async () => {
    if (!customerName || !customerEmail) {
      setError('Please fill in your name and email.');
      return;
    }
    setError(null);
    setStep('processing');

    try {
      setProcessingStep('Processing payment...');
      await new Promise(r => setTimeout(r, 600));

      setProcessingStep('AI selecting best creators...');
      await new Promise(r => setTimeout(r, 800));

      setProcessingStep('Building outreach queue...');
      const result = await processBatchCampaignOrder(brief, customerName, customerEmail);
      await new Promise(r => setTimeout(r, 400));

      setOrder(result);
      setStep('complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStep('payment');
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Zap className="w-8 h-8 text-gaming" />
          Batch Campaign Builder
        </h1>
        <p className="text-gray-600 mt-2">
          AI-curated creator selection powered by campaign learning data
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8 text-sm">
        {(['brief', 'preview', 'payment', 'complete'] as Step[]).map((s, i) => (
          <React.Fragment key={s}>
            <div className={`px-3 py-1 rounded-full font-medium ${
              step === s ? 'bg-primary text-white' :
              ['brief','preview','payment','complete'].indexOf(step) > i
                ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
            }`}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </div>
            {i < 3 && <div className="w-6 h-px bg-gray-300" />}
          </React.Fragment>
        ))}
      </div>

      {/* STEP: Brief */}
      {step === 'brief' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border p-6 space-y-4">
              <h2 className="text-xl font-semibold">Campaign Brief</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Market</label>
                  <select
                    className="w-full border rounded-lg p-2"
                    value={brief.market}
                    onChange={e => setBrief({ ...brief, market: e.target.value })}
                  >
                    {MARKETS.map(m => (
                      <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Game Genre</label>
                  <select
                    className="w-full border rounded-lg p-2"
                    value={brief.genre}
                    onChange={e => setBrief({ ...brief, genre: e.target.value })}
                  >
                    {GENRES.map(g => (
                      <option key={g} value={g}>{g.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Budget (USD)</label>
                  <input
                    type="number"
                    className="w-full border rounded-lg p-2"
                    value={brief.budget}
                    onChange={e => setBrief({ ...brief, budget: Number(e.target.value) })}
                    min={5000}
                    step={5000}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Number of Creators</label>
                  <input
                    type="number"
                    className="w-full border rounded-lg p-2"
                    value={brief.creatorCount}
                    onChange={e => setBrief({ ...brief, creatorCount: Number(e.target.value) })}
                    min={1}
                    max={20}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Min Followers</label>
                  <select
                    className="w-full border rounded-lg p-2"
                    value={brief.minFollowers}
                    onChange={e => setBrief({ ...brief, minFollowers: Number(e.target.value) })}
                  >
                    <option value={50000}>50K+</option>
                    <option value={100000}>100K+</option>
                    <option value={500000}>500K+</option>
                    <option value={1000000}>1M+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Target Conversions</label>
                  <input
                    type="number"
                    className="w-full border rounded-lg p-2"
                    value={brief.targetConversions}
                    onChange={e => setBrief({ ...brief, targetConversions: Number(e.target.value) })}
                    min={100}
                    step={500}
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={brief.preferOnPlatform}
                  onChange={e => setBrief({ ...brief, preferOnPlatform: e.target.checked })}
                />
                <span className="text-sm">Prefer creators already on Gamefluence (faster activation)</span>
              </label>

              {/* Attribution tracking */}
              <div className="bg-gray-50 rounded-lg p-4 border">
                <h3 className="text-sm font-semibold mb-2">Attribution Tracking</h3>
                <p className="text-xs text-gray-500 mb-3">Paste your tracking link — we'll generate unique links per creator</p>
                <select className="w-full border rounded-lg p-2 text-sm mb-2">
                  <option>AppsFlyer OneLink</option>
                  <option>Adjust Tracker</option>
                  <option>UTM Parameters</option>
                  <option>Promo Code</option>
                  <option>Custom SDK</option>
                </select>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2 text-sm"
                  placeholder="https://app.appsflyer.com/com.yourgame?pid=gamefluence&c=campaign_name"
                />
              </div>
            </div>

            {/* AI Insights panel */}
            <div className="bg-gradient-to-r from-gaming/5 to-accent/5 rounded-xl border border-gaming/20 p-6">
              <h3 className="font-semibold flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-gaming" />
                AI Learning Insights
              </h3>
              <div className="space-y-2">
                {insights.insights.slice(0, 3).map((ins, i) => (
                  <div key={i} className="text-sm bg-white/60 rounded-lg p-3">
                    <div className="font-medium">{ins.insight}</div>
                    <div className="text-gray-500 text-xs mt-1">→ {ins.actionable}</div>
                    <div className="text-xs text-gaming mt-1">{Math.round(ins.confidence * 100)}% confidence · {ins.dataPoints} data points</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Yield sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border p-5">
              <h3 className="font-semibold flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4 text-primary" />
                Market Yield Signals
              </h3>
              {insights.yieldByMarket.map(y => (
                <div key={y.market} className="flex items-center justify-between py-2 border-b last:border-0 text-sm">
                  <span className="capitalize">{y.market}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    y.demandSignal === 'high' ? 'bg-green-100 text-green-700' :
                    y.demandSignal === 'low' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {y.demandSignal} · {y.suggestedPriceMultiplier}x
                  </span>
                </div>
              ))}
            </div>

            <Button className="w-full" onClick={() => setStep('preview')}>
              Preview AI Selection →
            </Button>
          </div>
        </div>
      )}

      {/* STEP: Preview */}
      {step === 'preview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-gaming" />
              AI-Selected Creators for Your Brief
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Selected from {CREATOR_POOL.length} creators using campaign learning data.
              On-platform creators activate immediately; others enter smart outreach.
            </p>

            <div className="space-y-3">
              {previewCreators.map((rec, i) => (
                <div key={rec.creator.creatorId} className="flex items-center justify-between p-4 rounded-lg border bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{rec.creator.creatorId} · {rec.creator.platform}</div>
                      <div className="text-xs text-gray-500">
                        {(rec.creator.followers / 1000).toFixed(0)}K followers · {rec.creator.engagementRate}% eng
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{rec.reason.slice(0, 2).join(' · ')}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gaming">{rec.score}/100</div>
                    <div className="text-xs text-gray-500">{rec.predictedROI.toFixed(1)}x pred. ROI</div>
                    <div className={`text-xs mt-1 px-2 py-0.5 rounded-full ${
                      rec.isOnPlatform ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {rec.isOnPlatform ? '✓ On platform' : '→ Outreach'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {previewCreators.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No creators match this brief. Try lowering min followers or changing market.
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep('brief')}>← Edit Brief</Button>
            <Button onClick={() => setStep('payment')} disabled={previewCreators.length === 0}>
              Proceed to Payment →
            </Button>
          </div>
        </div>
      )}

      {/* STEP: Payment */}
      {step === 'payment' && (
        <div className="max-w-lg space-y-6">
          <div className="bg-white rounded-xl border p-6 space-y-4">
            <h2 className="text-xl font-semibold">Complete Purchase</h2>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Company / Your Name</label>
              <input
                className="w-full border rounded-lg p-2"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                placeholder="Acme Gaming Studio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full border rounded-lg p-2"
                value={customerEmail}
                onChange={e => setCustomerEmail(e.target.value)}
                placeholder="campaigns@yourstudio.com"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span>{brief.creatorCount} creators · {brief.market} · {brief.genre}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t pt-2">
                <span>Total</span>
                <span>${brief.budget.toLocaleString()}</span>
              </div>
            </div>

            <Button className="w-full" onClick={handlePurchase}>
              <DollarSign className="w-4 h-4 mr-2" />
              Pay & Launch Campaign
            </Button>
          </div>
          <Button variant="outline" onClick={() => setStep('preview')}>← Back</Button>
        </div>
      )}

      {/* STEP: Processing */}
      {step === 'processing' && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="text-lg font-medium">{processingStep}</div>
          <div className="text-sm text-gray-500">Our AI is working in the background...</div>
        </div>
      )}

      {/* STEP: Complete */}
      {step === 'complete' && order && (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-green-700">Campaign Launched!</h2>
            <p className="text-gray-600 mt-1">Payment confirmed · Creators selected · Outreach queued</p>
            <div className="flex justify-center gap-4 mt-3 text-sm text-gray-500">
              <span>Customer: {order.stripeCustomerId}</span>
              <span>Payment: {order.stripePaymentId}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Selected Creators ({order.selectedCreators.length})
              </h3>
              <div className="space-y-2">
                {order.selectedCreators.map((rec, i) => (
                  <div key={i} className="flex justify-between text-sm py-1 border-b last:border-0">
                    <span>{rec.creator.creatorId} · {rec.creator.platform}</span>
                    <span className={rec.isOnPlatform ? 'text-green-600' : 'text-blue-600'}>
                      {rec.isOnPlatform ? 'Active' : 'Outreach'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                Outreach Queue ({order.outreachQueue.length})
              </h3>
              <div className="space-y-2">
                {order.outreachQueue.map((task, i) => (
                  <div key={i} className="text-sm py-1 border-b last:border-0">
                    <div className="flex justify-between">
                      <span>{task.creatorId}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        task.priority === 'immediate' ? 'bg-green-100 text-green-700' :
                        task.priority === 'high' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>{task.priority}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5 truncate">{task.outreachMessage?.slice(0, 60)}...</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => { setStep('brief'); setOrder(null); }}>
              Start Another Campaign
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/admin'}>
              View in Admin
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
