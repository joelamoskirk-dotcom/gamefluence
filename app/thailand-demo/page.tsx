'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import BetaAccessRequest from '@/components/beta/BetaAccessRequest';
import ThailandAmanotesCampaign from '@/components/campaign/ThailandAmanotesCampaign';
import MobileBetaApproval from '@/components/admin/MobileBetaApproval';
import { 
  Play, 
  Users, 
  Target, 
  BarChart3, 
  Smartphone, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Trophy,
  Music,
  GamepadIcon
} from 'lucide-react';

type DemoStep = 'landing' | 'beta-request' | 'admin-approval' | 'campaign-builder' | 'results';

export default function ThailandDemoPage() {
  const [currentStep, setCurrentStep] = useState<DemoStep>('landing');
  const [userType, setUserType] = useState<'buyer' | 'admin'>('buyer');

  const steps = [
    { id: 'landing', title: 'Landing Page', icon: Globe },
    { id: 'beta-request', title: 'Beta Access Request', icon: Users },
    { id: 'admin-approval', title: 'Mobile Approval', icon: Smartphone },
    { id: 'campaign-builder', title: 'Campaign Builder', icon: Target },
    { id: 'results', title: 'Results & Analytics', icon: BarChart3 }
  ];

  const LandingDemo = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-12 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            Gamefluence.AI Thailand
          </h1>
          <p className="text-xl text-purple-100 mb-8">
            Connect with Thailand's top gaming creators and launch campaigns that drive real results
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 rounded-lg p-6">
              <Music className="w-8 h-8 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Music Gaming Focus</h3>
              <p className="text-sm text-purple-100">
                Specialized in rhythm games like Beat Fever, Piano Tiles
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <Users className="w-8 h-8 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">32M Thai Gamers</h3>
              <p className="text-sm text-purple-100">
                Reach Thailand's massive gaming community
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <Zap className="w-8 h-8 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">AI-Powered Matching</h3>
              <p className="text-sm text-purple-100">
                Smart creator selection and campaign optimization
              </p>
            </div>
          </div>
          <Button 
            onClick={() => setCurrentStep('beta-request')}
            className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-4"
          >
            Request Beta Access
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Market Intelligence Preview */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Thailand Gaming Market Intelligence</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">32M</div>
            <div className="text-gray-600">Total Gamers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">28.8M</div>
            <div className="text-gray-600">Mobile Gamers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">฿1,250</div>
            <div className="text-gray-600">Avg Annual Spend</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">18%</div>
            <div className="text-gray-600">Music Game Share</div>
          </div>
        </div>
      </div>

      {/* Creator Preview */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Featured Thai Gaming Creators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'GamingWithPat', followers: '2.8M', engagement: '8.5%', specialty: 'Mobile RPG' },
            { name: 'MusicGameQueen', followers: '1.2M', engagement: '12.3%', specialty: 'Music Games' },
            { name: 'ThaiGamerPro', followers: '850K', engagement: '9.8%', specialty: 'Battle Royale' }
          ].map((creator, idx) => (
            <div key={idx} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                {creator.name.charAt(0)}
              </div>
              <h3 className="font-bold text-lg mb-2">{creator.name}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-blue-600">{creator.followers}</div>
                  <div className="text-gray-500">Followers</div>
                </div>
                <div>
                  <div className="font-semibold text-green-600">{creator.engagement}</div>
                  <div className="text-gray-500">Engagement</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Specializes in {creator.specialty}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 text-center border border-green-200">
        <h2 className="text-2xl font-bold mb-4">Ready to Launch Your Thailand Campaign?</h2>
        <p className="text-gray-600 mb-6">
          Join gaming studios like Amanotes, Garena, and True Digital who trust Gamefluence.AI
        </p>
        <div className="flex justify-center gap-4">
          <Button 
            onClick={() => setCurrentStep('beta-request')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Start Beta Access Request
          </Button>
          <Button 
            onClick={() => {
              setUserType('admin');
              setCurrentStep('admin-approval');
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            View Admin Dashboard
          </Button>
        </div>
      </div>
    </div>
  );

  const ResultsDemo = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Campaign Successfully Launched!</h1>
        <p className="text-green-100 mb-6">
          Your Thailand music gaming campaign is now live with 5 selected creators
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold mb-1">2.1M</div>
            <div className="text-green-100 text-sm">Total Reach</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold mb-1">485K</div>
            <div className="text-green-100 text-sm">Est. Views</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold mb-1">12.8K</div>
            <div className="text-green-100 text-sm">Est. Downloads</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold mb-1">3.2x</div>
            <div className="text-green-100 text-sm">ROI Prediction</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold mb-4">Campaign Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-semibold">Creators Contacted</div>
                <div className="text-sm text-gray-600">All 5 creators confirmed participation</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-semibold">Content Briefs Sent</div>
                <div className="text-sm text-gray-600">Customized briefs for each creator</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
              <div>
                <div className="font-semibold">Content Creation (In Progress)</div>
                <div className="text-sm text-gray-600">First videos expected in 24-48 hours</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold mb-4">Real-time Monitoring</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Campaign Progress</span>
              <span className="text-sm font-semibold">15%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '15%' }}></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">Content Pieces Live</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">45K</div>
                <div className="text-sm text-gray-600">Views So Far</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-bold mb-6 text-center">What Happens Next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold mb-2">Real-time Analytics</h4>
            <p className="text-sm text-gray-600">
              Monitor campaign performance with live metrics and AI insights
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold mb-2">Auto-Optimization</h4>
            <p className="text-sm text-gray-600">
              AI automatically adjusts targeting and budget allocation for better results
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold mb-2">Performance Reports</h4>
            <p className="text-sm text-gray-600">
              Detailed campaign reports with ROI analysis and recommendations
            </p>
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
              <GamepadIcon className="w-8 h-8 text-purple-600" />
              <h1 className="text-xl font-bold">Thailand Demo Journey</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setUserType('buyer')}
                className={`text-sm ${userType === 'buyer' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Buyer Journey
              </Button>
              <Button
                onClick={() => setUserType('admin')}
                className={`text-sm ${userType === 'admin' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Admin View
              </Button>
            </div>
          </div>
          
          {/* Step Indicator */}
          <div className="flex items-center justify-center mt-6 space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
              
              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(step.id as DemoStep)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : isCompleted 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{step.title}</span>
                    {isCompleted && <CheckCircle className="w-4 h-4" />}
                  </button>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-400 mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {currentStep === 'landing' && <LandingDemo />}
        {currentStep === 'beta-request' && <BetaAccessRequest />}
        {currentStep === 'admin-approval' && <MobileBetaApproval />}
        {currentStep === 'campaign-builder' && <ThailandAmanotesCampaign />}
        {currentStep === 'results' && <ResultsDemo />}
      </div>
    </div>
  );
}