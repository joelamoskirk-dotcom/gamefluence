'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { 
  Code, 
  Search, 
  Play, 
  Save, 
  FileText, 
  Folder, 
  Terminal, 
  Bot,
  Lightbulb,
  Database,
  BarChart3,
  Users,
  Zap,
  GitBranch,
  Settings,
  MessageSquare,
  Brain,
  TrendingUp,
  Eye,
  Filter,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  content?: string;
  language?: string;
}

interface AIInsight {
  id: string;
  type: 'performance' | 'security' | 'optimization' | 'bug' | 'feature_suggestion';
  title: string;
  description: string;
  file: string;
  line?: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  suggestion: string;
  confidence: number;
  timestamp: Date;
}

interface MarketInsight {
  id: string;
  category: 'creator_behavior' | 'brand_preferences' | 'campaign_performance' | 'market_trends';
  title: string;
  description: string;
  data: Record<string, any>;
  actionable: boolean;
  impact: 'low' | 'medium' | 'high';
  timestamp: Date;
}

interface CodeAnalysis {
  complexity: number;
  maintainability: number;
  testCoverage: number;
  performance: number;
  security: number;
  suggestions: string[];
}

export default function IntegratedIDE() {
  const [selectedTab, setSelectedTab] = useState('editor');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([]);
  const [marketInsights, setMarketInsights] = useState<MarketInsight[]>([]);
  const [codeAnalysis, setCodeAnalysis] = useState<CodeAnalysis | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const fileTree: FileNode[] = [
    {
      name: 'components',
      type: 'folder',
      path: '/components',
      children: [
        {
          name: 'analytics',
          type: 'folder',
          path: '/components/analytics',
          children: [
            { name: 'AnalyticsDashboard.tsx', type: 'file', path: '/components/analytics/AnalyticsDashboard.tsx', language: 'typescript' },
            { name: 'RealTimeInfluenceDashboard.tsx', type: 'file', path: '/components/analytics/RealTimeInfluenceDashboard.tsx', language: 'typescript' }
          ]
        },
        {
          name: 'campaign',
          type: 'folder',
          path: '/components/campaign',
          children: [
            { name: 'CampaignBuilder.tsx', type: 'file', path: '/components/campaign/CampaignBuilder.tsx', language: 'typescript' },
            { name: 'SmartRecommendations.tsx', type: 'file', path: '/components/campaign/SmartRecommendations.tsx', language: 'typescript' }
          ]
        }
      ]
    },
    {
      name: 'lib',
      type: 'folder',
      path: '/lib',
      children: [
        { name: 'enhanced-gamefluence-ai.ts', type: 'file', path: '/lib/enhanced-gamefluence-ai.ts', language: 'typescript' },
        { name: 'internal-crm-system.ts', type: 'file', path: '/lib/internal-crm-system.ts', language: 'typescript' },
        { name: 'ticketing-system.ts', type: 'file', path: '/lib/ticketing-system.ts', language: 'typescript' }
      ]
    }
  ];

  useEffect(() => {
    // Initialize with sample AI insights
    const sampleInsights: AIInsight[] = [
      {
        id: 'insight_1',
        type: 'performance',
        title: 'Optimize Database Query',
        description: 'The creator search query in CampaignBuilder could be optimized with indexing',
        file: '/components/campaign/CampaignBuilder.tsx',
        line: 145,
        severity: 'medium',
        suggestion: 'Add database index on creator_tier and region fields for faster filtering',
        confidence: 0.85,
        timestamp: new Date()
      },
      {
        id: 'insight_2',
        type: 'security',
        title: 'Input Validation Missing',
        description: 'User input in campaign creation form needs validation',
        file: '/components/campaign/CampaignBuilder.tsx',
        line: 89,
        severity: 'high',
        suggestion: 'Add input sanitization and validation for campaign title and description',
        confidence: 0.92,
        timestamp: new Date()
      },
      {
        id: 'insight_3',
        type: 'feature_suggestion',
        title: 'Auto-save Feature',
        description: 'Users lose work when browser crashes during campaign creation',
        file: '/components/campaign/CampaignBuilder.tsx',
        severity: 'low',
        suggestion: 'Implement auto-save functionality to localStorage every 30 seconds',
        confidence: 0.78,
        timestamp: new Date()
      }
    ];

    const sampleMarketInsights: MarketInsight[] = [
      {
        id: 'market_1',
        category: 'creator_behavior',
        title: 'Gaming Creators Prefer Discord Communication',
        description: '78% of gaming creators prefer Discord over email for campaign communication',
        data: { discord: 78, email: 15, slack: 7 },
        actionable: true,
        impact: 'high',
        timestamp: new Date()
      },
      {
        id: 'market_2',
        category: 'campaign_performance',
        title: 'Short-form Content Drives Higher Engagement',
        description: 'Campaigns with 60-second videos show 34% higher engagement rates',
        data: { short_form_engagement: 34, long_form_engagement: 22 },
        actionable: true,
        impact: 'medium',
        timestamp: new Date()
      },
      {
        id: 'market_3',
        category: 'brand_preferences',
        title: 'Brands Increasing Micro-Influencer Budgets',
        description: 'B2B gaming brands allocating 45% more budget to micro-influencers (1K-10K followers)',
        data: { micro_influencer_budget_increase: 45, macro_influencer_budget_change: -12 },
        actionable: true,
        impact: 'high',
        timestamp: new Date()
      }
    ];

    setAIInsights(sampleInsights);
    setMarketInsights(sampleMarketInsights);
  }, []);

  const handleFileSelect = (file: FileNode) => {
    if (file.type === 'file') {
      setSelectedFile(file.path);
      // Simulate loading file content
      setFileContent(`// ${file.name}\n// AI-powered development environment\n\nimport React from 'react';\n\n// Your code here...\n\n// AI Suggestion: Consider adding error boundaries\n// Market Insight: Users prefer dark mode (73%)`);
      
      // Simulate code analysis
      setCodeAnalysis({
        complexity: Math.floor(Math.random() * 100),
        maintainability: Math.floor(Math.random() * 100),
        testCoverage: Math.floor(Math.random() * 100),
        performance: Math.floor(Math.random() * 100),
        security: Math.floor(Math.random() * 100),
        suggestions: [
          'Consider extracting complex logic into custom hooks',
          'Add TypeScript interfaces for better type safety',
          'Implement error boundaries for better UX'
        ]
      });
    }
  };

  const handleCodeChange = (value: string) => {
    setFileContent(value);
    // Trigger real-time AI analysis
    analyzeCodeRealTime(value);
  };

  const analyzeCodeRealTime = (code: string) => {
    // Simulate real-time AI analysis
    if (code.includes('useState') && !code.includes('useCallback')) {
      // Add performance insight
      const newInsight: AIInsight = {
        id: `insight_${Date.now()}`,
        type: 'performance',
        title: 'Consider useCallback for Performance',
        description: 'State updates could benefit from useCallback optimization',
        file: selectedFile || '',
        severity: 'low',
        suggestion: 'Wrap event handlers in useCallback to prevent unnecessary re-renders',
        confidence: 0.72,
        timestamp: new Date()
      };
      
      setAIInsights(prev => [newInsight, ...prev.slice(0, 9)]);
    }
  };

  const executeCode = () => {
    setTerminalOutput(prev => [
      ...prev,
      `> Executing ${selectedFile}...`,
      `✓ Code compiled successfully`,
      `✓ Tests passed (12/12)`,
      `✓ Performance analysis complete`,
      `> Ready for deployment`
    ]);
  };

  const saveFile = () => {
    setTerminalOutput(prev => [
      ...prev,
      `> Saving ${selectedFile}...`,
      `✓ File saved successfully`,
      `✓ AI analysis updated`,
      `> Auto-backup created`
    ]);
  };

  const searchInFiles = (query: string) => {
    setSearchQuery(query);
    // Simulate search results
    if (query) {
      setTerminalOutput(prev => [
        ...prev,
        `> Searching for "${query}"...`,
        `Found 3 matches in 2 files:`,
        `  - /components/campaign/CampaignBuilder.tsx:45`,
        `  - /lib/enhanced-gamefluence-ai.ts:123`,
        `  - /lib/enhanced-gamefluence-ai.ts:456`
      ]);
    }
  };

  const renderFileTree = (nodes: FileNode[], level = 0) => {
    return nodes.map(node => (
      <div key={node.path} style={{ marginLeft: level * 16 }}>
        <div 
          className={`flex items-center gap-2 p-1 hover:bg-gray-100 cursor-pointer rounded ${
            selectedFile === node.path ? 'bg-blue-100' : ''
          }`}
          onClick={() => handleFileSelect(node)}
        >
          {node.type === 'folder' ? <Folder className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
          <span className="text-sm">{node.name}</span>
        </div>
        {node.children && renderFileTree(node.children, level + 1)}
      </div>
    ));
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: 'text-green-600 bg-green-100',
      medium: 'text-yellow-600 bg-yellow-100',
      high: 'text-orange-600 bg-orange-100',
      critical: 'text-red-600 bg-red-100'
    };
    return colors[severity as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const getImpactColor = (impact: string) => {
    const colors = {
      low: 'text-blue-600 bg-blue-100',
      medium: 'text-yellow-600 bg-yellow-100',
      high: 'text-green-600 bg-green-100'
    };
    return colors[impact as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Code className="h-5 w-5" />
            Gamefluence IDE
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            AI Assistant Active
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md">
            <Search className="h-4 w-4" />
            <input
              type="text"
              placeholder="Search in files..."
              value={searchQuery}
              onChange={(e) => searchInFiles(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-48"
            />
          </div>
          
          <Button variant="outline" size="sm" onClick={executeCode}>
            <Play className="h-4 w-4 mr-2" />
            Run
          </Button>
          
          <Button variant="outline" size="sm" onClick={saveFile}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
          >
            <Bot className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar - File Explorer */}
        <div className="w-64 bg-white border-r p-4">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Folder className="h-4 w-4" />
            Project Files
          </h3>
          <div className="space-y-1">
            {renderFileTree(fileTree)}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start border-b rounded-none bg-white">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
              <TabsTrigger value="market">Market Intelligence</TabsTrigger>
              <TabsTrigger value="analytics">Code Analytics</TabsTrigger>
              <TabsTrigger value="terminal">Terminal</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="flex-1 p-0">
              <div className="h-full flex flex-col">
                {selectedFile && (
                  <div className="flex items-center justify-between p-3 bg-gray-100 border-b">
                    <span className="text-sm font-medium">{selectedFile}</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>TypeScript</span>
                      <span>•</span>
                      <span>UTF-8</span>
                      <span>•</span>
                      <span>Line 1, Col 1</span>
                    </div>
                  </div>
                )}
                
                <textarea
                  ref={editorRef}
                  value={fileContent}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  className="flex-1 p-4 font-mono text-sm border-none outline-none resize-none"
                  placeholder="Select a file to start editing..."
                  style={{ fontFamily: 'Monaco, Consolas, "Courier New", monospace' }}
                />
              </div>
            </TabsContent>

            <TabsContent value="insights" className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Code Insights
                  </h3>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Analysis
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  {aiInsights.map(insight => (
                    <Card key={insight.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-yellow-500" />
                            <h4 className="font-medium">{insight.title}</h4>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(insight.severity)}`}>
                            {insight.severity}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                        
                        {insight.file && (
                          <div className="text-xs text-blue-600 mb-2">
                            {insight.file}{insight.line && `:${insight.line}`}
                          </div>
                        )}
                        
                        <div className="bg-blue-50 p-3 rounded-md">
                          <p className="text-sm"><strong>Suggestion:</strong> {insight.suggestion}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              Confidence: {Math.round(insight.confidence * 100)}%
                            </span>
                            <Button variant="outline" size="sm">Apply Fix</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="market" className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Market Intelligence
                  </h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  {marketInsights.map(insight => (
                    <Card key={insight.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-blue-500" />
                            <h4 className="font-medium">{insight.title}</h4>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                            {insight.impact} impact
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                        
                        {insight.data && (
                          <div className="bg-gray-50 p-3 rounded-md mb-3">
                            <h5 className="text-sm font-medium mb-2">Data Points:</h5>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              {Object.entries(insight.data).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="capitalize">{key.replace('_', ' ')}:</span>
                                  <span className="font-medium">{value}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {insight.actionable && (
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-green-600 flex items-center gap-1">
                              <Zap className="h-3 w-3" />
                              Actionable insight
                            </span>
                            <Button variant="outline" size="sm">Implement</Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-6">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Code Quality Analytics
                </h3>
                
                {codeAnalysis && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Complexity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{codeAnalysis.complexity}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${codeAnalysis.complexity}%` }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Maintainability</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{codeAnalysis.maintainability}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${codeAnalysis.maintainability}%` }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Test Coverage</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{codeAnalysis.testCoverage}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-yellow-600 h-2 rounded-full" 
                            style={{ width: `${codeAnalysis.testCoverage}%` }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{codeAnalysis.performance}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${codeAnalysis.performance}%` }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Security</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{codeAnalysis.security}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-red-600 h-2 rounded-full" 
                            style={{ width: `${codeAnalysis.security}%` }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {codeAnalysis && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Improvement Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {codeAnalysis.suggestions.map((suggestion, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded-md">
                            <Lightbulb className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">{suggestion}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="terminal" className="flex-1 flex flex-col">
              <div className="flex-1 bg-black text-green-400 p-4 font-mono text-sm overflow-y-auto">
                {terminalOutput.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
                <div className="flex items-center">
                  <span>$ </span>
                  <input 
                    type="text" 
                    className="bg-transparent border-none outline-none flex-1 ml-2"
                    placeholder="Enter command..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const command = e.currentTarget.value;
                        setTerminalOutput(prev => [...prev, `$ ${command}`, `Command executed: ${command}`]);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Assistant Sidebar */}
        {isAIAssistantOpen && (
          <div className="w-80 bg-white border-l flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-medium flex items-center gap-2">
                <Bot className="h-4 w-4" />
                AI Development Assistant
              </h3>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-md">
                  <p className="text-sm"><strong>AI:</strong> I&apos;ve analyzed your code and found 3 optimization opportunities. Would you like me to implement them?</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm"><strong>Market Insight:</strong> Based on user behavior data, consider adding a dark mode toggle - 73% of users prefer dark interfaces.</p>
                </div>
                
                <div className="bg-green-50 p-3 rounded-md">
                  <p className="text-sm"><strong>Performance:</strong> Your latest changes improved load time by 23%. Great work!</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ask AI anything..."
                  className="flex-1 p-2 border rounded-md text-sm"
                />
                <Button size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}