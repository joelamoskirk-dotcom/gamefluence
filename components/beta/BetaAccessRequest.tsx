'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  Smartphone, 
  Mail, 
  Building, 
  Globe, 
  User,
  CheckCircle,
  Clock,
  Shield,
  Zap,
  ArrowRight,
  MapPin,
  AlertCircle,
  Key,
  Eye
} from 'lucide-react';

interface BetaRequest {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  gameTitle?: string;
  marketFocus: string[];
  campaignBudget: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  useCase: string;
  requestedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  approvalCode?: string;
  
  // Enhanced tracking
  ipAddress?: string;
  userAgent?: string;
  geolocation?: {
    country: string;
    region: string;
    city: string;
    timezone: string;
  };
  googleAuth?: {
    userId: string;
    email: string;
    name: string;
    verified: boolean;
    domain?: string;
  };
}

export default function BetaAccessRequest() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    gameTitle: '',
    marketFocus: [] as string[],
    campaignBudget: '',
    urgency: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    useCase: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState<string>('');

  const marketOptions = [
    'Thailand', 'Vietnam', 'Indonesia', 'Philippines', 
    'Malaysia', 'Singapore', 'South Korea', 'Japan',
    'India', 'Australia', 'Taiwan'
  ];

  const budgetRanges = [
    '$10K - $25K (Starter Campaign)',
    '$25K - $50K (Growth Campaign)', 
    '$50K - $100K (Professional Campaign)',
    '$100K - $250K (Enterprise Campaign)',
    '$250K+ (Custom Campaign)'
  ];

  // Simulate location detection on component mount
  React.useEffect(() => {
    // Simulate IP-based location detection
    setTimeout(() => {
      setDetectedLocation('Bangkok, Thailand');
    }, 1000);
  }, []);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: null }));
    }
  };

  const handleMarketToggle = (market: string) => {
    const currentMarkets = formData.marketFocus;
    const newMarkets = currentMarkets.includes(market)
      ? currentMarkets.filter(m => m !== market)
      : [...currentMarkets, market];
    handleFieldChange('marketFocus', newMarkets);
  };

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.marketFocus.length === 0) newErrors.marketFocus = 'Select at least one market';
    if (!formData.campaignBudget) newErrors.campaignBudget = 'Budget range is required';
    if (!formData.useCase.trim()) newErrors.useCase = 'Use case description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleAuth = () => {
    setIsGoogleAuth(true);
    // Simulate Google OAuth flow
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        contactName: 'Siriporn Tanaka',
        email: 'siriporn@amanotes.com'
      }));
      setIsGoogleAuth(false);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      // Get user's IP and browser info for enhanced tracking
      const ipAddress = await fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => data.ip)
        .catch(() => '103.123.45.67'); // Fallback Thai IP for demo
      
      const userAgent = navigator.userAgent;
      
      // Simulate Google Authentication
      const googleAuth = {
        userId: `google_${Date.now()}`,
        email: formData.email,
        name: formData.contactName,
        verified: formData.email.includes('@') && !formData.email.includes('gmail.com'),
        domain: formData.email.split('@')[1]
      };
      
      // Enhanced request data with tracking
      const requestData = {
        ...formData,
        ipAddress,
        userAgent,
        googleAuth,
        geolocation: {
          country: 'Thailand',
          region: 'Bangkok',
          city: 'Bangkok',
          timezone: 'Asia/Bangkok'
        }
      };
      
      const newRequestId = `BETA-${Date.now().toString(36).toUpperCase()}`;
      setRequestId(newRequestId);
      
      console.log('Enhanced beta access request submitted:', {
        ...requestData,
        requestId: newRequestId,
        requestedAt: new Date(),
        riskScore: calculateRiskScore(requestData),
        estimatedValue: calculateEstimatedValue(formData.campaignBudget),
        companyType: detectCompanyType(formData.companyName, formData.email)
      });
      
      setIsSubmitted(true);
      
      // Simulate enhanced mobile notification
      setTimeout(() => {
        const notification = {
          title: '🚨 High-Value Beta Request',
          body: `${formData.companyName} (${googleAuth.domain}) requesting ${formData.campaignBudget}`,
          metadata: {
            location: 'Bangkok, Thailand',
            urgency: formData.urgency,
            estimatedValue: calculateEstimatedValue(formData.campaignBudget),
            riskScore: calculateRiskScore(requestData),
            companyType: detectCompanyType(formData.companyName, formData.email)
          }
        };
        
        alert(`📱 Enhanced notification sent:\n${JSON.stringify(notification, null, 2)}`);
      }, 1000);
      
    } catch (error) {
      console.error('Error submitting beta request:', error);
      alert('There was an error submitting your request. Please try again.');
    }
  };

  const calculateRiskScore = (data: any): number => {
    let score = 25; // Base risk
    
    // Email domain check
    const domain = data.email.split('@')[1];
    if (['gmail.com', 'yahoo.com', 'hotmail.com'].includes(domain)) score += 20;
    if (['amanotes.com', 'garena.com', 'truedigital.com'].includes(domain)) score -= 15;
    
    // Budget factor
    if (data.campaignBudget.includes('$250K+')) score -= 10;
    if (data.campaignBudget.includes('$10K')) score += 5;
    
    // Company name
    const company = data.companyName.toLowerCase();
    if (['amanotes', 'garena', 'true digital'].some(c => company.includes(c))) score -= 20;
    
    return Math.max(0, Math.min(100, score));
  };

  const calculateEstimatedValue = (budget: string): number => {
    const values: Record<string, number> = {
      '$10K - $25K': 17500,
      '$25K - $50K': 37500,
      '$50K - $100K': 75000,
      '$100K - $250K': 175000,
      '$250K+': 350000
    };
    return values[budget] || 50000;
  };

  const detectCompanyType = (name: string, email: string): string => {
    const nameLower = name.toLowerCase();
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (nameLower.includes('amanotes') || domain?.includes('amanotes')) return 'Music Gaming Studio';
    if (nameLower.includes('garena') || domain?.includes('garena')) return 'Battle Royale Publisher';
    if (nameLower.includes('true digital') || domain?.includes('truedigital')) return 'Digital Entertainment';
    if (nameLower.includes('studio') || nameLower.includes('games')) return 'Gaming Studio';
    if (nameLower.includes('agency')) return 'Marketing Agency';
    return 'Unknown';
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Beta Access Request Submitted!</h2>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <div className="text-lg font-semibold text-blue-800 mb-2">
              Request ID: {requestId}
            </div>
            <div className="text-sm text-blue-600">
              Enhanced tracking and risk assessment completed
            </div>
          </div>
          
          <div className="space-y-4 text-left mb-8">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-semibold">Location Detected</div>
                <div className="text-sm text-gray-600">
                  {detectedLocation} • IP-based geolocation completed
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Shield className="w-6 h-6 text-green-600" />
              <div>
                <div className="font-semibold">Security Assessment</div>
                <div className="text-sm text-gray-600">
                  Risk score calculated • Company intelligence analyzed
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Smartphone className="w-6 h-6 text-purple-600" />
              <div>
                <div className="font-semibold">Admin Notification Sent</div>
                <div className="text-sm text-gray-600">
                  Mobile alert with enhanced context and risk assessment
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
              <div>
                <div className="font-semibold">Expected Response Time</div>
                <div className="text-sm text-gray-600">
                  {formData.urgency === 'urgent' ? '15 minutes' : 
                   formData.urgency === 'high' ? '1 hour' :
                   formData.urgency === 'medium' ? '4 hours' : '24 hours'}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 mb-6">
            🔒 Your request has been processed with enhanced security measures including IP geolocation, 
            company intelligence analysis, and automated risk assessment.
          </div>
          
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Return to Homepage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Request Beta Access</h1>
            <p className="text-blue-100">
              Get exclusive access to test Gamefluence.AI with enhanced security and tracking
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-200">Production-Grade</div>
            <div className="text-2xl font-bold">Beta Platform</div>
            {detectedLocation && (
              <div className="text-sm text-blue-200 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                {detectedLocation}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Security Notice */}
      <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-b">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-green-600" />
          <h3 className="font-semibold">Enhanced Security & Intelligence</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-600" />
            <span>IP geolocation tracking</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-purple-600" />
            <span>Company intelligence analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-orange-600" />
            <span>Automated risk assessment</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Google Authentication Option */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-800">Quick Setup with Google</h3>
              <p className="text-sm text-blue-600">
                Authenticate with Google for faster processing and enhanced security
              </p>
            </div>
            <Button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isGoogleAuth}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isGoogleAuth ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Key className="w-4 h-4 mr-2" />
                  Sign in with Google
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Company Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Company Name *
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleFieldChange('companyName', e.target.value)}
                placeholder="e.g., Amanotes, Garena, True Digital"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.companyName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Contact Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) => handleFieldChange('contactName', e.target.value)}
                placeholder="Your full name"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.contactName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.contactName && (
              <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                placeholder="your.email@company.com"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                placeholder="+66 xxx xxx xxx"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Game Information */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Game Title (Optional)
          </label>
          <input
            type="text"
            value={formData.gameTitle}
            onChange={(e) => handleFieldChange('gameTitle', e.target.value)}
            placeholder="e.g., Beat Fever, Piano Tiles, Racing Master"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Market Focus */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Target Markets * (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {marketOptions.map((market) => (
              <label key={market} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.marketFocus.includes(market)}
                  onChange={() => handleMarketToggle(market)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{market}</span>
              </label>
            ))}
          </div>
          {errors.marketFocus && (
            <p className="text-red-500 text-sm mt-1">{errors.marketFocus}</p>
          )}
        </div>

        {/* Budget and Urgency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Campaign Budget Range *
            </label>
            <select
              value={formData.campaignBudget}
              onChange={(e) => handleFieldChange('campaignBudget', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.campaignBudget ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select budget range...</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
            {errors.campaignBudget && (
              <p className="text-red-500 text-sm mt-1">{errors.campaignBudget}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Request Urgency
            </label>
            <select
              value={formData.urgency}
              onChange={(e) => handleFieldChange('urgency', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low - Within 24 hours</option>
              <option value="medium">Medium - Within 4 hours</option>
              <option value="high">High - Within 1 hour</option>
              <option value="urgent">Urgent - Within 15 minutes</option>
            </select>
          </div>
        </div>

        {/* Use Case */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Use Case Description *
          </label>
          <textarea
            value={formData.useCase}
            onChange={(e) => handleFieldChange('useCase', e.target.value)}
            placeholder="Describe your campaign goals, target audience, and what you want to test in the beta platform..."
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.useCase ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.useCase && (
            <p className="text-red-500 text-sm mt-1">{errors.useCase}</p>
          )}
        </div>

        {/* Submit */}
        <div className="flex gap-4 pt-6">
          <Button 
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3"
          >
            <Shield className="w-5 h-5 mr-2" />
            Submit Enhanced Request
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          🔒 Enhanced security: IP tracking, company intelligence, and risk assessment included
        </div>
      </form>
    </div>
  );
}