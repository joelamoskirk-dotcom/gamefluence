'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import BriefingTemplate from '@/components/campaign/BriefingTemplate';
import { BarChart3, Users, TrendingUp, Plus, Bell, Settings } from 'lucide-react';

export default function BrandDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const campaigns = [
    {
      id: 1,
      name: 'Apex Legends Season Launch',
      status: 'Active',
      creators: 5,
      reach: 2500000,
      budget: 15000,
      performance: 92
    },
    {
      id: 2,
      name: 'Mobile RPG Beta Test',
      status: 'Planning',
      creators: 3,
      reach: 850000,
      budget: 8500,
      performance: 0
    }
  ];

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }: any) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        isActive 
          ? 'bg-primary text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Brand Dashboard</h1>
          <p className="text-gray-600">Manage your gaming influencer campaigns</p>
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

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 border-b pb-4">
        <TabButton 
          id="overview" 
          label="Overview" 
          icon={BarChart3}
          isActive={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')} 
        />
        <TabButton 
          id="create" 
          label="Create Campaign" 
          icon={Plus}
          isActive={activeTab === 'create'} 
          onClick={() => setActiveTab('create')} 
        />
        <TabButton 
          id="analytics" 
          label="Analytics" 
          icon={TrendingUp}
          isActive={activeTab === 'analytics'} 
          onClick={() => setActiveTab('analytics')} 
        />
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Campaigns</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <BarChart3 className="text-primary" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Reach</p>
                  <p className="text-2xl font-bold">3.4M</p>
                </div>
                <div className="bg-secondary/10 p-3 rounded-full">
                  <Users className="text-secondary" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Performance</p>
                  <p className="text-2xl font-bold">89%</p>
                </div>
                <div className="bg-accent/10 p-3 rounded-full">
                  <TrendingUp className="text-accent" />
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spend</p>
                  <p className="text-2xl font-bold">$23.5K</p>
                </div>
                <div className="bg-gaming/10 p-3 rounded-full">
                  <span className="text-gaming font-bold">$</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Campaigns */}
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Campaigns</h2>
              <Button onClick={() => setActiveTab('create')}>
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </div>
            
            <div className="space-y-4">
              {campaigns.map(campaign => (
                <div key={campaign.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span>{campaign.creators} creators</span>
                        <span>{campaign.reach.toLocaleString()} reach</span>
                        <span>${campaign.budget.toLocaleString()} budget</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        campaign.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {campaign.status}
                      </span>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'create' && (
        <BriefingTemplate />
      )}

      {activeTab === 'analytics' && (
        <div className="card">
          <h2 className="text-xl font-bold mb-6">Campaign Analytics</h2>
          <div className="text-center py-12 text-gray-500">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Analytics dashboard coming soon...</p>
            <p className="text-sm mt-2">Track performance, engagement, and ROI across all campaigns</p>
          </div>
        </div>
      )}
    </main>
  );
}