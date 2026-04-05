'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Shield, Zap, CheckCircle } from 'lucide-react';

export default function EmergencyAccessPage() {
  const [accessGranted, setAccessGranted] = useState(false);

  const grantEmergencyAccess = () => {
    // Grant all access levels
    localStorage.setItem('founderAccess', 'granted');
    localStorage.setItem('adminLevel', 'founder');
    localStorage.setItem('betaAccess', 'granted');
    localStorage.setItem('loginTime', new Date().toISOString());
    
    setAccessGranted(true);
    
    // Auto-redirect after 2 seconds
    setTimeout(() => {
      window.location.href = '/admin';
    }, 2000);
  };

  useEffect(() => {
    // Auto-grant access on page load
    grantEmergencyAccess();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-green-500/30 shadow-2xl text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
            {accessGranted ? (
              <CheckCircle className="w-8 h-8 text-green-400" />
            ) : (
              <Zap className="w-8 h-8 text-green-400 animate-pulse" />
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Emergency Founder Access
          </h1>
          
          {accessGranted ? (
            <div className="space-y-4">
              <p className="text-green-300 mb-6">
                ✅ Founder access granted successfully!
              </p>
              
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                <div className="space-y-2 text-sm text-green-200">
                  <div>✅ Founder Access: Granted</div>
                  <div>✅ Admin Level: Founder</div>
                  <div>✅ Beta Access: Granted</div>
                  <div>✅ Session: 24 hours</div>
                </div>
              </div>
              
              <p className="text-white/80 text-sm mb-6">
                Redirecting to admin portal...
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => window.location.href = '/admin'}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Go to Admin Portal
                </Button>
                
                <Button 
                  onClick={() => window.location.href = '/campaigns'}
                  variant="outline"
                  className="w-full border-green-500/30 text-green-300 hover:bg-green-500/10"
                >
                  Campaign Management
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-white/80 mb-6">
                Granting emergency founder access...
              </p>
              
              <div className="w-8 h-8 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto"></div>
            </div>
          )}
          
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-white/40 text-xs">
              Emergency Access Protocol • Gamefluence.AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}