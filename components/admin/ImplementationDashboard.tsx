'use client';

import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, AlertTriangle, Clock, TrendingUp, Users, Code, Zap, Eye } from 'lucide-react';
import { implementationTracker, ImplementationTicket, ImplementationProgress } from '@/lib/implementation-tracker';

export default function ImplementationDashboard() {
  const [tickets, setTickets] = useState<ImplementationTicket[]>([]);
  const [activeImplementations, setActiveImplementations] = useState<ImplementationProgress[]>([]);
  const [learningInsights, setLearningInsights] = useState<any>(null);
  const [isImplementing, setIsImplementing] = useState(false);
  const [currentProgress, setCurrentProgress] = useState<ImplementationProgress | null>(null);

  useEffect(() => {
    loadData();
    
    // Refresh data every 2 seconds
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    setTickets(implementationTracker.getAllTickets());
    setActiveImplementations(implementationTracker.getActiveImplementations());
    setLearningInsights(implementationTracker.getLearningInsights());
  };

  const handleImplementClick = async (type: 'bug_fix' | 'feature_request' | 'optimization' | 'learning_update', title: string, description: string) => {
    if (isImplementing) return;
    
    setIsImplementing(true);
    setCurrentProgress(null);
    
    try {
      // Create ticket
      const ticketId = implementationTracker.createTicket(title, description, type, 'high');
      
      // Show immediate acknowledgment
      alert(`✅ Implementation Started!\n\nTicket: ${ticketId}\nTitle: ${title}\nAssigned to: AI Product Team\n\nProgress will be shown in real-time below.`);
      
      // Start implementation with progress tracking
      await implementationTracker.startImplementation(ticketId, (progress) => {
        setCurrentProgress(progress);
        loadData(); // Refresh data
      });
      
      // Show completion
      const completedTicket = implementationTracker.getTicket(ticketId);
      if (completedTicket?.learningData) {
        const improvement = completedTicket.learningData.improvement;
        alert(`🎉 Implementation Complete!\n\nTicket: ${ticketId}\nImprovement: ${improvement.toFixed(1)}%\nStatus: ${completedTicket.status}\n\nSystem has learned and improved!`);
      }
      
    } catch (error) {
      alert(`❌ Implementation Failed!\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}\n\nTicket has been logged for manual review.`);
    } finally {
      setIsImplementing(false);
      setCurrentProgress(null);
      loadData();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'testing': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Implementation & Learning Engine</h2>
        <p className="text-green-100">Real-time progress tracking, ticket creation, and AI learning system</p>
      </div>

      {/* Quick Implementation Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-600" />
          Quick Implementation Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => handleImplementClick(
              'bug_fix',
              'Fix Campaign Loading Issue',
              'Resolve slow loading times in campaign dashboard affecting user experience'
            )}
            disabled={isImplementing}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left disabled:opacity-50"
          >
            <div className="text-red-600 mb-2">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="font-medium">Fix Bug</div>
            <div className="text-sm text-gray-600">Create ticket & implement fix</div>
          </button>

          <button
            onClick={() => handleImplementClick(
              'optimization',
              'Optimize Fraud Detection Speed',
              'Improve fraud detection processing time from 2.5ms to under 2ms'
            )}
            disabled={isImplementing}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left disabled:opacity-50"
          >
            <div className="text-yellow-600 mb-2">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="font-medium">Optimize Performance</div>
            <div className="text-sm text-gray-600">Improve system speed</div>
          </button>

          <button
            onClick={() => handleImplementClick(
              'learning_update',
              'Update AI Fraud Models',
              'Retrain fraud detection models with latest data to improve accuracy'
            )}
            disabled={isImplementing}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left disabled:opacity-50"
          >
            <div className="text-purple-600 mb-2">
              <Code className="w-6 h-6" />
            </div>
            <div className="font-medium">Update AI Models</div>
            <div className="text-sm text-gray-600">Enhance learning algorithms</div>
          </button>

          <button
            onClick={() => handleImplementClick(
              'feature_request',
              'Add Real-time Creator Analytics',
              'Implement live creator performance tracking with real-time engagement metrics'
            )}
            disabled={isImplementing}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left disabled:opacity-50"
          >
            <div className="text-green-600 mb-2">
              <Users className="w-6 h-6" />
            </div>
            <div className="font-medium">New Feature</div>
            <div className="text-sm text-gray-600">Add functionality</div>
          </button>
        </div>
      </div>

      {/* Current Implementation Progress */}
      {currentProgress && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 animate-pulse" />
            Implementation in Progress
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-blue-800">Ticket: {currentProgress.ticketId}</span>
                <span className="text-blue-600">{currentProgress.progress}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${currentProgress.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-blue-700 font-medium">Current Stage</div>
                <div className="text-blue-600">{currentProgress.stage}</div>
              </div>
              <div>
                <div className="text-blue-700 font-medium">Status</div>
                <div className="text-blue-600">{currentProgress.message}</div>
              </div>
              <div>
                <div className="text-blue-700 font-medium">ETA</div>
                <div className="text-blue-600">{currentProgress.estimatedCompletion.toLocaleTimeString()}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Learning Insights */}
      {learningInsights && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            AI Learning Insights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{learningInsights.totalImplementations}</div>
              <div className="text-sm text-gray-600">Total Implementations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{learningInsights.avgImprovement?.toFixed(1) || 0}%</div>
              <div className="text-sm text-gray-600">Average Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{learningInsights.topInsights?.length || 0}</div>
              <div className="text-sm text-gray-600">Learning Insights</div>
            </div>
          </div>
          
          {learningInsights.topInsights && learningInsights.topInsights.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium mb-3">Recent Learning Insights:</h4>
              <div className="space-y-2">
                {learningInsights.topInsights.slice(0, 5).map((insight: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-gray-700">{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Implementation Tickets */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-gray-600" />
          Implementation Tickets
        </h3>
        
        <div className="space-y-4">
          {tickets.slice(0, 10).map((ticket) => (
            <div key={ticket.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{ticket.title}</h4>
                  <p className="text-sm text-gray-600">{ticket.description}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Ticket ID</div>
                  <div className="font-medium">{ticket.id}</div>
                </div>
                <div>
                  <div className="text-gray-600">Assigned To</div>
                  <div className="font-medium">{ticket.assignedTo}</div>
                </div>
                <div>
                  <div className="text-gray-600">Progress</div>
                  <div className="font-medium">{ticket.progress}%</div>
                </div>
                <div>
                  <div className="text-gray-600">Created</div>
                  <div className="font-medium">{ticket.createdAt.toLocaleDateString()}</div>
                </div>
              </div>
              
              {ticket.learningData && (
                <div className="mt-3 pt-3 border-t">
                  <div className="text-sm">
                    <span className="text-green-600 font-medium">
                      Improvement: {ticket.learningData.improvement.toFixed(1)}%
                    </span>
                    <span className="text-gray-500 ml-4">
                      {ticket.learningData.insights.length} insights captured
                    </span>
                  </div>
                </div>
              )}
              
              {ticket.logs.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <div className="text-xs text-gray-600">
                    Latest: {ticket.logs[ticket.logs.length - 1].message}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {tickets.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No implementation tickets yet. Click an action button above to create your first ticket!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}