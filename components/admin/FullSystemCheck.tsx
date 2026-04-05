'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Clock,
  Database,
  Users,
  DollarSign,
  Target,
  Zap
} from 'lucide-react';

interface SystemTest {
  id: string;
  name: string;
  category: string;
  status: 'pending' | 'running' | 'pass' | 'fail' | 'warning';
  duration?: number;
  details?: string;
}

export default function FullSystemCheck() {
  const [tests, setTests] = useState<SystemTest[]>([
    { id: 'db', name: 'Database Connection', category: 'Core', status: 'pending' },
    { id: 'auth', name: 'Authentication System', category: 'Security', status: 'pending' },
    { id: 'payment', name: 'Payment Processing', category: 'Financial', status: 'pending' },
    { id: 'crm', name: 'CRM Integration', category: 'Business', status: 'pending' },
    { id: 'ai', name: 'AI Matching Engine', category: 'Intelligence', status: 'pending' },
    { id: 'analytics', name: 'Analytics Pipeline', category: 'Data', status: 'pending' },
    { id: 'notifications', name: 'Notification System', category: 'Communication', status: 'pending' },
    { id: 'api', name: 'API Endpoints', category: 'Core', status: 'pending' }
  ]);
  
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<string | null>(null);

  const runSystemCheck = async () => {
    setIsRunning(true);
    
    for (const test of tests) {
      setCurrentTest(test.id);
      setTests(prev => prev.map(t => 
        t.id === test.id ? { ...t, status: 'running' } : t
      ));
      
      // Simulate test execution
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const success = Math.random() > 0.1; // 90% success rate
      setTests(prev => prev.map(t => 
        t.id === test.id ? { 
          ...t, 
          status: success ? 'pass' : 'fail',
          duration: Math.floor(Math.random() * 2000) + 500,
          details: success ? 'All checks passed' : 'Connection timeout'
        } : t
      ));
    }
    
    setIsRunning(false);
    setCurrentTest(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'fail': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'running': return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const passCount = tests.filter(t => t.status === 'pass').length;
  const failCount = tests.filter(t => t.status === 'fail').length;
  const totalTests = tests.length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Full System Check</h1>
        <Button onClick={runSystemCheck} disabled={isRunning}>
          <Play className="h-4 w-4 mr-2" />
          {isRunning ? 'Running Tests...' : 'Run System Check'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{passCount}</div>
                <p className="text-sm text-muted-foreground">Tests Passed</p>
              </div>
            </div>
          </CardContent>
        </Card> 
       <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{failCount}</div>
                <p className="text-sm text-muted-foreground">Tests Failed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{totalTests}</div>
                <p className="text-sm text-muted-foreground">Total Tests</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">
                  {totalTests > 0 ? Math.round((passCount / totalTests) * 100) : 0}%
                </div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>      <
Card>
        <CardHeader>
          <CardTitle>System Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tests.map(test => (
              <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(test.status)}
                  <div>
                    <h4 className="font-medium">{test.name}</h4>
                    <p className="text-sm text-muted-foreground">{test.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  {test.duration && (
                    <div className="text-sm font-medium">{test.duration}ms</div>
                  )}
                  {test.details && (
                    <div className="text-xs text-muted-foreground">{test.details}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}