'use client';

import React, { useState } from 'react';
import { CreatorLeadGenSystem } from '@/lib/creator-lead-gen';
import { Button } from '@/components/ui/Button';
import { 
  MessageSquare, 
  Users, 
  Link, 
  Copy, 
  Send,
  Eye,
  CheckCircle,
  Clock,
  TrendingUp,
  Globe,
  Star,
  Filter
} from 'lucide-react';

export default function CreatorOutreachDashboard() {
  const [selectedMarket, setSelectedMarket] = useState('vietnam');
  const [selectedTemplate, setSelectedTemplate] = useState('initial_contact');
  const [customMessage, setCustomMessage] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  
  const markets = [
    { id: 'vietnam', name: 'Vietnam', flag: '🇻🇳', teamMember: 'Linh Nguyen' },
    { id: 'indonesia', name: 'Indonesia', flag: '🇮🇩', teamMember: 'Sari Wijaya' },
    { id: 'philippines', name: 'Philippines', flag: '🇵🇭', teamMember: 'Carlos Santos' },
    { id: 'thailand', name: 'Thailand', flag: '🇹🇭', teamMember: 'Ploy Tanaka' },
    { id: 'malaysia', name: 'Malaysia', flag: '🇲🇾', teamMember: 'Ahmad Rahman' },
    { id: 'singapore', name: 'Singapore', flag: '🇸🇬', teamMember: 'Wei Lin' }
  ];

  const templates = CreatorLeadGenSystem.getOutreachTemplates();
  const currentMarketTemplates = selectedMarket === 'vietnam' ? templates.vietnamese : templates.english;

  const generateLeadGenLink = (formType: string) => {
    const selectedMarketData = markets.find(m => m.id === selectedMarket);
    const link = CreatorLeadGenSystem.generateLeadGenLink(
      formType, 
      selectedMarketData?.teamMember || 'Team Member',
      selectedMarket
    );
    setGeneratedLink(link);
    return link;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard! 📋');
  };

  const mockLeads = [
    {
      id: '1',
      name: 'Gaming_Master_VN',
      platform: 'TikTok',
      followers: '850K',
      engagement: '12.4%',
      status: 'interested',
      contactDate: '2 days ago',
      aiScore: 89,
      estimatedRate: '$2,800'
    },
    {
      id: '2', 
      name: 'RacingQueen_ID',
      platform: 'YouTube',
      followers: '1.2M',
      engagement: '8.7%',
      status: 'contacted',
      contactDate: '1 week ago',
      aiScore: 94,
      estimatedRate: '$4,200'
    },
    {
      id: '3',
      name: 'MobileGamer_PH',
      platform: 'TikTok',
      followers: '650K',
      engagement: '15.2%',
      status: 'validation_pending',
      contactDate: '3 days ago',
      aiScore: 87,
      estimatedRate: '$2,100'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interested': return 'bg-green-100 text-green-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'validation_pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-3">
          <MessageSquare className="w-6 h-6" />
          Creator Outreach Management
        </h1>
        <p className="text-blue-100">
          Smart lead generation tools for acquiring gaming creators across APAC markets
        </p>
      </div>

      {/* Market Selection */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          Select Market & Team Member
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {markets.map((market) => (
            <button
              key={market.id}
              onClick={() => setSelectedMarket(market.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedMarket === market.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">{market.flag}</div>
              <div className="font-medium text-sm">{market.name}</div>
              <div className="text-xs text-gray-500">{market.teamMember}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Message Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-green-600" />
            Outreach Templates
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Template Type</label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="initial_contact">Initial Contact</option>
                <option value="follow_up">Follow Up with Form</option>
                <option value="validation_request">Validation Request</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Message Template</label>
              <textarea
                value={currentMarketTemplates[selectedTemplate as keyof typeof currentMarketTemplates]}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm h-32"
              />
            </div>
            
            <Button
              onClick={() => copyToClipboard(currentMarketTemplates[selectedTemplate as keyof typeof currentMarketTemplates])}
              variant="outline"
              className="w-full"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Template
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Link className="w-5 h-5 text-purple-600" />
            Smart Form Links
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Form Type</label>
              <div className="space-y-2">
                <Button
                  onClick={() => generateLeadGenLink('quick_interest')}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Quick Interest Form (2 min)
                </Button>
                
                <Button
                  onClick={() => generateLeadGenLink('validation_check')}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Validation Form (3 min)
                </Button>
              </div>
            </div>
            
            {generatedLink && (
              <div>
                <label className="block text-sm font-medium mb-2">Generated Link</label>
                <div className="flex gap-2">
                  <input
                    value={generatedLink}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <Button
                    onClick={() => copyToClipboard(generatedLink)}
                    size="sm"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="mt-2 text-xs text-gray-500">
                  ✨ Auto-fills creator data • 📊 Tracks conversion • 🔒 Brand safety check
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lead Management */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            Active Leads & Prospects
          </h3>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              Export Data
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Creator</th>
                <th className="text-left py-3 px-4">Platform</th>
                <th className="text-left py-3 px-4">Followers</th>
                <th className="text-left py-3 px-4">Engagement</th>
                <th className="text-left py-3 px-4">AI Score</th>
                <th className="text-left py-3 px-4">Est. Rate</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-sm text-gray-500">Contacted {lead.contactDate}</div>
                  </td>
                  <td className="py-3 px-4">{lead.platform}</td>
                  <td className="py-3 px-4 font-medium">{lead.followers}</td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 font-medium">{lead.engagement}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">{lead.aiScore}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-green-600">{lead.estimatedRate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-3 h-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-blue-600">47</div>
          <div className="text-sm text-gray-600">Active Prospects</div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-green-600">23</div>
          <div className="text-sm text-gray-600">Forms Completed</div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-purple-600">89%</div>
          <div className="text-sm text-gray-600">Response Rate</div>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm text-center">
          <div className="text-2xl font-bold text-orange-600">67%</div>
          <div className="text-sm text-gray-600">Conversion Rate</div>
        </div>
      </div>
    </div>
  );
}