import { NextRequest, NextResponse } from 'next/server';
import { logMobileyesBriefResponse, logMobileyesAudit } from '@/lib/google-sheets-db';
import { AuditLogger } from '@/lib/audit-log';
import { BriefTokenService } from '@/lib/brief-tokens';
import { sendBriefResponseAdminNotification } from '@/lib/mobileyes-email';

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const { ip } = AuditLogger.extractRequestContext(request);
    
    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate required fields
    if (!body.briefId) {
      return NextResponse.json(
        { error: 'Missing required field: briefId' },
        { status: 400 }
      );
    }

    // Token validation (if token provided — required in production)
    if (body.token) {
      const tokenResult = BriefTokenService.validateToken(body.token);
      if (!tokenResult.valid) {
        return NextResponse.json(
          { error: `Invalid brief token: ${tokenResult.error}` },
          { status: 403 }
        );
      }
      // Ensure token matches the brief being accepted
      if (tokenResult.payload?.briefId !== body.briefId) {
        return NextResponse.json(
          { error: 'Token does not match this brief' },
          { status: 403 }
        );
      }
    }

    const isAccepted = body.accepted !== false;

    // Log to Google Sheets
    logMobileyesBriefResponse({
      briefId: body.briefId,
      talentId: body.talentId || '',
      talentName: body.talentName || '',
      talentEmail: body.talentEmail || '',
      accepted: isAccepted,
      brandName: body.brandName,
      campaignName: body.campaignName,
      talentFee: body.talentFee,
      declineReason: body.declineReason,
      notes: body.notes,
    }).catch(err => console.warn('[sheets] Brief response log failed:', err));

    // Audit log
    const auditAction = isAccepted ? 'brief_accepted' : 'brief_declined';
    const auditEntry = AuditLogger.createEntry(
      auditAction,
      body.talentEmail || body.talentId || 'unknown',
      body.talentName || 'unknown',
      body,
      request,
      { 
        briefId: body.briefId, 
        talentId: body.talentId,
        metadata: { 
          signedAt: body.signedAt, 
          accepted: isAccepted,
          declineReason: body.declineReason,
        } 
      }
    );
    logMobileyesAudit(AuditLogger.toSheetRow(auditEntry))
      .catch(err => console.warn('[audit] Brief response audit log failed:', err));

    // TODO: Send confirmation email to talent
    // TODO: If accepted, notify admin + brand/agency
    // TODO: If declined, re-queue brief for matching
    sendBriefResponseAdminNotification({
      talentName: body.talentName || 'Unknown',
      brandName: body.brandName || 'Unknown',
      campaignName: body.campaignName || 'Unknown',
      accepted: isAccepted,
      talentFee: body.talentFee,
      declineReason: body.declineReason,
    }).catch(err => console.warn('[email] Brief response admin notification failed:', err));

    return NextResponse.json({
      success: true,
      message: isAccepted 
        ? 'Brief accepted successfully. Content deadline and payment terms confirmed.'
        : 'Brief declined. No further action required.',
      action: isAccepted ? 'accepted' : 'declined',
    });
  } catch (error) {
    console.error('Brief accept error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
