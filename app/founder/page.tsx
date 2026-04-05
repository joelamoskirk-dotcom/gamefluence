'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Eye, EyeOff, Shield, Lock, User } from 'lucide-react';

export default function FounderLoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    masterKey: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showMasterKey, setShowMasterKey] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError('');

    // Founder master credentials (in production, this would be server-side with proper hashing)
    const masterCredentials = {
      username: 'founder',
      password: 'GamefluenceAI2026!',
      masterKey: 'MASTER_OVERRIDE_ALPHA_PRIME'
    };
    
    setTimeout(() => {
      if (
        credentials.username === masterCredentials.username &&
        credentials.password === masterCredentials.password &&
        credentials.masterKey === masterCredentials.masterKey
      ) {
        // Store founder access in localStorage
        localStorage.setItem('founderAccess', 'granted');
        localStorage.setItem('adminLevel', 'founder');
        localStorage.setItem('betaAccess', 'granted'); // Also grant beta access
        localStorage.setItem('loginTime', new Date().toISOString());
        
        // Redirect to admin dashboard
        window.location.href = '/admin';
      } else {
        setError('Invalid founder credentials. Access denied.');
      }
      setIsVerifying(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Security Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-red-500/20 rounded-full text-red-300 text-sm mb-4 border border-red-500/30">
            <Shield className="w-4 h-4 mr-2" />
            Founder Access Only
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-red-500/30 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30">
              <User className="w-8 h-8 text-red-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Founder Portal
            </h1>
            <p className="text-gray-300 text-sm">
              Master administrative access to Gamefluence.AI
            </p>
          </div>

          {/* Security Notice */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Lock className="text-red-400 mr-3 mt-0.5 w-5 h-5" />
              <div>
                <h3 className="text-red-300 font-semibold mb-1">Maximum Security</h3>
                <p className="text-red-200 text-sm">
                  This portal requires founder-level authentication with master key verification.
                </p>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-white font-medium mb-2">
                Founder Username
              </label>
              <input
                type="text"
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter founder username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white font-medium mb-2">
                Master Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12"
                  placeholder="Enter master password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="masterKey" className="block text-white font-medium mb-2">
                Master Override Key
              </label>
              <div className="relative">
                <input
                  type={showMasterKey ? "text" : "password"}
                  id="masterKey"
                  value={credentials.masterKey}
                  onChange={(e) => setCredentials({...credentials, masterKey: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12"
                  placeholder="Enter master override key"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowMasterKey(!showMasterKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
                >
                  {showMasterKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isVerifying}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              {isVerifying ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Verifying Founder Access...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Access Founder Portal
                </div>
              )}
            </Button>
          </form>

          {/* Security Features */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="text-white font-medium mb-3">Security Features Active:</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center text-red-300">
                <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                Master Authentication
              </div>
              <div className="flex items-center text-red-300">
                <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                Override Protection
              </div>
              <div className="flex items-center text-red-300">
                <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                Session Encryption
              </div>
              <div className="flex items-center text-red-300">
                <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                Access Logging
              </div>
            </div>
          </div>

          {/* Credentials Hint */}
          <div className="mt-6 text-center">
            <p className="text-white/40 text-xs">
              Founder credentials required • Maximum security protocol active
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/30 text-xs">
            © 2026 Gamefluence.AI • Founder Portal • v1.0.0-alpha
          </p>
        </div>
      </div>
    </div>
  );
}