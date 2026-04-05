import React from 'react';
import { Button } from '@/components/ui/Button';
import { Globe, TrendingUp, DollarSign } from 'lucide-react';

export interface RegionData {
  id: string;
  name: string;
  androidCPI: number;
  iosCPI: number;
  audienceSize: string;
  engagementRate: string;
  recommended?: boolean;
}

interface RegionTargetingProps {
  selectedRegions: string[];
  onSelectRegion: (regionId: string) => void;
}

export const regionData: RegionData[] = [
  { 
    id: 'north_america', 
    name: 'North America', 
    androidCPI: 2.97, 
    iosCPI: 3.16,
    audienceSize: 'Large',
    engagementRate: 'Medium',
  },
  { 
    id: 'emea', 
    name: 'Europe/Middle East/Africa', 
    androidCPI: 1.03, 
    iosCPI: 2.50,
    audienceSize: 'Very Large',
    engagementRate: 'Medium',
  },
  { 
    id: 'apac', 
    name: 'Asia Pacific', 
    androidCPI: 0.93, 
    iosCPI: 1.80,
    audienceSize: 'Massive',
    engagementRate: 'High',
    recommended: true
  },
  { 
    id: 'latam', 
    name: 'Latin America', 
    androidCPI: 0.34, 
    iosCPI: 0.60,
    audienceSize: 'Large',
    engagementRate: 'Very High',
    recommended: true
  }
];

export default function RegionTargeting({ selectedRegions, onSelectRegion }: RegionTargetingProps) {
  const toggleRegion = (regionId: string) => {
    if (selectedRegions.includes(regionId)) {
      onSelectRegion(regionId);
    } else {
      onSelectRegion(regionId);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Region Targeting</h3>
        <p className="text-gray-600">Select regions to target for your campaign</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {regionData.map((region) => (
          <div 
            key={region.id}
            className={`card cursor-pointer transition-all hover:shadow-lg ${
              selectedRegions.includes(region.id) 
                ? 'border-2 border-primary bg-primary/5' 
                : 'hover:border-primary/50'
            } ${region.recommended ? 'relative' : ''}`}
            onClick={() => toggleRegion(region.id)}
          >
            {region.recommended && (
              <div className="absolute -top-3 -right-3 bg-success text-white text-xs px-2 py-1 rounded-full">
                Best ROI
              </div>
            )}
            
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Globe className="text-primary w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold">{region.name}</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium">Android CPI</span>
                </div>
                <p className="text-lg font-bold">${region.androidCPI.toFixed(2)}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium">iOS CPI</span>
                </div>
                <p className="text-lg font-bold">${region.iosCPI.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Audience</span>
                </div>
                <p className="font-medium">{region.audienceSize}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Engagement</span>
                </div>
                <p className="font-medium">{region.engagementRate}</p>
              </div>
            </div>
            
            <Button 
              variant={selectedRegions.includes(region.id) ? "default" : "outline"}
              className="w-full"
            >
              {selectedRegions.includes(region.id) ? '✓ Selected' : 'Select Region'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}