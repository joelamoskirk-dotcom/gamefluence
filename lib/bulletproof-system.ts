// Bulletproof System - Enterprise-grade error handling, logging, and learning
// AWS Well-Architected: Reliability, Security, Performance, Cost Optimization

export interface SystemTicket {
  id: string;
  timestamp: Date;
  action: string;
  component: string;
  userId: string;
  status: 'success' | 'error' | 'warning' | 'info';
  details: any;
  errorMessage?: string;
  resolution?: string;
  learningInsights?: string[];
}

export interface SystemHealth {
  overall: number;
  components: {
    [key: string]: {
      status: 'healthy' | 'degraded' | 'down';
      responseTime: number;
      errorRate: number;
      lastCheck: Date;
    };
  };
  alerts: Array<{
    level: 'critical' | 'warning' | 'info';
    message: string;
    timestamp: Date;
  }>;
}

export interface LearningInsight {
  id: string;
  timestamp: Date;
  category: 'performance' | 'user_behavior' | 'system_optimization' | 'error_pattern';
  insight: string;
  confidence: number;
  actionable: boolean;
  implemented: boolean;
}

class BulletproofSystem {
  private tickets: SystemTicket[] = [];
  private health: SystemHealth;
  private insights: LearningInsight[] = [];
  private listeners: Array<(data: any) => void> = [];

  constructor() {
    this.health = {
      overall: 98.5,
      components: {
        'fraud-engine': { status: 'healthy', responseTime: 1.8, errorRate: 0.1, lastCheck: new Date() },
        'campaign-manager': { status: 'healthy', responseTime: 245, errorRate: 0.05, lastCheck: new Date() },
        'creator-network': { status: 'healthy', responseTime: 156, errorRate: 0.08, lastCheck: new Date() },
        'analytics-engine': { status: 'healthy', responseTime: 89, errorRate: 0.02, lastCheck: new Date() },
        'payment-processor': { status: 'healthy', responseTime: 312, errorRate: 0.15, lastCheck: new Date() }
      },
      alerts: []
    };

    this.startHealthMonitoring();
    this.loadPersistedData();
  }

  // Execute any action with bulletproof error handling and logging
  async executeAction(
    action: string,
    component: string,
    handler: () => Promise<any> | any,
    userId: string = 'founder'
  ): Promise<{ success: boolean; result?: any; ticket: SystemTicket }> {
    const ticketId = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();

    // Create initial ticket
    const ticket: SystemTicket = {
      id: ticketId,
      timestamp: new Date(),
      action,
      component,
      userId,
      status: 'info',
      details: { startTime }
    };

    try {
      console.log(`🎯 Executing: ${action} on ${component}`);
      
      // Execute the action
      const result = await Promise.resolve(handler());
      
      const executionTime = Date.now() - startTime;
      
      // Success ticket
      ticket.status = 'success';
      ticket.details = {
        ...ticket.details,
        result,
        executionTime,
        endTime: Date.now()
      };
      
      // Generate learning insights
      const insights = this.generateLearningInsights(action, component, result, executionTime);
      ticket.learningInsights = insights.map(i => i.insight);
      
      // Add insights to system
      insights.forEach(insight => this.insights.push(insight));
      
      // Update component health
      this.updateComponentHealth(component, executionTime, true);
      
      console.log(`✅ Success: ${action} completed in ${executionTime}ms`);
      
      this.tickets.push(ticket);
      this.persistData();
      this.notifyListeners();
      
      return { success: true, result, ticket };
      
    } catch (error) {
      const executionTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Error ticket
      ticket.status = 'error';
      ticket.errorMessage = errorMessage;
      ticket.details = {
        ...ticket.details,
        error: errorMessage,
        executionTime,
        endTime: Date.now()
      };
      
      // Generate error insights
      const errorInsights = this.generateErrorInsights(action, component, errorMessage);
      ticket.learningInsights = errorInsights.map(i => i.insight);
      
      // Add error insights
      errorInsights.forEach(insight => this.insights.push(insight));
      
      // Update component health (error)
      this.updateComponentHealth(component, executionTime, false);
      
      // Add system alert
      this.health.alerts.push({
        level: 'critical',
        message: `${action} failed on ${component}: ${errorMessage}`,
        timestamp: new Date()
      });
      
      console.error(`❌ Error: ${action} failed - ${errorMessage}`);
      
      this.tickets.push(ticket);
      this.persistData();
      this.notifyListeners();
      
      return { success: false, ticket };
    }
  }

  // Generate learning insights from successful actions
  private generateLearningInsights(
    action: string, 
    component: string, 
    result: any, 
    executionTime: number
  ): LearningInsight[] {
    const insights: LearningInsight[] = [];
    
    // Performance insights
    if (executionTime < 100) {
      insights.push({
        id: `insight_${Date.now()}_1`,
        timestamp: new Date(),
        category: 'performance',
        insight: `${component} ${action} executed in ${executionTime}ms - excellent performance`,
        confidence: 0.95,
        actionable: false,
        implemented: true
      });
    } else if (executionTime > 1000) {
      insights.push({
        id: `insight_${Date.now()}_2`,
        timestamp: new Date(),
        category: 'performance',
        insight: `${component} ${action} took ${executionTime}ms - consider optimization`,
        confidence: 0.85,
        actionable: true,
        implemented: false
      });
    }
    
    // User behavior insights
    if (action.includes('launch') || action.includes('create')) {
      insights.push({
        id: `insight_${Date.now()}_3`,
        timestamp: new Date(),
        category: 'user_behavior',
        insight: `User frequently uses ${action} - high engagement feature`,
        confidence: 0.8,
        actionable: true,
        implemented: false
      });
    }
    
    // System optimization insights
    if (result && typeof result === 'object') {
      if (result.roi && result.roi > 200) {
        insights.push({
          id: `insight_${Date.now()}_4`,
          timestamp: new Date(),
          category: 'system_optimization',
          insight: `High ROI campaigns (${result.roi}%) correlate with specific parameters`,
          confidence: 0.9,
          actionable: true,
          implemented: false
        });
      }
    }
    
    return insights;
  }

  // Generate insights from errors
  private generateErrorInsights(action: string, component: string, error: string): LearningInsight[] {
    const insights: LearningInsight[] = [];
    
    insights.push({
      id: `error_insight_${Date.now()}`,
      timestamp: new Date(),
      category: 'error_pattern',
      insight: `${component} ${action} failed with: ${error} - pattern analysis needed`,
      confidence: 0.7,
      actionable: true,
      implemented: false
    });
    
    return insights;
  }

  // Update component health based on execution
  private updateComponentHealth(component: string, responseTime: number, success: boolean) {
    if (!this.health.components[component]) {
      this.health.components[component] = {
        status: 'healthy',
        responseTime: 0,
        errorRate: 0,
        lastCheck: new Date()
      };
    }
    
    const comp = this.health.components[component];
    
    // Update response time (moving average)
    comp.responseTime = (comp.responseTime * 0.8) + (responseTime * 0.2);
    
    // Update error rate
    if (!success) {
      comp.errorRate = Math.min(comp.errorRate + 0.1, 1.0);
    } else {
      comp.errorRate = Math.max(comp.errorRate - 0.05, 0);
    }
    
    // Update status
    if (comp.errorRate > 0.5) {
      comp.status = 'down';
    } else if (comp.errorRate > 0.2 || comp.responseTime > 2000) {
      comp.status = 'degraded';
    } else {
      comp.status = 'healthy';
    }
    
    comp.lastCheck = new Date();
    
    // Update overall health
    const componentHealthScores = Object.values(this.health.components).map(c => {
      if (c.status === 'healthy') return 100;
      if (c.status === 'degraded') return 70;
      return 30;
    });
    
    this.health.overall = componentHealthScores.reduce((sum, score) => sum + score, 0) / componentHealthScores.length;
  }

  // Start continuous health monitoring
  private startHealthMonitoring() {
    setInterval(() => {
      // Simulate health checks
      Object.keys(this.health.components).forEach(component => {
        const comp = this.health.components[component];
        
        // Simulate minor fluctuations
        comp.responseTime += (Math.random() - 0.5) * 20;
        comp.responseTime = Math.max(comp.responseTime, 10);
        
        // Random health events
        if (Math.random() < 0.01) { // 1% chance of issue
          comp.errorRate += 0.1;
          this.health.alerts.push({
            level: 'warning',
            message: `${component} showing increased error rate`,
            timestamp: new Date()
          });
        }
        
        comp.lastCheck = new Date();
      });
      
      // Clean old alerts (keep last 10)
      this.health.alerts = this.health.alerts.slice(-10);
      
      this.notifyListeners();
    }, 30000); // Every 30 seconds
  }

  // Persist data to localStorage
  private persistData() {
    try {
      const data = {
        tickets: this.tickets.slice(-100), // Keep last 100 tickets
        insights: this.insights.slice(-50), // Keep last 50 insights
        health: this.health,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('bulletproof_system_data', JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to persist system data:', error);
    }
  }

  // Load persisted data
  private loadPersistedData() {
    try {
      const stored = localStorage.getItem('bulletproof_system_data');
      if (stored) {
        const data = JSON.parse(stored);
        this.tickets = data.tickets || [];
        this.insights = data.insights || [];
        
        // Restore health but keep current monitoring
        if (data.health) {
          this.health.overall = data.health.overall;
          // Keep current component states for real-time monitoring
        }
      }
    } catch (error) {
      console.warn('Failed to load persisted data:', error);
    }
  }

  // Public API methods
  getTickets(limit: number = 50): SystemTicket[] {
    return this.tickets.slice(-limit).reverse();
  }

  getHealth(): SystemHealth {
    return { ...this.health };
  }

  getInsights(limit: number = 20): LearningInsight[] {
    return this.insights.slice(-limit).reverse();
  }

  getSystemStats() {
    const recentTickets = this.tickets.slice(-100);
    const successRate = recentTickets.length > 0 
      ? (recentTickets.filter(t => t.status === 'success').length / recentTickets.length) * 100
      : 100;
    
    return {
      totalTickets: this.tickets.length,
      successRate,
      avgResponseTime: Object.values(this.health.components)
        .reduce((sum, c) => sum + c.responseTime, 0) / Object.keys(this.health.components).length,
      totalInsights: this.insights.length,
      actionableInsights: this.insights.filter(i => i.actionable && !i.implemented).length,
      systemHealth: this.health.overall
    };
  }

  // Event listeners
  addListener(listener: (data: any) => void) {
    this.listeners.push(listener);
  }

  removeListener(listener: (data: any) => void) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  private notifyListeners() {
    const data = {
      tickets: this.getTickets(),
      health: this.getHealth(),
      insights: this.getInsights(),
      stats: this.getSystemStats()
    };
    
    this.listeners.forEach(listener => {
      try {
        listener(data);
      } catch (error) {
        console.warn('Listener error:', error);
      }
    });
  }
}

// Export singleton instance
export const bulletproofSystem = new BulletproofSystem();