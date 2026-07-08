'use client';

import React, { useState } from 'react';
import {
  DT_CONFIG,
  REVENUE_STREAMS,
  CREATIVE_PRICING,
  DT_CAMPAIGNS,
  calculateMargin,
  calculateClientCPI,
  createCampaignFromBrief,
  type DTCampaign,
  type Platform,
} from '@/lib/digital-turbine-integration';

export default function UACampaignDashboard() {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'pricing' | 'creatives' | 'new'>('campaigns');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">UA Campaign Management</h1>
          <p className="text-white/50 text-sm mt-1">DT ACP Edge backend. Client sees &ldquo;UA Campaigns&rdquo; — we manage the spread.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-mono rounded-full">SELF-SERVE</span>
          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-mono rounded-full">30-40% MARGIN</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 rounded-lg p-1">
        {(['campaigns', 'pricing', 'creatives', 'new'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === tab ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'
            }`}
          >
            {tab === 'new' ? '+ New Campaign' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'campaigns' && <CampaignsTab />}
      {activeTab === 'pricing' && <PricingCalculatorTab />}
      {activeTab === 'creatives' && <CreativesTab />}
      {activeTab === 'new' && <NewCampaignTab />}
    </div>
  );
}

function CampaignsTab() {
  if (DT_CAMPAIGNS.length === 0) {
    return (
      <div className="bg-[#161616] border border-white/10 rounded-xl p-8 text-center">
        <p className="text-white/50 text-lg mb-2">No active UA campaigns</p>
        <p className="text-white/30 text-sm mb-4">Campaigns will appear here once you onboard a client.</p>
        <div className="bg-white/5 rounded-lg p-4 max-w-md mx-auto text-left">
          <p className="text-white/60 text-xs font-mono uppercase mb-2">How it works</p>
          <ol className="space-y-1 text-white/50 text-sm">
            <li>1. Client pays us for &ldquo;UA campaigns&rdquo;</li>
            <li>2. We set up on DT ACP Edge at lower CPI</li>
            <li>3. Report installs back to client at our rate</li>
            <li>4. Keep the margin (30-40%)</li>
            <li>5. Upsell creative production</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {DT_CAMPAIGNS.map(campaign => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: DTCampaign }) {
  return (
    <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-bold">{campaign.appName}</h3>
          <p className="text-white/50 text-sm">{campaign.clientName}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-mono ${
          campaign.status === 'live' ? 'bg-green-500/20 text-green-400' :
          campaign.status === 'paused' ? 'bg-amber-500/20 text-amber-400' :
          'bg-white/10 text-white/50'
        }`}>
          {campaign.status}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-white/40 text-xs">Client CPI</p>
          <p className="text-white font-bold">${campaign.clientBudget.clientCPI}</p>
        </div>
        <div>
          <p className="text-white/40 text-xs">Our Cost (DT)</p>
          <p className="text-white font-bold">${campaign.dtConfig.dtCPI}</p>
        </div>
        <div>
          <p className="text-white/40 text-xs">Margin/Install</p>
          <p className="text-green-400 font-bold">${campaign.margin.perInstall.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-white/40 text-xs">Projected Monthly Profit</p>
          <p className="text-green-400 font-bold">${campaign.margin.projectedMonthlyProfit.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

function PricingCalculatorTab() {
  const [selectedCountry, setSelectedCountry] = useState('AU');
  
  const dtCPI = DT_CONFIG.cpiRanges[selectedCountry]?.avg || 2.50;
  const clientCPI = calculateClientCPI(selectedCountry);
  const premiumCPI = calculateClientCPI(selectedCountry, DT_CONFIG.markupStrategy.premiumMarkup);
  const volumeCPI = calculateClientCPI(selectedCountry, DT_CONFIG.markupStrategy.volumeMarkup);
  const margin = calculateMargin(clientCPI, dtCPI);

  return (
    <div className="space-y-6">
      {/* Country Selector */}
      <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">CPI Pricing by Market</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.keys(DT_CONFIG.cpiRanges).map(country => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                selectedCountry === country 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                  : 'bg-white/5 text-white/50 hover:text-white/80'
              }`}
            >
              {country}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/50 text-xs uppercase mb-1">DT Cost (Our Buy)</p>
            <p className="text-2xl font-bold text-white">${dtCPI.toFixed(2)}</p>
            <p className="text-white/30 text-xs">Range: ${DT_CONFIG.cpiRanges[selectedCountry]?.min}-${DT_CONFIG.cpiRanges[selectedCountry]?.max}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/50 text-xs uppercase mb-1">Client Price (Standard)</p>
            <p className="text-2xl font-bold text-white">${clientCPI.toFixed(2)}</p>
            <p className="text-green-400 text-xs">+{(DT_CONFIG.markupStrategy.defaultMarkup * 100).toFixed(0)}% markup</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/50 text-xs uppercase mb-1">Client Price (Premium)</p>
            <p className="text-2xl font-bold text-white">${premiumCPI.toFixed(2)}</p>
            <p className="text-green-400 text-xs">+{(DT_CONFIG.markupStrategy.premiumMarkup * 100).toFixed(0)}% markup</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/50 text-xs uppercase mb-1">Our Margin (Standard)</p>
            <p className="text-2xl font-bold text-green-400">${margin.perInstall.toFixed(2)}</p>
            <p className="text-green-400 text-xs">{margin.marginPercent.toFixed(1)}% per install</p>
          </div>
        </div>
      </div>

      {/* Revenue Projections */}
      <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Revenue Projections ({selectedCountry})</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[5000, 10000, 25000].map(budget => {
            const installs = Math.floor(budget / clientCPI);
            const dtCost = installs * dtCPI;
            const profit = budget - dtCost;
            return (
              <div key={budget} className="bg-white/5 rounded-lg p-4">
                <p className="text-white/50 text-xs uppercase mb-2">${(budget / 1000).toFixed(0)}K client budget/mo</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Installs delivered</span>
                    <span className="text-white font-medium">{installs.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Our DT cost</span>
                    <span className="text-white font-medium">${dtCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-white/10 pt-2">
                    <span className="text-green-400">Monthly profit</span>
                    <span className="text-green-400 font-bold">${profit.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* All Markets Overview */}
      <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">All Markets</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 text-xs uppercase">
                <th className="text-left py-2">Market</th>
                <th className="text-right py-2">DT Cost</th>
                <th className="text-right py-2">Client Price</th>
                <th className="text-right py-2">Margin/Install</th>
                <th className="text-right py-2">Margin %</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(DT_CONFIG.cpiRanges).map(([country, range]) => {
                const cCPI = calculateClientCPI(country);
                const m = calculateMargin(cCPI, range.avg);
                return (
                  <tr key={country} className="border-t border-white/5">
                    <td className="py-2 text-white font-medium">{country}</td>
                    <td className="py-2 text-right text-white/60">${range.avg.toFixed(2)}</td>
                    <td className="py-2 text-right text-white">${cCPI.toFixed(2)}</td>
                    <td className="py-2 text-right text-green-400">${m.perInstall.toFixed(2)}</td>
                    <td className="py-2 text-right text-green-400">{m.marginPercent.toFixed(1)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CreativesTab() {
  return (
    <div className="space-y-6">
      <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">Creative Production Packages</h3>
        <p className="text-white/50 text-sm mb-6">Additional revenue stream. We make the creatives, charge the client, keep ~85% margin.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CREATIVE_PRICING.packages.map((pkg, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-bold">{pkg.name}</h4>
                <span className="text-xl font-bold text-white">${pkg.price.toLocaleString()}</span>
              </div>
              <ul className="space-y-1 mb-4">
                {pkg.includes.map((item, j) => (
                  <li key={j} className="text-white/60 text-xs">• {item}</li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className="text-white/40 text-xs">Our cost: ${pkg.cost}</span>
                <span className="text-green-400 text-sm font-bold">Margin: ${pkg.margin}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NewCampaignTab() {
  const [form, setForm] = useState({
    clientName: '',
    appName: '',
    appStoreUrl: '',
    platform: 'both' as Platform,
    countries: ['AU'],
    monthlyBudget: 10000,
    mmpPartner: 'appsflyer' as const,
    trackingLink: '',
  });

  const handleCreate = () => {
    const campaign = createCampaignFromBrief(form);
    console.log('Campaign created:', campaign);
    alert(`Campaign created for ${form.appName}. Projected monthly profit: $${campaign.margin.projectedMonthlyProfit.toFixed(0)}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#161616] border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-bold text-lg mb-4">New UA Campaign</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-white/50 text-xs uppercase block mb-1">Client Name</label>
            <input
              type="text"
              value={form.clientName}
              onChange={e => setForm({ ...form, clientName: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              placeholder="Studio / Publisher name"
            />
          </div>
          <div>
            <label className="text-white/50 text-xs uppercase block mb-1">App Name</label>
            <input
              type="text"
              value={form.appName}
              onChange={e => setForm({ ...form, appName: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              placeholder="Game title"
            />
          </div>
          <div>
            <label className="text-white/50 text-xs uppercase block mb-1">App Store URL</label>
            <input
              type="text"
              value={form.appStoreUrl}
              onChange={e => setForm({ ...form, appStoreUrl: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              placeholder="https://play.google.com/..."
            />
          </div>
          <div>
            <label className="text-white/50 text-xs uppercase block mb-1">Monthly Budget (Client Pays)</label>
            <input
              type="number"
              value={form.monthlyBudget}
              onChange={e => setForm({ ...form, monthlyBudget: Number(e.target.value) })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
            />
          </div>
          <div>
            <label className="text-white/50 text-xs uppercase block mb-1">MMP Partner</label>
            <select
              value={form.mmpPartner}
              onChange={e => setForm({ ...form, mmpPartner: e.target.value as typeof form.mmpPartner })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
            >
              <option value="appsflyer">AppsFlyer</option>
              <option value="adjust">Adjust</option>
              <option value="singular">Singular</option>
              <option value="branch">Branch</option>
            </select>
          </div>
          <div>
            <label className="text-white/50 text-xs uppercase block mb-1">Tracking Link</label>
            <input
              type="text"
              value={form.trackingLink}
              onChange={e => setForm({ ...form, trackingLink: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              placeholder="https://app.appsflyer.com/..."
            />
          </div>
        </div>

        {/* Preview */}
        {form.clientName && form.monthlyBudget > 0 && (
          <div className="mt-6 p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
            <p className="text-green-400 text-xs uppercase mb-2">Projected Margin</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-white/40 text-xs">Client Pays</p>
                <p className="text-white font-bold">${form.monthlyBudget.toLocaleString()}/mo</p>
              </div>
              <div>
                <p className="text-white/40 text-xs">Our DT Cost (~)</p>
                <p className="text-white font-bold">${(form.monthlyBudget * 0.65).toLocaleString()}/mo</p>
              </div>
              <div>
                <p className="text-white/40 text-xs">Our Profit (~)</p>
                <p className="text-green-400 font-bold">${(form.monthlyBudget * 0.35).toLocaleString()}/mo</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleCreate}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Create Campaign
        </button>
      </div>
    </div>
  );
}
