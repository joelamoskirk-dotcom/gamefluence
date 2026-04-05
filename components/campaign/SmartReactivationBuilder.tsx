'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  RefreshCw, 
  Copy, 
  Edit3, 
  CheckCircle, 
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  Target,
  Calendar,
  DollarSign,
  Zap,
  Lightbulb,
  Settings,
  Play,
  Smartphone,
  Monitor,
  Headphones,
  AlertCircle,
  ThumbsUp,
  Eye,
  Heart
} from 'lucide-react';

interface SavedCampaignTemplate {
  id: string;
  name: string;
  originalCampaign: string;
  client: string;
  agency: string;
  product: string;
  category: string;
  
  // Performance data from original
  originalPerformance: {
    roi: number;
    reach: number;
    downloads: number;
    engagement: number;
    cost: number;
  };
  
  // Saved settings
  settings: {
    objectives: string[];
    targetAudience: string[];
    contentTypes: string[];
    platforms: string[];
    duration: number;
    budget: {
      platformBudget: number;
      commissionRate: number;
      agencyMarkup: number;
    };
    creators: {
      id: string;
      name: string;
      tier: string;
      previousROI: number;
      cost: number;
      recommended: boolean;
    }[];
    timing: {
      preferredStartDate: string;
      seasonality: string;
      optimalPostingTimes: string[];
    };
  };
  
  // AI recommendations
  recommendations: {
    budgetAdjustment: number;
    newCreatorSuggestions: string[];
    contentOptimizations: string[];
    marketExpansion: string[];
  };
  
  createdAt: Date;
  lastUsed?: Date;
  successRate: number;
}

interface NewCampaignConfig {
  name: string;
  product: string;
  objectives: string[];
  budget: number;
  duration: number;
  selectedCreators: string[];
  contentTypes: string[];
  startDate: string;
  modifications: string[];
}

export default function SmartReactivationBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState<SavedCampaignTemplate | null>(null);
  const [newConfig, setNewConfig] = useState<NewCampaignConfig>({
    name: '',
    product: '',
    objectives: [],
    budget: 0,
    duration: 21,
    selectedCreators: [],
    contentTypes: [],
    startDate: '',
    modifications: []
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [showAIInsights, setShowAIInsights] = useState(false);

  // Mock saved templates
  const savedTemplates: SavedCampaignTemplate[] = [
    {
      id: 'template-001',
      name: 'Gaming Smartphone Launch Template',
      originalCampaign: 'TrueMove Gaming Pro X1 Launch',
      client: 'TrueMove Digital Electronics',
      agency: 'Digital Boost Thailand',
      product: 'Gaming Pro X1 Smartphone',
      category: 'Gaming Electronics',
      originalPerformance: {
        roi: 4.2,
        reach: 2847000,
        downloads: 15600,
        engagement: 742000,
        cost: 187250
      },
      settings: {
        objectives: ['Brand Awareness', 'Product Launch', 'Gaming Community Engagement'],
        targetAudience: ['Thai Gamers 18-35', 'Mobile Gaming Enthusiasts', 'Tech Early Adopters'],
        contentTypes: ['Product Review', 'Unboxing Video', 'Gaming Session', 'Live Stream'],
        platforms: ['YouTube', 'TikTok', 'Instagram', 'Facebook Gaming'],
        duration: 21,
        budget: {
          platformBudget: 150000,
          commissionRate: 12,
          agencyMarkup: 5
        },
        creators: [
          { id: 'creator-th-001', name: 'GamingWithPat', tier: 'mega', previousROI: 3.8, cost: 85000, recommended: true },
          { id: 'creator-th-002', name: 'MusicGameQueen', tier: 'macro', previousROI: 5.1, cost: 52000, recommended: true },
          { id: 'creator-th-003', name: 'ThaiGamerPro', tier: 'macro', previousROI: 4.5, cost: 38000, recommended: true },
          { id: 'creator-th-004', name: 'CasualGamerGirl', tier: 'micro', previousROI: 6.2, cost: 12250, recommended: true }
        ],
        timing: {
          preferredStartDate: 'Monday',
          seasonality: 'Q1 Gaming Season',
          optimalPostingTimes: ['7-9 PM Thailand', '12-2 PM Thailand', '8-10 PM Thailand']
        }
      },
      recommendations: {
        budgetAdjustment: 15,
        newCreatorSuggestions: ['BangkokStreamer', 'ProGamerThai'],
        contentOptimizations: ['More TikTok content', 'Live streaming focus', 'User-generated content'],
        marketExpansion: ['Vietnam', 'Indonesia', 'Philippines']
      },
      createdAt: new Date('2024-02-06'),
      successRate: 96
    }
  ];

  useEffect(() => {
    if (selectedTemplate) {
      setNewConfig({
        name: `${selectedTemplate.product} Follow-up Campaign`,
        product: selectedTemplate.product,
        objectives: [...selectedTemplate.settings.objectives],
        budget: selectedTemplate.settings.budget.platformBudget,
        duration: selectedTemplate.settings.duration,
        selectedCreators: selectedTemplate.settings.creators.filter(c => c.recommended).map(c => c.id),
        contentTypes: [...selectedTemplate.settings.contentTypes],
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        modifications: []
      });
    }
  }, [selectedTemplate]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return `฿${amount.toLocaleString()}`;
  };

  const TemplateCard = ({ template }: { template: SavedCampaignTemplate }) => (
    <div 
      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
        selectedTemplate?.id === template.id 
          ? 'border-blue-500 bg-blue-50 shadow-lg' 
          : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
      }`}
      onClick={() => setSelectedTemplate(template)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">{template.name}</h3>
          <p className="text-gray-600 text-sm">{template.originalCampaign}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
              {template.successRate}% Success Rate
            </span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
              {template.originalPerformance.roi}x ROI
            </span>
          </div>
        </div>
        {selectedTemplate?.id === template.id && (
          <CheckCircle className="w-6 h-6 text-blue-500" />
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">
            {formatNumber(template.originalPerformance.reach)}
          </div>
          <div className="text-xs text-gray-500">Original Reach</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">
            {formatNumber(template.originalPerformance.downloads)}
          </div>
          <div className="text-xs text-gray-500">Downloads</div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Budget Range:</span>
          <span className="font-semibold">{formatCurrency(template.settings.budget.platformBudget)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Creators:</span>
          <span className="font-semibold">{template.settings.creators.length} proven performers</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Last Used:</span>
          <span className="font-semibold">
            {template.lastUsed ? template.lastUsed.toLocaleDateString() : 'Never'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Smart Campaign Reactivation</h1>
            </div>
            <p className="text-lg text-blue-100 mb-4">
              Launch new campaigns using proven successful templates with AI-powered optimizations
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Pre-populated Settings</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Performance-Based Recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>Proven Creator Network</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-200">Available Templates</div>
            <div className="text-4xl font-bold">{savedTemplates.length}</div>
            <div className="text-blue-200">Ready to Use</div>
          </div>
        </div>
      </div>

      {/* Step 1: Template Selection */}
      {currentStep === 1 && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Choose Your Campaign Template</h2>
          <p className="text-gray-600 mb-8">
            Select from your successful campaign templates. All settings, creators, and optimizations will be pre-loaded.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {savedTemplates.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          {selectedTemplate && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                Template Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Proven {selectedTemplate.originalPerformance.roi}x ROI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{selectedTemplate.settings.creators.length} high-performing creators</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Optimized content strategy</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end mt-8">
            <Button 
              onClick={() => setCurrentStep(2)}
              disabled={!selectedTemplate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 disabled:opacity-50"
            >
              Customize Template
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )} 
     {/* Step 2: Smart Customization */}
      {currentStep === 2 && selectedTemplate && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Customize Your Campaign</h2>
          <p className="text-gray-600 mb-8">
            All settings are pre-populated from your successful template. Make any adjustments needed for your new campaign.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Campaign Basics */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                  Campaign Details
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Campaign Name</label>
                    <input
                      type="text"
                      value={newConfig.name}
                      onChange={(e) => setNewConfig(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Gaming Pro X2 Launch Campaign"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Product Name</label>
                    <input
                      type="text"
                      value={newConfig.product}
                      onChange={(e) => setNewConfig(prev => ({ ...prev, product: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Gaming Pro X2 Smartphone"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Campaign Duration</label>
                    <select
                      value={newConfig.duration}
                      onChange={(e) => setNewConfig(prev => ({ ...prev, duration: Number(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={14}>14 days</option>
                      <option value={21}>21 days (Recommended)</option>
                      <option value={30}>30 days</option>
                      <option value={45}>45 days</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date</label>
                    <input
                      type="date"
                      value={newConfig.startDate}
                      onChange={(e) => setNewConfig(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>

              {/* Budget Configuration */}
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Budget & Commission
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Platform Budget</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">฿</span>
                      <input
                        type="number"
                        value={newConfig.budget}
                        onChange={(e) => setNewConfig(prev => ({ ...prev, budget: Number(e.target.value) }))}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        min="50000"
                        step="5000"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Original budget: {formatCurrency(selectedTemplate.settings.budget.platformBudget)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Commission Rate</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={selectedTemplate.settings.budget.commissionRate}
                          disabled
                          className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Agency Markup</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={selectedTemplate.settings.budget.agencyMarkup}
                          disabled
                          className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Client Cost:</span>
                      <span className="text-xl font-bold text-green-600">
                        {formatCurrency(Math.round(newConfig.budget * (1 + (selectedTemplate.settings.budget.commissionRate + selectedTemplate.settings.budget.agencyMarkup) / 100) * 1.07))}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">Including VAT and agency fees</div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendations & Creator Selection */}
            <div className="space-y-6">
              {/* AI Insights */}
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    AI Optimization Insights
                  </h3>
                  <Button
                    onClick={() => setShowAIInsights(!showAIInsights)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-3 py-1"
                  >
                    {showAIInsights ? 'Hide' : 'Show'} Details
                  </Button>
                </div>

                {showAIInsights && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
                      <div className="text-sm">
                        <span className="font-semibold">Budget Recommendation:</span> Increase by {selectedTemplate.recommendations.budgetAdjustment}% for optimal performance
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div className="text-sm">
                        <span className="font-semibold">Creator Mix:</span> Consider adding {selectedTemplate.recommendations.newCreatorSuggestions.join(', ')} for expanded reach
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Eye className="w-4 h-4 text-purple-600 mt-0.5" />
                      <div className="text-sm">
                        <span className="font-semibold">Content Focus:</span> {selectedTemplate.recommendations.contentOptimizations.join(', ')} showed best performance
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Creator Selection */}
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-600" />
                  Recommended Creators
                </h3>
                
                <div className="space-y-3">
                  {selectedTemplate.settings.creators.map(creator => (
                    <div key={creator.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={newConfig.selectedCreators.includes(creator.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewConfig(prev => ({ ...prev, selectedCreators: [...prev.selectedCreators, creator.id] }));
                            } else {
                              setNewConfig(prev => ({ ...prev, selectedCreators: prev.selectedCreators.filter(id => id !== creator.id) }));
                            }
                          }}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <div>
                          <div className="font-semibold text-sm">{creator.name}</div>
                          <div className="text-xs text-gray-500">
                            {creator.tier.toUpperCase()} • Previous ROI: {creator.previousROI}x
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{formatCurrency(creator.cost)}</div>
                        {creator.recommended && (
                          <div className="text-xs text-green-600 flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            Recommended
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-white rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Selected Creators Cost:</span>
                    <span className="text-lg font-bold text-purple-600">
                      {formatCurrency(
                        selectedTemplate.settings.creators
                          .filter(c => newConfig.selectedCreators.includes(c.id))
                          .reduce((sum, c) => sum + c.cost, 0)
                      )}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {newConfig.selectedCreators.length} creators selected
                  </div>
                </div>
              </div>

              {/* Content Types */}
              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-indigo-600" />
                  Content Strategy
                </h3>
                
                <div className="grid grid-cols-2 gap-2">
                  {selectedTemplate.settings.contentTypes.map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newConfig.contentTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewConfig(prev => ({ ...prev, contentTypes: [...prev.contentTypes, type] }));
                          } else {
                            setNewConfig(prev => ({ ...prev, contentTypes: prev.contentTypes.filter(t => t !== type) }));
                          }
                        }}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-white rounded-lg">
                  <div className="text-sm">
                    <span className="font-semibold">Optimal Timing:</span> {selectedTemplate.settings.timing.optimalPostingTimes.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button 
              onClick={() => setCurrentStep(1)}
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-8 py-3"
            >
              Back to Templates
            </Button>
            <Button 
              onClick={() => setCurrentStep(3)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Review & Launch
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Launch */}
      {currentStep === 3 && selectedTemplate && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Review & Launch Campaign</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Campaign Summary */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Campaign Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Campaign Name:</span>
                    <span className="font-semibold">{newConfig.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product:</span>
                    <span className="font-semibold">{newConfig.product}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{newConfig.duration} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-semibold">{new Date(newConfig.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Selected Creators:</span>
                    <span className="font-semibold">{newConfig.selectedCreators.length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Expected Performance</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatNumber(Math.round(selectedTemplate.originalPerformance.reach * (newConfig.budget / selectedTemplate.settings.budget.platformBudget)))}
                    </div>
                    <div className="text-sm text-gray-600">Estimated Reach</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {(selectedTemplate.originalPerformance.roi * 0.95).toFixed(1)}x
                    </div>
                    <div className="text-sm text-gray-600">Expected ROI</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {formatNumber(Math.round(selectedTemplate.originalPerformance.downloads * (newConfig.budget / selectedTemplate.settings.budget.platformBudget) * 0.9))}
                    </div>
                    <div className="text-sm text-gray-600">Est. Downloads</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {Math.round(selectedTemplate.originalPerformance.engagement / selectedTemplate.originalPerformance.reach * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Engagement Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Actions */}
            <div className="space-y-6">
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  Pre-Launch Checklist
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Template settings loaded</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Proven creators selected</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Budget optimized</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Content strategy defined</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Timeline scheduled</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4 text-center">Ready to Launch!</h3>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {formatCurrency(Math.round(newConfig.budget * (1 + (selectedTemplate.settings.budget.commissionRate + selectedTemplate.settings.budget.agencyMarkup) / 100) * 1.07))}
                  </div>
                  <div className="text-sm text-gray-600">Total Client Investment</div>
                </div>
                
                <Button 
                  onClick={() => {
                    alert(`🚀 Campaign launched successfully!\n\nCampaign: ${newConfig.name}\nBudget: ${formatCurrency(Math.round(newConfig.budget * (1 + (selectedTemplate.settings.budget.commissionRate + selectedTemplate.settings.budget.agencyMarkup) / 100) * 1.07))}\nCreators: ${newConfig.selectedCreators.length}\nDuration: ${newConfig.duration} days\n\nAll creators will be contacted within 24 hours using the proven template strategy!`);
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Launch Campaign
                </Button>
              </div>

              <div className="text-center text-sm text-gray-500">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Settings className="w-4 h-4" />
                  <span>Campaign will be saved as new template</span>
                </div>
                <div>Based on proven {selectedTemplate.name} with {selectedTemplate.successRate}% success rate</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button 
              onClick={() => setCurrentStep(2)}
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-8 py-3"
            >
              Back to Customize
            </Button>
            <div className="flex gap-4">
              <Button 
                onClick={() => {
                  alert('Campaign saved as draft! You can return to complete the setup later.');
                }}
                className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-6 py-3"
              >
                Save as Draft
              </Button>
              <Button 
                onClick={() => {
                  const templateData = {
                    ...newConfig,
                    templateUsed: selectedTemplate.name,
                    expectedROI: (selectedTemplate.originalPerformance.roi * 0.95).toFixed(1)
                  };
                  console.log('New campaign template created:', templateData);
                  alert('🎯 New campaign template created and saved for future use!');
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3"
              >
                <Copy className="w-4 h-4 mr-2" />
                Save as Template
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}