'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface CollaborationInsight {
  id: string;
  type: 'cross_pollination' | 'audience_overlap' | 'viral_amplification' | 'brand_synergy';
  title: string;
  description: string;
  impact: number;
  confidence: number;
  creators: string[];
  metrics: {
    reachMultiplier: number;
    engagementBoost: number;
    costEfficiency: number;
    viralPotential: number;
  };
  recommendation: string;
}

interface PredictionEngine {
  accuracy: number;
  confidence: number;
  factors: Array<{
    factor: string;
    weight: number;
    impact: 'positive' | 'negative' | 'neutral';
    confidence: number;
  }>;
  predictions: {
    reach: { min: number; max: number; predicted: number };
    downloads: { min: number; max: number; predicted: number };
    cpa: { min: number; max: number; predicted: number };
    roas: { min: number; max: number; predicted: number };
  };
}

export default function EnhancedCampaignDashboard() {
  const [activeView, setActiveView] = useState('overview');
  const [collaborationInsights, setCollaborationInsights] = useState<CollaborationInsight[]>([]);
  const [predictionEngine, setPredictionEngine] = useState<PredictionEngine | null>(null);

  useEffect(() => {
    // Load enhanced collaboration insights from Campaign 1 data
    const insights: CollaborationInsight[] = [
      {
        id: 'collab_001',
        type: 'cross_pollination',
        title: 'Creator Audience Cross-Pollination Opportunity',
        description: 'Linh Speed Queen and Duc Car Master share 23% audience overlap with 67% untapped reach potential',
        impact: 8.7,
        confidence: 0.89,
        creators: ['Linh Speed Queen', 'Duc Car Master'],
        metrics: {
          reachMultiplier: 1.67,
          engagementBoost: 0.23,
          costEfficiency: 0.31,
          viralPotential: 0.78
        },
        recommendation: 'Coordinate content release within 48 hours for maximum cross-pollination effect'
      },
      {
        id: 'collab_002',
        type: 'viral_amplification',
        title: 'TikTok Viral Chain Reaction Detected',
        description: 'Racing challenge format from Huy Arcade Master triggered 340% engagement spike across 3 other creators',
        impact: 9.2,
        confidence: 0.94,
        creators: ['Huy Arcade Master', 'Mai Game Girl', 'Nam Drift King', 'Tuan Mobile Gamer'],
        metrics: {
          reachMultiplier: 3.4,
          engagementBoost: 2.1,
          costEfficiency: 0.85,
          viralPotential: 0.94
        },
        recommendation: 'Replicate challenge format with automotive brand integration for Campaign 2'
      },
      {
        id: 'collab_003',
        type: 'audience_overlap',
        title: 'Untapped Female Gaming Audience',
        description: 'Mai Game Girl and Thao Racing Rookie combined reach 78% unique female audience aged 16-28',
        impact: 7.8,
        confidence: 0.82,
        creators: ['Mai Game Girl', 'Thao Racing Rookie'],
        metrics: {
          reachMultiplier: 1.78,
          engagementBoost: 0.45,
          costEfficiency: 0.22,
          viralPotential: 0.61
        },
        recommendation: 'Target female-focused automotive brands (Honda, Toyota) for partnership integration'
      },
      {
        id: 'collab_004',
        type: 'brand_synergy',
        title: 'Automotive Brand Integration Sweet Spot',
        description: 'Car culture content from Duc Car Master drove 156% higher brand recall for Honda partnership',
        impact: 8.9,
        confidence: 0.91,
        creators: ['Duc Car Master'],
        metrics: {
          reachMultiplier: 1.56,
          engagementBoost: 0.89,
          costEfficiency: 0.67,
          viralPotential: 0.73
        },
        recommendation: 'Expand automotive partnerships to Red Bull Racing, BMW, Mercedes for Campaign 2'
      }
    ];

    // Enhanced prediction engine with Campaign 1 learnings
    const predictions: PredictionEngine = {
      accuracy: 0.73, // Improved from 0.65 baseline
      confidence: 0.84,
      factors: [
        { factor: 'Creator Collaboration Synergy', weight: 0.28, impact: 'positive', confidence: 0.89 },
        { factor: 'Viral Content Format Replication', weight: 0.24, impact: 'positive', confidence: 0.94 },
        { factor: 'Automotive Brand Integration', weight: 0.19, impact: 'positive', confidence: 0.91 },
        { factor: 'Female Audience Expansion', weight: 0.15, impact: 'positive', confidence: 0.82 },
        { factor: 'Market Saturation Risk', weight: 0.14, impact: 'negative', confidence: 0.67 }
      ],
      predictions: {
        reach: { min: 18500000, max: 24200000, predicted: 21350000 },
        downloads: { min: 72000, max: 95000, predicted: 83500 },
        cpa: { min: 1.65, max: 2.10, predicted: 1.87 },
        roas: { min: 3.8, max: 4.6, predicted: 4.2 }
      }
    };

    setCollaborationInsights(insights);
    setPredictionEngine(predictions);
  }, []);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Campaign Performance Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            Campaign 1 Results
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Reach</span>
              <span className="font-semibold">12.5M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Downloads</span>
              <span className="font-semibold">50,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">CPA</span>
              <span className="font-semibold text-green-600">$2.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">ROAS</span>
              <span className="font-semibold text-green-600">3.2x</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Collaboration Score</span>
              <span className="font-semibold text-yellow-600">6.8/10</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
            Campaign 2 Projections
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Projected Reach</span>
              <span className="font-semibold text-purple-600">21.4M (+71%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Projected Downloads</span>
              <span className="font-semibold text-purple-600">83,500 (+67%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Projected CPA</span>
              <span className="font-semibold text-green-600">$1.87 (-7%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Projected ROAS</span>
              <span className="font-semibold text-green-600">4.2x (+31%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Collaboration Score</span>
              <span className="font-semibold text-green-600">9.1/10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Prediction Engine Accuracy */}
      <div className="card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-purple-900">AI Prediction Engine v2.0</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-purple-700">Accuracy: {(predictionEngine?.accuracy || 0 * 100).toFixed(1)}%</span>
            <div className="w-16 bg-purple-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${(predictionEngine?.accuracy || 0) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-purple-800 mb-2">Key Improvement Factors</h4>
            <div className="space-y-2">
              {predictionEngine?.factors.slice(0, 3).map((factor, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-purple-700">{factor.factor}</span>
                  <span className="font-medium text-purple-900">+{(factor.weight * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-purple-800 mb-2">Confidence Intervals</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-700">Downloads:</span>
                <span className="font-medium text-purple-900">
                  {predictionEngine?.predictions.downloads.min.toLocaleString()} - {predictionEngine?.predictions.downloads.max.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700">CPA:</span>
                <span className="font-medium text-purple-900">
                  ${predictionEngine?.predictions.cpa.min} - ${predictionEngine?.predictions.cpa.max}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700">ROAS:</span>
                <span className="font-medium text-purple-900">
                  {predictionEngine?.predictions.roas.min}x - {predictionEngine?.predictions.roas.max}x
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCollaborationInsights = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Collaboration Intelligence</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">Live Analysis</span>
        </div>
      </div>

      {collaborationInsights.map((insight) => (
        <div key={insight.id} className="card border-l-4 border-l-blue-500">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-semibold text-lg">{insight.title}</h4>
              <p className="text-gray-600 text-sm mt-1">{insight.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{insight.impact}/10</div>
              <div className="text-xs text-gray-500">Impact Score</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">
                {(insight.metrics.reachMultiplier * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-gray-500">Reach Multiplier</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">
                +{(insight.metrics.engagementBoost * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-gray-500">Engagement Boost</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-purple-600">
                {(insight.metrics.costEfficiency * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-gray-500">Cost Efficiency</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-600">
                {(insight.metrics.viralPotential * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-gray-500">Viral Potential</div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 mb-3">
            <h5 className="font-medium text-blue-900 mb-1">Involved Creators</h5>
            <div className="flex flex-wrap gap-2">
              {insight.creators.map((creator) => (
                <span key={creator} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                  {creator}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-3">
            <h5 className="font-medium text-green-900 mb-1">AI Recommendation</h5>
            <p className="text-green-800 text-sm">{insight.recommendation}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCampaign2Builder = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Ozzy Arcade Campaign 2</h2>
        <p className="text-gray-600">Enhanced with AI-powered collaboration insights</p>
      </div>

      {/* Enhanced Budget Allocation */}
      <div className="card">
        <h3 className="font-semibold mb-4">Smart Budget Allocation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Creator Collaborations</h4>
            <div className="text-2xl font-bold text-blue-600 mb-1">$75,000</div>
            <div className="text-sm text-blue-700">50% of budget</div>
            <div className="text-xs text-blue-600 mt-2">+25% vs Campaign 1</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Brand Partnerships</h4>
            <div className="text-2xl font-bold text-green-600 mb-1">$45,000</div>
            <div className="text-sm text-green-700">30% of budget</div>
            <div className="text-xs text-green-600 mt-2">New revenue stream</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">Performance Bonus</h4>
            <div className="text-2xl font-bold text-purple-600 mb-1">$30,000</div>
            <div className="text-sm text-purple-700">20% of budget</div>
            <div className="text-xs text-purple-600 mt-2">Results-based</div>
          </div>
        </div>
      </div>

      {/* Collaboration Strategy */}
      <div className="card">
        <h3 className="font-semibold mb-4">Enhanced Collaboration Strategy</h3>
        <div className="space-y-4">
          <div className="border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Cross-Pollination Pods</h4>
            <p className="text-sm text-gray-600 mb-3">Coordinated content release for maximum audience overlap</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded p-3">
                <div className="font-medium">Pod 1: Speed Queens</div>
                <div className="text-sm text-gray-600">Linh Speed Queen + Mai Game Girl</div>
                <div className="text-xs text-green-600 mt-1">Expected: +67% reach multiplier</div>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <div className="font-medium">Pod 2: Car Masters</div>
                <div className="text-sm text-gray-600">Duc Car Master + Nam Drift King</div>
                <div className="text-xs text-green-600 mt-1">Expected: +89% engagement boost</div>
              </div>
            </div>
          </div>

          <div className="border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Viral Challenge Integration</h4>
            <p className="text-sm text-gray-600 mb-3">Replicate successful challenge format with brand integration</p>
            <div className="bg-green-50 rounded p-3">
              <div className="font-medium">#OzzyDriftChallenge</div>
              <div className="text-sm text-gray-600">Honda Racing x Red Bull partnership</div>
              <div className="text-xs text-green-600 mt-1">Projected: 340% engagement spike</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Projections */}
      <div className="card bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <h3 className="font-semibold text-green-900 mb-4">Campaign 2 Performance Projections</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">21.4M</div>
            <div className="text-sm text-green-700">Projected Reach</div>
            <div className="text-xs text-green-600">+71% vs Campaign 1</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">83.5K</div>
            <div className="text-sm text-blue-700">Projected Downloads</div>
            <div className="text-xs text-blue-600">+67% vs Campaign 1</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">$1.87</div>
            <div className="text-sm text-purple-700">Projected CPA</div>
            <div className="text-xs text-purple-600">-7% vs Campaign 1</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">4.2x</div>
            <div className="text-sm text-orange-700">Projected ROAS</div>
            <div className="text-xs text-orange-600">+31% vs Campaign 1</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button className="px-8 py-3 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
          Launch Enhanced Campaign 2
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveView('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeView === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Campaign Overview
          </button>
          <button
            onClick={() => setActiveView('collaboration')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeView === 'collaboration'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Collaboration Insights
          </button>
          <button
            onClick={() => setActiveView('campaign2')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeView === 'campaign2'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Campaign 2 Builder
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeView === 'overview' && renderOverview()}
      {activeView === 'collaboration' && renderCollaborationInsights()}
      {activeView === 'campaign2' && renderCampaign2Builder()}
    </div>
  );
}