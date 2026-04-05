// Enhanced Gamefluence Score System with 5-Tier Speedometer
'use client';

import React from 'react';
import { Star, Zap, Crown, Award, Medal } from 'lucide-react';

interface GamefluenceScoreProps {
  score: number; // 0-100 detailed percentage (backend only)
  creatorId: string;
  showDetailed?: boolean; // Only show detailed to admin/backend
}

interface ScoreTier {
  name: string;
  range: [number, number];
  color: string;
  bgColor: string;
  icon: React.ComponentType<any>;
  description: string;
  benefits: string[];
}

const SCORE_TIERS: ScoreTier[] = [
  {
    name: 'Diamond Elite',
    range: [90, 100],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
    icon: Crown,
    description: 'Legendary gaming influencer with exceptional impact',
    benefits: ['Premium campaign priority', 'Exclusive brand partnerships', 'Custom rate negotiations']
  },
  {
    name: 'Platinum Pro',
    range: [80, 89],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
    icon: Star,
    description: 'Top-tier creator with consistent high performance',
    benefits: ['Priority campaign access', 'Performance bonuses', 'Direct brand connections']
  },
  {
    name: 'Gold Standard',
    range: [70, 79],
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 border-yellow-200',
    icon: Award,
    description: 'Reliable creator with strong audience engagement',
    benefits: ['Regular campaign invites', 'Standard rates', 'Growth support']
  },
  {
    name: 'Silver Rising',
    range: [60, 69],
    color: 'text-gray-600',
    bgColor: 'bg-gray-50 border-gray-200',
    icon: Medal,
    description: 'Emerging creator with growth potential',
    benefits: ['Campaign opportunities', 'Mentorship access', 'Skill development']
  },
  {
    name: 'Bronze Starter',
    range: [0, 59],
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    icon: Zap,
    description: 'New creator building their gaming influence',
    benefits: ['Entry-level campaigns', 'Training resources', 'Community support']
  }
];

export default function GamefluenceScoreSystem({ 
  score, 
  creatorId, 
  showDetailed = false 
}: GamefluenceScoreProps) {
  
  const getCurrentTier = (score: number): ScoreTier => {
    return SCORE_TIERS.find(tier => 
      score >= tier.range[0] && score <= tier.range[1]
    ) || SCORE_TIERS[4]; // Default to Bronze if no match
  };

  const currentTier = getCurrentTier(score);
  const IconComponent = currentTier.icon;

  // Calculate speedometer position (0-180 degrees)
  const getSpeedometerAngle = (score: number): number => {
    return (score / 100) * 180;
  };

  const angle = getSpeedometerAngle(score);

  return (
    <div className="space-y-6">
      {/* Speedometer Visualization */}
      <div className="card">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-2">Gamefluence Score</h3>
          <p className="text-gray-600">Proprietary influence measurement system</p>
        </div>

        {/* Speedometer SVG */}
        <div className="relative flex justify-center mb-6">
          <svg width="300" height="180" viewBox="0 0 300 180" className="overflow-visible">
            {/* Background Arc */}
            <path
              d="M 30 150 A 120 120 0 0 1 270 150"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="20"
              strokeLinecap="round"
            />
            
            {/* Tier Segments */}
            {SCORE_TIERS.map((tier, index) => {
              const startAngle = (tier.range[0] / 100) * 180;
              const endAngle = (tier.range[1] / 100) * 180;
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              
              const x1 = 150 + 120 * Math.cos(Math.PI - startRad);
              const y1 = 150 - 120 * Math.sin(Math.PI - startRad);
              const x2 = 150 + 120 * Math.cos(Math.PI - endRad);
              const y2 = 150 - 120 * Math.sin(Math.PI - endRad);
              
              const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
              
              return (
                <path
                  key={tier.name}
                  d={`M ${x1} ${y1} A 120 120 0 ${largeArcFlag} 1 ${x2} ${y2}`}
                  fill="none"
                  stroke={tier.color.replace('text-', '#').replace('-600', '')}
                  strokeWidth="20"
                  strokeLinecap="round"
                  opacity={score >= tier.range[0] && score <= tier.range[1] ? 1 : 0.3}
                />
              );
            })}
            
            {/* Score Needle */}
            <g transform={`rotate(${angle - 90} 150 150)`}>
              <line
                x1="150"
                y1="150"
                x2="150"
                y2="50"
                stroke="#1f2937"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle
                cx="150"
                cy="150"
                r="8"
                fill="#1f2937"
              />
            </g>
            
            {/* Center Score Display */}
            <text
              x="150"
              y="140"
              textAnchor="middle"
              className="text-2xl font-bold fill-current"
            >
              {showDetailed ? score.toFixed(1) : Math.floor(score)}
            </text>
            <text
              x="150"
              y="160"
              textAnchor="middle"
              className="text-sm fill-gray-500"
            >
              {showDetailed ? 'Detailed Score' : 'Influence Level'}
            </text>
          </svg>
        </div>

        {/* Current Tier Display */}
        <div className={`border-2 rounded-lg p-4 ${currentTier.bgColor}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-full bg-white ${currentTier.color}`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h4 className={`text-lg font-bold ${currentTier.color}`}>
                {currentTier.name}
              </h4>
              <p className="text-sm text-gray-600">{currentTier.description}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h5 className="font-semibold text-sm">Tier Benefits:</h5>
            <ul className="text-sm space-y-1">
              {currentTier.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60"></div>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tier Progression */}
      <div className="card">
        <h4 className="font-bold mb-4">Tier Progression</h4>
        <div className="space-y-3">
          {SCORE_TIERS.map((tier, index) => {
            const isCurrentTier = score >= tier.range[0] && score <= tier.range[1];
            const isAchieved = score > tier.range[1];
            const TierIcon = tier.icon;
            
            return (
              <div 
                key={tier.name}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                  isCurrentTier ? tier.bgColor : 
                  isAchieved ? 'bg-green-50 border-green-200' : 
                  'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  isCurrentTier ? 'bg-white' : 
                  isAchieved ? 'bg-green-100' : 
                  'bg-gray-100'
                }`}>
                  <TierIcon className={`w-5 h-5 ${
                    isCurrentTier ? tier.color : 
                    isAchieved ? 'text-green-600' : 
                    'text-gray-400'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${
                      isCurrentTier ? tier.color : 
                      isAchieved ? 'text-green-600' : 
                      'text-gray-400'
                    }`}>
                      {tier.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {tier.range[0]}-{tier.range[1]}
                    </span>
                  </div>
                  
                  {isCurrentTier && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress in tier</span>
                        <span>{score - tier.range[0]} / {tier.range[1] - tier.range[0]} points</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${tier.color.replace('text-', 'bg-')}`}
                          style={{ 
                            width: `${((score - tier.range[0]) / (tier.range[1] - tier.range[0])) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {isCurrentTier && (
                  <div className="text-xs font-semibold bg-white px-2 py-1 rounded">
                    CURRENT
                  </div>
                )}
                {isAchieved && (
                  <div className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">
                    ACHIEVED
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Score Breakdown (Admin Only) */}
      {showDetailed && (
        <div className="card">
          <h4 className="font-bold mb-4">Score Breakdown (Admin View)</h4>
          <div className="space-y-3">
            {[
              { factor: 'Audience Engagement', weight: 30, score: 85 },
              { factor: 'Content Quality', weight: 25, score: 92 },
              { factor: 'Brand Safety', weight: 20, score: 96 },
              { factor: 'Consistency', weight: 15, score: 78 },
              { factor: 'Growth Trend', weight: 10, score: 88 }
            ].map(factor => (
              <div key={factor.factor} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{factor.factor}</span>
                    <span>{factor.weight}% weight</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${factor.score}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-4 text-sm font-semibold w-12 text-right">
                  {factor.score}/100
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}