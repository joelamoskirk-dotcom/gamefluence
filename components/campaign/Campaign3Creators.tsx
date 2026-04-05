'use client';

import React, { useState } from 'react';
import { Campaign3MassiveAPAC } from '@/lib/campaign-3-massive-apac';
import { 
  Users, 
  Star, 
  TrendingUp, 
  DollarSign, 
  Globe,
  Zap,
  Heart,
  Award
} from 'lucide-react';
import CountUp from 'react-countup';

export default function Campaign3Creators() {
  const [selectedTier, setSelectedTier] = useState('all');
  const creators = Campaign3MassiveAPAC.getTopCreators();
  const collaborations = Campaign3MassiveAPAC.getCollaborations();

  const filteredCreators = selectedTier === 'all' 
    ? creators 
    : creators.filter(c => c.tier === selectedTier);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'diamond': return 'from-purple-500 to-pink-500';
      case 'platinum': return 'from-gray-400 to-gray-600';
      case 'gold': return 'from-yellow-400 to-orange-500';
      case 'silver': return 'from-gray-300 to-gray-500';
      case 'bronze': return 'from-orange-400 to-red-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'diamond': return '💎';
      case 'platinum': return '🏆';
      case 'gold': return '🥇';
      case 'silver': return '🥈';
      case 'bronze': return '🥉';
      default: return '⭐';
    }
  };

  const CreatorCard = ({ creator }: { creator: any }) => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className={`bg-gradient-to-r ${getTierColor(creator.tier)} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{getTierIcon(creator.tier)}</div>
            <div>
              <h3 className="font-bold">{creator.name}</h3>
              <p className="text-white/90 text-sm capitalize">{creator.tier} Tier • {creator.market}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">
              <CountUp end={creator.aiScore} decimals={1} duration={1.5} />
            </div>
            <div className="text-white/90 text-xs">AI Score</div>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <Users className="w-4 h-4" />
              Followers
            </div>
            <div className="font-semibold">
              <CountUp end={creator.followers / 1000000} decimals={1} suffix="M" duration={1.5} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <Heart className="w-4 h-4" />
              Engagement
            </div>
            <div className="font-semibold">
              <CountUp end={creator.engagement} decimals={1} suffix="%" duration={1.5} />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <DollarSign className="w-4 h-4" />
              Budget
            </div>
            <div className="font-semibold text-green-600">
              $<CountUp end={creator.budget / 1000} suffix="K" duration={1.5} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <TrendingUp className="w-4 h-4" />
              Expected Reach
            </div>
            <div className="font-semibold">
              <CountUp end={creator.expectedReach / 1000000} decimals={1} suffix="M" duration={1.5} />
            </div>
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-100">
          <div className="text-sm text-gray-600 mb-2">Specialties:</div>
          <div className="flex flex-wrap gap-1">
            {creator.specialties.map((specialty: string, index: number) => (
              <span 
                key={index}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <div className="text-xs text-gray-500">Collaboration Potential</div>
            <div className="flex items-center gap-1">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${creator.collaborationPotential}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium">{creator.collaborationPotential}%</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Cultural Fit</div>
            <div className="flex items-center gap-1">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${creator.culturalFit}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium">{creator.culturalFit}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CollaborationCard = ({ collaboration }: { collaboration: any }) => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold">{collaboration.name}</h3>
            <p className="text-gray-600 text-sm capitalize">{collaboration.type.replace('_', ' ')}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-purple-600">
            <CountUp end={collaboration.synergyScore} decimals={1} duration={1.5} />
          </div>
          <div className="text-gray-500 text-xs">Synergy Score</div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <div className="text-sm text-gray-600">Creators</div>
          <div className="font-semibold">{collaboration.creators.length}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Markets</div>
          <div className="font-semibold">{collaboration.markets.length}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Amplification</div>
          <div className="font-semibold text-green-600">{collaboration.expectedAmplification}x</div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">Markets:</div>
        <div className="flex flex-wrap gap-1">
          {collaboration.markets.map((market: string, index: number) => (
            <span 
              key={index}
              className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
            >
              {market}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div>
          <span className="text-sm text-gray-600">Budget: </span>
          <span className="font-semibold">${(collaboration.budget / 1000).toLocaleString()}K</span>
        </div>
        <div>
          <span className="text-sm text-gray-600">Timeline: </span>
          <span className="font-semibold">{collaboration.timeline}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Creator Tier Filter */}
      <div className="flex flex-wrap gap-2">
        {['all', 'diamond', 'platinum', 'gold', 'silver', 'bronze'].map((tier) => (
          <button
            key={tier}
            onClick={() => setSelectedTier(tier)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTier === tier
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tier === 'all' ? 'All Tiers' : `${getTierIcon(tier)} ${tier.charAt(0).toUpperCase() + tier.slice(1)}`}
          </button>
        ))}
      </div>

      {/* Creator Network Overview */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-600" />
          250 Creator Network Distribution
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">10</div>
            <div className="text-sm text-gray-600">💎 Diamond</div>
            <div className="text-xs text-gray-500">$2.1M Budget</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">25</div>
            <div className="text-sm text-gray-600">🏆 Platinum</div>
            <div className="text-xs text-gray-500">$2.0M Budget</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">50</div>
            <div className="text-sm text-gray-600">🥇 Gold</div>
            <div className="text-xs text-gray-500">$2.1M Budget</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-500">75</div>
            <div className="text-sm text-gray-600">🥈 Silver</div>
            <div className="text-xs text-gray-500">$1.5M Budget</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">90</div>
            <div className="text-sm text-gray-600">🥉 Bronze</div>
            <div className="text-xs text-gray-500">$800K Budget</div>
          </div>
        </div>
      </div>

      {/* Top Creators */}
      <div>
        <h3 className="text-xl font-bold mb-6">
          {selectedTier === 'all' ? 'Top AI-Recommended Creators' : `${selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)} Tier Creators`}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </div>

      {/* AI-Powered Collaborations */}
      <div>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-purple-600" />
          AI-Discovered Collaborations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collaborations.map((collaboration) => (
            <CollaborationCard key={collaboration.id} collaboration={collaboration} />
          ))}
        </div>
      </div>
    </div>
  );
}