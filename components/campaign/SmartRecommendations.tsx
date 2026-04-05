'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { 
  Brain, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  Target, 
  Lightbulb,
  Star,
  Zap,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface SmartRecommendation {
  id: string;
  type: 'creator' | 'budget' | 'timing' | 'content' | 'platform' | 'audience';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  estimatedLift: number;
  reasoning: string[];
  actionItems: string[];
}

interface CampaignContext {
  budget: number;
  targetAudience: string;
  gameGenre: string;
  campaignGoal: string;
  timeline: string;
}

export default function SmartRecommendations() {
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([]);
  const [campaignContext, setCampaignContext] = useState<CampaignContext>({
    budget: 50000,
    targetAudience: '18-34 gamers',
    gameGenre: 'RPG',
    campaignGoal: 'awareness',
    timeline: '30 days'
  });
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    generateRecommendations();
  }, [campaignContext]);

  const generateRecommendations = () => {
    const recs: SmartRecommendation[] = [
      {
        id: 'rec_1',
        type: 'creator',
        title: 'Target Mid-Tier RPG Streamers',
        description: 'Focus on creators with 10K-100K followers who specialize in RPG content',
        confidence: 0.92,
        impact: 'high',
        effort: 'medium',
        estimatedLift: 34,
        reasoning: [
          'RPG streamers have 23% higher engagement rates',
          'Mid-tier creators offer better cost-per-engagement',
          'Audience alignment score: 94%'
        ],
        actionItems: [
          'Identify top 20 RPG streamers in target range',
          'Analyze their content style and audience',
          'Prepare personalized outreach messages'
        ]
      },
      {
        id: 'rec_2',
        type: 'timing',
        title: 'Launch During Gaming Prime Time',
        description: 'Schedule content releases between 7-10 PM EST for maximum visibility',
        confidence: 0.87,
        impact: 'medium',
        effort: 'low',
        estimatedLift: 18,
        reasoning: [
          'Peak gaming hours show 45% higher engagement',
          'Target audience most active during evening hours',
          'Competition analysis shows lower ad density'
        ],
        actionItems: [
          'Coordinate with creators for optimal posting times',
          'Set up automated scheduling tools',
          'Monitor performance across different time zones'
        ]
      },
      {
        id: 'rec_3',
        type: 'content',
        title: 'Emphasize Gameplay Moments',
        description: 'Focus on epic boss fights and achievement moments for higher viral potential',
        confidence: 0.89,
        impact: 'high',
        effort: 'medium',
        estimatedLift: 42,
        reasoning: [
          'Boss fight content has 67% higher share rate',
          'Achievement moments drive emotional engagement',
          'Viral clips increase organic reach by 156%'
        ],
        actionItems: [
          'Brief creators on key gameplay moments to highlight',
          'Provide editing guidelines for clip creation',
          'Set up clip amplification strategy'
        ]
      },
      {
        id: 'rec_4',
        type: 'budget',
        title: 'Reallocate 20% to Performance Bonuses',
        description: 'Shift budget from base payments to performance-based incentives',
        confidence: 0.78,
        impact: 'medium',
        effort: 'low',
        estimatedLift: 25,
        reasoning: [
          'Performance bonuses increase creator motivation',
          'Results in 31% better content quality',
          'Aligns creator incentives with campaign goals'
        ],
        actionItems: [
          'Design performance bonus structure',
          'Communicate new incentive model to creators',
          'Set up tracking for bonus metrics'
        ]
      },
      {
        id: 'rec_5',
        type: 'platform',
        title: 'Expand to TikTok for Younger Audience',
        description: 'Add TikTok to platform mix to capture 16-24 demographic',
        confidence: 0.83,
        impact: 'high',
        effort: 'high',
        estimatedLift: 38,
        reasoning: [
          'TikTok has 73% of target younger demographic',
          'Gaming content performs exceptionally well',
          'Lower competition for gaming brands'
        ],
        actionItems: [
          'Recruit TikTok gaming creators',
          'Adapt content format for short-form video',
          'Set up TikTok advertising account'
        ]
      }
    ];

    setRecommendations(recs);
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      creator: Users,
      budget: DollarSign,
      timing: Clock,
      content: Lightbulb,
      platform: Target,
      audience: TrendingUp
    };
    const Icon = icons[type as keyof typeof icons] || Brain;
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

  const getEffortColor = (effort: string) => {
    const colors = {
      low: 'text-blue-600 bg-blue-100',
      medium: 'text-purple-600 bg-purple-100',
      high: 'text-orange-600 bg-orange-100'
    };
    return colors[effort as keyof typeof colors];
  };

  const filteredRecommendations = selectedType === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.type === selectedType);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-600" />
            Smart Recommendations
          </h1>
          <p className="text-muted-foreground">AI-powered campaign optimization suggestions</p>
        </div>
        <Button>
          <Zap className="h-4 w-4 mr-2" />
          Refresh Analysis
        </Button>
      </div>

      {/* Campaign Context */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Context</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Budget:</span>
              <p className="font-medium">${campaignContext.budget.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Audience:</span>
              <p className="font-medium">{campaignContext.targetAudience}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Genre:</span>
              <p className="font-medium">{campaignContext.gameGenre}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Goal:</span>
              <p className="font-medium capitalize">{campaignContext.campaignGoal}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Timeline:</span>
              <p className="font-medium">{campaignContext.timeline}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'creator', 'budget', 'timing', 'content', 'platform', 'audience'].map(type => (
          <Button
            key={type}
            variant={selectedType === type ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType(type)}
            className="capitalize"
          >
            {type === 'all' ? 'All' : type}
          </Button>
        ))}
      </div>

      {/* Recommendations */}
      <div className="grid gap-4">
        {filteredRecommendations.map(rec => (
          <Card key={rec.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {getTypeIcon(rec.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{rec.title}</h3>
                    <p className="text-muted-foreground">{rec.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">+{rec.estimatedLift}%</div>
                  <div className="text-sm text-muted-foreground">Est. Lift</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">
                    {Math.round(rec.confidence * 100)}% Confidence
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(rec.impact)}`}>
                  {rec.impact} impact
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEffortColor(rec.effort)}`}>
                  {rec.effort} effort
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Reasoning
                  </h4>
                  <ul className="space-y-1">
                    {rec.reasoning.map((reason, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Action Items
                  </h4>
                  <ul className="space-y-1">
                    {rec.actionItems.map((action, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <AlertTriangle className="h-3 w-3 text-orange-600 mt-0.5 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
                <Button size="sm">
                  Apply Recommendation
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}