'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ExternalLink, Users, DollarSign, TrendingUp, Target,
  Zap, Video, Package, Brain, ChevronDown, Play, Star, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

type TabKey = 'market' | 'creator-brand' | 'deal' | 'growth';

interface ChecklistItem {
  id: string;
  label: string;
  defaultChecked: boolean;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: 'promo-desc', label: 'Promo code in description', defaultChecked: true },
  { id: 'promo-spoken', label: 'Promo code spoken in video', defaultChecked: true },
  { id: 'pinned-comment', label: 'Pinned comment with link', defaultChecked: true },
  { id: 'chat-command', label: 'Chat command for live', defaultChecked: true },
  { id: 'link-bio', label: 'Link in bio', defaultChecked: true },
  { id: 'desc-link', label: 'Description link', defaultChecked: true },
  { id: 'qr-code', label: 'QR code (not viable for PC audience)', defaultChecked: false },
  { id: 'landing-page', label: 'Dedicated landing page', defaultChecked: true },
  { id: 'discord-pin', label: 'Discord pin', defaultChecked: true },
];

export default function CollabsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('market');
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [expandedCalendar, setExpandedCalendar] = useState<Record<string, boolean>>({});
  const [showKeyLines, setShowKeyLines] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('collabs-checklist');
    if (saved) {
      setChecklist(JSON.parse(saved));
    } else {
      const defaults: Record<string, boolean> = {};
      CHECKLIST_ITEMS.forEach(item => { defaults[item.id] = item.defaultChecked; });
      setChecklist(defaults);
    }
  }, []);

  const toggleChecklist = (id: string) => {
    const updated = { ...checklist, [id]: !checklist[id] };
    setChecklist(updated);
    localStorage.setItem('collabs-checklist', JSON.stringify(updated));
  };

  const toggleCalendar = (id: string) => {
    setExpandedCalendar(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'market', label: 'Market & Insights' },
    { key: 'creator-brand', label: 'Creator × Brand' },
    { key: 'deal', label: 'The Deal' },
    { key: 'growth', label: 'Growth Strategy' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="w-full px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-lg">Mobileyes Collabs</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm text-gray-600 hover:text-gray-900 transition">Admin</Link>
            <Link href="/dashboard/agents" className="text-sm text-gray-600 hover:text-gray-900 transition">Agents</Link>
            <Link href="/dashboard/talent" className="text-sm text-gray-600 hover:text-gray-900 transition">Talent</Link>
            <Link href="/dashboard/batch-upload" className="text-sm text-gray-600 hover:text-gray-900 transition">Upload</Link>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="w-full px-6 py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <main className="w-full px-6 py-8">
        {activeTab === 'market' && <MarketInsightsTab showKeyLines={showKeyLines} setShowKeyLines={setShowKeyLines} />}
        {activeTab === 'creator-brand' && <CreatorBrandTab />}
        {activeTab === 'deal' && (
          <DealTab
            checklist={checklist}
            toggleChecklist={toggleChecklist}
            expandedCalendar={expandedCalendar}
            toggleCalendar={toggleCalendar}
          />
        )}
        {activeTab === 'growth' && <GrowthStrategyTab />}
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-6 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-900">Admin</Link>
            <Link href="/dashboard/talent" className="text-sm text-gray-500 hover:text-gray-900">Talent</Link>
            <Link href="/dashboard/agents" className="text-sm text-gray-500 hover:text-gray-900">Agents</Link>
          </div>
          <span className="text-xs text-gray-400">Mobileyes Collabs v3 — July 2026</span>
        </div>
      </footer>
    </div>
  );
}

/* ===================== TAB 1: MARKET & INSIGHTS ===================== */
function MarketInsightsTab({ showKeyLines, setShowKeyLines }: { showKeyLines: boolean; setShowKeyLines: (v: boolean) => void }) {
  return (
    <div className="space-y-10">
      {/* Headline */}
      <div>
        <h1 className="text-4xl font-black text-gray-900 leading-tight">
          Flight Sim Hardware — The Most Monetisable Niche in Gaming
        </h1>
        <p className="mt-2 text-gray-500 text-lg">Market analysis &amp; agent intelligence for the Jacob × P1 Sim Gear collaboration</p>
      </div>

      {/* Agent Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm border-l-4 border-l-blue-500">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-bold text-blue-600 uppercase">Terry — Strategy</span>
          </div>
          <p className="text-sm text-gray-700">&quot;Flight sim creators with DCS access are rare. There are maybe 20-30 globally with &gt;50K subs. If you sign Jacob first, you control access to this niche.&quot;</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm border-l-4 border-l-purple-500">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-bold text-purple-600 uppercase">Dazza — Operations</span>
          </div>
          <p className="text-sm text-gray-700">&quot;The first deal is always the cheapest to operate. Your processes are being built now. Second deal onwards = pure margin improvement.&quot;</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm border-l-4 border-l-green-500">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-green-500" />
            <span className="text-xs font-bold text-green-600 uppercase">CMO — Creative</span>
          </div>
          <p className="text-sm text-gray-700">&quot;The content that converts in flight sim is ALWAYS &apos;I use this daily, here&apos;s why it makes me better.&apos; Never product shots or spec lists. Film the experience, not the product.&quot;</p>
        </div>
      </div>

      {/* Market Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'YouTube', value: '167K', icon: Video },
          { label: 'Instagram', value: '113K', icon: Users },
          { label: 'Discord', value: '65.7K', icon: Globe },
          { label: 'Total Views', value: '35.5M', icon: TrendingUp },
          { label: 'Audience Hardware Spend', value: '$2K-$12K', icon: DollarSign },
          { label: 'Competing Agencies (AU)', value: '0', icon: Star },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
            <stat.icon className="w-5 h-5 mx-auto text-gray-400 mb-2" />
            <div className="text-2xl font-black text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Top 3 DCS Videos */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Top DCS Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'DCS 2025 AND BEYOND', views: '1.9M views' },
            { title: 'DCS SUMMER SALE 2026', views: '60K views' },
            { title: 'F-100D SUPER SABRE', views: '34K views' },
          ].map(video => (
            <a
              key={video.title}
              href="https://youtube.com/user/eagledynamicstv"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative bg-gray-200 rounded-lg aspect-video flex items-center justify-center overflow-hidden group-hover:shadow-md transition">
                <Play className="w-12 h-12 text-gray-500 group-hover:text-red-500 transition" />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                  {video.views}
                </div>
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition">{video.title}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Community Links */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Community Links</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'YouTube', href: 'https://youtube.com' },
            { label: 'Instagram', href: 'https://instagram.com' },
            { label: 'Discord (65K)', href: 'https://discord.com' },
            { label: 'Facebook', href: 'https://facebook.com' },
            { label: 'Forums', href: '#' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-gray-400 hover:text-gray-900 transition"
            >
              {link.label}
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>

      {/* Key Lines for the Call */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setShowKeyLines(!showKeyLines)}
          className="w-full px-5 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition"
        >
          <span className="font-semibold text-gray-900">Key Lines for the Call</span>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showKeyLines ? 'rotate-180' : ''}`} />
        </button>
        {showKeyLines && (
          <div className="px-5 py-4 space-y-3 text-sm text-gray-700">
            <p>• &quot;Non-exclusive — you can work with anyone else, this doesn&apos;t lock you in.&quot;</p>
            <p>• &quot;Free gear — P1 sends you hardware, you keep it no matter what.&quot;</p>
            <p>• &quot;Paid in 4 days — not 30, not 60. Four business days after delivery.&quot;</p>
            <p>• &quot;I handle everything — briefs, links, verification, payment, reporting.&quot;</p>
            <p>• &quot;Your content stays YOUR content. We never ask you to be someone you&apos;re not.&quot;</p>
            <p>• &quot;This is a partnership, not a sponsorship. We grow together or we don&apos;t do it.&quot;</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ===================== TAB 2: CREATOR × BRAND ===================== */
function CreatorBrandTab() {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-black text-gray-900">Creator × Brand</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: CREATOR */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Video className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900">CREATOR — Jacob Tabor</h2>
          </div>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold text-gray-900">Contact</p>
              <p>Email: jacob_tabor@outlook.com</p>
              <p>Meeting: Jul 3 @ 11am</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Ecosystem</p>
              <p>167K YouTube + 113K Instagram + 65K Discord</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Prior Brand Deals</p>
              <p className="text-green-600 font-medium">None — first mover advantage</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">His Likely Goals</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Monetise content</li>
                <li>Free gear</li>
                <li>Grow audience</li>
                <li>Build relationships</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-900">What He Needs to Hear</p>
              <p className="italic bg-blue-50 p-3 rounded">&quot;Non-exclusive, free gear, paid in 4 days, keep gear even if you leave, no lock-in, I handle everything.&quot;</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Content Style</p>
              <p>Precision, technical, authentic — NOT hype</p>
            </div>
          </div>
        </div>

        {/* RIGHT: BRAND */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-bold text-gray-900">BRAND — P1 Sim Gear</h2>
          </div>
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold text-gray-900">Contact</p>
              <p>Neil — QLD, AU</p>
              <p>Phone: 0488 385 870</p>
              <p>
                <a href="https://p1simgear.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">
                  p1simgear.com.au <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Products</p>
              <ul className="space-y-2 ml-2">
                <li className="flex items-center justify-between">
                  <a href="https://p1simgear.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Fighter Pilot Pack</a>
                  <span className="font-bold">$3,099</span>
                </li>
                <li className="flex items-center justify-between">
                  <a href="https://p1simgear.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">VIRPIL HOSAS</a>
                  <span className="font-bold">$2,149</span>
                </li>
                <li className="flex items-center justify-between">
                  <a href="https://p1simgear.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">TR8 Pro Flight</a>
                  <span className="font-bold">$1,129</span>
                </li>
                <li className="flex items-center justify-between">
                  <a href="https://p1simgear.com.au" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Full Custom Rig</a>
                  <span className="font-bold">~$10K</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Commerce Metrics</p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-lg font-bold text-gray-900">$3K-$10K</div>
                  <div className="text-xs text-gray-500">ARPU</div>
                </div>
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-lg font-bold text-gray-900">30-50%</div>
                  <div className="text-xs text-gray-500">Margin</div>
                </div>
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-lg font-bold text-gray-900">2-3</div>
                  <div className="text-xs text-gray-500">Break-even sales/mo</div>
                </div>
                <div className="bg-gray-50 p-2 rounded text-center">
                  <div className="text-lg font-bold text-gray-900">Low</div>
                  <div className="text-xs text-gray-500">Repeat (accessories)</div>
                </div>
              </div>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Neil&apos;s Goals</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Sell more flight rigs</li>
                <li>Reach DCS community</li>
                <li>Become go-to AU retailer</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-900">What Neil Needs to Hear</p>
              <p className="italic bg-purple-50 p-3 rounded">&quot;167K flight sim enthusiasts, 70% below market rate, tracked via promo code, you see every sale.&quot;</p>
            </div>
          </div>
        </div>
      </div>

      {/* YOUR VALUE — MOBILEYES */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-gray-900" />
          <h2 className="text-xl font-bold text-gray-900">YOUR VALUE — Mobileyes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <p className="font-semibold text-gray-900 mb-1">Connection</p>
            <p>You connect Jacob&apos;s audience to Neil&apos;s products</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <p className="font-semibold text-gray-900 mb-1">Full Service</p>
            <p>You handle everything: brief, links, verification, payment, reporting</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <p className="font-semibold text-gray-900 mb-1">Effective Margin</p>
            <p className="text-2xl font-black text-green-600">34%</p>
            <p className="text-xs text-gray-500">Commission + agency fee</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <p className="font-semibold text-gray-900 mb-1">Reusable Engine</p>
            <p>Works for ANY hardware brand × creator pairing</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100 md:col-span-2">
            <p className="font-semibold text-gray-900 mb-1">Proof of Model</p>
            <p>This deal proves the model → unlocks entire flight sim vertical</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== TAB 3: THE DEAL ===================== */
interface DealTabProps {
  checklist: Record<string, boolean>;
  toggleChecklist: (id: string) => void;
  expandedCalendar: Record<string, boolean>;
  toggleCalendar: (id: string) => void;
}

const CALENDAR_ITEMS = [
  {
    id: 'week1',
    week: 'Week 1',
    title: 'GEAR BREAKDOWN',
    subtitle: 'P1 setup showcase',
    description: 'This is what I fly with, here\u2019s why each piece matters.',
    note: 'Links to products.',
    strategy: 'Builds product awareness in the most natural way \u2014 showing actual daily use.',
    paid: true,
  },
  {
    id: 'week2',
    week: 'Week 2',
    title: 'SKILL SESSION',
    subtitle: 'DCS tutorial using P1 gear',
    description: 'How to master carrier landings with force feedback.',
    note: '',
    strategy: 'Demonstrates product VALUE not just existence. Viewers see the gear making them better.',
    paid: true,
  },
  {
    id: 'week3',
    week: 'Week 3',
    title: 'NORMAL DCS CONTENT',
    subtitle: 'Regular combat missions',
    description: 'Gear naturally visible, no hard sell.',
    note: '',
    strategy: 'Maintains audience trust. The 75% organic ratio keeps engagement high and prevents audience fatigue.',
    paid: true,
  },
  {
    id: 'week4',
    week: 'Week 4',
    title: 'REVEAL/UPGRADE',
    subtitle: 'Unbox new P1 item or show rig upgrade',
    description: '',
    note: '',
    strategy: 'Creates the "upgrade desire" \u2014 viewers see what\u2019s possible and want it for themselves.',
    paid: true,
  },
  {
    id: 'bonus-stories',
    week: 'BONUS',
    title: 'Instagram/YouTube Stories (FREE)',
    subtitle: '2-3x/week',
    description: 'Quick BTS clips, setup POV, "what I\u2019m flying today."',
    note: 'These are FREE (no paid brief required) but include affiliate link in swipe-up/link.',
    strategy: 'Keeps P1 top-of-mind between posts. Drives ongoing traffic to Neil\u2019s store at zero cost to anyone.',
    paid: false,
  },
  {
    id: 'bonus-discord',
    week: 'BONUS',
    title: 'Discord Mentions (FREE)',
    subtitle: 'Organic',
    description: 'When DCS Discord members ask "what HOTAS should I buy?" Jacob naturally recommends P1. Affiliate link in pinned channel.',
    note: '',
    strategy: '65K members, zero cost, pure social proof.',
    paid: false,
  },
];

function DealTab({ checklist, toggleChecklist, expandedCalendar, toggleCalendar }: DealTabProps) {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-black text-gray-900">The Deal</h1>

      {/* Content Calendar */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Content Calendar</h2>
        <div className="space-y-3">
          {CALENDAR_ITEMS.map(item => (
            <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 bg-white hover:bg-gray-50 transition">
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${item.paid ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {item.week}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleCalendar(item.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition text-gray-500"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedCalendar[item.id] ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {expandedCalendar[item.id] && (
                <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 text-sm space-y-2">
                  {item.description && <p className="text-gray-700">&quot;{item.description}&quot;</p>}
                  {item.note && <p className="text-gray-500">{item.note}</p>}
                  <div className="flex items-start gap-2 mt-2">
                    <Target className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-gray-700"><span className="font-semibold">Strategy:</span> {item.strategy}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Financial Breakdown */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Financial Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-5 text-center shadow-sm">
            <DollarSign className="w-5 h-5 mx-auto text-gray-400 mb-2" />
            <div className="text-2xl font-black text-gray-900">$8,000</div>
            <div className="text-xs text-gray-500">Neil Pays (monthly)</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5 text-center shadow-sm">
            <Video className="w-5 h-5 mx-auto text-blue-400 mb-2" />
            <div className="text-2xl font-black text-blue-600">$4,800</div>
            <div className="text-xs text-gray-500">Jacob Gets (60%)</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5 text-center shadow-sm">
            <Brain className="w-5 h-5 mx-auto text-green-400 mb-2" />
            <div className="text-2xl font-black text-green-600">$2,700</div>
            <div className="text-xs text-gray-500">You Keep (agency)</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5 text-center shadow-sm">
            <TrendingUp className="w-5 h-5 mx-auto text-purple-400 mb-2" />
            <div className="text-2xl font-black text-purple-600">$1K/rig</div>
            <div className="text-xs text-gray-500">Affiliate (50/50)</div>
          </div>
        </div>
      </div>

      {/* Attribution */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Attribution</h2>
        <div className="flex flex-wrap gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
            <p className="text-xs text-gray-500 uppercase font-semibold">Promo Code</p>
            <p className="text-lg font-black text-gray-900 font-mono">JACOBDCS</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
            <p className="text-xs text-gray-500 uppercase font-semibold">UTM Links</p>
            <p className="text-sm font-medium text-gray-700">Generated by your platform</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
            <p className="text-xs text-gray-500 uppercase font-semibold">Description Links</p>
            <p className="text-sm font-medium text-gray-700">Every video description</p>
          </div>
        </div>
      </div>

      {/* Integration Checklist */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Integration Checklist</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {CHECKLIST_ITEMS.map(item => (
              <label
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition"
              >
                <button
                  onClick={() => toggleChecklist(item.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition ${
                    checklist[item.id]
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {checklist[item.id] && (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {!checklist[item.id] && item.id === 'qr-code' && (
                    <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
                <span className={`text-sm ${checklist[item.id] ? 'text-gray-900' : 'text-gray-500'}`}>
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== TAB 4: GROWTH STRATEGY ===================== */
function GrowthStrategyTab() {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-black text-gray-900">Growth Strategy</h1>

      {/* ORGANIC GROWTH */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <h2 className="text-xl font-bold text-gray-900">Organic Growth</h2>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-3 text-sm text-gray-700">
          <p>• Jacob&apos;s posting consistency (4 paid + organic between) keeps algo happy</p>
          <p>• DCS Discord (65K) = free distribution for every piece of content</p>
          <p>• YouTube Shorts clips from longer videos extend reach to new audiences</p>
          <p>• Community engagement (responding to comments, being present in Discord) builds trust</p>
          <p>• Collaboration with other DCS creators (cross-pollination) — this is the GATEWAY play</p>
        </div>
      </div>

      {/* PAID AMPLIFICATION */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-yellow-500" />
          <h2 className="text-xl font-bold text-gray-900">Paid Amplification (for Neil to consider)</h2>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-3 text-sm text-gray-700">
          <p>• Boost Jacob&apos;s best-performing P1 video ($200-500/video) on YouTube</p>
          <p>• Target: &quot;flight simulator&quot; + &quot;HOTAS&quot; + &quot;sim racing&quot; interest audiences</p>
          <p>• Retarget: people who visited p1simgear.com.au but didn&apos;t buy (Neil&apos;s pixel)</p>
          <p>• A/B test: which content type converts best when boosted (gear breakdown vs skill session)</p>
          <p>• Budget suggestion: $500-1000/month on top of the $8K retainer for 2-3x reach multiplier</p>
        </div>
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-4 h-4 text-yellow-600" />
            <span className="text-xs font-bold text-yellow-700 uppercase">Agent Insight</span>
          </div>
          <p className="text-sm text-gray-700">&quot;Boosting a $2,000 video to get 3x views costs $300. If it drives 1 extra rig sale ($3,099), that&apos;s 10x ROAS on the boost spend alone.&quot;</p>
        </div>
      </div>

      {/* FUTURE EXPANSION */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-bold text-gray-900">Future Expansion</h2>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-3 text-sm text-gray-700">
          <p>• After 3 months with P1: pitch Virpil (direct brand), Winwing, VKB, Thrustmaster</p>
          <p>• After signing Jacob: find 3-5 more DCS creators through his network (gateway play)</p>
          <p>• After flight sim vertical proven: expand to sim racing (same audience, same hardware, same model)</p>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Hardware Brands to Approach Next</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Virpil ($2K+ HOTAS)',
              'Winwing (Orion2)',
              'VKB (Gladiator)',
              'Tobii (eye tracking)',
              'TrackIR',
              'HP Reverb (VR)',
            ].map(brand => (
              <span key={brand} className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-xs font-medium text-gray-700">
                {brand}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 italic">&quot;We have a proven creator in flight sim who drove X sales for P1. Want in?&quot;</p>
        </div>
      </div>

      {/* AGENT INSIGHTS */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-gray-900" />
          <h2 className="text-xl font-bold text-gray-900">Agent Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm border-l-4 border-l-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-blue-600 uppercase">Terry — Strategy</span>
            </div>
            <p className="text-sm text-gray-700">&quot;Flight sim creators with DCS access are rare. There are maybe 20-30 globally with &gt;50K subs. If you sign Jacob first, you control access to this niche.&quot;</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm border-l-4 border-l-purple-500">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-purple-600 uppercase">Dazza — Operations</span>
            </div>
            <p className="text-sm text-gray-700">&quot;The first deal is always the cheapest to operate. Your processes are being built now. Second deal onwards = pure margin improvement.&quot;</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm border-l-4 border-l-green-500">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-green-600 uppercase">CEO — Vision</span>
            </div>
            <p className="text-sm text-gray-700">&quot;This single vertical, if executed well, could generate $100K+ annual commission within 12 months across 5-6 hardware brands.&quot;</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm border-l-4 border-l-orange-500">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-orange-600 uppercase">CMO — Creative</span>
            </div>
            <p className="text-sm text-gray-700">&quot;The content that converts in flight sim is ALWAYS &apos;I use this daily, here&apos;s why it makes me better.&apos; Never product shots or spec lists. Film the experience, not the product.&quot;</p>
          </div>
        </div>
      </div>
    </div>
  );
}
