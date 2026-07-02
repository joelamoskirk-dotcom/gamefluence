'use client';

import React, { useState } from 'react';
import { 
  MobileyesTalentManagement, 
  TalentProfile, 
  CampaignBrief 
} from '@/lib/mobileyes-talent-management';
import { PlatformVerificationEngine } from '@/lib/platform-verification-engine';
import { Button } from '@/components/ui/Button';
import {
  Users,
  FileText,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Send,
  Eye,
  AlertTriangle,
} from 'lucide-react';

type DashboardTab = 'roster' | 'briefs' | 'pipeline' | 'metrics';

export default function TalentManagementDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('roster');
  const talent = MobileyesTalentManagement.getDemoTalent();
  const briefs = MobileyesTalentManagement.getDemoBriefs();

  const totalRevenue = briefs
    .filter(b => b.status === 'verified' || b.status === 'paid')
    .reduce((sum, b) => sum + b.grossFee, 0);
  const totalCommission = briefs
    .filter(b => b.status === 'verified' || b.status === 'paid')
    .reduce((sum, b) => sum + b.commission, 0);
  const activeBriefs = briefs.filter(b => ['sent', 'accepted', 'in_progress', 'delivered'].includes(b.status)).length;

  const getBriefStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-700',
      sent: 'bg-blue-100 text-blue-700',
      accepted: 'bg-green-100 text-green-700',
      declined: 'bg-red-100 text-red-700',
      in_progress: 'bg-yellow-100 text-yellow-700',
      delivered: 'bg-purple-100 text-purple-700',
      verified: 'bg-emerald-100 text-emerald-700',
      paid: 'bg-green-200 text-green-800',
      disputed: 'bg-red-200 text-red-800',
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`;
  };

  const getTalentStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-green-100 text-green-700',
      onboarding: 'bg-blue-100 text-blue-700',
      paused: 'bg-yellow-100 text-yellow-700',
      terminated: 'bg-red-100 text-red-700',
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`;
  };

  const getPlatformEmoji = (platform: string) => {
    switch (platform) {
      case 'kick': return '🟢';
      case 'twitch': return '🟣';
      case 'youtube': return '🔴';
      case 'tiktok': return '🎵';
      default: return '📺';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mobileyes Talent Management</h1>
          <p className="text-gray-600">Roster, briefs, and pipeline overview</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-indigo-600 text-white text-sm">+ New Brief</Button>
          <Button variant="outline" className="text-sm">Export</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <Users className="w-4 h-4" />
            <span className="text-sm">Active Talent</span>
          </div>
          <div className="text-2xl font-bold">{talent.filter(t => t.status === 'active').length}</div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <FileText className="w-4 h-4" />
            <span className="text-sm">Active Briefs</span>
          </div>
          <div className="text-2xl font-bold">{activeBriefs}</div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">Revenue (Gross)</span>
          </div>
          <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Commission</span>
          </div>
          <div className="text-2xl font-bold text-indigo-600">${totalCommission.toLocaleString()}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-6">
          {[
            { key: 'roster' as DashboardTab, label: 'Talent Roster', icon: Users },
            { key: 'briefs' as DashboardTab, label: 'Briefs', icon: FileText },
            { key: 'pipeline' as DashboardTab, label: 'Pipeline', icon: Send },
            { key: 'metrics' as DashboardTab, label: 'Metrics', icon: TrendingUp },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium border-b-2 ${
                activeTab === tab.key
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'roster' && (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Talent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Platforms</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate (Full Day)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completed</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Earnings</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reliability</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {talent.map(t => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{t.fullName}</div>
                    <div className="text-sm text-gray-500">{t.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {t.platforms.map((p, i) => (
                        <span key={i} title={`${p.platform}: ${p.followerCount.toLocaleString()} followers`}>
                          {getPlatformEmoji(p.platform)}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Primary: {t.primaryPlatform}</div>
                  </td>
                  <td className="px-4 py-3 font-medium">${t.rateCard.fullDayRate.toLocaleString()}</td>
                  <td className="px-4 py-3">{t.briefsCompleted} briefs</td>
                  <td className="px-4 py-3 font-medium text-green-700">${t.totalEarnings.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${t.reliabilityScore >= 90 ? 'bg-green-500' : t.reliabilityScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                      <span className="text-sm">{t.reliabilityScore}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={getTalentStatusBadge(t.status)}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'briefs' && (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brief</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Talent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Platform</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deadline</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {briefs.map(b => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{b.campaignName}</div>
                    <div className="text-sm text-gray-500">{b.brandName}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">{b.talentName}</td>
                  <td className="px-4 py-3">
                    <span>{getPlatformEmoji(b.platform)} {b.platform}</span>
                  </td>
                  <td className="px-4 py-3 font-medium">${b.grossFee.toLocaleString()}</td>
                  <td className="px-4 py-3 text-indigo-600">${b.commission.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">{b.deadline.toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className={getBriefStatusBadge(b.status)}>{b.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{b.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'pipeline' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Awaiting Response', status: 'sent', color: 'blue' },
            { label: 'In Progress', status: 'accepted', color: 'yellow' },
            { label: 'Delivered', status: 'delivered', color: 'purple' },
            { label: 'Verified / Paid', status: 'verified', color: 'green' },
          ].map(col => {
            const colBriefs = col.status === 'verified' 
              ? briefs.filter(b => b.status === 'verified' || b.status === 'paid')
              : briefs.filter(b => b.status === col.status);
            return (
              <div key={col.label} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-${col.color}-500`} />
                  {col.label} ({colBriefs.length})
                </h3>
                <div className="space-y-2">
                  {colBriefs.map(b => (
                    <div key={b.id} className="bg-white rounded-lg border p-3">
                      <div className="font-medium text-sm">{b.brandName}</div>
                      <div className="text-xs text-gray-500">{b.talentName}</div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{getPlatformEmoji(b.platform)} {b.platform}</span>
                        <span className="text-xs font-medium text-green-700">${b.talentFee.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                  {colBriefs.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-4">No briefs</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'metrics' && (
        <div className="space-y-6">
          {/* Per-Talent Metrics */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Talent Performance</h3>
            <div className="space-y-4">
              {talent.map(t => {
                const stats = MobileyesTalentManagement.getTalentStats(t, briefs);
                return (
                  <div key={t.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{t.fullName}</div>
                      <div className="text-sm text-gray-500">
                        {stats.completed} completed • {stats.declined} declined • {stats.inProgress} in progress
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-700">${stats.totalEarned.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">
                        Avg: ${Math.round(stats.averagePerBrief).toLocaleString()}/brief
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Platform Breakdown */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Platform Breakdown</h3>
            <div className="grid grid-cols-4 gap-4">
              {(['kick', 'twitch', 'youtube', 'tiktok'] as const).map(platform => {
                const count = briefs.filter(b => b.platform === platform).length;
                const revenue = briefs
                  .filter(b => b.platform === platform && (b.status === 'verified' || b.status === 'paid'))
                  .reduce((sum, b) => sum + b.grossFee, 0);
                return (
                  <div key={platform} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-1">{getPlatformEmoji(platform)}</div>
                    <div className="font-medium capitalize">{platform}</div>
                    <div className="text-sm text-gray-500">{count} briefs</div>
                    <div className="text-sm font-medium text-green-700">${revenue.toLocaleString()}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Revenue by Source */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue by Source</h3>
            <div className="grid grid-cols-4 gap-4">
              {(['direct', 'fabulate', 'agency', 'repeat'] as const).map(source => {
                const sourceBriefs = briefs.filter(b => b.source === source);
                const revenue = sourceBriefs
                  .filter(b => b.status === 'verified' || b.status === 'paid')
                  .reduce((sum, b) => sum + b.grossFee, 0);
                return (
                  <div key={source} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium capitalize">{source}</div>
                    <div className="text-sm text-gray-500">{sourceBriefs.length} briefs</div>
                    <div className="text-sm font-medium text-green-700">${revenue.toLocaleString()}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
