import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Link2, Copy, CheckCircle, BarChart3, Users, ExternalLink } from 'lucide-react';
import { 
  AttributionLink, 
  AttributionModel, 
  generateCreatorLinks, 
  buildTrackingUrl 
} from '@/lib/attribution';

interface AttributionSystemProps {
  campaignId: string;
  creators: any[];
  onGenerateLinks?: (links: Record<string, AttributionLink>) => void;
}

export default function AttributionSystem({ campaignId, creators, onGenerateLinks }: AttributionSystemProps) {
  const [attributionModel, setAttributionModel] = useState<AttributionModel>({
    type: 'position-based',
    weights: { first: 0.4, middle: 0.2, last: 0.4 }
  });
  
  const [creatorLinks, setCreatorLinks] = useState<Record<string, AttributionLink>>({});
  const [copiedLinks, setCopiedLinks] = useState<Record<string, boolean>>({});
  
  // Generate tracking links for all creators
  const generateLinks = () => {
    const links = generateCreatorLinks(creators, campaignId);
    setCreatorLinks(links);
    
    if (onGenerateLinks) {
      onGenerateLinks(links);
    }
  };
  
  // Copy link to clipboard
  const copyLink = (creatorId: string) => {
    const link = creatorLinks[creatorId];
    if (link) {
      const fullUrl = buildTrackingUrl(link);
      navigator.clipboard.writeText(fullUrl);
      
      setCopiedLinks(prev => ({ ...prev, [creatorId]: true }));
      setTimeout(() => {
        setCopiedLinks(prev => ({ ...prev, [creatorId]: false }));
      }, 2000);
    }
  };
  
  // Update attribution model
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modelType = e.target.value as AttributionModel['type'];
    
    switch (modelType) {
      case 'first-touch':
        setAttributionModel({ type: 'first-touch' });
        break;
      case 'last-touch':
        setAttributionModel({ type: 'last-touch' });
        break;
      case 'linear':
        setAttributionModel({ type: 'linear' });
        break;
      case 'position-based':
        setAttributionModel({
          type: 'position-based',
          weights: { first: 0.4, middle: 0.2, last: 0.4 }
        });
        break;
      case 'time-decay':
        setAttributionModel({
          type: 'time-decay',
          decayRate: 0.1
        });
        break;
      case 'custom':
        setAttributionModel({
          type: 'custom',
          customWeights: [0.3, 0.2, 0.2, 0.3]
        });
        break;
    }
  };
  
  // Update weight values for position-based model
  const handleWeightChange = (position: 'first' | 'middle' | 'last', value: number) => {
    if (attributionModel.type === 'position-based' && attributionModel.weights) {
      setAttributionModel({
        ...attributionModel,
        weights: {
          ...attributionModel.weights,
          [position]: value / 100
        }
      });
    }
  };
  
  // Update decay rate for time-decay model
  const handleDecayChange = (value: number) => {
    if (attributionModel.type === 'time-decay') {
      setAttributionModel({
        ...attributionModel,
        decayRate: value / 100
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Advanced Attribution System</h2>
        <Button onClick={generateLinks}>
          <Link2 className="w-4 h-4 mr-2" />
          Generate Tracking Links
        </Button>
      </div>
      
      {/* Attribution Model Selection */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="text-primary" />
          Attribution Model
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Select Attribution Model</label>
            <select
              value={attributionModel.type}
              onChange={handleModelChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="first-touch">First Touch</option>
              <option value="last-touch">Last Touch</option>
              <option value="linear">Linear (Equal Distribution)</option>
              <option value="position-based">Position Based (U-Shaped)</option>
              <option value="time-decay">Time Decay</option>
              <option value="custom">Custom</option>
            </select>
            
            <div className="mt-2 text-sm text-gray-600">
              {attributionModel.type === 'first-touch' && (
                <p>100% credit to the first touchpoint in the user journey</p>
              )}
              {attributionModel.type === 'last-touch' && (
                <p>100% credit to the last touchpoint before conversion</p>
              )}
              {attributionModel.type === 'linear' && (
                <p>Equal credit distributed across all touchpoints</p>
              )}
              {attributionModel.type === 'position-based' && (
                <p>More credit to first and last touchpoints, less to middle touchpoints</p>
              )}
              {attributionModel.type === 'time-decay' && (
                <p>More credit to touchpoints closer to conversion</p>
              )}
              {attributionModel.type === 'custom' && (
                <p>Custom weight distribution across touchpoints</p>
              )}
            </div>
          </div>
          
          <div>
            {attributionModel.type === 'position-based' && attributionModel.weights && (
              <div className="space-y-4">
                <h4 className="font-medium">Position-Based Weights</h4>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm">First Touch: {(attributionModel.weights.first * 100).toFixed(0)}%</label>
                    <span className="text-sm text-gray-500">{(attributionModel.weights.first * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={(attributionModel.weights.first * 100)}
                    onChange={(e) => handleWeightChange('first', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm">Middle Touchpoints: {(attributionModel.weights.middle * 100).toFixed(0)}%</label>
                    <span className="text-sm text-gray-500">{(attributionModel.weights.middle * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={(attributionModel.weights.middle * 100)}
                    onChange={(e) => handleWeightChange('middle', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm">Last Touch: {(attributionModel.weights.last * 100).toFixed(0)}%</label>
                    <span className="text-sm text-gray-500">{(attributionModel.weights.last * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={(attributionModel.weights.last * 100)}
                    onChange={(e) => handleWeightChange('last', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div className="text-sm text-gray-500">
                  Total: {((attributionModel.weights.first + attributionModel.weights.middle + attributionModel.weights.last) * 100).toFixed(0)}%
                  {(attributionModel.weights.first + attributionModel.weights.middle + attributionModel.weights.last) !== 1 && (
                    <span className="text-red-500 ml-2">
                      (Should equal 100%)
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {attributionModel.type === 'time-decay' && (
              <div className="space-y-4">
                <h4 className="font-medium">Time Decay Settings</h4>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm">Decay Rate: {attributionModel.decayRate ? (attributionModel.decayRate * 100).toFixed(0) : 10}%</label>
                    <span className="text-sm text-gray-500">{attributionModel.decayRate ? (attributionModel.decayRate * 100).toFixed(0) : 10}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={(attributionModel.decayRate || 0.1) * 100}
                    onChange={(e) => handleDecayChange(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Higher values give more weight to recent touchpoints
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Creator Tracking Links */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="text-secondary" />
          Creator Tracking Links
        </h3>
        
        {Object.keys(creatorLinks).length > 0 ? (
          <div className="space-y-4">
            {creators.map(creator => {
              const link = creatorLinks[creator.id];
              if (!link) return null;
              
              const fullUrl = buildTrackingUrl(link);
              
              return (
                <div key={creator.id} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                      {creator.avatar || '👤'}
                    </div>
                    <div>
                      <h4 className="font-bold">{creator.name}</h4>
                      <p className="text-sm text-gray-500">Promo Code: <span className="font-mono">{link.promoCode}</span></p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 bg-gray-50 p-2 rounded-lg font-mono text-sm overflow-x-auto">
                      {fullUrl}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyLink(creator.id)}
                    >
                      {copiedLinks[creator.id] ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="font-medium">Source:</span> {link.utmSource}
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="font-medium">Medium:</span> {link.utmMedium}
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <span className="font-medium">Campaign:</span> {link.utmCampaign}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 border rounded-lg">
            <Link2 size={48} className="mx-auto mb-2 opacity-50" />
            <p>No tracking links generated yet</p>
            <p className="text-sm">Click &quot;Generate Tracking Links&quot; to create unique links for each creator</p>
          </div>
        )}
      </div>
      
      {/* Attribution Best Practices */}
      <div className="card bg-gradient-to-r from-primary/5 to-secondary/5">
        <h3 className="text-lg font-semibold mb-4">Attribution Best Practices</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Link2 className="text-primary w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium">Unique Links Per Creator</h4>
              <p className="text-sm text-gray-600">
                Each creator gets a unique tracking link and promo code to ensure accurate attribution
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-secondary/10 p-2 rounded-full">
              <Users className="text-secondary w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium">Multi-Touch Attribution</h4>
              <p className="text-sm text-gray-600">
                Track the entire user journey across multiple touchpoints for more accurate ROI measurement
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-accent/10 p-2 rounded-full">
              <BarChart3 className="text-accent w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium">Day 1/3/7 Cohort Analysis</h4>
              <p className="text-sm text-gray-600">
                Track key performance metrics at critical time points to optimize campaigns
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Button size="sm" variant="outline">
            Learn More About Attribution
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}