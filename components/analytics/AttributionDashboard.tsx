'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Smartphone,
  QrCode,
  Target,
  DollarSign,
  Eye,
  MousePointer,
  ShoppingCart,
  RefreshCw,
  Download,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Zap,
  Shield,
  Link,
  Activity,
  Filter,
  Search,
  Calendar,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface AttributionMetrics {
  campaignId: string;
  campaignName: string;
  
  // Core metrics
  impressions: number;
  clicks: number;
  installs: number;
  purchases: number;
  revenue: number;
  
  // Attribution breakdown
  firstTouch: number;
  lastTouch: number;
  assisted: number;
  
  // Cross-device metrics
  crossDeviceUsers: number;
  avgDevicesPerUser: number;
  crossDeviceRevenue: number;
  
  // QR Code performance
  qrScans: number;
  qrInstalls: number;
  qrRevenue: number;
  
  // MMP integration status
  mmps: {
    name: string;
    status: 'connected' | 'error' | 'syncing';
    lastSync: Date;
    events: number;
  }[];
  
  // Fraud detection
  fraudEvents: number;
  fraudRate: number;
  blockedRevenue: number;
}

interface CreatorAttribution {
  creatorId: string;
  creatorName: string;
  platform: string;
  
  // Attribution metrics
  firstTouchAttribution: {
    installs: number;
    revenue: number;
    percentage: number;
  };
  lastTouchAttribution: {
    installs: number;
    revenue: number;
    percentage: number;
  };
  assistedAttribution: {
    installs: number;
    revenue: number;
    percentage: number;
  };
  
  // Cross-device impact
  crossDeviceContribution: {
    users: number;
    revenue: number;
    avgJourneyLength: number;
  };
  
  // QR code performance
  qrCodes: {
    total: number;
    scans: number;
    installs: number;
    revenue: number;
  };
}

export default function AttributionDashboard() {
  const [selectedCampaign, setSelectedCampaign] = useState<string>('campaign-truemove-x1');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '14d' | '30d'>('14d');
  const [selectedView, setSelectedView] = useState<'overview' | 'creators' | 'cross-device' | 'qr-codes' | 'mmps'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock attribution data
  const attributionMetrics: AttributionMetrics = {
    campaignId: 'campaign-truemove-x1',
    campaignName: 'TrueMove Gaming Pro X1 Launch',
    impressions: 8920000,
    clicks: 267600,
    installs: 15600,
    purchases: 3120,
    revenue: 468000,
    firstTouch: 6240, // 40% first touch
    lastTouch: 7800, // 50% last touch
    assisted: 1560, // 10% assisted
    crossDeviceUsers: 4680, // 30% of users
    avgDevicesPerUser: 2.3,
    crossDeviceRevenue: 187200, // 40% of revenue
    qrScans: 45600,
    qrInstalls: 2340,
    qrRevenue: 70200,
    mmps: [
      { name: 'AppsFlyer', status: 'connected', lastSync: new Date(), events: 12450 },
      { name: 'Adjust', status: 'connected', lastSync: new Date(), events: 8930 },
      { name: 'Branch', status: 'syncing', lastSync: new Date(Date.now() - 300000), events: 5670 }
    ],
    fraudEvents: 234,
    fraudRate: 1.5,
    blockedRevenue: 7020
  };

  const creatorAttributions: CreatorAttribution[] = [
    {
      creatorId: 'creator-th-001',
      creatorName: 'GamingWithPat',
      platform: 'YouTube',
      firstTouchAttribution: { installs: 2496, revenue: 124800, percentage: 40 },
      lastTouchAttribution: { installs: 3120, revenue: 156000, percentage: 50 },
      assistedAttribution: { installs: 624, revenue: 31200, percentage: 10 },
      crossDeviceContribution: { users: 1404, revenue: 56160, avgJourneyLength: 3.2 },
      qrCodes: { total: 8, scans: 12800, installs: 640, revenue: 19200 }
    },
    {
      creatorId: 'creator-th-002',
      creatorName: 'MusicGameQueen',
      platform: 'TikTok',
      firstTouchAttribution: { installs: 1872, revenue: 93600, percentage: 45 },
      lastTouchAttribution: { installs: 1560, revenue: 78000, percentage: 37.5 },
      assistedAttribution: { installs: 728, revenue: 36400, percentage: 17.5 },
      crossDeviceContribution: { users: 1248, revenue: 49920, avgJourneyLength: 2.8 },
      qrCodes: { total: 12, scans: 18900, installs: 945, revenue: 28350 }
    },
    {
      creatorId: 'creator-th-003',
      creatorName: 'ThaiGamerPro',
      platform: 'YouTube',
      firstTouchAttribution: { installs: 1248, revenue: 62400, percentage: 35 },
      lastTouchAttribution: { installs: 1872, revenue: 93600, percentage: 52.5 },
      assistedAttribution: { installs: 446, revenue: 22300, percentage: 12.5 },
      crossDeviceContribution: { users: 1068, revenue: 42720, avgJourneyLength: 4.1 },
      qrCodes: { total: 6, scans: 9600, installs: 480, revenue: 14400 }
    },
    {
      creatorId: 'creator-th-004',
      creatorName: 'CasualGamerGirl',
      platform: 'TikTok',
      firstTouchAttribution: { installs: 624, revenue: 31200, percentage: 50 },
      lastTouchAttribution: { installs: 468, revenue: 23400, percentage: 37.5 },
      assistedAttribution: { installs: 156, revenue: 7800, percentage: 12.5 },
      crossDeviceContribution: { users: 374, revenue: 14960, avgJourneyLength: 2.1 },
      qrCodes: { total: 4, scans: 4300, installs: 275, revenue: 8250 }
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'syncing': return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Attribution Intelligence</h1>
            </div>
            <p className="text-lg text-purple-100 mb-4">
              Complete funnel tracking with MMP integration and cross-device attribution
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>MMP Integrated</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <span>Cross-Device Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4" />
                <span>QR Code Attribution</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-purple-200">Total Attribution</div>
            <div className="text-4xl font-bold">{formatCurrency(attributionMetrics.revenue)}</div>
            <div className="text-purple-200">Tracked Revenue</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="campaign-truemove-x1">TrueMove Gaming Pro X1</option>
              <option value="campaign-accessories">Gaming Accessories Launch</option>
              <option value="campaign-vietnam">Vietnam Expansion</option>
            </select>
            
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="14d">Last 14 days</option>
              <option value="30d">Last 30 days</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2"
            >
              {isRefreshing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Refresh
            </Button>
            <Button className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* View Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center space-x-4">
          {[
            { id: 'overview', label: 'Attribution Overview', icon: BarChart3 },
            { id: 'creators', label: 'Creator Attribution', icon: Users },
            { id: 'cross-device', label: 'Cross-Device Journey', icon: Smartphone },
            { id: 'qr-codes', label: 'QR Code Tracking', icon: QrCode },
            { id: 'mmps', label: 'MMP Integration', icon: Link }
          ].map((view) => {
            const Icon = view.icon;
            return (
              <Button
                key={view.id}
                onClick={() => setSelectedView(view.id as any)}
                className={`flex items-center gap-2 px-6 py-3 ${
                  selectedView === view.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {view.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Attribution Overview */}
      {selectedView === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Installs</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {formatNumber(attributionMetrics.installs)}
                  </p>
                  <p className="text-green-600 text-sm flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +22% vs target
                  </p>
                </div>
                <Download className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Revenue</p>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(attributionMetrics.revenue)}
                  </p>
                  <p className="text-green-600 text-sm flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    4.2x ROAS
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Cross-Device Users</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {formatNumber(attributionMetrics.crossDeviceUsers)}
                  </p>
                  <p className="text-purple-600 text-sm">
                    {((attributionMetrics.crossDeviceUsers / attributionMetrics.installs) * 100).toFixed(1)}% of users
                  </p>
                </div>
                <Smartphone className="w-8 h-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">QR Code Revenue</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {formatCurrency(attributionMetrics.qrRevenue)}
                  </p>
                  <p className="text-orange-600 text-sm">
                    {((attributionMetrics.qrRevenue / attributionMetrics.revenue) * 100).toFixed(1)}% of total
                  </p>
                </div>
                <QrCode className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Attribution Model Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                Attribution Model Breakdown
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-blue-800">First Touch Attribution</div>
                    <div className="text-sm text-blue-600">Initial campaign exposure</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatNumber(attributionMetrics.firstTouch)}
                    </div>
                    <div className="text-sm text-blue-600">
                      {((attributionMetrics.firstTouch / attributionMetrics.installs) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-green-800">Last Touch Attribution</div>
                    <div className="text-sm text-green-600">Final conversion touchpoint</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {formatNumber(attributionMetrics.lastTouch)}
                    </div>
                    <div className="text-sm text-green-600">
                      {((attributionMetrics.lastTouch / attributionMetrics.installs) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-purple-800">Assisted Attribution</div>
                    <div className="text-sm text-purple-600">Multi-touch journey</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">
                      {formatNumber(attributionMetrics.assisted)}
                    </div>
                    <div className="text-sm text-purple-600">
                      {((attributionMetrics.assisted / attributionMetrics.installs) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                Funnel Performance
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Impressions:</span>
                  <span className="font-bold">{formatNumber(attributionMetrics.impressions)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Clicks:</span>
                  <div className="text-right">
                    <span className="font-bold">{formatNumber(attributionMetrics.clicks)}</span>
                    <div className="text-sm text-green-600">
                      {((attributionMetrics.clicks / attributionMetrics.impressions) * 100).toFixed(2)}% CTR
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Installs:</span>
                  <div className="text-right">
                    <span className="font-bold">{formatNumber(attributionMetrics.installs)}</span>
                    <div className="text-sm text-blue-600">
                      {((attributionMetrics.installs / attributionMetrics.clicks) * 100).toFixed(2)}% CVR
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Purchases:</span>
                  <div className="text-right">
                    <span className="font-bold">{formatNumber(attributionMetrics.purchases)}</span>
                    <div className="text-sm text-purple-600">
                      {((attributionMetrics.purchases / attributionMetrics.installs) * 100).toFixed(2)}% Purchase Rate
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Average Order Value:</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(attributionMetrics.revenue / attributionMetrics.purchases)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}    
  {/* Creator Attribution View */}
      {selectedView === 'creators' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Creator Attribution Analysis</h2>
            
            <div className="space-y-6">
              {creatorAttributions.map((creator) => (
                <div key={creator.creatorId} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold">{creator.creatorName}</h3>
                      <p className="text-gray-600">{creator.platform} • Creator ID: {creator.creatorId}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(
                          creator.firstTouchAttribution.revenue + 
                          creator.lastTouchAttribution.revenue + 
                          creator.assistedAttribution.revenue
                        )}
                      </div>
                      <div className="text-sm text-gray-600">Total Attributed Revenue</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Attribution Models */}
                    <div>
                      <h4 className="font-semibold mb-3">Attribution Models</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <div>
                            <div className="font-medium text-blue-800">First Touch</div>
                            <div className="text-sm text-blue-600">{creator.firstTouchAttribution.percentage}%</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-blue-600">
                              {formatNumber(creator.firstTouchAttribution.installs)}
                            </div>
                            <div className="text-xs text-blue-600">installs</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <div>
                            <div className="font-medium text-green-800">Last Touch</div>
                            <div className="text-sm text-green-600">{creator.lastTouchAttribution.percentage}%</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">
                              {formatNumber(creator.lastTouchAttribution.installs)}
                            </div>
                            <div className="text-xs text-green-600">installs</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                          <div>
                            <div className="font-medium text-purple-800">Assisted</div>
                            <div className="text-sm text-purple-600">{creator.assistedAttribution.percentage}%</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-purple-600">
                              {formatNumber(creator.assistedAttribution.installs)}
                            </div>
                            <div className="text-xs text-purple-600">installs</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Cross-Device Impact */}
                    <div>
                      <h4 className="font-semibold mb-3">Cross-Device Impact</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Cross-Device Users:</span>
                            <span className="font-bold">{formatNumber(creator.crossDeviceContribution.users)}</span>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Cross-Device Revenue:</span>
                            <span className="font-bold text-green-600">
                              {formatCurrency(creator.crossDeviceContribution.revenue)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Avg Journey Length:</span>
                            <span className="font-bold">{creator.crossDeviceContribution.avgJourneyLength} days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* QR Code Performance */}
                    <div>
                      <h4 className="font-semibold mb-3">QR Code Performance</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-orange-600">QR Codes:</span>
                            <span className="font-bold text-orange-800">{creator.qrCodes.total}</span>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-orange-600">Scans:</span>
                            <span className="font-bold text-orange-800">{formatNumber(creator.qrCodes.scans)}</span>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-orange-600">QR Revenue:</span>
                            <span className="font-bold text-orange-800">
                              {formatCurrency(creator.qrCodes.revenue)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-orange-600">Scan-to-Install:</span>
                            <span className="font-bold text-orange-800">
                              {((creator.qrCodes.installs / creator.qrCodes.scans) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MMP Integration View */}
      {selectedView === 'mmps' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Link className="w-6 h-6 text-indigo-600" />
              MMP Integration Status
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {attributionMetrics.mmps.map((mmp) => (
                <div key={mmp.name} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">{mmp.name}</h3>
                    {getStatusIcon(mmp.status)}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-semibold capitalize ${
                        mmp.status === 'connected' ? 'text-green-600' :
                        mmp.status === 'syncing' ? 'text-blue-600' :
                        'text-red-600'
                      }`}>
                        {mmp.status}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Events Tracked:</span>
                      <span className="font-bold">{formatNumber(mmp.events)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Sync:</span>
                      <span className="font-semibold">
                        {Math.floor((Date.now() - mmp.lastSync.getTime()) / 60000)}m ago
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <Button className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure {mmp.name}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Integration Benefits */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-bold text-lg mb-4 text-blue-800">MMP Integration Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Unified attribution across all channels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Real-time event tracking and validation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Cross-device user journey mapping</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Fraud detection and prevention</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Agency-friendly reporting and billing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">GDPR compliant data handling</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Attribution Configuration */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold mb-6">Attribution Configuration</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Attribution Windows</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Click-to-Install:</span>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value="7" 
                        className="w-16 px-2 py-1 border rounded text-center"
                      />
                      <span className="text-sm text-gray-600">days</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">View-to-Install:</span>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value="1" 
                        className="w-16 px-2 py-1 border rounded text-center"
                      />
                      <span className="text-sm text-gray-600">days</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Install-to-Purchase:</span>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value="30" 
                        className="w-16 px-2 py-1 border rounded text-center"
                      />
                      <span className="text-sm text-gray-600">days</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Attribution Models</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="attribution" value="last_touch" defaultChecked />
                    <span className="text-sm">Last Touch (Default)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="attribution" value="first_touch" />
                    <span className="text-sm">First Touch</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="attribution" value="linear" />
                    <span className="text-sm">Linear Attribution</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="attribution" value="time_decay" />
                    <span className="text-sm">Time Decay</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="attribution" value="position_based" />
                    <span className="text-sm">Position Based (40/20/40)</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2">
                <Settings className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Fraud Detection & Security */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-red-600" />
          Fraud Detection & Security
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-red-50 rounded-lg">
            <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-red-600">{attributionMetrics.fraudEvents}</div>
            <div className="text-sm text-red-700">Fraud Events Blocked</div>
          </div>
          
          <div className="text-center p-6 bg-yellow-50 rounded-lg">
            <Eye className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-yellow-600">{attributionMetrics.fraudRate}%</div>
            <div className="text-sm text-yellow-700">Fraud Rate</div>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-green-600">{formatCurrency(attributionMetrics.blockedRevenue)}</div>
            <div className="text-sm text-green-700">Revenue Protected</div>
          </div>
        </div>
      </div>

      {/* Export & Integration */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Agency-Ready Attribution</h2>
            <p className="text-purple-100 mb-4">
              Complete attribution data ready for agency reporting and client billing
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>MMP Integrated</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Cross-Device Tracked</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Fraud Protected</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3">
              <Download className="w-4 h-4 mr-2" />
              Export Attribution Data
            </Button>
            <Button className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3">
              <ExternalLink className="w-4 h-4 mr-2" />
              API Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}