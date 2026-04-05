'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { 
  TrendingUp, 
  Users, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  BarChart3,
  Lightbulb,
  ArrowUp,
  ArrowDown,
  Eye,
  Brain,
  Zap
} from 'lucide-react';
import { productTeamIntegration, ProductTeamInsight } from '@/lib/product-team-integration';

export default function ProductTeamDashboard() {
  const [insights, setInsights] = useState<ProductTeamInsight[]>([]);
  const [report, setReport] = useState<any>(null);
  const [selectedInsight, setSelectedInsight] = useState<ProductTeamInsight | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("insights");

  useEffect(() => {
    loadProductData();
  }, []);

  const loadProductData = async () => {
    try {
      setLoading(true);
      
      // Get insights and generate report
      const allInsights = productTeamIntegration.getProductInsights();
      const productReport = productTeamIntegration.generateProductReport();
      
      setInsights(allInsights);
      setReport(productReport);
      
      if (allInsights.length > 0) {
        setSelectedInsight(allInsights[0]);
      }
    } catch (error) {
      console.error('Error loading product data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'p0': return 'bg-red-100 text-red-800 border-red-200';
      case 'p1': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'p2': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'p3': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'identified': return 'bg-blue-100 text-blue-800';
      case 'analyzing': return 'bg-purple-100 text-purple-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'in_development': return 'bg-orange-100 text-orange-800';
      case 'testing': return 'bg-indigo-100 text-indigo-800';
      case 'deployed': return 'bg-green-100 text-green-800';
      case 'measuring': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'user_behavior': return <Users className="h-4 w-4" />;
      case 'conversion_optimization': return <TrendingUp className="h-4 w-4" />;
      case 'accessibility': return <Eye className="h-4 w-4" />;
      case 'performance': return <Zap className="h-4 w-4" />;
      case 'feature_adoption': return <Target className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Team Integration</h1>
          <p className="text-gray-600 mt-1">
            UX insights, conversion analysis, and product intelligence
          </p>
        </div>
        <Button onClick={loadProductData} className="bg-blue-600 hover:bg-blue-700">
          <Brain className="h-4 w-4 mr-2" />
          Refresh Analysis
        </Button>
      </div>

      {/* Summary Cards */}
      {report && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Insights</p>
                  <p className="text-2xl font-bold text-gray-900">{report.summary.totalInsights}</p>
                </div>
                <Lightbulb className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical Issues</p>
                  <p className="text-2xl font-bold text-red-600">{report.summary.criticalInsights}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg User Satisfaction</p>
                  <p className="text-2xl font-bold text-green-600">{report.summary.avgUserSatisfaction}/10</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Conversion Rate</p>
                  <p className="text-2xl font-bold text-purple-600">{report.summary.avgConversionRate}%</p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="insights">Product Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Top Recommendations</TabsTrigger>
          <TabsTrigger value="funnels">Conversion Analysis</TabsTrigger>
          <TabsTrigger value="journeys">User Journeys</TabsTrigger>
        </TabsList>

        {/* Product Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Insights List */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">All Insights</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {insights.map((insight) => (
                  <div 
                    key={insight.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedInsight(insight)}
                  >
                    <Card 
                      className={`transition-all ${
                        selectedInsight?.id === insight.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                      }`}
                    >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(insight.category)}
                          <Badge className={getPriorityColor(insight.priority)}>
                            {insight.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <Badge className={getStatusColor(insight.status)}>
                          {insight.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-gray-900 text-sm mb-1">
                        {insight.title}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {insight.description}
                      </p>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>{insight.assignedTo}</span>
                        <span>{insight.estimatedEffort}</span>
                      </div>
                    </CardContent>
                  </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Insight Details */}
            <div className="lg:col-span-2">
              {selectedInsight ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          {getCategoryIcon(selectedInsight.category)}
                          <span>{selectedInsight.title}</span>
                        </CardTitle>
                        <p className="text-gray-600 mt-1">{selectedInsight.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getPriorityColor(selectedInsight.priority)}>
                          {selectedInsight.priority.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(selectedInsight.status)}>
                          {selectedInsight.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Impact Metrics */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Impact Assessment</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {selectedInsight.impact.userExperience}/10
                          </div>
                          <div className="text-sm text-gray-600">User Experience</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {selectedInsight.impact.businessMetrics}/10
                          </div>
                          <div className="text-sm text-gray-600">Business Impact</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">
                            {selectedInsight.impact.technicalDebt}/10
                          </div>
                          <div className="text-sm text-gray-600">Technical Debt</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {selectedInsight.impact.accessibility}/10
                          </div>
                          <div className="text-sm text-gray-600">Accessibility</div>
                        </div>
                      </div>
                    </div>

                    {/* Evidence */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Evidence</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">Quantitative Data</h5>
                          <div className="space-y-2">
                            {selectedInsight.evidence.quantitativeData.map((data, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span className="text-gray-600">{data.metric}</span>
                                <span className="font-medium">{data.value}{data.unit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">User Feedback</h5>
                          <div className="space-y-2">
                            {selectedInsight.evidence.userFeedback.map((feedback, index) => (
                              <div key={index} className="text-sm text-gray-600 italic">
                                {feedback}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-red-600 mb-2">Immediate Actions</h5>
                          <ul className="space-y-1">
                            {selectedInsight.recommendations.immediate.map((rec, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-orange-600 mb-2">Short Term</h5>
                          <ul className="space-y-1">
                            {selectedInsight.recommendations.shortTerm.map((rec, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start">
                                <span className="text-orange-500 mr-2">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-green-600 mb-2">Long Term</h5>
                          <ul className="space-y-1">
                            {selectedInsight.recommendations.longTerm.map((rec, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start">
                                <span className="text-green-500 mr-2">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Success Metrics */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Success Metrics</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedInsight.successMetrics.map((metric, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {metric}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="border-t pt-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Assigned To:</span>
                          <div className="font-medium">{selectedInsight.assignedTo}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Effort:</span>
                          <div className="font-medium capitalize">{selectedInsight.estimatedEffort}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Data Source:</span>
                          <div className="font-medium capitalize">{selectedInsight.dataSource.replace('_', ' ')}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Created:</span>
                          <div className="font-medium">
                            {selectedInsight.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Select an insight to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Top Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Priority Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              {report?.recommendations && (
                <div className="space-y-4">
                  {report.recommendations.map((rec: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                        <div className="flex space-x-2">
                          <Badge className={getPriorityColor(rec.priority)}>
                            {rec.priority.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            {rec.effort}
                          </Badge>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="text-sm text-gray-600 mb-2">
                          Business Impact: <span className="font-medium">{rec.impact}/10</span>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Immediate Actions:</h5>
                        <ul className="space-y-1">
                          {rec.recommendations.map((action: string, actionIndex: number) => (
                            <li key={actionIndex} className="text-sm text-gray-700 flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conversion Analysis Tab */}
        <TabsContent value="funnels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Conversion funnel analysis coming soon</p>
                <p className="text-sm text-gray-500 mt-2">
                  This will show detailed conversion analysis across user journeys
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Journeys Tab */}
        <TabsContent value="journeys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Journey Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">User journey analysis coming soon</p>
                <p className="text-sm text-gray-500 mt-2">
                  This will show detailed user journey maps and pain point analysis
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}