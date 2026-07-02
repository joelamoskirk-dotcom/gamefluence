import { NextRequest, NextResponse } from 'next/server';
import { BatchContactUploader, ContactPipeline } from '@/lib/batch-contact-upload';
import { logOutreachAttempt } from '@/lib/google-sheets-db';

// Rate limit: 10 uploads per hour per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 });
    return true;
  }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const body = await request.json();
    const { data, pipeline, options } = body as {
      data: string[][] | Record<string, string>[];
      pipeline: ContactPipeline;
      options?: {
        source?: string;
        contactedBy?: string;
        defaultMarket?: string;
      };
    };

    // Validate pipeline
    if (!pipeline || !['gamefluence', 'mobileyes'].includes(pipeline)) {
      return NextResponse.json(
        { error: 'pipeline must be "gamefluence" or "mobileyes"' },
        { status: 400 }
      );
    }

    // Validate data presence
    if (!data || !Array.isArray(data) || data.length < 2) {
      return NextResponse.json(
        { error: 'Data must contain at least a header row and one data row' },
        { status: 400 }
      );
    }

    // Cap at 200 rows per upload
    if (data.length > 201) {
      return NextResponse.json(
        { error: 'Maximum 200 contacts per upload. Split into smaller batches.' },
        { status: 400 }
      );
    }

    // Process the batch
    const result = BatchContactUploader.processBatch(data, pipeline, options);

    // Log valid contacts to Google Sheets (non-blocking)
    if (result.validRows > 0) {
      const rows = BatchContactUploader.toSheetRows(result.contacts);
      for (const contact of result.contacts) {
        // Log to the appropriate outreach sheet
        logOutreachAttempt({
          creatorId: contact.id,
          creatorName: contact.name,
          market: contact.market || '',
          platform: contact.platform,
          templateUsed: 'batch_upload',
          sentAt: contact.uploadedAt,
          channel: 'batch_import',
        }).catch(err => console.warn('[sheets] Batch log failed for:', contact.name, err));
      }
    }

    return NextResponse.json({
      ...result,
      success: true,
      // Don't send full contacts back (could be large), just summary
      contacts: undefined,
      contactCount: result.contacts.length,
      sampleContacts: result.contacts.slice(0, 5), // Preview first 5
    });
  } catch (error) {
    console.error('Batch upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
