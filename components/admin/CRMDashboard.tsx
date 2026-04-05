'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface CRMData {
  campaigns: Array<{
    id: string;
    gameTitle: string;
    company: string;
    contact: string;
    email: string;
    status: string;
    budget: number;
    spent: number;
    downloads: number;
    cpa: number;
    roas: number;
    createdAt: string;
  }>;
  leads: Array<{
    id: string;
    company: string;
    contact: string;
    email: string;
    gameType: string;
    budget: string;
    status: string;
    source: string;
    createdAt: string;
  }>;
}

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [crmData, setCrmData] = useState<CRMData>({
    campaigns: [],
    leads: []
  });

  useEffect(() => {
    // Load CRM data with Ozzy Arcade campaign
    const mockData: CRMData = {
      campaigns: [
        {
          id: 'OZZY-VN-001',
          gameTitle: 'Ozzy Arcade',
          company: 'Ozzy Games Studio',
          contact: 'James Mitchell',
          email: 'james@ozzygames.com.au',
          status: 'Active',
          budget: 100000,
          spent: 85000,
          downloads: 50000,
          cpa: 2.00,
          roas: 3.2,
          createdAt: '2024-03-01'
        }
      ],
      leads: [
        {
          id: 'LEAD-001',
          company: 'Racing Dreams Studio',
          contact: 'Sarah Chen',
          email: 'sarah@racingdreams.com',
          gameType: 'Racing',
          budget: '$50K-100K',
          status: 'Qualified',
          source: 'Website',
          createdAt: '2024-03-10'
        }
      ]
    };
    setCrmData(mockData);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">CRM Dashboard</h2>
        <Button>Add New Lead</Button>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'campaigns'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Active Campaigns ({crmData.campaigns.length})
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'leads'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Leads ({crmData.leads.length})
          </button>
        </nav>
      </div>

      {activeTab === 'campaigns' && (
        <div className="card">
          <h3 className="font-semibold mb-4">Active Campaigns</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Campaign</th>
                  <th className="text-left py-2">Company</th>
                  <th className="text-left py-2">Contact</th>
                  <th className="text-right py-2">Budget</th>
                  <th className="text-right py-2">Spent</th>
                  <th className="text-right py-2">Downloads</th>
                  <th className="text-right py-2">CPA</th>
                  <th className="text-right py-2">ROAS</th>
                  <th className="text-center py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {crmData.campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">
                      <div>
                        <p className="font-medium">{campaign.gameTitle}</p>
                        <p className="text-sm text-gray-500">{campaign.id}</p>
                      </div>
                    </td>
                    <td className="py-3">{campaign.company}</td>
                    <td className="py-3">
                      <div>
                        <p>{campaign.contact}</p>
                        <p className="text-sm text-gray-500">{campaign.email}</p>
                      </div>
                    </td>
                    <td className="py-3 text-right">${campaign.budget.toLocaleString()}</td>
                    <td className="py-3 text-right">${campaign.spent.toLocaleString()}</td>
                    <td className="py-3 text-right">{campaign.downloads.toLocaleString()}</td>
                    <td className="py-3 text-right">${campaign.cpa}</td>
                    <td className="py-3 text-right">{campaign.roas}x</td>
                    <td className="py-3 text-center">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        {campaign.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'leads' && (
        <div className="card">
          <h3 className="font-semibold mb-4">Sales Leads</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Company</th>
                  <th className="text-left py-2">Contact</th>
                  <th className="text-left py-2">Game Type</th>
                  <th className="text-left py-2">Budget</th>
                  <th className="text-left py-2">Source</th>
                  <th className="text-center py-2">Status</th>
                  <th className="text-left py-2">Created</th>
                </tr>
              </thead>
              <tbody>
                {crmData.leads.map((lead) => (
                  <tr key={lead.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{lead.company}</td>
                    <td className="py-3">
                      <div>
                        <p>{lead.contact}</p>
                        <p className="text-sm text-gray-500">{lead.email}</p>
                      </div>
                    </td>
                    <td className="py-3">{lead.gameType}</td>
                    <td className="py-3">{lead.budget}</td>
                    <td className="py-3">{lead.source}</td>
                    <td className="py-3 text-center">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3">{lead.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}