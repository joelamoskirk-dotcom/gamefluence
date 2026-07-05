import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  // Check auth
  const session = req.cookies.get('founder_session');
  if (!session?.value) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { to, subject, body } = await req.json();

    if (!to || !subject || !body) {
      return NextResponse.json({ error: 'Missing required fields (to, subject, body)' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Convert plain text body to HTML (preserve line breaks)
    const htmlBody = body
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>')
      .replace(/---/g, '<hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;">');

    const { data, error } = await resend.emails.send({
      from: 'Joel Kirk <admin@gamefluence.com.au>',
      to: [to],
      subject,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; line-height: 1.6; color: #1a1a1a; max-width: 600px;">
          ${htmlBody}
        </div>
      `,
      text: body,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message || 'Failed to send' }, { status: 500 });
    }

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (err) {
    console.error('Send email error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
