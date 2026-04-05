// Attribution system for Gamefluence
// Handles UTM tracking, affiliate links, and multi-touch attribution

export interface AttributionLink {
  url: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  promoCode: string;
}

export interface AttributionTouchpoint {
  id: string;
  timestamp: Date;
  channel: string;
  creator: string;
  action: string;
  value: number;
  isConversion: boolean;
}

export interface AttributionModel {
  type: 'first-touch' | 'last-touch' | 'linear' | 'time-decay' | 'position-based' | 'custom';
  weights?: {
    first: number;
    middle: number;
    last: number;
  };
  decayRate?: number; // For time-decay model
  customWeights?: number[]; // For custom model
}

// Generate tracking links for creators
export function generateCreatorLinks(
  creators: any[], 
  campaignId: string, 
  baseUrl: string = 'https://gamefluence.com'
): Record<string, AttributionLink> {
  const links: Record<string, AttributionLink> = {};
  
  creators.forEach(creator => {
    const promoCode = generatePromoCode(creator.name);
    
    links[creator.id] = {
      url: `${baseUrl}/c/${campaignId}/${creator.id}`,
      utmSource: 'creator',
      utmMedium: creator.platform || 'stream',
      utmCampaign: campaignId,
      utmContent: creator.id,
      promoCode
    };
  });
  
  return links;
}

// Generate a unique promo code for a creator
export function generatePromoCode(creatorName: string): string {
  const prefix = creatorName.substring(0, 4).toUpperCase();
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}${randomNum}`;
}

// Build a full tracking URL with UTM parameters
export function buildTrackingUrl(link: AttributionLink): string {
  const url = new URL(link.url);
  
  url.searchParams.append('utm_source', link.utmSource);
  url.searchParams.append('utm_medium', link.utmMedium);
  url.searchParams.append('utm_campaign', link.utmCampaign);
  url.searchParams.append('utm_content', link.utmContent);
  url.searchParams.append('promo', link.promoCode);
  
  return url.toString();
}

// Calculate attribution based on touchpoints and model
export function calculateAttribution(
  touchpoints: AttributionTouchpoint[],
  model: AttributionModel,
  totalValue: number
): Record<string, number> {
  const attribution: Record<string, number> = {};
  
  if (touchpoints.length === 0) return attribution;
  
  // Sort touchpoints by timestamp
  const sortedTouchpoints = [...touchpoints].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  );
  
  switch (model.type) {
    case 'first-touch':
      attribution[sortedTouchpoints[0].creator] = totalValue;
      break;
      
    case 'last-touch':
      attribution[sortedTouchpoints[sortedTouchpoints.length - 1].creator] = totalValue;
      break;
      
    case 'linear':
      const equalShare = totalValue / sortedTouchpoints.length;
      sortedTouchpoints.forEach(tp => {
        attribution[tp.creator] = (attribution[tp.creator] || 0) + equalShare;
      });
      break;
      
    case 'position-based':
      const weights = model.weights || { first: 0.4, middle: 0.2, last: 0.4 };
      
      if (sortedTouchpoints.length === 1) {
        attribution[sortedTouchpoints[0].creator] = totalValue;
      } else {
        // First touchpoint
        const firstCreator = sortedTouchpoints[0].creator;
        attribution[firstCreator] = (attribution[firstCreator] || 0) + (weights.first * totalValue);
        
        // Last touchpoint
        const lastCreator = sortedTouchpoints[sortedTouchpoints.length - 1].creator;
        attribution[lastCreator] = (attribution[lastCreator] || 0) + (weights.last * totalValue);
        
        // Middle touchpoints
        if (sortedTouchpoints.length > 2) {
          const middleShare = (weights.middle * totalValue) / (sortedTouchpoints.length - 2);
          for (let i = 1; i < sortedTouchpoints.length - 1; i++) {
            const creator = sortedTouchpoints[i].creator;
            attribution[creator] = (attribution[creator] || 0) + middleShare;
          }
        }
      }
      break;
      
    case 'time-decay':
      const decayRate = model.decayRate || 0.1;
      const lastTime = sortedTouchpoints[sortedTouchpoints.length - 1].timestamp.getTime();
      
      // Calculate weights based on time decay
      const timeWeights = sortedTouchpoints.map(tp => {
        const daysAgo = (lastTime - tp.timestamp.getTime()) / (1000 * 60 * 60 * 24);
        return Math.exp(-decayRate * daysAgo);
      });
      
      // Normalize weights
      const totalWeight = timeWeights.reduce((sum, w) => sum + w, 0);
      
      // Distribute value based on weights
      sortedTouchpoints.forEach((tp, i) => {
        const share = (timeWeights[i] / totalWeight) * totalValue;
        attribution[tp.creator] = (attribution[tp.creator] || 0) + share;
      });
      break;
      
    case 'custom':
      if (model.customWeights && model.customWeights.length === sortedTouchpoints.length) {
        sortedTouchpoints.forEach((tp, i) => {
          const share = model.customWeights![i] * totalValue;
          attribution[tp.creator] = (attribution[tp.creator] || 0) + share;
        });
      } else {
        // Fallback to linear if custom weights don't match
        const equalShare = totalValue / sortedTouchpoints.length;
        sortedTouchpoints.forEach(tp => {
          attribution[tp.creator] = (attribution[tp.creator] || 0) + equalShare;
        });
      }
      break;
  }
  
  return attribution;
}

// Calculate ROI based on campaign costs and revenue
export function calculateROI(
  campaignCost: number,
  revenue: number
): number {
  return ((revenue - campaignCost) / campaignCost) * 100;
}

// Calculate Day 1/3/7 retention metrics
export interface RetentionMetrics {
  day1: number;
  day3: number;
  day7: number;
}

export function calculateRetention(
  installEvents: { userId: string; timestamp: Date }[],
  sessionEvents: { userId: string; timestamp: Date }[]
): RetentionMetrics {
  const userInstallDates: Record<string, Date> = {};
  const userSessions: Record<string, Date[]> = {};
  
  // Map install dates by user
  installEvents.forEach(event => {
    userInstallDates[event.userId] = event.timestamp;
  });
  
  // Group sessions by user
  sessionEvents.forEach(event => {
    if (!userSessions[event.userId]) {
      userSessions[event.userId] = [];
    }
    userSessions[event.userId].push(event.timestamp);
  });
  
  // Calculate retention
  let day1Count = 0;
  let day3Count = 0;
  let day7Count = 0;
  let totalUsers = 0;
  
  Object.entries(userInstallDates).forEach(([userId, installDate]) => {
    totalUsers++;
    const sessions = userSessions[userId] || [];
    
    // Check if user returned on day 1, 3, and 7
    const hasDay1 = sessions.some(session => {
      const dayDiff = Math.floor((session.getTime() - installDate.getTime()) / (1000 * 60 * 60 * 24));
      return dayDiff === 1;
    });
    
    const hasDay3 = sessions.some(session => {
      const dayDiff = Math.floor((session.getTime() - installDate.getTime()) / (1000 * 60 * 60 * 24));
      return dayDiff === 3;
    });
    
    const hasDay7 = sessions.some(session => {
      const dayDiff = Math.floor((session.getTime() - installDate.getTime()) / (1000 * 60 * 60 * 24));
      return dayDiff === 7;
    });
    
    if (hasDay1) day1Count++;
    if (hasDay3) day3Count++;
    if (hasDay7) day7Count++;
  });
  
  return {
    day1: totalUsers > 0 ? (day1Count / totalUsers) * 100 : 0,
    day3: totalUsers > 0 ? (day3Count / totalUsers) * 100 : 0,
    day7: totalUsers > 0 ? (day7Count / totalUsers) * 100 : 0
  };
}