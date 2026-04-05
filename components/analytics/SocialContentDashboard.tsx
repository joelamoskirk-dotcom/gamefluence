'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2,
  Play,
  Users,
  Clock,
  BarChart3,
  Filter,
  Download,
  RefreshCw,
  Zap,
  Target,
  Award,
  Calendar
} from 'lucide-react';

interface SocialPost {
  id: string;
  platform: 'youtube' | 'twitch' | 'tiktok' | 'instagram' | 'twitter';
  creatorId: string;
  creatorName: string;
  title: string;
  thumbnail: string;
  publishedAt: Date;
  metrics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    engagement: number;
    watchTime?: number;
  };
  performance: {
    score: number;
    trend: 'up' | 'down' | 'stable';
    viralPotential: number;
    brandMentions: number;
  };
  campaignId?: string;
  tags: string[];
}

interface ContentAnalytics {
  totalPosts: number;
  totalViews: number;
  totalEngagement: number;
  avgEngagementRate: number;
  topPerformingPlatform: string;
  growthRate: number;
}

export default function SocialContentDashboard() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [analytics, setAnalytics] = useState<ContentAnalytics>({
    totalPosts: 0,
    totalViews: 0,
    totalEngagement: 0,
    avgEngagementRate: 0,
    topPerformingPlatform: '',
    growthRate: 0
  });
  const [selectedTab, setSelectedTab] = useState('overview');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    // Initialize with sample data
    const samplePosts: SocialPost[] = [
      {
        id: 'post_1',
        platform: 'youtube',
        creatorId: 'creator_1',
        creatorName: 'GameMaster Pro',
        title: 'Epic Boss Fight - New RPG Game Review',
        thumbnail: '/api/placeholder/320/180',
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        metrics: {
          views: 125000,
          likes: 8500,
          comments: 450,
          shares: 320,
          engagement: 7.2,
          watchTime: 8.5
        },
        performance: {
          score: 92,
          trend: 'up',
          viralPotential: 85,
          brandMentions: 3
        },
        campaignId: 'campaign_1',
        tags: ['gaming', 'rpg', 'review', 'boss-fight']
      },
      {
        id: 'post_2',
        platform: 'twitch',
        creatorId: 'creator_2',
        creatorName: 'StreamQueen',
        title: 'Live: New Game Launch Stream',
        thumbnail: '/api/placeholder/320/180',
        publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        metrics: {
          views: 45000,
          likes: 2100,
          comments: 890,
          shares: 150,
          engagement: 6.8
        },
        performance: {
          score: 78,
          trend: 'stable',
          viralPotential: 65,
          brandMentions: 5
        },
        campaignId: 'campaign_1',
        tags: ['gaming', 'live', 'launch', 'stream']
      }
    ];

    setPosts(samplePosts);
    
    // Calculate analytics
    const totalViews = samplePosts.reduce((sum, post) => sum + post.metrics.views, 0);
    const totalEngagement = samplePosts.reduce((sum, post) => sum + post.metrics.engagement, 0);
    
    setAnalytics({
      totalPosts: samplePosts.length,
      totalViews,
      totalEngagement,
      avgEngagementRate: totalEngagement / samplePosts.length,
      topPerformingPlatform: 'youtube',
      growthRate: 23.5
    });
  }, []);

  const getPlatformIcon = (platform: string) => {
    const icons = {
      youtube: '📺',
      twitch: '🎮',
      tiktok: '🎵',
      instagram: '📷',
      twitter: '🐦'
    };
    return icons[platform as keyof typeof icons] || '📱';
  };

  const getPlatformColor = (platform: string) => {
    const colors = {
      youtube: 'text-red-600 bg-red-100',
      twitch: 'text-purple-600 bg-purple-100',
      tiktok: 'text-pink-600 bg-pink-100',
      instagram: 'text-orange-600 bg-orange-100',
      twitter: 'text-blue-600 bg-blue-100'
    };
    return colors[platform as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const filteredPosts = posts.filter(post => 
    filterPlatform === 'all' || post.platform === filterPlatform
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Social Content Dashboard</h1>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analytics.totalViews)}</div>
            <p className="text-xs text-muted-foreground">
              +{analytics.growthRate}% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.avgEngagementRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Above industry average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              Across all platforms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Platform</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{analytics.topPerformingPlatform}</div>
            <p className="text-xs text-muted-foreground">
              Best performing platform
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="posts">All Posts</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['youtube', 'twitch', 'tiktok', 'instagram'].map(platform => {
                    const platformPosts = posts.filter(p => p.platform === platform);
                    const avgViews = platformPosts.length > 0 
                      ? platformPosts.reduce((sum, p) => sum + p.metrics.views, 0) / platformPosts.length 
                      : 0;
                    
                    return (
                      <div key={platform} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{getPlatformIcon(platform)}</span>
                          <div>
                            <p className="font-medium capitalize">{platform}</p>
                            <p className="text-sm text-muted-foreground">{platformPosts.length} posts</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatNumber(avgViews)}</p>
                          <p className="text-sm text-muted-foreground">avg views</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent High Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {posts
                    .sort((a, b) => b.performance.score - a.performance.score)
                    .slice(0, 5)
                    .map(post => (
                      <div key={post.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(post.platform)}`}>
                          {getPlatformIcon(post.platform)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{post.title}</p>
                          <p className="text-sm text-muted-foreground">{post.creatorName}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            {getTrendIcon(post.performance.trend)}
                            <span className="text-sm font-medium">{post.performance.score}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Platforms</option>
              <option value="youtube">YouTube</option>
              <option value="twitch">Twitch</option>
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <Card key={post.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(post.platform)}`}>
                      {getPlatformIcon(post.platform)} {post.platform}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded">
                      {post.metrics.watchTime ? `${post.metrics.watchTime}m` : 'LIVE'}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 flex items-center gap-1">
                    {getTrendIcon(post.performance.trend)}
                    <span className="text-white text-sm font-medium bg-black bg-opacity-70 px-1 rounded">
                      {post.performance.score}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{post.creatorName}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{formatNumber(post.metrics.views)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>{formatNumber(post.metrics.likes)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{formatNumber(post.metrics.comments)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="h-3 w-3" />
                      <span>{formatNumber(post.metrics.shares)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {post.publishedAt.toLocaleDateString()}
                      </span>
                      <span className="font-medium text-green-600">
                        {post.metrics.engagement}% engagement
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>  
      <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average Performance Score</span>
                    <span className="font-bold text-lg">
                      {(posts.reduce((sum, p) => sum + p.performance.score, 0) / posts.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Viral Potential</span>
                    <span className="font-bold text-lg">
                      {(posts.reduce((sum, p) => sum + p.performance.viralPotential, 0) / posts.length).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Brand Mentions</span>
                    <span className="font-bold text-lg">
                      {posts.reduce((sum, p) => sum + p.performance.brandMentions, 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Content */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {posts
                    .sort((a, b) => b.metrics.views - a.metrics.views)
                    .slice(0, 5)
                    .map((post, index) => (
                      <div key={post.id} className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{post.title}</p>
                          <p className="text-sm text-muted-foreground">{formatNumber(post.metrics.views)} views</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(post.platform)}`}>
                          {getPlatformIcon(post.platform)}
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Trends & Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Trending Topics</h4>
                  <div className="space-y-2">
                    {['gaming', 'rpg', 'review', 'live', 'boss-fight'].map(tag => (
                      <div key={tag} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="capitalize">#{tag}</span>
                        <span className="text-sm text-muted-foreground">
                          {posts.filter(p => p.tags.includes(tag)).length} posts
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Performance Insights</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-md">
                      <p className="text-sm font-medium text-blue-800">Best Posting Time</p>
                      <p className="text-xs text-blue-600">7-9 PM shows highest engagement</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-md">
                      <p className="text-sm font-medium text-green-800">Content Length</p>
                      <p className="text-xs text-green-600">8-12 minute videos perform best</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-md">
                      <p className="text-sm font-medium text-purple-800">Engagement Peak</p>
                      <p className="text-xs text-purple-600">First 24 hours are critical</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}