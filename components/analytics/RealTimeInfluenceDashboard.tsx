import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  Brain, 
  Zap, 
  Eye, 
  Heart, 
  MessageSquare, 
  TrendingUp, 
  AlertTriangle,
  Lightbulb,
  Play,
  Pause,
  Volume2,
  Camera,
  Mic,
  Activity,
  Target,
  Star,
  Clock,
  Users,
  BarChart3
} from 'lucide-react';
import { EnhancedGamefluenceAI } from '@/lib/enhanced-gamefluence-ai';

interface RealTimeInfluenceDashboardProps {
  streamId?: string;
  creatorId: string;
}

export default function RealTimeInfluenceDashboard({ streamId, creatorId }: RealTimeInfluenceDashboardProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [streamAnalysis, setStreamAnalysis] = useState<any>(null);
  const [influenceMoments, setInfluenceMoments] = useState<any[]>([]);
  const [selectedMoment, setSelectedMoment] = useState<any>(null);
  const [realTimeData, setRealTimeData] = useState({
    emotionIntensity: 0,
    audienceEngagement: 0,
    brandSafety: 0.95,
    viralPotential: 0,
    conversionLikelihood: 0
  });

  useEffect(() => {
    if (isAnalyzing && streamId) {
      const interval = setInterval(() => {
        updateRealTimeData();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isAnalyzing, streamId]);

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      // Simulate real-time stream analysis
      const analysis = {
        streamId: 'stream_' + Date.now(),
        status: 'active',
        liveMetrics: {
          viewerCount: 1250 + Math.floor(Math.random() * 500),
          engagementRate: 8.5 + Math.random() * 3,
          chatVelocity: 45,
          brandMentions: Math.floor(Math.random() * 10)
        },
        sentiment: 0.85,
        keyMoments: [],
        realTimeRecommendations: [
          'Capitalize on current excitement - mention brand partnership now',
          'Audience engagement is peak - perfect time for call-to-action',
          'Racing content performing 23% above average - continue focus'
        ],
        predictedOutcomes: {
          finalViewCount: 15000 + Math.floor(Math.random() * 5000),
          peakViewers: 1800 + Math.floor(Math.random() * 200),
          totalEngagement: 12000 + Math.floor(Math.random() * 3000),
          conversionRate: 0.045 + Math.random() * 0.02,
          viralClips: Math.floor(Math.random() * 3) + 1
        }
      };
      
      setStreamAnalysis(analysis);
      
      // Simulate real-time updates
      const updateInterval = setInterval(() => {
        const updatedAnalysis = {
          ...analysis,
          liveMetrics: {
            ...analysis.liveMetrics,
            viewerCount: 1250 + Math.floor(Math.random() * 500),
            engagementRate: 8.5 + Math.random() * 3,
            chatVelocity: 40 + Math.random() * 20
          }
        };
        setStreamAnalysis(updatedAnalysis);
          
        // Simulate influence moments detection
        const moments = [
          {
            id: 'moment_' + Date.now(),
            type: 'peak_excitement',
            timestamp: Date.now() - Math.random() * 60000,
            duration: 3000 + Math.random() * 5000,
            intensity: 85 + Math.random() * 15,
            influenceScore: 80 + Math.random() * 20,
            conversionPotential: 0.6 + Math.random() * 0.3,
            viralPotential: 0.7 + Math.random() * 0.3,
            emotionProfile: {
              excitement: 0.9,
              joy: 0.7,
              surprise: 0.4
            },
            context: {
              gameEvent: 'Epic drift combo achieved',
              brandMention: 'Honda Racing',
              actionTaken: 'Perfect racing line execution',
              audienceReaction: 'Chat explosion with fire emojis'
            }
          }
        ];
        setInfluenceMoments(moments);
      }, 2000);

      return () => clearInterval(updateInterval);
    } catch (error) {
      console.error('Failed to start analysis:', error);
      setIsAnalyzing(false);
    }
  };

  const stopAnalysis = () => {
    setIsAnalyzing(false);
    setStreamAnalysis(null);
    setInfluenceMoments([]);
  };

  const updateRealTimeData = () => {
    // Simulate real-time AI analysis data
    setRealTimeData({
      emotionIntensity: Math.random() * 0.4 + 0.6, // 60-100%
      audienceEngagement: Math.random() * 0.3 + 0.5, // 50-80%
      brandSafety: Math.random() * 0.1 + 0.9, // 90-100%
      viralPotential: Math.random() * 0.5 + 0.3, // 30-80%
      conversionLikelihood: Math.random() * 0.4 + 0.2 // 20-60%
    });
  };

  const formatTimestamp = (timestamp: number) => {
    const minutes = Math.floor(timestamp / 60000);
    const seconds = Math.floor((timestamp % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getEmotionColor = (emotion: string) => {
    const colors: Record<string, string> = {
      joy: 'text-yellow-600 bg-yellow-50',
      excitement: 'text-orange-600 bg-orange-50',
      surprise: 'text-purple-600 bg-purple-50',
      achievement: 'text-green-600 bg-green-50',
      frustration: 'text-red-600 bg-red-50',
      concentration: 'text-blue-600 bg-blue-50'
    };
    return colors[emotion] || 'text-gray-600 bg-gray-50';
  };

  const getMomentTypeIcon = (type: string) => {
    switch (type) {
      case 'peak_excitement': return <Zap className="w-4 h-4 text-orange-500" />;
      case 'achievement': return <Star className="w-4 h-4 text-yellow-500" />;
      case 'surprise': return <AlertTriangle className="w-4 h-4 text-purple-500" />;
      case 'engagement_spike': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'brand_mention': return <Target className="w-4 h-4 text-blue-500" />;
      case 'call_to_action': return <Lightbulb className="w-4 h-4 text-amber-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Brain className="text-primary w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Real-Time Influence Detection</h2>
              <p className="text-sm text-gray-600">
                AI-powered analysis of gaming content influence moments
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            {!isAnalyzing ? (
              <Button onClick={startAnalysis} className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Start Analysis
              </Button>
            ) : (
              <Button onClick={stopAnalysis} variant="outline" className="flex items-center gap-2">
                <Pause className="w-4 h-4" />
                Stop Analysis
              </Button>
            )}
          </div>
        </div>

        {/* Real-Time Status */}
        {isAnalyzing && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-500" />
              <span>Visual AI</span>
            </div>
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-green-500" />
              <span>Audio AI</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-500" />
              <span>Emotion AI</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-orange-500" />
              <span>Influence AI</span>
            </div>
          </div>
        )}
      </div>

      {/* Real-Time Metrics */}
      {isAnalyzing && streamAnalysis && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">Emotion Intensity</h3>
              <Heart className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-red-500">
              {(realTimeData.emotionIntensity * 100).toFixed(0)}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${realTimeData.emotionIntensity * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">Engagement</h3>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-500">
              {(realTimeData.audienceEngagement * 100).toFixed(0)}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${realTimeData.audienceEngagement * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">Brand Safety</h3>
              <AlertTriangle className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-500">
              {(realTimeData.brandSafety * 100).toFixed(0)}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${realTimeData.brandSafety * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">Viral Potential</h3>
              <Zap className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-purple-500">
              {(realTimeData.viralPotential * 100).toFixed(0)}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${realTimeData.viralPotential * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">Conversion</h3>
              <Target className="w-4 h-4 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-orange-500">
              {(realTimeData.conversionLikelihood * 100).toFixed(0)}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${realTimeData.conversionLikelihood * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Live Stream Metrics */}
      {streamAnalysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-primary" />
              <h3 className="font-semibold">Viewers</h3>
            </div>
            <div className="text-xl font-bold">{streamAnalysis.liveMetrics.viewerCount.toLocaleString()}</div>
            <div className="text-sm text-success">+{Math.floor(Math.random() * 20 + 5)}% vs avg</div>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-blue-500" />
              <h3 className="font-semibold">Chat Velocity</h3>
            </div>
            <div className="text-xl font-bold">{streamAnalysis.liveMetrics.chatVelocity.toFixed(0)}/min</div>
            <div className="text-sm text-success">High activity</div>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-red-500" />
              <h3 className="font-semibold">Engagement</h3>
            </div>
            <div className="text-xl font-bold">{(streamAnalysis.liveMetrics.engagementRate * 100).toFixed(1)}%</div>
            <div className="text-sm text-success">Above average</div>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-orange-500" />
              <h3 className="font-semibold">Brand Mentions</h3>
            </div>
            <div className="text-xl font-bold">{streamAnalysis.liveMetrics.brandMentions}</div>
            <div className="text-sm text-gray-500">This session</div>
          </div>
        </div>
      )}

      {/* Gamefluence Moments */}
      {influenceMoments.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              Gamefluence Moments Detected
            </h3>
            <div className="text-sm text-gray-500">
              {influenceMoments.length} high-influence moments
            </div>
          </div>

          <div className="space-y-3">
            {influenceMoments.slice(0, 5).map((moment) => (
              <div 
                key={moment.id} 
                className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all hover:shadow-md ${
                  moment.intensity > 90 ? 'border-red-500 bg-red-50' :
                  moment.intensity > 80 ? 'border-orange-500 bg-orange-50' :
                  'border-yellow-500 bg-yellow-50'
                }`}
                onClick={() => setSelectedMoment(moment)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getMomentTypeIcon(moment.type)}
                    <div>
                      <div className="font-semibold capitalize">
                        {moment.type.replace('_', ' ')} 
                        <span className="ml-2 text-sm font-normal text-gray-600">
                          at {formatTimestamp(moment.timestamp)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {moment.context.gameEvent}
                        {moment.context.brandMention && (
                          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            Brand: {moment.context.brandMention}
                          </span>
                        )}
                      </div>
                      
                      {/* Emotion Profile */}
                      <div className="flex gap-2 mt-2">
                        {Object.entries(moment.emotionProfile)
                          .filter(([, value]) => (value as number) > 0.5)
                          .map(([emotion, value]) => (
                            <span 
                              key={emotion}
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getEmotionColor(emotion)}`}
                            >
                              {emotion} {((value as number) * 100).toFixed(0)}%
                            </span>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-orange-600">
                      {moment.intensity.toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-500">Intensity</div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                      <div className="text-center">
                        <div className="font-semibold">{(moment.influenceScore).toFixed(0)}</div>
                        <div className="text-gray-500">Influence</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{(moment.conversionPotential * 100).toFixed(0)}%</div>
                        <div className="text-gray-500">Convert</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{(moment.viralPotential * 100).toFixed(0)}%</div>
                        <div className="text-gray-500">Viral</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Real-Time Recommendations */}
      {streamAnalysis && streamAnalysis.realTimeRecommendations.length > 0 && (
        <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-bold">AI Recommendations</h3>
          </div>
          
          <div className="space-y-2">
            {streamAnalysis.realTimeRecommendations.map((recommendation: string, index: number) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-white rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">{recommendation}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Predicted Outcomes */}
      {streamAnalysis && (
        <div className="card">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            AI Performance Predictions
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-primary">
                {streamAnalysis.predictedOutcomes.finalViewCount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Final Views</div>
            </div>
            
            <div className="text-center">
              <div className="text-xl font-bold text-secondary">
                {streamAnalysis.predictedOutcomes.peakViewers.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Peak Viewers</div>
            </div>
            
            <div className="text-center">
              <div className="text-xl font-bold text-accent">
                {streamAnalysis.predictedOutcomes.totalEngagement.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Total Engagement</div>
            </div>
            
            <div className="text-center">
              <div className="text-xl font-bold text-success">
                {(streamAnalysis.predictedOutcomes.conversionRate * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500">Conversion Rate</div>
            </div>
            
            <div className="text-center">
              <div className="text-xl font-bold text-orange-500">
                {streamAnalysis.predictedOutcomes.viralClips}
              </div>
              <div className="text-sm text-gray-500">Viral Clips</div>
            </div>
          </div>
        </div>
      )}

      {/* Moment Detail Modal */}
      {selectedMoment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                {getMomentTypeIcon(selectedMoment.type)}
                Gamefluence Moment Details
              </h3>
              <Button variant="outline" onClick={() => setSelectedMoment(null)}>
                Close
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Timestamp</div>
                  <div className="font-semibold">{formatTimestamp(selectedMoment.timestamp)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-semibold">{(selectedMoment.duration / 1000).toFixed(1)}s</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Intensity</div>
                  <div className="font-semibold">{selectedMoment.intensity.toFixed(0)}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Influence Score</div>
                  <div className="font-semibold">{selectedMoment.influenceScore.toFixed(0)}/100</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-2">Context</div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div><strong>Game Event:</strong> {selectedMoment.context.gameEvent}</div>
                  {selectedMoment.context.brandMention && (
                    <div><strong>Brand Mention:</strong> {selectedMoment.context.brandMention}</div>
                  )}
                  <div><strong>Action:</strong> {selectedMoment.context.actionTaken}</div>
                  <div><strong>Audience:</strong> {selectedMoment.context.audienceReaction}</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-2">Emotion Analysis</div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(selectedMoment.emotionProfile).map(([emotion, value]) => (
                    <div key={emotion} className="text-center">
                      <div className={`p-2 rounded-lg ${getEmotionColor(emotion)}`}>
                        <div className="font-semibold">{((value as number) * 100).toFixed(0)}%</div>
                        <div className="text-xs capitalize">{emotion}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Conversion Potential</div>
                  <div className="text-lg font-bold text-green-600">
                    {(selectedMoment.conversionPotential * 100).toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Viral Potential</div>
                  <div className="text-lg font-bold text-purple-600">
                    {(selectedMoment.viralPotential * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}