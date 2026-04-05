'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Shield, TrendingUp, DollarSign, Bell, Settings, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState('briefs');

  const briefs = [
    {
      id: 1,
      brand: 'Epic Gaming Studios',
      campaign: 'Apex Legends Season Launch',
      game: 'Apex Legends',
      budget: 1500,
      deadline: '2024-08-15',
      status: 'pending',
      description: 'Looking for high-energy streamers to showcase new season features',
      requirements: ['2 hour stream', '3 social posts', 'Highlight new features']
    },
    {
      id: 2,
      brand: 'Indie Game Co',
      campaign: 'Mobile RPG Beta Test',
      game: 'Fantasy Quest Mobile',
      budget: 800,
      deadline: '2024-08-10',
      status: 'accepted',
      description: 'Beta testing campaign for new mobile RPG',
      requirements: ['1 hour gameplay', '1 review video', 'Bug feedback']
    },
    {
      id: 3,
      brand: 'AAA Studios',
      campaign: 'Horror Game Launch',
      game: 'Nightmare Valley',
      budget: 2200,
      deadline: '2024-08-20',
      status: 'declined',
      description: 'Horror game launch with jump scare reactions',
      requirements: ['3 hour stream', 'Reaction highlights', 'Social promotion']
    }
  ];

  const brandSafetyScore = 95;
  const earnings = {
    thisMonth: 4500,
    lastMonth: 3200,
    total: 28500
  };

  const TabButton = ({ id, label, isActive, onClick }: any) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isActive 
          ? 'bg-secondary text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  const handleBriefAction = (briefId: number, action: 'accept' | 'decline') => {
    alert(`Brief ${action}ed! Brand will be notified.`);
  };

  const getBrandSafetyColor = (score: number) => {
    if (score >= 95) return 'text-green-600 bg-green-100';
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 85) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'declined':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Creator Dashboard</h1>
          <p className="text-gray-600">Manage your brand partnerships and campaigns</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold">${earnings.thisMonth.toLocaleString()}</p>
            </div>
            <div className="bg-secondary/10 p-3 rounded-full">
              <DollarSign className="text-secondary" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Last Month</p>
              <p className="text-2xl font-bold">${earnings.lastMonth.toLocaleString()}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <TrendingUp className="text-primary" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold">${earnings.total.toLocaleString()}</p>
            </div>
            <div className="bg-accent/10 p-3 rounded-full">
              <span className="text-accent font-bold">$</span>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Brand Safety</p>
              <p className="text-2xl font-bold">{brandSafetyScore}/100</p>
            </div>
            <div className="bg-gaming/10 p-3 rounded-full">
              <Shield className="text-gaming" />
            </div>
          </div>
        </div>
      </div>

      {/* UPLVLD Brand Safety */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Shield className="text-gaming" />
            <h2 className="text-xl font-bold">UPLVLD Brand Safety Technology</h2>
          </div>
          <div className={`px-4 py-2 rounded-full font-semibold ${getBrandSafetyColor(brandSafetyScore)}`}>
            {brandSafetyScore}/100 - Excellent
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-3">
            Our AI continuously monitors your social media presence for brand safety compliance. 
            Your score reflects content quality, community interactions, and adherence to brand-safe guidelines.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">98%</div>
              <div className="text-xs text-gray-500">Content Quality</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">94%</div>
              <div className="text-xs text-gray-500">Community Safety</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">93%</div>
              <div className="text-xs text-gray-500">Brand Alignment</div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">View Detailed Report</Button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 border-b pb-4">
        <TabButton 
          id="briefs" 
          label="Campaign Briefs" 
          isActive={activeTab === 'briefs'} 
          onClick={() => setActiveTab('briefs')} 
        />
        <TabButton 
          id="active" 
          label="Active Campaigns" 
          isActive={activeTab === 'active'} 
          onClick={() => setActiveTab('active')} 
        />
        <TabButton 
          id="analytics" 
          label="Performance" 
          isActive={activeTab === 'analytics'} 
          onClick={() => setActiveTab('analytics')} 
        />
      </div>

      {/* Tab Content */}
      {activeTab === 'briefs' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Campaign Briefs</h2>
            <span className="text-sm text-gray-600">{briefs.filter(b => b.status === 'pending').length} pending</span>
          </div>
          
          <div className="space-y-4">
            {briefs.map(brief => (
              <div key={brief.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(brief.status)}
                    <div>
                      <h3 className="font-bold">{brief.campaign}</h3>
                      <p className="text-sm text-gray-600">{brief.brand} • {brief.game}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">${brief.budget}</div>
                    <div className="text-sm text-gray-500">Due: {brief.deadline}</div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{brief.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {brief.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                {brief.status === 'pending' && (
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleBriefAction(brief.id, 'accept')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Accept Brief
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleBriefAction(brief.id, 'decline')}
                    >
                      Decline
                    </Button>
                  </div>
                )}
                
                {brief.status === 'accepted' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-800 text-sm">✓ Brief accepted - Campaign details will be shared soon</p>
                  </div>
                )}
                
                {brief.status === 'declined' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-800 text-sm">✗ Brief declined</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'active' && (
        <div className="card">
          <h2 className="text-xl font-bold mb-6">Active Campaigns</h2>
          <div className="text-center py-12 text-gray-500">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No active campaigns at the moment</p>
            <p className="text-sm mt-2">Accepted briefs will appear here once campaigns begin</p>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="card">
          <h2 className="text-xl font-bold mb-6">Performance Analytics</h2>
          <div className="text-center py-12 text-gray-500">
            <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Performance analytics coming soon...</p>
            <p className="text-sm mt-2">Track your campaign performance, engagement rates, and earnings</p>
          </div>
        </div>
      )}
    </main>
  );
}