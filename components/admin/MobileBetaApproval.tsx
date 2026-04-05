'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { 
  Smartphone, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Building, 
  Mail, 
  DollarSign,
  Globe,
  Zap,
  Shield,
  Bell,
  QrCode,
  Key,
  ArrowRight,
  AlertTriangle,
  Fingerprint
} from 'lucide-react';

interface BetaRequest {
  id: string;
  requestId: string;
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
  riskScore: number;
  estimatedValue: number;
}

// Mock beta requests for demo
const mockBetaRequests: BetaRequest[] = [
  {
    id: '1',
    requestId: 'BETA-K7X9M2P',
    companyName: 'Amanotes Thailand',
    contactName: 'Siriporn Tanaka',
    email: 'siriporn@amanotes.com',
    phone: '+66 89 123 4567',
    gameTitle: 'Beat Fever Thailand Edition',
    marketFocus: ['Thailand', 'Vietnam', 'Indonesia'],
    campaignBudget: '$50K - $100K (Professional Campaign)',
    urgency: 'high',
    useCase: 'We want to test the platform for launching our new music rhythm game specifically for the Thai market. Looking to work with 5-8 Thai gaming creators for a 2-week campaign focusing on user acquisition and brand awareness.',
    requestedAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    status: 'pending',
    riskScore: 15, // Low risk
    estimatedValue: 75000
  },
  {
    id: '2',
    requestId: 'BETA-N4Q8R1S',
    companyName: 'True Digital Gaming',
    contactName: 'Kamon Pattanakul',
    email: 'kamon@truedigital.com',
    phone: '+66 92 456 7890',
    gameTitle: 'Thai Esports Championship',
    marketFocus: ['Thailand'],
    campaignBudget: '$25K - $50K (Growth Campaign)',
    urgency: 'medium',
    useCase: 'Testing influencer marketing for our esports tournament promotion. Need to reach competitive gaming audience in Thailand with focus on mobile esports titles.',
    requestedAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    status: 'pending',
    riskScore: 8, // Very low risk
    estimatedValue: 37500
  },
  {
    id: '3',
    requestId: 'BETA-W2E5T7Y',
    companyName: 'Garena Thailand',
    contactName: 'Ploy Sirisawat',
    email: 'ploy@garena.com',
    phone: '+66 81 789 0123',
    gameTitle: 'Free Fire Max Thailand',
    marketFocus: ['Thailand', 'Malaysia', 'Singapore'],
    campaignBudget: '$100K - $250K (Enterprise Campaign)',
    urgency: 'urgent',
    useCase: 'Major Free Fire Max launch campaign targeting Thai gaming community. Need immediate access to test creator selection and campaign prediction features for Q1 launch.',
    requestedAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    status: 'pending',
    riskScore: 5, // Extremely low risk
    estimatedValue: 175000
  }
];

export default function MobileBetaApproval() {
  const [requests, setRequests] = useState<BetaRequest[]>(mockBetaRequests);
  const [selectedRequest, setSelectedRequest] = useState<BetaRequest | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [authStep, setAuthStep] = useState<'idle' | 'qr' | 'biometric' | 'approved' | 'rejected'>('idle');

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new requests coming in
      if (Math.random() < 0.1) { // 10% chance every 5 seconds
        console.log('📱 New beta request notification would appear here');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleApprove = async (request: BetaRequest) => {
    setSelectedRequest(request);
    setAuthStep('qr');
    setShowQRCode(true);
    
    // Simulate QR code scan
    setTimeout(() => {
      setAuthStep('biometric');
      setIsAuthenticating(true);
    }, 2000);
    
    // Simulate biometric authentication
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthStep('approved');
      
      // Generate approval code
      const approvalCode = `BETA-${Date.now().toString(36).toUpperCase()}`;
      
      // Update request status
      setRequests(prev => prev.map(r => 
        r.id === request.id 
          ? { ...r, status: 'approved' as const, approvalCode }
          : r
      ));
      
      // Simulate sending email
      setTimeout(() => {
        alert(`✅ Beta access approved!\nApproval code ${approvalCode} sent to ${request.email}`);
        setAuthStep('idle');
        setSelectedRequest(null);
        setShowQRCode(false);
      }, 1500);
    }, 3000);
  };

  const handleReject = (request: BetaRequest) => {
    setRequests(prev => prev.map(r => 
      r.id === request.id 
        ? { ...r, status: 'rejected' as const }
        : r
    ));
    alert(`❌ Beta access request rejected for ${request.companyName}`);
  };

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getRiskColor = (score: number) => {
    if (score <= 10) return 'text-green-600 bg-green-100';
    if (score <= 25) return 'text-yellow-600 bg-yellow-100';
    if (score <= 50) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const processedRequests = requests.filter(r => r.status !== 'pending');

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Smartphone className="w-6 h-6" />
              Mobile Beta Approval Dashboard
            </h1>
            <p className="text-blue-100">
              Approve beta access requests instantly from your mobile device
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{pendingRequests.length}</div>
            <div className="text-blue-200">Pending Requests</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {pendingRequests.filter(r => r.urgency === 'urgent').length}
              </div>
              <div className="text-sm text-gray-600">Urgent</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {processedRequests.filter(r => r.status === 'approved').length}
              </div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                ${Math.round(pendingRequests.reduce((sum, r) => sum + r.estimatedValue, 0) / 1000)}K
              </div>
              <div className="text-sm text-gray-600">Pipeline Value</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(pendingRequests.reduce((sum, r) => sum + (100 - r.riskScore), 0) / pendingRequests.length)}%
              </div>
              <div className="text-sm text-gray-600">Avg Safety</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-600" />
            Pending Beta Access Requests
          </h2>
          <p className="text-gray-600 mt-1">
            Review and approve beta access for gaming companies
          </p>
        </div>

        <div className="divide-y">
          {pendingRequests.map((request) => (
            <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{request.companyName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(request.urgency)}`}>
                      {request.urgency.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRiskColor(request.riskScore)}`}>
                      Risk: {request.riskScore}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    Request ID: {request.requestId} • {formatTimeAgo(request.requestedAt)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    ${(request.estimatedValue / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-gray-500">Est. Value</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium">{request.contactName}</div>
                    <div className="text-xs text-gray-500">{request.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium">{request.gameTitle || 'Multiple Games'}</div>
                    <div className="text-xs text-gray-500">{request.campaignBudget}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium">
                      {request.marketFocus.slice(0, 2).join(', ')}
                      {request.marketFocus.length > 2 && ` +${request.marketFocus.length - 2}`}
                    </div>
                    <div className="text-xs text-gray-500">Target Markets</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium">{request.phone}</div>
                    <div className="text-xs text-gray-500">Contact</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium mb-1">Use Case:</div>
                <div className="text-sm text-gray-600 bg-gray-50 rounded p-3">
                  {request.useCase}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => handleApprove(request)}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  disabled={isAuthenticating}
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve Access
                </Button>
                
                <Button
                  onClick={() => handleReject(request)}
                  className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                  disabled={isAuthenticating}
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </Button>
                
                <Button
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>      {/* M
obile Authentication Modal */}
      {showQRCode && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center">
              {authStep === 'qr' && (
                <>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <QrCode className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Scan QR Code</h3>
                  <p className="text-gray-600 mb-6">
                    Use your mobile authenticator app to scan this QR code
                  </p>
                  
                  {/* Mock QR Code */}
                  <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-6 flex items-center justify-center">
                    <div className="grid grid-cols-8 gap-1">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Waiting for mobile app confirmation...
                  </div>
                </>
              )}
              
              {authStep === 'biometric' && (
                <>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Fingerprint className="w-8 h-8 text-purple-600 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Biometric Authentication</h3>
                  <p className="text-gray-600 mb-6">
                    Please confirm with your fingerprint or Face ID
                  </p>
                  
                  <div className="flex items-center justify-center mb-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Authenticating...
                  </div>
                </>
              )}
              
              {authStep === 'approved' && (
                <>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Access Approved!</h3>
                  <p className="text-gray-600 mb-6">
                    Beta access has been granted to {selectedRequest.companyName}
                  </p>
                  
                  <div className="bg-green-50 rounded-lg p-4 mb-6">
                    <div className="text-sm font-semibold text-green-800 mb-1">
                      Approval Code Generated
                    </div>
                    <div className="text-lg font-mono text-green-700">
                      {selectedRequest.approvalCode || 'BETA-APPROVED'}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Email notification sent to {selectedRequest.email}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recently Processed */}
      {processedRequests.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Recently Processed
            </h2>
            <p className="text-gray-600 mt-1">
              Latest approved and rejected beta access requests
            </p>
          </div>

          <div className="divide-y max-h-96 overflow-y-auto">
            {processedRequests.slice(0, 5).map((request) => (
              <div key={request.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    request.status === 'approved' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {request.status === 'approved' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">{request.companyName}</div>
                    <div className="text-sm text-gray-600">
                      {request.contactName} • {formatTimeAgo(request.requestedAt)}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-sm font-semibold ${
                    request.status === 'approved' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {request.status === 'approved' ? 'APPROVED' : 'REJECTED'}
                  </div>
                  {request.approvalCode && (
                    <div className="text-xs text-gray-500 font-mono">
                      {request.approvalCode}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile App Download */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">Get the Mobile App</h3>
            <p className="text-purple-100 mb-4">
              Approve beta requests instantly from anywhere with push notifications
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span>Instant notifications</span>
              </div>
              <div className="flex items-center gap-2">
                <Fingerprint className="w-4 h-4" />
                <span>Biometric security</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>One-tap approval</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="bg-white text-purple-600 hover:bg-purple-50">
              <Smartphone className="w-4 h-4 mr-2" />
              Download App
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}