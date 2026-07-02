'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  DollarSign,
  TrendingUp,
  Users,
  Video,
  ExternalLink,
  Star,
  Zap,
  BarChart3,
  Package,
} from 'lucide-react';

const collabData = {
  creator: {
    name: 'Jacob Tabor',
    email: 'jacob_tabor@outlook.com',
    location: 'Switzerland',
    joined: 'Mar 2011',
    youtube: { subscribers: '167K', videos: 279, totalViews: '35.5M' },
    instagram: { followers: '113K', posts: 1720 },
    discord: { members: 65759, online: 12826 },
    facebook: 'facebook.com/EagleDynamics',
    featuredVideo: { title: 'DCS 2025 AND BEYOND', views: '1.9M' },
    recentVideos: [
      { title: 'Summer Sale', views: '60K' },
      { title: 'F-100D Super Sabre', views: '34K' },
    ],
  },
  brand: {
    name: 'P1 Sim Gear',
    contact: 'Neil',
    location: 'QLD, Australia',
    website: 'p1simgear.com.au',
    products: [
      { name: 'Fighter Pilot Pack', price: '$3,099' },
      { name: 'TR8 Pro Flight', price: '$1,129' },
      { name: 'VIRPIL HOSAS', price: '$2,149' },
      { name: 'Full Custom Rig', price: '~$10,000' },
    ],
  },
  meeting: 'Jul 3 2026 @ 11:00 AM',
  dealType: 'Hybrid (Sponsored Content + Affiliate)',
  sponsored: {
    brandPays: 2500,
    agencyFee: 500,
    commission: 400,
    jacobGets: 1600,
    joelKeeps: 900,
  },
  affiliate: {
    perPremiumRig: 1000,
    jacobSplit: 500,
    joelSplit: 500,
    estimatedPerMonth: 2,
  },
  retainer: {
    brandPays: 4000,
    agencyFee: 500,
    commission: 700,
    jacobGets: 2800,
    joelKeeps: 1200,
  },
  discord: {
    opportunity: 'Jason (Joel&apos;s mate) just started at Discord',
    members: '65K DCS Discord members',
    channels: 'Influencer marketing channel, sponsored server events, P1 gear giveaways, affiliate links in pinned channels',
  },
};

export default function CollabsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'deal', label: 'Deal Structure' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'strategy', label: 'Strategy' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Collabs</h1>
        <p className="text-gray-400 mt-1">Active collaboration opportunities</p>
      </div>

      {/* Main Card */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Jacob Tabor × P1 Sim Gear</h2>
              <p className="text-white/80 mt-1">DCS World Flight Sim | Premium Hardware Collab</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-sm text-white/80">Meeting</p>
              <p className="text-white font-semibold">{collabData.meeting}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800 px-6">
          <div className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Creator Info */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Video className="w-5 h-5 text-red-400" />
                    <h3 className="text-lg font-semibold">Creator: Jacob Tabor</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email</span>
                      <span>{collabData.creator.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location</span>
                      <span>{collabData.creator.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">YouTube Subs</span>
                      <span className="text-green-400 font-medium">{collabData.creator.youtube.subscribers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Videos</span>
                      <span>{collabData.creator.youtube.videos}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Views</span>
                      <span className="text-blue-400 font-medium">{collabData.creator.youtube.totalViews}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Joined</span>
                      <span>{collabData.creator.joined}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Instagram</span>
                      <span>{collabData.creator.instagram.followers} followers · {collabData.creator.instagram.posts} posts</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <p className="text-gray-400 text-xs mb-2">Featured Video</p>
                      <div className="bg-gray-900 rounded-lg p-3">
                        <p className="font-medium">{collabData.creator.featuredVideo.title}</p>
                        <p className="text-green-400 text-sm">{collabData.creator.featuredVideo.views} views</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Brand Info */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-semibold">Brand: P1 Sim Gear</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Contact</span>
                      <span>{collabData.brand.contact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location</span>
                      <span>{collabData.brand.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Website</span>
                      <span className="text-blue-400">{collabData.brand.website}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <p className="text-gray-400 text-xs mb-2">Products</p>
                      <div className="space-y-2">
                        {collabData.brand.products.map((product, i) => (
                          <div key={i} className="flex justify-between bg-gray-900 rounded-lg p-2 px-3">
                            <span>{product.name}</span>
                            <span className="text-green-400 font-medium">{product.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Discord Data */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-semibold">DCS Discord Community</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-900 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-indigo-400">{collabData.creator.discord.members.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm">Total Members</p>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-green-400">{collabData.creator.discord.online.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm">Online Now</p>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-blue-400">{collabData.creator.facebook}</p>
                    <p className="text-gray-400 text-sm">Facebook Page</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Deal Structure Tab */}
          {activeTab === 'deal' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold">Deal Type: {collabData.dealType}</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sponsored Content */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <h4 className="font-semibold">Sponsored Content</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Brand Pays</span>
                      <span className="text-green-400 font-medium">${collabData.sponsored.brandPays.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Agency Fee</span>
                      <span>${collabData.sponsored.agencyFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Commission (20%)</span>
                      <span>${collabData.sponsored.commission}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Jacob Gets</span>
                        <span className="text-blue-400 font-medium">${collabData.sponsored.jacobGets.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-gray-400">Joel Keeps</span>
                        <span className="text-purple-400 font-medium">${collabData.sponsored.joelKeeps}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Affiliate */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <h4 className="font-semibold">Affiliate Revenue</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Per Premium Rig ($10K+)</span>
                      <span className="text-green-400 font-medium">${collabData.affiliate.perPremiumRig.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Split</span>
                      <span>50/50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Jacob Split</span>
                      <span className="text-blue-400">${collabData.affiliate.jacobSplit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Joel Split</span>
                      <span className="text-purple-400">${collabData.affiliate.joelSplit}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Est. Sales/Month</span>
                        <span className="font-medium">{collabData.affiliate.estimatedPerMonth}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-gray-400">Monthly Revenue</span>
                        <span className="text-green-400 font-bold">$1,000/mo</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Retainer (Scale) */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-orange-400" />
                    <h4 className="font-semibold">Retainer (Scale)</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Brand Pays/mo</span>
                      <span className="text-green-400 font-medium">${collabData.retainer.brandPays.toLocaleString()}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Agency Fee</span>
                      <span>${collabData.retainer.agencyFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Commission</span>
                      <span>${collabData.retainer.commission}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Jacob Gets/mo</span>
                        <span className="text-blue-400 font-medium">${collabData.retainer.jacobGets.toLocaleString()}/mo</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-gray-400">Joel Keeps/mo</span>
                        <span className="text-purple-400 font-medium">${collabData.retainer.joelKeeps.toLocaleString()}/mo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold">Platform Analytics</h3>
              </div>

              {/* Platform Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Video className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-gray-400">YouTube</span>
                  </div>
                  <p className="text-2xl font-bold">{collabData.creator.youtube.subscribers}</p>
                  <p className="text-gray-400 text-xs mt-1">subscribers</p>
                  <p className="text-green-400 text-sm mt-2">{collabData.creator.youtube.totalViews} total views</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-pink-400" />
                    <span className="text-sm text-gray-400">Instagram</span>
                  </div>
                  <p className="text-2xl font-bold">{collabData.creator.instagram.followers}</p>
                  <p className="text-gray-400 text-xs mt-1">followers</p>
                  <p className="text-blue-400 text-sm mt-2">{collabData.creator.instagram.posts} posts</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm text-gray-400">Discord</span>
                  </div>
                  <p className="text-2xl font-bold">{collabData.creator.discord.members.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs mt-1">members</p>
                  <p className="text-green-400 text-sm mt-2">{collabData.creator.discord.online.toLocaleString()} online</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <ExternalLink className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-400">Facebook</span>
                  </div>
                  <p className="text-lg font-bold">Eagle Dynamics</p>
                  <p className="text-gray-400 text-xs mt-1">{collabData.creator.facebook}</p>
                </div>
              </div>

              {/* Audience Quality */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h4 className="font-semibold mb-4">Audience Quality Assessment</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-400">97%</p>
                    <p className="text-gray-400 text-sm">Real Engagement</p>
                    <p className="text-gray-500 text-xs mt-1">DCS niche = high intent audience</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400">$2K+</p>
                    <p className="text-gray-400 text-sm">Avg Spend on Peripherals</p>
                    <p className="text-gray-500 text-xs mt-1">Flight sim enthusiasts invest heavily</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-400">14yr</p>
                    <p className="text-gray-400 text-sm">Channel History</p>
                    <p className="text-gray-500 text-xs mt-1">Since Mar 2011 - established authority</p>
                  </div>
                </div>
              </div>

              {/* P1 Product Fit */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h4 className="font-semibold mb-4">P1 Product-Audience Fit</h4>
                <div className="space-y-3">
                  {collabData.brand.products.map((product, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-900 rounded-lg p-3">
                      <span>{product.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-green-400 font-medium">{product.price}</span>
                        <div className="bg-green-400/20 text-green-400 text-xs px-2 py-1 rounded-full">High Fit</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Video Performance */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h4 className="font-semibold mb-4">Recent Video Performance</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gray-900 rounded-lg p-3">
                    <span className="font-medium">{collabData.creator.featuredVideo.title}</span>
                    <span className="text-green-400 font-bold">{collabData.creator.featuredVideo.views} views</span>
                  </div>
                  {collabData.creator.recentVideos.map((video, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-900 rounded-lg p-3">
                      <span>{video.title}</span>
                      <span className="text-blue-400">{video.views} views</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Strategy Tab */}
          {activeTab === 'strategy' && (
            <div className="space-y-6">
              {/* Gateway Value */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <h4 className="font-semibold">Gateway Value</h4>
                </div>
                <p className="text-gray-300">
                  Jacob = gateway to the entire DCS creator community. First successful collab opens doors to dozens of flight sim creators globally.
                  DCS audience spends $2K+ on peripherals making them premium buyers for P1 Sim Gear products.
                </p>
              </div>

              {/* First-Mover Advantage */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-orange-400" />
                  <h4 className="font-semibold">First-Mover Advantage</h4>
                </div>
                <p className="text-gray-300">
                  No other agency in Australia is operating in the flight sim creator space. This is a first-mover opportunity
                  to establish dominance in AU flight sim agency management before anyone else enters.
                </p>
              </div>

              {/* Discord Channel Opportunity */}
              <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-6 border border-indigo-700">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-indigo-400" />
                  <h4 className="font-semibold">Discord Channel Opportunity</h4>
                </div>
                <p className="text-gray-300 mb-3">
                  Jason (Joel&apos;s mate) just started at Discord. 65K DCS Discord members = massive influencer marketing channel.
                </p>
                <div className="bg-gray-900/50 rounded-lg p-4 space-y-2 text-sm">
                  <p className="text-indigo-300">• Sponsored server events with P1 Sim Gear</p>
                  <p className="text-indigo-300">• P1 gear giveaways to drive engagement</p>
                  <p className="text-indigo-300">• Affiliate links in pinned channels</p>
                  <p className="text-indigo-300">• Direct access to 65K flight sim enthusiasts</p>
                </div>
              </div>

              {/* Meeting Prep Checklist */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  <h4 className="font-semibold">Meeting Prep Checklist - Jul 3 2026</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-600 bg-gray-800" />
                    <span>Prepare P1 Sim Gear product showcase deck</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-600 bg-gray-800" />
                    <span>Draft hybrid deal proposal (sponsored + affiliate)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-600 bg-gray-800" />
                    <span>Research Jacob&apos;s recent content for talking points</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-600 bg-gray-800" />
                    <span>Confirm Neil (P1) availability for co-call</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-600 bg-gray-800" />
                    <span>Prepare Discord opportunity pitch (Jason connection)</span>
                  </label>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <h4 className="font-semibold">Next Steps</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full whitespace-nowrap">Step 1</span>
                    <span className="text-gray-300">Lock in Jul 3 meeting with Jacob - confirm via email</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full whitespace-nowrap">Step 2</span>
                    <span className="text-gray-300">Send P1 Sim Gear product samples for review content</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full whitespace-nowrap">Step 3</span>
                    <span className="text-gray-300">Connect with Jason at Discord re: DCS server partnership</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full whitespace-nowrap">Step 4</span>
                    <span className="text-gray-300">Draft affiliate tracking setup for p1simgear.com.au</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full whitespace-nowrap">Step 5</span>
                    <span className="text-gray-300">Scale to retainer model after 3 successful sponsored posts</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 bg-gray-900/50 rounded-xl border border-gray-800 p-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span>Access: <code className="bg-gray-800 px-2 py-1 rounded text-gray-400">/founder</code> route</span>
            <span>Auth: <code className="bg-gray-800 px-2 py-1 rounded text-gray-400">FOUNDER_USERNAME</code> + <code className="bg-gray-800 px-2 py-1 rounded text-gray-400">FOUNDER_PASSWORD</code></span>
          </div>
          <span className="text-gray-600">Gamefluence Collabs v1.0</span>
        </div>
      </div>
    </div>
  );
}
