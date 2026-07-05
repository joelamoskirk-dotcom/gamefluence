import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface PaymentSubmission {
  fullName: string;
  email: string;
  abn: string;
  tfn: string;
  bsb: string;
  accountNumber: string;
  accountName: string;
  superFundName: string;
  superFundUSI: string;
  superMemberNumber: string;
  screenshot: string;
  submittedAt: string;
}

// In-memory store for submissions
const submissions: PaymentSubmission[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { fullName, email, bsb, accountNumber, accountName } = body;

    // Validate required fields
    if (!fullName || !fullName.trim()) {
      return NextResponse.json({ error: 'Full name is required' }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!bsb || bsb.replace(/\D/g, '').length !== 6) {
      return NextResponse.json({ error: 'BSB must be 6 digits (format: XXX-XXX)' }, { status: 400 });
    }
    if (!accountNumber || accountNumber.length < 1 || accountNumber.length > 9) {
      return NextResponse.json({ error: 'Account number is required (up to 9 digits)' }, { status: 400 });
    }
    if (!accountName || !accountName.trim()) {
      return NextResponse.json({ error: 'Account name is required' }, { status: 400 });
    }

    // Validate ABN format if provided
    if (body.abn && body.abn.length > 0 && body.abn.length !== 11) {
      return NextResponse.json({ error: 'ABN must be 11 digits if provided' }, { status: 400 });
    }

    // Validate TFN format if provided
    if (body.tfn && body.tfn.length > 0 && body.tfn.length !== 9) {
      return NextResponse.json({ error: 'TFN must be 9 digits if provided' }, { status: 400 });
    }

    // Store submission
    const submission: PaymentSubmission = {
      fullName: body.fullName,
      email: body.email,
      abn: body.abn || '',
      tfn: body.tfn || '',
      bsb: body.bsb,
      accountNumber: body.accountNumber,
      accountName: body.accountName,
      superFundName: body.superFundName || '',
      superFundUSI: body.superFundUSI || '',
      superMemberNumber: body.superMemberNumber || '',
      screenshot: body.screenshot || '',
      submittedAt: new Date().toISOString(),
    };

    submissions.push(submission);

    // Send notification email via Resend
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Mobileyes Platform <noreply@gamefluence.com.au>',
        to: 'admin@gamefluence.com.au',
        subject: `New payment details submitted — ${fullName}`,
        html: `
          <h2>New Payment Details Submitted</h2>
          <p><strong>${fullName}</strong> (${email}) has submitted their payment details.</p>
          <ul>
            <li><strong>BSB:</strong> ${bsb}</li>
            <li><strong>Account Name:</strong> ${accountName}</li>
            <li><strong>ABN:</strong> ${body.abn || 'Not provided'}</li>
            <li><strong>TFN:</strong> ${body.tfn ? 'Provided' : 'Not provided'}</li>
            <li><strong>Super Fund:</strong> ${body.superFundName || 'Not provided'}</li>
          </ul>
          <p>View full details in the <a href="https://gamefluence.com.au/admin/pay-details">admin panel</a>.</p>
        `,
      });
    } catch (emailError) {
      // Log but don't fail the submission if email fails
      console.error('Failed to send notification email:', emailError);
    }

    return NextResponse.json({ success: true, message: 'Payment details submitted successfully' });
  } catch (err) {
    console.error('Payment details submission error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Check for founder_session cookie
  const sessionCookie = req.cookies.get('founder_session');

  if (!sessionCookie || !sessionCookie.value) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Return all submissions (without screenshot data to keep response small)
  const sanitized = submissions.map((s) => ({
    fullName: s.fullName,
    email: s.email,
    abn: s.abn,
    tfn: s.tfn,
    bsb: s.bsb,
    accountNumber: s.accountNumber,
    accountName: s.accountName,
    superFundName: s.superFundName,
    superFundUSI: s.superFundUSI,
    superMemberNumber: s.superMemberNumber,
    hasScreenshot: !!s.screenshot,
    submittedAt: s.submittedAt,
  }));

  return NextResponse.json({ submissions: sanitized });
}
