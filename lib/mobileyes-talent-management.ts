// Mobileyes Talent Management System
// AU-first talent representation for live video creators
// IMG Models for streamers — personal, professional, ongoing

import { PlatformVerificationEngine, VerificationPlatform, ContentVerificationResult, BriefVerificationRequirements } from './platform-verification-engine';

export type TalentStatus = 'prospect' | 'onboarding' | 'active' | 'paused' | 'terminated';
export type BriefStatus = 'draft' | 'sent' | 'accepted' | 'declined' | 'in_progress' | 'delivered' | 'verified' | 'paid' | 'disputed';

export interface TalentProfile {
  id: string;
  status: TalentStatus;
  
  // Personal
  fullName: string;
  email: string;
  phone?: string;
  location: string; // City, Country
  timezone: string;
  
  // Platforms
  platforms: TalentPlatformLink[];
  primaryPlatform: VerificationPlatform;
  
  // Rates
  rateCard: RateCard;
  
  // Representation
  agreementSignedAt?: Date;
  agreementVersion: string;
  preExistingBrands: string[]; // Schedule A exclusions
  
  // Performance
  briefsCompleted: number;
  briefsDeclined: number;
  averageRating: number;
  reliabilityScore: number; // 0-100 based on on-time delivery
  totalEarnings: number;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface TalentPlatformLink {
  platform: VerificationPlatform;
  handle: string;
  url: string;
  followerCount: number;
  averageViewers?: number; // For live platforms
  verified: boolean;
}

export interface RateCard {
  fullDayRate: number; // AUD
  halfDayRate: number; // AUD
  perDeliverableRate: number; // AUD
  monthlyRetainer?: number; // AUD
  currency: 'AUD' | 'USD';
  lastReviewed: Date;
  nextReviewDate: Date;
}

export interface CampaignBrief {
  id: string;
  status: BriefStatus;
  
  // Brief Details
  brandName: string;
  campaignName: string;
  overview: string;
  
  // Assignment
  talentId: string;
  talentName: string;
  
  // Deliverables
  platform: VerificationPlatform;
  contentType: 'live_stream' | 'vod' | 'short_form' | 'live_mention';
  deliverables: string[];
  talkingPoints: string[];
  restrictions: string[];
  
  // Attribution
  attributionLink?: string;
  attributionCode?: string;
  chatCommand?: string;
  
  // Timing
  integrationTimestamp?: number; // seconds
  minimumDuration?: number; // seconds
  deadline: Date;
  
  // Financials
  grossFee: number; // Total fee from brand
  talentFee: number; // 80% to talent
  commission: number; // 20% to Mobileyes
  currency: 'AUD' | 'USD';
  
  // Source
  source: 'direct' | 'fabulate' | 'agency' | 'repeat';
  agencyName?: string;
  
  // Verification
  contentUrl?: string;
  verificationResult?: ContentVerificationResult;
  
  // Timestamps
  sentAt?: Date;
  respondedAt?: Date;
  deliveredAt?: Date;
  verifiedAt?: Date;
  paidAt?: Date;
  paymentDueDate?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface BriefAcceptanceFormData {
  briefId: string;
  talentId: string;
  accepted: boolean;
  acknowledgedTerms: boolean;
  confirmedRate: boolean;
  confirmedDeadline: boolean;
  confirmedDeliverables: boolean;
  notes?: string;
  signedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface ContentSubmission {
  briefId: string;
  talentId: string;
  contentUrl: string;
  submittedAt: Date;
  notes?: string;
}

// Input validation utilities
export class TalentInputValidator {
  static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  static readonly PHONE_REGEX = /^\+?[\d\s()-]{8,20}$/;
  static readonly URL_REGEX = /^https:\/\/[^\s]+$/;
  static readonly MAX_NAME_LENGTH = 100;
  static readonly MAX_NOTES_LENGTH = 1000;
  static readonly MAX_RATE = 100000; // $100,000 cap for sanity checking

  static validateEmail(email: string): boolean {
    return this.EMAIL_REGEX.test(email.trim());
  }

  static validatePhone(phone: string): boolean {
    if (!phone) return true; // optional
    return this.PHONE_REGEX.test(phone.trim());
  }

  static validateUrl(url: string): boolean {
    return this.URL_REGEX.test(url.trim());
  }

  static validateRate(rate: number): boolean {
    return rate > 0 && rate <= this.MAX_RATE && Number.isFinite(rate);
  }

  static sanitizeString(input: string, maxLength: number = 500): string {
    return input
      .trim()
      .slice(0, maxLength)
      .replace(/<[^>]*>/g, '') // Strip HTML tags
      .replace(/[<>"'&]/g, (char) => {
        const entities: Record<string, string> = { '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;' };
        return entities[char] || char;
      });
  }

  static validateTalentSignup(data: Partial<TalentProfile>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!data.fullName || data.fullName.trim().length < 2) {
      errors.push('Full name is required (minimum 2 characters)');
    }
    if (data.fullName && data.fullName.length > this.MAX_NAME_LENGTH) {
      errors.push('Full name exceeds maximum length');
    }
    if (!data.email || !this.validateEmail(data.email)) {
      errors.push('Valid email address is required');
    }
    if (data.phone && !this.validatePhone(data.phone)) {
      errors.push('Phone number format is invalid');
    }
    if (!data.location || data.location.trim().length < 3) {
      errors.push('Location is required');
    }
    if (!data.platforms || data.platforms.length === 0) {
      errors.push('At least one platform is required');
    }
    if (data.platforms) {
      for (const platform of data.platforms) {
        if (!this.validateUrl(platform.url)) {
          errors.push(`Invalid URL for ${platform.platform}: ${platform.url}`);
        }
      }
    }
    if (data.rateCard) {
      if (!this.validateRate(data.rateCard.fullDayRate)) errors.push('Invalid full day rate');
      if (!this.validateRate(data.rateCard.halfDayRate)) errors.push('Invalid half day rate');
      if (!this.validateRate(data.rateCard.perDeliverableRate)) errors.push('Invalid per-deliverable rate');
    }
    
    return { valid: errors.length === 0, errors };
  }
}

export class MobileyesTalentManagement {

  // ==========================================
  // TALENT ONBOARDING
  // ==========================================

  static createTalentProfile(data: Partial<TalentProfile>): TalentProfile {
    return {
      id: `talent_${Date.now()}`,
      status: 'onboarding',
      fullName: data.fullName || '',
      email: data.email || '',
      phone: data.phone,
      location: data.location || '',
      timezone: data.timezone || 'Australia/Sydney',
      platforms: data.platforms || [],
      primaryPlatform: data.primaryPlatform || 'kick',
      rateCard: data.rateCard || {
        fullDayRate: 0,
        halfDayRate: 0,
        perDeliverableRate: 0,
        currency: 'AUD',
        lastReviewed: new Date(),
        nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      },
      agreementVersion: '1.0',
      preExistingBrands: data.preExistingBrands || [],
      briefsCompleted: 0,
      briefsDeclined: 0,
      averageRating: 0,
      reliabilityScore: 100,
      totalEarnings: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
  }

  static signAgreement(talent: TalentProfile): TalentProfile {
    return {
      ...talent,
      status: 'active',
      agreementSignedAt: new Date(),
      updatedAt: new Date(),
    };
  }

  // ==========================================
  // BRIEF MANAGEMENT
  // ==========================================

  static createBrief(data: Partial<CampaignBrief>): CampaignBrief {
    const grossFee = data.grossFee || 0;
    const commission = grossFee * 0.2;
    const talentFee = grossFee - commission;

    return {
      id: `brief_${Date.now()}`,
      status: 'draft',
      brandName: data.brandName || '',
      campaignName: data.campaignName || '',
      overview: data.overview || '',
      talentId: data.talentId || '',
      talentName: data.talentName || '',
      platform: data.platform || 'kick',
      contentType: data.contentType || 'live_stream',
      deliverables: data.deliverables || [],
      talkingPoints: data.talkingPoints || [],
      restrictions: data.restrictions || [],
      attributionLink: data.attributionLink,
      attributionCode: data.attributionCode,
      chatCommand: data.chatCommand,
      integrationTimestamp: data.integrationTimestamp,
      minimumDuration: data.minimumDuration,
      deadline: data.deadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      grossFee,
      talentFee,
      commission,
      currency: data.currency || 'AUD',
      source: data.source || 'direct',
      agencyName: data.agencyName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static sendBriefToTalent(brief: CampaignBrief): CampaignBrief {
    return {
      ...brief,
      status: 'sent',
      sentAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static acceptBrief(brief: CampaignBrief, formData: BriefAcceptanceFormData): CampaignBrief {
    if (!formData.accepted || !formData.acknowledgedTerms || !formData.confirmedRate || 
        !formData.confirmedDeadline || !formData.confirmedDeliverables) {
      throw new Error('All acceptance fields must be confirmed');
    }

    return {
      ...brief,
      status: 'accepted',
      respondedAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static declineBrief(brief: CampaignBrief, reason?: string): CampaignBrief {
    return {
      ...brief,
      status: 'declined',
      respondedAt: new Date(),
      updatedAt: new Date(),
    };
  }

  // ==========================================
  // CONTENT SUBMISSION & VERIFICATION
  // ==========================================

  static async submitContent(
    brief: CampaignBrief, 
    submission: ContentSubmission
  ): Promise<CampaignBrief> {
    const requirements: BriefVerificationRequirements = {
      briefId: brief.id,
      platform: brief.platform,
      contentType: brief.contentType,
      attributionLink: brief.attributionLink,
      attributionCode: brief.attributionCode,
      chatCommand: brief.chatCommand,
      integrationTimestamp: brief.integrationTimestamp,
      integrationTimestampTolerance: 10,
      minimumDuration: brief.minimumDuration,
      talkingPoints: brief.talkingPoints,
      restrictions: brief.restrictions,
      disclosureRequired: true,
      deadlineDate: brief.deadline,
    };

    const verificationResult = await PlatformVerificationEngine.verifyContent(
      submission.contentUrl,
      requirements
    );

    const newStatus: BriefStatus = verificationResult.overallStatus === 'passed' 
      ? 'verified' 
      : 'delivered';

    return {
      ...brief,
      status: newStatus,
      contentUrl: submission.contentUrl,
      verificationResult,
      deliveredAt: submission.submittedAt,
      verifiedAt: verificationResult.overallStatus === 'passed' ? new Date() : undefined,
      paymentDueDate: verificationResult.paymentDueDate,
      updatedAt: new Date(),
    };
  }

  static markAsPaid(brief: CampaignBrief): CampaignBrief {
    return {
      ...brief,
      status: 'paid',
      paidAt: new Date(),
      updatedAt: new Date(),
    };
  }

  // ==========================================
  // RATE CALCULATIONS
  // ==========================================

  static calculateFees(grossFee: number): { talentFee: number; commission: number } {
    const commission = grossFee * 0.2;
    const talentFee = grossFee - commission;
    return { talentFee, commission };
  }

  static suggestRate(
    talent: TalentProfile, 
    contentType: CampaignBrief['contentType']
  ): number {
    switch (contentType) {
      case 'live_stream':
        return talent.rateCard.fullDayRate;
      case 'vod':
        return talent.rateCard.perDeliverableRate;
      case 'short_form':
        return Math.round(talent.rateCard.perDeliverableRate * 0.6);
      case 'live_mention':
        return Math.round(talent.rateCard.halfDayRate * 0.5);
    }
  }

  // ==========================================
  // ANALYTICS & REPORTING
  // ==========================================

  static getTalentStats(talent: TalentProfile, briefs: CampaignBrief[]) {
    const talentBriefs = briefs.filter(b => b.talentId === talent.id);
    const completedBriefs = talentBriefs.filter(b => b.status === 'verified' || b.status === 'paid');
    const totalEarned = completedBriefs.reduce((sum, b) => sum + b.talentFee, 0);
    const averagePerBrief = completedBriefs.length > 0 
      ? totalEarned / completedBriefs.length 
      : 0;

    return {
      totalBriefs: talentBriefs.length,
      completed: completedBriefs.length,
      declined: talentBriefs.filter(b => b.status === 'declined').length,
      inProgress: talentBriefs.filter(b => ['accepted', 'in_progress', 'delivered'].includes(b.status)).length,
      totalEarned,
      averagePerBrief,
      acceptanceRate: talentBriefs.length > 0 
        ? (talentBriefs.filter(b => b.status !== 'declined').length / talentBriefs.length) * 100 
        : 0,
      platformBreakdown: this.getPlatformBreakdown(completedBriefs),
    };
  }

  static getPlatformBreakdown(briefs: CampaignBrief[]): Record<VerificationPlatform, number> {
    return {
      kick: briefs.filter(b => b.platform === 'kick').length,
      twitch: briefs.filter(b => b.platform === 'twitch').length,
      youtube: briefs.filter(b => b.platform === 'youtube').length,
      tiktok: briefs.filter(b => b.platform === 'tiktok').length,
    };
  }

  // ==========================================
  // BRIEF ACCEPTANCE E-FORM DATA
  // ==========================================

  static getBriefAcceptanceFormFields(brief: CampaignBrief) {
    return {
      sections: [
        {
          title: 'Brief Overview',
          readOnly: true,
          fields: [
            { id: 'brand', label: 'Brand', value: brief.brandName },
            { id: 'campaign', label: 'Campaign', value: brief.campaignName },
            { id: 'overview', label: 'Overview', value: brief.overview },
            { id: 'platform', label: 'Platform', value: brief.platform },
            { id: 'contentType', label: 'Content Type', value: brief.contentType },
          ],
        },
        {
          title: 'Deliverables',
          readOnly: true,
          fields: [
            { id: 'deliverables', label: 'Required Deliverables', value: brief.deliverables.join('\n') },
            { id: 'talkingPoints', label: 'Talking Points', value: brief.talkingPoints.join('\n') },
            { id: 'restrictions', label: 'Restrictions', value: brief.restrictions.join('\n') },
            { id: 'deadline', label: 'Deadline', value: brief.deadline.toLocaleDateString() },
            { id: 'duration', label: 'Minimum Duration', value: brief.minimumDuration ? `${Math.round(brief.minimumDuration / 60)} minutes` : 'N/A' },
          ],
        },
        {
          title: 'Attribution',
          readOnly: true,
          fields: [
            { id: 'link', label: 'Attribution Link', value: brief.attributionLink || 'N/A' },
            { id: 'code', label: 'Promo Code', value: brief.attributionCode || 'N/A' },
            { id: 'chatCmd', label: 'Chat Command', value: brief.chatCommand || 'N/A' },
          ],
        },
        {
          title: 'Your Payment',
          readOnly: true,
          fields: [
            { id: 'grossFee', label: 'Campaign Fee (Gross)', value: `$${brief.grossFee.toLocaleString()} ${brief.currency}` },
            { id: 'commission', label: 'Mobileyes Commission (20%)', value: `-$${brief.commission.toLocaleString()} ${brief.currency}` },
            { id: 'talentFee', label: 'Your Payment (80%)', value: `$${brief.talentFee.toLocaleString()} ${brief.currency}`, highlight: true },
            { id: 'paymentTerms', label: 'Payment Terms', value: '4 business days after verification' },
          ],
        },
        {
          title: 'Acceptance',
          readOnly: false,
          fields: [
            { id: 'confirmedDeliverables', type: 'checkbox', label: 'I confirm I can deliver all listed deliverables', required: true },
            { id: 'confirmedDeadline', type: 'checkbox', label: `I confirm I can deliver by ${brief.deadline.toLocaleDateString()}`, required: true },
            { id: 'confirmedRate', type: 'checkbox', label: `I accept the fee of $${brief.talentFee.toLocaleString()} ${brief.currency} (80% of $${brief.grossFee.toLocaleString()})`, required: true },
            { id: 'acknowledgedTerms', type: 'checkbox', label: 'I acknowledge and agree to the Mobileyes Talent Management Agreement terms', required: true },
            { id: 'notes', type: 'textarea', label: 'Notes (optional)', required: false, placeholder: 'Any questions or schedule notes...' },
          ],
        },
      ],
    };
  }

  // ==========================================
  // DEMO DATA
  // ==========================================

  static getDemoTalent(): TalentProfile[] {
    return [
      {
        id: 'talent_001',
        status: 'active',
        fullName: 'Alex "StreamKing" Chen',
        email: 'alex@streamking.gg',
        phone: '+61 412 345 678',
        location: 'Sydney, Australia',
        timezone: 'Australia/Sydney',
        platforms: [
          { platform: 'kick', handle: 'StreamKingAU', url: 'https://kick.com/StreamKingAU', followerCount: 85000, averageViewers: 1200, verified: true },
          { platform: 'twitch', handle: 'StreamKingAU', url: 'https://twitch.tv/StreamKingAU', followerCount: 120000, averageViewers: 900, verified: true },
          { platform: 'youtube', handle: 'StreamKingAU', url: 'https://youtube.com/@StreamKingAU', followerCount: 250000, verified: true },
        ],
        primaryPlatform: 'kick',
        rateCard: { fullDayRate: 3500, halfDayRate: 2000, perDeliverableRate: 1500, currency: 'AUD', lastReviewed: new Date('2026-05-01'), nextReviewDate: new Date('2026-08-01') },
        agreementSignedAt: new Date('2026-04-15'),
        agreementVersion: '1.0',
        preExistingBrands: ['Monster Energy', 'HyperX'],
        briefsCompleted: 12,
        briefsDeclined: 3,
        averageRating: 4.8,
        reliabilityScore: 95,
        totalEarnings: 42000,
        createdAt: new Date('2026-04-15'),
        updatedAt: new Date('2026-06-01'),
      },
      {
        id: 'talent_002',
        status: 'active',
        fullName: 'Sarah "NightOwlGG" Park',
        email: 'sarah@nightowlgg.com',
        location: 'Melbourne, Australia',
        timezone: 'Australia/Melbourne',
        platforms: [
          { platform: 'twitch', handle: 'NightOwlGG', url: 'https://twitch.tv/NightOwlGG', followerCount: 95000, averageViewers: 800, verified: true },
          { platform: 'tiktok', handle: 'NightOwlGG', url: 'https://tiktok.com/@NightOwlGG', followerCount: 450000, verified: true },
          { platform: 'kick', handle: 'NightOwlGG', url: 'https://kick.com/NightOwlGG', followerCount: 35000, averageViewers: 400, verified: true },
        ],
        primaryPlatform: 'twitch',
        rateCard: { fullDayRate: 2800, halfDayRate: 1600, perDeliverableRate: 1200, currency: 'AUD', lastReviewed: new Date('2026-05-15'), nextReviewDate: new Date('2026-08-15') },
        agreementSignedAt: new Date('2026-05-01'),
        agreementVersion: '1.0',
        preExistingBrands: [],
        briefsCompleted: 8,
        briefsDeclined: 1,
        averageRating: 4.9,
        reliabilityScore: 100,
        totalEarnings: 28000,
        createdAt: new Date('2026-05-01'),
        updatedAt: new Date('2026-06-01'),
      },
      {
        id: 'talent_003',
        status: 'active',
        fullName: 'Jake "RacingJake" Williams',
        email: 'jake@racingjake.com.au',
        phone: '+61 423 456 789',
        location: 'Brisbane, Australia',
        timezone: 'Australia/Brisbane',
        platforms: [
          { platform: 'kick', handle: 'RacingJakeAU', url: 'https://kick.com/RacingJakeAU', followerCount: 62000, averageViewers: 950, verified: true },
          { platform: 'youtube', handle: 'RacingJakeAU', url: 'https://youtube.com/@RacingJakeAU', followerCount: 180000, verified: true },
        ],
        primaryPlatform: 'kick',
        rateCard: { fullDayRate: 2500, halfDayRate: 1400, perDeliverableRate: 1000, currency: 'AUD', lastReviewed: new Date('2026-04-01'), nextReviewDate: new Date('2026-07-01') },
        agreementSignedAt: new Date('2026-03-20'),
        agreementVersion: '1.0',
        preExistingBrands: ['Logitech'],
        briefsCompleted: 15,
        briefsDeclined: 2,
        averageRating: 4.7,
        reliabilityScore: 92,
        totalEarnings: 35000,
        createdAt: new Date('2026-03-20'),
        updatedAt: new Date('2026-06-01'),
      },
    ];
  }

  static getDemoBriefs(): CampaignBrief[] {
    return [
      {
        id: 'brief_001',
        status: 'sent',
        brandName: 'Razer',
        campaignName: 'Razer Viper V3 Launch Stream',
        overview: 'Live unboxing and gameplay session with the new Razer Viper V3 mouse. Focus on the lightweight design and sensor accuracy during competitive FPS gameplay.',
        talentId: 'talent_001',
        talentName: 'Alex "StreamKing" Chen',
        platform: 'kick',
        contentType: 'live_stream',
        deliverables: [
          'Minimum 2-hour live stream on Kick',
          'Unboxing segment in first 15 minutes',
          '30+ minutes of FPS gameplay using the mouse',
          'Chat command !razer with attribution link',
          'Pin attribution link in chat'
        ],
        talkingPoints: [
          'Lightweight design (49g)',
          'Focus Pro 30K sensor accuracy',
          'Optical switches with 0.2ms response',
          'Compare to previous mouse setup'
        ],
        restrictions: [
          'Do not mention competing brands (Logitech, SteelSeries)',
          'No negative commentary about the product',
          'Must disclose paid partnership'
        ],
        attributionLink: 'https://razer.a9o.net/StreamKingAU',
        chatCommand: '!razer',
        minimumDuration: 7200, // 2 hours
        integrationTimestamp: 300, // Unboxing at 5 minutes
        deadline: new Date('2026-06-20'),
        grossFee: 4000,
        talentFee: 3200,
        commission: 800,
        currency: 'AUD',
        source: 'direct',
        sentAt: new Date('2026-06-05'),
        createdAt: new Date('2026-06-03'),
        updatedAt: new Date('2026-06-05'),
      },
      {
        id: 'brief_002',
        status: 'accepted',
        brandName: 'Telstra Gaming',
        campaignName: 'Low Latency Gaming Challenge',
        overview: 'Sponsored stream segment demonstrating Telstra Gaming network performance. Play competitive games and highlight the low-latency connection.',
        talentId: 'talent_002',
        talentName: 'Sarah "NightOwlGG" Park',
        platform: 'twitch',
        contentType: 'live_stream',
        deliverables: [
          '3-hour competitive gaming stream',
          'Speed test on stream showing Telstra speeds',
          'Attribution panel added to Twitch profile',
          'Mention Telstra 3 times during stream'
        ],
        talkingPoints: [
          'Low latency for competitive gaming',
          'Consistent speeds during peak hours',
          'Telstra Gaming Network optimisation',
          'No packet loss during ranked matches'
        ],
        restrictions: [
          'Do not mention other ISPs',
          'No complaints about internet speed on stream',
          'Must show #ad in stream title'
        ],
        attributionLink: 'https://telstra.com.au/gaming?ref=NightOwlGG',
        minimumDuration: 10800, // 3 hours
        deadline: new Date('2026-06-25'),
        grossFee: 3500,
        talentFee: 2800,
        commission: 700,
        currency: 'AUD',
        source: 'fabulate',
        agencyName: 'Fabulate',
        sentAt: new Date('2026-06-02'),
        respondedAt: new Date('2026-06-03'),
        createdAt: new Date('2026-06-01'),
        updatedAt: new Date('2026-06-03'),
      },
      {
        id: 'brief_003',
        status: 'verified',
        brandName: 'DoorDash',
        campaignName: 'Game Night Fuel',
        overview: 'TikTok video showing DoorDash delivery arriving mid-gaming session. Natural, entertaining content showing how DoorDash fuels gaming sessions.',
        talentId: 'talent_003',
        talentName: 'Jake "RacingJake" Williams',
        platform: 'tiktok',
        contentType: 'short_form',
        deliverables: [
          '60-90 second TikTok video',
          'Show DoorDash app and delivery',
          'Include promo code in caption',
          'Branded content toggle enabled'
        ],
        talkingPoints: [
          'Quick delivery perfect for gaming sessions',
          'No need to pause the game',
          'Use code RACINGJAKE for $10 off',
          'Available 24/7 for late-night gaming'
        ],
        restrictions: [
          'No competitor food delivery apps visible',
          'Content must be family-friendly',
          'Must use TikTok branded content tag'
        ],
        attributionCode: 'RACINGJAKE',
        attributionLink: 'https://doordash.com.au/?code=RACINGJAKE',
        minimumDuration: 60,
        deadline: new Date('2026-06-15'),
        grossFee: 1800,
        talentFee: 1440,
        commission: 360,
        currency: 'AUD',
        source: 'agency',
        agencyName: 'The Influencer Agency',
        contentUrl: 'https://tiktok.com/@RacingJakeAU/video/123456789',
        sentAt: new Date('2026-05-28'),
        respondedAt: new Date('2026-05-29'),
        deliveredAt: new Date('2026-06-10'),
        verifiedAt: new Date('2026-06-10'),
        paymentDueDate: new Date('2026-06-16'),
        createdAt: new Date('2026-05-27'),
        updatedAt: new Date('2026-06-10'),
      },
    ];
  }
}
