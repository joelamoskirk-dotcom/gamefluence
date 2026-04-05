'use client';

import React, { useState } from 'react';
import { AIAdvisorSystem, AdvisorInsight } from '@/lib/ai-advisor-agents';
import AIAdvisorImplementation from '@/lib/ai-advisor-implementation';
import { Button } from '@/components/ui/Button';
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  MessageSquare,
  Lightbulb,
  Target,
  Clock,
  RefreshCw,
  Zap
} from 'lucide-react';

export default function AIAdvisorDashboard() {
  const [selectedAdvisor, setSelectedAdvisor] = useState('head_of_product');
  const [showInsights, setShowInsights] = useState(true);
  const [implementingInsight, setImplementingInsight] = useState<string | null>(null);
  const [implementedInsights, setImplementedInsights] = useState(new Set());
  
  const advisors = AIAdvisorSystem.getAdvisorAgents();
  const insights = AIAdvisorSystem.generateAdvisorRecommendations(selectedAdvisor);
  
  const handleImplement = async (insight: AdvisorInsight) => {
    if (implementingInsight) return;
    
    setImplementingInsight(insight.id);
    
    try {
      const result = await AIAdvisorImplementation.implementRecommendation(
        insight.advisorType,
        insight.id
      );
      
      if (result.success) {
        const data = result.result;
        setImplementedInsights(prev => {
          const newSet = new Set(prev);
          newSet.add(insight.id);
          return newSet;
        });
        
        alert(`✅ ${insight.title} - Implementation Complete!\n\n🔧 Changes Made:\n${data.changes.map((c: string) => `• ${c}`).join('\n')}\n\n📊 Results:\n• Improvement: ${data.metrics.improvement.toFixed(1)}%\n• Implementation ID: ${data.implementationId}\n\n🎫 Ticket: ${result.ticket.id}\n🧠 Insights: ${result.ticket.learningInsights?.length || 0} captured\n\n🚀 Next Steps:\n${data.nextSteps.map((s: string) => `• ${s}`).join('\n')}`);
      } else {
        alert(`❌ Implementation Failed!\n\nError: ${result.ticket.errorMessage}\nTicket: ${result.ticket.id}\n\nThis issue has been logged for resolution.`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`💥 Implementation Error!\n\n${errorMessage}\n\nPlease try again or contact support.`);
    } finally {
      setImplementingInsight(null);
    }
  };

  const handleDismiss = (insightId: string) => {
    setImplementedInsights(prev => {
      const newSet = new Set(prev);
      newSet.add(insightId);
      return newSet;
    });
    alert(`📝 Insight dismissed and logged for future reference.`);
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <TrendingUp className="w-4 h-4" />;
      case 'medium': return <Target className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const AdvisorCard = ({ advisor }: { advisor: any }) => (
    <div 
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
        selectedAdvisor === advisor.id 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
      onClick={() => setSelectedAdvisor(advisor.id)}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">{advisor.avatar}</div>
        <div>
          <h3 className="font-bold text-sm">{advisor.name}</h3>
          <p className="text-xs text-gray-600">{advisor.title}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Active Insights</span>
          <span className="font-semibold text-red-600">{advisor.activeInsights}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Success Rate</span>
          <span className="font-semibold text-green-600">{advisor.successRate}%</span>
        </div>
        <div className="text-xs text-gray-500 mt-2">{advisor.specialty}</div>
      </div>
    </div>
  );

  const InsightCard = ({ insight }: { insight: any }) => {
    const isImplemented = implementedInsights.has(insight.id);
    const isImplementing = implementingInsight === insight.id;
    
    return (
      <div className={`bg-white rounded-lg border p-6 shadow-sm ${isImplemented ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(insight.priority)}`}>
              <div className="flex items-center gap-1">
                {getPriorityIcon(insight.priority)}
                {insight.priority.toUpperCase()}
              </div>
            </div>
            <span className="text-sm text-gray-500">{insight.category}</span>
            {isImplemented && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Implemented
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">{insight.confidence}%</div>
            <div className="text-xs text-gray-500">Confidence</div>
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-3">{insight.title}</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Analysis</h4>
            <p className="text-sm text-gray-600">{insight.message}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Recommendation</h4>
            <p className="text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">{insight.recommendation}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Expected Impact</h4>
            <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">{insight.impact}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Action Items</h4>
            <ul className="space-y-1">
              {insight.actionItems.map((item: string, index: number) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {isImplementing && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-blue-800">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="font-medium">Implementing: {insight.title}</span>
              </div>
              <div className="text-sm text-blue-600 mt-1">
                Creating tickets, making system changes, capturing learning insights...
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {insight.timestamp.toLocaleTimeString()}
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleDismiss(insight.id)}
                disabled={isImplementing || isImplemented}
              >
                Dismiss
              </Button>
              <Button 
                size="sm"
                onClick={() => handleImplement(insight)}
                disabled={isImplementing || isImplemented}
                className={isImplemented ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                {isImplementing && <RefreshCw className="w-3 h-3 animate-spin mr-1" />}
                {isImplemented ? (
                  <>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Implemented
                  </>
                ) : isImplementing ? (
                  'Implementing...'
                ) : (
                  <>
                    <Zap className="w-3 h-3 mr-1" />
                    Implement
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const selectedAdvisorData = advisors.find(a => a.id === selectedAdvisor);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Business Advisors</h1>
              <p className="text-white/90">Civilization-style strategic intelligence for your platform</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{insights.length}</div>
            <div className="text-white/90">Active Insights</div>
          </div>
        </div>
      </div>

      {/* Advisor Selection */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          Select Your Advisor
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {advisors.map((advisor) => (
            <AdvisorCard key={advisor.id} advisor={advisor} />
          ))}
        </div>
      </div>

      {/* Selected Advisor Info */}
      {selectedAdvisorData && (
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{selectedAdvisorData.avatar}</div>
            <div>
              <h3 className="text-xl font-bold">{selectedAdvisorData.name}</h3>
              <p className="text-gray-600">{selectedAdvisorData.title}</p>
              <p className="text-sm text-gray-500 mt-1">{selectedAdvisorData.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{selectedAdvisorData.activeInsights}</div>
              <div className="text-sm text-gray-600">Active Insights</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{selectedAdvisorData.totalRecommendations}</div>
              <div className="text-sm text-gray-600">Total Recommendations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{selectedAdvisorData.successRate}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      )}

      {/* Insights */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            Strategic Insights & Recommendations
          </h2>
          <Button 
            variant="outline" 
            onClick={() => setShowInsights(!showInsights)}
          >
            {showInsights ? 'Hide' : 'Show'} Insights
          </Button>
        </div>
        
        {showInsights && (
          <div className="space-y-6">
            {insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}