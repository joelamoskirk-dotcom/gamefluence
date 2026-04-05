// Automated Workflows - No n8n required, built-in automation engine
// Handles creator onboarding, campaign management, and performance optimization

export interface WorkflowTrigger {
  id: string;
  name: string;
  type: 'schedule' | 'event' | 'webhook' | 'condition';
  config: {
    schedule?: string; // Cron expression
    event?: string; // Event name
    webhook?: string; // Webhook URL
    condition?: string; // Condition expression
  };
  enabled: boolean;
}

export interface WorkflowAction {
  id: string;
  type: 'api_call' | 'email' | 'slack' | 'database' | 'calculation' | 'condition' | 'delay';
  config: any;
  nextActions?: string[];
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: WorkflowTrigger;
  actions: WorkflowAction[];
  enabled: boolean;
  lastRun?: Date;
  runCount: number;
  successCount: number;
  errorCount: number;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  startTime: Date;
  endTime?: Date;
  status: 'running' | 'completed' | 'failed';
  logs: Array<{
    timestamp: Date;
    level: 'info' | 'warning' | 'error';
    message: string;
    actionId?: string;
  }>;
  results: Map<string, any>;
}

export class AutomatedWorkflowEngine {
  private workflows: Map<string, Workflow> = new Map();
  private executions: Map<string, WorkflowExecution> = new Map();
  private scheduledJobs: Map<string, NodeJS.Timeout> = new Map();
  private eventListeners: Map<string, Function[]> = new Map();

  constructor() {
    this.initializeDefaultWorkflows();
    this.startScheduler();
  }

  // Initialize default workflows for common tasks
  private initializeDefaultWorkflows(): void {
    // 1. Creator Performance Monitoring
    this.createWorkflow({
      id: 'creator_performance_monitor',
      name: 'Creator Performance Monitor',
      description: 'Monitor creator performance and send alerts for underperforming campaigns',
      trigger: {
        id: 'perf_schedule',
        name: 'Every Hour',
        type: 'schedule',
        config: { schedule: '0 * * * *' }, // Every hour
        enabled: true
      },
      actions: [
        {
          id: 'check_performance',
          type: 'calculation',
          config: {
            operation: 'check_creator_roi',
            threshold: 100 // ROI below 100%
          },
          nextActions: ['send_alert']
        },
        {
          id: 'send_alert',
          type: 'email',
          config: {
            to: 'founder@gamefluence.ai',
            subject: 'Creator Performance Alert',
            template: 'low_performance_alert'
          }
        }
      ],
      enabled: true,
      runCount: 0,
      successCount: 0,
      errorCount: 0
    });

    // 2. Automated Creator Onboarding
    this.createWorkflow({
      id: 'creator_onboarding',
      name: 'Creator Onboarding Automation',
      description: 'Automatically onboard new creators and set up their profiles',
      trigger: {
        id: 'new_creator_event',
        name: 'New Creator Registration',
        type: 'event',
        config: { event: 'creator_registered' },
        enabled: true
      },
      actions: [
        {
          id: 'validate_creator',
          type: 'api_call',
          config: {
            url: '/api/creators/validate',
            method: 'POST',
            data: '{{creator_data}}'
          },
          nextActions: ['create_profile']
        },
        {
          id: 'create_profile',
          type: 'database',
          config: {
            operation: 'insert',
            table: 'creators',
            data: '{{validated_creator}}'
          },
          nextActions: ['send_welcome']
        },
        {
          id: 'send_welcome',
          type: 'email',
          config: {
            to: '{{creator_email}}',
            subject: 'Welcome to Gamefluence!',
            template: 'creator_welcome'
          }
        }
      ],
      enabled: true,
      runCount: 0,
      successCount: 0,
      errorCount: 0
    });

    // 3. Campaign Optimization
    this.createWorkflow({
      id: 'campaign_optimization',
      name: 'Campaign Performance Optimization',
      description: 'Automatically optimize campaign budgets based on performance',
      trigger: {
        id: 'daily_optimization',
        name: 'Daily at 9 AM',
        type: 'schedule',
        config: { schedule: '0 9 * * *' }, // Daily at 9 AM
        enabled: true
      },
      actions: [
        {
          id: 'analyze_campaigns',
          type: 'calculation',
          config: {
            operation: 'analyze_campaign_performance',
            lookback_days: 7
          },
          nextActions: ['optimize_budgets']
        },
        {
          id: 'optimize_budgets',
          type: 'calculation',
          config: {
            operation: 'optimize_campaign_budgets',
            strategy: 'roi_based'
          },
          nextActions: ['update_campaigns', 'notify_team']
        },
        {
          id: 'update_campaigns',
          type: 'api_call',
          config: {
            url: '/api/campaigns/bulk-update',
            method: 'PUT',
            data: '{{optimized_budgets}}'
          }
        },
        {
          id: 'notify_team',
          type: 'slack',
          config: {
            channel: '#campaign-updates',
            message: 'Campaign budgets optimized. {{optimization_summary}}'
          }
        }
      ],
      enabled: true,
      runCount: 0,
      successCount: 0,
      errorCount: 0
    });

    // 4. Fraud Detection Response
    this.createWorkflow({
      id: 'fraud_response',
      name: 'Automated Fraud Response',
      description: 'Automatically respond to fraud detection events',
      trigger: {
        id: 'fraud_detected',
        name: 'Fraud Event Detected',
        type: 'event',
        config: { event: 'fraud_detected' },
        enabled: true
      },
      actions: [
        {
          id: 'assess_fraud',
          type: 'calculation',
          config: {
            operation: 'assess_fraud_severity',
            confidence_threshold: 80
          },
          nextActions: ['block_traffic', 'log_incident']
        },
        {
          id: 'block_traffic',
          type: 'api_call',
          config: {
            url: '/api/fraud/block',
            method: 'POST',
            data: '{{fraud_event}}'
          },
          nextActions: ['notify_security']
        },
        {
          id: 'log_incident',
          type: 'database',
          config: {
            operation: 'insert',
            table: 'fraud_incidents',
            data: '{{fraud_details}}'
          }
        },
        {
          id: 'notify_security',
          type: 'email',
          config: {
            to: 'security@gamefluence.ai',
            subject: 'Fraud Alert - Immediate Action Required',
            template: 'fraud_alert'
          }
        }
      ],
      enabled: true,
      runCount: 0,
      successCount: 0,
      errorCount: 0
    });

    // 5. Creator Payment Processing
    this.createWorkflow({
      id: 'creator_payments',
      name: 'Automated Creator Payments',
      description: 'Process creator payments based on campaign completion',
      trigger: {
        id: 'campaign_completed',
        name: 'Campaign Completion',
        type: 'event',
        config: { event: 'campaign_completed' },
        enabled: true
      },
      actions: [
        {
          id: 'calculate_payments',
          type: 'calculation',
          config: {
            operation: 'calculate_creator_payments',
            include_bonuses: true
          },
          nextActions: ['validate_payments']
        },
        {
          id: 'validate_payments',
          type: 'condition',
          config: {
            condition: '{{total_amount}} < 10000', // Under $10k auto-approve
            true_actions: ['process_payments'],
            false_actions: ['require_approval']
          }
        },
        {
          id: 'process_payments',
          type: 'api_call',
          config: {
            url: '/api/payments/process',
            method: 'POST',
            data: '{{payment_details}}'
          },
          nextActions: ['notify_creators']
        },
        {
          id: 'require_approval',
          type: 'email',
          config: {
            to: 'finance@gamefluence.ai',
            subject: 'Payment Approval Required',
            template: 'payment_approval'
          }
        },
        {
          id: 'notify_creators',
          type: 'email',
          config: {
            to: '{{creator_emails}}',
            subject: 'Payment Processed',
            template: 'payment_confirmation'
          }
        }
      ],
      enabled: true,
      runCount: 0,
      successCount: 0,
      errorCount: 0
    });
  }

  // Create a new workflow
  createWorkflow(workflow: Workflow): string {
    this.workflows.set(workflow.id, workflow);
    
    // Set up trigger
    this.setupTrigger(workflow);
    
    return workflow.id;
  }

  // Set up workflow trigger
  private setupTrigger(workflow: Workflow): void {
    const { trigger } = workflow;
    
    switch (trigger.type) {
      case 'schedule':
        if (trigger.config.schedule) {
          this.scheduleWorkflow(workflow.id, trigger.config.schedule);
        }
        break;
        
      case 'event':
        if (trigger.config.event) {
          this.addEventListener(trigger.config.event, () => this.executeWorkflow(workflow.id));
        }
        break;
        
      case 'webhook':
        // Webhook setup would be handled by the web server
        break;
        
      case 'condition':
        // Condition-based triggers would be checked periodically
        break;
    }
  }

  // Schedule workflow execution
  private scheduleWorkflow(workflowId: string, cronExpression: string): void {
    // Simple cron parser for basic expressions
    const interval = this.parseCronExpression(cronExpression);
    
    if (interval > 0) {
      const job = setInterval(() => {
        this.executeWorkflow(workflowId);
      }, interval);
      
      this.scheduledJobs.set(workflowId, job);
    }
  }

  // Simple cron expression parser
  private parseCronExpression(cron: string): number {
    // Basic cron patterns
    const patterns = {
      '0 * * * *': 60 * 60 * 1000, // Every hour
      '0 9 * * *': 24 * 60 * 60 * 1000, // Daily at 9 AM
      '0 0 * * 0': 7 * 24 * 60 * 60 * 1000, // Weekly
      '*/15 * * * *': 15 * 60 * 1000, // Every 15 minutes
      '*/5 * * * *': 5 * 60 * 1000, // Every 5 minutes
    };
    
    return patterns[cron as keyof typeof patterns] || 0;
  }

  // Add event listener
  private addEventListener(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  // Trigger event
  triggerEvent(event: string, data?: any): void {
    const listeners = this.eventListeners.get(event) || [];
    listeners.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event listener for ${event}:`, error);
      }
    });
  }

  // Execute workflow
  async executeWorkflow(workflowId: string, inputData?: any): Promise<WorkflowExecution> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow || !workflow.enabled) {
      throw new Error(`Workflow ${workflowId} not found or disabled`);
    }

    const executionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const execution: WorkflowExecution = {
      id: executionId,
      workflowId,
      startTime: new Date(),
      status: 'running',
      logs: [],
      results: new Map()
    };

    this.executions.set(executionId, execution);
    workflow.runCount++;

    try {
      execution.logs.push({
        timestamp: new Date(),
        level: 'info',
        message: `Starting workflow execution: ${workflow.name}`
      });

      // Execute actions sequentially
      let currentData = inputData || {};
      
      for (const action of workflow.actions) {
        const result = await this.executeAction(action, currentData, execution);
        execution.results.set(action.id, result);
        currentData = { ...currentData, [action.id]: result };
      }

      execution.status = 'completed';
      execution.endTime = new Date();
      workflow.successCount++;
      workflow.lastRun = new Date();

      execution.logs.push({
        timestamp: new Date(),
        level: 'info',
        message: 'Workflow execution completed successfully'
      });

    } catch (error) {
      execution.status = 'failed';
      execution.endTime = new Date();
      workflow.errorCount++;

      execution.logs.push({
        timestamp: new Date(),
        level: 'error',
        message: `Workflow execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      });

      throw error;
    }

    return execution;
  }

  // Execute individual action
  private async executeAction(action: WorkflowAction, data: any, execution: WorkflowExecution): Promise<any> {
    execution.logs.push({
      timestamp: new Date(),
      level: 'info',
      message: `Executing action: ${action.id} (${action.type})`,
      actionId: action.id
    });

    switch (action.type) {
      case 'api_call':
        return this.executeAPICall(action, data);
        
      case 'email':
        return this.sendEmail(action, data);
        
      case 'slack':
        return this.sendSlackMessage(action, data);
        
      case 'database':
        return this.executeDatabaseOperation(action, data);
        
      case 'calculation':
        return this.executeCalculation(action, data);
        
      case 'condition':
        return this.evaluateCondition(action, data);
        
      case 'delay':
        return this.executeDelay(action);
        
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  // Execute API call
  private async executeAPICall(action: WorkflowAction, data: any): Promise<any> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      status: 200,
      data: { message: 'API call executed successfully', input: data }
    };
  }

  // Send email
  private async sendEmail(action: WorkflowAction, data: any): Promise<any> {
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      success: true,
      messageId: `msg_${Date.now()}`,
      to: action.config.to,
      subject: action.config.subject
    };
  }

  // Send Slack message
  private async sendSlackMessage(action: WorkflowAction, data: any): Promise<any> {
    // Simulate Slack message
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      success: true,
      channel: action.config.channel,
      timestamp: Date.now()
    };
  }

  // Execute database operation
  private async executeDatabaseOperation(action: WorkflowAction, data: any): Promise<any> {
    // Simulate database operation
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      success: true,
      operation: action.config.operation,
      rowsAffected: 1
    };
  }

  // Execute calculation
  private async executeCalculation(action: WorkflowAction, data: any): Promise<any> {
    const { operation } = action.config;
    
    switch (operation) {
      case 'check_creator_roi':
        return {
          underperforming_creators: [
            { id: 'creator_001', roi: 85, threshold: 100 },
            { id: 'creator_004', roi: 92, threshold: 100 }
          ]
        };
        
      case 'analyze_campaign_performance':
        return {
          total_campaigns: 5,
          avg_roi: 245,
          top_performer: 'creator_002',
          optimization_opportunities: 3
        };
        
      case 'optimize_campaign_budgets':
        return {
          budget_changes: [
            { campaign_id: 'campaign_001', old_budget: 50000, new_budget: 65000, reason: 'High ROI' },
            { campaign_id: 'campaign_002', old_budget: 25000, new_budget: 20000, reason: 'Low performance' }
          ]
        };
        
      default:
        return { result: 'Calculation completed', operation };
    }
  }

  // Evaluate condition
  private async evaluateCondition(action: WorkflowAction, data: any): Promise<any> {
    // Simple condition evaluation
    const condition = action.config.condition;
    const result = Math.random() > 0.5; // Simulate condition result
    
    return {
      condition,
      result,
      next_actions: result ? action.config.true_actions : action.config.false_actions
    };
  }

  // Execute delay
  private async executeDelay(action: WorkflowAction): Promise<any> {
    const delay = action.config.delay || 1000;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return { delayed: delay };
  }

  // Get all workflows
  getWorkflows(): Workflow[] {
    return Array.from(this.workflows.values());
  }

  // Get workflow executions
  getExecutions(workflowId?: string): WorkflowExecution[] {
    const executions = Array.from(this.executions.values());
    return workflowId ? executions.filter(e => e.workflowId === workflowId) : executions;
  }

  // Start scheduler
  private startScheduler(): void {
    // Check for condition-based triggers every minute
    setInterval(() => {
      this.checkConditionTriggers();
    }, 60000);
  }

  // Check condition-based triggers
  private checkConditionTriggers(): void {
    this.workflows.forEach(workflow => {
      if (workflow.trigger.type === 'condition' && workflow.enabled) {
        // Evaluate condition and trigger if met
        const shouldTrigger = Math.random() > 0.9; // 10% chance for demo
        if (shouldTrigger) {
          this.executeWorkflow(workflow.id);
        }
      }
    });
  }

  // Manual workflow execution
  async runWorkflow(workflowId: string, inputData?: any): Promise<WorkflowExecution> {
    return this.executeWorkflow(workflowId, inputData);
  }

  // Enable/disable workflow
  toggleWorkflow(workflowId: string, enabled: boolean): void {
    const workflow = this.workflows.get(workflowId);
    if (workflow) {
      workflow.enabled = enabled;
      
      if (!enabled && this.scheduledJobs.has(workflowId)) {
        clearInterval(this.scheduledJobs.get(workflowId)!);
        this.scheduledJobs.delete(workflowId);
      } else if (enabled) {
        this.setupTrigger(workflow);
      }
    }
  }
}

// Export singleton instance
export const automatedWorkflows = new AutomatedWorkflowEngine();