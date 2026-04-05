'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface MarketData {
  country: string;
  totalGamers: number;
  mobileGamers: number;
  avgSessionTime: number;
  topGenres: Array<{
    genre: string;
    popularity: number;
    growth: number;
  }>;
  platformDistribution: Array<{
    platform: string;
    percentage: number;
  }>;
  trendingGames: Array<{
    title: string;
    downloads: number;
    revenue: number;
    category: string;
  }>;
  influencerMetrics: {
    totalCreators: number;
    avgEngagement: number;
    topPlatforms: Array<{
      platform: string;
      creators: number;
      avgFollowers: number;
    }>;
  };
}

export default function MarketIntelligence() {
  const [selectedMarket, setSelectedMarket] = useState('vietnam');
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AI-powered market intelligence data fetching
    const fetchMarketData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const vietnamData: MarketData = {
        country: 'Vietnam',
        totalGamers: 23800000,
        mobileGamers: 21400000,
        avgSessionTime: 47,
        topGenres: [
          { genre: 'Racing', popularity: 78, growth: 15.2 },
          { genre: 'Action', popularity: 85, growth: 12.8 },
          { genre: 'Strategy', popularity: 72, growth: 8.4 },
          { genre: 'RPG', popularity: 69, growth: 11.1 },
          { genre: 'Casual', popularity: 91, growth: 6.7 }
        ],
        platformDistribution: [
          { platform: 'Mobile', percentage: 89.9 },
          { platform: 'PC', percentage: 7.8 },
          { platform: 'Console', percentage: 2.3 }
        ],
        trendingGames: [
          { title: 'Free Fire', downloads: 45000000, revenue: 12500000, category: 'Battle Royale' },
          { title: 'Mobile Legends', downloads: 38000000, revenue: 8900000, category: 'MOBA' },
          { title: 'PUBG Mobile', downloads: 32000000, revenue: 7200000, category: 'Battle Royale' },
          { title: 'Garena Speed Drifters', downloads: 15000000, revenue: 3400000, category: 'Racing' },
          { title: 'Real Racing 3', downloads: 12000000, revenue: 2800000, category: 'Racing' }
        ],
        influencerMetrics: {
          totalCreators: 2847,
          avgEngagement: 8.7,
          topPlatforms: [
            { platform: 'TikTok', creators: 1245, avgFollowers: 185000 },
            { platform: 'YouTube', creators: 892, avgFollowers: 320000 },
            { platform: 'Facebook Gaming', creators: 710, avgFollowers: 145000 }
          ]
        }
      };
      
      setMarketData(vietnamData);
      setIsLoading(false);
    };

    fetchMarketData();
  }, [selectedMarket]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Market Intelligence</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500">AI Analysis in Progress...</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!marketData) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Market Intelligence</h2>
          <p className="text-gray-600">AI-powered gaming market analysis for {marketData.country}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500">Live Data</span>
          </div>
          <select 
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="vietnam">Vietnam</option>
            <option value="thailand">Thailand</option>
            <option value="singapore">Singapore</option>
            <option value="malaysia">Malaysia</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Gamers</h3>
          <p className="text-2xl font-bold text-primary">{(marketData.totalGamers / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-green-600">+12.3% YoY</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Mobile Gamers</h3>
          <p className="text-2xl font-bold text-secondary">{(marketData.mobileGamers / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-green-600">+18.7% YoY</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Avg Session Time</h3>
          <p className="text-2xl font-bold text-accent">{marketData.avgSessionTime}min</p>
          <p className="text-xs text-green-600">+5.2% YoY</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Gaming Creators</h3>
          <p className="text-2xl font-bold text-gaming">{marketData.influencerMetrics.totalCreators.toLocaleString()}</p>
          <p className="text-xs text-green-600">+24.1% YoY</p>
        </div>
      </div>

      {/* Genre Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Top Gaming Genres</h3>
          <div className="space-y-3">
            {marketData.topGenres.map((genre, index) => (
              <div key={genre.genre} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium w-16">#{index + 1}</span>
                  <span className="font-medium">{genre.genre}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${genre.popularity}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-green-600 w-12">+{genre.growth}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Platform Distribution</h3>
          <div className="space-y-4">
            {marketData.platformDistribution.map((platform) => (
              <div key={platform.platform} className="flex items-center justify-between">
                <span className="font-medium">{platform.platform}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-secondary h-3 rounded-full" 
                      style={{ width: `${platform.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold w-12">{platform.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Games */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Trending Games in Vietnam</h3>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Game Title</th>
                <th className="text-left py-2">Category</th>
                <th className="text-right py-2">Downloads</th>
                <th className="text-right py-2">Revenue (USD)</th>
                <th className="text-right py-2">Market Share</th>
              </tr>
            </thead>
            <tbody>
              {marketData.trendingGames.map((game, index) => (
                <tr key={game.title} className="border-b hover:bg-gray-50">
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">#{index + 1}</span>
                      <span className="font-medium">{game.title}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">{game.category}</span>
                  </td>
                  <td className="py-3 text-right">{(game.downloads / 1000000).toFixed(1)}M</td>
                  <td className="py-3 text-right">${(game.revenue / 1000000).toFixed(1)}M</td>
                  <td className="py-3 text-right">
                    <span className="text-green-600">
                      {((game.downloads / marketData.trendingGames.reduce((sum, g) => sum + g.downloads, 0)) * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Creator Insights */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Gaming Creator Landscape</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketData.influencerMetrics.topPlatforms.map((platform) => (
            <div key={platform.platform} className="text-center">
              <h4 className="font-semibold text-lg mb-2">{platform.platform}</h4>
              <p className="text-2xl font-bold text-primary mb-1">{platform.creators.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Active Creators</p>
              <p className="text-sm text-gray-500 mt-2">
                Avg: {(platform.avgFollowers / 1000).toFixed(0)}K followers
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">AI</span>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Market Intelligence Insights</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Racing games show 15.2% growth - perfect timing for Ozzy Arcade launch</li>
              <li>• TikTok dominates with 1,245 gaming creators - ideal for viral campaigns</li>
              <li>• Mobile gaming accounts for 89.9% of market - mobile-first strategy recommended</li>
              <li>• Average CPA in Vietnam racing category: $2.40 (vs $4.20 global average)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}