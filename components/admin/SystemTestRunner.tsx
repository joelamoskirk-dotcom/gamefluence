'use client';

import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, AlertTriangle, Clock, Zap, Target, TrendingUp, Users } from 'lucide-react';
import { systemChecker, SystemTest, ImplementationTracker } from '@/lib/system-check';

export default function SystemTestRunner() {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [individualTests, setIndividualTests] = useState<SystemTest[]>([]);
  const [implementations, setImplementations] = useState<any>(null);
  const [systemHealth, setSystemHealth] = useState<any>(null);

  useEffect(() => {
    loadSystemData();
  }, []);

  const loadSystemData = () => {
    const implementationData = systemChecker.getImplementationTracking();
    const healthData = systemChecker.getSystemHealthSummary();
    
    setImplementations(implementationData);
    setSystemHealth(healthData);
  };

  const runSystemCheck = async () => {
    setIsRunning(true);
    setTestResults(null);
    
    try {
      // Show immediate feedback
      alert('🔧 Starting comprehensive system check...\n\nTesting all buttons and implementation tracking.\nThis will take about 10 seconds.');
      
      const results = await systemChecker.runAllSystemTests();
      setTestResults(results);
      
      // Update system data
      loadSystemData();
      
      // Show completion notification
      const successRate = Math.round((results.passedTests / results.totalTests) * 100);
      alert(`✅ System Check Complete!\n\nResults: ${results.passedTests}/${results.totalTests} tests passed (${successRate}%)\nOverall Status: ${results.overallSuccess ? 'HEALTHY' : 'NEEDS ATTENTION'}\n\nImprovements Applied: ${results.improvements.length}\nSystem is ${results.overallSuccess ? 'ready for production' : 'requires optimization'}`);
      
    } catch (error) {
      alert(`❌ System check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const runIndividualTest = async (testId: string) => {
    try {
      const result = await systemChecker.runSystemTest(testId);
      
      // Update individual test results
      setIndividualTests(prev => {
        const updated = [...prev];
        const index = updated.findIndex(t => t.testId === testId);
        if (index >= 0) {
          updated[index] = result;
        } else {
          updated.push(result);
        }
        return updated;
      });
      
      // Show test result
      const status = result.status === 'passed' ? '✅' : '❌';
      const message = result.result?.actualBehavior || 'Test completed';
      alert(`${status} ${result.testName}\n\n${message}\n\nResponse Time: ${result.result?.responseTime || 0}ms\nImprovements: ${result.result?.improvements?.length || 0}`);
      
      loadSystemData();
      
    } catch (error) {
      alert(`Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">System Check & Usability Testing</h2>
        <p className="text-blue-100">Comprehensive testing of all buttons, implementations, and user feedback loops</p>
      </div>

      {/* System Health Overview */}
      {systemHealth && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            System Health Overview
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-3xl font-bold mb-1 ${getHealthColor(systemHealth.overallHealth).split(' ')[0]}`}>
                {systemHealth.overallHealth.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">Overall Health</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-3xl font-bold mb-1 ${getHealthColor(systemHealth.buttonFunctionality).split(' ')[0]}`}>
                {systemHealth.buttonFunctionality.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">Button Functionality</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-3xl font-bold mb-1 ${getHealthColor(systemHealth.userSatisfaction).split(' ')[0]}`}>
                {systemHealth.userSatisfaction.toFixed(1)}/10
              </div>
              <div className="text-sm text-gray-600">User Satisfaction</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-3xl font-bold mb-1 ${getHealthColor(systemHealth.improvementRate).split(' ')[0]}`}>
                {systemHealth.improvementRate.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">Improvement Rate</div>
            </div>
          </div>
          
          {systemHealth.criticalIssues.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
              <h4 className="font-medium text-red-800 mb-2">Critical Issues</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {systemHealth.criticalIssues.map((issue: string, index: number) => (
                  <li key={index}>• {issue}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-800">System Recommendations</h4>
            {systemHealth.recommendations.map((rec: string, index: number) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                {rec}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Test Buttons */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-600" />
          Quick System Tests
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => runIndividualTest('fraud_test_button')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="text-purple-600 mb-2">
              <Target className="w-6 h-6" />
            </div>
            <div className="font-medium">Test Fraud Detection</div>
            <div className="text-sm text-gray-600">Verify fraud engine responsiveness</div>
          </button>

          <button
            onClick={() => runIndividualTest('implement_fix_button')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="text-green-600 mb-2">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="font-medium">Test Implementation</div>
            <div className="text-sm text-gray-600">Verify ticket creation and progress</div>
          </button>

          <button
            onClick={() => runIndividualTest('launch_campaign_button')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="text-blue-600 mb-2">
              <Play className="w-6 h-6" />
            </div>
            <div className="font-medium">Test Campaign Launch</div>
            <div className="text-sm text-gray-600">Verify campaign results and metrics</div>
          </button>

          <button
            onClick={() => runIndividualTest('logo_interaction')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="text-yellow-600 mb-2">
              <Zap className="w-6 h-6" />
            </div>
            <div className="font-medium">Test Logo Animation</div>
            <div className="text-sm text-gray-600">Verify casino-style lighting effects</div>
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={runSystemCheck}
            disabled={isRunning}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
          >
            {isRunning ? (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 animate-spin" />
                Running System Check...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Run Complete System Check
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Test Results */}
      {testResults && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            System Check Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{testResults.passedTests}</div>
              <div className="text-sm text-green-700">Tests Passed</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{testResults.failedTests}</div>
              <div className="text-sm text-red-700">Tests Failed</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{testResults.improvements.length}</div>
              <div className="text-sm text-blue-700">Improvements Applied</div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg mb-4 ${
            testResults.overallSuccess ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <div className={`font-medium ${testResults.overallSuccess ? 'text-green-800' : 'text-yellow-800'}`}>
              Overall Status: {testResults.overallSuccess ? '✅ SYSTEM HEALTHY' : '⚠️ NEEDS ATTENTION'}
            </div>
            <div className={`text-sm mt-1 ${testResults.overallSuccess ? 'text-green-700' : 'text-yellow-700'}`}>
              {Math.round((testResults.passedTests / testResults.totalTests) * 100)}% of tests passed
            </div>
          </div>
          
          {testResults.improvements.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Improvements Applied</h4>
              <div className="space-y-1">
                {testResults.improvements.slice(0, 5).map((improvement: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <Zap className="w-4 h-4 text-blue-500 mt-0.5" />
                    {improvement}
                  </div>
                ))}
                {testResults.improvements.length > 5 && (
                  <div className="text-sm text-gray-500">
                    +{testResults.improvements.length - 5} more improvements applied
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Implementation Tracking */}
      {implementations && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-600" />
            Implementation Tracking
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-xl font-bold text-orange-600">{implementations.totalImplementations}</div>
              <div className="text-sm text-orange-700">Total Implementations</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-600">{implementations.successfulImplementations}</div>
              <div className="text-sm text-green-700">Successful</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">{implementations.avgUserSatisfaction.toFixed(1)}/10</div>
              <div className="text-sm text-blue-700">Avg Satisfaction</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Improvement Trends</h4>
            <div className="space-y-1">
              {implementations.improvementTrends.map((trend: string, index: number) => (
                <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 text-green-500 mt-0.5" />
                  {trend}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Individual Test Results */}
      {individualTests.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Individual Test Results</h3>
          
          <div className="space-y-3">
            {individualTests.map((test) => (
              <div key={test.testId} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{test.testName}</div>
                    <div className="text-sm text-gray-600">{test.component}</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    test.status === 'passed' ? 'bg-green-100 text-green-800' :
                    test.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {test.status}
                  </div>
                </div>
                
                {test.result && (
                  <div className="text-sm text-gray-700">
                    <div className="mb-1">{test.result.actualBehavior}</div>
                    <div className="text-xs text-gray-500">
                      Response time: {test.result.responseTime}ms
                      {test.result.improvements && ` • Improvements: ${test.result.improvements.length}`}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}