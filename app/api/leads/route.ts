import { NextRequest, NextResponse } from 'next/server';
import { sendLeadNotification, sendCreatorConfirmation, LeadNotificationData } from '@/lib/email';
import { logCreatorSignup } from '@/lib/google-sheets-db';
import { triggerCreatorSequence } from '@/lib/email-sequences';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.email || !body.creatorName || !body.socialProfile) {
      return NextResponse.json(
        { error: 'Missing required fields: email, creatorName, socialProfile' },
        { status: 400 }
      );
    }

    const leadData: LeadNotificationData = {
      creatorName: body.creatorName,
      email: body.email,
      phone: body.phone || undefined,
      socialProfile: body.socialProfile,
      platform: body.platform || 'unknown',
      gamingFocus: body.gamingFocus || [],
      earningsGoal: body.earningsGoal || 'Not specified',
      availability: body.availability || 'Not specified',
      followerCount: body.followerCount || undefined,
      engagementRate: body.engagementRate || undefined,
      brandSafetyScore: body.brandSafetyScore || undefined,
      marketTier: body.marketTier || undefined,
      submittedAt: new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' }),
    };

    // Send notification to admin
    const adminResult = await sendLeadNotification(leadData);

    // Send confirmation to creator
    const creatorResult = await sendCreatorConfirmation(body.email, body.creatorName);

    if (!adminResult.success) {
      console.error('Admin notification failed:', adminResult.error);
      return NextResponse.json(
        { error: 'Failed to process submission. Please try again.' },
        { status: 500 }
      );
    }

    // Log to Google Sheets (non-blocking — don't fail if sheets unavailable)
    logCreatorSignup({
      creatorName: body.creatorName,
      email: body.email,
      socialProfile: body.socialProfile,
      platform: body.platform || 'unknown',
      market: body.market || body.marketTier || '',
      outreachRef: body.outreachRef || '',
      outreachSource: body.outreachSource || '',
      eventCode: body.eventCode || '',
      followerCount: body.followerCount,
      engagementRate: body.engagementRate,
    }).catch(err => console.warn('[sheets] Creator signup log failed:', err));

    // Trigger automated email drip sequence (non-blocking)
    triggerCreatorSequence(body.email, {
      name: body.creatorName,
      platform: body.platform || 'unknown',
      genres: Array.isArray(body.gamingFocus) ? body.gamingFocus.join(', ') : body.gamingFocus || 'Gaming',
      market: body.market || body.marketTier || 'APAC',
      creatorId: body.outreachRef || 'organic',
    }).catch(err => console.warn('[email-sequences] Creator drip failed:', err));

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!',
      confirmationSent: creatorResult.success,
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
