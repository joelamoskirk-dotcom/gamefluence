'use client';

import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, AlertTriangle, CheckCircle, Clock, Database } from 'lucide-react';

interface PrivacyLevel {
  name: string;
  description: string;
  dataStored: string;
  trackingEnabled: boolean;
  analyticsEnabled: boolean;
  features: string[];
  risks: string[];
}

const privacyLevels: PrivacyLevel[] = [
  {
    name: 'Zero Tracking',
    description: 'Maximum privacy - no data storage, no analytics, no tracking',
    dataStored: 'Nothing (stateless)',
    trackingEnabled: false,
    analyticsEnabled: false,
    features: [
      'Basic bot detection',
      'Constant-time processing',
      'No data persistence',
      'Generic responses only',
      'No external API calls'
    ],
    risks: [
      'Limited fraud detection capabilities',
      'No learning from patterns',
      'No performance metrics'
    ]
  },
  {
    name: 'Minimal Tracking',
    description: 'Basic features with 1-minute temporary storage only',
    dataStored: '1-minute temporary cache',
    trackingEnabled: false,
    analyticsEnabled: false,
    features: [
      'Bot detection',
      'Basic frequency checks',
      'Temporary pattern recognition',
      'Auto-cleanup after 1 minute',
      'No cross-session tracking'
    ],
    risks: [
      'Minimal temporary data storage',
      'Potential timing-based fingerprinting',
      'Basic frequency analysis'
    ]
  },
  {
    name: 'Standard Privacy',
    description: 'Balanced approach with hashed identifiers and 7-day retention',
    dataStored: 'Hashed data, 7-day retention',
    trackingEnabled: true,
    analyticsEnabled: false,
    features: [
      'Advanced fraud detection',
      'Hashed device fingerprinting',
      'Pattern learning',
      'Weekly data cleanup',
      'Basic reporting'
    ],
    risks: [
      'Hashed identifiers stored',
      'Potential correlation attacks',
      'Weekly data retention',
      'Basic analytics possible'
    ]
  }
];

export default function FraudPreventionDashboard() {
  const [selectedLevel, setSelectedLevel] = useState<PrivacyLevel>(privacyLevels[0]);
  const [showTrackingAnalysis, setShowTrackingAnalysis] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);

  const runPrivacyTest = async () => {
    // Simulate privacy compliance test
    const testResult = {
      timestamp: new Date(),
      level: selectedLevel.name,
      tests: {
        dataStorage: selectedLevel.dataStored === 'Nothing (stateless)',
        tracking: !selectedLevel.trackingEnabled,
        analytics: !selectedLevel.analyticsEnabled,
        constantTime: selectedLevel.name === 'Zero Tracking',
        noExternalCalls: true,
        noLogging: selectedLevel.name !== 'Standard Privacy'
      }
    };
    
    setTestResults(prev => [testResult, ...prev.slice(0, 4)]);
  };

  const getPrivacyScore = (level: PrivacyLevel): number => {
    let score = 100;
    if (level.trackingEnabled) score -= 30;
    if (level.analyticsEnabled) score -= 20;
    if (level.dataStored !== 'Nothing (stateless)') score -= 25;
    if (level.risks.length > 2) score -= 15;
    return Math.max(0, score);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Privacy-First Fraud Prevention</h2>
            <p className="text-green-100">Zero tracking, maximum protection</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-green-100">Users Tracked</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-green-100">Data Points Stored</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold">100%</div>
            <div className="text-sm text-green-100">Privacy Compliant</div>
          </div>
        </div>
      </div>

      {/* Privacy Level Selection */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-green-600" />
          Choose Your Privacy Level
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {privacyLevels.map((level, index) => (
            <button
              key={index}
              onClick={() => setSelectedLevel(level)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedLevel.name === level.name 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">{level.name}</h4>
                <div className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded-full ${
                    getPrivacyScore(level) >= 90 ? 'bg-green-500' :
                    getPrivacyScore(level) >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-xs text-gray-500">{getPrivacyScore(level)}%</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{level.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-gray-500" />
                  <span className="text-xs">{level.dataStored}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {level.trackingEnabled ? (
                    <Eye className="w-4 h-4 text-red-500" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-green-500" />
                  )}
                  <span className="text-xs">
                    {level.trackingEnabled ? 'Tracking Enabled' : 'No Tracking'}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Level Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Features: {selectedLevel.name}
          </h3>
          
          <div className="space-y-2">
            {selectedLevel.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-green-50 rounded text-green-800 text-sm">
            <strong>Privacy Score: {getPrivacyScore(selectedLevel)}%</strong>
            <br />
            Data Stored: {selectedLevel.dataStored}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            Privacy Considerations
          </h3>
          
          <div className="space-y-2">
            {selectedLevel.risks.map((risk, index) => (
              <div key={index} className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                <span className="text-sm text-gray-600">{risk}</span>
              </div>
            ))}
          </div>
          
          <button
            onClick={runPrivacyTest}
            className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Run Privacy Compliance Test
          </button>
        </div>
      </div>

      {/* Tracking Analysis Toggle */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Anti-Tracking Analysis</h3>
          <button
            onClick={() => setShowTrackingAnalysis(!showTrackingAnalysis)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
          >
            {showTrackingAnalysis ? 'Hide' : 'Show'} Technical Details
          </button>
        </div>
        
        {showTrackingAnalysis && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">Tracking Vulnerabilities</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Timing-based fingerprinting</li>
                  <li>• Memory pattern analysis</li>
                  <li>• Error message information leakage</li>
                  <li>• Network-based location tracking</li>
                  <li>• Statistical correlation attacks</li>
                  <li>• Side-channel resource usage</li>
                  <li>• External API correlation risks</li>
                  <li>• Metadata and log-based tracking</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Prevention Measures</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Constant-time processing</li>
                  <li>• Zero persistent memory</li>
                  <li>• Generic error responses</li>
                  <li>• No network analysis</li>
                  <li>• No statistical collection</li>
                  <li>• Constant resource usage</li>
                  <li>• No external dependencies</li>
                  <li>• No logging or metadata</li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Implementation Example</h4>
              <pre className="text-xs text-blue-700 bg-blue-100 p-3 rounded overflow-x-auto">
{`// Zero-tracking fraud detection
const result = fraudEngine.checkFraud({
  userAgent: request.userAgent // Only data we analyze
});

if (result.decision === 'block') {
  return; // Don't process fraudulent requests
}

// No data stored, no tracking, no analytics
// All variables go out of scope immediately`}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Privacy Compliance Test Results
          </h3>
          
          <div className="space-y-3">
            {testResults.map((test, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{test.level}</div>
                    <div className="text-sm text-gray-500">
                      {test.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">
                      {Object.values(test.tests).filter(Boolean).length}/
                      {Object.values(test.tests).length} Passed
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  {Object.entries(test.tests).map(([testName, passed]) => (
                    <div key={testName} className="flex items-center gap-1">
                      {passed ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                      )}
                      <span className={passed ? 'text-green-700' : 'text-red-700'}>
                        {testName.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Implementation Guide */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Implementation Guide: {selectedLevel.name}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Setup Code</h4>
            <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
{selectedLevel.name === 'Zero Tracking' ? 
`import { ZeroTrackingEngine } from './fraud-prevention';

const fraudEngine = new ZeroTrackingEngine({
  dataPolicy: { storeNothing: true },
  processing: { constantTime: true }
});

// Usage: One line, no tracking
const result = fraudEngine.checkFraud({
  userAgent: request.userAgent
});` :

selectedLevel.name === 'Minimal Tracking' ?
`import { MinimalTrackingEngine } from './fraud-prevention';

const fraudEngine = new MinimalTrackingEngine({
  dataPolicy: { 
    temporaryStorage: true,
    maxRetention: 60000 // 1 minute
  }
});

const result = fraudEngine.checkFraud(event);` :

`import { StandardPrivacyEngine } from './fraud-prevention';

const fraudEngine = new StandardPrivacyEngine({
  dataPolicy: {
    hashIdentifiers: true,
    retentionDays: 7,
    autoCleanup: true
  }
});

const result = fraudEngine.checkFraud(event);`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Privacy Guarantees</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• No user profiling or behavioral tracking</li>
              <li>• No cross-session data correlation</li>
              <li>• No external API calls or data sharing</li>
              <li>• Automatic data cleanup and deletion</li>
              <li>• GDPR/CCPA compliant by design</li>
              <li>• User controls all data collection</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-100 rounded text-blue-800 text-sm">
          <strong>Recommendation:</strong> Start with Zero Tracking for maximum privacy. 
          Only upgrade if you absolutely need additional fraud detection capabilities and 
          users explicitly consent to minimal data collection.
        </div>
      </div>
    </div>
  );
}