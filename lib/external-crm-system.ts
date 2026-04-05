// External CRM Integration System
// Connects with popular CRM platforms like Salesforce, HubSpot, Pipedrive, etc.

export interface CRMIntegration {
  id: string;
  name: string;
  platform: 'salesforce' | 'hubspot' | 'pipedrive' | 'zoho' | 'monday' | 'airtable';
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  
  // Connection details
  apiKey?: string;
  apiUrl?: string;
  accessToken?: string;
  refreshToken?: string;
  
  // Sync settings
  syncEnabled: boolean;
  syncDirection: 'bidirectional' | 'to_external' | 'from_external';
  syncFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  lastSync?: Date;
  
  // Field mappings
  fieldMappings: Record<string, string>;
  
  // Filters
  syncFilters: {
    creatorTiers?: string[];
    regions?: string[];
    statusFilter?: string[];
  };
  
  createdAt: Date;
  updatedAt: Date;
}

export interface CRMContact {
  externalId: string;
  internalId: string;
  platform: string;
  
  // Contact data
  email: string;
  name: string;
  company?: string;
  phone?: string;
  
  // Creator-specific fields
  creatorTier?: string;
  totalRevenue?: number;
  campaignCount?: number;
  healthScore?: number;
  
  // CRM-specific fields
  leadScore?: number;
  stage?: string;
  owner?: string;
  tags?: string[];
  
  lastSyncAt: Date;
  syncStatus: 'synced' | 'pending' | 'error';
}

export interface SyncResult {
  integrationId: string;
  startTime: Date;
  endTime: Date;
  status: 'success' | 'partial' | 'failed';
  
  // Statistics
  totalRecords: number;
  successfulSyncs: number;
  failedSyncs: number;
  skippedRecords: number;
  
  // Details
  errors: Array<{
    recordId: string;
    error: string;
    timestamp: Date;
  }>;
  
  summary: string;
}

export class ExternalCRMSystem {
  private integrations: Map<string, CRMIntegration> = new Map();
  private contacts: Map<string, CRMContact> = new Map();
  private syncQueue: Array<{
    integrationId: string;
    operation: 'create' | 'update' | 'delete';
    contactId: string;
    data: any;
  }> = [];
  
  // Integration Management
  createIntegration(integration: Omit<CRMIntegration, 'id' | 'createdAt' | 'updatedAt'>): string {
    const id = `crm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newIntegration: CRMIntegration = {
      ...integration,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.integrations.set(id, newIntegration);
    return id;
  }

  updateIntegration(id: string, updates: Partial<CRMIntegration>): boolean {
    const integration = this.integrations.get(id);
    if (!integration) return false;
    
    const updated = { ...integration, ...updates, updatedAt: new Date() };
    this.integrations.set(id, updated);
    
    return true;
  }

  deleteIntegration(id: string): boolean {
    const integration = this.integrations.get(id);
    if (!integration) return false;
    
    // Remove associated contacts
    const contactsToRemove = Array.from(this.contacts.values())
      .filter(contact => contact.platform === integration.platform);
    
    contactsToRemove.forEach(contact => {
      this.contacts.delete(contact.internalId);
    });
    
    return this.integrations.delete(id);
  }

  getIntegration(id: string): CRMIntegration | undefined {
    return this.integrations.get(id);
  }

  listIntegrations(): CRMIntegration[] {
    return Array.from(this.integrations.values())
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  // Connection Management
  async testConnection(integrationId: string): Promise<{ success: boolean; message: string }> {
    const integration = this.integrations.get(integrationId);
    if (!integration) {
      return { success: false, message: 'Integration not found' };
    }

    try {
      const result = await this.performConnectionTest(integration);
      
      // Update integration status
      this.updateIntegration(integrationId, {
        status: result.success ? 'connected' : 'error'
      });
      
      return result;
    } catch (error) {
      this.updateIntegration(integrationId, { status: 'error' });
      return { success: false, message: `Connection failed: ${error}` };
    }
  }

  private async performConnectionTest(integration: CRMIntegration): Promise<{ success: boolean; message: string }> {
    // Simulate connection test based on platform
    switch (integration.platform) {
      case 'salesforce':
        return this.testSalesforceConnection(integration);
      case 'hubspot':
        return this.testHubSpotConnection(integration);
      case 'pipedrive':
        return this.testPipedriveConnection(integration);
      default:
        return { success: false, message: 'Unsupported platform' };
    }
  }

  private async testSalesforceConnection(integration: CRMIntegration): Promise<{ success: boolean; message: string }> {
    // Simulate Salesforce API test
    if (!integration.accessToken) {
      return { success: false, message: 'Access token required' };
    }
    
    // In production, would make actual API call
    return { success: true, message: 'Connected to Salesforce successfully' };
  }

  private async testHubSpotConnection(integration: CRMIntegration): Promise<{ success: boolean; message: string }> {
    // Simulate HubSpot API test
    if (!integration.apiKey) {
      return { success: false, message: 'API key required' };
    }
    
    return { success: true, message: 'Connected to HubSpot successfully' };
  }

  private async testPipedriveConnection(integration: CRMIntegration): Promise<{ success: boolean; message: string }> {
    // Simulate Pipedrive API test
    if (!integration.apiKey || !integration.apiUrl) {
      return { success: false, message: 'API key and URL required' };
    }
    
    return { success: true, message: 'Connected to Pipedrive successfully' };
  }

  // Data Synchronization
  async syncIntegration(integrationId: string): Promise<SyncResult> {
    const integration = this.integrations.get(integrationId);
    if (!integration) {
      throw new Error('Integration not found');
    }

    const startTime = new Date();
    this.updateIntegration(integrationId, { status: 'syncing' });

    try {
      const result = await this.performSync(integration);
      
      this.updateIntegration(integrationId, {
        status: 'connected',
        lastSync: new Date()
      });
      
      return result;
    } catch (error) {
      this.updateIntegration(integrationId, { status: 'error' });
      
      return {
        integrationId,
        startTime,
        endTime: new Date(),
        status: 'failed',
        totalRecords: 0,
        successfulSyncs: 0,
        failedSyncs: 1,
        skippedRecords: 0,
        errors: [{
          recordId: 'sync_error',
          error: String(error),
          timestamp: new Date()
        }],
        summary: `Sync failed: ${error}`
      };
    }
  }

  private async performSync(integration: CRMIntegration): Promise<SyncResult> {
    const startTime = new Date();
    let totalRecords = 0;
    let successfulSyncs = 0;
    let failedSyncs = 0;
    let skippedRecords = 0;
    const errors: SyncResult['errors'] = [];

    // Get contacts to sync based on filters
    const contactsToSync = this.getContactsForSync(integration);
    totalRecords = contactsToSync.length;

    for (const contact of contactsToSync) {
      try {
        const success = await this.syncContact(contact, integration);
        if (success) {
          successfulSyncs++;
          this.updateContactSyncStatus(contact.internalId, 'synced');
        } else {
          skippedRecords++;
        }
      } catch (error) {
        failedSyncs++;
        this.updateContactSyncStatus(contact.internalId, 'error');
        errors.push({
          recordId: contact.internalId,
          error: String(error),
          timestamp: new Date()
        });
      }
    }

    const status: SyncResult['status'] = 
      failedSyncs === 0 ? 'success' : 
      successfulSyncs > 0 ? 'partial' : 'failed';

    return {
      integrationId: integration.id,
      startTime,
      endTime: new Date(),
      status,
      totalRecords,
      successfulSyncs,
      failedSyncs,
      skippedRecords,
      errors,
      summary: `Synced ${successfulSyncs}/${totalRecords} contacts successfully`
    };
  }

  private getContactsForSync(integration: CRMIntegration): CRMContact[] {
    let contacts = Array.from(this.contacts.values());

    // Apply filters
    if (integration.syncFilters.creatorTiers?.length) {
      contacts = contacts.filter(contact => 
        integration.syncFilters.creatorTiers!.includes(contact.creatorTier || '')
      );
    }

    // Only sync contacts that need syncing
    contacts = contacts.filter(contact => 
      contact.syncStatus === 'pending' || 
      !contact.lastSyncAt ||
      contact.lastSyncAt < new Date(Date.now() - 24 * 60 * 60 * 1000) // 24 hours ago
    );

    return contacts;
  }

  private async syncContact(contact: CRMContact, integration: CRMIntegration): Promise<boolean> {
    // Map internal fields to external CRM fields
    const mappedData = this.mapContactData(contact, integration);
    
    // Perform sync based on platform
    switch (integration.platform) {
      case 'salesforce':
        return this.syncToSalesforce(contact, mappedData, integration);
      case 'hubspot':
        return this.syncToHubSpot(contact, mappedData, integration);
      case 'pipedrive':
        return this.syncToPipedrive(contact, mappedData, integration);
      default:
        throw new Error(`Unsupported platform: ${integration.platform}`);
    }
  }

  private mapContactData(contact: CRMContact, integration: CRMIntegration): Record<string, any> {
    const mapped: Record<string, any> = {};
    
    // Apply field mappings
    Object.entries(integration.fieldMappings).forEach(([internalField, externalField]) => {
      const value = (contact as any)[internalField];
      if (value !== undefined) {
        mapped[externalField] = value;
      }
    });
    
    return mapped;
  }

  private async syncToSalesforce(contact: CRMContact, data: any, integration: CRMIntegration): Promise<boolean> {
    // Simulate Salesforce API call
    console.log(`Syncing to Salesforce: ${contact.email}`, data);
    return true;
  }

  private async syncToHubSpot(contact: CRMContact, data: any, integration: CRMIntegration): Promise<boolean> {
    // Simulate HubSpot API call
    console.log(`Syncing to HubSpot: ${contact.email}`, data);
    return true;
  }

  private async syncToPipedrive(contact: CRMContact, data: any, integration: CRMIntegration): Promise<boolean> {
    // Simulate Pipedrive API call
    console.log(`Syncing to Pipedrive: ${contact.email}`, data);
    return true;
  }

  // Contact Management
  addContact(contact: Omit<CRMContact, 'lastSyncAt' | 'syncStatus'>): string {
    const fullContact: CRMContact = {
      ...contact,
      lastSyncAt: new Date(),
      syncStatus: 'pending'
    };
    
    this.contacts.set(contact.internalId, fullContact);
    
    // Queue for sync if there are active integrations
    this.queueContactForSync(contact.internalId, 'create');
    
    return contact.internalId;
  }

  updateContact(internalId: string, updates: Partial<CRMContact>): boolean {
    const contact = this.contacts.get(internalId);
    if (!contact) return false;
    
    const updated = { ...contact, ...updates, syncStatus: 'pending' as const };
    this.contacts.set(internalId, updated);
    
    // Queue for sync
    this.queueContactForSync(internalId, 'update');
    
    return true;
  }

  deleteContact(internalId: string): boolean {
    const contact = this.contacts.get(internalId);
    if (!contact) return false;
    
    // Queue for deletion sync
    this.queueContactForSync(internalId, 'delete');
    
    return this.contacts.delete(internalId);
  }

  getContact(internalId: string): CRMContact | undefined {
    return this.contacts.get(internalId);
  }

  listContacts(filters?: { platform?: string; syncStatus?: string }): CRMContact[] {
    let contacts = Array.from(this.contacts.values());
    
    if (filters?.platform) {
      contacts = contacts.filter(c => c.platform === filters.platform);
    }
    
    if (filters?.syncStatus) {
      contacts = contacts.filter(c => c.syncStatus === filters.syncStatus);
    }
    
    return contacts.sort((a, b) => b.lastSyncAt.getTime() - a.lastSyncAt.getTime());
  }

  private updateContactSyncStatus(internalId: string, status: CRMContact['syncStatus']): void {
    const contact = this.contacts.get(internalId);
    if (contact) {
      contact.syncStatus = status;
      contact.lastSyncAt = new Date();
      this.contacts.set(internalId, contact);
    }
  }

  private queueContactForSync(contactId: string, operation: 'create' | 'update' | 'delete'): void {
    // Find active integrations
    const activeIntegrations = Array.from(this.integrations.values())
      .filter(integration => integration.syncEnabled && integration.status === 'connected');
    
    activeIntegrations.forEach(integration => {
      this.syncQueue.push({
        integrationId: integration.id,
        operation,
        contactId,
        data: this.contacts.get(contactId)
      });
    });
  }

  // Analytics and Reporting
  getIntegrationAnalytics(integrationId: string): {
    totalContacts: number;
    syncedContacts: number;
    pendingContacts: number;
    errorContacts: number;
    lastSyncTime?: Date;
    syncFrequency: string;
  } | null {
    const integration = this.integrations.get(integrationId);
    if (!integration) return null;
    
    const contacts = Array.from(this.contacts.values())
      .filter(contact => contact.platform === integration.platform);
    
    return {
      totalContacts: contacts.length,
      syncedContacts: contacts.filter(c => c.syncStatus === 'synced').length,
      pendingContacts: contacts.filter(c => c.syncStatus === 'pending').length,
      errorContacts: contacts.filter(c => c.syncStatus === 'error').length,
      lastSyncTime: integration.lastSync,
      syncFrequency: integration.syncFrequency
    };
  }

  getOverallAnalytics(): {
    totalIntegrations: number;
    activeIntegrations: number;
    totalContacts: number;
    syncHealth: number; // 0-100
    queueSize: number;
  } {
    const integrations = Array.from(this.integrations.values());
    const contacts = Array.from(this.contacts.values());
    
    const activeIntegrations = integrations.filter(i => i.status === 'connected').length;
    const syncedContacts = contacts.filter(c => c.syncStatus === 'synced').length;
    const syncHealth = contacts.length > 0 ? (syncedContacts / contacts.length) * 100 : 100;
    
    return {
      totalIntegrations: integrations.length,
      activeIntegrations,
      totalContacts: contacts.length,
      syncHealth: Math.round(syncHealth),
      queueSize: this.syncQueue.length
    };
  }

  // Utility Methods
  async processSyncQueue(): Promise<void> {
    const batchSize = 10;
    const batch = this.syncQueue.splice(0, batchSize);
    
    for (const item of batch) {
      try {
        const integration = this.integrations.get(item.integrationId);
        if (integration && integration.status === 'connected') {
          await this.syncContact(item.data, integration);
        }
      } catch (error) {
        console.error('Failed to process sync queue item:', error);
      }
    }
  }

  getDefaultFieldMappings(platform: string): Record<string, string> {
    const mappings: Record<string, Record<string, string>> = {
      salesforce: {
        email: 'Email',
        name: 'Name',
        company: 'Company',
        phone: 'Phone',
        creatorTier: 'Creator_Tier__c',
        totalRevenue: 'Total_Revenue__c',
        healthScore: 'Health_Score__c'
      },
      hubspot: {
        email: 'email',
        name: 'firstname',
        company: 'company',
        phone: 'phone',
        creatorTier: 'creator_tier',
        totalRevenue: 'total_revenue',
        healthScore: 'health_score'
      },
      pipedrive: {
        email: 'email',
        name: 'name',
        phone: 'phone',
        creatorTier: 'creator_tier',
        totalRevenue: 'total_revenue'
      }
    };
    
    return mappings[platform] || {};
  }
}

// Export singleton instance
export const externalCRMSystem = new ExternalCRMSystem();