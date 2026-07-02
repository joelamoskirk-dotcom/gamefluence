'use client';

import React, { useState } from 'react';
import AgentAdvisoryPanel from '@/components/agents/AgentAdvisoryPanel';
import { BatchContact, ContactPipeline } from '@/lib/batch-contact-upload';

// Demo contacts for both pipelines
const DEMO_GAMEFLUENCE_CONTACTS: BatchContact[] = [
  { id: 'gf_001', pipeline: 'gamefluence', name: 'Mai Game Girl', platform: 'tiktok', handle: 'maigamegirl', profileUrl: 'https://tiktok.com/@maigamegirl', followerCount: 4400000, engagementRate: 8.5, contentFocus: ['Mobile Gaming', 'Racing'], market: 'Vietnam', tier: 'diamond', status: 'to_contact', uploadedAt: new Date().toISOString(), uploadBatch: 'demo', source: 'manual_upload' },
  { id: 'gf_002', pipeline: 'gamefluence', name: 'RacingKing_ID', platform: 'youtube', handle: 'RacingKing_ID', profileUrl: 'https://youtube.com/@RacingKing_ID', followerCount: 8200000, engagementRate: 6.2, contentFocus: ['Racing', 'Mobile Gaming'], market: 'Indonesia', tier: 'diamond', status: 'to_contact', uploadedAt: new Date().toISOString(), uploadBatch: 'demo', source: 'manual_upload' },
  { id: 'gf_003', pipeline: 'gamefluence', name: 'PinoyRacer_Pro', platform: 'tiktok', handle: 'PinoyRacer_Pro', profileUrl: 'https://tiktok.com/@PinoyRacer_Pro', followerCount: 7100000, engagementRate: 7.1, contentFocus: ['Racing', 'Entertainment'], market: 'Philippines', tier: 'diamond', status: 'contacted', uploadedAt: new Date().toISOString(), uploadBatch: 'demo', source: 'manual_upload' },
  { id: 'gf_004', pipeline: 'gamefluence', name: 'ThaiDrift_King', platform: 'youtube', handle: 'ThaiDrift_King', profileUrl: 'https://youtube.com/@ThaiDrift_King', followerCount: 320000, engagementRate: 4.8, contentFocus: ['Racing', 'Drift'], market: 'Thailand', tier: 'gold', status: 'to_contact', uploadedAt: new Date().toISOString(), uploadBatch: 'demo', source: 'manual_upload' },
  { id: 'gf_005', pipeline: 'gamefluence', name: 'VN_MobileGamer', platform: 'tiktok', handle: 'VN_MobileGamer', profileUrl: 'https://tiktok.com/@VN_MobileGamer', followerCount: 150000, engagementRate: 9.2, contentFocus: ['Mobile Gaming', 'Battle Royale'], market: 'Vietnam', tier: 'gold', status: 'to_contact', uploadedAt: new Date().toISOString(), uploadBatch: 'demo', source: 'manual_upload' },
];

const DEMO_MOBILEYES_CONTACTS: BatchContact[] = [
  { id: 'mb_001', pipeline: 'mobileyes', name: 'Alex "StreamKing" Chen', platform: 'kick', handle: 'StreamKingAU', profileUrl: 'https://kick.com/StreamKingAU', followerCount: 85000, averageViewers: 1200, engagementRate: 6.5, contentFocus: ['FPS', 'Live Streaming'], market: 'Australia', tier: 'silver', status: 'signed', uploadedAt: new Date().toISOString(), uploadBatch: 'demo', source: 'manual_upload' },
  { id: 'mb_002', pipeline: 'mobileyes', name: 'Sarah "NightOwlGG" Park', platform: 'twitch', handle: 'NightOwlGG', profileUrl: 'https://twitch.tv/NightOwlGG', followerCount: 95000, averageViewers: 800, engagementRate: 7.2, contentFocus: ['Competitive', 'Variety'], market: 'Australia', tier: 'silver', status: 'signed', uploadedAt: new Date().toISOString(), uploadBatch: 'demo', source: 'manual_upload' },
  { id: 'mb_003', pipeline: 'mobileyes', name: 'Jake "RacingJake" Williams', platform: 'kick', handle: 'RacingJakeAU', profileUrl: 'https://kick.com/RacingJakeAU', followerCount: 62000, averageViewers: 950, engagementRate: 5.8, contentFocus: ['Racing', 'Sim Racing'], market: 'Australia', tier: 'silver', status: 'signed', uploadedAt: new Date().toISOString(), uploadBatch: 'demo', source: 'manual_upload' },
  { id: 'mb_004', pipeline: 'mobileyes', name: 'ChilledCobra', platform: 'twitch', handle: 'ChilledCobra', profileUrl: 'https://twitch.tv/ChilledCobra', followerCount: 42000, averageViewers: 600, engagementRate: 8.1, contentFocus: ['Horror', 'Variety'], market: 'Australia', tier: 'bronze', status: 'to_contact', uploadedAt: new Date().toISOString(), uploadBatch: 'demo', source: 'manual_upload' },
  { id: 'mb_005', pipeline: 'mobileyes', name: 'OzzyValorant', platform: 'kick', handle: 'OzzyValorant', profileUrl: 'https://kick.com/OzzyValorant', followerCount: 28000, averageViewers: 450, engagementRate: 9.5, contentFocus: ['FPS', 'Valorant', 'Competitive'], market: 'Australia', tier: 'bronze', status: 'to_contact', uploadedAt: new Date().toISOString(), uploadBatch: 'demo', source: 'manual_upload' },
];

export default function AgentsDashboardPage() {
  const [platform, setPlatform] = useState<ContactPipeline>('mobileyes');
  const contacts = platform === 'mobileyes' ? DEMO_MOBILEYES_CONTACTS : DEMO_GAMEFLUENCE_CONTACTS;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Agents</h1>
            <p className="text-gray-600">Terry scouts talent. Dazza prices deals. C-Suite advises strategy.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPlatform('gamefluence')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${platform === 'gamefluence' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              🎮 Gamefluence
            </button>
            <button
              onClick={() => setPlatform('mobileyes')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${platform === 'mobileyes' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              🎬 Mobileyes
            </button>
          </div>
        </div>

        {/* Agent Panel */}
        <AgentAdvisoryPanel contacts={contacts} platform={platform} />
      </div>
    </div>
  );
}
