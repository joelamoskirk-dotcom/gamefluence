// Internal CRM System - Creator Relationship Management
// Multi-platform messaging and collaboration tools
// Enhanced with Beta Access Request Management

export interface BetaAccessRequest {
  id: string;
  requestId: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  gameTitle?: string;
  marketFocus: string[];
  campaignBudget: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  useCase: string;
  requestedAt: Date;
  status: 'pending' | 'approved' | 'rejected' | 'in_review';
  approvalCode?: string;
  
  // Enhanced tracking
  ipAddress: string;
  userAgent: string;
  geolocation: {
    country: string;
    region: string;
    city: string;
    timezone: string;
    coordinates?: { lat: number; lng: number };
  };
  
  // Google Authentication
  googleAuth?: {
    userId: string;
    email: string;
    name: string;
    picture?: string;
    domain?: string;
    verified: boolean;
  };
  
  // Risk Assessment
  riskScore: number; // 0-100
  riskFactors: string[];
  estimatedValue: number;
  
  // Company Intelligence
  companyIntel: {
    type: 'gaming_studio' | 'brand' | 'agency' | 'creator' | 'unknown';
    size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
    knownGames?: string[];
    previousCampaigns?: string[];
    industryReputation: number; // 0-100
  };
  
  // Ticket Integration
  ticketId?: string;
  assignedTo?: string;
  internalNotes: string[];
  
  // Follow-up tracking
  followUpScheduled?: Date;
  lastContactAt?: Date;
  responseTime?: number; // minutes
}

export interface CreatorRelationship {
  creatorId: string;
  relationshipManager: string;
  status: 'prospecting' | 'onboarding' | 'active' | 'inactive' | 'churned';
  
  // Relationship health
  healthScore: number; // 0-100
  satisfactionScore: number; // 1-5
  engagementLevel: 'high' | 'medium' | 'low';
  
  // Communication preferences
  preferredChannels: ('email' | 'discord' | 'slack' | 'sms' | 'whatsapp')[];
  timezone: string;
  availableHours: string[];
  
  // Performance tracking
  totalCampaigns: number;
  totalRevenue: number;
  avgCampaignRating: number;
  lastCampaignDate?: Date;
  
  // Issues and support
  openIssues: number;
  resolvedIssues: number;
  avgResolutionTime: number; // hours
}

export interface PlatformConnector {
  platform: 'discord' | 'slack' | 'email' | 'sms' | 'whatsapp' | 'telegram';
  enabled: boolean;
  
  // Connection details
  apiKey?: string;
  webhookUrl?: string;
  botToken?: string;
  
  // Messaging capabilities
  canSendMessages: boolean;
  canReceiveMessages: boolean;
  supportsRichMedia: boolean;
  supportsGroupChats: boolean;
  
  // Rate limits
  messagesPerMinute: number;
  dailyLimit: number;
  
  // Status
  connectionStatus: 'connected' | 'disconnected' | 'error';
  lastHealthCheck: Date;
}

export interface CommunicationWorkflow {
  id: string;
  name: string;
  trigger: 'issue_created' | 'campaign_started' | 'payment_delayed' | 'performance_alert' | 'manual';
  
  // Workflow steps
  steps: {
    order: number;
    action: 'send_message' | 'create_task' | 'schedule_followup' | 'escalate' | 'wait';
    platform: string;
    template: string;
    delay?: number; // minutes
    conditions?: Record<string, any>;
  }[];
  
  // Targeting
  targetAudience: {
    creatorTiers?: string[];
    regions?: string[];
    performanceThreshold?: number;
    customFilters?: Record<string, any>;
  };
  
  // Analytics
  executionCount: number;
  successRate: number;
  avgResponseTime: number;
  
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class CommunicationWorkflowManager {
  private workflows: Map<string, CommunicationWorkflow> = new Map();
  private executionQueue: Array<{
    workflowId: string;
    stepIndex: number;
    targetId: string;
    scheduledAt: Date;
    context: Record<string, any>;
  }> = [];

  // Workflow Management
  createWorkflow(workflow: Omit<CommunicationWorkflow, 'id' | 'executionCount' | 'successRate' | 'avgResponseTime' | 'createdAt' | 'updatedAt'>): string {
    const id = `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newWorkflow: CommunicationWorkflow = {
      ...workflow,
      id,
      executionCount: 0,
      successRate: 0,
      avgResponseTime: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.workflows.set(id, newWorkflow);
    return id;
  }

  updateWorkflow(id: string, updates: Partial<CommunicationWorkflow>): boolean {
    const workflow = this.workflows.get(id);
    if (!workflow) return false;
    
    const updated = { ...workflow, ...updates, updatedAt: new Date() };
    this.workflows.set(id, updated);
    return true;
  }

  deleteWorkflow(id: string): boolean {
    return this.workflows.delete(id);
  }

  getWorkflow(id: string): CommunicationWorkflow | undefined {
    return this.workflows.get(id);
  }

  listWorkflows(filters?: { trigger?: string; isActive?: boolean }): CommunicationWorkflow[] {
    let workflows = Array.from(this.workflows.values());
    
    if (filters?.trigger) {
      workflows = workflows.filter(w => w.trigger === filters.trigger);
    }
    
    if (filters?.isActive !== undefined) {
      workflows = workflows.filter(w => w.isActive === filters.isActive);
    }
    
    return workflows.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  // Workflow Execution
  async triggerWorkflow(
    trigger: CommunicationWorkflow['trigger'],
    context: Record<string, any>
  ): Promise<string[]> {
    const triggeredWorkflows = Array.from(this.workflows.values())
      .filter(w => w.isActive && w.trigger === trigger);
    
    const executionIds: string[] = [];
    
    for (const workflow of triggeredWorkflows) {
      if (this.matchesTargetAudience(workflow.targetAudience, context)) {
        const executionId = await this.executeWorkflow(workflow.id, context);
        if (executionId) executionIds.push(executionId);
      }
    }
    
    return executionIds;
  }

  private async executeWorkflow(workflowId: string, context: Record<string, any>): Promise<string | null> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return null;
    
    const executionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();
    
    try {
      // Queue first step
      this.executionQueue.push({
        workflowId,
        stepIndex: 0,
        targetId: context.targetId || context.creatorId || context.brandId,
        scheduledAt: new Date(),
        context: { ...context, executionId }
      });
      
      // Process queue
      await this.processExecutionQueue();
      
      // Update workflow analytics
      workflow.executionCount++;
      const executionTime = Date.now() - startTime;
      workflow.avgResponseTime = (workflow.avgResponseTime + executionTime) / 2;
      workflow.updatedAt = new Date();
      
      return executionId;
    } catch (error) {
      console.error('Workflow execution failed:', error);
      return null;
    }
  }

  private async processExecutionQueue(): Promise<void> {
    const now = new Date();
    const readyItems = this.executionQueue.filter(item => item.scheduledAt <= now);
    
    for (const item of readyItems) {
      await this.executeWorkflowStep(item);
      
      // Remove from queue
      const index = this.executionQueue.indexOf(item);
      if (index > -1) {
        this.executionQueue.splice(index, 1);
      }
    }
  }

  private async executeWorkflowStep(item: {
    workflowId: string;
    stepIndex: number;
    targetId: string;
    scheduledAt: Date;
    context: Record<string, any>;
  }): Promise<void> {
    const workflow = this.workflows.get(item.workflowId);
    if (!workflow || item.stepIndex >= workflow.steps.length) return;
    
    const step = workflow.steps[item.stepIndex];
    
    // Check conditions
    if (step.conditions && !this.evaluateConditions(step.conditions, item.context)) {
      return;
    }
    
    // Execute step action
    switch (step.action) {
      case 'send_message':
        await this.sendMessage(step.platform, step.template, item.targetId, item.context);
        break;
      case 'create_task':
        await this.createTask(step.template, item.targetId, item.context);
        break;
      case 'schedule_followup':
        await this.scheduleFollowup(step.template, item.targetId, item.context, step.delay || 1440);
        break;
      case 'escalate':
        await this.escalateIssue(item.targetId, item.context);
        break;
      case 'wait':
        // Schedule next step with delay
        if (item.stepIndex + 1 < workflow.steps.length) {
          const nextScheduledAt = new Date(Date.now() + (step.delay || 0) * 60000);
          this.executionQueue.push({
            ...item,
            stepIndex: item.stepIndex + 1,
            scheduledAt: nextScheduledAt
          });
        }
        return;
    }
    
    // Schedule next step
    if (item.stepIndex + 1 < workflow.steps.length) {
      const nextStep = workflow.steps[item.stepIndex + 1];
      const nextScheduledAt = new Date(Date.now() + (nextStep.delay || 0) * 60000);
      
      this.executionQueue.push({
        ...item,
        stepIndex: item.stepIndex + 1,
        scheduledAt: nextScheduledAt
      });
    }
  }

  private matchesTargetAudience(
    targetAudience: CommunicationWorkflow['targetAudience'],
    context: Record<string, any>
  ): boolean {
    if (targetAudience.creatorTiers && context.creatorTier) {
      if (!targetAudience.creatorTiers.includes(context.creatorTier)) return false;
    }
    
    if (targetAudience.regions && context.region) {
      if (!targetAudience.regions.includes(context.region)) return false;
    }
    
    if (targetAudience.performanceThreshold && context.performanceScore) {
      if (context.performanceScore < targetAudience.performanceThreshold) return false;
    }
    
    return true;
  }

  private evaluateConditions(conditions: Record<string, any>, context: Record<string, any>): boolean {
    for (const [key, expectedValue] of Object.entries(conditions)) {
      if (context[key] !== expectedValue) return false;
    }
    return true;
  }

  private async sendMessage(platform: string, template: string, targetId: string, context: Record<string, any>): Promise<void> {
    // Implementation would integrate with actual messaging platforms
    console.log(`Sending message via ${platform} to ${targetId}:`, this.processTemplate(template, context));
  }

  private async createTask(template: string, targetId: string, context: Record<string, any>): Promise<void> {
    // Implementation would create actual tasks in task management system
    console.log(`Creating task for ${targetId}:`, this.processTemplate(template, context));
  }

  private async scheduleFollowup(template: string, targetId: string, context: Record<string, any>, delayMinutes: number): Promise<void> {
    const followupTime = new Date(Date.now() + delayMinutes * 60000);
    console.log(`Scheduling followup for ${targetId} at ${followupTime}:`, this.processTemplate(template, context));
  }

  private async escalateIssue(targetId: string, context: Record<string, any>): Promise<void> {
    console.log(`Escalating issue for ${targetId}:`, context);
  }

  private processTemplate(template: string, context: Record<string, any>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return context[key] || match;
    });
  }

  // Analytics
  getWorkflowAnalytics(workflowId: string): {
    executionCount: number;
    successRate: number;
    avgResponseTime: number;
    recentExecutions: Array<{ date: Date; success: boolean; responseTime: number }>;
  } | null {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return null;
    
    return {
      executionCount: workflow.executionCount,
      successRate: workflow.successRate,
      avgResponseTime: workflow.avgResponseTime,
      recentExecutions: [] // Would be populated from execution logs
    };
  }

  getOverallAnalytics(): {
    totalWorkflows: number;
    activeWorkflows: number;
    totalExecutions: number;
    avgSuccessRate: number;
  } {
    const workflows = Array.from(this.workflows.values());
    
    return {
      totalWorkflows: workflows.length,
      activeWorkflows: workflows.filter(w => w.isActive).length,
      totalExecutions: workflows.reduce((sum, w) => sum + w.executionCount, 0),
      avgSuccessRate: workflows.length > 0 
        ? workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length 
        : 0
    };
  }
}

export class InternalCRMSystem {
  private relationships: Map<string, CreatorRelationship> = new Map();
  private connectors: Map<string, PlatformConnector> = new Map();
  private workflowManager: CommunicationWorkflowManager;
  private betaRequests: Map<string, BetaAccessRequest> = new Map();
  
  constructor() {
    this.workflowManager = new CommunicationWorkflowManager();
    this.initializeDefaultConnectors();
    this.initializeBetaWorkflows();
  }

  // Relationship Management
  createRelationship(creatorId: string, managerId: string): CreatorRelationship {
    const relationship: CreatorRelationship = {
      creatorId,
      relationshipManager: managerId,
      status: 'prospecting',
      healthScore: 50,
      satisfactionScore: 3,
      engagementLevel: 'medium',
      preferredChannels: ['email'],
      timezone: 'UTC',
      availableHours: ['09:00-17:00'],
      totalCampaigns: 0,
      totalRevenue: 0,
      avgCampaignRating: 0,
      openIssues: 0,
      resolvedIssues: 0,
      avgResolutionTime: 24
    };
    
    this.relationships.set(creatorId, relationship);
    return relationship;
  }

  updateRelationship(creatorId: string, updates: Partial<CreatorRelationship>): boolean {
    const relationship = this.relationships.get(creatorId);
    if (!relationship) return false;
    
    const updated = { ...relationship, ...updates };
    this.relationships.set(creatorId, updated);
    
    // Trigger workflows based on status changes
    if (updates.status && updates.status !== relationship.status) {
      this.workflowManager.triggerWorkflow('campaign_started', {
        creatorId,
        status: updates.status,
        previousStatus: relationship.status
      });
    }
    
    return true;
  }

  getRelationship(creatorId: string): CreatorRelationship | undefined {
    return this.relationships.get(creatorId);
  }

  getRelationshipsByManager(managerId: string): CreatorRelationship[] {
    return Array.from(this.relationships.values())
      .filter(r => r.relationshipManager === managerId);
  }

  getRelationshipsByStatus(status: CreatorRelationship['status']): CreatorRelationship[] {
    return Array.from(this.relationships.values())
      .filter(r => r.status === status);
  }

  // Health Score Calculation
  calculateHealthScore(creatorId: string): number {
    const relationship = this.relationships.get(creatorId);
    if (!relationship) return 0;
    
    let score = 0;
    
    // Campaign performance (40%)
    if (relationship.totalCampaigns > 0) {
      score += (relationship.avgCampaignRating / 5) * 40;
    } else {
      score += 20; // Neutral for new creators
    }
    
    // Engagement level (30%)
    const engagementScores = { high: 30, medium: 20, low: 10 };
    score += engagementScores[relationship.engagementLevel];
    
    // Issue resolution (20%)
    if (relationship.resolvedIssues > 0) {
      const resolutionRate = relationship.resolvedIssues / (relationship.resolvedIssues + relationship.openIssues);
      score += resolutionRate * 20;
    } else {
      score += 15; // Neutral for no issues
    }
    
    // Satisfaction score (10%)
    score += (relationship.satisfactionScore / 5) * 10;
    
    return Math.round(score);
  }

  // Communication Methods
  async sendMessage(
    creatorId: string,
    message: string,
    platform?: string,
    priority: 'low' | 'medium' | 'high' = 'medium'
  ): Promise<boolean> {
    const relationship = this.relationships.get(creatorId);
    if (!relationship) return false;
    
    const targetPlatform = platform || relationship.preferredChannels[0];
    const connector = this.connectors.get(targetPlatform);
    
    if (!connector || !connector.enabled || !connector.canSendMessages) {
      console.error(`Cannot send message via ${targetPlatform}`);
      return false;
    }
    
    // Check rate limits
    if (!this.checkRateLimit(targetPlatform)) {
      console.warn(`Rate limit exceeded for ${targetPlatform}`);
      return false;
    }
    
    try {
      // Simulate message sending
      console.log(`Sending ${priority} priority message to ${creatorId} via ${targetPlatform}:`, message);
      
      // Log communication
      this.logCommunication(creatorId, targetPlatform, 'outbound', message, priority);
      
      return true;
    } catch (error) {
      console.error('Failed to send message:', error);
      return false;
    }
  }

  async broadcastMessage(
    creatorIds: string[],
    message: string,
    platform?: string
  ): Promise<{ successful: string[]; failed: string[] }> {
    const results = { successful: [] as string[], failed: [] as string[] };
    
    for (const creatorId of creatorIds) {
      const success = await this.sendMessage(creatorId, message, platform);
      if (success) {
        results.successful.push(creatorId);
      } else {
        results.failed.push(creatorId);
      }
    }
    
    return results;
  }

  // Issue Management
  createIssue(creatorId: string, title: string, description: string, priority: 'low' | 'medium' | 'high' | 'critical'): string {
    const issueId = `issue_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Update relationship
    const relationship = this.relationships.get(creatorId);
    if (relationship) {
      relationship.openIssues++;
      this.relationships.set(creatorId, relationship);
    }
    
    // Trigger issue workflow
    this.workflowManager.triggerWorkflow('issue_created', {
      creatorId,
      issueId,
      title,
      description,
      priority
    });
    
    return issueId;
  }

  resolveIssue(creatorId: string, issueId: string, resolutionTime: number): boolean {
    const relationship = this.relationships.get(creatorId);
    if (!relationship || relationship.openIssues === 0) return false;
    
    relationship.openIssues--;
    relationship.resolvedIssues++;
    relationship.avgResolutionTime = (relationship.avgResolutionTime + resolutionTime) / 2;
    
    this.relationships.set(creatorId, relationship);
    
    // Recalculate health score
    relationship.healthScore = this.calculateHealthScore(creatorId);
    
    return true;
  }

  // Platform Connector Management
  private initializeDefaultConnectors(): void {
    const defaultConnectors: PlatformConnector[] = [
      {
        platform: 'email',
        enabled: true,
        canSendMessages: true,
        canReceiveMessages: true,
        supportsRichMedia: true,
        supportsGroupChats: false,
        messagesPerMinute: 10,
        dailyLimit: 1000,
        connectionStatus: 'connected',
        lastHealthCheck: new Date()
      },
      {
        platform: 'discord',
        enabled: false,
        canSendMessages: true,
        canReceiveMessages: true,
        supportsRichMedia: true,
        supportsGroupChats: true,
        messagesPerMinute: 50,
        dailyLimit: 5000,
        connectionStatus: 'disconnected',
        lastHealthCheck: new Date()
      },
      {
        platform: 'slack',
        enabled: false,
        canSendMessages: true,
        canReceiveMessages: true,
        supportsRichMedia: true,
        supportsGroupChats: true,
        messagesPerMinute: 30,
        dailyLimit: 3000,
        connectionStatus: 'disconnected',
        lastHealthCheck: new Date()
      }
    ];
    
    defaultConnectors.forEach(connector => {
      this.connectors.set(connector.platform, connector);
    });
  }

  configureConnector(platform: string, config: Partial<PlatformConnector>): boolean {
    const connector = this.connectors.get(platform);
    if (!connector) return false;
    
    const updated = { ...connector, ...config };
    this.connectors.set(platform, updated);
    
    return true;
  }

  getConnector(platform: string): PlatformConnector | undefined {
    return this.connectors.get(platform);
  }

  listConnectors(): PlatformConnector[] {
    return Array.from(this.connectors.values());
  }

  // Analytics and Reporting
  getRelationshipAnalytics(): {
    totalRelationships: number;
    byStatus: Record<string, number>;
    avgHealthScore: number;
    avgSatisfactionScore: number;
    totalRevenue: number;
  } {
    const relationships = Array.from(this.relationships.values());
    
    const byStatus = relationships.reduce((acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalRelationships: relationships.length,
      byStatus,
      avgHealthScore: relationships.length > 0 
        ? relationships.reduce((sum, r) => sum + r.healthScore, 0) / relationships.length 
        : 0,
      avgSatisfactionScore: relationships.length > 0 
        ? relationships.reduce((sum, r) => sum + r.satisfactionScore, 0) / relationships.length 
        : 0,
      totalRevenue: relationships.reduce((sum, r) => sum + r.totalRevenue, 0)
    };
  }

  getCommunicationAnalytics(): {
    totalMessages: number;
    byPlatform: Record<string, number>;
    responseRate: number;
    avgResponseTime: number;
  } {
    // This would be populated from actual communication logs
    return {
      totalMessages: 0,
      byPlatform: {},
      responseRate: 0,
      avgResponseTime: 0
    };
  }

  // Utility Methods
  private checkRateLimit(platform: string): boolean {
    const connector = this.connectors.get(platform);
    if (!connector) return false;
    
    // Simplified rate limiting - in production would track actual usage
    return true;
  }

  private logCommunication(
    creatorId: string,
    platform: string,
    direction: 'inbound' | 'outbound',
    message: string,
    priority: string
  ): void {
    // In production, this would log to a database or logging service
    console.log(`Communication log: ${direction} ${platform} message to/from ${creatorId} (${priority})`);
  }

  // Beta Access Request Management
  async createBetaRequest(
    requestData: Omit<BetaAccessRequest, 'id' | 'requestId' | 'requestedAt' | 'status' | 'riskScore' | 'riskFactors' | 'companyIntel' | 'internalNotes'>,
    ipAddress: string,
    userAgent: string
  ): Promise<string> {
    const id = `beta_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const requestId = `BETA-${Date.now().toString(36).toUpperCase()}`;
    
    // Get geolocation from IP
    const geolocation = await this.getGeolocationFromIP(ipAddress);
    
    // Assess risk and company intelligence
    const riskAssessment = await this.assessBetaRequestRisk(requestData, geolocation);
    const companyIntel = await this.analyzeCompany(requestData.companyName, requestData.email);
    
    const betaRequest: BetaAccessRequest = {
      ...requestData,
      id,
      requestId,
      requestedAt: new Date(),
      status: 'pending',
      ipAddress,
      userAgent,
      geolocation,
      riskScore: riskAssessment.score,
      riskFactors: riskAssessment.factors,
      estimatedValue: this.calculateEstimatedValue(requestData.campaignBudget, companyIntel.size),
      companyIntel,
      internalNotes: []
    };
    
    this.betaRequests.set(id, betaRequest);
    
    // Create support ticket if needed
    if (riskAssessment.score > 30 || requestData.urgency === 'urgent') {
      betaRequest.ticketId = await this.createSupportTicket(betaRequest);
    }
    
    // Trigger notification workflows
    await this.workflowManager.triggerWorkflow('issue_created', {
      type: 'beta_request',
      requestId: betaRequest.requestId,
      urgency: requestData.urgency,
      companyName: requestData.companyName,
      estimatedValue: betaRequest.estimatedValue,
      riskScore: betaRequest.riskScore,
      region: geolocation.country
    });
    
    return requestId;
  }

  getBetaRequest(requestId: string): BetaAccessRequest | undefined {
    return Array.from(this.betaRequests.values()).find(r => r.requestId === requestId);
  }

  listBetaRequests(filters?: {
    status?: BetaAccessRequest['status'];
    urgency?: BetaAccessRequest['urgency'];
    region?: string;
    companyType?: string;
  }): BetaAccessRequest[] {
    let requests = Array.from(this.betaRequests.values());
    
    if (filters?.status) {
      requests = requests.filter(r => r.status === filters.status);
    }
    
    if (filters?.urgency) {
      requests = requests.filter(r => r.urgency === filters.urgency);
    }
    
    if (filters?.region) {
      requests = requests.filter(r => r.geolocation.country === filters.region);
    }
    
    if (filters?.companyType) {
      requests = requests.filter(r => r.companyIntel.type === filters.companyType);
    }
    
    return requests.sort((a, b) => b.requestedAt.getTime() - a.requestedAt.getTime());
  }

  async approveBetaRequest(requestId: string, approvedBy: string): Promise<string | null> {
    const request = this.getBetaRequest(requestId);
    if (!request || request.status !== 'pending') return null;
    
    const approvalCode = `BETA-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    
    request.status = 'approved';
    request.approvalCode = approvalCode;
    request.assignedTo = approvedBy;
    request.responseTime = Math.floor((Date.now() - request.requestedAt.getTime()) / (1000 * 60));
    request.lastContactAt = new Date();
    
    this.betaRequests.set(request.id, request);
    
    // Send approval email
    await this.sendBetaApprovalEmail(request);
    
    // Update ticket if exists
    if (request.ticketId) {
      await this.updateSupportTicket(request.ticketId, 'resolved', `Beta access approved with code: ${approvalCode}`);
    }
    
    return approvalCode;
  }

  async rejectBetaRequest(requestId: string, reason: string, rejectedBy: string): Promise<boolean> {
    const request = this.getBetaRequest(requestId);
    if (!request || request.status !== 'pending') return false;
    
    request.status = 'rejected';
    request.assignedTo = rejectedBy;
    request.responseTime = Math.floor((Date.now() - request.requestedAt.getTime()) / (1000 * 60));
    request.lastContactAt = new Date();
    request.internalNotes.push(`Rejected by ${rejectedBy}: ${reason}`);
    
    this.betaRequests.set(request.id, request);
    
    // Send rejection email
    await this.sendBetaRejectionEmail(request, reason);
    
    // Update ticket if exists
    if (request.ticketId) {
      await this.updateSupportTicket(request.ticketId, 'resolved', `Beta access rejected: ${reason}`);
    }
    
    return true;
  }

  addBetaRequestNote(requestId: string, note: string, author: string): boolean {
    const request = this.getBetaRequest(requestId);
    if (!request) return false;
    
    const timestampedNote = `[${new Date().toISOString()}] ${author}: ${note}`;
    request.internalNotes.push(timestampedNote);
    this.betaRequests.set(request.id, request);
    
    return true;
  }

  // Helper Methods for Beta Access Management
  private async getGeolocationFromIP(ipAddress: string): Promise<BetaAccessRequest['geolocation']> {
    // In production, this would use a real IP geolocation service like MaxMind or IPinfo
    // For demo purposes, we'll simulate based on common IP patterns
    
    // Mock geolocation data based on IP patterns
    const mockGeoData = {
      '103.': { country: 'Thailand', region: 'Bangkok', city: 'Bangkok', timezone: 'Asia/Bangkok' },
      '27.': { country: 'Thailand', region: 'Chiang Mai', city: 'Chiang Mai', timezone: 'Asia/Bangkok' },
      '14.': { country: 'Vietnam', region: 'Ho Chi Minh City', city: 'Ho Chi Minh City', timezone: 'Asia/Ho_Chi_Minh' },
      '125.': { country: 'Vietnam', region: 'Hanoi', city: 'Hanoi', timezone: 'Asia/Ho_Chi_Minh' },
      '36.': { country: 'Indonesia', region: 'Jakarta', city: 'Jakarta', timezone: 'Asia/Jakarta' },
      '114.': { country: 'Indonesia', region: 'Bali', city: 'Denpasar', timezone: 'Asia/Makassar' },
      '175.': { country: 'Philippines', region: 'Metro Manila', city: 'Manila', timezone: 'Asia/Manila' },
      '49.': { country: 'Philippines', region: 'Cebu', city: 'Cebu City', timezone: 'Asia/Manila' },
      '180.': { country: 'Singapore', region: 'Singapore', city: 'Singapore', timezone: 'Asia/Singapore' },
      '202.': { country: 'Malaysia', region: 'Kuala Lumpur', city: 'Kuala Lumpur', timezone: 'Asia/Kuala_Lumpur' }
    };
    
    const ipPrefix = ipAddress.split('.')[0] + '.';
    const geoData = mockGeoData[ipPrefix as keyof typeof mockGeoData] || {
      country: 'Unknown',
      region: 'Unknown',
      city: 'Unknown',
      timezone: 'UTC'
    };
    
    return {
      ...geoData,
      coordinates: this.getCoordinatesForCity(geoData.city)
    };
  }

  private getCoordinatesForCity(city: string): { lat: number; lng: number } | undefined {
    const cityCoords: Record<string, { lat: number; lng: number }> = {
      'Bangkok': { lat: 13.7563, lng: 100.5018 },
      'Chiang Mai': { lat: 18.7883, lng: 98.9853 },
      'Ho Chi Minh City': { lat: 10.8231, lng: 106.6297 },
      'Hanoi': { lat: 21.0285, lng: 105.8542 },
      'Jakarta': { lat: -6.2088, lng: 106.8456 },
      'Denpasar': { lat: -8.6500, lng: 115.2167 },
      'Manila': { lat: 14.5995, lng: 120.9842 },
      'Cebu City': { lat: 10.3157, lng: 123.8854 },
      'Singapore': { lat: 1.3521, lng: 103.8198 },
      'Kuala Lumpur': { lat: 3.1390, lng: 101.6869 }
    };
    
    return cityCoords[city];
  }

  private async assessBetaRequestRisk(
    requestData: Partial<BetaAccessRequest>,
    geolocation: BetaAccessRequest['geolocation']
  ): Promise<{ score: number; factors: string[] }> {
    let riskScore = 0;
    const riskFactors: string[] = [];
    
    // Email domain analysis
    const emailDomain = requestData.email?.split('@')[1]?.toLowerCase();
    if (emailDomain) {
      const suspiciousDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
      const trustedDomains = ['amanotes.com', 'garena.com', 'truedigital.com', 'sea.com'];
      
      if (suspiciousDomains.includes(emailDomain)) {
        riskScore += 20;
        riskFactors.push('Personal email domain');
      } else if (trustedDomains.includes(emailDomain)) {
        riskScore -= 10;
        riskFactors.push('Trusted company domain');
      }
    }
    
    // Geographic risk assessment
    const highRiskCountries = ['Unknown'];
    const lowRiskCountries = ['Thailand', 'Singapore', 'Vietnam', 'Indonesia', 'Philippines', 'Malaysia'];
    
    if (highRiskCountries.includes(geolocation.country)) {
      riskScore += 30;
      riskFactors.push('High-risk geographic location');
    } else if (lowRiskCountries.includes(geolocation.country)) {
      riskScore -= 5;
      riskFactors.push('Target market location');
    }
    
    // Budget analysis
    if (requestData.campaignBudget?.includes('$250K+')) {
      riskScore -= 15;
      riskFactors.push('High-value opportunity');
    } else if (requestData.campaignBudget?.includes('$10K - $25K')) {
      riskScore += 5;
      riskFactors.push('Lower budget range');
    }
    
    // Company name analysis
    const knownCompanies = ['amanotes', 'garena', 'true digital', 'sea limited', 'supercell'];
    const companyLower = requestData.companyName?.toLowerCase() || '';
    
    if (knownCompanies.some(company => companyLower.includes(company))) {
      riskScore -= 20;
      riskFactors.push('Known gaming company');
    }
    
    // Urgency factor
    if (requestData.urgency === 'urgent') {
      riskScore += 10;
      riskFactors.push('Urgent request - requires verification');
    }
    
    // Ensure score is within bounds
    riskScore = Math.max(0, Math.min(100, riskScore + 25)); // Base risk of 25
    
    return { score: riskScore, factors: riskFactors };
  }

  private async analyzeCompany(
    companyName: string,
    email: string
  ): Promise<BetaAccessRequest['companyIntel']> {
    const emailDomain = email.split('@')[1]?.toLowerCase();
    const companyLower = companyName.toLowerCase();
    
    // Known gaming companies database
    const gamingCompanies: Record<string, Partial<BetaAccessRequest['companyIntel']>> = {
      'amanotes': {
        type: 'gaming_studio',
        size: 'large',
        knownGames: ['Piano Tiles', 'Beat Fever', 'Dancing Road'],
        industryReputation: 85
      },
      'garena': {
        type: 'gaming_studio',
        size: 'enterprise',
        knownGames: ['Free Fire', 'Arena of Valor', 'Call of Duty Mobile'],
        industryReputation: 90
      },
      'true digital': {
        type: 'gaming_studio',
        size: 'large',
        knownGames: ['True Gaming Platform'],
        industryReputation: 75
      },
      'sea limited': {
        type: 'gaming_studio',
        size: 'enterprise',
        knownGames: ['Free Fire', 'Shopee Games'],
        industryReputation: 95
      }
    };
    
    // Check for known companies
    for (const [key, intel] of Object.entries(gamingCompanies)) {
      if (companyLower.includes(key) || emailDomain?.includes(key.replace(' ', ''))) {
        return {
          type: intel.type || 'gaming_studio',
          size: intel.size || 'medium',
          knownGames: intel.knownGames || [],
          previousCampaigns: [],
          industryReputation: intel.industryReputation || 70
        };
      }
    }
    
    // Analyze company type based on name patterns
    let type: BetaAccessRequest['companyIntel']['type'] = 'unknown';
    if (companyLower.includes('studio') || companyLower.includes('games') || companyLower.includes('gaming')) {
      type = 'gaming_studio';
    } else if (companyLower.includes('agency') || companyLower.includes('marketing')) {
      type = 'agency';
    } else if (companyLower.includes('brand') || companyLower.includes('corp')) {
      type = 'brand';
    }
    
    // Estimate company size
    let size: BetaAccessRequest['companyIntel']['size'] = 'medium';
    if (companyLower.includes('startup') || companyLower.includes('indie')) {
      size = 'startup';
    } else if (companyLower.includes('enterprise') || companyLower.includes('corporation')) {
      size = 'enterprise';
    }
    
    return {
      type,
      size,
      knownGames: [],
      previousCampaigns: [],
      industryReputation: 50 // Neutral for unknown companies
    };
  }

  private calculateEstimatedValue(budgetRange: string, companySize: string): number {
    const budgetMultipliers: Record<string, number> = {
      '$10K - $25K': 17500,
      '$25K - $50K': 37500,
      '$50K - $100K': 75000,
      '$100K - $250K': 175000,
      '$250K+': 350000
    };
    
    const sizeMultipliers: Record<string, number> = {
      'startup': 0.7,
      'small': 0.8,
      'medium': 1.0,
      'large': 1.3,
      'enterprise': 1.5
    };
    
    const baseValue = budgetMultipliers[budgetRange] || 50000;
    const sizeMultiplier = sizeMultipliers[companySize] || 1.0;
    
    return Math.round(baseValue * sizeMultiplier);
  }

  private async createSupportTicket(request: BetaAccessRequest): Promise<string> {
    const ticketId = `TICKET-${Date.now().toString(36).toUpperCase()}`;
    
    // In production, this would integrate with your ticketing system (Jira, Zendesk, etc.)
    console.log(`Creating support ticket ${ticketId} for beta request ${request.requestId}`);
    
    return ticketId;
  }

  private async updateSupportTicket(ticketId: string, status: string, note: string): Promise<void> {
    // In production, this would update the actual ticket
    console.log(`Updating ticket ${ticketId}: ${status} - ${note}`);
  }

  private async sendBetaApprovalEmail(request: BetaAccessRequest): Promise<void> {
    // In production, this would send actual email
    console.log(`Sending beta approval email to ${request.email} with code ${request.approvalCode}`);
  }

  private async sendBetaRejectionEmail(request: BetaAccessRequest, reason: string): Promise<void> {
    // In production, this would send actual email
    console.log(`Sending beta rejection email to ${request.email}: ${reason}`);
  }

  private initializeBetaWorkflows(): void {
    // Create default workflows for beta access management
    this.workflowManager.createWorkflow({
      name: 'Beta Request Notification',
      trigger: 'issue_created',
      steps: [
        {
          order: 1,
          action: 'send_message',
          platform: 'email',
          template: 'New beta access request from {{companyName}} ({{urgency}} priority, {{estimatedValue}} value)',
          conditions: { type: 'beta_request' }
        }
      ],
      targetAudience: {
        regions: ['Thailand', 'Vietnam', 'Indonesia', 'Philippines', 'Malaysia', 'Singapore']
      },
      isActive: true
    });
  }

  // Beta Access Analytics
  getBetaRequestAnalytics(): {
    totalRequests: number;
    byStatus: Record<string, number>;
    byRegion: Record<string, number>;
    byCompanyType: Record<string, number>;
    avgResponseTime: number;
    totalEstimatedValue: number;
    approvalRate: number;
  } {
    const requests = Array.from(this.betaRequests.values());
    
    const byStatus = requests.reduce((acc, r) => {
      acc[r.status] = (acc[r.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const byRegion = requests.reduce((acc, r) => {
      acc[r.geolocation.country] = (acc[r.geolocation.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const byCompanyType = requests.reduce((acc, r) => {
      acc[r.companyIntel.type] = (acc[r.companyIntel.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const processedRequests = requests.filter(r => r.responseTime !== undefined);
    const avgResponseTime = processedRequests.length > 0
      ? processedRequests.reduce((sum, r) => sum + (r.responseTime || 0), 0) / processedRequests.length
      : 0;
    
    const approvedRequests = requests.filter(r => r.status === 'approved').length;
    const approvalRate = requests.length > 0 ? (approvedRequests / requests.length) * 100 : 0;
    
    return {
      totalRequests: requests.length,
      byStatus,
      byRegion,
      byCompanyType,
      avgResponseTime,
      totalEstimatedValue: requests.reduce((sum, r) => sum + r.estimatedValue, 0),
      approvalRate
    };
  }

  // Workflow Management (delegated to WorkflowManager)
  getWorkflowManager(): CommunicationWorkflowManager {
    return this.workflowManager;
  }
}

// Export singleton instance
export const crmSystem = new InternalCRMSystem();