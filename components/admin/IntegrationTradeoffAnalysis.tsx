'use client';

import React, { useState } from 'react';
import { Shield, Zap, DollarSign, Clock, Users, Lock, CheckCircle, AlertTriangle } from 'lucide-react';

interface IntegrationOption {
  name: string;
  description: string;
  timeToImplement: string;
  cost: string;
  complexity: 'Low' | 'Medium' | 'High';
  privacy: 'Basic' | 'Good' | 'Excellent';
  features: string[];
  pros: string[];
  cons: string[];
  recommendedFor: string[];
}

const integrationOptions: IntegrationOption[] = [
  {
    name: 'Simple SDK Integration',
    description: 'Lightweight fraud prevention that integrates with your existing MMP setup',
    timeToImplement: '1-2 days',
    cost: '$99/month flat rate',
    complexity: 'Low',
    privacy: 'Excellent',
    features: [
      'Basic fraud detection',
      'Privacy-first design',
      'Auto-cleanup of data',
      'Push notifications on fraud',
      'Simple analytics'
    ],
    pros: [
      'Easy to implement (2-3 lines of code)',
      'No enterprise API needed',
      'Works with existing MMP setup',
      'Privacy-first by default',
      'Low maintenance',
      'Immediate ROI'
    ],
    cons: [
      'Less customization',
      'Basic reporting only',
      'Limited enterprise features'
    ],
    recommendedFor: [
      'Small to medium gaming studios',
      'Privacy-conscious companies',
      'Quick implementation needs',
      'Budget-conscious teams'
    ]
  },
  {
    name: 'Enterprise API Integration',
    description: 'Full-featured fraud prevention with advanced analytics and customization',
    timeToImplement: '2-4 weeks',
    cost: '$500-2000/month + usage',
    complexity: 'High',
    privacy: 'Good',
    features: [
      'Advanced fraud detection',
      'Custom rule engine',
      'Real-time analytics',
      'White-label options',
      'SLA guarantees',
      'Dedicated support',
      'Batch processing',
      'Advanced reporting'
    ],
    pros: [
      'Full customization',
      'Advanced analytics',
      'White-label options',
      'SLA guarantees',
      'Dedicated support',
      'Enterprise-grade features'
    ],
    cons: [
      'Complex implementation',
      'Higher cost',
      'Longer setup time',
      'More maintenance',
      'Potential privacy concerns'
    ],
    recommendedFor: [
      'Large gaming companies',
      'Enterprise clients',
      'Custom integration needs',
      'Advanced analytics requirements'
    ]
  },
  {
    name: 'Hybrid Approach',
    description: 'Start simple, upgrade to enterprise features as needed',
    timeToImplement: '1 day start, 1 week full',
    cost: '$99/month → $500+/month',
    complexity: 'Medium',
    privacy: 'Good',
    features: [
      'Progressive feature adoption',
      'Scalable pricing',
      'Privacy controls',
      'Gradual complexity increase',
      'Migration path included'
    ],
    pros: [
      'Start simple, upgrade later',
      'Privacy controls',
      'Gradual feature adoption',
      'Cost effective scaling',
      'Best of both worlds'
    ],
    cons: [
      'Two integration points',
      'Migration complexity',
      'Potential confusion'
    ],
    recommendedFor: [
      'Growing gaming studios',
      'Uncertain requirements',
      'Gradual scaling needs',
      'Risk-averse teams'
    ]
  }
];

export default function IntegrationTradeoffAnalysis() {
  const [selectedOption, setSelectedOption] = useState<IntegrationOption | null>(null);
  const [privacyLevel, setPrivacyLevel] = useState<'minimal' | 'standard' | 'enhanced'>('standard');

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'High': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPrivacyColor = (privacy: string) => {
    switch (privacy) {
      case 'Excellent': return 'text-green-600 bg-green-50';
      case 'Good': return 'text-blue-600 bg-blue-50';
      case 'Basic': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Integration Approach Analysis</h2>
            <p className="text-blue-100">Choose the right fraud prevention integration for your needs</p>
          </div>
        </div>
      </div>

      {/* Privacy Level Selector */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-green-600" />
          Privacy & Data Control Level
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['minimal', 'standard', 'enhanced'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setPrivacyLevel(level)}
              className={`p-4 rounded-lg border-2 transition-all ${
                privacyLevel === level 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-left">
                <div className="font-medium capitalize">{level} Privacy</div>
                <div className="text-sm text-gray-600 mt-1">
                  {level === 'minimal' && 'Hash all data, 7-day retention, no geolocation'}
                  {level === 'standard' && 'Balanced privacy, 30-day retention, basic tracking'}
                  {level === 'enhanced' && 'Full features, 90-day retention, comprehensive analytics'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Integration Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {integrationOptions.map((option, index) => (
          <div 
            key={index}
            className={`bg-white rounded-lg shadow-sm border-2 transition-all cursor-pointer ${
              selectedOption?.name === option.name 
                ? 'border-blue-500 shadow-md' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedOption(option)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold">{option.name}</h3>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getComplexityColor(option.complexity)}`}>
                    {option.complexity}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPrivacyColor(option.privacy)}`}>
                    {option.privacy}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{option.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{option.timeToImplement}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{option.cost}</span>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="text-sm font-medium text-gray-700 mb-2">Key Features:</div>
                  <div className="space-y-1">
                    {option.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                    {option.features.length > 3 && (
                      <div className="text-xs text-gray-500">+{option.features.length - 3} more features</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Analysis */}
      {selectedOption && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">
            Detailed Analysis: {selectedOption.name}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pros & Cons */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-green-700 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Advantages
                </h4>
                <ul className="space-y-1">
                  {selectedOption.pros.map((pro, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-red-700 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Considerations
                </h4>
                <ul className="space-y-1">
                  {selectedOption.cons.map((con, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Recommended For */}
            <div>
              <h4 className="font-medium text-blue-700 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Recommended For
              </h4>
              <ul className="space-y-1">
                {selectedOption.recommendedFor.map((rec, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-2">Implementation Code Sample</h5>
                <pre className="text-xs text-blue-700 bg-blue-100 p-3 rounded overflow-x-auto">
{selectedOption.name === 'Simple SDK Integration' ? `// Simple integration - 2 lines of code
import { createFraudChecker } from '@gamefluence/fraud-prevention';

const fraudChecker = createFraudChecker({
  privacyLevel: '${privacyLevel}',
  pushOnBlock: true
});

// In your MMP event handler
const result = fraudChecker.check(event);
if (result.action === 'block') return; // Don't attribute` :

selectedOption.name === 'Enterprise API Integration' ? `// Enterprise API integration
const response = await fetch('https://api.gamefluence.com/fraud/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    events: batchOfEvents,
    privacyLevel: '${privacyLevel}',
    config: customRules
  })
});` :

`// Hybrid approach - start simple
const fraudChecker = createFraudChecker({ 
  mode: 'simple',
  privacyLevel: '${privacyLevel}'
});

// Upgrade when ready
fraudChecker.enableEnterpriseFeatures({
  apiKey: 'your-key',
  customRules: true
});`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Impact Analysis */}
      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Privacy Impact with {privacyLevel.charAt(0).toUpperCase() + privacyLevel.slice(1)} Level
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-green-800 mb-2">Data Collection</h4>
            <ul className="space-y-1 text-green-700">
              {privacyLevel === 'minimal' && (
                <>
                  <li>• Hashed device IDs only</li>
                  <li>• No IP address storage</li>
                  <li>• No geolocation tracking</li>
                  <li>• Basic bot detection</li>
                </>
              )}
              {privacyLevel === 'standard' && (
                <>
                  <li>• Hashed identifiers</li>
                  <li>• IP reputation checks</li>
                  <li>• Basic geolocation</li>
                  <li>• Behavioral patterns</li>
                </>
              )}
              {privacyLevel === 'enhanced' && (
                <>
                  <li>• Full device fingerprinting</li>
                  <li>• IP analysis & reputation</li>
                  <li>• Geolocation tracking</li>
                  <li>• Advanced behavioral analysis</li>
                </>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-green-800 mb-2">Data Retention</h4>
            <ul className="space-y-1 text-green-700">
              <li>• Auto-delete after {privacyLevel === 'minimal' ? '7' : privacyLevel === 'standard' ? '30' : '90'} days</li>
              <li>• Anonymize after {privacyLevel === 'minimal' ? '1' : privacyLevel === 'standard' ? '24' : '72'} hours</li>
              <li>• No permanent storage</li>
              <li>• User can delete anytime</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-green-800 mb-2">User Control</h4>
            <ul className="space-y-1 text-green-700">
              <li>• Opt-in data collection</li>
              <li>• Granular consent controls</li>
              <li>• Real-time privacy updates</li>
              <li>• GDPR compliant</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-green-100 rounded text-green-800 text-sm">
          <strong>Privacy Guarantee:</strong> You control when and what data is shared. No tracking without explicit consent. All data is hashed and auto-deleted based on your retention policy.
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Our Recommendation
        </h3>
        
        <div className="text-blue-800">
          <p className="mb-3">
            <strong>For most gaming studios:</strong> Start with the <strong>Simple SDK Integration</strong> approach.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Why Simple SDK?</h4>
              <ul className="space-y-1">
                <li>• Get fraud protection in 1-2 days</li>
                <li>• Privacy-first design builds user trust</li>
                <li>• $99/month is immediately ROI positive</li>
                <li>• No vendor lock-in or complex contracts</li>
                <li>• Works with your existing MMP setup</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Upgrade Path</h4>
              <ul className="space-y-1">
                <li>• Start simple, prove value quickly</li>
                <li>• Upgrade to enterprise when needed</li>
                <li>• No migration complexity</li>
                <li>• Scale pricing with your growth</li>
                <li>• Always maintain privacy controls</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}