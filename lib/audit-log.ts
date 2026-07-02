// Audit Logging for Agreement Signatures and Brief Acceptances
// Logs: timestamp, IP, user agent, data hash, action type
// Stored in Google Sheets "Audit Log" tab for legal evidence

import crypto from 'crypto';
import { NextRequest } from 'next/server';

export type AuditAction = 
  | 'talent_agreement_signed'
  | 'brief_accepted'
  | 'brief_declined'
  | 'content_submitted'
  | 'verification_completed'
  | 'payment_triggered';

export interface AuditEntry {
  timestamp: string;
  action: AuditAction;
  actorEmail: string;
  actorName: string;
  ipAddress: string;
  userAgent: string;
  dataHash: string; // SHA-256 of submitted form data
  briefId?: string;
  talentId?: string;
  metadata?: string; // JSON string of additional context
}

export class AuditLogger {

  // Extract IP and user agent from Next.js request
  static extractRequestContext(request: NextRequest): { ip: string; userAgent: string } {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    return { ip, userAgent };
  }

  // Create a SHA-256 hash of form data for tamper evidence
  static hashFormData(data: Record<string, unknown>): string {
    const serialized = JSON.stringify(data, Object.keys(data).sort());
    return crypto.createHash('sha256').update(serialized).digest('hex');
  }

  // Create an audit entry (ready to be stored)
  static createEntry(
    action: AuditAction,
    actorEmail: string,
    actorName: string,
    formData: Record<string, unknown>,
    request: NextRequest,
    options?: { briefId?: string; talentId?: string; metadata?: Record<string, unknown> }
  ): AuditEntry {
    const { ip, userAgent } = this.extractRequestContext(request);

    return {
      timestamp: new Date().toISOString(),
      action,
      actorEmail,
      actorName,
      ipAddress: ip,
      userAgent: userAgent.slice(0, 200), // truncate for storage
      dataHash: this.hashFormData(formData),
      briefId: options?.briefId,
      talentId: options?.talentId,
      metadata: options?.metadata ? JSON.stringify(options.metadata) : undefined,
    };
  }

  // Convert to flat array for Google Sheets row
  static toSheetRow(entry: AuditEntry): (string | number)[] {
    return [
      entry.timestamp,
      entry.action,
      entry.actorEmail,
      entry.actorName,
      entry.ipAddress,
      entry.userAgent,
      entry.dataHash,
      entry.briefId || '',
      entry.talentId || '',
      entry.metadata || '',
    ];
  }

  // Column headers for the Audit Log sheet
  static getSheetHeaders(): string[] {
    return [
      'Timestamp',
      'Action',
      'Actor Email',
      'Actor Name',
      'IP Address',
      'User Agent',
      'Data Hash',
      'Brief ID',
      'Talent ID',
      'Metadata',
    ];
  }
}
