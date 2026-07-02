// Google Sheets Database Integration
// Uses Google Sheets API v4 as a lightweight database for both Gamefluence and Mobileyes
// Requires: GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in .env.local

// Sheet IDs (set these after creating your sheets)
const GAMEFLUENCE_SHEET_ID = process.env.GAMEFLUENCE_SHEET_ID || '';
const MOBILEYES_SHEET_ID = process.env.MOBILEYES_SHEET_ID || '';

interface SheetRow {
  [key: string]: string | number | boolean | undefined;
}

// ── AUTH ───────────────────────────────────────────────────────────────────────

async function getAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!email || !key) {
    throw new Error('Google Sheets credentials not configured. See GOOGLE_SHEETS_SETUP.md');
  }

  // Create JWT for Google OAuth2
  const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const claim = btoa(JSON.stringify({
    iss: email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }));

  // Sign JWT with private key
  const crypto = await import('crypto');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(`${header}.${claim}`);
  const signature = sign.sign(key, 'base64url');

  const jwt = `${header}.${claim}.${signature}`;

  // Exchange JWT for access token
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  if (!res.ok) throw new Error(`Google auth failed: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

// ── SHEETS API ────────────────────────────────────────────────────────────────

async function appendRow(sheetId: string, sheetName: string, values: (string | number)[]): Promise<boolean> {
  try {
    const token = await getAccessToken();
    const range = `${sheetName}!A:Z`;
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [values] }),
      }
    );
    return res.ok;
  } catch (err) {
    console.error('[google-sheets-db] appendRow failed:', err);
    return false;
  }
}

async function readSheet(sheetId: string, sheetName: string, range = 'A:Z'): Promise<string[][]> {
  try {
    const token = await getAccessToken();
    const fullRange = `${sheetName}!${range}`;
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(fullRange)}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.values || [];
  } catch (err) {
    console.error('[google-sheets-db] readSheet failed:', err);
    return [];
  }
}

// ── GAMEFLUENCE OPERATIONS ────────────────────────────────────────────────────

export async function logCreatorSignup(data: {
  creatorName: string;
  email: string;
  socialProfile: string;
  platform: string;
  market?: string;
  outreachRef?: string;
  outreachSource?: string;
  eventCode?: string;
  followerCount?: number;
  engagementRate?: number;
}): Promise<boolean> {
  if (!GAMEFLUENCE_SHEET_ID) return false;
  const timestamp = new Date().toISOString();
  return appendRow(GAMEFLUENCE_SHEET_ID, 'Creator Signups', [
    timestamp,
    data.creatorName,
    data.email,
    data.socialProfile,
    data.platform,
    data.market || '',
    data.outreachRef || '',
    data.outreachSource || '',
    data.eventCode || '',
    data.followerCount || '',
    data.engagementRate || '',
  ]);
}

export async function logOutreachAttempt(data: {
  creatorId: string;
  creatorName: string;
  market: string;
  platform: string;
  templateUsed: string;
  sentAt: string;
  channel: string; // 'dm' | 'email' | 'messenger'
}): Promise<boolean> {
  if (!GAMEFLUENCE_SHEET_ID) return false;
  return appendRow(GAMEFLUENCE_SHEET_ID, 'Outreach Log', [
    data.sentAt,
    data.creatorId,
    data.creatorName,
    data.market,
    data.platform,
    data.templateUsed,
    data.channel,
    'sent', // status
    '', // response_date (filled later)
    '', // outcome (filled later)
  ]);
}

export async function logBrandInquiry(data: {
  name: string;
  email: string;
  company: string;
  market: string;
  budget: string;
  message: string;
  type: string;
}): Promise<boolean> {
  if (!GAMEFLUENCE_SHEET_ID) return false;
  const timestamp = new Date().toISOString();
  return appendRow(GAMEFLUENCE_SHEET_ID, 'Brand Inquiries', [
    timestamp,
    data.name,
    data.email,
    data.company,
    data.market,
    data.budget,
    data.type,
    data.message,
    'new', // status
  ]);
}

export async function getCreatorSignups(): Promise<string[][]> {
  if (!GAMEFLUENCE_SHEET_ID) return [];
  return readSheet(GAMEFLUENCE_SHEET_ID, 'Creator Signups');
}

export async function getOutreachLog(): Promise<string[][]> {
  if (!GAMEFLUENCE_SHEET_ID) return [];
  return readSheet(GAMEFLUENCE_SHEET_ID, 'Outreach Log');
}

// ── MOBILEYES OPERATIONS ──────────────────────────────────────────────────────

export async function logMobileyesBrief(data: {
  name: string;
  company: string;
  email: string;
  phone?: string;
  campaignType: string;
  market: string;
  budget: string;
  details: string;
}): Promise<boolean> {
  if (!MOBILEYES_SHEET_ID) return false;
  const timestamp = new Date().toISOString();
  return appendRow(MOBILEYES_SHEET_ID, 'Campaign Briefs', [
    timestamp,
    data.name,
    data.company,
    data.email,
    data.phone || '',
    data.campaignType,
    data.market,
    data.budget,
    data.details,
    'new', // status
  ]);
}

export async function logMobileyesTalentSignup(data: {
  name: string;
  email: string;
  phone?: string;
  location: string;
  timezone: string;
  platforms: string; // JSON stringified
  primaryPlatform: string;
  rateCard: string; // JSON stringified
  preExistingBrands: string;
  agreementVersion: string;
}): Promise<boolean> {
  if (!MOBILEYES_SHEET_ID) return false;
  const timestamp = new Date().toISOString();
  return appendRow(MOBILEYES_SHEET_ID, 'Talent Signups', [
    timestamp,
    data.name,
    data.email,
    data.phone || '',
    data.location,
    data.timezone,
    data.platforms,
    data.primaryPlatform,
    data.rateCard,
    data.preExistingBrands,
    data.agreementVersion,
    'new', // status
  ]);
}

export async function logMobileyesBriefResponse(data: {
  briefId: string;
  talentId: string;
  talentName: string;
  talentEmail: string;
  accepted: boolean;
  brandName?: string;
  campaignName?: string;
  talentFee?: number;
  declineReason?: string;
  notes?: string;
}): Promise<boolean> {
  if (!MOBILEYES_SHEET_ID) return false;
  const timestamp = new Date().toISOString();
  return appendRow(MOBILEYES_SHEET_ID, 'Brief Responses', [
    timestamp,
    data.briefId,
    data.talentId,
    data.talentName,
    data.talentEmail,
    data.accepted ? 'accepted' : 'declined',
    data.brandName || '',
    data.campaignName || '',
    data.talentFee || '',
    data.declineReason || '',
    data.notes || '',
  ]);
}

export async function logMobileyesAudit(row: (string | number)[]): Promise<boolean> {
  if (!MOBILEYES_SHEET_ID) return false;
  return appendRow(MOBILEYES_SHEET_ID, 'Audit Log', row);
}
