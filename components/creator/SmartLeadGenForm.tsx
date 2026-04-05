'use client';

import React, { useState, useEffect } from 'react';
import { CreatorLeadGenSystem, CreatorLeadProfile } from '@/lib/creator-lead-gen';
import { Button } from '@/components/ui/Button';
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Star, 
  Shield, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Loader,
  Sparkles,
  DollarSign
} from 'lucide-react';

interface SmartLeadGenFormProps {
  formType?: 'quick_interest' | 'validation_check';
  prefilledData?: Partial<CreatorLeadProfile>;
  onSubmit?: (data: any) => void;
}

export default function SmartLeadGenForm({ 
  formType = 'quick_interest', 
  prefilledData,
  onSubmit 
}: SmartLeadGenFormProps) {
  const [formData, setFormData] = useState<any>({});
  const [scrapedProfile, setScrapedProfile] = useState<Partial<CreatorLeadProfile> | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<any>({});
  
  const form = formType === 'quick_interest' 
    ? CreatorLeadGenSystem.getQuickInterestForm()
    : CreatorLeadGenSystem.getValidationForm();

  const totalSteps = Math.ceil(form.fields.length / 3); // 3 fields per step

  useEffect(() => {
    if (prefilledData) {
      setScrapedProfile(prefilledData);
      // Auto-fill form with scraped data
      const autoFilledData: any = {};
      form.fields.forEach(field => {
        if (field.autoFilled && prefilledData) {
          switch (field.id) {
            case 'display_name':
              autoFilledData[field.id] = prefilledData.displayName;
              break;
            case 'scraped_metrics':
              autoFilledData[field.id] = prefilledData.followerCount?.toLocaleString();
              break;
            case 'engagement_rate':
              autoFilledData[field.id] = `${prefilledData.engagementRate?.toFixed(1)}%`;
              break;
            case 'estimated_rate':
              autoFilledData[field.id] = `$${prefilledData.estimatedRate?.toLocaleString()}`;
              break;
            case 'market_tier':
              autoFilledData[field.id] = prefilledData.marketTier 
                ? prefilledData.marketTier.charAt(0).toUpperCase() + prefilledData.marketTier.slice(1)
                : '';
              break;
            case 'gaming_focus':
              autoFilledData[field.id] = prefilledData.contentCategories;
              break;
          }
        }
      });
      setFormData(autoFilledData);
    }
  }, [prefilledData, form.fields]);

  const handleSocialProfileAnalysis = async (socialUrl: string) => {
    if (!socialUrl) return;
    
    setIsAnalyzing(true);
    try {
      // Simulate profile scraping
      const profile = await CreatorLeadGenSystem.scrapeCreatorProfile(socialUrl);
      setScrapedProfile(profile);
      
      // Auto-fill relevant fields
      setFormData((prev: any) => ({
        ...prev,
        display_name: profile.displayName,
        gaming_focus: profile.contentCategories
      }));
    } catch (error) {
      console.error('Profile analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [fieldId]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors((prev: any) => ({ ...prev, [fieldId]: null }));
    }
    
    // Trigger analysis for social profile field
    if (fieldId === 'social_profile' && value.includes('http')) {
      handleSocialProfileAnalysis(value);
    }
  };

  const validateStep = (step: number) => {
    const stepFields = getFieldsForStep(step);
    const stepErrors: any = {};
    
    stepFields.forEach(field => {
      if (field.required && !formData[field.id]) {
        stepErrors[field.id] = `${field.label} is required`;
      }
    });
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const getFieldsForStep = (step: number) => {
    const startIndex = (step - 1) * 3;
    return form.fields.slice(startIndex, startIndex + 3);
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      const submissionData = {
        ...formData,
        scrapedProfile,
        formType,
        submittedAt: new Date()
      };
      
      if (onSubmit) {
        onSubmit(submissionData);
      } else {
        // Default submission handling
        console.log('Form submitted:', submissionData);
        alert('Thank you! Your application has been submitted. We\'ll be in touch soon! 🎮');
      }
    }
  };

  const renderField = (field: any) => {
    const value = formData[field.id] || '';
    const error = errors[field.id];
    
    return (
      <div key={field.id} className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
          {field.autoFilled && (
            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              Auto-filled ✨
            </span>
          )}
        </label>
        
        {field.type === 'text' || field.type === 'email' || field.type === 'phone' ? (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${field.autoFilled ? 'bg-blue-50' : 'bg-white'}`}
          />
        ) : field.type === 'select' ? (
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select an option...</option>
            {field.options?.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : field.type === 'multiselect' ? (
          <div className="space-y-2">
            {field.options?.map((option: string) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={Array.isArray(value) ? value.includes(option) : false}
                  onChange={(e) => {
                    const currentValues = Array.isArray(value) ? value : [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    handleFieldChange(field.id, newValues);
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        ) : field.type === 'checkbox' ? (
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleFieldChange(field.id, e.target.checked)}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{field.label}</span>
          </label>
        ) : null}
        
        {error && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}
      </div>
    );
  };

  const currentFields = getFieldsForStep(currentStep);
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              {form.title}
            </h1>
            <p className="text-blue-100 mt-2">{form.description}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-200">Step {currentStep} of {totalSteps}</div>
            <div className="text-xs text-blue-300">~{form.estimatedCompletionTime} min</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 h-2">
        <div 
          className="bg-blue-600 h-2 transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Profile Analysis Results */}
      {scrapedProfile && (
        <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-b">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold">Profile Analysis Complete!</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Followers</span>
              </div>
              <div className="text-xl font-bold">{scrapedProfile.followerCount?.toLocaleString()}</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Engagement</span>
              </div>
              <div className="text-xl font-bold">{scrapedProfile.engagementRate?.toFixed(1)}%</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Brand Safety</span>
              </div>
              <div className="text-xl font-bold">{scrapedProfile.brandSafetyScore}/100</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-orange-600 mb-1">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">AI Score</span>
              </div>
              <div className="text-xl font-bold">{scrapedProfile.aiRecommendationScore}/100</div>
            </div>
          </div>
          
          {scrapedProfile.estimatedRate && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-700">
                <DollarSign className="w-5 h-5" />
                <span className="font-semibold">
                  Estimated Rate: ${scrapedProfile.estimatedRate.toLocaleString()} per campaign
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Form Fields */}
      <div className="p-6">
        {isAnalyzing && (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
              <p className="text-gray-600">Analyzing your profile...</p>
              <p className="text-sm text-gray-500">This may take a few seconds</p>
            </div>
          </div>
        )}
        
        <div className="space-y-6">
          {currentFields.map(renderField)}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 bg-gray-50 border-t flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        <div className="flex gap-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        {isLastStep ? (
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            Submit Application 🚀
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}