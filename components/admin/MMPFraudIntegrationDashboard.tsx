'use client';

import React, { useState, useEffect } from 'react';
import { Shield, TrendingUp, AlertTriangle, CheckCircle, Clock, Target } from 'lucide-react';
import { mmpFraudIntegration } from '@/lib/mmp-fraud-integration';

interface IntegrationMetrics {
  levelset_performance: {
    fraud_rate: number;
    industry_benchmark: number;
    performance_ranking: string;
    revenue_protected: number;
    cost_savings: number;
  };
  integration_stats: {
    total_events_processed: number;
    approved_events: number;
    rejected_events: number;
    pending_review: number;
    avg_processing_time_ms: number;
  };
  mmp_compatibility: {
    appsflyer_protect360: boolean;
    adjust_fraud_prevention: boolean;
    singular_fraud_detection: boolean;
    branch_fraud_protection: boolean;
  };
  compliance_status: {
    industry_standards_met: number;
    fraud_detection_methods: string[];
    certifications: string[];
  };
}

export default function MMPFraudIntegrationDashboard() {
  const [metrics, setMetrics] = useState<IntegrationMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [testResults, setTestResults] = useState<any[]>([]);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const data = mmpFraudIntegration.getIntegrationMetrics();
      setMetrics(data);
    } catch (error) {
      console.error('Failed to load metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const runIntegrationTest = async (platform: string) => {
    const testEvent = {
      event_name: 'install',
      event_time: new Date().toISOString(),
      device_id: `test_device_${Date.now()}`,
      ip: '192.168.1.100',
      user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
      device_type: 'mobile',
      os_name: 'iOS',
      os_version: '15.0',
      app_version: '1.0.0',
      country_code: 'US',
      media_source: platform,
      campaign: 'test_campaign'
    };

    try {
      const result = await mmpFraudIntegration.analyzeFraudEvent(testEvent);
      setTestResults(prev => [...prev, { platform, result, timestamp: new Date() }]);
    } catch (error) {
      console.error(`Test failed for ${platform}:`, error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="text-center text-gray-500">
          Failed to load integration metrics
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Level Set™ MMP Integration</h2>
            <p className="text-purple-100">Real-time fraud prevention for all major MMP platforms</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">{metrics.levelset_performance.fraud_rate}%</div>
            <div className="text-sm text-purple-100">Fraud Rate (Industry: {metrics.levelset_performance.industry_benchmark}%)</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">${(metrics.levelset_performance.revenue_protected / 1000).toFixed(0)}K</div>
            <div className="text-sm text-purple-100">Revenue Protected</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">{metrics.integration_stats.avg_processing_time_ms}ms</div>
            <div className="text-sm text-purple-100">Avg Processing Time</div>
          </div>
        </div>
      </div>

      {/* MMP Platform Compatibility */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          MMP Platform Integration Status
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(metrics.mmp_compatibility).map(([platform, enabled]) => (
            <div key={platform} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium capitalize">
                  {platform.replace('_', ' ').replace('appsflyer', 'AppsFlyer')}
                </div>
                {enabled ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-gray-400" />
                )}
              </div>
              
              <div className={`text-sm ${enabled ? 'text-green-600' : 'text-gray-500'}`}>
                {enabled ? 'Active Integration' : 'Not Configured'}
              </div>
              
              <button
                onClick={() => runIntegrationTest(platform)}
                className="mt-2 w-full px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
              >
                Test Integration
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Processing Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Event Processing Statistics
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Events Processed</span>
              <span className="font-semibold">{metrics.integration_stats.total_events_processed.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Approved Events</span>
              <span className="font-semibold text-green-600">{metrics.integration_stats.approved_events.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Rejected Events</span>
              <span className="font-semibold text-red-600">{metrics.integration_stats.rejected_events.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending Review</span>
              <span className="font-semibold text-yellow-600">{metrics.integration_stats.pending_review.toLocaleString()}</span>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Approval Rate</span>
                <span className="font-semibold text-blue-600">
                  {((metrics.integration_stats.approved_events / metrics.integration_stats.total_events_processed) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Compliance */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            Industry Compliance & Standards
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Standards Met</span>
                <span className="font-semibold">{metrics.compliance_status.industry_standards_met}/15</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(metrics.compliance_status.industry_standards_met / 15) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Detection Methods</div>
              <div className="text-xs text-gray-600 space-y-1">
                {metrics.compliance_status.fraud_detection_methods.slice(0, 4).map((method, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    {method}
                  </div>
                ))}
                <div className="text-gray-500">+{metrics.compliance_status.fraud_detection_methods.length - 4} more...</div>
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Certifications</div>
              <div className="flex flex-wrap gap-2">
                {metrics.compliance_status.certifications.map((cert, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            Integration Test Results
          </h3>
          
          <div className="space-y-3">
            {testResults.slice(-5).map((test, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium capitalize">{test.platform}</div>
                    <div className="text-sm text-gray-500">
                      {test.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    test.result.status === 'approved' ? 'bg-green-100 text-green-800' :
                    test.result.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {test.result.status}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Fraud Score</div>
                    <div className="font-medium">{test.result.fraud_score}/100</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Processing Time</div>
                    <div className="font-medium">{test.result.processing_time_ms}ms</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Confidence</div>
                    <div className="font-medium">{test.result.levelset_confidence}%</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Protect360 Status</div>
                    <div className="font-medium capitalize">{test.result.protect360_status}</div>
                  </div>
                </div>
                
                {test.result.fraud_reasons.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="text-sm text-gray-600 mb-1">Fraud Signals:</div>
                    <div className="text-xs text-gray-500">
                      {test.result.fraud_reasons.slice(0, 2).join('; ')}
                      {test.result.fraud_reasons.length > 2 && '...'}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Integration Guide */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          MMP Integration Setup Guide
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">AppsFlyer Protect360</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• Configure webhook URL in AppsFlyer dashboard</li>
              <li>• Set fraud threshold to 70+ for optimal performance</li>
              <li>• Enable real-time fraud prevention</li>
              <li>• Map custom fraud rules to Level Set™ signals</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Adjust Fraud Prevention</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• Add fraud prevention token to configuration</li>
              <li>• Set rejection threshold to 80+ for strict filtering</li>
              <li>• Enable SDK signature validation</li>
              <li>• Configure attribution window settings</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-100 rounded text-blue-800 text-sm">
          <strong>Performance Guarantee:</strong> Level Set™ maintains &lt;2ms additional latency while providing industry-leading fraud detection accuracy of 98.5%+
        </div>
      </div>
    </div>
  );
}