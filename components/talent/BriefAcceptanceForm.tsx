'use client';

import React, { useState } from 'react';
import { 
  CampaignBrief, 
  BriefAcceptanceFormData 
} from '@/lib/mobileyes-talent-management';
import { PlatformVerificationEngine } from '@/lib/platform-verification-engine';
import { Button } from '@/components/ui/Button';
import {
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Video,
  Link,
  Calendar,
  Shield,
  FileText,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

interface BriefAcceptanceFormProps {
  brief: CampaignBrief;
  onAccept?: (data: BriefAcceptanceFormData) => void;
  onDecline?: (briefId: string, reason?: string) => void;
}

export default function BriefAcceptanceForm({ 
  brief, 
  onAccept, 
  onDecline 
}: BriefAcceptanceFormProps) {
  const [confirmedDeliverables, setConfirmedDeliverables] = useState(false);
  const [confirmedDeadline, setConfirmedDeadline] = useState(false);
  const [confirmedRate, setConfirmedRate] = useState(false);
  const [acknowledgedTerms, setAcknowledgedTerms] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedAction, setSubmittedAction] = useState<'accepted' | 'declined' | null>(null);

  const allConfirmed = confirmedDeliverables && confirmedDeadline && confirmedRate && acknowledgedTerms;

  const handleAccept = async () => {
    if (!allConfirmed) return;
    setIsSubmitting(true);

    const acceptanceData: BriefAcceptanceFormData = {
      briefId: brief.id,
      talentId: brief.talentId,
      accepted: true,
      acknowledgedTerms,
      confirmedRate,
      confirmedDeadline,
      confirmedDeliverables,
      notes: notes || undefined,
      signedAt: new Date(),
    };

    if (onAccept) {
      onAccept(acceptanceData);
    }

    setSubmitted(true);
    setSubmittedAction('accepted');
    setIsSubmitting(false);
  };

  const handleDecline = () => {
    if (onDecline) {
      onDecline(brief.id, declineReason || undefined);
    }
    setSubmitted(true);
    setSubmittedAction('declined');
    setShowDeclineModal(false);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'kick': return '🟢';
      case 'twitch': return '🟣';
      case 'youtube': return '🔴';
      case 'tiktok': return '🎵';
      default: return '📺';
    }
  };

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case 'live_stream': return 'Live Stream';
      case 'vod': return 'Video on Demand';
      case 'short_form': return 'Short Form Video';
      case 'live_mention': return 'Live Mention/Integration';
      default: return type;
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className={`p-8 text-center ${submittedAction === 'accepted' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-gray-600 to-gray-700'} text-white`}>
          {submittedAction === 'accepted' ? (
            <>
              <CheckCircle className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Brief Accepted ✅</h2>
              <p className="text-green-100 text-lg">
                You&apos;ve accepted the {brief.brandName} brief. Deliver by {brief.deadline.toLocaleDateString()}.
              </p>
            </>
          ) : (
            <>
              <XCircle className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Brief Declined</h2>
              <p className="text-gray-200 text-lg">
                No worries — we&apos;ll find another match for you soon.
              </p>
            </>
          )}
        </div>

        {submittedAction === 'accepted' && (
          <div className="p-8">
            <h3 className="text-xl font-bold mb-4">Next Steps</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">1</span>
                </div>
                <p className="text-gray-700">Create your content according to the brief deliverables</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">2</span>
                </div>
                <p className="text-gray-700">Ensure attribution link/code is correctly placed</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">3</span>
                </div>
                <p className="text-gray-700">Submit your content URL via the Mobileyes dashboard</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-green-600">4</span>
                </div>
                <p className="text-gray-700">
                  Verification passes → payment in <strong>4 business days</strong> (${brief.talentFee.toLocaleString()} {brief.currency})
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-800 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">Remember</span>
              </div>
              <p className="text-yellow-700 text-sm">
                If you need to cancel after acceptance, contact Mobileyes immediately at admin@mobileyes.live. 
                See Section 9 of the Talent Management Agreement for cancellation terms.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-indigo-200 text-sm font-medium">MOBILEYES BRIEF</span>
            </div>
            <h1 className="text-2xl font-bold">{brief.campaignName}</h1>
            <p className="text-indigo-200 mt-1">from {brief.brandName}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">${brief.talentFee.toLocaleString()}</div>
            <div className="text-indigo-200 text-sm">{brief.currency} (your 80%)</div>
          </div>
        </div>
      </div>

      {/* Brief Details */}
      <div className="p-6 space-y-6">
        {/* Overview */}
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-500" />
            Campaign Overview
          </h3>
          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{brief.overview}</p>
        </div>

        {/* Platform & Content Type */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Video className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Platform</span>
            </div>
            <div className="font-semibold text-lg">
              {getPlatformIcon(brief.platform)} {brief.platform.charAt(0).toUpperCase() + brief.platform.slice(1)}
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Content Type</span>
            </div>
            <div className="font-semibold text-lg">{getContentTypeLabel(brief.contentType)}</div>
          </div>
        </div>

        {/* Deliverables */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Deliverables</h3>
          <ul className="space-y-2">
            {brief.deliverables.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Talking Points */}
        {brief.talkingPoints.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Talking Points</h3>
            <ul className="space-y-2">
              {brief.talkingPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Restrictions */}
        {brief.restrictions.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-red-700">Restrictions</h3>
            <ul className="space-y-2">
              {brief.restrictions.map((restriction, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{restriction}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Attribution */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Link className="w-5 h-5 text-blue-600" />
            Attribution Requirements
          </h3>
          <div className="space-y-2">
            {brief.attributionLink && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-24">Link:</span>
                <code className="text-sm bg-white px-2 py-1 rounded border">{brief.attributionLink}</code>
              </div>
            )}
            {brief.attributionCode && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-24">Code:</span>
                <code className="text-sm bg-white px-2 py-1 rounded border font-bold">{brief.attributionCode}</code>
              </div>
            )}
            {brief.chatCommand && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-24">Chat Cmd:</span>
                <code className="text-sm bg-white px-2 py-1 rounded border">{brief.chatCommand}</code>
              </div>
            )}
          </div>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Deadline</span>
            </div>
            <div className="font-semibold">{brief.deadline.toLocaleDateString()}</div>
          </div>
          {brief.minimumDuration && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Min. Duration</span>
              </div>
              <div className="font-semibold">
                {PlatformVerificationEngine.formatTimestamp(brief.minimumDuration)}
              </div>
            </div>
          )}
        </div>

        {/* Payment Breakdown */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Payment Breakdown
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Campaign Fee (Gross)</span>
              <span className="font-semibold">${brief.grossFee.toLocaleString()} {brief.currency}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Mobileyes Commission (20%)</span>
              <span>-${brief.commission.toLocaleString()} {brief.currency}</span>
            </div>
            <hr className="border-green-300" />
            <div className="flex justify-between text-lg font-bold text-green-700">
              <span>Your Payment</span>
              <span>${brief.talentFee.toLocaleString()} {brief.currency}</span>
            </div>
            <div className="text-sm text-green-600 mt-1">
              Paid within 4 business days of verification ✓
            </div>
          </div>
        </div>

        {/* E-Signature Section */}
        <div className="border-t-2 border-gray-200 pt-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-indigo-600" />
            Accept or Decline
          </h3>
          
          <p className="text-gray-600 mb-4 text-sm">
            By checking the boxes below and clicking &quot;Accept Brief&quot;, you are electronically signing 
            your acceptance of this brief under the terms of the Mobileyes Talent Management Agreement.
          </p>

          <div className="space-y-4">
            <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmedDeliverables}
                onChange={(e) => setConfirmedDeliverables(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-700">
                I confirm I can deliver all listed deliverables as specified above
              </span>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmedDeadline}
                onChange={(e) => setConfirmedDeadline(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-700">
                I confirm I can deliver by <strong>{brief.deadline.toLocaleDateString()}</strong>
              </span>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmedRate}
                onChange={(e) => setConfirmedRate(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-700">
                I accept the fee of <strong>${brief.talentFee.toLocaleString()} {brief.currency}</strong> (80% of ${brief.grossFee.toLocaleString()})
              </span>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-indigo-200 bg-indigo-50">
              <input
                type="checkbox"
                checked={acknowledgedTerms}
                onChange={(e) => setAcknowledgedTerms(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-700">
                I acknowledge and agree to the{' '}
                <a href="/legal/mobileyes-talent-management-agreement" className="text-indigo-600 underline font-medium">
                  Mobileyes Talent Management Agreement
                </a>{' '}
                terms (non-exclusive, 20% commission, 4 business day payment, NSW jurisdiction)
              </span>
            </label>
          </div>

          {/* Notes */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any questions, schedule notes, or requests..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <Button
              onClick={handleAccept}
              disabled={!allConfirmed || isSubmitting}
              className={`flex-1 py-4 text-lg font-bold ${
                allConfirmed 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Submitting...' : '✅ Accept Brief'}
            </Button>
            
            <Button
              onClick={() => setShowDeclineModal(true)}
              variant="outline"
              className="px-6 py-4 text-lg border-red-300 text-red-600 hover:bg-red-50"
            >
              Decline
            </Button>
          </div>

          {!allConfirmed && (
            <p className="text-sm text-gray-500 mt-3 text-center">
              Check all boxes above to accept this brief
            </p>
          )}
        </div>
      </div>

      {/* Decline Modal */}
      {showDeclineModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Decline Brief</h3>
            <p className="text-gray-600 mb-4">
              No pressure — we&apos;ll find another match. Optionally let us know why so we can improve future matching.
            </p>
            <textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              placeholder="Reason for declining (optional)..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none mb-4"
              rows={3}
            />
            <div className="flex gap-3">
              <Button
                onClick={handleDecline}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Confirm Decline
              </Button>
              <Button
                onClick={() => setShowDeclineModal(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
