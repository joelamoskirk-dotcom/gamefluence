'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SmartLeadGenForm from '@/components/creator/SmartLeadGenForm';
import { CreatorLeadGenSystem } from '@/lib/creator-lead-gen';
import { 
  Sparkles, 
  Users, 
  DollarSign, 
  TrendingUp,
  Globe,
  Star,
  CheckCircle
} from 'lucide-react';

export default function CreatorSignupPage() {
  const searchParams = useSearchParams();
  const [formType, setFormType] = useState<'quick_interest' | 'validation_check'>('quick_interest');
  const [contactPerson, setContactPerson] = useState('');
  const [market, setMarket] = useState('');
  const [outreachRef, setOutreachRef] = useState('');
  const [outreachSource, setOutreachSource] = useState('');
  const [eventCode, setEventCode] = useState('');
  
  useEffect(() => {
    const form = searchParams.get('form') as 'quick_interest' | 'validation_check';
    const contact = searchParams.get('contact') || '';
    const mkt = searchParams.get('market') || '';
    const ref = searchParams.get('ref') || '';
    const source = searchParams.get('source') || '';
    const event = searchParams.get('event') || '';
    
    if (form) setFormType(form);
    if (contact) setContactPerson(contact);
    if (mkt) setMarket(mkt);
    if (ref) setOutreachRef(ref);
    if (source) setOutreachSource(source);
    if (event) setEventCode(event);
  }, [searchParams]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creatorName: data.display_name || data.social_profile,
          email: data.email,
          phone: data.phone || undefined,
          socialProfile: data.social_profile,
          platform: data.social_profile?.includes('tiktok') ? 'TikTok' 
            : data.social_profile?.includes('youtube') ? 'YouTube'
            : data.social_profile?.includes('twitch') ? 'Twitch'
            : data.social_profile?.includes('instagram') ? 'Instagram'
            : 'Other',
          gamingFocus: data.gaming_focus || [],
          earningsGoal: data.monthly_earnings_goal || 'Not specified',
          availability: data.availability || 'Not specified',
          followerCount: data.followerCount,
          engagementRate: data.engagementRate,
          brandSafetyScore: data.brandSafetyScore,
          marketTier: data.marketTier,
          // Outreach attribution tracking
          outreachRef: outreachRef || undefined,
          outreachSource: outreachSource || undefined,
          eventCode: eventCode || undefined,
          market: market || undefined,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
      } else {
        alert('Something went wrong. Please try again or email admin@gamefluence.com.au directly.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Network error. Please try again or email admin@gamefluence.com.au directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get Paid to Game! 🎮
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Join 280+ creators earning from gaming content across APAC
          </p>
          
          {contactPerson && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block mb-6">
              <p className="text-lg">
                👋 <span className="font-semibold">{contactPerson}</span> invited you to join Gamefluence
              </p>
              {market && (
                <p className="text-blue-200 text-sm">
                  Specializing in {market} gaming market
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">280+</div>
              <div className="text-gray-600">Active Creators</div>
            </div>
            
            <div>
              <div className="flex items-center justify-center mb-3">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">$2.4M</div>
              <div className="text-gray-600">Campaign Value</div>
            </div>
            
            <div>
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">5.8x</div>
              <div className="text-gray-600">Average ROI</div>
            </div>
            
            <div>
              <div className="flex items-center justify-center mb-3">
                <Globe className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">7</div>
              <div className="text-gray-600">APAC Markets</div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join Gamefluence?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Powered Matching</h3>
              <p className="text-gray-600">
                Our AI matches you with campaigns that fit your content and audience perfectly
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Guaranteed Payments</h3>
              <p className="text-gray-600">
                Fast, secure payments within 7 days of campaign completion. No payment delays.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Campaigns</h3>
              <p className="text-gray-600">
                Work with top gaming brands and studios on high-quality, well-paid campaigns
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          {submitSuccess ? (
            <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl shadow-xl p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">You&apos;re In! 🎮</h2>
              <p className="text-lg text-gray-600 mb-6">
                Your application has been submitted successfully. Our team will review your profile and reach out within 24 hours with campaign opportunities.
              </p>
              <p className="text-sm text-gray-500">
                Check your email for a confirmation from Gamefluence.
              </p>
            </div>
          ) : (
            <SmartLeadGenForm 
              formType={formType}
              onSubmit={handleFormSubmit}
            />
          )}
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Creator Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  MG
                </div>
                <div>
                  <h4 className="font-bold">Mai Game Girl</h4>
                  <p className="text-sm text-gray-600">Vietnam • 4.4M followers</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                &quot;Gamefluence helped me earn $15K last month from racing game campaigns. The AI matching is incredible!&quot;
              </p>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">96.8% Success Rate</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  RK
                </div>
                <div>
                  <h4 className="font-bold">RacingKing_ID</h4>
                  <p className="text-sm text-gray-600">Indonesia • 8.2M followers</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                &quot;From part-time creator to full-time income. Gamefluence campaigns pay 3x more than other platforms!&quot;
              </p>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Diamond Tier Creator</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  PR
                </div>
                <div>
                  <h4 className="font-bold">PinoyRacer_Pro</h4>
                  <p className="text-sm text-gray-600">Philippines • 7.1M followers</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                &quot;The team support is amazing. They help optimize my content and I&apos;ve doubled my earnings in 3 months!&quot;
              </p>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">93.8% AI Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 Gamefluence.AI • Gaming Creator Network • 
            {contactPerson && ` Contact: ${contactPerson}`}
          </p>
        </div>
      </div>
    </div>
  );
}