'use client';

import React, { useEffect, useState } from 'react';
import { SampleDataSeeder } from '@/lib/sample-data-seeder';

export default function DataInitializer({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize data on first load
    const initializeData = () => {
      try {
        // Check if data already exists
        const existingData = SampleDataSeeder.getSeededData();
        
        if (!existingData || SampleDataSeeder.needsRefresh()) {
          console.log('🌱 Initializing Gamefluence data...');
          
          // Seed comprehensive data
          const data = SampleDataSeeder.seedBrowserStorage();
          
          if (data) {
            console.log('✅ Data initialized successfully');
            console.log(`📊 Campaigns: ${data.campaigns.length}`);
            console.log(`👥 Creators: ${data.creators.length}`);
            console.log(`💰 Total Budget: $${data.campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}`);
            
            // Dispatch custom event to notify components
            window.dispatchEvent(new CustomEvent('gamefluence-data-ready', { detail: data }));
          }
        } else {
          console.log('📊 Using existing Gamefluence data');
          // Still dispatch event for components
          window.dispatchEvent(new CustomEvent('gamefluence-data-ready', { detail: existingData }));
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('❌ Failed to initialize data:', error);
        setIsInitialized(true); // Still render children
      }
    };

    initializeData();
  }, []);

  // Show loading state briefly
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg font-semibold text-gray-700">Initializing Gamefluence...</div>
          <div className="text-sm text-gray-500">Loading campaigns and creator data</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}