'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { 
  Play, 
  Users, 
  DollarSign, 
  Target, 
  CheckCircle,
  ArrowRight,
  FileText,
  CreditCard,
  Zap
} from 'lucide-react';

interface CampaignData {
  title: string;
  gameTitle: string;
  budget: number;
  targetAudience: string;
  platforms: string[];
  timeline: string;
  objectives: string[];
}

interface CreatorMatch {
  id: string;
  name: string;
  followers: number;
  engagement: number;
  cost: number;
  platforms: string[];
}

export default function MockCampaignFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState<CampaignData>({
    title: 'Epic RPG Launch Campaign',
    gameTitle: 'Mystic Realms: Chronicles',
    budget: 50000,
    targetAudience: '18-34 RPG Gamers',
    platforms: ['youtube', 'twitch', 'tiktok'],
    timeline: '30 days',
    objectives: ['Brand Awareness', 'Game Downloads', 'Community Building']
  });
  
  const [selectedCreators, setSelectedCreators] = useState<CreatorMatch[]>([]);
  const [totalReach, setTotalReach] = useState(0);

  const mockCreators: CreatorMatch[] = [
    {
      id: '1',
      name: 'GameMaster Pro',
      followers: 125000,
      engagement: 7.2,
      cost: 8500,
      platforms: ['youtube', 'twitch']
    },
    {
      id: '2', 
      name: 'StreamQueen',
      followers: 203000,
      engagement: 9.1,
      cost: 12500,
      platforms: ['twitch', 'youtube']
    },
    {
      id: '3',
      name: 'RPG_Legend',
      followers: 89000,
      engagement: 8.7,
      cost: 6200,
      platforms: ['youtube', 'tiktok']
    }
  ];

  const steps = [
    'Campaign Brief',
    'Creator Selection', 
    'Review & Pricing',
    'Payment',
    'Campaign Launch'
  ];

  const handleCreatorSelect = (creator: CreatorMatch) => {
    if (selectedCreators.find(c => c.id === creator.id)) {
      setSelectedCreators(selectedCreators.filter(c => c.id !== creator.id));
      setTotalReach(totalReach - creator.followers);
    } else {
      setSelectedCreators([...selectedCreators, creator]);
      setTotalReach(totalReach + creator.followers);
    }
  };

  const getTotalCost = () => {
    return selectedCreators.reduce((sum, creator) => sum + creator.cost, 0);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Campaign Brief
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Campaign Title</label>
                  <input 
                    type="text" 
                    value={campaignData.title}
                    onChange={(e) => setCampaignData({...campaignData, title: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Game Title</label>
                  <input 
                    type="text" 
                    value={campaignData.gameTitle}
                    onChange={(e) => setCampaignData({...campaignData, gameTitle: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Budget ($)</label>
                  <input 
                    type="number" 
                    value={campaignData.budget}
                    onChange={(e) => setCampaignData({...campaignData, budget: parseInt(e.target.value)})}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Timeline</label>
                  <select 
                    value={campaignData.timeline}
                    onChange={(e) => setCampaignData({...campaignData, timeline: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="7 days">7 days</option>
                    <option value="14 days">14 days</option>
                    <option value="30 days">30 days</option>
                    <option value="60 days">60 days</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Target Audience</label>
                <input 
                  type="text" 
                  value={campaignData.targetAudience}
                  onChange={(e) => setCampaignData({...campaignData, targetAudience: e.target.value})}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Creator Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCreators.map((creator) => (
                  <div 
                    key={creator.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedCreators.find(c => c.id === creator.id) 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleCreatorSelect(creator)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{creator.name}</h3>
                        <p className="text-sm text-gray-600">
                          {creator.followers.toLocaleString()} followers • {creator.engagement}% engagement
                        </p>
                        <p className="text-xs text-gray-500">
                          Platforms: {creator.platforms.join(', ')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${creator.cost.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">per campaign</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedCreators.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Selection Summary</h4>
                  <p>Selected Creators: {selectedCreators.length}</p>
                  <p>Total Reach: {totalReach.toLocaleString()}</p>
                  <p>Total Cost: ${getTotalCost().toLocaleString()}</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Review & Pricing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Campaign Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Campaign:</span>
                      <p className="font-medium">{campaignData.title}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Game:</span>
                      <p className="font-medium">{campaignData.gameTitle}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Budget:</span>
                      <p className="font-medium">${campaignData.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Timeline:</span>
                      <p className="font-medium">{campaignData.timeline}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Selected Creators</h3>
                  <div className="space-y-2">
                    {selectedCreators.map((creator) => (
                      <div key={creator.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <span>{creator.name}</span>
                        <span className="font-medium">${creator.cost.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total Campaign Cost:</span>
                    <span>${getTotalCost().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
                    <span>Estimated Reach:</span>
                    <span>{totalReach.toLocaleString()} people</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Demo Mode</h3>
                  <p className="text-blue-800 text-sm">
                    This is a demonstration. No actual payment will be processed.
                    All transactions show $0.00 for testing purposes.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Payment Summary</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span>Campaign Cost:</span>
                        <span className="line-through text-gray-500">${getTotalCost().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Platform Fee (5%):</span>
                        <span className="line-through text-gray-500">${Math.round(getTotalCost() * 0.05).toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Demo Total:</span>
                        <span className="text-green-600">$0.00</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Payment Method</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="payment" value="card" defaultChecked className="mr-2" />
                        Credit Card (Demo)
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="payment" value="paypal" className="mr-2" />
                        PayPal (Demo)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Campaign Launched Successfully!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Your campaign is now live!</h3>
                  <p className="text-gray-600">
                    {selectedCreators.length} creators have been notified and will begin content creation.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedCreators.length}</div>
                    <div className="text-sm text-gray-600">Creators</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{totalReach.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Est. Reach</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{campaignData.timeline}</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mock Campaign Flow</h1>
        <div className="text-sm text-gray-500">
          Step {currentStep} of {steps.length}: {steps[currentStep - 1]}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        ></div>
      </div>

      {/* Step Content */}
      {renderStep()}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        {currentStep < steps.length ? (
          <Button 
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={currentStep === 2 && selectedCreators.length === 0}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button 
            onClick={() => {
              setCurrentStep(1);
              setSelectedCreators([]);
              setTotalReach(0);
            }}
            className="flex items-center gap-2"
          >
            Start New Campaign
            <Play className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}