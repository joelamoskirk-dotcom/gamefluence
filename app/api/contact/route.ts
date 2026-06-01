import { NextRequest, NextResponse } from 'next/server';
import { sendContactNotification, ContactFormData } from '@/lib/email';
import { logBrandInquiry } from '@/lib/google-sheets-db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const contactData: ContactFormData = {
      name: body.name,
      email: body.email,
      company: body.company || undefined,
      message: body.message,
      type: body.type || 'general',
    };

    const result = await sendContactNotification(contactData);

    if (!result.success) {
      console.error('Contact notification failed:', result.error);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    // Log to Google Sheets (non-blocking)
    logBrandInquiry({
      name: body.name,
      email: body.email,
      company: body.company || '',
      market: body.message?.match(/Market: (\w+)/)?.[1] || '',
      budget: body.message?.match(/Budget: ([^\n]+)/)?.[1] || '',
      message: body.message,
      type: body.type || 'general',
    }).catch(err => console.warn('[sheets] Brand inquiry log failed:', err));

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you soon.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
