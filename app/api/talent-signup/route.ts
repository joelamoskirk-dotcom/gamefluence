import { NextRequest, NextResponse } from 'next/server';
import { logMobileyesTalentSignup, logMobileyesAudit } from '@/lib/google-sheets-db';
import { AuditLogger } from '@/lib/audit-log';
import { TalentInputValidator } from '@/lib/mobileyes-talent-management';
import { sendTalentWelcomeEmail, sendTalentSignupAdminNotification } from '@/lib/mobileyes-email';

// Simple in-memory rate limiter (per deployment instance)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5; // 5 submissions per window
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
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate required fields
    if (!body.fullName || !body.email || !body.agreementAccepted) {
      return NextResponse.json(
        { error: 'Missing required fields: fullName, email, agreementAccepted' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!TalentInputValidator.validateEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address format' },
        { status: 400 }
      );
    }

    // Validate phone if provided
    if (body.phone && !TalentInputValidator.validatePhone(body.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = TalentInputValidator.sanitizeString(body.fullName, 100);
    const sanitizedLocation = TalentInputValidator.sanitizeString(body.location || '', 200);

    // Log to Google Sheets (non-blocking)
    logMobileyesTalentSignup({
      name: sanitizedName,
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim(),
      location: sanitizedLocation,
      timezone: body.timezone || 'Australia/Sydney',
      platforms: JSON.stringify(body.platforms || []),
      primaryPlatform: body.primaryPlatform || 'kick',
      rateCard: JSON.stringify(body.rateCard || {}),
      preExistingBrands: Array.isArray(body.preExistingBrands) ? body.preExistingBrands.join(', ') : '',
      agreementVersion: body.agreementVersion || '1.0',
    }).catch(err => console.warn('[sheets] Mobileyes talent signup log failed:', err));

    // Audit log — agreement signature evidence
    const auditEntry = AuditLogger.createEntry(
      'talent_agreement_signed',
      body.email.trim().toLowerCase(),
      sanitizedName,
      body,
      request,
      { metadata: { agreementVersion: body.agreementVersion, signedAt: body.signedAt } }
    );
    logMobileyesAudit(AuditLogger.toSheetRow(auditEntry))
      .catch(err => console.warn('[audit] Talent agreement audit log failed:', err));

    // TODO: Send confirmation email to talent via Resend (admin@mobileyes.live from address)
    // TODO: Send notification email to admin@mobileyes.live
    sendTalentWelcomeEmail(body.email.trim(), sanitizedName)
      .catch(err => console.warn('[email] Talent welcome email failed:', err));

    sendTalentSignupAdminNotification({
      name: sanitizedName,
      email: body.email.trim().toLowerCase(),
      platforms: JSON.stringify(body.platforms || []),
      primaryPlatform: body.primaryPlatform || 'kick',
      rateCard: JSON.stringify(body.rateCard || {}),
    }).catch(err => console.warn('[email] Admin notification failed:', err));

    return NextResponse.json({
      success: true,
      message: 'Talent profile submitted and agreement signed successfully.',
    });
  } catch (error) {
    console.error('Talent signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
