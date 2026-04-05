'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import AgencyCampaignBuilder from '@/components/agency/AgencyCampaignBuilder';
import { 
  Building2, 
  Globe, 
  Users, 
  TrendingUp, 
  DollarSign,
  BarChart3,
  Shield,
  Zap,
  CheckCircle,
  Star,
  Award,
  Target
} from 'lucide-react';

export default function AgencyDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Building2 className="h-12 w-12 mr-4" />
              <h1 className="text-4xl font-bold">Agency Demo</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Experience how APAC agencies manage multi-brand gaming creator campaigns
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <Globe className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-blue-200">APAC Markets</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <Users className="h-8 w-8 mx-auto mb-2 text-purple-200" />
                <div className="text-2xl font-bold">1,200+</div>
                <div className="text-sm text-purple-200">Gaming Creators</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-200" />
                <div className="text-2xl font-bold">4.8x</div>
                <div className="text-sm text-green-200">Average ROI</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <Building2 className="h-8 w-8 mx-auto mb-2 text-yellow-200" />
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-yellow-200">Partner Agencies</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agency Value Propositions */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why APAC Agencies Choose Gamefluence
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Multi-Client Management</h3>
                <p className="text-gray-600 mb-6">
                  Manage campaigns for multiple brand clients from one unified dashboard. White-label options available for enterprise agencies.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Unified client dashboard
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    White-label branding
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Client reporting tools
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <Globe className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">APAC Market Expertise</h3>
                <p className="text-gray-600 mb-6">
                  Deep understanding of Vietnam, Thailand, and Indonesia gaming markets with verified local creator networks.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Local market intelligence
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Cultural localization
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Native language creators
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Enterprise Attribution</h3>
                <p className="text-gray-600 mb-6">
                  AppsFlyer-style attribution tracking with cross-market performance analytics and real-time optimization.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Real-time attribution
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Cross-market analytics
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ROI optimization
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Agency Success Stories
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Digital Horizon APAC</h3>
                    <p className="text-sm text-gray-600">Full-Service Agency • Singapore</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">24</div>
                    <div className="text-xs text-gray-600">Brand Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">4.2x</div>
                    <div className="text-xs text-gray-600">Average ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">92%</div>
                    <div className="text-xs text-gray-600">Client Retention</div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  "Gamefluence has transformed how we manage gaming creator campaigns across APAC. The multi-client dashboard and local market expertise have been game-changers for our agency."
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Globe className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Vietnam Digital Collective</h3>
                    <p className="text-sm text-gray-600">Regional Network • Ho Chi Minh City</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">18</div>
                    <div className="text-xs text-gray-600">Brand Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">5.1x</div>
                    <div className="text-xs text-gray-600">Average ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">9.8</div>
                    <div className="text-xs text-gray-600">Market Expertise</div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  "The Vietnamese creator network and cultural localization capabilities have helped us deliver exceptional results for our clients in the Vietnam market."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Try the Agency Campaign Builder
              </h2>
              <p className="text-xl text-gray-600">
                Experience how agencies create multi-brand campaigns with gaming creators
              </p>
            </div>
            
            {/* Campaign Builder Component */}
            <AgencyCampaignBuilder />
          </div>
        </div>
      </div>

      {/* Pricing for Agencies */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Agency Partnership Tiers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
                <div className="text-center mb-6">
                  <Star className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
                  <h3 className="text-xl font-bold">Growth</h3>
                  <p className="text-blue-100">For growing agencies</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
                    Up to 15 brand clients
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
                    Multi-market campaigns
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
                    Standard reporting
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
                    Email support
                  </div>
                </div>
              </div>

              <div className="bg-white/20 rounded-xl p-8 backdrop-blur-sm border-2 border-yellow-300">
                <div className="text-center mb-6">
                  <Award className="h-8 w-8 mx-auto mb-2 text-yellow-300" />
                  <h3 className="text-xl font-bold">Enterprise</h3>
                  <p className="text-blue-100">For established agencies</p>
                  <div className="bg-yellow-300 text-blue-900 px-3 py-1 rounded-full text-xs font-bold mt-2">
                    MOST POPULAR
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
                    Unlimited brand clients
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
                    White-label platform
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
                    Custom reporting
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
                    Dedicated account manager
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
                <div className="text-center mb-6">
                  <Target className="h-8 w-8 mx-auto mb-2 text-purple-300" />
                  <h3 className="text-xl font-bold">Custom</h3>
                  <p className="text-blue-100">For enterprise networks</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
                    Custom integrations
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
                    API access
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
                    Priority support
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-300 mr-2" />
                    Custom SLA
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Button 
                onClick={() => window.location.href = '/beta'}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                Start Agency Partnership
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Agency?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the leading APAC agencies who are scaling their gaming creator campaigns with Gamefluence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/beta'}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg"
            >
              Get Agency Access
            </Button>
            <Button 
              onClick={() => window.location.href = '/founder'}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg"
            >
              Schedule Demo Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}