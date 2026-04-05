'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Users, Building2, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [userType, setUserType] = useState<'brand' | 'creator'>('brand');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in production this would authenticate with your backend
    if (userType === 'brand') {
      window.location.href = '/dashboard/brand';
    } else {
      window.location.href = '/dashboard/creator';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gaming/10 to-accent/10 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gaming-gradient bg-clip-text text-transparent mb-2">
            Welcome to Gamefluence
          </h1>
          <p className="text-gray-600">Choose your login type to continue</p>
        </div>

        {/* User Type Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setUserType('brand')}
            className={`p-4 rounded-lg border-2 transition-all ${
              userType === 'brand'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Building2 className="w-8 h-8 mx-auto mb-2" />
            <div className="font-semibold">For Brands</div>
            <div className="text-sm text-gray-500">Gaming Studios & Brands</div>
          </button>
          
          <button
            onClick={() => setUserType('creator')}
            className={`p-4 rounded-lg border-2 transition-all ${
              userType === 'creator'
                ? 'border-secondary bg-secondary/10 text-secondary'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Users className="w-8 h-8 mx-auto mb-2" />
            <div className="font-semibold">For Creators</div>
            <div className="text-sm text-gray-500">Gaming Influencers</div>
          </button>
        </div>

        {/* Login Form */}
        <div className="card">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={userType === 'brand' ? 'studio@example.com' : 'creator@example.com'}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className={`w-full ${userType === 'creator' ? 'bg-secondary hover:bg-secondary/90' : ''}`}
            >
              Sign In as {userType === 'brand' ? 'Brand' : 'Creator'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}