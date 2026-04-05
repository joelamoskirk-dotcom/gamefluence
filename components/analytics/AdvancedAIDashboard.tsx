'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Zap, 
  Users, 
  Eye,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Activity,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Clock
} from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'optimization' | 'prediction' | 'alert' | 'opportunity';
  title: string;
  description: string;
  confidence: number;
  impact: number;
  timeframe: string;
  actionable: boolean;
  metrics: {
    current: number;
    predicted: number;
    change: number;
  };
}

interface IncrementalityData {
  baselineReach: number;
  incrementalReach: number;
  liftPercentage: number;
  attribution: {
    direct: number;
    viewThrough: number;
    crossPlatform: number;
    viral: number;
  };
  frequency: {
    optimal: number;
    current: number;
    saturation: number;
  };
}

interface CreatorSynergy {
  creator1: string;
  creator2: string;
  synergyScore: number;
  audienceOverlap: number;
  crossPollination: number;
  recommendedBudgetSplit: [number, number];
}

export default function AdvancedAIDashboard() {
  const [activeTab, setActiveTab] = useState('insights');
  const [realTimeData, setRealTimeData] = useState<any>(null);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [incrementalityData, setIncrementalityData] = useState<IncrementalityData | null>(null);
  const [creatorSynergies, setCreatorSynergies] = useState<CreatorSynergy[]>([]);

  useEffect(() => {
    loadAIInsights();
    loadIncrementalityData();
    loadCreatorSynergies();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      updateRealTimeData();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const loadAIInsights = () => {
    const insights: AIInsight[] = [
      {
        id: 'insight_1',
        type: 'optimization',
        title: 'TikTok Performance Surge Detected',
        description: 'TikTok content showing 67% higher engagement than predicted. Recommend increasing TikTok budget allocation by 25%.',
        confidence: 0.94,
        impact: 0.34,
        timeframe: '2-4 hours',
        actionable: true,
        metrics: {
          current: 8.7,
          predicted: 12.2,
          change: 0.40
        }
      },
      {
        id: 'insight_2',
        type: 'prediction',
        title: 'Weekend Performance Spike Incoming',
        description: 'Historical data indicates 89% higher conversion rates on weekends for racing content. Prepare additional budget.',
        confidence: 0.87,
        impact: 0.28,
        timeframe: '48 hours',
        actionable: true,
        metrics: {
          current: 3.2,
          predicted: 6.1,
          change: 0.91
        }
      },
      {
        id: 'insight_3',
        type: 'alert',
        title: 'Creator Fatigue Warning',
        description: 'Mai Game Girl showing declining engagement (-15% over 3 days). Consider content refresh or temporary pause.',
        confidence: 0.78,
        impact: -0.18,
        timeframe: '24 hours',
        actionable: true,
        metrics: {
          current: 9.2,
          predicted: 7.8,
          change: -0.15
        }
      },
      {
        id: 'insight_4',
        type: 'opportunity',
        title: 'Cross-Platform Amplification Opportunity',
        description: 'TikTok content driving 340% more YouTube traffic than expected. Optimize cross-platform content strategy.',
        confidence: 0.91,
        impact: 0.45,
        timeframe: '1 week',
        actionable: true,
        metrics: {
          current: 12500,
          predicted: 42500,
          change: 2.40
        }
      }
    ];
    
    setAiInsights(insights);
  };

  const loadIncrementalityData = () => {
    const data: IncrementalityData = {
      baselineReach: 2100000,
      incrementalReach: 10400000,
      liftPercentage: 495.2,
      attribution: {
        direct: 68.5,
        viewThrough: 18.3,
        crossPlatform: 8.7,
        viral: 4.5
      },
      frequency: {
        optimal: 3.2,
        current: 2.8,
        saturation: 8.5
      }
    };
    
    setIncrementalityData(data);
  };

  const loadCreatorSynergies = () => {
    const synergies: CreatorSynergy[] = [
      {
        creator1: 'Mai Game Girl',
        creator2: 'Thao Racing Rookie',
        synergyScore: 89.2,
        audienceOverlap: 23.5,
        crossPollination: 67.8,
        recommendedBudgetSplit: [60, 40]
      },
      {
        creator1: 'Duc Speed Demon',
        creator2: 'Linh Drift Queen',
        synergyScore: 92.6,
        audienceOverlap: 31.2,
        crossPollination: 78.4,
        recommendedBudgetSplit: [55, 45]
      }
    ];
    
    setCreatorSynergies(synergies);
  };

  const updateRealTimeData = () => {
    setRealTimeData({
      timestamp: new Date(),
      aiAccuracy: 89.2 + (Math.random() - 0.5) * 2,
      predictionConfidence: 84.7 + (Math.random() - 0.5) * 3,
      optimizationsActive: 7 + Math.floor(Math.random() * 3),
      incrementalLift: 374.9 + (Math.random() - 0.5) * 20
    });
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <Zap className="w-5 h-5 text-blue-500" />;
      case 'prediction': return <Brain className="w-5 h-5 text-purple-500" />;
      case 'alert': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'opportunity': return <Lightbulb className="w-5 h-5 text-green-500" />;
      default: return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'optimization': return 'bg-blue-50 border-blue-200';
      case 'prediction': return 'bg-purple-50 border-purple-200';
      case 'alert': return 'bg-orange-50 border-orange-200';
      case 'opportunity': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Brain className="w-8 h-8 text-primary" />
            Advanced AI Dashboard
          </h2>
          <p className="text-gray-600">Real-time attribution, incrementality, and optimization insights</p>
        </div>
        
        {realTimeData && (
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live AI Analysis</span>
            </div>
            <div className="text-gray-500">
              Updated {new Date(realTimeData.timestamp).toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>

      {/* Real-time AI Metrics */}
      {realTimeData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AI Accuracy</p>
                <p className="text-2xl font-bold text-primary">{realTimeData.aiAccuracy.toFixed(1)}%</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Target className="text-primary" />
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Prediction Confidence</p>
                <p className="text-2xl font-bold text-secondary">{realTimeData.predictionConfidence.toFixed(1)}%</p>
              </div>
              <div className="bg-secondary/10 p-3 rounded-full">
                <Brain className="text-secondary" />
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Optimizations</p>
                <p className="text-2xl font-bold text-accent">{realTimeData.optimizationsActive}</p>
              </div>
              <div className="bg-accent/10 p-3 rounded-full">
                <Zap className="text-accent" />
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Incremental Lift</p>
                <p className="text-2xl font-bold text-success">{realTimeData.incrementalLift.toFixed(0)}%</p>
              </div>
              <div className="bg-success/10 p-3 rounded-full">
                <TrendingUp className="text-success" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b pb-4">
        {[
          { id: 'insights', label: 'AI Insights', icon: Brain },
          { id: 'incrementality', label: 'Incrementality', icon: TrendingUp },
          { id: 'attribution', label: 'Attribution', icon: Target },
          { id: 'synergies', label: 'Creator Synergies', icon: Users }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* AI Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Real-Time AI Insights</h3>
            <Button variant="outline" size="sm">
              <Activity className="w-4 h-4 mr-2" />
              Refresh Insights
            </Button>
          </div>
          
          <div className="space-y-3">
            {aiInsights.map(insight => (
              <div key={insight.id} className={`border-2 rounded-lg p-4 ${getInsightColor(insight.type)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    {getInsightIcon(insight.type)}
                    <div>
                      <h4 className="font-semibold">{insight.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      {(insight.confidence * 100).toFixed(0)}% confidence
                    </div>
                    <div className="text-xs text-gray-500">{insight.timeframe}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Current:</span>
                      <span className="font-semibold ml-1">{insight.metrics.current}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Predicted:</span>
                      <span className="font-semibold ml-1">{insight.metrics.predicted}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {insight.metrics.change > 0 ? (
                        <ArrowUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`font-semibold ${insight.metrics.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {Math.abs(insight.metrics.change * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  
                  {insight.actionable && (
                    <Button size="sm">
                      Apply Optimization
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Incrementality Tab */}
      {activeTab === 'incrementality' && incrementalityData && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Incrementality Analysis</h3>
            <div className="text-sm text-gray-500">Based on Campaign 1 learnings</div>
          </div>
          
          {/* Incremental Lift Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <h4 className="font-semibold text-gray-600 mb-2">Baseline Reach</h4>
              <p className="text-3xl font-bold text-gray-700">
                {(incrementalityData.baselineReach / 1000000).toFixed(1)}M
              </p>
              <p className="text-sm text-gray-500">Organic performance</p>
            </div>
            
            <div className="card text-center">
              <h4 className="font-semibold text-gray-600 mb-2">Incremental Reach</h4>
              <p className="text-3xl font-bold text-primary">
                {(incrementalityData.incrementalReach / 1000000).toFixed(1)}M
              </p>
              <p className="text-sm text-success">+{incrementalityData.liftPercentage.toFixed(0)}% lift</p>
            </div>
            
            <div className="card text-center">
              <h4 className="font-semibold text-gray-600 mb-2">Total Reach</h4>
              <p className="text-3xl font-bold text-secondary">
                {((incrementalityData.baselineReach + incrementalityData.incrementalReach) / 1000000).toFixed(1)}M
              </p>
              <p className="text-sm text-gray-500">Campaign + Organic</p>
            </div>
          </div>

          {/* Attribution Breakdown */}
          <div className="card">
            <h4 className="font-semibold mb-4">Attribution Breakdown</h4>
            <div className="space-y-3">
              {Object.entries(incrementalityData.attribution).map(([type, percentage]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="font-medium capitalize">{type.replace(/([A-Z])/g, ' $1')}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold w-12 text-right">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frequency Analysis */}
          <div className="card">
            <h4 className="font-semibold mb-4">Frequency Optimization</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{incrementalityData.frequency.optimal}</div>
                <div className="text-sm text-gray-500">Optimal Frequency</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{incrementalityData.frequency.current}</div>
                <div className="text-sm text-gray-500">Current Frequency</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{incrementalityData.frequency.saturation}</div>
                <div className="text-sm text-gray-500">Saturation Point</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Recommendation:</strong> Increase frequency from {incrementalityData.frequency.current} to {incrementalityData.frequency.optimal} 
                for optimal performance. Avoid exceeding {incrementalityData.frequency.saturation} to prevent diminishing returns.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Creator Synergies Tab */}
      {activeTab === 'synergies' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Creator Synergy Analysis</h3>
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Optimize Pairings
            </Button>
          </div>
          
          <div className="space-y-4">
            {creatorSynergies.map((synergy, index) => (
              <div key={index} className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{synergy.creator1} + {synergy.creator2}</h4>
                        <p className="text-sm text-gray-600">Creator Collaboration</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-success">{synergy.synergyScore.toFixed(0)}</div>
                    <div className="text-sm text-gray-500">Synergy Score</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold">{synergy.audienceOverlap.toFixed(1)}%</div>
                    <div className="text-sm text-gray-500">Audience Overlap</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{synergy.crossPollination.toFixed(1)}%</div>
                    <div className="text-sm text-gray-500">Cross-Pollination</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">
                      {synergy.recommendedBudgetSplit[0]}% / {synergy.recommendedBudgetSplit[1]}%
                    </div>
                    <div className="text-sm text-gray-500">Budget Split</div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>AI Recommendation:</strong> This creator pair shows exceptional synergy. 
                    Coordinate content timing and cross-promote for maximum amplification effect.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}