'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { 
  Plus, 
  Trash2, 
  ArrowDown, 
  ArrowUp, 
  Play, 
  Save,
  MessageSquare,
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  order: number;
  action: 'send_message' | 'create_task' | 'schedule_followup' | 'escalate' | 'wait';
  platform: string;
  template: string;
  delay?: number;
  conditions?: Record<string, any>;
}

interface WorkflowData {
  name: string;
  trigger: 'issue_created' | 'campaign_started' | 'payment_delayed' | 'performance_alert' | 'manual';
  steps: WorkflowStep[];
  targetAudience: {
    creatorTiers?: string[];
    regions?: string[];
    performanceThreshold?: number;
  };
  isActive: boolean;
}

const TRIGGER_OPTIONS = [
  { value: 'issue_created', label: 'Issue Created' },
  { value: 'campaign_started', label: 'Campaign Started' },
  { value: 'payment_delayed', label: 'Payment Delayed' },
  { value: 'performance_alert', label: 'Performance Alert' },
  { value: 'manual', label: 'Manual Trigger' }
];

const ACTION_OPTIONS = [
  { value: 'send_message', label: 'Send Message', icon: MessageSquare },
  { value: 'create_task', label: 'Create Task', icon: CheckCircle },
  { value: 'schedule_followup', label: 'Schedule Followup', icon: Clock },
  { value: 'escalate', label: 'Escalate Issue', icon: AlertTriangle },
  { value: 'wait', label: 'Wait/Delay', icon: Clock }
];

const PLATFORM_OPTIONS = [
  { value: 'email', label: 'Email' },
  { value: 'discord', label: 'Discord' },
  { value: 'slack', label: 'Slack' },
  { value: 'sms', label: 'SMS' },
  { value: 'whatsapp', label: 'WhatsApp' }
];

const MESSAGE_TEMPLATES = [
  { value: 'welcome_email', label: 'Welcome Email' },
  { value: 'onboarding_check', label: 'Onboarding Check-in' },
  { value: 'payment_reminder', label: 'Payment Reminder' },
  { value: 'performance_alert', label: 'Performance Alert' },
  { value: 'campaign_complete', label: 'Campaign Completion' },
  { value: 'custom', label: 'Custom Template' }
];

export default function WorkflowBuilder() {
  const [workflow, setWorkflow] = useState<WorkflowData>({
    name: '',
    trigger: 'manual',
    steps: [],
    targetAudience: {},
    isActive: false
  });

  const [showPreview, setShowPreview] = useState(false);

  const addStep = () => {
    const newStep: WorkflowStep = {
      id: `step_${Date.now()}`,
      order: workflow.steps.length,
      action: 'send_message',
      platform: 'email',
      template: 'welcome_email'
    };
    
    setWorkflow(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
  };

  const updateStep = (stepId: string, updates: Partial<WorkflowStep>) => {
    setWorkflow(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId ? { ...step, ...updates } : step
      )
    }));
  };

  const removeStep = (stepId: string) => {
    setWorkflow(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== stepId)
        .map((step, index) => ({ ...step, order: index }))
    }));
  };

  const moveStep = (stepId: string, direction: 'up' | 'down') => {
    const stepIndex = workflow.steps.findIndex(step => step.id === stepId);
    if (stepIndex === -1) return;
    
    const newIndex = direction === 'up' ? stepIndex - 1 : stepIndex + 1;
    if (newIndex < 0 || newIndex >= workflow.steps.length) return;
    
    const newSteps = [...workflow.steps];
    [newSteps[stepIndex], newSteps[newIndex]] = [newSteps[newIndex], newSteps[stepIndex]];
    
    // Update order numbers
    newSteps.forEach((step, index) => {
      step.order = index;
    });
    
    setWorkflow(prev => ({ ...prev, steps: newSteps }));
  };

  const getActionIcon = (action: string) => {
    const option = ACTION_OPTIONS.find(opt => opt.value === action);
    return option ? option.icon : MessageSquare;
  };

  const saveWorkflow = () => {
    // In a real implementation, this would save to the backend
    console.log('Saving workflow:', workflow);
    alert('Workflow saved successfully!');
  };

  const testWorkflow = () => {
    // In a real implementation, this would trigger a test execution
    console.log('Testing workflow:', workflow);
    alert('Workflow test initiated!');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Workflow Builder</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button variant="outline" onClick={testWorkflow}>
            <Play className="h-4 w-4 mr-2" />
            Test
          </Button>
          <Button onClick={saveWorkflow}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {showPreview ? (
        <WorkflowPreview workflow={workflow} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workflow Configuration */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Workflow Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Workflow Name</label>
                  <input
                    type="text"
                    value={workflow.name}
                    onChange={(e) => setWorkflow(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter workflow name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Trigger Event</label>
                  <select
                    value={workflow.trigger}
                    onChange={(e) => setWorkflow(prev => ({ ...prev, trigger: e.target.value as any }))}
                    className="w-full p-2 border rounded-md"
                  >
                    {TRIGGER_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={workflow.isActive}
                    onChange={(e) => setWorkflow(prev => ({ ...prev, isActive: e.target.checked }))}
                  />
                  <label htmlFor="isActive" className="text-sm font-medium">
                    Active Workflow
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Target Audience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Creator Tiers</label>
                  <div className="space-y-2">
                    {['bronze', 'silver', 'gold', 'platinum'].map(tier => (
                      <div key={tier} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={tier}
                          checked={workflow.targetAudience.creatorTiers?.includes(tier) || false}
                          onChange={(e) => {
                            const tiers = workflow.targetAudience.creatorTiers || [];
                            const newTiers = e.target.checked
                              ? [...tiers, tier]
                              : tiers.filter(t => t !== tier);
                            setWorkflow(prev => ({
                              ...prev,
                              targetAudience: { ...prev.targetAudience, creatorTiers: newTiers }
                            }));
                          }}
                        />
                        <label htmlFor={tier} className="text-sm capitalize">{tier}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Performance Threshold</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={workflow.targetAudience.performanceThreshold || ''}
                    onChange={(e) => setWorkflow(prev => ({
                      ...prev,
                      targetAudience: { 
                        ...prev.targetAudience, 
                        performanceThreshold: e.target.value ? parseInt(e.target.value) : undefined 
                      }
                    }))}
                    className="w-full p-2 border rounded-md"
                    placeholder="Minimum score (0-100)"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Workflow Steps */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Workflow Steps</CardTitle>
                <Button onClick={addStep} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              </CardHeader>
              <CardContent>
                {workflow.steps.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No steps added yet. Click &quot;Add Step&quot; to get started.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {workflow.steps.map((step, index) => {
                      const ActionIcon = getActionIcon(step.action);
                      
                      return (
                        <div key={step.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                                <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                              </div>
                              <ActionIcon className="h-5 w-5 text-muted-foreground" />
                              <span className="font-medium">
                                {ACTION_OPTIONS.find(opt => opt.value === step.action)?.label}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => moveStep(step.id, 'up')}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => moveStep(step.id, 'down')}
                                disabled={index === workflow.steps.length - 1}
                              >
                                <ArrowDown className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeStep(step.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Action Type</label>
                              <select
                                value={step.action}
                                onChange={(e) => updateStep(step.id, { action: e.target.value as any })}
                                className="w-full p-2 border rounded-md text-sm"
                              >
                                {ACTION_OPTIONS.map(option => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {step.action === 'send_message' && (
                              <div>
                                <label className="block text-sm font-medium mb-1">Platform</label>
                                <select
                                  value={step.platform}
                                  onChange={(e) => updateStep(step.id, { platform: e.target.value })}
                                  className="w-full p-2 border rounded-md text-sm"
                                >
                                  {PLATFORM_OPTIONS.map(option => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}

                            <div>
                              <label className="block text-sm font-medium mb-1">Template</label>
                              <select
                                value={step.template}
                                onChange={(e) => updateStep(step.id, { template: e.target.value })}
                                className="w-full p-2 border rounded-md text-sm"
                              >
                                {MESSAGE_TEMPLATES.map(option => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {(step.action === 'wait' || step.action === 'schedule_followup') && (
                              <div>
                                <label className="block text-sm font-medium mb-1">Delay (minutes)</label>
                                <input
                                  type="number"
                                  min="0"
                                  value={step.delay || ''}
                                  onChange={(e) => updateStep(step.id, { 
                                    delay: e.target.value ? parseInt(e.target.value) : undefined 
                                  })}
                                  className="w-full p-2 border rounded-md text-sm"
                                  placeholder="Enter delay in minutes"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

function WorkflowPreview({ workflow }: { workflow: WorkflowData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflow Preview: {workflow.name || 'Untitled Workflow'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Workflow Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-muted-foreground">Trigger</span>
              <p className="font-medium">
                {TRIGGER_OPTIONS.find(opt => opt.value === workflow.trigger)?.label}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Status</span>
              <p className={`font-medium ${workflow.isActive ? 'text-green-600' : 'text-gray-600'}`}>
                {workflow.isActive ? 'Active' : 'Inactive'}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Steps</span>
              <p className="font-medium">{workflow.steps.length}</p>
            </div>
          </div>

          {/* Workflow Flow */}
          <div className="space-y-4">
            <h3 className="font-medium">Execution Flow</h3>
            {workflow.steps.length === 0 ? (
              <p className="text-muted-foreground">No steps configured</p>
            ) : (
              <div className="space-y-3">
                {workflow.steps.map((step, index) => {
                  const ActionIcon = getActionIcon(step.action);
                  
                  return (
                    <div key={step.id} className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                        <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                      </div>
                      <ActionIcon className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">
                          {ACTION_OPTIONS.find(opt => opt.value === step.action)?.label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {step.action === 'send_message' && `via ${step.platform} • `}
                          Template: {step.template}
                          {step.delay && ` • Delay: ${step.delay}m`}
                        </p>
                      </div>
                      {index < workflow.steps.length - 1 && (
                        <ArrowDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Target Audience */}
          {(workflow.targetAudience.creatorTiers?.length || workflow.targetAudience.performanceThreshold) && (
            <div className="space-y-2">
              <h3 className="font-medium">Target Audience</h3>
              <div className="text-sm text-muted-foreground">
                {workflow.targetAudience.creatorTiers?.length && (
                  <p>Creator Tiers: {workflow.targetAudience.creatorTiers.join(', ')}</p>
                )}
                {workflow.targetAudience.performanceThreshold && (
                  <p>Performance Threshold: {workflow.targetAudience.performanceThreshold}+</p>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function getActionIcon(action: string) {
  const option = ACTION_OPTIONS.find(opt => opt.value === action);
  return option ? option.icon : MessageSquare;
}