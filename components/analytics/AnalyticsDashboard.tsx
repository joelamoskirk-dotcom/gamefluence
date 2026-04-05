'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { BarChart3, TrendingUp, Users, Eye, MessageSquare, ExternalLink, Settings, Zap, Brain, AlertTriangle, Lightbulb } from 'lucide-react';
import { AdvancedAttributionEngine, AttributionInsight, CreatorPerformanceData } from '@/lib/advanced-attribution';

interface AnalyticsProps {
  campaignId?: string;
  creatorId?: string;
}

export default function AnalyticsDashboard({ campaignId, creatorId }: AnalyticsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [aiInsights, setAiInsights] = useState<AttributionInsight[]>([]);
  const [attributionEngine, setAttributionEngine] = useState<AdvancedAttributionEngine | null>(null);
  const [connectedAPIs, setConnectedAPIs] = useState({
    streamcharts: false,
    appsflyer: false,
    googleAnalytics: false,
    azureInsights: false,
    awsEvents: false
  });

  // Mock creator performance data
  const creatorPerformance = useMemo(() => [
    {
      id: 'alex-gamemaster',
      name: 'Alex GameMaster',
      avatar: '👨‍💻',
      phase: 'live',
      reach: 125000,
      engagement: 8500,
      engagementRate: 6.8,
      views: 85000,
      chatMentions: 245,
      brandMentions: 12,
      streamDuration: '2h 15m'
    },
    {
      id: 'sarah-plays',
      name: 'Sarah Plays',
      avatar: '👩‍🎮',
      phase: 'post',
      reach: 250000,
      engagement: 18000,
      engagementRate: 7.2,
      views: 180000,
      chatMentions: 420,
      brandMentions: 28,
      streamDuration: '3h 45m'
    }
  ], []);

  // Initialize AI attribution engine
  useEffect(() => {
    const engine = new AdvancedAttributionEngine({ campaignId });
    setAttributionEngine(engine);
    
    // Generate mock performance data for AI analysis
    const mockPerformanceData: CreatorPerformanceData[] = creatorPerformance.map(creator => ({
      creatorId: creator.id,
      impressions: creator.reach,
      clicks: Math.floor(creator.views * 0.05),
      installs: Math.floor(creator.views * 0.02),
      revenue: Math.floor(creator.views * 0.02 * 2.5),
      engagementRate: creator.engagementRate / 100,
      audienceQuality: 0.7 + Math.random() * 0.3,
      brandSafety: 0.8 + Math.random() * 0.2,
      contentRelevance: 0.6 + Math.random() * 0.4,
      historicalPerformance: [1.2, 1.5, 1.8, 2.1, 1.9]
    }));
    
    // Generate AI insights
    const insights = engine.analyzeCreatorPerformance(mockPerformanceData);
    const optimizationRecommendations = engine.generateOptimizationRecommendations();
    setAiInsights([...insights, ...optimizationRecommendations]);
  }, [campaignId, creatorPerformance]);

  // Mock analytics data
  const campaignData = {
    totalReach: 2500000,
    totalEngagement: 185000,
    avgEngagementRate: 7.4,
    totalViews: 1200000,
    totalClicks: 45000,
    conversions: 2800,
    roi: 340
  };

  const apiIntegrations = [
    {
      name: 'StreamCharts',
      description: 'Real-time streaming analytics and viewership data',
      status: connectedAPIs.streamcharts,
      icon: '📊',
      features: ['Live viewer counts', 'Stream performance', 'Audience demographics']
    },
    {
      name: 'AppsFlyer',
      description: 'Mobile attribution and user acquisition tracking',
      status: connectedAPIs.appsflyer,
      icon: '📱',
      features: ['Install attribution', 'User journey tracking', 'LTV analysis']
    },
    {
      name: 'Google Analytics',
      description: 'Web traffic and conversion tracking',
      status: connectedAPIs.googleAnalytics,
      icon: '🔍',
      features: ['Website traffic', 'Conversion funnels', 'User behavior']
    },
    {
      name: 'Azure Application Insights',
      description: 'Application performance and user analytics',
      status: connectedAPIs.azureInsights,
      icon: '☁️',
      features: ['App performance', 'User sessions', 'Custom events']
    },
    {
      name: 'AWS CloudWatch Events',
      description: 'Real-time event monitoring and alerting',
      status: connectedAPIs.awsEvents,
      icon: '⚡',
      features: ['Real-time alerts', 'Custom metrics', 'Event tracking']
    }
  ];

  const toggleAPI = (apiName: string) => {
    setConnectedAPIs(prev => ({
      ...prev,
      [apiName]: !prev[apiName as keyof typeof prev]
    }));
  };

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }: any) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        isActive 
          ? 'bg-primary text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b pb-4">
        <TabButton 
          id="overview" 
          label="Overview" 
          icon={BarChart3}
          isActive={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')} 
        />
        <TabButton 
          id="creators" 
          label="Creator Performance" 
          icon={Users}
          isActive={activeTab === 'creators'} 
          onClick={() => setActiveTab('creators')} 
        />
        <TabButton 
          id="integrations" 
          label="API Integrations" 
          icon={Settings}
          isActive={activeTab === 'integrations'} 
          onClick={() => setActiveTab('integrations')} 
        />
        <TabButton 
          id="automation" 
          label="Automation" 
          icon={Zap}
          isActive={activeTab === 'automation'} 
          onClick={() => setActiveTab('automation')} 
        />
      </div>

      {/* AI Insights Section - Always Visible */}
      {aiInsights.length > 0 && (
        <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-primary">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Brain className="text-primary w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold">AI-Powered Insights</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiInsights.slice(0, 6).map((insight, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  insight.type === 'warning' ? 'bg-red-50 border-red-400' :
                  insight.type === 'opportunity' ? 'bg-green-50 border-green-400' :
                  'bg-blue-50 border-blue-400'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  {insight.type === 'warning' ? (
                    <AlertTriangle className="text-red-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                  ) : insight.type === 'opportunity' ? (
                    <Lightbulb className="text-green-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                  ) : (
                    <TrendingUp className="text-blue-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                      insight.type === 'warning' ? 'text-red-600' :
                      insight.type === 'opportunity' ? 'text-green-600' :
                      'text-blue-600'
                    }`}>
                      {insight.type} • {insight.impact} impact
                    </div>
                    <p className="text-sm font-medium text-gray-800">{insight.message}</p>
                    {insight.recommendation && (
                      <p className="text-xs text-gray-600 mt-1">{insight.recommendation}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {aiInsights.length > 6 && (
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">
                View All {aiInsights.length} Insights
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Reach</p>
                  <p className="text-2xl font-bold">{campaignData.totalReach.toLocaleString()}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="text-primary" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold">{campaignData.totalViews.toLocaleString()}</p>
                </div>
                <div className="bg-secondary/10 p-3 rounded-full">
                  <Eye className="text-secondary" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Engagement Rate</p>
                  <p className="text-2xl font-bold">{campaignData.avgEngagementRate}%</p>
                </div>
                <div className="bg-accent/10 p-3 rounded-full">
                  <TrendingUp className="text-accent" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">ROI</p>
                  <p className="text-2xl font-bold">{campaignData.roi}%</p>
                </div>
                <div className="bg-gaming/10 p-3 rounded-full">
                  <span className="text-gaming font-bold">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Campaign Performance Over Time</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Performance chart will be displayed here</p>
                <p className="text-sm">Connect analytics APIs to view real-time data</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Creator Performance Tab */}
      {activeTab === 'creators' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Creator Performance Tracking</h2>
            <Button variant="outline">Export Report</Button>
          </div>

          <div className="space-y-4">
            {creatorPerformance.map(creator => (
              <div key={creator.id} className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                      {creator.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold">{creator.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          creator.phase === 'live' ? 'bg-red-100 text-red-800' :
                          creator.phase === 'post' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {creator.phase === 'live' ? '🔴 Live' : 
                           creator.phase === 'post' ? '✅ Completed' : '⏳ Pre-Campaign'}
                        </span>
                        <span className="text-sm text-gray-500">Duration: {creator.streamDuration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold">{creator.reach.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Reach</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{creator.views.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{creator.engagementRate}%</div>
                    <div className="text-sm text-gray-500">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{creator.chatMentions}</div>
                    <div className="text-sm text-gray-500">Chat Mentions</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span className="font-medium">Brand Mentions: {creator.brandMentions}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View Stream Recording
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* API Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Analytics & Attribution Partners</h2>
            <Button>Add New Integration</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {apiIntegrations.map(api => (
              <div key={api.name} className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{api.icon}</span>
                    <div>
                      <h3 className="font-bold">{api.name}</h3>
                      <p className="text-sm text-gray-600">{api.description}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    api.status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {api.status ? 'Connected' : 'Not Connected'}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {api.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant={api.status ? "outline" : "default"}
                  className="w-full"
                  onClick={() => toggleAPI(api.name.toLowerCase().replace(/\s+/g, ''))}
                >
                  {api.status ? 'Disconnect' : 'Connect'}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Automation Tab */}
      {activeTab === 'automation' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Workflow Automation with n8n</h2>
            <Button>
              <ExternalLink className="w-4 h-4 mr-2" />
              Sign up to n8n
            </Button>
          </div>

          <div className="card bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <Zap className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Automate Your Campaign Workflows</h3>
                <p className="text-gray-600">Set up automated processes to capture and analyze creator content</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2">🎥 Stream Monitoring</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Automatically capture and log creator streams when they mention your brand
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Monitor live streams in real-time</li>
                  <li>• Detect brand mentions in audio/chat</li>
                  <li>• Auto-save video highlights</li>
                  <li>• Generate performance reports</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2">💬 Chat Analysis</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Track and analyze chat mentions and audience sentiment
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Real-time chat monitoring</li>
                  <li>• Sentiment analysis</li>
                  <li>• Keyword tracking</li>
                  <li>• Engagement metrics</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2">📊 Data Integration</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Automatically sync data across all your analytics platforms
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Multi-platform data sync</li>
                  <li>• Custom dashboard updates</li>
                  <li>• Automated reporting</li>
                  <li>• Alert notifications</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold mb-2">🚨 Smart Alerts</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Get notified when important campaign events occur
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• Brand mention alerts</li>
                  <li>• Performance threshold alerts</li>
                  <li>• Campaign milestone notifications</li>
                  <li>• Custom trigger events</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button size="lg">
                Set Up Automation Workflows
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}