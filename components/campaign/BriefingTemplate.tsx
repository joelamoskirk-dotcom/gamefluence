'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Target, Users, Clock, MapPin, DollarSign, Zap, Globe, FileText, Image, Video, MessageSquare } from 'lucide-react';
import CompensationModel, { compensationModels } from './CompensationModel';
import RegionTargeting, { regionData } from './RegionTargeting';
import { contentTypes, performanceBonuses } from '@/lib/pricing-model';

interface BriefingData {
  campaignName: string;
  gameTitle: string;
  gameDescription: string;
  objective: string;
  whoToInfluence: string;
  howToInfluence: string;
  whyInfluence: string;
  targetAudience: string;
  timing: string;
  scope: string;
  budget: string;
  locations: string[];
  startDate: string;
  endDate: string;
  additionalInfo: string;
  compensationModel: string;
  targetRegions: string[];
  platformStrategy: string;
  launchBlitz: boolean;
  contentTypes: string[];
  performanceBonuses: string[];
  licenseOptions: string[];
  setupFee: number;
}

export default function BriefingTemplate() {
  const [formData, setFormData] = useState<BriefingData>({
    campaignName: '',
    gameTitle: '',
    gameDescription: '',
    objective: '',
    whoToInfluence: '',
    howToInfluence: '',
    whyInfluence: '',
    targetAudience: '',
    timing: '',
    scope: '',
    budget: '',
    locations: [],
    startDate: '',
    endDate: '',
    additionalInfo: '',
    compensationModel: 'hybrid', // Default to hybrid model
    targetRegions: ['north_america'], // Default to North America
    platformStrategy: 'cross_platform', // Default to cross-platform
    launchBlitz: true, // Default to enabled
    contentTypes: ['gameplay_highlight'], // Default content type
    performanceBonuses: ['installs', 'engagement'], // Default performance bonuses
    licenseOptions: ['standard'], // Default license option
    setupFee: 299, // Default setup fee
  });
  
  // Platform strategy options
  const platformStrategies = [
    { 
      id: 'ios', 
      name: 'iOS Focus', 
      description: 'Higher ARPU, premium audience, focus on mid-core games',
      recommendedBudget: 'Higher budget, premium positioning'
    },
    { 
      id: 'android', 
      name: 'Android Focus', 
      description: 'Greater scale, volume-based approach',
      recommendedBudget: 'Moderate budget, wider reach'
    },
    { 
      id: 'cross_platform', 
      name: 'Cross-Platform', 
      description: 'Balanced approach for both platforms',
      recommendedBudget: 'Split budget based on target audience'
    }
  ];

  const objectives = [
    'Brand Awareness',
    'Game Launch',
    'User Acquisition',
    'Community Building',
    'Product Education',
    'Competitive Positioning',
    'Seasonal Campaign',
    'Event Promotion'
  ];

  const whoOptions = [
    'Hardcore Gamers',
    'Casual Gamers',
    'Mobile Gamers',
    'PC Gamers',
    'Console Gamers',
    'Esports Fans',
    'Gaming Content Creators',
    'Tech Enthusiasts'
  ];

  const howOptions = [
    'Live Streaming',
    'YouTube Videos',
    'Social Media Posts',
    'Game Reviews',
    'Tutorials/Guides',
    'Unboxing Videos',
    'Tournament Coverage',
    'Behind-the-Scenes Content'
  ];

  const whyOptions = [
    'Increase Downloads',
    'Build Community',
    'Drive Engagement',
    'Generate Buzz',
    'Educate Users',
    'Showcase Features',
    'Competitive Advantage',
    'Market Penetration'
  ];

  const timingOptions = [
    'Pre-Launch (1-2 months before)',
    'Launch Week',
    'Post-Launch (1-3 months after)',
    'Seasonal (Holiday/Event)',
    'Ongoing Campaign',
    'Flash Campaign (1-2 weeks)'
  ];

  const scopeOptions = [
    'Single Platform Focus',
    'Multi-Platform Campaign',
    'Influencer Tier Mix',
    'Niche Community Focus',
    'Broad Market Reach',
    'Regional Campaign',
    'Global Campaign'
  ];

  const locationOptions = [
    'North America',
    'Europe',
    'Asia-Pacific',
    'Latin America',
    'Middle East',
    'Africa',
    'Global'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (location: string) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location]
    }));
  };

  const handleContentTypeChange = (contentType: string) => {
    setFormData(prev => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(contentType)
        ? prev.contentTypes.filter(c => c !== contentType)
        : [...prev.contentTypes, contentType]
    }));
  };

  const handlePerformanceBonusChange = (bonus: string) => {
    setFormData(prev => ({
      ...prev,
      performanceBonuses: prev.performanceBonuses.includes(bonus)
        ? prev.performanceBonuses.filter(b => b !== bonus)
        : [...prev.performanceBonuses, bonus]
    }));
  };

  const handleLicenseOptionChange = (license: string) => {
    setFormData(prev => ({
      ...prev,
      licenseOptions: prev.licenseOptions.includes(license)
        ? prev.licenseOptions.filter(l => l !== license)
        : [...prev.licenseOptions, license]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send this data to your backend
    alert('Campaign brief saved successfully! Redirecting to creator selection...');
    // Redirect to creator selection with brief data
    window.location.href = '/dashboard/brand/creators?brief=' + encodeURIComponent(JSON.stringify(formData));
  };

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Target className="text-primary" />
        <h2 className="text-2xl font-bold">Campaign Brief Builder</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Campaign Name *</label>
              <input
                type="text"
                name="campaignName"
                value={formData.campaignName}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter campaign name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Game Title *</label>
              <input
                type="text"
                name="gameTitle"
                value={formData.gameTitle}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter game title"
                required
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Game Description *</label>
            <textarea
              name="gameDescription"
              value={formData.gameDescription}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg h-24"
              placeholder="Briefly describe your game"
              required
            />
          </div>
        </div>

        {/* Campaign Objectives */}
        <div className="bg-primary/5 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="text-primary" />
            Campaign Objectives
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Primary Objective *</label>
              <select
                name="objective"
                value={formData.objective}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Select objective</option>
                {objectives.map(obj => (
                  <option key={obj} value={obj}>{obj}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Who to Influence *</label>
              <select
                name="whoToInfluence"
                value={formData.whoToInfluence}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Select audience</option>
                {whoOptions.map(who => (
                  <option key={who} value={who}>{who}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">How to Influence *</label>
              <select
                name="howToInfluence"
                value={formData.howToInfluence}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Select method</option>
                {howOptions.map(how => (
                  <option key={how} value={how}>{how}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Why Influence *</label>
              <select
                name="whyInfluence"
                value={formData.whyInfluence}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Select reason</option>
                {whyOptions.map(why => (
                  <option key={why} value={why}>{why}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content Requirements - TRIBE-inspired */}
        <div className="bg-secondary/5 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="text-secondary" />
            Content Requirements
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3">Content Types *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {contentTypes.map((content) => (
                  <label key={content.type} className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.contentTypes.includes(content.type.toLowerCase().replace(/\s+/g, '_'))}
                      onChange={() => handleContentTypeChange(content.type.toLowerCase().replace(/\s+/g, '_'))}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium">{content.type}</div>
                      <div className="text-xs text-gray-500">{content.description}</div>
                      <div className="text-xs text-primary mt-1">
                        ${content.basePriceRange[0]} - ${content.basePriceRange[1]}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-3">Performance Bonuses</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {performanceBonuses.map((bonus) => (
                  <label key={bonus.metric} className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.performanceBonuses.includes(bonus.metric.toLowerCase())}
                      onChange={() => handlePerformanceBonusChange(bonus.metric.toLowerCase())}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium">{bonus.metric}</div>
                      <div className="text-xs text-gray-500">{bonus.description}</div>
                      <div className="text-xs text-success mt-1">
                        {bonus.bonusAmount} (Threshold: {bonus.threshold})
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-3">Content Licensing *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {contentTypes[0].licenseOptions.map((license) => (
                  <label key={license.name} className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.licenseOptions.includes(license.name.toLowerCase())}
                      onChange={() => handleLicenseOptionChange(license.name.toLowerCase())}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium">{license.name}</div>
                      <div className="text-xs text-gray-500">{license.duration}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {license.usageRights[0]}
                      </div>
                      <div className="text-xs text-primary mt-1">
                        {license.priceMultiplier}x multiplier
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timing & Scope */}
        <div className="bg-accent/5 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="text-accent" />
            Timing & Scope
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Campaign Timing *</label>
              <select
                name="timing"
                value={formData.timing}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Select timing</option>
                {timingOptions.map(timing => (
                  <option key={timing} value={timing}>{timing}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Campaign Scope *</label>
              <select
                name="scope"
                value={formData.scope}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Select scope</option>
                {scopeOptions.map(scope => (
                  <option key={scope} value={scope}>{scope}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">End Date *</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        {/* Budget & Locations */}
        <div className="bg-gaming/5 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="text-gaming" />
            Budget & Setup Fee
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Campaign Budget *</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full p-3 pl-7 border rounded-lg"
                  placeholder="Enter budget in USD"
                  min="1000"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Minimum recommended budget: $1,000
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">One-Time Setup Fee</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  name="setupFee"
                  value={formData.setupFee}
                  onChange={handleInputChange}
                  className="w-full p-3 pl-7 border rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Standard campaign activation fee
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Target Locations *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {locationOptions.map(location => (
                <label key={location} className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.locations.includes(location)}
                    onChange={() => handleLocationChange(location)}
                    className="rounded"
                  />
                  <span className="text-sm">{location}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Compensation Model */}
        <div className="bg-primary/5 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="text-primary" />
            Compensation Strategy
          </h3>
          
          <CompensationModel 
            selectedModel={formData.compensationModel}
            onSelectModel={(modelId) => setFormData(prev => ({ ...prev, compensationModel: modelId }))}
          />
        </div>

        {/* Region Targeting */}
        <div className="bg-secondary/5 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Globe className="text-secondary" />
            Region Targeting
          </h3>
          
          <RegionTargeting 
            selectedRegions={formData.targetRegions}
            onSelectRegion={(regionId) => {
              setFormData(prev => ({
                ...prev,
                targetRegions: prev.targetRegions.includes(regionId)
                  ? prev.targetRegions.filter(r => r !== regionId)
                  : [...prev.targetRegions, regionId]
              }));
            }}
          />
        </div>

        {/* Platform Strategy */}
        <div className="bg-accent/5 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="text-accent" />
            Platform Strategy
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platformStrategies.map((strategy) => (
              <div 
                key={strategy.id}
                className={`card cursor-pointer transition-all hover:shadow-lg ${
                  formData.platformStrategy === strategy.id 
                    ? 'border-2 border-accent bg-accent/5' 
                    : 'hover:border-accent/50'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, platformStrategy: strategy.id }))}
              >
                <h4 className="text-lg font-bold mb-2">{strategy.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{strategy.description}</p>
                
                <div className="text-sm bg-gray-50 p-3 rounded-lg mb-4">
                  <span className="font-medium">Recommended Budget:</span> {strategy.recommendedBudget}
                </div>
                
                <Button 
                  variant={formData.platformStrategy === strategy.id ? "default" : "outline"}
                  className="w-full"
                >
                  {formData.platformStrategy === strategy.id ? '✓ Selected' : 'Select Strategy'}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Launch Blitz Option */}
        <div className="bg-gaming/5 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="text-gaming" />
                Launch Blitz
              </h3>
              <p className="text-gray-600 mt-1">
                Schedule creators for intensive promotion during the first 3 days post-launch (20% bonus)
              </p>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.launchBlitz}
                onChange={() => setFormData(prev => ({ ...prev, launchBlitz: !prev.launchBlitz }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gaming/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gaming"></div>
            </label>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <label className="block text-sm font-medium mb-1">Additional Information (Optional)</label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg h-24"
            placeholder="Any other details you'd like to share with creators"
          />
        </div>
        
        {/* Summary */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Campaign Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium mb-1">Setup Fee</div>
              <div className="text-xl font-bold">${formData.setupFee}</div>
            </div>
            
            <div>
              <div className="text-sm font-medium mb-1">Platform Margin</div>
              <div className="text-xl font-bold">30%</div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>
              Your campaign brief will be visible to matching creators who can submit content proposals.
              You&apos;ll only pay for content you approve, with 50% due upfront and 50% upon final approval.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Create Campaign & Find Creators →
          </Button>
        </div>
      </form>
    </div>
  );
}