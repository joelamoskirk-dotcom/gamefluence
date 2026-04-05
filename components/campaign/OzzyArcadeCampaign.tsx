'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { vietnamInfluencers, campaignTiers, getRecommendedInfluencers } from '@/lib/vietnam-influencers-data';

interface CampaignBrief {
  gameTitle: string;
  company: string;
  contactPerson: string;
  email: string;
  currentDownloads: number;
  targetDownloads: number;
  budget: number;
  campaignGoals: string[];
  targetAudience: string[];
  kpis: string[];
  timeline: string;
  additionalNotes: string;
}

export default function OzzyArcadeCampaign() {
  const [step, setStep] = useState(1);
  const [campaignBrief, setCampaignBrief] = useState<CampaignBrief>({
    gameTitle: 'Ozzy Arcade',
    company: 'Ozzy Games Studio',
    contactPerson: 'James Mitchell',
    email: 'james@ozzygames.com.au',
    currentDownloads: 500000,
    targetDownloads: 2000000,
    budget: 100000,
    campaignGoals: ['App Downloads', 'Brand Awareness', 'User Acquisition'],
    targetAudience: ['18-34 Male', '16-28 Female', 'Racing Game Enthusiasts'],
    kpis: ['CPA < $2.50', 'ROAS > 3.0', 'Engagement Rate > 8%'],
    timeline: '6 weeks',
    additionalNotes: 'Focus on retro racing aesthetic, competitive gameplay, and viral potential'
  });

  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);
  const [campaignResults, setCampaignResults] = useState<any>(null);

  const handleInputChange = (field: keyof CampaignBrief, value: any) => {
    setCampaignBrief(prev => ({ ...prev, [field]: value }));
  };

  const getRecommendations = () => {
    return getRecommendedInfluencers(
      campaignBrief.budget,
      campaignBrief.targetAudience,
      campaignBrief.campaignGoals
    );
  };

  const simulateCampaignResults = () => {
    const tier = campaignBrief.budget <= 20000 ? '20K' : 
                 campaignBrief.budget <= 50000 ? '50K' : 
                 campaignBrief.budget <= 100000 ? '100K' : '250K';
    
    const tierData = campaignTiers[tier];
    const selectedCreators = vietnamInfluencers.filter(inf => selectedInfluencers.includes(inf.id));
    
    // Simulate realistic campaign performance
    const results = {
      campaignId: 'OZZY-VN-001',
      status: 'Active',
      duration: '6 weeks',
      totalReach: tierData.expectedReach,
      totalEngagements: Math.round(tierData.expectedReach * 0.087), // 8.7% avg engagement
      totalDownloads: tierData.expectedDownloads,
      actualCPA: tierData.estimatedCPA,
      roas: 3.2,
      conversionRate: 0.67,
      brandLift: 24,
      creators: selectedCreators.length,
      totalSpend: campaignBrief.budget,
      remainingBudget: 0,
      weeklyBreakdown: [
        { week: 1, reach: Math.round(tierData.expectedReach * 0.15), downloads: Math.round(tierData.expectedDownloads * 0.12), spend: Math.round(campaignBrief.budget * 0.18) },
        { week: 2, reach: Math.round(tierData.expectedReach * 0.22), downloads: Math.round(tierData.expectedDownloads * 0.19), spend: Math.round(campaignBrief.budget * 0.16) },
        { week: 3, reach: Math.round(tierData.expectedReach * 0.18), downloads: Math.round(tierData.expectedDownloads * 0.21), spend: Math.round(campaignBrief.budget * 0.15) },
        { week: 4, reach: Math.round(tierData.expectedReach * 0.16), downloads: Math.round(tierData.expectedDownloads * 0.18), spend: Math.round(campaignBrief.budget * 0.17) },
        { week: 5, reach: Math.round(tierData.expectedReach * 0.14), downloads: Math.round(tierData.expectedDownloads * 0.16), spend: Math.round(campaignBrief.budget * 0.16) },
        { week: 6, reach: Math.round(tierData.expectedReach * 0.15), downloads: Math.round(tierData.expectedDownloads * 0.14), spend: Math.round(campaignBrief.budget * 0.18) }
      ],
      topPerformers: selectedCreators.slice(0, 3).map(creator => ({
        name: creator.name,
        reach: Math.round(creator.avgViews * 1.3),
        engagement: creator.engagementRate,
        downloads: Math.round(creator.avgViews * 0.008),
        cpa: creator.avgCPM * 0.8
      }))
    };
    
    setCampaignResults(results);
    setStep(4);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Ozzy Arcade Campaign Brief</h2>
        <p className="text-gray-600">Vietnam Market Launch - Mobile Racing Game</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Game Title</label>
            <input
              type="text"
              value={campaignBrief.gameTitle}
              onChange={(e) => handleInputChange('gameTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Company</label>
            <input
              type="text"
              value={campaignBrief.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Contact Person</label>
            <input
              type="text"
              value={campaignBrief.contactPerson}
              onChange={(e) => handleInputChange('contactPerson', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={campaignBrief.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Current Downloads</label>
            <input
              type="number"
              value={campaignBrief.currentDownloads}
              onChange={(e) => handleInputChange('currentDownloads', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Target Downloads</label>
            <input
              type="number"
              value={campaignBrief.targetDownloads}
              onChange={(e) => handleInputChange('targetDownloads', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Campaign Budget (USD)</label>
            <select
              value={campaignBrief.budget}
              onChange={(e) => handleInputChange('budget', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value={20000}>$20,000 - Pilot Campaign</option>
              <option value={50000}>$50,000 - Growth Campaign</option>
              <option value={100000}>$100,000 - Scale Campaign</option>
              <option value={250000}>$250,000 - Premium Campaign</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Campaign Timeline</label>
            <select
              value={campaignBrief.timeline}
              onChange={(e) => handleInputChange('timeline', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="4 weeks">4 weeks</option>
              <option value="6 weeks">6 weeks</option>
              <option value="8 weeks">8 weeks</option>
              <option value="12 weeks">12 weeks</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Additional Campaign Notes</label>
        <textarea
          value={campaignBrief.additionalNotes}
          onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="Describe your game's unique selling points, target audience insights, and campaign expectations..."
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={() => setStep(2)} className="px-8">
          Next: AI Creator Matching
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => {
    const recommendations = getRecommendations();
    const tier = campaignBrief.budget <= 20000 ? '20K' : 
                 campaignBrief.budget <= 50000 ? '50K' : 
                 campaignBrief.budget <= 100000 ? '100K' : '250K';
    const tierData = campaignTiers[tier];

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">AI Creator Recommendations</h2>
          <p className="text-gray-600">Vietnam Gaming Influencers - {tier} Tier Campaign</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <h3 className="font-semibold text-blue-900">Campaign Projections</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-blue-600 font-medium">Expected Reach:</span>
              <p className="font-bold">{(tierData.expectedReach / 1000000).toFixed(1)}M</p>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Projected Downloads:</span>
              <p className="font-bold">{tierData.expectedDownloads.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Estimated CPA:</span>
              <p className="font-bold">${tierData.estimatedCPA}</p>
            </div>
            <div>
              <span className="text-blue-600 font-medium">Target Creators:</span>
              <p className="font-bold">{tierData.targetInfluencers}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {recommendations.map((influencer) => (
            <div key={influencer.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedInfluencers.includes(influencer.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedInfluencers([...selectedInfluencers, influencer.id]);
                      } else {
                        setSelectedInfluencers(selectedInfluencers.filter(id => id !== influencer.id));
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <div>
                    <h3 className="font-semibold">{influencer.name}</h3>
                    <p className="text-sm text-gray-600">{influencer.handle} • {influencer.platform}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${influencer.estimatedCost.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Estimated Cost</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 text-sm">
                <div>
                  <span className="text-gray-500">Followers:</span>
                  <p className="font-medium">{(influencer.followers / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <span className="text-gray-500">Avg Views:</span>
                  <p className="font-medium">{(influencer.avgViews / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <span className="text-gray-500">Engagement:</span>
                  <p className="font-medium">{influencer.engagementRate}%</p>
                </div>
                <div>
                  <span className="text-gray-500">Brand Safety:</span>
                  <p className="font-medium">{influencer.brandSafety}/10</p>
                </div>
                <div>
                  <span className="text-gray-500">Response Rate:</span>
                  <p className="font-medium">{influencer.responseRate}%</p>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {influencer.gamingFocus.map((focus) => (
                    <span key={focus} className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {focus}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button 
            onClick={() => setStep(3)}
            disabled={selectedInfluencers.length === 0}
            className="px-8"
          >
            Review Campaign ({selectedInfluencers.length} creators selected)
          </Button>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    const selectedCreators = vietnamInfluencers.filter(inf => selectedInfluencers.includes(inf.id));
    const totalCost = selectedCreators.reduce((sum, creator) => sum + creator.estimatedCost, 0);
    const totalReach = selectedCreators.reduce((sum, creator) => sum + creator.avgViews, 0);

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Campaign Review</h2>
          <p className="text-gray-600">Final review before launching Ozzy Arcade Vietnam campaign</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-semibold mb-4">Campaign Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Game:</span>
                <span className="font-medium">{campaignBrief.gameTitle}</span>
              </div>
              <div className="flex justify-between">
                <span>Budget:</span>
                <span className="font-medium">${campaignBrief.budget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Timeline:</span>
                <span className="font-medium">{campaignBrief.timeline}</span>
              </div>
              <div className="flex justify-between">
                <span>Selected Creators:</span>
                <span className="font-medium">{selectedCreators.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Cost:</span>
                <span className="font-medium">${totalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Expected Reach:</span>
                <span className="font-medium">{(totalReach / 1000).toFixed(0)}K</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Performance Projections</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Projected Downloads:</span>
                <span className="font-medium text-green-600">45,000 - 55,000</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated CPA:</span>
                <span className="font-medium">$1.80 - $2.20</span>
              </div>
              <div className="flex justify-between">
                <span>Expected ROAS:</span>
                <span className="font-medium text-green-600">3.2x</span>
              </div>
              <div className="flex justify-between">
                <span>Engagement Rate:</span>
                <span className="font-medium">8.5% - 12.1%</span>
              </div>
              <div className="flex justify-between">
                <span>Brand Lift:</span>
                <span className="font-medium">+24%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-4">Selected Creators</h3>
          <div className="space-y-3">
            {selectedCreators.map((creator) => (
              <div key={creator.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <span className="font-medium">{creator.name}</span>
                  <span className="text-sm text-gray-500 ml-2">({creator.platform})</span>
                </div>
                <div className="text-right">
                  <span className="font-medium">${creator.estimatedCost.toLocaleString()}</span>
                  <p className="text-xs text-gray-500">{(creator.followers / 1000).toFixed(0)}K followers</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(2)}>
            Back to Creator Selection
          </Button>
          <Button onClick={simulateCampaignResults} className="px-8 bg-green-600 hover:bg-green-700">
            Launch Campaign
          </Button>
        </div>
      </div>
    );
  };

  const renderStep4 = () => {
    if (!campaignResults) return null;

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Campaign Results</h2>
          <p className="text-gray-600">Ozzy Arcade Vietnam Campaign - Live Performance</p>
          <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Campaign Active
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Reach</h3>
            <p className="text-2xl font-bold text-primary">{(campaignResults.totalReach / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-green-600">+15% vs projection</p>
          </div>
          <div className="card text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Downloads</h3>
            <p className="text-2xl font-bold text-secondary">{campaignResults.totalDownloads.toLocaleString()}</p>
            <p className="text-xs text-green-600">Target: 2M total</p>
          </div>
          <div className="card text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Actual CPA</h3>
            <p className="text-2xl font-bold text-accent">${campaignResults.actualCPA}</p>
            <p className="text-xs text-green-600">Below target</p>
          </div>
          <div className="card text-center">
            <h3 className="text-sm font-medium text-gray-500 mb-1">ROAS</h3>
            <p className="text-2xl font-bold text-gaming">{campaignResults.roas}x</p>
            <p className="text-xs text-green-600">Above target</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-semibold mb-4">Weekly Performance</h3>
            <div className="space-y-3">
              {campaignResults.weeklyBreakdown.map((week: any) => (
                <div key={week.week} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium">Week {week.week}</span>
                  <div className="text-right text-sm">
                    <p>{(week.reach / 1000).toFixed(0)}K reach • {week.downloads.toLocaleString()} downloads</p>
                    <p className="text-gray-500">${week.spend.toLocaleString()} spent</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-4">Top Performing Creators</h3>
            <div className="space-y-3">
              {campaignResults.topPerformers.map((performer: any, index: number) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <span className="font-medium">{performer.name}</span>
                    <p className="text-sm text-gray-500">{performer.engagement}% engagement</p>
                  </div>
                  <div className="text-right text-sm">
                    <p>{(performer.reach / 1000).toFixed(0)}K reach</p>
                    <p className="text-green-600">{performer.downloads} downloads</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card bg-green-50 border-green-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Campaign Success Metrics</h3>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• Exceeded download projections by 12%</li>
                <li>• CPA 18% below target ($2.00 vs $2.50 target)</li>
                <li>• ROAS of 3.2x exceeds 3.0x target</li>
                <li>• Brand lift of 24% in Vietnam market</li>
                <li>• 89% creator response rate and content delivery</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={() => setStep(1)} className="px-8">
            Create New Campaign
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Campaign Setup Progress</span>
          <span className="text-sm text-gray-500">Step {step} of 4</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
    </div>
  );
}