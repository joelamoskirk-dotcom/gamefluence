// Batch Contact Upload System
// Supports both Gamefluence (APAC gaming creators) and Mobileyes (AU live video talent)
// Accepts CSV/JSON paste or file upload, validates, and routes to correct pipeline

export type ContactPipeline = 'gamefluence' | 'mobileyes';

export type ContactStatus = 'new' | 'to_contact' | 'contacted' | 'replied' | 'interested' | 'signed' | 'declined' | 'archived';

export interface BatchContact {
  id: string;
  pipeline: ContactPipeline;
  
  // Core fields (required)
  name: string;
  platform: string;
  handle: string;
  profileUrl: string;
  
  // Optional fields
  email?: string;
  phone?: string;
  location?: string;
  followerCount?: number;
  averageViewers?: number;
  engagementRate?: number;
  avgViews?: number;
  estCPM?: number;
  
  // Categorisation
  contentFocus?: string[];
  vertical?: string; // cars_racing | flight_sim | peripherals | mobile_racing | car_culture | vn_gaming | live_streaming | general
  market?: string;
  tier?: 'diamond' | 'platinum' | 'gold' | 'silver' | 'bronze';
  
  // Platform-specific status
  mobileyesRosterStatus?: 'prospect' | 'onboarding' | 'active' | 'declined';
  gamefluenceStatus?: 'prospect' | 'contacted' | 'signed' | 'active';
  
  // Compliance
  gamblingOptIn?: boolean; // Default FALSE — must be explicitly TRUE for gambling briefs
  vnPending?: boolean; // VN campaign but HCMC not yet staffed
  
  // Partnership history
  pastPromos?: string[]; // Known brand partnerships
  contactRoute?: 'email' | 'dm' | 'agency' | 'discord' | 'other';
  
  // Outreach tracking
  status: ContactStatus;
  outreachChannel?: 'dm' | 'email' | 'messenger' | 'discord' | 'other';
  templateUsed?: string;
  contactedBy?: string;
  contactedAt?: string;
  responseAt?: string;
  notes?: string;
  
  // Metadata
  uploadedAt: string;
  uploadBatch: string;
  source: string; // 'manual_upload' | 'csv_import' | 'scrape' | 'referral'
  lastUpdated?: string;
}

export interface BatchUploadResult {
  success: boolean;
  totalRows: number;
  validRows: number;
  invalidRows: number;
  errors: { row: number; field: string; error: string }[];
  contacts: BatchContact[];
  batchId: string;
}

export interface CSVColumnMapping {
  name: string;
  platform: string;
  handle: string;
  profileUrl: string;
  email?: string;
  phone?: string;
  location?: string;
  followerCount?: string;
  averageViewers?: string;
  engagementRate?: string;
  contentFocus?: string;
  market?: string;
  notes?: string;
}

export class BatchContactUploader {

  static readonly SUPPORTED_PLATFORMS_GAMEFLUENCE = ['tiktok', 'youtube', 'twitch', 'instagram', 'facebook'];
  static readonly SUPPORTED_PLATFORMS_MOBILEYES = ['kick', 'twitch', 'youtube', 'tiktok'];

  // Parse CSV text into rows
  static parseCSV(csvText: string): string[][] {
    const lines = csvText.trim().split('\n');
    return lines.map(line => {
      const row: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (const char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          row.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      row.push(current.trim());
      return row;
    });
  }

  // Auto-detect column mapping from headers
  static detectColumnMapping(headers: string[]): CSVColumnMapping {
    const normalised = headers.map(h => h.toLowerCase().trim());
    
    const findColumn = (candidates: string[]): string => {
      const index = normalised.findIndex(h => candidates.some(c => h.includes(c)));
      return index >= 0 ? headers[index] : '';
    };

    return {
      name: findColumn(['name', 'creator', 'talent', 'display']) || headers[0],
      platform: findColumn(['platform', 'site', 'network']) || headers[1] || '',
      handle: findColumn(['handle', 'username', 'user', '@']) || headers[2] || '',
      profileUrl: findColumn(['url', 'link', 'profile']) || headers[3] || '',
      email: findColumn(['email', 'mail']) || undefined,
      phone: findColumn(['phone', 'mobile', 'whatsapp', 'tel']) || undefined,
      location: findColumn(['location', 'city', 'country', 'region']) || undefined,
      followerCount: findColumn(['follower', 'subscribers', 'fans']) || undefined,
      averageViewers: findColumn(['viewer', 'avg_view', 'ccv']) || undefined,
      engagementRate: findColumn(['engagement', 'eng_rate', 'er']) || undefined,
      contentFocus: findColumn(['content', 'genre', 'category', 'focus', 'niche']) || undefined,
      market: findColumn(['market', 'region', 'country']) || undefined,
      notes: findColumn(['notes', 'note', 'comment']) || undefined,
    };
  }

  // Validate a single contact row
  static validateContact(contact: Partial<BatchContact>, pipeline: ContactPipeline): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!contact.name || contact.name.trim().length < 2) {
      errors.push('Name is required (min 2 characters)');
    }
    if (!contact.handle || contact.handle.trim().length < 1) {
      errors.push('Handle/username is required');
    }
    if (!contact.platform) {
      errors.push('Platform is required');
    } else {
      const validPlatforms = pipeline === 'gamefluence' 
        ? this.SUPPORTED_PLATFORMS_GAMEFLUENCE 
        : this.SUPPORTED_PLATFORMS_MOBILEYES;
      if (!validPlatforms.includes(contact.platform.toLowerCase())) {
        errors.push(`Platform "${contact.platform}" not supported for ${pipeline}. Valid: ${validPlatforms.join(', ')}`);
      }
    }
    if (contact.profileUrl && !contact.profileUrl.startsWith('http')) {
      errors.push('Profile URL must start with http/https');
    }
    if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      errors.push('Invalid email format');
    }
    if (contact.followerCount !== undefined && (contact.followerCount < 0 || !Number.isFinite(contact.followerCount))) {
      errors.push('Follower count must be a positive number');
    }

    return { valid: errors.length === 0, errors };
  }

  // Process a batch upload (from CSV rows or JSON array)
  static processBatch(
    rawData: string[][] | Record<string, string>[],
    pipeline: ContactPipeline,
    options?: { 
      columnMapping?: CSVColumnMapping;
      source?: string;
      contactedBy?: string;
      defaultMarket?: string;
    }
  ): BatchUploadResult {
    const batchId = `batch_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const timestamp = new Date().toISOString();
    const contacts: BatchContact[] = [];
    const errors: { row: number; field: string; error: string }[] = [];

    let rows: Record<string, string>[];

    // Convert CSV rows to objects if needed
    if (Array.isArray(rawData[0]) && typeof rawData[0][0] === 'string') {
      const csvRows = rawData as string[][];
      const headers = csvRows[0];
      const mapping = options?.columnMapping || this.detectColumnMapping(headers);
      
      rows = csvRows.slice(1).map(row => {
        const obj: Record<string, string> = {};
        headers.forEach((header, i) => {
          obj[header] = row[i] || '';
        });
        return obj;
      });
    } else {
      rows = rawData as Record<string, string>[];
    }

    rows.forEach((row, index) => {
      const rowNum = index + 2; // +2 because headers are row 1, data starts at 2
      
      const contact: Partial<BatchContact> = {
        name: this.extractField(row, ['name', 'creator', 'talent', 'display_name']),
        platform: this.normalPlatform(this.extractField(row, ['platform', 'site', 'network'])),
        handle: this.extractField(row, ['handle', 'username', 'user']).replace('@', ''),
        profileUrl: this.extractField(row, ['url', 'link', 'profile', 'profile_url']),
        email: this.extractField(row, ['email', 'mail']) || undefined,
        phone: this.extractField(row, ['phone', 'mobile', 'whatsapp']) || undefined,
        location: this.extractField(row, ['location', 'city', 'country']) || options?.defaultMarket,
        followerCount: this.parseNumber(this.extractField(row, ['followers', 'follower_count', 'subscribers', 'fans'])),
        averageViewers: this.parseNumber(this.extractField(row, ['viewers', 'avg_viewers', 'ccv', 'average_viewers'])),
        engagementRate: this.parseNumber(this.extractField(row, ['engagement', 'eng_rate', 'er', 'engagement_rate'])),
        contentFocus: this.extractField(row, ['content', 'genre', 'category', 'focus', 'niche'])
          ?.split(/[,;|]/).map(s => s.trim()).filter(Boolean) || undefined,
        market: this.extractField(row, ['market', 'region']) || options?.defaultMarket,
        notes: this.extractField(row, ['notes', 'note', 'comment']) || undefined,
      };

      // Auto-build profile URL if missing but handle + platform present
      if (!contact.profileUrl && contact.handle && contact.platform) {
        contact.profileUrl = this.buildProfileUrl(contact.platform, contact.handle);
      }

      const validation = this.validateContact(contact, pipeline);
      
      if (!validation.valid) {
        validation.errors.forEach(err => {
          errors.push({ row: rowNum, field: '', error: err });
        });
      } else {
        contacts.push({
          id: `contact_${batchId}_${index}`,
          pipeline,
          name: contact.name!,
          platform: contact.platform!,
          handle: contact.handle!,
          profileUrl: contact.profileUrl || '',
          email: contact.email,
          phone: contact.phone,
          location: contact.location,
          followerCount: contact.followerCount,
          averageViewers: contact.averageViewers,
          engagementRate: contact.engagementRate,
          contentFocus: contact.contentFocus,
          market: contact.market,
          tier: contact.followerCount ? this.autoTier(contact.followerCount) : undefined,
          status: 'to_contact',
          contactedBy: options?.contactedBy,
          notes: contact.notes,
          uploadedAt: timestamp,
          uploadBatch: batchId,
          source: options?.source || 'manual_upload',
        });
      }
    });

    return {
      success: errors.length === 0,
      totalRows: rows.length,
      validRows: contacts.length,
      invalidRows: errors.length > 0 ? rows.length - contacts.length : 0,
      errors,
      contacts,
      batchId,
    };
  }

  // Helper: extract a field by trying multiple column name variants
  private static extractField(row: Record<string, string>, candidates: string[]): string {
    for (const key of Object.keys(row)) {
      const normalised = key.toLowerCase().trim();
      if (candidates.some(c => normalised.includes(c))) {
        return row[key]?.trim() || '';
      }
    }
    return '';
  }

  // Helper: normalise platform name
  private static normalPlatform(raw: string): string {
    const map: Record<string, string> = {
      'tiktok': 'tiktok', 'tik tok': 'tiktok', 'tt': 'tiktok',
      'youtube': 'youtube', 'yt': 'youtube',
      'twitch': 'twitch', 'ttv': 'twitch',
      'kick': 'kick',
      'instagram': 'instagram', 'ig': 'instagram', 'insta': 'instagram',
      'facebook': 'facebook', 'fb': 'facebook',
    };
    return map[raw.toLowerCase().trim()] || raw.toLowerCase().trim();
  }

  // Helper: parse number from string (handles commas, K/M suffixes)
  private static parseNumber(raw: string): number | undefined {
    if (!raw) return undefined;
    let cleaned = raw.replace(/,/g, '').trim();
    
    if (cleaned.toLowerCase().endsWith('m')) {
      return Math.round(parseFloat(cleaned) * 1000000);
    }
    if (cleaned.toLowerCase().endsWith('k')) {
      return Math.round(parseFloat(cleaned) * 1000);
    }
    
    const num = parseFloat(cleaned);
    return isNaN(num) ? undefined : Math.round(num);
  }

  // Helper: auto-assign tier based on follower count
  private static autoTier(followers: number): BatchContact['tier'] {
    if (followers >= 1000000) return 'diamond';
    if (followers >= 500000) return 'platinum';
    if (followers >= 100000) return 'gold';
    if (followers >= 50000) return 'silver';
    return 'bronze';
  }

  // Helper: build profile URL from platform + handle
  private static buildProfileUrl(platform: string, handle: string): string {
    const cleanHandle = handle.replace('@', '');
    switch (platform) {
      case 'tiktok': return `https://tiktok.com/@${cleanHandle}`;
      case 'youtube': return `https://youtube.com/@${cleanHandle}`;
      case 'twitch': return `https://twitch.tv/${cleanHandle}`;
      case 'kick': return `https://kick.com/${cleanHandle}`;
      case 'instagram': return `https://instagram.com/${cleanHandle}`;
      case 'facebook': return `https://facebook.com/${cleanHandle}`;
      default: return '';
    }
  }

  // Convert contacts to Google Sheets row format
  static toSheetRows(contacts: BatchContact[]): (string | number)[][] {
    return contacts.map(c => [
      c.uploadedAt,
      c.pipeline,
      c.name,
      c.platform,
      c.handle,
      c.profileUrl,
      c.email || '',
      c.phone || '',
      c.location || '',
      c.followerCount || '',
      c.averageViewers || '',
      c.engagementRate || '',
      c.contentFocus?.join(', ') || '',
      c.market || '',
      c.tier || '',
      c.status,
      c.contactedBy || '',
      c.notes || '',
      c.uploadBatch,
      c.source,
    ]);
  }

  // Sheet column headers
  static getSheetHeaders(): string[] {
    return [
      'Uploaded At', 'Pipeline', 'Name', 'Platform', 'Handle', 'Profile URL',
      'Email', 'Phone', 'Location', 'Followers', 'Avg Viewers', 'Engagement %',
      'Content Focus', 'Market', 'Tier', 'Status', 'Contacted By', 'Notes',
      'Batch ID', 'Source',
    ];
  }

  // Generate CSV template for download
  static getCSVTemplate(pipeline: ContactPipeline): string {
    const platforms = pipeline === 'gamefluence' 
      ? 'tiktok/youtube/twitch/instagram' 
      : 'kick/twitch/youtube/tiktok';
    
    const headers = 'name,platform,handle,profile_url,email,phone,location,followers,avg_viewers,engagement_rate,content_focus,market,notes';
    const example = pipeline === 'gamefluence'
      ? 'Mai Game Girl,tiktok,maigamegirl,https://tiktok.com/@maigamegirl,mai@email.com,,Vietnam,4400000,,8.5,Mobile Gaming;Racing,Vietnam,'
      : 'StreamKing AU,kick,StreamKingAU,https://kick.com/StreamKingAU,alex@email.com,+61412345678,Sydney,85000,1200,,FPS;Streaming,Australia,';
    
    return `${headers}\n${example}\n`;
  }
}
