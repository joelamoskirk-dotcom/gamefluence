// Secure Ticketing Architecture - AWS Best Practices
// Separate microservices for security and scalability

export interface SecureTicketingConfig {
  // Separate service endpoints
  internalTicketingService: string;
  customerTicketingService: string;
  creatorServiceBot: string;
  
  // Security settings
  encryptionKey: string;
  apiGatewayUrl: string;
  authServiceUrl: string;
}
export interface UserRole {
  id: string;
  name: string;
  type: 'creator' | 'brand' | 'game_studio' | 'agency' | 'admin' | 'support' | 'campaign_manager';
  permissions: string[];
  agencyCommission?: number; // For agency roles
}

export interface TicketCategory {
  id: string;
  name: string;
  type: 'payment' | 'content' | 'technical' | 'account' | 'campaign' | 'feature_request' | 'fan_complaint' | 'product_issue';
  autoRouting: {
    department: string;
    escalationChain: string[];
    slaHours: number;
  };
}

export interface CreatorServiceBot {
  id: string;
  name: string;
  capabilities: string[];
  integrations: {
    slack: boolean;
    discord: boolean;
    tiktok: boolean;
    streamcharts: boolean;
  };
  
  // AI-powered assistance
  aiModel: string;
  responseTemplates: Record<string, string>;
  escalationTriggers: string[];
}

export interface ApprovalWorkflow {
  id: string;
  ticketType: string;
  steps: {
    order: number;
    approver: string; // role or specific user
    required: boolean;
    timeoutHours: number;
    escalationTo?: string;
  }[];
  
  // Special admin override
  adminOverride: {
    userId: string; // Your user ID for instant approval
    notificationChannels: string[];
  };
}