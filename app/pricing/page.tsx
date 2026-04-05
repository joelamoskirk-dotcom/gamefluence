'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Check, X, HelpCircle, Globe, Zap, DollarSign, Sparkles, Shield } from 'lucide-react';
import { pricingTiers, contentTypes, performanceBonuses, calculateFees } from '@/lib/pricing-model';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedContentType, setSelectedContentType] = useState(contentTypes[0].type);
  const [creatorBasePrice, setCreatorBasePrice] = useState(300);
  
  // Calculate fees based on TRIBE model (30% margin)
  const fees = calculateFees(creatorBasePrice, 0.3);

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">Gaming Creator Marketplace Pricing</h1>
        <p className="text-xl text-gray-600 mb-8">
          Transparent pricing with creator-first approach and flexible licensing options
        </p>
      </div>
      
      {/* Platform Pricing */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Platform Plans</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.name}
              className={`card relative ${
                tier.recommended 
                  ? 'border-2 border-primary shadow-lg' 
                  : ''
              }`}
            >
              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  ${tier.setupFee}
                </span>
                <span className="text-gray-600"> setup fee</span>
                
                <div className="mt-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-success" />
                  <span className="text-success font-medium">{tier.platformMargin * 100}% platform margin</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="text-green-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link href={`/signup?plan=${tier.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <Button 
                  className="w-full" 
                  variant={tier.recommended ? 'default' : 'outline'}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {/* Content Pricing Calculator */}
      <div className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Content Pricing Calculator</h2>
          <p className="text-gray-600">
            See how our transparent pricing works for both creators and brands
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Content Type</h3>
              <div className="space-y-3">
                {contentTypes.map((content) => (
                  <label 
                    key={content.type}
                    className={`flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      selectedContentType === content.type ? 'border-primary bg-primary/5' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="contentType"
                      checked={selectedContentType === content.type}
                      onChange={() => setSelectedContentType(content.type)}
                      className="mt-1"
                    />
                    <div className="ml-3">
                      <div className="font-medium">{content.type}</div>
                      <div className="text-sm text-gray-500">{content.description}</div>
                      <div className="text-sm text-primary font-medium mt-1">
                        ${content.basePriceRange[0]} - ${content.basePriceRange[1]} creator fee
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Price Breakdown</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Creator Base Price</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">$</span>
                  <input
                    type="range"
                    min={100}
                    max={2000}
                    step={50}
                    value={creatorBasePrice}
                    onChange={(e) => setCreatorBasePrice(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="font-medium">${creatorBasePrice}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold mb-4">TRIBE-Style Pricing Model</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Creator receives</span>
                    <span className="text-xl font-bold">${fees.creatorFee.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div className="flex items-center gap-1">
                      <span>Platform fee</span>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="text-xl font-bold">${fees.platformFee.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold">Brand pays</span>
                    <span className="text-2xl font-bold text-primary">${fees.totalBrandCost.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>Transparent pricing: {fees.platformMarginPercentage}% platform margin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}