'use client';

import React, { useState } from 'react';
import {
  PLATFORM_PROFILES,
  CLIPPING_PRICING,
  KICK_CLIPPING_STRATEGY,
  DISCORD_CLIPPING_STRATEGY,
  CLIP_DETECTION_RULES,
  estimateClipsFromVideo,
  calculateClippingROI,
  type TargetPlatform,
  type ClipJob,
} from '@/lib/content-clipping-engine';

export default function ContentClippingDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'platforms' | 'kick' | 'discord' | 'pricing' | 'jobs'>('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Clipping Engine</h1>
          <p className="text-white/50 text-sm mt-1">Platform-specific clip intelligence. Turn long-form into revenue.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-mono rounded-full">REVENUE STREAM</span>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-mono rounded-full">90% MARGIN</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 rounded-lg p-1">
        {(['overview', 'platforms', 'kick', 'discord', 'pricing', 'jobs'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === tab ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'
            }`}
          >
            {tab === 'kick' ? '🟢 Kick (Easy Win)' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'platforms' && <PlatformsTab />}
      {activeTab === 'kick' && <KickTab />}
      {activeTab === 'discord' && <DiscordTab />}
      {activeTab === 'pricing' && <PricingTab />}
      {activeTab === 'jobs' && <JobsTab />}
    </div>
  );
}

function OverviewTab() {
  const standardROI = calculateClippingROI(50, 'standard');
  const premiumROI = calculateClippingROI(30, 'premium');

  return (
    <div className="space-y-6">
      {/* Revenue Projections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#161616] border border-white/10 rounded-xl p-5">
          <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Per-Clip Revenue (Standard)</p>
          <p className="text-3xl font-bold text-white">${CLIPPING_PRICING.perClip.standard}</p>
          <p className="text-green-400 text-sm mt-1">Cost: ${CLIPPING_PRICING.costPerClip} → ${CLIPPING_PRICING.marginPerClip.standard} profit</p>
        </div>
        <div className="bg-[#161616] border border-white/10 rounded-xl p-5">
          <p className="text-white/50 text-xs uppercase tracking-wider mb-2">50 Clips/Month (Standard)</p>
          <p className="text-3xl font-bold text-white">${standardROI.monthlyProfit.toLocaleString()}</p>
          <p className="text-green-400 text-sm mt-1">{standardROI.marginPercent.toFixed(0)}% margin</p>
        </div>
        <div className="bg-[#161616] border border-white/10 rounded-xl p-5">
          <p className="text-white/50 text-xs uppercase tracking-wider mb-2">10 Kick Creators @ Retainer</p>
          <p className="text-3xl font-bold text-white">$13,000</p>
          <p className="text-green-400 text-sm mt-1">Monthly profit from Kick clipping alone</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">The Machine</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '1', title: 'Ingest', desc: 'Pull VOD/video from creator channel' },
            { step: '2', title: 'Detect', desc: 'AI finds clip-worthy moments by type' },
            { step: '3', title: 'Format', desc: 'Platform-specific cuts (9:16, 16:9, captions)' },
            { step: '4', title: 'Approve', desc: 'Creator/studio reviews via dashboard' },
            { step: '5', title: 'Distribute', desc: 'Post across platforms with tracking' },
          ].map(s => (
            <div key={s.step} className="text-center">
              <div className="w-8 h-8 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">{s.step}</div>
              <p className="text-white text-sm font-medium">{s.title}</p>
              <p className="text-white/40 text-xs mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Clip Types */}
      <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Detection Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(CLIP_DETECTION_RULES.types).map(([type, config]) => (
            <div key={type} className="bg-white/5 rounded-lg p-3">
              <p className="text-white text-sm font-medium capitalize">{type.replace('_', ' ')}</p>
              <p className="text-white/40 text-xs mt-1">Confidence: {(config.minConfidence * 100).toFixed(0)}%+</p>
              <p className="text-white/30 text-xs mt-1">{config.signals[0]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Estimator */}
      <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Quick Estimator</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[15, 30, 60, 120].map(mins => (
            <div key={mins} className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-white/50 text-xs">{mins} min video</p>
              <p className="text-2xl font-bold text-white">{estimateClipsFromVideo(mins)}</p>
              <p className="text-white/40 text-xs">clips estimated</p>
              <p className="text-green-400 text-xs mt-2">${estimateClipsFromVideo(mins) * CLIPPING_PRICING.marginPerClip.standard} profit</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlatformsTab() {
  return (
    <div className="space-y-4">
      {PLATFORM_PROFILES.map(platform => (
        <div key={platform.id} className="bg-[#161616] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">{platform.name}</h3>
            <span className="text-white/40 text-xs font-mono">{platform.aspectRatio} · {platform.resolution}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-white/50 text-xs uppercase mb-1">Duration</p>
              <p className="text-white text-sm">{platform.optimalDuration.min}-{platform.optimalDuration.max}s (sweet: {platform.optimalDuration.sweet}s)</p>
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase mb-1">Hook Window</p>
              <p className="text-white text-sm">{platform.hookWindow}s to grab attention</p>
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase mb-1">Captions</p>
              <p className="text-white text-sm">{platform.captionsRequired ? 'Required' : 'Optional'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-green-400 text-xs uppercase mb-2">What Works</p>
              <ul className="space-y-1">
                {platform.engagementDrivers.slice(0, 4).map((d, i) => (
                  <li key={i} className="text-white/60 text-xs">• {d}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-red-400 text-xs uppercase mb-2">Avoid</p>
              <ul className="space-y-1">
                {platform.avoidance.map((a, i) => (
                  <li key={i} className="text-white/60 text-xs">• {a}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-white/30 text-xs italic">{platform.audienceNotes}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function KickTab() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6">
        <h3 className="text-green-400 font-bold text-xl mb-2">🟢 Kick = Easy Win</h3>
        <p className="text-white/70">{KICK_CLIPPING_STRATEGY.opportunity}</p>
      </div>

      {/* Targets */}
      <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold mb-3">Target Creators</h3>
        <ul className="space-y-2">
          {KICK_CLIPPING_STRATEGY.targetCreators.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
              <span className="text-green-400 mt-0.5">→</span> {c}
            </li>
          ))}
        </ul>
      </div>

      {/* Workflow */}
      <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold mb-3">Workflow</h3>
        <div className="space-y-2">
          {KICK_CLIPPING_STRATEGY.workflow.map((step, i) => (
            <div key={i} className="flex items-start gap-3 text-white/70 text-sm">
              <span className="text-purple-400 font-mono text-xs min-w-[20px]">{i + 1}.</span>
              {step.replace(/^\d+\.\s/, '')}
            </div>
          ))}
        </div>
      </div>

      {/* Economics */}
      <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold mb-3">Economics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(KICK_CLIPPING_STRATEGY.pricing).map(([key, value]) => (
            <div key={key} className="bg-white/5 rounded-lg p-3">
              <p className="text-white/50 text-xs uppercase">{key.replace(/([A-Z])/g, ' $1')}</p>
              <p className="text-white text-sm font-medium mt-1">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sell Points */}
      <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold mb-3">Pitch to Kick Creators</h3>
        <ul className="space-y-3">
          {KICK_CLIPPING_STRATEGY.sellPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
              <span className="text-green-400 text-lg">✓</span> {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DiscordTab() {
  return (
    <div className="space-y-6">
      <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-2">Discord Clipping Strategy</h3>
        <p className="text-white/60 text-sm">{DISCORD_CLIPPING_STRATEGY.useCase}</p>
      </div>

      {DISCORD_CLIPPING_STRATEGY.applications.map((app, i) => (
        <div key={i} className="bg-[#161616] border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-bold mb-2">{app.name}</h3>
          <div className="space-y-3">
            <div>
              <p className="text-white/50 text-xs uppercase">How</p>
              <p className="text-white/70 text-sm">{app.how}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase">Value</p>
              <p className="text-white/70 text-sm">{app.value}</p>
            </div>
            <div>
              <p className="text-white/50 text-xs uppercase">Revenue</p>
              <p className="text-green-400 text-sm">{app.revenue}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PricingTab() {
  return (
    <div className="space-y-6">
      {/* Per-Clip Pricing */}
      <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Per-Clip Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(CLIPPING_PRICING.perClip).map(([tier, price]) => (
            <div key={tier} className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-white/50 text-xs uppercase mb-2">{tier}</p>
              <p className="text-3xl font-bold text-white">${price}</p>
              <p className="text-green-400 text-xs mt-1">Margin: ${price - CLIPPING_PRICING.costPerClip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Retainer Packages */}
      <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Monthly Retainers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(CLIPPING_PRICING.retainer).map(([tier, config]) => (
            <div key={tier} className="bg-white/5 rounded-lg p-4">
              <p className="text-white/50 text-xs uppercase mb-2">{tier}</p>
              <p className="text-2xl font-bold text-white">${config.price.toLocaleString()}/mo</p>
              <p className="text-white/60 text-sm mt-1">{config.clipsPerMonth} clips/month</p>
              <p className="text-white/40 text-xs mt-1">Effective: ${config.perClipEffective}/clip</p>
              <p className="text-green-400 text-xs mt-2">Profit: ${config.price - (config.clipsPerMonth * CLIPPING_PRICING.costPerClip)}/mo</p>
            </div>
          ))}
        </div>
      </div>

      {/* Per-Video Processing */}
      <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Per-Video Processing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(CLIPPING_PRICING.perVideo).map(([tier, price]) => (
            <div key={tier} className="bg-white/5 rounded-lg p-4">
              <p className="text-white/50 text-xs uppercase mb-2">{tier}</p>
              <p className="text-2xl font-bold text-white">${price}</p>
              <p className="text-white/60 text-sm mt-1">{tier === 'standard' ? 'Up to 10 clips' : 'Up to 25 clips + multi-platform'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function JobsTab() {
  // Placeholder for active clipping jobs
  return (
    <div className="space-y-6">
      <div className="bg-[#161616] border border-white/10 rounded-xl p-8 text-center">
        <p className="text-white/50 text-lg mb-2">No active clipping jobs</p>
        <p className="text-white/30 text-sm">Jobs will appear here when you process creator content.</p>
        <button className="mt-4 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-500/30 transition">
          + New Clipping Job
        </button>
      </div>
    </div>
  );
}
