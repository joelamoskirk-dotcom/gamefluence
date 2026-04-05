'use client';

import React, { useState, useEffect } from 'react';
import { automatedUXTesting, PageTestSuite, UXIssue } from '@/lib/automated-ux-testing';
import { 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Zap, 
  Bug, 
  Accessibility, 
  Clock,
  BarChart3,
  FileText,
  Play,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export default function UXTeardownDashboard() {
  const [auditResults, setAuditResults] = useState<{
    overallScore: number;
    pageResults: PageTestSuite[];
    criticalIssues: UXIssue[];
    recommendations: string[];
    jiraTickets: any[];
  } | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageTestSuite | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<UXIssue | null>(null);
  const [filterSeverity, setFilterSeverity] = useState('all');

  useEffect(() => {
    // Auto-run audit on component mount
    runUXAudit();
  }, []);

  const runUXAudit = async () => {
    setIsRunning(true);
    
    try {
      console.log('🔍 Starting UX Audit...');
      const results = await automatedUXTesting.runComprehensiveUXAudit();
      setAuditResults(results);
      
      if (results.pageResults.length > 0) {
        setSelectedPage(results.pageResults[0]);
      }
    } catch (error) {
      console.error('UX Audit failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <Bug className="w-4 h-4" />;
      case 'medium': return <Eye className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'functionality': return <Bug className="w-4 h-4" />;
      case 'accessibility': return <Accessibility className="w-4 h-4" />;
      case 'performance': return <Zap className="w-4 h-4" />;
      case 'visual': return <Eye className="w-4 h-4" />;
      case 'usability': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const filteredIssues = auditResults?.criticalIssues.filter(issue => 
    filterSeverity === 'all' || issue.severity === filterSeverity
  ) || [];

  if (isRunning) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <div className="text-lg font-semibold text-gray-700">Running Comprehensive UX Audit...</div>
          <div className="text-sm text-gray-500">Testing buttons, accessibility, and user flows</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">UX Teardown & Automated Testing</h2>
            <p className="text-purple-100">Comprehensive button testing, accessibility audit, and JIRA integration</p>
          </div>
          <button
            onClick={runUXAudit}
            disabled={isRunning}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Play className="w-4 h-4" />
            Run New Audit
          </button>
        </div>
        
        {auditResults && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold">{auditResults.overallScore.toFixed(1)}%</div>
              <div className="text-sm text-purple-200">Overall UX Score</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold text-red-300">{auditResults.criticalIssues.length}</div>
              <div className="text-sm text-purple-200">Critical Issues</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold">{auditResults.pageResults.length}</div>
              <div className="text-sm text-purple-200">Pages Tested</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold">{auditResults.jiraTickets.length}</div>
              <div className="text-sm text-purple-200">JIRA Tickets</div>
            </div>
          </div>
        )}
      </div>

      {auditResults && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Page Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Page Overview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Page Test Results</h3>
              
              <div className="space-y-4">
                {auditResults.pageResults.map((page) => (
                  <div 
                    key={page.page}
                    onClick={() => setSelectedPage(page)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPage?.page === page.page ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{page.page}</h4>
                        <p className="text-sm text-gray-600">{page.url}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold ${getScoreColor(page.overallScore)}`}>
                          {page.overallScore.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-500">Overall Score</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-red-600">{page.criticalIssues}</div>
                        <div className="text-gray-600">Critical</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-orange-600">{page.highIssues}</div>
                        <div className="text-gray-600">High</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-yellow-600">{page.mediumIssues}</div>
                        <div className="text-gray-600">Medium</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-blue-600">{page.lowIssues}</div>
                        <div className="text-gray-600">Low</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex justify-between text-sm">
                      <span className="text-gray-600">
                        Accessibility: <span className={getScoreColor(page.accessibility.score)}>{page.accessibility.score.toFixed(1)}%</span>
                      </span>
                      <span className="text-gray-600">
                        Usability: <span className={getScoreColor(page.usability.score)}>{page.usability.score.toFixed(1)}%</span>
                      </span>
                      <span className="text-gray-600">
                        Buttons: {page.buttons.length}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Page Details */}
            {selectedPage && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {selectedPage.page} - Button Analysis
                </h3>
                
                <div className="space-y-4">
                  {selectedPage.buttons.map((button, index) => (
                    <div key={button.buttonId} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{button.text}</h4>
                          <p className="text-sm text-gray-600">{button.selector}</p>
                          <p className="text-xs text-gray-500">{button.location}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(button.severity)}`}>
                            {getSeverityIcon(button.severity)}
                            {button.severity}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${button.testResults.isVisible ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span>Visible</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${button.testResults.isClickable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span>Clickable</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${button.testResults.hasHoverState ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span>Hover State</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${button.testResults.functionalityWorks ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span>Functional</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <div>Expected: {button.testResults.expectedFunction}</div>
                        <div>Actual: {button.testResults.actualFunction}</div>
                        <div>Response Time: {button.testResults.responseTime.toFixed(0)}ms</div>
                      </div>
                      
                      {button.issues.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="text-sm font-medium text-red-600 mb-2">
                            Issues Found ({button.issues.length}):
                          </div>
                          <div className="space-y-1">
                            {button.issues.map((issue, issueIndex) => (
                              <div key={issueIndex} className="text-sm text-gray-600 flex items-center gap-2">
                                {getTypeIcon(issue.type)}
                                <span>{issue.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Issues & JIRA Integration */}
          <div className="space-y-6">
            {/* Critical Issues */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Critical Issues</h3>
                <select 
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="text-sm border rounded px-2 py-1"
                >
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredIssues.map((issue) => (
                  <div 
                    key={issue.id}
                    onClick={() => setSelectedIssue(issue)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedIssue?.id === issue.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(issue.severity)}`}>
                        {getSeverityIcon(issue.severity)}
                        {issue.severity}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {getTypeIcon(issue.type)}
                        {issue.type}
                      </span>
                    </div>
                    <h4 className="font-medium text-sm">{issue.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{issue.page} • {issue.component}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{issue.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Issue Details */}
            {selectedIssue && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Issue Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(selectedIssue.severity)}`}>
                        {getSeverityIcon(selectedIssue.severity)}
                        {selectedIssue.severity}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {getTypeIcon(selectedIssue.type)}
                        {selectedIssue.type}
                      </span>
                    </div>
                    <h4 className="font-medium">{selectedIssue.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{selectedIssue.description}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm mb-1">Expected Behavior:</h5>
                    <p className="text-sm text-gray-600">{selectedIssue.expectedBehavior}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm mb-1">Actual Behavior:</h5>
                    <p className="text-sm text-gray-600">{selectedIssue.actualBehavior}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm mb-1">Reproduction Steps:</h5>
                    <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
                      {selectedIssue.reproduction.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm mb-1">Business Impact:</h5>
                    <p className="text-sm text-gray-600">{selectedIssue.businessImpact}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm mb-1">Affected Users:</h5>
                    <p className="text-sm text-gray-600">{selectedIssue.affectedUsers.join(', ')}</p>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <div className="text-xs text-gray-500">
                      Priority: {selectedIssue.priority}/5 • 
                      Created: {selectedIssue.createdAt.toLocaleDateString()} • 
                      Status: {selectedIssue.status}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* JIRA Integration */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-blue-600" />
                JIRA Integration
              </h3>
              
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  {auditResults.jiraTickets.length} tickets ready for JIRA export
                </div>
                
                <div className="space-y-2">
                  {auditResults.jiraTickets.slice(0, 5).map((ticket, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-sm">{ticket.key}</div>
                      <div className="text-sm text-gray-600">{ticket.summary}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {ticket.issueType} • {ticket.priority} Priority
                      </div>
                    </div>
                  ))}
                  
                  {auditResults.jiraTickets.length > 5 && (
                    <div className="text-sm text-gray-500 text-center">
                      +{auditResults.jiraTickets.length - 5} more tickets...
                    </div>
                  )}
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Export to JIRA
                </button>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
              
              <div className="space-y-3">
                {auditResults.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-700">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}