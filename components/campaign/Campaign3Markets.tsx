'use client';

import React from 'react';
import { Campaign3MassiveAPAC } from '@/lib/campaign-3-massive-apac';
import { Globe, TrendingUp, Users, DollarSign } from 'lucide-react';
import CountUp from 'react-countup';

export default function Campaign3Markets() {
  const markets = Campaign3MassiveAPAC.getMarkets();
  
  const tier1Markets = markets.filter(m => m.tier === 1);
  const tier2Markets = markets.filter(m => m.tier === 2);
  const tier3Markets = markets.filter(m => m.tier === 3);

  const MarketCard = ({ market }: { market: any }) => {
    const getTierColor = (tier: number) => {
      switch (tier) {
        case 1: return 'bg-gradient-to-r from-yellow-400 to-orange-500';
        case 2: return 'bg-gradient-to-r from-blue-400 to-purple-500';
        case 3: return 'bg-gradient-to-r from-green-400 to-teal-500';
        default: return 'bg-gray-400';
      }
    };

    const getTierLabel = (tier: number) => {
      switch (tier) {
        case 1: return 'Primary Market';
        case 2: return 'Secondary Market';
        case 3: return 'Emerging Market';
        default: return 'Market';
      }
    };

    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className={`${getTierColor(market.tier)} p-4 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">{market.country}</h3>
              <p className="text-white/90 text-sm">{getTierLabel(market.tier)}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                <CountUp end={market.budgetPercentage} suffix="%" duration={1.5} />
              </div>
              <div className="text-white/90 text-xs">Budget Share</div>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                <DollarSign className="w-4 h-4" />
                Budget
              </div>
              <div className="font-semibold">
                $<CountUp end={market.budget / 1000000} decimals={1} suffix="M" duration={1.5} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                <Users className="w-4 h-4" />
                Creators
              </div>
              <div className="font-semibold">
                <CountUp end={market.creatorCount} duration={1.5} />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                <TrendingUp className="w-4 h-4" />
                Downloads
              </div>
              <div className="font-semibold">
                <CountUp end={market.expectedDownloads / 1000000} decimals={1} suffix="M" duration={1.5} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                <Globe className="w-4 h-4" />
                Revenue
              </div>
              <div className="font-semibold text-green-600">
                $<CountUp end={market.projectedRevenue / 1000000} decimals={1} suffix="M" duration={1.5} />
              </div>
            </div>
          </div>
          
          <div className="pt-3 border-t border-gray-100">
            <div className="text-sm text-gray-600 mb-2">Key Strategy:</div>
            <div className="text-sm font-medium">{market.keyStrategy}</div>
          </div>
          
          <div className="pt-2">
            <div className="text-sm text-gray-600 mb-2">Cultural Factors:</div>
            <div className="flex flex-wrap gap-1">
              {market.culturalFactors.map((factor: string, index: number) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {factor}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Tier 1 Markets */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T1</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Primary Markets</h2>
            <p className="text-gray-600">60% Budget • $5.1M • Highest ROI Focus</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tier1Markets.map((market) => (
            <MarketCard key={market.countryCode} market={market} />
          ))}
        </div>
      </div>

      {/* Tier 2 Markets */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T2</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Secondary Markets</h2>
            <p className="text-gray-600">25% Budget • $2.1M • Strategic Expansion</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tier2Markets.map((market) => (
            <MarketCard key={market.countryCode} market={market} />
          ))}
        </div>
      </div>

      {/* Tier 3 Markets */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T3</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Emerging Markets</h2>
            <p className="text-gray-600">15% Budget • $1.3M • Future Growth Potential</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tier3Markets.map((market) => (
            <MarketCard key={market.countryCode} market={market} />
          ))}
        </div>
      </div>

      {/* Market Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
        <h3 className="text-lg font-semibold mb-4">Market Expansion Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              <CountUp end={markets.length} duration={2} />
            </div>
            <div className="text-sm text-gray-600">Total Markets</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              <CountUp end={markets.reduce((sum, m) => sum + m.gamingPopulation, 0) / 1000000} decimals={0} suffix="M" duration={2} />
            </div>
            <div className="text-sm text-gray-600">Gaming Population</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              <CountUp end={markets.reduce((sum, m) => sum + m.expectedDownloads, 0) / 1000000} decimals={1} suffix="M" duration={2} />
            </div>
            <div className="text-sm text-gray-600">Total Downloads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              $<CountUp end={markets.reduce((sum, m) => sum + m.projectedRevenue, 0) / 1000000} decimals={1} suffix="M" duration={2} />
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
        </div>
      </div>
    </div>
  );
}