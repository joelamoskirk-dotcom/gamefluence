'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import ROIModelingDashboard from '@/components/analytics/ROIModelingDashboard';
import AttributionSystem from '@/components/analytics/AttributionSystem';
import APACAnalyticsDashboard from '@/components/analytics/APACAnalyticsDashboard';
import EnhancedCreatorPerformance from '@/components/analytics/EnhancedCreatorPerformance';
import EnhancedIntelligenceDashboard from '@/components/analytics/EnhancedIntelligenceDashboard';
import { BarChart3, TrendingUp, Link2, Users, Globe, Zap } from 'lucide-react';

// Mock data for creators
const mockCreators = [
  {
    id: 'alex-gamemaster',
    name: 'Alex GameMaster',
    avatar: '👨‍💻',
    followers: 125000,
    rate: 200,
    engagement: 8.5,
    platform: 'twitch'
  },
  {
    id: 'sarah-plays',
    name: 'Sarah Plays',
    avatar: '👩‍🎮',
    followers: 250000,
    rate: 200,
    engagement: 7.2,
    platform: 'youtube'
  },
  {
    id: 'gaming-with-mike',
    name: 'Gaming With Mike',
    avatar: '🎮',
    followers: 180000,
    rate: 200,
    engagement: 9.1,
    platform: 'tiktok'
  }
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('apac'); // Default to APAC
  const campaignId = 'camp_12345'; // This would typically come from URL params or context
  
  // Detect founder access from localStorage
  const isFounder = typeof window !== 'undefined' && localStorage.getItem('founderAccess') === 'granted';
  const accessLevel = isFounder ? 'founder' : 'user';
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Campaign Analytics</h1>
          <p className="text-gray-600 mt-1">APAC-focused market intelligence and performance tracking</p>
        </div>
        <div className="flex items-center gap-3">
          {isFounder && (
            <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              👑 Founder Access
            </div>
          )}
          <Button>Export Data</Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-6 gap-2">
          <TabsTrigger value="intelligence" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Intelligence
          </TabsTrigger>
          <TabsTrigger value="apac" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            APAC Markets
          </TabsTrigger>
          <TabsTrigger value="creators" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Creator Performance
          </TabsTrigger>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="roi" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            ROI Modeling
          </TabsTrigger>
          <TabsTrigger value="attribution" className="flex items-center gap-2">
            <Link2 className="w-4 h-4" />
            Attribution
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="intelligence">
          <EnhancedIntelligenceDashboard />
        </TabsContent>
        
        <TabsContent value="apac">
          <APACAnalyticsDashboard />
        </TabsContent>
        
        <TabsContent value="creators">
          <EnhancedCreatorPerformance />
        </TabsContent>
        
        <TabsContent value="overview">
          <AnalyticsDashboard campaignId={campaignId} />
        </TabsContent>
        
        <TabsContent value="roi">
          <ROIModelingDashboard campaignId={campaignId} />
        </TabsContent>
        
        <TabsContent value="attribution">
          <AttributionSystem 
            campaignId={campaignId}
            creators={mockCreators}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}