'use client';

import React from 'react';
import TalentManagementDashboard from '@/components/talent/TalentManagementDashboard';
import BatchContactUploaderComponent from '@/components/admin/BatchContactUploader';

export default function TalentDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <TalentManagementDashboard />
        
        {/* Batch Upload Section */}
        <div className="border-t pt-8">
          <BatchContactUploaderComponent defaultPipeline="mobileyes" />
        </div>
      </div>
    </div>
  );
}
