// Gamefluence.AI Pricing Model
// Implements TRIBE-inspired pricing structure with gaming-specific adaptations

export interface PricingTier {
  name: string;
  setupFee: number;
  platformMargin: number;
  features: string[];
  recommended?: boolean;
}

export interface ContentType {
  type: string;
  description: string;
  basePriceRange: [number, number];
  platformMargin: number;
  licenseOptions: LicenseOption[];
}

export interface LicenseOption {
  name: string;
  duration: string;
  usageRights: string[];
  priceMultiplier: number;
}

export interface PerformanceBonus {
  metric: string;
  threshold: number;
  bonusAmount: number | string;
  description: string;
}

// Platform pricing tiers
export const pricingTiers: PricingTier[] = [
  {
    name: 'Single Campaign',
    setupFee: 299,
    platformMargin: 0.3, // 30% margin
    features: [
      'One-time campaign setup',
      'Access to creator marketplace',
      'Campaign analytics dashboard',
      'Content licensing options',
      'Payment processing',
      '14-day support'
    ]
  },
  {
    name: 'Studio Pro',
    setupFee: 499,
    platformMargin: 0.25, // 25% margin (discount)
    features: [
      'Unlimited campaigns',
      'Priority creator matching',
      'Advanced analytics & attribution',
      'AI-powered recommendations',
      'Dedicated account manager',
      'Content library access',
      '30-day support'
    ],
    recommended: true
  },
  {
    name: 'Publisher Elite',
    setupFee: 999,
    platformMargin: 0.2, // 20% margin (premium discount)
    features: [
      'Everything in Studio Pro',
      'White-label experience',
      'API access',
      'Custom creator network',
      'Multi-region campaigns',
      'Exclusive creator rates',
      'Priority support'
    ]
  }
];

// Content types with pricing
export const contentTypes: ContentType[] = [
  {
    type: 'Gameplay Highlight',
    description: '60-second gameplay clip with creator commentary',
    basePriceRange: [200, 500],
    platformMargin: 0.3,
    licenseOptions: [
      {
        name: 'Standard',
        duration: '30 days',
        usageRights: ['Creator\'s channels only'],
        priceMultiplier: 1.0
      },
      {
        name: 'Extended',
        duration: '90 days',
        usageRights: ['Creator\'s channels', 'Brand social media'],
        priceMultiplier: 1.5
      },
      {
        name: 'Premium',
        duration: '1 year',
        usageRights: ['All digital channels', 'Paid advertising'],
        priceMultiplier: 2.0
      },
      {
        name: 'Perpetual',
        duration: 'Unlimited',
        usageRights: ['All marketing channels', 'Paid advertising', 'Website'],
        priceMultiplier: 3.0
      }
    ]
  },
  {
    type: 'Live Stream Integration',
    description: 'Dedicated stream featuring the game (2+ hours)',
    basePriceRange: [500, 2000],
    platformMargin: 0.3,
    licenseOptions: [
      {
        name: 'Standard',
        duration: '30 days',
        usageRights: ['VOD on creator\'s channels'],
        priceMultiplier: 1.0
      },
      {
        name: 'Extended',
        duration: '90 days',
        usageRights: ['VOD on creator\'s channels', 'Clips for brand social media'],
        priceMultiplier: 1.5
      },
      {
        name: 'Premium',
        duration: '1 year',
        usageRights: ['Full stream archive', 'Highlight clips', 'Paid advertising'],
        priceMultiplier: 2.0
      }
    ]
  },
  {
    type: 'Review/Walkthrough',
    description: 'In-depth game review or feature walkthrough',
    basePriceRange: [300, 1000],
    platformMargin: 0.3,
    licenseOptions: [
      {
        name: 'Standard',
        duration: '30 days',
        usageRights: ['Creator\'s channels only'],
        priceMultiplier: 1.0
      },
      {
        name: 'Extended',
        duration: '90 days',
        usageRights: ['Creator\'s channels', 'Brand social media', 'Website'],
        priceMultiplier: 1.5
      },
      {
        name: 'Premium',
        duration: '1 year',
        usageRights: ['All digital channels', 'Press kit inclusion'],
        priceMultiplier: 2.0
      }
    ]
  },
  {
    type: 'Thumbnail/Key Art',
    description: 'Custom thumbnail or promotional artwork',
    basePriceRange: [100, 300],
    platformMargin: 0.3,
    licenseOptions: [
      {
        name: 'Standard',
        duration: '30 days',
        usageRights: ['Creator\'s channels only'],
        priceMultiplier: 1.0
      },
      {
        name: 'Extended',
        duration: '90 days',
        usageRights: ['Creator\'s channels', 'Brand social media'],
        priceMultiplier: 1.5
      },
      {
        name: 'Premium',
        duration: 'Perpetual',
        usageRights: ['All marketing channels', 'Store listings'],
        priceMultiplier: 2.5
      }
    ]
  },
  {
    type: 'Tournament/Event',
    description: 'Creator-hosted tournament or special event',
    basePriceRange: [1000, 5000],
    platformMargin: 0.3,
    licenseOptions: [
      {
        name: 'Standard',
        duration: '30 days',
        usageRights: ['Live broadcast only'],
        priceMultiplier: 1.0
      },
      {
        name: 'Extended',
        duration: '90 days',
        usageRights: ['Live broadcast', 'VOD', 'Highlight clips'],
        priceMultiplier: 1.5
      },
      {
        name: 'Premium',
        duration: '1 year',
        usageRights: ['All content from event', 'Promotional materials'],
        priceMultiplier: 2.0
      }
    ]
  }
];

// Performance bonus structure
export const performanceBonuses: PerformanceBonus[] = [
  {
    metric: 'Installs',
    threshold: 1000,
    bonusAmount: '$1 per install',
    description: 'Bonus for each game install attributed to creator'
  },
  {
    metric: 'Engagement',
    threshold: 10,
    bonusAmount: '10% of base fee',
    description: 'If engagement rate exceeds 10% of audience'
  },
  {
    metric: 'Concurrent Viewers',
    threshold: 5000,
    bonusAmount: '$200',
    description: 'Bonus for reaching 5,000+ concurrent viewers'
  },
  {
    metric: 'Watch Time',
    threshold: 10000,
    bonusAmount: '$100 per 10k minutes',
    description: 'Bonus for every 10,000 minutes of watch time'
  }
];

// Calculate creator fee and platform fee
export function calculateFees(creatorBasePrice: number, platformMargin: number = 0.3) {
  const platformFee = creatorBasePrice * (platformMargin / (1 - platformMargin));
  const totalBrandCost = creatorBasePrice + platformFee;
  
  return {
    creatorFee: creatorBasePrice,
    platformFee,
    totalBrandCost,
    platformMarginPercentage: platformMargin * 100
  };
}

// Calculate license fees
export function calculateLicenseFee(
  contentType: string,
  basePrice: number,
  licenseType: string
): number {
  const content = contentTypes.find(c => c.type === contentType);
  if (!content) return basePrice;
  
  const license = content.licenseOptions.find(l => l.name === licenseType);
  if (!license) return basePrice;
  
  return basePrice * license.priceMultiplier;
}

// Calculate loyalty discounts for repeat campaigns
export function calculateLoyaltyDiscount(
  setupFee: number,
  campaignsCompleted: number
): number {
  if (campaignsCompleted >= 10) return setupFee * 0.5; // 50% discount
  if (campaignsCompleted >= 5) return setupFee * 0.25; // 25% discount
  if (campaignsCompleted >= 3) return setupFee * 0.15; // 15% discount
  return 0;
}