'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Eye, DollarSign, Calendar, Play, Pause, BarChart3, Zap, Globe, Clock } from 'lucide-react';
import { SampleDataSeeder } from '@/lib/sample-data-seeder';
import { automatedWorkflows } from '@/lib/automated-workflows';
import { creatorPerformanceAPI, CreatorPerformanceData } from '@/lib/creator-performance-api';

export default function EnhancedCreatorPerformance() {
  const [creators, setCreators] = useState<CreatorPerformanceData[]>([]);
  const [liveCreators, setLiveCreators] = useState<CreatorPerformanceData[]>([]);
  const [selectedCreator, setSelectedCreator] = useState<CreatorPerformanceData | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [apiConnections, setApiConnections] = useState<any[]>([]);
  const [performanceChart, setPerformanceChart] = useState<any[]>([]);
  const [automationStatus, setAutomationStatus] = useState<any[]>([]);

  useEffect(() => {
    loadCreatorData();
    loadAPIConnections();
    loadAutomationStatus();
    
    // Refresh data every 30 seconds
    const interval = setInterval(() => {
      loadCreatorData();
      updateLiveData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [timeRange]);

  const loadCreatorData = () => {
    const allCreators = creatorPerformanceAPI.getAllCreators();
    const live = creatorPerformanceAPI.getLiveCreators();
    
    setCreators(allCreators);
    setLiveCreators(live);
    
    if (!selectedCreator && allCreators.length > 0) {
      setSelectedCreator(allCreators[0]);
    }
    
    // Load performance chart data
    const chartData = creatorPerformanceAPI.getPerformanceTimeSeries();
    setPerformanceChart(chartData.slice(-30)); // Last 30 data points
  };

  const loadAPIConnections = () => {
    const connections = creatorPerformanceAPI.getAPIConnections();
    setApiConnections(connections);
  };

  const loadAutomationStatus = () => {
    const workflows = automatedWorkflows.getWorkflows();
    setAutomationStatus(workflows.filter(w => w.name.includes('Creator') || w.name.includes('Performance')));
  };

  const updateLiveData = () => {
    // Simulate real-time updates
    setCreators(prev => prev.map(creator => ({
      ...creator,
      liveData: creator.liveData ? {
        ...creator.liveData,
        currentViewers: Math.max(100, creator.liveData.currentViewers + Math.floor(Math.random() * 200) - 100),
        recentMentions: Math.floor(Math.random() * 20) + 5,
        liveEngagement: Math.random() * 5 + 5
      } : undefined
    })));
  };

  const runAutomatedWorkflow = async (workflowId: string) => {
    try {
      const execution = await automatedWorkflows.runWorkflow(workflowId);
      alert(`Workflow executed successfully!\n\nExecution ID: ${execution.id}\nStatus: ${execution.status}\nDuration: ${execution.endTime ? Math.round((execution.endTime.getTime() - execution.startTime.getTime()) / 1000) : 0}s`);
      loadAutomationStatus();
    } catch (error) {
      alert(`Workflow execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const getPlatformIcon = (platform: string) => {
    const icons = {
      twitch: '🟣',
      youtube: '🔴', 
      tiktok: '⚫',
      instagram: '🟠',
      twitter: '🔵'
    };
    return icons[platform as keyof typeof icons] || '📱';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'text-red-500 bg-red-100';
      case 'completed': return 'text-green-500 bg-green-100';
      case 'scheduled': return 'text-blue-500 bg-blue-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with API Status */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">Creator Performance Tracking</h2>
            <p className="text-purple-100">Real-time data from all campaigns with API integrations</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-purple-100">
              {creators.length} Total Creators • {liveCreators.length} Live Now
            </div>
            <div className="text-xs text-purple-200">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
        
        {/* API Connection Status */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {apiConnections.map((connection) => (
            <div key={connection.platform} className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${connection.connected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-sm font-medium capitalize">{connection.platform}</span>
              </div>
              <div className="text-xs text-purple-200">
                Rate Limit: {connection.rateLimitRemaining}/1000
              </div>
              <div className="text-xs text-purple-200">
                Next Sync: {new Date(connection.nextSyncTime).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Creators */}
      {liveCreators.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 animate-pulse" />
            Live Creators ({liveCreators.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveCreators.map((creator) => (
              <div key={creator.creatorId} className="bg-white rounded-lg p-4 border border-red-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">{creator.avatar}</div>
                  <div>
                    <div className="font-medium">{creator.name}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      {getPlatformIcon(creator.platform)}
                      {creator.platform}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {creator.liveData && (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Viewers</span>
                      <span className="font-medium">{creator.liveData.currentViewers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Live Engagement</span>
                      <span className="font-medium">{creator.liveData.liveEngagement.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Recent Mentions</span>
                      <span className="font-medium">{creator.liveData.recentMentions}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Stream: {creator.liveData.streamTitle}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">All Creators Performance</h3>
        <div className="flex gap-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded text-sm ${
                timeRange === range 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Creator Performance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Creator List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-semibold">Creator Performance ({creators.length})</h4>
            </div>
            
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {creators.map((creator) => (
                <div 
                  key={creator.creatorId}
                  onClick={() => setSelectedCreator(creator)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedCreator?.creatorId === creator.creatorId ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{creator.avatar}</div>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {creator.name}
                          {creator.liveData?.isLive && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">LIVE</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          {getPlatformIcon(creator.platform)}
                          {creator.followers.toLocaleString()} followers
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(creator.status)}`}>
                        {creator.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Total Reach</div>
                      <div className="font-medium">{creator.totalReach.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Avg ROI</div>
                      <div className="font-medium text-green-600">{creator.avgROI.toFixed(0)}%</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Engagement</div>
                      <div className="font-medium">{creator.avgEngagementRate.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Revenue</div>
                      <div className="font-medium">${creator.totalRevenue.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    {creator.totalCampaigns} campaigns • Last active: {new Date(creator.lastActive).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Creator Details */}
        <div className="space-y-6">
          {selectedCreator && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{selectedCreator.avatar}</div>
                <div>
                  <h4 className="text-lg font-semibold">{selectedCreator.name}</h4>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    {getPlatformIcon(selectedCreator.platform)}
                    {selectedCreator.platform} • {selectedCreator.followers.toLocaleString()} followers
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedCreator.avgROI.toFixed(0)}%</div>
                    <div className="text-sm text-blue-600">Average ROI</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedCreator.avgEngagementRate.toFixed(1)}%</div>
                    <div className="text-sm text-green-600">Engagement Rate</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Campaigns</span>
                    <span className="font-medium">{selectedCreator.totalCampaigns}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Revenue</span>
                    <span className="font-medium">${selectedCreator.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Views</span>
                    <span className="font-medium">{selectedCreator.totalViews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Active</span>
                    <span className="font-medium">{new Date(selectedCreator.lastActive).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Automation Controls */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              Automated Workflows
            </h4>
            
            <div className="space-y-3">
              {automationStatus.map((workflow) => (
                <div key={workflow.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{workflow.name}</div>
                    <div className="text-xs text-gray-600">
                      Runs: {workflow.runCount} • Success: {workflow.successCount}
                    </div>
                  </div>
                  <button
                    onClick={() => runAutomatedWorkflow(workflow.id)}
                    className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                  >
                    Run Now
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-green-50 rounded-lg text-sm text-green-800">
              <strong>No n8n Required!</strong> Built-in automation handles creator monitoring, payments, and optimization automatically.
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          Performance Over Time ({timeRange})
        </h4>
        
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center text-gray-500">
            <BarChart3 className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <div className="font-medium">Performance Chart</div>
            <div className="text-sm">
              {performanceChart.length} data points from {timeRange} period
            </div>
            <div className="text-xs mt-2">
              Total Revenue: ${performanceChart.reduce((sum, p) => sum + p.totalRevenue, 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}