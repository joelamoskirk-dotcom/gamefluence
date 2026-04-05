'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Check, Shield, Users, TrendingUp, DollarSign, Filter, Search } from 'lucide-react';
import CountUp from 'react-countup';

// Mock creators with relevance scoring and brand safety
const creators = [
  {
    id: 'alex-gamemaster',
    name: 'Alex GameMaster',
    avatar: '👨‍💻',
    followers: 125000,
    engagement: 8.5,
    rate: 200,
    brandSafetyScore: 95,
    relevanceScore: 98,
    platforms: ['twitch', 'youtube'],
    topGames: ['Apex Legends', 'Call of Duty', 'Valorant'],
    demographics: { age: '18-34', gender: 'M65/F35' },
    recentPerformance: { avgViews: 45000, avgEngagement: 8.2 }
  },
  {
    id: 'sarah-plays',
    name: 'Sarah Plays',
    avatar: '👩‍🎮',
    followers: 250000,
    engagement: 7.2,
    rate: 200,
    brandSafetyScore: 98,
    relevanceScore: 92,
    platforms: ['youtube', 'instagram'],
    topGames: ['Minecraft', 'Fortnite', 'Among Us'],
    demographics: { age: '16-28', gender: 'M45/F55' },
    recentPerformance: { avgViews: 85000, avgEngagement: 7.8 }
  },
  {
    id: 'gaming-with-mike',
    name: 'Gaming With Mike',
    avatar: '🎮',
    followers: 180000,
    engagement: 9.1,
    rate: 200,
    brandSafetyScore: 88,
    relevanceScore: 89,
    platforms: ['twitch', 'youtube'],
    topGames: ['League of Legends', 'Valorant', 'CS2'],
    demographics: { age: '20-35', gender: 'M75/F25' },
    recentPerformance: { avgViews: 62000, avgEngagement: 9.5 }
  },
  {
    id: 'jessica-gamer',
    name: 'Jessica Gamer',
    avatar: '🕹️',
    followers: 320000,
    engagement: 6.8,
    rate: 200,
    brandSafetyScore: 92,
    relevanceScore: 85,
    platforms: ['youtube', 'instagram', 'twitch'],
    topGames: ['Among Us', 'Fall Guys', 'Genshin Impact'],
    demographics: { age: '18-30', gender: 'M40/F60' },
    recentPerformance: { avgViews: 120000, avgEngagement: 6.9 }
  },
  {
    id: 'pro-gamer-dave',
    name: 'Pro Gamer Dave',
    avatar: '🏆',
    followers: 420000,
    engagement: 7.5,
    rate: 200,
    brandSafetyScore: 85,
    relevanceScore: 82,
    platforms: ['twitch', 'youtube'],
    topGames: ['Counter-Strike', 'Dota 2', 'Apex Legends'],
    demographics: { age: '22-40', gender: 'M80/F20' },
    recentPerformance: { avgViews: 180000, avgEngagement: 7.2 }
  },
  {
    id: 'gaming-guru',
    name: 'Gaming Guru',
    avatar: '🎯',
    followers: 510000,
    engagement: 8.2,
    rate: 200,
    brandSafetyScore: 90,
    relevanceScore: 78,
    platforms: ['youtube', 'instagram'],
    topGames: ['Overwatch', 'Rainbow Six Siege', 'Valorant'],
    demographics: { age: '20-35', gender: 'M70/F30' },
    recentPerformance: { avgViews: 220000, avgEngagement: 8.0 }
  }
];

export default function CreatorSelection() {
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [filterBrandSafety, setFilterBrandSafety] = useState(80);

  // Sort creators by relevance score (default)
  const sortedCreators = [...creators]
    .filter(creator => 
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      creator.brandSafetyScore >= filterBrandSafety
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          return b.relevanceScore - a.relevanceScore;
        case 'followers':
          return b.followers - a.followers;
        case 'engagement':
          return b.engagement - a.engagement;
        case 'brandSafety':
          return b.brandSafetyScore - a.brandSafetyScore;
        default:
          return b.relevanceScore - a.relevanceScore;
      }
    });

  const toggleCreator = (creatorId: string) => {
    setSelectedCreators(prev => 
      prev.includes(creatorId) 
        ? prev.filter(id => id !== creatorId)
        : [...prev, creatorId]
    );
  };

  // Calculate totals
  const selectedCreatorData = creators.filter(c => selectedCreators.includes(c.id));
  const totalReach = selectedCreatorData.reduce((sum, c) => sum + c.followers, 0);
  const totalCost = selectedCreatorData.reduce((sum, creator) => {
    const baseFee = creator.rate;
    const platformFee = baseFee * 0.2;
    return sum + baseFee + platformFee;
  }, 0);
  
  // Campaign management fee: $250 per 5k followers increment
  const managementFee = Math.ceil(totalReach / 5000) * 250;
  const grandTotal = totalCost + managementFee;

  const getBrandSafetyColor = (score: number) => {
    if (score >= 95) return 'text-green-600 bg-green-100';
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 85) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/dashboard/brand" className="flex items-center text-primary mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Select Creators</h1>
          <p className="text-gray-600">Creators ranked by relevance to your campaign brief</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters & Search */}
        <div className="lg:col-span-1">
          <div className="card sticky top-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    placeholder="Search creators..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="relevance">Relevance Score</option>
                  <option value="followers">Followers</option>
                  <option value="engagement">Engagement</option>
                  <option value="brandSafety">Brand Safety</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Min Brand Safety: {filterBrandSafety}%
                </label>
                <input
                  type="range"
                  min="70"
                  max="100"
                  value={filterBrandSafety}
                  onChange={(e) => setFilterBrandSafety(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Creator List */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {sortedCreators.map((creator) => (
              <div 
                key={creator.id} 
                className={`card hover:shadow-lg transition-all cursor-pointer ${
                  selectedCreators.includes(creator.id) ? 'border-2 border-primary bg-primary/5' : ''
                }`}
                onClick={() => toggleCreator(creator.id)}
              >
                <div className="flex items-start gap-4">
                  {/* Selection Checkbox */}
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                    selectedCreators.includes(creator.id) 
                      ? 'bg-primary border-primary text-white' 
                      : 'border-gray-300'
                  }`}>
                    {selectedCreators.includes(creator.id) && <Check className="w-4 h-4" />}
                  </div>

                  {/* Creator Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                        {creator.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{creator.name}</h3>
                        <p className="text-gray-600">{creator.followers.toLocaleString()} followers</p>
                      </div>
                      
                      {/* Relevance Score */}
                      <div className="bg-primary/10 px-3 py-1 rounded-full">
                        <span className="text-primary font-semibold">{creator.relevanceScore}% match</span>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-4 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Engagement</div>
                        <div className="font-semibold">{creator.engagement}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Avg Views</div>
                        <div className="font-semibold">{(creator.recentPerformance.avgViews / 1000).toFixed(0)}K</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Rate</div>
                        <div className="font-semibold">${creator.rate}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500">Demographics</div>
                        <div className="font-semibold text-xs">{creator.demographics.age}</div>
                      </div>
                    </div>

                    {/* Brand Safety Score */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">UPLVLD Brand Safety</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getBrandSafetyColor(creator.brandSafetyScore)}`}>
                        {creator.brandSafetyScore}/100
                      </div>
                    </div>

                    {/* Top Games */}
                    <div className="flex flex-wrap gap-1">
                      {creator.topGames.slice(0, 3).map(game => (
                        <span key={game} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                          {game}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-4">
            <h3 className="font-semibold mb-4">Campaign Summary</h3>
            
            {/* Total Reach */}
            <div className="bg-gradient-to-r from-gaming/20 to-accent/20 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="text-gaming w-4 h-4" />
                <span className="text-sm font-medium">Total Reach</span>
              </div>
              <div className="text-2xl font-bold text-gaming">
                <CountUp end={totalReach} separator="," duration={1} />
              </div>
            </div>

            {/* Total Cost */}
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="text-primary w-4 h-4" />
                <span className="text-sm font-medium">Total Investment</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                $<CountUp end={grandTotal} separator="," duration={1} />
              </div>
            </div>

            {/* Cost Breakdown */}
            {selectedCreators.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium mb-2">Cost Breakdown</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Creator fees + platform (20%)</span>
                    <span>${totalCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Management fee ({Math.ceil(totalReach / 5000)} × $250)</span>
                    <span>${managementFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-1 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Selected Creators */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Selected Creators ({selectedCreators.length})</h4>
              {selectedCreators.length === 0 ? (
                <p className="text-sm text-gray-500">No creators selected yet</p>
              ) : (
                <div className="space-y-2">
                  {selectedCreatorData.map(creator => (
                    <div key={creator.id} className="flex items-center justify-between bg-white p-2 rounded border">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{creator.avatar}</span>
                        <span className="text-sm font-medium">{creator.name}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCreator(creator.id);
                        }}
                        className="text-red-500 hover:bg-red-50 p-1 rounded"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button 
              className="w-full" 
              disabled={selectedCreators.length === 0}
              onClick={() => alert('Campaign brief sent to selected creators!')}
            >
              Send Brief to Creators
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}