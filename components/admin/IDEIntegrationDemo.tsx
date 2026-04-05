'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { 
  Code, 
  Brain, 
  Search, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  BarChart3,
  Zap,
  MessageSquare,
  Eye,
  Database,
  Globe,
  Target,
  Award
} from 'lucide-react';

interface IDEInsight {
  id: string;
  type: 'market' | 'performance' | 'user_behavior' | 'optimization';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
  codeExample?: string;
  dataSource: string;
}

export default function IDEIntegrationDemo() {
  const [activeInsight, setActiveInsight] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const insights: IDEInsight[] = [
    {
      id: 'insight_1',
      type: 'market',
      title: 'Gaming Creators Prefer Discord Integration',
      description: '78% of gaming creators use Discord for community management. Consider adding Discord webhook support.',
      impact: 'high',
      actionable: true,
      codeExample: `// Add Discord webhook integration
const discordWebhook = {
  url: process.env.DISCORD_WEBHOOK_URL,
  sendNotification: async (message) => {
    await fetch(webhook.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })
    });
  }
};`,
      dataSource: 'Creator Survey Data'
    },
    {
      id: 'insight_2',
      type: 'performance',
      title: 'Campaign Dashboard Load Time Optimization',
      description: 'Dashboard loads 2.3s slower for campaigns with 50+ creators. Implement pagination.',
      impact: 'medium',
      actionable: true,
      codeExample: `// Implement pagination for large creator lists
const [currentPage, setCurrentPage] = useState(1);
const creatorsPerPage = 20;
const paginatedCreators = creators.slice(
  (currentPage - 1) * creatorsPerPage,
  currentPage * creatorsPerPage
);`,
      dataSource: 'Performance Analytics'
    },
    {
      id: 'insight_3',
      type: 'user_behavior',
      title: 'Mobile Users Struggle with Campaign Creation',
      description: 'Mobile conversion rate is 34% lower. Simplify the mobile campaign creation flow.',
      impact: 'high',
      actionable: true,
      codeExample: `// Mobile-first campaign creation
const isMobile = useMediaQuery('(max-width: 768px)');
const campaignSteps = isMobile ? 
  ['basics', 'creators', 'review'] : 
  ['basics', 'targeting', 'creators', 'budget', 'review'];`,
      dataSource: 'User Analytics'
    },
    {
      id: 'insight_4',
      type: 'optimization',
      title: 'AI Matching Algorithm Enhancement',
      description: 'Adding creator engagement history improves match accuracy by 23%.',
      impact: 'high',
      actionable: true,
      codeExample: `// Enhanced creator matching with engagement history
const calculateMatchScore = (creator, campaign) => {
  const baseScore = calculateBaseMatch(creator, campaign);
  const engagementBonus = creator.engagementHistory
    .filter(h => h.genre === campaign.genre)
    .reduce((avg, h) => avg + h.rate, 0) / creator.engagementHistory.length;
  
  return baseScore + (engagementBonus * 0.23);
};`,
      dataSource: 'ML Model Analysis'
    }
  ];

  const getInsightIcon = (type: string) => {
    const icons = {
      market: TrendingUp,
      performance: Zap,
      user_behavior: Users,
      optimization: Brain
    };
    const Icon = icons[type as keyof typeof icons] || Lightbulb;
    return <Icon className="h-4 w-4" />;
  };

  const getImpactColor = (impact: string) => {
    const colors = {
      low: 'text-green-600 bg-green-100',
      medium: 'text-yellow-600 bg-yellow-100',
      high: 'text-red-600 bg-red-100'
    };
    return colors[impact as keyof typeof colors];
  };

  const filteredInsights = insights.filter(insight =>
    insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insight.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Code className="h-8 w-8 text-blue-600" />
            IDE Integration Demo
          </h1>
          <p className="text-muted-foreground">
            Real-time market insights and optimization suggestions integrated into your development environment
          </p>
        </div>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          Ask AI Assistant
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search insights across your entire codebase..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border rounded-lg text-sm"
        />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{insights.length}</div>
                <p className="text-sm text-muted-foreground">AI Insights</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-2xl font-bold">
                  {insights.filter(i => i.actionable).length}
                </div>
                <p className="text-sm text-muted-foreground">Actionable</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">
                  {insights.filter(i => i.impact === 'high').length}
                </div>
                <p className="text-sm text-muted-foreground">High Impact</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">5</div>
                <p className="text-sm text-muted-foreground">Data Sources</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Development Insights</h2>
        
        {filteredInsights.map(insight => (
          <Card key={insight.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{insight.title}</h3>
                    <p className="text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                    {insight.impact} impact
                  </span>
                  {insight.actionable && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Actionable
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Database className="h-3 w-3" />
                  <span>Source: {insight.dataSource}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveInsight(
                    activeInsight === insight.id ? null : insight.id
                  )}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {activeInsight === insight.id ? 'Hide Code' : 'View Code'}
                </Button>
              </div>

              {activeInsight === insight.id && insight.codeExample && (
                <div className="mt-4 p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{insight.codeExample}</pre>
                </div>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
                <Button size="sm">
                  Implement Suggestion
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* IDE Integration Features */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            IDE Integration Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Real-Time Market Intelligence</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  Live creator behavior analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  Gaming trend detection and alerts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  Competitor feature analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  User preference insights
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">AI-Powered Development</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-600 rounded-full"></div>
                  Code optimization suggestions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-600 rounded-full"></div>
                  Performance bottleneck detection
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-600 rounded-full"></div>
                  Feature impact predictions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-600 rounded-full"></div>
                  Automated A/B test suggestions
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-lg border">
            <h4 className="font-medium mb-2">💡 Pro Tip</h4>
            <p className="text-sm text-muted-foreground">
              With Kiro/Claude IDE integration, you can search across all your market data, user analytics, 
              and code simultaneously. Ask questions like &quot;What gaming trends should influence our next feature?&quot; 
              or &quot;How can I optimize this component based on user behavior data?&quot;
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}