'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import Campaign3Dashboard from '@/components/campaign/Campaign3Dashboard';
import SmartReactivationBuilder from '@/components/campaign/SmartReactivationBuilder';
import { 
  Trophy, 
  RefreshCw, 
  BarChart3, 
  Users,
  Target,
  TrendingUp,
  ArrowRight,
  Star,
  CheckCircle,
  Zap,
  Copy,
  Play
} from 'lucide-react';

type DashboardView = 'success' | 'reactivation' | 'analytics';

export default function Campaign3Page() {
  const [currentView, setCurrentView] = useState<DashboardView>('success');

  const SuccessOverview = () => (
    <div className="space-y-8">
      {/* Hero Success Banner */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-12 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10" />
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Campaign Success! 🎉
          </h1>
          <p className="text-xl text-green-100 mb-8">
            TrueMove Gaming Pro X1 Launch exceeded all expectations with incredible results
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">4.2x</div>
              <div className="text-green-100">ROI Achieved</div>
              <div className="text-sm text-green-200">+68% vs target</div>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">2.8M</div>
              <div className="text-green-100">Total Reach</div>
              <div className="text-sm text-green-200">+35% vs target</div>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">15.6K</div>
              <div className="text-green-100">App Downloads</div>
              <div className="text-sm text-green-200">+22% vs target</div>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">96%</div>
              <div className="text-green-100">Success Rate</div>
              <div className="text-sm text-green-200">All objectives met</div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => setCurrentView('success')}
              className="bg-white text-green-600 hover:bg-green-50 text-lg px-8 py-4"
            >
              View Full Dashboard
              <BarChart3 className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              onClick={() => setCurrentView('reactivation')}
              className="bg-green-500 hover:bg-green-400 text-white text-lg px-8 py-4"
            >
              Launch Next Campaign
              <RefreshCw className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Key Success Factors */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">What Made This Campaign So Successful?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Perfect Creator Mix</h3>
            <p className="text-gray-600 text-sm mb-4">
              Strategic blend of mega, macro, and micro influencers maximized reach and engagement
            </p>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-sm font-semibold text-blue-800">Top Performer:</div>
              <div className="text-sm text-blue-600">CasualGamerGirl - 6.2x ROI</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Precise Targeting</h3>
            <p className="text-gray-600 text-sm mb-4">
              AI-powered audience analysis identified the perfect Thai gaming demographics
            </p>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-sm font-semibold text-green-800">Best Segment:</div>
              <div className="text-sm text-green-600">Bangkok Gamers 18-24</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Optimized Content</h3>
            <p className="text-gray-600 text-sm mb-4">
              TikTok-first strategy with authentic gaming content drove massive engagement
            </p>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-sm font-semibold text-purple-800">Top Format:</div>
              <div className="text-sm text-purple-600">Gaming Challenge Videos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Testimonial */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-8 h-8" />
          </div>
          <blockquote className="text-xl font-medium mb-6">
            "This campaign was a game-changer for us! The ROI exceeded our wildest expectations, 
            and the gaming community response was incredible. The agency partnership model worked 
            perfectly - transparent, profitable, and results-driven."
          </blockquote>
          <div className="text-blue-100">
            <div className="font-semibold">Siriporn Tanaka</div>
            <div className="text-sm">Marketing Director, TrueMove Digital Electronics</div>
          </div>
        </div>
      </div>

      {/* Agency Success */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Agency Partnership Success</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Digital Boost Thailand Results
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Client Revenue:</span>
                <span className="font-bold">฿194,775</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Agency Commission (12%):</span>
                <span className="font-bold text-green-600">฿18,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Strategic Markup (5%):</span>
                <span className="font-bold text-blue-600">฿7,500</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-bold">Total Agency Earnings:</span>
                <span className="font-bold text-green-600 text-lg">฿25,500</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Partnership Benefits
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>17% total margin on campaign</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Client satisfaction: 96%</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Transparent billing accepted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Follow-up campaigns secured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Template saved for reuse</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8 border border-yellow-200">
        <h2 className="text-2xl font-bold mb-6 text-center">Ready for Your Next Success?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <Copy className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Duplicate Campaign</h3>
            <p className="text-sm text-gray-600 mb-4">
              Use the same successful formula for new products
            </p>
            <Button 
              onClick={() => setCurrentView('reactivation')}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full"
            >
              Start Now
            </Button>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <RefreshCw className="w-8 h-8 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Reactivate Creators</h3>
            <p className="text-sm text-gray-600 mb-4">
              Launch follow-up with same high-performing creators
            </p>
            <Button 
              onClick={() => setCurrentView('reactivation')}
              className="bg-green-600 hover:bg-green-700 text-white w-full"
            >
              Reactivate
            </Button>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <Target className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Expand Markets</h3>
            <p className="text-sm text-gray-600 mb-4">
              Take successful campaign to Vietnam, Indonesia
            </p>
            <Button 
              onClick={() => setCurrentView('reactivation')}
              className="bg-purple-600 hover:bg-purple-700 text-white w-full"
            >
              Expand
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Trophy className="w-8 h-8 text-green-600" />
              <h1 className="text-xl font-bold">Campaign Success Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setCurrentView('success')}
                className={`text-sm ${currentView === 'success' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Success Dashboard
              </Button>
              <Button
                onClick={() => setCurrentView('reactivation')}
                className={`text-sm ${currentView === 'reactivation' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Smart Reactivation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {currentView === 'success' && <Campaign3Dashboard />}
        {currentView === 'reactivation' && <SmartReactivationBuilder />}
      </div>
    </div>
  );
}