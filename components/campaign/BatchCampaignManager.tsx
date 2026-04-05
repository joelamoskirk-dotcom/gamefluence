'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { 
  Plus, 
  Upload, 
  Download, 
  Play, 
  Pause,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  DollarSign,
  Target
} from 'lucide-react';

interface BatchCampaign {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  creatorCount: number;
  budget: number;
  startDate: Date;
  endDate: Date;
  performance: {
    reach: number;
    engagement: number;
    conversions: number;
  };
}

export default function BatchCampaignManager() {
  const [campaigns, setCampaigns] = useState<BatchCampaign[]>([
    {
      id: 'batch_1',
      name: 'Summer Gaming Festival',
      status: 'active',
      creatorCount: 25,
      budget: 50000,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      performance: { reach: 2500000, engagement: 180000, conversions: 1200 }
    },
    {
      id: 'batch_2', 
      name: 'Mobile Game Launch',
      status: 'draft',
      creatorCount: 15,
      budget: 30000,
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 37 * 24 * 60 * 60 * 1000),
      performance: { reach: 0, engagement: 0, conversions: 0 }
    }
  ]);

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'text-gray-600 bg-gray-100',
      active: 'text-green-600 bg-green-100',
      paused: 'text-yellow-600 bg-yellow-100',
      completed: 'text-blue-600 bg-blue-100'
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Batch Campaign Manager</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Batch
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{campaigns.length}</div>
                <p className="text-sm text-muted-foreground">Total Batches</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-2xl font-bold">
                  {campaigns.reduce((sum, c) => sum + c.creatorCount, 0)}
                </div>
                <p className="text-sm text-muted-foreground">Total Creators</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">
                  ${(campaigns.reduce((sum, c) => sum + c.budget, 0) / 1000).toFixed(0)}K
                </div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">
                  {campaigns.filter(c => c.status === 'active').length}
                </div>
                <p className="text-sm text-muted-foreground">Active Batches</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {campaigns.map(campaign => (
          <Card key={campaign.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(campaign.status)}
                  <div>
                    <h3 className="text-lg font-semibold">{campaign.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {campaign.creatorCount} creators • ${campaign.budget.toLocaleString()} budget
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">
                    {(campaign.performance.reach / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-muted-foreground">Reach</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">
                    {(campaign.performance.engagement / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-muted-foreground">Engagement</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-purple-600">
                    {campaign.performance.conversions.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Conversions</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {campaign.startDate.toLocaleDateString()} - {campaign.endDate.toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  {campaign.status === 'draft' && (
                    <Button size="sm">Launch</Button>
                  )}
                  {campaign.status === 'active' && (
                    <Button variant="outline" size="sm">Pause</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}