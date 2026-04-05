'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { 
  Zap, 
  Users, 
  Building, 
  Gamepad2, 
  Briefcase,
  UserCheck,
  Play,
  Pause,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';

interface StressTestScenario {
  id: string;
  role: 'game_studio' | 'brand' | 'agency' | 'account_manager' | 'creator';
  name: string;
  description: string;
  concurrent_users: number;
  actions: string[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  results?: {
    success_rate: number;
    avg_response_time: number;
    errors: number;
    peak_load: number;
  };
}

export default function StressTestRunner() {
  const [scenarios, setScenarios] = useState<StressTestScenario[]>([
    {
      id: 'studio_test',
      role: 'game_studio',
      name: 'Game Studio Campaign Rush',
      description: 'Multiple game studios launching campaigns simultaneously during peak hours',
      concurrent_users: 25,
      actions: [
        'Create new game campaign',
        'Upload game assets',
        'Set campaign budget ($50K-$200K)',
        'Select target demographics',
        'AI creator matching',
        'Approve creator selections',
        'Process payment',
        'Launch campaign'
      ],
      status: 'pending',
      progress: 0
    },
    {
      id: 'brand_test',
      role: 'brand',
      name: 'Brand Marketing Blitz',
      description: 'Major brands creating multiple campaigns for different gaming audiences',
      concurrent_users: 15,
      actions: [
        'Create brand awareness campaign',
        'Define target gaming demographics',
        'Set multi-platform strategy',
        'Bulk creator selection',
        'Negotiate custom rates',
        'Approve campaign briefs',
        'Process bulk payments',
        'Monitor real-time analytics'
      ],
      status: 'pending',
      progress: 0
    },
    {
      id: 'agency_test',
      role: 'agency',
      name: 'Agency Multi-Client Management',
      description: 'Agencies managing 10+ client campaigns simultaneously with complex workflows',
      concurrent_users: 35,
      actions: [
        'Create campaigns for multiple clients',
        'Manage creator relationships',
        'Handle budget allocations',
        'Generate client reports',
        'Process bulk invoicing',
        'Coordinate campaign timelines',
        'Monitor performance metrics',
        'Handle client communications'
      ],
      status: 'pending',
      progress: 0
    },
    {
      id: 'account_manager_test',
      role: 'account_manager',
      name: 'Account Manager Peak Load',
      description: 'Account managers handling high-volume client requests and campaign approvals',
      concurrent_users: 20,
      actions: [
        'Review campaign proposals',
        'Approve creator selections',
        'Process payment authorizations',
        'Generate performance reports',
        'Handle client escalations',
        'Coordinate with creative teams',
        'Monitor campaign budgets',
        'Update client dashboards'
      ],
      status: 'pending',
      progress: 0
    },
    {
      id: 'creator_test',
      role: 'creator',
      name: 'Creator Platform Surge',
      description: 'High-volume creator activity during campaign launch periods',
      concurrent_users: 100,
      actions: [
        'Browse available campaigns',
        'Submit campaign applications',
        'Upload portfolio content',
        'Negotiate campaign terms',
        'Accept campaign briefs',
        'Upload deliverables',
        'Track payment status',
        'Update profile metrics'
      ],
      status: 'pending',
      progress: 0
    }
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [currentScenario, setCurrentScenario] = useState<string | null>(null);

  const runStressTest = async () => {
    setIsRunning(true);
    
    for (const scenario of scenarios) {
      setCurrentScenario(scenario.id);
      setScenarios(prev => prev.map(s => 
        s.id === scenario.id ? { ...s, status: 'running', progress: 0 } : s
      ));
      
      // Simulate stress test execution
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setScenarios(prev => prev.map(s => 
          s.id === scenario.id ? { ...s, progress: i } : s
        ));
      }
      
      // Generate test results
      const success_rate = 85 + Math.random() * 10; // 85-95%
      const avg_response_time = 200 + Math.random() * 300; // 200-500ms
      const errors = Math.floor(Math.random() * 5); // 0-5 errors
      const peak_load = scenario.concurrent_users * (0.8 + Math.random() * 0.4);
      
      setScenarios(prev => prev.map(s => 
        s.id === scenario.id ? { 
          ...s, 
          status: success_rate > 90 ? 'completed' : 'failed',
          progress: 100,
          results: { success_rate, avg_response_time, errors, peak_load }
        } : s
      ));
    }
    
    setIsRunning(false);
    setCurrentScenario(null);
  };

  const getRoleIcon = (role: string) => {
    const icons = {
      game_studio: Gamepad2,
      brand: Building,
      agency: Briefcase,
      account_manager: UserCheck,
      creator: Users
    };
    const Icon = icons[role as keyof typeof icons] || Users;
    return <Icon className="h-4 w-4" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'running': return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Zap className="h-8 w-8 text-orange-600" />
            Multi-Role Stress Test
          </h1>
          <p className="text-muted-foreground">
            Testing system performance under concurrent load from all user roles
          </p>
        </div>
        <Button onClick={runStressTest} disabled={isRunning}>
          <Play className="h-4 w-4 mr-2" />
          {isRunning ? 'Running Stress Tests...' : 'Start Stress Test'}
        </Button>
      </div> 
     {/* Test Scenarios */}
      <div className="grid gap-6">
        {scenarios.map(scenario => (
          <Card key={scenario.id} className={`${
            currentScenario === scenario.id ? 'ring-2 ring-blue-500' : ''
          }`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getRoleIcon(scenario.role)}
                  <span>{scenario.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(scenario.status)}
                  <span className="text-sm text-muted-foreground">
                    {scenario.concurrent_users} concurrent users
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{scenario.description}</p>
              
              {/* Progress Bar */}
              {scenario.status === 'running' && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{scenario.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${scenario.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {/* Test Results */}
              {scenario.results && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      {scenario.results.success_rate.toFixed(1)}%
                    </div>
                    <div className="text-xs text-green-700">Success Rate</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      {Math.round(scenario.results.avg_response_time)}ms
                    </div>
                    <div className="text-xs text-blue-700">Avg Response</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-lg font-bold text-red-600">
                      {scenario.results.errors}
                    </div>
                    <div className="text-xs text-red-700">Errors</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">
                      {Math.round(scenario.results.peak_load)}
                    </div>
                    <div className="text-xs text-purple-700">Peak Load</div>
                  </div>
                </div>
              )}
              
              {/* Actions List */}
              <div>
                <h4 className="font-medium mb-2">Test Actions:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {scenario.actions.map((action, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                      {action}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}