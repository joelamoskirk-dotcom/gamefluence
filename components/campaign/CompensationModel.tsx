import React from 'react';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';

export interface CompensationModelOption {
  id: string;
  name: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

interface CompensationModelProps {
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
}

export const compensationModels: CompensationModelOption[] = [
  { 
    id: 'flat', 
    name: 'Flat Fee', 
    description: 'Standard payment per stream or post',
    features: [
      'Simple, predictable pricing',
      'Fixed creator payments',
      'No performance tracking required',
      'Best for awareness campaigns'
    ]
  },
  { 
    id: 'hybrid', 
    name: 'Hybrid (Recommended)', 
    description: 'Base fee + performance bonuses',
    features: [
      'Base payment for creators',
      'Performance bonuses for results',
      'Higher creator motivation',
      'Best ROI for most campaigns'
    ],
    recommended: true
  },
  { 
    id: 'performance', 
    name: 'Performance Only', 
    description: 'Payment based solely on results',
    features: [
      'Pay only for actual results',
      'No upfront creator costs',
      'Full attribution required',
      'Best for conversion-focused campaigns'
    ]
  }
];

export default function CompensationModel({ selectedModel, onSelectModel }: CompensationModelProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Compensation Model</h3>
        <p className="text-gray-600">Select how you&apos;d like to compensate creators for this campaign</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {compensationModels.map((model) => (
          <div 
            key={model.id}
            className={`card cursor-pointer transition-all hover:shadow-lg ${
              selectedModel === model.id 
                ? 'border-2 border-primary bg-primary/5' 
                : 'hover:border-primary/50'
            } ${model.recommended ? 'relative' : ''}`}
            onClick={() => onSelectModel(model.id)}
          >
            {model.recommended && (
              <div className="absolute -top-3 -right-3 bg-primary text-white text-xs px-2 py-1 rounded-full">
                Recommended
              </div>
            )}
            
            <h4 className="text-lg font-bold mb-2">{model.name}</h4>
            <p className="text-sm text-gray-600 mb-4">{model.description}</p>
            
            <ul className="space-y-2 mb-4">
              {model.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              variant={selectedModel === model.id ? "default" : "outline"}
              className="w-full"
            >
              {selectedModel === model.id ? '✓ Selected' : 'Select Model'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}