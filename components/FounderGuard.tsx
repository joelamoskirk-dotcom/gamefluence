'use client';

import { useEffect, useState } from 'react';
import { Shield, Lock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FounderGuardProps {
  children: React.ReactNode;
  requireFounder?: boolean;
}

export default function FounderGuard({ children, requireFounder = false }: FounderGuardProps) {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accessLevel, setAccessLevel] = useState<string | null>(null);

  useEffect(() => {
    const checkAccess = () => {
      const founderAccess = localStorage.getItem('founderAccess');
      const adminLevel = localStorage.getItem('adminLevel');
      const loginTime = localStorage.getItem('loginTime');
      
      // Check if founder access is granted and not expired (24 hours)
      if (founderAccess === 'granted' && adminLevel === 'founder' && loginTime) {
        const loginDate = new Date(loginTime);
        const now = new Date();
        const hoursSinceLogin = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60);
        
        if (hoursSinceLogin < 24) {
          setHasAccess(true);
          setAccessLevel('founder');
        } else {
          // Session expired
          localStorage.removeItem('founderAccess');
          localStorage.removeItem('adminLevel');
          localStorage.removeItem('loginTime');
          setHasAccess(false);
        }
      } else if (!requireFounder) {
        // For non-founder protected routes, check beta access
        const betaAccess = localStorage.getItem('betaAccess');
        if (betaAccess === 'granted') {
          setHasAccess(true);
          setAccessLevel('beta');
        }
      }
      
      setIsLoading(false);
    };

    checkAccess();
    
    // Check access every minute
    const interval = setInterval(checkAccess, 60000);
    
    return () => clearInterval(interval);
  }, [requireFounder]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Verifying access permissions...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-red-500/30">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
              <Lock className="w-8 h-8 text-red-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            
            {requireFounder ? (
              <>
                <p className="text-gray-300 mb-6">
                  This area requires founder-level authentication. Please log in with your founder credentials.
                </p>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center">
                    <AlertTriangle className="text-red-400 mr-2 w-5 h-5" />
                    <span className="text-red-300 text-sm">Founder Portal Access Required</span>
                  </div>
                </div>
                <Button 
                  onClick={() => window.location.href = '/founder'}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Go to Founder Login
                </Button>
              </>
            ) : (
              <>
                <p className="text-gray-300 mb-6">
                  This platform is currently in private beta. Please enter your beta access code to continue.
                </p>
                <Button 
                  onClick={() => window.location.href = '/beta'}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Enter Beta Access Code
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show access level indicator for founder
  return (
    <div className="relative">
      {accessLevel === 'founder' && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-red-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs flex items-center border border-red-500/50">
            <Shield className="w-3 h-3 mr-1" />
            Founder Access
          </div>
        </div>
      )}
      {children}
    </div>
  );
}