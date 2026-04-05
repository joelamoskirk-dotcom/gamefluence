// Advanced Ticketing System with AI-powered routing and resolution
// Handles support tickets, bug reports, feature requests, and escalations

export interface Ticket {
  id: string;
  title: string;
  description: string;
  
  // Classification
  type: 'bug' | 'feature_request' | 'support' | 'billing' | 'technical' | 'general';
  priority: 'low' | 'medium' | 'high' | 'critical' | 'urgent';
  severity: 'minor' | 'moderate' | 'major' | 'critical';
  category: string;
  tags: string[];
  
  // Status tracking
  status: 'open' | 'in_progress' | 'pending_customer' | 'resolved' | 'closed' | 'escalated';
  resolution?: string;
  
  // Assignment
  assignedTo?: string;
  assignedTeam?: string;
  escalatedTo?: string;
  
  // User information
  reporterId: string;
  reporterType: 'creator' | 'brand' | 'admin' | 'system';
  reporterTier?: string;
  
  // Timing
  createdAt: Date;
  updatedAt: Date;
  firstResponseAt?: Date;
  resolvedAt?: Date;
  closedAt?: Date;
  
  // SLA tracking
  slaTarget: Date;
  slaStatus: 'within_sla' | 'approaching_breach' | 'breached';
  
  // AI insights
  aiClassification?: {
    confidence: number;
    suggestedCategory: string;
    suggestedPriority: string;
    similarTickets: string[];
    autoResolutionSuggestion?: string;
  };
  
  // Attachments and context
  attachments: string[];
  context: Record<string, any>;
  
  // Communication history
  comments: TicketComment[];
  
  // Metrics
  customerSatisfactionScore?: number;
  resolutionTime?: number; // minutes
  firstResponseTime?: number; // minutes
}

export interface TicketComment {
  id: string;
  ticketId: string;
  authorId: string;
  authorType: 'customer' | 'agent' | 'system' | 'ai';
  content: string;
  isInternal: boolean;
  timestamp: Date;
  attachments?: string[];
}

export interface TicketTemplate {
  id: string;
  name: string;
  category: string;
  title: string;
  description: string;
  defaultPriority: string;
  defaultAssignee?: string;
  requiredFields: string[];
  customFields: Record<string, any>;
}

export interface SLARule {
  id: string;
  name: string;
  conditions: {
    priority?: string[];
    type?: string[];
    reporterTier?: string[];
    category?: string[];
  };
  targets: {
    firstResponse: number; // minutes
    resolution: number; // minutes
  };
  escalationRules: {
    level: number;
    delay: number; // minutes
    assignTo: string;
    notifyUsers: string[];
  }[];
  isActive: boolean;
}

export class AdvancedTicketingSystem {
  private tickets: Map<string, Ticket> = new Map();
  private templates: Map<string, TicketTemplate> = new Map();
  private slaRules: Map<string, SLARule> = new Map();
  private aiInsights: Map<string, any> = new Map();
  
  constructor() {
    this.initializeDefaultTemplates();
    this.initializeDefaultSLAs();
    this.startSLAMonitoring();
  }

  // Ticket Management
  createTicket(ticketData: Omit<Ticket, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'slaTarget' | 'slaStatus' | 'comments'>): string {
    const id = `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // AI-powered classification
    const aiClassification = this.classifyTicket(ticketData.title, ticketData.description);
    
    // Create temporary ticket for SLA determination
    const tempTicket: Ticket = {
      ...ticketData,
      id: '',
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
      slaTarget: new Date(),
      slaStatus: 'within_sla',
      comments: []
    };
    
    // Determine SLA target
    const slaRule = this.findApplicableSLA(tempTicket);
    const slaTarget = new Date(Date.now() + (slaRule?.targets.resolution || 1440) * 60000);
    
    const ticket: Ticket = {
      ...ticketData,
      id,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
      slaTarget,
      slaStatus: 'within_sla',
      comments: [],
      aiClassification
    };
    
    // Auto-assign based on category and workload
    const assignee = this.autoAssignTicket(ticket);
    if (assignee) {
      ticket.assignedTo = assignee.userId;
      ticket.assignedTeam = assignee.team;
    }
    
    this.tickets.set(id, ticket);
    
    // Trigger notifications
    this.notifyTicketCreated(ticket);
    
    // Check for auto-resolution
    this.checkAutoResolution(ticket);
    
    return id;
  }

  updateTicket(ticketId: string, updates: Partial<Ticket>): boolean {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) return false;
    
    const previousStatus = ticket.status;
    const updated = { ...ticket, ...updates, updatedAt: new Date() };
    
    // Track status changes
    if (updates.status && updates.status !== previousStatus) {
      this.handleStatusChange(updated, previousStatus);
    }
    
    // Update SLA status
    this.updateSLAStatus(updated);
    
    this.tickets.set(ticketId, updated);
    
    // Trigger notifications for significant changes
    if (updates.status || updates.assignedTo || updates.priority) {
      this.notifyTicketUpdated(updated, updates);
    }
    
    return true;
  }

  addComment(ticketId: string, comment: Omit<TicketComment, 'id' | 'ticketId' | 'timestamp'>): string {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) throw new Error('Ticket not found');
    
    const commentId = `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const fullComment: TicketComment = {
      ...comment,
      id: commentId,
      ticketId,
      timestamp: new Date()
    };
    
    ticket.comments.push(fullComment);
    ticket.updatedAt = new Date();
    
    // Track first response time
    if (!ticket.firstResponseAt && comment.authorType === 'agent') {
      ticket.firstResponseAt = new Date();
      ticket.firstResponseTime = Math.floor((ticket.firstResponseAt.getTime() - ticket.createdAt.getTime()) / 60000);
    }
    
    this.tickets.set(ticketId, ticket);
    
    // Notify relevant parties
    this.notifyCommentAdded(ticket, fullComment);
    
    return commentId;
  }

  resolveTicket(ticketId: string, resolution: string, resolverId: string): boolean {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) return false;
    
    const resolvedAt = new Date();
    const resolutionTime = Math.floor((resolvedAt.getTime() - ticket.createdAt.getTime()) / 60000);
    
    this.updateTicket(ticketId, {
      status: 'resolved',
      resolution,
      resolvedAt,
      resolutionTime
    });
    
    // Add resolution comment
    this.addComment(ticketId, {
      authorId: resolverId,
      authorType: 'agent',
      content: `Ticket resolved: ${resolution}`,
      isInternal: false
    });
    
    // Send satisfaction survey
    this.sendSatisfactionSurvey(ticket);
    
    return true;
  }

  escalateTicket(ticketId: string, escalationReason: string, escalatedBy: string): boolean {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) return false;
    
    const slaRule = this.findApplicableSLA(ticket);
    const escalationRule = slaRule?.escalationRules.find(rule => rule.level === 1);
    
    if (escalationRule) {
      this.updateTicket(ticketId, {
        status: 'escalated',
        escalatedTo: escalationRule.assignTo,
        priority: ticket.priority === 'low' ? 'medium' : 
                 ticket.priority === 'medium' ? 'high' : 'critical'
      });
      
      this.addComment(ticketId, {
        authorId: escalatedBy,
        authorType: 'agent',
        content: `Ticket escalated: ${escalationReason}`,
        isInternal: true
      });
      
      // Notify escalation recipients
      this.notifyEscalation(ticket, escalationRule);
      
      return true;
    }
    
    return false;
  }

  // AI-Powered Features
  private classifyTicket(title: string, description: string): Ticket['aiClassification'] {
    const text = `${title} ${description}`.toLowerCase();
    
    // Simple classification logic (in production, would use ML models)
    let suggestedCategory = 'general';
    let suggestedPriority = 'medium';
    let confidence = 0.6;
    
    // Category classification
    if (text.includes('payment') || text.includes('billing') || text.includes('invoice')) {
      suggestedCategory = 'billing';
      confidence = 0.9;
    } else if (text.includes('bug') || text.includes('error') || text.includes('broken')) {
      suggestedCategory = 'technical';
      suggestedPriority = 'high';
      confidence = 0.85;
    } else if (text.includes('feature') || text.includes('enhancement') || text.includes('improvement')) {
      suggestedCategory = 'feature_request';
      suggestedPriority = 'low';
      confidence = 0.8;
    }
    
    // Priority classification
    if (text.includes('urgent') || text.includes('critical') || text.includes('emergency')) {
      suggestedPriority = 'urgent';
      confidence = Math.max(confidence, 0.9);
    } else if (text.includes('asap') || text.includes('important')) {
      suggestedPriority = 'high';
      confidence = Math.max(confidence, 0.8);
    }
    
    // Find similar tickets
    const similarTickets = this.findSimilarTickets(text);
    
    // Auto-resolution suggestion
    let autoResolutionSuggestion;
    if (confidence > 0.8 && similarTickets.length > 0) {
      const resolvedSimilar = similarTickets.filter(t => t.status === 'resolved');
      if (resolvedSimilar.length > 0) {
        autoResolutionSuggestion = resolvedSimilar[0].resolution;
      }
    }
    
    return {
      confidence,
      suggestedCategory,
      suggestedPriority,
      similarTickets: similarTickets.map(t => t.id),
      autoResolutionSuggestion
    };
  }

  private findSimilarTickets(text: string): Ticket[] {
    const tickets = Array.from(this.tickets.values());
    const words = text.split(/\s+/).filter(word => word.length > 3);
    
    return tickets
      .map(ticket => {
        const ticketText = `${ticket.title} ${ticket.description}`.toLowerCase();
        const matchCount = words.filter(word => ticketText.includes(word)).length;
        const similarity = matchCount / words.length;
        
        return { ticket, similarity };
      })
      .filter(item => item.similarity > 0.3)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5)
      .map(item => item.ticket);
  }

  private autoAssignTicket(ticket: Ticket): { userId: string; team: string } | null {
    // Simple auto-assignment logic based on category and workload
    const assignmentRules: Record<string, { team: string; users: string[] }> = {
      billing: { team: 'finance', users: ['finance_agent_1', 'finance_agent_2'] },
      technical: { team: 'engineering', users: ['tech_agent_1', 'tech_agent_2'] },
      feature_request: { team: 'product', users: ['product_manager_1'] },
      general: { team: 'support', users: ['support_agent_1', 'support_agent_2', 'support_agent_3'] }
    };
    
    const rule = assignmentRules[ticket.category] || assignmentRules.general;
    
    // Simple round-robin assignment (in production, would consider workload)
    const assigneeIndex = Math.floor(Math.random() * rule.users.length);
    
    return {
      userId: rule.users[assigneeIndex],
      team: rule.team
    };
  }

  private checkAutoResolution(ticket: Ticket): void {
    if (ticket.aiClassification?.autoResolutionSuggestion && 
        ticket.aiClassification.confidence > 0.9) {
      
      // Auto-resolve high-confidence tickets
      setTimeout(() => {
        this.addComment(ticket.id, {
          authorId: 'ai_system',
          authorType: 'ai',
          content: `AI suggested resolution: ${ticket.aiClassification!.autoResolutionSuggestion}`,
          isInternal: false
        });
        
        this.resolveTicket(ticket.id, ticket.aiClassification!.autoResolutionSuggestion!, 'ai_system');
      }, 5000); // 5 second delay
    }
  }

  // SLA Management
  private findApplicableSLA(ticket: Ticket): SLARule | null {
    const rules = Array.from(this.slaRules.values()).filter(rule => rule.isActive);
    
    for (const rule of rules) {
      if (this.matchesSLAConditions(ticket, rule.conditions)) {
        return rule;
      }
    }
    
    return null;
  }

  private matchesSLAConditions(ticket: Ticket, conditions: SLARule['conditions']): boolean {
    if (conditions.priority && !conditions.priority.includes(ticket.priority)) return false;
    if (conditions.type && !conditions.type.includes(ticket.type)) return false;
    if (conditions.reporterTier && !conditions.reporterTier.includes(ticket.reporterTier || '')) return false;
    if (conditions.category && !conditions.category.includes(ticket.category)) return false;
    
    return true;
  }

  private updateSLAStatus(ticket: Ticket): void {
    const now = new Date();
    const timeToSLA = ticket.slaTarget.getTime() - now.getTime();
    const hoursToSLA = timeToSLA / (1000 * 60 * 60);
    
    if (timeToSLA < 0) {
      ticket.slaStatus = 'breached';
    } else if (hoursToSLA < 2) {
      ticket.slaStatus = 'approaching_breach';
    } else {
      ticket.slaStatus = 'within_sla';
    }
  }

  private startSLAMonitoring(): void {
    // Check SLA status every 15 minutes
    setInterval(() => {
      const activeTickets = Array.from(this.tickets.values())
        .filter(ticket => !['resolved', 'closed'].includes(ticket.status));
      
      activeTickets.forEach(ticket => {
        const previousStatus = ticket.slaStatus;
        this.updateSLAStatus(ticket);
        
        if (ticket.slaStatus !== previousStatus) {
          this.handleSLAStatusChange(ticket, previousStatus);
        }
      });
    }, 15 * 60 * 1000);
  }

  // Event Handlers
  private handleStatusChange(ticket: Ticket, previousStatus: string): void {
    // Track timing metrics
    if (ticket.status === 'resolved' && !ticket.resolvedAt) {
      ticket.resolvedAt = new Date();
      ticket.resolutionTime = Math.floor((ticket.resolvedAt.getTime() - ticket.createdAt.getTime()) / 60000);
    }
    
    if (ticket.status === 'closed' && !ticket.closedAt) {
      ticket.closedAt = new Date();
    }
  }

  private handleSLAStatusChange(ticket: Ticket, previousStatus: string): void {
    if (ticket.slaStatus === 'approaching_breach') {
      this.notifySLAApproaching(ticket);
    } else if (ticket.slaStatus === 'breached') {
      this.notifySLABreach(ticket);
      this.escalateTicket(ticket.id, 'SLA breach', 'system');
    }
  }

  // Notification Methods (would integrate with actual notification system)
  private notifyTicketCreated(ticket: Ticket): void {
    console.log(`Ticket created: ${ticket.id} - ${ticket.title}`);
  }

  private notifyTicketUpdated(ticket: Ticket, updates: Partial<Ticket>): void {
    console.log(`Ticket updated: ${ticket.id}`, updates);
  }

  private notifyCommentAdded(ticket: Ticket, comment: TicketComment): void {
    console.log(`Comment added to ticket ${ticket.id} by ${comment.authorId}`);
  }

  private notifyEscalation(ticket: Ticket, escalationRule: SLARule['escalationRules'][0]): void {
    console.log(`Ticket ${ticket.id} escalated to ${escalationRule.assignTo}`);
  }

  private notifySLAApproaching(ticket: Ticket): void {
    console.log(`SLA approaching breach for ticket ${ticket.id}`);
  }

  private notifySLABreach(ticket: Ticket): void {
    console.log(`SLA breached for ticket ${ticket.id}`);
  }

  private sendSatisfactionSurvey(ticket: Ticket): void {
    console.log(`Sending satisfaction survey for ticket ${ticket.id}`);
  }

  // Analytics and Reporting
  getTicketAnalytics(): {
    totalTickets: number;
    openTickets: number;
    avgResolutionTime: number;
    avgFirstResponseTime: number;
    slaCompliance: number;
    satisfactionScore: number;
    ticketsByCategory: Record<string, number>;
    ticketsByPriority: Record<string, number>;
  } {
    const tickets = Array.from(this.tickets.values());
    const resolvedTickets = tickets.filter(t => t.status === 'resolved');
    
    const avgResolutionTime = resolvedTickets.length > 0
      ? resolvedTickets.reduce((sum, t) => sum + (t.resolutionTime || 0), 0) / resolvedTickets.length
      : 0;
    
    const avgFirstResponseTime = tickets.filter(t => t.firstResponseTime).length > 0
      ? tickets.reduce((sum, t) => sum + (t.firstResponseTime || 0), 0) / tickets.filter(t => t.firstResponseTime).length
      : 0;
    
    const slaCompliant = tickets.filter(t => t.slaStatus !== 'breached').length;
    const slaCompliance = tickets.length > 0 ? (slaCompliant / tickets.length) * 100 : 100;
    
    const satisfactionScores = tickets.filter(t => t.customerSatisfactionScore);
    const satisfactionScore = satisfactionScores.length > 0
      ? satisfactionScores.reduce((sum, t) => sum + (t.customerSatisfactionScore || 0), 0) / satisfactionScores.length
      : 0;
    
    const ticketsByCategory = tickets.reduce((acc, ticket) => {
      acc[ticket.category] = (acc[ticket.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const ticketsByPriority = tickets.reduce((acc, ticket) => {
      acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalTickets: tickets.length,
      openTickets: tickets.filter(t => !['resolved', 'closed'].includes(t.status)).length,
      avgResolutionTime,
      avgFirstResponseTime,
      slaCompliance,
      satisfactionScore,
      ticketsByCategory,
      ticketsByPriority
    };
  }

  // Utility Methods
  getTicket(ticketId: string): Ticket | undefined {
    return this.tickets.get(ticketId);
  }

  listTickets(filters?: {
    status?: string;
    assignedTo?: string;
    priority?: string;
    category?: string;
    reporterId?: string;
  }): Ticket[] {
    let tickets = Array.from(this.tickets.values());
    
    if (filters?.status) {
      tickets = tickets.filter(t => t.status === filters.status);
    }
    
    if (filters?.assignedTo) {
      tickets = tickets.filter(t => t.assignedTo === filters.assignedTo);
    }
    
    if (filters?.priority) {
      tickets = tickets.filter(t => t.priority === filters.priority);
    }
    
    if (filters?.category) {
      tickets = tickets.filter(t => t.category === filters.category);
    }
    
    if (filters?.reporterId) {
      tickets = tickets.filter(t => t.reporterId === filters.reporterId);
    }
    
    return tickets.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  searchTickets(query: string): Ticket[] {
    const searchTerms = query.toLowerCase().split(/\s+/);
    
    return Array.from(this.tickets.values())
      .filter(ticket => {
        const searchText = `${ticket.title} ${ticket.description} ${ticket.id}`.toLowerCase();
        return searchTerms.some(term => searchText.includes(term));
      })
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  // Initialization Methods
  private initializeDefaultTemplates(): void {
    const defaultTemplates: Omit<TicketTemplate, 'id'>[] = [
      {
        name: 'Bug Report',
        category: 'technical',
        title: 'Bug: [Brief Description]',
        description: 'Steps to reproduce:\n1. \n2. \n3. \n\nExpected behavior:\n\nActual behavior:\n\nBrowser/Device:',
        defaultPriority: 'medium',
        requiredFields: ['steps', 'expected', 'actual'],
        customFields: {}
      },
      {
        name: 'Payment Issue',
        category: 'billing',
        title: 'Payment Issue: [Description]',
        description: 'Payment method:\nTransaction ID:\nAmount:\nError message:\nDate of transaction:',
        defaultPriority: 'high',
        defaultAssignee: 'finance_team',
        requiredFields: ['payment_method', 'amount'],
        customFields: {}
      }
    ];

    defaultTemplates.forEach(template => {
      const id = `template_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      this.templates.set(id, { ...template, id });
    });
  }

  private initializeDefaultSLAs(): void {
    const defaultSLAs: Omit<SLARule, 'id'>[] = [
      {
        name: 'Critical Priority SLA',
        conditions: { priority: ['critical', 'urgent'] },
        targets: { firstResponse: 30, resolution: 240 }, // 30 min, 4 hours
        escalationRules: [
          { level: 1, delay: 60, assignTo: 'senior_support', notifyUsers: ['manager_1'] }
        ],
        isActive: true
      },
      {
        name: 'High Priority SLA',
        conditions: { priority: ['high'] },
        targets: { firstResponse: 120, resolution: 480 }, // 2 hours, 8 hours
        escalationRules: [
          { level: 1, delay: 240, assignTo: 'senior_support', notifyUsers: ['manager_1'] }
        ],
        isActive: true
      },
      {
        name: 'Standard SLA',
        conditions: { priority: ['medium', 'low'] },
        targets: { firstResponse: 480, resolution: 1440 }, // 8 hours, 24 hours
        escalationRules: [
          { level: 1, delay: 720, assignTo: 'senior_support', notifyUsers: ['manager_1'] }
        ],
        isActive: true
      }
    ];

    defaultSLAs.forEach(sla => {
      const id = `sla_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      this.slaRules.set(id, { ...sla, id });
    });
  }
}

// Export singleton instance
export const ticketingSystem = new AdvancedTicketingSystem();