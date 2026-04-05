// Attribution Integration System
// Seamless integration with AppsFlyer, Adjust, Branch, and other MMPs
// Cross-device commerce tracking for complete funnel visibility

export interface AttributionProvider {
  name: 'appsflyer' | 'adjust' | 'branch' | 'kochava' | 'singular' | 'custom';
  apiKey: string;
  appId: string;
  config: {
    enableDeepLinking: boolean;
    enableQRTracking: boolean;
    enableOfflineAttribution: boolean;
    enableCrossPlatform: boolean;
    retentionWindow: number;
  };
  trackingParams: {
    customParams: Record<string, string>;
    agencyId?: string;
    clientId?: string;
  };
}

export interface AttributionEvent {
  eventId: string;
  timestamp: Date;
  userId?: string;
  deviceId: string;
  eventType: 'impression' | 'click' | 'install' | 'open' | 'purchase' | 'custom';
  eventName: string;
  eventValue?: number;
  currency?: string;
  campaignData: {
    campaignId: string;
    creatorId?: string;
    networkId: string;
    adGroupId?: string;
    creativeId?: string;
  };
  deviceInfo: {
    platform: 'ios' | 'android' | 'web';
    osVersion: string;
    appVersion: string;
    deviceModel: string;
    fingerprint: string;
  };
}

export interface QRCodeTracking {
  qrId: string;
  campaignId: string;
  creatorId: string;
  generatedAt: Date;
  scannedAt?: Date;
  conversionData?: {
    eventType: string;
    eventValue: number;
    revenue: number;
  };
}

export interface CrossDeviceProfile {
  profileId: string;
  devices: {
    deviceId: string;
    platform: string;
    firstSeen: Date;
    lastSeen: Date;
  }[];
  userJourney: {
    touchpoint: string;
    timestamp: Date;
    deviceId: string;
    eventType: string;
    attribution: string;
  }[];
  aggregatedMetrics: {
    totalSessions: number;
    totalEvents: number;
    totalValue: number;
  };
}

export class AttributionManager {
  private providers: Map<string, AttributionProvider> = new Map();
  private events: AttributionEvent[] = [];
  private qrCodes: Map<string, QRCodeTracking> = new Map();
  private crossDeviceProfiles: Map<string, CrossDeviceProfile> = new Map();

  addProvider(provider: AttributionProvider): void {
    this.providers.set(provider.name, provider);
  }

  trackEvent(event: AttributionEvent): void {
    this.events.push(event);
    this.updateCrossDeviceProfile(event);
  }

  generateQRCode(campaignId: string, creatorId: string): QRCodeTracking {
    const qrCode: QRCodeTracking = {
      qrId: `qr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      campaignId,
      creatorId,
      generatedAt: new Date()
    };
    
    this.qrCodes.set(qrCode.qrId, qrCode);
    return qrCode;
  }

  private updateCrossDeviceProfile(event: AttributionEvent): void {
    const userId = event.userId || event.deviceId;
    let profile = this.crossDeviceProfiles.get(userId);
    
    if (!profile) {
      profile = {
        profileId: userId,
        devices: [],
        userJourney: [],
        aggregatedMetrics: {
          totalSessions: 0,
          totalEvents: 0,
          totalValue: 0
        }
      };
    }

    // Update device info
    const existingDevice = profile.devices.find(d => d.deviceId === event.deviceId);
    if (!existingDevice) {
      profile.devices.push({
        deviceId: event.deviceId,
        platform: event.deviceInfo.platform,
        firstSeen: event.timestamp,
        lastSeen: event.timestamp
      });
    } else {
      existingDevice.lastSeen = event.timestamp;
    }

    // Add to user journey
    profile.userJourney.push({
      touchpoint: event.campaignData.campaignId,
      timestamp: event.timestamp,
      deviceId: event.deviceId,
      eventType: event.eventType,
      attribution: event.campaignData.networkId
    });

    // Update metrics
    profile.aggregatedMetrics.totalEvents++;
    if (event.eventValue) {
      profile.aggregatedMetrics.totalValue += event.eventValue;
    }

    this.crossDeviceProfiles.set(userId, profile);
  }

  getAttribution(deviceId: string): AttributionEvent[] {
    return this.events.filter(event => event.deviceId === deviceId);
  }

  getUserJourney(userId: string): CrossDeviceProfile | undefined {
    return this.crossDeviceProfiles.get(userId);
  }

  generateReport(campaignId: string): any {
    const campaignEvents = this.events.filter(event => 
      event.campaignData.campaignId === campaignId
    );

    const metrics = {
      totalEvents: campaignEvents.length,
      impressions: campaignEvents.filter(e => e.eventType === 'impression').length,
      clicks: campaignEvents.filter(e => e.eventType === 'click').length,
      installs: campaignEvents.filter(e => e.eventType === 'install').length,
      purchases: campaignEvents.filter(e => e.eventType === 'purchase').length,
      totalRevenue: campaignEvents
        .filter(e => e.eventType === 'purchase')
        .reduce((sum, e) => sum + (e.eventValue || 0), 0)
    };

    return {
      campaignId,
      metrics,
      conversionFunnel: {
        impressionToClick: metrics.clicks / metrics.impressions,
        clickToInstall: metrics.installs / metrics.clicks,
        installToPurchase: metrics.purchases / metrics.installs
      },
      events: campaignEvents
    };
  }
}

// Export singleton instance
export const attributionManager = new AttributionManager();

// APAC-specific attribution configurations
export const apacAttributionConfigs = {
  thailand: {
    providers: ['appsflyer', 'adjust'],
    currency: 'THB',
    timezone: 'Asia/Bangkok'
  },
  vietnam: {
    providers: ['appsflyer', 'branch'],
    currency: 'VND',
    timezone: 'Asia/Ho_Chi_Minh'
  },
  indonesia: {
    providers: ['appsflyer', 'kochava'],
    currency: 'IDR',
    timezone: 'Asia/Jakarta'
  }
};