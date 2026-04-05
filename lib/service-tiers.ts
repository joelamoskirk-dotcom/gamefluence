// Service Tier Structure - Simplified A/B/C/D/E Product Offerings

export interface ServiceTier {
  id: string;
  name: string;
  badge?: string;
  price: string;
  description: string;
  features: string[];
  limitations: string[];
  cta: string;
  ctaType: 'button' | 'contact';
  popular?: boolean;
  bestValue?: boolean;
}

export class ServiceTierSystem {
  
  static getServiceTiers(): ServiceTier[] {
    return [
      {
        id: 'starter',
        name: 'Starter',
        price: '$2,500/month',
        description: 'Perfect for small gaming studios testing influencer marketing',
        features: [
          'Up to 5 creators per campaign',
          'Basic analytics dashboard',
          'Email support',
          '1 active campaign',
          'Standard creator matching'
        ],
        limitations: [
          'No AI insights',
          'Limited to 1 market',
          'Basic reporting only'
        ],
        cta: 'Start Free Trial',
        ctaType: 'button'
      },
      {
        id: 'growth',
        name: 'Growth',
        badge: 'Most Popular',
        price: '$7,500/month',
        description: 'Ideal for growing studios ready to scale their campaigns',
        features: [
          'Up to 25 creators per campaign',
          'Advanced analytics & AI insights',
          'Priority support',
          '3 active campaigns',
          'AI-powered creator matching',
          'Cross-platform tracking',
          'Real-time optimization'
        ],
        limitations: [
          'Limited to 3 markets',
          'Standard attribution models'
        ],
        cta: 'Start Growth Plan',
        ctaType: 'button',
        popular: true
      },
      {
        id: 'pro',
        name: 'Professional',
        badge: 'Best Value',
        price: '$15,000/month',
        description: 'Advanced features for established gaming companies',
        features: [
          'Up to 100 creators per campaign',
          'Full AI suite & market intelligence',
          'Dedicated account manager',
          'Unlimited campaigns',
          'Advanced attribution models',
          'Custom integrations',
          'White-label options',
          'Multi-market campaigns'
        ],
        limitations: [
          'Setup fee applies',
          'Minimum 6-month commitment'
        ],
        cta: 'Upgrade to Pro',
        ctaType: 'button',
        bestValue: true
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: '$50,000+/month',
        description: 'Complete solution for large gaming publishers',
        features: [
          'Unlimited creators & campaigns',
          'Custom AI model training',
          'Dedicated success team',
          'API access & integrations',
          'Advanced security & compliance',
          'Custom reporting & dashboards',
          'Priority feature development',
          'Global market access'
        ],
        limitations: [
          'Custom pricing based on scale',
          'Requires implementation period'
        ],
        cta: 'Contact Sales',
        ctaType: 'contact'
      },
      {
        id: 'custom',
        name: 'Custom Solutions',
        price: 'Contact for Pricing',
        description: 'Tailored solutions for unique requirements',
        features: [
          'Bespoke platform development',
          'Custom AI model creation',
          'Dedicated infrastructure',
          'Specialized integrations',
          'Custom compliance requirements',
          'Unique market strategies',
          'Proprietary analytics',
          'Full white-label platform'
        ],
        limitations: [
          'Requires detailed consultation',
          'Longer implementation timeline'
        ],
        cta: 'Discuss Custom Needs',
        ctaType: 'contact'
      }
    ];
  }

  static getComparisonMatrix() {
    return {
      categories: [
        {
          name: 'Campaign Management',
          features: [
            { name: 'Active Campaigns', starter: '1', growth: '3', pro: 'Unlimited', enterprise: 'Unlimited', custom: 'Unlimited' },
            { name: 'Creators per Campaign', starter: '5', growth: '25', pro: '100', enterprise: 'Unlimited', custom: 'Unlimited' },
            { name: 'Markets Supported', starter: '1', growth: '3', pro: '8', enterprise: 'Global', custom: 'Global' }
          ]
        },
        {
          name: 'AI & Analytics',
          features: [
            { name: 'Basic Analytics', starter: '✓', growth: '✓', pro: '✓', enterprise: '✓', custom: '✓' },
            { name: 'AI Insights', starter: '✗', growth: '✓', pro: '✓', enterprise: '✓', custom: '✓' },
            { name: 'Advanced Attribution', starter: '✗', growth: '✗', pro: '✓', enterprise: '✓', custom: '✓' },
            { name: 'Custom AI Models', starter: '✗', growth: '✗', pro: '✗', enterprise: '✓', custom: '✓' }
          ]
        },
        {
          name: 'Support & Services',
          features: [
            { name: 'Support Level', starter: 'Email', growth: 'Priority', pro: 'Dedicated AM', enterprise: 'Success Team', custom: 'Dedicated Team' },
            { name: 'Onboarding', starter: 'Self-service', growth: 'Guided', pro: 'Full Setup', enterprise: 'White Glove', custom: 'Custom Implementation' },
            { name: 'Training', starter: 'Documentation', growth: 'Video Training', pro: 'Live Training', enterprise: 'Custom Training', custom: 'Ongoing Training' }
          ]
        }
      ]
    };
  }
}