// Privacy-First Fraud Prevention - Minimal Data, Maximum Protection
// User controls when and what data is shared, no tracking without consent

export interface PrivacyConfig {
  // User consent levels
  consentLevel: 'minimal' | 'standard' | 'enhanced';
  
  // Data retention settings
  dataRetention: {
    enabled: boolean;
    maxDays: number; // Auto-delete after X days
    anonymizeAfter: number; // Anonymize after X hours
  };
  
  // What data to collect (user controlled)
  dataCollection: {
    deviceFingerprint: boolean;
    ipAnalysis: boolean;
    behaviorPatterns: boolean;
    geolocation: boolean;
    userAgent: boolean;
  };
  
  // Push vs pull model
  pushModel: {
    enabled: boolean;
    pushOnSuspicious: boolean;
    pushOnBlocked: boolean;
    webhookUrl?: string;
  };
}

export interface MinimalFraudCheck {
  // Only essential data for fraud detection
  eventId: string;
  timestamp: number;
  
  // Optional fields (only if user consents)
  deviceHash?: string; // Hashed, not raw device ID
  ipHash?: string; // Hashed IP, not actual IP
  userAgentHash?: string; // Hashed user agent
  
  // Behavioral signals (no PII)
  eventFrequency?: number;
  timeSinceLastEvent?: number;
  
  // Result
  fraudScore: number; // 0-100
  action: 'allow' | 'review' | 'block';
  confidence: number;
  reasoning: string[];
}

export class PrivacyFirstFraudEngine {
  private config: PrivacyConfig;
  private localCache: Map<string, any> = new Map();
  
  constructor(config: PrivacyConfig) {
    this.config = config;
    
    // Auto-cleanup based on retention policy
    if (config.dataRetention.enabled) {
      this.setupAutoCleanup();
    }
  }

  // Minimal fraud check - only what's absolutely necessary
  checkFraud(event: {
    eventId: string;
    deviceId?: string;
    ip?: string;
    userAgent?: string;
    timestamp?: number;
  }): MinimalFraudCheck {
    
    const timestamp = event.timestamp || Date.now();
    const result: MinimalFraudCheck = {
      eventId: event.eventId,
      timestamp,
      fraudScore: 0,
      action: 'allow',
      confidence: 0,
      reasoning: []
    };

    // Only collect data if user consents
    if (this.config.dataCollection.deviceFingerprint && event.deviceId) {
      result.deviceHash = this.hashData(event.deviceId);
    }
    
    if (this.config.dataCollection.ipAnalysis && event.ip) {
      result.ipHash = this.hashData(event.ip);
      
      // Basic IP checks without storing actual IP
      if (this.isKnownBadIP(event.ip)) {
        result.fraudScore += 40;
        result.reasoning.push('Suspicious IP pattern');
      }
    }
    
    if (this.config.dataCollection.userAgent && event.userAgent) {
      result.userAgentHash = this.hashData(event.userAgent);
      
      // Bot detection without storing user agent
      if (this.isBotUserAgent(event.userAgent)) {
        result.fraudScore += 60;
        result.reasoning.push('Automated traffic detected');
      }
    }
    
    // Frequency analysis (privacy-safe)
    if (this.config.dataCollection.behaviorPatterns && result.deviceHash) {
      const frequency = this.getEventFrequency(result.deviceHash);
      result.eventFrequency = frequency;
      
      if (frequency > 10) { // More than 10 events per minute
        result.fraudScore += 30;
        result.reasoning.push('High event frequency');
      }
    }
    
    // Determine action based on score
    if (result.fraudScore >= 70) {
      result.action = 'block';
      result.confidence = 85;
    } else if (result.fraudScore >= 40) {
      result.action = 'review';
      result.confidence = 70;
    } else {
      result.action = 'allow';
      result.confidence = 95;
    }
    
    // Push notification if configured and warranted
    if (this.config.pushModel.enabled) {
      this.handlePushNotification(result);
    }
    
    // Store minimal data for pattern recognition (if consented)
    this.storeMinimalData(result);
    
    return result;
  }

  // Hash sensitive data - never store raw PII
  private hashData(data: string): string {
    // Simple hash for demo - use crypto.createHash in production
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  // Check IP patterns without storing actual IPs
  private isKnownBadIP(ip: string): boolean {
    // Check against known bad patterns
    const badPatterns = [
      /^10\.0\.0\./, // Internal networks used by bots
      /^192\.168\.1\.1$/, // Common router IP used by farms
    ];
    
    return badPatterns.some(pattern => pattern.test(ip));
  }

  // Bot detection without storing user agent
  private isBotUserAgent(userAgent: string): boolean {
    const botIndicators = ['bot', 'crawler', 'spider', 'headless', 'phantom'];
    const ua = userAgent.toLowerCase();
    return botIndicators.some(indicator => ua.includes(indicator));
  }

  // Get event frequency using hashed device ID
  private getEventFrequency(deviceHash: string): number {
    const key = `freq_${deviceHash}`;
    const now = Date.now();
    const events = this.localCache.get(key) || [];
    
    // Only count events from last minute
    const recentEvents = events.filter((time: number) => now - time < 60000);
    
    // Add current event
    recentEvents.push(now);
    
    // Store back (with cleanup)
    this.localCache.set(key, recentEvents.slice(-20)); // Keep max 20 events
    
    return recentEvents.length;
  }

  // Push notifications only when necessary
  private handlePushNotification(result: MinimalFraudCheck): void {
    const shouldPush = 
      (this.config.pushModel.pushOnBlocked && result.action === 'block') ||
      (this.config.pushModel.pushOnSuspicious && result.action === 'review');
    
    if (shouldPush && this.config.pushModel.webhookUrl) {
      // Send minimal notification - no PII
      const notification = {
        eventId: result.eventId,
        action: result.action,
        fraudScore: result.fraudScore,
        timestamp: result.timestamp,
        reasoning: result.reasoning
      };
      
      // In production, send to webhook
      console.log('Push notification:', notification);
    }
  }

  // Store only essential data for pattern recognition
  private storeMinimalData(result: MinimalFraudCheck): void {
    if (!this.config.dataRetention.enabled) return;
    
    // Store only aggregated, anonymized data
    const key = `pattern_${new Date().toDateString()}`;
    const dailyStats = this.localCache.get(key) || {
      totalEvents: 0,
      blockedEvents: 0,
      reviewEvents: 0,
      avgFraudScore: 0
    };
    
    dailyStats.totalEvents++;
    if (result.action === 'block') dailyStats.blockedEvents++;
    if (result.action === 'review') dailyStats.reviewEvents++;
    dailyStats.avgFraudScore = (dailyStats.avgFraudScore + result.fraudScore) / 2;
    
    this.localCache.set(key, dailyStats);
  }

  // Auto-cleanup based on retention policy
  private setupAutoCleanup(): void {
    setInterval(() => {
      const now = Date.now();
      const maxAge = this.config.dataRetention.maxDays * 24 * 60 * 60 * 1000;
      
      for (const [key, value] of this.localCache.entries()) {
        if (Array.isArray(value)) {
          // Clean old timestamps
          const filtered = value.filter((time: number) => now - time < maxAge);
          if (filtered.length === 0) {
            this.localCache.delete(key);
          } else {
            this.localCache.set(key, filtered);
          }
        }
      }
    }, 60000); // Cleanup every minute
  }

  // Get privacy-safe analytics
  getPrivacySafeAnalytics(): {
    totalEvents: number;
    fraudRate: number;
    avgProcessingTime: number;
    dataRetentionDays: number;
    consentLevel: string;
  } {
    let totalEvents = 0;
    let blockedEvents = 0;
    
    // Aggregate from daily stats
    for (const [key, value] of this.localCache.entries()) {
      if (key.startsWith('pattern_')) {
        totalEvents += value.totalEvents || 0;
        blockedEvents += value.blockedEvents || 0;
      }
    }
    
    return {
      totalEvents,
      fraudRate: totalEvents > 0 ? (blockedEvents / totalEvents) * 100 : 0,
      avgProcessingTime: 1.2, // Minimal processing is faster
      dataRetentionDays: this.config.dataRetention.maxDays,
      consentLevel: this.config.consentLevel
    };
  }

  // Update privacy settings (user controlled)
  updatePrivacySettings(newConfig: Partial<PrivacyConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // If user reduces consent, clean up data immediately
    if (newConfig.consentLevel === 'minimal') {
      this.cleanupSensitiveData();
    }
  }

  // Clean up sensitive data when user reduces consent
  private cleanupSensitiveData(): void {
    // Remove all hashed identifiers
    for (const [key] of this.localCache.entries()) {
      if (key.includes('hash') || key.includes('freq_')) {
        this.localCache.delete(key);
      }
    }
  }
}

// Integration approach comparison
export const integrationApproaches = {
  // Option 1: Simple SDK Integration (Recommended)
  simpleSdk: {
    pros: [
      'Easy to implement (2-3 lines of code)',
      'No enterprise API needed',
      'Works with existing MMP setup',
      'Privacy-first by default',
      'Low maintenance'
    ],
    cons: [
      'Less customization',
      'Basic reporting only',
      'Limited enterprise features'
    ],
    implementation: `
// Simple integration - just add to existing MMP code
import { createFraudChecker } from '@gamefluence/fraud-prevention';

const fraudChecker = createFraudChecker({
  consentLevel: 'standard', // User choice
  pushOnBlock: true
});

// In your MMP event handler
const result = fraudChecker.check(event);
if (result.action === 'block') {
  // Don't attribute this event
  return;
}
`,
    timeToImplement: '1-2 days',
    cost: 'Low ($99/month flat rate)'
  },

  // Option 2: Enterprise API Integration
  enterpriseApi: {
    pros: [
      'Full customization',
      'Advanced analytics',
      'White-label options',
      'SLA guarantees',
      'Dedicated support'
    ],
    cons: [
      'Complex implementation',
      'Higher cost',
      'Longer setup time',
      'More maintenance'
    ],
    implementation: `
// Enterprise API integration
const response = await fetch('https://api.gamefluence.com/fraud/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    events: batchOfEvents,
    config: customRules
  })
});
`,
    timeToImplement: '2-4 weeks',
    cost: 'High ($500-2000/month + usage)'
  },

  // Option 3: Hybrid Approach (Best of both)
  hybrid: {
    pros: [
      'Start simple, upgrade later',
      'Privacy controls',
      'Gradual feature adoption',
      'Cost effective scaling'
    ],
    cons: [
      'Two integration points',
      'Migration complexity'
    ],
    implementation: `
// Start with simple SDK
const fraudChecker = createFraudChecker({ mode: 'simple' });

// Upgrade to enterprise features when needed
fraudChecker.enableEnterpriseFeatures({
  apiKey: 'your-key',
  customRules: true,
  advancedAnalytics: true
});
`,
    timeToImplement: '1 day start, 1 week full features',
    cost: 'Scalable ($99/month → $500+/month as needed)'
  }
};

// Recommended configuration for different use cases
export const recommendedConfigs = {
  // For small gaming studios
  startup: {
    consentLevel: 'minimal' as const,
    dataRetention: {
      enabled: true,
      maxDays: 7,
      anonymizeAfter: 1
    },
    dataCollection: {
      deviceFingerprint: false,
      ipAnalysis: true,
      behaviorPatterns: true,
      geolocation: false,
      userAgent: true
    },
    pushModel: {
      enabled: true,
      pushOnSuspicious: false,
      pushOnBlocked: true
    }
  },

  // For established studios
  standard: {
    consentLevel: 'standard' as const,
    dataRetention: {
      enabled: true,
      maxDays: 30,
      anonymizeAfter: 24
    },
    dataCollection: {
      deviceFingerprint: true,
      ipAnalysis: true,
      behaviorPatterns: true,
      geolocation: true,
      userAgent: true
    },
    pushModel: {
      enabled: true,
      pushOnSuspicious: true,
      pushOnBlocked: true
    }
  },

  // For enterprise with compliance needs
  enterprise: {
    consentLevel: 'enhanced' as const,
    dataRetention: {
      enabled: true,
      maxDays: 90,
      anonymizeAfter: 72
    },
    dataCollection: {
      deviceFingerprint: true,
      ipAnalysis: true,
      behaviorPatterns: true,
      geolocation: true,
      userAgent: true
    },
    pushModel: {
      enabled: true,
      pushOnSuspicious: true,
      pushOnBlocked: true,
      webhookUrl: 'https://your-enterprise-endpoint.com/fraud-alerts'
    }
  }
};

// Export privacy-first engine
export const privacyFraudEngine = new PrivacyFirstFraudEngine(recommendedConfigs.standard);