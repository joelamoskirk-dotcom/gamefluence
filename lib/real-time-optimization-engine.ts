// Real-Time Optimization Engine v3.0
// Continuous learning and campaign optimization during live campaigns

export interface RealTimeMetrics {
  timestamp: Date;
  campaignId: string;
  creatorId: string;
  platform: string;
  metrics: {
    reach: number;
    impressions: number;
    engagement: number;
    clicks: number;
    conversions: number;
    cost: number;
    ctr: number;
    cpm: number;
    cpa: number;
  };
  audienceData: {
    demographics: Record<string, number>;
    interests: Record<string, number>;
    behaviors: Record<string, number>;
    deviceTypes: Record<string, number>;
  };
  contentPerformance: {
    format: string;
    duration: number;
    engagementRate: number;
    shareRate: number;
    saveRate: number;
    commentSentiment: number;
  };
}

export interface OptimizationSignal {
  signalType: 'performance_drop' | 'audience_shift' | 'content_fatigue' | 'opportunity_spike';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  description: string;
  affectedMetrics: string[];
  recommendedActions: Array<{
    action: string;
    priority: number;
    expectedImpact: number;
    implementationCost: number;
    timeframe: string;
  }>;
  autoExecutable: boolean;
}

export interface LiveOptimization {
  optimizationId: string;
  campaignId: string;
  timestamp: Date;
  trigger: OptimizationSignal;
  changes: Array<{
    parameter: string;
    oldValue: any;
    newValue: any;
    reason: string;
  }>;
  executedAt: Date;
  results: {
    beforeMetrics: RealTimeMetrics;
    afterMetrics?: RealTimeMetrics;
    impactMeasured: boolean;
    performanceChange: number;
  };
}

export interface PredictiveAlert {
  alertId: string;
  campaignId: string;
  predictedIssue: string;
  probability: number;
  timeToImpact: number; // hours
  potentialImpact: number;
  preventiveActions: Array<{
    action: string;
    effectiveness: number;
    cost: number;
  }>;
}

export class RealTimeOptimizationEngine {
  private metricsBuffer: Map<string, RealTimeMetrics[]> = new Map();
  private optimizationHistory: Map<string, LiveOptimization[]> = new Map();
  private activeAlerts: Map<string, PredictiveAlert[]> = new Map();
  private learningModels: Map<string, any> = new Map();
  private optimizationRules: Map<string, any> = new Map();

  constructor() {
    this.initializeOptimizationRules();
    this.startRealTimeMonitoring();
  }

  // Initialize optimization rules based on Campaign 1 learnings
  private initializeOptimizationRules(): void {
    this.optimizationRules.set('performance_thresholds', {
      ctr_warning: 2.5, // Below 2.5% CTR triggers warning
      ctr_critical: 1.8, // Below 1.8% CTR triggers immediate action
      cpm_warning: 12.0, // Above $12 CPM triggers warning
      cpm_critical: 18.0, // Above $18 CPM triggers immediate action
      engagement_drop: 0.25, // 25% drop in engagement triggers alert
      conversion_drop: 0.30 // 30% drop in conversions triggers alert
    });

    this.optimizationRules.set('audience_optimization', {
      demographic_shift_threshold: 0.15, // 15% shift triggers rebalancing
      interest_decay_threshold: 0.20, // 20% interest decay triggers content pivot
      device_performance_gap: 0.25, // 25% performance gap triggers device optimization
      time_of_day_optimization: true, // Enable automatic time optimization
      frequency_capping: 5 // Maximum frequency before diminishing returns
    });
  }

  // Start real-time monitoring and optimization
  private startRealTimeMonitoring(): void {
    // Monitor every 5 minutes for performance signals
    setInterval(() => {
      this.analyzePerformanceSignals();
    }, 5 * 60 * 1000);

    // Deep analysis every 30 minutes
    setInterval(() => {
      this.performDeepOptimizationAnalysis();
    }, 30 * 60 * 1000);

    // Predictive alerts every hour
    setInterval(() => {
      this.generatePredictiveAlerts();
    }, 60 * 60 * 1000);
  }

  // Ingest real-time metrics
  ingestMetrics(metrics: RealTimeMetrics): void {
    const campaignId = metrics.campaignId;
    
    if (!this.metricsBuffer.has(campaignId)) {
      this.metricsBuffer.set(campaignId, []);
    }
    
    const buffer = this.metricsBuffer.get(campaignId)!;
    buffer.push(metrics);
    
    // Keep only last 1000 data points per campaign
    if (buffer.length > 1000) {
      buffer.shift();
    }
    
    // Immediate analysis for critical signals
    this.checkForImmediateOptimizations(metrics);
  }

  // Check for immediate optimization opportunities
  private checkForImmediateOptimizations(metrics: RealTimeMetrics): void {
    const signals: OptimizationSignal[] = [];
    const thresholds = this.optimizationRules.get('performance_thresholds');
    
    // Check CTR performance
    if (metrics.metrics.ctr < thresholds.ctr_critical) {
      signals.push({
        signalType: 'performance_drop',
        severity: 'critical',
        confidence: 0.92,
        description: `CTR dropped to ${metrics.metrics.ctr}% (critical threshold: ${thresholds.ctr_critical}%)`,
        affectedMetrics: ['ctr', 'conversions'],
        recommendedActions: [
          {
            action: 'Pause underperforming creative and activate backup',
            priority: 1,
            expectedImpact: 0.35,
            implementationCost: 0,
            timeframe: 'immediate'
          }
        ],
        autoExecutable: true
      });
    }

    // Check CPM performance
    if (metrics.metrics.cpm > thresholds.cpm_critical) {
      signals.push({
        signalType: 'performance_drop',
        severity: 'high',
        confidence: 0.88,
        description: `CPM increased to $${metrics.metrics.cpm} (critical threshold: $${thresholds.cpm_critical})`,
        affectedMetrics: ['cpm', 'cpa', 'roi'],
        recommendedActions: [
          {
            action: 'Reduce bid amounts by 15% and optimize audience targeting',
            priority: 2,
            expectedImpact: 0.22,
            implementationCost: 0,
            timeframe: '15 minutes'
          },
          {
            action: 'Shift budget to better performing creators',
            priority: 3,
            expectedImpact: 0.18,
            implementationCost: 500,
            timeframe: '1 hour'
          }
        ],
        autoExecutable: false
      });
    }

    // Process signals if any found
    if (signals.length > 0) {
      signals.forEach(signal => this.processOptimizationSignal(signal, metrics));
    }
  }

  // Process optimization signals and execute actions
  private processOptimizationSignal(signal: OptimizationSignal, metrics: RealTimeMetrics): void {
    const optimization: LiveOptimization = {
      optimizationId: `opt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      campaignId: metrics.campaignId,
      timestamp: new Date(),
      trigger: signal,
      changes: [],
      executedAt: new Date(),
      results: {
        beforeMetrics: metrics,
        impactMeasured: false,
        performanceChange: 0
      }
    };

    // Execute auto-executable optimizations
    if (signal.autoExecutable) {
      signal.recommendedActions
        .filter(action => action.priority <= 2)
        .forEach(action => {
          this.executeOptimization(action, optimization);
        });
    }

    // Store optimization
    if (!this.optimizationHistory.has(metrics.campaignId)) {
      this.optimizationHistory.set(metrics.campaignId, []);
    }
    this.optimizationHistory.get(metrics.campaignId)!.push(optimization);
  }

  // Execute specific optimization action
  private executeOptimization(action: any, optimization: LiveOptimization): void {
    switch (action.action) {
      case 'Pause underperforming creative and activate backup':
        optimization.changes.push({
          parameter: 'creative_status',
          oldValue: 'active',
          newValue: 'paused',
          reason: 'CTR below critical threshold'
        });
        optimization.changes.push({
          parameter: 'backup_creative_status',
          oldValue: 'standby',
          newValue: 'active',
          reason: 'Activated due to primary creative underperformance'
        });
        break;
        
      case 'Reduce bid amounts by 15% and optimize audience targeting':
        optimization.changes.push({
          parameter: 'bid_amount',
          oldValue: 'current_bid',
          newValue: 'current_bid * 0.85',
          reason: 'CPM above critical threshold'
        });
        optimization.changes.push({
          parameter: 'audience_targeting',
          oldValue: 'broad',
          newValue: 'optimized_lookalike',
          reason: 'Improve cost efficiency'
        });
        break;
    }
  }

  // Analyze performance signals across all campaigns
  private analyzePerformanceSignals(): void {
    this.metricsBuffer.forEach((metrics, campaignId) => {
      if (metrics.length < 5) return; // Need minimum data points
      
      const recentMetrics = metrics.slice(-12); // Last hour of 5-minute intervals
      const signals = this.detectPerformancePatterns(recentMetrics, campaignId);
      
      signals.forEach(signal => {
        if (recentMetrics.length > 0) {
          this.processOptimizationSignal(signal, recentMetrics[recentMetrics.length - 1]);
        }
      });
    });
  }

  // Detect performance patterns and anomalies
  private detectPerformancePatterns(metrics: RealTimeMetrics[], campaignId: string): OptimizationSignal[] {
    const signals: OptimizationSignal[] = [];
    
    if (metrics.length < 5) return signals;
    
    // Calculate trends
    const ctrTrend = this.calculateTrend(metrics.map(m => m.metrics.ctr));
    const engagementTrend = this.calculateTrend(metrics.map(m => m.metrics.engagement));
    const conversionTrend = this.calculateTrend(metrics.map(m => m.metrics.conversions));
    
    // Detect declining CTR trend
    if (ctrTrend < -0.15) { // 15% decline
      signals.push({
        signalType: 'performance_drop',
        severity: 'medium',
        confidence: 0.78,
        description: `CTR showing declining trend of ${(ctrTrend * 100).toFixed(1)}%`,
        affectedMetrics: ['ctr', 'clicks'],
        recommendedActions: [
          {
            action: 'Test new creative variations',
            priority: 2,
            expectedImpact: 0.25,
            implementationCost: 2000,
            timeframe: '2-4 hours'
          }
        ],
        autoExecutable: false
      });
    }
    
    return signals;
  }

  // Calculate trend from array of values
  private calculateTrend(values: number[]): number {
    if (values.length < 2) return 0;
    
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
    
    return (secondAvg - firstAvg) / firstAvg;
  }

  // Perform deep optimization analysis
  private performDeepOptimizationAnalysis(): void {
    this.metricsBuffer.forEach((metrics, campaignId) => {
      if (metrics.length < 20) return; // Need substantial data
      
      // Analyze audience shifts
      this.analyzeAudienceShifts(metrics, campaignId);
      
      // Analyze content performance patterns
      this.analyzeContentPerformance(metrics, campaignId);
      
      // Analyze cross-creator synergies
      this.analyzeCrossCreatorSynergies(metrics, campaignId);
      
      // Update learning models
      this.updateLearningModels(metrics, campaignId);
    });
  }

  // Analyze audience demographic and behavioral shifts
  private analyzeAudienceShifts(metrics: RealTimeMetrics[], campaignId: string): void {
    const recent = metrics.slice(-24); // Last 2 hours
    const baseline = metrics.slice(-72, -48); // 2-4 hours ago baseline
    
    if (baseline.length === 0 || recent.length === 0) return;
    
    // Calculate demographic shifts
    const recentDemo = this.aggregateAudienceData(recent, 'demographics');
    const baselineDemo = this.aggregateAudienceData(baseline, 'demographics');
    
    Object.keys(recentDemo).forEach(demographic => {
      const shift = Math.abs(recentDemo[demographic] - (baselineDemo[demographic] || 0));
      const threshold = this.optimizationRules.get('audience_optimization').demographic_shift_threshold;
      
      if (shift > threshold) {
        const signal: OptimizationSignal = {
          signalType: 'audience_shift',
          severity: shift > threshold * 2 ? 'high' : 'medium',
          confidence: 0.72,
          description: `Significant shift in ${demographic} audience: ${(shift * 100).toFixed(1)}%`,
          affectedMetrics: ['reach', 'engagement', 'conversions'],
          recommendedActions: [
            {
              action: `Adjust targeting to optimize for ${demographic} segment`,
              priority: 3,
              expectedImpact: 0.15,
              implementationCost: 1000,
              timeframe: '1-2 hours'
            }
          ],
          autoExecutable: false
        };
        
        if (recent.length > 0) {
          this.processOptimizationSignal(signal, recent[recent.length - 1]);
        }
      }
    });
  }

  // Aggregate audience data from metrics
  private aggregateAudienceData(metrics: RealTimeMetrics[], dataType: keyof RealTimeMetrics['audienceData']): Record<string, number> {
    const aggregated: Record<string, number> = {};
    let totalWeight = 0;
    
    metrics.forEach(metric => {
      const weight = metric.metrics.impressions;
      totalWeight += weight;
      
      Object.entries(metric.audienceData[dataType]).forEach(([key, value]) => {
        aggregated[key] = (aggregated[key] || 0) + (value * weight);
      });
    });
    
    // Normalize by total weight
    Object.keys(aggregated).forEach(key => {
      aggregated[key] = aggregated[key] / totalWeight;
    });
    
    return aggregated;
  }

  // Analyze content performance patterns
  private analyzeContentPerformance(metrics: RealTimeMetrics[], campaignId: string): void {
    const contentGroups = this.groupMetricsByContent(metrics);
    
    Object.entries(contentGroups).forEach(([contentType, contentMetrics]) => {
      const avgEngagement = contentMetrics.reduce((sum, m) => sum + m.contentPerformance.engagementRate, 0) / contentMetrics.length;
      const avgShareRate = contentMetrics.reduce((sum, m) => sum + m.contentPerformance.shareRate, 0) / contentMetrics.length;
      
      // Detect content fatigue
      const recentPerformance = contentMetrics.slice(-6);
      const earlierPerformance = contentMetrics.slice(-12, -6);
      
      if (recentPerformance.length > 0 && earlierPerformance.length > 0) {
        const recentAvg = recentPerformance.reduce((sum, m) => sum + m.contentPerformance.engagementRate, 0) / recentPerformance.length;
        const earlierAvg = earlierPerformance.reduce((sum, m) => sum + m.contentPerformance.engagementRate, 0) / earlierPerformance.length;
        
        const decline = (earlierAvg - recentAvg) / earlierAvg;
        
        if (decline > 0.20) { // 20% decline indicates fatigue
          const signal: OptimizationSignal = {
            signalType: 'content_fatigue',
            severity: 'medium',
            confidence: 0.75,
            description: `Content fatigue detected for ${contentType}: ${(decline * 100).toFixed(1)}% engagement decline`,
            affectedMetrics: ['engagement', 'shareRate'],
            recommendedActions: [
              {
                action: `Introduce new ${contentType} variations or pause temporarily`,
                priority: 2,
                expectedImpact: 0.20,
                implementationCost: 3000,
                timeframe: '4-6 hours'
              }
            ],
            autoExecutable: false
          };
          
          if (contentMetrics.length > 0) {
            this.processOptimizationSignal(signal, contentMetrics[contentMetrics.length - 1]);
          }
        }
      }
    });
  }

  // Group metrics by content type
  private groupMetricsByContent(metrics: RealTimeMetrics[]): Record<string, RealTimeMetrics[]> {
    const groups: Record<string, RealTimeMetrics[]> = {};
    
    metrics.forEach(metric => {
      const contentType = metric.contentPerformance.format;
      if (!groups[contentType]) {
        groups[contentType] = [];
      }
      groups[contentType].push(metric);
    });
    
    return groups;
  }

  // Analyze cross-creator synergies in real-time
  private analyzeCrossCreatorSynergies(metrics: RealTimeMetrics[], campaignId: string): void {
    const creatorGroups = this.groupMetricsByCreator(metrics);
    const creators = Object.keys(creatorGroups);
    
    if (creators.length < 2) return;
    
    // Analyze timing synergies
    creators.forEach(creator1 => {
      creators.forEach(creator2 => {
        if (creator1 !== creator2) {
          const synergy = this.calculateRealTimeSynergy(
            creatorGroups[creator1],
            creatorGroups[creator2]
          );
          
          if (synergy.amplificationFactor > 1.25) { // 25% amplification
            const signal: OptimizationSignal = {
              signalType: 'opportunity_spike',
              severity: 'low',
              confidence: 0.68,
              description: `Strong synergy detected between ${creator1} and ${creator2}: ${((synergy.amplificationFactor - 1) * 100).toFixed(1)}% amplification`,
              affectedMetrics: ['reach', 'engagement'],
              recommendedActions: [
                {
                  action: `Coordinate content timing between ${creator1} and ${creator2}`,
                  priority: 4,
                  expectedImpact: synergy.amplificationFactor - 1,
                  implementationCost: 500,
                  timeframe: '2-3 hours'
                }
              ],
              autoExecutable: false
            };
            
            const recentMetrics = [...creatorGroups[creator1], ...creatorGroups[creator2]];
            if (recentMetrics.length > 0) {
              this.processOptimizationSignal(signal, recentMetrics[recentMetrics.length - 1]);
            }
          }
        }
      });
    });
  }

  // Group metrics by creator
  private groupMetricsByCreator(metrics: RealTimeMetrics[]): Record<string, RealTimeMetrics[]> {
    const groups: Record<string, RealTimeMetrics[]> = {};
    
    metrics.forEach(metric => {
      const creator = metric.creatorId;
      if (!groups[creator]) {
        groups[creator] = [];
      }
      groups[creator].push(metric);
    });
    
    return groups;
  }

  // Calculate real-time synergy between two creators
  private calculateRealTimeSynergy(creator1Metrics: RealTimeMetrics[], creator2Metrics: RealTimeMetrics[]): {
    amplificationFactor: number;
    confidence: number;
  } {
    // Find overlapping time periods
    const overlaps = this.findTemporalOverlaps(creator1Metrics, creator2Metrics);
    
    if (overlaps.length === 0) {
      return { amplificationFactor: 1.0, confidence: 0.0 };
    }
    
    // Calculate performance during overlaps vs individual performance
    const overlapPerformance = overlaps.reduce((sum, overlap) => {
      return sum + overlap.creator1Metric.metrics.engagement + overlap.creator2Metric.metrics.engagement;
    }, 0) / overlaps.length;
    
    const individualPerformance = (
      creator1Metrics.reduce((sum, m) => sum + m.metrics.engagement, 0) / creator1Metrics.length +
      creator2Metrics.reduce((sum, m) => sum + m.metrics.engagement, 0) / creator2Metrics.length
    ) / 2;
    
    const amplificationFactor = overlapPerformance / individualPerformance;
    const confidence = Math.min(overlaps.length / 10, 1.0); // More overlaps = higher confidence
    
    return { amplificationFactor, confidence };
  }

  // Find temporal overlaps between creator activities
  private findTemporalOverlaps(creator1Metrics: RealTimeMetrics[], creator2Metrics: RealTimeMetrics[]): Array<{
    creator1Metric: RealTimeMetrics;
    creator2Metric: RealTimeMetrics;
    timeDiff: number;
  }> {
    const overlaps: Array<{
      creator1Metric: RealTimeMetrics;
      creator2Metric: RealTimeMetrics;
      timeDiff: number;
    }> = [];
    
    creator1Metrics.forEach(m1 => {
      creator2Metrics.forEach(m2 => {
        const timeDiff = Math.abs(m1.timestamp.getTime() - m2.timestamp.getTime());
        if (timeDiff <= 30 * 60 * 1000) { // Within 30 minutes
          overlaps.push({
            creator1Metric: m1,
            creator2Metric: m2,
            timeDiff
          });
        }
      });
    });
    
    return overlaps.sort((a, b) => a.timeDiff - b.timeDiff);
  }

  // Update learning models with new data
  private updateLearningModels(metrics: RealTimeMetrics[], campaignId: string): void {
    const model = this.learningModels.get(campaignId) || {
      performancePatterns: {},
      audienceInsights: {},
      contentOptimization: {},
      timingOptimization: {},
      lastUpdated: new Date()
    };
    
    // Update performance patterns
    this.updatePerformancePatterns(model, metrics);
    
    // Update audience insights
    this.updateAudienceInsights(model, metrics);
    
    // Update content optimization insights
    this.updateContentOptimization(model, metrics);
    
    // Update timing optimization
    this.updateTimingOptimization(model, metrics);
    
    model.lastUpdated = new Date();
    this.learningModels.set(campaignId, model);
  }

  // Update performance patterns in learning model
  private updatePerformancePatterns(model: any, metrics: RealTimeMetrics[]): void {
    const recent = metrics.slice(-24); // Last 2 hours
    
    // Calculate average performance by hour
    const hourlyPerformance: Record<number, { ctr: number; engagement: number; conversions: number; count: number }> = {};
    
    recent.forEach(metric => {
      const hour = metric.timestamp.getHours();
      if (!hourlyPerformance[hour]) {
        hourlyPerformance[hour] = { ctr: 0, engagement: 0, conversions: 0, count: 0 };
      }
      
      hourlyPerformance[hour].ctr += metric.metrics.ctr;
      hourlyPerformance[hour].engagement += metric.metrics.engagement;
      hourlyPerformance[hour].conversions += metric.metrics.conversions;
      hourlyPerformance[hour].count++;
    });
    
    // Average out the performance
    Object.keys(hourlyPerformance).forEach(hour => {
      const h = parseInt(hour);
      const perf = hourlyPerformance[h];
      model.performancePatterns[h] = {
        avgCtr: perf.ctr / perf.count,
        avgEngagement: perf.engagement / perf.count,
        avgConversions: perf.conversions / perf.count,
        confidence: Math.min(perf.count / 5, 1.0) // Higher confidence with more data points
      };
    });
  }

  // Update audience insights in learning model
  private updateAudienceInsights(model: any, metrics: RealTimeMetrics[]): void {
    const recent = metrics.slice(-48); // Last 4 hours
    
    // Aggregate audience data with performance weighting
    const audiencePerformance: Record<string, { performance: number; weight: number }> = {};
    
    recent.forEach(metric => {
      const performanceScore = (metric.metrics.ctr * 0.4) + (metric.metrics.engagement / 1000 * 0.6);
      const weight = metric.metrics.impressions;
      
      Object.entries(metric.audienceData.demographics).forEach(([demo, percentage]) => {
        const key = `demo_${demo}`;
        if (!audiencePerformance[key]) {
          audiencePerformance[key] = { performance: 0, weight: 0 };
        }
        audiencePerformance[key].performance += performanceScore * percentage * weight;
        audiencePerformance[key].weight += weight * percentage;
      });
    });
    
    // Calculate weighted average performance by audience segment
    Object.keys(audiencePerformance).forEach(key => {
      const data = audiencePerformance[key];
      model.audienceInsights[key] = {
        avgPerformance: data.performance / data.weight,
        confidence: Math.min(data.weight / 10000, 1.0)
      };
    });
  }

  // Update content optimization insights
  private updateContentOptimization(model: any, metrics: RealTimeMetrics[]): void {
    const contentGroups = this.groupMetricsByContent(metrics.slice(-72)); // Last 6 hours
    
    Object.entries(contentGroups).forEach(([contentType, contentMetrics]) => {
      const avgEngagement = contentMetrics.reduce((sum, m) => sum + m.contentPerformance.engagementRate, 0) / contentMetrics.length;
      const avgShareRate = contentMetrics.reduce((sum, m) => sum + m.contentPerformance.shareRate, 0) / contentMetrics.length;
      const avgSentiment = contentMetrics.reduce((sum, m) => sum + m.contentPerformance.commentSentiment, 0) / contentMetrics.length;
      
      model.contentOptimization[contentType] = {
        avgEngagement,
        avgShareRate,
        avgSentiment,
        optimalDuration: this.calculateOptimalDuration(contentMetrics),
        confidence: Math.min(contentMetrics.length / 10, 1.0)
      };
    });
  }

  // Calculate optimal content duration
  private calculateOptimalDuration(contentMetrics: RealTimeMetrics[]): number {
    const durationPerformance = contentMetrics.map(m => ({
      duration: m.contentPerformance.duration,
      performance: m.contentPerformance.engagementRate
    }));
    
    // Find duration with highest average performance
    const durationGroups: Record<number, { totalPerf: number; count: number }> = {};
    
    durationPerformance.forEach(({ duration, performance }) => {
      const bucket = Math.floor(duration / 10) * 10; // Group by 10-second buckets
      if (!durationGroups[bucket]) {
        durationGroups[bucket] = { totalPerf: 0, count: 0 };
      }
      durationGroups[bucket].totalPerf += performance;
      durationGroups[bucket].count++;
    });
    
    let bestDuration = 30; // Default
    let bestPerformance = 0;
    
    Object.entries(durationGroups).forEach(([duration, data]) => {
      const avgPerf = data.totalPerf / data.count;
      if (avgPerf > bestPerformance && data.count >= 3) { // Need at least 3 samples
        bestPerformance = avgPerf;
        bestDuration = parseInt(duration);
      }
    });
    
    return bestDuration;
  }

  // Update timing optimization insights
  private updateTimingOptimization(model: any, metrics: RealTimeMetrics[]): void {
    const recent = metrics.slice(-168); // Last 14 hours for day-of-week patterns
    
    const timingPerformance: Record<string, { performance: number; count: number }> = {};
    
    recent.forEach(metric => {
      const hour = metric.timestamp.getHours();
      const dayOfWeek = metric.timestamp.getDay();
      const key = `${dayOfWeek}_${hour}`;
      
      const performance = (metric.metrics.ctr * 0.3) + 
                         (metric.metrics.engagement / 1000 * 0.4) + 
                         (metric.metrics.conversions / 100 * 0.3);
      
      if (!timingPerformance[key]) {
        timingPerformance[key] = { performance: 0, count: 0 };
      }
      
      timingPerformance[key].performance += performance;
      timingPerformance[key].count++;
    });
    
    // Calculate average performance by time slot
    Object.keys(timingPerformance).forEach(key => {
      const data = timingPerformance[key];
      model.timingOptimization[key] = {
        avgPerformance: data.performance / data.count,
        confidence: Math.min(data.count / 5, 1.0)
      };
    });
  }

  // Generate predictive alerts
  private generatePredictiveAlerts(): void {
    this.metricsBuffer.forEach((metrics, campaignId) => {
      if (metrics.length < 12) return; // Need at least 1 hour of data
      
      const alerts: PredictiveAlert[] = [];
      
      // Predict performance degradation
      const degradationAlert = this.predictPerformanceDegradation(metrics, campaignId);
      if (degradationAlert) alerts.push(degradationAlert);
      
      // Predict audience fatigue
      const fatigueAlert = this.predictAudienceFatigue(metrics, campaignId);
      if (fatigueAlert) alerts.push(fatigueAlert);
      
      // Predict budget depletion
      const budgetAlert = this.predictBudgetDepletion(metrics, campaignId);
      if (budgetAlert) alerts.push(budgetAlert);
      
      // Store alerts
      this.activeAlerts.set(campaignId, alerts);
    });
  }

  // Predict performance degradation
  private predictPerformanceDegradation(metrics: RealTimeMetrics[], campaignId: string): PredictiveAlert | null {
    const recent = metrics.slice(-12); // Last hour
    const earlier = metrics.slice(-24, -12); // Previous hour
    
    if (recent.length < 6 || earlier.length < 6) return null;
    
    const recentAvgCtr = recent.reduce((sum, m) => sum + m.metrics.ctr, 0) / recent.length;
    const earlierAvgCtr = earlier.reduce((sum, m) => sum + m.metrics.ctr, 0) / earlier.length;
    
    const decline = (earlierAvgCtr - recentAvgCtr) / earlierAvgCtr;
    
    if (decline > 0.10) { // 10% decline trend
      const timeToImpact = this.calculateTimeToImpact(decline, 0.25); // Time until 25% decline
      
      return {
        alertId: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        campaignId,
        predictedIssue: 'Performance Degradation',
        probability: Math.min(decline * 5, 0.95), // Higher decline = higher probability
        timeToImpact,
        potentialImpact: decline * 2, // Estimate potential impact
        preventiveActions: [
          {
            action: 'Refresh creative assets',
            effectiveness: 0.70,
            cost: 3000
          },
          {
            action: 'Adjust audience targeting',
            effectiveness: 0.55,
            cost: 1000
          },
          {
            action: 'Optimize posting schedule',
            effectiveness: 0.40,
            cost: 500
          }
        ]
      };
    }
    
    return null;
  }

  // Calculate time to impact in hours
  private calculateTimeToImpact(currentDecline: number, targetDecline: number): number {
    if (currentDecline >= targetDecline) return 0;
    
    // Simple linear projection (in production, would use more sophisticated modeling)
    const declineRate = currentDecline / 1; // Assume current decline happened over 1 hour
    const remainingDecline = targetDecline - currentDecline;
    
    return Math.max(remainingDecline / declineRate, 0.5); // Minimum 30 minutes
  } 
 // Predict audience fatigue
  private predictAudienceFatigue(metrics: RealTimeMetrics[], campaignId: string): PredictiveAlert | null {
    const recent = metrics.slice(-24); // Last 2 hours
    
    if (recent.length < 12) return null;
    
    // Calculate frequency distribution
    const frequencyMap: Record<string, number> = {};
    recent.forEach(metric => {
      Object.keys(metric.audienceData.demographics).forEach(demo => {
        frequencyMap[demo] = (frequencyMap[demo] || 0) + 1;
      });
    });
    
    // Check for over-exposure
    const overExposed = Object.entries(frequencyMap).filter(([demo, freq]) => freq > 8); // More than 8 exposures in 2 hours
    
    if (overExposed.length > 0) {
      return {
        alertId: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        campaignId,
        predictedIssue: 'Audience Fatigue',
        probability: 0.65,
        timeToImpact: 2, // 2 hours
        potentialImpact: 0.20, // 20% performance drop
        preventiveActions: [
          {
            action: 'Implement frequency capping',
            effectiveness: 0.80,
            cost: 0
          },
          {
            action: 'Expand audience targeting',
            effectiveness: 0.65,
            cost: 2000
          }
        ]
      };
    }
    
    return null;
  }

  // Predict budget depletion
  private predictBudgetDepletion(metrics: RealTimeMetrics[], campaignId: string): PredictiveAlert | null {
    const recent = metrics.slice(-12); // Last hour
    
    if (recent.length < 6) return null;
    
    const avgSpendRate = recent.reduce((sum, m) => sum + m.metrics.cost, 0) / recent.length;
    const dailySpendRate = avgSpendRate * 24; // Extrapolate to daily
    
    // Assume campaign has 7 days and $50k budget (would be dynamic in production)
    const remainingBudget = 50000 - (dailySpendRate * 3); // Assume 3 days elapsed
    const daysRemaining = 4;
    
    if (dailySpendRate * daysRemaining > remainingBudget * 1.2) { // 20% buffer
      return {
        alertId: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        campaignId,
        predictedIssue: 'Budget Depletion',
        probability: 0.85,
        timeToImpact: (remainingBudget / dailySpendRate) * 24, // Hours until depletion
        potentialImpact: 1.0, // Campaign stops
        preventiveActions: [
          {
            action: 'Reduce bid amounts',
            effectiveness: 0.70,
            cost: 0
          },
          {
            action: 'Pause low-performing creatives',
            effectiveness: 0.60,
            cost: 0
          },
          {
            action: 'Request budget increase',
            effectiveness: 0.90,
            cost: 10000
          }
        ]
      };
    }
    
    return null;
  }

  // Public API methods
  getCampaignOptimizations(campaignId: string): LiveOptimization[] {
    return this.optimizationHistory.get(campaignId) || [];
  }

  getActiveAlerts(campaignId: string): PredictiveAlert[] {
    return this.activeAlerts.get(campaignId) || [];
  }

  getLearningModel(campaignId: string): any {
    return this.learningModels.get(campaignId) || null;
  }

  // Get real-time recommendations
  getRealTimeRecommendations(campaignId: string): Array<{
    type: string;
    priority: number;
    recommendation: string;
    expectedImpact: number;
    confidence: number;
  }> {
    const metrics = this.metricsBuffer.get(campaignId);
    const model = this.learningModels.get(campaignId);
    
    if (!metrics || !model || metrics.length < 5) return [];
    
    const recommendations: Array<{
      type: string;
      priority: number;
      recommendation: string;
      expectedImpact: number;
      confidence: number;
    }> = [];
    
    // Timing recommendations
    const currentHour = new Date().getHours();
    const currentDay = new Date().getDay();
    const timingKey = `${currentDay}_${currentHour}`;
    
    if (model.timingOptimization[timingKey]?.confidence > 0.6) {
      const performance = model.timingOptimization[timingKey].avgPerformance;
      const avgPerformance = Object.values(model.timingOptimization)
        .reduce((sum: number, data: any) => sum + data.avgPerformance, 0) / Object.keys(model.timingOptimization).length;
      
      if (performance < avgPerformance * 0.8) {
        recommendations.push({
          type: 'timing',
          priority: 2,
          recommendation: 'Current time slot shows below-average performance. Consider shifting content to peak hours.',
          expectedImpact: 0.15,
          confidence: model.timingOptimization[timingKey].confidence
        });
      }
    }
    
    // Content recommendations
    const recentMetrics = metrics.slice(-6);
    const contentTypes = Array.from(new Set(recentMetrics.map(m => m.contentPerformance.format)));
    
    contentTypes.forEach(contentType => {
      if (model.contentOptimization[contentType]?.confidence > 0.5) {
        const optimalDuration = model.contentOptimization[contentType].optimalDuration;
        const currentDuration = recentMetrics
          .filter(m => m.contentPerformance.format === contentType)
          .reduce((sum, m) => sum + m.contentPerformance.duration, 0) / 
          recentMetrics.filter(m => m.contentPerformance.format === contentType).length;
        
        if (Math.abs(currentDuration - optimalDuration) > 10) {
          recommendations.push({
            type: 'content',
            priority: 3,
            recommendation: `Optimize ${contentType} duration to ${optimalDuration} seconds for better engagement.`,
            expectedImpact: 0.12,
            confidence: model.contentOptimization[contentType].confidence
          });
        }
      }
    });
    
    return recommendations.sort((a, b) => a.priority - b.priority);
  }

  // Get optimization impact analysis
  getOptimizationImpact(campaignId: string): {
    totalOptimizations: number;
    successfulOptimizations: number;
    averageImpact: number;
    cumulativeImpact: number;
    topOptimizations: Array<{
      optimization: string;
      impact: number;
      confidence: number;
    }>;
  } {
    const optimizations = this.optimizationHistory.get(campaignId) || [];
    
    const measuredOptimizations = optimizations.filter(opt => opt.results.impactMeasured);
    const successfulOptimizations = measuredOptimizations.filter(opt => opt.results.performanceChange > 0);
    
    const averageImpact = measuredOptimizations.length > 0
      ? measuredOptimizations.reduce((sum, opt) => sum + opt.results.performanceChange, 0) / measuredOptimizations.length
      : 0;
    
    const cumulativeImpact = measuredOptimizations.reduce((sum, opt) => sum + opt.results.performanceChange, 0);
    
    const topOptimizations = measuredOptimizations
      .sort((a, b) => b.results.performanceChange - a.results.performanceChange)
      .slice(0, 5)
      .map(opt => ({
        optimization: opt.trigger.description,
        impact: opt.results.performanceChange,
        confidence: opt.trigger.confidence
      }));
    
    return {
      totalOptimizations: optimizations.length,
      successfulOptimizations: successfulOptimizations.length,
      averageImpact,
      cumulativeImpact,
      topOptimizations
    };
  }

  // Simulate metrics ingestion for testing
  simulateMetricsIngestion(campaignId: string, creatorId: string): void {
    const mockMetric: RealTimeMetrics = {
      timestamp: new Date(),
      campaignId,
      creatorId,
      platform: 'tiktok',
      metrics: {
        reach: 50000 + Math.random() * 20000,
        impressions: 75000 + Math.random() * 30000,
        engagement: 3500 + Math.random() * 1500,
        clicks: 1200 + Math.random() * 500,
        conversions: 45 + Math.random() * 20,
        cost: 850 + Math.random() * 300,
        ctr: 1.5 + Math.random() * 2,
        cpm: 8 + Math.random() * 6,
        cpa: 15 + Math.random() * 10
      },
      audienceData: {
        demographics: {
          'female_18_24': 0.35 + Math.random() * 0.1,
          'male_18_24': 0.25 + Math.random() * 0.1,
          'female_25_34': 0.20 + Math.random() * 0.1,
          'male_25_34': 0.20 + Math.random() * 0.1
        },
        interests: {
          'gaming': 0.8 + Math.random() * 0.15,
          'racing': 0.6 + Math.random() * 0.2,
          'mobile_games': 0.7 + Math.random() * 0.15
        },
        behaviors: {
          'frequent_app_users': 0.65 + Math.random() * 0.2,
          'social_sharers': 0.45 + Math.random() * 0.2
        },
        deviceTypes: {
          'mobile': 0.85 + Math.random() * 0.1,
          'desktop': 0.15 + Math.random() * 0.1
        }
      },
      contentPerformance: {
        format: ['challenge', 'tutorial', 'gameplay', 'collaboration'][Math.floor(Math.random() * 4)],
        duration: 30 + Math.random() * 60,
        engagementRate: 6 + Math.random() * 4,
        shareRate: 2 + Math.random() * 3,
        saveRate: 1 + Math.random() * 2,
        commentSentiment: 0.6 + Math.random() * 0.3
      }
    };
    
    this.ingestMetrics(mockMetric);
  }
}

// Export singleton instance
export const realTimeOptimizationEngine = new RealTimeOptimizationEngine();