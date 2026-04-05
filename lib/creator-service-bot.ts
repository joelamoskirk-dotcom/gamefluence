// Creator Service Bot - AI-powered customer support for creators
// Provides intelligent responses, issue resolution, and proactive assistance

export interface CreatorQuery {
  id: string;
  creatorId: string;
  query: string;
  category: 'payment' | 'campaign' | 'technical' | 'general' | 'urgent';
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  status: 'pending' | 'processing' | 'resolved' | 'escalated';
  context?: Record<string, any>;
}

export interface BotResponse {
  id: string;
  queryId: string;
  response: string;
  confidence: number; // 0-1
  suggestedActions: string[];
  requiresHumanReview: boolean;
  timestamp: Date;
  responseTime: number; // milliseconds
}

export interface KnowledgeBase {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
  confidence: number;
  lastUpdated: Date;
  usageCount: number;
}

export class CreatorServiceBot {
  private knowledgeBase: Map<string, KnowledgeBase> = new Map();
  private queryHistory: Map<string, CreatorQuery[]> = new Map();
  private responseCache: Map<string, BotResponse> = new Map();
  
  constructor() {
    this.initializeKnowledgeBase();
  }

  // Query Processing
  async processQuery(query: CreatorQuery): Promise<BotResponse> {
    const startTime = Date.now();
    
    try {
      // Analyze query intent and category
      const analysis = this.analyzeQuery(query.query);
      
      // Check cache for similar queries
      const cachedResponse = this.checkCache(query.query);
      if (cachedResponse && cachedResponse.confidence > 0.8) {
        return this.adaptCachedResponse(cachedResponse, query);
      }
      
      // Generate response based on knowledge base
      const response = await this.generateResponse(query, analysis);
      
      // Store in history and cache
      this.storeQuery(query);
      this.cacheResponse(response);
      
      return response;
    } catch (error) {
      console.error('Error processing query:', error);
      return this.generateFallbackResponse(query, startTime);
    }
  }

  private analyzeQuery(queryText: string): {
    intent: string;
    entities: string[];
    sentiment: 'positive' | 'neutral' | 'negative';
    urgency: number; // 0-1
  } {
    const text = queryText.toLowerCase();
    
    // Simple intent detection (in production, would use NLP models)
    let intent = 'general';
    if (text.includes('payment') || text.includes('money') || text.includes('invoice')) {
      intent = 'payment';
    } else if (text.includes('campaign') || text.includes('brief') || text.includes('deliverable')) {
      intent = 'campaign';
    } else if (text.includes('bug') || text.includes('error') || text.includes('not working')) {
      intent = 'technical';
    } else if (text.includes('urgent') || text.includes('asap') || text.includes('emergency')) {
      intent = 'urgent';
    }
    
    // Extract entities (simplified)
    const entities: string[] = [];
    const entityPatterns = {
      campaignId: /campaign[_\s]?(\w+)/gi,
      paymentId: /payment[_\s]?(\w+)/gi,
      amount: /\$(\d+(?:\.\d{2})?)/g
    };
    
    Object.entries(entityPatterns).forEach(([type, pattern]) => {
      const matches = text.match(pattern);
      if (matches) {
        entities.push(...matches.map(match => `${type}:${match}`));
      }
    });
    
    // Sentiment analysis (simplified)
    const positiveWords = ['great', 'good', 'excellent', 'happy', 'satisfied'];
    const negativeWords = ['bad', 'terrible', 'frustrated', 'angry', 'disappointed'];
    
    const positiveCount = positiveWords.filter(word => text.includes(word)).length;
    const negativeCount = negativeWords.filter(word => text.includes(word)).length;
    
    let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
    if (positiveCount > negativeCount) sentiment = 'positive';
    else if (negativeCount > positiveCount) sentiment = 'negative';
    
    // Urgency detection
    const urgencyIndicators = ['urgent', 'asap', 'emergency', 'critical', 'immediately'];
    const urgency = urgencyIndicators.some(indicator => text.includes(indicator)) ? 0.9 : 0.3;
    
    return { intent, entities, sentiment, urgency };
  }

  private async generateResponse(
    query: CreatorQuery, 
    analysis: ReturnType<typeof this.analyzeQuery>
  ): Promise<BotResponse> {
    const startTime = Date.now();
    
    // Find relevant knowledge base entries
    const relevantEntries = this.findRelevantKnowledge(query.query, analysis.intent);
    
    let response = '';
    let confidence = 0;
    let suggestedActions: string[] = [];
    let requiresHumanReview = false;
    
    if (relevantEntries.length > 0) {
      const bestMatch = relevantEntries[0];
      response = this.personalizeResponse(bestMatch.answer, query);
      confidence = bestMatch.confidence;
      
      // Update usage count
      bestMatch.usageCount++;
      this.knowledgeBase.set(bestMatch.id, bestMatch);
      
      // Generate suggested actions based on category
      suggestedActions = this.generateSuggestedActions(query.category, analysis);
    } else {
      // No good match found
      response = this.generateGenericResponse(query, analysis);
      confidence = 0.3;
      requiresHumanReview = true;
    }
    
    // Determine if human review is needed
    if (confidence < 0.6 || analysis.urgency > 0.7 || analysis.sentiment === 'negative') {
      requiresHumanReview = true;
    }
    
    const botResponse: BotResponse = {
      id: `response_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      queryId: query.id,
      response,
      confidence,
      suggestedActions,
      requiresHumanReview,
      timestamp: new Date(),
      responseTime: Date.now() - startTime
    };
    
    return botResponse;
  }

  private findRelevantKnowledge(queryText: string, intent: string): KnowledgeBase[] {
    const entries = Array.from(this.knowledgeBase.values());
    const queryWords = queryText.toLowerCase().split(/\s+/);
    
    // Score entries based on keyword matches and category
    const scoredEntries = entries.map(entry => {
      let score = 0;
      
      // Category match bonus
      if (entry.category === intent) {
        score += 0.3;
      }
      
      // Keyword matching
      const keywordMatches = entry.keywords.filter(keyword => 
        queryWords.some(word => word.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(word))
      );
      score += (keywordMatches.length / entry.keywords.length) * 0.7;
      
      return { ...entry, score };
    });
    
    // Return top matches with score > 0.4
    return scoredEntries
      .filter(entry => entry.score > 0.4)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }

  private personalizeResponse(template: string, query: CreatorQuery): string {
    // Replace placeholders with actual data
    let response = template;
    
    // Get creator context if available
    const creatorName = query.context?.creatorName || 'there';
    response = response.replace(/\{creatorName\}/g, creatorName);
    
    // Add contextual information
    if (query.context?.campaignId) {
      response = response.replace(/\{campaignId\}/g, query.context.campaignId);
    }
    
    if (query.context?.paymentAmount) {
      response = response.replace(/\{paymentAmount\}/g, query.context.paymentAmount);
    }
    
    return response;
  }

  private generateSuggestedActions(category: string, analysis: any): string[] {
    const actions: Record<string, string[]> = {
      payment: [
        'Check payment status in dashboard',
        'Review payment terms in contract',
        'Contact finance team if payment is overdue'
      ],
      campaign: [
        'Review campaign brief and requirements',
        'Check deliverable deadlines',
        'Upload content to campaign dashboard'
      ],
      technical: [
        'Clear browser cache and cookies',
        'Try using a different browser',
        'Check system status page'
      ],
      general: [
        'Check FAQ section',
        'Review creator guidelines',
        'Contact support team'
      ]
    };
    
    return actions[category] || actions.general;
  }

  private generateGenericResponse(query: CreatorQuery, analysis: any): string {
    const responses = [
      "I understand you need help with this. Let me connect you with a human agent who can provide more specific assistance.",
      "Thank you for reaching out. While I don't have a specific answer for your question, I've escalated this to our support team.",
      "I want to make sure you get the best help possible. A member of our team will review your query and respond shortly."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private generateFallbackResponse(query: CreatorQuery, startTime: number): BotResponse {
    return {
      id: `response_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      queryId: query.id,
      response: "I'm experiencing some technical difficulties. Please try again in a moment, or contact our support team directly.",
      confidence: 0.1,
      suggestedActions: ['Contact human support', 'Try again later'],
      requiresHumanReview: true,
      timestamp: new Date(),
      responseTime: Date.now() - startTime
    };
  }

  // Knowledge Base Management
  addKnowledge(entry: Omit<KnowledgeBase, 'id' | 'usageCount' | 'lastUpdated'>): string {
    const id = `kb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const knowledgeEntry: KnowledgeBase = {
      ...entry,
      id,
      usageCount: 0,
      lastUpdated: new Date()
    };
    
    this.knowledgeBase.set(id, knowledgeEntry);
    return id;
  }

  updateKnowledge(id: string, updates: Partial<KnowledgeBase>): boolean {
    const entry = this.knowledgeBase.get(id);
    if (!entry) return false;
    
    const updated = { ...entry, ...updates, lastUpdated: new Date() };
    this.knowledgeBase.set(id, updated);
    return true;
  }

  deleteKnowledge(id: string): boolean {
    return this.knowledgeBase.delete(id);
  }

  searchKnowledge(query: string): KnowledgeBase[] {
    return this.findRelevantKnowledge(query, 'general');
  }

  // Analytics and Insights
  getAnalytics(): {
    totalQueries: number;
    avgResponseTime: number;
    avgConfidence: number;
    resolutionRate: number;
    topCategories: Array<{ category: string; count: number }>;
    humanReviewRate: number;
  } {
    const allQueries = Array.from(this.queryHistory.values()).flat();
    const allResponses = Array.from(this.responseCache.values());
    
    const categoryCount = allQueries.reduce((acc, query) => {
      acc[query.category] = (acc[query.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topCategories = Object.entries(categoryCount)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
    
    return {
      totalQueries: allQueries.length,
      avgResponseTime: allResponses.length > 0 
        ? allResponses.reduce((sum, r) => sum + r.responseTime, 0) / allResponses.length 
        : 0,
      avgConfidence: allResponses.length > 0 
        ? allResponses.reduce((sum, r) => sum + r.confidence, 0) / allResponses.length 
        : 0,
      resolutionRate: allQueries.length > 0 
        ? allQueries.filter(q => q.status === 'resolved').length / allQueries.length 
        : 0,
      topCategories,
      humanReviewRate: allResponses.length > 0 
        ? allResponses.filter(r => r.requiresHumanReview).length / allResponses.length 
        : 0
    };
  }

  getCreatorHistory(creatorId: string): CreatorQuery[] {
    return this.queryHistory.get(creatorId) || [];
  }

  // Utility Methods
  private checkCache(query: string): BotResponse | null {
    // Simple cache check based on query similarity
    const cacheKey = this.generateCacheKey(query);
    return this.responseCache.get(cacheKey) || null;
  }

  private generateCacheKey(query: string): string {
    // Normalize query for caching
    return query.toLowerCase().replace(/[^\w\s]/g, '').trim();
  }

  private adaptCachedResponse(cached: BotResponse, query: CreatorQuery): BotResponse {
    return {
      ...cached,
      id: `response_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      queryId: query.id,
      timestamp: new Date(),
      responseTime: 50 // Fast cache response
    };
  }

  private cacheResponse(response: BotResponse): void {
    // Cache responses with high confidence
    if (response.confidence > 0.7) {
      const cacheKey = this.generateCacheKey(response.queryId);
      this.responseCache.set(cacheKey, response);
    }
  }

  private storeQuery(query: CreatorQuery): void {
    const history = this.queryHistory.get(query.creatorId) || [];
    history.push(query);
    
    // Keep only last 50 queries per creator
    if (history.length > 50) {
      history.shift();
    }
    
    this.queryHistory.set(query.creatorId, history);
  }

  private initializeKnowledgeBase(): void {
    const defaultEntries: Omit<KnowledgeBase, 'id' | 'usageCount' | 'lastUpdated'>[] = [
      {
        category: 'payment',
        question: 'When will I receive my payment?',
        answer: 'Payments are typically processed within 7-14 business days after campaign completion and approval. You can check your payment status in the dashboard under "Payments" section.',
        keywords: ['payment', 'money', 'when', 'receive', 'processed'],
        confidence: 0.9
      },
      {
        category: 'payment',
        question: 'How do I update my payment information?',
        answer: 'You can update your payment information by going to Settings > Payment Methods in your dashboard. Make sure to verify your new payment method before removing the old one.',
        keywords: ['update', 'payment', 'information', 'method', 'bank'],
        confidence: 0.9
      },
      {
        category: 'campaign',
        question: 'How do I submit campaign deliverables?',
        answer: 'To submit your deliverables, go to your active campaign in the dashboard and click "Upload Content". Make sure your content meets the brief requirements before submitting.',
        keywords: ['submit', 'deliverables', 'upload', 'content', 'campaign'],
        confidence: 0.9
      },
      {
        category: 'campaign',
        question: 'Can I modify a campaign after accepting it?',
        answer: 'Minor modifications may be possible depending on the campaign stage. Please contact your campaign manager or use the chat feature in your campaign dashboard to discuss any changes.',
        keywords: ['modify', 'change', 'campaign', 'after', 'accepting'],
        confidence: 0.8
      },
      {
        category: 'technical',
        question: 'I cannot log into my account',
        answer: 'If you\'re having trouble logging in, try resetting your password using the "Forgot Password" link. If the issue persists, clear your browser cache or try a different browser.',
        keywords: ['login', 'account', 'password', 'access', 'trouble'],
        confidence: 0.9
      },
      {
        category: 'general',
        question: 'How do I contact support?',
        answer: 'You can contact our support team through the chat widget in your dashboard, email us at support@gamefluence.com, or use this AI assistant for immediate help.',
        keywords: ['contact', 'support', 'help', 'assistance'],
        confidence: 0.9
      }
    ];

    defaultEntries.forEach(entry => {
      this.addKnowledge(entry);
    });
  }
}

// Export singleton instance
export const creatorServiceBot = new CreatorServiceBot();