'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

export interface SpotlightStep {
  id: string;
  title: string;
  description: string;
  targetSelector?: string; // CSS selector for the element to highlight
  route?: string; // page this step is relevant to
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const TOUR_STEPS: SpotlightStep[] = [
  {
    id: 'admin-sidebar',
    title: 'Platform Map',
    description: 'Use the sidebar to navigate all platform sections. Blue dots show pages you haven\'t visited yet.',
    route: '/admin',
  },
  {
    id: 'outreach-sender',
    title: 'Outreach Email Sender',
    description: 'Send real outreach emails to Frosty Fest studios directly from the admin panel. Uses Resend API.',
    route: '/admin/outreach',
  },
  {
    id: 'news-nav',
    title: 'News & About in Main Nav',
    description: 'News and About are now accessible from the main navigation bar for all visitors.',
    route: '/',
  },
  {
    id: 'creator-cards',
    title: 'Enhanced Creator Cards',
    description: 'Creator profiles now show follower count, engagement rate, Gamefluence Score, and content match percentage at a glance.',
    route: '/dashboard/brand/creators',
  },
  {
    id: 'collabs-dashboard',
    title: 'Collabs Dashboard',
    description: 'Track live collaboration deals — currently showing Jacob × P1 Sim Gear.',
    route: '/dashboard/collabs',
  },
  {
    id: 'ai-agents',
    title: 'AI Agents (Terry + Dazza)',
    description: 'Terry scouts talent, Dazza prices deals, and C-Suite advises on strategy.',
    route: '/dashboard/agents',
  },
];

export function SpotlightTourProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showWhatsNew, setShowWhatsNew] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('spotlightCompleted') || '[]');
    setCompletedSteps(stored);

    // Show "What's New" indicator if there are uncompleted steps
    const hasNew = TOUR_STEPS.some(step => !stored.includes(step.id));
    setShowWhatsNew(hasNew);
  }, []);

  const startTour = useCallback(() => {
    setIsActive(true);
    setCurrentStep(0);
  }, []);

  const nextStep = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const endTour = () => {
    setIsActive(false);
    const allIds = TOUR_STEPS.map(s => s.id);
    setCompletedSteps(allIds);
    localStorage.setItem('spotlightCompleted', JSON.stringify(allIds));
    setShowWhatsNew(false);
  };

  const dismissStep = (stepId: string) => {
    const updated = [...completedSteps, stepId];
    setCompletedSteps(updated);
    localStorage.setItem('spotlightCompleted', JSON.stringify(updated));
    const hasNew = TOUR_STEPS.some(step => !updated.includes(step.id));
    setShowWhatsNew(hasNew);
  };

  const uncompletedSteps = TOUR_STEPS.filter(s => !completedSteps.includes(s.id));

  return (
    <>
      {children}

      {/* What's New Floating Button */}
      {showWhatsNew && !isActive && (
        <button
          onClick={startTour}
          className="fixed bottom-20 right-4 z-[100] bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group animate-bounce-slow"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">What&apos;s New</span>
          <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">
            {uncompletedSteps.length}
          </span>
        </button>
      )}

      {/* Tour Overlay */}
      {isActive && (
        <div className="fixed inset-0 z-[200]">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={endTour} />

          {/* Tour Card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Progress */}
              <div className="h-1 bg-gray-100">
                <div
                  className="h-full bg-gradient-to-r from-primary to-purple-600 transition-all"
                  style={{ width: `${((currentStep + 1) / TOUR_STEPS.length) * 100}%` }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      {currentStep + 1} of {TOUR_STEPS.length}
                    </span>
                  </div>
                  <button
                    onClick={endTour}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {TOUR_STEPS[currentStep].title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  {TOUR_STEPS[currentStep].description}
                </p>
                {TOUR_STEPS[currentStep].route && (
                  <p className="text-xs text-gray-400 font-mono">
                    Route: {TOUR_STEPS[currentStep].route}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <button
                  onClick={() => dismissStep(TOUR_STEPS[currentStep].id)}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Dismiss this
                </button>

                <button
                  onClick={nextStep}
                  className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {currentStep === TOUR_STEPS.length - 1 ? 'Done' : 'Next'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Small "new" indicator dot that can be placed on any element
export function NewIndicator({ featureId }: { featureId: string }) {
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('spotlightCompleted') || '[]');
    setIsNew(!completed.includes(featureId));
  }, [featureId]);

  if (!isNew) return null;

  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
    </span>
  );
}
