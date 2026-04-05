'use client';

import React, { useState, useEffect } from 'react';
import { bulletproofSystem } from '@/lib/bulletproof-system';
import BulletproofActions from '@/lib/bulletproof-actions';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap, 
  Shield,
  TrendingUp,
  Eye,
  RefreshCw
} from 'lucide-react';

export default function SystemStatusDashboard() {
  const [systemData, setSystemData] = useState<any>({
    tickets: [],
    health: { overall: 0, components: {}, alerts: [] },
    insights: [],
    stats: { totalTickets: 0, successRate: 0, avgResponseTime: 0, totalInsights: 0, actionableInsights: 0, systemHealth: 0 }
  });
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  useEffect(() => {
    // Load initial data
    loadSystemData();

    // Listen for real-time updates
    const handleSystemUpdate = (data: any) => {
      setSystemData(data);
    };

    bulletproofSystem.addListener(handleSystemUpdate);

    // Auto-refresh every 10 seconds
    const interval = setInterval(loadSystemData, 10000);

    return () => {
      bulletproofSystem.removeListener(handleSystemUpdate);
      clearInterval(interval);
    };
  }, []);

  const loadSystemData = () => {
    const data = {
      tickets: bulletproofSystem.getTickets(20),
      health: bulletproofSystem.getHealth(),
      insights: bulletproofSystem.getInsights(10),
      stats: bulletproofSystem.getSystemStats()
    };
    setSystemData(data);
  };

  const executeAction = async (actionName: string, actionHandler: any) => {
    if (isExecuting) return;
    
    setIsExecuting(true);
    setLastAction(actionName);

    try {
      const result = await actionHandler();
      
      if (result.success) {
        // Show success notification with real data
        const resultData = result.result;
        let message = `✅ ${actionName} Completed Successfully!\n\n`;
        
        if (resultData.roi) message += `📈 ROI: ${resultData.roi}%\n`;
        if (resultData.installs) message += `📱 Installs: ${resultData.installs.toLocaleString()}\n`;
        if (resultData.revenue) message += `💰 Revenue: $${resultData.revenue.toLocaleString()}\n`;
        if (resultData.confidence) message += `🎯 Confidence: ${resultData.confidence}%\n`;
        if (resultData.processingTime) message += `⚡ Processing: ${resultData.processingTime}ms\n`;
        if (resultData.name) message += `👤 Creator: ${resultData.name}\n`;
        if (resultData.followers) message += `👥 Followers: ${resultData.followers.toLocaleString()}\n`;
        
        message += `\n🎫 Ticket: ${result.ticket.id}`;
        if (result.ticket.learningInsights && result.ticket.learningInsights.length > 0) {
          message += `\n🧠 Insights: ${result.ticket.learningInsights.length} captured`;
        }
        
        alert(message);
      } else {
        // Show error with ticket info
        alert(`❌ ${actionName} Failed!\n\nError: ${result.ticket.errorMessage}\nTicket: ${result.ticket.id}\n\nThis issue has been logged and will be resolved.`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`💥 Unexpected Error in ${actionName}!\n\nError: ${errorMessage}\n\nPlease try again or contact support.`);
    } finally {
      setIsExecuting(false);
      setLastAction(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'degraded': return 'text-yellow-600 bg-yellow-100';
      case 'down': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTicketStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">System Status Dashboard</h2>
            <p className="text-blue-100">Real-time monitoring with bulletproof error handling</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{systemData.stats.systemHealth.toFixed(1)}%</div>
            <div className="text-sm text-blue-200">Overall Health</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{systemData.stats.successRate.toFixed(1)}%</div>
            <div className="text-sm text-blue-200">Success Rate</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{systemData.stats.avgResponseTime.toFixed(0)}ms</div>
            <div className="text-sm text-blue-200">Avg Response</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{systemData.stats.totalTickets}</div>
            <div className="text-sm text-blue-200">Total Tickets</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{systemData.stats.actionableInsights}</div>
            <div className="text-sm text-blue-200">Actionable Insights</div>
          </div>
        </div>
      </div>

      {/* Action Buttons with Real Execution */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-600" />
          Bulletproof Actions {isExecuting && <RefreshCw className="w-4 h-4 animate-spin" />}
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => executeAction('Launch Campaign', () => BulletproofActions.launchCampaign('camp_test_' + Date.now()))}
            disabled={isExecuting}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left disabled:opacity-50"
          >
            <div className="text-green-600 mb-2">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="font-medium">Launch Campaign</div>
            <div className="text-sm text-gray-600">Real ROI & metrics</div>
          </button>

          <button
            onClick={() => executeAction('Test Fraud Detection', () => BulletproofActions.testFraudDetection())}
            disabled={isExecuting}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left disabled:opacity-50"
          >
            <div className="text-red-600 mb-2">
              <Shield className="w-6 h-6" />
            </div>
            <div className="font-medium">Test Fraud Detection</div>
            <div className="text-sm text-gray-600">95%+ confidence</div>
          </button>

          <button
            onClick={() => executeAction('Find New Creators', () => BulletproofActions.findNewCreators())}
            disabled={isExecuting}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left disabled:opacity-50"
          >
            <div className="text-purple-600 mb-2">
              <Eye className="w-6 h-6" />
            </div>
            <div className="font-medium">Find New Creators</div>
            <div className="text-sm text-gray-600">Verified creators</div>
          </button>

          <button
            onClick={() => executeAction('Generate Report', () => BulletproofActions.generateReport('campaign'))}
            disabled={isExecuting}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left disabled:opacity-50"
          >
            <div className="text-blue-600 mb-2">
              <Activity className="w-6 h-6" />
            </div>
            <div className="font-medium">Generate Report</div>
            <div className="text-sm text-gray-600">Performance insights</div>
          </button>
        </div>

        {isExecuting && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-blue-800">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="font-medium">Executing: {lastAction}</span>
            </div>
            <div className="text-sm text-blue-600 mt-1">
              Creating ticket, processing action, capturing insights...
            </div>
          </div>
        )}
      </div>

      {/* Component Health Status */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-600" />
          Component Health Status
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(systemData.health.components).map(([name, component]: [string, any]) => (
            <div key={name} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium capitalize">{name.replace('-', ' ')}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(component.status)}`}>
                  {component.status}
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Response Time</span>
                  <span>{component.responseTime.toFixed(0)}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Error Rate</span>
                  <span>{(component.errorRate * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Check</span>
                  <span>{new Date(component.lastCheck).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          Recent System Tickets
        </h3>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {systemData.tickets.map((ticket: any) => (
            <div key={ticket.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getTicketStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                  <span className="font-medium">{ticket.action.replace('_', ' ')}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(ticket.timestamp).toLocaleTimeString()}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-2">
                Component: {ticket.component} | User: {ticket.userId}
              </div>
              
              {ticket.details.executionTime && (
                <div className="text-sm text-gray-600 mb-2">
                  Execution Time: {ticket.details.executionTime}ms
                </div>
              )}
              
              {ticket.errorMessage && (
                <div className="text-sm text-red-600 mb-2">
                  Error: {ticket.errorMessage}
                </div>
              )}
              
              {ticket.learningInsights && ticket.learningInsights.length > 0 && (
                <div className="text-sm text-green-600">
                  🧠 {ticket.learningInsights.length} insights captured
                </div>
              )}
            </div>
          ))}
          
          {systemData.tickets.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No tickets yet. Click an action button above to generate your first ticket!
            </div>
          )}
        </div>
      </div>

      {/* System Alerts */}
      {systemData.health.alerts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            System Alerts
          </h3>
          
          <div className="space-y-2">
            {systemData.health.alerts.map((alert: any, index: number) => (
              <div key={index} className={`p-3 rounded-lg ${
                alert.level === 'critical' ? 'bg-red-50 text-red-800' :
                alert.level === 'warning' ? 'bg-yellow-50 text-yellow-800' :
                'bg-blue-50 text-blue-800'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{alert.message}</span>
                  <span className="text-sm">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Insights */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-purple-600" />
          AI Learning Insights
        </h3>
        
        <div className="space-y-3">
          {systemData.insights.map((insight: any) => (
            <div key={insight.id} className="border-l-4 border-purple-500 pl-4 py-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-purple-800 capitalize">
                  {insight.category.replace('_', ' ')}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {(insight.confidence * 100).toFixed(0)}% confidence
                  </span>
                  {insight.actionable && !insight.implemented && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                      Actionable
                    </span>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-700">{insight.insight}</div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(insight.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
          
          {systemData.insights.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No insights yet. System will learn from your actions and generate insights automatically.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}