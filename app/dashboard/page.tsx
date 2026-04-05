'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import BriefingTemplate from '@/components/campaign/BriefingTemplate';
import SmartRecommendations from '@/components/campaign/SmartRecommendations';
import { Plus, X, Users, DollarSign, TrendingUp, Sparkles, Brain } from 'lucide-react';
import CountUp from 'react-countup';

// Mock data for creators
const availableCreators = [
  {
    id: 'alex-gamemaster',
    name: 'Alex GameMaster',
    avatar: '👨‍💻',
    followers: 125000,
    rate: 200,
    engagement: 8.5,
  },
  {
    id: 'sarah-plays',
    name: 'Sarah Plays',
    avatar: '👩‍🎮',
    followers: 250000,
    rate: 200,
    engagement: 7.2,
  },
  {
    id: 'gaming-with-mike',
    name: 'Gaming With Mike',
    avatar: '🎮',
    followers: 180000,
    rate: 200,
    engagement: 9.1,
  },
  {
    id: 'jessica-gamer',
    name: 'Jessica Gamer',
    avatar: '🕹️',
    followers: 320000,
    rate: 200,
    engagement: 6.8,
  },
  {
    id: 'pro-gamer-dave',
    name: 'Pro Gamer Dave',
    avatar: '🏆',
    followers: 420000,
    rate: 200,
    engagement: 7.5,
  },
  {
    id: 'gaming-guru',
    name: 'Gaming Guru',
    avatar: '🎯',
    followers: 510000,
    rate: 200,
    engagement: 8.2,
  },
];

// User acquisition packages
const acquisitionPackages = [
  { id: 'basic', name: 'Starter', downloads: 5000, price: 2500 },
  { id: 'standard', name: 'Growth', downloads: 10000, price: 4500 },
  { id: 'premium', name: 'Scale', downloads: 25000, price: 10000 },
  { id: 'enterprise', name: 'Enterprise', downloads: 100000, price: 35000 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCreators, setSelectedCreators] = useState<typeof availableCreators>([]);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [campaignData, setCampaignData] = useState({
    gameTitle: '',
    objective: '',
    budget: 0,
    targetRegions: ['north_america'],
    platformStrategy: 'cross_platform',
    timing: ''
  });
  
  // Calculate total audience reach
  const totalAudience = selectedCreators.reduce((sum, creator) => sum + creator.followers, 0);
  
  // Calculate total campaign cost
  const creatorsCost = selectedCreators.reduce((sum, creator) => {
    const baseFee = creator.rate;
    const platformFee = baseFee * 0.2;
    const managementFee = 200;
    return sum + baseFee + platformFee + managementFee;
  }, 0);
  
  // Add user acquisition cost if selected
  const acquisitionCost = selectedPackage 
    ? acquisitionPackages.find(pkg => pkg.id === selectedPackage)?.price || 0 
    : 0;
  
  const totalCost = creatorsCost + acquisitionCost;

  // Add creator to campaign
  const addCreator = (creator: typeof availableCreators[0]) => {
    if (!selectedCreators.some(c => c.id === creator.id)) {
      setSelectedCreators([...selectedCreators, creator]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  // Remove creator from campaign
  const removeCreator = (creatorId: string) => {
    setSelectedCreators(selectedCreators.filter(c => c.id !== creatorId));
  };

  // Select user acquisition package
  const selectPackage = (packageId: string) => {
    setSelectedPackage(packageId === selectedPackage ? null : packageId);
  };

  const TabButton = ({ id, label, isActive, onClick }: { id: string; label: string; isActive: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isActive 
          ? 'bg-primary text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Campaign Builder</h1>
      
      {/* Custom Tab Navigation */}
      <div className="flex gap-2 mb-8 border-b pb-4 overflow-x-auto">
        <TabButton 
          id="overview" 
          label="Overview" 
          isActive={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')} 
        />
        <TabButton 
          id="brief" 
          label="Campaign Brief" 
          isActive={activeTab === 'brief'} 
          onClick={() => setActiveTab('brief')} 
        />
        <TabButton 
          id="creators" 
          label="Select Creators" 
          isActive={activeTab === 'creators'} 
          onClick={() => setActiveTab('creators')} 
        />
        <TabButton 
          id="acquisition" 
          label="User Acquisition" 
          isActive={activeTab === 'acquisition'} 
          onClick={() => setActiveTab('acquisition')} 
        />
        <TabButton 
          id="payment" 
          label="Payment" 
          isActive={activeTab === 'payment'} 
          onClick={() => setActiveTab('payment')} 
        />
      </div>
      
      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Platform Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-r from-gaming/10 to-accent/10 rounded-xl p-6 border border-gaming/20">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-gaming" />
                  Welcome to Gamefluence.AI
                </h2>
                <p className="text-gray-600 mb-6">
                  Your AI-powered gaming influencer marketing platform with advanced analytics, 
                  real-time optimization, and comprehensive market intelligence.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gaming">89.2%</div>
                    <div className="text-sm text-gray-600">AI Prediction Accuracy</div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-accent">374.9%</div>
                    <div className="text-sm text-gray-600">Total Lift Measurement</div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button onClick={() => setActiveTab('brief')}>
                    Start New Campaign
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open('/dashboard/analytics', '_blank')}
                  >
                    View Analytics
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Quick Access
                </h3>
                <div className="space-y-3">
                  <Link href="/dashboard/market-intelligence" className="block">
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        🌏
                      </div>
                      <div>
                        <div className="font-medium text-sm">Market Intelligence</div>
                        <div className="text-xs text-gray-500">APAC insights</div>
                      </div>
                    </div>
                  </Link>
                  
                  <Link href="/dashboard/real-time" className="block">
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                        ⚡
                      </div>
                      <div>
                        <div className="font-medium text-sm">Real-Time Dashboard</div>
                        <div className="text-xs text-gray-500">Live monitoring</div>
                      </div>
                    </div>
                  </Link>
                  
                  <Link href="/dashboard/ai-insights" className="block">
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 bg-gaming/10 rounded-lg flex items-center justify-center">
                        🤖
                      </div>
                      <div>
                        <div className="font-medium text-sm">AI Insights</div>
                        <div className="text-xs text-gray-500">Advanced analytics</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Campaign Status */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Active Campaigns</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Campaign 1: Mystic Realms</h4>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Completed</span>
                </div>
                <div className="text-sm text-gray-600 mb-3">Vietnam market success</div>
                <div className="flex justify-between text-sm">
                  <span>ROI: 3.2x</span>
                  <span>Accuracy: 89.2%</span>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Campaign 2: Ozzy Arcade APAC</h4>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Active</span>
                </div>
                <div className="text-sm text-gray-600 mb-3">4 APAC markets expansion</div>
                <div className="flex justify-between text-sm">
                  <span>Budget: $2.5M</span>
                  <span>Expected: $9M revenue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'brief' && (
        <div className="space-y-8">
          <BriefingTemplate />
          
          {/* Smart Recommendations */}
          {campaignData.gameTitle && (
            <SmartRecommendations />
          )}
        </div>
      )}
      
      {activeTab === 'creators' && (
        <div className="space-y-8">
          {/* AI Creator Matching Integration */}
          <div className="card bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Brain className="text-primary w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">AI-Powered Creator Matching</h3>
                <p className="text-sm text-gray-600">
                  Our AI has analyzed your campaign and found the perfect creators for your game
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="text-primary w-4 h-4" />
                <span>Audience Match: 89% avg</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="text-success w-4 h-4" />
                <span>Predicted ROI: 3.2x avg</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="text-accent w-4 h-4" />
                <span>Brand Safety: 91% avg</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Available Creators */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-4">AI-Recommended Creators</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableCreators.map((creator) => (
                  <div key={creator.id} className="card hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl border-2 border-primary">
                        {creator.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold">{creator.name}</h3>
                        <p className="text-gray-600">{creator.followers.toLocaleString()} Followers</p>
                        <p className="text-sm text-gray-500">{creator.engagement}% Engagement</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-semibold">${creator.rate} base rate</span>
                      <Button 
                        onClick={() => addCreator(creator)}
                        disabled={selectedCreators.some(c => c.id === creator.id)}
                        className={selectedCreators.some(c => c.id === creator.id) ? 'opacity-50' : ''}
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        {selectedCreators.some(c => c.id === creator.id) ? 'Added' : 'Add'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Gamified Campaign Summary */}
            <div>
              <div className="card sticky top-4">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-gaming" />
                  <h2 className="text-xl font-bold">Campaign Power-Up!</h2>
                </div>
                
                {/* Audience Reach with Animation */}
                <div className="bg-gradient-to-r from-gaming/20 to-accent/20 rounded-lg p-4 mb-6 border border-gaming/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="text-gaming" />
                    <h3 className="font-semibold">Total Audience Reach</h3>
                  </div>
                  <div className="text-3xl font-bold text-gaming">
                    <CountUp 
                      end={totalAudience} 
                      separator="," 
                      duration={1.5}
                    />
                  </div>
                  {selectedCreators.length > 0 && (
                    <div className="text-sm text-gaming mt-1">
                      +{selectedCreators[selectedCreators.length - 1]?.followers.toLocaleString()} from latest addition! 🚀
                    </div>
                  )}
                </div>
                
                {/* Budget with Animation */}
                <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg p-4 mb-6 border border-primary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="text-primary" />
                    <h3 className="font-semibold">Total Investment</h3>
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    <CountUp 
                      prefix="$" 
                      end={totalCost} 
                      separator="," 
                      duration={1.5}
                    />
                  </div>
                </div>
                
                {/* Selected Creators */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Your Dream Team ({selectedCreators.length})</h3>
                  {selectedCreators.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Users size={48} className="mx-auto mb-2 opacity-50" />
                      <p>Start building your creator squad!</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selectedCreators.map((creator) => (
                        <div key={creator.id} className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-primary/5 p-3 rounded-md border">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                              {creator.avatar}
                            </div>
                            <div>
                              <span className="font-medium">{creator.name}</span>
                              <div className="text-xs text-gray-500">
                                {creator.followers.toLocaleString()} followers
                              </div>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeCreator(creator.id)}
                            className="text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={() => setActiveTab('acquisition')}
                    disabled={selectedCreators.length === 0}
                  >
                    Continue to User Acquisition →
                  </Button>
                  <Link href="/creators">
                    <Button variant="outline" className="w-full">
                      Browse More Creators
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'acquisition' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Acquisition Packages */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">User Acquisition Packages</h2>
            <p className="text-gray-600 mb-6">Boost your game&apos;s downloads with targeted user acquisition campaigns</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {acquisitionPackages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className={`card cursor-pointer transition-all hover:shadow-lg ${
                    selectedPackage === pkg.id ? 'border-2 border-primary bg-primary/5' : 'hover:border-primary/50'
                  }`}
                  onClick={() => selectPackage(pkg.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{pkg.name}</h3>
                    {selectedPackage === pkg.id && (
                      <div className="bg-primary text-white px-2 py-1 rounded-full text-xs">
                        Selected
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="text-success" />
                    <span className="font-semibold">{pkg.downloads.toLocaleString()} Downloads</span>
                  </div>
                  
                  <div className="text-2xl font-bold mb-4">${pkg.price.toLocaleString()}</div>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    ${(pkg.price / pkg.downloads).toFixed(2)} per download
                  </div>
                  
                  <Button 
                    variant={selectedPackage === pkg.id ? "default" : "outline"}
                    className="w-full"
                  >
                    {selectedPackage === pkg.id ? '✓ Selected' : 'Select Package'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Campaign Summary */}
          <div>
            <div className="card sticky top-4">
              <h2 className="text-xl font-bold mb-4">Campaign Summary</h2>
              
              {/* Total Reach */}
              <div className="bg-gradient-to-r from-gaming/20 to-accent/20 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="text-gaming" />
                  <h3 className="font-semibold">Influencer Reach</h3>
                </div>
                <div className="text-2xl font-bold text-gaming">
                  {totalAudience.toLocaleString()}
                </div>
              </div>
              
              {/* User Acquisition */}
              {selectedPackage && (
                <div className="bg-gradient-to-r from-success/20 to-primary/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="text-success" />
                    <h3 className="font-semibold">Additional Downloads</h3>
                  </div>
                  <div className="text-2xl font-bold text-success">
                    +{acquisitionPackages.find(pkg => pkg.id === selectedPackage)?.downloads.toLocaleString()}
                  </div>
                </div>
              )}
              
              {/* Budget Breakdown */}
              <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="text-primary" />
                  <h3 className="font-semibold">Total Investment</h3>
                </div>
                <div className="text-2xl font-bold text-primary">
                  ${totalCost.toLocaleString()}
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>Influencer Campaigns</span>
                  <span>${creatorsCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>User Acquisition</span>
                  <span>${acquisitionCost.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${totalCost.toLocaleString()}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mb-2" 
                onClick={() => setActiveTab('payment')}
                disabled={selectedCreators.length === 0}
              >
                Continue to Payment →
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setActiveTab('creators')}
              >
                ← Back to Creators
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'payment' && (
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Complete Your Campaign</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="paymentMethod" defaultChecked />
                    <div>
                      <div className="font-medium">💳 Credit Card</div>
                      <div className="text-sm text-gray-500">Instant processing</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="paymentMethod" />
                    <div>
                      <div className="font-medium">🏦 Bank Transfer</div>
                      <div className="text-sm text-gray-500">1-3 business days</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="paymentMethod" />
                    <div>
                      <div className="font-medium">📄 Invoice (Net 30)</div>
                      <div className="text-sm text-gray-500">For enterprise customers</div>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span>Influencer Campaigns ({selectedCreators.length} creators)</span>
                    <span className="font-medium">${creatorsCost.toLocaleString()}</span>
                  </div>
                  {selectedPackage && (
                    <div className="flex justify-between">
                      <span>User Acquisition ({acquisitionPackages.find(pkg => pkg.id === selectedPackage)?.name})</span>
                      <span className="font-medium">${acquisitionCost.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setActiveTab('acquisition')}
                >
                  ← Back
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => alert('Payment processing would be implemented here!')}
                >
                  Complete Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Confetti effect when adding creators */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}
    </main>
  );
}