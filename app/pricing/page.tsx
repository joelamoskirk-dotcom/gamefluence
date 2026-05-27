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
              
              <Link href="/get-started">
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
      
      {/* FAQ Section */}
      <div className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">
            Common questions from agencies and brands about working with Gamefluence
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: 'How does creator matching work?',
              a: 'You submit a campaign brief with your target market, genre, audience, and budget. Our AI scores every creator in our network on engagement history, audience overlap, cultural fit, and brand safety — then recommends the best matches. You never need to browse or search manually.',
            },
            {
              q: 'What markets do you cover?',
              a: 'We operate across 7 APAC markets: Indonesia, Philippines, Vietnam, Thailand, Malaysia, Singapore, and South Korea. We also have creators in Australia, New Zealand, and Japan for cross-market campaigns.',
            },
            {
              q: 'How is attribution tracked?',
              a: 'We integrate with your existing attribution stack — AppsFlyer OneLink, Adjust, UTM parameters, or promo codes. Each creator gets a unique tracked link. Every click, install, and conversion is attributed back to the individual creator in real-time.',
            },
            {
              q: 'What\'s the minimum campaign budget?',
              a: 'Our Single Campaign plan starts at $299 setup + creator fees. Most agency campaigns run $5K-$50K per market. We can work with budgets from $2K for single-market micro-campaigns up to $500K+ for multi-market expansions.',
            },
            {
              q: 'How long does campaign activation take?',
              a: 'From brief submission to first creator content going live: typically 5-7 business days. Rush campaigns can activate in 48 hours for an additional fee. Our AI matching is instant — the time is in creator briefing and content production.',
            },
            {
              q: 'Do you offer white-label for agencies?',
              a: 'Yes. Our Publisher Elite plan includes white-label dashboards, custom branding, and API access. Your clients see your brand, not ours. Reports are exportable with your agency branding.',
            },
            {
              q: 'What happens if a creator underperforms?',
              a: 'Our AI prediction accuracy is 94.7%, so underperformance is rare. When it happens, we offer creator replacement at no additional cost within the first 7 days, and performance guarantees on our Studio Pro and Publisher Elite plans.',
            },
            {
              q: 'Can I see the creator roster before committing?',
              a: 'We don\'t share our full roster publicly — this protects our creators from spam and ensures exclusivity. Once you submit a brief, we provide a shortlist of matched creators with anonymized performance data. You approve the final selection before any spend.',
            },
          ].map((faq, i) => (
            <details key={i} className="group border rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
                <span className="text-gray-400 group-open:rotate-45 transition-transform text-xl">+</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Still have questions? Email{' '}
            <a href="mailto:admin@gamefluence.com.au" className="text-primary hover:underline">admin@gamefluence.com.au</a>
          </p>
        </div>
      </div>
    </main>
  );
}