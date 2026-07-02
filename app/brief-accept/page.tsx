'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BriefAcceptanceForm from '@/components/talent/BriefAcceptanceForm';
import { MobileyesTalentManagement, BriefAcceptanceFormData } from '@/lib/mobileyes-talent-management';
import { AlertTriangle } from 'lucide-react';

export default function BriefAcceptPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  // In production, token would be validated server-side and brief loaded from DB
  // For now, demo mode shows demo data; token mode would fetch real brief
  const demoBriefs = MobileyesTalentManagement.getDemoBriefs();
  const [selectedBrief, setSelectedBrief] = useState(demoBriefs[0]);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(true);

  useEffect(() => {
    if (token) {
      // In production: validate token server-side via API, load real brief
      // For now: if token is present, note it for the submission
      setIsDemo(false);
    }
  }, [token]);

  const handleAccept = async (data: BriefAcceptanceFormData) => {
    try {
      const response = await fetch('/api/brief-accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          signedAt: data.signedAt.toISOString(),
          token: token || undefined,
          // Include brief context for logging
          brandName: selectedBrief.brandName,
          campaignName: selectedBrief.campaignName,
          talentName: selectedBrief.talentName,
          talentFee: selectedBrief.talentFee,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        if (response.status === 403) {
          setTokenError(result.error);
        }
        console.error('Acceptance failed:', result);
      }
    } catch (error) {
      console.error('Acceptance error:', error);
    }
  };

  const handleDecline = async (briefId: string, reason?: string) => {
    try {
      await fetch('/api/brief-accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          briefId,
          accepted: false,
          declineReason: reason,
          token: token || undefined,
          talentId: selectedBrief.talentId,
          talentName: selectedBrief.talentName,
          brandName: selectedBrief.brandName,
          campaignName: selectedBrief.campaignName,
        }),
      });
    } catch (error) {
      console.error('Decline error:', error);
    }
  };

  // Token error state
  if (tokenError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center py-12">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Brief Link</h2>
          <p className="text-gray-600 mb-4">{tokenError}</p>
          <p className="text-sm text-gray-500">
            This link may have expired or been used already. 
            Contact <a href="mailto:admin@mobileyes.live" className="text-indigo-600">admin@mobileyes.live</a> for a new brief link.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Brief Acceptance</h1>
            <p className="text-gray-600">Review and accept or decline the brief below</p>
          </div>
          {/* Demo selector — only shown in demo mode */}
          {isDemo && (
            <div className="flex gap-2">
              {demoBriefs.filter(b => b.status === 'sent').map((brief) => (
                <button
                  key={brief.id}
                  onClick={() => setSelectedBrief(brief)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedBrief.id === brief.id 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {brief.brandName}
                </button>
              ))}
            </div>
          )}
        </div>
        {isDemo && (
          <div className="mt-2 px-3 py-1 bg-yellow-100 border border-yellow-300 rounded text-yellow-800 text-xs inline-block">
            Demo Mode — In production, briefs are loaded via signed token URL
          </div>
        )}
      </div>

      {/* Brief Form */}
      <div className="px-4">
        <BriefAcceptanceForm
          brief={selectedBrief}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-gray-500 text-sm">
        <p>© 2026 Mobileyes • admin@mobileyes.live</p>
      </div>
    </div>
  );
}
