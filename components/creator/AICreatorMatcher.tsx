'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { 
  Brain, 
  Users, 
  TrendingUp, 
  Target, 
  Star, 
  Zap, 
  Filter,
  Search,
  CheckCircle,
  Eye,
  Heart,
  MessageCircle,
  DollarSign,
  Award,
  Globe
} from 'lucide-react';

interface CreatorProfile {
  id: string;
  name: string;
  avatar: string;
  platforms: string[];
  followers: number;
  engagement: number;
  niche: string[];
  location: string;
  languages: string[];
  rating: number;
  completedCampaigns: number;
  avgCPM: number;
  matchScore: number;
  strengths: string[];
  recentContent: string[];
}

interface MatchCriteria {
  budget: number;
  targetAudience: string;
  gameGenre: string[];
  platforms: string[];
  minFollowers: number;
  maxFollowers: number;
  minEngagement: number;
  location: string[];
  languages: string[];
}

export default function AICreatorMatcher() {
  const [creators, setCreators] = useState<CreatorProfile[]>([]);
  const [matchCriteria, setMatchCriteria] = useState<MatchCriteria>({
    budget: 50000,
    targetAudience: '18-34 gamers',
    gameGenre: ['RPG', 'Action'],
    platforms: ['youtube', 'twitch'],
    minFollowers: 10000,
    maxFollowers: 500000,
    minEngagement: 3.0,
    location: ['US', 'UK', 'CA'],
    languages: ['English']
  });
  const [isMatching, setIsMatching] = useState(false);
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);

  useEffect(() => {
    runAIMatching();
  }, [matchCriteria]);

  const runAIMatching = async () => {
    setIsMatching(true);
    
    // Simulate AI matching process
    setTimeout(() => {
      const sampleCreators: CreatorProfile[] = [
        {
          id: 'creator_1',
          name: 'GameMaster Pro',
          avatar: '/api/placeholder/64/64',
          platforms: ['youtube', 'twitch'],
          followers: 125000,
          engagement: 7.2,
          niche: ['RPG', 'Strategy', 'Reviews'],
          location: 'US',
          languages: ['English'],
          rating: 4.8,
          completedCampaigns: 23,
          avgCPM: 12.50,
          matchScore: 94,
          strengths: ['High engagement', 'RPG expertise', 'Consistent content'],
          recentContent: ['Epic Boss Battle Guide', 'New RPG Review', 'Strategy Tips']
        },
        {
          id: 'creator_2',
          name: 'StreamQueen',
          avatar: '/api/placeholder/64/64',
          platforms: ['twitch', 'youtube', 'tiktok'],
          followers: 89000,
          engagement: 8.1,
          niche: ['Action', 'Multiplayer', 'Live Streaming'],
          location: 'UK',
          languages: ['English'],
          rating: 4.6,
          completedCampaigns: 18,
          avgCPM: 15.20,
          matchScore: 87,
          strengths: ['Multi-platform presence', 'Live engagement', 'Young audience'],
          recentContent: ['Live Battle Royale', 'Gaming Setup Tour', 'Reaction Videos']
        },
        {
          id: 'creator_3',
          name: 'IndieGameExplorer',
          avatar: '/api/placeholder/64/64',
          platforms: ['youtube', 'twitter'],
          followers: 45000,
          engagement: 9.3,
          niche: ['Indie Games', 'Reviews', 'Discovery'],
          location: 'CA',
          languages: ['English', 'French'],
          rating: 4.9,
          completedCampaigns: 31,
          avgCPM: 8.75,
          matchScore: 82,
          strengths: ['Indie game expertise', 'High engagement', 'Authentic reviews'],
          recentContent: ['Hidden Gem Games', 'Indie Developer Interview', 'Game Discovery']
        }
      ];
      
      setCreators(sampleCreators.sort((a, b) => b.matchScore - a.matchScore));
      setIsMatching(false);
    }, 2000);
  };

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

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const toggleCreatorSelection = (creatorId: string) => {
    setSelectedCreators(prev => 
      prev.includes(creatorId) 
        ? prev.filter(id => id !== creatorId)
        : [...prev, creatorId]
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-600" />
            AI Creator Matcher
          </h1>
          <p className="text-muted-foreground">Find the perfect creators for your campaign using AI</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={runAIMatching} disabled={isMatching}>
            <Zap className="h-4 w-4 mr-2" />
            {isMatching ? 'Matching...' : 'Re-match'}
          </Button>
          <Button disabled={selectedCreators.length === 0}>
            Contact Selected ({selectedCreators.length})
          </Button>
        </div>
      </div>

      {/* Matching Criteria */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Matching Criteria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Budget:</span>
              <p className="font-medium">${matchCriteria.budget.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Audience:</span>
              <p className="font-medium">{matchCriteria.targetAudience}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Genres:</span>
              <p className="font-medium">{matchCriteria.gameGenre.join(', ')}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Platforms:</span>
              <p className="font-medium capitalize">{matchCriteria.platforms.join(', ')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Matching Status */}
      {isMatching && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <div>
                <h3 className="font-semibold">AI Matching in Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Analyzing creator profiles, audience alignment, and performance data...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Match Results */}
      {!isMatching && creators.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Found {creators.length} Matching Creators
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {creators.map(creator => (
              <Card key={creator.id} className={`transition-all ${
                selectedCreators.includes(creator.id) ? 'ring-2 ring-blue-500' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Creator Avatar & Basic Info */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="h-8 w-8 text-gray-400" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold">{creator.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Globe className="h-3 w-3" />
                            <span>{creator.location}</span>
                            <span>•</span>
                            <span>{creator.languages.join(', ')}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${getMatchScoreColor(creator.matchScore)}`}>
                            {creator.matchScore}% Match
                          </span>
                        </div>
                      </div>

                      {/* Platforms */}
                      <div className="flex items-center gap-2 mb-3">
                        {creator.platforms.map(platform => (
                          <span key={platform} className="px-2 py-1 bg-gray-100 rounded-md text-xs flex items-center gap-1">
                            <span>{getPlatformIcon(platform)}</span>
                            {platform}
                          </span>
                        ))}
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <Users className="h-3 w-3" />
                            <span className="font-medium">{formatNumber(creator.followers)}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Followers</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <Heart className="h-3 w-3" />
                            <span className="font-medium">{creator.engagement}%</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Engagement</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <Star className="h-3 w-3" />
                            <span className="font-medium">{creator.rating}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <DollarSign className="h-3 w-3" />
                            <span className="font-medium">${creator.avgCPM}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Avg CPM</div>
                        </div>
                      </div>

                      {/* Strengths */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Key Strengths:</h4>
                        <div className="flex flex-wrap gap-1">
                          {creator.strengths.map((strength, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                              {strength}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Recent Content */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Recent Content:</h4>
                        <div className="text-sm text-muted-foreground">
                          {creator.recentContent.join(' • ')}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          {creator.completedCampaigns} completed campaigns
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleCreatorSelection(creator.id)}
                          >
                            {selectedCreators.includes(creator.id) ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Selected
                              </>
                            ) : (
                              'Select'
                            )}
                          </Button>
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                          <Button size="sm">
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Selected Creators Summary */}
      {selectedCreators.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">
                  {selectedCreators.length} Creators Selected
                </h3>
                <p className="text-sm text-blue-700">
                  Combined reach: {formatNumber(
                    creators
                      .filter(c => selectedCreators.includes(c.id))
                      .reduce((sum, c) => sum + c.followers, 0)
                  )} followers
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedCreators([])}>
                  Clear Selection
                </Button>
                <Button>
                  Create Campaign
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}