'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { 
  TrendingUp, 
  BarChart3, 
  DollarSign,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Star,
  Crown,
  Zap,
  Target,
  Calendar,
  Award,
  Briefcase,
  Settings
} from 'lucide-react';

interface CreatorMetrics {
  totalEarnings: number;
  monthlyEarnings: number;
  totalViews: number;
  avgEngagement: number;
  completedCampaigns: number;
  rating: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
}

interface Campaign {
  id: string;
  title: string;
  brand: string;
  status: 'active' | 'completed' | 'pending';
  payment: number;
  deadline: Date;
  deliverables: string[];
  progress: number;
}

interface Opportunity {
  id: string;
  title: string;
  brand: string;
  payment: number;
  requirements: string[];
  matchScore: number;
  deadline: Date;
}

export default function PremiumCreatorSuite() {
  const [metrics, setMetrics] = useState<CreatorMetrics>({
    totalEarnings: 125000,
    monthlyEarnings: 8500,
    totalViews: 2500000,
    avgEngagement: 7.2,
    completedCampaigns: 34,
    rating: 4.8,
    tier: 'gold'
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 'camp_1',
      title: 'Epic RPG Launch Campaign',
      brand: 'GameStudio Pro',
      status: 'active',
      payment: 5000,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      deliverables: ['YouTube video', 'Stream session', 'Social posts'],
      progress: 65
    },
    {
      id: 'camp_2',
      title: 'Mobile Game Review',
      brand: 'IndieDev Studios',
      status: 'pending',
      payment: 2500,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      deliverables: ['TikTok videos', 'Instagram stories'],
      progress: 0
    }
  ]);

  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: 'opp_1',
      title: 'Strategy Game Beta Test',
      brand: 'MegaGames Inc',
      payment: 7500,
      requirements: ['Strategy game expertise', '50K+ followers', 'PC gaming setup'],
      matchScore: 94,
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'opp_2',
      title: 'Gaming Peripheral Showcase',
      brand: 'TechGear Pro',
      payment: 3000,
      requirements: ['Hardware reviews', 'Unboxing content', 'Tech audience'],
      matchScore: 87,
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
    }
  ]);

  const [selectedTab, setSelectedTab] = useState('dashboard');

  const getTierColor = (tier: string) => {
    const colors = {
      bronze: 'text-orange-600 bg-orange-100',
      silver: 'text-gray-600 bg-gray-100',
      gold: 'text-yellow-600 bg-yellow-100',
      platinum: 'text-purple-600 bg-purple-100',
      diamond: 'text-blue-600 bg-blue-100'
    };
    return colors[tier as keyof typeof colors];
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'diamond': return <Crown className="h-4 w-4" />;
      case 'platinum': return <Star className="h-4 w-4" />;
      case 'gold': return <Award className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'text-green-600 bg-green-100',
      completed: 'text-blue-600 bg-blue-100',
      pending: 'text-yellow-600 bg-yellow-100'
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Crown className="h-8 w-8 text-yellow-600" />
            Premium Creator Suite
          </h1>
          <p className="text-muted-foreground">Advanced tools for top-tier creators</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTierColor(metrics.tier)} flex items-center gap-1`}>
            {getTierIcon(metrics.tier)}
            {metrics.tier.toUpperCase()} TIER
          </span>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${metrics.monthlyEarnings.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(metrics.totalViews / 1000000).toFixed(1)}M</div>
                <p className="text-xs text-muted-foreground">
                  Across all platforms
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.avgEngagement}%</div>
                <p className="text-xs text-muted-foreground">
                  Above industry average
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Creator Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.rating}</div>
                <p className="text-xs text-muted-foreground">
                  Based on {metrics.completedCampaigns} campaigns
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {campaigns.filter(c => c.status === 'active').map(campaign => (
                    <div key={campaign.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{campaign.title}</h4>
                        <p className="text-sm text-muted-foreground">{campaign.brand}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">${campaign.payment.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{campaign.progress}% complete</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {opportunities.slice(0, 3).map(opp => (
                    <div key={opp.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{opp.title}</h4>
                        <p className="text-sm text-muted-foreground">{opp.brand}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">${opp.payment.toLocaleString()}</div>
                        <div className="text-xs text-green-600">{opp.matchScore}% match</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid gap-4">
            {campaigns.map(campaign => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{campaign.title}</h3>
                      <p className="text-muted-foreground">{campaign.brand}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                      <div className="text-lg font-bold mt-1">${campaign.payment.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{campaign.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Deliverables:</h4>
                    <div className="flex flex-wrap gap-2">
                      {campaign.deliverables.map((deliverable, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Deadline: {campaign.deadline.toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      {campaign.status === 'active' && (
                        <Button size="sm">Update Progress</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="grid gap-4">
            {opportunities.map(opp => (
              <Card key={opp.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{opp.title}</h3>
                      <p className="text-muted-foreground">{opp.brand}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">${opp.payment.toLocaleString()}</div>
                      <div className="text-sm text-green-600">{opp.matchScore}% match</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {opp.requirements.map((req, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Apply by: {opp.deadline.toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Learn More</Button>
                      <Button size="sm">Apply Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{metrics.totalViews.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Views</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{metrics.avgEngagement}%</div>
                  <div className="text-sm text-muted-foreground">Avg Engagement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{metrics.completedCampaigns}</div>
                  <div className="text-sm text-muted-foreground">Campaigns</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Total Earnings</h4>
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    ${metrics.totalEarnings.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Lifetime earnings</p>
                </div>
                <div>
                  <h4 className="font-medium mb-4">This Month</h4>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    ${metrics.monthlyEarnings.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">+12% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}