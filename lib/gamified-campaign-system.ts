// Gamified Campaign System - King/Candy Crush Inspired Experience
// Celebrating wins with engaging level progression

export interface CampaignLevel {
  id: string;
  name: string;
  description: string;
  order: number;
  status: 'locked' | 'available' | 'in_progress' | 'completed' | 'failed';
  
  // King-style visual elements
  icon: string;
  color: string;
  animation: string;
  celebrationEffect: string;
}
export interface CampaignQuest {
  levelId: string;
  title: string;
  objective: string;
  requirements: {
    field: string;
    value: any;
    completed: boolean;
  }[];
  
  // Rewards for completion
  rewards: {
    type: 'badge' | 'discount' | 'feature_unlock' | 'priority_support';
    value: string;
    description: string;
  }[];
  
  // Progress tracking
  progress: number; // 0-100
  completedAt?: Date;
}

export interface CampaignForm {
  id: string;
  requestedBy: string;
  accountManager: string;
  
  // Campaign details
  campaignDetails: {
    brandName: string;
    studioName?: string;
    gameTitle?: string;
    campaignType: 'awareness' | 'acquisition' | 'engagement' | 'retention';
    budget: number;
    timeline: {
      startDate: Date;
      endDate: Date;
    };
  };
  
  // Finance & taxation
  financeDetails: {
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    billingAddress: {
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
    };
    taxId?: string;
    vatNumber?: string;
  };
}

export class GamifiedCampaignSystem {
  private campaignLevels: CampaignLevel[] = [];
  private currentLevel: number = 0;
  
  constructor() {
    this.initializeCampaignLevels();
  }
  
  private initializeCampaignLevels(): void {
    this.campaignLevels = [
      {
        id: 'level_1',
        name: 'Campaign Conception',
        description: 'Define your campaign vision and objectives',
        order: 1,
        status: 'available',
        icon: '💡',
        color: '#FFD700',
        animation: 'pulse',
        celebrationEffect: 'sparkles'
      },
      {
        id: 'level_2', 
        name: 'Target Audience Discovery',
        description: 'Identify and define your perfect gaming audience',
        order: 2,
        status: 'locked',
        icon: '🎯',
        color: '#FF6B6B',
        animation: 'bounce',
        celebrationEffect: 'confetti'
      }
    ];
  }

  completeLevel(levelId: string): boolean {
    const level = this.campaignLevels.find(l => l.id === levelId);
    if (!level || level.status !== 'in_progress') return false;
    
    level.status = 'completed';
    
    // Unlock next level
    const nextLevel = this.campaignLevels.find(l => l.order === level.order + 1);
    if (nextLevel && nextLevel.status === 'locked') {
      nextLevel.status = 'available';
    }
    
    // Trigger celebration
    this.triggerCelebration(level);
    
    return true;
  }
  
  private triggerCelebration(level: CampaignLevel): void {
    console.log(`🎉 Level Complete: ${level.name}!`);
    console.log(`Celebration Effect: ${level.celebrationEffect}`);
    // In real implementation, this would trigger UI animations
  }
}