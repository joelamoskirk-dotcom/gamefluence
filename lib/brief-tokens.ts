// Signed Brief Token System
// Generates and validates HMAC-signed tokens for brief acceptance URLs
// Prevents unauthorized access to brief details and acceptance flow

import crypto from 'crypto';

const TOKEN_SECRET = process.env.FOUNDER_MASTER_KEY || process.env.CRON_SECRET || 'mobileyes-brief-token-dev-key';
const TOKEN_EXPIRY_HOURS = 72; // Brief tokens expire after 72 hours

export interface BriefTokenPayload {
  briefId: string;
  talentId: string;
  issuedAt: number; // Unix timestamp
  expiresAt: number; // Unix timestamp
}

export class BriefTokenService {

  // Generate a signed token for a specific brief + talent pair
  static generateToken(briefId: string, talentId: string): string {
    const now = Math.floor(Date.now() / 1000);
    const payload: BriefTokenPayload = {
      briefId,
      talentId,
      issuedAt: now,
      expiresAt: now + (TOKEN_EXPIRY_HOURS * 3600),
    };

    const payloadString = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = this.sign(payloadString);
    
    return `${payloadString}.${signature}`;
  }

  // Validate a token and return the payload if valid
  static validateToken(token: string): { valid: boolean; payload?: BriefTokenPayload; error?: string } {
    if (!token || typeof token !== 'string') {
      return { valid: false, error: 'Token is required' };
    }

    const parts = token.split('.');
    if (parts.length !== 2) {
      return { valid: false, error: 'Invalid token format' };
    }

    const [payloadString, signature] = parts;

    // Verify signature
    const expectedSignature = this.sign(payloadString);
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return { valid: false, error: 'Invalid token signature' };
    }

    // Decode payload
    let payload: BriefTokenPayload;
    try {
      payload = JSON.parse(Buffer.from(payloadString, 'base64url').toString());
    } catch {
      return { valid: false, error: 'Malformed token payload' };
    }

    // Check expiry
    const now = Math.floor(Date.now() / 1000);
    if (now > payload.expiresAt) {
      return { valid: false, error: 'Token expired' };
    }

    return { valid: true, payload };
  }

  // Generate the brief acceptance URL with signed token
  static generateBriefAcceptUrl(briefId: string, talentId: string, baseUrl?: string): string {
    const token = this.generateToken(briefId, talentId);
    const base = baseUrl || process.env.NEXT_PUBLIC_APP_URL || 'https://mobileyes.live';
    return `${base}/brief-accept?token=${encodeURIComponent(token)}`;
  }

  private static sign(data: string): string {
    return crypto
      .createHmac('sha256', TOKEN_SECRET)
      .update(data)
      .digest('base64url');
  }
}
